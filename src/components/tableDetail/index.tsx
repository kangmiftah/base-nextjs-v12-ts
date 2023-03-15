import classNames from "classnames";
import React from "react";
import {
   fieldListTypes,
   tableDetailProps,
} from "../../@types/components/tableDetail";

export default function (_props: tableDetailProps): JSX.Element {
   let props = { ..._props };
   if (!props.onRenderHeader) {
      props.onRenderHeader = (item: any) => {
         return (
            <div className="px-4 py-5 sm:px-6">
               <h3 className="text-lg font-medium leading-6 text-gray-900">
                  {props.headerTitle}
               </h3>
               <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {props.subHeaderTitle}
               </p>
            </div>
         );
      };
   }
   return (
      <>
         <div className="overflow-hidden bg-white sm:rounded-lg">
            {props.withHeader && props.onRenderHeader?.(props.item)}
            <div className={props.withHeader ? `border-t border-gray-200` : ``}>
               <dl>
                  {props.fieldList.map((field: fieldListTypes, i) => {
                     let render = field.onRender;
                     let renderValue = field.onRenderValue;
                     if (!renderValue) {
                        renderValue = (item: any) => item[field.fieldName];
                     }
                     if (!render) {
                        render = (item: any) => {
                           return (
                              <div
                                 key={i}
                                 className={classNames(
                                    "px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6",
                                    {
                                       "bg-gray-100": i % 2 === 0,
                                       "bg-white": i % 2 === 1,
                                    }
                                 )}
                              >
                                 <dt className="text-sm font-medium text-gray-500">
                                    {field.title}
                                 </dt>
                                 <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    {renderValue?.(item)}
                                 </dd>
                              </div>
                           );
                        };
                     }

                     return render?.(props.item, field.fieldName);
                  })}
               </dl>
            </div>
         </div>
      </>
   );
}
