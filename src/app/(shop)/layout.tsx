

export default function ShopLayout({children}: {children: React.ReactNode;}) {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-red-500">
      {children}
    </main>
  );
}
