import React, { Component } from 'react';
import { useNavigate, useLocation } from "react-router-dom"
import AuthApi from '../api/auth';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Key from '@mui/icons-material/Key';
import { useAuth } from "../context/auth.context";

export function Login() {
    const displayName = Login.name;
    const navigate = useNavigate()
    
    const { state } = useLocation();
    const [userName, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const { setUser } = useAuth();

    const handleChange = (event) => {
        if(event.target.name === "username") {
            setUserName(event.target.value);
        } else if (event.target.name === "password") {
            setPassword(event.target.value);
        }
      };

    const setProfile = (response) => {
        let user = { ...response.data.user };
        user.token = response.data.access_token;
        user = JSON.stringify(user);
        //setUser is imported from the useAuth React Context
        setUser(user);
        //also set the user in local storage
        localStorage.setItem("user", user);
        console.log("logged in", user)
        navigate(state?.path || "/")
    }; 
    const login = async () => {
        setIsLoading(true)
        try {
            let response = await AuthApi.Login(
                userName,
                password,
            );
            if (response.data && response.data.success === false) {
                setIsLoading(false)
                //display error coming from server
                return setError(response.data.msg);
            }
            setIsLoading(false)
            return setProfile(response);
        } catch (err) {
            //display error originating from server / other sources
            console.log(err);
            setIsLoading(false)
            if (err.response) {
                return setError(err.response.data.msg);
            }
            return setError("There has been an error.");
        }
    }; 
  function renderLoginForm() {
    return (
        <Paper elevation={3} style={{padding:16}}>
            <TextField
                    style={{width:"100%"}}
                    id="input-with-icon-textfield"
                    name="username"
                    label="Username"
                    size="small"
                    margin="normal"
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <AccountCircle />
                        </InputAdornment>
                    ),
                    }}
                    variant="standard"
                    onChange={handleChange}
                />
            
            <TextField
                    style={{width:"100%", paddingBottom: 32}}
                    id="input-with-icon-textfield"
                    label="Password"
                    name="password"
                    size="small"
                    margin="normal"
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Key />
                        </InputAdornment>
                    ),
                    }}
                    variant="standard"
                    onChange={handleChange}
                />
                
                <Button
                    variant="contained"
                    onClick={async () => { login(); } }
                 >Login</Button>
        </Paper>
    );
  }

    
    let contents = isLoading
        ? <p><em>Loading...</em></p>
        : renderLoginForm();
    let errorMsg = error ? <p style={{color : 'red'}}>{error}</p> : "";
    return (
        <div>
        <h1 id="tableLabel">Login</h1>
        <p>To gain access to the MovingIsUs app</p>
        <p>Please log in</p>
        {contents}
        {errorMsg}
        </div>
    );
}
