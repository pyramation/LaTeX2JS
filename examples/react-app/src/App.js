import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import 'latex2js/latex2js.css';
import { LaTeX } from 'latex2react';

const tex = String.raw`
Probably the best part of using PSTricks is that you can mix both graphics and mathematics:

\begin{center}
\begin{pspicture}(0,-3)(8,3)

\rput(0,0){$x(t)$}
\rput(4,1.5){$f(t)$}
\rput(4,-1.5){$g(t)$}
\rput(8.2,0){$y(t)$}
\rput(1.5,-2){$h(t)$}

\psframe(1,-2.5)(7,2.5)
\psframe(3,1)(5,2)
\psframe(3,-1)(5,-2)

\rput(4,0){$X_k = \frac{1}{p} \sum \limits_{n=\langle p\rangle}x(n)e^{-ik\omega_0n}$}

\psline[linewidth=1.25 pt]{->}(0.5,0)(1.5,0)
\psline[linewidth=1.25 pt]{->}(1.5,1.5)(3,1.5)
\psline[linewidth=1.25 pt]{->}(1.5,-1.5)(3,-1.5)

\psline[linewidth=1.25 pt]{->}(6.5,1.5)(6.5,0.25)
\psline[linewidth=1.25 pt]{->}(6.5,-1.5)(6.5,-0.25)
\psline[linewidth=1.25 pt]{->}(6.75,0)(7.75,0)
\psline[linewidth=1.25 pt](1.5,-1.5)(1.5,1.5)
\psline[linewidth=1.25 pt](5,1.5)(6.5,1.5)
\psline[linewidth=1.25 pt](5,-1.5)(6.5,-1.5)
\psline[linewidth=1.25 pt](6,-1.5)(6.5,-1.5)

\pscircle(6.5,0){0.25}
\psline(6.25,0)(6.75,0)
\psline(6.5,0.5)(6.5,-0.5)

\end{pspicture}
\end{center}

which can be produced with the following code:

\begin{verbatim}
\rput(0,0){$x(t)$}
\rput(4,1.5){$f(t)$}
\rput(4,-1.5){$g(t)$}
\rput(8.2,0){$y(t)$}
\rput(1.5,-2){$h(t)$}
\psframe(1,-2.5)(7,2.5)
\psframe(3,1)(5,2)
\psframe(3,-1)(5,-2)
\rput(4,0){$X_k = \frac{1}{p} \sum \limits_{n=\langle p\rangle}x(n)e^{-ik\omega_0n}$}
\psline[linewidth=1.25 pt]{->}(0.5,0)(1.5,0)
\psline[linewidth=1.25 pt]{->}(1.5,1.5)(3,1.5)
\psline[linewidth=1.25 pt]{->}(1.5,-1.5)(3,-1.5)
\psline[linewidth=1.25 pt]{->}(6.5,1.5)(6.5,0.25)
\psline[linewidth=1.25 pt]{->}(6.5,-1.5)(6.5,-0.25)
\psline[linewidth=1.25 pt]{->}(6.75,0)(7.75,0)
\psline[linewidth=1.25 pt](1.5,-1.5)(1.5,1.5)
\psline[linewidth=1.25 pt](5,1.5)(6.5,1.5)
\psline[linewidth=1.25 pt](5,-1.5)(6.5,-1.5)
\psline[linewidth=1.25 pt](6,-1.5)(6.5,-1.5)
\pscircle(6.5,0){0.25}
\psline(6.25,0)(6.75,0)
\psline(6.5,0.5)(6.5,-0.5)
\end{verbatim}
`;

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <LaTeX content={tex} />
      </div>
    );
  }
}

export default App;
