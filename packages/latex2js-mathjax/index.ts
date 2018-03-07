import loadScript from 'load-script';

export const DEFAULT_SCRIPT =
  process.env.MATHJAX_CDN ||
  'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-MML-AM_CHTML';

export const DEFAULT_OPTIONS = {
  showProcessingMessages: false,
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
};

export const getMathJax = () =>
  typeof MathJax === 'undefined' ? undefined : MathJax;

export const onLoad = () => {
  // const { options } = this.props
  const options = DEFAULT_OPTIONS;
  MathJax.Hub.Config(options);

  // this.setState({
  //   loaded: true
  // })
};
export const mounted = (script: string = DEFAULT_SCRIPT) => {
  if (!script) {
    return onLoad();
  }
  loadScript(script, onLoad);
};
