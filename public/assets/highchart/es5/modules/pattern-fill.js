/*
 Highcharts JS v11.1.0 (2023-06-05)

 Module for adding patterns and images as point fills.

 (c) 2010-2021 Highsoft AS
 Author: Torstein Hnsi, ystein Moseng

 License: www.highcharts.com/license
*/
'use strict';(function(c){"object"===typeof module&&module.exports?(c["default"]=c,module.exports=c):"function"===typeof define&&define.amd?define("highcharts/modules/pattern-fill",["highcharts"],function(f){c(f);c.Highcharts=f;return c}):c("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(c){function f(c,g,f,p){c.hasOwnProperty(g)||(c[g]=p.apply(null,f),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:g,module:c[g]}})))}c=c?
c._modules:{};f(c,"Extensions/PatternFill.js",[c["Core/Animation/AnimationUtilities.js"],c["Core/Chart/Chart.js"],c["Core/Globals.js"],c["Core/Defaults.js"],c["Core/Series/Point.js"],c["Core/Series/Series.js"],c["Core/Renderer/SVG/SVGRenderer.js"],c["Core/Utilities.js"]],function(c,f,x,p,r,t,u,l){function g(a,b){a=JSON.stringify(a);var c=a.length||0,e=0,d=0;if(b){b=Math.max(Math.floor(c/500),1);for(var n=0;n<c;n+=b)e+=a.charCodeAt(n);e&=e}for(;d<c;++d)b=a.charCodeAt(d),e=(e<<5)-e+b,e&=e;return e.toString(16).replace("-",
"1")}var y=c.animObject,z=p.getOptions;c=l.addEvent;var A=l.defined,B=l.erase,v=l.merge,q=l.pick,C=l.removeEvent;p=l.wrap;var w=x.patterns=function(){var a=[],b=z().colors;["M 0 0 L 5 5 M 4.5 -0.5 L 5.5 0.5 M -0.5 4.5 L 0.5 5.5","M 0 5 L 5 0 M -0.5 0.5 L 0.5 -0.5 M 4.5 5.5 L 5.5 4.5","M 2 0 L 2 5 M 4 0 L 4 5","M 0 2 L 5 2 M 0 4 L 5 4","M 0 1.5 L 2.5 1.5 L 2.5 0 M 2.5 5 L 2.5 3.5 L 5 3.5"].forEach(function(c,e){a.push({path:c,color:b[e],width:5,height:5,patternTransform:"scale(1.4 1.4)"})});["M 0 0 L 5 10 L 10 0",
"M 3 3 L 8 3 L 8 8 L 3 8 Z","M 5 5 m -4 0 a 4 4 0 1 1 8 0 a 4 4 0 1 1 -8 0","M 0 0 L 10 10 M 9 -1 L 11 1 M -1 9 L 1 11","M 0 10 L 10 0 M -1 1 L 1 -1 M 9 11 L 11 9"].forEach(function(c,e){a.push({path:c,color:b[e+5],width:10,height:10})});return a}();r.prototype.calculatePatternDimensions=function(a){if(!a.width||!a.height){var b=this.graphic&&(this.graphic.getBBox&&this.graphic.getBBox(!0)||this.graphic.element&&this.graphic.element.getBBox())||{},c=this.shapeArgs;c&&(b.width=c.width||b.width,b.height=
c.height||b.height,b.x=c.x||b.x,b.y=c.y||b.y);if(a.image){if(!b.width||!b.height){a._width="defer";a._height="defer";b=this.series.chart.mapView&&this.series.chart.mapView.getSVGTransform().scaleY;A(b)&&0>b&&(a._inverted=!0);return}a.aspectRatio&&(b.aspectRatio=b.width/b.height,a.aspectRatio>b.aspectRatio?b.aspectWidth=b.height*a.aspectRatio:b.aspectHeight=b.width/a.aspectRatio);a._width=a.width||Math.ceil(b.aspectWidth||b.width);a._height=a.height||Math.ceil(b.aspectHeight||b.height)}a.width||(a._x=
a.x||0,a._x+=b.x-Math.round(b.aspectWidth?Math.abs(b.aspectWidth-b.width)/2:0));a.height||(a._y=a.y||0,a._y+=b.y-Math.round(b.aspectHeight?Math.abs(b.aspectHeight-b.height)/2:0))}};u.prototype.addPattern=function(a,b){b=q(b,!0);var c=y(b),e=a.width||a._width||32,d=a.height||a._height||32,n=a.color||"#343434",h=a.id,f=this,g=function(a){f.rect(0,0,e,d).attr({fill:a}).add(m)};h||(this.idCounter=this.idCounter||0,h="highcharts-pattern-"+this.idCounter+"-"+(this.chartIndex||0),++this.idCounter);this.forExport&&
(h+="-export");this.defIds=this.defIds||[];if(!(-1<this.defIds.indexOf(h))){this.defIds.push(h);var k={id:h,patternUnits:"userSpaceOnUse",patternContentUnits:a.patternContentUnits||"userSpaceOnUse",width:e,height:d,x:a._x||a.x||0,y:a._y||a.y||0};a._inverted&&(k.patternTransform="scale(1, -1)",a.patternTransform&&(a.patternTransform+=" scale(1, -1)"));a.patternTransform&&(k.patternTransform=a.patternTransform);var m=this.createElement("pattern").attr(k).add(this.defs);m.id=h;a.path?(k=l.isObject(a.path)?
a.path:{d:a.path},a.backgroundColor&&g(a.backgroundColor),g={d:k.d},this.styledMode||(g.stroke=k.stroke||n,g["stroke-width"]=q(k.strokeWidth,2),g.fill=k.fill||"none"),k.transform&&(g.transform=k.transform),this.createElement("path").attr(g).add(m),m.color=n):a.image&&(b?this.image(a.image,0,0,e,d,function(){this.animate({opacity:q(a.opacity,1)},c);C(this.element,"load")}).attr({opacity:0}).add(m):this.image(a.image,0,0,e,d).add(m));a.image&&b||"undefined"===typeof a.opacity||[].forEach.call(m.element.childNodes,
function(b){b.setAttribute("opacity",a.opacity)});this.patternElements=this.patternElements||{};return this.patternElements[h]=m}};p(t.prototype,"getColor",function(a){var b=this.options.color;b&&b.pattern&&!b.pattern.color?(delete this.options.color,a.apply(this,Array.prototype.slice.call(arguments,1)),b.pattern.color=this.color,this.color=this.options.color=b):a.apply(this,Array.prototype.slice.call(arguments,1))});c(t,"render",function(){var a=this.chart.isResizing;(this.isDirtyData||a||!this.chart.hasRendered)&&
(this.points||[]).forEach(function(b){var c=b.options&&b.options.color;c&&c.pattern&&(!a||b.shapeArgs&&b.shapeArgs.width&&b.shapeArgs.height?b.calculatePatternDimensions(c.pattern):(c.pattern._width="defer",c.pattern._height="defer"))})});c(r,"afterInit",function(){var a=this.options.color;a&&a.pattern&&("string"===typeof a.pattern.path&&(a.pattern.path={d:a.pattern.path}),this.color=this.options.color=v(this.series.options.color,a))});c(u,"complexColor",function(a){var b=a.args[0],c=a.args[1];a=
a.args[2];var e=this.chartIndex||0,d=b.pattern,f="#343434";"undefined"!==typeof b.patternIndex&&w&&(d=w[b.patternIndex]);if(!d)return!0;if(d.image||"string"===typeof d.path||d.path&&d.path.d){var h=a.parentNode&&a.parentNode.getAttribute("class");h=h&&-1<h.indexOf("highcharts-legend");"defer"!==d._width&&"defer"!==d._height||r.prototype.calculatePatternDimensions.call({graphic:{element:a}},d);if(h||!d.id)d=v({},d),d.id="highcharts-pattern-"+e+"-"+g(d)+g(d,!0);this.addPattern(d,!this.forExport&&q(d.animation,
this.globalAnimation,{duration:100}));f="url(".concat(this.url,"#").concat(d.id+(this.forExport?"-export":""),")")}else f=d.color||f;a.setAttribute(c,f);b.toString=function(){return f};return!1});c(f,"endResize",function(){(this.renderer&&this.renderer.defIds||[]).filter(function(a){return a&&a.indexOf&&0===a.indexOf("highcharts-pattern-")}).length&&(this.series.forEach(function(a){a.visible&&a.points.forEach(function(a){(a=a.options&&a.options.color)&&a.pattern&&(a.pattern._width="defer",a.pattern._height=
"defer")})}),this.redraw(!1))});c(f,"redraw",function(){var a={},b=this.renderer,c=(b.defIds||[]).filter(function(a){return a.indexOf&&0===a.indexOf("highcharts-pattern-")});c.length&&([].forEach.call(this.renderTo.querySelectorAll('[color^="url("], [fill^="url("], [stroke^="url("]'),function(c){if(c=c.getAttribute("fill")||c.getAttribute("color")||c.getAttribute("stroke"))c=c.replace(b.url,"").replace("url(#","").replace(")",""),a[c]=!0}),c.forEach(function(c){a[c]||(B(b.defIds,c),b.patternElements[c]&&
(b.patternElements[c].destroy(),delete b.patternElements[c]))}))});""});f(c,"masters/modules/pattern-fill.src.js",[],function(){})});
//# sourceMappingURL=pattern-fill.js.map