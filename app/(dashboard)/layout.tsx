import { redirect } from "next/navigation";
import { getCurrentAdmin } from "../actions/getCurrentAdmin";
import { Navbar } from "./_components/Navbar";
import { Sidebar } from "./_components/Sidebar";
import toast from "react-hot-toast";



const DashboardLayout = async({
  children
}: {
  children: React.ReactNode;
}) => {
    
  
  return ( 
    <div className="h-full">
      <div className="w-full h-[80px] lg:pl-56 flex fixed border-b shadow-sm bg-white inset-y-0 z-50">
        <Navbar/>
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar/>
      </div>
    <div >
        {children}
    </div>  
    </div>
   );
}
 
export default DashboardLayout;