import { request } from "src/utils/request";
import type { TimeWindow, TrendingAll } from "types";

export default {
  all: async (time_window: TimeWindow = "day") =>
    await request<TrendingAll>({
      method: "GET",
      url: `/trending/all/${time_window}`,
    }),
  movies: async (time_window: TimeWindow = "day") =>
    await request({ method: "GET", url: `/trending/movie/${time_window}` }),
};
