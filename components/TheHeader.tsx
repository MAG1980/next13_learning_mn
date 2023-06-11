import Link from "next/link";

const TheHeader = () => {
    return (
        <header>
            <nav>
                <Link href="/">Home</Link>
                <Link href="/Blog">Blog</Link>
                <Link href="/about">About</Link>
            </nav>
            <div>Изучение NexJS 13 по видео Михаила Непомнящего</div>
        </header>
    )
}

export {TheHeader}
