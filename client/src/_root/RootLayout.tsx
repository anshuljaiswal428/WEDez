import Navbar from "@/components/shared/NavBar/NavBar"
import { Outlet } from "react-router-dom"

const RootLayout = () => {
  return (
    <div className="flex flex-col">
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default RootLayout