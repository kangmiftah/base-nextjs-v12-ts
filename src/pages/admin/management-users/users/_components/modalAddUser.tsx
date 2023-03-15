import { Role } from "@prisma/client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Form, Input, Button } from "../../../../../components";
type OnSubmitFn = (data: object | any) => any | Promise<object | any>

export default React.forwardRef<HTMLFormElement, {
   setModalAdd: Function;
   openModalAdd: boolean;
   onSubmit: OnSubmitFn;
   editMode?: boolean,
   dataEdit?: object,
   ref?: React.RefObject<HTMLFormElement>,
   roles: Array<{
      id: number, name: string
   }>
}>(function ModalAddUser({
   setModalAdd,
   openModalAdd,
   onSubmit,
   roles= [],
   editMode,
   dataEdit
}, ref) {
   const disp = useDispatch();
   return (
      <Form
         ref={ref}
         onSubmit={onSubmit}
         passingDataMode={editMode}
         formData={dataEdit}
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
                     <Input.Text type="text" name="name" required={true} />
                  </div>

                  <div className="mb-3">
                     <Input.Label htmlFor="email">Email</Input.Label>
                     <Input.Text type="email" name="email" required={true} />
                  </div>

                  {!editMode && <div className="mb-3">
                     <Input.Label htmlFor="password">Password</Input.Label>
                     <Input.Text name="password" required={true} type="password" />
                  </div>}

                 { !editMode && <div className="mb-3">
                     <Input.Label htmlFor="re_password">Re-Type Password</Input.Label>
                     <Input.Text name="re_password" required={true} type="password" />
                  </div>}

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
})
