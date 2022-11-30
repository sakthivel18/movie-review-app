const express = require('express');
const Movie = require('../models/movie');
const User = require('../models/user');

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
                    value._doc.isLiked = true
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
        const movieDoc = await Movie.findById(id)
        const movie = movieDoc.toObject();
        movie.isAuthor = movie.author == req.session.user;
        movie.reviews.forEach(review => {
            review.isLiked = review.likedBy.get(req.session.user) !== undefined;
            review.isAuthor = review.user == req.session.user;
        });
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
        console.log(req.params.id);
        const id = req.params.id;
        const movieDetails = req.body;
        const movieUpdated = await Movie.findByIdAndUpdate(id, movieDetails, {useFindAndModify:false,runValidators:true});
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
        const reqBody = {...req.body, author: req.session.user, reviews: []};
        const movie = new Movie(reqBody);
        await movie.save();
        return res.status(200).json({message:"Successfully Created the Movie"});
    }   
    catch (err) {
        return res.status(500).json({message:"The movie couldn't be created"});
    }
}

exports.createReview = async(req,res)=>{

    try{
        const movie = await Movie.findById(req.body.id);
        let user = req.session.user;
        const loggedIn = await User.findById(user);
        const review  = {
            name:loggedIn.firstName+" "+loggedIn.lastName,
            user:req.session.user,
            description:req.body.reviewText,
            likedBy: {}
        }
        movie.reviews.push(review);
        await movie.save();
        return res.status(200).json({message:"The review has been added successfully"});

    }
    catch (err) {
        return res.status(500).json({message:"Couldn't add the review"})
    }
}
exports.deleteReview = async(req,res)=>{
    try {
        const movie = await Movie.findOne({
            reviews: {
                $elemMatch: {
                    _id: req.params.id
                }
            }
        });
        if (!movie) return res.status(400).json({ 'message' : 'Internal server error - cannot delete the trade' });
        const index = movie.reviews.findIndex(review => review._id = req.params.id);
        movie.reviews.splice(index, 1);
        await movie.save();
        return res.status(200).json({message:"The review has been deleted successgfully"})
     }
    catch (err) {
        console.log(err);
        return res.status(401).json({message:"The review has not been found"})
    }
}

exports.likeDislikeReview = async (req, res) => {
    try {
        const movie = await Movie.findOne({
            reviews: {
                $elemMatch: {
                    _id: req.body.id
                }
            }
        });
        if (!movie) res.status(400).json({message:"Unable to like/dislike review"});;
        let index = movie.reviews.findIndex(review => review._id == req.body.id);
        const user = req.session.user.toString();
        if (movie.reviews[index].likedBy.get(user)) {
            movie.reviews[index].likedBy.delete(user);
            await movie.save();
        } else {
            movie.reviews[index].likedBy.set(user, '1');
            await movie.save();
        }
        return res.status(200).json({message: "success"});
    } catch (err) {
        console.log(err);
        return res.status(500).json({message:"Unable to like/dislike review"});
    }
    
}

exports.filter = async(req,res)=>{
    try {
        const sortby = req.body.sort
    const genre = req.body.genre
    const ratingby = req.body.rating
    console.log(req.body)
    let query = {};
    if (ratingby) query.rating = {$gt:ratingby};
    if (genre) query.genre = genre;
    if (!sortby) sortby = 1;
    const movies = await Movie.find(query).sort({name:sortby})
    console.log(movies)
    return res.status(200).json({movies:movies,message:"The filtered data"})
    } catch(err) {
        console.log(err);
        return res.status(500).json({movies:movies,message:"no data"})
    }
    
}

