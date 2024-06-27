'use client';

import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { logout } from "@/actions";
import { useUiStore } from "@/store";

import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from "react-icons/io5";

export default function Sidebar() {

  const isSideMenuOpen = useUiStore(state => state.isSideMenuOpen);
  const closeSideMenu = useUiStore(state => state.closeSideMenu);

  const { data: session } = useSession();
  const isAuthenticated = Boolean(session?.user);

  const onLogout = async () => {
    await logout()
    closeSideMenu()
    window.location.replace('/')
  }

  return (
    <div>
      {
        isSideMenuOpen && (
          <>
            <div
              className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" 
              />
      
            <div 
              onClick={ closeSideMenu }
              className=" fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filer backdrop-blur-sm"
            />
          </>
        )
      }
      <nav 
        className={
          clsx(
            "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
            {
              "translate-x-full": !isSideMenuOpen
            }
          )
        }
      >
        <IoCloseOutline 
          size={50} 
          className="absolute top-5 right-5 cursor-pointer" 
          onClick={() => closeSideMenu()} 
        />

        <div className="relative mt-14">
          <IoSearchOutline size={25} className="absolute top-[14px] left-[14px]" />
          <input 
            type="text"
            placeholder="Search"
            className="w-full bg-gray-50 pl-12 py-3 pr-10 border-2 text-lg border-gray-200 focus:outline-none focus:border-gray-500 transition-color duration-200"
          />
        </div>


        {
          isAuthenticated ? (
            <>
              <Link
                href='/profile'
                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                onClick={() => closeSideMenu()}
              >
                <IoPersonOutline size={25} />
                <span className="ml-3 text-lg">Perfil</span>
              </Link>

              <Link
                href='/'
                className="flex items-center mt-4 p-2 hover:bg-gray-100 rounded transition-all"
              >
                <IoTicketOutline size={25} />
                <span className="ml-3 text-lg">Ordenes</span>
              </Link>
              <button
                className="flex w-full items-center mt-4 p-2 hover:bg-gray-100 rounded transition-all"
                onClick={onLogout}
              >
                <IoLogOutOutline size={25} />
                <span className="ml-3 text-lg">Salir</span>
              </button>           
            </>
          ) : (
            <Link
              href='/auth/login'
              className="flex items-center mt-4 p-2 hover:bg-gray-100 rounded transition-all"
              onClick={() => closeSideMenu()}
            >
              <IoLogInOutline size={25} />
              <span className="ml-3 text-lg">Ingresar</span>
            </Link>
          )
        }



        {
          session?.user.role === 'admin' && (
            <>
              <div className="w-full h-px bg-gray-200 my-10 rounded" />
              <Link
                href='/'
                className="flex items-center mt-4 p-2 hover:bg-gray-100 rounded transition-all"
              >
                <IoShirtOutline size={25} />
                <span className="ml-3 text-lg">Productos</span>
              </Link>
      
              <Link
                href='/'
                className="flex items-center mt-4 p-2 hover:bg-gray-100 rounded transition-all"
              >
                <IoTicketOutline size={25} />
                <span className="ml-3 text-lg">Ordenes</span>
              </Link>
      
              <Link
                href='/'
                className="flex items-center mt-4 p-2 hover:bg-gray-100 rounded transition-all"
              >
                <IoPeopleOutline size={25} />
                <span className="ml-3 text-lg">Usuarios</span>
              </Link>            
            </>    
          )
        }
      </nav>
    </div>
  )
}
