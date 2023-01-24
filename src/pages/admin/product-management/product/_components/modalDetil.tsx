import classNames from "classnames";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Modal, TableDetail, Button } from "../../../../../components";
import { useGetDetilMutation } from "../../../../../redux/services/admin/users-management/usersPage";
import { layoutActions } from "../../../../../redux/slices/layouts/layoutSlice";

interface detilProps {
   detil_id?: number;
   show: boolean;
   onClose: () => any;
}

export default function ModalDetil(props: detilProps) {
   const [childDetil, setChildDetil] = useState<Array<any>>([]);
   const [detil, setDetil] = useState({});
   const [getDetail] = useGetDetilMutation();
   const [loading, setLoading] = useState<boolean>(false);
   const disp = useDispatch();
   useEffect(
      function () {
         if (props.show && props.detil_id) {
            (async function () {
               setLoading(true);
               try {
                  let { data = {} }: any = await getDetail({
                     detil: parseInt((props.detil_id || 0).toString()),
                  });
                  if (data.code !== "00")
                     disp(
                        layoutActions.openAlert({
                           title: `Error get detail user`,
                           type: "Warning",
                           message: data.message,
                        })
                     );
                  else setDetil(data.data || {});
               } catch (error: any) {
                  disp(
                     layoutActions.openAlert({
                        title: `Error get detail user`,
                        type: "Error",
                        message: error.toString(),
                     })
                  );
               }
               setLoading(false);
            })();
         }
      },
      [props.show, props.detil_id]
   );
   return (
      <Modal
         backdrop="static"
         size="xl"
         onHide={props.onClose}
         showModal={props.show}
      >
         <Modal.Header closeBtn>Detail Users</Modal.Header>
         <Modal.Body>
            <TableDetail
               item={detil}
               fieldList={[
                  {
                     title: "Name",
                     fieldName: "name",
                  },
                  {
                     title: "Email",
                     fieldName: "email",
                  },
                  {
                     title: "Role",
                     fieldName: "role",
                     onRenderValue: (item: any) => item.role?.name,
                  },
               ]}
            />
         </Modal.Body>
         <Modal.Footer>
            <div className="flex justify-end items-center align-middle">
               <Button color="secondary" onClick={props.onClose}>
                  {" "}
                  Close{" "}
               </Button>
            </div>
         </Modal.Footer>
      </Modal>
   );
}
