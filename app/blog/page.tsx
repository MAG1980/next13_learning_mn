import {Metadata} from "next";
import Link from "next/link";

interface IPost {
    id: number,
    title: string
}

export const metadata: Metadata = {
    title: "Blog Start Page",
    description: "Blog Start Page description"
}

async function getData(): Promise<IPost[]> {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        next: {
            revalidate: 60  //периодичность обновления кеш
        }
    })
    return response.json()
}

export default async () => {
    const posts = await getData()
    return (
        <>
            <h1>Blog</h1>
            <ul>
                {posts.map((post: IPost) => (
                        <li key={post.id}>
                            <Link href={`/blog/${post.id}`}>{post.title}</Link>
                        </li>
                    )
                )}
            </ul>
        </>
    )
}
