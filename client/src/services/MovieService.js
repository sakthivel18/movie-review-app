import axios from "axios";

const url = "http://localhost:5000";
const createMovie = movie => axios.post(url + "/movies/create", movie, {withCredentials: true});
const showMovies = () => axios.get(url + "/movies/show", {withCredentials: true});
const showMovie = id => axios.get(url + "/movies/show/"+ id, {withCredentials: true});
const deleteMovie = id => axios.delete(url + "/movies/delete/" + id, {withCredentials: true});
const editMovie = movie => axios.put(url + "/movies/update/" + movie._id, movie, {withCredentials: true});

export {
    createMovie,
    showMovies,
    showMovie,
    deleteMovie,
    editMovie
}