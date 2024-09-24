import express from "express";
import {
  createMovie,
  deleteMovie,
  getMovies,
  updateMovie,
} from "../controller/movie.js";
import Movie from "../model/movie.js";

const router = express.Router();

router.post("/", createMovie);
router.get("/getMovie", getMovies);
router.patch("/updateMovie/:id", updateMovie);
router.delete("/deleteMovie/:id", deleteMovie);
router.get("/get", async (req, res) => {
  try {
    const { title } = req.query;
    const queryObj = {};
    if (req.query.title) {
      queryObj.title = { $regex: title, $options: "i" };
    }
    if (req.query.rating) {
      queryObj.rating = parseInt(req.query.rating);
    }

    const sortQuery={}
    if(req.query.sort) {
        sortQuery[req.query.sort] = req.query.order === "asc"? 1 : -1;
    }
    let page;
    let limit;
    if(req.query.page) {
       page=req.query.page
    }
    if(req.query.limit) {
       limit=parseInt(req.query.limit)
    }
    const movie = await Movie.find(queryObj).sort(sortQuery).skip((page - 1) * limit).limit(limit);
    res.status(200).json({ Message: "success", data: movie });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
});

export default router;
