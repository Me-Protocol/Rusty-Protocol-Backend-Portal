import{r as u,g as z,j as p,F as o,m as C,I as a,f as i,aW as I,X as W,aX as t,L as n,q as s,H as D,Y as y,T as G}from"./index-22a5f3d5.js";import L from"./index-ceaee24d.js";import"./countries-020c4914.js";import"./chunk-3RSXBRAN-59d5bafe.js";const R=()=>{var c,d,h,m,g,f,j;const{root:b,copyrightText:k,countrySelect:S,linksStyle:r}=v(),[w,l]=u.useState("United States of America");u.useEffect(()=>{T()},[]);const T=()=>{z.get("https://ipapi.co/json/").then(e=>{let x=e.data;l(x.country_name)}).catch(e=>{console.log(e)})};return p.jsx(o,{...b,flexDir:"column",children:p.jsxs(C,{children:[p.jsxs(o,{minH:330,direction:{base:"column",md:"row"},justifyContent:"space-between",children:[p.jsxs(o,{w:[void 0,"25%"],flexDir:"column",children:[p.jsx(a,{src:i.appLogoLight,width:{base:"60px",md:"80px"}}),p.jsx(L,{value:w,onChange:({target:e})=>{l(e.value)},...S}),p.jsx(o,{w:"50%",h:"50px",justify:"space-between",children:(c=I)==null?void 0:c.map(e=>p.jsx(W,{as:"a",target:"_blank",rel:"noopener noreferrer",href:e.link,mr:"5px",children:p.jsx(a,{src:e.icon,w:"30px",h:"30px"})},e.id))})]}),p.jsxs(o,{w:["auto","55%"],px:"2%",justify:"space-between",children:[p.jsxs(o,{flexDir:"column",children:[(d=t[0].links)==null?void 0:d.map((e,x)=>p.jsx(n,{...r,fontSize:x===0?["16px","16px","16px","16px","16px"]:["14px","14px","14px","14px","16px"],fontWeight:x===0?700:200,marginTop:x===0?"10px":["6px","0px"],color:x===0?"light":"darkGrey",children:e},s())),(h=t[1].links)==null?void 0:h.map((e,x)=>p.jsx(n,{...r,fontSize:x===0?["16px","16px","16px","16px","16px"]:["14px","14px","14px","14px","16px"],fontWeight:x===0?700:200,marginTop:x===0?"10px":["6px","0px"],color:x===0?"light":"darkGrey",children:e},s()))]}),p.jsxs(o,{flexDir:"column",children:[(m=t[2].links)==null?void 0:m.map((e,x)=>p.jsx(n,{...r,fontSize:x===0?["16px","16px","16px","16px","16px"]:["14px","14px","14px","14px","16px"],fontWeight:x===0?700:200,marginTop:x===0?"10px":["6px","0px"],color:x===0?"light":"darkGrey",children:e},s())),(g=t[3].links)==null?void 0:g.map((e,x)=>p.jsx(n,{...r,fontSize:x===0?["16px","16px","16px","16px","16px"]:["14px","14px","14px","14px","16px"],fontWeight:x===0?700:200,marginTop:x===0?"10px":["6px","0px"],color:x===0?"light":"darkGrey",children:e},s()))]}),p.jsxs(o,{flexDir:"column",children:[(f=t[4].links)==null?void 0:f.map((e,x)=>p.jsx(n,{...r,fontSize:x===0?["16px","16px","16px","16px","16px"]:["14px","14px","14px","14px","16px"],fontWeight:x===0?700:200,marginTop:x===0?"10px":["6px","0px"],color:x===0?"light":"darkGrey",children:e},s())),(j=t[5].links)==null?void 0:j.map((e,x)=>p.jsx(n,{...r,fontSize:x===0?["16px","16px","16px","16px","16px"]:["14px","14px","14px","14px","16px"],fontWeight:x===0?700:200,marginTop:x===0?"10px":["6px","0px"],color:x===0?"light":"darkGrey",children:e},s()))]})]}),p.jsxs(o,{mt:{base:"10",md:"0"},gap:{base:"6px",md:"0"},align:"flex-end",flexDir:"column",children:[p.jsx(D,{...r,fontSize:["14px","16px","16px","16px","16px"],color:"light",w:"100%",mb:{base:2,md:0},children:"Download"}),p.jsxs(p.Fragment,{children:[p.jsx(y,{name:"App Store",rest:{w:{base:"100%",md:"100%"},borderColor:"light",borderWidth:1,fontSize:["10px","12px","14px","14px","16px"],mt:"5px"},icon:p.jsx(a,{src:i.appleIcon,h:"18px",w:"18px",mr:"5px"})}),p.jsx(y,{name:"Play Store",rest:{w:{base:"100%",md:"100%"},borderColor:"light",borderWidth:1,fontSize:["10px","12px","14px","14px","16px"],mt:"5px"},icon:p.jsx(a,{src:i.playstoreIcon,h:"18px",w:"18px",mr:"5px"})})]})]})]}),p.jsx(G,{textAlign:"center",my:{base:"6"},...k,children:"Copyright 2023 My AI Inc. 8 The Green. Suite 11901. Dover, DE 19901"})]})})},v=()=>({root:{w:"100%",backgroundColor:"dark",minH:"450px",borderTopLeftRadius:20,borderTopRightRadius:20,mt:10,pt:10},copyrightText:{color:"gray",fontSize:["12px","16px","16px","14px","16px"]},countrySelect:{w:{base:"100%",md:"60%"},bg:"dark",color:"gray",borderColor:"light",borderWidth:"1px",my:"30px"},linksStyle:{color:"darkGrey"}});export{R as default};
