'use client'

import Image from "next/image"
import { useMemo, useState } from "react";

interface Agricultores {
  id: number,
  nome: string,
  cpf: string,
  data: string,
  celular: string,
  ativo: boolean
}

export default function Home() {
  const [agricultores,setAgricultores] = useState<Agricultores[]>([
    { id: 1, nome: "Peres", cpf: "52773467833", data: "10/03/2004", celular: "11955992605", ativo: false },
    { id: 2, nome: "Peres", cpf: "teste", data: "10/03/2004", celular: "", ativo: true }
  ])
  const [pesquisa,setPesquisa] = useState<string>("")

  function formatCPF(value: string) {
    const numericValue = value.replace(/\D/g, "");

    return numericValue.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2") .replace(/(\d{3})(\d{1,2})$/, "$1-$2"); 
  }

  const excluirFuncionario = (id: number) => {
    setAgricultores((prevDados) => {
      return prevDados.filter((item) => item.id !== id);
    })
  }

  const AgricultoresFiltrados = useMemo(() => {
    const termoPesquisado = pesquisa.toLowerCase()
    
    return agricultores.filter(item => {
      const valores = `
        ${item.nome.toLowerCase()}
        ${item.cpf.toLowerCase()}
        ${item.data.toLowerCase()}
        ${item.celular.toLowerCase()}
      `

      return valores.includes(termoPesquisado)
    })

  }, [agricultores, pesquisa])

  return (
    <div className="flex absolute w-full h-full overflow-hidden items-center justify-center">
      <main className="flex absolute w-[80vw] h-[80vh] bg-[#F4F7FC] rounded-[1vw]"> 
        <div className="flex absolute w-full h-[10vh] top-0 items-center justify-center gap-[40vw]">
          <div className="flex relative w-[15vw] h-[3vh] bg-[#FFFFFF] rounded-[.5vw] items-center justify-center">
            <Image
              className="absolute left-[1vw]"
              src={'/Lupa.svg'}
              alt="Imagem do Pesquisar"
              width={12}
              height={12}
              priority
            />
            <input type="text" placeholder="Pesquise aqui" className="absolute w-[12vw] left-[2vw] text-[#A1A9B8] text-[.8vw] outline-none" value={pesquisa} onChange={(e) => setPesquisa(e.target.value)} />
          </div>

          <button className="flex relative w-[10vw] h-[3vh] bg-[#2264E5] rounded-[.5vw] text-[#FFFFFF] text-[.8vw] items-center justify-center hover:scale-110">Adicionar Agricultor</button>
        </div>

        <div className="flex absolute w-full max-h-[70vh] h-auto top-[10vh] overflow-hidden">
          <table className="w-full h-full">
            <thead className="w-full h-[3vh] text-[#464F60] text-[.7vw] border-b-[#E9EDF5] border-b-[.1vw] z-1000">
              <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>Data de Nascimento</th>
                <th>Celular</th>
                <th>Ativo</th>
              </tr>
            </thead>

            <tbody className= "max-h-[67vh] h-auto text-[#464F60] text-[.7vw] text-center bg-[#FFFFFF] overflow-auto">
              {AgricultoresFiltrados.map((item) => {

                return (
                  <tr key={item.id} className="relative h-[2.5vw] border-b-[#E9EDF5] border-b-[.1vw]">
                    <td className="h-full">
                      <div className="flex h-full justify-center items-center gap-[.5vw]">
                        <div className="relative">{item.nome}</div>
                        <Image
                          className="relative hover:scale-110"
                          src={'/Caneta.svg'}
                          alt="Editar dados"
                          width={14}
                          height={14}
                          priority
                        />
                      </div>
                    </td>
                    <td>{formatCPF(item.cpf)}</td>
                    <td className="h-full">
                      <div className="flex h-full justify-center items-center gap-[.5vw]">
                        <div className="relative">{item.data}</div>
                        <Image
                          className="relative hover:scale-110"
                          src={'/Caneta.svg'}
                          alt="Editar dados"
                          width={14}
                          height={14}
                          priority
                        />
                      </div>
                    </td>
                    <td className="h-full">
                      <div className="flex h-full justify-center items-center gap-[.5vw]">
                        <div className="relative">{item.celular}</div>
                        <Image
                          className="relative hover:scale-110"
                          src={'/Caneta.svg'}
                          alt="Editar dados"
                          width={14}
                          height={14}
                          priority
                        />
                      </div>
                    </td>
                    <td className="h-full">
                      <div className="flex h-full justify-center items-center gap-[.5vw]">
                        {item.ativo ? "Ativo" : "Dispensado"}
                        {item.ativo ? <></> : 
                          <Image
                            onClick={() => excluirFuncionario(item.id)}
                            className="relative hover:scale-110"
                            src={'/Excluir.svg'}
                            alt="Excluir dados"
                            width={14}
                            height={14}
                            priority
                          />
                        }
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
