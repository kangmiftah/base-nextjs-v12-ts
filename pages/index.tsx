import Head from 'next/head'
import Image from 'next/image'
import { CardProduct, Carousel, PublicLayout } from '../components'
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
      <div className='grid 
        sm:grid-cols-2 
        md:grid-cols-3
        lg:grid-cols-4 
        2xl:grid-cols-5
        gap-5'>

        {/* <Carousel > */}
          {
            test.map(v => (
              <div>
                <CardProduct />
              </div>
            ))
          }
        {/* </Carousel> */}
      </div>
    </>
  )
}

Home.getLayout = PublicLayout;