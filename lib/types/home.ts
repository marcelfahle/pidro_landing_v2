export type HomePageProps = {
  data: {
    home: {
      intro: string;
      appStoreUrl: string;
      playStoreUrl: string;
      macStoreUrl: string;
      socialShareUrl: string;
      screenshots: Array<{ url: string }>;
      seo: Array<{
        attributes: Record<string, any> | null;
        content: string | null;
        tag: string;
      }>;
    };
    socialMediaSetting: {
      sharingUrl: string;
      twitterTitle: string;
      twitterVia: string;
      facebookShareTitle: string;
      facebookShareHashtag: string;
      whatsappTitle: string;
      linkedinDescription: string;
      linkedinTitle: string;
      eMailBody: string;
      eMailSubject: string;
    };
  };
};
