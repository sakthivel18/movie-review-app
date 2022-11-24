import React from 'react';
import '../styles/movie.css';

const Movie = (props) => {
    const {name, genre, rating, image} = props.details;
    return (
        <React.Fragment>
            <div className="card movie">
                <img src={image} alt={"Card image cap" + Math.random()} className="card-img-top" />
                <div className="card-body">
                    <p >
                        Title: {name} <br/>
                        Genre: {genre} <br/>
                        Rating: {rating} stars <br/>
                    </p>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Movie;