import React from 'react';

type sizeCardType =  string | number

export declare interface CardProps extends React.PropsWithChildren {
   size? : sizeCardType
   className? : React.ClassAttributes = "";
   style? : React.CSSProperties = {};
}

export declare interface CardHeaderProps extends React.PropsWithChildren {
   className? : React.ClassAttributes;
   style? : React.CSSProperties;
}

export declare interface CardFooterProps extends React.PropsWithChildren {
   className? : React.ClassAttributes;
   style? : React.CSSProperties;
}

export declare interface CardBodyProps extends React.PropsWithChildren {
   className? : React.ClassAttributes;
   style? : React.CSSProperties;
}