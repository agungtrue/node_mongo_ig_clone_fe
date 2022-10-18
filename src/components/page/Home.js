import React, { useState, useEffect } from 'react';

const Home = () => {
    const [post, setPost] = useState([]);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);

    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const hasToken = localStorage.getItem('jwt');
        hasToken && getAllPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getAllPost = async () => {
        setLoading(true);
        setComment('');

        await fetch(`${API_URL}/api/post`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem('jwt')}`
            }
            })
            .then(res => res.json())
            .then(data => {
                setPost(data.data)
                setLoading(false)
            }).catch( error => console.log(error))
    }

    const likePost = async ({ _id }) => {
        return await fetch(`${API_URL}/api/post/like/${_id}`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem('jwt')}`
            },
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === 'CREATED') {
                getAllPost()
            }
        }).catch( error => console.log(error))
    }

    const unLikePost = ({ _id: postId, likes }) => {
        let likeId = null;
        const { _id: userId } = JSON.parse(localStorage.getItem('user'));
        const findLikeId = likes.find(({ user }) => user._id === userId)

        if (findLikeId) likeId = findLikeId._id
        console.info({ postId, likes, userId, findLikeId });

        if (likeId) {
            fetch(`${API_URL}/api/post/unlike/${postId}?likeId=${likeId}`, {
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${localStorage.getItem('jwt')}`
                }
            })
            .then(res => res.json())
            .then(data => {
                console.info(data)
                if (data.status === 'CREATED') {
                    getAllPost()
                }
            }).catch( error => console.log(error))
        }
    }

    const mapLike = (obj) => {
        const userLogin = JSON.parse(localStorage.getItem('user'));
        if (obj.likes.length) {
            const isLiked = obj.likes.find((data => data.user._id === userLogin._id))
            if (isLiked) return true;
        }
        return false;
    }

    const isLikedByYou = (like) => {
        const userLogin = JSON.parse(localStorage.getItem('user'));
        const isYou = like.user._id === userLogin._id;

        if (isYou) return 'you';
        return like.user.name
    }

    const showUserLikedBy = (obj) => {
        if (obj.likes.length) {
            const likedBy = obj.likes.map(((like) => isLikedByYou(like)))
            return likedBy.join(', ');
        }
        return [].join();
    }

    const handleCanComment = (payload) => {
        const { email } = JSON.parse(localStorage.getItem('user'));
        const { email: payloadEmail } = payload.postedBy;

        return email !== payloadEmail
    }

    async function handleAddComment({ _id }) {
        return await fetch(`${API_URL}/api/post/${_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem('jwt')}`
            },
            body: JSON.stringify({ comment })
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === 'CREATED') getAllPost()
        }).catch( error => console.log(error))
    }

    return (
        <>
            {Boolean(loading) && (
                <div className="progress">
                    <div className="indeterminate"></div>
                </div>
            )}
            <div className="home">
                {
                    post.map(data => {
                        return (
                        <div className="card home-card" key={data._id}>
                            <h6 style={{ fontWeight: 'bold', paddingTop: '1rem', paddingLeft: '1rem' }}>{ data.postedBy?.name || '' }</h6>
                            <div className="card-image">
                                <img 
                                alt="person"
                                src={ data.photo ? `${API_URL}/${data.photo}` : "https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"}
                                />
                            </div>
                            <div className="card-content">
                                <div className="likes">
                                    {
                                        mapLike(data)
                                        ?
                                        <i className="material-icons like-unlike" onClick = {() => unLikePost(data)}>favorites</i>
                                        :
                                        <i className="material-icons like-unlike" onClick={() => likePost(data)}>favorite_border</i>
                                    }
                                </div>
                                {Boolean(data.likes.length) && (
                                    <>
                                        <h6>
                                            <span style={{ fontWeight: 'bold' }}>{data.likes.length}</span> likes
                                        </h6>
                                        <h6>
                                            Liked by <span style={{ fontWeight: 'bold' }}>{showUserLikedBy(data)}</span>
                                        </h6>
                                    </>
                                )}
                                <h6> <span style={{ fontWeight: 'bold' }}>{ data.postedBy?.name || '' }</span> {data.title}</h6>
                                {Boolean(data.comments.length) && data.comments.map(comment => {
                                    return (
                                        <p key={comment._id}>
                                            <span style={{ fontWeight: 'bold' }}> { comment.commentBy?.name || '' } </span>
                                            {comment.text}
                                        </p>
                                    )
                                })}
                                {Boolean(handleCanComment(data)) && (
                                    <div className="row">
                                        <div className="input-field col s9">
                                            <input 
                                                value={comment}
                                                type="text"
                                                placeholder="Add a comment"
                                                name="comment"
                                                onChange={(e) => setComment(e.target.value)}
                                            />
                                        </div>
                                        <div className="input-field col s3">
                                            <button
                                                className="btn waves-effect waves-light #64b5f6 blue lighten-2"
                                                onClick={() => handleAddComment(data)}
                                            >
                                                Send
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Home;