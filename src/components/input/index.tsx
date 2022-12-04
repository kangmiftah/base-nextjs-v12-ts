import React, {
   createContext,
   HTMLProps,
   PropsWithChildren,
   useContext,
} from "react";
import { InputSize, InputTextProps } from "../../@types/components/input";

type FormState = {
   actions: {};
   state: {
      data?: string;
   };
};
const formContext = createContext<FormState>({
   actions: {},
   state: { data: "test" },
});
const useForm = () => useContext(formContext);

function getSize(size: InputSize): string {
   switch (size) {
      case "sm":
         return "py-1";
      case "lg":
         return "py-2";
      default:
         return "py-2";
   }
}
export function Form({ children }: PropsWithChildren) {
   return (
      <form>
         <formContext.Provider
            value={{
               actions: {},
               state: { data: "xxxx" },
            }}
         >
            {children}
         </formContext.Provider>
      </form>
   );
}
function Text(_props: InputTextProps) {
   let props = { ..._props };
   props.className = `
      appearance-none shadow
      border rounded w-full ${getSize(props.sizeInput)} px-3 
      text-gray-700 leading-tight focus:border-primary-500
      focus:outline-none focus:shadow-outline] ${props.className}
   `;
   if (props.type === undefined) props.type = "text";
   return (
      <formContext.Consumer>
         {({ actions, state }) => {
            return <input ref={props.ref} type="text" {...props} />;
         }}
      </formContext.Consumer>
   );
}

function Label({
   children,
   ..._props
}: PropsWithChildren & HTMLProps<HTMLLabelElement>) {
   let props = { ..._props };
   props.className = `text-sm font-semibold pb-3`;
   return (
      <formContext.Consumer>
         {({ actions, state }) => {
            return (
               <div className="mb-1 pl-1">
                  <label {...props}>{children}</label>
               </div>
            );
         }}
      </formContext.Consumer>
   );
}
export default {
   Text,
   Label,
};
