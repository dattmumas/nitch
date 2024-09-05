import { MainNav } from "@/components/main_nav";
import { sql } from "@vercel/postgres";
import { HomeIcon } from "lucide-react";
import Sidebar from "./components/pm-sidebar";

export default function Home() {
  return (
    <div className='border-2 border-blue-600'>
      <div className='h-10 border-2 border-red-500 overflow-hidden'>
      </div>
      <div className='flex'>
        <div className='border-2 border-red-900 min-h-screen w-40 la:hidden hover:w-40 transition-all duration-300'>
          <div className='grid justify-items-center'>
                <Sidebar />
          </div>
        </div>
        <div className='flex-grow border-2 border-green-900 min-h-screen'>
          <div className=''>
            
          </div>
          <div className='min-h-full border-2 shadow-md rounded-md overflow-hidden'>

          </div>
        </div>
      </div>
    </div>
  )
}