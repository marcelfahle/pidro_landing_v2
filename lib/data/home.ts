const HOMEPAGE_QUERY = `{
  home {
    intro
    appStoreUrl
    playStoreUrl
    macStoreUrl
    socialShareUrl
    screenshots {
      url
    }
    seo: _seoMetaTags {
      attributes
      content
      tag
    }
  }
  socialMediaSetting {
    sharingUrl
    twitterTitle
    twitterVia
    facebookShareTitle
    facebookShareHashtag
    whatsappTitle
    linkedinDescription
    linkedinTitle
    eMailBody
    eMailSubject
  }
}`;

export async function getHomeData() {
  const token = process.env.NEXT_DATOCMS_API_TOKEN;

  if (!token) {
    throw new Error(
      "NEXT_DATOCMS_API_TOKEN is not set in environment variables",
    );
  }

  try {
    const res = await fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: HOMEPAGE_QUERY,
      }),
      next: { revalidate: 60 }, // Cache for 1 minute
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("DatoCMS API error:", error);
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();

    if (json.errors) {
      console.error("DatoCMS GraphQL errors:", json.errors);
      throw new Error("GraphQL query failed");
    }

    // TODO: Add proper typing here, maybe import HomePageProps and cast?
    return json.data;
  } catch (error) {
    console.error("Error fetching data from DatoCMS:", error);
    throw error;
  }
}
