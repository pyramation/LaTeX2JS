export declare const DEFAULT_SCRIPT: string;
export declare const DEFAULT_OPTIONS: {
    showProcessingMessages: boolean;
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
};
export declare const getMathJax: () => any;
export declare const loadMathJax: (script?: string, options?: object) => void;
