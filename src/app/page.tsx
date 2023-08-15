import About from '@/components/About'
import Header from '@/components/Header'
import Jobs from '@/components/Jobs'
import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <main className='background'>
      <Navbar />
      <Header />
      <About />
      <Jobs />
    </main>
  )
}
