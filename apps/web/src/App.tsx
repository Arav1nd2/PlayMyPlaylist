import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>Hello world {count}</h1>
      <button></button>
    </div>
  );
}

export default App;
