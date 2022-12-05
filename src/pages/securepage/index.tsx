import { GetServerSideProps, GetStaticProps } from "next";
import { getSession } from "next-auth/react";
import { PublicLayout } from "../../components";
import authPublicMiddlerware from "../../_modules/midleware/authPublicMiddlerware";

export default function Page(props: any) {
   console.log(props);
   return <h1>secure page : {JSON.stringify(props)}</h1>;
}

export const getServerSideProps: GetServerSideProps = (context) =>
   authPublicMiddlerware(context, async function (session) {
      return {
         props: {
            ...session,
         },
      };
   });
Page.getLayout = PublicLayout;
