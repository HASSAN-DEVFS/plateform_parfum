import { Route, Routes } from "react-router"
import Inscription from "./components/Pages/Inscription"
import { Toaster } from "./components/ui/sonner"
import Connexion from "./components/Pages/Connexion"
function App() {


  return (
    <>
      <Toaster position="top-right" richColors />
     {/* <Inscription/> */}
     <Routes>
      <Route path="/connexion" element={<Connexion/>}/>
      <Route path="/" element={<Inscription/>}/>
     </Routes>
    </>
  )
}

export default App
