import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/auth.context";

export function Logout() {
    const { setUser } = useAuth();
    const navigate = useNavigate()
// Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        localStorage.setItem("user", null)
        setUser(null)
        navigate("/login")
  });
     return (
        <div>
        <h1 id="tableLabel">Logging out...</h1>
        </div>
    );
}
