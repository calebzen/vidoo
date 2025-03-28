import { Router } from "express";
import puppeteer from "puppeteer";

const router = Router();

router.get("/extract", async (req, res) => {
  const { url } = req.query;
  if (!url) {
    res.status(400).json({ error: "Missing URL" });
    return;
  }

  try {
    const browser = await puppeteer.launch({
      executablePath:
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      headless: true,
    });

    const page = await browser.newPage();
    let videoUrl: string | null = null;

    // 监听 XHR 请求，找到 M3U8 视频地址
    page.on("response", async (response) => {
      const requestUrl = response.url();
      if (requestUrl.includes(".m3u8")) {
        videoUrl = requestUrl;
      }
    });

    await page.goto(url as string, { waitUntil: "networkidle2" });

    if (!videoUrl) {
      videoUrl = (await page.evaluate(() => {
        const videoTag = document.querySelector("video") as HTMLVideoElement;
        return videoTag
          ? videoTag.src || videoTag.querySelector("source")?.src
          : null;
      })) as string;
    }

    await browser.close();

    if (!videoUrl) {
      res.status(404).json({ error: "M3U8 not found" });
    } else {
      res.json({ m3u8: videoUrl });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Server Error" });
  }
});

export default router;
