import{ai as Q,j as e,aa as K,ab as Z,ac as ee,bO as se,r as s,i as M,T as a,u as B,b as te,a as F,F as r,n as ae,S as d,al as V,bP as oe,G as O,bQ as ne,a2 as re,_ as C,q as ie,$ as le,d as ce,bR as de,g as ue,I as xe,f as pe,bS as me,V as he,e as fe,B as je,D,H as ge,l as be,bT as Se}from"./index-49b376e0.js";import{u as ye}from"./Login-53339488.js";import{F as we}from"./formik.esm-77cfe475.js";import{P as Ce,a as ve}from"./chunk-I5V4ORUK-0c1d537f.js";import{C as _e}from"./chunk-CWVAJCXJ-22dc52fa.js";import{L as z}from"./chunk-K7XRJ7NL-859c5bd8.js";import"./chunk-7D6N5TE5-9217b37e.js";function Ee(t){return Q({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm75.31 260.69a16 16 0 11-22.62 22.62L256 278.63l-52.69 52.68a16 16 0 01-22.62-22.62L233.37 256l-52.68-52.69a16 16 0 0122.62-22.62L256 233.37l52.69-52.68a16 16 0 0122.62 22.62L278.63 256z"}}]})(t)}const ke=({children:t,isOpen:i,onClose:o,modalContentStyle:n,modalBodyStyle:l,...u})=>e.jsxs(K,{isCentered:!0,blockScrollOnMount:!0,scrollBehavior:"inside",isOpen:i,size:"lg",onClose:o,motionPreset:"slideInBottom",...u,children:[e.jsx(Z,{bg:"#00000020",backdropFilter:"auto",backdropBlur:"2px"}),e.jsx(ee,{w:{base:"90vw",md:"60vw"},borderRadius:0,py:"1%",...n,children:e.jsx(se,{...l,children:t})})]}),Le=({countFrom:t,onCountdownComplete:i})=>{const[o,n]=s.useState(t),[l,u]=s.useState(!0);s.useEffect(()=>{if(l&&o>0){const x=setInterval(()=>{n(o-1)},1e3);return()=>clearInterval(x)}else o===0&&l&&(u(!1),i())},[o,l,i]);const m=x=>{const g=Math.floor(x/60),h=x%60;return`${g.toString().padStart(2,"0")}:${h.toString().padStart(2,"0")}`},j=()=>{t>0||(n(t),u(!0))};return e.jsxs(M,{as:"button",onClick:j,children:[e.jsx(a,{children:"Resend"}),e.jsxs(a,{opacity:o>0?1:0,children:["(",m(o),")"]})]})},Ie=({isOpen:t,onClose:i,token:o})=>{const[n,l]=s.useState(!1),[u,m]=s.useState(!1),[j,x]=s.useState(60),[g,h]=s.useState("");let L=B(),b=te();const v=F();async function I(p){try{m(!0);const{payload:f,error:_}=await v(oe({code:p,token:o}));if(_)return h(_.message);if(f){i();const E="error-toast";b.isActive(E)||b({id:E,position:"top",title:"Account Created Successfully",description:"Your account was created using email and password, please enter your email and password to continue",status:"success",duration:9e3,isClosable:!1}),L(`${O}/login`)}}catch{}finally{m(!1)}}async function P(){try{m(!0);const{payload:p,error:f}=await v(ne({token:o}));if(f)return h(f.message);p&&re(b,"Code resent successfully",9e3,"bottom-left")}catch{}finally{m(!1)}}return e.jsx(ke,{isOpen:t,onClose:i,closeOnOverlayClick:!1,modalContentStyle:{borderRadius:"10px"},children:e.jsxs(r,{flexDir:"column",py:"5px",children:[e.jsx(r,{alignSelf:"flex-end",as:"button",onClick:i,mb:"20px",children:e.jsx(Ee,{size:20})}),e.jsx(a,{fontSize:"14px",mb:"10px",children:"Please provide the OTP sent to your Email"}),e.jsx(M,{w:"100%",h:"80px",children:e.jsx(Ce,{onComplete:p=>{h(""),I(p)},otp:!0,placeholder:"*",children:[1,2,3,4].map(()=>e.jsx(ve,{bg:"grey",borderRadius:10,borderWidth:0,w:"30%",h:"100%"},ae()))})}),g&&e.jsx(a,{color:"red",children:g}),u&&e.jsx(d,{size:"sm",alignSelf:"flex-end",mt:"10px"}),e.jsxs(M,{fontSize:"14px",mt:"25px",children:[e.jsx(a,{children:"Did not receive OTP?"}),e.jsx(V,{opacity:n?1:.5,onClick:()=>{n&&(P(),x(j+1),l(!1))},children:e.jsx(Le,{countFrom:j,onCountdownComplete:()=>{l(!0)}})})]})]})})},Pe=s.lazy(()=>C(()=>import("./index-66619c8f.js"),["assets/index-66619c8f.js","assets/index-49b376e0.js","assets/index-ed5220eb.css"])),Re=s.lazy(()=>C(()=>import("./index-49b376e0.js").then(t=>t.cS),["assets/index-49b376e0.js","assets/index-ed5220eb.css"])),w=s.lazy(()=>C(()=>import("./index-05f572a4.js"),["assets/index-05f572a4.js","assets/index-49b376e0.js","assets/index-ed5220eb.css","assets/formik.esm-77cfe475.js"])),ze=s.lazy(()=>C(()=>import("./index-67f8e65d.js"),["assets/index-67f8e65d.js","assets/index-49b376e0.js","assets/index-ed5220eb.css","assets/countries-e12a8af3.js","assets/chunk-3RSXBRAN-0c5dbf32.js"])),Me=s.lazy(()=>C(()=>import("./index-d9edfcf7.js"),["assets/index-d9edfcf7.js","assets/index-49b376e0.js","assets/index-ed5220eb.css"])),Oe=()=>{const t=F();let i=B();const o=ie(),[n,l]=s.useState(!1),[u,m]=s.useState(!1),{isOpen:j,onClose:x,onOpen:g}=le(),[h,L]=s.useState(""),[b,v]=s.useState(""),I=()=>l(!n),{token:P,registerLoading:p}=ce(c=>c.authReducer),{root:f,boxLeft:_,boxRegister:E,leftImg:G,registerColumn:$,head:N,desc:k,basedText:R,checkBoxRoot:H,countrySelect:J}=ye();s.useEffect(()=>{t(de()),W(),P&&i(`${O}/dashboard`)},[]);const[U,T]=s.useState("United States of America"),W=()=>{ue.get("https://ipapi.co/json/").then(c=>{let S=c.data;T(S.country_name)}).catch(c=>{console.log(c)})},X=async({email:c,password:S,firstname:Y,lastname:q})=>{if(!o)return;const{payload:A,error:y}=await t(Se({firstname:Y,lastname:q,email:c,password:S}));if(y)return console.log(y),v(y==null?void 0:y.message);A&&(L(A),g())};return e.jsxs(e.Fragment,{children:[e.jsx(s.Suspense,{fallback:e.jsx(d,{size:"sm"}),children:e.jsx(r,{pos:"absolute",children:e.jsx(Me,{pos:"fixed"})})}),e.jsxs(r,{...f,children:[e.jsx(r,{..._,children:e.jsx(xe,{src:pe.AuthImage,alt:"Me Protocol",...G})}),e.jsx(r,{...E,overflowX:"hidden",children:e.jsx(we,{initialValues:{email:"",password:"",confirm:"",firstname:"",lastname:""},validationSchema:me,onSubmit:X,children:c=>e.jsxs(he,{as:"form",...$,onChange:()=>t(fe()),onSubmit:c.handleSubmit,children:[e.jsx(a,{...N,children:"Let’s get started."}),e.jsx(r,{w:"100%",justify:"space-between",children:e.jsx(s.Suspense,{fallback:e.jsx(d,{size:"sm"}),children:e.jsx(z,{href:`${je}/user/google`,w:"full",children:e.jsx(Re,{isLoading:u,name:"Sign up with Google",rest:{w:"100%"}})})})}),e.jsxs(r,{align:"center",w:"100%",justify:"space-between",children:[e.jsx(D,{w:"45%",color:"#ECECEC"}),e.jsx(a,{color:"#999999",fontSize:{base:"12px",md:"20px"},children:"or"}),e.jsx(D,{w:"45%",color:"#ECECEC"})]}),e.jsx(a,{...k,children:"Enter a few details to join the ME community"}),e.jsxs(r,{flexDir:{base:"column",md:"row"},justifyContent:"space-between",w:"100%",children:[e.jsx(r,{w:{base:"100%",md:"49%"},children:e.jsx(s.Suspense,{fallback:e.jsx(d,{size:"sm"}),children:e.jsx(w,{name:"firstname",placeholder:"First Name"})})}),e.jsx(r,{w:{base:"100%",md:"49%"},children:e.jsx(s.Suspense,{fallback:e.jsx(d,{size:"sm"}),children:e.jsx(w,{name:"lastname",placeholder:"Last Name"})})})]}),e.jsxs(s.Suspense,{fallback:e.jsx(d,{size:"sm"}),children:[e.jsx(w,{name:"email",type:"email",placeholder:"your@email.com"}),b&&e.jsx(a,{fontSize:"12px",color:"red",children:b})]}),e.jsx(ge,{...R,children:"Get yourself a password."}),e.jsx(a,{...k,children:"Passwords must include a symbol or number and have at least 8 characters."}),e.jsxs(s.Suspense,{fallback:e.jsx(d,{size:"sm"}),children:[e.jsx(w,{name:"password",type:n?"text":"password",placeholder:"Password"}),e.jsx(w,{name:"confirm",type:n?"text":"password",placeholder:"Confirm Password"})]}),e.jsx(a,{as:be,onClick:I,alignSelf:"flex-end",...R,pt:"0px",bg:"transparent",_hover:{bg:"transparent"},children:n?"Hide":"Show"}),e.jsx(a,{...R,children:"Where are you based?"}),e.jsx(s.Suspense,{fallback:e.jsx(d,{size:"sm"}),children:e.jsx(ze,{value:U,onChange:S=>{T(S.target.value)},...J})}),e.jsx(r,{...H,children:e.jsx(_e,{w:"100%",borderColor:"black",spacing:"1rem",children:"Get exclusive offers, trends and deals"})}),e.jsx(s.Suspense,{fallback:e.jsx(d,{size:"sm"}),children:e.jsx(Pe,{isLoading:p,name:"Create Account"})}),e.jsxs(a,{...k,pt:"10px",children:["By signing up you accept to our"," ",e.jsxs(z,{href:"https://google.com",textDecoration:"underline",children:[" ","Terms and Services."]})]}),e.jsxs(a,{...k,pt:"10px",children:["Already have an account?",e.jsxs(z,{onClick:()=>{i(`${O}/login`,{replace:!0})},textDecoration:"underline",children:[" ","Login here."]})]}),e.jsx(V,{bg:"transparent",pt:"40px",w:"100%"})]})})})]}),e.jsx(Ie,{isOpen:j,onClose:x,token:h})]})},$e=Oe;export{$e as default};
