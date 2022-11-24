import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { genres, languages, ratings } from '../utils/AppConstants';
import Button from '@mui/material/Button';
import Movie from './Movie';

const Home = () => {
    const [nameFilter, setNameFilter] = useState();
    const [genreFilter, setGenreFilter] = useState();
    const [languageFilter, setLanguageFilter] = useState();
    const [ratingFilter, setRatingFilter] = useState();
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

    const movie = {
        "name": "Movie name",
        "genre": "Action",
        "image": images[0],
        "rating": 5
    }

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-2">
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Movie Name</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={nameFilter}
                            label="Age"
                            onChange={setNameFilter}
                            >
                            <MenuItem value={1}>Sort ascending (A to Z)</MenuItem>
                            <MenuItem value={-1}>Sort descending (Z to A)</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="col-md-2">
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Genre</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={genreFilter}
                            label="Age"
                            onChange={setGenreFilter}
                            >
                            { genres.map(genre => <MenuItem value={genre}>{genre}</MenuItem>) }
                        </Select>
                    </FormControl>
                </div>
                <div className="col-md-2">
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Language</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={languageFilter}
                            label="Age"
                            onChange={setLanguageFilter}
                            >
                            { languages.map(language => <MenuItem value={language}>{language}</MenuItem>) }
                        </Select>
                    </FormControl>
                </div>
                <div className="col-md-2">
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Rating</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={ratingFilter}
                            label="Age"
                            onChange={setRatingFilter}
                            >
                            { ratings.map(rating => <MenuItem value={rating.value}>{rating.label}</MenuItem>) }
                        </Select>
                    </FormControl>
                </div> 
                <div className="col-md-4">
                    <Button variant="contained" size="large">Apply Filter</Button>
                    <Button className="m-2" variant="outlined" size="large">clear</Button>
                </div>     
            </div>
            <div className="row d-flex flex-row mt-2">
                <Movie details={movie}></Movie>
            </div>    
        </div>
    );
    
}

export default Home;