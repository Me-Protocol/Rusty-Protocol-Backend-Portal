import{r as s,u as M,b as K,a as B,j as e,F as t,T as o,i as A,n as Q,S as n,ah as V,bc as Z,G as O,bd as ee,W as se,_ as j,be as te,O as oe,d as ae,bf as ne,g as re,I as ie,f as le,bg as ce,V as de,e as ue,L as R,B as xe,al as F,H as pe,l as me,bh as he}from"./index-4d742258.js";import{N as fe,a as je,u as ge}from"./Login-3575b407.js";import{F as be}from"./formik.esm-2a188202.js";import{I as Se}from"./index.esm-c5ec88a1.js";import{P as ye,a as we}from"./chunk-I5V4ORUK-9367144c.js";import{C as Ce}from"./chunk-CWVAJCXJ-cfa1a458.js";import"./chunk-7D6N5TE5-e266f514.js";const _e=({isOpen:i,onClose:d,token:g})=>{const[l,b]=s.useState(!1),[v,x]=s.useState(!1),[S,k]=s.useState(60),[y,p]=s.useState("");let P=M(),u=K();const w=B();async function L(r){try{x(!0);const{payload:c,error:C}=await w(Z({code:r,token:g}));if(C)return p(C.message);if(c){d();const _="error-toast";u.isActive(_)||u({id:_,position:"top",title:"Account Created Successfully",description:"Your account was created using email and password, please enter your email and password to continue",status:"success",duration:9e3,isClosable:!1}),P(`${O}/login`)}}catch{}finally{x(!1)}}async function I(){try{x(!0);const{payload:r,error:c}=await w(ee({token:g}));if(c)return p(c.message);r&&se(u,"Code resent successfully",9e3,"bottom-left")}catch{}finally{x(!1)}}return e.jsx(fe,{isOpen:i,onClose:d,closeOnOverlayClick:!1,modalContentStyle:{borderRadius:"10px"},children:e.jsxs(t,{flexDir:"column",py:"5px",children:[e.jsx(t,{alignSelf:"flex-end",as:"button",onClick:d,mb:"20px",children:e.jsx(Se,{size:20})}),e.jsx(o,{fontSize:"14px",mb:"10px",children:"Please provide the OTP sent to your Email"}),e.jsx(A,{w:"100%",h:"80px",children:e.jsx(ye,{onComplete:r=>{p(""),L(r)},otp:!0,placeholder:"*",children:[1,2,3,4].map(()=>e.jsx(we,{bg:"grey",borderRadius:10,borderWidth:0,w:"30%",h:"100%"},Q()))})}),y&&e.jsx(o,{color:"red",children:y}),v&&e.jsx(n,{size:"sm",alignSelf:"flex-end",mt:"10px"}),e.jsxs(A,{fontSize:"14px",mt:"25px",children:[e.jsx(o,{children:"Did not receive OTP?"}),e.jsx(V,{opacity:l?1:.5,onClick:()=>{l&&(I(),k(S+1),b(!1))},children:e.jsx(je,{countFrom:S,onCountdownComplete:()=>{b(!0)}})})]})]})})},Ee=s.lazy(()=>j(()=>import("./index-e34b2b30.js"),["assets/index-e34b2b30.js","assets/index-4d742258.js","assets/index-ed5220eb.css"])),ve=s.lazy(()=>j(()=>import("./index-4d742258.js").then(i=>i.cX),["assets/index-4d742258.js","assets/index-ed5220eb.css"])),f=s.lazy(()=>j(()=>import("./index-358d874a.js"),["assets/index-358d874a.js","assets/index-4d742258.js","assets/index-ed5220eb.css","assets/formik.esm-2a188202.js"])),ke=s.lazy(()=>j(()=>import("./index-680b3184.js"),["assets/index-680b3184.js","assets/index-4d742258.js","assets/index-ed5220eb.css","assets/countries-020c4914.js","assets/chunk-3RSXBRAN-015cd4eb.js"])),Pe=s.lazy(()=>j(()=>import("./index-1ca65694.js"),["assets/index-1ca65694.js","assets/index-4d742258.js","assets/index-ed5220eb.css"])),Le=()=>{const i=B();let d=M();const g=te(),[l,b]=s.useState(!1),[v,x]=s.useState(!1),{isOpen:S,onClose:k,onOpen:y}=oe(),[p,P]=s.useState(""),[u,w]=s.useState(""),L=()=>b(!l),{token:I,registerLoading:r}=ae(a=>a.authReducer),{root:c,boxLeft:C,boxRegister:_,leftImg:G,registerColumn:N,head:$,desc:E,basedText:z,checkBoxRoot:H,countrySelect:W}=ge();s.useEffect(()=>{i(ne()),J(),I&&d(`${O}/dashboard`)},[]);const[X,D]=s.useState("United States of America"),J=()=>{re.get("https://ipapi.co/json/").then(a=>{let m=a.data;D(m.country_name)}).catch(a=>{console.log(a)})},U=async({email:a,password:m,firstname:Y,lastname:q})=>{if(!g)return;const{payload:T,error:h}=await i(he({firstname:Y,lastname:q,email:a,password:m}));if(h)return console.log(h),w(h==null?void 0:h.message);T&&(P(T),y())};return e.jsxs(e.Fragment,{children:[e.jsx(s.Suspense,{fallback:e.jsx(n,{size:"sm"}),children:e.jsx(t,{pos:"absolute",children:e.jsx(Pe,{pos:"fixed"})})}),e.jsxs(t,{...c,children:[e.jsx(t,{...C,children:e.jsx(ie,{src:le.AuthImage,alt:"Me Protocol",...G})}),e.jsx(t,{..._,overflowX:"hidden",children:e.jsx(be,{initialValues:{email:"",password:"",confirm:"",firstname:"",lastname:""},validationSchema:ce,onSubmit:U,children:a=>e.jsxs(de,{as:"form",...N,onChange:()=>i(ue()),onSubmit:a.handleSubmit,children:[e.jsx(o,{...$,children:"Let’s get started."}),e.jsx(t,{w:"100%",justify:"space-between",children:e.jsx(s.Suspense,{fallback:e.jsx(n,{size:"sm"}),children:e.jsx(R,{href:`${xe}/user/google`,w:"full",children:e.jsx(ve,{isLoading:v,name:"Sign up with Google",rest:{w:"100%"}})})})}),e.jsxs(t,{align:"center",w:"100%",justify:"space-between",children:[e.jsx(F,{w:"45%",color:"#ECECEC"}),e.jsx(o,{color:"#999999",fontSize:{base:"12px",md:"20px"},children:"or"}),e.jsx(F,{w:"45%",color:"#ECECEC"})]}),e.jsx(o,{...E,children:"Enter a few details to join the ME community"}),e.jsxs(t,{flexDir:{base:"column",md:"row"},justifyContent:"space-between",w:"100%",children:[e.jsx(t,{w:{base:"100%",md:"49%"},children:e.jsx(s.Suspense,{fallback:e.jsx(n,{size:"sm"}),children:e.jsx(f,{name:"firstname",placeholder:"First Name"})})}),e.jsx(t,{w:{base:"100%",md:"49%"},children:e.jsx(s.Suspense,{fallback:e.jsx(n,{size:"sm"}),children:e.jsx(f,{name:"lastname",placeholder:"Last Name"})})})]}),e.jsxs(s.Suspense,{fallback:e.jsx(n,{size:"sm"}),children:[e.jsx(f,{name:"email",type:"email",placeholder:"your@email.com"}),u&&e.jsx(o,{fontSize:"12px",color:"red",children:u})]}),e.jsx(pe,{...z,children:"Get yourself a password."}),e.jsx(o,{...E,children:"Passwords must include a symbol or number and have at least 8 characters."}),e.jsxs(s.Suspense,{fallback:e.jsx(n,{size:"sm"}),children:[e.jsx(f,{name:"password",type:l?"text":"password",placeholder:"Password"}),e.jsx(f,{name:"confirm",type:l?"text":"password",placeholder:"Confirm Password"})]}),e.jsx(o,{as:me,onClick:L,alignSelf:"flex-end",...z,pt:"0px",bg:"transparent",_hover:{bg:"transparent"},children:l?"Hide":"Show"}),e.jsx(o,{...z,children:"Where are you based?"}),e.jsx(s.Suspense,{fallback:e.jsx(n,{size:"sm"}),children:e.jsx(ke,{value:X,onChange:m=>{D(m.target.value)},...W})}),e.jsx(t,{...H,children:e.jsx(Ce,{w:"100%",borderColor:"black",spacing:"1rem",children:"Get exclusive offers, trends and deals"})}),e.jsx(s.Suspense,{fallback:e.jsx(n,{size:"sm"}),children:e.jsx(Ee,{isLoading:r,name:"Create Account"})}),e.jsxs(o,{...E,pt:"10px",children:["By signing up you accept to our"," ",e.jsxs(R,{href:"https://google.com",isExternal:!0,textDecoration:"underline",children:[" ","Terms and Services."]})]}),e.jsxs(o,{...E,pt:"10px",children:["Already have an account?",e.jsxs(R,{onClick:()=>{d(`${O}/login`,{replace:!0})},textDecoration:"underline",children:[" ","Login here."]})]}),e.jsx(V,{bg:"transparent",pt:"40px",w:"100%"})]})})})]}),e.jsx(_e,{isOpen:S,onClose:k,token:p})]})},Fe=Le;export{Fe as default};
