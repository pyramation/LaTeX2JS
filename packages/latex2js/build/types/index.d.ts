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
    Text: LaTeX2JSExt;
    Headers: LaTeX2JSExt;
    Environments: string[];
    Ignore: RegExp[];
    PSTricks: LaTeX2JSExt;
    Views: Hash;
    Delimiters: any;
    constructor(Text?: LaTeX2JSExt, Headers?: LaTeX2JSExt, Environments?: string[], Ignore?: RegExp[], PSTricks?: LaTeX2JSExt, Views?: Hash);
    addEnvironment(name: string): void;
    addView(name: string, options: object): void;
    addText(name: any, exp: any, func: any): void;
    addHeaders(name: any, begin: any, end: any): void;
    getParser(): any;
    parse(text: any): any;
}
