import{r as s,_ as o,a as m,u as p,d as x,o as h,p as _,j as e,F as j,S as r,m as g,h as b,G as n,D as f,q as y,t as D}from"./index-d1ffda34.js";import{O as C}from"./index-4e67946b.js";import E from"./index-8dba4838.js";import F from"./index-4bdbed73.js";const S=s.lazy(()=>o(()=>import("./index-f130607b.js"),["assets/index-f130607b.js","assets/index-d1ffda34.js","assets/index-ed5220eb.css","assets/index-c34e4b7e.js","assets/countries-020c4914.js","assets/chunk-3RSXBRAN-f403dd7c.js"]));s.lazy(()=>o(()=>import("./index-e1eed1d5.js"),["assets/index-e1eed1d5.js","assets/index-d1ffda34.js","assets/index-ed5220eb.css"]));const O=s.lazy(()=>o(()=>import("./index-fc9c0cb7.js"),["assets/index-fc9c0cb7.js","assets/index-d1ffda34.js","assets/index-ed5220eb.css"])),k=s.lazy(()=>o(()=>import("./index-d1ffda34.js").then(t=>t.c$),["assets/index-d1ffda34.js","assets/index-ed5220eb.css"])),L=()=>{var l,c;s.useState(!0);const{root:t}=D();m();let u=p();x(a=>a.authReducer);const{data:i,isLoading:d}=h({page:1,limit:8,type:_.PRODUCT},{refetchOnMountOrArgChange:!0});return e.jsxs(j,{flexDir:"column",children:[e.jsx(s.Suspense,{fallback:e.jsx(r,{size:"sm"}),children:e.jsx(k,{})}),e.jsx(g,{children:e.jsxs(b,{...t,children:[e.jsx(s.Suspense,{fallback:e.jsx(r,{size:"sm"}),children:e.jsx(O,{breadcrumbs:[{name:"Home",link:`${n}/dashboard`},{name:"Categories",link:`${n}/dashboard/category`,isCurrentPage:!0}]})}),e.jsx(s.Suspense,{fallback:e.jsx(r,{size:"sm"}),children:e.jsx(F,{title:"Get inspired. Browse",desc:"offers",buttonLabel:"",icon:e.jsx(f,{color:"#FFFFFF",w:"330px",h:"300px"}),design:"",onClick:()=>{u(`${n}/dashboard/shop`)}})}),d?e.jsx(E,{}):e.jsx(e.Fragment,{children:(c=(l=i==null?void 0:i.data)==null?void 0:l.categories)==null?void 0:c.map(a=>e.jsx(C,{categoryName:a.name,category_id:a.id,loaded:!d,rest:{...a}},y()))})]})}),e.jsx(s.Suspense,{fallback:e.jsx(r,{size:"sm"}),children:e.jsx(S,{})})]})},T=L;export{T as default};