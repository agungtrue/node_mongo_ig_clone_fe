import React, { useState, useEffect } from 'react';

const Home = () => {
    const [post, setPost] = useState([]);
    const [statusLike, setStatusLike] = useState(true);

    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const hasToken = localStorage.getItem('jwt');
        hasToken && getAllPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getAllPost = async () => {
        return await fetch(`${API_URL}/api/post`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem('jwt')}`
            }
            })
            .then(res => res.json())
            .then(data => {
                console.log({ data })
                setPost(data.data)
            }).catch( error => console.log(error))
    }

    const switcherLike = (status) => {
        let changeStatus = !status;
        setStatusLike(changeStatus);
    }

    const likePost = async (id) => {
        const API = 'https://polar-bastion-55096.herokuapp.com'
        return await fetch(`${API}/api/v1/posts/like`, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem('jwt')}`
            },
            body: JSON.stringify({postId: id})
            })
            .then(res => res.json())
            .then(data => {
                console.log({post: data})
                if (data.status === 'success') {
                    getAllPost()
                }
            }).catch( error => console.log(error))
    }

    const unLikePost = (id) => {
        const API = 'https://polar-bastion-55096.herokuapp.com'
        fetch(`${API}/api/v1/posts/unlike`, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem('jwt')}`
            },
            body: JSON.stringify({postId: id})
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.status == 'success') {
                    getAllPost()
                }
            }).catch( error => console.log(error))
    }

    const mapLike = (obj) => {
        const User = JSON.parse(localStorage.getItem('user'));
        const checker = obj.likes.includes(User._id)
        return checker;
    }


    return (
        <div className="home">
            {
                post.map(data => {
                    return (
                    <div className="card home-card" key={data._id}>
                        <h5>{ data.postedBy?.name || '' }</h5>
                        <div className="card-image">
                            <img 
                            alt="person"
                            src={ data.photo ? data.photo : "https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"}
                            />
                        </div>
                        <div className="card-content">
                            <div className="likes">
                                {
                                    mapLike(data)
                                    ?
                                    <i className="material-icons like-unlike" onClick = {() => unLikePost(data._id)}>favorites</i>
                                    :
                                    <i className="material-icons like-unlike" onClick={() => likePost(data._id)}>favorite_border</i>
                                }
                            </div>
                            <h6>{data.likes.length} likes</h6>
                            <h6>{data.title}</h6>
                            {/* <p>{data.body}</p> */}
                            <input type="text" placeholder="add a comment"/>
                        </div>
                    </div>
                    )
                })
            }
        </div>
    )
}

export default Home;