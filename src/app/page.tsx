import About from '@/components/About'
import Contacts from '@/components/Contacts'
import Experience from '@/components/Experience'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Navbar from '@/components/Navbar'
import Projects from '@/components/Projects'
import SkipLink from '@/components/SkipLink'
import Stack from '@/components/Stack'
import CustomCursor from '@/components/CustomCursor'
import CommandPalette from '@/components/CommandPalette'
export default function Home() {
  return (
    <>
      <CustomCursor />
      <CommandPalette />
      <SkipLink />
      <Navbar />
      <main className="site-shell" id="main-content">
        <Header />
        <About />
        <Experience />
        <Projects />
        <Stack />
        <Contacts />
      </main>
      <Footer />
    </>
  )
}
