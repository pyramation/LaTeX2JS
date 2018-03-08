import * as loadScript from 'load-script';
declare var MathJax: any;
export const DEFAULT_SCRIPT =
  process.env.MATHJAX_CDN ||
  'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.3/MathJax.js';

export const DEFAULT_OPTIONS = {
  TeX: { extensions: ['AMSmath.js', 'AMSsymbols.js'] },
  extensions: ['tex2jax.js'],
  showProcessingMessages: false,
  jax: ['input/TeX', 'output/HTML-CSS'],
  messageStyle: 'none',
  showMathMenu: false,
  showMathMenuMSIE: false,
  tex2jax: {
    processEnvironments: true,
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']],
    preview: 'none',
    processEscapes: true,
  },
  'HTML-CSS': { linebreaks: { automatic: true, width: 'container' } },
};

export const getMathJax = () =>
  typeof MathJax === 'undefined' ? undefined : MathJax;

export const loadMathJax = (
  callback: Function = () => {},
  script: string = DEFAULT_SCRIPT,
  options: object = DEFAULT_OPTIONS
) => {
  const onLoad = () => {
    MathJax.Hub.Config(options);
    callback();
  };
  if (!script) {
    return onLoad();
  }
  loadScript(script, onLoad);
};
