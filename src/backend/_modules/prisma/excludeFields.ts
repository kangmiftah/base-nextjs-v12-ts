

export default function exclude<T>(
   data: T,
   keys: Array<keyof T>
 ): Omit<T, keyof T> {
   for (let key of keys) {
     delete data[key]
   }
   return data
 }