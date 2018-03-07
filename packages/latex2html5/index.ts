import LaTeX2JS from 'latex2js';
import { getMathJax, loadMathJax } from 'latex2js-mathjax';
import pspicture from './components/pspicture';
import nicebox from './components/nicebox';
import enumerate from './components/enumerate';
import verbatim from './components/verbatim';
import slider from './components/slider';
import math from './components/math';
import macros from './components/macros';

const ELEMENTS = { pspicture, nicebox, enumerate, verbatim, math, macros };

export { pspicture, nicebox, enumerate, verbatim, math, macros };

export default function render(tex) {
  const done = () => {
    const latex = new LaTeX2JS();
    const parsed = latex.parse(tex);
    const div = document.createElement('div');
    div.className = 'latex-container';
    parsed.forEach(el => {
      if (ELEMENTS.hasOwnProperty(el.type)) {
        div.appendChild(ELEMENTS[el.type].call(el));
      }
    });
    document.body.appendChild(div);
  };

  if (getMathJax()) {
    return done();
  }
  loadMathJax(done);
}
