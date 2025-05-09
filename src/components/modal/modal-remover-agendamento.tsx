import { Box, Modal, TextField, Typography } from '@mui/material'
import { useCriarAgendamentoExame } from '../../hooks/use-criar-agendamento-exame';
import { CustomInput, TextFieldCustom } from '../../styles/custom-style';
import { Fragment } from 'react/jsx-runtime';

export const ModalRemoverAgendamento = ({ agendamentoId }: any) => {
  const { fieldValues, handleOpen, handleClose, open } = useCriarAgendamentoExame(agendamentoId)

  const removerAgendamento = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/agendamentos/${agendamentoId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar agendamento');
      }

      console.log('Agendamento removido com sucesso!');
    } catch (error) {
      console.error('Erro ao remover agendamento:', error);
    }
  }

  return (
    <Fragment>
      <div className="w-full flex justify-start">
        <a onClick={handleOpen}
          className="cursor-pointer flex bg-violet-500 text-white rounded-full py-2 px-4">
          Agendar
        </a>
      </div>
      <section className="">
        <Delete
          fontSize='medium'
          titleAccess='Deletar produto'
          onClick={handleOpen}
          className='cursor-pointer text-red-600'
        />
        <Modal
          open={open}
          // open
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className='w-full flex items-center justify-center'
        >
          <Box className="md:w-[550px] sm:w-full flex flex-col bg-black border-solid border-[#c1c6cf4a] rounded-sm p-8 transform">
            <Typography className="uppercase font-semibold text-orange-400" id="modal-modal-title" variant="h6" component="h2">
              Deseja remover o agendamento?
            </Typography>

            <div className="flex flex-col mt-10 gap-4">
              <div className="w-12/12 flex gap-3 flex-col">
                <span>Exame: {fieldValues.exame} </span>
                <span>Data agendamento: {fieldValues.dataAgendamento} </span>
              </div>

              <div className="w-12/12 flex gap-5 mt-5">
                <button
                  type="button"
                  onClick={handleClose}
                  className={`flex justify-center border-2 border-[#04b200] rounded-md transparent  px-8 py-3 text-sm font-semibold leading-6 text-white shadow-sm`}
                >
                  Não
                </button>

                <button
                  type="button"
                  onClick={removerAgendamento}
                  // disabled={!isLoginFormValid}
                  className={`flex justify-center rounded-md bg-[#ef0b0b] px-8 py-3 border-2 border-[#ef0b0b] text-sm font-semibold leading-6 text-white shadow-sm`}
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