import { Role } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Form, Input, Button } from "../../../../../components";
type OnSubmitFn = (data: object | any) => any | Promise<object | any>

export default React.forwardRef<HTMLFormElement, {
   setModalAdd: Function;
   openModalAdd: boolean;
   onSubmit: OnSubmitFn;
   editMode?: boolean,
   dataEdit?: object,
   ref?: React.RefObject<HTMLFormElement>
}>(function ModalAddUser({
   setModalAdd,
   openModalAdd,
   onSubmit,
   editMode,
   dataEdit
}, ref) {
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
            <Modal.Header closeBtn>{editMode ? "Update" : "Create New"} category</Modal.Header>
            <Modal.Body >
               <div className="flex-box py-1 px-2">
                  <div className="mb-3">
                     <Input.Label htmlFor="name">Name</Input.Label>
                     <Input.Text type="text" name="name" required={true} />
                  </div>

                  <div className="mb-3">
                     <Input.Label htmlFor="description">Description</Input.Label>
                     <Input.TextArea type="description" name="description" required={true} />
                  </div>
                  {
                  editMode && <div className="mb-3 flex items-center">
                     <Input.CheckBox name="is_active" /> <Input.Label htmlFor="is_active">Active</Input.Label>
                      
                  </div>}
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
