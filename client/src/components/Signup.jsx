import React, { useState, useContext } from "react";
import Snackbar from '@mui/material/Snackbar';
import { signup } from "../services/AuthService";
import AuthApi from "../utils/AuthApi";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";

const Signup = () => {
    const authApi = useContext(AuthApi);
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'error'
    });

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!email || !password || !firstName || !lastName) {
            return setSnackbar({
                open: true,
                message: 'Please enter all the fields',
                severity: 'error'
            });
        }
        try {
            let res = await signup({firstName, lastName, email, password});
            if (res.data.auth) {
                setSnackbar({
                    open: true,
                    message: 'Sign up successful',
                    severity: 'success'
                });
                setTimeout(() => {
                    navigate("/login");
                }, 500); 
            }
        } catch(axiosError) {
            let { message } = axiosError.response.data;
            authApi.setAuth(false);
            return setSnackbar({
                open: true,
                message: message,
                severity: 'error'
            });
        }
    }
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

    return ( 
        <div className="container-fluid mt-2">
            <h3>Signup</h3>
            <div className="row">
                <div className="col-md-4">
                    <form>
                        <div className="form-group row my-3">
                            <label htmlFor="firstName" className="col-sm-4 col-form-label">First name</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="firstName" onChange={e => setFirstName(e.target.value)}/>
                            </div>
                        </div>
                        <div className="form-group row my-3">
                            <label htmlFor="lastName" className="col-sm-4 col-form-label">Last name</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="lastName" onChange={e => setLastName(e.target.value)}/>
                            </div>
                        </div>
                        <div className="form-group row my-3">
                            <label htmlFor="email" className="col-sm-4 col-form-label">Email</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="email" onChange={e => setEmail(e.target.value)}/>
                            </div>
                        </div>
                        <div className="form-group row my-3">
                            <label htmlFor="password" className="col-sm-4 col-form-label">Password</label>
                            <div className="col-sm-8">
                                <input type="password" className="form-control" id="password" onChange={e => setPassword(e.target.value)} />
                            </div>
                        </div>
                        <div className="d-flex flex-row-reverse">
                            <button className="btn btn-primary" onClick={e => handleSignup(e)}>Signup</button>
                        </div>
                    </form>
                </div>
            </div>
            {SnackbarAlert}
         </div>
     );
}
 
export default Signup;