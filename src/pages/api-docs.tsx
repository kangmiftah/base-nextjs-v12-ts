import { GetServerSideProps, GetStaticProps, InferGetStaticPropsType } from "next";
import { createSwaggerSpec } from "next-swagger-doc";
import dynamic from "next/dynamic";
import { basename } from "path";
import "swagger-ui-react/swagger-ui.css";

// const SwaggerUI = dynamic<{
//    spec: any;
// }>(()=> import("swagger-ui-react"), { ssr: false });

const SwaggerUI = dynamic(()=> import("swagger-ui-react"), {
  ssr: false
})
function ApiDoc({ spec } : { spec: any }) {
   return <SwaggerUI spec={spec} />;
}

export const getServerSideProps: GetServerSideProps = async (props) => {

  let reqSpec = await fetch(`http://${props.req.headers.host}/api/docs`);
  let specApi = await reqSpec.json()
   const spec: Record<string, any> = createSwaggerSpec({
      definition:specApi,
   });

   if (process.env.NODE_ENV === "production") return {
    notFound: true,
   }
   return {
      props: {
         spec,
      },
   };
};

export default ApiDoc;
