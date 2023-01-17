import { GetServerSideProps } from "next";
import { ReactElement } from "react"
import { AdminLayout, Card } from "../../../components";
import authAdminMiddleware from "../../../_modules/midleware/authAdminMiddleware";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

const Page = (props: any) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  return (
    <>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <div>
            <Card>
              <Card.Header>
                <h1 className="text-xl"> Chart 1 </h1>
              </Card.Header>
              <Card.Body>
              <Doughnut data={{
                  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                  datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    borderWidth: 1,
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                    ],
                  }]
              }} />
              </Card.Body>
            </Card>
          </div>
          <div>
            
          </div>
          <div>
            
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
