import {NextResponse} from "next/server";
import {posts} from "@/app/api/posts/posts";

//http://localhost:3000/api/posts
export async function GET(request: Request) {
    // return NextResponse.json({message: 'hello'})

    //Получение параметров запроса в серверном компоненте
    const urlSearchParams = request.nextUrl.searchParams
    console.log(urlSearchParams.get("a"), urlSearchParams.get('b'))

    const {searchParams} = new URL(request.url)
    const query = searchParams.get("a")
    console.log(query)

    if (query) {
        let currentPosts = posts.filter(post => {
            return post.title.toLowerCase().includes(query?.toLowerCase())
        })
        console.log(currentPosts)
        return NextResponse.json(currentPosts)
    }
    return NextResponse.json(posts)
}

export async function POST(request: Request) {
    const body = await request.json()
    if (body) {
        return NextResponse.json({status: "ok"})
    }
    return NextResponse.json({status: "error"})
}
