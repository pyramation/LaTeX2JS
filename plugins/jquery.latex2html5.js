// <latex src="some/path.tex"> 
// will get replaced with the tex rendered
$.fn.LaTeX = function () {

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
                        tagName: 'section',
                        className: 'latex-container',
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


$.fn.latex = function () {

  var $parent = $(this);

  MathJax.Hub.Register.StartupHook("End",function () {

      $parent.find('[type="tex/latex"]').each(function (i, el) {
          var $el = $(el);
          var TEX = new LaTeX2HTML5.TeX({
              tagName: 'section',
              className: 'latex-container',
              latex: $el.text()
          });
          TEX.render();
          $el.replaceWith(TEX.$el);
      });
      
  });

};