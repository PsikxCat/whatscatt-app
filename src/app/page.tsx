import { LeftPanel, RightPanel } from '@/components'

export default function Home() {
  return (
    <main className="w-full xl:mx-5">
      <section className="mx-auto flex h-[calc(100vh-50px)] max-w-[1700px] overflow-y-hidden bg-left-panel">
        {/* Fondo verde para light mode */}
        <div className="fixed left-0 top-0 -z-30 h-36 w-full bg-green-primary dark:bg-transparent" />

        <LeftPanel />
        <RightPanel />
      </section>
    </main>
  )
}
