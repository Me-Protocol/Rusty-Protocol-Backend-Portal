import{r as o,_,a as Ce,b as ve,Y as N,u as Ee,d as G,as as Oe,at as ke,au as Re,av as _e,aw as ze,j as e,S as u,m as Y,h as l,H as c,T as t,C as h,V as O,F as n,G as Le,M as Q,ax as X,I as k,f as Z,ay as Pe,y as R,an as q,al as J,i as Me,O as Ae,az as Ie,g as Be,B as De,t as Fe,a0 as K,aA as Ve}from"./index-a17d5818.js";import"./index-4dc734a2.js";import Te from"./index-7702bf5a.js";import{S as We}from"./chunk-3RSXBRAN-8faf8567.js";import{P as Ue,a as $e}from"./chunk-I5V4ORUK-4c27738c.js";import"./formik.esm-80614322.js";import"./index-e571f8c9.js";import"./index-a812ae9e.js";import"./index-141f022b.js";import"./ResizeObserver.es-f4289e8a.js";import"./ReactCardFlip-a3368217.js";const m=o.lazy(()=>_(()=>import("./index-a17d5818.js").then(i=>i.cS),["assets/index-a17d5818.js","assets/index-ed5220eb.css"])),He=o.lazy(()=>_(()=>import("./index-615146a0.js"),["assets/index-615146a0.js","assets/index-a17d5818.js","assets/index-ed5220eb.css"])),ee=o.lazy(()=>_(()=>import("./index-a17d5818.js").then(i=>i.cT),["assets/index-a17d5818.js","assets/index-ed5220eb.css"])),Ne=()=>{var V,T,W,U;const i=Ce(),z=ve(),{isOpen:se,onOpen:Ye,onClose:f}=N(),{isOpen:ae,onOpen:oe,onClose:L}=N();let ne=Ee();const{token:j}=G(s=>s.authReducer),{setUpWallet:re,loading:te}=Oe(),{user_data:r}=G(s=>s==null?void 0:s.userReducer),{data:S,isLoading:Qe}=ke({page:1,limit:7},{refetchOnMountOrArgChange:!0}),[ie]=Re(),[le]=_e();ze();const[ce,w]=o.useState(0),[P,M]=o.useState(!1),[de,A]=o.useState(""),[I,b]=o.useState(""),[pe,B]=o.useState(!1),[D,y]=o.useState(!1),[d,F]=o.useState(""),[xe,ue]=o.useState(""),[a,Xe]=o.useState({}),[C,v]=o.useState(""),{root:he,head:g,desc:p,rewardBox:me,search:E,Box1:fe,center1:je,pintf1:we}=Ge();async function be(){d.includes("@")&&(B(!0),await le({rewardId:a.id,emailCode:de}).then(s=>{var x,$,H;if(s.error){b(($=(x=s==null?void 0:s.error)==null?void 0:x.data)==null?void 0:$.error);return}(H=s==null?void 0:s.data)!=null&&H.synced&&(K(z,"Brand connected successfully"),setTimeout(()=>{i(Ve({token:j})),A(""),F(""),y(!1),w(2)},300))}).catch(s=>{console.log(s,"SendEmailVerificationForSyncERR")}).finally(()=>{B(!1)}))}async function ye(){d.includes("@")&&(M(!0),await ie({rewardId:a.id,email:d}).then(s=>{s!=null&&s.data&&(y(!0),K(z,"OTP sent successfully"))}).catch(s=>{console.log(s,"ERR")}).finally(()=>{M(!1)}))}const ge=()=>{switch(ce){case 0:return e.jsxs(l,{children:[e.jsxs(n,{flexDir:"row",justify:"space-between",children:[e.jsxs(c,{...g,children:["Sync ",a==null?void 0:a.name," Rewards"]}),e.jsx(h,{as:"button",onClick:f,children:e.jsx(k,{w:"30px",h:"30px",src:Z.cancel_icon})})]}),e.jsxs(n,{flexDir:"row",align:"center",justify:"space-between",py:"2%",children:[e.jsxs(h,{w:"100px",h:"100px",overflow:"hidden",children:[e.jsx(k,{borderRadius:"10px",objectFit:"contain",src:a==null?void 0:a.rewardImage}),e.jsx(J,{...fe,pos:"absolute"})]}),e.jsx(t,{...p,noOfLines:4,w:"100%",pl:"3%",children:a==null?void 0:a.description})]}),e.jsx(c,{...g,children:"What you’ll get"}),e.jsx(n,{flexDir:"column",bg:"#f6f6f6",p:"5%",borderRadius:"15px",children:[`Authorize Me app to access your reward balance with ${a==null?void 0:a.brandName}`,`Me app will Read reward balance from ${a==null?void 0:a.brandName}`,"Me app will monitor changes in reward balance "].map(s=>e.jsxs(n,{children:[e.jsx(h,{...je,children:e.jsx(Ae,{as:Ie,color:"light"})}),e.jsx(t,{...p,noOfLines:2,pl:"2%",w:"100%",children:s})]},R()))}),e.jsx(m,{isLoading:P,onClick:()=>w(1),name:`Connect with ${(a==null?void 0:a.rewardName)||"reward"}`})]});case 1:return e.jsxs(l,{children:[e.jsxs(n,{flexDir:"row",justify:"space-between",children:[e.jsx(c,{...g,children:"Verify identity "}),e.jsx(h,{as:"button",onClick:()=>{w(0),f(),v(""),y(!1),b("")},children:e.jsx(k,{src:Z.cancel_icon,w:"30px",h:"30px"})})]}),e.jsx(t,{...p,w:"100%",pt:"1%",children:"Please select your preferred means of identification from the available options below"}),e.jsx(n,{...E,children:e.jsx(Pe,{my:"5px",children:e.jsx(We,{color:"dark",onChange:({target:s})=>{v(s.value)},value:C,variant:"unstyled",placeholder:"Select verification option",size:"md",_placeholder:{color:"#999999"},children:["Email","Phone number"].map(s=>e.jsx("option",{value:s,children:s},R()))})})}),C&&e.jsx(l,{children:C==="Email"?e.jsx(q,{...E,value:d,onChange:s=>{F(s.target.value)},placeholder:"Enter email address"}):e.jsx(q,{...E,value:xe,onChange:s=>{ue(s.target.value)},placeholder:"Enter phone number"})}),D&&e.jsxs(J,{my:"3%",children:[e.jsx(t,{fontSize:"10px",children:"Please provide the OTP sent to your inbox"}),e.jsx(Me,{w:"100%",h:"60px",children:e.jsx(Ue,{onComplete:s=>{A(s),b("")},otp:!0,placeholder:"*",children:[1,2,3,4,5,6].map(()=>e.jsx($e,{...we},R()))})})]}),I&&e.jsx(t,{...p,color:"red",children:I}),e.jsx(m,{isLoading:pe||P,onClick:()=>{if(D){be();return}ye()},isDisabled:!d.includes("@"),name:"Continue"})]});case 2:return e.jsx(l,{w:"100%",children:e.jsxs(O,{children:[e.jsx(Q,{style:{width:"150px",height:"150px"},animationData:X,loop:!1,autoplay:!0}),e.jsx(c,{fontSize:"18px",pb:"10px",children:"Brand connected successfully"}),e.jsx(m,{name:"Ok",onClick:()=>{w(0),f(),v(""),y(!1),b(""),setTimeout(()=>{window.scrollTo({top:0,behavior:"smooth"})},100)}})]})})}},Se=async()=>{try{const s=await re({persist:!1});s.publicAddress&&await Be.put(`${De}/customer/setup-wallet-address`,{walletAddress:s.publicAddress},{headers:{Authorization:`Bearer ${j}`}}).then(({data:x})=>{j&&i(Fe({token:j})),oe()}).catch(x=>{console.log(x,"UPDATeYUSERZRR")})}catch(s){console.log(s,"CREATE_WALLET ERR")}};return e.jsx(e.Fragment,{children:e.jsxs(o.Suspense,{fallback:e.jsx(u,{size:"sm"}),children:[e.jsx(o.Suspense,{fallback:e.jsx(u,{size:"sm"}),children:e.jsx(He,{pos:"relative"})}),e.jsx(Y,{children:e.jsxs(l,{...he,w:"100%",children:[e.jsx(c,{...g,children:"Sync rewards from the brands you love"}),e.jsx(t,{...p,children:"Connect your favorite brands to import rewards and get exclusive deals."}),e.jsxs(h,{as:O,...me,children:[e.jsx(n,{w:{base:"90%",md:"65%"},flexDir:"column",align:"center",children:e.jsx(Y,{alignSelf:"center",children:e.jsx(n,{w:"100%",display:{base:"none",md:"flex"},flexDir:"column",mt:5,alignSelf:"center",children:e.jsx(n,{children:e.jsx(o.Suspense,{fallback:e.jsx(u,{size:"sm"}),children:e.jsx(Te,{brandsItems:(V=S==null?void 0:S.data)==null?void 0:V.brands})})})})})}),e.jsx(o.Suspense,{fallback:e.jsx(u,{size:"sm"}),children:e.jsx(m,{isDisabled:(T=r==null?void 0:r.customer)==null?void 0:T.walletAddress,rest:{w:{base:"90%",md:"50%"}},isLoading:te,name:"Proceed",onClick:Se})}),e.jsx(n,{w:{base:"90%",md:"50%"},justifyContent:"center",onClick:()=>ne(`${Le}/dashboard`),color:((W=r==null?void 0:r.customer)==null?void 0:W.walletAddress)??"placeholderColor",_hover:{color:"dark"},children:(U=r==null?void 0:r.customer)!=null&&U.walletAddress?e.jsxs(t,{fontSize:{base:"14px",md:"16px"},children:["You have already synced your rewards."," ",e.jsxs(t,{as:"button",_hover:{color:"dark"},color:"placeholderColor",fontSize:{base:"14px",md:"16px"},children:[" ","Return to dashboard"]})]}):e.jsx(t,{as:"button",fontSize:{base:"14px",md:"16px"},children:"Do it later"})})]})]})}),e.jsx(ee,{isOpen:se,onClose:f,closeOnOverlayClick:!1,children:ge()}),e.jsx(ee,{isOpen:ae,onClose:L,closeOnOverlayClick:!0,children:e.jsx(l,{w:"100%",children:e.jsxs(O,{children:[e.jsx(Q,{style:{width:"150px",height:"150px"},animationData:X,loop:!1,autoplay:!0}),e.jsx(c,{fontSize:"18px",pb:"10px",children:"Wallet Created Successfully"}),e.jsx(o.Suspense,{fallback:e.jsx(u,{size:"sm"}),children:e.jsx(m,{name:"Ok",onClick:async()=>{window.scrollTo({top:0,behavior:"smooth"}),L()}})})]})})})]})})},is=Ne,Ge=()=>({root:{w:"100%",pt:"3%",overflow:"hidden"},head:{fontSize:{base:"18px",md:"20px"}},desc:{pb:"5px",fontSize:{base:"12px",md:"14px"},w:{base:"100%",md:"80%"}},smallerDesc:{fontSize:{base:"10px",md:"14px"}},rewardBox:{w:"100%",bg:"grey",borderRadius:10,borderWidth:1,borderColor:"placeholderColor",borderStyle:"dashed",py:"10%"},connectButton:{w:{base:"65%",md:"90%"},color:"dark",borderWidth:0,backgroundColor:"light",alignSelf:"center",justifySelf:"center"},connectedButton:{w:{base:"65%",md:"35%"},color:"light",borderWidth:1,backgroundColor:"transparent"},search:{w:"100%",h:"40px",background:"#F6F6F6",borderRadius:"53px",justify:"flex-start",align:"center",pl:"2%",borderWidth:"0px",_placeholder:{color:"#999999"},_focus:{borderColor:"black"}},Box1:{w:"100px",h:"100px",borderRadius:"100px",bg:"#9999992D"},center1:{bg:"#000000",w:"20px",h:"20px",borderRadius:"20px"},pintf1:{bg:"grey",borderRadius:10,borderWidth:0,w:"15%",h:"100%"}});export{is as default};
