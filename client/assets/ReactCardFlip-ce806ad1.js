import{aZ as o,r as g}from"./index-c853c0cb.js";var m={},c=o&&o.__assign||function(){return c=Object.assign||function(t){for(var e,a=1,n=arguments.length;a<n;a++){e=arguments[a];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])}return t},c.apply(this,arguments)},D=o&&o.__createBinding||(Object.create?function(t,e,a,n){n===void 0&&(n=a);var r=Object.getOwnPropertyDescriptor(e,a);(!r||("get"in r?!e.__esModule:r.writable||r.configurable))&&(r={enumerable:!0,get:function(){return e[a]}}),Object.defineProperty(t,n,r)}:function(t,e,a,n){n===void 0&&(n=a),t[n]=e[a]}),M=o&&o.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),P=o&&o.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(t!=null)for(var a in t)a!=="default"&&Object.prototype.hasOwnProperty.call(t,a)&&D(e,t,a);return M(e,t),e};Object.defineProperty(m,"__esModule",{value:!0});var p=P(g),u=g,T=function(t){var e=c({cardStyles:{back:{},front:{}},cardZIndex:"auto",containerStyle:{},flipDirection:"horizontal",flipSpeedBackToFront:.6,flipSpeedFrontToBack:.6,infinite:!1,isFlipped:!1},t),a=e.cardStyles,n=a.back,r=a.front,S=e.cardZIndex,F=e.containerStyle,v=e.containerClassName,b=e.flipDirection,O=e.flipSpeedFrontToBack,k=e.flipSpeedBackToFront,f=e.infinite,i=e.isFlipped,_=(0,u.useState)(i),j=_[0],B=_[1],h=(0,u.useState)(0),s=h[0],w=h[1];(0,u.useEffect)(function(){i!==j&&(B(i),w(function(l){return l+180}))},[i]);var C=(0,u.useMemo)(function(){var l="react-card-flip";return v&&(l+=" ".concat(v)),l},[v]),y=function(l){if(t.children.length!==2)throw new Error("Component ReactCardFlip requires 2 children to function");return t.children[l]},R="rotateY(".concat(f?s:i?180:0,"deg)"),x="rotateY(".concat(f?s+180:i?0:-180,"deg)"),N="rotateX(".concat(f?s:i?180:0,"deg)"),E="rotateX(".concat(f?s+180:i?0:-180,"deg)"),d={back:c({WebkitBackfaceVisibility:"hidden",backfaceVisibility:"hidden",height:"100%",left:"0",position:i?"relative":"absolute",top:"0",transform:b==="horizontal"?x:E,transformStyle:"preserve-3d",transition:"".concat(O,"s"),width:"100%"},n),container:{perspective:"1000px",zIndex:"".concat(S)},flipper:{height:"100%",position:"relative",width:"100%"},front:c({WebkitBackfaceVisibility:"hidden",backfaceVisibility:"hidden",height:"100%",left:"0",position:i?"absolute":"relative",top:"0",transform:b==="horizontal"?R:N,transformStyle:"preserve-3d",transition:"".concat(k,"s"),width:"100%",zIndex:"2"},r)};return p.createElement("div",{className:C,style:c(c({},d.container),F)},p.createElement("div",{className:"react-card-flipper",style:d.flipper},p.createElement("div",{className:"react-card-front",style:d.front},y(0)),p.createElement("div",{className:"react-card-back",style:d.back},y(1))))},I=m.default=T;export{I as _};
