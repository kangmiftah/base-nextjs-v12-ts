import React from "react";
export declare interface ILayout {
    children? : React.ReactNode;
    page? : React.ReactElement;
}
type childs = ()=>JSX.Element
export declare interface SideMenuProps extends React.PropsWithChildren {

}

export type SideConfigType = {
    title: string;
    haveChild: boolean;
    link:string;
    icon:ReactNode
    childs? : Array<{
        title: string;
        link: string;
     }>
}