import './App.css'
import { useState } from 'react';
import { OPERATION } from './utils/enums';


function App() {
  const [result, setResult] = useState(null);

  const handleCalculate = async () => {
    const response = await fetch('http://localhost/api/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ a: 10, b: 5, operation: OPERATION.sum}),
    });

    const data = await response.json();
    setResult(data.result);
  };
  return (
    <div>
      <h1>Calculadora</h1>
      <button onClick={handleCalculate}>Calcular 10 + 5</button>
      <p>Resultado: {result}</p>
    </div>
  )
}

export default App


