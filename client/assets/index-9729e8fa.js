import{r as l,u as _e,O as Oe,a as ze,d as b,b1 as $e,o as Ae,p as Be,aq as De,aG as Pe,ax as We,b2 as Ge,b3 as He,b4 as Ne,b5 as Me,b6 as Qe,b7 as Ue,j as e,F as n,ah as C,m as B,L as qe,C as v,H as re,q as k,w as D,al as R,aH as Ke,aI as Ve,a0 as Ye,aJ as Je,G as a,T as t,I as x,f as g,aK as Xe,aL as Ze,aM as es,l as P,i as ae,E as ie,aN as ce,aO as le,aP as xe,b8 as ss,a6 as de,b9 as ns,aQ as ts,ai as os,aR as rs,aj as as,ba as is,aS as cs,S as ls}from"./index-4d742258.js";const xs=({customPadding:hs,...he})=>{var Y,J,X,Z,ee,se,ne,te,oe;let i=_e();const{isOpen:W,onToggle:y}=Oe(),u=ze(),{token:c}=b(s=>s.authReducer),{user_data:o,my_rewards:ps,prev_notification_count:G,current_notification_count:gs,new_notification_count:us}=b(s=>s.userReducer),{cartItems:j}=b(s=>s.cartReducer),{order_data:F,getOrder_loading:bs}=b(s=>s.orderReducer),{data:f}=$e({page:1},{refetchOnMountOrArgChange:!0,skip:!c});l.useState(!1);const[S,L]=l.useState(""),[pe,ge]=l.useState(!0),{data:E,isLoading:js}=Ae({page:1,limit:7,type:Be.PRODUCT},{refetchOnMountOrArgChange:!0}),{reward_type_product:I}=b(s=>s.productReducer),{collection_data:ue,collection_loading:fs}=b(s=>s.collectionReducer);b(s=>s.userReducer);const be=ue.total,{data:T,isLoading:ws}=De({page:1,limit:5},{refetchOnMountOrArgChange:300}),{data:je,isLoading:_,error:fe}=Pe({search_value:S,page:1,limit:10},{skip:S.length<3,refetchOnMountOrArgChange:!0});let O=je;const[H,we]=l.useState(0),[z,me]=l.useState(0),[ms,N]=l.useState(!1),[$,ve]=l.useState([]),{root:Se,container:M,font:w,popfont:vs,search:Q,shopperBox:Ce,infoBox:ke,shopperBusiness:Re,homeIcon:U,notification:q,helpText:ye,iconsLogo:K,popoverTexts:d,popoverLightTexts:Fe,itemBox:m,searchRoot:Le,boxCircleColor:V}=ds();l.useEffect(()=>{let s=window.pageYOffset;const r=()=>{const p=window.pageYOffset;ge(s>p||p<=0),s=p};return window.addEventListener("scroll",r),()=>window.removeEventListener("scroll",r)},[]),l.useEffect(()=>{c&&u(We({token:c})),c&&u(Ge({token:c})),c&&u(He({token:c})),c&&u(Ne({token:c})),Ee()},[]);const Ee=async()=>{var s;N(!0);try{const{data:r}=await Me.get_account_detail({address:(s=o==null?void 0:o.customer)==null?void 0:s.walletAddress}),p=[];for(const h in r.result.balance)p.push({contractAddress:Qe(h),balance:Ue(r.result.balance[h])});const A=I==null?void 0:I.map(h=>{const Ie=p==null?void 0:p.find(Te=>Te.contractAddress===(h==null?void 0:h.contractAddress));return{...h,balance:Ie}});ve(A==null?void 0:A.filter(h=>h.balance))}catch(r){console.log(r)}finally{N(!1)}};return e.jsxs(n,{...Se,pos:"fixed",flexDir:"column",top:pe?0:"-100%",left:"0",right:"0",transition:"top 0.3s ease-in-out",zIndex:2e6,children:[e.jsx(C,{w:"100%",bg:"#E3E3E3",children:e.jsx(B,{children:e.jsxs(n,{bg:"#E3E3E3",h:"50px",align:"center",children:[e.jsx(n,{...Ce,flexDir:"row",children:["For Shoppers","For Businesses"].map((s,r)=>e.jsx(qe,{href:"",isExternal:!0,children:e.jsx(v,{as:"button",textTransform:"uppercase",bg:H===r?"dark":"#C3C3C3",color:H===r?"light":"dark",onClick:()=>we(r),fontSize:"14px",fontWeight:"400",pos:"relative",right:r===1?"10px":"0px",zIndex:r===0?100:10,borderLeftRadius:r===0?"50px":"0px",...Re,children:e.jsx(re,{fontSize:["12px","12px","12px","12px","12px"],noOfLines:1,children:s})})},k()))}),e.jsx(D,{}),c?e.jsxs(n,{...ke,children:[e.jsx(v,{...ye,textTransform:"uppercase",children:"Help"}),e.jsx(R,{orientation:"vertical",h:"12px",mx:"5px",borderWidth:"2px",borderColor:"black"}),e.jsxs(Ke,{isLazy:!0,placement:"bottom-end",trigger:"hover",children:[e.jsx(Ve,{children:e.jsxs(n,{as:"button",flexDir:"row",align:"center",color:"dark",_hover:{bg:"black",color:"white"},textTransform:"uppercase",fontWeight:"700",fontSize:["14px","14px","14px","14px","14px"],children:["Hi, ",((Y=o==null?void 0:o.customer)==null?void 0:Y.name)||"user",e.jsx(Ye,{ml:"5px",name:`${(J=o==null?void 0:o.customer)==null?void 0:J.name}`,src:(X=o==null?void 0:o.customer)==null?void 0:X.profilePicture,size:"sm"})]})}),e.jsxs(Je,{borderRadius:"0",position:"relative",width:"250px",background:"#FFFFFF",border:"1px",children:[e.jsx(n,{as:"button",_hover:{bg:"#F6F6F6"},...m,onClick:()=>i(`${a}/settings`),w:"full",alignItems:"flex-start",textAlign:"left",h:"50px",justifyContent:"space-between",children:e.jsxs(n,{flexDir:"column",w:"full",children:[e.jsx(t,{...d,children:(Z=o==null?void 0:o.customer)==null?void 0:Z.name}),e.jsx(t,{...Fe,w:"full",children:o==null?void 0:o.email})]})}),e.jsx(R,{w:"100%"}),e.jsxs(n,{...m,h:"3vw",as:"button",_hover:{bg:"#F6F6F6"},onClick:()=>i(`${a}/dashboard/dashboard-my-assets`),children:[e.jsxs(n,{w:"100%",children:[e.jsx(x,{w:"1vw",h:"1vw",alignSelf:"center",mr:"5%",src:g.edit_Icon}),e.jsx(t,{...d,children:"My Rewards"})]}),e.jsx(t,{...d,alignSelf:"center",children:($==null?void 0:$.length)||0})]}),e.jsxs(n,{...m,h:"3vw",as:"button",_hover:{bg:"#F6F6F6"},children:[e.jsxs(n,{w:"100%",children:[e.jsx(x,{w:"1vw",h:"1vw",alignSelf:"center",mr:"5%",src:g.edit_Icon,onClick:()=>i(`${a}/dashboard/dashboard-saved/?tab=deals`)}),e.jsx(t,{...d,children:"My Deals"})]}),e.jsx(t,{...d,alignSelf:"center",children:(F==null?void 0:F.total)||0})]}),e.jsxs(n,{...m,h:"3vw",as:"button",_hover:{bg:"#F6F6F6"},onClick:()=>i(`${a}/dashboard/dashboard-saved?tab=saved`),children:[e.jsxs(n,{w:"100%",children:[e.jsx(x,{w:"1vw",h:"1vw",alignSelf:"center",mr:"5%",src:g.edit_Icon}),e.jsx(t,{...d,children:"Saved"})]}),e.jsx(t,{...d,alignSelf:"center",children:be||0})]}),e.jsx(R,{w:"100%"}),e.jsx(n,{...m,h:"3vw",as:"button",_hover:{bg:"#F6F6F6"},children:e.jsxs(n,{w:"100%",children:[e.jsx(x,{w:"1vw",h:"1vw",alignSelf:"center",mr:"5%",src:g.mobileapp_icon}),e.jsx(t,{...d,children:"Install mobile app"})]})}),e.jsx(R,{w:"100%"}),e.jsx(n,{...m,h:"3vw",as:"button",_hover:{bg:"#F6F6F6"},onClick:()=>{u(Xe()),u(Ze()),u(es())},children:e.jsxs(n,{w:"100%",children:[e.jsx(x,{w:"1vw",h:"1vw",alignSelf:"center",mr:"5%",src:g.logoutIcon}),e.jsx(t,{...d,children:"Logout"})]})})]})]})]}):e.jsx(n,{flexDir:"row",w:"20%",justify:"flex-end",children:["EN","FR","IT"].map((s,r)=>e.jsx(v,{as:P,w:"10%",h:"90%",color:r===z?"black":"white",borderWidth:.5,borderRadius:"100px",px:"7%",ml:"3%",_hover:{bg:r===z?"white":"dark"},bg:r===z?"white":"black",onClick:()=>{me(r)},children:e.jsx(re,{fontSize:["14px","14px","14px","14px","14px"],children:s})},k()))})]})})}),e.jsx(C,{w:"100%",bg:"light",children:e.jsx(B,{children:e.jsx(n,{bg:"light",h:"55px",borderBottomWidth:1,w:"100%",display:["none","none","flex","flex","flex"],...he,children:e.jsxs(ae,{w:"100%",children:[e.jsx(n,{...U,as:"button",onClick:()=>{i(c?`${a}/dashboard`:`${a}/`)},children:e.jsx(x,{src:g.appLogo,objectFit:"cover"})}),e.jsxs(n,{...Q,as:"button",onClick:()=>{y()},children:[e.jsx(ie,{as:ce,color:"#000000"}),e.jsx(t,{noOfLines:1,...w,px:"3%",color:"#000000",children:"Search offers, brand or style..."})]}),e.jsx(n,{...M,as:"button",onClick:()=>i(o?`${a}/dashboard`:`${a}/login`),children:e.jsx(t,{...w,textTransform:"uppercase",fontWeight:"700",children:"Dashboard"})}),e.jsx(le,{label:"Brands",children:(se=(ee=T==null?void 0:T.data)==null?void 0:ee.brands)==null?void 0:se.map(s=>s.logo&&l.createElement(xe,{as:"button",...w,key:k(),onClick:()=>i(`${a}/dashboard/shop/${s.id}`,{state:{...s}})},e.jsxs(ae,{children:[e.jsx(x,{src:s==null?void 0:s.logo,w:"30px",h:"30px",objectFit:"contain",borderRadius:"20px"}),e.jsx(t,{textAlign:"left",children:s.name})]})))}),e.jsx(le,{label:"Categories",children:(ne=E==null?void 0:E.data)==null?void 0:ne.categories.map(s=>l.createElement(xe,{...w,key:k(),onClick:()=>{i(`${a}/dashboard/category/${s.name}`,{state:{...s}})}},s.name))}),e.jsx(n,{...M,as:"button",onClick:()=>i(`${a}/bounties`),children:e.jsx(t,{...w,textTransform:"uppercase",fontWeight:"700",as:"button",children:"Earn Rewards"})}),e.jsx(D,{}),c?e.jsxs(e.Fragment,{children:[e.jsxs(n,{as:"button",...K,...q,onClick:()=>i(`${a}/notification`),children:[e.jsx(x,{src:ss,mr:"1",w:"25px",h:"25px"}),((te=f==null?void 0:f.data)==null?void 0:te.total)-G>0&&e.jsx(de,{size:"21px",...V,justifyContent:"center",alignItems:"center",color:"light",className:"infinite-bounce",children:e.jsx(t,{fontSize:"14px",fontWeight:"600",children:((oe=f==null?void 0:f.data)==null?void 0:oe.length)-G})})]}),e.jsxs(n,{as:"button",...K,...q,onClick:()=>i(`${a}/bag`),children:[e.jsx(x,{src:ns,mr:"1",w:"25px",h:"25px"}),(j==null?void 0:j.length)>0&&e.jsx(de,{size:"21px",...V,justifyContent:"center",alignItems:"center",color:"light",children:e.jsx(t,{fontSize:"14px",fontWeight:"600",children:j==null?void 0:j.length})})]})]}):e.jsxs(n,{children:[e.jsx(v,{as:P,bg:"black",color:"white",px:"15px",py:"3px",_hover:{bg:"dark"},borderRadius:"100px",onClick:()=>i(`${a}/register`),children:e.jsx(t,{children:"Create an account"})}),e.jsx(D,{}),e.jsx(v,{as:P,bg:"white",color:"dark",borderWidth:1,borderColor:"black",ml:"15px",py:"3px",_hover:{bg:"white"},borderRadius:"100px",onClick:()=>i(`${a}/login`),children:e.jsx(t,{children:"Login"})})]})]})})})}),e.jsx(C,{display:W?"block":"none",pos:"absolute",w:"100%",zIndex:1e3,bg:"white",minHeight:"100px",children:e.jsx(ts,{in:W,children:e.jsx(C,{zIndex:1e3,boxShadow:"1px 1px 3px #00000035",minHeight:"auto",children:e.jsxs(B,{children:[e.jsxs(n,{...Le,pt:5,minHeight:"auto",transition:"min-height 0.5s","transition-timing-function":"ease-in",_focus:{boxShadow:"none"},justifyContent:"space-between",children:[e.jsx(n,{...U,as:"button",onClick:()=>{i(c?`${a}/dashboard`:`${a}/`)},children:e.jsx(x,{src:g.appLogo,objectFit:"cover"})}),e.jsx(n,{...Q,w:"600px",_focus:{boxShadow:"none"},flexDir:"column",children:e.jsxs(os,{_focus:{boxShadow:"none"},as:"button",children:[e.jsx(rs,{pointerEvents:"none",children:e.jsx(ie,{as:ce,color:"#999999"})}),e.jsx(as,{...w,value:S,onChange:({target:s})=>{L(s.value)},placeholder:"Search offers, brand or style...",borderRadius:"0",borderWidth:"0",onKeyDown:s=>{s.key==="Enter"&&(s.preventDefault(),y(),i(`${a}/searchResult`,{state:S}))}})]})}),e.jsx(v,{as:"button",w:"50px",h:"50px",onClick:()=>{L(""),y()},children:e.jsx(x,{w:"40px",h:"40px",src:g.cancel_icon})})]}),e.jsx(is,{fallback:e.jsx(t,{children:"There was an unknown error"}),children:e.jsxs(n,{w:"600px",pos:"relative",left:["300px","300px","300px","300px","340px"],children:[fe&&!_?e.jsx(t,{children:"Something unexpected happened. Try again later"}):e.jsx(e.Fragment,{}),O&&O.data.result.length>0?e.jsx(cs,{results:O.data.result,isLoading:_,searchText:S,clearClick:()=>{L("")},navigate:()=>{}}):e.jsx(n,{alignItems:"center",children:_?e.jsx(ls,{mt:"8px",mb:"8px",size:"sm"}):""})]})})]})})})})]})},Cs=l.memo(xs),ds=()=>({root:{w:"100%",zIndex:10},container:{h:"36px",px:"1%",align:"center"},boxCircleColor:{bgColor:"#3478F6"},search:{w:"250px",h:"40px",background:"light",borderRadius:"53px",border:"1px solid rgba(0, 0, 0, 0.05)",justify:"flex-start",align:"center",pl:"1%"},font:{fontSize:["12px"]},popfont:{fontSize:"12px",lineHeight:"14px",color:"#999999"},shopperBox:{h:"95%",flexDir:"row",justify:"space-between",align:"center"},infoBox:{h:"95%",align:"center",justify:"space-between"},shopperBusiness:{px:"14px",h:"30px",borderRightRadius:"50px"},homeIcon:{width:"77px",height:"32px",justify:"center",align:"center",mr:"2%"},notification:{w:"70px",h:"35px",background:"light",borderRadius:"53px",border:"1px solid rgba(0, 0, 0, 0.05)"},helpText:{h:"25px",w:"55px",rounded:"70px",bg:"dark",color:"white",fontSize:["14px","14px","14px","14px","14px"]},iconsLogo:{justify:"center",align:"center"},popoverTexts:{fontSize:["14px","14px","14px","14px","14px"],alignSelf:"flex-start"},popoverLightTexts:{fontSize:["12px","12px","12px","12px","12px"],color:"#999999",alignSelf:"flex-start"},itemBox:{w:"100%",h:"3vw",bg:"white",justify:"space-between",align:"center",px:"5%"},searchRoot:{w:"100%",bg:"light"}});export{Cs as default,ds as useNavbarStyles};