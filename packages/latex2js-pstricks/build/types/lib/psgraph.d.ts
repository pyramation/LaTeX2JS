declare const psgraph: {
    getSize(): {
        width: number;
        height: number;
    };
    psframe(svg: any): void;
    pscircle: (svg: any) => void;
    psplot(svg: any): void;
    pspolygon(svg: any): void;
    psarc(svg: any): void;
    psaxes(svg: any): void;
    psline(svg: any): void;
    userline(svg: any): void;
    rput(el: any): void;
    pspicture(svg: any): void;
};
export default psgraph;
