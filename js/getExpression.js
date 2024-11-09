export default function(expression) {
    const cleanedExpression = expression.replace(/\s+/g, '');

    try {
        return eval(cleanedExpression);
    } catch (e) {
        throw new Error(`Помилка під час обчислення виразу: ${e.message}`);
    }
}