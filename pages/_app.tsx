import { AppProps } from 'next/app';
import '../src/style/index.css';
import React from 'react';
import Header from '../src/components/Header';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Header />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
