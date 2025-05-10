import { Header } from "../header/header"
import { DataGrid } from '@mui/x-data-grid'
import { customStyles } from "../styles/custom-style-datagrid";
import { useContext, useEffect, useState } from "react";
import { ModalRemoverAgendamento } from "../components/modal/modal-remover-agendamento";
import { ToastContainer } from "react-toastify";
import { DarkModeContext } from "../context/dark-mode-context";

const columns = [
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'nome', headerName: 'EXAME', width: 180 },
  { field: 'dataCriacao', headerName: 'DATA AGENDAMENTO', width: 230 },
  { field: 'observacao', headerName: 'OBSERVAÇÃO', width: 700 },
  {
    field: 'edit',
    headerName: '-',
    width: 100,
    renderCell: (params: any) => {
      return (
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', width: '100%' }}>
          <ModalRemoverAgendamento data={params} />
        </div>
      )
    },
  }
]

const paginationModel = { page: 0, pageSize: 5 }

export const Agendamentos = () => {
  const { darkMode } = useContext(DarkModeContext)

  const [listaAgendamentos, setListaAgendamentos] = useState([])

  const fetchExames = async () => {
    try {
      const data = await fetch(`${import.meta.env.VITE_APP_URL}/api/agendamentos`)
      const response = await data.json()
      setListaAgendamentos(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchExames()
  }, [])

  return (
    <section className={darkMode ? `bg-[#121218] h-screen` : `bg-white h-screen`}>
      <Header />

      <main className="w-full flex flex-col ">
        <div className="w-full md:w-full flex flex-col items-center mt-16  ">
          <h1 className="w-10/12 font-semibold flex gap-2 text-[#00be00] sm:flex-row md:text-3xl md:py-5 ">
            Agendamentos
          </h1>
        </div>
        <ToastContainer />
        <div className="w-full flex flex-row flex-wrap gap-4 px-30 pt-14">
          <DataGrid
            rows={listaAgendamentos}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            sx={{ border: 0, ...customStyles }}
          />
        </div>

      </main>
    </section>
  )
}