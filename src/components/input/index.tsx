import classNames from "classnames";
import React, {
   createContext,
   HTMLProps,
   PropsWithChildren,
   RefObject,
   useCallback,
   useContext,
   useEffect,
   useRef,
   useState,
} from "react";
import { InputSize, InputTextProps } from "../../@types/components/input";

type FormState = {
   actions: {
      initRefInput: (
         name: string,
         refObj: any
      ) => any;
      changeForm: (name: string, value: any) => any;
   };
   state: {
      formData?: Object;
      refInput?: any;
   };
   providerInitialized: boolean;
   refForm?: any;
};
const formContext = createContext<FormState>({
   actions: {
      initRefInput() {},
      changeForm() {},
   },
   state: {
      formData: {},
      refInput: {},
   },
   providerInitialized: false,
   refForm: {},
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

export const Form = React.forwardRef<
   HTMLFormElement,
   {
      onChange?: (formData: Object) => any;
      onSubmit?: (formData: Object) => any;
   } & React.HTMLAttributes<HTMLFormElement>
>(function (_props, _ref) {
   let props = { ..._props };
   let ref = _ref
   if (!ref) ref = useRef<HTMLFormElement>(null)

   const [refInput, setRefInput] = useState({});
   const [formData, setFormData] = useState<Object>({});
   const changeForm = useCallback<FormState["actions"]["changeForm"]>(function (
      name,
      value
   ) {
      setFormData((form) => ({ ...form, [name]: value }));
   },
   []);
   const initRefInput = useCallback(function (
      name: string,
      refObj: RefObject<HTMLElement> | undefined
   ) {
      setRefInput(function (c) {
         return {
            ...c,
            [name]: refObj,
         };
      });
   },
   []);
   useCallback(
      function () {
         typeof props.onChange === "function" && props.onChange(formData);
      },
      [formData]
   );
   return (
      <form className="peer"
         ref={ref}
         onSubmit={(e: React.SyntheticEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (typeof _props.onSubmit === "function")
               _props.onSubmit(formData);
         }}
         onReset={(e: React.SyntheticEvent<HTMLFormElement>) => {
            setFormData({});
            if (typeof _props.onReset === "function") _props.onReset(e);
         }}
      >
         <formContext.Provider
            value={{
               actions: {
                  initRefInput,
                  changeForm,
               },
               state: {
                  formData: {},
                  refInput,
               },
               providerInitialized: true,
               refForm: ref,
            }}
         >
            {props.children}
         </formContext.Provider>
      </form>
   );
});

const Text = React.forwardRef<HTMLInputElement, InputTextProps>(function (
   _props, _ref
) {
   let props = { ..._props };
   let ref = _ref
   if (!ref) ref = useRef<HTMLInputElement>(null)
   props.className =`
      appearance-none shadow
      border rounded w-full ${getSize(props.sizeInput)} px-3 
      text-gray-700 leading-tight focus:border-primary-500
      focus:outline-none focus:shadow-outline] ${props.className}
      focus:invalid:border-danger
   `;
   if (props.type === undefined) props.type = "text";
   const {
      state,
      actions: { initRefInput = () => null, changeForm },
      providerInitialized,
   } = useForm();
   if (providerInitialized) {
      if (props.name === undefined)
         throw new Error(
            "<Input.Text name='' /> name attributte is required for data name"
         );
      props.onChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
         let target = e.target as HTMLInputElement;
         changeForm(target.name, target.value);
         if (typeof _props.onChange == "function") _props.onChange(e);
      };
      useEffect(
         function () {
            initRefInput(props.name || "", ref);
         },
         [props.name]
      );
   }
   return <input  ref={ref} type="text" {...props}  />;
});

function Label({ children, ..._props }: {} & HTMLProps<HTMLLabelElement>) {
   let props = { ..._props };
   const {
      state: { refInput = {} },
      actions: { initRefInput = () => null },
      providerInitialized,
   } = useForm();

   props.className = `text-sm font-semibold pb-3 after:text-danger-300 after:ml-0.5`;
   if (providerInitialized) {
      if (props.htmlFor === undefined)
         throw new Error(
            "<Label htmlFor=''> : htmlFor attribute is required for input name"
         );
      props.className = `${props.className}  ${classNames({
         "after:content-['*']": refInput[props.htmlFor]?.current?.required,
      })}`;
   }
   return (
      <div className="mb-1 pl-1">
         <label {...props}>{children}</label>
      </div>
   );
}
export default {
   Text,
   Label,
};
