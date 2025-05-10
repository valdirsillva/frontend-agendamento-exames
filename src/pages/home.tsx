import { useEffect, useState } from "react"
import { Header } from "../header/header"
import { ModalAgendarExame } from "../components/modal/modal-agendar-exame"

// import { ModalAgendarExame } from '../components/modal/modal-agendar-exame'


export const Home = () => {
  const [listaExames, setListaExames] = useState([])

  const fetchExames = async () => {
    try {
      const data = await fetch(`${import.meta.env.VITE_APP_URL}/api/exames`)
      const response = await data.json()
      setListaExames(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchExames()
  }, [])

  return (
    <section className="w-full">
      <Header />

      <main className="w-full flex flex-col ">
        <div className="w-full md:w-full flex flex-col items-center jus mt-16  ">
          <h1 className="w-10/12 font-semibold flex gap-2 text-[#00be00] sm:flex-row md:text-3xl md:py-5 ">
            Exames disponíveis
          </h1>
        </div>

        <div className="w-full flex flex-row flex-wrap items-stretch gap-7 px-30 pt-14">
          {listaExames.map((exame: any) => (
            <div className="w-[23%] bg-[#aef5be] px-3 py-6 rounded-md" key={exame.id}>
              <p className="text-xl font-normal mb-2">{exame.nome}</p>
              <p className="font-light">Especialidade:</p>

              <div className="flex flex-wrap gap-2 mb-2 mt-2">
                {exame.especialidade.map((item: string, index: number) => (
                  <button
                    key={index}
                    className="bg-white text-[#639869] px-2 py-1 rounded-full text-sm font-medium shadow hover:bg-[#f0f0f0] transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="w-full flex justify-center">
                <ModalAgendarExame data={exame} />
              </div>
            </div>
          ))}
        </div>
      </main>
    </section>
  )
}