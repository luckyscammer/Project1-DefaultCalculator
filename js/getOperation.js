export default function (className) {
    switch (className) {
        case "button--change":
            return "+-";
        case "button--mod":
            return "%";
        case "button--bin":
            return "bin";
        case "button--delete":
            return "del";
        case "button--square":
            return "^";
        case "button--sqrt":
            return "sqrt";
        case "button--subtract":
            return "-";
        case "button--add":
            return "+";
        case "button--multiply":
            return "*";
        case "button--divide":
            return "/";
        case "button--equals":
            return "=";
        case "button--comma":
            return ".";
    }
}