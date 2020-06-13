import Link from './Link';
import styled from 'styled-components';

const A = styled.a`
    text-decoration: none;
    cursor: pointer;
    color: grey;
    margin: 5px;
    :hover {
        color: lightgrey;
    }
`;

const Wrapped = styled.div`
    display: flex;
    justify-content: center;
`


const Header: React.FC = () => {
    return (
        <Wrapped>
            <Link href="/" >
                <A>Home Page</A>
            </Link>
            <Link href="/posts/new">
                <A>Create a New Post</A>
            </Link>
        </Wrapped>
    );
};

export default Header;
