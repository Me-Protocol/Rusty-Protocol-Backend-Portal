import{r as c,u as L,aL as I,J as F,j as a,F as r,I as x,f as n,H as z,ak as u,N as B,C as R,T,y as g}from"./index-4302fa73.js";import{W,a as _}from"./chunk-7ELO524Q-966f499c.js";const J=({shopArray:s,carouselTitle:H,carouselImage:N,showIcon:m,onClick:O,preLink:t,isLoaded:$,plusButtonVisible:b,forStore:f})=>{var p,l,i,d;const[h,D]=c.useState(!1);c.useRef(null);let j=L();I({base:2.6,sm:4,md:4,lg:4.5,xl:4},{fallback:"md"});const{data:o,isLoading:M}=F({page:1,limit:8,category:s==null?void 0:s.id},{refetchOnFocus:!0}),{root:w,desc:k}=E();function S({id:e,slug:v,brandName:C}){h!==!0&&j(`${t||""}${e}`,{state:{id:e,slug:v,brandName:C}})}return a.jsx(r,{...w,flexDir:"column",children:((l=(p=o==null?void 0:o.data)==null?void 0:p.brands)==null?void 0:l.length)>0&&a.jsxs(a.Fragment,{children:[a.jsx(r,{w:"100%",my:"20px",justify:"space-between",children:a.jsxs(r,{flexDir:"row",align:"center",w:"60%",children:[m&&a.jsx(x,{src:n.appLogo,w:{base:"40px",md:"50px"},h:{base:"40px",md:"50px"},mr:"1%"}),a.jsx(z,{...k,fontSize:"14px",textTransform:"uppercase",children:s==null?void 0:s.name})]})}),a.jsx(u,{w:"100%",children:a.jsx(W,{children:(d=(i=o==null?void 0:o.data)==null?void 0:i.brands)==null?void 0:d.map(e=>a.jsx(_,{children:a.jsxs(u,{children:[a.jsx(B,{isLoaded:!0,overflow:"hidden",w:["120px","200px","280px","320px","400px"],h:["100px","180px","180px","180px","200px"],onClick:()=>S({id:e==null?void 0:e.id,slug:e==null?void 0:e.slug,brandName:e==null?void 0:e.name}),role:"group",children:a.jsxs(R,{w:["120px","200px","280px","320px","400px"],h:["100px","180px","180px","180px","200px"],bg:"#0000003D",borderRadius:{base:"10px",md:"16px"},pos:"absolute",background:`url(${e!=null&&e.banners?e==null?void 0:e.banners[0]:""}) center/cover no-repeat`,backgroundColor:"rgba(0, 0, 0, 0.5)",backgroundBlendMode:"multiply",as:"button",overflow:"hidden",children:[b&&a.jsx(x,{src:n.brandPlusIcon,w:{base:"20px",md:"30px"},h:{base:"20px",md:"30px"},pos:"absolute",bottom:"2",right:"2"}),(e==null?void 0:e.logo_white)&&a.jsx(x,{w:"130px",h:"130px",position:"relative",borderRadius:"5px",src:e==null?void 0:e.logo_white,objectFit:"contain",fallbackSrc:n.appLogoPlaceholder,fallbackStrategy:"beforeLoadOrError",_groupHover:{transform:"scale(1.2)",transition:"all .2s linear"}})]})}),a.jsx(T,{w:["120px","200px","280px","320px","400px"],noOfLines:1,mt:"12px",color:"dark",fontSize:["10px","10px","12px","12px","14px"],children:e==null?void 0:e.name})]},g())},g()))})})]})})},E=()=>({root:{w:"100%",align:"center",overflow:"hidden"},desc:{fontSize:["16px","16px","18px","18px","18px"],w:{base:"100%",md:"80%"}},seeMoreButton:{w:["25%","16%","15%","15%","10%","10%"],h:["15px","15px","8%","8%","10%","45px"],color:"dark",borderWidth:1,backgroundColor:"light",mt:"2%",fontSize:["12px","14px","14px","14px","14px","18px"]}});export{J as default};
