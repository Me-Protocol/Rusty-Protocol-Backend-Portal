import{r as p,u as C,j as o,m as y,F as t,I as x,f as l,H as I,a7 as n,E as A,q as c,G as B,C as d}from"./index-9a3a3312.js";import{S as E}from"./index-ceb9cbc1.js";import{I as L,a as _}from"./index.esm-2b5ddb28.js";import{B as R}from"./svg-7d13b208.js";import"./index-187faf92.js";import"./ResizeObserver.es-f4289e8a.js";const F=({carouselTitle:g,seeMoreClick:h,showIcon:b,items:a})=>{const s=p.useRef(null),[N,u]=p.useState(0);let m=C();const f={dots:!1,infinite:!0,speed:500,slidesToScroll:1,variableWidth:!0},{root:w,desc:j,seeMoreButton:z,nameStyles:v}=H();function k(){var r;(r=s==null?void 0:s.current)==null||r.slickPrev()}function S(){var r;(r=s==null?void 0:s.current)==null||r.slickNext()}return o.jsx(y,{children:o.jsxs(t,{...w,flexDir:"column",children:[o.jsxs(t,{w:"100%",pt:"2vh",justify:"space-between",children:[o.jsxs(t,{flexDir:"row",align:"center",w:"60%",children:[b&&o.jsx(x,{src:l.appLogo,w:{base:"40px",md:"50px"},h:{base:"40px",md:"50px"},mr:"1%"}),o.jsx(I,{...j,children:g})]}),o.jsx(t,{justify:"space-between",w:["60px","4vw"],children:[{id:"1",icon:L,fn:k},{id:"2",icon:_,fn:S}].map((r,i)=>o.jsx(n,{onClick:r.fn,children:o.jsx(A,{onClick:()=>u(i),as:r.icon,w:"25px",h:"25px",color:"rgba(153,153,153,0.66)",_hover:{color:"black"}})},c()))})]}),o.jsxs(n,{w:"100%",children:[o.jsx(E,{ref:s,...f,children:a==null?void 0:a.map((r,i)=>{var e;return((e=r==null?void 0:r.banners)==null?void 0:e.length)>0&&o.jsx(n,{mr:5,role:"group",children:i===0?o.jsx(R,{img:r!=null&&r.banners?r==null?void 0:r.banners[0]:"https://img.freepik.com/free-vector/stylish-glowing-digital-red-lines-banner_1017-23964.jpg"}):o.jsxs(n,{as:"button",onClick:()=>m(`${B}/dashboard/shop/${r==null?void 0:r.id}`,{state:{id:r==null?void 0:r.id,slug:r==null?void 0:r.slug,brandName:r==null?void 0:r.name}}),children:[o.jsx(n,{pos:"absolute",borderRadius:{base:"8px",md:"16px"},w:["220px","200px","240px","270px","320px"],h:["200px","180px","180px","200px","220px"],bg:"#0000000E"}),o.jsx(d,{w:["220px","200px","240px","270px","320px"],h:["200px","180px","180px","200px","220px"],borderRadius:{base:"10px",md:"16px"},background:`url(${r!=null&&r.banners?r==null?void 0:r.banners[0]:"https://img.freepik.com/free-vector/stylish-glowing-digital-red-lines-banner_1017-23964.jpg"}) center/cover no-repeat`,as:"button",overflow:"hidden",backgroundColor:"grey",children:(r==null?void 0:r.logo_white)&&o.jsx(x,{w:"130px",h:"130px",position:"relative",borderRadius:"5px",src:r==null?void 0:r.logo_white,objectFit:"contain",fallbackSrc:l.appLogoPlaceholder,fallbackStrategy:"onError",_groupHover:{transform:"scale(1.2)",transition:"all .2s linear"}})})]})},c())})}),o.jsx(d,{bg:"dark",color:"white",px:"15px",py:"5px",as:"button",mt:"10px",...v,onClick:h,children:"SEE ALL BRANDS"})]})]})})},q=p.memo(F),H=()=>({root:{w:"100%",pt:"2vh",align:"center",pb:"2%",overflow:"hidden"},desc:{pb:"10px",fontSize:["18px","20px","20px","20px","22px"],w:{base:"100%",md:"80%"}},nameStyles:{fontSize:["16px","16px"]},seeMoreButton:{w:["25%","16%","15%","15%","10%","10%"],h:["15px","15px","8%","8%","10%","45px"],color:"dark",borderWidth:1,backgroundColor:"light",mt:"2%",fontSize:["8px","10px","10px","12px","14px","15px"],lineHeight:"50px"}});export{q as default};