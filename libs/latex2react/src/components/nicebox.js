import React from 'react';
export default ({ lines }) => (
  <span className="math nicebox" dangerouslySetInnerHTML={lines.join('\n')} />
);
