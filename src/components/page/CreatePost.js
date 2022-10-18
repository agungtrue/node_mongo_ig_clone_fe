import React, { useState } from 'react';
import M from 'materialize-css';
import { useHistory } from 'react-router-dom';

const CreatePost = () => {

    const history = useHistory();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");


    const postDetail = () => {
        const data  = new FormData();
        data.append("file", image);
        data.append('upload_preset', 'src-images');
        data.append('cloud_name', 'img-agungtrue');

        fetch('https://api.cloudinary.com/v1_1/img-agungtrue/image/upload', {
            method: 'POST',
            body: data
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setUrl(data.url)
            posting(data);
        })
        .catch(err => console.log(err));
    }

    const posting = (img) => {
        const API = 'https://polar-bastion-55096.herokuapp.com'
        console.log('url', url)
        fetch(`${API}/api/v1/posts`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify({
                title,
                body,
                photo: img.url
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.status === 'fail') {
                return M.toast({html: 'please fill the data!', classes: '#e53935 red darken-1'})
            }
            if(data.error) {
                return M.toast({html: data.error, classes: '#e53935 red darken-1'})
            }

            M.toast({html: data.message, classes: '#81c784 green lighten-2'})
            history.push('/');

        }).catch( error => console.log(error))
    }

    const checker = () => {
        if(!localStorage.getItem('jwt')) {
            M.toast({html: 'you must be logged in!', classes: '#81c784 red lighten-1'});
            history.push('/login');
            return;
        }
    }
    setTimeout(checker, 0)

     return (
        <div className="card input-filed post">
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="title"/>
            <input type="text" value={body} onChange={e => setBody(e.target.value)} placeholder="body"/>

            <div className="file-field input-field body-post">
                <div className="btn #64b5f6 blue lighten-2">
                    <span>File</span>
                    <input type="file" onChange={e => setImage(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"/>
                </div>
            </div>
            <button className="btn waves-effect waves-light #64b5f6 blue lighten-2"
            onClick={() => postDetail()}
            >
                Posting
            </button>
        </div>
    );

}

export default CreatePost;