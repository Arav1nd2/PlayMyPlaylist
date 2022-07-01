import { SocketProvider } from "./hooks";
import HomePage from "./pages/Home";

function App() {
  return (
    <div className="App">
      <SocketProvider>
        <HomePage />
      </SocketProvider>
    </div>
  );
}

export default App;
