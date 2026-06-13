import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import {useState} from "react";


function App() {

  const [token, setToken] = useState(
      localStorage.getItem("access_token"));

  return (
    token ?
        <Dashboard setToken={setToken}/> :
        <Login setToken={setToken}/>
  )
}

export default App
