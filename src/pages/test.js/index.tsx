import { GetStaticProps } from 'next';
import Head from 'next/head'
import Image from 'next/image'
import prisma from '../../backend/_modules/prisma';
import styles from '../styles/Home.module.css'


type propType = {
  feed : any;
}
export default function Home({feed}: propType) {
  return (
    <h1 className="text-3xl font-bold underline">
      {JSON.stringify(feed)}
    </h1>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // example with orm
  // const feed = await prisma.users.findMany()
  const feed = await prisma.$executeRawUnsafe(`select * from users`)
  return {
    props: { feed },
    revalidate: 10,
  };
};