import{r as d,u as ie,Y as le,a as ae,d as R,v as ce,w as xe,g as he,B as de,j as e,F as s,al as m,m as L,L as pe,C as p,H as G,y as W,E as w,D as b,aJ as je,aK as ge,a5 as be,aL as ue,G as i,T as r,I as a,f as c,aM as we,aN as fe,aO as ve,l as I,i as me,O as U,aP as V,aS as Se,am as Fe,aT as ke,an as Ce,aU as ye,S as Re}from"./index-a17d5818.js";import{d as Le}from"./index-a812ae9e.js";const Ie=({customPadding:Be,...J})=>{var O,H,N,P,A;let t=ie();const{isOpen:$,onToggle:S,onClose:Te}=le(),F=ae(),{token:f}=R(o=>o.authReducer),{user_data:n}=R(o=>o.userReducer),{cartItems:j}=R(o=>o.cartReducer);d.useState(!1);const[K,B]=d.useState(!1),[g,k]=d.useState(""),[C,u]=d.useState([]),[T,Q]=d.useState(0),[y,X]=d.useState(0);ce({page:1,limit:8,type:xe.PRODUCT},{refetchOnMountOrArgChange:300});const Y=d.useCallback(Le(o=>{B(!0),he.get(`${de}/search?q=${o}`).then(l=>{var M;u((M=l==null?void 0:l.data)==null?void 0:M.result)}).catch(l=>{console.log(l,"Err SEARCH")}).finally(()=>{B(!1)})},500),[]),q=o=>{if(!(g.length<=1)){if(!o)return u([]);Y(o)}},{root:Z,container:z,font:v,search:D,shopperBox:ee,infoBox:se,shopperBusiness:ne,homeIcon:_,helpText:oe,iconsLogo:E,popoverTexts:x,popoverLightTexts:re,itemBox:h,searchRoot:te,boxCircleColor:ze}=$e();return e.jsxs(s,{...Z,pos:"absolute",flexDir:"column",children:[e.jsx(m,{w:"100%",bg:"black",children:e.jsx(L,{children:e.jsxs(s,{bg:"black",h:"50px",align:"center",children:[e.jsx(s,{...ee,flexDir:"row",children:["For Shoppers","For Businesses"].map((o,l)=>e.jsx(pe,{href:"",isExternal:!0,children:e.jsx(p,{as:"button",bg:T===l?"light":"dark",color:T===l?"dark":"light",onClick:()=>Q(l),...ne,children:e.jsx(G,{fontSize:["14px","14px","14px","14px","14px"],children:o})})},W()))}),e.jsx(w,{}),f?e.jsxs(s,{...se,children:[e.jsx(p,{...oe,children:"Help"}),e.jsx(b,{orientation:"vertical",h:"12px",mx:"5px"}),e.jsxs(je,{isLazy:!0,placement:"bottom-start",children:[e.jsx(ge,{children:e.jsxs(s,{as:"button",flexDir:"row",align:"center",_hover:{bg:"white",color:"dark"},color:"light",fontSize:["14px","14px","14px","14px","14px"],children:["Hi, ",(O=n==null?void 0:n.customer)==null?void 0:O.firstName,e.jsx(be,{ml:"5px",name:`${(H=n==null?void 0:n.customer)==null?void 0:H.lastName} ${(N=n==null?void 0:n.customer)==null?void 0:N.firstName}`,src:(P=n==null?void 0:n.customer)==null?void 0:P.profilePicture,size:"sm"})]})}),e.jsxs(ue,{borderRadius:"0",position:"relative",width:"15vw",background:"#FFFFFF",border:"1px",children:[e.jsx(s,{as:"button",_hover:{bg:"#F6F6F6"},...h,onClick:()=>t(`${i}/settings`),w:"full",alignItems:"flex-start",textAlign:"left",h:"50px",justifyContent:"space-between",children:e.jsxs(s,{flexDir:"column",w:"full",children:[e.jsx(r,{...x,children:(A=n==null?void 0:n.customer)==null?void 0:A.name}),e.jsx(r,{...re,w:"full",children:n==null?void 0:n.email})]})}),e.jsx(b,{w:"100%"}),e.jsxs(s,{...h,h:"3vw",as:"button",_hover:{bg:"#F6F6F6"},onClick:()=>t(`${i}/dashboard/dashboard-my-assets`),children:[e.jsxs(s,{w:"100%",children:[e.jsx(a,{w:"1vw",h:"1vw",alignSelf:"center",mr:"5%",src:c.edit_Icon}),e.jsx(r,{...x,children:"My assets"})]}),e.jsx(r,{...x,alignSelf:"center"})]}),e.jsxs(s,{...h,h:"3vw",as:"button",_hover:{bg:"#F6F6F6"},onClick:()=>t(`${i}/dashboard/offers`),children:[e.jsxs(s,{w:"100%",children:[e.jsx(a,{w:"1vw",h:"1vw",alignSelf:"center",mr:"5%",src:c.edit_Icon}),e.jsx(r,{...x,children:"My Offers"})]}),e.jsx(r,{...x,alignSelf:"center",children:"0"})]}),e.jsxs(s,{...h,h:"3vw",as:"button",_hover:{bg:"#F6F6F6"},onClick:()=>t(`${i}/dashboard/dashboard-saved`),children:[e.jsxs(s,{w:"100%",children:[e.jsx(a,{w:"1vw",h:"1vw",alignSelf:"center",mr:"5%",src:c.edit_Icon}),e.jsx(r,{...x,children:"Saved"})]}),e.jsx(r,{...x,alignSelf:"center",children:"0"})]}),e.jsx(b,{w:"100%"}),e.jsx(s,{...h,h:"3vw",as:"button",_hover:{bg:"#F6F6F6"},onClick:()=>t(`${i}/dashboard/dashboard-my-assets`),children:e.jsxs(s,{w:"100%",children:[e.jsx(a,{w:"1vw",h:"1vw",alignSelf:"center",mr:"5%",src:c.edit_Icon}),e.jsx(r,{...x,children:"My assets"})]})}),e.jsx(s,{...h,h:"3vw",as:"button",_hover:{bg:"#F6F6F6"},onClick:()=>t(`${i}/dashboard/offers`),children:e.jsxs(s,{w:"100%",children:[e.jsx(a,{w:"1vw",h:"1vw",alignSelf:"center",mr:"5%",src:c.edit_Icon}),e.jsx(r,{...x,children:"My Offers"})]})}),e.jsx(b,{w:"100%"}),e.jsx(s,{...h,h:"3vw",as:"button",_hover:{bg:"#F6F6F6"},children:e.jsxs(s,{w:"100%",children:[e.jsx(a,{w:"1vw",h:"1vw",alignSelf:"center",mr:"5%",src:c.mobileapp_icon}),e.jsx(r,{...x,children:"Install mobile app"})]})}),e.jsx(b,{w:"100%"}),e.jsx(s,{...h,h:"3vw",as:"button",_hover:{bg:"#F6F6F6"},onClick:()=>{F(we()),F(fe()),F(ve())},children:e.jsxs(s,{w:"100%",children:[e.jsx(a,{w:"1vw",h:"1vw",alignSelf:"center",mr:"5%",src:c.logoutIcon}),e.jsx(r,{...x,children:"Logout"})]})})]})]})]}):e.jsx(s,{flexDir:"row",w:"20%",justify:"flex-end",children:["EN","FR","IT"].map((o,l)=>e.jsx(p,{as:I,w:"10%",h:"90%",color:l===y?"black":"white",borderWidth:.5,borderRadius:"100px",px:"7%",ml:"3%",_hover:{bg:l===y?"white":"dark"},bg:l===y?"white":"black",onClick:()=>{X(l)},children:e.jsx(G,{fontSize:["14px","14px","14px","14px","14px"],children:o})},W()))})]})})}),e.jsxs(m,{w:"100%",bg:"light",children:[e.jsx(L,{children:e.jsx(s,{bg:"light",h:"55px",w:"100%",display:["none","none","none","flex","flex"],...J,children:e.jsxs(me,{w:"100%",children:[e.jsx(s,{..._,as:"button",onClick:()=>{t(f?`${i}/dashboard`:`${i}/`)},children:e.jsx(a,{src:c.appLogo,objectFit:"cover"})}),e.jsx(s,{...z,as:"button",onClick:()=>t(`${i}/dashboard`),children:e.jsx(r,{...v,children:"Home"})}),e.jsx(s,{...z,as:"button",onClick:()=>t(`${i}/dashboard/category`),children:e.jsx(r,{...v,children:"Explore"})}),e.jsx(w,{}),e.jsxs(s,{...D,as:"button",onClick:()=>{S()},children:[e.jsx(U,{as:V,color:"#999999"}),e.jsx(r,{noOfLines:1,...v,px:"3%",color:"#999999",children:"Search offers, brand or style..."})]}),f?e.jsxs(e.Fragment,{children:[e.jsx(s,{as:"button",...E,pos:"relative",onClick:()=>t(`${i}/notification`),children:e.jsx(a,{src:c.bell})}),e.jsxs(s,{as:"button",...E,pos:"relative",onClick:()=>t(`${i}/bag`),children:[(j==null?void 0:j.length)>0&&e.jsx(p,{h:"20px",w:"20px",borderRadius:"20px",bg:"dark",color:"white",pos:"absolute",right:"0",top:"-2",left:"4",children:e.jsx(r,{fontSize:"14px",children:j==null?void 0:j.length})}),e.jsx(a,{src:c.box})]})]}):e.jsxs(s,{children:[e.jsx(p,{as:I,bg:"black",color:"white",px:"15px",py:"3px",_hover:{bg:"dark"},borderRadius:"100px",onClick:()=>t(`${i}/register`),children:e.jsx(r,{children:"Create an account"})}),e.jsx(w,{}),e.jsx(p,{as:I,bg:"white",color:"dark",borderWidth:1,borderColor:"black",ml:"15px",py:"3px",_hover:{bg:"white"},borderRadius:"100px",onClick:()=>t(`${i}/login`),children:e.jsx(r,{children:"Login"})})]})]})})}),e.jsx(b,{w:"100%"})]}),e.jsx(m,{display:$?"block":"none",pos:"absolute",w:"100%",children:e.jsx(Se,{in:$,children:e.jsx(m,{bg:"light",zIndex:1e3,boxShadow:"1px 1px 3px #00000035",children:e.jsx(L,{children:e.jsxs(s,{...te,pt:5,minHeight:C.length>0?"600px":"100px",transition:"min-height 0.5s","transition-timing-function":"ease-in",_focus:{boxShadow:"none"},children:[e.jsx(s,{..._,as:"button",onClick:()=>{t(f?`${i}/dashboard`:`${i}/`)},children:e.jsx(a,{src:c.appLogo,objectFit:"cover"})}),e.jsx(w,{}),e.jsxs(s,{...D,w:"600px",_focus:{boxShadow:"none"},flexDir:"column",children:[e.jsxs(Fe,{_focus:{boxShadow:"none"},as:"button",children:[e.jsx(ke,{pointerEvents:"none",children:e.jsx(U,{as:V,color:"#999999"})}),e.jsx(Ce,{...v,value:g,onChange:({target:o})=>{k(o.value),q(o.value),o.value.length<3&&u([])},placeholder:"Search offers, brand or style...",borderRadius:"0",borderWidth:"0"})]}),C.length>0&&g.length>2?e.jsx(ye,{searchText:g,results:C,isLoading:K,clearClick:()=>{k(""),u([])},navigate:()=>{S(),t(`${i}/searchResult`,{state:g})}}):e.jsx(s,{children:g.length>2?e.jsx(Re,{mt:"8px",size:"sm"}):""})]}),e.jsx(w,{}),e.jsx(p,{as:"button",w:"3vw",h:"3vw",onClick:()=>{k(""),u([]),S()},children:e.jsx(a,{w:"2vw",h:"2vw",src:c.cancel_icon})})]})})})})})]})},Ee=d.memo(Ie),$e=()=>({root:{w:"100%",zIndex:10},container:{h:"36px",px:"1%",align:"center"},search:{w:"300px",h:"40px",background:"#F6F6F6",borderRadius:"53px",justify:"flex-start",align:"center",pl:"1%"},font:{fontSize:["14px","14px","14px","16px","16px"]},popfont:{fontSize:"12px",lineHeight:"14px",color:"#999999"},shopperBox:{h:"95%",w:"24%",flexDir:"row",justify:"space-between",align:"center"},infoBox:{h:"95%",align:"center",justify:"space-between"},shopperBusiness:{px:"2%",h:"2vw",w:["50%","50%","50%","50%","50%"],rounded:"50px"},homeIcon:{width:"44px",height:"44px",justify:"center",align:"center",mr:"2%"},helpText:{h:"25px",w:"70px",rounded:"70px",borderWidth:"0.5px",color:"white",fontSize:["14px","14px","14px","14px","14px"]},iconsLogo:{justify:"center",align:"center"},boxCircleColor:{bgColor:"#3478F6"},popoverTexts:{fontSize:["14px","14px","14px","14px","14px"],alignSelf:"flex-start"},popoverLightTexts:{fontSize:["12px","12px","12px","12px","12px"],color:"#999999"},itemBox:{w:"100%",h:"3vw",bg:"white",justify:"space-between",align:"center",px:"5%"},searchRoot:{w:"100%",bg:"light"}});export{Ee as default,$e as useNavbarStyles};
