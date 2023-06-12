import {NextResponse} from "next/server";
import {posts} from "@/app/api/posts/posts";

//http://localhost:3000/api/posts
export async function GET(request: Request) {
    // return NextResponse.json({message: 'hello'})
    return NextResponse.json(posts)
}

export async function POST(request: Request) {
    const body = await request.json()
    if (body) {
        return NextResponse.json({status: "ok"})
    }
    return NextResponse.json({status: "error"})
}
