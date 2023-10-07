import UserContextProvider from "./context/UserContext";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <Dashboard />
      </UserContextProvider>
    </div>
  );
}

export default App;
