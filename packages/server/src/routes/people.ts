import { Router } from "express";
import { createRequest } from "src/utils";

const router = Router();

const request = createRequest({ prefix: "/people" });

router.get("/:id", async (req, res) => {
  const personId = req.params.id;
  const { language, append_to_response } = req.query;
  res.json(
    await request({
      method: "GET",
      url: `/${personId}`,
      params: { language, append_to_response },
    })
  );
});

export default router;
