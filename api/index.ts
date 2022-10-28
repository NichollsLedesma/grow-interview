import Express, { Request, Response } from "express";
import { config } from './config';
import { getAllPeople, getAllPlanets } from "./services";
import { loadData } from "./services/third-party";

const app = Express();

(async () => {
    await loadData();
})()

app.get('/people', (req: Request, res: Response): void => {
    const { sortBy } = req.query
    const data = getAllPeople(sortBy as string)

    res.json(data);
});

app.get('/planets', (req: Request, res: Response): void => {
    const data = getAllPlanets()

    res.json(data);
});

app.listen(config.port, () => console.log(`Listening on port: ${config.port}`));