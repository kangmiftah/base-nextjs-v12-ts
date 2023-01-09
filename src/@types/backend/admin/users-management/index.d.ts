

declare interface baseBodyUser {
   id? : number,
   name : string,
   email : string,
   role_id : number
}

export declare interface bodyUser extends baseBodyUser {
   password : string,
   re_password : string,
}