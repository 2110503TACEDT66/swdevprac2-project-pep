
import Banner from "@/components/Banner"
import Image from 'next/image'
import styles from './page.module.css'
import TopMenu from "@/components/TopMenu"

export default function Home() {
  return (
    <div className='w-screen'>
      <TopMenu/>
      <Banner></Banner>
    </div>
  )
}
