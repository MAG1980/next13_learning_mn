import Link from "next/link";
import styles from "./TheHeader.module.css"

const TheHeader = () => {
    return (
        <header className={styles.header}>
            <nav className="header-nav">
                <Link href="/">Home</Link>
                <Link href="/blog">Blog</Link>
                <Link href="/about">About</Link>
            </nav>
            <div>Изучение NexJS 13 по видео Михаила Непомнящего</div>
        </header>
    )
}

export {TheHeader}
