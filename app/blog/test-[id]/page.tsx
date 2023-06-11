import React, {JSX} from "react";

type Props = {
    params: {
        id: string,
    }
}

export default function Posts({params: {id}}: Props): JSX.Element {
    return (
        <h1>Post page №{id}</h1>
    )
}
