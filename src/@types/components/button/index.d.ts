export type ButtonSizeType = "sm" | "lg" | undefined;
export type ButtonColourType =
   | "primary"
   | "secondary"
   | "info"
   | "warning"
   | "danger"
   | undefined;
export declare interface ButtonProps
   extends React.HTMLAttributes<HTMLButtonElement> {
   size?: buttonSize;
   color?: ButtonColourType;
   type? : "button" | "submit" | "reset"
}
