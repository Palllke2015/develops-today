import React from 'react';
import { Post } from '../Types';
import styled from 'styled-components';
import { PostItem } from './PostItem';

export interface IProps {
    posts: Post[];
}

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
`

export const PostsList: React.FC<IProps> = ({ posts }) => {
    return (
        <Container>
            {posts.map((item) => (
                    <PostItem post={item} key={item.id} />
            ))}
        </Container>
    );
};
