import React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { genres } from '../utils/AppConstants';
import Select from 'react-select';
import Slider from '@mui/material/Slider';
import Snackbar from '@mui/material/Snackbar';
import Alert from "./Alert";
import { editMovie } from '../services/MovieService';

const EditMovie = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { movie, image } = location.state;
    const [title, setTitle] = useState(movie.name); 
    const [description, setDescription] = useState(movie.description);
    const [director, setDirector] = useState(movie.directorName);
    const [genre, setGenre] = useState(movie.genre);
    const [rating, setRating] = useState(movie.rating);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'error'
    });

    let genreOptions = genres.map(genre => {
        let option = {
            "label": genre, 
            "value": genre
        }
        return option;
    });

    const marks = [
        {
          value: 0,
          label: '0',
        },
        {
          value: 5,
          label: '5',
        }
      ];
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar({
            open: false,
            message: '',
            severity: 'error'
        })
    }

    const SnackbarAlert = (
            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={snackbar.message}
                key={'top' + 'center'}
            >
                <Alert severity={snackbar.severity} onClose={handleClose} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>   
            </Snackbar>
        
    );
    
      
    const handleCancel = () => {
        return navigate("/movie/"+ movie._id, { state: {_id: movie._id, image} });
    }  

    const handleRatingChange = (event, newValue) => {
        if (typeof newValue === 'number') {
          setRating(newValue);
        }
      };

    const handleEdit = async () => {
        try {
            const isMovieInvalid = !title || !description || !director || !genre || rating === null || rating === undefined;
            if (isMovieInvalid) {
                await setSnackbar({
                    open: true,
                    message: 'Please enter all the fields',
                    severity: 'error'
                });
                return;
            }
            movie.name = title;
            movie.description = description;
            movie.directorName = director;
            movie.genre = genre;
            movie.rating = rating;

            let res = await editMovie(movie);
            if (res.status === 200) {
                await setSnackbar({
                    open: true,
                    message: 'Movie updated successfully',
                    severity: 'success'
                });
                setTimeout(() => {
                    return navigate("/movie/"+ movie._id, { state: {_id: movie._id, image} });
                }, 500);
            }

        } catch (err) {
            await setSnackbar({
                open: true,
                message: 'Unable to edit movie',
                severity: 'error'
            });
        }
    }

    return (
        <div className="container">
            <div className="row mt-1">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <form>
                        <div className="form-group row my-3">
                            <label htmlFor="name" className="col-sm-2 col-form-label">Title:</label>
                            <div className="col-sm-10">
                                <input type="text" value={title} className="form-control" id="name" placeholder="Enter a name for the movie" onChange={e => setTitle(e.target.value)}/>
                            </div>
                        </div>
                        <div className="form-group row my-3">
                            <label htmlFor="description" className="col-sm-2 col-form-label">Description:</label>
                            <div className="col-sm-10">
                                <textarea className="form-control" value={description} placeholder="Enter movie description" onChange={e => setDescription(e.target.value)}/> 
                            </div>
                        </div>
                        <div className="form-group row my-3">
                            <label htmlFor="director" className="col-sm-2 col-form-label">Director:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="director" value={director} placeholder="Enter the name of the director" onChange={e => setDirector(e.target.value)}/>
                            </div>
                        </div>
                        <div className="form-group row my-3">
                            <label htmlFor="genre" className="col-sm-2 col-form-label">Genre:</label>
                            <div className="col-sm-10">
                                <Select options={genreOptions} defaultValue={{label: genre, value: genre}} onChange={setGenre}/>
                            </div>
                        </div>
                        <div className="form-group row my-3">
                            <label htmlFor="rating" className="col-sm-2 col-form-label">Rating:</label>
                            <div className="col-sm-10">
                            <Slider
                                aria-label="Rating"
                                defaultValue={rating}
                                valueLabelDisplay="auto"
                                step={0.5}
                                marks={marks}
                                min={0}
                                max={5}
                                onChange={handleRatingChange}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12 d-flex flex-row-reverse">
                                <button type="button" className="btn btn-default m-2" onClick={handleCancel}> Cancel</button>
                                <button type="button" className="btn btn-primary m-2" onClick={handleEdit}> Edit Movie</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {SnackbarAlert}
        </div>
    );
}

export default EditMovie;