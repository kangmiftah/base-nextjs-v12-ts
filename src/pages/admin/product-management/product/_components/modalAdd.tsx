import { Role } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Form, Input, Button } from "../../../../../components";
import { useLazyGetAllQuery } from "../../../../../redux/services/admin/product-management/categoryPage";
// import {}  from '';
type OnSubmitFn = (data: object | any) => any | Promise<object | any>;

export default React.forwardRef<
   HTMLFormElement,
   {
      setModalAdd: Function;
      openModalAdd: boolean;
      onSubmit: OnSubmitFn;
      editMode?: boolean;
      dataEdit?: object;
      ref?: React.RefObject<HTMLFormElement>;
   }
>(function ModalAddUser(
   { setModalAdd, openModalAdd, onSubmit, editMode, dataEdit },
   ref
) {
   const [ getListCategory ] = useLazyGetAllQuery()
   const getCategoryDropdown = async function (search: string | undefined = ""){
      try {
         let {data = [], error} = await getListCategory({ filter: { search }, pagination: { page:1, show:15 }})
         

         if(error) throw new Error(JSON.stringify(error))
         return data.map((v : any) => ({
            value: v.id, 
            label: v.name_category
         }))
      } catch (error) {
         return []  
      }
   }
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
            <Modal.Header closeBtn>
               {editMode ? "Update" : "Create New"} category
            </Modal.Header>
            <Modal.Body>
               <div className="flex-box py-1 px-2">
                  <div className="mb-3">
                     <Input.Label htmlFor="category_id">Category</Input.Label>
                     <Input.AsyncSelect2 
                        withCallApi={true} 
                        name="category_id" 
                        required={true}
                        asyncLoadData={(s)=> getCategoryDropdown(s)} 
                     />
                  </div>
                  <div className="mb-3">
                     <Input.Label htmlFor="name">Name</Input.Label>
                     <Input.Text type="text" name="name" required={true} />
                  </div>
                  <div className="mb-3">
                     <Input.Label htmlFor="description">
                        Description
                     </Input.Label>
                     <Input.TextArea
                        type="description"
                        name="description"
                        required={true}
                     />
                  </div>
                  <div className="mb-3">
                     <Input.Label htmlFor="price">Price</Input.Label>
                     <Input.Number
                        typeInput="currency"
                        name="price"
                        required={true}
                     />
                  </div>
                  <div className="mb-3">
                     <Input.Label htmlFor="discount">Discount</Input.Label>
                     <Input.Number
                        typeInput="float"
                        name="discount"
                        required={true}
                     />
                  </div>
                  <div className="mb-3">
                     <Input.Label htmlFor="stock">Stock</Input.Label>
                     <Input.Number
                        typeInput="int"
                        name="stock"
                        required={true}
                     />
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
});
