
import Banner from "@/components/Banner"
import Image from 'next/image'
import styles from './page.module.css'
import TopMenu from "@/components/TopMenu"

export default function Home() {
  return (
    <div className='h-100% w-full'>
      <TopMenu/>
      <Banner></Banner>
    </div>
  )
}
