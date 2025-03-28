import express from "express";
import cors from "cors";
import genreRoute from "./routes/genre";
import movieRoute from "./routes/movie";
import trendingRoute from "./routes/trending";
import discoverRoute from "./routes/discover";
import peopleRoute from "./routes/people";
import vidsrcRoute from "./routes/vidsrc";
import tvRoute from "./routes/tv";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || "3030";

const server = express();

server.use(cors());
server.use("/genre", genreRoute);
server.use("/movie", movieRoute);
server.use("/trending", trendingRoute);
server.use("/discover", discoverRoute);
server.use("/people", peopleRoute);
server.use("/vidsrc", vidsrcRoute);
server.use("/tv", tvRoute);

server.get("/", (_, res) => {
  res.send("Hi Express!");
});

server.listen(PORT, () => {
  console.log(`Server run on http://localhost:${PORT}`);
});
