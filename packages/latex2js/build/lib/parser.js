"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("underscore");
function Parser(LaTeX2JS) {
    this.Ignore = LaTeX2JS.Ignore;
    this.Delimiters = LaTeX2JS.Delimiters;
    this.Text = LaTeX2JS.Text;
    this.PSTricks = LaTeX2JS.PSTricks;
    this.Headers = LaTeX2JS.Headers;
    this.objects = [];
    this.environment = null;
    // emulating a match
    this.settings = this.PSTricks.Functions.psset.call(this, [
        '',
        'units=1cm,linecolor=black,linestyle=solid,fillstyle=none',
    ]);
}
Parser.prototype = {
    parse: function (text) {
        if (!text)
            return {};
        var lines = text.split('\n');
        this.parseEnvText(lines);
        this.parseEnv(lines);
        _.each(this.objects, function (obj) {
            if (obj.type.match(/pspicture/)) {
                obj.plot = this.parsePSTricks(obj.lines, obj.env);
            }
        }, this);
        return this.objects;
    },
    newEnvironment: function (type) {
        if (this.environment && this.environment.lines.length) {
            this.environment.settings = _.clone(this.settings);
            this.objects.push(this.environment);
        }
        this.environment = {
            type: type,
            lines: [],
        };
    },
    pushLine: function (line) {
        var add = true;
        _.each(this.Ignore, function (exp) {
            if (exp.test(line)) {
                add = false;
            }
        });
        if (add) {
            if (typeof line === 'string' && line.trim().length) {
                if (this.PSTricks.Expressions.psset.test(line)) {
                    this.parseUnits(line);
                }
                else {
                    this.environment.lines.push(line);
                }
            }
        }
    },
    parseUnits: function (line) {
        var m = line.match(this.PSTricks.Expressions.psset);
        _.extend(this.settings, this.PSTricks.Functions.psset.call(this, m));
    },
    metaData: function (environment, line) {
        if (this.PSTricks.Expressions.hasOwnProperty(environment)) {
            this.environment.match = line.match(this.PSTricks.Expressions[environment]);
            this.environment.env = this.PSTricks.Functions[environment].call(this.settings, this.environment.match);
            if (environment.match(/pspicture/)) {
                _.defaults(this.environment.env, _.pick(this.settings, 'xunit', 'yunit'));
            }
        }
    },
    parseEnv: function (lines) {
        this.objects = [];
        this.environment = {
            type: 'math',
            lines: [],
        };
        var Delimiters = this.Delimiters;
        // for(var i=0; i<lines.length; i++) {
        //     var line = lines[i];
        var print = false;
        _.each(lines, function (line) {
            var isDelim = false;
            _.each(Delimiters, function (type, env) {
                _.each(type, function (delim, k) {
                    if (line.match(delim)) {
                        isDelim = true;
                        if (k.match(/begin/)) {
                            if (this.environment.type.match(/verbatim/)) {
                                isDelim = false;
                            }
                            else if (this.environment.type.match(/print/)) {
                                isDelim = false;
                            }
                            else {
                                this.newEnvironment(env);
                                this.metaData(env, line);
                            }
                        }
                        else if (k.match(/end/)) {
                            if (this.environment.type.match(/verbatim/)) {
                                if (env.match(/verbatim/)) {
                                    this.newEnvironment('math');
                                }
                                else {
                                    isDelim = false;
                                }
                            }
                            else if (this.environment.type.match(/print/)) {
                                if (env.match(/print/)) {
                                    this.newEnvironment('math');
                                }
                                else {
                                    isDelim = false;
                                }
                            }
                            else {
                                this.newEnvironment('math');
                            }
                        }
                    }
                }, this);
            }, this);
            if (!isDelim)
                this.pushLine(line); // }
        }, this);
        // push last!
        this.newEnvironment('math');
    },
    parseEnvText: function (lines) {
        var _env = 'math';
        var Delimiters = this.Delimiters;
        _.each(lines, function (line, i) {
            var isDelim = false;
            _.each(Delimiters, function (type, env) {
                _.each(type, function (delim, k) {
                    if (line.match(delim)) {
                        isDelim = true;
                        if (k.match(/begin/)) {
                            if (!_env.match(/verbatim/)) {
                                _env = env;
                            }
                            else {
                                isDelim = false;
                            }
                        }
                        else if (k.match(/end/)) {
                            if (!_env.match(/verbatim/)) {
                                _env = 'math';
                            }
                            else {
                                if (!env.match(/verbatim/)) {
                                    isDelim = false;
                                }
                                else {
                                    _env = 'math';
                                }
                            }
                        }
                    }
                }, this);
            }, this);
            if (!isDelim) {
                if (!_env.match(/verbatim/)) {
                    lines[i] = this.parseText(line);
                }
                if (!line.trim().length) {
                    lines[i] = '<br>';
                }
            }
        }, this);
    },
    parsePSExpression: function (line, exp, plot, k, env) {
        var match = line.match(exp);
        if (match) {
            plot[k].push({
                data: this.PSTricks.Functions[k].call(env, match),
                env: env,
                match: match,
                fn: this.PSTricks.Functions[k],
            });
            return true;
        }
        return false;
    },
    parsePSVariables: function (line, exp, plot, k, env) {
        var match = line.match(exp);
        if (match) {
            if (k.match(/uservariable/)) {
                var dd = this.PSTricks.Functions[k].call(env, match);
                env.variables = env.variables || {};
                env.variables[dd.name] = dd.value;
            }
        }
    },
    parsePSTricks: function (lines, env) {
        var _this = this;
        var plot = {};
        _.each(this.PSTricks.Expressions, function (exp, k) {
            plot[k] = [];
        });
        _.each(lines, function (line) {
            _.each(_this.PSTricks.Expressions, function (exp, k) {
                _this.parsePSVariables(line, exp, plot, k, env);
                _this.parsePSExpression(line, exp, plot, k, env);
            });
        });
        return plot;
    },
    parseTextExpression: function (line, exp, k, contents) {
        var match = line.match(exp);
        if (match) {
            return this.Text.Functions[k].call(this, match, contents);
        }
        return contents;
    },
    parseHeadersExpression: function (line, exp, k, contents) {
        var match = line.match(exp);
        if (match) {
            return this.Headers.Functions[k].call(this);
        }
        return contents;
    },
    parseText: function (line) {
        var contents = line;
        // TEXT
        _.each(this.Text.Expressions, function (exp, k) {
            contents = this.parseTextExpression(line, exp, k, contents);
        }, this);
        // HEADERS
        _.each(this.Headers.Expressions, function (exp, k) {
            contents = this.parseHeadersExpression(line, exp, k, contents);
        }, this);
        return contents;
    },
};
exports.default = Parser;
//# sourceMappingURL=parser.js.map