"use client";

import { login, registerUser } from "@/actions";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface Inputs {
  name: string;
  email: string;
  password: string;
};

export const RegisterForm = () => {
  
  const [errorMessage, setErrorMessage] = useState('')
  const { register, handleSubmit, formState: {errors} } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setErrorMessage('');
    const { email, name, password } = data;

    const response = await registerUser(name, email, password);

    if(!response.ok) {
      setErrorMessage(response.msg);
      return
    }

    await login( email.toLowerCase(), password );

    
    window.location.replace('/');

    console.log({response});
  }
  
  return (
    <form onSubmit={ handleSubmit(onSubmit) } className="flex flex-col">

      <label htmlFor="text">Nombre completo</label>
      <input
        className={
          clsx(
            "px-5 py-2 border bg-gray-200 rounded mb-5",
            {
              'border-red-500': Boolean(errors.name)
            }
          )
        }
        type="text"
        autoFocus
        { ...register('name', { required: true }) }
      />

      <label htmlFor="email">Correo electrónico</label>
      <input
        className={
          clsx(
            "px-5 py-2 border bg-gray-200 rounded mb-5",
            {
              'border-red-500': Boolean(errors.email)
            }
          )
        }
        type="email"
        { ...register('email', { required: true, pattern: /^[a-zA-Z0–9._-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,4}$/ })}
      />

      <label htmlFor="email">Contraseña</label>
      <input
        className={
          clsx(
            "px-5 py-2 border bg-gray-200 rounded mb-5",
            {
              'border-red-500': Boolean(errors.password)
            }
          )
        }
        type="password"
        { ...register('password', { required: true, minLength: 6 }) }
      />

      {
        errorMessage !== '' && (
          <div className="flex h-full w-full space-x-1 justify-center mb-4 s border-red-500 border-2 bg-red-100 px-3 py-2 rounded-md">
            <p className="text-sm text-red-500 ">{errorMessage}</p>
          </div>
        )
      }

      <button className="btn-primary">Registrar</button>

      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/login" className="btn-secondary text-center">
        Ingresar
      </Link>
    </form>
  );
};
