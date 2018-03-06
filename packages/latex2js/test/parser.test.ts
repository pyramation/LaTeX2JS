import LaTeX2JS from '../index';
const latex = new LaTeX2JS();

describe('Parser', () => {
  it('parser', () => {
    const parser = latex.getParser();
    const objects = parser.parse(`
Let's get to the point. The core of PSTricks is graphics!

\\begin{center}
\\begin{pspicture}(-5,-5)(5,5)
\\psline{->}(0,-3.75)(0,3.75)
\\psline{->}(-3.75,0)(3.75,0)
\\pscircle(0,0){ 3 }
\\end{pspicture}
\\end{center}

which can be produced using the following \\TeX:

\\begin{verbatim}
\\begin{center}
\\begin{pspicture}(-5,-5)(5,5)
\\psline{->}(0,-3.75)(0,3.75)
\\psline{->}(-3.75,0)(3.75,0)
\\pscircle(0,0){ 3 }
\\end{pspicture}
\\end{center}
\\end{verbatim}
    `);
    expect(objects).toMatchSnapshot();
  });
});
