import React, { FC } from 'react';

export default function Layout<FC>(page : React.ReactElement) {

    return <>
        <h1>Public Layout</h1>
        {page}
    </>
}