export declare interface BaseResponseAPI<T = any> {
   code : string;
   message : string;
   data? : T;
}