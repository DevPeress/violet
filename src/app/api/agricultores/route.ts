import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient

export async function GET() {
    try {
        const contas = await prisma.user.findMany()

        if (!contas) return NextResponse.json({ status: 200 }, { statusText: "Erro ao pegar os agricultores!" })

        return NextResponse.json(contas)
    } catch(error) {
        console.log("[GET]: ",error)
    } finally {
        prisma.$disconnect()
    }
}

export async function PUT(req: Request) {
    const body = await req.json();
    console.log(body)
}

export async function POST(req: Request) {
    const body = await req.json();
    const { id, nome, cpf, celular, data } = body as { id: number, nome: string, cpf: string, celular: string, data: string }
    
    try {
        const conta = await prisma.user.findUnique({
            where: { cpf: cpf }
        })

        if (!conta) {
            const criar = await prisma.user.create({
                data: {
                    id: id,
                    fullName: nome,
                    cpf: cpf,
                    phone: celular,
                    birthDate: new Date(data)
                }
            })

            if (!criar) return NextResponse.json({ status: 200 }, { statusText: "Erro ao criar agricultor!"  })

            return new NextResponse(null, { status: 201 })
        } else {
            return NextResponse.json({ status: 200 }, { statusText: "CPF ja possui conta!"})
        }
    } catch(error) {
        console.error("[POST]: ", error)
        return NextResponse.json({ status: 200 }, { statusText: "Erro ao criar!" })
    } finally {
        prisma.$disconnect()
    }
}

export async function DELETE(req: Request) {
    const body = await req.json();
    const { cpf } = body as { cpf: string }

    try {
        const conta = await prisma.user.findUnique({
            where: { cpf: cpf }
        })

        if (!conta) return NextResponse.json({ status: 200 }, { statusText: "Erro ao encontrar conta para deletar!" })
        
        await prisma.user.delete({
            where: { cpf: cpf }
        })

        return new NextResponse(null, { status: 204 })
    } catch(error) {
        console.error("[DELETE] :", error)
        return NextResponse.json({ status: 200 }, { statusText: "Erro ao deletar!" })
    } finally {
        prisma.$disconnect()
    }
}

// npx prisma generate