import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient

export async function GET() {
    try {
        const contas = await prisma.user.findMany()

        if (!contas) return NextResponse.json({ message: "Erro ao pegar os agricultores!" }, { status: 200 })

        return NextResponse.json(contas)
    } catch(error) {
        console.log("[GET]: ",error)
        return NextResponse.json({ message: "Erro ao achar agricultores!" }, { status: 200 })
    } finally {
        prisma.$disconnect()
    }
}

export async function PUT(req: Request) {
    const body = await req.json();
    const { cpf, tipo, texto } = body as { cpf: string; tipo: string; texto: string };

    try {
        const conta = await prisma.user.findUnique({
        where: { cpf },
        });

        if (!conta) return NextResponse.json({ message: "Erro ao encontrar dados!" }, { status: 404 });

        const update = await prisma.user.update({
            where: { cpf },
            data: { 
                [tipo]: texto 
            }
        })

        if (update) {
        return new NextResponse(null, { status: 200 });
        } else {
        return NextResponse.json({ message: "Erro ao editar os dados!" }, { status: 400 });
        }
    } catch (error) {
        console.error("[PUT]: ", error);
        return NextResponse.json({ message: "Erro ao alterar dados!" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

export async function POST(req: Request) {
    const body = await req.json();
    const { id, fullName, cpf, phone, birthDate } = body as { id: number, fullName: string, cpf: string, phone: string, birthDate: string }
    
    try {
        const conta = await prisma.user.findUnique({
            where: { cpf: cpf }
        })

        if (!conta) {
            const criar = await prisma.user.create({
                data: {
                    id: id,
                    fullName: fullName,
                    cpf: cpf,
                    phone: phone,
                    birthDate: new Date(birthDate)
                }
            })

            if (!criar) return NextResponse.json({ message: "Erro ao criar agricultor!"  }, { status: 200 })

            return new NextResponse(null, { status: 201 })
        } else {
            return NextResponse.json({ message: "CPF ja possui conta!"}, { status: 200 })
        }
    } catch(error) {
        console.error("[POST]: ", error)
        return NextResponse.json({ message: "Erro ao criar!" }, { status: 200 })
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

        if (!conta) return NextResponse.json({ message: "Erro ao encontrar conta para deletar!" }, { status: 200 })
        
        await prisma.user.delete({
            where: { cpf: cpf }
        })

        return new NextResponse(null, { status: 204 })
    } catch(error) {
        console.error("[DELETE] :", error)
        return NextResponse.json({ message: "Erro ao deletar!" }, { status: 200 })
    } finally {
        prisma.$disconnect()
    }
}

// npx prisma generate