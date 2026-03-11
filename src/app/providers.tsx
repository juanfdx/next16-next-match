"use client";
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from "next-themes";


export function Providers({ children }: { children: React.ReactNode }) {
  return (
   <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
      >
        {children}
      </ThemeProvider>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
        }}
      />
   </>
  );
}