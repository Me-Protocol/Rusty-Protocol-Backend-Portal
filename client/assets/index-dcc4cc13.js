import{aP as D,aO as B,cD as Qe,j as e,aQ as V,bx as Ze,bv as qe,r as s,_ as Y,F as n,T as r,D as y,S as b,C as w,u as Je,b as Ke,a as er,Z as je,d as ge,aR as rr,cE as or,n as O,M as cr,a9 as Se,aa as ue,ab as ye,i as A,H as lr,al as sr,am as U,L as nr,l as fe,ak as ar,bO as ir,g as tr,ba as dr,b9 as xr,t as Ce,a1 as hr,m as pr,h as mr}from"./index-43f03252.js";import{M as br}from"./MyProfile-93cccafd.js";import{I as jr}from"./index.esm-100d0e89.js";import{u as gr}from"./chunk-7D6N5TE5-d5167778.js";import{c as Sr}from"./countries-020c4914.js";import{C}from"./index-48807620.js";import{C as ur}from"./index-30481b8f.js";import{P as ke,a as we}from"./chunk-I5V4ORUK-1eff40bf.js";import{C as c}from"./chunk-CWVAJCXJ-0b41cf6b.js";var yr={left:{marginEnd:"-1px",borderEndRadius:0,borderEndColor:"transparent"},right:{marginStart:"-1px",borderStartRadius:0,borderStartColor:"transparent"}},fr=D("div",{baseStyle:{flex:"0 0 auto",width:"auto",display:"flex",alignItems:"center",whiteSpace:"nowrap"}}),Q=B(function(t,d){var a;const{placement:p="left",...x}=t,o=(a=yr[p])!=null?a:{},m=Qe();return e.jsx(fr,{ref:d,...x,__css:{...m.addon,...o}})});Q.displayName="InputAddon";var Z=B(function(t,d){return e.jsx(Q,{ref:d,placement:"left",...t,className:V("chakra-input__left-addon",t.className)})});Z.displayName="InputLeftAddon";Z.id="InputLeftAddon";var ze=B(function(t,d){return e.jsx(Q,{ref:d,placement:"right",...t,className:V("chakra-input__right-addon",t.className)})});ze.displayName="InputRightAddon";ze.id="InputRightAddon";var _e=B(function(t,d){const a=Ze("Switch",t),{spacing:p="0.5rem",children:x,...o}=qe(t),{getIndicatorProps:m,getInputProps:g,getCheckboxProps:S,getRootProps:I,getLabelProps:v}=gr(o),P=s.useMemo(()=>({display:"inline-block",position:"relative",verticalAlign:"middle",lineHeight:0,...a.container}),[a.container]),f=s.useMemo(()=>({display:"inline-flex",flexShrink:0,justifyContent:"flex-start",boxSizing:"content-box",cursor:"pointer",...a.track}),[a.track]),z=s.useMemo(()=>({userSelect:"none",marginStart:p,...a.label}),[p,a.label]);return e.jsxs(D.label,{...I(),className:V("chakra-switch",t.className),__css:P,children:[e.jsx("input",{className:"chakra-switch__input",...g({},d)}),e.jsx(D.span,{...S(),className:"chakra-switch__track",__css:f,children:e.jsx(D.span,{__css:a.thumb,className:"chakra-switch__thumb",...m()})}),x&&e.jsx(D.span,{className:"chakra-switch__label",...v(),__css:z,children:x})]})});_e.displayName="Switch";const k=s.lazy(()=>Y(()=>import("./index-2cc759e9.js"),["assets/index-2cc759e9.js","assets/index-43f03252.js","assets/index-ed5220eb.css","assets/chunk-CWVAJCXJ-0b41cf6b.js","assets/chunk-7D6N5TE5-d5167778.js","assets/MyProfile-93cccafd.js","assets/index.esm-100d0e89.js","assets/countries-020c4914.js","assets/index-48807620.js","assets/index-30481b8f.js","assets/chunk-I5V4ORUK-1eff40bf.js"])),Cr=()=>{const{root:i,headingStyle:t,bodyStyle:d,subHeadStyle:a}=kr();return e.jsxs(n,{...i,flexDir:"column",children:[e.jsx(r,{...t,children:"Notifications"}),e.jsx(r,{...d,children:"Use my sizes filter to personalize your search results."}),e.jsxs(n,{flexDir:"column",children:[e.jsx(r,{...a,children:"News & Promotions"}),e.jsx(y,{my:"1%"}),e.jsx(s.Suspense,{fallback:e.jsx(b,{size:"sm"}),children:e.jsx(k,{head:"Curated style",body:`Be the first to find out about our curated collections, expert picks,
          and top steals. These include Designer Deals, Staff Picks, Grailed
          Steals, and more.`})}),e.jsx(s.Suspense,{fallback:e.jsx(b,{size:"sm"}),children:e.jsx(k,{head:"ME Blog",body:"Get an inside look at the blog, featuring approachable style advice, up-to-the-minute news, interviews, cultural coverage and more."})}),e.jsx(s.Suspense,{fallback:e.jsx(b,{size:"sm"}),children:e.jsx(k,{head:"ME Exclusive",body:"Get an inside look at the blog, featuring approachable style advice, up-to-the-minute news, interviews, cultural coverage and more."})}),e.jsx(r,{...a,children:"Your Items & Favorites"}),e.jsx(y,{my:"1%"}),e.jsx(s.Suspense,{fallback:e.jsx(b,{size:"sm"}),children:e.jsx(k,{head:"Offer updates",body:"Notify me when I’ve received a new offer, my offer has been accepted, or my offer is about to expire"})}),e.jsx(s.Suspense,{fallback:e.jsx(b,{size:"sm"}),children:e.jsx(k,{head:"Followed Searches",body:"Notify me when there are new items that match one of my Followed Searches. You can manage your Followed Searches in search."})}),e.jsx(r,{...a,children:"Others"}),e.jsx(y,{my:"1%"}),e.jsx(s.Suspense,{fallback:e.jsx(b,{size:"sm"}),children:e.jsx(k,{head:"Authentication",body:"Notify me when there are new items that match one of my Followed Searches. You can manage your Followed Searches in search."})})]})]})},kr=()=>({root:{w:"100%",h:"100%"},headingStyle:{fontSize:["14px","12px","14px","16px","18px"]},bodyStyle:{fontSize:["14px","14px","12px","12px","12px"],color:"#999999"},subHeadStyle:{fontSize:["14px","12px","12px","12px","14px"],mt:"4%"}}),$=({head:i,body:t,isButton:d,onClick:a,loading:p,onChange:x,value:o,isChecked:m,switchLoading:g})=>{const{root:S,lowerSec:I,subHeadStyle:v,headingStyle:P,bodyStyle:f,button:z}=wr();return e.jsxs(n,{...S,flexDir:"column",children:[e.jsx(r,{...v,children:i}),e.jsxs(n,{...I,flexDir:"row",justify:"space-between",children:[e.jsx(r,{...f,w:"65%",children:t}),d?e.jsx(w,{as:"button",...z,onClick:a,children:p?e.jsx(b,{mx:"18px",my:"2px",size:"sm"}):e.jsx(r,{fontSize:["14px","12px","12px","12px","14px"],children:"Change"})}):e.jsxs(n,{align:"center",children:[g&&e.jsx(b,{size:"xs",color:"dark"}),e.jsx(_e,{sx:{"span.chakra-switch__track:not([data-checked])":{backgroundColor:"gray"},"span.chakra-switch__track":{backgroundColor:"gray.900"}},size:"sm",value:o,onChange:x,pl:"5px",isChecked:m})]})]})]})},wr=()=>({root:{w:"100%",mb:"2%"},lowerSec:{w:"100%",align:"center"},headingStyle:{fontSize:["14px","12px","14px","16px","18px"]},subHeadStyle:{fontSize:["14px","12px","12px","12px","14px"]},bodyStyle:{fontSize:["14px","14px","12px","12px","12px"],color:"#999999"},button:{borderWidth:1,borderColor:"#000000",px:"2%",py:"0.5%",borderRadius:"100px"}}),ve=s.lazy(()=>Y(()=>import("./index-29b0efac.js"),["assets/index-29b0efac.js","assets/index-43f03252.js","assets/index-ed5220eb.css","assets/countries-020c4914.js","assets/chunk-3RSXBRAN-5a4dbb87.js"])),vr=()=>{var de,xe,he,pe,me,be;Je();let i=Ke();const t=er(),{root:d,headingStyle:a,bodyStyle:p,subHeadStyle:x,manageButton:o,countrySelect:m,root2:g,desc:S,basedText:I}=zr(),{isOpen:v,onOpen:P,onClose:f}=je(),{isOpen:z,onOpen:De,onClose:L}=je(),{user_data:j}=ge(l=>l.userReducer),{token:_}=ge(l=>l.authReducer),[q]=rr(),[Oe,J]=s.useState("Switzerland"),[H,K]=s.useState("566"),[Ie,Pe]=s.useState(""),[Lr,Fe]=s.useState(""),[ee,Re]=s.useState("");s.useState(!1);const[Ee,W]=s.useState(!1),[re,Hr]=s.useState(j==null?void 0:j.email),[Me,Ne]=s.useState("");s.useState(!1);const[Te,F]=s.useState(!1),[Wr,R]=s.useState(!1),[Xr,E]=s.useState(!1),[M,Ae]=s.useState(!1),[oe,ce]=s.useState(!1),[le,se]=s.useState(!1),[ne,Be]=s.useState(60),[ae,ie]=s.useState(""),[N,Le]=s.useState(""),[T,He]=s.useState(""),[te,We]=s.useState(""),Xe=()=>Ae(!M),{data:u}=or(void 0,{refetchOnFocus:!0,skip:!_}),Ue=()=>{tr.get("https://ipapi.co/json/").then(l=>{let h=l.data;J(h.country_name),K(h.country_calling_code.replace("+",""))}).catch(l=>{console.log(l)})};s.useEffect(()=>()=>{},[j]);async function $e(){if(!re.includes("@"))return C(i,"Invalid email address","Please enter a valid email address");try{W(!0);const{payload:l,error:h}=await t(dr({identifier:re}));if(h)return W(!1),C(i,"Error",h==null?void 0:h.message);l&&(Ne(l==null?void 0:l.userId),De())}catch(l){console.log(l,"SEND_RESET_CODE_ERR")}finally{W(!1)}}async function Ge(){try{if(N!==T)return C(i,"Invalid password","Password do not match");if(N.length<8||T.length<8)return C(i,"Invalid password","Password must be at least 8 characters");if(te.length<4)return C(i,"Invalid otp","Please provide a valid otp code");const{payload:l,error:h}=await t(xr({code:te,password:N,confirmPassword:T,userId:Me}));if(h)return se(!1),C(i,"Error",h==null?void 0:h.message);l&&(ur(i,"Password changed successfully",5e3),L())}catch(l){console.log(l)}finally{se(!1)}}s.useEffect(()=>{Ue()},[]);const X=(xe=((de=Sr)==null?void 0:de.map(l=>({id:O(),...l}))).filter(l=>l.name==="234"||l.callingCodes[0]==="234"))==null?void 0:xe[0];async function Ve(l){l==="login"?F(!0):l==="deposit"?R(!0):E(!0),await q(l==="deposit"?{deposit_2fa:!0}:l==="login"?{...j,login_2fa:!0}:{withdraw_2fa:!0}).then(async h=>{_&&t(Ce({token:_})),console.log(h)}).catch(h=>{console.log(h,"UOPIO")}).finally(()=>{F(!1),R(!1),E(!1)})}async function Ye(l){l==="login"?F(!0):l==="deposit"?R(!0):E(!0),await q(l==="deposit"?{deposit_2fa:!1}:l==="login"?{login_2fa:!1}:{withdraw_2fa:!1}).then(async({data:h})=>{_&&t(Ce({token:_})),hr(i,"2FA updated successfully")}).catch(h=>{console.log(h,"UOPIO")}).finally(()=>{F(!1),R(!1),E(!1)})}return e.jsxs(n,{...d,flexDir:"column",children:[e.jsx(r,{...a,children:"Security"}),e.jsx(r,{...p,children:"Secure your account by enabling these settings."}),e.jsxs(n,{flexDir:"column",children:[e.jsx(r,{...x,children:"Two factor authentication"}),e.jsx(y,{my:"1%"}),e.jsx($,{head:"Enable at login",body:`We’ll send a temporary 6-digit code to your number ending in ${(pe=u==null?void 0:u.phones[0])==null?void 0:pe.phone.substr(((he=u==null?void 0:u.phones[0])==null?void 0:he.phone.length)-3)} when you login.`,isChecked:(me=j==null?void 0:j.customer)==null?void 0:me.login_2fa,switchLoading:Te,onChange:()=>{var l;(l=j==null?void 0:j.customer)!=null&&l.login_2fa?Ye("login"):Ve("login")}}),e.jsx($,{head:"Text message",body:"We’ll send a temporary 6-digit code to your number ending in 679 when you login.",isButton:!0}),e.jsx(r,{...x,children:"Login"}),e.jsx(y,{my:"1%"}),e.jsx($,{head:"Password",body:"We’ll send a temporary 4-digit code to reset your password",isButton:!0,loading:Ee,onClick:$e}),e.jsxs(n,{justify:"space-between",align:"flex-end",children:[e.jsx(r,{...x,children:"Phone number"}),e.jsx(w,{as:"button",...o,onClick:P,children:e.jsx(r,{fontSize:["14px","12px","12px","12px","14px"],children:"Manage"})})]}),e.jsx(y,{my:"1%"})]}),(be=u==null?void 0:u.phones)==null?void 0:be.map(l=>e.jsxs(n,{align:"center",children:[e.jsx(cr,{src:X==null?void 0:X.flag,size:"xs"}),e.jsx(r,{fontSize:"12px",pl:"5px",children:l==null?void 0:l.phone})]},O())),e.jsxs(Se,{isCentered:!0,blockScrollOnMount:!0,scrollBehavior:"inside",isOpen:v,size:"xl",onClose:f,motionPreset:"slideInBottom",closeOnOverlayClick:!1,children:[e.jsx(ue,{}),e.jsxs(ye,{w:{base:"90vw",md:"50vw"},borderRadius:0,p:"2%",overflowY:"scroll",children:[e.jsx(A,{mb:"30px",children:e.jsx(lr,{fontSize:"18px",children:"Verify your phone"})}),e.jsx(r,{fontSize:"14px",mb:"8px",children:"Location"}),e.jsx(s.Suspense,{fallback:e.jsx(b,{size:"sm"}),children:e.jsx(ve,{value:Oe,onChange:l=>{J(l.target.value)},...m})}),e.jsx(r,{fontSize:"14px",mt:"24px",mb:"8px",children:"Phone number"}),e.jsxs(sr,{...g,children:[e.jsx(Z,{w:"15%",p:"0",h:"100%",children:e.jsx(ve,{disabled:!0,isCallingCode:!0,value:H||"234",...m})}),e.jsx(U,{h:"100%",borderRadius:"0px",boxShadow:"none",outline:"none",type:"tel",placeholder:`${H||"(000)"} 0 000 000 000 `,value:Ie,onChange:({target:l})=>{Pe(l.value),K(l.value.slice(0,3))}})]}),e.jsx(y,{orientation:"horizontal",mt:"40px"}),e.jsxs(n,{mt:"16px",justifyContent:"center",alignItems:"center",flexDir:"column",children:[e.jsx(r,{fontSize:"14px",mb:"10px",children:"Enter the 2-step verification code that we texted to your phone"}),e.jsx(A,{w:"100%",h:"48px",justifyContent:"center",alignItems:"center",children:e.jsx(ke,{onComplete:l=>{Fe(l),Re("")},otp:!0,placeholder:"*",children:[1,2,3,4,5,6].map(()=>e.jsx(we,{bg:"#F6F6F6",borderRadius:10,borderWidth:0,w:"48px",h:"100%"},O()))})}),ee&&e.jsx(r,{color:"red",mt:"10px",children:ee}),e.jsxs(r,{pt:"10px",children:["Didn’t receive the code?"," ",e.jsxs(nr,{href:"#",color:"#256BF2",children:[" ","Resend code"]})]})]}),e.jsx(y,{orientation:"horizontal",mt:"16px"}),e.jsxs(n,{mt:"24px",flexDir:"column",children:[e.jsx(w,{as:"button",bg:"black",color:"light",h:"50px",children:e.jsx(r,{children:"Add phone"})}),e.jsx(w,{as:"button",bg:"light",color:"dark",h:"50px",border:"1px solid black",onClick:f,mt:"8px",children:e.jsx(r,{children:"Cancel"})})]})]})]}),e.jsxs(Se,{isCentered:!0,blockScrollOnMount:!0,scrollBehavior:"inside",isOpen:z,size:"xl",onClose:L,motionPreset:"slideInBottom",closeOnOverlayClick:!1,children:[e.jsx(ue,{}),e.jsx(ye,{w:{base:"90vw",md:"50vw"},borderRadius:0,p:"2%",overflowY:"scroll",children:e.jsxs(n,{flexDir:"column",py:"5px",children:[e.jsxs(n,{justifyContent:"space-between",mb:"20px",children:[e.jsx(r,{fontSize:"20px",fontWeight:"700",children:"New Password"}),e.jsx(n,{as:"button",onClick:L,children:e.jsx(jr,{size:25})})]}),e.jsx(r,{fontSize:"16px",mb:"10px",children:"Please provide your new login details"}),e.jsx(U,{placeholder:"Password",borderColor:"rgba(0, 0, 0, 0.1)",backgroundColor:"#F5F5F5",borderRadius:"10px",py:"10px",px:"20px",variant:"unstyled",w:"100%",value:N,type:M?"text":"password",onChange:({target:l})=>{Le(l.value),ie("")}}),e.jsx(U,{mt:"20px",placeholder:"Confirm Password",backgroundColor:"#F5F5F5",borderRadius:"10px",py:"10px",px:"20px",variant:"unstyled",w:"100%",value:T,type:M?"text":"password",onChange:({target:l})=>{He(l.value),ie("")}}),e.jsx(r,{as:fe,onClick:Xe,alignSelf:"flex-end",pt:"0px",bg:"transparent",_hover:{bg:"transparent"},children:M?"Hide":"Show"}),e.jsx(A,{w:"100%",h:"80px",children:e.jsx(ke,{onComplete:l=>{We(l)},otp:!0,placeholder:"*",children:[1,2,3,4].map(()=>e.jsx(we,{bg:"grey",borderRadius:10,borderWidth:0,w:"30%",h:"100%",_focus:{border:"1px solid #1a1e26",outline:"none",boxShadow:"none"}},O()))})}),ae&&e.jsx(r,{color:"#E50000",children:ae}),le&&e.jsx(b,{size:"sm",alignSelf:"flex-end",mt:"10px"}),e.jsxs(A,{fontSize:"14px",mt:"25px",children:[e.jsx(r,{children:"Did not receive OTP?"}),e.jsx(ar,{opacity:oe?1:.5,onClick:()=>{oe&&(Be(ne+1),ce(!1))},children:e.jsx(ir,{countFrom:ne,onCountdownComplete:()=>{ce(!0)}})})]}),e.jsx(w,{mt:"10px",w:"100%",bg:"black",color:"white",p:"10px",borderRadius:"8px",as:fe,isLoading:le,onClick:Ge,_hover:{bg:"black",_loading:{bg:"black"}},children:"Confirm"})]})})]})]})},zr=()=>({root:{w:"100%",h:"100%"},root2:{w:"100%",h:"48px",align:"center",justify:"center",px:"0px",bg:"#FFFFFF",borderColor:"1px solid rgba(0, 0, 0, 0.08)",outline:"none",borderRadius:"0px"},headingStyle:{fontSize:["14px","12px","14px","16px","18px"]},bodyStyle:{fontSize:["14px","14px","12px","12px","12px"],color:"#999999"},subHeadStyle:{fontSize:["14px","12px","12px","12px","14px"],mt:"4%"},manageButton:{borderWidth:1,borderColor:"#000000",px:"2%",borderRadius:"100px",h:"30px"},countrySelect:{w:{base:"100%",md:"100%"},bg:"#FFFFFF",color:"dark",borderColor:"1px solid rgba(0, 0, 0, 0.08)",borderWidth:"1px",align:"center",borderRadius:"0px"},basedText:{fontSize:{base:"14px",md:"16px"}},desc:{pb:"5px",fontSize:{base:"15px",md:"17px"},w:{base:"100%",md:"80%"}}}),G=({head:i,body:t})=>{const{root:d,lowerSec:a,subHeadStyle:p,bodyStyle:x}=_r();return e.jsxs(n,{...d,flexDir:"column",children:[e.jsx(r,{...p,mt:"4%",children:i}),e.jsxs(n,{...a,flexDir:"row",justify:"space-between",mt:"10px",w:"90%",children:[e.jsx(c,{spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...x,color:"black",children:"XXS/40"})}),e.jsx(c,{spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...x,color:"black",children:"XXS/40"})}),e.jsx(c,{spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...x,color:"black",children:"XXS/40"})}),e.jsx(c,{spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...x,color:"black",children:"XXS/40"})}),e.jsx(c,{spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...x,color:"black",children:"XXS/40"})}),e.jsx(c,{spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...x,color:"black",children:"XXS/40"})}),e.jsx(c,{spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...x,color:"black",children:"XXS/40"})}),e.jsx(c,{spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...x,color:"black",children:"XXS/40"})})]})]})},_r=()=>({root:{w:"100%",mb:"2%"},lowerSec:{w:"100%",align:"center"},headingStyle:{fontSize:["14px","12px","14px","16px","18px"]},subHeadStyle:{fontSize:["14px","12px","12px","12px","14px"]},bodyStyle:{fontSize:["14px","14px","12px","12px","12px"],color:"#999999"}}),Dr=({head:i,body:t})=>{const{root:d,lowerSec:a,subHeadStyle:p,headingStyle:x,bodyStyle:o}=Or();return e.jsxs(n,{...d,flexDir:"column",children:[e.jsx(r,{...p,mt:"4%",children:i}),e.jsxs(n,{...a,flexDir:"row",justify:"space-between",mt:"10px",w:"88%",children:[e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})})]}),e.jsxs(n,{...a,flexDir:"row",justify:"space-between",mt:"10px",w:"50%",children:[e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})})]})]})},Or=()=>({root:{w:"100%",mb:"2%"},lowerSec:{w:"100%",align:"center"},headingStyle:{fontSize:["14px","12px","14px","16px","18px"]},subHeadStyle:{fontSize:["14px","12px","12px","12px","14px"]},bodyStyle:{fontSize:["14px","14px","12px","12px","12px"],color:"#999999"}}),Ir=({head:i,body:t})=>{const{root:d,lowerSec:a,subHeadStyle:p,headingStyle:x,bodyStyle:o}=Pr();return e.jsxs(n,{...d,flexDir:"column",children:[e.jsx(r,{...p,mt:"4%",children:i}),e.jsxs(n,{...a,flexDir:"row",justify:"space-between",mt:"10px",w:"88%",children:[e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})})]}),e.jsxs(n,{...a,flexDir:"row",justify:"space-between",mt:"10px",w:"88%",children:[e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})})]}),e.jsxs(n,{...a,flexDir:"row",justify:"space-between",mt:"10px",w:"88%",children:[e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})})]})]})},Pr=()=>({root:{w:"100%",mb:"2%"},lowerSec:{w:"100%",align:"center"},headingStyle:{fontSize:["14px","12px","14px","16px","18px"]},subHeadStyle:{fontSize:["14px","12px","12px","12px","14px"]},bodyStyle:{fontSize:["14px","14px","12px","12px","12px"],color:"#999999"}}),Fr=({head:i,body:t})=>{const{root:d,lowerSec:a,subHeadStyle:p,headingStyle:x,bodyStyle:o}=Rr();return e.jsxs(n,{...d,flexDir:"column",children:[e.jsx(r,{...p,mt:"4%",children:i}),e.jsxs(n,{...a,flexDir:"row",justify:"space-between",mt:"10px",w:"88%",children:[e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})})]}),e.jsxs(n,{...a,flexDir:"row",justify:"space-between",mt:"10px",w:"88%",children:[e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})})]}),e.jsxs(n,{...a,flexDir:"row",justify:"space-between",mt:"10px",w:"88%",children:[e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})})]}),e.jsxs(n,{...a,flexDir:"row",justify:"space-between",mt:"10px",w:"88%",children:[e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})})]}),e.jsxs(n,{...a,flexDir:"row",justify:"space-between",mt:"10px",w:"88%",children:[e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})}),e.jsx(c,{borderColor:"#00000027",spacing:"0.5rem",colorScheme:"gray",children:e.jsx(r,{...o,color:"black",children:"26"})})]})]})},Rr=()=>({root:{w:"100%",mb:"2%"},lowerSec:{w:"100%",align:"center"},headingStyle:{fontSize:["14px","12px","14px","16px","18px"]},subHeadStyle:{fontSize:["14px","12px","12px","12px","14px"]},bodyStyle:{fontSize:["14px","14px","12px","12px","12px"],color:"#999999"}}),Er=()=>{const{root:i,headingStyle:t,bodyStyle:d,saveButton:a}=Mr();return e.jsxs(n,{...i,flexDir:"column",children:[e.jsxs(n,{justify:"space-between",align:"flex-end",children:[e.jsxs(n,{flexDir:"column",children:[e.jsx(r,{...t,children:"Sizes"}),e.jsx(r,{...d,children:"Use my sizes filter to personalize your search results."})]}),e.jsx(w,{...a,as:"button",children:e.jsx(r,{fontSize:["14px","12px","12px","12px","14px"],children:"Save"})})]}),e.jsxs(n,{flexDir:"column",children:[e.jsx(G,{head:"Tops",body:""}),e.jsx(Dr,{head:"Bottoms",body:""}),e.jsx(G,{head:"Outwear",body:""}),e.jsx(Ir,{head:"Footwear",body:""}),e.jsx(Fr,{head:"Tailoring",body:""}),e.jsx(G,{head:"Accessories",body:""})]})]})},Mr=()=>({root:{w:"100%",h:"100%"},headingStyle:{fontSize:["14px","12px","14px","16px","18px"]},bodyStyle:{fontSize:["14px","14px","12px","12px","12px"],color:"#999999"},subHeadStyle:{fontSize:["14px","12px","12px","12px","14px"],mt:"4%"},manageButton:{borderWidth:1,borderColor:"#000000",px:"2%",borderRadius:"100px",h:"30px"},saveButton:{borderWidth:1,borderColor:"#000000",px:"2%",borderRadius:"100px",h:"30px"}}),Nr=s.lazy(()=>Y(()=>import("./index-6268e043.js"),["assets/index-6268e043.js","assets/index-43f03252.js","assets/index-ed5220eb.css"])),Tr=()=>{const{root:i,rootBox:t,leftSection:d,rightSection:a,singleRouteStyle:p}=Br(),[x,o]=s.useState(0),m=[{route:"Edit Profile",view:e.jsx(s.Suspense,{fallback:e.jsx(b,{size:"sm"}),children:e.jsx(br,{})},"1")},{route:"Sizes",view:e.jsx(s.Suspense,{fallback:e.jsx(b,{size:"sm"}),children:e.jsx(Er,{})},"2")},{route:"Security",view:e.jsx(s.Suspense,{fallback:e.jsx(b,{size:"sm"}),children:e.jsx(vr,{})},"3")},{route:"Notifications",view:e.jsx(s.Suspense,{fallback:e.jsx(b,{size:"sm"}),children:e.jsx(Cr,{})},"6")}];return e.jsxs(n,{flexDir:"column",children:[e.jsx(s.Suspense,{fallback:e.jsx(b,{size:"sm"}),children:e.jsx(Nr,{borderBottomWidth:"0px"})}),e.jsxs(pr,{children:[e.jsx(mr,{...i,children:e.jsxs(n,{...t,children:[e.jsx(n,{...d,flexDir:"column",children:m==null?void 0:m.map((g,S)=>e.jsx(n,{...p,as:"button",onClick:()=>o(S),bg:S===x?"white":"transparent",children:e.jsx(r,{fontSize:["14px","14px","14px","14px","14px"],children:g.route})},O()))}),e.jsx(n,{...a,overflowY:"scroll",children:m==null?void 0:m.map((g,S)=>S===x&&g.view)})]})}),"`"]})]})},Ar=Tr,Br=()=>({root:{w:"100%",h:"600px",mt:"108px",pt:"3%",overflow:"hidden"},rootBox:{w:"100%",h:"100%",borderRadius:"15px",overflow:"hidden",borderWidth:"1px",borderColor:"#00000007"},leftSection:{h:"100%",w:"25%",bg:"#F2F2F2"},rightSection:{h:"100%",w:"75%",p:"3%"},singleRouteStyle:{w:"100%",h:"8%",borderBottomWidth:"1px",borderBottomColor:"#0000001C",align:"center",pl:"3%"}}),eo=Object.freeze(Object.defineProperty({__proto__:null,default:Ar},Symbol.toStringTag,{value:"Module"}));export{_e as S,eo as i};