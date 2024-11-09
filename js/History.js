export default class History {
    static add(operation, result) {
        const results = History.getResults();
        results.push({ operation, result } );
        localStorage.setItem("results", JSON.stringify(results));
    }

    static remove(index) {
        const results = History.getResults();
        results.splice(index, 1);
        localStorage.setItem("results", JSON.stringify(results));
    }

    static clear() {
        localStorage.removeItem("results")
    }

    static getResults() {
        const results = localStorage.getItem("results") || "[]";
        return JSON.parse(results);
    }
}
