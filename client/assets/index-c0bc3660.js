import{bp as m,aO as l,bx as u,bv as p,by as n,j as o,aP as f,aQ as c,U as x,r as i,a as h,e as y,bk as g,am as v}from"./index-7489b734.js";import{u as E,a as F}from"./formik.esm-c5c7c0a7.js";var[b,I]=m({name:"FormErrorStylesContext",errorMessage:`useFormErrorStyles returned is 'undefined'. Seems you forgot to wrap the components in "<FormError />" `}),d=l((e,s)=>{const a=u("FormError",e),t=p(e),r=n();return r!=null&&r.isInvalid?o.jsx(b,{value:a,children:o.jsx(f.div,{...r==null?void 0:r.getErrorMessageProps(t,s),className:c("chakra-form__error-message",e.className),__css:{display:"flex",alignItems:"center",...a.text}})}):null});d.displayName="FormErrorMessage";var M=l((e,s)=>{const a=I(),t=n();if(!(t!=null&&t.isInvalid))return null;const r=c("chakra-form__error-icon",e.className);return o.jsx(x,{ref:s,"aria-hidden":!0,...e,__css:a.icon,className:r,children:o.jsx("path",{fill:"currentColor",d:"M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"})})});M.displayName="FormErrorIcon";const j=({...e})=>{const s=h(),{styles:a}=C(),[t,r]=E(e);return i.useEffect(()=>{s(y())},[s]),o.jsxs(g,{isInvalid:r.error&&r.touched,children:[o.jsx(F,{...a,as:v,...t,...e}),o.jsx(d,{children:r.error})]})},N=i.memo(j),C=()=>({styles:{w:"100%",h:"50px",py:{base:5},justify:"flex-start",align:"center",pl:"15px",borderRadius:53,bg:"grey",color:"black",fontSize:{base:"12px",md:"16px"},focusBorderColor:"blue",_placeholder:{opacity:1,color:"placeholderColor"},errorBorderColor:"danger"}});export{N as default,C as useInputStyles};