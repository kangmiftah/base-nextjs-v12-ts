import { Button } from "../../../components"


export declare interface AlertComponentTypes {
   type : "Info" | "Error" | "Success" | "Warning",
   message : JSX.Element | string,
   title : string,
   callback? : Function,
}
