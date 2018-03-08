import React from 'react';
export default ({ lines }) => (
  <pre className="verbatim" dangerouslySetInnerHTML={lines.join('\n')} />
);
