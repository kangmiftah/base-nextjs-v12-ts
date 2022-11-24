import Head from 'next/head'
import Image from 'next/image'
import { Carousel, PublicLayout } from '../components'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Carousel >
        <h1>Test</h1>
        <h1>Test</h1>
        <h1>Test</h1>
      </Carousel>
    </>
  )
}

Home.getLayout = PublicLayout;