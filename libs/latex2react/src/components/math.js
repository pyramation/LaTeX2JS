import React from 'react';
export default ({ lines }) => (
  <span className="math" dangerouslySetInnerHTML={lines.join('\n')} />
);
