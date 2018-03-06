export declare const Expressions: {
    pspicture: RegExp;
    psframe: RegExp;
    psplot: RegExp;
    psarc: RegExp;
    pscircle: RegExp;
    pspolygon: RegExp;
    psaxes: RegExp;
    slider: RegExp;
    psline: RegExp;
    userline: RegExp;
    uservariable: RegExp;
    rput: RegExp;
    psset: RegExp;
};
export declare const Functions: {
    slider: (m: any) => {
        scalar: number;
        min: number;
        max: number;
        variable: any;
        latex: any;
        value: number;
    };
    pspicture: (m: any) => any;
    psframe: (m: any) => {
        x1: any;
        y1: any;
        x2: any;
        y2: any;
    };
    pscircle: (m: any) => any;
    psaxes: (m: any) => any;
    psplot: (m: any) => {
        linecolor: string;
        linestyle: string;
        fillstyle: string;
        fillcolor: string;
        linewidth: number;
    };
    pspolygon: (m: any) => {
        linecolor: string;
        linestyle: string;
        fillstyle: string;
        fillcolor: string;
        linewidth: number;
        data: any[];
    } | undefined;
    psarc: (m: any) => {
        linecolor: string;
        linestyle: string;
        fillstyle: string;
        fillcolor: string;
        linewidth: number;
        arrows: number[];
        dots: number[];
        cx: any;
        cy: any;
    };
    psline: (m: any) => {
        linecolor: string;
        linestyle: string;
        fillstyle: string;
        fillcolor: string;
        linewidth: number;
        arrows: number[];
        dots: number[];
    };
    uservariable: (m: any) => {
        name: any;
        x: any;
        y: any;
        func: any;
        value: any;
    };
    userline: (m: any) => {
        x1: any;
        y1: any;
        x2: any;
        y2: any;
        xExp: any;
        yExp: any;
        xExp2: any;
        yExp2: any;
        userx: any;
        usery: any;
        userx2: any;
        usery2: any;
        linecolor: string;
        linestyle: string;
        fillstyle: string;
        fillcolor: string;
        linewidth: number;
        arrows: number[];
        dots: number[];
    };
    rput: (m: any) => {
        x: any;
        y: any;
        text: any;
    };
    psset: (m: any) => {};
};
declare const _default: {
    Expressions: {
        pspicture: RegExp;
        psframe: RegExp;
        psplot: RegExp;
        psarc: RegExp;
        pscircle: RegExp;
        pspolygon: RegExp;
        psaxes: RegExp;
        slider: RegExp;
        psline: RegExp;
        userline: RegExp;
        uservariable: RegExp;
        rput: RegExp;
        psset: RegExp;
    };
    Functions: {
        slider: (m: any) => {
            scalar: number;
            min: number;
            max: number;
            variable: any;
            latex: any;
            value: number;
        };
        pspicture: (m: any) => any;
        psframe: (m: any) => {
            x1: any;
            y1: any;
            x2: any;
            y2: any;
        };
        pscircle: (m: any) => any;
        psaxes: (m: any) => any;
        psplot: (m: any) => {
            linecolor: string;
            linestyle: string;
            fillstyle: string;
            fillcolor: string;
            linewidth: number;
        };
        pspolygon: (m: any) => {
            linecolor: string;
            linestyle: string;
            fillstyle: string;
            fillcolor: string;
            linewidth: number;
            data: any[];
        } | undefined;
        psarc: (m: any) => {
            linecolor: string;
            linestyle: string;
            fillstyle: string;
            fillcolor: string;
            linewidth: number;
            arrows: number[];
            dots: number[];
            cx: any;
            cy: any;
        };
        psline: (m: any) => {
            linecolor: string;
            linestyle: string;
            fillstyle: string;
            fillcolor: string;
            linewidth: number;
            arrows: number[];
            dots: number[];
        };
        uservariable: (m: any) => {
            name: any;
            x: any;
            y: any;
            func: any;
            value: any;
        };
        userline: (m: any) => {
            x1: any;
            y1: any;
            x2: any;
            y2: any;
            xExp: any;
            yExp: any;
            xExp2: any;
            yExp2: any;
            userx: any;
            usery: any;
            userx2: any;
            usery2: any;
            linecolor: string;
            linestyle: string;
            fillstyle: string;
            fillcolor: string;
            linewidth: number;
            arrows: number[];
            dots: number[];
        };
        rput: (m: any) => {
            x: any;
            y: any;
            text: any;
        };
        psset: (m: any) => {};
    };
};
export default _default;
