import { Routes, Route } from "react-router-dom"
import './globals.css';
import AuthLayout from "./_auth/AuthLayout";
import SigninForms from "./_auth/forms/SigninForms";
import SignupForms from "./_auth/forms/SignupForms";
import RootLayout from "./_root/RootLayout";
import Home from "./_root/pages/Home/Home";
import { Toaster } from "./components/ui/toaster";

const App = () => {
  return (
    <main className='flex h-screen'>
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout/>}>
          <Route path="/sign-in" element={<SigninForms/>}/>
          <Route path="/sign-up" element={<SignupForms/>}/>
        </Route>

        {/* Private Routes */}
        <Route element={<RootLayout/>}>
          <Route index element = {<Home/>}/>
        </Route>
      </Routes>
      <Toaster/>
    </main>
  )
}

export default App