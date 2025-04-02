"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Languages = void 0;
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
})(Languages || (exports.Languages = Languages = {}));
