import React from 'react';
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Snackbar from '@mui/material/Snackbar';
import Alert from "./Alert";
import { showMovie, deleteMovie } from "../services/MovieService";

const MovieDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [movie, setMovie] = useState(null);
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

    useEffect(() => {
        if (!location || !location.state || !location.state.image || !location.state._id) {
            navigate('/error', { state : { 
                "status" : 400,
                "message": "Bad Request - validation error"
             }});
        }
    }, []);

    const fetchMovie = async () => {
        try {
            const res = await showMovie(location.state._id);
            setMovie(res.data.movie);
        } catch (axiosError) {
            let { status } = axiosError.response;
                let { message } = axiosError.response.data;
                let error = {
                    "status": status,
                    "message": message
                }
                navigate('/error', { state : { error }});
        }
    }

    const handleDeleteMovie = async () => {
        try {
            await deleteMovie(location.state._id);
            await setSnackbar({
                open: true,
                message: 'Movie deleted successfully',
                severity: 'success'
            });
            setTimeout(() => {
                navigate("/");
            }, 500);
            
        } catch (err) {
            await setSnackbar({
                open: true,
                message: 'Unable to delete movie',
                severity: 'error'
            });
        }
    }

    const handleEditMovie = () => {
        return navigate("/edit/" + location.state._id, {
            state: {
                movie,
                image: location.state.image
            }
        });
    }

    useEffect(() => {
        fetchMovie();
    }, []);

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <div className="row">
                        <div className="col-md-12">
                            <h3>Movie Details
                            {movie?.isDelete && <span style={{float: 'right'}}>
                                <Button size="large" variant="outlined" sx={{color:"#000000", borderColor:"#000000"}} onClick={handleEditMovie}><ModeEditOutlineIcon/></Button>
                                <Button className="m-2" variant="outlined" sx={{color:"#ff1a1a", borderColor:"#000000"}} size="large" onClick={handleDeleteMovie}> <DeleteIcon/> </Button>
                            </span>}
                            </h3>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-md-4">
                            { location && location.state && location.state.image && <img src={location.state.image} alt={"Card image cap" + Math.random()} className="" /> }
                        </div>
                        <div className="col-md-8" style={{justifyContent: 'start'}}>
                            <div className="row">
                                <div className="col-md-12"><h6><b>Movie title:</b> {movie?.name} </h6></div>
                            </div>
                            <div className="row">
                                <div className="col-md-12"><h6><b>Movie description: </b> {movie?.description} </h6></div>
                            </div>
                            <div className="row">
                                <div className="col-md-12"><h6><b>Director: </b> {movie?.directorName} </h6></div>
                            </div>
                            <div className="row">
                                <div className="col-md-12"><h6><b>Genre: </b> {movie?.genre} </h6></div>
                            </div>
                            <div className="row">
                                <div className="col-md-12"><h6><b>Rating: </b> {movie?.rating} stars </h6></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <div className="card mt-2">
                        <div className="card-header"> 
                            <div className="row d-flex">
                                <div className="col-md-10">
                                    <h6 className='mt-2'>Reviews</h6>
                                </div>
                                <div className="col-md-2"><Button>Add review</Button> </div>
                            </div>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-10">
                                        <div className="row" style={{fontWeight: 'bold'}}> Author: </div>
                                        <div className="row" style={{fontWeight: 'bold'}}> Posted on: </div> 
                                        <div className="row"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>
                                        </div>
                                        <div className="col-md-2 d-flex">
                                            <Button sx={{color:"#ff1a1a", borderColor:"#000000"}} size="small"> <FavoriteIcon/> </Button>
                                            <Button sx={{color:"#000000", borderColor:"#000000"}} size="small"> <DeleteIcon/> </Button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {SnackbarAlert}
        </div>
    );

}

export default MovieDetails;