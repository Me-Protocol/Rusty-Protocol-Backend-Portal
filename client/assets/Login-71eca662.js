import{r as s,_ as d,c as V,u as B,o as A,a as $,d as w,e as g,G as a,j as e,m as M,S as r,F as l,p as O,V as G,H,L as u,B as U,D as S,T as c,l as q,q as N,t as W}from"./index-cb6f3678.js";import{F as X}from"./formik.esm-af298c3b.js";const J=s.lazy(()=>d(()=>import("./index-8b427caa.js"),["assets/index-8b427caa.js","assets/index-cb6f3678.js","assets/index-ed5220eb.css"])),K=s.lazy(()=>d(()=>import("./index-cb6f3678.js").then(o=>o.cV),["assets/index-cb6f3678.js","assets/index-ed5220eb.css"])),Q=s.lazy(()=>d(()=>import("./index-7562f712.js"),["assets/index-7562f712.js","assets/index-cb6f3678.js","assets/index-ed5220eb.css"])),_=s.lazy(()=>d(()=>import("./index-c368e9ab.js"),["assets/index-c368e9ab.js","assets/index-cb6f3678.js","assets/index-ed5220eb.css","assets/formik.esm-af298c3b.js"])),Y=()=>{V();let o=B();const L=A(),n=$(),[y,ee]=s.useState(!1),{isLoading:E,error:se,token:f}=w(t=>t.authReducer);w(t=>t.userReducer);const[m,v]=s.useState(" "),[x,C]=s.useState(!1),{root:k,boxLeft:oe,boxLogin:z,leftImg:te,loginColumn:R,head:D,desc:p,basedText:I}=Z();s.useEffect(()=>{n(g()),f&&(n(g()),o(`${a}/dashboard`))},[n,f,o]);const P=async({email:t,password:T},ne)=>{var j;if(!L)return;const{payload:b,error:i}=await n(N({identifier:t,password:T}));if(i)return v(i==null?void 0:i.message);if(b){const{payload:h}=await n(W({token:b}));(j=h==null?void 0:h.customer)!=null&&j.walletAddress?o(`${a}/dashboard`):o(`${a}/syncRewards`)}},F=()=>C(!x);return e.jsx(e.Fragment,{children:e.jsxs(M,{children:[e.jsx(s.Suspense,{fallback:e.jsx(r,{size:"sm"}),children:e.jsx(J,{pos:"fixed"})}),e.jsx(l,{...k,children:e.jsx(l,{...z,children:e.jsx(X,{initialValues:{email:"",password:""},validationSchema:O,onSubmit:P,children:t=>e.jsxs(G,{as:"form",...R,onSubmit:t.handleSubmit,onChange:()=>n(g()),children:[e.jsx(H,{...D,pb:2,children:"Let’s Login"}),e.jsx(l,{w:"100%",justify:"space-between",children:e.jsx(s.Suspense,{fallback:e.jsx(r,{size:"sm"}),children:e.jsx(u,{href:`${U}/user/google`,w:"full",children:e.jsx(K,{isLoading:y,name:"Sign in with Google",onClick:()=>{},rest:{w:"100%"}})})})}),e.jsxs(l,{align:"center",w:"100%",justify:"space-between",children:[e.jsx(S,{w:"45%",color:"#ECECEC"}),e.jsx(c,{color:"#999999",fontSize:{base:"12px",md:"20px"},children:"or"}),e.jsx(S,{w:"45%",color:"#ECECEC"})]}),e.jsxs(s.Suspense,{fallback:e.jsx(r,{size:"sm"}),children:[e.jsx(_,{name:"email",type:"email",placeholder:"your@email.com"}),e.jsx(_,{name:"password",type:x?"text":"password",placeholder:"Password"})]}),e.jsx(c,{as:q,onClick:F,alignSelf:"flex-end",...I,bg:"transparent",_hover:{bg:"transparent"},p:"0px",fontSize:"14px",children:x?"Hide":"Show"}),m&&e.jsx(c,{...p,color:"red",children:m}),e.jsx(u,{onClick:()=>o(`${a}/password_reset`),...p,pb:3,textDecoration:"underline",w:"30%",children:"Forgot Password"}),e.jsx(s.Suspense,{fallback:e.jsx(r,{size:"sm"}),children:e.jsx(Q,{isLoading:E,name:"Login"})}),e.jsxs(c,{...p,pt:"10px",children:["Don’t have an account yet?",e.jsxs(u,{onClick:()=>{o(`${a}/register`)},textDecoration:"underline",children:[" ","Create one here."]})]})]})})})})]})})},re=Y,Z=()=>({root:{h:"100vh",align:"center",justify:"center",bg:"light"},boxLeft:{display:["none","none","none","flex","flex"],bg:"light",fontSize:40,h:"100%",w:"40vw"},boxLogin:{fontSize:40,h:"100%",w:["100%","100%","80%","50%","50%"],overflow:"hidden"},boxRegister:{fontSize:40,h:"100vh",w:["100%","100%","80%","80%","70%"],justify:"center"},leftImg:{h:"100%",w:"100%"},loginColumn:{bg:"light",w:"100%",align:"flex-start",pt:{base:"5vh",md:"10vh"},px:{base:"15px"},justifySelf:"center"},registerColumn:{bg:"light",w:["100%","100%","100%","80%","70%"],align:"flex-start",pt:{base:"5vh",md:"10vh"},px:{base:"15px"},justifySelf:"center"},head:{fontSize:{base:"18px",md:"25px"},pt:"20px"},desc:{fontSize:{base:"15px",md:"17px"},w:{base:"100%",md:"85%"}},basedText:{pt:"30px",fontSize:{base:"18px",md:"20px"}},checkBoxRoot:{py:"20px"},countrySelect:{w:{base:"100%",md:"100%"},bg:"grey",color:"dark",borderColor:"light",borderWidth:"1px",align:"center"}});export{re as L,Z as u};
