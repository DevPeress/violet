import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient

export async function GET() {

}

export async function PUT(req: Request) {

}

export async function POST(req: Request) {

}

export async function DELETE(req: Request) {
    const body = await req.json();
    const { cpf } = body as { cpf: string }

    try {
        const conta = await prisma.user.findUnique({
            where: { cpf: cpf }
        })

        if (!conta) return NextResponse.json({ mensagem: "Erro ao encontrar conta para deletar!" },{ status: 200})
        
        await prisma.user.delete({
            where: { cpf: cpf }
        })

        return NextResponse.json({ mensagem: "Conta deletada!" },{ status: 204 })
    } catch(error) {
        console.error("[DELETE] :", error)
        return NextResponse.json({ mensagem: "Erro ao deletar!" },{ status: 200 })
    } finally {
        prisma.$disconnect()
    }
}

// npx prisma generate