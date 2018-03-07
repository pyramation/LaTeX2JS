// <template>
//   <div class="latex-container">
//     <macros v-if="!usemacros" />
//     <component
//       v-for="(item, id) in items"
//       :is="item.type"
//       :env="item.env"
//       :lines="item.lines"
//       :plot="item.plot"
//       :settings="item.settings"
//       :key="id"
//       >
//     </component>
//   </div>
// </template>
//
// <script>
//
import LaTeX2JS from 'latex2js';
import { getMathJax, loadMathJax } from 'latex2js-mathjax';
import pspicture from './components/pspicture';
import nicebox from './components/nicebox';
import enumerate from './components/enumerate';
import verbatim from './components/verbatim';
import slider from './components/slider';
import math from './components/math';
import macros from './components/macros';

export { pspicture, nicebox, enumerate, verbatim, math, macros };

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
