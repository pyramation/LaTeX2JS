Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var latex = new index_1.default();
describe('Parser', function () {
    it('parser', function () {
        var parser = latex.getParser();
        var parsed = parser.parse("\nLet's get to the point. The core of PSTricks is graphics!\n\n\\begin{center}\n\\begin{pspicture}(-5,-5)(5,5)\n\\psline{->}(0,-3.75)(0,3.75)\n\\psline{->}(-3.75,0)(3.75,0)\n\\pscircle(0,0){ 3 }\n\\end{pspicture}\n\\end{center}\n\nwhich can be produced using the following \\TeX:\n\n\\begin{verbatim}\n\\begin{center}\n\\begin{pspicture}(-5,-5)(5,5)\n\\psline{->}(0,-3.75)(0,3.75)\n\\psline{->}(-3.75,0)(3.75,0)\n\\pscircle(0,0){ 3 }\n\\end{pspicture}\n\\end{center}\n\\end{verbatim}\n    ");
        expect(parsed).toMatchSnapshot();
    });
    it('parse', function () {
        var result = latex.parse("\nLet's get to the point. The core of PSTricks is graphics!\n\n\\begin{center}\n\\begin{pspicture}(-5,-5)(5,5)\n\\psline{->}(0,-3.75)(0,3.75)\n\\psline{->}(-3.75,0)(3.75,0)\n\\pscircle(0,0){ 3 }\n\\end{pspicture}\n\\end{center}\n\nwhich can be produced using the following \\TeX:\n\n\\begin{verbatim}\n\\begin{center}\n\\begin{pspicture}(-5,-5)(5,5)\n\\psline{->}(0,-3.75)(0,3.75)\n\\psline{->}(-3.75,0)(3.75,0)\n\\pscircle(0,0){ 3 }\n\\end{pspicture}\n\\end{center}\n\\end{verbatim}\n    ");
        expect(result).toMatchSnapshot();
    });
});
//# sourceMappingURL=parser.test.js.map