import React, { useState } from 'react';
import styled from 'styled-components';
import { API } from '../api/api';
import Router from 'next/router';
import { AxiosResponse } from 'axios';

interface IProps {
    postServer?: IState;
    handleCancel?: (cancel: boolean) => void;
    handleSubmitChange?: (post: IState) => void;
}

interface IState {
    title: string;
    body: string;
    [key: string]: string;
}

const PostNew: React.FC<IProps> = ({ postServer, handleCancel, handleSubmitChange }) => {
    const [post, setPost] = useState<IState>(postServer ?? { title: '', body: '' });
    const [error, setError] = useState<IState>({ title: '', body: '' });

    const handleChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPost((prev: IState) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        if (post.body.trim() === '' || post.title.trim() === '') {
            setError({
                ...error,
                title: post.title.trim() === '' ? 'This field is require' : '',
                body: post.body.trim() === '' ? 'This field is require' : '',
            });
        }

        if (postServer) {
            API.updatePost({
                postId: Number(postServer.id),
                title: post.title,
                body: post.body,
            })
                .then((res: AxiosResponse<{ title: string; body: string }>) => {
                    handleSubmitChange({ ...postServer,title: res.data.title, body: res.data.body });
                })
                .then(() => {
                    handleCancel(false);
                });
        } else {
            API.createPost({
                ...post,
            }).then((res: AxiosResponse<{id: number}>) => {
                Router.push(`/posts/${res.data.id}`)
            });
        }
    };

    return (
        <div>
            <input type="text" name="title" value={post.title} onChange={handleChange} onKeyPress={handleKeyPress} />
            <textarea name="body" value={post.body} onChange={handleChange} />
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={() => handleCancel(false)}>Cancel</button>
        </div>
    );
};

export default PostNew;
