import React from 'react';
import { genres } from '../utils/AppConstants';
import Select from 'react-select';
import Slider from '@mui/material/Slider';

const CreateMovie = () => {
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

    return (
        <div className="container">
            <div className="row mt-1">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <form>
                        <div className="form-group row my-3">
                            <label htmlFor="name" className="col-sm-2 col-form-label">Title:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="name" placeholder="Enter a name for the movie" />
                            </div>
                        </div>
                        <div className="form-group row my-3">
                            <label htmlFor="description" className="col-sm-2 col-form-label">Description:</label>
                            <div className="col-sm-10">
                                <textarea className="form-control" placeholder="Enter movie description"/> 
                            </div>
                        </div>
                        <div className="form-group row my-3">
                            <label htmlFor="director" className="col-sm-2 col-form-label">Director:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="director" placeholder="Enter the name of the director" />
                            </div>
                        </div>
                        <div className="form-group row my-3">
                            <label htmlFor="genre" className="col-sm-2 col-form-label">Genre:</label>
                            <div className="col-sm-10">
                                <Select options={genreOptions} />
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
                                max={5}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12 d-flex flex-row-reverse">
                                <button type="button" className="btn btn-default m-2"> Cancel</button>
                                <button type="button" className="btn btn-primary m-2"> Create Movie</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateMovie;