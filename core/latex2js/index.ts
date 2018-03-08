import * as _ from 'underscore';
import TextExt from './lib/text';
import HeadersExt from './lib/headers';
import { pstricks as PSTricksExt } from 'latex2js-pstricks';
import EnvironmentsDefault from './lib/environments';
import IgnoreDefault from './lib/ignore';

import Parser from './lib/parser';

export interface Hash {
  [type: string]: any;
}

export interface LaTeX2JSExt {
  Functions: Hash;
  Expressions: Hash;
}

export interface DelimiterType {
  begin: RegExp;
  end: RegExp;
}

export interface DelimiterHash {
  [type: string]: DelimiterType;
}

export default class LaTeX2HTML5 {
  public Delimiters: any = {};

  constructor(
    public Text: LaTeX2JSExt = TextExt,
    public Headers: LaTeX2JSExt = HeadersExt,
    public Environments: string[] = EnvironmentsDefault,
    public Ignore: RegExp[] = IgnoreDefault,
    public PSTricks: LaTeX2JSExt = PSTricksExt,
    public Views: Hash = {}
  ) {
    _.each(Environments, (name: string) => {
      this.addEnvironment(name);
    });
  }

  addEnvironment(name: string) {
    var delim: DelimiterType = {
      begin: new RegExp('\\\\begin\\{' + name + '\\}'),
      end: new RegExp('\\\\end\\{' + name + '\\}'),
    };
    this.Delimiters[name] = delim;
  }

  addView(name: string, options: object) {
    this.addEnvironment(name);
    // var view = {};
    // this.Views[name] = this.BaseEnvView.extend(options);
  }

  addText(name, exp, func) {
    this.Text.Expressions[name] = exp;
    this.Text.Functions[name] = func;
  }

  addHeaders(name, begin, end) {
    var exp = {};
    var beginHash = name + 'begin';
    var endHash = name + 'end';
    exp[beginHash] = new RegExp('\\\\begin\\{' + name + '\\}');
    exp[endHash] = new RegExp('\\\\end\\{' + name + '\\}');
    Object.assign(this.Headers.Expressions, exp);
    var fns = {};
    fns[beginHash] = function() {
      return begin || '';
    };
    fns[endHash] = function() {
      return end || '';
    };
    Object.assign(this.Headers.Functions, fns);
  }
  // events: _.clone(Backbone.Events),

  getParser() {
    return new Parser(this);
  }

  parse(text) {
    const parser = new Parser(this);
    const parsed = parser.parse(text);
    _.each(parsed, element => {
      if (!element.hasOwnProperty('type')) {
        throw new Error('no type!');
      }
      // TODO implement rendering
      // console.log(element.type);
    });
    return parsed;
  }
}
