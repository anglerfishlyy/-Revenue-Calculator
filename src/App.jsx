import { useState } from 'react'

import './App.css'
import RevenueCalculator from './components/RevenueCalculator'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RevenueCalculator/>
    </>
  )
}

export default App
