import { createContext, useState } from 'react'
import { HandPalm, Play } from 'phosphor-react'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'

import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'
// import { FormProvider } from 'react-hook-form/dist/useFormContext'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CycleContextData {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  handleSetAmountPassed: (arg: number) => void
}

export const CyclesContext = createContext({} as CycleContextData)

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

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  /** function register(name: string){
   *   return{
   *    onChange: () => void;
   *    onBlur: () => void;
   *    ...
   *   }
   * }
   */
  const formNewCycle = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = formNewCycle

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  function handleSetAmountPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function handleCreateNewCycle(data: newCycleFormData) {
    const cycleId = String(new Date().getTime())

    const newCycle: Cycle = {
      id: cycleId,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    // setCycles([...cycles, newCycle]) usar closures
    setCycles((state) => [...state, newCycle])
    setAmountSecondsPassed(0)
    setActiveCycleId(cycleId)

    reset()
  }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )

    setActiveCycleId(null)
  }

  const task = watch('task')
  const isSubmitDisable = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            amountSecondsPassed,
            markCurrentCycleAsFinished,
            handleSetAmountPassed,
          }}
        >
          <FormProvider {...formNewCycle}>
            <NewCycleForm />
          </FormProvider>

          <Countdown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <StopCountdownButton onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisable} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
