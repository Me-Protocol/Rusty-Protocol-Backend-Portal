import{r as s,_ as o,a as m,u as p,d as x,o as h,p as _,j as e,F as j,S as r,m as g,h as b,G as n,D as f,q as y,t as D}from"./index-084f02dc.js";import{O as C}from"./index-209f556f.js";import E from"./index-549f92aa.js";import F from"./index-e94a0ca3.js";const S=s.lazy(()=>o(()=>import("./index-c44f581e.js"),["assets/index-c44f581e.js","assets/index-084f02dc.js","assets/index-ed5220eb.css","assets/index-090b617c.js","assets/countries-020c4914.js","assets/chunk-3RSXBRAN-6f5fc54f.js"]));s.lazy(()=>o(()=>import("./index-a3d16806.js"),["assets/index-a3d16806.js","assets/index-084f02dc.js","assets/index-ed5220eb.css"]));const O=s.lazy(()=>o(()=>import("./index-d0baae48.js"),["assets/index-d0baae48.js","assets/index-084f02dc.js","assets/index-ed5220eb.css"])),k=s.lazy(()=>o(()=>import("./index-084f02dc.js").then(t=>t.c$),["assets/index-084f02dc.js","assets/index-ed5220eb.css"])),L=()=>{var l,c;s.useState(!0);const{root:t}=D();m();let u=p();x(a=>a.authReducer);const{data:i,isLoading:d}=h({page:1,limit:8,type:_.PRODUCT},{refetchOnMountOrArgChange:!0});return e.jsxs(j,{flexDir:"column",children:[e.jsx(s.Suspense,{fallback:e.jsx(r,{size:"sm"}),children:e.jsx(k,{})}),e.jsx(g,{children:e.jsxs(b,{...t,children:[e.jsx(s.Suspense,{fallback:e.jsx(r,{size:"sm"}),children:e.jsx(O,{breadcrumbs:[{name:"Home",link:`${n}/dashboard`},{name:"Categories",link:`${n}/dashboard/category`,isCurrentPage:!0}]})}),e.jsx(s.Suspense,{fallback:e.jsx(r,{size:"sm"}),children:e.jsx(F,{title:"Get inspired. Browse",desc:"offers",buttonLabel:"",icon:e.jsx(f,{color:"#FFFFFF",w:"330px",h:"300px"}),design:"",onClick:()=>{u(`${n}/dashboard/shop`)}})}),d?e.jsx(E,{}):e.jsx(e.Fragment,{children:(c=(l=i==null?void 0:i.data)==null?void 0:l.categories)==null?void 0:c.map(a=>e.jsx(C,{categoryName:a.name,category_id:a.id,loaded:!d,rest:{...a}},y()))})]})}),e.jsx(s.Suspense,{fallback:e.jsx(r,{size:"sm"}),children:e.jsx(S,{})})]})},T=L;export{T as default};