import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react';
import { genres, languages, ratings, names } from '../utils/AppConstants';
import Button from '@mui/material/Button';
import Movie from './Movie';
import { filterMovies, showMovies } from '../services/MovieService';
import Select from 'react-select';

const Home = () => {
    const navigate = useNavigate();
    let genreOptions = [...genres];
    genreOptions = genreOptions.map(g => {
        return {"label": g, "value": g}
    })
    const [nameFilter, setNameFilter] = useState();
    const [genreFilter, setGenreFilter] = useState();
    const [ratingFilter, setRatingFilter] = useState();
    const [movies, setMovies] = useState([]);
    const images = [
        require("../images/image1.jpg"),
        require("../images/image2.jpg"),
        require("../images/image3.jpg"),
        require("../images/image4.jpg"),
        require("../images/image5.jpg"),
        require("../images/image6.jpg"),
        require("../images/image7.jpg"),
        require("../images/image8.jpg"),
        require("../images/image9.jpg"),
        require("../images/image10.jpg"),
        require("../images/image11.jpg"),
        require("../images/image12.jpg"),
        require("../images/image13.jpg"),
        require("../images/image14.jpg"),
        require("../images/image15.jpg")
    ];

    

    const fetchMovies = async () => {
        try {
            const res = await showMovies();
            let { movies } = res.data;
            movies.forEach(movie => {
                let randomIndex = Math.floor(Math.random() * images.length);
                movie.image = images[randomIndex];
            });
            setMovies(movies);

        } catch(axiosError) {
            setMovies([]);
            if (!axiosError || !axiosError.response) return;
            let { status } = axiosError?.response;
            let { message } = axiosError?.response?.data;
            let error = {
                "status": status,
                "message": message
            }
            navigate('/error', { state : { error }});
        }
    }

    useEffect(() => {
        fetchMovies();
    }, []);

    const handleClear = () => {
        setNameFilter(null);
        setGenreFilter(null);
        setRatingFilter(null);
        setTimeout(() => {
            fetchMovies();
        }, 0);
    }

    const handleApplyFilter = async () => {
        const reqBody = {
            sort: nameFilter?.value,
            genre: genreFilter?.value,
            rating: ratingFilter?.value
        };
        const res = await filterMovies(reqBody);
        if (res.data.movies) {
            let { movies } = res.data;
            movies.forEach(movie => {
                let randomIndex = Math.floor(Math.random() * images.length);
                movie.image = images[randomIndex];
            });
            setMovies(movies);
        } else {
            // eat 5star - do nothing
        }
   }

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-3">
                <div className="form-inline">
                            <label htmlFor="name" className="col-sm-2">Name:</label>
                            <div className="col-sm-10">
                                <Select name="name" options={names} value={nameFilter} onChange={setNameFilter}/>
                            </div>
                    </div>
                </div>
                <div className="col-md-3">
                <div className="form-inline">
                            <label htmlFor="genre" className="col-sm-2">Genre:</label>
                            <div className="col-sm-10">
                                <Select name="genre" options={genreOptions} value={genreFilter} onChange={setGenreFilter}/>
                            </div>
                    </div>
                </div>
                <div className="col-md-3">
                <div className="form-inline">
                            <label htmlFor="rating" className="col-sm-2">Rating:</label>
                            <div className="col-sm-10">
                                <Select name="rating" options={ratings} value={ratingFilter} onChange={setRatingFilter}/>
                            </div>
                    </div>
                </div> 
                <div className="col-md-3">
                    <Button variant="contained" size="large" sx={{background:"#002d18"}} onClick={handleApplyFilter}>Apply Filter</Button>
                    <Button className="m-2" variant="outlined" sx={{color:"#002d18", borderColor:"#002d18"}} size="large" onClick={handleClear}>clear</Button>
                </div>     
            </div>
            <div className="row d-flex flex-row mt-2">
                { movies.length !== 0 && movies.map(it => <Movie key={Math.random()} details={it}></Movie>) }
            </div>    
        </div>
    );
    
}

export default Home;