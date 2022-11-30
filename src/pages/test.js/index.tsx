import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import prisma from "../../backend/_modules/prisma";
import styles from "../styles/Home.module.css";

type propType = {
   feed: any;
};
export default function Home({ feed }: propType) {
   return (
      <h1 className="text-3xl font-bold underline">{JSON.stringify(feed)}</h1>
   );
}

export const getStaticProps: GetStaticProps = async () => {
   // example with orm
   const feed = await prisma.users.findMany({
      where: {
         OR: [
            {
               name: {
                  startsWith: "ad",
                  mode: "insensitive",
               },
            },
            {
               name: {
                  endsWith: "ad",
                  mode: "insensitive",
               },
            },
         ],
      },
   });

   // example raw query
   // const feed = await prisma.$queryRawUnsafe(`select * from users  where name like '%AD%'`)
   return {
      props: { feed },
      revalidate: 10,
   };
};
