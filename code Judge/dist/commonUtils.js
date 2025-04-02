"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
