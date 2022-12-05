import { Modal, Input, Button, Form } from "../..";
import React from 'react';
import {
   layoutActions,
   layoutSelector,
} from "../../../redux/slices/layouts/layoutSlice";
import { useLoginMutation } from "../../../redux/services/auth";
import { useDispatch } from "react-redux";
import { useSession, signIn, signOut } from "next-auth/react"

export default function ({
   show,
   onHide,
}: {
   show: boolean;
   onHide: () => void;
}): JSX.Element {
   const [login, result] = useLoginMutation();
   const { isLoading, isError, isSuccess, isUninitialized } = result;
   const disp = useDispatch();
   React.useEffect(
      function () {
         disp(
            layoutActions.setLoading({
               isLoading: isLoading,
               loadingText: "Please wait",
            })
         );
      },
      [isLoading]
   );
   return (
      <Form
         // ref={formRef}
         onSubmit={(formData) => {
            signIn()
         }}
      >
         <Modal backdrop="static" size="md" showModal={show} onHide={onHide}>
            <Modal.Header closeBtn>
               <h1 className=" text-lg font-bold">Login</h1>
            </Modal.Header>
            <Modal.Body>
               <div className="relative border-dashed border-2 rounded-md ">
                  <div className="grid grid-rows-3 p-4">
                     <div className="mb-3">
                        <h2 className=" text-2xl text-center">
                           Login in your account
                        </h2>
                     </div>
                     <div className="mb-3">
                        <Input.Label htmlFor="username">Username</Input.Label>
                        <Input.Text
                           required={true}
                           name="username"
                           placeholder="username or email"
                        />
                     </div>
                     <div className="mb-3">
                        <Input.Label htmlFor="password">Password</Input.Label>
                        <Input.Text
                           required
                           name="password"
                           placeholder="password"
                           type="password"
                        />
                     </div>
                  </div>
               </div>
            </Modal.Body>
            <Modal.Footer>
               <div className="grid grid-cols-1">
                  <div>
                     <Button
                        type="submit"
                        size="lg"
                        color="primary"
                        className="float-right "
                     >
                        Login
                     </Button>
                     <Button
                        type="reset"
                        size="lg"
                        color="secondary"
                        onClick={onHide}
                        className="float-right"
                     >
                        Cancel
                     </Button>
                  </div>
               </div>
            </Modal.Footer>
         </Modal>
      </Form>
   );
}
