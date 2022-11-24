import axios from "axios";

const login = user => axios.post("/user/login", user);
const signup = user =>  axios.post("/user/signup", user);
const hasLoggedIn = () => axios.get("/user/hasLoggedIn");
const signOut = () => axios.get("/user/signOut");

export {
    login,
    signup,
    hasLoggedIn,
    signOut
}