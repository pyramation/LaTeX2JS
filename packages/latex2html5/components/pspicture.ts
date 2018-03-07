import { psgraph } from 'latex2js-pstricks';
import * as d3 from 'd3';

export default function render(that) {
  const size = psgraph.getSize.call(that);
  const style = `width: ${size.width}px; height: ${size.height}px;`;
  const width = `${size.width}px`;
  const height = `${size.height}px`;
  const div = document.createElement('div');
  div.className = 'pspicture';
  div.style.width = width;
  div.style.height = height;
  const svg = document.createElement('svg');
  svg.width = width;
  svg.height = height;
  var d3svg = d3.select(this.$refs.svg);
  psgraph.pspicture.call(this, d3svg);
  div.appendChild(svg);
  return div;
}
