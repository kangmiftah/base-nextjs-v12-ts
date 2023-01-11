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
   ref?: React.RefObject<HTMLFormElement>
}>(function ModalAddRole({
   setModalAdd,
   openModalAdd,
   onSubmit,
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
            <Modal.Header closeBtn>{ editMode ? `Edit ` : `Create New`} Role</Modal.Header>
            <Modal.Body >
               <div className="flex-box py-1 px-2">
                  <div className="mb-3">
                     <Input.Label htmlFor="name">Name</Input.Label>
                     <Input.Text type="text" name="name" required={true} />
                  </div>

                  <div className="mb-3">
                     <Input.Label htmlFor="description">description</Input.Label>
                     <Input.TextArea type="text" name="description" required={true} rows={5} />
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
