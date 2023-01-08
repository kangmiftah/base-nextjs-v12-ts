import { Role } from "@prisma/client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Form, Input, Button } from "../../../../../components";
type OnSubmitFn = (data: object) => any

export default function ModalAddUser({
   setModalAdd,
   openModalAdd,
   onSubmit,
   roles= []
}: {
   setModalAdd: Function;
   openModalAdd: boolean;
   onSubmit: OnSubmitFn;
   roles: Array<{
      id: number, name: string
   }>
}) {
   const disp = useDispatch();
   return (
      <Form
         onSubmit={onSubmit}
         formData={
            {
               name: "test masuk"
            }
         }
         passingDataMode={true}
      >
         <Modal
            backdrop="static"
            onHide={() => setModalAdd(false)}
            showModal={openModalAdd}
         >
            <Modal.Header closeBtn>Create New user</Modal.Header>
            <Modal.Body >
               <div className="flex-box py-1 px-2">
                  <div className="mb-3">
                     <Input.Label htmlFor="name">Name</Input.Label>
                     <Input.Text type="email" name="name" required={true} />
                  </div>

                  <div className="mb-3">
                     <Input.Label htmlFor="email">Email</Input.Label>
                     <Input.Text type="email" name="email" required={true} />
                  </div>

                  <div className="mb-3">
                     <Input.Label htmlFor="password">Password</Input.Label>
                     <Input.Text name="password" required={true} type="password" />
                  </div>

                  <div className="mb-3">
                     <Input.Label htmlFor="role_id">Role</Input.Label>
                     <Input.Select
                        required={true}
                        placeholder="Select Role"
                        name="role_id"
                     >
                        {
                           roles.map((role)=> (

                              <option key={role.id} value={role.id}>{role.name}</option>
                           ))
                        }
                     </Input.Select>
                  </div>
               </div>
            </Modal.Body>
            <Modal.Footer>
               <div className="flex justify-end">
                  <Button
                     type="reset"
                     color="secondary"
                     onClick={() => setModalAdd(false)}
                  >
                     Cancel
                  </Button>
                  <Button type="submit" color="primary">
                     Submit
                  </Button>
               </div>
            </Modal.Footer>
         </Modal>
      </Form>
   );
}
