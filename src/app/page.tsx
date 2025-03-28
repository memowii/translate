import { Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamically import the Translator component with client-side rendering
const Translator = dynamic(() => import("./components/Translator"), {
  ssr: false,
  loading: () => <div className="text-center py-10">Loading translator...</div>,
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8 lg:p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Translation App
        </p>
      </div>

      <div className="w-full max-w-4xl mt-8">
        <Suspense fallback={<div className="text-center py-10">Loading translator...</div>}>
          <Translator />
        </Suspense>
      </div>

      <div className="mt-16 text-center text-sm opacity-70">
        <p>
          Translation API powered by Cloudflare Workers
        </p>
      </div>
    </main>
  );
}
