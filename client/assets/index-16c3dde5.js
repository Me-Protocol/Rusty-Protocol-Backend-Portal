import{u as T,a as V,c as A,r as t,j as e,F as i,I as D,f as H,h as U,H as _,T as d,i as G,n as W,L as N,g as y,B as L,s as O,k as X,G as P}from"./index-7489b734.js";import Y from"./index-9a6085f5.js";import q from"./index-9cbc3b7a.js";import{u as z}from"./Login-3e144e2e.js";import{P as J,a as K}from"./chunk-I5V4ORUK-009dc3d0.js";import"./formik.esm-c5c7c0a7.js";const Q=()=>{let l=T();const h=V(),{state:o}=A(),{root:w,boxLeft:C,boxLogin:S,leftImg:E,loginColumn:F,head:$,desc:r}=z();t.useState(!0);const[a,u]=t.useState(""),[B,x]=t.useState(!1),[g,p]=t.useState("");t.useEffect(()=>{},[]);async function M(){var n,f,m,j,I,k,v,b;if(!(a.length<5)){x(!0);try{const{data:s}=await y.post(`${L}/users/phone/verify`,{userId:(f=(n=o==null?void 0:o.state)==null?void 0:n.user)==null?void 0:f.userId,phone:o==null?void 0:o.value,phoneCode:a});if((m=s==null?void 0:s.isVerified)!=null&&m.token&&s){h(O(s==null?void 0:s.isVerified)),h(X({token:(j=s==null?void 0:s.isVerified)==null?void 0:j.token}));let R={method:"get",url:`${L}/pointregistry`,headers:{"x-access-token":`${(I=s==null?void 0:s.isVerified)==null?void 0:I.token}`}};const{data:c}=await y(R);((k=c==null?void 0:c.userPoints)==null?void 0:k.length)<1?l(`${P}/syncRewards`):l(`${P}/dashboard`)}}catch(s){p((b=(v=s==null?void 0:s.response)==null?void 0:v.data)==null?void 0:b.error)}finally{x(!1),u("")}}}return e.jsxs(e.Fragment,{children:[e.jsx(q,{}),e.jsxs(i,{...w,children:[e.jsx(i,{...C,children:e.jsx(D,{src:H.AuthImage,alt:"Me Protocol",...E})}),e.jsx(i,{...S,children:e.jsxs(U,{...F,w:{base:"70vw",md:"40vw"},children:[e.jsx(_,{...$,pb:2,children:"We sent you a verification code"}),e.jsx(d,{...r,children:"You have to give it back, though."}),e.jsx(G,{w:"100%",h:"60px",children:e.jsx(J,{onComplete:n=>{u(n),p("")},otp:!0,placeholder:"*",children:[1,2,3,4,5,6].map(()=>e.jsx(K,{bg:"grey",borderRadius:10,borderWidth:0,w:"14%",h:"100%"},W()))})}),g&&e.jsx(d,{...r,color:"red",children:g}),e.jsx(i,{w:"35vMax",children:e.jsx(Y,{isLoading:B,onClick:M,isDisabled:a.length<5,name:"That's the code"})}),e.jsxs(d,{...r,pt:"10px",children:["Didn’t receive the code?"," ",e.jsxs(N,{href:"#",textDecoration:"underline",children:[" ","Send it again."]})]})]})})]})]})},ie=Q;export{ie as default};