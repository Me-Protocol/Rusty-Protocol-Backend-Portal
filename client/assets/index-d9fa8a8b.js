import{r as s,_ as o,a as p,u,d as x,o as h,p as _,j as e,F as j,S as r,m as g,h as b,G as n,D as f,q as y,t as D}from"./index-22a5f3d5.js";import{O as C}from"./index-175cb125.js";import E from"./index-d7d56b40.js";import F from"./index-a8b53a96.js";import"./empty_lottie-ef5d1abe.js";import"./index-9c7974bb.js";import"./index-c4278721.js";import"./index.esm-7ae4f1f3.js";import"./index-04a99e83.js";import"./index-6708a58f.js";import"./ResizeObserver.es-f4289e8a.js";const S=s.lazy(()=>o(()=>import("./index-d6d62031.js"),["assets/index-d6d62031.js","assets/index-22a5f3d5.js","assets/index-00bfa456.css","assets/index-ceaee24d.js","assets/countries-020c4914.js","assets/chunk-3RSXBRAN-59d5bafe.js"]));s.lazy(()=>o(()=>import("./index-9de97c96.js"),["assets/index-9de97c96.js","assets/index-22a5f3d5.js","assets/index-00bfa456.css"]));const O=s.lazy(()=>o(()=>import("./index-807c3734.js"),["assets/index-807c3734.js","assets/index-22a5f3d5.js","assets/index-00bfa456.css"])),k=s.lazy(()=>o(()=>import("./index-22a5f3d5.js").then(t=>t.di),["assets/index-22a5f3d5.js","assets/index-00bfa456.css"])),L=()=>{var l,c;s.useState(!0);const{root:t}=D();p();let m=u();x(a=>a.authReducer);const{data:i,isLoading:d}=h({page:1,limit:8,type:_.PRODUCT},{refetchOnMountOrArgChange:!0});return e.jsxs(j,{flexDir:"column",children:[e.jsx(s.Suspense,{fallback:e.jsx(r,{size:"sm"}),children:e.jsx(k,{})}),e.jsx(g,{children:e.jsxs(b,{...t,children:[e.jsx(s.Suspense,{fallback:e.jsx(r,{size:"sm"}),children:e.jsx(O,{breadcrumbs:[{name:"Home",link:`${n}/dashboard`},{name:"Categories",link:`${n}/dashboard/category`,isCurrentPage:!0}]})}),e.jsx(s.Suspense,{fallback:e.jsx(r,{size:"sm"}),children:e.jsx(F,{title:"Get inspired. Browse",desc:"offers",buttonLabel:"",icon:e.jsx(f,{color:"#FFFFFF",w:"330px",h:"300px"}),design:"",onClick:()=>{m(`${n}/dashboard/shop`)}})}),d?e.jsx(E,{}):e.jsx(e.Fragment,{children:(c=(l=i==null?void 0:i.data)==null?void 0:l.categories)==null?void 0:c.map(a=>e.jsx(C,{categoryName:a.name,category_id:a.id,loaded:!d,rest:{...a}},y()))})]})}),e.jsx(s.Suspense,{fallback:e.jsx(r,{size:"sm"}),children:e.jsx(S,{})})]})},V=L;export{V as default};
