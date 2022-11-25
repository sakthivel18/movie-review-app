const express = require('express');
const Movie = require('../models/movie');
const User = require('../models/user')

//Show all the Movie
exports.allMovies= async(req,res)=>{
    try{
        const movies = await Movie.find()
        const reviews = await movies.reviews
        let list = []
        movies.map(value=>{
            // list.push({...value,isUpdate:true,isDelete:true})
            list.push(value)
        })
    //    console.log(list)
        list.map(value=>{
            console.log(value.name);
            if(value.author == req.session.user)
            {
            value._doc.isDelete=true
            value._doc.isUpdate=true
            }
            value.reviews.map(review=>{
                console.log(value.reviews)
                if(review.user == req.session.user)
                {
                    value._doc.isReviewDelete = true
                }
            })
        })


       
    //    console.log(list)
        return res.status(200).json({
            movies:list,
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
        const loggedIn = await User.findById(user)
        const review  = {
            name:loggedIn.firstName+" "+loggedIn.lastName,
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