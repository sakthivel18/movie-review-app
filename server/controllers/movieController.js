const express = require('express');
const Movie = require('../models/movie');

//Show all the Movie
exports.allMovies= async(req,res)=>{
    try{
        const movies = await Movie.find()
        const reviews = await movies.reviews
        return res.status(200).json({
            movies:movies,
            reviews:reviews
        })
    }

    catch(err){
        return res.status(500).json({message:"Internal server error Couldn't retrieve"})
    }
}

//Finding a Particular movie with the id
exports.findMovie = async(req,res)=>{
    try{
        const id = req.params.id;
        const movie = await Movie.findById(id)
        return res.status(200).json({
            movie:movie
        })
    }
    catch(err){
        return res.status(404).json({message:"Movie of the particular ID is not found"})
    }
}
//Updating a Movie
exports.updateMovie = async(req,res)=>{
    try{
        const  id = req.params.id
        const movieDetails = req.body
        const movieUpdated = await Movie.findByIdAndUpdate(id,movieDetails,{useFindAndModify:false,runValidators:true})
        return res.status(200).json({message:"You have successfully Updated the Movie"})
    }
    catch(err){
        return res.status(404).json({message:"The requested Movie is not found"})
    }
}
//Deleting a particular movie
exports.deleteMovie = async(req,res)=>{
    try{
        const id = req.params.id
        const delete_movie = await Movie.findByIdAndDelete(id,{useFindAndModify:false})
        return res.status(200).json({message:"The movie has been deleted successgfully"})
    }

    catch{
        return res.status(404).json({message:"The movie with that particular ID couldn't been found"})
    }
}

//creating a movie but it should handle the 
// creation of other things like assigning the user to it.
exports.createMovie = async(req,res)=>{
    try{
        const movie =new Movie(req.body)
        //Need to add the user to the movie model.
        await movie.save();
        return res.status(200).json({message:"Successfully Created the Movie"})

        
    }   
    catch{
        return res.status(500).json({message:"The movie couldn't be created"})

    }
}

exports.createReview = async(req,res)=>{

    try{
        const movie = await Movie.findById(req.body.id)
        let user = req.session.user
        const review  = {
            
            user:req.session._id,
            description:req.body

        }
        movie.reviews.push(review)
        await movie.save()
        return res.status(200).json({message:"The review has been added successfully"})

    }
    catch{
        return res.status(500).json({message:"Couldn't add the review"})
    }
}
exports.deleteReview = async(req,res)=>{
    try{
        const movie = await Movie.reviews.findByIdAndDelete(req.body.id)
        return res.status(200).json({message:"The movie has been deleted successgfully"})
     }
    catch{
        return res.status(401).json({message:"The review has not been found"})
    }
}