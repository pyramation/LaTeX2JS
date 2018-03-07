export declare const DEFAULT_SCRIPT: string;
export declare const DEFAULT_OPTIONS: {
    TeX: {
        extensions: string[];
    };
    extensions: string[];
    showProcessingMessages: boolean;
    jax: string[];
    messageStyle: string;
    showMathMenu: boolean;
    showMathMenuMSIE: boolean;
    tex2jax: {
        processEnvironments: boolean;
        inlineMath: string[][];
        displayMath: string[][];
        preview: string;
        processEscapes: boolean;
    };
    'HTML-CSS': {
        linebreaks: {
            automatic: boolean;
            width: string;
        };
    };
};
export declare const getMathJax: () => any;
export declare const loadMathJax: (callback?: Function, script?: string, options?: object) => void;
