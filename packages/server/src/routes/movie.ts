import { Router } from "express";
import { createRequest, extractQuery } from "src/utils";

const router = Router();
const request = createRequest({ prefix: "/movie" });

router.get("/now_playing", async (req, res) => {
  const { language, page, region } = req.query;
  res.json(
    await request({
      method: "GET",
      url: `now_playing`,
      params: { language, page, region },
    })
  );
});

router.get("/popular", async (req, res) => {
  const params = extractQuery(req);
  res.json(await request({ method: "GET", url: `/popular`, params }));
});

router.get("/top_rated", async (req, res) => {
  const params = extractQuery(req);
  res.json(await request({ method: "GET", url: `/top_rated`, params }));
});

router.get("/upcoming", async (req, res) => {
  const params = extractQuery(req);
  res.json(await request({ method: "GET", url: `/top_rated`, params }));
});

router.get("/:id", async (req, res) => {
  const movieId = req.params.id;
  const { append_to_response, language } = req.query;
  res.json(
    await request({
      method: "GET",
      url: `/${movieId}`,
      params: { append_to_response, language },
    })
  );
});

router.get("/:id/images", async (req, res) => {
  const movieId = req.params.id;
  const { include_image_language, language } = req.query;
  res.json(
    await request({
      method: "GET",
      url: `/${movieId}/images`,
      params: { include_image_language, language },
    })
  );
});

router.get("/:id/reviews", async (req, res) => {
  const movieId = req.params.id;
  const params = extractQuery(req);
  res.json(
    await request({ method: "GET", url: `/${movieId}/reviews`, params })
  );
});

router.get("/:id/similar", async (req, res) => {
  const movieId = req.params.id;
  const params = extractQuery(req);
  res.json(
    await request({ method: "GET", url: `/${movieId}/similar`, params })
  );
});

router.get("/:id/videos", async (req, res) => {
  const movieId = req.params.id;
  const params = extractQuery(req);
  res.json(await request({ method: "GET", url: `/${movieId}/videos`, params }));
});

router.get("/:id/watch/providers", async (req, res) => {
  const movieId = req.params.id;
  res.json(
    await request({
      method: "GET",
      url: `/${movieId}/watch/providers`,
      params: {},
    })
  );
});

router.get("/:id/credits", async (req, res) => {
  const movieId = req.params.id;
  const params = extractQuery(req);
  res.json(
    await request({ method: "GET", url: `/${movieId}/credits`, params })
  );
});

router.get("/:id/external_ids", async (req, res) => {
  const movieId = req.params.id;
  res.json(await request({ method: "GET", url: `/${movieId}/external_ids` }));
});

export default router;
