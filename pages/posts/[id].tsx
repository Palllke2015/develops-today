import { API } from '../../src/api/api';
import React, { useState } from 'react';
import PostNew from '../../src/components/PostNew';
import { useRouter } from 'next/router';

const PostItem = ({ postServer }) => {
    const router = useRouter();
    const [edit, setEdit] = useState<boolean>(false);
    const [post, setPost] = useState(postServer);
    const [comment, setComment] = useState<string>('');

    const handleEdit = () => setEdit((prev) => !prev);

    const AddComment = () => {
        API.addComment({ postId: post.id, body: comment })
            .then((res) => {
                setPost({
                    ...post,
                    comments: [res.data, ...post.comments],
                });
            })
            .then(() => setComment(''));
    };

    const DeletePost = () => {
        API.deletePost(post.id).then(() => {
            router.push('/');
        });
    };

    return (
        <>
            <>
                {edit ? (
                    <PostNew postServer={post} handleCancel={setEdit} handleSubmitChange={setPost} />
                ) : (
                    <>
                        <h2>{post.title}</h2>
                        <div>{post.body}</div>
                        <button onClick={handleEdit}>Edit</button>
                    </>
                )}
            </>
            {post?.comments.map((comment) => (
                <div key={comment.id}>{comment.body}</div>
            ))}
            <input
                type="text"
                name="comment"
                value={comment}
                onChange={({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => setComment(value)}
            />
            <button onClick={AddComment}>Add comment</button>
            <button onClick={DeletePost}>Delete Post</button>
        </>
    );
};

PostItem.getInitialProps = async ({ query }) => {
    const res = await API.getPost(+query.id);

    return {
        postServer: res.data,
    };
};

export default PostItem;
