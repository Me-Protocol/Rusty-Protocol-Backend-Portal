import{r as d,u as ce,X as xe,a as he,d as I,w as de,x as pe,g as je,B as ge,j as e,F as s,al as v,p as $,C as p,H as J,z as U,J as w,D as j,aC as be,aD as ue,a4 as X,aE as we,G as i,T as n,N as S,aF as Q,I as c,f as x,aG as fe,aH as me,aI as ve,l as L,i as Se,aJ as Y,aM as Fe,m as Ce,aN as ke,o as ye,aO as Re,S as Ie}from"./index-2780a68e.js";import{d as $e}from"./index-a9f6b397.js";const Le=({customPadding:Be,...q})=>{var H,P,A,G,M,V;let t=ce();const{isOpen:D,onToggle:F,onClose:ze}=xe(),C=he(),{token:f}=I(r=>r.authReducer),{user_data:o}=I(r=>r.userReducer),{cartItems:g}=I(r=>r.cartReducer);d.useState(!1);const[K,B]=d.useState(!1),[b,k]=d.useState(""),[y,u]=d.useState([]),[z,Z]=d.useState(0),[R,ee]=d.useState(0);de({page:1,limit:8,type:pe.PRODUCT},{refetchOnMountOrArgChange:300});const se=d.useCallback($e(r=>{B(!0),je.get(`${ge}/search?q=${r}`).then(a=>{var W;u((W=a==null?void 0:a.data)==null?void 0:W.result)}).catch(a=>{console.log(a,"Err SEARCH")}).finally(()=>{B(!1)})},500),[]),oe=r=>{if(!(b.length<=1)){if(!r)return u([]);se(r)}},{root:ne,container:_,font:m,search:T,shopperBox:re,infoBox:te,shopperBusiness:ie,homeIcon:E,helpText:ae,iconsLogo:N,popoverTexts:l,popoverLightTexts:O,itemBox:h,searchRoot:le,boxCircleColor:_e}=De();return e.jsxs(s,{...ne,pos:"absolute",flexDir:"column",children:[e.jsx(v,{w:"100%",bg:"black",children:e.jsx($,{children:e.jsxs(s,{bg:"black",h:"50px",align:"center",children:[e.jsx(s,{...re,flexDir:"row",children:["For Shoppers","For Businesses"].map((r,a)=>e.jsx(p,{as:"button",bg:z===a?"light":"dark",color:z===a?"dark":"light",onClick:()=>Z(a),...ie,children:e.jsx(J,{fontSize:["14px","14px","14px","14px","14px"],children:r})},U()))}),e.jsx(w,{}),f?e.jsxs(s,{...te,children:[e.jsx(p,{...ae,children:"Help"}),e.jsx(j,{orientation:"vertical",h:"12px",mx:"5px"}),e.jsxs(be,{isLazy:!0,placement:"bottom-start",children:[e.jsx(ue,{children:e.jsxs(s,{as:"button",flexDir:"row",align:"center",_hover:{bg:"white",color:"dark"},color:"light",fontSize:["14px","14px","14px","14px","14px"],children:["Hi, ",(H=o==null?void 0:o.customer)==null?void 0:H.firstName,e.jsx(X,{ml:"5px",name:`${(P=o==null?void 0:o.customer)==null?void 0:P.lastName} ${(A=o==null?void 0:o.customer)==null?void 0:A.firstName}`,src:(G=o==null?void 0:o.customer)==null?void 0:G.profilePicture,size:"sm"})]})}),e.jsxs(we,{borderRadius:"0",position:"relative",width:"15vw",background:"#FFFFFF",border:"1px",children:[e.jsxs(s,{as:"button",_hover:{bg:"#F6F6F6"},...h,onClick:()=>t(`${i}/settings`),children:[e.jsxs(s,{flexDir:"column",children:[e.jsxs(n,{...l,children:[(M=o==null?void 0:o.customer)==null?void 0:M.lastName," ",(V=o==null?void 0:o.customer)==null?void 0:V.firstName]}),e.jsx(n,{...O,children:o==null?void 0:o.email})]}),e.jsx(S,{as:Q})]}),e.jsx(j,{w:"100%"}),e.jsxs(s,{...h,h:"3vw",as:"button",_hover:{bg:"#F6F6F6"},onClick:()=>t(`${i}/dashboard/dashboard-my-assets`),children:[e.jsxs(s,{w:"100%",children:[e.jsx(c,{w:"1vw",h:"1vw",alignSelf:"center",mr:"5%",src:x.edit_Icon}),e.jsx(n,{...l,children:"My assets"})]}),e.jsx(n,{...l,alignSelf:"center"})]}),e.jsxs(s,{...h,h:"3vw",as:"button",_hover:{bg:"#F6F6F6"},onClick:()=>t(`${i}/dashboard/offers`),children:[e.jsxs(s,{w:"100%",children:[e.jsx(c,{w:"1vw",h:"1vw",alignSelf:"center",mr:"5%",src:x.edit_Icon}),e.jsx(n,{...l,children:"My Offers"})]}),e.jsx(n,{...l,alignSelf:"center",children:"0"})]}),e.jsxs(s,{...h,h:"3vw",as:"button",_hover:{bg:"#F6F6F6"},onClick:()=>t(`${i}/dashboard/dashboard-saved`),children:[e.jsxs(s,{w:"100%",children:[e.jsx(c,{w:"1vw",h:"1vw",alignSelf:"center",mr:"5%",src:x.edit_Icon}),e.jsx(n,{...l,children:"Saved"})]}),e.jsx(n,{...l,alignSelf:"center",children:"0"})]}),e.jsx(j,{w:"100%"}),e.jsxs(s,{...h,_hover:{bg:"#F6F6F6"},as:"a",href:"https://www.supremenewyork.com",children:[e.jsx(X,{mr:"5px",name:"John Doe",src:"https://pbs.twimg.com/profile_images/846716933894537216/7VCYCh5V_400x400.jpg",size:"sm"}),e.jsxs(s,{flexDir:"column",pl:"5px",w:"75%",children:[e.jsx(n,{...l,children:"Supreme"}),e.jsx(n,{as:"a",href:"https://www.supremenewyork.com",...O,noOfLines:1,textDecoration:"underline",w:"95%",children:"https://www.supremenewyork.com"})]}),e.jsx(S,{as:Q})]}),e.jsx(j,{w:"100%"}),e.jsx(s,{...h,h:"3vw",as:"button",_hover:{bg:"#F6F6F6"},onClick:()=>t(`${i}/dashboard/dashboard-my-assets`),children:e.jsxs(s,{w:"100%",children:[e.jsx(c,{w:"1vw",h:"1vw",alignSelf:"center",mr:"5%",src:x.edit_Icon}),e.jsx(n,{...l,children:"My assets"})]})}),e.jsx(s,{...h,h:"3vw",as:"button",_hover:{bg:"#F6F6F6"},onClick:()=>t(`${i}/dashboard/offers`),children:e.jsxs(s,{w:"100%",children:[e.jsx(c,{w:"1vw",h:"1vw",alignSelf:"center",mr:"5%",src:x.edit_Icon}),e.jsx(n,{...l,children:"My Offers"})]})}),e.jsx(j,{w:"100%"}),e.jsx(s,{...h,h:"3vw",as:"button",_hover:{bg:"#F6F6F6"},children:e.jsxs(s,{w:"100%",children:[e.jsx(c,{w:"1vw",h:"1vw",alignSelf:"center",mr:"5%",src:x.mobileapp_icon}),e.jsx(n,{...l,children:"Install mobile app"})]})}),e.jsx(j,{w:"100%"}),e.jsx(s,{...h,h:"3vw",as:"button",_hover:{bg:"#F6F6F6"},onClick:()=>{C(fe()),C(me()),C(ve())},children:e.jsxs(s,{w:"100%",children:[e.jsx(c,{w:"1vw",h:"1vw",alignSelf:"center",mr:"5%",src:x.logoutIcon}),e.jsx(n,{...l,children:"Logout"})]})})]})]})]}):e.jsx(s,{flexDir:"row",w:"20%",justify:"flex-end",children:["EN","FR","IT"].map((r,a)=>e.jsx(p,{as:L,w:"10%",h:"90%",color:a===R?"black":"white",borderWidth:.5,borderRadius:"100px",px:"7%",ml:"3%",_hover:{bg:a===R?"white":"dark"},bg:a===R?"white":"black",onClick:()=>{ee(a)},children:e.jsx(J,{fontSize:["14px","14px","14px","14px","14px"],children:r})},U()))})]})})}),e.jsxs(v,{w:"100%",bg:"light",children:[e.jsx($,{children:e.jsx(s,{bg:"light",h:"55px",w:"100%",display:["none","none","none","flex","flex"],...q,children:e.jsxs(Se,{w:"100%",children:[e.jsx(s,{...E,as:"button",onClick:()=>{t(f?`${i}/dashboard`:`${i}/`)},children:e.jsx(c,{src:x.appLogo,objectFit:"cover"})}),e.jsx(s,{..._,as:"button",onClick:()=>t(`${i}/dashboard`),children:e.jsx(n,{...m,children:"Home"})}),e.jsx(s,{..._,as:"button",onClick:()=>t(`${i}/dashboard/category`),children:e.jsx(n,{...m,children:"Explore"})}),e.jsx(w,{}),e.jsxs(s,{...T,as:"button",onClick:()=>{F()},children:[e.jsx(S,{as:Y,color:"#999999"}),e.jsx(n,{noOfLines:1,...m,px:"3%",color:"#999999",children:"Search offers, brand or style..."})]}),f?e.jsxs(e.Fragment,{children:[e.jsx(s,{as:"button",...N,pos:"relative",onClick:()=>t(`${i}/notification`),children:e.jsx(c,{src:x.bell})}),e.jsxs(s,{as:"button",...N,pos:"relative",onClick:()=>t(`${i}/bag`),children:[(g==null?void 0:g.length)>0&&e.jsx(p,{h:"20px",w:"20px",borderRadius:"20px",bg:"dark",color:"white",pos:"absolute",right:"0",top:"-2",left:"4",children:e.jsx(n,{fontSize:"14px",children:g==null?void 0:g.length})}),e.jsx(c,{src:x.box})]})]}):e.jsxs(s,{children:[e.jsx(p,{as:L,bg:"black",color:"white",px:"15px",py:"3px",_hover:{bg:"dark"},borderRadius:"100px",onClick:()=>t(`${i}/register`),children:e.jsx(n,{children:"Create an account"})}),e.jsx(w,{}),e.jsx(p,{as:L,bg:"white",color:"dark",borderWidth:1,borderColor:"black",ml:"15px",py:"3px",_hover:{bg:"white"},borderRadius:"100px",onClick:()=>t(`${i}/login`),children:e.jsx(n,{children:"Login"})})]})]})})}),e.jsx(j,{w:"100%"})]}),e.jsx(v,{display:D?"block":"none",pos:"absolute",w:"100%",children:e.jsx(Fe,{in:D,children:e.jsx(v,{bg:"light",zIndex:1e3,boxShadow:"1px 1px 3px #00000035",children:e.jsx($,{children:e.jsxs(s,{...le,pt:5,minHeight:y.length>0?"600px":"100px",transition:"min-height 0.5s","transition-timing-function":"ease-in",_focus:{boxShadow:"none"},children:[e.jsx(s,{...E,as:"button",onClick:()=>{t(f?`${i}/dashboard`:`${i}/`)},children:e.jsx(c,{src:x.appLogo,objectFit:"cover"})}),e.jsx(w,{}),e.jsxs(s,{...T,w:"600px",_focus:{boxShadow:"none"},flexDir:"column",children:[e.jsxs(Ce,{_focus:{boxShadow:"none"},as:"button",children:[e.jsx(ke,{pointerEvents:"none",children:e.jsx(S,{as:Y,color:"#999999"})}),e.jsx(ye,{...m,value:b,onChange:({target:r})=>{k(r.value),oe(r.value),r.value.length<3&&u([])},placeholder:"Search offers, brand or style...",borderRadius:"0",borderWidth:"0"})]}),y.length>0&&b.length>2?e.jsx(Re,{searchResult:y,isLoading:K,clearClick:()=>{k(""),u([])},navigate:()=>{F(),t(`${i}/searchResult`,{state:b})}}):e.jsx(s,{children:b.length>2?e.jsx(Ie,{mt:"8px",size:"sm"}):""})]}),e.jsx(w,{}),e.jsx(p,{as:"button",w:"3vw",h:"3vw",onClick:()=>{k(""),u([]),F()},children:e.jsx(c,{w:"2vw",h:"2vw",src:x.cancel_icon})})]})})})})})]})},Ne=d.memo(Le),De=()=>({root:{w:"100%",zIndex:10},container:{h:"36px",px:"1%",align:"center"},search:{w:"300px",h:"40px",background:"#F6F6F6",borderRadius:"53px",justify:"flex-start",align:"center",pl:"1%"},font:{fontSize:["14px","14px","14px","16px","16px"]},popfont:{fontSize:"12px",lineHeight:"14px",color:"#999999"},shopperBox:{h:"95%",w:"24%",flexDir:"row",justify:"space-between",align:"center"},infoBox:{h:"95%",align:"center",justify:"space-between"},shopperBusiness:{px:"2%",h:"2vw",w:["50%","50%","50%","50%","50%"],rounded:"50px"},homeIcon:{width:"44px",height:"44px",justify:"center",align:"center",mr:"2%"},helpText:{h:"25px",w:"70px",rounded:"70px",borderWidth:"0.5px",color:"white",fontSize:["14px","14px","14px","14px","14px"]},iconsLogo:{justify:"center",align:"center"},boxCircleColor:{bgColor:"#3478F6"},popoverTexts:{fontSize:["14px","14px","14px","14px","14px"],alignSelf:"flex-start"},popoverLightTexts:{fontSize:["12px","12px","12px","12px","12px"],color:"#999999",alignSelf:"flex-start"},itemBox:{w:"100%",h:"3vw",bg:"white",justify:"space-between",align:"center",px:"5%"},searchRoot:{w:"100%",bg:"light"}});export{Ne as default,De as useNavbarStyles};