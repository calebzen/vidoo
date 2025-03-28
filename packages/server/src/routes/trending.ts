import { Router } from "express";
import { createRequest, extractQuery } from "src/utils";

const router = Router();

const request = createRequest({ prefix: "/trending" });

router.get("/all/:time_window", async (req, res) => {
  const timeWindow = req.params.time_window;
  const params = extractQuery(req);
  res.json(
    await request({
      method: "GET",
      url: `/all/${timeWindow}`,
      params,
    })
  );
});

router.get("/movie/:time_window", async (req, res) => {
  const timeWindow = req.params.time_window;
  const params = extractQuery(req);
  res.json(
    await request({
      method: "GET",
      url: `/movie/${timeWindow}`,
      params,
    })
  );
});

router.get("/tv/:time_window", async (req, res) => {
  const timeWindow = req.params.time_window;
  const params = extractQuery(req);
  res.json(
    await request({
      method: "GET",
      url: `/tv/${timeWindow}`,
      params,
    })
  );
});

export default router;
