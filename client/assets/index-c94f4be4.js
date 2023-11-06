import{aO as q,bu as H,bv as V,bA as J,j as e,aP as K,aQ as U,u as W,d as O,b as X,a as Z,Z as ee,bD as ae,r as h,bE as oe,h as ie,F as i,G as C,I as ne,K as I,T as n,Q as F,C as M,l as L,D,bF as te,am as se,a1 as f,g as le,B as ce,bG as re}from"./index-24aaf4e2.js";import{S as de}from"./index-e1e5d5f4.js";import"./index-da319dc7.js";function xe(c,d=[]){const t=Object.assign({},c);for(const r of d)r in t&&delete t[r];return t}var ue=["h","minH","height","minHeight"],_=q((c,d)=>{const t=H("Textarea",c),{className:r,rows:p,...x}=V(c),m=J(x),a=p?xe(t,ue):t;return e.jsx(K.textarea,{ref:d,rows:p,...m,className:U("chakra-textarea",r),__css:a})});_.displayName="Textarea";const we=({name:c,price:d,token:t,quantity:r,date:p,expired:x,image:m,rest:a})=>{const{root:P,bodyText:s,headText:$}=he();let j=W();const{token:S}=O(o=>o.authReducer),u=X(),B=Z(),{isOpen:E,onOpen:N,onClose:w}=ee(),{task_instruction_details:l}=O(o=>o.bountyReducer),[z]=ae(),[g,v]=h.useState(null),[G,T]=h.useState(!1),[b,y]=h.useState(""),[R,k]=h.useState(""),{data:fe,refetch:Y}=oe({offerId:a==null?void 0:a.offerId},{refetchOnMountOrArgChange:!0,skip:!t});async function Q(){if(!R){f(u,"Please input all fields");return}if(b.split(" ").length<5){f(u,"At least five characters required");return}if(!g){f(u,"Please select a rating");return}T(!0),await z({title:R,review:b,offerId:a==null?void 0:a.offerId,rating:g.toString()}).then(async o=>{var A;((A=o==null?void 0:o.data)==null?void 0:A.statusCode)===200&&(Y(),f(u,"Review submitted",5e3,"bottom-right"),w(),v(null),y(""),k("")),l&&(await le.post(`${ce}/tasks/complete_user_task`,{task_id:l==null?void 0:l.id},{headers:{Authorization:`Bearer ${S}`}}),B(re({task_id:l==null?void 0:l.id,token:S})))}).catch(o=>{console.log(o,"AddReviewToOfferErr")}).finally(()=>{T(!1)})}return e.jsxs(ie,{children:[e.jsxs(i,{...P,flexDir:"row",align:"center",children:[e.jsxs(i,{w:"30%",h:"70%",flexDir:"row",align:"center",justify:"space-between",children:[e.jsx(i,{w:"100px",h:"100px",flexDir:"column",bg:"grey",as:"button",onClick:()=>{var o;j(`${C}/productDetails/${(o=a==null?void 0:a.offer)==null?void 0:o.offerCode}`)},children:e.jsx(ne,{objectFit:"cover",src:m,w:"100%",h:"100%",bg:"grey",mixBlendMode:"multiply"})}),e.jsx(I,{}),e.jsxs(i,{flexDir:"column",w:"70%",h:"100px",children:[e.jsx(n,{...$,noOfLines:1,children:c}),e.jsx(I,{}),e.jsx(n,{...s,children:t}),e.jsxs(n,{...s,children:["Purchased: ",F(a==null?void 0:a.updatedAt).fromNow()]})]})]}),x&&e.jsxs(i,{w:"30%",h:"70%",flexDir:"column",align:"flex-end",children:[e.jsx(n,{...s,color:"dark",children:"Expires"}),e.jsx(n,{...s,children:F(a==null?void 0:a.updatedAt).format("DD MMM YYYY")})]}),e.jsxs(i,{w:"30%",h:"70%",align:"flex-end",flexDir:"column",children:[e.jsx(M,{...s,as:L,_hover:{bg:"dark"},color:"light",w:"35%",h:"30%",isDisabled:!(a!=null&&a.coupon),bg:"dark",onClick:()=>{j(`${C}/dashboard_my_deals_details`,{state:{...a}})},children:"View details"}),e.jsx(n,{as:"button",...s,opacity:a!=null&&a.couponId?1:.4,onClick:()=>{a.couponId&&N()},children:x?"View voucher":"Leave Review"}),e.jsx(n,{as:a!=null&&a.isRedeemed?"text":"button",...s,children:a!=null&&a.isRedeemed?"Redeemed":`Status: ${a.status}`}),e.jsx(n,{as:"button",...s,opacity:a!=null&&a.couponId?1:.4,onClick:()=>{var o;a.couponId&&j(`${C}/productDetails/${(o=a==null?void 0:a.offer)==null?void 0:o.offerCode}`)},children:"Buy it again"})]})]}),e.jsx(D,{}),e.jsxs(te,{isOpen:E,onClose:w,closeOnOverlayClick:!0,children:[e.jsx(n,{mb:"24px",children:"Leave review"}),e.jsx(D,{}),e.jsxs(i,{mt:"16px",mb:"16px",flexDir:"column",justify:"center",alignItems:"center",children:[e.jsx(n,{children:"My overall rating"}),e.jsx(i,{children:e.jsx(de,{name:"rate2",starColor:"#000000",emptyStarColor:"#999999",starCount:5,value:g,onStarClick:o=>{v(o)}})})]}),e.jsx(D,{}),e.jsxs(i,{mt:"20px",flexDir:"column",children:[e.jsx(i,{w:"100%",children:e.jsx(se,{variant:"outline",borderRadius:"0px",value:R,onChange:({target:o})=>k(o.value),h:"46px",placeholder:"Review headline or summary",_placeholder:{opacity:1,color:"#AFAFAF"}})}),e.jsx(i,{mt:"16px",w:"100%",flexDir:"column",children:e.jsx(_,{variant:"outline",borderRadius:"0px",value:b,onChange:({target:o})=>y(o.value),placeholder:"Write your review here. It must be at least 5 characters long.",_placeholder:{opacity:1,color:"#AFAFAF"},size:"sm"})})]}),e.jsx(i,{align:"center",mt:"24px",children:e.jsx(L,{isLoading:G,w:"100%",h:"48px",bg:"black",_hover:{bg:"dark"},onClick:()=>Q(),children:e.jsx(n,{color:"white",children:"Submit"})})}),e.jsx(i,{align:"center",mt:"10px",children:e.jsx(M,{as:"button",w:"100%",h:"48px",border:"1px solid black",onClick:()=>{v(null),y(""),k(""),w()},children:e.jsx(n,{color:"black",children:"Cancel"})})})]})]})},he=()=>({root:{w:"100%",h:"150px",justify:"space-between"},headText:{fontSize:"16px"},bodyText:{fontSize:"12px",color:"#999999"}});export{we as default};
