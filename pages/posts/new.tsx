import Router from 'next/router';
import PostNew from "../../src/components/PostNew";

const New = () => {
    const handleBack = () => Router.back()
    return <PostNew handleCancel={handleBack} />
}

export default New