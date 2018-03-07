Object.defineProperty(exports, "__esModule", { value: true });
var pspicture_1 = require("./components/pspicture");
exports.pspicture = pspicture_1.default;
var nicebox_1 = require("./components/nicebox");
exports.nicebox = nicebox_1.default;
var enumerate_1 = require("./components/enumerate");
exports.enumerate = enumerate_1.default;
var verbatim_1 = require("./components/verbatim");
exports.verbatim = verbatim_1.default;
var math_1 = require("./components/math");
exports.math = math_1.default;
var macros_1 = require("./components/macros");
exports.macros = macros_1.default;
// export default {
//   name: 'latex',
//   components: {
//     pspicture,
//     nicebox,
//     enumerate,
//     verbatim,
//     slider,
//     math,
//     macros,
//   },
//   beforeMount() {
//     if (document.getElementById('latex-macros')) {
//       this.usemacros = true;
//     } else {
//       this.usemacros = false;
//     }
//
//     if (getMathJax()) {
//       return;
//     }
//     loadMathJax(() => {
//       this.loaded = true;
//     });
//   },
//   data() {
//     return {
//       usemacros: false,
//       loaded: false,
//     };
//   },
//   computed: {
//     items() {
//       const latex = new LaTeX2JS();
//       const parsed = latex.parse(this.$attrs.content);
//       return this.loaded ? parsed : [];
//     },
//   },
// };
// </script>
//# sourceMappingURL=index.js.map