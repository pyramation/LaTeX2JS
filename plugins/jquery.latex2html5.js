// <latex src="some/path.tex"> 
// will get replaced with the tex rendered
$.fn.latex = function () {

    $.each(this, function (i, el) {
        var $el = $(el);
        var url = $el.attr('src');
        if (!url) {
            throw new Error('!Error: latex element requires src attribute');
        }
        
      jQuery.ajax({
             url: url,
             success: function(data) {

                MathJax.Hub.Register.StartupHook("End",function () {
                    var TEX = new LaTeX2HTML5.TeX({
                        latex: data
                    });
                    TEX.render();
                    $el.replaceWith(TEX.$el);
                });
             },
             async:   true
        });
    });

};
