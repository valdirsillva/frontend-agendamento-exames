import { Box, Modal, TextField, Typography } from '@mui/material'
import { useCriarAgendamentoExame } from '../../hooks/use-criar-agendamento-exame';
import { CustomInput, TextFieldCustom } from '../../styles/custom-style';
import { Fragment } from 'react/jsx-runtime';

export const ModalAgendarExame = (props: any) => {
  const { data: { nome, id } } = props
  const { fieldValues, handleChangeValues, handleOpen, handleClose, open, salvarAgendamento } = useCriarAgendamentoExame(id)

  return (
    <Fragment>
      <div className="w-full flex justify-start">
        <a onClick={handleOpen}
          className="cursor-pointer flex bg-violet-500 text-white rounded-full py-2 px-4">
          Agendar
        </a>
      </div>
      <section className="">
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
              Agendar exame
            </Typography>

            <div className="w-full flex flex-col mt-10 gap-4">
              <div className="">

                <TextField
                  id="exame"
                  name="exame"
                  // label="Exame"
                  type="text"
                  value={nome}
                  aria-readonly
                  autoComplete="current-password"
                  sx={TextFieldCustom}
                  className={`${CustomInput}`}
                  onChange={handleChangeValues}
                />
              </div>

              <div className="sm:w-full md:w-12/12">

                <input type='datetime-local'
                  id="dataAgendamento"
                  name="dataAgendamento"
                  value={fieldValues.dataAgendamento}
                  className={`${CustomInput}`}
                  onChange={handleChangeValues}
                // min={Date.now()}
                />

              </div>

              <div className="sm:w-full md:w-12/12">
                <TextField
                  id="observacao"
                  name="observacao"
                  label="Observações"
                  type="text"
                  sx={TextFieldCustom}
                  className={`${CustomInput}`}
                  value={fieldValues.observacao}
                  autoComplete="current-description"
                  onChange={handleChangeValues}
                />
              </div>

              <div className="sm:w-full md:w-12/12 flex gap-5">
                <button
                  type="button"
                  onClick={handleClose}
                  className={`flex justify-center border-2 border-[#ef0b0b] rounded-md transparent px-8 py-3 text-sm font-semibold leading-6 text-white shadow-sm`}
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  onClick={salvarAgendamento}
                  // disabled={!isLoginFormValid}
                  className={`flex justify-center rounded-md bg-[#04b200] px-8 py-3 border-2 border-[#04b200] text-sm font-semibold leading-6 text-white shadow-sm`}
                >
                  Salvar
                </button>
              </div>
            </div>
          </Box>
        </Modal>
      </section>
    </Fragment >
  );
}