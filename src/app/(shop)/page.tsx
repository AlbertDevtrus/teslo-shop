import { titleFont } from "@/config/fonts";

export default function Home() {
  return (
    <>
      <h1 className={`text-4xl ${titleFont.className}`}>Hola mundo</h1>
      <h1 className="text-4xl">Hola mundo</h1>
    </>
  );
}
