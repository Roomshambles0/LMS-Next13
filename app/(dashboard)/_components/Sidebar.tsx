import { Logo } from "./logo"
import { Sidebarroutes } from "./sidebar-routes"

export const Sidebar = ()=>{
    return(
        <div className="h-full flex flex-col overflow-y-auto bg-white border-r shadow-sm">
        <div className="p-6">
            <Logo/> 
            </div>
            <div className="flex flex-col w-full">
      <Sidebarroutes></Sidebarroutes>
            </div>
        </div>
    )
}