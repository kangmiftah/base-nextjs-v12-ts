import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Card, Button, Form, Input } from "../../../components";
import { layoutActions } from "../../../redux/slices/layouts/layoutSlice";
import { useSession, signIn, signOut } from "next-auth/react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";

type loginProps = {};
export default function (props: loginProps) {
   const disp = useDispatch();
   const route = useRouter();

   return (
      <div className="h-screen w-screen flex bg-slate-300 justify-center items-center px-10">
         <Card className={"shadow-lg rounded-lg"} size={350}>
            {/* <Card.Header>
            <h3 className="text-xl font-bold" >Login</h3>
         </Card.Header> */}
            <Card.Body className=" px-5 py-5">
               <Form
                  onSubmit={async (formData) => {
                     disp(
                        layoutActions.setLoading({
                           isLoading: true,
                           loadingText: "please wait...",
                        })
                     );
                     try {
                        const resp = await signIn("credentials", {
                           redirect: false,
                           ...formData,
                           loginType: "PUBLIC",
                        });
                        console.log(resp);
                        if (resp?.ok) {
                           route.reload();
                           // window?.location.reload()
                        } else {
                           alert(resp?.error);
                        }
                     } catch (error) {
                        console.error(error);
                     }
                     disp(
                        layoutActions.setLoading({
                           isLoading: false,
                           loadingText: "Please wait",
                        })
                     );
                  }}
               >
                  <div className="flex items-center justify-center my-5">
                     <h1 className="text-3xl font-bold">Login E-Admin</h1>
                  </div>
                  <div className="grid grid-rows-2">
                     <div className="mt-5 py-3">
                        <Input.Label htmlFor="username">Username</Input.Label>
                        <Input.Text
                           autoComplete="off"
                           name="username"
                           required={true}
                           type="text"
                           placeholder="username or email"
                        />
                     </div>
                     <div className="py-3">
                        <Input.Label htmlFor="password">Password</Input.Label>
                        <Input.Text
                           autoComplete="off"
                           name="password"
                           type="password"
                           placeholder="password"
                           required={true}
                        />
                     </div>
                     <div className=" mt-5">
                        <Button
                           type="submit"
                           className="float-right"
                           size="lg"
                           color="primary"
                        >
                           Login
                        </Button>
                        <Button
                           className="float-right"
                           size="lg"
                           color="secondary"
                        >
                           Reset
                        </Button>
                     </div>
                  </div>
               </Form>
            </Card.Body>
            {/* <Card.Footer>
         <div className="w-full">
            <Button className="float-right" size="lg" color="primary">Login</Button>
            <Button className="float-right" size="lg" color="secondary">Reset</Button>
         </div>
         </Card.Footer> */}
         </Card>
      </div>
   );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
   let session: Session | null= await getSession(context);
   if (session) {
      return {
         redirect: {
            permanent: false,
            destination: "/",
         },
         props: {},
      };
   }
   return {
      props: {},
   };
};
