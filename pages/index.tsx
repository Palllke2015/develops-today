import React from 'react';
import { NextPage } from 'next';
import { API } from '../src/api/api';
import { Post } from '../src/Types';
import { PostsList } from '../src/components/PostsList';
import { AxiosResponse } from 'axios';

export interface IProps {
    posts: Post[];
}

const Index: NextPage<IProps> = ({ posts }) => {
    return <PostsList posts={posts} />;
};

export const getServerSideProps: () => Promise<{ props: { posts: AxiosResponse<Post[]> } }> = async () => {
    const res = await API.getPosts();
    return {
        props: {
            posts: res,
        },
    };
};

export default Index;
