Зарезервированные называния:
layout.tsx
page.tsx
loading.tsx //прелоадер
error.tsx //ошибка при обращении к API (ошибку нужно генеририровать вручную в функциях получения данных)
metadata{} //метаданные для статических страниц
generateMetadata()  //метаданные для динамических страниц

В проекте должен быть хотя бы один Layout.
По умолчанию - это RootLayout, хранящийся в файле layout.tsx папки app.
По умолчанию NextJS не добавляет тег <html></html> на каждую страницу. Это делает layout.
В качестве параметра layout принимает компонент страницы (page.tsx).
Повторяющиеся компоненты (такие как header, footer, aside), следует размещать в layout.

Чтобы создать вложенный layout, необходимо его файл расположить в папке соответствующего маршрута.
В этот layout будут оборачиваться все вложенные страницы,
а сам он будет обёрнут в корневой layout.
Допускается создавать неограниченное количество вложенных layout.

Чтобы создать несколько корневых макетов , удалите файл верхнего уровня layout.jsи добавьте layout.jsфайл в каждую
группу маршрутов.
Это полезно для разделения приложения на разделы с совершенно другим пользовательским интерфейсом или опытом.
Теги <html>и <body>необходимо добавить к каждому корневому макету.

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

Файлы страниц (page.tsx) должны экспортировать свои компоненты по умолчанию.

Организуйте маршруты, не влияя на путь URL
Чтобы организовать маршруты, не влияя на URL-адрес, создайте группу, чтобы связать связанные маршруты.
Папки в скобках будут исключены из URL-адреса (например, (marketing)или (shop)).
Несмотря на то, что маршруты внутри (marketing)и (shop)совместно используют одну и ту же иерархию URL-адресов,
вы можете создать другой макет для каждой группы, добавив файл layout.js в их папки.

Динамический сегмент можно создать, заключив имя папки в квадратные скобки: [folderName]. Например, [id]или [slug].
Динамические сегменты передаются в качестве params реквизита функциям layout, page, route и generateMetadata.
Функцию generateStaticParams можно использовать в сочетании с динамическими сегментами маршрутов для статического
создания маршрутов во время сборки,
а не по запросу во время запроса.

Для создания динамического маршрута необходимо в папке приложения создать вложенную папку,
название которой содержит [slug].
Тогда внутри компонента страницы slug можно будет получить из свойства params объекта props:
({params:{id}}:Props)

Динамические сегменты можно расширить, чтобы охватить все последующие сегменты, добавив в скобки
многоточие [...folderName].
Например, app/shop/[...slug]/page.js будет соответствовать /shop/clothes, но также и /shop/clothes/tops,
/shop/clothes/tops/t-shirts и так далее:

Маршрут:    app/shop/[...slug]/page.js
url:        /shop/a/b/c
params:     { slug: ['a', 'b', 'c'] }

Доступ к динамическим сегментам можно получить из useRouter.

useSearchParams - это хук клиентского компонента,
который позволяет вам прочитать параметры запроса текущего URL-адреса .

SEO
Для SEO-оптимизации статических страниц сайта
следует из файлов страниц (page.tsx) экспортировать объект metadata:Metadata (название зарезервировано):
export const metadata: Metadata = {
title: 'About us',
description: 'Информация о нас'
}

Для SEO-оптимизации динамических страниц сайта
следует из файлов страниц (page.tsx) экспортировать функцию generateMetadata() (название зарезервировано),
в которую в качестве параметров следует передать те же параметры,
что и в основную функцию, возвращающую JSX.
generateMetadata должна возвращать объект с полями title, description и другими метаданными.

По умолчанию в NextJS 13 все компоненты, хранящиеся в папке @app/ являются серверными.
Плюсом серверных компонентов является то, что они отдают браузеру готовый HTML-код,
который был подготовлен сервером.
Это повышает скорость загрузки страниц браузером, т.к. ему не приходится скачивать с сервера весь JS-бандл,
а затем рендерить его.
Серверные компоненты максимально подходят для отрисовки страниц со статичным контентом,
т.к. не имеющих состояния и не взаимодействующих с пользователем.
В серверных компоненнтах отсутствует возможность использования состояния, хуков, методов жизненного цикла.
В перечисленных выше случаях требуется использовать клиентские компоненты.

В заголовке клиентлиентского компонента нужно использовать директиву 'use client'.

Чтобы указать на необходимось вызова функции на сервере,
нужно в её теле использовать директиву 'use server'.

Получение данных на страницах.
В отличие от обычных React-компонентов, серверные компоненты могут быть асинхронными.
Чтобы объявить асинхронный серверный компонент следует использовать ключевое слово async.
Это позволит серверному компоненту вызывать асинхронные функции и
дожидаться результатов их исполнения (асинхронного получения данных из БД) с помощью ключевого слова await,
до отправки готового HTML-кода клиенту.

По умолчанию в серверных компонентах (page) функция fetch срабатывает на сервере.
Для этого достаточно объявить в файле страницы пользовательскую функцию, например, getData (название
нерегламентируется),
которая будет использовать fetch(). fetch(), выполняющийся на сервере обладает расширенными настройками.
По умолчанию NextJS кеширует сгенерированные с использованием асинхронных данных страницы,
т.е. запрос к API происходит только при первом обращении к нужному url,
при повторном - данные берутся из кеш.
Для управления настройками кеширования в NextJS следует использовать дополнительное свойство объекта с настройками
fetch:
next:{
revalidate: 60, //период повторного запроса к API для обновления данных в кеш
}

Статическая и динамическая выборка данных
Существует два типа данных: статические и динамические .

Статические данные — это данные, которые не меняются часто. Например, запись в блоге.
Динамические данные — это данные, которые часто изменяются или могут быть специфичными для пользователей.
Например, список корзины.

По умолчанию Next.js автоматически выполняет статическую выборку. \
Это означает, что данные будут извлекаться во время сборки, кэшироваться и повторно использоваться при каждом запросе.
Как разработчик, вы можете контролировать кэширование и повторную проверку статических данных .
Есть два преимущества использования статических данных:

Это снижает нагрузку на вашу базу данных, сводя к минимуму количество сделанных запросов.
Данные автоматически кэшируются для повышения производительности загрузки.

Стриминг и приостановка
Стриминг и приостановка— это новые функции React, которые позволяют вам постепенно отображать и постепенно передавать
визуализированные единицы пользовательского интерфейса клиенту.

С помощью серверных компонентов и вложенных макетов вы можете мгновенно отображать части страницы,
которым не требуются данные, и отображать состояние загрузки для тех частей страницы, которые извлекают данные.
Это означает, что пользователю не нужно ждать, пока загрузится вся страница,
прежде чем он сможет начать с ней взаимодействовать.

Параллельная и последовательная выборка данных
При извлечении данных внутри компонентов вам необходимо знать о двух шаблонах извлечения данных: параллельном и
последовательном.

Последовательная и параллельная выборка данных
При параллельной выборке данных запросы в маршруте инициируются с готовностью и загружают данные одновременно.
Это уменьшает каскады клиент-сервер и общее время, необходимое для загрузки данных.
При последовательной выборке данных запросы на маршруте зависят друг от друга и создают водопады.
Могут быть случаи, когда вам нужен этот шаблон, потому что одна выборка зависит от результата другой, или вы хотите,
чтобы условие было выполнено перед следующей выборкой для экономии ресурсов.
Однако такое поведение также может быть непреднамеренным и привести к увеличению времени загрузки.

Ошибки в консоли браузера часто возникают из-за установленных в браузере расширений.
Чтобы избавиться от таких ошибок нужно открывать localhost:3000 в режиме инкогнито.

При длительной загрузке страницы NextJs будет отдавать в браузер страницу-прелоадер,
которая по умолчанию должна возвращаться компонентом, хранящимся в файле loading.tsx,
хранящимся к корне папки app.

Аналогично - для отображения страницы ошибки в корне папки app нужно создать файл error.tsx.
error.tsx должен содержать директиву 'use client', а также компонент, принимающий в качестве параметра объект ошибки:
{error:{error:Error}}
По умолчанию в случае возникновения необработанной ошибки React отображает пустую страницу (белый экран).
Наличие страницы error.tsx даёт возможность отображать пользователю текст ошибки на странице.
Эту ошибку предварительно необходимо выбросить в функции получения данных в случае ошибки при обращении к API при
проверке статуса ответа (!response.ok).
Страница error.tsx отображается только в production режиме.
В режиме разработки отображается всплывающее окно с ошибкой.

На разных уровнях вложенности можно использовать разные loading.tsx и error.tsx.

API эндпойнты
Для создания API в NextJS требуется создать папку @/app/api.
Если для создания страниц нужно в папках создавать файлы page.tsx,
то для создания эндпойнтов API требуется создавать файлы route.tsx.
Запрещается создавать в одной папке одновременно файлы page.tsx и route.tsx,
т.к. это будет вызывать ошибки.
Из названий директорий в пути к файлу route.jsx будет формироваться url эндпойнта API.

Файлы route.tsx должны экспортировать асинхронные функции с именами,
соответствующими HTTP-глаголам (методам) (GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS).
export async function GET (request: Request){}
При использовании неподдерживаемых методов NextJS вернёт ошибку 405 (Метод не поддерживается).

В маршрутах вы можете использовать req.nextUrl.searchParams который возвращает URLSearchParams.
Вы получаете определенный параметр с помощью req.nextUrl.searchParams.get("paramName").

Другой вариант извлечения параметров запроса в серверном компоненте:
const {searchParams} = new URL(request.url)

https://github.com/michey85/next-blog-app/blob/api-points-basics/README.md
Handlers API
Для создания API-роутов внутри /app директории, как правило, создается вложенная директория /api со своими папками,
внутри которых создается файл с названием route.ts.

Если файл находит по пути /app/api/posts/, то адрес запроса будет /api/posts.

Сам route.ts должен экспортировать объект с функциями по именам HTTP методов: GET, POST, DELETE и так далее.

Функции должны возвращать результат работы метода json встроенного в NextJS класса NextResponse.
Например:

export async function GET(req: Request) {
return NextResponse.json(currentPosts);
}`

Извлечение данных
// получение квери параметров

export async function GET(req: Request) {
const { searchParams } = new URL(req.url);

const query = searchParams.get("q");

// some logic

return NextResponse.json(currentPosts);
}
// получение тела запроса

export async function POST(req: Request) {
const body = await req.json();

console.log(body);

return NextResponse.json({ message: "done" });
}
// получение параметров URL

export async function DELETE(
req: Request,
{ params }: { params: { id: string } }
) {
const id = params?.id;

// some logic for delete post by id

return NextResponse.json({ id });
}
Встроенные функции
import { headers, cookies } from "next/headers";

export async function GET(req: Request) {
const headersList = headers();
const cookiesList = cookies();

const type = headersList.get("Content-Type");
const Cookie_1 = cookiesList.get("Cookie_1")?.value;

return NextResponse.json({});
}
import { redirect } from "next/navigation";

export async function GET(request: Request) {
redirect("https://nextjs.org/");
}

Добавление Prisma и Postgres в проект
https://ethanmick.com/how-to-set-up-prisma-with-next-js-postgres/

Docker: работа с контейнерами
https://ealebed.github.io/posts/2017/docker-работа-с-контейнерами/

Запустите Postgres Container
Postgres - моя предпочтительная база данных, и ее очень легко запустить локально с помощью docker. Просто запустите:
docker run --rm --publish 5432:5432 -e POSTGRES_HOST_AUTH_METHOD=trust -e POSTGRES_DB=databasename postgres

Когда изображение запущено, вы можете подключиться через порт, 5432 используя имя пользователя postgres, без пароля.
Убедитесь, что вы подключаетесь к базе данных, имя которой вы использовали выше, а не к базе данных по умолчанию.

ВНИМАНИЕ: для POSTGRES_HOST_AUTH_METHOD установлено значение «доверять».
Это позволит любому, у кого есть доступ к порту Postgres, получить доступ к вашей базе данных без пароля, даже если
установлен POSTGRES_PASSWORD.
См. документацию PostgreSQL о «доверии»: https://www.postgresql.org/docs/current/auth-trust.html
В конфигурации Docker по умолчанию это фактически любой другой контейнер в той же системе.
Не рекомендуется использовать POSTGRES_HOST_AUTH_METHOD=trust. Замените его на «-e POSTGRES_PASSWORD=password»,
чтобы установить пароль в «docker run».
****************************************************************************************
Файлы, принадлежащие этой системе баз данных, будут принадлежать пользователю «postgres».
Этот пользователь также должен владеть серверным процессом.
Кластер базы данных будет инициализирован с локалью "en_US.utf8".
Соответственно, кодировка базы данных по умолчанию была установлена на «UTF8».
Конфигурация текстового поиска по умолчанию будет установлена на «english».
Контрольные суммы страницы данных отключены.

npm install prisma --save-dev
npm i -D prisma
npm i @prisma/client
npx prisma init
prisma generate //вводится в консоль дословно (без npm)

1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet,
   read https://pris.ly/d/getting-started
2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite,
   sqlserver, mongodb or cockroachdb.
3. Run prisma db pull to turn your database schema into a Prisma schema.
4. Run prisma generate to generate the Prisma Client. You can then start querying your database.

1. Установите DATABASE_URL в файле .env так, чтобы он указывал на вашу существующую базу данных. Если в вашей базе
   данных еще нет таблиц, прочитайте https://pris.ly/d/getting-started.
2. Установите поставщика блока источника данных в schema.prisma в соответствии с вашей базой данных: postgresql, mysql,
   sqlite, sqlserver, mongodb или cockroachdb.
3. Запустите prisma db pull, чтобы превратить вашу схему базы данных в схему Prisma.
4. Запустите prisma generate, чтобы сгенерировать Prisma Client. Затем вы можете начать запрашивать вашу базу данных.

Миграции
prisma migrate dev
или
npx prisma migrate reset.

Заполнение базы данных
Если вы хотите заполнить базу данных, вам необходимо установить, ts-node который запустит для вас начальный скрипт.
npm i -D ts-node
Затем обновите свой package.json, чтобы включить новый ключ Prisma. Это будет на верхнем уровне с начальной командой в
нем:
"prisma": {
"seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
},

Создание seeder (сценарий заполнения)
Создайте новый файл, расположенный по адресу prisma/seed.ts.

Чтобы выполнить "посев" БД, вы можете запустить:
npx prisma db seed
Заполнение также выполняется при запуске prisma migrate dev или npx prisma migrate reset.

Использование клиента
Создайте новый файл по адресу lib/prisma.ts. Если у вас нет папки lib, создайте ее.
Этот файл не следует экспортировать в накопительный файл barrel (index.ts ), поскольку клиент Prisma нельзя использовать
в браузере.
Вместо этого импортируйте его как:
import { prisma } from '@/lib/prisma'

Использование клиента Prisma
Вы можете использовать клиент Prisma в любом месте сервера.
Вы часто будете использовать его в маршрутах API для изменения данных и в своих компонентах для извлечения данных.

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
