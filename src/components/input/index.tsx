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
   AsyncSelect2Props,
   InputCheckBoxProps,
   InputNumberProps,
   InputSize,
   InputTextProps,
   SelectOptionPorps,
   TextAreaProps,
} from "../../@types/components/input";
import { thousandSparator, removeNumbering } from "../../_modules/helpers";
import AsyncSelect from "react-select/async";

type FormState = {
   actions: {
      initRefInput: (name: string, refObj: any) => any;
      changeForm: (name: string, value: any) => any;
      setErr: (s: any) => any
   };
   state: {
      formData?: Object;
      refInput?: any;
      err: Array<{
         name: "", 
         message: ""
      }>
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
      setErr( v => v.filter(v => v.name !== name))
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
         // setErr([])
      },
      [formData]
   );
   const [err, setErr] = useState<Array<{
      name: "", 
      message: ""
   }>>([])
   function cekValidasi() { 
      let keys = Object.keys(refInput);
      let invalid  = false;
      keys.forEach(v => {
         let x = refInput[v as keyof typeof refInput];
         let name = (x?.current?.name as keyof typeof formData)
         console.log(v,x,   formData[name] === undefined || formData[name] === "")
         if(x?.current?.required && (
            !formData[name]
         )){

            let newData = err.some(v => v.name === v.name) ? [] : [{
               name: x?.current?.name || "",
               message: `Field is Required` }
            ]
            setErr( v => [ ...v, ...newData])
            invalid = true
         }
      })

      return invalid

   }
      
   
   return (
      <form
         className="peer"
         ref={ref}
         autoComplete="off"
         // noValidate
         { ...props}
         onSubmit={(e: React.SyntheticEvent<HTMLFormElement>) => {
            
            e.preventDefault();
            if (typeof _props.onSubmit === "function" )
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
                  setErr

               },
               state: {
                  formData,
                  refInput,
                  err
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
      border rounded w-full ${getSize(props.sizeinput)} px-3 
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

   let errorMsg = (state?.err || []).find(v => v.name === props.name)?.message
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
      <>
         <input
            onChange={(e: any) => props.onChange?.(e)}
            value={props.value}
            autoComplete="off"
            autoCorrect="off"
            ref={ref}
            type="text"
            {...props}
         />
         <span className="text-danger">
            {
               errorMsg
            }
         </span>
      </>
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
      border rounded w-full ${getSize(props.sizeinput)} px-3 
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
   
      let errorMsg = (state?.err || []).find(v => v.name === props.name)?.message

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
      <>
      
         <input
            onChange={(e: any) => props.onChange?.(e)}
            value={props.value}
            autoComplete="off"
            autoCorrect="off"
            ref={ref}
            type="text"
            {...props}
         />
      <span className="text-danger">
            {
               errorMsg
            }
         </span>
      </>
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
   border rounded w-full ${getSize(props.sizeinput)} px-3 
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
   let errorMsg = (state?.err || []).find(v => v.name === props.name)?.message
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
      <>
         <select
            value={props.value}
            autoComplete="off"
            autoCorrect="off"
            ref={ref}
            onChange={(e: any) => props.onChange?.(e)}
            {...props}
         >
            <option className="text-gray-300 text-sm" value={""}>
               {props.placeholder || "-- Select --"}
            </option>
            {props.children}
         </select>
         <span className="text-danger">
            {
               errorMsg
            }
         </span>
      </>
   );
});

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(function (
   _props,
   _ref
) {
   let props = { ..._props };
   let ref: ForwardedRef<HTMLTextAreaElement> = _ref;
   if (!ref) ref = useRef<HTMLTextAreaElement>(null);
   props.className = `
      appearance-none shadow
      border rounded w-full py-1 px-3 
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
   props.onChange = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
      let target = e.target as HTMLTextAreaElement;
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
      <textarea
         onChange={(e: any) => props.onChange?.(e)}
         defaultValue={props.value || ""}
         value={props.value || ""}
         autoComplete="off"
         autoCorrect="off"
         ref={ref}
         {...props}
      />
   );
});

const CheckBox = React.forwardRef<HTMLInputElement, InputCheckBoxProps>(
   function (_props, _ref) {
      let props = { ..._props };
      let ref: ForwardedRef<HTMLInputElement> = _ref;
      if (!ref) ref = useRef<HTMLInputElement>(null);
      props.className = `
   w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer
    ${props.className} mr-3
   `;
      const {
         state,
         actions: { initRefInput = () => null, changeForm },
         providerInitialized,
      } = useForm();
      
      useEffect(
         function () {
            if (providerInitialized)
               changeForm(props.name || "", props.checked || "");
         },
         [providerInitialized]
      );
      props.onChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
         let target = e.target as HTMLInputElement;
         if (providerInitialized) {
            changeForm(target.name, target.checked);
         }
         if (typeof _props.onChange == "function") _props.onChange(e);
      };
      if (providerInitialized) {
         if (props.name === undefined)
            throw new Error(
               "<Input.Text name='' /> name attributte is required for data name"
            );
         props.checked = (state.formData || {})[
            props.name as keyof typeof state.formData
         ];
         useEffect(
            function () {
               initRefInput(props.name || "", ref);
            },
            [props.name]
         );
      }
      return (
         // <div className="flex items-center">
         <input
            type={"checkbox"}
            onChange={(e: any) => props.onChange?.(e)}
            defaultValue={props.value || ""}
            value={props.value || ""}
            ref={ref}
            checked={props.checked}
            {...props}
         />
         // {props.children}
         // </div>
      );
   }
);

const AsyncSelect2 = React.forwardRef<AsyncSelect, AsyncSelect2Props>(function (
   _props,
   _ref
): JSX.Element {
   let props = { ..._props };
   let ref: ForwardedRef<AsyncSelect> = _ref;
   if (!ref) ref = useRef<AsyncSelect>(null);
   props.className = `
   shadow focus:invalid:border-danger
   `;
   const {
      state,
      actions: { initRefInput = () => null, changeForm },
      providerInitialized,
   } = useForm();
   
   let errorMsg = (state?.err || []).find(v => v.name === props.name)?.message
   useEffect(
      function () {
         if (providerInitialized)
            changeForm(props.name || "", props.value || "");
      },
      [providerInitialized]
   );
   let opt: Array<{ value: string; label: string }> = []
   if (props.options)  opt = props.options
   props.onChange = (e) => {
      // let target = e.target as HTMLInputElement;
      if (providerInitialized) {
         changeForm(props.name || "", e.value);
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
            initRefInput(props.name || "", {
               current: {
                  ...props
               }
            });
         },
         [props.name]
      );
   }

   let place = [
      {
         "label" : ` -- Select ${props.placeholder || "" } --`,
         "value" : "",

       }  
   ]
   const filter = (inputValue: string) => {
      let fnData: (s: string) => Array<{ value: string; label: string }> = (inputValue) => place ;
      if(props.withCallApi) {
         if(props.asyncDataSelect !== undefined && props.withCallApi) fnData = props.asyncDataSelect
         return  [ ...place, ...fnData(inputValue)]
      }

      else return [ ...place, ...opt.filter(
         (i) =>
            i.label.toLowerCase().includes(String(inputValue || "").toLowerCase()) ||
            i.value.toLocaleLowerCase().includes(String(inputValue || "").toLocaleLowerCase())
      )];
   };

   const loadOptions = (
      inputValue: string,
      callback: (options: Array<any>) => any
   ) => {
      let fnData: (s: string) => Array<{ value: string; label: string }> =
         filter;
      if (props.asyncDataSelect !== undefined && props.withCallApi) {
         fnData = props.asyncDataSelect;
      }
      setTimeout(() => {
         callback(filter(inputValue || ""));
      }, 100);
   };
   let defaultInputValue = "";
   // useEffect(function(){
   if (props.value ){
      let data = filter(props.value || "");
      props.value = data?.find(v => v.value === props.value)
      defaultInputValue = props.value?.label
   } else {
      props.value = place[0]
   }
   // },[])
   props.styles = { 
      ...props.styles, 
      menu(base, props) { return { ...base, zIndex: 999}  },
      menuPortal(base, props) { return { ...base, zIndex: 999} },
   }
   return (
      <>
         <AsyncSelect
            defaultValue={props.value}
            defaultInputValue={defaultInputValue}
            cacheOptions
            placeholder={` -- Select ${props.placeholder || "" } --`}
            loadOptions={loadOptions}
            defaultOptions
            aria-invalid={true}
            {...props}
         />
         {
            errorMsg &&   <span className="text-danger">
            {
               errorMsg
            }
         </span>
         }
      </>
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
   TextArea,
   CheckBox,
   AsyncSelect2,
};
