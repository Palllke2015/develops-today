import axios from 'axios';
import { AxiosResponse } from 'axios';
import { Post } from '../Types';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://simple-blog-api.crew.red/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getPosts = async (): Promise<AxiosResponse<Post[]>> => {
    return instance.get('posts');
};

export const API = {
    getPosts: (): Promise<AxiosResponse<Post[]>> => instance.get(`posts`).then((response) => response.data),
    deletePost: (postId: number) => instance.delete(`posts/${postId}`),
    getPost: (postId: number): Promise<AxiosResponse<Post[]>> => instance.get(`posts/${postId}?_embed=comments`),
    addComment: ({ body, postId }: { postId: number; body: string }) => instance.post(`comments`, { postId, body }),
    createPost: ({ title, body }: { title: string; body: string }) => instance.post(`posts`, { title, body }),
    updatePost: ({ postId, body, title }: { postId: number; title: string; body: string }) =>
        instance.put(`posts/${postId}`, { title, body }),
};
