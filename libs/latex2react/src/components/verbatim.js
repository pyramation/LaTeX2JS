import React from 'react';
export default ({ lines }) => (
  <pre
    className="verbatim"
    dangerouslySetInnerHTML={{ _html: lines.join('\n') }}
  />
);
