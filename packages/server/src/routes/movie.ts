import axios from "axios";
import { Router } from "express";

const router: Router = Router();

router.get("", async (req, res) => {
	const config = {
		method: "GET",
		url: `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${process.env.API_KEY}`,
		headers: {
			accept: "application/json",
		},
	};
	try {
		res.json(await axios.request({ ...config, withCredentials: true, withXSRFToken: true }));
	} catch (err) {
		res.status(500).json(err);
	}
});

export default router;
