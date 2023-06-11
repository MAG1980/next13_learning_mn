В проекте должен быть хотя бы один Layout.
По умолчанию - это RootLayout, хранящийся в файле layout.tsx папки app.
По умолчанию NextJS не добавляет тег <html></html> на каждую страницу. Это делает layout.
В качестве параметра layout принимает компонент страницы (page.tsx).
Повторяющиеся компоненты (такие как header, footer, aside), следует размещать в layout.

В корне папки app хранится файл глобальных стилей: global.css.
В global.css удобно объявлять глобальные css-переменные.
Препроцессоры необходимо устанавливать отдельно, т.к. по умолчанию NextJS их не подключает к проекту.

По умолчанию в NextJS присутствуют шрифты Google.
Чтобы использовать в компоненте, их нужно импортировать в виде функции, которую затем необходимо вызвать,
передав параметры шрифта в объете:
import {Inter} from 'next/font/google'
const inter = Inter({subsets:['latin']})
Результатом вызова функции будет объект, в котором имеется свойство className,
значение которого можно использовать для назначения шрифта нужным тегам.
<body className={inter.className}>{children}</body>

Каждый layout экспортирует объект metadata, который содержит данные, влияющие на SEO:
export const metadata: Metadata = {
title:"Current title",
description: "Current description"
}
Возможность увидеть все доступные свойства объекта metadata даёт тип Metadata.

Для навигации без перезгрузки страницы в NextJS присутствует компонент Link,
который имеет атрибут href (а не to, как в React Router):
<Link href="">

This is a [Next.js](https://nextjs.org/) project bootstrapped
with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and
load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions
are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use
the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
