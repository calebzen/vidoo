import type {
  Response,
  ResponseWithPage,
  Movie,
  BaseParamWithPage,
  UpcomingResponse,
  BaseParam,
  Video,
  MovieDetails,
} from "types";
import { request } from "src/utils/request";

export default {
  nowPlaying: async () =>
    await request({ method: "GET", url: `/movie/now_playing` }),
  /** 按受欢迎程度排序后的电影列表 */
  popular: async (params?: BaseParamWithPage) =>
    await request<ResponseWithPage<Movie[]>>({
      method: "GET",
      url: `/movie/popular`,
      params: { page: 1, ...params },
    }),
  /** 按评级排序后的电影列表 */
  topRated: async (params?: BaseParamWithPage) =>
    await request<ResponseWithPage<Movie[]>>({
      method: "GET",
      url: `/movie/top_rated`,
      params,
    }),
  /** 即将上映的电影列表 */
  upcoming: async (params?: BaseParamWithPage) =>
    await request<UpcomingResponse<Movie[]>>({
      method: "GET",
      url: `/movie/upcoming`,
      params,
    }),
  /** 电影视频的提供商 */
  videos: async (movieId: string, params?: Pick<BaseParam, "language">) =>
    await request<Response<Video[]>>({
      method: "GET",
      url: `/movie/${movieId}/videos`,
      params,
    }),
  /** 电影的详细信息 */
  details: async (
    movieId: string,
    params?: Pick<BaseParam, "language"> & { append_to_response: string }
  ) =>
    await request<MovieDetails>({
      method: "GET",
      url: `/movie/${movieId}`,
      params,
    }),
  /** 团队信息 */
  credits: async (movieId: string) =>
    await request({
      method: "GET",
      url: `/movie/${movieId}/credits`,
    }),
  /** 资源提供商 */
  watchProviders: async (movieId: string) =>
    await request({ method: "GET", url: `/movie/${movieId}/watch/providers` }),
  /** 电影的社交媒体信息 */
  externalIds: async (movieId: string) =>
    await request({
      method: "GET",
      url: `/movie/${movieId}/external_ids`,
      params: {},
    }),

  similar: async (movieId: string) =>
    await request({
      method: "GET",
      url: `/movie/${movieId}/similar`,
      params: {},
    }),
};
