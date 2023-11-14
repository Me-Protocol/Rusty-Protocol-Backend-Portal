import{c6 as ye,c7 as B,r as o,c8 as I,c9 as me,bD as a,br as c,bs as Z}from"./index-4d742258.js";var he={border:"0",clip:"rect(0, 0, 0, 0)",height:"1px",width:"1px",margin:"-1px",padding:"0",overflow:"hidden",whiteSpace:"nowrap",position:"absolute"},ke=()=>typeof document<"u",$=!1,w=null,y=!1,R=!1,K=new Set;function x(e,u){K.forEach(n=>n(e,u))}var pe=typeof window<"u"&&window.navigator!=null?/^Mac/.test(window.navigator.platform):!1;function we(e){return!(e.metaKey||!pe&&e.altKey||e.ctrlKey||e.key==="Control"||e.key==="Shift"||e.key==="Meta")}function ee(e){y=!0,we(e)&&(w="keyboard",x("keyboard",e))}function h(e){if(w="pointer",e.type==="mousedown"||e.type==="pointerdown"){y=!0;const u=e.composedPath?e.composedPath()[0]:e.target;let n=!1;try{n=u.matches(":focus-visible")}catch{}if(n)return;x("pointer",e)}}function Ee(e){return e.mozInputSource===0&&e.isTrusted?!0:e.detail===0&&!e.pointerType}function Ce(e){Ee(e)&&(y=!0,w="virtual")}function ge(e){e.target===window||e.target===document||(!y&&!R&&(w="virtual",x("virtual",e)),y=!1,R=!1)}function Le(){y=!1,R=!0}function te(){return w!=="pointer"}function Pe(){if(!ke()||$)return;const{focus:e}=HTMLElement.prototype;HTMLElement.prototype.focus=function(...n){y=!0,e.apply(this,n)},document.addEventListener("keydown",ee,!0),document.addEventListener("keyup",ee,!0),document.addEventListener("click",Ce,!0),window.addEventListener("focus",ge,!0),window.addEventListener("blur",Le,!1),typeof PointerEvent<"u"?(document.addEventListener("pointerdown",h,!0),document.addEventListener("pointermove",h,!0),document.addEventListener("pointerup",h,!0)):(document.addEventListener("mousedown",h,!0),document.addEventListener("mousemove",h,!0),document.addEventListener("mouseup",h,!0)),$=!0}function Se(e){Pe(),e(te());const u=()=>e(te());return K.add(u),()=>{K.delete(u)}}function De(e,u=[]){const n=Object.assign({},e);for(const s of u)s in n&&delete n[s];return n}function Ie(e={}){const u=ye(e),{isDisabled:n,isReadOnly:s,isRequired:P,isInvalid:d,id:A,onBlur:ne,onFocus:ae,"aria-describedby":H}=u,{defaultChecked:U,isChecked:V,isFocusable:oe,onChange:re,isIndeterminate:v,name:q,value:O,tabIndex:T=void 0,"aria-label":W,"aria-labelledby":_,"aria-invalid":S,...se}=e,D=De(se,["isDisabled","isReadOnly","isRequired","isInvalid","id","onBlur","onFocus","aria-describedby"]),F=B(re),j=B(ne),z=B(ae),[E,ie]=o.useState(!1),[b,C]=o.useState(!1),[k,G]=o.useState(!1),[p,m]=o.useState(!1);o.useEffect(()=>Se(ie),[]);const l=o.useRef(null),[N,ue]=o.useState(!0),[de,g]=o.useState(!!U),M=V!==void 0,r=M?V:de,J=o.useCallback(t=>{if(s||n){t.preventDefault();return}M||g(r?t.target.checked:v?!0:t.target.checked),F==null||F(t)},[s,n,r,M,v,F]);I(()=>{l.current&&(l.current.indeterminate=!!v)},[v]),me(()=>{n&&C(!1)},[n,C]),I(()=>{const t=l.current;if(!(t!=null&&t.form))return;const i=()=>{g(!!U)};return t.form.addEventListener("reset",i),()=>{var f;return(f=t.form)==null?void 0:f.removeEventListener("reset",i)}},[]);const Q=n&&!oe,X=o.useCallback(t=>{t.key===" "&&m(!0)},[m]),Y=o.useCallback(t=>{t.key===" "&&m(!1)},[m]);I(()=>{if(!l.current)return;l.current.checked!==r&&g(l.current.checked)},[l.current]);const ce=o.useCallback((t={},i=null)=>{const f=L=>{b&&L.preventDefault(),m(!0)};return{...t,ref:i,"data-active":a(p),"data-hover":a(k),"data-checked":a(r),"data-focus":a(b),"data-focus-visible":a(b&&E),"data-indeterminate":a(v),"data-disabled":a(n),"data-invalid":a(d),"data-readonly":a(s),"aria-hidden":!0,onMouseDown:c(t.onMouseDown,f),onMouseUp:c(t.onMouseUp,()=>m(!1)),onMouseEnter:c(t.onMouseEnter,()=>G(!0)),onMouseLeave:c(t.onMouseLeave,()=>G(!1))}},[p,r,n,b,E,k,v,d,s]),le=o.useCallback((t={},i=null)=>({...t,ref:i,"data-active":a(p),"data-hover":a(k),"data-checked":a(r),"data-focus":a(b),"data-focus-visible":a(b&&E),"data-indeterminate":a(v),"data-disabled":a(n),"data-invalid":a(d),"data-readonly":a(s)}),[p,r,n,b,E,k,v,d,s]),fe=o.useCallback((t={},i=null)=>({...D,...t,ref:Z(i,f=>{f&&ue(f.tagName==="LABEL")}),onClick:c(t.onClick,()=>{var f;N||((f=l.current)==null||f.click(),requestAnimationFrame(()=>{var L;(L=l.current)==null||L.focus({preventScroll:!0})}))}),"data-disabled":a(n),"data-checked":a(r),"data-invalid":a(d)}),[D,n,r,d,N]),ve=o.useCallback((t={},i=null)=>({...t,ref:Z(l,i),type:"checkbox",name:q,value:O,id:A,tabIndex:T,onChange:c(t.onChange,J),onBlur:c(t.onBlur,j,()=>C(!1)),onFocus:c(t.onFocus,z,()=>C(!0)),onKeyDown:c(t.onKeyDown,X),onKeyUp:c(t.onKeyUp,Y),required:P,checked:r,disabled:Q,readOnly:s,"aria-label":W,"aria-labelledby":_,"aria-invalid":S?!!S:d,"aria-describedby":H,"aria-disabled":n,style:he}),[q,O,A,J,j,z,X,Y,P,r,Q,s,W,_,S,d,H,n,T]),be=o.useCallback((t={},i=null)=>({...t,ref:i,onMouseDown:c(t.onMouseDown,Fe),"data-disabled":a(n),"data-checked":a(r),"data-invalid":a(d)}),[r,n,d]);return{state:{isInvalid:d,isFocused:b,isChecked:r,isActive:p,isHovered:k,isIndeterminate:v,isDisabled:n,isReadOnly:s,isRequired:P},getRootProps:fe,getCheckboxProps:ce,getIndicatorProps:le,getInputProps:ve,getLabelProps:be,htmlProps:D}}function Fe(e){e.preventDefault(),e.stopPropagation()}export{Ie as u};