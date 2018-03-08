import React from 'react';
export default ({ lines }) => (
  <span
    className="math"
    dangerouslySetInnerHTML={{ _html: lines.join('\n') }}
  />
);
