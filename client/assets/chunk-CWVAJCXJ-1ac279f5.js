import{by as E,r as h,j as t,bH as o,b1 as m,bG as G,bJ as B,bE as R,ca as $,bI as z}from"./index-9a3a3312.js";import{u as M}from"./chunk-7D6N5TE5-b91d1d90.js";var[Y,W]=E({name:"CheckboxGroupContext",strict:!1});function X(s){const[n,a]=h.useState(s),[e,r]=h.useState(!1);return s!==n&&(r(!0),a(s)),e}function H(s){return t.jsx(o.svg,{width:"1.2em",viewBox:"0 0 12 10",style:{fill:"none",strokeWidth:2,stroke:"currentColor",strokeDasharray:16},...s,children:t.jsx("polyline",{points:"1.5 6 4.5 9 10.5 1"})})}function J(s){return t.jsx(o.svg,{width:"1.2em",viewBox:"0 0 24 24",style:{stroke:"currentColor",strokeWidth:4},...s,children:t.jsx("line",{x1:"21",x2:"3",y1:"12",y2:"12"})})}function L(s){const{isIndeterminate:n,isChecked:a,...e}=s,r=n?J:H;return a||n?t.jsx(o.div,{style:{display:"flex",alignItems:"center",justifyContent:"center",height:"100%"},children:t.jsx(r,{...e})}):null}var O={display:"inline-flex",alignItems:"center",justifyContent:"center",verticalAlign:"top",userSelect:"none",flexShrink:0},T={cursor:"pointer",display:"inline-flex",alignItems:"center",verticalAlign:"top",position:"relative"},q=m({from:{opacity:0,strokeDashoffset:16,transform:"scale(0.95)"},to:{opacity:1,strokeDashoffset:0,transform:"scale(1)"}}),F=m({from:{opacity:0},to:{opacity:1}}),K=m({from:{transform:"scaleX(0.65)"},to:{transform:"scaleX(1)"}}),Q=G(function(n,a){const e=W(),r={...e,...n},i=B("Checkbox",r),l=R(n),{spacing:b="0.5rem",className:v,children:u,iconColor:d,iconSize:x,icon:y=t.jsx(L,{}),isChecked:g,isDisabled:I=e==null?void 0:e.isDisabled,onChange:p,inputProps:j,...S}=l;let k=g;e!=null&&e.value&&l.value&&(k=e.value.includes(l.value));let f=p;e!=null&&e.onChange&&l.value&&(f=$(e.onChange,p));const{state:c,getInputProps:_,getCheckboxProps:P,getLabelProps:A,getRootProps:w}=M({...S,isDisabled:I,isChecked:k,onChange:f}),C=X(c.isChecked),N=h.useMemo(()=>({animation:C?c.isIndeterminate?`${F} 20ms linear, ${K} 200ms linear`:`${q} 200ms linear`:void 0,fontSize:x,color:d,...i.icon}),[d,x,C,c.isIndeterminate,i.icon]),D=h.cloneElement(y,{__css:N,isIndeterminate:c.isIndeterminate,isChecked:c.isChecked});return t.jsxs(o.label,{__css:{...T,...i.container},className:z("chakra-checkbox",v),...w(),children:[t.jsx("input",{className:"chakra-checkbox__input",..._(j,a)}),t.jsx(o.span,{__css:{...O,...i.control},className:"chakra-checkbox__control",...P(),children:D}),u&&t.jsx(o.span,{className:"chakra-checkbox__label",...A(),__css:{marginStart:b,...i.label},children:u})]})});Q.displayName="Checkbox";export{Q as C};
