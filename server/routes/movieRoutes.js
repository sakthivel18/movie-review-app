// GET - /movies/
// GET - /movies/:id
// POST - movies/create
// PUT - movies/edit/:id
// DELETE - movies/delete 

const express = require('express');
const router = express.Router();
const controller = require('../controllers/movieController');


router.get('/show',controller.allMovies);
router.get('/show/:id',controller.findMovie)
router.post('/create',controller.createMovie)
router.put('/update/:id',controller.updateMovie)
router.delete('/delete/:id',controller.deleteMovie)
router.post('/review/',controller.createReview)
router.delete('/review/delete',controller.deleteReview)
// router.post('/login', controller.login);
// router.post('/signup', controller.signup);
// router.get('/hasLoggedIn', controller.hasLoggedIn);
// router.get('/signOut', controller.signOut);

module.exports = router;