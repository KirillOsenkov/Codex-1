/// <reference path="../node_modules/@types/jquery/index.d.ts"/>
/// <reference path="../node_modules/monaco-editor/monaco.d.ts"/>
/// <reference path="rpc.ts"/>
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var editor;
var codexWebRootPrefix = "";
var currentTextModel;
var sourceFileModel;
var registered;
function registerProviders() {
    if (registered) {
        return;
    }
    registered = true;
    monaco.languages.register({ id: 'csharp' });
    monaco.languages.registerDefinitionProvider('csharp', {
        provideDefinition: function (model, position) {
            var offset = model.getOffsetAt(position);
            var definition = getReference(sourceFileModel, offset);
            var uri = monaco.Uri.parse(encodeURI(definition.projectId) + "/" + encodeURI(definition.symbol));
            uri.projectId = definition.projectId;
            uri.symbol = definition.symbol;
            return {
                uri: uri,
                range: { startLineNumber: 1, startColumn: 7, endLineNumber: 1, endColumn: 8 }
            };
            //if (word && word.word === "B") {
            //    
            //}
            //return null;
        }
    });
    monaco.languages.registerReferenceProvider('csharp', {
        provideReferences: function (model, position) {
            var word = model.getWordAtPosition(position);
            if (word && word.word === "B") {
                return [{ uri: monaco.Uri.parse("bar/c"), range: { startLineNumber: 1, startColumn: 7, endLineNumber: 1, endColumn: 8 } }];
            }
            return [];
        }
    });
    //monaco.languages.register({ id: 'csharp' });
    //monaco.languages.registerDefinitionProvider('csharp', {
    //    provideDefinition: function (model, position) {
    //        var offset = model.getOffsetAt(position);
    //       var url = codexWebRootPrefix + "/definitionAtPosition/" + encodeURI(project) + "/?filename=" + encodeURIComponent(file) + "&position=" + encodeURIComponent(offset);
    //       return callServer(url, function (data) {
    //           var key = project + "/" + file;
    //           //var uri = monaco.Uri.parse(codexWebRootPrefix + data.url + "42");
    //           var uri = monaco.Uri.parse(key);
    //           return { uri: uri, range: { startLineNumber: 1, startColumn: 7, endLineNumber: 1, endColumn: 8 } };
    //       });
    //   } 
    //});
    //monaco.languages.registerReferenceProvider('csharp', {
    //    provideDefinition: function (model, position) {
    //        var offset = model.getOffsetAt(position);
    //        var url = codexWebRootPrefix + "/definitionAtPosition/" + encodeURI(project) + "/?filename=" + encodeURIComponent(file) + "&position=" + encodeURIComponent(offset);
    //        return callServer(url, function (data) {
    //            var key = project + "/" + file;
    //            //var uri = monaco.Uri.parse(codexWebRootPrefix + data.url + "42");
    //            var uri = monaco.Uri.parse(key);
    //            return { uri: uri, range: { startLineNumber: 1, startColumn: 7, endLineNumber: 1, endColumn: 8 } };
    //        });
    //    }
    //});
}
//function openEditor(input) {
//    alert(input.resource);
//    var uri = input.resource;
//    return callServer(uri, function(data) {
//        editor.setValue(data.contents);
//    });
//}
function openEditor(input) {
    return __awaiter(this, void 0, void 0, function () {
        var definitionLocation, model, monacoPosition, position;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getDefinitionLocation(input.resource.projectId, input.resource.symbol)];
                case 1:
                    definitionLocation = _a.sent();
                    if (typeof definitionLocation === "string") {
                    }
                    else {
                        model = createModelFrom(definitionLocation.contents, definitionLocation.projectId, definitionLocation.filePath);
                        sourceFileModel = definitionLocation;
                        editor.setModel(model);
                        // TODO: add try/catch, refactor the logic out
                        editor.focus();
                        if (definitionLocation.span) {
                            monacoPosition = currentTextModel.getPositionAt(definitionLocation.span.position);
                            position = { lineNumber: monacoPosition.lineNumber, column: monacoPosition.column };
                            editor.revealPositionInCenter(position);
                            editor.setPosition(position);
                            editor.deltaDecorations([], [
                                {
                                    range: new monaco.Range(position.lineNumber, 1, position.lineNumber, 1),
                                    options: { className: 'highlightLine', isWholeLine: true }
                                }
                            ]);
                            editor.setSelection({ startLineNumber: position.lineNumber, startColumn: position.column, endLineNumber: position.lineNumber, endColumn: position.column + definitionLocation.span.length });
                        }
                    }
                    return [2 /*return*/, monaco.Promise.as(null)];
            }
        });
    });
}
var models;
//var models = {
//};
function createModelFrom(content, project, file) {
    if (currentTextModel) {
        currentTextModel.dispose();
    }
    var key = project + "/" + file;
    currentTextModel = monaco.editor.createModel(content, 'csharp', monaco.Uri.parse(key));
    return currentTextModel;
}
function createMonacoEditorAndDisplayFileContent(project, file, sourceFile) {
    editor = undefined;
    sourceFileModel = sourceFile;
    if (!editor) {
        require.config({ paths: { 'vs': 'node_modules/monaco-editor/dev/vs' } });
        var editorPane = document.getElementById('editorPane');
        if (editorPane) {
            require(['vs/editor/editor.main'], function () {
                var SymbolicUri = (function (_super) {
                    __extends(SymbolicUri, _super);
                    function SymbolicUri() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    return SymbolicUri;
                }(monaco.Uri));
                registerProviders();
                currentTextModel = createModelFrom(sourceFileModel.contents, project, file);
                editor = monaco.editor.create(editorPane, {
                    // Don't need to specify a language, because model carries this information around.
                    model: currentTextModel,
                    readOnly: true,
                    lineNumbers: "on",
                    scrollBeyondLastLine: true
                }, {
                    editorService: { openEditor: openEditor },
                });
                editor.focus();
                if (sourceFile.span) {
                    var monacoPosition = currentTextModel.getPositionAt(sourceFile.span.position);
                    var position = { lineNumber: monacoPosition.lineNumber, column: monacoPosition.column };
                    editor.revealPositionInCenter(position);
                    editor.setPosition(position);
                    editor.deltaDecorations([], [
                        {
                            range: new monaco.Range(position.lineNumber, 1, position.lineNumber, 1),
                            options: { className: 'highlightLine', isWholeLine: true }
                        }
                    ]);
                    editor.setSelection({ startLineNumber: position.lineNumber, startColumn: position.column, endLineNumber: position.lineNumber, endColumn: position.column + sourceFile.span.length });
                }
            });
        }
    }
}