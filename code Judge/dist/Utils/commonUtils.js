"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnExtension = exports.returnLanguage = exports.Extension = exports.Languages = void 0;
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
    Languages[Languages["javascript"] = 93] = "javascript";
})(Languages || (exports.Languages = Languages = {}));
var Extension;
(function (Extension) {
    Extension["python"] = "py";
    Extension["node"] = "js";
})(Extension || (exports.Extension = Extension = {}));
const returnLanguage = (language) => {
    switch (language) {
        case 'python':
            return Languages.python;
            break;
        case 'node': return Languages.node;
        case 'javascript': return Languages.node;
        default: return undefined;
    }
};
exports.returnLanguage = returnLanguage;
const returnExtension = (language) => {
    switch (language) {
        case 'python':
            return Extension.python;
            break;
        case 'javascript': return Extension.node;
        default: return undefined;
    }
};
exports.returnExtension = returnExtension;
