// usage: \image{url}
LaTeX2HTML5.addText(
    'image',
    /\\image\{[^}]*\}/g,            
     LaTeX2HTML5.utils.matchrepl(/\\image\{([^}]*)\}/, function (m) {
        return '<div style="width: 100%;text-align: center;"><img src="' + m[1] + '"></div>';
    }));