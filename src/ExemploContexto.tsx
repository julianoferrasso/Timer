import { createContext, useContext, useState } from 'react'

const CyclesContext = createContext({} as any)
/** */
/* const CyclesContext = createContext({} as any)
/* para componentes em arquivos diferente, deve exporta o contexto
**/

function Form() {
  const { activeCycle, setActiveCycle } = useContext(CyclesContext)
  return (
    <>
      <h2>Form: {activeCycle}</h2>
      <button
        onClick={() => {
          setActiveCycle(activeCycle + 1)
        }}
      >
        Form +
      </button>
    </>
  )
}

function Countdown() {
  const { activeCycle, setActiveCycle } = useContext(CyclesContext)
  return (
    <>
      <h1>Countdown {activeCycle}</h1>
      <button
        onClick={() => {
          setActiveCycle(activeCycle + 1)
        }}
      >
        Countdown +
      </button>
    </>
  )
}

export function ExemploContexto() {
  const [activeCycle, setActiveCycle] = useState(0)

  return (
    <CyclesContext.Provider value={{ activeCycle, setActiveCycle }}>
      <div>
        <h3>Home: {activeCycle}</h3>
        <button
          onClick={() => {
            setActiveCycle(activeCycle + 1)
          }}
        >
          Home +
        </button>
        <hr />
        <Form />
        <hr />
        <Countdown />
      </div>
    </CyclesContext.Provider>
  )
}
