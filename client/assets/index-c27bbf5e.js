import{u as v,a as y,b as E,c as I,d as R,r as n,e as c,j as e,F as t,I as S,f as V,C as L,S as C,V as M,H as T,T as l,g as A,B}from"./index-9a3a3312.js";import _ from"./index-fd700fb7.js";import{u as w}from"./Login-7deae772.js";import{_ as D}from"./timer-a352bffc.js";import"./formik.esm-f55132c4.js";import"./index.esm-a04a6177.js";import"./chunk-I5V4ORUK-d631e2a0.js";const F=()=>{v();const o=y(),i=E(),{state:d}=I(),{root:u,boxLeft:f,boxLogin:m,leftImg:p,loginColumn:x,head:g,desc:a}=w(),{token:P,registerResponse:r,verificationError:h,verificationErrorMsg:j,verificationLoading:k,verificationResponse:$}=R(s=>s.authReducer);n.useEffect(()=>{if(!d){if(h){const s="error-toast";i.isActive(s)||(i({id:s,position:"top",title:`${j}`,description:"Please click on resend to get a valid verification link.",status:"error",duration:9e3,isClosable:!1}),o(c()))}o(c())}},[]),n.useEffect(()=>{},[]);async function b(){try{const{data:s}=await A.post(`${B}/users/email`,{email:r.email,userId:r.userId});console.log(s,"ResntLink"),s&&i({position:"top",title:"Verification link sent",description:"Please check your email for the verification link.",status:"success",duration:4e3,isClosable:!0})}catch(s){console.log(s,"SendVerificationMailErr")}}return e.jsxs(e.Fragment,{children:[e.jsx(_,{}),e.jsxs(t,{...u,children:[e.jsx(t,{...f,children:e.jsx(S,{src:V.AuthImage,alt:"Me Protocol",...p})}),e.jsxs(t,{px:"15px",py:"3rem",...m,children:[k&&e.jsx(L,{pos:"absolute",w:"60%",h:"100%",bg:"rgba(153,153,153,0.37)",children:e.jsx(C,{size:"xl"})}),e.jsxs(M,{...x,children:[e.jsx(T,{...g,pb:2,children:"Verify your email address"}),e.jsx(l,{...a,children:"An email containing the verification link has been sent to your email, please go to your email and click on the link to verify your account."}),e.jsxs(l,{flexDir:"row",...a,textDecoration:"underline",children:["Link didn't arrive? Resend in"," ",e.jsx(D,{minutes:1,seconds:1,text:" ",ButtonText:"Resend",resend:b,background:"black"})]})]})]})]})]})},K=F;export{K as default};