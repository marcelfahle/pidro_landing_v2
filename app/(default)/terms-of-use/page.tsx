import type { Metadata } from "next";
import Link from "next/link";

// The app's age screen ("By continuing you agree") and Settings link here.
// Keep the age, ads and table-talk rules in step with the app (PID-443).

export const metadata: Metadata = {
  title: "Terms of Use | Pidro",
  description: "The terms for playing Pidro, by Oneapps Ab Oy.",
};

const PROSE = `mx-auto max-w-[640px]
  prose prose-invert lg:prose-xl
  prose-p:text-gray-200
  prose-headings:text-[#ffe230]
  prose-ul:list-disc prose-ol:list-decimal
  prose-li:marker:text-gray-400
  prose-strong:text-gray-100
  prose-a:text-[#ffe230] hover:prose-a:text-yellow-300`;

const CONTACT = "marcel@pidro.online";

export default function TermsOfUsePage() {
  return (
    <div className="mx-auto font-sans py-8 px-4">
      <h1 className="text-5xl font-bold text-[#ffe230] mt-6 mb-8 text-center">
        Terms of Use
      </h1>
      <div className={PROSE}>
        <p>
          <em>Last updated 22 November 2026.</em>
        </p>
        <p>
          We are <strong>Oneapps Ab Oy</strong>, a company governed by Finnish
          law, with registered address Torparvägen 15, 64200 Närpes, Finland
          (&ldquo;Oneapps&rdquo;, &ldquo;we&rdquo; or &ldquo;us&rdquo;). We
          develop and publish Pidro and other games and apps, available in app
          stores including the Apple App Store and Google Play (our
          &ldquo;Games&rdquo;, together with our websites the
          &ldquo;Services&rdquo;).
        </p>
        <p>
          To use the Services you must agree to these Terms of Use (the
          &ldquo;Agreement&rdquo;). By using or accessing the Services, you
          agree to the Agreement. If you do not agree, you may not use or
          access the Services. Unless a Service says otherwise, the Services
          are free to download and use but may offer purchases.
        </p>

        <h2>1. About</h2>
        <p>
          By downloading one of our Games, you accept this Agreement and our{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>. Your relationship with
          Oneapps is governed by these two documents only. Both are available
          at pidro.online/terms-of-use and pidro.online/privacy-policy.
        </p>
        <p>
          Each time you download one of our Games, a new Agreement is
          concluded and its terms apply to your use of that Game. App stores
          and platforms may have their own terms that apply to your
          relationship with them.
        </p>
        <p>
          <strong>You must be 13 years or older to use the Services.</strong>{" "}
          If you are under 18, you may use the Services only if your parent or
          legal guardian has reviewed this Agreement and allows you to play
          under it. Oneapps may ask for reasonable proof of your age, and of a
          parent&apos;s or guardian&apos;s consent, at any time.
        </p>
        <p>
          You use our Games as a private person. Commercial use of our Games
          is not allowed unless we have agreed to it separately.
        </p>

        <h2>2. End-user license</h2>
        <h3>2.1 License</h3>
        <p>
          Subject to this Agreement, Oneapps grants you a non-transferable,
          non-exclusive license to (a) use each Game for your personal use, and
          (b) copy it for the purpose of downloading, installing and running it
          on a mobile device that you own or control, as many times as the
          download site allows (the &ldquo;License&rdquo;).
        </p>
        <h3>2.2 Restrictions</h3>
        <p>The rights granted to you are subject to these restrictions:</p>
        <ol type="a">
          <li>
            you shall not license, sell, rent, lease, transfer, assign,
            distribute, host or otherwise commercially exploit any Game;
          </li>
          <li>
            you shall not modify, translate, adapt, merge, make derivative works
            of, disassemble, decompile, reverse compile or reverse engineer any
            part of a Game, except to the extent applicable law expressly
            allows it;
          </li>
          <li>
            you shall not access any Game in order to build a similar or
            competing service;
          </li>
          <li>
            except as expressly stated here, no part of any Game may be copied,
            reproduced, distributed, republished, downloaded, displayed, posted
            or transmitted in any form or by any means; and
          </li>
          <li>
            you shall not remove or destroy any copyright notices or other
            proprietary markings in any Game.
          </li>
        </ol>
        <p>
          Any future release, update or addition to a Game (including in-app
          purchases and new features) is subject to this Agreement unless it
          comes with its own terms. All copyright and other proprietary notices
          on any Game content must be kept on any copies.
        </p>
        <h3>2.3 Local laws</h3>
        <p>
          You are responsible for complying with all laws that apply to you,
          including export and import regulations.
        </p>
        <h3>2.4 Changes to the Games</h3>
        <p>
          Oneapps may at any time modify, suspend or discontinue the Games or
          any part of them, with or without notice. Oneapps is not liable to
          you or any third party for doing so, except as mandatory law
          requires.
        </p>
        <h3>2.5 Ownership</h3>
        <p>
          Games are licensed to you, not sold. Oneapps (and its licensors,
          where applicable) own all right, title and interest, including all
          intellectual property rights, in and to the Games, excluding your
          User Content (defined below). This Agreement gives you no ownership
          rights in any Game. The Oneapps and Pidro names, logos and product
          names belong to Oneapps (or its licensors), and no right to use them
          is granted. Oneapps reserves all rights not granted in this
          Agreement.
        </p>
        <h3>2.6 Ads</h3>
        <p>
          Pidro may offer rewarded video ads: you choose to watch an ad, for
          example to play another solo game. Ads are offered only to players
          aged 18 or over without Premium. Pidro does not show banners or ads
          that interrupt a game.
        </p>
        <h3>2.7 Computer players</h3>
        <p>
          Some seats may be played by computer players (bots). They are marked
          as bots at the table.
        </p>

        <h2>3. User Content and conduct</h2>
        <p>
          &ldquo;User Content&rdquo; means anything you upload, send or
          otherwise provide through a Game, such as your player name, profile
          photo, bio and messages at the table. You are solely responsible for
          your User Content and the risks that come with it, including others
          relying on it or it making you or someone else identifiable. You
          promise that your User Content follows the Acceptable Use Policy
          below.
        </p>
        <p>
          You may not state or imply that your User Content is provided,
          sponsored or endorsed by Oneapps. Oneapps is not obliged to back up
          User Content, and User Content may be deleted at any time.
        </p>
        <h3>3.1 License</h3>
        <p>
          By sending or using your User Content in a Game, you grant Oneapps a
          non-exclusive, royalty-free, worldwide license, with the right to
          sublicense, to reproduce, distribute, publicly display and otherwise
          use your User Content, solely to show it in the Games and run the
          Services. You confirm that you have the right to grant this license.
        </p>
        <h3>3.2 Feedback</h3>
        <p>
          If you send Oneapps feedback or suggestions (&ldquo;Feedback&rdquo;),
          you assign Oneapps all rights in the Feedback, and Oneapps may use it
          in any way it sees fit. Oneapps treats Feedback as non-confidential.
          Please don&apos;t send us information or ideas you consider
          confidential.
        </p>
        <h3>3.3 Acceptable Use Policy</h3>
        <p>You agree not to use any Game to send or use User Content that:</p>
        <ol type="a">
          <li>
            violates any third-party right, including copyright, trademark,
            privacy or publicity rights, or other intellectual property rights;
          </li>
          <li>is defamatory, false or intentionally misleading;</li>
          <li>
            is harassing, abusive, threatening, hateful, vulgar, obscene or
            sexual, or promotes violence, racism or discrimination against any
            group or person;
          </li>
          <li>is harmful to minors in any way;</li>
          <li>
            is advertising, spam, chain letters or other unsolicited messages;
            or
          </li>
          <li>violates any law, regulation or contractual obligation.</li>
        </ol>
        <p>You also agree not to:</p>
        <ol type="a">
          <li>
            upload or spread viruses or other code meant to damage or alter a
            computer system or data;
          </li>
          <li>
            collect information about other players, including email addresses,
            without their consent, for example with bots or scrapers;
          </li>
          <li>
            disable, overload or interfere with servers or networks connected to
            the Games;
          </li>
          <li>
            try to gain unauthorised access to the Games, our servers or
            networks, or other players&apos; accounts;
          </li>
          <li>
            cheat, for example by sharing cards with other players outside the
            game, using software that plays for you, or deliberately losing to
            help someone else; or
          </li>
          <li>interfere with another player&apos;s use and enjoyment of a Game.</li>
        </ol>
        <h3>3.4 Table talk</h3>
        <p>
          At the table, every player can send faces and preset words. Registered
          players aged 18 or over can also type short messages. Be kind: this is
          a game many people play with friends and family. Don&apos;t share
          personal details such as phone numbers or addresses, and don&apos;t
          ask others for theirs.
        </p>
        <p>
          You can block any player, and report a player from their profile at
          the table. We review reports. Typed messages are not stored, except
          the reported player&apos;s recent messages, which are attached to a
          report so that we can review it.
        </p>
        <h3>3.5 Enforcement</h3>
        <p>
          We may, but are not obliged to, review User Content. We may remove or
          change your User Content, including your player name, photo or bio,
          and take away your access to typed table talk, if we believe it
          breaks this Agreement. Serious or repeated breaches may lead to
          suspension under section 4.
        </p>

        <h2>4. Term and termination</h2>
        <p>4.1 This Agreement runs for an indefinite term.</p>
        <p>
          4.2 Either party may end this Agreement at any time by giving 14
          days&apos; notice in writing or by email. You can also end it with
          immediate effect by deleting your account in the app, or by deleting
          the Game from your device.
        </p>
        <p>
          4.3 If we have reasonable grounds to believe that you are in material
          breach of this Agreement, we may suspend your access to a Game or end
          this Agreement. A breach of section 2 or 3 is a material breach.
        </p>
        <p>
          4.4 Either party may end this Agreement for cause without notice.
          Cause includes a material breach of this Agreement.
        </p>
        <p>
          4.5 When this Agreement ends, you can no longer access the Game it
          covers, and your progress and other game data may be deleted. As long
          as Oneapps runs the Game, you may download it again and a new
          Agreement starts, but deleted game data cannot be restored.
        </p>
        <p>
          4.6 We may (a) suspend your right to use any Game or related service,
          or (b) end this Agreement, if we in good faith believe you have broken
          the Acceptable Use Policy or another part of this Agreement. Oneapps
          may also end this Agreement with any user who repeatedly infringes
          third-party copyright, after notice from the copyright owner or their
          agent.
        </p>
        <p>
          4.7 When this Agreement ends, your right to use the Game ends
          immediately, and your User Content may be deleted from our live
          databases. Except as mandatory law requires, Oneapps is not liable to
          you for ending this Agreement, including deleting your User Content.
          Sections 2.2 to 2.5, 3, 4.4, 5, 6, 7, 8, 9, 10 and 11 remain in
          effect after this Agreement ends.
        </p>

        <h2>5. Indemnity</h2>
        <p>
          You agree to defend, indemnify and hold harmless Oneapps (and its
          suppliers) from claims, losses, damages, liabilities, costs and
          expenses (including reasonable lawyers&apos; fees) brought by third
          parties that result from (1) your use of any Game, (2) your User
          Content, or (3) your breach of this Agreement. Oneapps may, at your
          expense, take over the defence of any such matter, and you agree to
          cooperate. You agree not to settle any such matter without Oneapps&apos;
          prior written consent. Oneapps will make reasonable efforts to tell you
          about any such claim when it learns of it.
        </p>

        <h2>6. Third parties</h2>
        <h3>6.1 App stores</h3>
        <p>
          The availability of a Game depends on the store you got it from, such
          as the Apple App Store or Google Play (the &ldquo;App Store&rdquo;).
          This Agreement is between you and Oneapps, not the App Store. The App
          Store is not responsible for the Game, its content, maintenance,
          support or warranty, or for claims about it (such as product
          liability, legal compliance or intellectual property infringement).
          You agree to pay all fees the App Store charges for the Game, if any,
          and to follow the App Store&apos;s terms when using a Game. The App
          Store and its subsidiaries are third-party beneficiaries of this
          Agreement and may enforce it.
        </p>
        <h3>6.2 Third-party services</h3>
        <p>
          A Game may let you use third-party services, such as signing in with
          Apple or Facebook. When you do, Oneapps shares information with that
          service as described in the Privacy Policy. Oneapps does not control
          and is not responsible for third-party services, and their own terms
          and privacy policies apply. You use them at your own risk.
        </p>
        <h3>6.3 Other players</h3>
        <p>
          A Game contains User Content from other players. Oneapps does not
          control it and is not responsible for it, though we act on reports
          as described in section 3.4. Your dealings with other players are
          between you and them.
        </p>
        <h3>6.4 Release</h3>
        <p>
          To the extent the law allows, you release Oneapps (and its suppliers)
          from all claims relating to any third-party service, other players,
          or third-party advertisers.
        </p>

        <h2>7. Disclaimers</h2>
        <p>
          7.1 Games are provided &ldquo;as is&rdquo; and &ldquo;as
          available&rdquo;. Oneapps (and its suppliers) disclaim all warranties
          and conditions of any kind, express or implied, including
          merchantability, fitness for a particular purpose, title, quiet
          enjoyment, accuracy and non-infringement. Oneapps (and its suppliers)
          do not warrant that any Game (A) will meet your requirements, (B) will
          be available without interruption, on time, securely or without
          errors, or (C) will be accurate, reliable, complete, legal or safe.
        </p>
        <p>
          7.2 Some jurisdictions do not allow the exclusion of implied
          warranties, so the above may not apply to you. Nothing in this
          Agreement limits your rights as a consumer under mandatory law.
        </p>

        <h2>8. Limitation of liability</h2>
        <p>
          8.1 To the extent the law allows, Oneapps (and its suppliers) are not
          liable to you or any third party for lost profits or any indirect,
          consequential, exemplary, incidental, special or punitive damages
          arising from this Agreement, Oneapps&apos; privacy practices or any
          Game, even if Oneapps was told such damages were possible. You access
          and use the Games at your own risk and are responsible for any damage
          to your device or loss of data that results. Oneapps&apos; total
          liability to you, for any cause, is limited to the amount you paid
          Oneapps in the 12 months before the claim, if any. Oneapps&apos;
          suppliers have no liability arising from this Agreement.
        </p>
        <p>
          8.2 Some jurisdictions do not allow the limitation or exclusion of
          liability for incidental or consequential damages, so the above may
          not apply to you, and you may have other rights that vary by
          jurisdiction.
        </p>

        <h2>9. Purchases</h2>
        <h3>9.1 In-app purchases</h3>
        <p>
          Oneapps may license you virtual items for use in the Services, which
          you may buy or earn by playing (&ldquo;Virtual Items&rdquo;). Virtual
          Items are licensed to you on a limited, personal, non-transferable,
          non-sublicensable and revocable basis, for non-commercial use only.
          Oneapps may manage, change or remove Virtual Items at any time. You
          may not transfer Virtual Items unless the Services expressly allow
          it. Virtual Items have no value in real money and cannot be exchanged
          for anything of value. Prices and availability may change.
        </p>
        <p>
          Subject to mandatory law, purchases of Virtual Items are final. The
          Virtual Items are provided immediately on purchase, and you agree
          that you lose your right of withdrawal once they are provided.
          Subject to mandatory law, Oneapps does not refund unused Virtual
          Items, including when you delete your account or stop using the Game.
          If you ask us to erase your personal data, you permanently lose your
          Virtual Items, because we can no longer link them to you.
        </p>
        <h3>9.2 Subscriptions</h3>
        <p>
          Some parts of the Services, such as Premium, are offered as
          subscriptions (&ldquo;Subscriptions&rdquo;) for a period and price
          shown in the Game. Payment is taken from your Apple or Google Play
          account when you confirm the purchase.
        </p>
        <p>
          If an offer includes a free trial, its length is shown in the offer.
          The subscription starts when you start the trial, and you are charged
          when the trial ends unless you cancel before then in your Apple or
          Google Play account settings.
        </p>
        <p>
          Subscriptions renew automatically unless you turn off renewal at least
          24 hours before the end of the current period. Your account is charged
          for renewal within 24 hours before the current period ends. If the
          payment fails, the subscription may end. You can manage the
          subscription and turn off renewal at any time in your Apple or Google
          Play account settings; the current period then runs to its end.
        </p>
        <p>
          Except as required by law, subscription fees are non-refundable.
          Oneapps may change the subscription price. A change takes effect from
          the next period, and you will be told about it in advance as the App
          Store requires. If you do not accept the new price, the subscription
          ends at the end of the current period.
        </p>
        <p>
          Apple or Google handles all billing, under their terms. For payment
          problems or refunds, contact Apple or Google directly.
        </p>

        <h2>10. General</h2>
        <h3>10.1 Changes to this Agreement</h3>
        <p>
          We may change this Agreement from time to time. If we make
          substantial changes, we will tell you in the Game or on our website.
          Changes take effect 30 days after we give notice, and immediately for
          new players. If you keep playing after that, you accept the changes.
          The date of the latest change is shown at the top of this page.
        </p>
        <h3>10.2 Contact and notices</h3>
        <p>
          Questions, complaints, claims and notices about the Services go to
          Oneapps Ab Oy, Torparvägen 15, 64200 Närpes, Finland, or{" "}
          <a href={`mailto:${CONTACT}`}>{CONTACT}</a>.
        </p>
        <h3>10.3 Severability</h3>
        <p>
          If any part of this Agreement is held invalid or unenforceable, the
          rest stays in effect, and the invalid part is treated as changed so
          far as needed to make it valid and enforceable.
        </p>
        <h3>10.4 Entire agreement</h3>
        <p>
          This Agreement, with the Privacy Policy, is the whole agreement
          between you and Oneapps about the Games, and replaces earlier
          agreements on the same subject. If we don&apos;t enforce a right, we
          don&apos;t waive it. Section titles are for convenience only.
          &ldquo;Including&rdquo; means &ldquo;including without
          limitation&rdquo;. You may not assign this Agreement without our
          written consent. Oneapps may assign it as part of a merger,
          acquisition, reorganisation or sale of assets, and it then binds the
          new party.
        </p>
        <h3>10.5 Governing law</h3>
        <p>
          This Agreement is governed by Finnish law. If you are a consumer, you
          also keep the protection of the mandatory laws of the country where
          you live, and you may bring a claim in the courts there.
        </p>

        <h2>11. Additional terms for the Apple App Store</h2>
        <p>
          These terms apply if you got a Game from the Apple App Store. Where
          they are stricter than, or conflict with, the rest of this Agreement,
          this section 11 applies, but only to Games from the Apple App Store.
        </p>
        <p>
          11.1 <strong>Acknowledgement.</strong> This Agreement is between you
          and Oneapps only, not Apple. Oneapps, not Apple, is solely responsible
          for the Game and its content. Where this Agreement is less strict
          than, or conflicts with, the Usage Rules in the App Store Terms of
          Service, the Apple terms apply.
        </p>
        <p>
          11.2 <strong>Scope of license.</strong> The license for the Game is a
          non-transferable license to use it on an Apple device that you own or
          control, as the Usage Rules in the App Store Terms of Service allow.
        </p>
        <p>
          11.3 <strong>Maintenance and support.</strong> Oneapps alone is
          responsible for any maintenance and support of the Game, as stated in
          this Agreement or required by law. Apple has no obligation to provide
          any maintenance or support for the Game.
        </p>
        <p>
          11.4 <strong>Warranty.</strong> Oneapps alone is responsible for any
          product warranties, express or implied by law, to the extent not
          effectively disclaimed. If the Game fails to conform to any
          applicable warranty, you may notify Apple, and Apple may refund the
          purchase price of the Game to you. To the extent the law allows,
          Apple has no other warranty obligation for the Game, and any other
          claims, losses, liabilities, damages, costs or expenses arising from a
          failure to conform to a warranty are Oneapps&apos; responsibility.
        </p>
        <p>
          11.5 <strong>Product claims.</strong> Oneapps, not Apple, is
          responsible for addressing any claims by you or a third party about
          the Game or your possession or use of it, including (1) product
          liability claims, (2) claims that the Game fails to meet a legal or
          regulatory requirement, and (3) claims under consumer protection or
          similar laws.
        </p>
        <p>
          11.6 <strong>Intellectual property.</strong> If a third party claims
          that the Game or your possession and use of it infringes their
          intellectual property rights, Oneapps, not Apple, is solely
          responsible for investigating, defending, settling and discharging the
          claim.
        </p>
        <p>
          11.7 <strong>Legal compliance.</strong> You confirm that (1) you are
          not located in a country subject to a U.S. Government embargo or
          designated by the U.S. Government as a &ldquo;terrorist
          supporting&rdquo; country, and (2) you are not on any U.S. Government
          list of prohibited or restricted parties.
        </p>
        <p>
          11.8 <strong>Developer name and address.</strong> Questions,
          complaints or claims about the Game go to Oneapps at the address in
          section 10.2.
        </p>
        <p>
          11.9 <strong>Third-party terms.</strong> You must follow applicable
          third-party terms when using a Game.
        </p>
        <p>
          11.10 <strong>Third-party beneficiary.</strong> Apple and its
          subsidiaries are third-party beneficiaries of this Agreement. Once you
          accept it, Apple has the right (and is deemed to have accepted the
          right) to enforce it against you as a third-party beneficiary.
        </p>
      </div>
    </div>
  );
}
