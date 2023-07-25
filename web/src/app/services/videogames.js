import { API_URL, STRAPI_URL } from "../config";

export async function getGames({ page = 1 }) {
  const res = await fetch(
    `${API_URL}/videogames?populate[platforms][fields][0]=name&populate[cover][fields][0]=url&pagination[page]=${page}&pagination[pageSize]=1`
  );
  if (!res.ok) {
    throw new Error("Something went wrong!");
  }

  const { data, meta } = await res.json();
  const { pagination } = meta;
  // FIXME: data mapping
  return { data, pagination };
}

// FIXME: Videgame model
export function getCoverageImage({ attributes }) {
  const { url } = attributes.cover.data.attributes;
  return `${STRAPI_URL}${url}`;
}
