"use strict";(self.webpackChunkapp_web_frontend=self.webpackChunkapp_web_frontend||[]).push([[33],{40071:function(e,n,t){t.d(n,{R5A:function(){return a}});var i=t(89983);function a(e){return(0,i.w_)({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm75.31 260.69a16 16 0 11-22.62 22.62L256 278.63l-52.69 52.68a16 16 0 01-22.62-22.62L233.37 256l-52.68-52.69a16 16 0 0122.62-22.62L256 233.37l52.69-52.68a16 16 0 0122.62 22.62L278.63 256z"}}]})(e)}},52409:function(e,n,t){t.d(n,{X:function(){return N}});var i=t(45987),a=t(1413),r=t(29439),o=t(72791);var s=(0,t(9886).k)({name:"CheckboxGroupContext",strict:!1}),l=(0,r.Z)(s,2),c=(l[0],l[1]),u=t(45113),d=t(80184),f=["isIndeterminate","isChecked"];function v(e){return(0,d.jsx)(u.m.svg,(0,a.Z)((0,a.Z)({width:"1.2em",viewBox:"0 0 12 10",style:{fill:"none",strokeWidth:2,stroke:"currentColor",strokeDasharray:16}},e),{},{children:(0,d.jsx)("polyline",{points:"1.5 6 4.5 9 10.5 1"})}))}function p(e){return(0,d.jsx)(u.m.svg,(0,a.Z)((0,a.Z)({width:"1.2em",viewBox:"0 0 24 24",style:{stroke:"currentColor",strokeWidth:4}},e),{},{children:(0,d.jsx)("line",{x1:"21",x2:"3",y1:"12",y2:"12"})}))}function h(e){var n=e.isIndeterminate,t=e.isChecked,r=(0,i.Z)(e,f),o=n?p:v;return t||n?(0,d.jsx)(u.m.div,{style:{display:"flex",alignItems:"center",justifyContent:"center",height:"100%"},children:(0,d.jsx)(o,(0,a.Z)({},r))}):null}var m=t(73814),x=t(36992),k=t(52554),Z=t(75597),g=t(32481),C=t(62996),b=["spacing","className","children","iconColor","iconSize","icon","isChecked","isDisabled","onChange","inputProps"],y={display:"inline-flex",alignItems:"center",justifyContent:"center",verticalAlign:"top",userSelect:"none",flexShrink:0},_={cursor:"pointer",display:"inline-flex",alignItems:"center",verticalAlign:"top",position:"relative"},j=(0,k.F4)({from:{opacity:0,strokeDashoffset:16,transform:"scale(0.95)"},to:{opacity:1,strokeDashoffset:0,transform:"scale(1)"}}),I=(0,k.F4)({from:{opacity:0},to:{opacity:1}}),P=(0,k.F4)({from:{transform:"scaleX(0.65)"},to:{transform:"scaleX(1)"}}),N=(0,Z.G)((function(e,n){var t=c(),s=(0,a.Z)((0,a.Z)({},t),e),l=(0,g.jC)("Checkbox",s),f=(0,C.Lr)(e),v=f.spacing,p=void 0===v?"0.5rem":v,k=f.className,Z=f.children,N=f.iconColor,w=f.iconSize,S=f.icon,A=void 0===S?(0,d.jsx)(h,{}):S,D=f.isChecked,F=f.isDisabled,L=void 0===F?null==t?void 0:t.isDisabled:F,z=f.onChange,B=f.inputProps,E=(0,i.Z)(f,b),q=D;(null==t?void 0:t.value)&&f.value&&(q=t.value.includes(f.value));var G=z;(null==t?void 0:t.onChange)&&f.value&&(G=(0,x.PP)(t.onChange,z));var M=(0,m.O)((0,a.Z)((0,a.Z)({},E),{},{isDisabled:L,isChecked:q,onChange:G})),V=M.state,W=M.getInputProps,X=M.getCheckboxProps,K=M.getLabelProps,R=M.getRootProps,$=function(e){var n=(0,o.useState)(e),t=(0,r.Z)(n,2),i=t[0],a=t[1],s=(0,o.useState)(!1),l=(0,r.Z)(s,2),c=l[0],u=l[1];return e!==i&&(u(!0),a(e)),c}(V.isChecked),O=(0,o.useMemo)((function(){return(0,a.Z)({animation:$?V.isIndeterminate?"".concat(I," 20ms linear, ").concat(P," 200ms linear"):"".concat(j," 200ms linear"):void 0,fontSize:w,color:N},l.icon)}),[N,w,$,V.isIndeterminate,l.icon]),Q=(0,o.cloneElement)(A,{__css:O,isIndeterminate:V.isIndeterminate,isChecked:V.isChecked});return(0,d.jsxs)(u.m.label,(0,a.Z)((0,a.Z)({__css:(0,a.Z)((0,a.Z)({},_),l.container),className:(0,x.cx)("chakra-checkbox",k)},R()),{},{children:[(0,d.jsx)("input",(0,a.Z)({className:"chakra-checkbox__input"},W(B,n))),(0,d.jsx)(u.m.span,(0,a.Z)((0,a.Z)({__css:(0,a.Z)((0,a.Z)({},y),l.control),className:"chakra-checkbox__control"},X()),{},{children:Q})),Z&&(0,d.jsx)(u.m.span,(0,a.Z)((0,a.Z)({className:"chakra-checkbox__label"},K()),{},{__css:(0,a.Z)({marginStart:p},l.label),children:Z}))]}))}));N.displayName="Checkbox"},93080:function(e,n,t){t.d(n,{r:function(){return f}});var i=t(1413),a=t(45987),r=t(75597),o=t(32481),s=t(62996),l=t(45113),c=t(36992),u=t(80184),d=["className","isExternal"],f=(0,r.G)((function(e,n){var t=(0,o.mq)("Link",e),r=(0,s.Lr)(e),f=r.className,v=r.isExternal,p=(0,a.Z)(r,d);return(0,u.jsx)(l.m.a,(0,i.Z)((0,i.Z)({target:v?"_blank":void 0,rel:v?"noopener":void 0,ref:n,className:(0,c.cx)("chakra-link",f)},p),{},{__css:t}))}));f.displayName="Link"},45695:function(e,n,t){t.d(n,{E:function(){return F},x:function(){return L}});var i=t(1413),a=t(45987),r=t(93433),o=t(29439),s=t(41102),l=t(9121),c=t(36992),u=t(9886),d=t(14591),f=t(72791),v=["index"],p=(0,s.n)(),h=(0,o.Z)(p,4),m=h[0],x=(h[1],h[2]),k=h[3],Z=(0,u.k)({name:"PinInputContext",errorMessage:"usePinInputContext: `context` is undefined. Seems you forgot to all pin input fields within `<PinInput />`"}),g=(0,o.Z)(Z,2),C=g[0],b=g[1],y=function(e){return null==e?void 0:e.split("")};function _(e,n){return("alphanumeric"===n?/^[a-zA-Z0-9]+$/i:/^[0-9]+$/).test(e)}var j=t(32481),I=t(62996),P=t(75597),N=t(45113),w=t(7200),S=t(80184),A=["children"],D=["descendants"];function F(e){var n=(0,j.mq)("PinInput",e),t=(0,I.Lr)(e),s=t.children,u=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.autoFocus,t=e.value,s=e.defaultValue,u=e.onChange,d=e.onComplete,p=e.placeholder,h=void 0===p?"\u25cb":p,m=e.manageFocus,k=void 0===m||m,Z=e.otp,g=void 0!==Z&&Z,C=e.id,b=e.isDisabled,j=e.isInvalid,I=e.type,P=void 0===I?"number":I,N=e.mask,w=(0,f.useId)(),S=null!=C?C:"pin-input-".concat(w),A=x(),D=(0,f.useState)(!0),F=(0,o.Z)(D,2),L=F[0],z=F[1],B=(0,f.useState)(-1),E=(0,o.Z)(B,2),q=E[0],G=E[1],M=(0,l.T)({defaultValue:y(s)||[],value:y(t),onChange:function(e){return null==u?void 0:u(e.join(""))}}),V=(0,o.Z)(M,2),W=V[0],X=V[1];(0,f.useEffect)((function(){if(n){var e=A.first();e&&requestAnimationFrame((function(){e.node.focus()}))}}),[A]);var K=(0,f.useCallback)((function(e){if(L&&k){var n=A.next(e,!1);n&&requestAnimationFrame((function(){n.node.focus()}))}}),[A,L,k]),R=(0,f.useCallback)((function(e,n){var t=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],i=(0,r.Z)(W);i[n]=e,X(i),""!==e&&i.length===A.count()&&i.every((function(e){return null!=e&&""!==e}))?null==d||d(i.join("")):t&&K(n)}),[W,X,K,d,A]),$=(0,f.useCallback)((function(){var e,n=Array(A.count()).fill("");X(n);var t=A.first();null==(e=null==t?void 0:t.node)||e.focus()}),[A,X]),O=(0,f.useCallback)((function(e,n){var t=n;return(null==e?void 0:e.length)>0&&(e[0]===n.charAt(0)?t=n.charAt(1):e[0]===n.charAt(1)&&(t=n.charAt(0))),t}),[]);return{getInputProps:(0,f.useCallback)((function(e){var n=e.index,t=(0,a.Z)(e,v),r=q===n,o="number"===P?"tel":"text";return(0,i.Z)((0,i.Z)({"aria-label":"Please enter your pin code",inputMode:"number"===P?"numeric":"text",type:N?"password":o},t),{},{id:"".concat(S,"-").concat(n),disabled:b,"aria-invalid":(0,c.Qm)(j),onChange:(0,c.v0)(t.onChange,(function(e){var t=e.target.value,i=W[n],a=O(i,t);if(""!==a)if(t.length>2){if(_(t,P)){var r=t.split("").filter((function(e,n){return n<A.count()}));X(r),r.length===A.count()&&(null==d||d(r.join("")))}}else _(a,P)&&R(a,n),z(!0);else R("",n)})),onKeyDown:(0,c.v0)(t.onKeyDown,(function(e){var t;if("Backspace"===e.key&&k)if(""===e.target.value){var i=A.prev(n,!1);i&&(R("",n-1,!1),null==(t=i.node)||t.focus(),z(!0))}else z(!1)})),onFocus:(0,c.v0)(t.onFocus,(function(){G(n)})),onBlur:(0,c.v0)(t.onBlur,(function(){G(-1)})),value:W[n]||"",autoComplete:g?"one-time-code":"off",placeholder:r?"":h})}),[A,q,O,S,b,N,j,k,d,g,h,R,X,P,W]),id:S,descendants:A,values:W,setValue:R,setValues:X,clear:$}}((0,a.Z)(t,A)),d=u.descendants,p=(0,a.Z)(u,D),h=(0,w.W)(s).map((function(e){return(0,f.cloneElement)(e,{__css:n})}));return(0,S.jsx)(m,{value:d,children:(0,S.jsx)(C,{value:p,children:h})})}F.displayName="PinInput";var L=(0,P.G)((function(e,n){var t=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,t=b().getInputProps,a=k(),r=a.index,o=a.register;return t((0,i.Z)((0,i.Z)({},e),{},{ref:(0,d.lq)(o,n),index:r}))}(e,n);return(0,S.jsx)(N.m.input,(0,i.Z)((0,i.Z)({},t),{},{className:(0,c.cx)("chakra-pin-input",e.className)}))}));L.displayName="PinInputField"}}]);
//# sourceMappingURL=33.e64767e3.chunk.js.map