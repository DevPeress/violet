'use client'

import Image from "next/image"
import { useEffect, useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface Agricultores {
  id: number,
  nome: string,
  cpf: string,
  data: string,
  celular: string,
  ativo: boolean
}

export default function Home() {
  const [agricultores,setAgricultores] = useState<Agricultores[]>([])
  const [pesquisa,setPesquisa] = useState<string>("")
  const [menu,setMenu] = useState<boolean>(false)
  const [adicionar,setAdicionar] = useState<boolean>(false)
  const [texto,setTexto] = useState<string>("")
  const [usuario,setUsuario] = useState({ nome: "", cpf: "", data: "", celular: "" })
  const [alterar,setAlterar] = useState({ id: 0, tipo: "" })

  function formatCPF(value: string) {
    const numericValue = value.replace(/\D/g, "");

    return numericValue.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2") .replace(/(\d{3})(\d{1,2})$/, "$1-$2"); 
  }

  function formatNumero(value: string) {
    const numericValue = value.replace(/\D/g, "");

    return numericValue.replace(/(\d{1})(\d)/, "($1$2) ").replace(/(\d{5})(\d)/, "$1-$2")
  }

  function formatarData(dateString: string) {
    const data = new Date(dateString);
    return data.toISOString().split('T')[0]; 
  }

  const excluirFuncionario = async (id: number, cpf: string) => {
    const excluir = await fetch('api', {
      method: "DELETE",
      body: JSON.stringify({
        cpf: cpf
      })
    })

    if (excluir.status === 204) {
       setAgricultores((prevDados) => {
        return prevDados.filter((item) => item.id !== id);
      })

      return toast.success("Agricultor Excluido!")
    }
  }

  const alterarDados = (id: number, tipo: keyof Agricultores) => {
    setMenu(true)
    setAlterar({ id: id, tipo: tipo })
  }

  const confirmarMenu = async () => {
    setAgricultores((prevDados) => 
      prevDados.map((item) =>
        item.id === alterar.id ? { ...item, [alterar.tipo]: texto } : item
      )
    )

    setMenu(false)
    setTexto("")
  }

  const cancelarMenu = () => {
    setMenu(false)
    setTexto("")
    setAlterar({ id: 0, tipo: "" })
  }

  const alterarCriar = (tipo: string, texto: string) => {
    if (tipo === "cpf") {
      texto = formatCPF(texto)
    }

    if (tipo === "celular") {
      texto = formatNumero(texto)
    }

    if (tipo === "data") {
      texto = formatarData(texto)
    }

    setUsuario((prevDados) => ({...prevDados, [tipo]: texto}) )
  }

  const confirmarAgricultor = async () => {
    if (usuario.cpf.length <= 14) {
      return toast.error("CPF inválido!")
    }

    const criar = await fetch('api/agricultores', {
      method: "POST",
      body: JSON.stringify({
        id: agricultores.length + 1,
        nome: usuario.nome,
        cpf: usuario.cpf,
        celular: usuario.celular,
        data: usuario.data
      })
    })

    if (criar.status === 201) {
      setAgricultores((prevDados) => [...prevDados, { id: agricultores.length + 1, nome: usuario.nome, cpf: usuario.cpf, data: usuario.data, celular: usuario.celular, ativo: true }]);
      setUsuario({ nome: "", cpf: "", data: "", celular: "" })
      setAdicionar(false)
      return toast.success("Agricultor adicionado!")
    }
  }

  const cancelarAgricultor = () => {
    setAdicionar(false)
    setTexto("")
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

  useEffect(() => {
    fetch('api/agricultores')
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data)) {
        const dados = data.map((item) => ({
          id: item.id,
          nome: item.fullName,
          cpf: item.cpf,
          data: item.birthDate? item.birthDate : "",
          celular: item.phone,
          ativo: item.asctive
        }))

        setAgricultores(dados)
      }
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])

  return (
    <div className="flex absolute w-full h-full overflow-hidden items-center justify-center">
      <main className="flex absolute w-[80vw] h-[80vh] bg-[#F4F7FC] rounded-[1vw] items-center- justify-center"> 

        {menu ? 
          <div className="flex absolute top-0 bottom-0 m-auto w-[12vw] h-[18vh] bg-[#A1A9B8] items-center justify-center rounded-[.5vw]">
            <h1 className="absolute top-[2vh] text-[1vw]">Alterar Informação</h1>
            <input className="absolute w-[10vw] h-[4vh] top-[6vh] text-center outline-none text-[.8vw] rounded-[.25vw] bg-[#FFFFFF]" type="text" placeholder="Insira a informação" value={texto} onChange={(e) => setTexto(e.target.value)} /> 
            <div className="flex absolute w-[10vw] h-[4vh] top-[12vh] items-center justify-between">
              <button className="relative flex w-[4vw] h-full bg-[#86EFAC] text-white text-[.75vw] items-center justify-center rounded-[.25vw] hover:bg-[#16A34A]" onClick={confirmarMenu}>Confirmar</button>
              <button className="relative flex w-[4vw] h-full bg-[#FCA5A5] text-black text-[.75vw] items-center justify-center rounded-[.25vw] hover:bg-[#DC2626]" onClick={cancelarMenu}>Cancelar</button>
            </div>
          </div>
        : <></>}

        {adicionar ? 
          <div className="flex absolute top-0 bottom-0 m-auto w-[25vw] h-[25vh] bg-[#A1A9B8] items-center justify-center rounded-[.5vw]">
            <h1 className="absolute top-[2vh] text-[1vw]">Adicionar Agricultor</h1>
            <div className="flex absolute top-[6vh] w-[24vw] h-[20vh] items-center justify-center">
              <input className="absolute w-[10vw] h-[4vh] top-[1vh] left-[1.5vw] text-center outline-none text-[.8vw] rounded-[.25vw] bg-[#FFFFFF]" type="text" placeholder="Insira o Nome" value={usuario.nome} onChange={(e) => alterarCriar("nome",e.target.value)} /> 
              <input className="absolute w-[10vw] h-[4vh] top-[1vh] right-[1.5vw] text-center outline-none text-[.8vw] rounded-[.25vw] bg-[#FFFFFF]" type="text" placeholder="Insira o CPF" value={usuario.cpf} onChange={(e) => alterarCriar("cpf",e.target.value)} maxLength={15} /> 
              <input className="absolute w-[10vw] h-[4vh] top-[7vh] left-[1.5vw] text-center outline-none text-[.8vw] rounded-[.25vw] bg-[#FFFFFF]" type="date" placeholder="Insira Data de Nascimento" value={usuario.data} onChange={(e) => alterarCriar("data",e.target.value)} /> 
              <input className="absolute w-[10vw] h-[4vh] top-[7vh] right-[1.5vw] text-center outline-none text-[.8vw] rounded-[.25vw] bg-[#FFFFFF]" type="text" placeholder="Insira o Celular" value={usuario.celular} onChange={(e) => alterarCriar("celular",e.target.value)} maxLength={16} /> 
            </div>
            <div className="flex absolute w-[21vw] h-[4vh] bottom-[2vh] items-center justify-between">
              <button className="relative flex w-[10vw] h-full bg-[#86EFAC] text-white text-[.75vw] items-center justify-center rounded-[.25vw] hover:bg-[#16A34A]" onClick={confirmarAgricultor}>Confirmar</button>
              <button className="relative flex w-[10vw] h-full bg-[#FCA5A5] text-black text-[.75vw] items-center justify-center rounded-[.25vw] hover:bg-[#DC2626]" onClick={cancelarAgricultor}>Cancelar</button>
            </div>
          </div>
        : <></>}

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

          <button className="flex relative w-[10vw] h-[3vh] bg-[#2264E5] rounded-[.5vw] text-[#FFFFFF] text-[.8vw] items-center justify-center hover:scale-110" onClick={() => setAdicionar(!adicionar)}>Adicionar Agricultor</button>
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
                          onClick={() => alterarDados(item.id,"nome")}
                          className="relative hover:scale-110"
                          src={'/Caneta.svg'}
                          alt="Editar dados"
                          width={14}
                          height={14}
                          priority
                        />
                      </div>
                    </td>
                    <td>{item.cpf}</td>
                    <td className="h-full">
                      <div className="flex h-full justify-center items-center gap-[.5vw]">
                        <div className="relative">{item.data}</div>
                        <Image
                          onClick={() => alterarDados(item.id,"data")}
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
                          onClick={() => alterarDados(item.id,"celular")}
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
                        {item.ativo ? "Ativo" : ""}
                        {item.ativo ? <></> : 
                          <Image
                            onClick={() => excluirFuncionario(item.id, item.cpf)}
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

      <Toaster/>
    </div>
  );
}
