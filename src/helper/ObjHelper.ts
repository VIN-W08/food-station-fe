export const checkObjInArray = (targetObj: Object, objArr: Object[]): {
    exist: boolean,
    count: number
    indexes: number[]
} => {
    let existCount = 0
    let existIndexes: number[] = []
    const existBoolArr = objArr.map(obj => {
        return JSON.stringify(targetObj) === JSON.stringify(obj)
    })
    for (var idx in existBoolArr) {
        if (existBoolArr[idx]) {
            existCount++
            existIndexes.push(+idx)
        }
    }
    return {
        exist: existBoolArr.includes(true),
        count: existCount,
        indexes: existIndexes
    }
}