import{r,_ as o,u as h,d as b,a9 as f,j as s,F as j,S as i,m as x,h as D,G as a,D as E,x as g,n as O,t as S}from"./index-4d742258.js";import k from"./index-2b5b9318.js";import L from"./index-6dcc2a1a.js";const v=r.lazy(()=>o(()=>import("./index-1962ba8e.js"),["assets/index-1962ba8e.js","assets/index-4d742258.js","assets/index-ed5220eb.css","assets/index-680b3184.js","assets/countries-020c4914.js","assets/chunk-3RSXBRAN-015cd4eb.js"])),y=r.lazy(()=>o(()=>import("./index-4213153d.js"),["assets/index-4213153d.js","assets/index-4d742258.js","assets/index-ed5220eb.css"]));r.lazy(()=>o(()=>import("./index-6fa56c0c.js"),["assets/index-6fa56c0c.js","assets/index-4d742258.js","assets/index-ed5220eb.css"]));const F=r.lazy(()=>o(()=>import("./index-4d742258.js").then(t=>t.cW),["assets/index-4d742258.js","assets/index-ed5220eb.css"])),P=r.lazy(()=>o(()=>import("./index-3967a2f5.js"),["assets/index-3967a2f5.js","assets/index-4d742258.js","assets/index-ed5220eb.css"])),w=()=>{var c,l;let t=h();const{root:u}=S(),{token:m}=b(e=>e.authReducer),{data:n,isLoading:d,error:z}=f({page:1,limit:7},{refetchOnMountOrArgChange:300});return s.jsxs(j,{flexDir:"column",children:[s.jsx(r.Suspense,{fallback:s.jsx(i,{size:"sm"}),children:s.jsx(F,{})}),s.jsx(x,{children:s.jsxs(D,{...u,children:[s.jsxs(r.Suspense,{fallback:s.jsx(i,{size:"sm"}),children:[s.jsx(x,{children:s.jsx(y,{breadcrumbs:[{name:"Home",link:m?`${a}/dashboard`:`${a}/`},{name:"Offers",link:`${a}/dashboard/offers`,isCurrentPage:!0}]})}),s.jsx(P,{title:"Discover worlds.",desc:"Explore brand’s shops.",buttonLabel:"",icon:s.jsx(E,{color:"#FFFFFF",w:"330px",h:"300px"}),design:"",onClick:()=>{t(`${a}/dashboard/shop`)}})]}),d?s.jsx(L,{}):s.jsx(g,{columns:[2,2,3,4,4],w:"100%",spacingX:["35px","35px","35px","15px","35px"],spacingY:"5px",children:s.jsx(r.Suspense,{fallback:s.jsx(i,{size:"sm"}),children:(l=(c=n==null?void 0:n.data)==null?void 0:c.offers)==null?void 0:l.map((e,_)=>{var p;return s.jsx(k,{isLoaded:!d,productTitle:e.name,points:`${e==null?void 0:e.point_discount}${(p=e.reward)==null?void 0:p.rewardSymbol}`,productSubtitle:e.category.name,price:e.price,isNew:e.isNew,bgImage:[],rest:{...e},i:_,onClick:()=>t(`${a}/productDetails/${e.slug}`)},O())})})})]})}),s.jsx(r.Suspense,{fallback:s.jsx(i,{size:"sm"}),children:s.jsx(v,{})})]})},A=w;export{A as default};
