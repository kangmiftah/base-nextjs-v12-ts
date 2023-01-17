import { GetServerSideProps } from "next";
import { ReactElement } from "react";
import { AdminLayout, Card } from "../../../components";
import { Bar, Doughnut } from "../../../components/amchart4";
import authAdminMiddleware from "../../../_modules/midleware/authAdminMiddleware";
const Page = (props: any) => {
   return (
      <>
         <div className="mt-10 grid grid-cols-3 grid-rows-2 gap-2">
            <div className="row-span-2 col-span-2 h-[100%]">
               <Card className={"h-full"}>
                  <Card.Header>
                     <h1 className="text-xl"> Chart 1 </h1>
                  </Card.Header>
                  <Card.Body>
                  {/* <div> */}
                        <Bar id="c3" />
                     {/* </div> */}
                  </Card.Body>
               </Card>
            </div>
            <div className="">
               <Card  className={"h-full"}>
                  <Card.Header>
                     <h1 className="text-xl"> Chart 1 </h1>
                  </Card.Header>
                  <Card.Body>
                     {/* <div> */}
                        <Doughnut id="c1" />
                     {/* </div> */}
                  </Card.Body>
               </Card>
            </div>
            <div>
               <Card  className={"h-full"}>
                  <Card.Header>
                     <h1 className="text-xl"> Chart 1 </h1>
                  </Card.Header>
                  <Card.Body>
                     
                  <div>
                        <Doughnut id="c2" />
                     </div>
                  </Card.Body>
               </Card>
            </div>
         </div>
      </>
   );
};
Page.getLayout = AdminLayout;
export default Page;

export const getServerSideProps: GetServerSideProps = (context) =>
   authAdminMiddleware(context, async function (session) {
      console.log(session);
      return {
         props: {
            ...session,
         },
      };
   });
