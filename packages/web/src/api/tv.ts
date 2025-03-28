import { request } from "../utils/request";

export default {
  airingToday: async (page = 1) =>
    await request({ method: "GET", url: `/tv/airing_today`, params: { page } }),
  details: async (seriesId: string) =>
    await request({
      method: "GET",
      url: `/tv/${seriesId}`,
      params: {},
    }),
  credits: async (seriesId: string) =>
    await request({
      method: "GET",
      url: `/tv/${seriesId}/credits`,
    }),
  externalIds: async (seriesId: string) =>
    await request({
      method: "GET",
      url: `/tv/${seriesId}/external_ids`,
      params: {},
    }),

  similar: async (seriesId: string) =>
    await request({
      method: "GET",
      url: `/tv/${seriesId}/similar`,
      params: {},
    }),
};
