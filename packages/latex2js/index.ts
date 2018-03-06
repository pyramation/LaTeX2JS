export default class LaTeX2HTML5 {
  public Delimiters:any = {};
  public Text:any = {};
  public Headers:any = {};

  addEnvironment(name: string) {
    var delim = {
      begin: new RegExp('\\\\begin\\{' + name + '\\}'),
      end: new RegExp('\\\\end\\{' + name + '\\}'),
    };
    this.Delimiters[name] = delim;
  }

  addView(name:string, options:object) {
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
  },
  // events: _.clone(Backbone.Events),
};
