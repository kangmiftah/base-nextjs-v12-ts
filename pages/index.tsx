import Head from 'next/head'
import Image from 'next/image'
import { Carousel, PublicLayout } from '../components'
import styles from '../styles/Home.module.css'
const test = [
  "bg-[#8DAAA6]",
  "bg-[#FFAAA6]",
  "bg-[#8DAFFF]",
  "bg-[#8DAEAE]",
  "bg-[#8D1D2E]",
  "bg-[#8D1D2E]",
];
export default function Home() {
  return (
    <>
      <div className='grid grid-rows grid-flow-col'>
          <Carousel >
            {
              test.map(v => (
                <div className={`w-100 h-100 h-[450px] ${v}`}></div>
              ))
            }
          </Carousel>
        
      </div>
      <div className='grid grid-rows-4 grid-flow-col gap-4'>

        {/* <Carousel > */}
          {
            test.map(v => (
              <div className={`w-100 h-100 h-[450px] ${v}`}></div>
            ))
          }
        {/* </Carousel> */}
      </div>
    </>
  )
}

Home.getLayout = PublicLayout;