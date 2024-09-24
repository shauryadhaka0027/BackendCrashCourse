import Movie from "../model/movie.js"

export const createMovie=async(req,res)=>{
    try {
        const movie=new Movie(req.body)
        await movie.save()
        res.status(201).json({Message: "Movie saved successfully",data:movie})
    } catch (error) {
        res.status(500).json({Message:error.message.data})
    }
}


export const getMovies=async(req,res)=>{
    try {
        const movies = await Movie.find()
        res.json({Message: "Movies retrieved successfully",data:movies})

    } catch (error) {
        res.status(500).json({Message:error.message.data})
    }
}

export const updateMovie=async(req,res)=>{
    try {
        const {id}=req.params
        const updatedMovie=await Movie.findByIdAndUpdate(id,req.body,{new:true})
        res.json({Message: "Movie updated successfully",data:updatedMovie})
    } catch (error) {
        res.status(500).json({Message:error.message.data})
    }
}

export const deleteMovie =async (req, res) => {
    try {
        const {id }= req.params
        const deleteMovie= await Movie.findByIdAndDelete(id)
        res.json({Message: "Movie deleted successfully",data:deleteMovie})
    } catch (error) {
        res.status(500).json({Message:error.message.data})
    }
}