import mongoose from "mongoose";

const movieSchema=mongoose.Schema({
    title:String,
    year:String,
    Budget:String,
    rating:Number,
   
})

const Movie=mongoose.model("Movie",movieSchema)

export default Movie;