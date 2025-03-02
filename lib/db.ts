import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
    return new PrismaClient();
};

declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;


// import { PrismaClient } from "@prisma/client";

// const globalForPrisma = globalThis as unknown as {
//     prisma?: PrismaClient;
// };

// const prisma = globalForPrisma.prisma ?? new PrismaClient({
//     log: ["query", "info", "warn", "error"], // Tambahkan logging untuk debugging
// });

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// export default prisma;