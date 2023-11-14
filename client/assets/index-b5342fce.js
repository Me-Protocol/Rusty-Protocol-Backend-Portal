import{r as d,u as pe,O as ge,a as je,d as R,o as be,p as ue,aF as we,aG as fe,j as e,F as s,ah as F,m as $,L as me,C as p,H as X,q as w,w as B,al as f,aH as ve,aI as Fe,a0 as Se,aJ as ke,G as a,T as r,I as i,f as l,aK as Ce,aL as ye,aM as Le,l as T,i as Ie,E as Y,aN as Z,aO as z,aP as O,aQ as Re,ai as $e,aR as Be,aj as Te,aS as ze,S as Oe}from"./index-4d742258.js";const Ee=({customPadding:De,...ee})=>{var P,A,M,G,W,Q,K,V,q,J,U;let t=pe();const{isOpen:E,onToggle:S}=ge(),k=je(),{token:m}=R(n=>n.authReducer),{user_data:o}=R(n=>n.userReducer),{cartItems:g}=R(n=>n.cartReducer);d.useState(!1);const[u,C]=d.useState(""),{data:j,isError:He,isFetching:Ne,isLoading:Pe,isSuccess:Ae}=be({page:1,limit:8,type:ue.PRODUCT},{refetchOnMountOrArgChange:200}),{data:y,isLoading:Me}=we({page:1},{refetchOnMountOrArgChange:300}),{data:se,isLoading:v,error:ne}=fe({search_value:u,page:1,limit:10},{skip:u.length<3,refetchOnMountOrArgChange:!0});let L=se;console.log("isLoading",v);const[_,re]=d.useState(0),[I,oe]=d.useState(0),{root:te,container:ae,font:b,popfont:Ge,search:D,shopperBox:ie,infoBox:le,shopperBusiness:ce,homeIcon:H,helpText:xe,iconsLogo:N,popoverTexts:c,popoverLightTexts:he,itemBox:h,searchRoot:de,boxCircleColor:We}=_e();return e.jsxs(s,{...te,pos:"absolute",flexDir:"column",children:[e.jsx(F,{w:"100%",bg:"black",children:e.jsx($,{children:e.jsxs(s,{bg:"black",h:"50px",align:"center",children:[e.jsx(s,{...ie,flexDir:"row",children:["For me","For Businesses"].map((n,x)=>e.jsx(me,{href:"",isExternal:!0,children:e.jsx(p,{as:"button",bg:_===x?"light":"dark",color:_===x?"dark":"light",onClick:()=>re(x),...ce,children:e.jsx(X,{fontSize:["14px","14px","14px","14px","14px"],children:n})})},w()))}),e.jsx(B,{}),m?e.jsxs(s,{...le,children:[e.jsx(p,{...xe,children:"Help"}),e.jsx(f,{orientation:"vertical",h:"12px",mx:"5px"}),e.jsxs(ve,{isLazy:!0,placement:"bottom-start",children:[e.jsx(Fe,{children:e.jsxs(s,{as:"button",flexDir:"row",align:"center",_hover:{bg:"white",color:"dark"},color:"light",fontSize:["14px","14px","14px","14px","14px"],children:["Hi, ",((P=o==null?void 0:o.customer)==null?void 0:P.firstName)||"user",e.jsx(Se,{ml:"5px",name:`${(A=o==null?void 0:o.customer)==null?void 0:A.lastName} ${(M=o==null?void 0:o.customer)==null?void 0:M.firstName}`,src:(G=o==null?void 0:o.customer)==null?void 0:G.profilePicture,size:"sm"})]})}),e.jsxs(ke,{borderRadius:"0",position:"relative",width:"15vw",background:"#FFFFFF",border:"1px",children:[e.jsx(s,{as:"button",_hover:{bg:"#F6F6F6"},...h,onClick:()=>t(`${a}/settings`),w:"full",alignItems:"flex-start",textAlign:"left",h:"50px",justifyContent:"space-between",children:e.jsxs(s,{flexDir:"column",w:"full",children:[e.jsx(r,{...c,children:(W=o==null?void 0:o.customer)==null?void 0:W.name}),e.jsx(r,{...he,w:"full",children:o==null?void 0:o.email})]})}),e.jsx(f,{w:"100%"}),e.jsxs(s,{...h,h:"3vw",as:"button",_hover:{bg:"#F6F6F6"},onClick:()=>t(`${a}/dashboard/dashboard-my-assets`),children:[e.jsxs(s,{w:"100%",children:[e.jsx(i,{w:"1vw",h:"1vw",alignSelf:"center",mr:"5%",src:l.edit_Icon}),e.jsx(r,{...c,children:"My assets"})]}),e.jsx(r,{...c,alignSelf:"center"})]}),e.jsxs(s,{...h,h:"3vw",as:"button",_hover:{bg:"#F6F6F6"},children:[e.jsxs(s,{w:"100%",children:[e.jsx(i,{w:"1vw",h:"1vw",alignSelf:"center",mr:"5%",src:l.edit_Icon}),e.jsx(r,{...c,children:"My Offers"})]}),e.jsx(r,{...c,alignSelf:"center",children:"0"})]}),e.jsxs(s,{...h,h:"3vw",as:"button",_hover:{bg:"#F6F6F6"},onClick:()=>t(`${a}/dashboard/dashboard-saved`),children:[e.jsxs(s,{w:"100%",children:[e.jsx(i,{w:"1vw",h:"1vw",alignSelf:"center",mr:"5%",src:l.edit_Icon}),e.jsx(r,{...c,children:"Saved"})]}),e.jsx(r,{...c,alignSelf:"center",children:"0"})]}),e.jsx(f,{w:"100%"}),e.jsx(s,{...h,h:"3vw",as:"button",_hover:{bg:"#F6F6F6"},onClick:()=>t(`${a}/dashboard/dashboard-my-assets`),children:e.jsxs(s,{w:"100%",children:[e.jsx(i,{w:"1vw",h:"1vw",alignSelf:"center",mr:"5%",src:l.edit_Icon}),e.jsx(r,{...c,children:"My assets"})]})}),e.jsx(s,{...h,h:"3vw",as:"button",_hover:{bg:"#F6F6F6"},children:e.jsxs(s,{w:"100%",children:[e.jsx(i,{w:"1vw",h:"1vw",alignSelf:"center",mr:"5%",src:l.edit_Icon}),e.jsx(r,{...c,children:"My Offers"})]})}),e.jsx(f,{w:"100%"}),e.jsx(s,{...h,h:"3vw",as:"button",_hover:{bg:"#F6F6F6"},children:e.jsxs(s,{w:"100%",children:[e.jsx(i,{w:"1vw",h:"1vw",alignSelf:"center",mr:"5%",src:l.mobileapp_icon}),e.jsx(r,{...c,children:"Install mobile app"})]})}),e.jsx(f,{w:"100%"}),e.jsx(s,{...h,h:"3vw",as:"button",_hover:{bg:"#F6F6F6"},onClick:()=>{k(Ce()),k(ye()),k(Le())},children:e.jsxs(s,{w:"100%",children:[e.jsx(i,{w:"1vw",h:"1vw",alignSelf:"center",mr:"5%",src:l.logoutIcon}),e.jsx(r,{...c,children:"Logout"})]})})]})]})]}):e.jsx(s,{flexDir:"row",w:"20%",justify:"flex-end",children:["EN","FR","IT"].map((n,x)=>e.jsx(p,{as:T,w:"10%",h:"90%",color:x===I?"black":"white",borderWidth:.5,borderRadius:"100px",px:"7%",ml:"3%",_hover:{bg:x===I?"white":"dark"},bg:x===I?"white":"black",onClick:()=>{oe(x)},children:e.jsx(X,{fontSize:["14px","14px","14px","14px","14px"],children:n})},w()))})]})})}),e.jsx(F,{w:"100%",bg:"light",children:e.jsx($,{children:e.jsx(s,{bg:"light",h:"55px",borderBottomWidth:1,w:"100%",display:["none","none","none","flex","flex"],...ee,children:e.jsxs(Ie,{w:"100%",children:[e.jsx(s,{...H,as:"button",onClick:()=>{t(m?`${a}/dashboard`:`${a}/`)},children:e.jsx(i,{src:l.appLogo,objectFit:"cover"})}),e.jsxs(s,{...D,as:"button",onClick:()=>{S()},children:[e.jsx(Y,{as:Z,color:"#999999"}),e.jsx(r,{noOfLines:1,...b,px:"3%",color:"#999999",children:"Search offers, brand or style..."})]}),e.jsx(z,{label:"Brands",children:(V=(K=(Q=y==null?void 0:y.brands)==null?void 0:Q.brands)==null?void 0:K.slice(0,7))==null?void 0:V.map((n,x)=>d.createElement(O,{as:"button",...b,key:w(),onClick:()=>t(`${a}/dashboard/shop/${n.brandName}`,{state:{...n}})},e.jsxs(s,{children:[e.jsx(i,{src:n==null?void 0:n.logo,w:"20px",h:"20px",mr:"15px",objectFit:"contain",borderRadius:"20px"}),e.jsx(r,{textAlign:"left",children:n.brandName})]})))}),e.jsx(z,{label:"Categories",children:(q=j==null?void 0:j.data)==null?void 0:q.categories.map(n=>d.createElement(O,{...b,key:w(),onClick:()=>{t(`${a}/dashboard/category/${n.name}`,{state:{...n}})}},n.name))}),e.jsx(z,{label:"Special",children:(U=(J=j==null?void 0:j.data)==null?void 0:J.categories)==null?void 0:U.map(n=>d.createElement(O,{...b,key:w(),onClick:()=>{t(`${a}/dashboard/category/${n.name}`,{state:{...n}})}},n.name))}),e.jsx(s,{...ae,children:e.jsx(r,{...b,as:"button",children:"Latest"})}),e.jsx(B,{}),m?e.jsxs(e.Fragment,{children:[e.jsx(s,{as:"button",...N,pos:"relative",onClick:()=>t(`${a}/notification`),children:e.jsx(i,{src:l.bell})}),e.jsxs(s,{as:"button",...N,pos:"relative",onClick:()=>t(`${a}/bag`),children:[(g==null?void 0:g.length)>0&&e.jsx(p,{h:"20px",w:"20px",borderRadius:"20px",bg:"dark",color:"white",pos:"absolute",right:"0",top:"-2",left:"4",children:e.jsx(r,{fontSize:"14px",children:g==null?void 0:g.length})}),e.jsx(i,{src:l.box})]})]}):e.jsxs(s,{children:[e.jsx(p,{as:T,bg:"black",color:"white",px:"15px",py:"3px",_hover:{bg:"dark"},borderRadius:"100px",onClick:()=>t(`${a}/register`),children:e.jsx(r,{children:"Create an account"})}),e.jsx(B,{}),e.jsx(p,{as:T,bg:"white",color:"dark",borderWidth:1,borderColor:"black",ml:"15px",py:"3px",_hover:{bg:"white"},borderRadius:"100px",onClick:()=>t(`${a}/login`),children:e.jsx(r,{children:"Login"})})]})]})})})}),e.jsx(F,{display:E?"block":"none",pos:"absolute",w:"100%",zIndex:1e3,bg:"white",minHeight:"100px",children:e.jsx(Re,{in:E,children:e.jsx(F,{zIndex:1e3,boxShadow:"1px 1px 3px #00000035",minHeight:"auto",children:e.jsxs($,{children:[e.jsxs(s,{...de,pt:5,minHeight:"auto",transition:"min-height 0.5s","transition-timing-function":"ease-in",_focus:{boxShadow:"none"},justifyContent:"space-between",children:[e.jsx(s,{...H,as:"button",onClick:()=>{t(m?`${a}/dashboard`:`${a}/`)},children:e.jsx(i,{src:l.appLogo,objectFit:"cover"})}),e.jsx(s,{...D,w:"600px",_focus:{boxShadow:"none"},flexDir:"column",children:e.jsxs($e,{_focus:{boxShadow:"none"},as:"button",children:[e.jsx(Be,{pointerEvents:"none",children:e.jsx(Y,{as:Z,color:"#999999"})}),e.jsx(Te,{...b,value:u,onChange:({target:n})=>{C(n.value)},placeholder:"Search offers, brand or style...",borderRadius:"0",borderWidth:"0",onKeyDown:n=>{n.key==="Enter"&&(n.preventDefault(),S(),t(`${a}/searchResult`,{state:u}))}})]})}),e.jsx(p,{as:"button",w:"50px",h:"50px",onClick:()=>{C(""),S()},children:e.jsx(i,{w:"40px",h:"40px",src:l.cancel_icon})})]}),e.jsxs(s,{w:"600px",pos:"relative",left:["300px","300px","300px","300px","340px"],children:[ne&&!v?e.jsx(r,{children:"Something unexpected happened. Try again later"}):e.jsx(e.Fragment,{}),L&&L.data.result.length>0?e.jsx(ze,{searchText:u,results:L.data.result,isLoading:v,clearClick:()=>{C("")},navigate:()=>{}}):e.jsx(s,{alignItems:"center",children:v?e.jsx(Oe,{mt:"8px",mb:"8px",size:"sm"}):""})]})]})})})})]})};d.memo(Ee);const _e=()=>({root:{w:"100%",zIndex:10},container:{h:"36px",px:"1%",align:"center"},boxCircleColor:{bgColor:"#3478F6"},search:{w:"300px",h:"40px",background:"#F6F6F6",borderRadius:"53px",justify:"flex-start",align:"center",pl:"1%"},font:{fontSize:["14px","14px","14px","16px","16px"]},popfont:{fontSize:"12px",lineHeight:"14px",color:"#999999"},shopperBox:{h:"45px",w:"24%",flexDir:"row",justify:"space-between",align:"center"},infoBox:{h:"95%",align:"center",justify:"space-between"},shopperBusiness:{px:"2%",h:"40px",w:["50%","50%","50%","50%","50%"],rounded:"50px"},homeIcon:{width:"44px",height:"44px",justify:"center",align:"center",mr:"2%"},helpText:{h:"25px",w:"70px",rounded:"70px",borderWidth:"0.5px",color:"white",fontSize:["14px","14px","14px","14px","14px"]},iconsLogo:{justify:"center",align:"center"},popoverTexts:{fontSize:["14px","14px","14px","14px","14px"],alignSelf:"flex-start"},popoverLightTexts:{fontSize:["12px","12px","12px","12px","12px"],color:"#999999",alignSelf:"flex-start"},itemBox:{w:"100%",h:"3vw",bg:"white",justify:"space-between",align:"center",px:"5%"},searchRoot:{w:"100%",bg:"light"}});export{_e as u};