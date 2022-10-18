import React, { useContext } from 'react';
import M from 'materialize-css';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../App';

const Navbar = () => {
    const history = useHistory();
    const { state, dispatch } = useContext(UserContext)
    console.info('from Navbar', { state });

    const logOut = () => {
        const token = !localStorage.getItem('jwt') ? false : true;
        if(!token) {
            console.log('oke');
        } else {
            localStorage.clear();
            dispatch({type: 'logout'});
            M.toast({ html: `good bye ${state.name}!!`, classes: '#81c784 green lighten-1' })
            return history.push('/login')
        }
    }

    const renderList = () => {
        if(state) {
            return [
                <li key="1"><Link to="/profile">Profile</Link></li>,
                <li key="2"><Link to="/create-post">Create Post</Link></li>,
                <li key="3">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a onClick={() => logOut()}>
                        Log Out
                    </a>
                </li>
            ];
        }
        else {
            return (
                <>
                    <li key="4"><Link to="/login">Login</Link></li>
                    <li key="5"><Link to="/signup">Signup</Link></li>
                </>
            );
        }
    }

    return (
        <nav>
            <div className="nav-wrapper white">
                <Link to={ state ? '/' : '/login'} className="brand-logo">Instagram</Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        { renderList() }
                    </ul>
            </div>
      </nav>
    )
}

export default Navbar;