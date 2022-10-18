import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import M from 'materialize-css';
import { UserContext } from '../../App.js';


const Profile = () => {

    const history = useHistory();

    // from localStorage
    // const User = JSON.parse(localStorage.getItem('user'));

    // from state using useContext
    const { state } = useContext(UserContext);

    const checker = () => {
        if(!localStorage.getItem('jwt')) {
            M.toast({html: 'you must be logged in!', classes: '#81c784 red lighten-1'});
            return history.push('/login');
        }
    }
    setTimeout(checker, 0)
    // checker()
    
    return (
        <div className="profile-wrapper">
            <div className="img-person">
                <div>
                    <img style={{ width: '120px', height: '120px', borderRadius: "80px"}}
                    alt="person"
                    src="https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
                </div>
                <div>
                    <h4 style={{ paddingLeft: 10, textTransform: 'capitalize' }}>{ state ? state.name : '-' }</h4>
                    <div className="person-info-1">
                        <h6><span style={{ fontWeight: 'bold' }}>17</span> posts</h6>
                        <h6><span style={{ fontWeight: 'bold' }}>17</span> followers</h6>
                        <h6><span style={{ fontWeight: 'bold' }}>17</span> following</h6>
                    </div>
                    <h6 style={{ color: "red" }}>*This page has no features</h6>
                </div>
            </div>
            <div className="gallery">
                <img alt="gallery" className="item" src="https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"/>
                <img alt="gallery" className="item" src="https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"/>
                <img alt="gallery" className="item" src="https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"/>
                <img alt="gallery" className="item" src="https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"/>
                <img alt="gallery" className="item" src="https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"/>
                <img alt="gallery" className="item" src="https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"/>
            </div>
        </div>
    )
}

export default Profile;