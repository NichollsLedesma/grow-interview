
export const sortingBy = (data: any[], by: string, isAsc: boolean = true):void => {
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