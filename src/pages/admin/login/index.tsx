import { Card, Button, Form, Input } from "../../../components";

export default function () {
   return (
      <div className="h-screen w-screen flex bg-slate-300 justify-center items-center px-10">
         <Card className={"shadow-lg rounded-lg"} size={350}>
            {/* <Card.Header>
            <h3 className="text-xl font-bold" >Login</h3>
         </Card.Header> */}
            <Card.Body className=" px-5 py-5">
               <Form onSubmit={(formData)=>{

               }}>
                  <div className="flex items-center justify-center my-5">
                     <h1 className="text-3xl font-bold">
                        Login E-Admin
                     </h1>
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
                        <Button type="submit"
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
