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
    const { id } = body as { id: number }

    try {
        const conta = prisma.user.findUnique
    } catch(error) {
        console.error("[DELETE] :", error)
        return NextResponse.json({ mensagem: "Erro ao deletar!" },{ status: 200})
    } finally {
        prisma.$disconnect()
    }
}

// npx prisma generate