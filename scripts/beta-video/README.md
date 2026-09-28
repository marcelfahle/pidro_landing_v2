# Beta install video

Renders `public/beta/pidro-beta-ios-{en,sv}.mp4` and their posters: frames with Pillow, a
synthesized soundtrack and effects with numpy, muxed with ffmpeg. No licensed media.

```bash
python3 -m venv .venv && .venv/bin/pip install pillow numpy
mkdir fonts
curl -L -o fonts/BreeSerif.ttf https://github.com/google/fonts/raw/main/ofl/breeserif/BreeSerif-Regular.ttf
curl -L -o fonts/Inter.ttf "https://github.com/google/fonts/raw/main/ofl/inter/Inter%5Bopsz,wght%5D.ttf"
cp ../../public/logo-v3.png .            # new logo
cp <pidro_frontend>/packages/mobile/assets/icon.png app-icon.png
.venv/bin/python render.py en            # or: sv;  add "stills" to render sample frames only
```

Copy is in the `T` dictionary at the top of `render.py`.
