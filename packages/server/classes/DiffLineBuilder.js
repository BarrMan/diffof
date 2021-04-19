"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DiffLineBuilder = /** @class */ (function () {
    function DiffLineBuilder(diffKind, diffPhrases) {
        if (diffPhrases === void 0) { diffPhrases = []; }
        this.diffKind = diffKind;
        this.diffPhrases = diffPhrases;
    }
    DiffLineBuilder.prototype.addPhrase = function (phrase) {
        this.diffPhrases.push(phrase);
        return this;
    };
    return DiffLineBuilder;
}());
exports.default = DiffLineBuilder;
//# sourceMappingURL=DiffLineBuilder.js.map