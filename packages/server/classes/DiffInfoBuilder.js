"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DiffLineBuilder_1 = __importDefault(require("./DiffLineBuilder"));
var BuildInfoBuilder = /** @class */ (function () {
    function BuildInfoBuilder(diffLines) {
        if (diffLines === void 0) { diffLines = []; }
        this.diffLines = diffLines;
    }
    BuildInfoBuilder.prototype.addLine = function (diffKind) {
        var diffLine = new DiffLineBuilder_1.default(diffKind);
        this.diffLines.push(diffLine);
        return diffLine;
    };
    return BuildInfoBuilder;
}());
exports.default = BuildInfoBuilder;
//# sourceMappingURL=DiffInfoBuilder.js.map