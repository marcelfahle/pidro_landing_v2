"""Pidro Beta iPhone install explainer: frames with Pillow, audio with numpy, mux with ffmpeg.

Usage: python render.py en|sv|fi
"""
import math
import subprocess
import sys
import wave
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

LANG = sys.argv[1] if len(sys.argv) > 1 else "en"
ROOT = Path(__file__).parent
OUT = ROOT / "out"
FRAMES = OUT / f"frames_{LANG}"
FRAMES.mkdir(parents=True, exist_ok=True)

W, H, FPS = 1080, 1920, 30
DUR = 22.0
N = int(DUR * FPS)

T = {
    "en": {
        "title": "Pidro Beta\non iPhone",
        "sub": "3 steps · 20 seconds",
        "s1": "Install TestFlight",
        "s2": "Tap Get Pidro beta.\nThen Accept and Install.",
        "s3": "Open Pidro Beta. Tap\n“Played Pidro Classic?”",
        "get": "GET",
        "open": "OPEN",
        "accept": "Accept",
        "install": "Install",
        "tf_sub": "Apple's app for test games",
        "search": "TestFlight",
        "page_head": "Pidro beta\nfor iPhone",
        "page_done": "TestFlight installed",
        "page_step": "Tap the button.\nTestFlight opens.",
        "get_beta": "Get Pidro beta",
        "tf_title": "Pidro Beta",
        "tf_by": "oneapps Ab Oy",
        "end1": "See you at\nthe table",
        "end2": "pidro.online/beta",
        "classic": "Pidro",
        "beta": "Pidro Beta",
        "plaque_q": "Played Pidro Classic?",
        "plaque_sub": "Bring your name and games.",
    },
    "sv": {
        "title": "Pidro Beta\npå iPhone",
        "sub": "3 steg · 20 sekunder",
        "s1": "Installera TestFlight",
        "s2": "Tryck Hämta Pidro beta.\nSedan Acceptera och Installera.",
        "s3": "Öppna Pidro Beta. Tryck på\n”Har du spelat Pidro Classic?”",
        "get": "HÄMTA",
        "open": "ÖPPNA",
        "accept": "Acceptera",
        "install": "Installera",
        "tf_sub": "Apples app för testspel",
        "search": "TestFlight",
        "page_head": "Pidro beta\nför iPhone",
        "page_done": "TestFlight installerad",
        "page_step": "Tryck på knappen.\nTestFlight öppnas.",
        "get_beta": "Hämta Pidro beta",
        "tf_title": "Pidro Beta",
        "tf_by": "oneapps Ab Oy",
        "end1": "Vi ses vid\nbordet",
        "end2": "pidro.online/beta",
        "classic": "Pidro",
        "beta": "Pidro Beta",
        "plaque_q": "Har du spelat Pidro Classic?",
        "plaque_sub": "Ta med ditt namn och dina spel.",
    },
    "fi": {
        "title": "Pidro Beta\niPhonelle",
        "sub": "3 vaihetta · 20 sekuntia",
        "s1": "Asenna TestFlight",
        "s2": "Napauta Hae Pidro-beta.\nSitten Hyväksy ja Asenna.",
        "s3": "Avaa Pidro Beta. Napauta\n”Played Pidro Classic?”",
        "get": "HAE",
        "open": "AVAA",
        "accept": "Hyväksy",
        "install": "Asenna",
        "tf_sub": "Applen sovellus testipeleille",
        "search": "TestFlight",
        "page_head": "Pidro-beta\niPhonelle",
        "page_done": "TestFlight asennettu",
        "page_step": "Napauta painiketta.\nTestFlight avautuu.",
        "get_beta": "Hae Pidro-beta",
        "tf_title": "Pidro Beta",
        "tf_by": "oneapps Ab Oy",
        "end1": "Nähdään\npöydän ääressä",
        "end2": "pidro.online/beta",
        "classic": "Pidro",
        "beta": "Pidro Beta",
        "plaque_q": "Played Pidro Classic?",
        "plaque_sub": "Bring your name and games.",
    },
}[LANG]

# ---------- palette (game DS v2) ----------
FELT_HI = (23, 80, 134)
FELT = (14, 49, 88)
FELT_DEEP = (10, 35, 64)
RIM_HI = (246, 222, 154)
RIM = (226, 175, 69)
RIM_LO = (196, 137, 42)
RIM_DEEP = (143, 94, 18)
GOLD = (255, 212, 71)
WOOD_HI = (181, 122, 49)
WOOD_DEEP = (78, 37, 9)
KEYLINE = (42, 21, 5)
GLOW = (63, 208, 255)
RED = (200, 16, 46)
IOS_BLUE = (10, 132, 255)
WHITE = (255, 255, 255)


def font(name, size, weight=None):
    f = ImageFont.truetype(str(ROOT / "fonts" / name), size)
    if weight:
        f.set_variation_by_axes([min(32, max(14, size // 3)), weight])
    return f


BREE = lambda s: font("BreeSerif.ttf", s)
INTER = lambda s, w=500: font("Inter.ttf", s, w)

# ---------- easing ----------
def clamp(x, a=0.0, b=1.0):
    return max(a, min(b, x))


def ease_out(x):
    x = clamp(x)
    return 1 - (1 - x) ** 3


def ease_in_out(x):
    x = clamp(x)
    return 3 * x * x - 2 * x * x * x


def back_out(x, s=1.9):
    x = clamp(x)
    x -= 1
    return x * x * ((s + 1) * x + s) + 1


def prog(t, start, dur):
    return clamp((t - start) / dur)


# ---------- drawing helpers ----------
def vgrad(size, stops):
    """Vertical gradient image from [(pos, rgb)] stops."""
    w, h = size
    ys = np.linspace(0, 1, h)
    arr = np.zeros((h, 3))
    pos = [p for p, _ in stops]
    for c in range(3):
        arr[:, c] = np.interp(ys, pos, [col[c] for _, col in stops])
    img = np.repeat(arr[:, None, :], w, axis=1).astype(np.uint8)
    return Image.fromarray(img, "RGB")


def rrect_mask(size, r):
    m = Image.new("L", size, 0)
    ImageDraw.Draw(m).rounded_rectangle((0, 0, size[0] - 1, size[1] - 1), r, fill=255)
    return m


def paste_grad_rrect(base, box, r, stops, alpha=255):
    x0, y0, x1, y1 = [int(v) for v in box]
    size = (max(1, x1 - x0), max(1, y1 - y0))
    g = vgrad(size, stops).convert("RGBA")
    m = rrect_mask(size, r)
    if alpha < 255:
        m = m.point(lambda v: v * alpha // 255)
    base.alpha_composite(Image.composite(g, Image.new("RGBA", size, (0, 0, 0, 0)), m), (x0, y0))


def shadow(base, box, r, blur=30, offset=(0, 18), opacity=140):
    x0, y0, x1, y1 = [int(v) for v in box]
    pad = blur * 2
    s = Image.new("RGBA", (x1 - x0 + pad * 2, y1 - y0 + pad * 2), (0, 0, 0, 0))
    ImageDraw.Draw(s).rounded_rectangle((pad, pad, pad + x1 - x0, pad + y1 - y0), r, fill=(0, 0, 0, opacity))
    s = s.filter(ImageFilter.GaussianBlur(blur))
    base.alpha_composite(s, (x0 - pad + offset[0], y0 - pad + offset[1]))


def text_center(draw, cx, y, txt, fnt, fill, spacing=10, stroke=0, stroke_fill=None):
    lines = txt.split("\n")
    for line in lines:
        bb = draw.textbbox((0, 0), line, font=fnt, stroke_width=stroke)
        w = bb[2] - bb[0]
        draw.text((cx - w / 2 - bb[0], y), line, font=fnt, fill=fill, stroke_width=stroke, stroke_fill=stroke_fill)
        y += (bb[3] - bb[1]) + spacing + fnt.size * 0.18
    return y


def gold_text(base, cx, y, txt, size, shadow_depth=5):
    """Bree Serif gold headline with stacked drop (like the site title)."""
    fnt = BREE(size)
    layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for i, col in [(shadow_depth + 4, (0, 0, 0, 110)), (shadow_depth, (90, 58, 8, 255)), (2, RIM_DEEP + (255,))]:
        text_center(d, cx, y + i, txt, fnt, col)
    text_center(d, cx, y, txt, fnt, GOLD + (255,))
    base.alpha_composite(layer)


def rounded_icon(img, size, radius_ratio=0.225):
    im = img.convert("RGBA").resize((size, size), Image.LANCZOS)
    m = rrect_mask((size, size), int(size * radius_ratio))
    out = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    out.paste(im, (0, 0), m)
    return out


def scaled(img, s):
    if abs(s - 1) < 1e-3:
        return img
    w, h = img.size
    return img.resize((max(1, int(w * s)), max(1, int(h * s))), Image.LANCZOS)


def paste_center(base, img, cx, cy, scale=1.0, alpha=1.0, rot=0.0):
    im = scaled(img, scale)
    if rot:
        im = im.rotate(rot, resample=Image.BICUBIC, expand=True)
    if alpha < 1:
        a = im.getchannel("A").point(lambda v: int(v * alpha))
        im.putalpha(a)
    base.alpha_composite(im, (int(cx - im.width / 2), int(cy - im.height / 2)))


# ---------- static assets ----------
def make_background():
    bg = vgrad((W, H), [(0, FELT_HI), (0.45, FELT), (1, FELT_DEEP)]).convert("RGBA")
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse((-200, -300, W + 200, 900), fill=GLOW + (70,))
    glow = glow.filter(ImageFilter.GaussianBlur(160))
    bg.alpha_composite(glow)
    # faint diagonal card-back weave
    weave = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    wd = ImageDraw.Draw(weave)
    for x in range(-H, W, 34):
        wd.line((x, 0, x + H, H), fill=(170, 235, 255, 9), width=2)
    bg.alpha_composite(weave)
    return bg


BG = make_background()
LOGO = Image.open(ROOT / "logo-v3.png").convert("RGBA")
LOGO = LOGO.resize((860, int(860 * LOGO.height / LOGO.width)), Image.LANCZOS)
APP_ICON = Image.open(ROOT / "app-icon.png")
ICON_BETA = rounded_icon(APP_ICON, 200)
ICON_TF_BIG = None  # built below


def make_tf_icon(size):
    """A generic TestFlight-style tile: blue gradient with a propeller mark (not Apple's artwork)."""
    tile = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    paste_grad_rrect(tile, (0, 0, size, size), int(size * 0.225), [(0, (95, 195, 255)), (1, (10, 110, 230))])
    d = ImageDraw.Draw(tile)
    c = size / 2
    for a in (90, 210, 330):
        rad = math.radians(a)
        tip = (c + math.cos(rad) * size * 0.34, c - math.sin(rad) * size * 0.34)
        l = (c + math.cos(rad + 0.5) * size * 0.1, c - math.sin(rad + 0.5) * size * 0.1)
        r = (c + math.cos(rad - 0.5) * size * 0.1, c - math.sin(rad - 0.5) * size * 0.1)
        d.polygon([l, tip, r], fill=(255, 255, 255, 235))
    d.ellipse((c - size * 0.08, c - size * 0.08, c + size * 0.08, c + size * 0.08), fill=(255, 255, 255, 255))
    return tile


TF_ICON = make_tf_icon(170)
TF_ICON_SMALL = make_tf_icon(110)

# Phone geometry
PH_W, PH_H = 700, 1300
PH_X = (W - PH_W) // 2
PH_Y = 540
SCR_PAD = 26
SCR = (PH_X + SCR_PAD, PH_Y + SCR_PAD, PH_X + PH_W - SCR_PAD, PH_Y + PH_H - SCR_PAD)
SCR_W = SCR[2] - SCR[0]
SCR_H = SCR[3] - SCR[1]


def phone_frame(base, offset_y=0):
    x0, y0 = PH_X, int(PH_Y + offset_y)
    shadow(base, (x0, y0, x0 + PH_W, y0 + PH_H), 90, blur=40, offset=(0, 30), opacity=170)
    paste_grad_rrect(base, (x0, y0, x0 + PH_W, y0 + PH_H), 92, [(0, (60, 70, 86)), (1, (18, 22, 30))])
    paste_grad_rrect(base, (x0 + 8, y0 + 8, x0 + PH_W - 8, y0 + PH_H - 8), 86, [(0, (8, 10, 14)), (1, (8, 10, 14))])


def screen_layer():
    return Image.new("RGBA", (SCR_W, SCR_H), (0, 0, 0, 0))


def blit_screen(base, scr, offset_y=0):
    m = rrect_mask((SCR_W, SCR_H), 66)
    out = Image.new("RGBA", (SCR_W, SCR_H), (0, 0, 0, 0))
    out.paste(scr, (0, 0), m)
    base.alpha_composite(out, (int(SCR[0]), int(SCR[1] + offset_y)))
    # dynamic island
    d = ImageDraw.Draw(base)
    cx = W // 2
    iy = int(SCR[1] + 22 + offset_y)
    d.rounded_rectangle((cx - 90, iy, cx + 90, iy + 44), 22, fill=(0, 0, 0, 255))


def status_bar(d, dark=True):
    col = (20, 20, 24) if dark else WHITE
    d.text((56, 30), "9:41", font=INTER(30, 650), fill=col)
    x = SCR_W - 60
    d.rounded_rectangle((x - 44, 36, x, 58), 6, outline=col, width=3)
    d.rectangle((x - 40, 40, x - 12, 54), fill=col)


def pill_button(d, box, label, fill, fg, fnt):
    d.rounded_rectangle(box, (box[3] - box[1]) // 2, fill=fill)
    bb = d.textbbox((0, 0), label, font=fnt)
    tw, th = bb[2] - bb[0], bb[3] - bb[1]
    d.text(((box[0] + box[2]) / 2 - tw / 2 - bb[0], (box[1] + box[3]) / 2 - th / 2 - bb[1]), label, font=fnt, fill=fg)


def finger(base, x, y, press, ripple):
    """Soft touch indicator: ring + ripple."""
    lay = Image.new("RGBA", base.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(lay)
    if ripple > 0:
        r = 40 + ripple * 90
        a = int(180 * (1 - ripple))
        d.ellipse((x - r, y - r, x + r, y + r), outline=(255, 255, 255, a), width=6)
    r = 44 - press * 8
    d.ellipse((x - r, y - r, x + r, y + r), fill=(255, 255, 255, 120 + int(press * 60)), outline=(255, 255, 255, 230), width=4)
    base.alpha_composite(lay.filter(ImageFilter.GaussianBlur(0.6)))


# ---------- caption panel (gold rim + felt face + card pip) ----------
def caption(base, step, text, t_in, t, y=150):
    a = ease_out(prog(t, t_in, 0.45))
    if a <= 0:
        return
    slide = (1 - a) * -60
    x0, x1 = 70, W - 70
    y0 = y + slide
    lines = text.count("\n") + 1
    h = 130 + (lines - 1) * 62
    lay = Image.new("RGBA", base.size, (0, 0, 0, 0))
    shadow(lay, (x0, y0, x1, y0 + h), 34, blur=26, offset=(0, 16), opacity=150)
    paste_grad_rrect(lay, (x0, y0, x1, y0 + h), 36, [(0, RIM_HI), (0.35, RIM), (0.65, RIM_LO), (1, RIM_DEEP)])
    paste_grad_rrect(lay, (x0 + 5, y0 + 5, x1 - 5, y0 + h - 5), 32, [(0, FELT_HI), (0.5, FELT), (1, FELT_DEEP)])
    d = ImageDraw.Draw(lay)
    # card pip
    cx0, cy0 = x0 + 34, y0 + h / 2 - 58
    card = Image.new("RGBA", (84, 116), (0, 0, 0, 0))
    paste_grad_rrect(card, (0, 0, 84, 116), 12, [(0, WHITE), (1, (240, 242, 247))])
    cd = ImageDraw.Draw(card)
    lbl = str(step)
    cd.text((12, 4), lbl, font=BREE(56), fill=RED)
    cd.text((54, 78), "♥", font=INTER(28, 700), fill=RED)
    card = card.rotate(-5 + step * 3, resample=Image.BICUBIC, expand=True)
    shadow(lay, (cx0, cy0, cx0 + 84, cy0 + 116), 12, blur=10, offset=(0, 8), opacity=120)
    lay.alpha_composite(card, (int(cx0 - 4), int(cy0 - 4)))
    # text
    tx = x0 + 150
    ty = y0 + 34
    avail = (x1 - 40) - tx
    size = 52
    while size > 34 and max(d.textlength(l, font=BREE(size)) for l in text.split("\n")) > avail:
        size -= 2
    for line in text.split("\n"):
        d.text((tx, ty + (52 - size) * 0.5), line, font=BREE(size), fill=WHITE)
        ty += 62
    lay.putalpha(lay.getchannel("A").point(lambda v: int(v * a)))
    base.alpha_composite(lay)


# ---------- scenes ----------
# timeline (seconds)
S0, S1, S2, S3, S4 = 0.0, 2.9, 8.2, 14.2, 19.4


def scene_intro(base, t):
    # logo drop with bounce
    p = back_out(prog(t, 0.15, 0.9), 1.6)
    cy = -300 + (760 - -300) * p
    tilt = (1 - ease_out(prog(t, 0.15, 1.0))) * -8
    float_y = math.sin(t * 2.2) * 8 * ease_out(prog(t, 1.1, 0.6))
    # shimmer
    sh = Image.new("RGBA", base.size, (0, 0, 0, 0))
    sd = ImageDraw.Draw(sh)
    rr = 420 + math.sin(t * 3) * 20
    sd.ellipse((W / 2 - rr, cy - rr * 0.65, W / 2 + rr, cy + rr * 0.65), fill=GLOW + (int(70 * ease_out(prog(t, 0.6, 0.8))),))
    base.alpha_composite(sh.filter(ImageFilter.GaussianBlur(90)))
    paste_center(base, LOGO, W / 2, cy + float_y, 1.0, 1.0, tilt)
    a = ease_out(prog(t, 1.0, 0.5))
    if a > 0:
        lay = Image.new("RGBA", base.size, (0, 0, 0, 0))
        gold_text(lay, W / 2, 1180 + (1 - a) * 40, T["title"], 118)
        d = ImageDraw.Draw(lay)
        text_center(d, W / 2, 1520 + (1 - a) * 40, T["sub"], INTER(44, 600), (205, 232, 250, 255))
        lay.putalpha(lay.getchannel("A").point(lambda v: int(v * a)))
        base.alpha_composite(lay)


def appstore_screen(t_local, got):
    scr = screen_layer()
    ImageDraw.Draw(scr).rectangle((0, 0, SCR_W, SCR_H), fill=(246, 246, 248))
    d = ImageDraw.Draw(scr)
    status_bar(d)
    # search field
    d.rounded_rectangle((36, 120, SCR_W - 36, 196), 22, fill=(228, 228, 234))
    d.text((80, 138), T["search"][: max(0, min(len(T["search"]), int(t_local * 14)))], font=INTER(34, 500), fill=(20, 20, 24))
    d.ellipse((50, 146, 72, 168), outline=(140, 140, 150), width=4)
    # result card
    a = ease_out((t_local - 0.9) / 0.4)
    if a > 0:
        yoff = (1 - a) * 30
        card = Image.new("RGBA", (SCR_W, 300), (0, 0, 0, 0))
        cd = ImageDraw.Draw(card)
        cd.rounded_rectangle((28, 10, SCR_W - 28, 280), 34, fill=WHITE)
        card.alpha_composite(TF_ICON, (58, 50))
        cd.text((258, 70), "TestFlight", font=INTER(40, 700), fill=(20, 20, 24))
        cd.text((258, 124), T["tf_sub"], font=INTER(28, 500), fill=(120, 120, 130))
        lbl = T["open"] if got else T["get"]
        pill_button(cd, (258, 184, 258 + 170, 184 + 64), lbl, (232, 238, 252) if not got else (232, 238, 252), IOS_BLUE, INTER(30, 750))
        card.putalpha(card.getchannel("A").point(lambda v: int(v * a)))
        scr.alpha_composite(card, (0, int(250 + yoff)))
    return scr


def scene_step1(base, t):
    tl = t - S1
    enter = ease_out(prog(t, S1, 0.5))
    oy = (1 - enter) * 700
    phone_frame(base, oy)
    got_time = 3.6
    got = tl > got_time + 0.1
    scr = appstore_screen(tl, got)
    # download ring after tap
    if tl > got_time + 0.1 and tl < got_time + 1.3:
        d = ImageDraw.Draw(scr)
        pr = clamp((tl - got_time - 0.1) / 1.1)
        cx, cy = 258 + 85, 250 + 184 + 32
        d.rounded_rectangle((258, 250 + 184, 258 + 170, 250 + 248), 32, fill=(246, 246, 248))
        d.ellipse((cx - 28, cy - 28, cx + 28, cy + 28), outline=(210, 214, 224), width=6)
        d.arc((cx - 28, cy - 28, cx + 28, cy + 28), -90, -90 + 360 * pr, fill=IOS_BLUE, width=6)
    blit_screen(base, scr, oy)
    caption(base, 1, T["s1"], S1 + 0.3, t)
    # finger to GET
    fx, fy = SCR[0] + 258 + 85, SCR[1] + 250 + 184 + 32 + oy
    appear = ease_in_out(prog(tl, got_time - 1.0, 0.8))
    if 0 < appear and tl < got_time + 0.9:
        sx, sy = W - 120, H - 160
        x = sx + (fx - sx) * appear
        y = sy + (fy - sy) * appear
        press = 1.0 if got_time - 0.05 < tl < got_time + 0.15 else 0.0
        rip = prog(tl, got_time, 0.6)
        finger(base, x, y, press, rip if tl >= got_time else 0)


def page_screen(tl):
    """pidro.online/beta in Safari: step 1 done, step 2's button waiting."""
    scr = vgrad((SCR_W, SCR_H), [(0, (28, 103, 160)), (0.55, (17, 66, 108)), (1, (13, 48, 75))]).convert("RGBA")
    d = ImageDraw.Draw(scr)
    status_bar(d, dark=False)
    a = ease_out(tl / 0.4)
    y = 130 + (1 - a) * 30
    for i, line in enumerate(T["page_head"].split("\n")):
        d.text((48, y + i * 70), line, font=BREE(62), fill=GOLD)
    # step 1, done
    y1 = y + 190
    row = Image.new("RGBA", scr.size, (0, 0, 0, 0))
    ImageDraw.Draw(row).rounded_rectangle((32, y1, SCR_W - 32, y1 + 110), 26, fill=(255, 255, 255, 34))
    scr.alpha_composite(row)
    d = ImageDraw.Draw(scr)
    d.ellipse((60, y1 + 27, 116, y1 + 83), fill=(52, 199, 89))
    d.line((74, y1 + 56, 85, y1 + 67), fill=WHITE, width=7)
    d.line((85, y1 + 67, 104, y1 + 44), fill=WHITE, width=7)
    d.text((140, y1 + 34), T["page_done"], font=INTER(34, 650), fill=(214, 230, 245))
    # step 2, the button
    y2 = y1 + 140
    d.rounded_rectangle((32, y2, SCR_W - 32, y2 + 420), 30, fill=(250, 251, 253))
    card = Image.new("RGBA", (64, 88), (0, 0, 0, 0))
    paste_grad_rrect(card, (0, 0, 64, 88), 10, [(0, WHITE), (1, (232, 236, 244))])
    cd = ImageDraw.Draw(card)
    cd.rounded_rectangle((0, 0, 63, 87), 10, outline=(200, 208, 222), width=2)
    cd.text((10, 2), "2", font=BREE(46), fill=RED)
    scr.alpha_composite(card, (60, int(y2 + 36)))
    for i, line in enumerate(T["page_step"].split("\n")):
        d.text((150, y2 + 44 + i * 50), line, font=INTER(36, 600), fill=(8, 36, 61))
    btn = (60, y2 + 230, SCR_W - 60, y2 + 350)
    shadow(scr, btn, 22, blur=12, offset=(0, 8), opacity=90)
    paste_grad_rrect(scr, btn, 22, [(0, (255, 226, 48)), (1, (247, 198, 24))])
    d = ImageDraw.Draw(scr)
    f = INTER(40, 800)
    lbl = T["get_beta"]
    bb = d.textbbox((0, 0), lbl, font=f)
    d.text(((btn[0] + btn[2]) / 2 - (bb[2] - bb[0]) / 2 - bb[0], (btn[1] + btn[3]) / 2 - (bb[3] - bb[1]) / 2 - bb[1]), lbl, font=f, fill=(8, 36, 61))
    # Safari address bar
    bar = (40, SCR_H - 150, SCR_W - 40, SCR_H - 66)
    d.rounded_rectangle(bar, 42, fill=(242, 242, 247))
    f2 = INTER(32, 600)
    url = "pidro.online/beta"
    bb = d.textbbox((0, 0), url, font=f2)
    d.text((SCR_W / 2 - (bb[2] - bb[0]) / 2, (bar[1] + bar[3]) / 2 - (bb[3] - bb[1]) / 2 - bb[1]), url, font=f2, fill=(20, 20, 24))
    return scr, (btn[1] + btn[3]) / 2


def tf_screen(tl, state):
    """state: 'accept' | 'install' | 'installing' | 'done'"""
    scr = screen_layer()
    d = ImageDraw.Draw(scr)
    d.rectangle((0, 0, SCR_W, SCR_H), fill=(246, 246, 248))
    status_bar(d)
    scr.alpha_composite(TF_ICON_SMALL, (40, 100))
    d.text((170, 128), "TestFlight", font=INTER(40, 750), fill=(20, 20, 24))
    d.rounded_rectangle((28, 260, SCR_W - 28, 760), 36, fill=WHITE)
    scr.alpha_composite(ICON_BETA, (SCR_W // 2 - 100, 300))
    f = INTER(44, 750)
    bb = d.textbbox((0, 0), T["tf_title"], font=f)
    d.text((SCR_W / 2 - (bb[2] - bb[0]) / 2, 530), T["tf_title"], font=f, fill=(20, 20, 24))
    f2 = INTER(28, 500)
    bb = d.textbbox((0, 0), T["tf_by"], font=f2)
    d.text((SCR_W / 2 - (bb[2] - bb[0]) / 2, 590), T["tf_by"], font=f2, fill=(120, 120, 130))
    btn = (SCR_W / 2 - 170, 648, SCR_W / 2 + 170, 724)
    if state == "accept":
        pill_button(d, btn, T["accept"], IOS_BLUE, WHITE, INTER(34, 750))
    elif state == "install":
        pill_button(d, btn, T["install"], IOS_BLUE, WHITE, INTER(34, 750))
    elif state == "installing":
        cx, cy = SCR_W / 2, 686
        pr = clamp(tl)
        d.ellipse((cx - 32, cy - 32, cx + 32, cy + 32), outline=(210, 214, 224), width=7)
        d.arc((cx - 32, cy - 32, cx + 32, cy + 32), -90, -90 + 360 * pr, fill=IOS_BLUE, width=7)
    else:
        pill_button(d, btn, T["open"], (232, 238, 252), IOS_BLUE, INTER(34, 750))
    return scr, btn


def scene_step2(base, t):
    tl = t - S2
    phone_frame(base)
    tap1 = 1.3  # tap Get Pidro beta on the page
    tap2 = 2.8  # tap Accept
    tap3 = 3.9  # tap Install
    if tl < tap1 + 0.25:
        scr, link_y = page_screen(tl)
        blit_screen(base, scr)
        target = (SCR[0] + SCR_W / 2, SCR[1] + link_y)
        tap = tap1
    else:
        tl2 = tl - (tap1 + 0.25)
        if tl < tap2 + 0.12:
            state = "accept"
        elif tl < tap3 + 0.12:
            state = "install"
        elif tl < tap3 + 1.3:
            state = "installing"
        else:
            state = "done"
        prog_inst = (tl - tap3 - 0.12) / 1.1
        scr, btn = tf_screen(prog_inst, state)
        # slide in from right
        sl = ease_out(tl2 / 0.35)
        ofs = int((1 - sl) * SCR_W)
        tmp = screen_layer()
        tmp.alpha_composite(scr, (ofs, 0))
        blit_screen(base, tmp)
        target = (SCR[0] + (btn[0] + btn[2]) / 2, SCR[1] + (btn[1] + btn[3]) / 2)
        tap = tap2 if tl < tap2 + 0.6 else tap3
    caption(base, 2, T["s2"], S2 + 0.2, t)
    # finger
    for tp in (tap1, tap2, tap3):
        if tp - 0.7 < tl < tp + 0.6:
            appear = ease_in_out(prog(tl, tp - 0.7, 0.55))
            sx, sy = W - 140, H - 180
            x = sx + (target[0] - sx) * appear
            y = sy + (target[1] - sy) * appear
            press = 1.0 if tp - 0.05 < tl < tp + 0.12 else 0.0
            rip = prog(tl, tp, 0.55) if tl >= tp else 0
            finger(base, x, y, press, rip)
            break


def home_screen(tl):
    scr = vgrad((SCR_W, SCR_H), [(0, (40, 110, 170)), (0.5, (22, 66, 118)), (1, (12, 36, 70))]).convert("RGBA")
    g = Image.new("RGBA", scr.size, (0, 0, 0, 0))
    ImageDraw.Draw(g).ellipse((-100, 300, SCR_W + 100, 1100), fill=GLOW + (60,))
    scr.alpha_composite(g.filter(ImageFilter.GaussianBlur(120)))
    d = ImageDraw.Draw(scr)
    status_bar(d, dark=False)
    # neutral filler icons (rows)
    cols = [(255, 159, 10), (52, 199, 89), (255, 69, 58), (94, 92, 230), (100, 210, 255), (255, 214, 10), (175, 82, 222), (142, 142, 147)]
    size, gap = 128, 34
    x0 = (SCR_W - (4 * size + 3 * gap)) // 2
    y0 = 150
    for i, c in enumerate(cols):
        r, cidx = divmod(i, 4)
        x = x0 + cidx * (size + gap)
        y = y0 + r * (size + 80)
        tile = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        paste_grad_rrect(tile, (0, 0, size, size), 30, [(0, tuple(min(255, v + 30) for v in c)), (1, c)])
        tile.putalpha(tile.getchannel("A").point(lambda v: int(v * 0.55)))
        scr.alpha_composite(tile, (x, y))
    # our two icons drop in, row 3
    row_y = y0 + 2 * (size + 80) + 40
    names = [(T["classic"], APP_ICON, 0.2, False), (T["beta"], APP_ICON, 0.55, True)]
    positions = []
    for idx, (name, src, t0, is_beta) in enumerate(names):
        p = back_out(prog(tl, t0, 0.6), 2.2)
        big = 170
        icon = rounded_icon(src, big)
        if is_beta:
            dd = ImageDraw.Draw(icon)
            dd.rounded_rectangle((big - 92, 8, big - 8, 46), 19, fill=(255, 159, 10))
            dd.text((big - 82, 12), "BETA", font=INTER(24, 850), fill=WHITE)
        cx = SCR_W / 2 + (-150 if idx == 0 else 150)
        cy = row_y + big / 2 - (1 - p) * 500
        if p > 0:
            paste_center(scr, icon, cx, cy, 0.4 + 0.6 * clamp(p), clamp(p * 2))
            f = INTER(30, 650)
            bb = d.textbbox((0, 0), name, font=f)
            d.text((cx - (bb[2] - bb[0]) / 2, row_y + big + 18), name, font=f, fill=(255, 255, 255, int(255 * clamp(p))))
        positions.append((cx, row_y + big / 2))
    return scr, positions


def scene_step3(base, t):
    tl = t - S3
    phone_frame(base)
    scr, pos = home_screen(tl)
    # sparkle on beta icon after landing
    if tl > 1.3:
        sp = prog(tl, 1.3, 0.8)
        spark = Image.new("RGBA", scr.size, (0, 0, 0, 0))
        d = ImageDraw.Draw(spark)
        cx, cy = pos[1]
        for k in range(8):
            ang = k * math.pi / 4
            r0 = 100 + sp * 70
            r1 = r0 + 26
            a = int(255 * (1 - sp))
            d.line((cx + math.cos(ang) * r0, cy + math.sin(ang) * r0, cx + math.cos(ang) * r1, cy + math.sin(ang) * r1), fill=(255, 212, 71, a), width=6)
        scr.alpha_composite(spark)
    app_in = 2.6  # Pidro Beta opens
    plaque_y = None
    if tl >= app_in:
        app, plaque_y = app_screen(tl - app_in)
        sl = ease_out(prog(tl, app_in, 0.35))
        app.putalpha(app.getchannel("A").point(lambda v: int(v * sl)))
        scr = scr.copy()
        scr.alpha_composite(app)
    blit_screen(base, scr)
    caption(base, 3, T["s3"], S3 + 0.2, t)
    for tap, target in ((2.3, pos[1]), (4.0, (SCR_W / 2, plaque_y or 0))):
        if tap - 0.8 < tl < tap + 0.7 and (tap < app_in or plaque_y is not None):
            appear = ease_in_out(prog(tl, tap - 0.8, 0.6))
            tx, ty = SCR[0] + target[0], SCR[1] + target[1]
            sx, sy = W - 140, H - 180
            finger(base, sx + (tx - sx) * appear, sy + (ty - sy) * appear, 1.0 if tap - 0.05 < tl < tap + 0.12 else 0.0, prog(tl, tap, 0.55) if tl >= tap else 0)
            break


def app_screen(tl):
    """Pidro Beta's Home, with the Classic plaque the player taps."""
    scr = vgrad((SCR_W, SCR_H), [(0, FELT_HI), (0.5, FELT), (1, FELT_DEEP)]).convert("RGBA")
    d = ImageDraw.Draw(scr)
    status_bar(d, dark=False)
    logo = scaled(LOGO, (SCR_W - 200) / LOGO.width)
    scr.alpha_composite(logo, ((SCR_W - logo.width) // 2, 120))
    y = 140 + logo.height + 40
    for i in range(2):
        d.rounded_rectangle((48, y + i * 150, SCR_W - 48, y + i * 150 + 120), 28, fill=(30, 74, 120))
    py = y + 330
    box = (40, py, SCR_W - 40, py + 150)
    glow = Image.new("RGBA", scr.size, (0, 0, 0, 0))
    pulse = 0.5 + 0.5 * math.sin(tl * 6)
    ImageDraw.Draw(glow).rounded_rectangle(box, 32, outline=GLOW + (int(120 + 100 * pulse),), width=10)
    scr.alpha_composite(glow.filter(ImageFilter.GaussianBlur(10)))
    d = ImageDraw.Draw(scr)
    d.rounded_rectangle(box, 32, fill=(12, 42, 76), outline=GLOW, width=3)
    ix = box[0] + 24
    d.rounded_rectangle((ix, py + 35, ix + 80, py + 115), 20, fill=(20, 64, 108))
    d.rounded_rectangle((ix + 18, py + 52, ix + 48, py + 96), 6, outline=GLOW, width=4)
    d.rounded_rectangle((ix + 34, py + 46, ix + 64, py + 90), 6, fill=(20, 64, 108), outline=GLOW, width=4)
    tx = ix + 104
    avail = box[2] - tx - 56
    f = INTER(36, 750)
    while d.textlength(T["plaque_q"], font=f) > avail and f.size > 24:
        f = INTER(f.size - 2, 750)
    f2 = INTER(28, 500)
    while d.textlength(T["plaque_sub"], font=f2) > avail and f2.size > 20:
        f2 = INTER(f2.size - 2, 500)
    d.text((tx, py + 34), T["plaque_q"], font=f, fill=WHITE)
    d.text((tx, py + 88), T["plaque_sub"], font=f2, fill=(160, 222, 245))
    d.line((box[2] - 46, py + 60, box[2] - 30, py + 75, box[2] - 46, py + 90), fill=(160, 222, 245), width=5, joint="curve")
    return scr, py + 75


def scene_end(base, t):
    tl = t - S4
    p = back_out(prog(tl, 0.1, 0.8), 1.4)
    fl = math.sin(t * 2.2) * 8
    sh = Image.new("RGBA", base.size, (0, 0, 0, 0))
    ImageDraw.Draw(sh).ellipse((W / 2 - 440, 360, W / 2 + 440, 980), fill=GLOW + (int(80 * clamp(p)),))
    base.alpha_composite(sh.filter(ImageFilter.GaussianBlur(100)))
    paste_center(base, LOGO, W / 2, 660 + fl, 0.6 + 0.4 * clamp(p), clamp(p * 1.5))
    a = ease_out(prog(tl, 0.7, 0.5))
    if a > 0:
        lay = Image.new("RGBA", base.size, (0, 0, 0, 0))
        gold_text(lay, W / 2, 1150 + (1 - a) * 40, T["end1"], 110)
        d = ImageDraw.Draw(lay)
        text_center(d, W / 2, 1520 + (1 - a) * 40, T["end2"], INTER(46, 700), (205, 232, 250, 255))
        lay.putalpha(lay.getchannel("A").point(lambda v: int(v * a)))
        base.alpha_composite(lay)
    # floating card confetti
    rng = np.random.default_rng(7)
    for i in range(14):
        sx = rng.uniform(60, W - 60)
        speed = rng.uniform(120, 260)
        rot0 = rng.uniform(-40, 40)
        y = -160 + (tl - rng.uniform(0, 0.8)) * speed * 1.6
        if -160 < y < H + 160 and tl > 0.4:
            c = Image.new("RGBA", (70, 98), (0, 0, 0, 0))
            back = i % 3 == 0
            if back:
                paste_grad_rrect(c, (0, 0, 70, 98), 9, [(0, FELT_HI), (1, FELT_DEEP)])
                ImageDraw.Draw(c).rounded_rectangle((3, 3, 66, 94), 7, outline=(170, 235, 255, 200), width=3)
            else:
                paste_grad_rrect(c, (0, 0, 70, 98), 9, [(0, WHITE), (1, (238, 240, 246))])
                ImageDraw.Draw(c).text((10, 4), "♥♦♠♣"[i % 4], font=INTER(40, 700), fill=RED if i % 4 < 2 else (20, 20, 30))
            paste_center(base, c, sx + math.sin(tl * 2 + i) * 30, y, 1.0, 0.85, rot0 + tl * rng.uniform(-60, 60))


def transition_whoosh(base, t):
    """Quick card-sweep wipe at scene boundaries."""
    for edge in (S1, S2, S3, S4):
        p = prog(t, edge - 0.18, 0.36)
        if 0 < p < 1:
            lay = Image.new("RGBA", base.size, (0, 0, 0, 0))
            d = ImageDraw.Draw(lay)
            x = -W * 0.6 + p * W * 2.2
            d.polygon([(x, 0), (x + 380, 0), (x + 180, H), (x - 200, H)], fill=RIM + (60,))
            d.polygon([(x + 40, 0), (x + 120, 0), (x - 80, H), (x - 160, H)], fill=(255, 248, 225, 90))
            base.alpha_composite(lay.filter(ImageFilter.GaussianBlur(18)))


def render_frame(i):
    t = i / FPS
    base = BG.copy()
    if t < S1:
        scene_intro(base, t)
    elif t < S2:
        scene_step1(base, t)
    elif t < S3:
        scene_step2(base, t)
    elif t < S4:
        scene_step3(base, t)
    else:
        scene_end(base, t)
    transition_whoosh(base, t)
    # fade in/out
    fade = min(prog(t, 0, 0.35), 1 - prog(t, DUR - 0.6, 0.6))
    if fade < 1:
        black = Image.new("RGBA", base.size, (0, 0, 0, int(255 * (1 - fade))))
        base.alpha_composite(black)
    return base.convert("RGB")


# ---------- audio ----------
SR = 44100


def env(n, a, r):
    e = np.ones(n)
    na, nr = int(a * SR), int(r * SR)
    e[:na] = np.linspace(0, 1, na)
    e[-nr:] = np.linspace(1, 0, nr) ** 2
    return e


def tone(freq, dur, amp=0.2, shape="sine"):
    n = int(dur * SR)
    t = np.arange(n) / SR
    if shape == "sine":
        w = np.sin(2 * np.pi * freq * t)
    else:  # soft pluck-ish: sine + octave, exp decay
        w = (np.sin(2 * np.pi * freq * t) + 0.3 * np.sin(4 * np.pi * freq * t)) * np.exp(-t * 5)
    return w * amp


def mtof(m):
    return 440 * 2 ** ((m - 69) / 12)


def build_audio():
    n = int(DUR * SR)
    mix = np.zeros(n)

    def add(sig, at, gain=1.0):
        s = int(at * SR)
        e = min(n, s + len(sig))
        if s < n:
            mix[s:e] += sig[: e - s] * gain

    # soft pad: Cmaj9 -> Am9 -> Fmaj9 -> G6, warm and quiet
    chords = [[48, 55, 59, 62, 64], [45, 52, 55, 59, 64], [41, 48, 52, 55, 60], [43, 50, 55, 59, 64]]
    bar = 2.75
    for k in range(int(DUR / bar) + 1):
        ch = chords[k % 4]
        for m in ch:
            nd = bar + 0.6
            tt = np.arange(int(nd * SR)) / SR
            lfo = 1 + 0.002 * np.sin(2 * np.pi * 0.3 * tt)
            sig = sum(np.sin(2 * np.pi * mtof(m) * d * lfo * tt) for d in (0.997, 1.0, 1.004)) / 3
            add(sig * env(len(sig), 0.7, 0.9) * 0.028, k * bar)
    # gentle pluck arpeggio from 1s
    arp = [72, 76, 79, 83, 79, 76]
    step = bar / 6
    for k in range(int(DUR / step)):
        t0 = k * step
        if 1.0 < t0 < DUR - 1.5:
            ch = chords[int(t0 / bar) % 4]
            m = ch[k % len(ch)] + 24
            add(tone(mtof(m), 0.9, 0.035, "pluck"), t0)

    def tap(at):
        tt = np.arange(int(0.06 * SR)) / SR
        click = np.sin(2 * np.pi * 1800 * tt) * np.exp(-tt * 90) * 0.18
        add(click, at)
        add(tone(mtof(88), 0.25, 0.05, "pluck"), at)

    def whoosh(at):
        ln = int(0.45 * SR)
        noise = np.random.default_rng(int(at * 100)).normal(0, 1, ln)
        # band-ish: moving average smoothing
        k = 30
        noise = np.convolve(noise, np.ones(k) / k, mode="same")
        e = np.sin(np.linspace(0, np.pi, ln)) ** 2
        add(noise * e * 0.12, at - 0.2)

    def chime(at):
        for m, d in ((84, 0), (88, 0.08), (91, 0.16), (96, 0.26)):
            add(tone(mtof(m), 1.2, 0.05, "pluck"), at + d)

    def card_drop(at):
        tt = np.arange(int(0.12 * SR)) / SR
        thud = np.sin(2 * np.pi * 140 * tt) * np.exp(-tt * 35) * 0.25
        add(thud, at)
        add(tone(mtof(79), 0.5, 0.05, "pluck"), at + 0.02)

    card_drop(0.85)
    for e in (S1, S2, S3, S4):
        whoosh(e)
    tap(S1 + 3.6)
    tap(S2 + 1.3)
    tap(S2 + 2.8)
    tap(S2 + 3.9)
    chime(S2 + 3.9 + 1.25)
    card_drop(S3 + 0.55)
    card_drop(S3 + 0.9)
    tap(S3 + 2.3)
    tap(S3 + 4.0)
    chime(S4 + 0.8)

    # master: gentle fade, normalize to -3 dBFS peak
    fade = np.ones(n)
    fi, fo = int(0.4 * SR), int(1.2 * SR)
    fade[:fi] = np.linspace(0, 1, fi)
    fade[-fo:] = np.linspace(1, 0, fo)
    mix *= fade
    mix /= max(1e-9, np.max(np.abs(mix))) / 0.7
    stereo = np.stack([mix, mix], axis=1)
    path = OUT / f"audio_{LANG}.wav"
    with wave.open(str(path), "wb") as wf:
        wf.setnchannels(2)
        wf.setsampwidth(2)
        wf.setframerate(SR)
        wf.writeframes((stereo * 32767).astype(np.int16).tobytes())
    return path


if __name__ == "__main__":
    only = sys.argv[2] if len(sys.argv) > 2 else None
    if only == "stills":
        for tsec in (1.6, 5.5, 8.9, 11.3, 13.8, 16.2, 17.4, 18.3, 20.5):
            render_frame(int(tsec * FPS)).save(OUT / f"still_{LANG}_{tsec:.1f}.png")
        print("stills written")
        sys.exit(0)
    for i in range(N):
        render_frame(i).save(FRAMES / f"f{i:04d}.png", compress_level=1)
    audio = build_audio()
    mp4 = OUT / f"pidro-beta-ios-{LANG}.mp4"
    subprocess.run(
        [
            "ffmpeg", "-y", "-loglevel", "error",
            "-framerate", str(FPS), "-i", str(FRAMES / "f%04d.png"),
            "-i", str(audio),
            "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "22", "-preset", "slow",
            "-profile:v", "high", "-movflags", "+faststart",
            "-c:a", "aac", "-b:a", "128k", "-shortest", str(mp4),
        ],
        check=True,
    )
    subprocess.run(
        ["ffmpeg", "-y", "-loglevel", "error", "-ss", "1.9", "-i", str(mp4), "-frames:v", "1", "-q:v", "3", str(OUT / f"poster-{LANG}.jpg")],
        check=True,
    )
    print(mp4, mp4.stat().st_size // 1024, "KB")
