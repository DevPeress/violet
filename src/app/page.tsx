import Image from "next/image"

export default function Home() {
  return (
    <div className="flex absolute w-full h-full overflow-hidden items-center justify-center">
      <main className="flex absolute w-[80vw] h-[80vh] bg-[#F4F7FC] rounded-[1vw]"> 
        <div className="flex absolute w-full h-[10vh] top-0 items-center justify-center gap-[40vw]">
          <div className="flex relative w-[15vw] h-[3vh] bg-[#FFFFFF] rounded-[.5vw] items-center justify-center">
            <Image
              className="absolute left-[1vw]"
              src={'/Lupa.svg'}
              alt="Fundo da página"
              width={12}
              height={12}
              priority
            />
            <input type="text" placeholder="Pesquise aqui" className="absolute w-[12vw] left-[2vw] text-[#A1A9B8] text-[.8vw] outline-none" />
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
              <tr className="relative h-[2.5vw] ">
                <td>Peres</td>
                <td>Peres</td>
                <td>Peres</td>
                <td>Peres</td>
                <td>Peres</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
