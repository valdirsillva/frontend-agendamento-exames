import { toast } from 'react-toastify'
import { useState } from 'react'

export const useCriarAgendamentoExame = (exameId: string) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [fieldValues, setFieldValues] = useState({
    exame: '',
    observacao: '',
    dataAgendamento: ''
  })

  const handleChangeValues = (e: any) => {
    const fieldName = e.target.name
    const fieldValue = e.target.value

    setFieldValues((current) => {
      return {
        ...current,
        [fieldName]: fieldValue,
      }
    })
  }

  const salvarAgendamento = async () => {
    try {
      if (!fieldValues.dataAgendamento) {
        throw new Error('A data de agendamento não foi definida')
      }

      const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/agendamentos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          exame_id: exameId,
          observacao: fieldValues.observacao,
          dataAgendamento: fieldValues.dataAgendamento
        })
      })
      if (response.status === 201) {
        toast.success('Agendamento realizado com sucesso.')
      }
    } catch (error) {
      console.error(error)
      toast.error('A data de agendamento não foi definida')
    }
  }

  return {
    fieldValues, handleChangeValues, handleOpen, handleClose, open, setOpen, salvarAgendamento
  }
}