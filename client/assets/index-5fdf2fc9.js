import{j as e,F as c,al as T,T as r,h as E,U as Ge,n as G,d as z,r as t,S as C,bB as me,H as V,i as ie,I as P,f as X,b6 as je,l as Pe,C as D,g as te,B as le,a as be,a$ as Ye,o as de,M as xe,k as he,b as ge,bf as Je,bg as qe,V as Te,bj as Fe,a4 as ce,W as fe,bk as He,a2 as F,ai as pe,ca as Qe,cb as Xe,cc as Ze,u as Be,cd as Ke,O as oe,ce as es,cf as ss,D as ns,bC as as,_ as re,c as is,E as ts,bd as ls,$ as Q,aT as os,cg as rs,ch as cs,ci as ds,z as ne,G as ae,cj as xs,v as hs}from"./index-49b376e0.js";import{L as fs}from"./index-885dbe91.js";import{S as Ie}from"./index-4f089a55.js";import{A as $e,a as We,b as Ne,c as Ue,d as Ve}from"./chunk-CRBMUVJA-1b294459.js";import{s as ms}from"./spinning_loader-158d8410.js";import{S as js}from"./chunk-3RSXBRAN-0c5dbf32.js";import{P as bs,a as gs}from"./chunk-I5V4ORUK-0c1d537f.js";import{a as ps,b as us}from"./index.esm-5a254af8.js";import{S as ws}from"./chunk-W7A7QDAK-6d8480b1.js";import{L as De}from"./chunk-K7XRJ7NL-859c5bd8.js";import"./index-99bf17d8.js";const ys=({reviews:a})=>{var x,n;return e.jsx(c,{width:"90%",flexDir:"column",children:e.jsx($e,{defaultIndex:[3],allowMultiple:!0,children:e.jsxs(We,{borderWidth:0,mb:5,children:[e.jsx("h2",{children:e.jsxs(Ne,{_hover:{},borderWidth:0,px:0,children:[e.jsx(T,{flex:"1",textAlign:"left",children:e.jsxs(r,{fontSize:"20px",children:["Reviews(",((x=a==null?void 0:a.reviews)==null?void 0:x.length)||0,")"]})}),e.jsx(Ie,{name:"rate2",editing:!1,starColor:"#000000",emptyStarColor:"#999999",starCount:5,value:(a==null?void 0:a.total)||0}),e.jsx(Ue,{zIndex:-10})]})}),e.jsx(Ve,{px:"0px",children:e.jsx(c,{flexDir:"column",align:"flex-start",children:(n=a==null?void 0:a.reviews)==null?void 0:n.map(i=>{var b,m;return e.jsxs(E,{align:"flex-start",mb:"20px",children:[e.jsx(r,{fontSize:"16px",fontWeight:400,mb:"5px",children:i==null?void 0:i.title}),e.jsxs(c,{align:"center",children:[e.jsx(Ie,{name:"rate2",editing:!1,starColor:"#000000",emptyStarColor:"#999999",starCount:5,value:Number(i==null?void 0:i.rating)}),e.jsxs(r,{ml:"5px",fontSize:"10px",color:"#999999",children:[(m=(b=i==null?void 0:i.user)==null?void 0:b.customer)==null?void 0:m.name," −"]}),e.jsx(r,{ml:"5px",fontSize:"10px",color:"#999999",children:Ge(i==null?void 0:i.createdAt).format("DD MMM YYYY")})]}),e.jsx(r,{fontSize:"12px",children:i==null?void 0:i.review})]},G())})})})]},G())})})},Ss=({redeemOnOpen:a,redeemIsOpen:x,redeemOnClose:n,product:i,restFns:b})=>{var j;const{token:m}=z(s=>s.authReducer),[f,w]=t.useState(!1);async function h(){w(!0);try{w(!0);const{status:s}=await te.post(`${le}/redeem`,{offerId:i==null?void 0:i.id,amount:i==null?void 0:i.point_discount,quantity:1},{headers:{Authorization:`Bearer ${m}`}});setTimeout(()=>{s===200&&(b(),n(),w(!1))},2e3)}catch(s){console.log(s,"SIMULATE_REDEEM_ERR"),w(!1)}finally{}}return e.jsx(t.Suspense,{fallback:e.jsx(C,{size:"sm"}),children:e.jsx(me,{isOpen:x,onClose:n,closeOnOverlayClick:!1,children:e.jsxs(E,{children:[e.jsx(V,{fontSize:"14px",children:"Redeem now"}),e.jsx(r,{pt:"5px",pb:"20px",children:"You are about to be redirected to the official brand's website to complete your purchase process."}),e.jsxs(ie,{w:"100%",justifyContent:"center",children:[e.jsx(P,{src:X.appLogo,w:"50px",h:"50px",borderRadius:"70px",objectFit:"contain",bg:"#9999993B"}),f?e.jsx(je,{style:{width:"50px",height:"50px"},animationData:ms,loop:!0,autoplay:!0}):e.jsx(r,{children:"-------------------connect-------------------"}),e.jsx(P,{src:(j=i==null?void 0:i.brand)==null?void 0:j.logo,w:"50px",h:"50px",borderRadius:"70px",objectFit:"contain",bg:"#9999993B"})]}),e.jsx(Pe,{isLoading:f,bg:"dark",mt:"3%",color:"white",h:"40px",borderRadius:0,_hover:{bg:"dark"},onClick:()=>{var s;((s=i==null?void 0:i.reward)==null?void 0:s.rewardType)==="REGULARPOINTS"&&h()},children:e.jsx(r,{children:"Continue"})}),e.jsx(D,{bg:"light",color:"dark",h:"40px",borderWidth:1,mt:"2px",onClick:()=>{w(!1),n()},as:"button",children:e.jsx(r,{children:"Cancel"})})]})})})},Cs=({isOpenModal:a,onCloseModal:x,restFns:n})=>{const i=be(),{token:b}=z(d=>d.authReducer),[m,f]=t.useState(""),[w,h]=t.useState(!1),[j]=Ye();async function s(){m&&(h(!0),await j({name:m}).then(async({data:d})=>{d.status===200&&(await i(he({token:b})),x(),n())}).catch(d=>{}).finally(()=>{h(!1),f("")}))}return e.jsx(t.Suspense,{fallback:e.jsx(C,{size:"sm"}),children:e.jsx(me,{isOpen:a,onClose:x,closeOnOverlayClick:!1,children:e.jsxs(E,{children:[e.jsx(r,{children:"Create new collection"}),e.jsx(de,{variant:"outline",my:"2vw",h:"40px",_placeholder:{color:"#cfcfcf"},borderRadius:0,placeholder:"Collection name",value:m,onChange:({target:d})=>{f(d.value)}}),e.jsx(xe,{}),e.jsx(Pe,{isLoading:w,bg:"dark",color:"white",h:"40px",borderRadius:0,_hover:{bg:"dark"},onClick:s,disabled:!m,children:e.jsx(r,{children:"Next"})}),e.jsx(D,{bg:"light",color:"dark",h:"40px",borderWidth:1,mt:"2px",onClick:x,as:"button",children:e.jsx(r,{children:"Cancel"})})]})})})},ks=({product:a,onClose3:x,isOpen3:n,restFns:i})=>{const{desc:b,search:m,head:f}=Os(),w=ge(),[h,j]=t.useState(""),[s,d]=t.useState(""),[Z,g]=t.useState(0),[p,O]=t.useState(""),[B,_]=t.useState(!1),[Y,K]=t.useState(""),[k,v]=t.useState(""),[$,W]=t.useState(!1),[ee,L]=t.useState(!1),[J]=Je(),[q]=qe();async function N(){var y;h.includes("@")&&(L(!0),await q({rewardId:(y=a==null?void 0:a.reward)==null?void 0:y.id,emailCode:s}).then(l=>{var S,M,R;if(l.error){O((M=(S=l==null?void 0:l.error)==null?void 0:S.data)==null?void 0:M.error);return}(R=l==null?void 0:l.data)!=null&&R.synced&&(F(w,"Brand connected successfully"),setTimeout(()=>{i(),d(""),j(""),_(!1),g(2)},300))}).catch(l=>{console.log(l,"SendEmailVerificationForSyncERR")}).finally(()=>{L(!1)}))}async function H(){var y;h.includes("@")&&(W(!0),await J({rewardId:(y=a==null?void 0:a.reward)==null?void 0:y.id,email:h}).then(l=>{l!=null&&l.data&&(_(!0),F(w,"OTP sent successfully"))}).catch(l=>{console.log(l,"ERR")}).finally(()=>{W(!1)}))}const U=()=>{var y,l,S,M,R,se;switch(Z){case 0:return e.jsxs(E,{children:[e.jsxs(c,{flexDir:"row",justify:"space-between",children:[e.jsxs(V,{...f,children:["Sync ",(y=a==null?void 0:a.reward)==null?void 0:y.name," Rewards"]}),e.jsx(D,{as:"button",onClick:x,children:e.jsx(P,{w:"30px",h:"30px",src:X.cancel_icon})})]}),e.jsxs(c,{flexDir:"row",align:"center",justify:"space-between",py:"2%",children:[e.jsxs(D,{w:"100px",h:"100px",overflow:"hidden",children:[e.jsx(P,{borderRadius:"10px",objectFit:"contain",src:(l=a==null?void 0:a.reward)==null?void 0:l.rewardImage}),e.jsx(T,{w:"100px",h:"100px",borderRadius:"100px",pos:"absolute",bg:"#9999992D"})]}),e.jsx(r,{...b,noOfLines:4,w:"100%",pl:"3%",children:(S=a==null?void 0:a.brand)==null?void 0:S.description})]}),e.jsx(V,{...f,children:"What you’ll get"}),e.jsx(c,{flexDir:"column",bg:"#f6f6f6",p:"5%",borderRadius:"15px",children:[`Authorize Me app to access your reward balance with ${(M=a==null?void 0:a.brand)==null?void 0:M.brandName}`,`Me app will Read reward balance from ${(R=a==null?void 0:a.brand)==null?void 0:R.brandName}`,"Me app will monitor changes in reward balance "].map(u=>e.jsxs(c,{children:[e.jsx(D,{bg:"#000000",w:"20px",h:"20px",borderRadius:"20px",children:e.jsx(fe,{as:He,color:"light"})}),e.jsx(r,{...b,noOfLines:2,pl:"2%",w:"100%",children:u})]},G()))}),e.jsx(t.Suspense,{fallback:e.jsx(C,{size:"sm"}),children:e.jsx(ce,{isLoading:$,onClick:()=>g(1),name:`Connect with ${((se=a==null?void 0:a.reward)==null?void 0:se.rewardName)||"reward"}`})})]});case 1:return e.jsxs(E,{children:[e.jsxs(c,{flexDir:"row",justify:"space-between",children:[e.jsx(V,{...f,children:"Verify identity "}),e.jsx(D,{as:"button",onClick:()=>{g(0),x(),v(""),_(!1),O("")},children:e.jsx(P,{src:X.cancel_icon,w:"30px",h:"30px"})})]}),e.jsx(r,{...b,w:"100%",pt:"1%",children:"Please select your preferred means of identification from the available options below"}),e.jsx(c,{...m,children:e.jsx(js,{color:"dark",onChange:({target:u})=>{v(u.value)},value:k,variant:"unstyled",placeholder:"Select verification option",size:"md",_placeholder:{color:"#999999"},children:["Email","Phone number"].map(u=>e.jsx("option",{value:u,children:u},G()))})}),k&&e.jsx(E,{children:k==="Email"?e.jsx(de,{...m,value:h,onChange:u=>{j(u.target.value)},placeholder:"Enter email address"}):e.jsx(de,{...m,value:Y,onChange:u=>{K(u.target.value)},placeholder:"Enter phone number"})}),B&&e.jsxs(T,{my:"3%",children:[e.jsx(r,{fontSize:"10px",children:"Please provide the OTP sent to your inbox"}),e.jsx(ie,{w:"100%",h:"60px",children:e.jsx(bs,{onComplete:u=>{d(u),O("")},otp:!0,placeholder:"*",children:[1,2,3,4,5,6].map(()=>e.jsx(gs,{bg:"grey",borderRadius:10,borderWidth:0,w:"15%",h:"100%"},G()))})})]}),p&&e.jsx(r,{...b,color:"red",children:p}),e.jsx(t.Suspense,{fallback:e.jsx(C,{size:"sm"}),children:e.jsx(ce,{isLoading:ee||$,onClick:()=>{if(B){N();return}H()},isDisabled:!h.includes("@"),name:"Continue"})})]});case 2:return e.jsx(E,{w:"100%",children:e.jsxs(Te,{children:[e.jsx(je,{style:{width:"150px",height:"150px"},animationData:Fe,loop:!1,autoplay:!0}),e.jsx(V,{fontSize:"18px",pb:"10px",children:"Brand connected successfully"}),e.jsx(t.Suspense,{fallback:e.jsx(C,{size:"sm"}),children:e.jsx(ce,{name:"Ok",onClick:()=>{g(0),x(),v(""),_(!1),O(""),setTimeout(()=>{window.scrollTo({top:0,behavior:"smooth"})},100)}})})]})})}};return e.jsx(t.Suspense,{fallback:e.jsx(C,{size:"sm"}),children:e.jsx(me,{isOpen:n,onClose:x,closeOnOverlayClick:!1,children:U()})})},Os=()=>({desc:{pb:"5px",fontSize:{base:"12px",md:"15px"},w:{base:"100%",md:"80%"}},search:{w:"100%",h:"40px",background:"#F6F6F6",borderRadius:"53px",justify:"flex-start",align:"center",pl:"2%",borderWidth:"0px",_placeholder:{color:"#999999"},_focus:{borderColor:"black"},mt:"1%",mb:"2%"},head:{fontSize:{base:"12px",md:"14px"}}});function vs(a){return pe({tag:"svg",attr:{fill:"currentColor",viewBox:"0 0 16 16"},child:[{tag:"path",attr:{d:"M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"}}]})(a)}function Rs(a){return pe({tag:"svg",attr:{fill:"currentColor",viewBox:"0 0 16 16"},child:[{tag:"path",attr:{d:"M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"}}]})(a)}function As(a){return pe({tag:"svg",attr:{fill:"currentColor",viewBox:"0 0 16 16"},child:[{tag:"path",attr:{d:"M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"}}]})(a)}const Es=({isOpen:a,onClose:x,product:n,product_loading:i,rewardsFetching:b,onToggle:m,onOpenModal:f,onOpen3:w})=>{var N,H,U,y;t.useRef();const h=be(),j=ge(),{token:s}=z(l=>l.authReducer),{user_data:d,user_collection:Z}=z(l=>l.userReducer),{task_instruction_details:g}=z(l=>l.bountyReducer),{data:p,refetch:O,isFetching:B}=Qe({offerId:n==null?void 0:n.id},{refetchOnMountOrArgChange:!0,skip:!s||!(n!=null&&n.id)}),[_]=Xe(),[Y]=Ze();Be();const[K,k]=t.useState(!1);t.useState(!0);const[v,$]=t.useState({});t.useState(""),t.useState([]);const{getTokenBalance:W,loading:ee}=Ke(),L=(N=n==null?void 0:n.reward)==null?void 0:N.contractAddress;t.useEffect(()=>{(async()=>L&&$(await W(L)))()},[L,n]);async function J(l){k(!0),await _({collection_id:l,offerId:n==null?void 0:n.id}).then(async({data:S})=>{S.statusCode===200&&(await O(),await h(he({token:s})),F(j,"Added to favorite",2e3,"bottom-right")),g&&(await te.post(`${le}/tasks/complete_user_task`,{task_id:g==null?void 0:g.id},{headers:{Authorization:`Bearer ${s}`}}),h(as({task_id:g==null?void 0:g.id,token:s})))}).catch(()=>{}).finally(()=>{k(!1)})}async function q(){k(!0),await Y({offerId:n==null?void 0:n.id}).then(async({data:l})=>{console.log(l,"delete"),l.statusCode===200&&(await O(),await h(he({token:s})),F(j,"Removed from favorite",2e3,"bottom-right"))}).catch(l=>{console.log(l,"delete error")}).finally(()=>{k(!1)})}return e.jsxs(e.Fragment,{children:[s&&(B?e.jsx(C,{size:"sm",my:"20px"}):e.jsxs(ie,{as:"button",my:"20px",onClick:()=>{p!=null&&p.data?q():J()},w:"15%",children:[e.jsx(fe,{w:"24px",h:"24px",as:p!=null&&p.data?ps:us}),e.jsx(r,{children:p!=null&&p.data?"Liked":"Like"})]})),e.jsx(oe,{isLoaded:!i,children:e.jsxs(c,{color:"dark",fontSize:"22px",align:"center",children:[e.jsxs(r,{children:[n==null?void 0:n.tokens," ",(H=n==null?void 0:n.reward)==null?void 0:H.rewardSymbol," ·"," "]}),e.jsxs(r,{color:"#999999",fontSize:"16px",ml:"5px",children:[" ",Number(n==null?void 0:n.discountPercentage),"% coupon"]})]})}),s&&((U=d==null?void 0:d.customer)==null?void 0:U.walletAddress)&&e.jsxs(r,{color:"#999999",children:["Available: ",v==null?void 0:v.balance," ",(y=n==null?void 0:n.reward)==null?void 0:y.rewardSymbol]}),e.jsx(oe,{isLoaded:!i,children:e.jsx(r,{color:"dark",mt:"10px",mb:"30px",w:"75%",textAlign:"justify",children:n==null?void 0:n.description})}),e.jsxs(c,{flexDir:"column",children:[e.jsx(r,{children:"Share"}),e.jsx(ie,{w:"40%",justify:"space-between",mt:"10px",children:[{medium:"facebook",icon:es},{medium:"twitter",icon:Rs},{medium:"linkedin",icon:ss},{medium:"url",icon:vs},{medium:"whatsapp",icon:As}].map(l=>e.jsx(c,{as:"a",mr:"3px",border:"1px solid #000000",_hover:{bg:"#F3F3F3"},borderRadius:"30px",alignItems:"center",justify:"center",width:"40px",height:"40px",cursor:"pointer",onClick:async()=>{var S;F(j,"Offer link has been copied to clipboard, you can now share",7e3,"top-left"),navigator.clipboard.writeText(`meappbounty.com/productDetails/${n==null?void 0:n.offerCode}`),await te.post(`${le}/shares`,{offer_id:n==null?void 0:n.id,medium:l.medium,user_id:(S=d==null?void 0:d.customer)==null?void 0:S.id},{headers:{Authorization:`Bearer ${s}`}})},children:e.jsx(fe,{w:"20px",h:"20px",as:l.icon})},G()))})]}),e.jsx(ns,{orientation:"horizontal",mt:"10px",mb:"20px",width:"82%",zIndex:-10})]})},zs=t.lazy(()=>re(()=>import("./index-db90b50c.js"),["assets/index-db90b50c.js","assets/index-49b376e0.js","assets/index-ed5220eb.css","assets/index-67f8e65d.js","assets/countries-e12a8af3.js","assets/chunk-3RSXBRAN-0c5dbf32.js","assets/chunk-K7XRJ7NL-859c5bd8.js"])),_s=t.lazy(()=>re(()=>import("./index-49b376e0.js").then(a=>a.cR),["assets/index-49b376e0.js","assets/index-ed5220eb.css"])),Ls=t.lazy(()=>re(()=>import("./index-49b376e0.js").then(a=>a.cT),["assets/index-49b376e0.js","assets/index-ed5220eb.css"])),Ms=t.lazy(()=>re(()=>import("./index-49b376e0.js").then(a=>a.cS),["assets/index-49b376e0.js","assets/index-ed5220eb.css"])),Is=()=>{var ue,we,ye,Se,Ce,ke,Oe,ve,Re,Ae,Ee,ze,_e;const a=ge();let x=Be();is();const n=be(),{id:i}=ts(),{loading:b,setUpWallet:m}=ls(),{token:f,session_id:w}=z(o=>o.authReducer),{user_data:h}=z(o=>o.userReducer),{reviews:j,product:s,product_loading:d}=z(o=>o.productReducer),{cartItems:Z}=z(o=>o.cartReducer),{isOpen:g,onToggle:p,onClose:O}=Q(),{isOpen:B,onOpen:_,onClose:Y}=Q(),{isOpen:K,onOpen:k,onClose:v}=Q(),{isOpen:$,onOpen:W,onClose:ee}=Q(),{root:L,imageStyle:J,logoStyle:q}=Ds(),[N,H]=t.useState(!0),[U,y]=t.useState(!1),{isOpen:l,onOpen:S,onClose:M}=Q();os(),t.useEffect(()=>{n(rs({token:f,session_id:w,offerCode:i})),n(cs(!0))},[]),t.useEffect(()=>{s!=null&&s.id&&n(ds({token:f,offerId:s==null?void 0:s.id}))},[s,i]);function R(){return(s==null?void 0:s.inventory)<-1}const se=async()=>{try{const o=await m({persist:!1});o.publicAddress&&await te.put(`${le}/customer/setup-wallet-address`,{walletAddress:o.publicAddress},{headers:{Authorization:`Bearer ${f}`}}).then(({data:A})=>{f&&n(hs({token:f})),F(a,"Wallet created successfully",2e3),x(`${ae}/subsequentRedeeming`,{state:{...s}})}).catch(A=>{console.log(A,"UPDATeYUSERZRR")})}catch(o){console.log(o,"CREATE_WALLETERR")}},u=!!Z.find(o=>o.id===(s==null?void 0:s.id));return e.jsxs(c,{flexDir:"column",children:[e.jsx(t.Suspense,{fallback:e.jsx(C,{size:"sm"}),children:e.jsx(_s,{})}),e.jsxs(E,{...L,display:"flex",children:[e.jsxs(c,{flexDir:"row",children:[e.jsx(c,{w:"50vw",bg:"grey",flexDir:"column",children:(ue=s==null?void 0:s.offerImages)==null?void 0:ue.map(o=>e.jsx(oe,{isLoaded:N,overflow:"hidden",children:e.jsx(P,{src:o==null?void 0:o.url,objectFit:"cover",...J,mixBlendMode:"multiply"})},ne()))}),e.jsxs(c,{w:"50vw",flexDir:"column",px:"80px",py:"30px",children:[e.jsxs(c,{w:"600px",flexDir:"column",children:[e.jsx(ws,{isLoaded:!d,w:"100px",h:"100px",children:e.jsx(T,{as:"button",onClick:()=>{var o,A,I;return x(`${ae}/dashboard/shop/${(o=s==null?void 0:s.brand)==null?void 0:o.id}`,{state:{id:(A=s==null?void 0:s.brand)==null?void 0:A.id,slug:(I=s==null?void 0:s.brand)==null?void 0:I.slug,brandName:s==null?void 0:s.brandName}})},children:e.jsx(P,{src:(we=s==null?void 0:s.brand)==null?void 0:we.logo,objectFit:"contain",...q,fallbackSrc:X.appLogoPlaceholder,fallbackStrategy:"beforeLoadOrError",mixBlendMode:"multiply"})})}),e.jsx(r,{color:"#D0D0D0",fontSize:"20px",mb:"20px",textTransform:"uppercase",children:s==null?void 0:s.offerCode}),e.jsx(oe,{isLoaded:!d,children:e.jsx(r,{lineHeight:"48px",w:"80%",fontSize:"40px",textTransform:"uppercase",children:s==null?void 0:s.name})}),e.jsx(Es,{isOpen:g,onClose:O,product:s,product_loading:d,onToggle:p,onOpenModal:k,onOpen3:W,rewardsFetching:U})]}),((ye=j==null?void 0:j.reviews)==null?void 0:ye.length)>0&&e.jsx(ys,{reviews:j}),(Se=s==null?void 0:s.brand)!=null&&Se.online_stores||(Ce=s==null?void 0:s.brand)!=null&&Ce.physical_stores?e.jsx(c,{width:"90%",flexDir:"column",children:e.jsx($e,{defaultIndex:[3],allowMultiple:!0,px:0,children:e.jsxs(We,{borderWidth:0,mb:5,children:[e.jsx("h2",{children:e.jsxs(Ne,{_hover:{},borderWidth:0,px:0,children:[e.jsx(T,{flex:"1",textAlign:"left",children:e.jsx(r,{fontSize:"20px",children:"Where to redeem"})}),e.jsx(Ue,{zIndex:-10})]})}),e.jsxs(Ve,{px:"0px",children:[((Oe=(ke=s==null?void 0:s.brand)==null?void 0:ke.online_stores)==null?void 0:Oe.length)>0&&e.jsxs(T,{children:[e.jsx(r,{color:"#AEAEAE",children:"Online stores"}),(Re=(ve=s==null?void 0:s.brand)==null?void 0:ve.online_stores)==null?void 0:Re.map((o,A)=>{var I,Le,Me;return e.jsxs(c,{bg:A%2===0?"grey":"white",p:"5px",my:"5px",h:"40px",align:"center",children:[e.jsx(r,{children:(I=JSON.parse(o))==null?void 0:I.name}),e.jsx(xe,{}),e.jsxs(c,{children:[e.jsx(De,{textDecoration:"underline",target:"_blank",href:`${(Le=JSON.parse(o))==null?void 0:Le.url}`,children:(Me=JSON.parse(o))==null?void 0:Me.url}),e.jsx(c,{w:"25px",h:"25px",ml:"5px",children:e.jsx(P,{src:X.linkIcon})})]})]},ne())})]}),((Ee=(Ae=s==null?void 0:s.brand)==null?void 0:Ae.physical_stores)==null?void 0:Ee.length)>0&&e.jsxs(T,{children:[e.jsx(r,{color:"#AEAEAE",mt:"30px",children:"Physical stores"}),(_e=(ze=s==null?void 0:s.brand)==null?void 0:ze.physical_stores)==null?void 0:_e.map((o,A)=>{var I;return e.jsxs(c,{bg:A%2===0?"grey":"white",p:"5px",my:"5px",h:"40px",align:"center",children:[e.jsx(r,{children:(I=JSON.parse(o))==null?void 0:I.name}),e.jsx(xe,{}),e.jsx(c,{children:e.jsx(De,{textDecoration:"underline",target:"_blank",href:"https://google.com",children:"130, Powell St, San Francisco, CA"})})]},ne())})]})]})]},ne())})}):e.jsx(e.Fragment,{}),e.jsxs(c,{justify:"space-between",children:[e.jsx(D,{as:"button",h:"80px",bg:R()?"#999999":"dark",w:"48%",color:"light",alignSelf:"center",top:"80vh",disabled:R()||b,_hover:{bg:"dark"},borderRadius:"0px",onClick:async()=>{var o;if(!f){x(`${ae}/login`);return}(o=h==null?void 0:h.customer)!=null&&o.walletAddress?x(`${ae}/subsequentRedeeming`,{state:{...s}}):await se()},children:b?e.jsx(C,{}):e.jsx(e.Fragment,{children:R()?"Out of stock":"Redeem now"})}),e.jsx(D,{as:"button",h:"80px",bg:"dark",w:"48%",color:"light",alignSelf:"center",top:"80vh",_hover:{bg:"dark"},borderRadius:"0px",onClick:()=>{u||F(a,"Added to cart"),n(xs({...s,quantity:1}))},children:u?"Added to bag":"Add to bag"})]})]})]}),e.jsx(Cs,{isOpenModal:K,onCloseModal:v,restFns:()=>{g||p()}}),e.jsx(Ss,{product:s,restFns:()=>{S()},redeemOnOpen:_,redeemOnClose:Y,redeemIsOpen:B}),e.jsx(ks,{product:s,onClose3:ee,isOpen3:$,restFns:()=>{}}),e.jsx(t.Suspense,{fallback:e.jsx(C,{size:"sm"}),children:e.jsx(Ls,{isOpen:l,onClose:M,closeOnOverlayClick:!0,children:e.jsx(E,{w:"100%",children:e.jsxs(Te,{children:[e.jsx(je,{style:{width:"150px",height:"150px"},animationData:Fe,loop:!1,autoplay:!0}),e.jsx(V,{fontSize:"18px",pb:"10px",children:"Reward redeemed successfully"}),e.jsx(t.Suspense,{fallback:e.jsx(C,{size:"sm"}),children:e.jsx(Ms,{name:"Ok",onClick:()=>{window.scrollTo({top:0,behavior:"smooth"}),M()}})})]})})})})]}),e.jsx(t.Suspense,{fallback:e.jsx(C,{size:"sm"}),children:e.jsx(zs,{})}),d&&e.jsx(fs,{})]})},Js=Is,Ds=()=>({root:{w:"100%",mt:"108px"},nameStyles:{fontSize:["20px","20px"]},button:{w:{base:"18%",md:"6%"},color:"dark",borderWidth:.5,backgroundColor:"light",fontSize:"15px"},loadMore:{w:"152px",h:"42px",alignSelf:"center",py:"10px",borderRadius:"100px"},imageStyle:{w:"100%"},addToFavPopOver:{w:"15vw"},logoStyle:{w:"100px",h:"100px",borderColor:"lightGrey",borderWidth:"0.5px"}});export{Js as default};
