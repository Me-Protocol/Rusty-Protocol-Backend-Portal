import{r as u,g as I,j as p,F as r,m as T,I as i,f as a,aM as C,ak as W,aN as t,L as n,y as s,H as G,a3 as y,T as D}from"./index-4302fa73.js";import L from"./index-4fa2e507.js";import"./countries-020c4914.js";import"./chunk-3RSXBRAN-6b0fc4b3.js";const F=()=>{var c,h,d,g,m,f,j;const{root:S,copyrightText:k,countrySelect:b,linksStyle:o}=v(),[w,l]=u.useState("United States of America");u.useEffect(()=>{z()},[]);const z=()=>{I.get("https://ipapi.co/json/").then(e=>{let x=e.data;l(x.country_name)}).catch(e=>{console.log(e)})};return p.jsx(r,{...S,flexDir:"column",children:p.jsxs(T,{children:[p.jsxs(r,{height:330,justifyContent:"space-between",children:[p.jsxs(r,{w:"25%",flexDir:"column",children:[p.jsx(i,{src:a.appLogoLight,width:"80px",h:"44px"}),p.jsx(L,{value:w,onChange:({target:e})=>{l(e.value)},...b}),p.jsx(r,{w:"50%",h:"50px",justify:"space-between",children:(c=C)==null?void 0:c.map(e=>p.jsx(W,{as:"a",href:e.link,mr:"5px",children:p.jsx(i,{src:e.icon,w:"30px",h:"30px"})},e.id))})]}),p.jsxs(r,{w:"55%",px:"2%",justify:"space-between",children:[p.jsxs(r,{flexDir:"column",children:[(h=t[0].links)==null?void 0:h.map((e,x)=>p.jsx(n,{...o,fontSize:x===0?["16px","16px","16px","16px","16px"]:["14px","14px","14px","14px","16px"],fontWeight:x===0?700:200,marginTop:x===0?"10px":"0px",color:x===0?"light":"darkGrey",children:e},s())),(d=t[1].links)==null?void 0:d.map((e,x)=>p.jsx(n,{...o,fontSize:x===0?["16px","16px","16px","16px","16px"]:["14px","14px","14px","14px","16px"],fontWeight:x===0?700:200,marginTop:x===0?"10px":"0px",color:x===0?"light":"darkGrey",children:e},s()))]}),p.jsxs(r,{flexDir:"column",children:[(g=t[2].links)==null?void 0:g.map((e,x)=>p.jsx(n,{...o,fontSize:x===0?["16px","16px","16px","16px","16px"]:["14px","14px","14px","14px","16px"],fontWeight:x===0?700:200,marginTop:x===0?"10px":"0px",color:x===0?"light":"darkGrey",children:e},s())),(m=t[3].links)==null?void 0:m.map((e,x)=>p.jsx(n,{...o,fontSize:x===0?["16px","16px","16px","16px","16px"]:["14px","14px","14px","14px","16px"],fontWeight:x===0?700:200,marginTop:x===0?"10px":"0px",color:x===0?"light":"darkGrey",children:e},s()))]}),p.jsxs(r,{flexDir:"column",children:[(f=t[4].links)==null?void 0:f.map((e,x)=>p.jsx(n,{...o,fontSize:x===0?["16px","16px","16px","16px","16px"]:["14px","14px","14px","14px","16px"],fontWeight:x===0?700:200,marginTop:x===0?"10px":"0px",color:x===0?"light":"darkGrey",children:e},s())),(j=t[5].links)==null?void 0:j.map((e,x)=>p.jsx(n,{...o,fontSize:x===0?["16px","16px","16px","16px","16px"]:["14px","14px","14px","14px","16px"],fontWeight:x===0?700:200,marginTop:x===0?"10px":"0px",color:x===0?"light":"darkGrey",children:e},s()))]})]}),p.jsxs(r,{w:"20%",align:"flex-end",flexDir:"column",children:[p.jsx(G,{...o,fontSize:["14px","16px","16px","16px","16px"],color:"light",children:"Download"}),p.jsx(y,{name:"App Store",rest:{w:{base:"100%",md:"70%"},borderColor:"light",borderWidth:1,fontSize:["10px","12px","14px","14px","16px"],mt:"5px"},icon:p.jsx(i,{src:a.appleIcon,h:"18px",w:"18px",mr:"5px"})}),p.jsx(y,{name:"Play Store",rest:{w:{base:"100%",md:"70%"},borderColor:"light",borderWidth:1,fontSize:["10px","12px","14px","14px","16px"],mt:"5px"},icon:p.jsx(i,{src:a.playstoreIcon,h:"18px",w:"18px",mr:"5px"})})]})]}),p.jsx(D,{...k,children:"Copyright 2023 MyAI Inc. Headquarters: Zurich, Switzerland. All rights reserved. MyAI Inc (publ). Sveavägen 46, 111 34 Switzerland. Organization number: 556369172-03971"})]})})},v=()=>({root:{w:"100%",backgroundColor:"dark",height:"450px",borderTopLeftRadius:20,borderTopRightRadius:20,mt:10,pt:10},copyrightText:{color:"light",fontSize:["14px","16px","16px","14px","16px"]},countrySelect:{w:{base:"100%",md:"60%"},bg:"dark",color:"gray",borderColor:"light",borderWidth:"1px",my:"30px"},linksStyle:{color:"darkGrey"}});export{F as default};
