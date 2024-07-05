'use client';

import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";
import clsx from "clsx";

import { authenticate } from "@/actions";
import { IoInformationOutline } from "react-icons/io5";
import { useSearchParams } from "next/navigation";

export const LoginForm = () => {

  const [state, formAction] = useFormState(authenticate, undefined)
  const searchParamas = useSearchParams();
  const params = searchParamas.get('origin');
  
  useEffect(() => {
    if(state === 'Success') {
      if(!!params) {
        return window.location.replace(params);
      }
      window.location.replace('/')
    }
  }, [state, params]);

  return (
    <form action={formAction} className="flex flex-col">
      <label htmlFor="email">Correo electrónico</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
        name="email"
      />

      <label htmlFor="email">Contraseña</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password"
        name="password"
      />

      <div className="flex h-8 space-x-1 items-center justify-center my-2">
        {(state === 'Something went wrong.' || state === 'Invalid credentials.') && (
          <div className="flex h-full space-x-1 items-center mb-4 self-center border-red-500 border-2 bg-red-100 pr-3 pl-1 rounded-md">
            <IoInformationOutline className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">Invalid credentials!</p>
          </div>
        )}
      </div>


      <LoginBtn />

      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/new-account" className="btn-secondary text-center">
        Crear una nueva cuenta
      </Link>
    </form>
  );
};

function LoginBtn() {
  const { pending } = useFormStatus();

  return (
    <button 
      className={clsx({
        'btn-primary': !pending,
        'btn-disabled': pending
      })} 
      type="submit"
      disabled={pending}
    >
      Ingresar
    </button>
  )
}