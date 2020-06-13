import React from 'react';
import { Post } from '../Types';
import styled from 'styled-components';
import Link from 'next/link';

interface IProps {
    post: Post;
}

const Item = styled.div`
    border: 1px solid grey;
    width: 250px;
    padding: 10px;
    margin: 10px;
    & > h2 {
        margin: 0px;
    }
`;

const A = styled.a`
    text-decoration: none;
`;

export const PostItem: React.FC<IProps> = ({ post: { title, body, id } }) => {
    return (
        <Link href="/posts/[id]" as={`/posts/${id}`}>
            <Item>
                <A>
                    <h2> {title}</h2>
                    <div>{body}</div>
                </A>
            </Item>
        </Link>
    );
};
