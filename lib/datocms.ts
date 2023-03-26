import { GraphQLClient } from "graphql-request";
type Request = {
  query: string;
  variables?: any;
  includeDrafts?: boolean;
  excludeInvalid?: boolean;
};
export function request({
  query,
  variables,
  includeDrafts,
  excludeInvalid,
}: Request) {
  const headers: any = {
    authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,
  };
  if (includeDrafts) {
    headers["X-Include-Drafts"] = "true";
  }
  if (excludeInvalid) {
    headers["X-Exclude-Invalid"] = "true";
  }
  const client = new GraphQLClient("https://graphql.datocms.com", { headers });
  return client.request(query, variables);
}
