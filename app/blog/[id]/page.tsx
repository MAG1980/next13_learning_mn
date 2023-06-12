import React, {JSX} from "react";
import {Metadata} from "next";
import {fetch} from "next/dist/compiled/@edge-runtime/primitives";
import {useRouter} from "next/router";
import {useSearchParams} from "next/navigation";

interface IPost {
    userId: number,
    id: number,
    title: string,
    body: string
}

type Props = {
    params: {
        id: string,
    }
}

export async function generateMetadata({params: {id}}: Props): Promise<Metadata> {
    const post = await getData(id)
    return {
        title: `${post.title}`,
        description: `Description ${post.body}`
    }
}

async function getData(id: string): Promise<IPost> {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        next: {
            revalidate: 60
        }
    })

    if (!response.ok) {
        throw new Error('Unable to fetch post')
    }

    return response.json()
}

export default async function Posts({params: {id}}: Props) {
    const post = await getData(id)
    //Срабатывает на сервере. Отображается в логах сервера, а не в браузере.
    console.log(post)
    return (
        <div>
            <h1>Post page №{id}</h1>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <p>{post.userId}</p>
        </div>
    )
}
