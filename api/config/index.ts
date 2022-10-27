import dotenv from "dotenv";
dotenv.config();

interface IConfig {
    port: number;
}

export const config: IConfig = {
    port:  process.env.PORT ? Number(process.env.PORT) : 3000
}