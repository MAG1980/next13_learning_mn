import React, {JSX} from "react";
import {Metadata} from "next";

type Props = {
    params: {
        id: string,
    }
}

export async function generateMetadata({params: {id}}: Props): Promise<Metadata> {
    return {
        title: `Title ${id}`,
        description: `Description ${id}`
    }
}

export default function Posts({params: {id}}: Props): JSX.Element {
    return (
        <h1>Post page №{id}</h1>
    )
}
