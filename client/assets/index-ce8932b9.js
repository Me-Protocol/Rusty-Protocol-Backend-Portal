import{u as m,a as x,d as f,r as g,j as e,F as s,I as h,f as j,V as p,H as k,T as o}from"./index-7489b734.js";import b from"./index-9cbc3b7a.js";import{u as y}from"./Login-3e144e2e.js";import{_ as I}from"./timer-975101d3.js";import"./formik.esm-c5c7c0a7.js";const V=()=>{m(),x();const{root:i,boxLeft:a,boxLogin:n,leftImg:r,loginColumn:c,head:l,desc:t}=y();f(u=>u.authReducer),g.useState("566");const d=()=>{console.log("button clicked")};return e.jsxs(e.Fragment,{children:[e.jsx(b,{}),e.jsxs(s,{...i,children:[e.jsx(s,{...a,children:e.jsx(h,{src:j.AuthImage,alt:"Me Protocol",...r})}),e.jsx(s,{...n,children:e.jsxs(p,{...c,children:[e.jsx(k,{...l,pb:2,children:"Verify your email address"}),e.jsx(o,{...t,children:"An email containing the verification link has been sent to your email, please go to your email and click on the link to verify your account."}),e.jsxs(o,{flexDir:"row",...t,textDecoration:"underline",children:["My link didn't arrive? Resend link in ",e.jsx(I,{minutes:1,seconds:1,text:" ",ButtonText:"Resend",resend:d,background:"black"})]})]})})]})]})},T=V;export{T as default};