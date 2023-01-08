import classNames from "classnames";
import React, {
   createContext,
   ForwardedRef,
   HTMLProps,
   PropsWithChildren,
   RefObject,
   useCallback,
   useContext,
   useEffect,
   useRef,
   useState,
} from "react";
import {
   InputNumberProps,
   InputSize,
   InputTextProps,
   SelectOptionPorps,
} from "../../@types/components/input";
import { thousandSparator, removeNumbering } from "../../_modules/helpers";

type FormState = {
   actions: {
      initRefInput: (name: string, refObj: any) => any;
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
      formData?: Object;
      passingDataMode?: boolean;
   } & React.HTMLAttributes<HTMLFormElement>
>(function (_props, _ref) {
   let props = { ..._props };
   let ref = _ref;
   if (!ref) ref = useRef<HTMLFormElement>(null);

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
   useEffect(
      function () {
         if (props.formData && props.passingDataMode)
            setFormData(props.formData);
      },
      [props.passingDataMode]
   );
   useCallback(
      function () {
         typeof props.onChange === "function" && props.onChange(formData);
      },
      [formData]
   );
   return (
      <form
         className="peer"
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
                  formData,
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
   _props,
   _ref
) {
   let props = { ..._props };
   let ref: ForwardedRef<HTMLInputElement> = _ref;
   if (!ref) ref = useRef<HTMLInputElement>(null);
   props.className = `
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

   useEffect(
      function () {
         if (providerInitialized)
            changeForm(props.name || "", ref?.current?.value || "");
      },
      [providerInitialized]
   );
   props.onChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
      let target = e.target as HTMLInputElement;
      if (providerInitialized) {
         changeForm(target.name, target.value);
      }
      if (typeof _props.onChange == "function") _props.onChange(e);
   };
   if (providerInitialized) {
      props.value = (state.formData || {})[
         props.name as keyof typeof state.formData
      ];
      if (props.name === undefined)
         throw new Error(
            "<Input.Text name='' /> name attributte is required for data name"
         );
      useEffect(
         function () {
            initRefInput(props.name || "", ref);
         },
         [props.name]
      );
   }
   return (
      <input
         onChange={(e: any) => props.onChange?.(e)}
         value={props.value}
         autoComplete="off"
         autoCorrect="off"
         ref={ref}
         type="text"
         {...props}
      />
   );
});

const Number = React.forwardRef<HTMLInputElement, InputNumberProps>(function (
   _props,
   _ref
) {
   let props = { ..._props };
   let ref: ForwardedRef<HTMLInputElement> = _ref;
   if (!ref) ref = useRef<HTMLInputElement>(null);
   const [isFocus, setIsFocus] = useState(false);
   props.onFocus = (e) => {
      _props.onFocus?.(e);
      setIsFocus(true);
   };
   props.onBlur = (e) => {
      _props.onBlur?.(e);
      setIsFocus(false);
   };
   props.className = `
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

   useEffect(
      function () {
         if (providerInitialized)
            changeForm(props.name || "", ref?.current?.value || "");
      },
      [providerInitialized]
   );
   // if(props.)
   props.onChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
      let target = e.target as HTMLInputElement;
      let val = target.value.replace(/[^0-9 . \-]/g, "");
      if (val === "NaN") val = "";
      if (providerInitialized) {
         changeForm(target.name, removeNumbering(val));
      }
      if (typeof _props.onChange == "function") _props.onChange(e);
   };
   if (providerInitialized) {
      props.value = (state.formData || {})[
         props.name as keyof typeof state.formData
      ];
      if (props.typeInput === undefined) {
         props.typeInput = "int";
      }
      if (props.name === undefined)
         throw new Error(
            "<Input.Text name='' /> name attributte is required for data name"
         );
      useEffect(
         function () {
            initRefInput(props.name || "", ref);
         },
         [props.name]
      );
   }

   if (props.typeInput === "currency")
      props.value = thousandSparator(String(props.value || ""));
   if (props.typeInput === "int")
      props.value = parseInt(String(props.value)).toString();
   if (props.typeInput === "float" && !isFocus)
      props.value = parseFloat(String(props.value)).toString();
   if (props.value === "NaN") props.value = "";
   return (
      <input
         onChange={(e: any) => props.onChange?.(e)}
         value={props.value}
         autoComplete="off"
         autoCorrect="off"
         ref={ref}
         type="text"
         {...props}
      />
   );
});

const Select = React.forwardRef<HTMLSelectElement, SelectOptionPorps>(function (
   _props,
   _ref
): JSX.Element {
   let props = { ..._props };
   let ref: ForwardedRef<HTMLSelectElement> = _ref;
   if (!ref) ref = useRef<HTMLSelectElement>(null);
   props.className = `
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
   useEffect(
      function () {
         if (providerInitialized)
            changeForm(props.name || "", ref?.current?.value || "");
      },
      [providerInitialized]
   );
   props.onChange = (e: React.FormEvent<HTMLSelectElement>) => {
      let target = e.target as HTMLInputElement;
      if (providerInitialized) {
         changeForm(target.name, target.value);
      }
      if (typeof _props.onChange == "function") _props.onChange(e);
   };
   if (providerInitialized) {
      props.value = (state.formData || {})[
         props.name as keyof typeof state.formData
      ];
      if (props.name === undefined)
         throw new Error(
            "<Input.Text name='' /> name attributte is required for data name"
         );

      useEffect(
         function () {
            initRefInput(props.name || "", ref);
         },
         [props.name]
      );
   }
   return (
      <select
         value={props.value}
         autoComplete="off"
         autoCorrect="off"
         ref={ref}
         {...props}
      >
         <option
            onChange={(e: any) => props.onChange?.(e)}
            className="text-gray-300 text-sm"
            value={""}
         >
            {props.placeholder || "-- Select --"}
         </option>
         {props.children}
      </select>
   );
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
   Select,
   Number,
};
