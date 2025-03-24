import express from "express";
import cors from "cors";
import { ProxyAgent, setGlobalDispatcher } from "undici";
import genreRoute from "./routes/genre";
import movieRoute from "./routes/movie";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || "3030";

const dispatcher = new ProxyAgent({ uri: new URL(process.env.http_proxy).toString() });
setGlobalDispatcher(dispatcher);

const server = express();
server.use(cors());
server.use("/genre", genreRoute);
server.use("/movie", movieRoute);

server.get("/", (_, res) => {
	res.send("Hi Express!");
});

server.listen(PORT, () => {
	console.log(`Server run on http://localhost:${PORT}`);
});
