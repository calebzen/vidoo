import { Router } from "express";
import { createRequest } from "src/utils";

const router = Router();

const request = createRequest({ prefix: "/genre" });

router.get("/movie/list", async (req, res) => {
  const { language } = req.query;
  res.json(
    await request({
      method: "GET",
      url: `/movie/list`,
      params: { language },
    })
  );
});

router.get("/tv/list", async (req, res) => {
  const { language } = req.query;
  res.json(
    await request({ method: "GET", url: `/tv/list`, params: { language } })
  );
});

export default router;
