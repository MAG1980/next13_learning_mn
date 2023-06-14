import {NextResponse} from "next/server";

export async function DELETE(req: Request, {params}: { params: { id: string } }) {
    const {id} = params
    //Логика удаления поста с обращением к БД

    //Возвращаем id удалённого поста
    return NextResponse.json({id})
}
