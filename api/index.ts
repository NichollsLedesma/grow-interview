import Express, { Request, Response } from "express";
import { config } from './config';
import { getAllPeople, getAllPlanets } from "./services";

const app = Express();


app.get('/people', async (req: Request, res: Response): Promise<void> => {
    const { sortBy, page = 1, size = 10 } = req.query
    const paginationParams = {
        page: Number(page),
        size: Number(size),
    };
    const data = await getAllPeople(paginationParams, sortBy as string)

    res.json(data);
});

app.get('/planets', async (req: Request, res: Response): Promise<void> => {
    const { page = 1, size = 10 } = req.query
    const paginationParams = {
        page: Number(page),
        size: Number(size),
    }
    const data = await getAllPlanets(paginationParams)

    res.json(data);
});

app.listen(config.port, () => console.log(`Listening on port: ${config.port}`));