import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';
import { UserContext } from '../../App';

const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPasword] = useState('');
    const { dispatch } = useContext(UserContext);

    const API_URL = process.env.REACT_APP_API_URL;

    const userLogin = () => {
        if(!email || !password) {
            M.toast({ html: 'please fill email and password', classes: '#e53935 red darken-1' })
            return false;
        }
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            M.toast({ html: 'Please fill an valid email', classes: '#e53935 red darken-1' })
            return false;
        }

        fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                password,
                email
            })
        }).then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.status === 'BAD_REQUEST' || data.status === 'INTERNAL_SERVER_ERROR') {
                return M.toast({html: data.message, classes: '#e53935 red darken-1'})
            }

            // assign into localStorage
            localStorage.setItem('jwt', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            M.toast({html: `Welcome ${data.user.name}!!`, classes: '#81c784 green lighten-1'})

            // dispatch into context
            dispatch({ type: 'user', payload: data.user });
            return history.push('/');

        }).catch( error => console.log(error))
    }

    return (
        <div className="mycard">
            <div className="card auth-card">
                <h2 className="insta-title-login">Instagram</h2>
                <div className="input-field">
                    <input
                        type="text"
                        placeholder="Email"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password} onChange={(e) => setPasword(e.target.value)}
                    />
                    <button
                        onClick={() => userLogin()}
                        className="btn waves-effect waves-light #64b5f6 blue lighten-2"
                    >
                        Login
                    </button>
                    <h5 className="title-action">
                        <Link to="/signup">Don't have an account?</Link>
                    </h5>
                </div>
            </div>
        </div>
    )
}

export default Login;

