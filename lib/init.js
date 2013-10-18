var LaTeX2HTML5 = {
    version: '0.0.1',
    addEnvironment: function(name) {
        var delim = {};
        delim.begin = new RegExp('\\\\begin\\{'+name+'\\}');
        delim.end = new RegExp('\\\\end\\{'+name+'\\}');
        LaTeX2HTML5.Delimiters[name] = delim;
    },

    addView: function (name, options) {
        LaTeX2HTML5.addEnvironment(name);
        var view = {};
        LaTeX2HTML5.Views[name] = LaTeX2HTML5.BaseEnvView.extend(options);
    },

    addText: function (name, exp, func) {

        LaTeX2HTML5.Text.Expressions[name] = exp;
        LaTeX2HTML5.Text.Functions[name] = func;

    },

    addHeaders: function (name, begin, end) {
        var exp = {};
        exp[name + 'begin'] = new RegExp('\\\\begin\\{'+name+'\\}');
        exp[name + 'end'] = new RegExp('\\\\end\\{'+name+'\\}');
        _.extend(LaTeX2HTML5.Headers.Expressions, exp);
        var fns = {};
        fns[name + 'begin'] = begin || '';
        fns[name + 'end'] = end || '';
        _.extend(LaTeX2HTML5.Headers.Functions, fns);
    }


};