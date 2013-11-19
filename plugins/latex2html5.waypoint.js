
LaTeX2HTML5.addText(
'waypoint',
/\\waypoint\{[^}]*\}/g,            
 LaTeX2HTML5.utils.matchrepl(/\\waypoint\{([^}]*)\}/, function (m) {
        var name = m[1].replace(/\s+/g, '_').toLowerCase();
        return '<h1><a waypoint=true name="'+name+'" id="' + name + '">'+m[1]+'</a></h1>';
}));


LaTeX2HTML5.addText(
'waypointlink',
/\\waypointlink\{[^}]*\}\{([^}]*)\}/g,            
 LaTeX2HTML5.utils.matchrepl(/\\waypointlink\{([^}]*)\}\{([^}]*)\}/, function (m) {
        var name = m[1].replace(/\s+/g, '_').toLowerCase();
        return '<a href="#'+name+'">'+m[2]+'</a>';
}));