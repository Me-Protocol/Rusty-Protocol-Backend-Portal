import{u as w,U as S,c as v,d as b,ac as k,r as L,j as a,F as y,a1 as C,m as I,h as D,i as F,O,ad as $,T as x,J as A,K as m,G as E,y as G}from"./index-c853c0cb.js";import N from"./index-075f31a0.js";import P from"./index-abad383d.js";const R=()=>{var n,d,p;let e=w();const{root:h}=T(),{id:g}=S(),{state:i}=v();b(s=>s.authReducer);const{data:t,isLoading:c}=k({collectionId:g},{refetchOnMountOrArgChange:!0});return L.useEffect(()=>{console.log(t,"pppppppp")},[]),a.jsxs(y,{flexDir:"column",children:[a.jsx(C,{}),a.jsx(I,{children:a.jsxs(D,{...h,children:[a.jsxs(F,{onClick:()=>e(-1),cursor:"pointer",children:[a.jsx(O,{as:$,w:"2vw",h:"2vw"}),a.jsx(x,{children:"Saved"})]}),a.jsx(x,{pt:"2vw",children:(n=i==null?void 0:i.id)==null?void 0:n.replaceAll("-"," ")}),c?a.jsx(P,{}):a.jsx(A,{columns:[2,2,3,4,4],w:"100%",spacingX:["35px","35px","35px","15px","35px"],spacingY:"5px",justifyItems:"space-between",children:(p=(d=t==null?void 0:t.data)==null?void 0:d.likes)==null?void 0:p.map(({offer:s},j)=>{var l,o,r,u;return a.jsx(N,{isLoaded:!c,productTitle:s==null?void 0:s.name,points:`${s==null?void 0:s.tokens}${(l=s==null?void 0:s.reward)==null?void 0:l.rewardSymbol}`,productSubtitle:((r=(o=s==null?void 0:s.product)==null?void 0:o.category)==null?void 0:r.name)||"Collections",price:(u=s==null?void 0:s.originalPrice)==null?void 0:u.toLocaleString(),isNew:m(m()).diff(s==null?void 0:s.createdAt,"days")<3,rest:{...s},i:j,bgImage:s==null?void 0:s.offerImages,onClick:()=>e(`${E}/productDetails/${s==null?void 0:s.offerCode}`)},G())})})]})})]})},J=R,T=()=>({root:{w:"100%",mt:"108px",pt:"3%",overflow:"hidden",pb:"3%",px:"0px"}});export{J as default};
