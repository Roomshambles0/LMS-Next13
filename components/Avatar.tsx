import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { useSession } from "next-auth/react"
import { Image } from "lucide-react";
  
  export function ProfileImg() {
    const session = useSession()
    const img = session.data?.user?.image;
    const name = session.data?.user?.name;
    const trimname = name?.toUpperCase().slice(0,2) || "CN";
    return (
      <Avatar>
        <AvatarImage src={img as string | undefined} alt="/altuser.jpg" />
        <AvatarFallback>
          {trimname}
</AvatarFallback>
      </Avatar>
    )
  }
  