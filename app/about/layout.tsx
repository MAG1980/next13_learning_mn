import React from "react";
import Link from "next/link";

export default function AboutLayout(
    {children}: { children: React.ReactNode }
) {
    return (
        <div>
            <h1>About Us</h1>
            <nav>
                <ul>
                    <li>
                        <Link href="/about/contacts/">Contacts</Link>
                    </li>
                    <li>
                        <Link href="/about/team/">Team</Link>
                    </li>
                </ul>
            </nav>
            {children}
        </div>
    )
}
