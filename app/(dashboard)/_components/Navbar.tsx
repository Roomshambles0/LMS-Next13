import { Navbarroutes } from "@/components/navbar-routes"
import { MobileSidebar } from "./Mobile-Sidebar"

export const Navbar = ()=>{
    return(
        <div className="p-4 border-b  h-full flex items-center bg-white shadow-sm">
            <MobileSidebar/>
            <Navbarroutes/>
        </div>
    )
}