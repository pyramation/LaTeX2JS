import React from 'react';
export default ({ lines }) => (
  <ul className="math">
    {list.map(line => {
      var m = line.match(/\\item (.*)/);
      if (m) {
        return <li>{m[1]}</li>;
      } else {
        return line;
      }
    })}
  </ul>
);
