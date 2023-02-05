import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { FormContainer, InputMinutesAmount, InputTask } from './styles'
import { useContext } from 'react'
import { CyclesContext } from '../..'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisa ser no mínimo 5min')
    .max(60, 'O ciclo precisa ser no máximo 60min'),
})

// interface newCycleFormData {
//   task: string
//   minutesAmount: number
// }
type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)

  /** function register(name: string){
   *   return{
   *    onChange: () => void;
   *    onBlur: () => void;
   *    ...
   *   }
   * }
   */
  const { register, handleSubmit, watch, reset } = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

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
        min={1}
        max={60}
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  )
}
