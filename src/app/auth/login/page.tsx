import { titleFont } from '@/config/fonts';
import { LoginForm } from './ui/LoginForm';
import { Suspense } from 'react';

export default function Login() {
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">

      <h1 className={ `${ titleFont.className } text-4xl mb-5` }>Ingresar</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}