import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css'

const Signup = () => {
    const history = useHistory();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [email, setEmail] = useState("");

    const API_URL = process.env.REACT_APP_API_URL;

    const register = () => {
        if(!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            console.log(email)
            M.toast({html: 'Invalid Email!', classes: '#e53935 red darken-1'})
            return false;
        }
        
        // start request
        fetch(`${API_URL}/auth/signup`, {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password,
                passwordConfirm,
            })
        }).then(res => res.json())
        .then(data => {
            if (data.status === 'BAD_REQUEST') {
                return M.toast({ html: `${data.message}`, classes: '#e53935 red darken-1' })
            }

            M.toast({html: 'Successfuly Sign up!!', classes: '#81c784 green lighten-2'})
            history.push('/login');

        }).catch( error => console.log(error))
    }

    return (
        <div className="mycard">
            <div className="card auth-card">
                <h2 className="insta-title-login">Instagram</h2>
                <div className="input-field">
                    <input type="text" placeholder="Username" 
                    value={name} onChange={(e) => setName(e.target.value)}
                    />
                    <input type="text" placeholder="Email" 
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                    <input type="password" placeholder="Password" 
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                    <input type="password" placeholder="Password" 
                    value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                    <button className="btn waves-effect waves-light #64b5f6 blue lighten-2"
                    onClick={() => register()}>
                        Sign Up
                    </button>
                    <h5 className="title-action">
                        <Link to="/login">Already have an account?</Link>
                    </h5>
                </div>
            </div>
        </div>
    )
}

export default Signup;