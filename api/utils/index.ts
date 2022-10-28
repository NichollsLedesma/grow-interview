import { writeFileSync, readFileSync } from "fs";
import { join } from "path";

export const sortingBy = (data: any[], by: string, isAsc: boolean = true): void => {
    let aLargeThanB = 1, bLargeThanA = -1;
    if (!isAsc) {
        aLargeThanB = -1
        bLargeThanA = 1
    }
    data.sort((a, b) => {
        if (a[by] > b[by]) return aLargeThanB;
        if (a[by] < b[by]) return bLargeThanA;
        return 0;
    })
}

export const writeFile = <T>(filename: string, data: T[]) => {
    const fullPath = join(__dirname, `../resources/${filename}`);
    try {
        writeFileSync(fullPath, JSON.stringify(data));
    } catch (err) {
        console.log(err);
    }
}

export const readFile = <T>(filename: string): T[] | undefined => {
    const fullPath = join(__dirname, `../resources/${filename}`);
    try {
        const dataString = readFileSync(fullPath, {
            encoding: 'utf-8'
        });
        return JSON.parse(dataString)
    } catch (err) {
        console.log(err);
    }
}

export const findObject = <T>(list: T[], key: string, value: string): T | null => {
    const item = list.find(it => {
        const aux = it as Record<string, string>
        return aux[key] === value
    })

    if (!item) return null;

    return item as T
}