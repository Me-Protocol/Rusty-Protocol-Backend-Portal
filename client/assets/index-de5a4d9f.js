import{r as i,u as l,d as u,j as s,m,F as p,G as e,I as x,f as d}from"./index-084f02dc.js";const g=({pos:a})=>{let t=l();const{token:o}=u(c=>c.authReducer),{styles:n,img:r}=I();return s.jsx(m,{children:s.jsx(p,{as:"button",onClick:()=>{t(o?`${e}/dashboard`:`${e}/`)},position:a||"absolute",...n,children:s.jsx(x,{"data-testid":"logo-1",src:d.appLogo,...r})})})},j=i.memo(g),I=()=>({styles:{w:"100%",h:"50px",justifyContent:"flex-start"},img:{mt:5,h:"50px"}});export{j as default};