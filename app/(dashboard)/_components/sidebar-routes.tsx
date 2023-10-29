"use client";

import { BarChart, Compass, Layout, List,Users } from "lucide-react";
import { usePathname } from "next/navigation";
import { SidebarItem } from "./SidebarItem";


const studentroutes = [
    {
        icon:Layout,
        label:"Dashboard",
        href:"/",
},
{
      icon:Compass,
      label:"Brows Courses",
      href:"/search",
},{
    icon:Users,
    label:"Communities",
    href:"course/communities"
}
]

const teacherroutes = [
    {
        icon:List,
        label:"Courses",
        href:"/teacher/courses",
},
{
      icon:BarChart,
      label:"Analytics",
      href:"/teacher/analytics"
},{
    icon:Users,
    label:"Communities",
    href:"course/communities"
}
]



export const Sidebarroutes =()=>{
   const pathname = usePathname();

   const isteacher = pathname.includes("/teacher");
   
   const routes = isteacher ? teacherroutes : studentroutes;

    return(<div className="flex flex-col w-full">
        {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>)
}