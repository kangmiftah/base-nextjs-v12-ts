import { GetServerSideProps } from "next";
import { ReactElement } from "react"
import { AdminLayout } from "../../../components";
import authAdminMiddleware from "../../../_modules/midleware/authAdminMiddleware";


const Page = (props: any) => {
  return (
    <>
    <div className="grid grid-cols-3" >
      <div  className="">
        <h1 className="text-3xl font-bold underline">
        Ini adalah admin yang bertanggung jawab mengelola applikasi 
        </h1>
      </div>
      <div  className="">
        <h1 className="text-3xl font-bold underline">
        Ini adalah admin yang bertanggung jawab mengelola applikasi 
        </h1>
      </div>
      <div  className="">
        <h1 className="text-3xl font-bold underline">
        Ini adalah admin yang bertanggung jawab mengelola applikasi 
        </h1>
      </div>
    </div>
    </>
  )
}
Page.getLayout = AdminLayout
export default Page;



export const getServerSideProps: GetServerSideProps = (context) =>
   authAdminMiddleware(context, async function (session) {
      console.log(session)
      return {
         props: {
            ...session,
         },
      };
   });
