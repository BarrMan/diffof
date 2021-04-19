"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var DiffInfoBuilder_1 = __importDefault(require("../classes/DiffInfoBuilder"));
var Phrase_1 = __importDefault(require("../classes/Phrase"));
var DiffKind_1 = __importDefault(require("../interfaces/DiffKind"));
var PhraseSymbol_1 = __importDefault(require("../interfaces/PhraseSymbol"));
var DocumentDiffStrategy = /** @class */ (function () {
    function DocumentDiffStrategy() {
        var _this = this;
        this.getDiffPairs = function (prevCollection, nextCollection, diffOptions) {
            var _a = [lodash_1.keyBy(prevCollection, diffOptions.uniqueKey), lodash_1.keyBy(nextCollection, diffOptions.uniqueKey)], prevHashes = _a[0], nextHashes = _a[1];
            return Object.entries(prevHashes).map(function (_a) {
                var key = _a[0], value = _a[1];
                return ({
                    prev: value,
                    next: nextHashes[key],
                });
            });
        };
        this.getDiffs = function (diffStates) {
            var diffs = diffStates.map(function (diffState) {
                return _this.evaluateDocumentDiffs(diffState);
            });
            return diffs;
        };
        this.evaluateDocumentDiffs = function (diffState) {
            var prevDiff = new DiffInfoBuilder_1.default();
            var nextDiff = new DiffInfoBuilder_1.default();
            prevDiff.addLine().addPhrase(new Phrase_1.default('{'));
            nextDiff.addLine().addPhrase(new Phrase_1.default('{'));
            prevDiff.addLine(DiffKind_1.default.ADDED).addPhrase(new Phrase_1.default(PhraseSymbol_1.default.TAB)).addPhrase(new Phrase_1.default('someProperty: "someValue",'));
            nextDiff.addLine(DiffKind_1.default.REMOVED).addPhrase(new Phrase_1.default(PhraseSymbol_1.default.TAB)).addPhrase(new Phrase_1.default('differentProperty: "someValue",'));
            return [prevDiff, nextDiff];
        };
        this.fileMask = 'json';
    }
    return DocumentDiffStrategy;
}());
exports.default = DocumentDiffStrategy;
//# sourceMappingURL=DocumentDiffStrategy.js.map