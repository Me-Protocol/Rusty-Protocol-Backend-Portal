import{bn as L,bo as z,r as u,bp as Z,bq as J,br as b,bs as O,bt as Q,bu as W,bv as Y,j as R,bw as ee,bx as ne,by as te}from"./index-4d742258.js";var[se,Ie,oe,ae]=L(),[ue,ie]=z({name:"PinInputContext",errorMessage:"usePinInputContext: `context` is undefined. Seems you forgot to all pin input fields within `<PinInput />`"}),G=o=>o==null?void 0:o.split("");function U(o,a){return(a==="alphanumeric"?/^[a-zA-Z0-9]+$/i:/^[0-9]+$/).test(o)}function le(o={}){const{autoFocus:a,value:i,defaultValue:l,onChange:c,onComplete:r,placeholder:C="○",manageFocus:x=!0,otp:_=!1,id:k,isDisabled:N,isInvalid:D,type:I="number",mask:j}=o,X=u.useId(),y=k??`pin-input-${X}`,t=oe(),[w,E]=u.useState(!0),[M,V]=u.useState(-1),[m,d]=Z({defaultValue:G(l)||[],value:G(i),onChange:n=>c==null?void 0:c(n.join(""))});u.useEffect(()=>{if(a){const n=t.first();n&&requestAnimationFrame(()=>{n.node.focus()})}},[t]);const B=u.useCallback(n=>{if(!w||!x)return;const e=t.next(n,!1);e&&requestAnimationFrame(()=>{e.node.focus()})},[t,w,x]),P=u.useCallback((n,e,s=!0)=>{const p=[...m];p[e]=n,d(p),n!==""&&p.length===t.count()&&p.every(g=>g!=null&&g!=="")?r==null||r(p.join("")):s&&B(e)},[m,d,B,r,t]),q=u.useCallback(()=>{var n;const e=Array(t.count()).fill("");d(e);const s=t.first();(n=s==null?void 0:s.node)==null||n.focus()},[t,d]),S=u.useCallback((n,e)=>{let s=e;return(n==null?void 0:n.length)>0&&(n[0]===e.charAt(0)?s=e.charAt(1):n[0]===e.charAt(1)&&(s=e.charAt(0))),s},[]);return{getInputProps:u.useCallback(n=>{const{index:e,...s}=n,p=h=>{const f=h.target.value,v=m[e],A=S(v,f);if(A===""){P("",e);return}if(f.length>2){if(U(f,I)){const F=f.split("").filter((xe,T)=>T<t.count());d(F),F.length===t.count()&&(r==null||r(F.join("")))}}else U(A,I)&&P(A,e),E(!0)},$=h=>{var f;if(h.key==="Backspace"&&x)if(h.target.value===""){const v=t.prev(e,!1);v&&(P("",e-1,!1),(f=v.node)==null||f.focus(),E(!0))}else E(!1)},g=()=>{V(e)},H=()=>{V(-1)},K=M===e;return{"aria-label":"Please enter your pin code",inputMode:I==="number"?"numeric":"text",type:j?"password":I==="number"?"tel":"text",...s,id:`${y}-${e}`,disabled:N,"aria-invalid":J(D),onChange:b(s.onChange,p),onKeyDown:b(s.onKeyDown,$),onFocus:b(s.onFocus,g),onBlur:b(s.onBlur,H),value:m[e]||"",autoComplete:_?"one-time-code":"off",placeholder:K?"":C}},[t,M,S,y,N,j,D,x,r,_,C,P,d,I,m]),id:y,descendants:t,values:m,setValue:P,setValues:d,clear:q}}function re(o={},a=null){const{getInputProps:i}=ie(),{index:l,register:c}=ae();return i({...o,ref:O(c,a),index:l})}function ce(o){const a=Q("PinInput",o),{children:i,...l}=W(o),{descendants:c,...r}=le(l),C=Y(i).map(x=>u.cloneElement(x,{__css:a}));return R.jsx(se,{value:c,children:R.jsx(ue,{value:r,children:C})})}ce.displayName="PinInput";var de=ee(function(a,i){const l=re(a,i);return R.jsx(ne.input,{...l,className:te("chakra-pin-input",a.className)})});de.displayName="PinInputField";export{ce as P,de as a};