import React, { useState, useContext } from 'react';
import { genres } from '../utils/AppConstants';
import Select from 'react-select';
import Slider from '@mui/material/Slider';
import { createMovie } from '../services/MovieService';
import Snackbar from '@mui/material/Snackbar';
import Alert from "./Alert";
import AuthApi from '../utils/AuthApi';
import { useNavigate } from 'react-router-dom';


const CreateMovie = () => {
    const authApi = useContext(AuthApi);
    const navigate = useNavigate();
    const [title, setTitle] = useState(); 
    const [description, setDescription] = useState();
    const [director, setDirector] = useState();
    const [genre, setGenre] = useState();
    const [rating, setRating] = useState(3);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'error'
    });

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

      const handleRatingChange = (event, newValue) => {
        if (typeof newValue === 'number') {
          setRating(newValue);
        }
      };

      const postMovie = async () => {
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
            const movie = {
                name: title, 
                directorName: director,
                genre: genre.value,
                rating: rating,
                description: description
            }

            const res = await createMovie(movie);
            if (res.status === 200) {
                await setSnackbar({
                    open: true,
                    message: 'Movie created successfully',
                    severity: 'success'
                });
                setTimeout(() => {
                    navigate('/');
                }, 500);
            }

        } catch (axiosError) {
            let { message } = axiosError.response.data;
            await setSnackbar({
                open: true,
                message: message,
                severity: 'error',
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
                                <input type="text" className="form-control" id="name" placeholder="Enter a name for the movie" onChange={e => setTitle(e.target.value)} />
                            </div>
                        </div>
                        <div className="form-group row my-3">
                            <label htmlFor="description" className="col-sm-2 col-form-label">Description:</label>
                            <div className="col-sm-10">
                                <textarea className="form-control" placeholder="Enter movie description" onChange={e => setDescription(e.target.value)} /> 
                            </div>
                        </div>
                        <div className="form-group row my-3">
                            <label htmlFor="director" className="col-sm-2 col-form-label">Director:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="director" placeholder="Enter the name of the director" onChange={e => setDirector(e.target.value)}/>
                            </div>
                        </div>
                        <div className="form-group row my-3">
                            <label htmlFor="genre" className="col-sm-2 col-form-label">Genre:</label>
                            <div className="col-sm-10">
                                <Select options={genreOptions} onChange={setGenre} />
                            </div>
                        </div>
                        <div className="form-group row my-3">
                            <label htmlFor="rating" className="col-sm-2 col-form-label">Rating:</label>
                            <div className="col-sm-10">
                            <Slider
                                aria-label="Rating"
                                defaultValue={2}
                                valueLabelDisplay="auto"
                                step={0.5}
                                marks={marks}
                                min={0}
                                onChange={handleRatingChange}
                                max={5}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12 d-flex flex-row-reverse">
                                <button type="button" className="btn btn-default m-2" onClick={() => navigate("/")}> Cancel</button>
                                <button type="button" className="btn btn-primary m-2" onClick={() => postMovie()}> Create Movie</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {SnackbarAlert}
        </div>
    );
}

export default CreateMovie;