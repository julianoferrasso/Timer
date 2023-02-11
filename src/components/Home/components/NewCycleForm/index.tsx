import { FormContainer, InputMinutesAmount, InputTask } from './styles'
import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { CyclesContext } from '../../../../contexts/CycleContext'

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <InputTask
        id="task"
        list="task-suggestions"
        placeholder="Dê um nome para o seu porjeto"
        disabled={!!activeCycle}
        {...register('task')}
      />
      <datalist id="task-suggestions">
        <option value="projeto-1" />
        <option value="projeto-2" />
        <option value="projeto-3" />
        <option value="projeto-4" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <InputMinutesAmount
        placeholder="00"
        type="number"
        id="minutesAmount"
        step={5}
        min={5}
        max={60}
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />
      <span>minutos.</span>
    </FormContainer>
  )
}
