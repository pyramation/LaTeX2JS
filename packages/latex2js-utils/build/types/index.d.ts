export declare const simplerepl: (regex: any, replace: any) => (m: any, contents: any) => any;
export declare const matchrepl: (regex: any, callback: any) => (m: any, contents: any) => any;
export declare const convertUnits: (value: any) => number;
export declare const RE: {
    options: string;
    type: string;
    squiggle: string;
    squiggleOpt: string;
    coordsOpt: string;
    coords: string;
};
export declare const parseOptions: (opts: any) => {};
export declare const parseArrows: (m: any) => {
    arrows: number[];
    dots: number[];
};
export declare const evaluate: (exp: any) => any;
export declare const X: (v: any) => number;
export declare const Xinv: (v: any) => any;
export declare const Y: (v: any) => number;
export declare const Yinv: (v: any) => number;
