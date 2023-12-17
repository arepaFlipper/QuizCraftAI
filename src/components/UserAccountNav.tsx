"use client"

import { type User } from "next-auth";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import UserAvatar from "@/components/UserAvatar";

type Props = {
  user: Pick<User, 'name' | 'email' | 'image'>;
}

const UserAccountNav = ({ user }: Props) => {

  const handle_onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    signOut().catch(console.error);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {/* user avatar */}
        <Button>Hi</Button>
        <UserAvatar user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && (<p className="font-medium">{user.name}</p>)}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-zinc-700">
                {user.email}
              </p>
            )}
          </div>
        </div>

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href='/'>Profile</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handle_onClick} className="text-red-800 cursor-pointer">
          Sign Out
          <LogOut className="w-4 h-4 ml-2" />
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserAccountNav
