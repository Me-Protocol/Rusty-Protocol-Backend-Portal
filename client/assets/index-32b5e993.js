import{u,A as p,c as m,d as x,ae as h,r as j,j as s,F as v,a2 as S,h as g,i as w,U as L,T as c,O as k,G as F,y as b}from"./index-24aaf4e2.js";import{F as D}from"./index.esm-dff080f3.js";import I from"./index-6bd4573e.js";import O from"./index-673120da.js";const A=()=>{var i;let r=u();const{root:n}=C(),{id:t}=p(),{state:d}=m();x(e=>e.authReducer);const{data:a,isLoading:o}=h(d.id,{refetchOnMountOrArgChange:!0});return j.useEffect(()=>{},[]),s.jsxs(v,{flexDir:"column",children:[s.jsx(S,{}),s.jsxs(g,{...n,children:[s.jsxs(w,{onClick:()=>r(-1),cursor:"pointer",children:[s.jsx(L,{as:D,w:"2vw",h:"2vw"}),s.jsx(c,{children:"Saved"})]}),s.jsx(c,{pt:"2vw",children:t==null?void 0:t.replaceAll("-"," ")}),o?s.jsx(O,{}):s.jsx(k,{columns:[2,2,3,4,4],spacingX:"5%",w:"80vw",children:(i=a==null?void 0:a.data)==null?void 0:i.map(({offer:e},l)=>s.jsx(I,{isLoaded:!o,productTitle:e.name,points:"48,98 NIK tok",productSubtitle:e.description,price:e.price,bgImage:e.images,rest:{...e},i:l,onClick:()=>{r(`${F}/productDetails/${e.id}`,{state:{...e}})}},b()))})]})]})},P=A,C=()=>({root:{w:"100%",px:[5,5,10,20,40],mt:"108px",pt:"3%",overflow:"hidden"}});export{P as default};
