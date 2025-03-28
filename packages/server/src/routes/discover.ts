import { Router } from "express";
import { createRequest, extractQuery } from "src/utils";

const router = Router();

const request = createRequest({ prefix: "/discover" });

router.get("/movie", async (req, res) => {
  const params = extractQuery(req);
  const { with_genres } = req.query;
  res.json(
    await request({
      method: "GET",
      url: `/movie`,
      params: { ...params, with_genres },
    })
  );
});

router.get("/tv", async (req, res) => {
  const params = extractQuery(req);
  const { with_genres } = req.query;
  res.json(
    await request({
      method: "GET",
      url: `/tv`,
      params: { ...params, with_genres },
    })
  );
});

export default router;
