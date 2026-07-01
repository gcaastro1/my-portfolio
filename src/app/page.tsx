import About from '@/components/About'
import Contacts from '@/components/Contacts'
import Experience from '@/components/Experience'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Navbar from '@/components/Navbar'
import Projects from '@/components/Projects'
import Stack from '@/components/Stack'

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
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
