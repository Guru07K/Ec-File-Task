import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import SignUp from "./components/SignUp"
import SignIn from "./components/SignIn"
import DashBoard from "./components/DashBoard"
import VerifyAlert from "./components/VerifyAlert"
import Admin from "./components/Admin"
import AdminSignin from "./components/AdminSignin"

function App() {



  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/dashboard' element={<DashBoard/>}/>
        <Route path='/adminpanel' element={<Admin/>}/>
        <Route path='/admin-signin' element={<AdminSignin/>}/>
        <Route path='/verifyemail/:id' element={<VerifyAlert/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
