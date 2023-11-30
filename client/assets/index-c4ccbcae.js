import{r as s,_ as T,c as N,u as D,b as L,a as z,j as e,F as i,T as a,ai as R,l as F,i as O,n as B,S as W,a7 as V,C as A,bs as G,G as H,O as U,I as $,f as X,V as q,bt as J}from"./index-9a3a3312.js";import K from"./index-fd700fb7.js";import{u as Q}from"./Login-7deae772.js";import{C as x}from"./index-48807620.js";import{I as Y}from"./index.esm-a04a6177.js";import{C as Z}from"./index-147a5190.js";import{P as ee,a as se}from"./chunk-I5V4ORUK-d631e2a0.js";import"./formik.esm-f55132c4.js";const oe=s.lazy(()=>T(()=>import("./index-9a3a3312.js").then(r=>r.da),["assets/index-9a3a3312.js","assets/index-56f23032.css"])),te=s.lazy(()=>T(()=>import("./index-9a3a3312.js").then(r=>r.d7),["assets/index-9a3a3312.js","assets/index-56f23032.css"])),ae=({isOpen:r,onClose:m,userId:j})=>{N();let v=D();const[f,g]=s.useState(!1),[b,_]=s.useState(!1),[w,k]=s.useState(60),[C,y]=s.useState(""),[l,P]=s.useState(""),[d,h]=s.useState(""),[c,E]=s.useState(""),[p,I]=s.useState(!1);let n=L();const o=z(),u=()=>I(!p);async function M(){try{if(l!==d)return x(n,"Invalid password","Password do not match");if(l.length<8||d.length<8)return x(n,"Invalid password","Password must be at least 8 characters");if(c.length<4)return x(n,"Invalid otp","Please provide a valid otp code");const{payload:t,error:S}=await o(G({code:c,password:l,confirmPassword:d,userId:j}));if(S)return _(!1),x(n,"Error",S==null?void 0:S.message);t&&(Z(n,"Password changed successfully",5e3),v(`${H}/login`))}catch(t){console.log(t)}finally{_(!1)}}return e.jsx(oe,{isOpen:r,onClose:m,closeOnOverlayClick:!1,modalContentStyle:{borderRadius:"10px"},children:e.jsxs(i,{flexDir:"column",py:"5px",children:[e.jsxs(i,{justifyContent:"space-between",mb:"20px",children:[e.jsx(a,{fontSize:"20px",fontWeight:"700",children:"New Password"}),e.jsx(i,{as:"button",onClick:m,children:e.jsx(Y,{size:25})})]}),e.jsx(a,{fontSize:"16px",mb:"10px",children:"Please provide your new login details"}),e.jsx(R,{placeholder:"Password",borderColor:"rgba(0, 0, 0, 0.1)",backgroundColor:"#F5F5F5",borderRadius:"10px",py:"10px",px:"20px",variant:"unstyled",w:"100%",value:l,type:p?"text":"password",onChange:({target:t})=>{P(t.value),y("")}}),e.jsx(R,{mt:"20px",placeholder:"Confirm Password",backgroundColor:"#F5F5F5",borderRadius:"10px",py:"10px",px:"20px",variant:"unstyled",w:"100%",value:d,type:p?"text":"password",onChange:({target:t})=>{h(t.value),y("")}}),e.jsx(a,{as:F,onClick:u,alignSelf:"flex-end",pt:"0px",bg:"transparent",_hover:{bg:"transparent"},children:p?"Hide":"Show"}),e.jsx(O,{w:"100%",h:"80px",children:e.jsx(ee,{onComplete:t=>{E(t)},otp:!0,placeholder:"*",children:[1,2,3,4].map(()=>e.jsx(se,{bg:"grey",borderRadius:10,borderWidth:0,w:"30%",h:"100%",_focus:{border:"1px solid #1a1e26",outline:"none",boxShadow:"none"}},B()))})}),C&&e.jsx(a,{color:"#E50000",children:C}),b&&e.jsx(W,{size:"sm",alignSelf:"flex-end",mt:"10px"}),e.jsxs(O,{fontSize:"14px",mt:"25px",children:[e.jsx(a,{children:"Did not receive OTP?"}),e.jsx(V,{opacity:f?1:.5,onClick:()=>{f&&(k(w+1),g(!1))},children:e.jsx(te,{countFrom:w,onCountdownComplete:()=>{g(!0)}})})]}),e.jsx(A,{mt:"10px",w:"100%",bg:"black",color:"white",p:"10px",borderRadius:"8px",as:F,isLoading:b,onClick:M,_hover:{bg:"black",_loading:{bg:"black"}},children:"Confirm"})]})})},re=()=>{D();const r=z(),m=L(),{isOpen:j,onOpen:v,onClose:f}=U(),{root:g,boxLeft:b,boxLogin:_,leftImg:w,loginColumn:k,boxRegister:C,head:y,desc:l,registerColumn:P}=Q();s.useState("");const[d,h]=s.useState(!1),[c,E]=s.useState(""),[p,I]=s.useState("");async function n(){if(!c.includes("@"))return x(m,"Invalid email address","Please enter a valid email address");try{h(!0);const{payload:o,error:u}=await r(J({identifier:c}));if(u)return h(!1),x(m,"Error",u==null?void 0:u.message);o&&(I(o==null?void 0:o.userId),v())}catch(o){console.log(o,"SEND_RESET_CODE_ERR")}finally{h(!1)}}return e.jsxs(e.Fragment,{children:[e.jsx(i,{pos:"absolute",children:e.jsx(K,{pos:"fixed"})}),e.jsxs(i,{...g,children:[e.jsx(i,{...b,children:e.jsx($,{src:X.AuthImage,alt:"Me Protocol",...w})}),e.jsx(i,{pt:["4rem","12rem"],px:"15px",...C,children:e.jsxs(q,{...P,children:[e.jsx(a,{fontSize:["20px","26px"],fontWeight:"700",children:"Forgot Password?"}),e.jsx(a,{opacity:.5,fontSize:["16px","20px"],children:"Provide your login email below"}),e.jsx(R,{mt:"20px",placeholder:"Enter your email",backgroundColor:"#F5F5F5",borderRadius:"10px",py:"10px",px:"20px",variant:"unstyled",w:"100%",value:c,onChange:({target:o})=>{E(o.value)}}),e.jsx(a,{...l,children:"A reset link will be sent to your email."}),e.jsx(A,{mt:"10px",w:"100%",bg:"black",color:"white",p:"10px",borderRadius:"8px",inputMode:"email",as:F,isLoading:d,onClick:n,_hover:{bg:"black",_loading:{bg:"black"}},children:"Continue"})]})}),e.jsx(ae,{isOpen:j,onClose:f,userId:p})]})]})},me=re;export{me as default};
