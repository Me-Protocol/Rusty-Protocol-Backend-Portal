import{r as f,u as E,aV as $,aq as z,j as o,F as a,I as r,f as x,H as N,a7 as i,E as h,q as l,G as O,aZ as P,v as R,C as G,T as H}from"./index-dcfd6306.js";import{S as q}from"./index-22181dac.js";import{I as D,a as M,b as V}from"./index.esm-743c5837.js";import"./index-fa241765.js";import"./ResizeObserver.es-f4289e8a.js";const oe=({shopArray:s,carouselTitle:Q,carouselImage:U,showIcon:w,onClick:X,preLink:c,isLoaded:Z,plusButtonVisible:j,forStore:k})=>{var u,m,g,b;const[S,p]=f.useState(!1),t=f.useRef(null);let d=E();$({base:2.6,sm:4,md:4,lg:4.5,xl:4},{fallback:"md"});const{data:n,isLoading:J}=z({page:1,limit:8,category:s==null?void 0:s.id},{refetchOnFocus:!0}),C={dots:!1,infinite:!1,speed:500,slidesToScroll:1,rtl:!0,initialSlide:3},{root:I,desc:v}=W();function L(){var e;(e=t==null?void 0:t.current)==null||e.slickPrev()}function T(){var e;(e=t==null?void 0:t.current)==null||e.slickNext()}function _({id:e,slug:F,brandName:B}){S!==!0&&d(`${c||""}${e}`,{state:{id:e,slug:F,brandName:B}})}return o.jsx(a,{...I,flexDir:"column",children:((m=(u=n==null?void 0:n.data)==null?void 0:u.brands)==null?void 0:m.length)>0&&o.jsxs(o.Fragment,{children:[o.jsxs(a,{w:"100%",my:"20px",justify:"space-between",children:[o.jsxs(a,{flexDir:"row",align:"center",w:"60%",children:[w&&o.jsx(r,{src:x.appLogo,w:{base:"40px",md:"50px"},h:{base:"40px",md:"50px"},mr:"1%"}),o.jsx(N,{...v,fontSize:"14px",textTransform:"uppercase",children:s==null?void 0:s.name})]}),o.jsxs(a,{children:[o.jsx(a,{display:{base:"none",md:"flex"},justify:"space-between",w:"50px",children:[{id:"1",icon:D,fn:L},{id:"2",icon:M,fn:T}].map(e=>o.jsx(i,{onClick:e.fn,as:"button",children:o.jsx(h,{as:e.icon,w:"20px",h:"20px",color:"rgba(153,153,153,0.66)",_hover:{color:"black"}})},l()))}),o.jsx(i,{as:"button",ml:"10px",onClick:()=>{d(`${O}/dashboard/shop/category/${s==null?void 0:s.id}`,{state:{categoryName:s==null?void 0:s.name}})},children:o.jsx(h,{as:V,w:"20px",h:"20px",color:"rgba(153,153,153,0.66)",_hover:{color:"black"}})})]})]}),o.jsx(i,{w:"100%",children:o.jsx(q,{ref:t,...C,slidesToShow:3,onSwipe:()=>{p(!0),setTimeout(()=>{p(!1)},300)},children:(b=(g=n==null?void 0:n.data)==null?void 0:g.brands)==null?void 0:b.map(e=>o.jsx(P,{pr:"10px",children:o.jsxs(i,{children:[o.jsx(R,{isLoaded:!0,overflow:"hidden",w:["120px","200px","280px","320px","400px"],h:["100px","180px","180px","180px","200px"],onClick:()=>_({id:e==null?void 0:e.id,slug:e==null?void 0:e.slug,brandName:e==null?void 0:e.name}),role:"group",children:o.jsxs(G,{w:["120px","200px","280px","320px","400px"],h:["100px","180px","180px","180px","200px"],bg:"#0000003D",borderRadius:{base:"10px",md:"16px"},pos:"absolute",background:`url(${e!=null&&e.banners?e==null?void 0:e.banners[0]:""}) center/cover no-repeat`,backgroundColor:"rgba(0, 0, 0, 0.5)",backgroundBlendMode:"multiply",as:"button",overflow:"hidden",children:[j&&o.jsx(r,{src:x.brandPlusIcon,w:{base:"20px",md:"30px"},h:{base:"20px",md:"30px"},pos:"absolute",bottom:"2",right:"2"}),(e==null?void 0:e.logo_white)&&o.jsx(r,{w:"130px",h:"130px",position:"relative",borderRadius:"5px",src:e==null?void 0:e.logo_white,objectFit:"contain",fallbackSrc:x.appLogoPlaceholder,fallbackStrategy:"beforeLoadOrError",_groupHover:{transform:"scale(1.2)",transition:"all .2s linear"}})]})}),o.jsx(H,{w:["120px","200px","280px","320px","400px"],noOfLines:1,mt:"12px",color:"dark",fontSize:["10px","10px","12px","12px","14px"],textTransform:"uppercase",children:e==null?void 0:e.name})]},l())},l()))})})]})})},W=()=>({root:{w:"100%",align:"center",overflow:"hidden"},desc:{fontSize:["16px","16px","18px","18px","18px"],w:{base:"100%",md:"80%"}},seeMoreButton:{w:["25%","16%","15%","15%","10%","10%"],h:["15px","15px","8%","8%","10%","45px"],color:"dark",borderWidth:1,backgroundColor:"light",mt:"2%",fontSize:["12px","14px","14px","14px","14px","18px"]}});export{oe as default};
