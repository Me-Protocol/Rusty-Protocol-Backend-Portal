import{r as o,j as e,F as t,ah as p,I as x,C as i,f,T as m,q as j}from"./index-9377d713.js";import{S as B}from"./index-cab18c4a.js";import{_ as g}from"./ReactCardFlip-d43d55b7.js";import"./index-8e585443.js";import"./ResizeObserver.es-f4289e8a.js";const v=({rtl:a,brandsItems:r})=>{const l=o.useRef(null),[n,b]=o.useState(!1),[c,w]=o.useState(0),d={dots:!1,infinite:!0,slidesToScroll:1,pauseOnHover:!0,autoplay:!0,speed:2e3,autoplaySpeed:2e3,variableWidth:!0,cssEase:"linear",rtl:a},{root:u}=S();return e.jsx(t,{...u,flexDir:"column",children:e.jsx(p,{w:"100%",children:e.jsx(B,{ref:l,...d,children:r==null?void 0:r.map((s,h)=>(s==null?void 0:s.logo)&&e.jsx(p,{mr:5,children:e.jsx(t,{children:e.jsxs(g,{isFlipped:c===h&&n,flipDirection:"horizontal",children:[e.jsx(x,{w:["100px","180px","180px","200px","220px"],h:["50px","130px","130px","160px","170px"],bg:"#BBBBBB",borderRadius:{base:"16px",md:"28px"},objectFit:"fill",src:s==null?void 0:s.logo}),e.jsx(i,{w:["100px","180px","180px","200px","220px"],h:["50px","150px","150px","180px","200px"],borderRadius:{base:"16px",md:"48px"},bg:"#BBBBBB34",children:e.jsxs(i,{bg:"dark",w:"70%",h:"20%",borderRadius:"110px",children:[e.jsx(x,{h:"50%",w:"20%",src:f.appLogoLight}),e.jsxs(m,{fontSize:["10px","10px","10px","10px","12px"],color:"light",noOfLines:1,children:[" ","/ ",s.name]})]})})]})})},j()))})})})},y=o.memo(v),S=()=>({root:{w:"100%",pt:"2vh",align:"center",pb:"2%",overflow:"hidden"}});export{y as default};