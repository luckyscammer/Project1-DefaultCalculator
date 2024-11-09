function operationSqrt(num) {
    return Math.sqrt(Number.parseFloat(num))
}

function operationSquare(num) {
    return Math.pow(Number.parseFloat(num), 2)
}

function operationChange(num) {
    return Number.parseFloat(num) * (-1)
}

export { operationSqrt, operationSquare, operationChange }