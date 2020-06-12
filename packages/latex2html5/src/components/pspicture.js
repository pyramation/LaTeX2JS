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
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  var d3svg = d3.select(svg);
  that.$el = div;
  psgraph.pspicture.call(that, d3svg);
  div.appendChild(svg);
  return div;
}
