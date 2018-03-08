import { psgraph } from 'latex2js-pstricks';
import * as d3 from 'd3';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class pspicture extends Component {
  state = {
    // loaded: false,
  };

  componentDidMount() {
    var d3svg = d3.select(this.refSvg);
    const obj = { ...this.props };
    obj.$el = this.refDiv;
    psgraph.pspicture.call(obj, d3svg);
  }

  render() {
    const size = psgraph.getSize.call(this.props);
    const width = `${size.width}px`;
    const height = `${size.height}px`;

    return (
      <div
        className="pspicture"
        style={{ width: width, height: height }}
        ref={div => {
          this.refDiv = div;
        }}
      >
        <svg
          width={size.width}
          height={size.height}
          ref={svg => {
            this.refSvg = svg;
          }}
        />
      </div>
    );
  }
}
