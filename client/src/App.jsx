import {Routes , Route} from "react-router-dom";
import './App.css'
import Homepage from './pages/Homepage'
import CreateNewForm from "./pages/CreateNewForm";
import ViewPage from "./pages/ViewPage";

function App() {

  return (
   <Routes>
    <Route path={"/"} element={<Homepage />} />
    <Route path={"/create-new-form"} element={<CreateNewForm />} />
    <Route path={"/edit-form/:formId"} element={<CreateNewForm />} />
    <Route path={"/view-form/:formId"} element={<ViewPage />} />

   </Routes>
  )
}

export default App
