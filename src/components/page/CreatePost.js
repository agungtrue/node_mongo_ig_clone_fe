import React, { useState } from 'react';
import M from 'materialize-css';
import { useHistory } from 'react-router-dom';

const CreatePost = () => {
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [image, setImage] = useState(null);

    const API_URL = process.env.REACT_APP_API_URL;

    function handleUpload(e) {
        const { files } = e.target
        console.info(files);
        const fileImage = files[0];

        const data  = new FormData();
        data.append("file", fileImage);

        fetch(`${API_URL}/api/upload/img`, {
            method: 'POST',
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('jwt')}`
            },
            body: data
        })
        .then(res => res.json())
        .then(data => {
            if (data?.data?.path) setImage(data.data);
        })
        .catch(err => console.log(err));
    }

    const posting = () => {

        if (!image || !title) {
            return M.toast({html: 'please fill the data!', classes: '#e53935 red darken-1'})
        }

        fetch(`${API_URL}/api/post`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem('jwt')}`
            },
            body: JSON.stringify({ title, photo: image.path })
        })
        .then(res => res.json())
        .then(data => {
            console.log('posting', { data })
            // return
            if(data.status === 'BAD_REQUEST') {
                return M.toast({ html: 'Something went wrong', classes: '#e53935 red darken-1' })
            }
            if(data.errors) {
                return M.toast({ html: 'Something went wrong', classes: '#e53935 red darken-1' })
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
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title"/>
            <div className="file-field input-field body-post">
                <div className="btn #64b5f6 blue lighten-2">
                    <span>File</span>
                    <input type="file" onChange={handleUpload}/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"/>
                </div>
            </div>
            <button className="btn waves-effect waves-light #64b5f6 blue lighten-2"
                onClick={() => posting()}
            >
                Posting
            </button>
        </div>
    );

}

export default CreatePost;