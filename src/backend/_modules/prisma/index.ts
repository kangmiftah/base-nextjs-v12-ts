import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

// if (process.env.NODE_ENV === "production") {
  
//  } else {
//    if (!global.prisma) {
//      global.prisma = new PrismaClient()
//    }
 
//    prisma = global.prisma
//  }
 prisma = new PrismaClient()
export default prisma;