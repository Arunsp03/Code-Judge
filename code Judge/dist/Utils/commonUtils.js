"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnLanguage = exports.Languages = void 0;
exports.capitalizeWords = capitalizeWords;
exports.capitalize = capitalize;
function capitalizeWords(sentence) {
    return sentence
        .split(" ")
        .map(word => capitalize(word))
        .join(" ");
}
function capitalize(str) {
    if (!str)
        return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
}
var Languages;
(function (Languages) {
    Languages[Languages["python"] = 71] = "python";
    Languages[Languages["node"] = 93] = "node";
})(Languages || (exports.Languages = Languages = {}));
const returnLanguage = (language) => {
    switch (language) {
        case 'python':
            return Languages.python;
            break;
        case 'node': return Languages.node;
        default: return undefined;
    }
};
exports.returnLanguage = returnLanguage;
