export type Post = {
    body: string;
    id: number;
    title: string;
    comments?: Comment[];
};

type Comment = {
    id: number;
    postId: number;
    body: string;
};
