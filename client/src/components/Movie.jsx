import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/movie.css';

const Movie = (props) => {
    const navigate = useNavigate();
    const {_id, name, genre, rating, image} = props.details;
    const handleClick = () => {
        return navigate("/movie/"+ _id, { state: {_id, image} });
    }
    return (
        <React.Fragment>
            <div className="card movie" onClick={handleClick}>
                <img src={image} alt={"Card image cap" + Math.random()} className="card-img-top" />
                <div className="card-body">
                    <p>
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