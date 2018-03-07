// THIS FILE SHOULD BE REQUIRED BY COMPONENT THAT IMPLEMENTS pspicture
import * as _ from 'underscore';
import { X, Y } from 'latex2js-utils';

// http://mathforum.org/library/drmath/view/54146.html
function arrow(x1, y1, x2, y2) {
  var t = Math.PI / 6;

  // d is the length of the arrowhead line
  var d = 8;

  // l is the length of the line AB = sqrt((x1-x0)^2 + (y1-y0)^2)
  var dx = x2 - x1,
    dy = y2 - y1;
  var l = Math.sqrt(dx * dx + dy * dy);

  var cost = Math.cos(t);
  var sint = Math.sin(t);
  var dl = d / l;

  var x = x2 - (dx * cost - dy * sint) * dl;
  var y = y2 - (dy * cost + dx * sint) * dl;

  var context = [];
  context.push('M');
  context.push(x2);
  context.push(y2);
  context.push('L');
  context.push(x);
  context.push(y);

  cost = Math.cos(-t);
  sint = Math.sin(-t);

  x = x2 - (dx * cost - dy * sint) * dl;
  y = y2 - (dy * cost + dx * sint) * dl;

  // context.push('L');
  context.push(x);
  context.push(y);

  context.push('Z');
  return context.join(' ');
}

export default {
  getSize() {
    const padding = 20;
    this.env.scale = 1;
    const goalWidth = window.innerWidth - padding;
    if (goalWidth <= this.env.w * this.env.xunit) {
      this.env.scale = goalWidth / this.env.w / this.env.xunit;
    }
    const width = this.env.w * this.env.xunit;
    const height = this.env.h * this.env.yunit;

    return {
      width,
      height,
    };
  },

  psframe(svg) {
    svg
      .append('svg:line')
      .attr('x1', this.x1)
      .attr('y1', this.y1)
      .attr('x2', this.x2)
      .attr('y2', this.y1)
      .style('stroke-width', 2)
      .style('stroke', 'rgb(0,0,0)')
      .style('stroke-opacity', 1);

    svg
      .append('svg:line')
      .attr('x1', this.x2)
      .attr('y1', this.y1)
      .attr('x2', this.x2)
      .attr('y2', this.y2)
      .style('stroke-width', 2)
      .style('stroke', 'rgb(0,0,0)')
      .style('stroke-opacity', 1);

    svg
      .append('svg:line')
      .attr('x1', this.x2)
      .attr('y1', this.y2)
      .attr('x2', this.x1)
      .attr('y2', this.y2)
      .style('stroke-width', 2)
      .style('stroke', 'rgb(0,0,0)')
      .style('stroke-opacity', 1);

    svg
      .append('svg:line')
      .attr('x1', this.x1)
      .attr('y1', this.y2)
      .attr('x2', this.x1)
      .attr('y2', this.y1)
      .style('stroke-width', 2)
      .style('stroke', 'rgb(0,0,0)')
      .style('stroke-opacity', 1);
  },
  pscircle: function(svg) {
    svg
      .append('svg:circle')
      .attr('cx', this.cx)
      .attr('cy', this.cy)
      .attr('r', this.r)
      .style('stroke', 'black')
      .style('fill', 'none')
      .style('stroke-width', 2)
      .style('stroke-opacity', 1);
  },

  psplot(svg) {
    var context = [];
    context.push('M');
    if (this.fillstyle === 'solid') {
      context.push(this.data[0]);
      context.push(Y.call(this.global, 0));
    } else {
      context.push(this.data[0]);
      context.push(this.data[1]);
    }
    context.push('L');

    _.each(this.data, function(data) {
      context.push(data);
    });

    if (this.fillstyle === 'solid') {
      context.push(this.data[this.data.length - 2]);
      context.push(Y.call(this.global, 0));
      context.push('Z');
    }

    svg
      .append('svg:path')
      .attr('d', context.join(' '))
      .attr('class', 'psplot')
      .style('stroke-width', this.linewidth)
      .style('stroke-opacity', 1)
      .style('fill', this.fillstyle === 'none' ? 'none' : this.fillcolor)
      .style('stroke', this.linecolor);
  },

  pspolygon(svg) {
    var context = [];
    context.push('M');
    context.push(this.data[0]);
    context.push(this.data[1]);
    context.push('L');

    _.each(this.data, function(data) {
      context.push(data);
    });
    context.push('Z');

    svg
      .append('svg:path')
      .attr('d', context.join(' '))
      .style('stroke-width', this.linewidth)
      .style('stroke-opacity', 1)
      .style('fill', this.fillstyle === 'none' ? 'none' : this.fillcolor)
      .style('stroke', 'black');
  },

  psarc(svg) {
    // http://www.w3.org/TR/SVG/paths.html#PathDataEllipticalArcCommands
    var context = [];
    context.push('M');
    context.push(this.cx);
    context.push(this.cy);
    context.push('L');
    context.push(this.A.x);
    context.push(this.A.y);

    context.push('A');

    context.push(this.A.x);
    context.push(this.A.y);

    context.push(0);
    context.push(0);
    context.push(0);

    context.push(this.B.x);
    context.push(this.B.y);

    svg
      .append('svg:path')
      .attr('d', context.join(' '))
      .style('stroke-width', 2)
      .style('stroke-opacity', 1)
      .style('fill', 'blue')
      .style('stroke', 'black');
  },

  psaxes(svg) {
    var xaxis = [this.bottomLeft[0], this.topRight[0]];
    var yaxis = [this.bottomLeft[1], this.topRight[1]];

    var origin = this.origin;

    function line(x1, y1, x2, y2) {
      svg
        .append('svg:path')
        .attr('d', 'M ' + x1 + ' ' + y1 + ' L ' + x2 + ' ' + y2)
        .style('stroke-width', 2)
        .style('stroke', 'rgb(0,0,0)')
        .style('stroke-opacity', 1);
    }

    var xticks = function() {
      // draw ticks
      for (var x = xaxis[0]; x <= xaxis[1]; x += this.dx) {
        line(x, origin[1] - 5, x, origin[1] + 5);
      }
    };

    var yticks = function() {
      // draw ticks
      for (var y = yaxis[0]; y <= yaxis[1]; y += this.dy) {
        line(origin[0] - 5, y, origin[0] + 5, y);
      }
    };

    // draw axes
    line(xaxis[0], origin[1], xaxis[1], origin[1]);
    line(origin[0], yaxis[0], origin[0], yaxis[1]);

    // draw ticks
    if (this.ticks.match(/all/)) {
      xticks();
      yticks();
    } else if (this.ticks.match(/x/)) {
      xticks();
    } else if (this.ticks.match(/y/)) {
      yticks();
    }

    if (this.arrows[0]) {
      svg
        .append('path')
        .attr('d', arrow(xaxis[1], origin[1], xaxis[0], origin[1]))
        .style('fill', 'black')
        .style('stroke', 'black');

      svg
        .append('path')
        .attr('d', arrow(origin[0], yaxis[1], origin[0], yaxis[0]))
        .style('fill', 'black')
        .style('stroke', 'black');
    }

    if (this.arrows[1]) {
      svg
        .append('path')
        .attr('d', arrow(xaxis[0], origin[1], xaxis[1], origin[1]))
        .style('fill', 'black')
        .style('stroke', 'black');

      svg
        .append('path')
        .attr('d', arrow(origin[0], yaxis[0], origin[0], yaxis[1]))
        .style('fill', 'black')
        .style('stroke', 'black');
    }
  },
  psline(svg) {
    var linewidth = this.linewidth,
      linecolor = this.linecolor;

    function solid(x1, y1, x2, y2) {
      svg
        .append('svg:path')
        .attr('d', 'M ' + x1 + ' ' + y1 + ' L ' + x2 + ' ' + y2)
        .style('stroke-width', linewidth)
        .style('stroke', linecolor)
        .style('stroke-opacity', 1);
    }

    function dashed(x1, y1, x2, y2) {
      svg
        .append('svg:path')
        .attr('d', 'M ' + x1 + ' ' + y1 + ' L ' + x2 + ' ' + y2)
        .style('stroke-width', linewidth)
        .style('stroke', linecolor)
        .style('stroke-dasharray', '9,5')
        .style('stroke-opacity', 1);
    }

    function dotted(x1, y1, x2, y2) {
      svg
        .append('svg:path')
        .attr('d', 'M ' + x1 + ' ' + y1 + ' L ' + x2 + ' ' + y2)
        .style('stroke-width', linewidth)
        .style('stroke', linecolor)
        .style('stroke-dasharray', '9,5')
        .style('stroke-opacity', 1);
    }

    // draw line
    if (this.linestyle.match(/dotted/)) {
      dotted(this.x1, this.y1, this.x2, this.y2);
    } else if (this.linestyle.match(/dashed/)) {
      dashed(this.x1, this.y1, this.x2, this.y2);
    } else {
      solid(this.x1, this.y1, this.x2, this.y2);
    }

    // for arrows we have to calculate
    // var dx = this.x2-this.x1, dy=this.y2-this.y1, len=Math.sqrt(dx*dx+dy*dy);

    // ADD DOTS

    if (this.dots[0]) {
      svg
        .append('svg:circle')
        .attr('cx', this.x1)
        .attr('cy', this.y1)
        .attr('r', 3)
        .style('stroke', this.linecolor)
        .style('fill', this.linecolor)
        .style('stroke-width', 1)
        .style('stroke-opacity', 1);
    }

    if (this.dots[1]) {
      svg
        .append('svg:circle')
        .attr('cx', this.x2)
        .attr('cy', this.y2)
        .attr('r', 3)
        .style('stroke', this.linecolor)
        .style('fill', this.linecolor)
        .style('stroke-width', 1)
        .style('stroke-opacity', 1);
    }

    var x1 = this.x1,
      y1 = this.y1,
      x2 = this.x2,
      y2 = this.y2;

    if (this.arrows[0]) {
      svg
        .append('path')
        .attr('d', arrow(x2, y2, x1, y1))
        .style('fill', this.linecolor)
        .style('stroke', this.linecolor);
    }

    if (this.arrows[1]) {
      svg
        .append('path')
        .attr('d', arrow(x1, y1, x2, y2))
        .style('fill', this.linecolor)
        .style('stroke', this.linecolor);
    }
  },

  userline(svg) {
    var linewidth = this.linewidth,
      linecolor = this.linecolor;

    function solid(x1, y1, x2, y2) {
      svg
        .append('svg:path')
        .attr('class', 'userline')
        .attr('d', 'M ' + x1 + ' ' + y1 + ' L ' + x2 + ' ' + y2)
        .style('stroke-width', linewidth)
        .style('stroke', linecolor)
        .style('stroke-opacity', 1);
    }

    function dashed(x1, y1, x2, y2) {
      svg
        .append('svg:path')
        .attr('d', 'M ' + x1 + ' ' + y1 + ' L ' + x2 + ' ' + y2)
        .attr('class', 'userline')
        .style('stroke-width', linewidth)
        .style('stroke', linecolor)
        .style('stroke-dasharray', '9,5')
        .style('stroke-opacity', 1);
    }

    function dotted(x1, y1, x2, y2) {
      svg
        .append('svg:path')
        .attr('d', 'M ' + x1 + ' ' + y1 + ' L ' + x2 + ' ' + y2)
        .attr('class', 'userline')
        .style('stroke-width', linewidth)
        .style('stroke', linecolor)
        .style('stroke-dasharray', '9,5')
        .style('stroke-opacity', 1);
    }

    // draw line
    if (this.linestyle.match(/dotted/)) {
      dotted(this.x1, this.y1, this.x2, this.y2);
    } else if (this.linestyle.match(/dashed/)) {
      dashed(this.x1, this.y1, this.x2, this.y2);
    } else {
      solid(this.x1, this.y1, this.x2, this.y2);
    }

    // for arrows we have to calculate
    // var dx = this.x2-this.x1, dy=this.y2-this.y1, len=Math.sqrt(dx*dx+dy*dy);

    // ADD DOTS

    if (this.dots[0]) {
      svg
        .append('svg:circle')
        .attr('cx', this.x1)
        .attr('cy', this.y1)
        .attr('r', 3)
        .attr('class', 'userline')
        .style('stroke', this.linecolor)
        .style('fill', this.linecolor)
        .style('stroke-width', 1)
        .style('stroke-opacity', 1);
    }

    if (this.dots[1]) {
      svg
        .append('svg:circle')
        .attr('cx', this.x2)
        .attr('cy', this.y2)
        .attr('r', 3)
        .attr('class', 'userline')
        .style('stroke', this.linecolor)
        .style('fill', this.linecolor)
        .style('stroke-width', 1)
        .style('stroke-opacity', 1);
    }

    var x1 = this.x1,
      y1 = this.y1,
      x2 = this.x2,
      y2 = this.y2;

    if (this.arrows[0]) {
      svg
        .append('path')
        .attr('d', arrow(x2, y2, x1, y1))
        .attr('class', 'userline')
        .style('fill', this.linecolor)
        .style('stroke', this.linecolor);
    }

    if (this.arrows[1]) {
      svg
        .append('path')
        .attr('d', arrow(x1, y1, x2, y2))
        .attr('class', 'userline')
        .style('fill', this.linecolor)
        .style('stroke', this.linecolor);
    }
  },

  rput(el) {
    const div = document.createElement('div');
    const rect = el.getBoundingClientRect();
    const left = rect.left;
    const top = rect.top;

    const x = this.x;
    const y = this.y;

    div.innerHTML = this.text;
    div.style.position = 'absolute';
    div.style.top = `${y}px`;
    div.style.left = `${x}px`;

    el.appendChild(div);

    var processMath = MathJax.Hub.Queue(['Typeset', MathJax.Hub, div]);
    if (typeof processMath === 'function') processMath();

    //rput defaults to centering the element in pstricks, so then so do we!

    // setTimeout(function() {
    //   console.log('calling setTimeout()');
    //   var w = $_.width();
    //   var h = $_.height();
    //   $_.css({
    //     top: y - h / 2,
    //     left: x - w / 2,
    //   });
    //   console.log({
    //     top: y - h / 2,
    //     left: x - w / 2,
    //   });
    // }, 1000);
    // return $_;
  },
};
