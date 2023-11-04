import{bo as L,bp as z,r as u,bq as O,br as Q,bs as b,bt as Z,bu as J,bv as W,bw as Y,j as R,aO as ee,aP as ne,aQ as te}from"./index-7489b734.js";var[se,Pe,oe,ae]=L(),[ue,ie]=z({name:"PinInputContext",errorMessage:"usePinInputContext: `context` is undefined. Seems you forgot to all pin input fields within `<PinInput />`"}),G=o=>o==null?void 0:o.split("");function U(o,a){return(a==="alphanumeric"?/^[a-zA-Z0-9]+$/i:/^[0-9]+$/).test(o)}function le(o={}){const{autoFocus:a,value:i,defaultValue:l,onChange:c,onComplete:r,placeholder:C="○",manageFocus:m=!0,otp:_=!1,id:k,isDisabled:N,isInvalid:D,type:P="number",mask:j}=o,X=u.useId(),y=k??`pin-input-${X}`,t=oe(),[w,E]=u.useState(!0),[M,V]=u.useState(-1),[x,d]=O({defaultValue:G(l)||[],value:G(i),onChange:n=>c==null?void 0:c(n.join(""))});u.useEffect(()=>{if(a){const n=t.first();n&&requestAnimationFrame(()=>{n.node.focus()})}},[t]);const B=u.useCallback(n=>{if(!w||!m)return;const e=t.next(n,!1);e&&requestAnimationFrame(()=>{e.node.focus()})},[t,w,m]),I=u.useCallback((n,e,s=!0)=>{const p=[...x];p[e]=n,d(p),n!==""&&p.length===t.count()&&p.every(g=>g!=null&&g!=="")?r==null||r(p.join("")):s&&B(e)},[x,d,B,r,t]),q=u.useCallback(()=>{var n;const e=Array(t.count()).fill("");d(e);const s=t.first();(n=s==null?void 0:s.node)==null||n.focus()},[t,d]),S=u.useCallback((n,e)=>{let s=e;return(n==null?void 0:n.length)>0&&(n[0]===e.charAt(0)?s=e.charAt(1):n[0]===e.charAt(1)&&(s=e.charAt(0))),s},[]);return{getInputProps:u.useCallback(n=>{const{index:e,...s}=n,p=h=>{const f=h.target.value,v=x[e],A=S(v,f);if(A===""){I("",e);return}if(f.length>2){if(U(f,P)){const F=f.split("").filter((me,T)=>T<t.count());d(F),F.length===t.count()&&(r==null||r(F.join("")))}}else U(A,P)&&I(A,e),E(!0)},$=h=>{var f;if(h.key==="Backspace"&&m)if(h.target.value===""){const v=t.prev(e,!1);v&&(I("",e-1,!1),(f=v.node)==null||f.focus(),E(!0))}else E(!1)},g=()=>{V(e)},H=()=>{V(-1)},K=M===e;return{"aria-label":"Please enter your pin code",inputMode:P==="number"?"numeric":"text",type:j?"password":P==="number"?"tel":"text",...s,id:`${y}-${e}`,disabled:N,"aria-invalid":Q(D),onChange:b(s.onChange,p),onKeyDown:b(s.onKeyDown,$),onFocus:b(s.onFocus,g),onBlur:b(s.onBlur,H),value:x[e]||"",autoComplete:_?"one-time-code":"off",placeholder:K?"":C}},[t,M,S,y,N,j,D,m,r,_,C,I,d,P,x]),id:y,descendants:t,values:x,setValue:I,setValues:d,clear:q}}function re(o={},a=null){const{getInputProps:i}=ie(),{index:l,register:c}=ae();return i({...o,ref:Z(c,a),index:l})}function ce(o){const a=J("PinInput",o),{children:i,...l}=W(o),{descendants:c,...r}=le(l),C=Y(i).map(m=>u.cloneElement(m,{__css:a}));return R.jsx(se,{value:c,children:R.jsx(ue,{value:r,children:C})})}ce.displayName="PinInput";var de=ee(function(a,i){const l=re(a,i);return R.jsx(ne.input,{...l,className:te("chakra-pin-input",a.className)})});de.displayName="PinInputField";export{ce as P,de as a};