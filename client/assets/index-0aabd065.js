import{r as d,u as pe,Z as ge,a as je,d as R,v as ue,w as be,aw as we,ax as fe,j as e,F as s,ak as F,m as $,L as me,C as p,H as Z,y as b,K as B,D as w,ay as ve,az as Fe,M as Se,aA as ke,G as a,T as r,I as i,f as l,aB as Ce,aC as ye,aD as Le,l as z,i as Ie,U as q,aE as Y,aF as D,aG as T,aH as Re,al as $e,aI as Be,am as ze,aJ as De,S as Te}from"./index-4302fa73.js";const Ee=({customPadding:Oe,...ee})=>{var N,P,M,G,W,Q,K,U,V,J,X;let t=pe();const{isOpen:E,onToggle:S}=ge(),k=je(),{token:f}=R(n=>n.authReducer),{user_data:o}=R(n=>n.userReducer),{cartItems:g}=R(n=>n.cartReducer);d.useState(!1);const[m,C]=d.useState(""),{data:j,isError:He,isFetching:Ae,isLoading:Ne,isSuccess:Pe}=ue({page:1,limit:8,type:be.PRODUCT},{refetchOnMountOrArgChange:200}),{data:y,isLoading:Me}=we({page:1},{refetchOnMountOrArgChange:300}),{data:se,isLoading:v,error:ne}=fe({search_value:m,page:1,limit:10},{skip:m.length<3,refetchOnMountOrArgChange:!0});let L=se;console.log("isLoading",v);const[_,re]=d.useState(0),[I,oe]=d.useState(0),{root:te,container:ae,font:u,popfont:Ge,search:O,shopperBox:ie,infoBox:le,shopperBusiness:ce,homeIcon:H,helpText:xe,iconsLogo:A,popoverTexts:c,popoverLightTexts:he,itemBox:h,searchRoot:de,boxCircleColor:We}=_e();return e.jsxs(s,{...te,pos:"absolute",flexDir:"column",children:[e.jsx(F,{w:"100%",bg:"black",children:e.jsx($,{children:e.jsxs(s,{bg:"black",h:"50px",align:"center",children:[e.jsx(s,{...ie,flexDir:"row",children:["For me","For Businesses"].map((n,x)=>e.jsx(me,{href:"https://business.usemeprotocol.com",isExternal:!0,children:e.jsx(p,{as:"button",bg:_===x?"light":"dark",color:_===x?"dark":"light",onClick:()=>re(x),...ce,children:e.jsx(Z,{fontSize:["14px","14px","14px","14px","14px"],children:n})})},b()))}),e.jsx(B,{}),f?e.jsxs(s,{...le,children:[e.jsx(p,{...xe,children:"Help"}),e.jsx(w,{orientation:"vertical",h:"12px",mx:"5px"}),e.jsxs(ve,{isLazy:!0,placement:"bottom-start",children:[e.jsx(Fe,{children:e.jsxs(s,{as:"button",flexDir:"row",align:"center",_hover:{bg:"white",color:"dark"},color:"light",fontSize:["14px","14px","14px","14px","14px"],children:["Hi, ",((N=o==null?void 0:o.customer)==null?void 0:N.firstName)||"user",e.jsx(Se,{ml:"5px",name:`${(P=o==null?void 0:o.customer)==null?void 0:P.lastName} ${(M=o==null?void 0:o.customer)==null?void 0:M.firstName}`,src:(G=o==null?void 0:o.customer)==null?void 0:G.profilePicture,size:"sm"})]})}),e.jsxs(ke,{borderRadius:"0",position:"relative",width:"15vw",background:"#FFFFFF",border:"1px",children:[e.jsx(s,{as:"button",_hover:{bg:"#F6F6F6"},...h,onClick:()=>t(`${a}/settings`),w:"full",alignItems:"flex-start",textAlign:"left",h:"50px",justifyContent:"space-between",children:e.jsxs(s,{flexDir:"column",w:"full",children:[e.jsx(r,{...c,children:(W=o==null?void 0:o.customer)==null?void 0:W.name}),e.jsx(r,{...he,w:"full",children:o==null?void 0:o.email})]})}),e.jsx(w,{w:"100%"}),e.jsxs(s,{...h,h:"3vw",as:"button",_hover:{bg:"#F6F6F6"},onClick:()=>t(`${a}/dashboard/dashboard-my-assets`),children:[e.jsxs(s,{w:"100%",children:[e.jsx(i,{w:"1vw",h:"1vw",alignSelf:"center",mr:"5%",src:l.edit_Icon}),e.jsx(r,{...c,children:"My assets"})]}),e.jsx(r,{...c,alignSelf:"center"})]}),e.jsxs(s,{...h,h:"3vw",as:"button",_hover:{bg:"#F6F6F6"},children:[e.jsxs(s,{w:"100%",children:[e.jsx(i,{w:"1vw",h:"1vw",alignSelf:"center",mr:"5%",src:l.edit_Icon}),e.jsx(r,{...c,children:"My Offers"})]}),e.jsx(r,{...c,alignSelf:"center",children:"0"})]}),e.jsxs(s,{...h,h:"3vw",as:"button",_hover:{bg:"#F6F6F6"},onClick:()=>t(`${a}/dashboard/dashboard-saved`),children:[e.jsxs(s,{w:"100%",children:[e.jsx(i,{w:"1vw",h:"1vw",alignSelf:"center",mr:"5%",src:l.edit_Icon}),e.jsx(r,{...c,children:"Saved"})]}),e.jsx(r,{...c,alignSelf:"center",children:"0"})]}),e.jsx(w,{w:"100%"}),e.jsx(s,{...h,h:"3vw",as:"button",_hover:{bg:"#F6F6F6"},onClick:()=>t(`${a}/dashboard/dashboard-my-assets`),children:e.jsxs(s,{w:"100%",children:[e.jsx(i,{w:"1vw",h:"1vw",alignSelf:"center",mr:"5%",src:l.edit_Icon}),e.jsx(r,{...c,children:"My assets"})]})}),e.jsx(s,{...h,h:"3vw",as:"button",_hover:{bg:"#F6F6F6"},children:e.jsxs(s,{w:"100%",children:[e.jsx(i,{w:"1vw",h:"1vw",alignSelf:"center",mr:"5%",src:l.edit_Icon}),e.jsx(r,{...c,children:"My Offers"})]})}),e.jsx(w,{w:"100%"}),e.jsx(s,{...h,h:"3vw",as:"button",_hover:{bg:"#F6F6F6"},children:e.jsxs(s,{w:"100%",children:[e.jsx(i,{w:"1vw",h:"1vw",alignSelf:"center",mr:"5%",src:l.mobileapp_icon}),e.jsx(r,{...c,children:"Install mobile app"})]})}),e.jsx(w,{w:"100%"}),e.jsx(s,{...h,h:"3vw",as:"button",_hover:{bg:"#F6F6F6"},onClick:()=>{k(Ce()),k(ye()),k(Le())},children:e.jsxs(s,{w:"100%",children:[e.jsx(i,{w:"1vw",h:"1vw",alignSelf:"center",mr:"5%",src:l.logoutIcon}),e.jsx(r,{...c,children:"Logout"})]})})]})]})]}):e.jsx(s,{flexDir:"row",w:"20%",justify:"flex-end",children:["EN","FR","IT"].map((n,x)=>e.jsx(p,{as:z,w:"10%",h:"90%",color:x===I?"black":"white",borderWidth:.5,borderRadius:"100px",px:"7%",ml:"3%",_hover:{bg:x===I?"white":"dark"},bg:x===I?"white":"black",onClick:()=>{oe(x)},children:e.jsx(Z,{fontSize:["14px","14px","14px","14px","14px"],children:n})},b()))})]})})}),e.jsx(F,{w:"100%",bg:"light",children:e.jsx($,{children:e.jsx(s,{bg:"light",h:"55px",borderBottomWidth:1,w:"100%",display:["none","none","none","flex","flex"],...ee,children:e.jsxs(Ie,{w:"100%",children:[e.jsx(s,{...H,as:"button",onClick:()=>{t(f?`${a}/dashboard`:`${a}/`)},children:e.jsx(i,{src:l.appLogo,objectFit:"cover"})}),e.jsxs(s,{...O,as:"button",onClick:()=>{S()},children:[e.jsx(q,{as:Y,color:"#999999"}),e.jsx(r,{noOfLines:1,...u,px:"3%",color:"#999999",children:"Search offers, brand or style..."})]}),e.jsx(D,{label:"Brands",children:(U=(K=(Q=y==null?void 0:y.brands)==null?void 0:Q.brands)==null?void 0:K.slice(0,7))==null?void 0:U.map((n,x)=>d.createElement(T,{as:"button",...u,key:b(),onClick:()=>t(`${a}/dashboard/shop/${n.brandName}`,{state:{...n}})},e.jsxs(s,{children:[e.jsx(i,{src:n==null?void 0:n.logo,w:"20px",h:"20px",mr:"15px",objectFit:"contain",borderRadius:"20px"}),e.jsx(r,{textAlign:"left",children:n.brandName})]})))}),e.jsx(D,{label:"Categories",children:(V=j==null?void 0:j.data)==null?void 0:V.categories.map(n=>d.createElement(T,{...u,key:b(),onClick:()=>{t(`${a}/dashboard/category/${n.name}`,{state:{...n}})}},n.name))}),e.jsx(D,{label:"Special",children:(X=(J=j==null?void 0:j.data)==null?void 0:J.categories)==null?void 0:X.map(n=>d.createElement(T,{...u,key:b(),onClick:()=>{t(`${a}/dashboard/category/${n.name}`,{state:{...n}})}},n.name))}),e.jsx(s,{...ae,children:e.jsx(r,{...u,as:"button",children:"Latest"})}),e.jsx(B,{}),f?e.jsxs(e.Fragment,{children:[e.jsx(s,{as:"button",...A,pos:"relative",onClick:()=>t(`${a}/notification`),children:e.jsx(i,{src:l.bell})}),e.jsxs(s,{as:"button",...A,pos:"relative",onClick:()=>t(`${a}/bag`),children:[(g==null?void 0:g.length)>0&&e.jsx(p,{h:"20px",w:"20px",borderRadius:"20px",bg:"dark",color:"white",pos:"absolute",right:"0",top:"-2",left:"4",children:e.jsx(r,{fontSize:"14px",children:g==null?void 0:g.length})}),e.jsx(i,{src:l.box})]})]}):e.jsxs(s,{children:[e.jsx(p,{as:z,bg:"black",color:"white",px:"15px",py:"3px",_hover:{bg:"dark"},borderRadius:"100px",onClick:()=>t(`${a}/register`),children:e.jsx(r,{children:"Create an account"})}),e.jsx(B,{}),e.jsx(p,{as:z,bg:"white",color:"dark",borderWidth:1,borderColor:"black",ml:"15px",py:"3px",_hover:{bg:"white"},borderRadius:"100px",onClick:()=>t(`${a}/login`),children:e.jsx(r,{children:"Login"})})]})]})})})}),e.jsx(F,{display:E?"block":"none",pos:"absolute",w:"100%",zIndex:1e3,bg:"white",minHeight:"100px",children:e.jsx(Re,{in:E,children:e.jsx(F,{zIndex:1e3,boxShadow:"1px 1px 3px #00000035",minHeight:"auto",children:e.jsxs($,{children:[e.jsxs(s,{...de,pt:5,minHeight:"auto",transition:"min-height 0.5s","transition-timing-function":"ease-in",_focus:{boxShadow:"none"},justifyContent:"space-between",children:[e.jsx(s,{...H,as:"button",onClick:()=>{t(f?`${a}/dashboard`:`${a}/`)},children:e.jsx(i,{src:l.appLogo,objectFit:"cover"})}),e.jsx(s,{...O,w:"600px",_focus:{boxShadow:"none"},flexDir:"column",children:e.jsxs($e,{_focus:{boxShadow:"none"},as:"button",children:[e.jsx(Be,{pointerEvents:"none",children:e.jsx(q,{as:Y,color:"#999999"})}),e.jsx(ze,{...u,value:m,onChange:({target:n})=>{C(n.value)},placeholder:"Search offers, brand or style...",borderRadius:"0",borderWidth:"0",onKeyDown:n=>{n.key==="Enter"&&(n.preventDefault(),S(),t(`${a}/searchResult`,{state:m}))}})]})}),e.jsx(p,{as:"button",w:"50px",h:"50px",onClick:()=>{C(""),S()},children:e.jsx(i,{w:"40px",h:"40px",src:l.cancel_icon})})]}),e.jsxs(s,{w:"600px",pos:"relative",left:["300px","300px","300px","300px","340px"],children:[ne&&!v?e.jsx(r,{children:"Something unexpected happened. Try again later"}):e.jsx(e.Fragment,{}),L&&L.data.result.length>0?e.jsx(De,{results:L.data.result,isLoading:v,clearClick:()=>{C("")},navigate:()=>{}}):e.jsx(s,{alignItems:"center",children:v?e.jsx(Te,{mt:"8px",mb:"8px",size:"sm"}):""})]})]})})})})]})};d.memo(Ee);const _e=()=>({root:{w:"100%",zIndex:10},container:{h:"36px",px:"1%",align:"center"},boxCircleColor:{bgColor:"#3478F6"},search:{w:"300px",h:"40px",background:"#F6F6F6",borderRadius:"53px",justify:"flex-start",align:"center",pl:"1%"},font:{fontSize:["14px","14px","14px","16px","16px"]},popfont:{fontSize:"12px",lineHeight:"14px",color:"#999999"},shopperBox:{h:"45px",w:"24%",flexDir:"row",justify:"space-between",align:"center"},infoBox:{h:"95%",align:"center",justify:"space-between"},shopperBusiness:{px:"2%",h:"40px",w:["50%","50%","50%","50%","50%"],rounded:"50px"},homeIcon:{width:"44px",height:"44px",justify:"center",align:"center",mr:"2%"},helpText:{h:"25px",w:"70px",rounded:"70px",borderWidth:"0.5px",color:"white",fontSize:["14px","14px","14px","14px","14px"]},iconsLogo:{justify:"center",align:"center"},popoverTexts:{fontSize:["14px","14px","14px","14px","14px"],alignSelf:"flex-start"},popoverLightTexts:{fontSize:["12px","12px","12px","12px","12px"],color:"#999999",alignSelf:"flex-start"},itemBox:{w:"100%",h:"3vw",bg:"white",justify:"space-between",align:"center",px:"5%"},searchRoot:{w:"100%",bg:"light"}});export{_e as u};
