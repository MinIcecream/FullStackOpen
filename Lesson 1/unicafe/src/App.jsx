import { useState } from 'react' 
import Button from './Button'
import StatisticLine from './StatisticLine'
import Statistics from './Statistics'

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGoodCount = () => {
    setGood(good+1)
  }
  const incrementNeutralCount = () => {
    setNeutral(neutral+1)
  }
  const incrementBadCount = () => {
    setBad(bad+1)
  }
 
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick = {() => incrementGoodCount()} text = "good"/>
      <Button onClick = {() => incrementNeutralCount()} text = "neutral"/>
      <Button onClick = {() => incrementBadCount()} text = "bad"/>

      <h1>statistics</h1>
 
      {bad+good+neutral > 0
        ? <Statistics good = {good} neutral = {neutral} bad = {bad} />
        : <p>No feedback given</p>
      }
 
    </div>
  ) 
   
}

export default App
