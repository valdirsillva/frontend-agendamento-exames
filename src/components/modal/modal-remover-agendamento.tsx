import { Delete } from '@mui/icons-material'
import { Box, Modal, Typography } from '@mui/material'
import { useCriarAgendamentoExame } from '../../hooks/use-criar-agendamento-exame';
import { Fragment } from 'react/jsx-runtime';
import { toast } from 'react-toastify';

export const ModalRemoverAgendamento = ({ data }: any) => {
  const { handleOpen, handleClose, open } = useCriarAgendamentoExame(data.row.id)

  const removerAgendamento = async () => {
    try {
      if (!data.row.id) {
        throw new Error('Id do exame não está sendo passado')
      }

      const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/agendamentos/${data.row.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Erro ao deletar agendamento')
      }

      toast.success('Agendamento removido com sucesso.')
    } catch (error) {
      console.error('Erro ao remover agendamento:', error)
    }
  }

  return (
    <Fragment>
      <section className="w-full flex justify-center items-center">
        <Delete
          fontSize='medium'
          titleAccess='Deletar produto'
          onClick={handleOpen}
          className='cursor-pointer text-red-600 mt-3'
        />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className='w-full flex items-center justify-center'
        >
          <Box className="md:w-[550px] sm:w-full flex flex-col bg-white border-solid border-[#c1c6cf4a] rounded-sm p-8 transform">
            <Typography className="uppercase font-bold  text-[#4763ed]" id="modal-modal-title" variant="h6" component="h2">
              Deseja remover o agendamento?
            </Typography>

            <div className="flex flex-col mt-10 gap-4">
              <div className="w-12/12 flex gap-3 flex-col">
                <span className="text-gray-600">Exame: {data.row.nome} </span>
                <span className="text-gray-600">Data agendamento: {data.row.dataCriacao} </span>
              </div>

              <div className="w-12/12 flex gap-5 mt-5">
                <button
                  type="button"
                  onClick={handleClose}
                  className={`flex justify-center border-2 border-[#04b200] rounded-md transparent  px-6 py-3 text-sm font-semibold leading-6 text-[#121218] shadow-sm`}
                >
                  Não
                </button>

                <button
                  type="button"
                  onClick={removerAgendamento}
                  className={`flex justify-center cursor-pointer rounded-md bg-[#ef0b0b] px-8 py-3 border-2 border-[#ef0b0b] text-sm font-semibold leading-6 text-[white] shadow-sm`}
                >
                  Sim
                </button>
              </div>
            </div>
          </Box>
        </Modal>
      </section>
    </Fragment >
  );
}