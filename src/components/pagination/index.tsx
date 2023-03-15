import React, { useCallback, useEffect, useState } from "react";
import { Input } from "..";
import { paginationDetailState, PaginationPropsPrivate } from "../../@types/components/pagination";

export default function (props: PaginationPropsPrivate): JSX.Element {
   let showArr : Array<number> | undefined = props.showList;

   if(!showArr) showArr = [10,25,50,100]
   const [paginationDetail, setPaginationDetail] = useState<paginationDetailState>({
      page: 1,show:10
   })
   useEffect(function(){
      setPaginationDetail({
         page: props.currentPage || 1, show: props.currentShow || 10
      })
   },[props.currentPage, props.currentShow])

   const nextPage = useCallback(function(){
      console.log( (props.dataLength || paginationDetail.page) < paginationDetail.show , props.dataLength, paginationDetail.show )
      let data = {
         ...paginationDetail,
         page: (props.dataLength || paginationDetail.page) < paginationDetail.show ?  paginationDetail.page : paginationDetail.page+1 
      }
      props.onChangePage?.(data)
   },[paginationDetail])
   
   const prevPage = useCallback(function(){
      let data = {
         ...paginationDetail,
         page: paginationDetail.page-1 <= 0 ? paginationDetail.page : paginationDetail.page-1
      }
      props.onChangePage?.(data)
   },[paginationDetail])

   useEffect(function(){
      if(props.dataLength <= 0 && (props.currentPage || 1) > 1) {
         let newData = {
            page:  (props.currentPage || 2)-1,
            show: paginationDetail.show
         }
         props.onChangePage?.(newData)
         setPaginationDetail(newData)
      }
   },[props.dataLength])

   useEffect(function(){
      setPaginationDetail( v => ({ ...v, show: (showArr || [])[0]}))
   },[props.showList])
   const changeShow = useCallback(function(ev : React.SyntheticEvent){
      let target = (ev.target as HTMLSelectElement)
      let data = {
         page: 1,
         show: parseInt(target.value)
      }
      props.onChangeShow?.(data)
   },[paginationDetail])
   return (
      <>
         <div className="flex flex-col">
            {/* <div className="text-center">
               <span className="text-xs text-gray-500">
                  {" "}
                  Page 1 Showing 1 to 10 of 100 Entries{" "}
               </span>
            </div> */}
            <div className="grid grid-cols-6 gap-4">
               <div className="col-start-1 col-end-3 inline-flex items-center">
                  <label className="mr-2 text-xs">Show :</label>
                  <select onChange={changeShow} value={paginationDetail.show} className="border rounded-sm p-1 text-xs">
                     {
                        showArr.map( (i, k) =>  <option key={k} value={i} className="text-xs"> {i} </option> )
                     }
                  </select>
               </div>

               <div className="col-start-3 col-end-7 items-center text-right space-x-1">
                  {/* <div className="w-full text-right space-x-1"> */}
                     <button onClick={prevPage} className=" inline-flex items-center px-2 py-1 text-xs font-medium text-gray-500 bg-white border border-gray-300 rounded-sm hover:bg-gray-100 hover:text-gray-700">
                        <svg
                           aria-hidden="true"
                           className="w-3 h-3 mr-1"
                           fill="currentColor"
                           viewBox="0 0 20 20"
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <path
                              fillRule="evenodd"
                              d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                              clipRule="evenodd"
                           ></path>
                        </svg>
                        Previous
                     </button>
                     <span className=" px-2 py-1 text-sm font-semibold">{props.currentPage || 1}</span>
                     <button onClick={nextPage} className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-500 bg-white border border-gray-300 rounded-sm hover:bg-gray-100 hover:text-gray-700">
                        Next
                        <svg
                           aria-hidden="true"
                           className="w-3 h-3 ml-1"
                           fill="currentColor"
                           viewBox="0 0 20 20"
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <path
                              fillRule="evenodd"
                              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                           ></path>
                        </svg>
                     </button>
                  {/* </div> */}
               </div>
            </div>
         </div>
      </>
   );
}
