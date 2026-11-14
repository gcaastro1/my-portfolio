import About from '@/components/About'
import CommandPalette from '@/components/CommandPalette'
import Contacts from '@/components/Contacts'
import Experience from '@/components/Experience'
import Header from '@/components/Header'
import Projects from '@/components/Projects'
import SideRail from '@/components/SideRail'
import SkipLink from '@/components/SkipLink'
import SmoothScroll from '@/components/SmoothScroll'
import Stack from '@/components/Stack'
import StatusBar from '@/components/StatusBar'
import TitleBar from '@/components/TitleBar'

export default function Home() {
  return (
    <>
      <SkipLink />
      <SmoothScroll />
      <CommandPalette />
      <TitleBar />
      <SideRail />
      <main className="site-shell" id="main-content">
        <Header />
        <About />
        <Experience />
        <Projects />
        <Stack />
        <Contacts />
      </main>
      <StatusBar />
    </>
  )
}
