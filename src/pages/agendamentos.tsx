import { Header } from "../header/header"
import { DataGrid } from '@mui/x-data-grid'
import { customStyles } from "../styles/custom-style-datagrid";
import { useEffect, useState } from "react";

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'nome', headerName: 'EXAME', width: 180 },
  { field: 'dataCriacao', headerName: 'DATA AGENDAMENTO', width: 200 },
  { field: 'observacao', headerName: 'observacao', width: 400 },
  {
    field: 'edit',
    headerName: '-',
    width: 200,
    renderCell: (params) => {
      const agendamentoId = params.row.id;
      return (
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', width: '100%' }}>
          {/* <ModalRemoverAgendamento agendamentoId={agendamentoId} /> */}
        </div>
      )
    },
  }
]

const paginationModel = { page: 0, pageSize: 5 }

export const Agendamentos = () => {

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
    <section className="w-full">
      <Header />

      <main className="w-full flex flex-col ">
        <div className="w-full md:w-full flex flex-col items-center mt-16  ">
          <h1 className="w-10/12 font-semibold flex gap-2 text-gray-200 sm:flex-row md:text-3xl md:py-5 ">
            Agendamentos
          </h1>
        </div>

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