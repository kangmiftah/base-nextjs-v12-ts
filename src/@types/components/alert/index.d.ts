import { Button } from "../../../components"


export declare interface AlertComponentTypes {
   type : "Info" | "Error" | "Success" | "Warning",
   message : JSX.Element | string,
   title : string,
   callback? : Function,
}

export declare interface ConfirmComponentTypes {
   body : JSX.Element | string,
   header? : string,
   callback? : Function,
   closeButton : boolean,
   buttonFooter? : Array<{
      title: string,
      type: ButtonColourType
      onClick: Function
   }>

}