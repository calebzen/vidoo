import { Router } from "express";
import { createRequest } from "src/utils";

const router = Router();

const request = createRequest({ prefix: "/tv" });

router.get("/:id", async (req, res) => {
  const seriesId = req.params.id;
  res.json(await request({ method: "GET", url: `/${seriesId}` }));
});

router.get("/:id/credits", async (req, res) => {
  const seriesId = req.params.id;
  res.json(await request({ method: "GET", url: `/${seriesId}/credits` }));
});

router.get("/:id/external_ids", async (req, res) => {
  const seriesId = req.params.id;
  res.json(await request({ method: "GET", url: `/${seriesId}/external_ids` }));
});

router.get("/:id/similar", async (req, res) => {
  const seriesId = req.params.id;
  res.json(
    await request({ method: "GET", url: `/${seriesId}/similar`, params: {} })
  );
});

export default router;
