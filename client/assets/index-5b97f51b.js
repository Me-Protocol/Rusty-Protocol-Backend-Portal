import{r as s,u as $,b as H,a as W,j as e,F as t,T as a,i as V,n as te,S as n,a7 as J,bm as oe,G as O,bn as ae,W as D,_ as j,bo as ne,O as re,d as ie,bp as le,g as ce,I as de,f as ue,bq as xe,V as pe,e as me,L as R,B as he,al as N,H as G,l as fe,br as je}from"./index-dcfd6306.js";import{N as ge,a as be,u as Se}from"./Login-9f87ac76.js";import{F as ye}from"./formik.esm-1438a09a.js";import{I as we}from"./index.esm-f36e4ff6.js";import{P as Ce,a as _e}from"./chunk-I5V4ORUK-f362d1b4.js";import{C as Ee}from"./chunk-CWVAJCXJ-d5f8a7de.js";import"./chunk-7D6N5TE5-016c361b.js";const ve=({isOpen:i,onClose:d,token:g})=>{const[l,b]=s.useState(!1),[v,x]=s.useState(!1),[k,P]=s.useState(60),[S,p]=s.useState("");let z=$(),u=H();const y=W();async function w(r){try{x(!0);const{payload:c,error:C}=await y(oe({code:r,token:g}));if(C)return p(C.message);if(c){d();const _="error-toast";u.isActive(_)||u({id:_,position:"top",title:"Account Created Successfully",description:"Your account was created using email and password, please enter your email and password to continue",status:"success",duration:9e3,isClosable:!1}),z(`${O}/login`)}}catch{}finally{x(!1)}}async function L(){try{x(!0);const{payload:r,error:c}=await y(ae({token:g}));if(c)return p(c.message);r&&D(u,"Code resent successfully",9e3,"bottom-left")}catch{}finally{x(!1)}}return e.jsx(ge,{isOpen:i,onClose:d,closeOnOverlayClick:!1,modalContentStyle:{borderRadius:"10px"},children:e.jsxs(t,{flexDir:"column",py:"5px",children:[e.jsx(t,{alignSelf:"flex-end",as:"button",onClick:d,mb:"20px",children:e.jsx(we,{size:20})}),e.jsx(a,{fontSize:"14px",mb:"10px",children:"Please provide the OTP sent to your Email"}),e.jsx(V,{w:"100%",h:"80px",children:e.jsx(Ce,{onComplete:r=>{p(""),w(r)},otp:!0,placeholder:"*",children:[1,2,3,4].map(()=>e.jsx(_e,{bg:"grey",borderRadius:10,borderWidth:0,w:"30%",h:"100%"},te()))})}),S&&e.jsx(a,{color:"red",children:S}),v&&e.jsx(n,{size:"sm",alignSelf:"flex-end",mt:"10px"}),e.jsxs(V,{fontSize:"14px",mt:"25px",children:[e.jsx(a,{children:"Did not receive OTP?"}),e.jsx(J,{opacity:l?1:.5,onClick:()=>{l&&(L(),P(60),b(!1))},children:e.jsx(be,{countFrom:k,onCountdownComplete:()=>{b(!0)}})})]})]})})},ke=s.lazy(()=>j(()=>import("./index-be748add.js"),["assets/index-be748add.js","assets/index-dcfd6306.js","assets/index-56f23032.css"])),Pe=s.lazy(()=>j(()=>import("./index-dcfd6306.js").then(i=>i.de),["assets/index-dcfd6306.js","assets/index-56f23032.css"])),f=s.lazy(()=>j(()=>import("./index-4207a9a5.js"),["assets/index-4207a9a5.js","assets/index-dcfd6306.js","assets/index-56f23032.css","assets/formik.esm-1438a09a.js"])),ze=s.lazy(()=>j(()=>import("./index-f6c7744e.js"),["assets/index-f6c7744e.js","assets/index-dcfd6306.js","assets/index-56f23032.css","assets/countries-020c4914.js","assets/chunk-3RSXBRAN-78614f9f.js"])),Le=s.lazy(()=>j(()=>import("./index-8ef13738.js"),["assets/index-8ef13738.js","assets/index-dcfd6306.js","assets/index-56f23032.css"])),Ie=()=>{const i=W();let d=$();const g=ne(),[l,b]=s.useState(!1),[v,x]=s.useState(!1),{isOpen:k,onClose:P,onOpen:S}=re(),[p,z]=s.useState(""),[u,y]=s.useState(""),w=H(),L=()=>b(!l),{token:r,registerLoading:c}=ie(o=>o.authReducer),{root:C,boxLeft:_,boxRegister:U,leftImg:X,registerColumn:Y,head:q,desc:E,basedText:I,checkBoxRoot:K,countrySelect:Q}=Se();s.useEffect(()=>{i(le()),Z(),r&&d(`${O}/dashboard`)},[]);const[T,A]=s.useState("United States of America"),Z=()=>{ce.get("https://ipapi.co/json/").then(o=>{let m=o.data;A(m.country_name)}).catch(o=>{console.log(o)})},ee=async({email:o,password:m,firstname:F,lastname:M,country:se})=>{if(!g)return;if(!se){D(w,"Please select a country");return}if(F.length<2||M.length<2){D(w,"Names must be at least 2 characters");return}const{payload:B,error:h}=await i(je({firstname:F,lastname:M,email:o,password:m}));if(h)return console.log(h),y(h==null?void 0:h.message);B&&(z(B),S())};return e.jsxs(e.Fragment,{children:[e.jsx(s.Suspense,{fallback:e.jsx(n,{size:"sm"}),children:e.jsx(t,{pos:"absolute",children:e.jsx(Le,{pos:"fixed"})})}),e.jsxs(t,{...C,children:[e.jsx(t,{..._,children:e.jsx(de,{src:ue.AuthImage,alt:"Me Protocol",...X})}),e.jsx(t,{px:"15px",width:"100%",...U,overflowX:"hidden",children:e.jsx(ye,{initialValues:{email:"",password:"",confirm:"",firstname:"",lastname:""},validationSchema:xe,onSubmit:o=>ee({...o,country:T}),children:o=>e.jsxs(pe,{as:"form",...Y,onChange:()=>i(me()),onSubmit:o.handleSubmit,children:[e.jsx(a,{...q,children:"Let’s get started."}),e.jsx(t,{w:"100%",justify:"space-between",children:e.jsx(s.Suspense,{fallback:e.jsx(n,{size:"sm"}),children:e.jsx(R,{href:`${he}/user/google`,w:"full",children:e.jsx(Pe,{isLoading:v,name:"Sign up with Google",rest:{w:"100%"}})})})}),e.jsxs(t,{align:"center",w:"100%",justify:"space-between",children:[e.jsx(N,{w:"45%",color:"#ECECEC"}),e.jsx(a,{color:"#999999",fontSize:{base:"12px",md:"20px"},children:"or"}),e.jsx(N,{w:"45%",color:"#ECECEC"})]}),e.jsx(a,{...E,children:"Enter a few details to join the ME community"}),e.jsxs(t,{flexDir:{base:"column",md:"row"},justifyContent:"space-between",w:"100%",children:[e.jsx(t,{w:{base:"100%",md:"49%"},children:e.jsx(s.Suspense,{fallback:e.jsx(n,{size:"sm"}),children:e.jsx(f,{name:"firstname",placeholder:"First Name"})})}),e.jsx(t,{w:{base:"100%",md:"49%"},children:e.jsx(s.Suspense,{fallback:e.jsx(n,{size:"sm"}),children:e.jsx(f,{name:"lastname",placeholder:"Last Name"})})})]}),e.jsxs(s.Suspense,{fallback:e.jsx(n,{size:"sm"}),children:[e.jsx(f,{name:"email",type:"email",placeholder:"your@email.com"}),u&&e.jsx(a,{fontSize:"12px",color:"red",children:u})]}),e.jsx(G,{...I,children:"Get yourself a password."}),e.jsx(a,{...E,children:"Passwords must include a symbol or number and have at least 8 characters."}),e.jsxs(s.Suspense,{fallback:e.jsx(n,{size:"sm"}),children:[e.jsx(f,{name:"password",type:l?"text":"password",placeholder:"Password"}),e.jsx(f,{name:"confirm",type:l?"text":"password",placeholder:"Confirm Password"})]}),e.jsx(a,{as:fe,onClick:L,alignSelf:"flex-end",...I,pt:"0px",bg:"transparent",fontSize:["14px","16px"],_hover:{bg:"transparent"},children:l?"Hide":"Show"}),e.jsx(G,{...I,children:"Where are you based?"}),e.jsx(s.Suspense,{fallback:e.jsx(n,{size:"sm"}),children:e.jsx(ze,{value:T,onChange:m=>{A(m.target.value)},...Q})}),e.jsx(t,{...K,children:e.jsx(Ee,{w:"100%",size:["sm","md"],borderColor:"black",spacing:"10px",children:"Get exclusive offers, trends and deals"})}),e.jsx(s.Suspense,{fallback:e.jsx(n,{size:"sm"}),children:e.jsx(ke,{isLoading:c,name:"Create Account"})}),e.jsxs(a,{...E,pt:"10px",children:["By signing up you accept to our"," ",e.jsxs(R,{href:"#",textDecoration:"underline",children:[" ","Terms and Services."]})]}),e.jsxs(a,{...E,pt:"10px",children:["Already have an account?",e.jsxs(R,{onClick:()=>{d(`${O}/login`,{replace:!0})},textDecoration:"underline",children:[" ","Login here."]})]}),e.jsx(J,{bg:"transparent",pt:"40px",w:"100%"})]})})})]}),e.jsx(ve,{isOpen:k,onClose:P,token:p})]})},Be=Ie;export{Be as default};
