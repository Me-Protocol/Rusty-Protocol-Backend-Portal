import{r as e,_ as a,u as b,a as g,o as E,ac as S,j as s,F as h,S as o,m as D,h as L,G as i,ad as y,v as F,q as v,C,l as f,E as z,J as A,ae as R,t as k}from"./index-d2f88df5.js";const I=e.lazy(()=>a(()=>import("./index-d2f88df5.js").then(r=>r.c$),["assets/index-d2f88df5.js","assets/index-ed5220eb.css"])),O=e.lazy(()=>a(()=>import("./index-8e3f9d1c.js"),["assets/index-8e3f9d1c.js","assets/index-d2f88df5.js","assets/index-ed5220eb.css"])),P=e.lazy(()=>a(()=>import("./index-02e652b0.js"),["assets/index-02e652b0.js","assets/index-d2f88df5.js","assets/index-ed5220eb.css","assets/index-5158b136.js","assets/countries-020c4914.js","assets/chunk-3RSXBRAN-cbfc2768.js"])),T=e.lazy(()=>a(()=>import("./index-1eab99e4.js"),["assets/index-1eab99e4.js","assets/index-d2f88df5.js","assets/index-ed5220eb.css","assets/index-f30e2707.js","assets/index-17d7076f.js","assets/ResizeObserver.es-f4289e8a.js","assets/index.esm-4f49b5be.js"]));e.lazy(()=>a(()=>import("./index-66086286.js"),["assets/index-66086286.js","assets/index-d2f88df5.js","assets/index-ed5220eb.css"]));const w=e.lazy(()=>a(()=>import("./index-1404dff8.js"),["assets/index-1404dff8.js","assets/index-d2f88df5.js","assets/index-ed5220eb.css"])),V=()=>{var l,c;let r=b();g();const[d,p]=e.useState(5),[x,B]=e.useState(!1),{root:u,loadMore:_}=k(),{data:t,error:N,isLoading:n,isFetching:m}=E({page:1,limit:d,type:S.BRAND},{refetchOnMountOrArgChange:!0});return s.jsxs(h,{flexDir:"column",children:[s.jsx(e.Suspense,{fallback:s.jsx(o,{size:"sm"}),children:s.jsx(I,{})}),s.jsx(D,{children:s.jsxs(L,{...u,children:[s.jsxs(e.Suspense,{fallback:s.jsx(o,{size:"sm"}),children:[s.jsx(h,{alignItems:"center",justifyContent:"space-between",children:s.jsx(O,{breadcrumbs:[{name:"Home",link:`${i}/dashboard`},{name:"Shops",link:`${i}/dashboard/shop`,isCurrentPage:!0}]})}),s.jsx(w,{title:"Discover worlds.",desc:"Explore brand’s shops.",buttonLabel:"",icon:s.jsx(y,{color:"#FFFFFF",w:"330px",h:"300px"}),design:"",onClick:()=>{r(`${i}/dashboard/shop`)}})]}),s.jsx(e.Suspense,{fallback:s.jsx(o,{size:"sm"}),children:(c=(l=t==null?void 0:t.data)==null?void 0:l.categories)==null?void 0:c.map((j,$)=>s.jsx(F,{borderRadius:"10px",isLoaded:!n,children:s.jsx(T,{shopArray:j,forStore:!0})},v()))})]})}),!x&&s.jsx(C,{as:f,..._,mt:"10px",onClick:()=>{p(d+3)},children:n||m?s.jsx(o,{size:"sm"}):s.jsxs(s.Fragment,{children:["Load more ",s.jsx(z,{as:A,ml:"5%"})]})}),s.jsx(e.Suspense,{fallback:s.jsx(o,{size:"sm"}),children:s.jsx(P,{})}),n&&s.jsx(R,{})]})},M=V;export{M as default};
