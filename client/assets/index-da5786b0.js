import{u as w,J as S,c as v,d as b,a8 as k,j as a,F as L,W as y,m as C,h as F,i as I,A,a9 as D,T as r,x as $,y as h,G,q as N}from"./index-22a5f3d5.js";import O from"./index-c4278721.js";import P from"./index-d7d56b40.js";const R=()=>{var d,e,l;let n=w();const{root:j}=T(),{id:g}=S(),{state:t}=v();b(s=>s.authReducer);const{data:i,isLoading:c}=k({collectionId:g},{refetchOnMountOrArgChange:!0});return a.jsxs(L,{flexDir:"column",children:[a.jsx(y,{}),a.jsx(C,{children:a.jsxs(F,{...j,children:[a.jsxs(I,{onClick:()=>n(-1),cursor:"pointer",children:[a.jsx(A,{as:D,w:"2vw",h:"2vw"}),a.jsx(r,{children:"Saved"})]}),a.jsx(r,{pt:"2vw",children:(d=t==null?void 0:t.id)==null?void 0:d.replaceAll("-"," ")}),c?a.jsx(P,{}):a.jsx(a.Fragment,{children:a.jsx($,{columns:[1,2,3,4,4],w:"100%",spacingX:["35px","35px","35px","15px","35px"],spacingY:"5px",justifyItems:"space-between",children:(l=(e=i==null?void 0:i.data)==null?void 0:e.likes)==null?void 0:l.map(({offer:s},o)=>{var p,u,x,m;return a.jsx(O,{isLoaded:!c,productTitle:s==null?void 0:s.name,points:`${s==null?void 0:s.tokens}${(p=s==null?void 0:s.reward)==null?void 0:p.rewardSymbol}`,productSubtitle:((x=(u=s==null?void 0:s.product)==null?void 0:u.category)==null?void 0:x.name)||"Collections",price:(m=s==null?void 0:s.originalPrice)==null?void 0:m.toLocaleString(),isNew:h(h()).diff(s==null?void 0:s.createdAt,"days")<3,rest:{...s},i:o,bgImage:s==null?void 0:s.offerImages,onClick:()=>{(s==null?void 0:s.status)==="expired"||(s==null?void 0:s.status)==="draft"||n(`${G}/product-details/${s==null?void 0:s.offerCode}`)}},N())})})})]})})]})},q=R,T=()=>({root:{w:"100%",mt:"108px",pt:"3%",overflow:"hidden",pb:"3%",px:"0px"}});export{q as default};
