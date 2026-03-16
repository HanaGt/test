import { DateRangePicker } from "../components/DateRangePicker";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white text-zinc-900 dark:from-black dark:to-zinc-950 dark:text-zinc-50">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 px-6 py-16 sm:px-10 sm:py-20">
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 text-sm font-semibold text-zinc-50 shadow-sm dark:bg-zinc-50 dark:text-zinc-900">
              JT
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Job Test
              </p>
              <p className="text-sm font-semibold">Next.js + Tailwind</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
            <span className="hidden sm:inline">Crafted with</span>
            <span className="inline-flex items-center gap-1 rounded-full border border-zinc-200 px-3 py-1 dark:border-zinc-800">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Production-ready setup
            </span>
          </div>
        </header>

        <section className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-start">
          <div className="space-y-6">
            <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              A clean, production-focused starter for your Next.js job test.
            </h1>
            <p className="max-w-xl text-balance text-base leading-7 text-zinc-600 dark:text-zinc-400">
              TypeScript, Tailwind CSS, App Router, React Compiler, and
              sensible defaults — all wired up so you can focus on solving the
              actual challenge instead of fighting boilerplate.
            </p>
            <div className="flex flex-wrap gap-3 text-xs font-medium">
              <span className="rounded-full bg-zinc-900 px-3 py-1 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900">
                Next.js 16 · App Router
              </span>
              <span className="rounded-full border border-zinc-200 px-3 py-1 dark:border-zinc-800">
                Tailwind CSS 4 · Utility-first
              </span>
              <span className="rounded-full border border-zinc-200 px-3 py-1 dark:border-zinc-800">
                Type-safe · ESLint enabled
              </span>
            </div>
          </div>

          <DateRangePicker />
        </section>

        <section className="mt-auto grid gap-6 border-t border-dashed border-zinc-200 pt-8 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400 sm:grid-cols-3">
          <div>
            <p className="font-semibold text-zinc-700 dark:text-zinc-200">
              Next steps
            </p>
            <p className="mt-2">
              Replace this content with your feature implementation. The layout
              and styling are here to showcase clean, readable Tailwind usage.
            </p>
          </div>
          <div>
            <p className="font-semibold text-zinc-700 dark:text-zinc-200">
              Recommended commands
            </p>
            <ul className="mt-2 space-y-1 font-mono text-[11px]">
              <li>npm run dev</li>
              <li>npm run lint</li>
              <li>npm run build</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-zinc-700 dark:text-zinc-200">
              Where to work
            </p>
            <ul className="mt-2 space-y-1">
              <li>
                <span className="font-mono text-[11px]">src/app/page.tsx</span>{" "}
                — main screen
              </li>
              <li>
                <span className="font-mono text-[11px]">src/app/layout.tsx</span>{" "}
                — global shell
              </li>
              <li>
                <span className="font-mono text-[11px]">src/app/globals.css</span>{" "}
                — Tailwind + tokens
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
