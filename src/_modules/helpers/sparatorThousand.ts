export function thousandSparator(num : string) : string {
   if (num === null || num === undefined) return "0";
   const splitted : Array<string> = num.toString().split(".");
   let maskingNumber : string = splitted[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
   let afterComa : string = "";
   if (splitted.length > 1) {
      afterComa = "." + splitted[1];
   }
   return maskingNumber + afterComa;
}

export const removeNumbering = (num:string) => num.toString().replace(/[^0-9 .]/g, "");