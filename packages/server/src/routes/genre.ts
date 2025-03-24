import axios from "axios";
import { Router } from "express";

const router: Router = Router();

router.get("/movie/list", async (req, res) => {
	console.log(process.env.API_KEY);
	const options = {
		method: "GET",
		url: `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`,
		headers: {
			accept: "application/json",
		},
	};

	try {
		const response = await axios.request({
			...options,
		});
		res.json(response.data);
	} catch (err) {
		console.error(err);
		res.status(500).json(err);
	}
});

export default router;
