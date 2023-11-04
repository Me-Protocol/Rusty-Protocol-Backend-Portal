import{r as n,_ as L,u as _e,a as Me,d as m,aW as D,aX as Pe,aY as Ae,Z as Be,aZ as Ne,a_ as $e,j as e,ak as R,S,F as r,m as We,h as y,i as z,M as Ue,T as s,K as X,l as Z,G as E,a$ as Ve,b0 as Ge,b1 as He,y as x,U as I,a5 as K,b2 as Ye,b3 as O,N as Q,V as ee,b4 as oe,a9 as Je,aa as qe,ab as Xe,am as Ze,C as te,I as ne,f as se,ay as Ke,az as Qe,aA as eo}from"./index-7489b734.js";import{A as oo}from"./index.esm-0638fa76.js";import{e as re}from"./empty-fb04a4d6.js";import{L as to}from"./index-1bd976ec.js";const no=n.lazy(()=>L(()=>import("./index-7489b734.js").then(l=>l.cR),["assets/index-7489b734.js","assets/index-ed5220eb.css"])),so=n.lazy(()=>L(()=>import("./index-724b83aa.js"),["assets/index-724b83aa.js","assets/index-7489b734.js","assets/index-ed5220eb.css","assets/index-5a268680.js","assets/index-98df5cc3.js"])),ro=n.lazy(()=>L(()=>import("./index-e79249b2.js"),["assets/index-e79249b2.js","assets/index-7489b734.js","assets/index-ed5220eb.css"])),ao=()=>{var U,V,G,H,Y,J,q;let l=_e();const h=Me(),T=n.useRef(),{token:i}=m(o=>o.authReducer),{user_data:a}=m(o=>o.userReducer),{order_data:c,getOrder_loading:ae}=m(o=>o.orderReducer),{user_collection:lo,my_deals:co,my_deals_loading:ie,my_followed_brands:d}=m(o=>o.userReducer),{collection_data:v,collection_loading:xo}=m(o=>o.collectionReducer);n.useEffect(()=>{i&&h(D({token:i}))},[i]),n.useEffect(()=>{i&&(h(Pe({token:i})),h(Ae({token:i})))},[]);const{isOpen:le,onOpen:_,onClose:j}=Be(),{root:ce,infoBox:de,font1:xe,font2:he,editProfileText:pe,contain:ho,smallerDesc:ue,singleCol:M,popContentStyle:fe,colOptionText:me,cancelButton:je,nextButton:be,newCollectionInput:ge,editProfileButton:we,iconCenter:Ce,editIconStack:Se,imageDisplay:ye,fontUnderline:ve,nameStack:ke}=io(),[Fe]=Ne(),[De]=$e(),[Re,P]=n.useState(!1),[po,A]=n.useState(""),[b,B]=n.useState(""),[N,$]=n.useState(!1);n.useState(!1),n.useState([]);const[ze,W]=n.useState(null),[Ee,Ie]=n.useState("");n.useEffect(()=>{const p=["January","February","March","April","May","June","July","August","September","October","November","December"][new Date().getMonth()];Ie(p)},[]);const k=[{id:"1",name:"My deals"},{id:"2",name:"My saved"},{id:"3",name:"My brands"}];async function Oe(){b&&(P(!0),await Fe({name:b}).then(({data:o})=>{h(D({token:i})),j()}).catch(o=>{A(o)}).finally(()=>{P(!1),B("")}))}async function Le(o){$(!0),W(o),await De(o).then(({data:t})=>{h(D({token:i})),j()}).catch(t=>{A(t)}).finally(()=>{$(!1),W(null)})}function Te(){var o;return e.jsx(e.Fragment,{children:e.jsxs(r,{w:"100%",justify:"space-between",flexDir:"row",flexWrap:"wrap",children:[(o=v==null?void 0:v.collections)==null?void 0:o.map((t,p)=>{var u,f;return e.jsxs(r,{...M,children:[e.jsx(r,{...ye,flexDir:"row",wrap:"wrap",children:e.jsx(ne,{src:t==null?void 0:t.image,objectFit:"contain",fallbackSrc:se.appLogoPlaceholder},x())}),e.jsxs(y,{justify:"center",...ke,children:[e.jsx(s,{noOfLines:1,fontSize:"18px",children:t==null?void 0:t.name}),e.jsxs(s,{color:"#999999",children:[(u=t.likes)==null?void 0:u.length," ",((f=t.likes)==null?void 0:f.length)>0?"items":"item"]})]}),e.jsx(r,{w:"10%",h:"15%",alignSelf:"center",children:e.jsx(Ke,{isLazy:!0,placement:"bottom",initialFocusRef:T,children:({isOpen:F,onClose:g})=>e.jsxs(e.Fragment,{children:[e.jsx(Qe,{children:e.jsx(R,{as:"button",children:N&&t.id===ze?e.jsx(S,{size:"sm"}):e.jsx(I,{w:"100%",h:"100%",as:oo})})}),e.jsx(R,{as:"button",textAlign:"left",children:e.jsx(eo,{ref:T,onClick:g,...fe,children:e.jsx(y,{...Se,children:["Delete"].map((w,C)=>e.jsxs(r,{as:"button",flexDir:"row",align:"center",onClick:()=>{C===1?l(`${t==null?void 0:t.id}`,{state:{id:t==null?void 0:t.id}}):Le(t==null?void 0:t.id)},children:[e.jsx(ne,{w:"8%",h:"8%",src:se.edit_Icon,mr:"5%"}),e.jsx(s,{...me,children:w})]},x()))})})})]})})})]},x())}),e.jsxs(r,{...M,onClick:_,children:[e.jsx(te,{...Ce,flexDir:"row",flexWrap:"wrap",children:e.jsx(I,{w:"3vw",h:"3vw",as:K})}),e.jsx(z,{ml:"5%",children:e.jsx(s,{children:"New collection"})})]})]})})}return e.jsxs(R,{w:"100%",h:"100vh",flexDir:"column",children:[e.jsx(n.Suspense,{fallback:e.jsx(S,{size:"sm"}),children:e.jsx(no,{})}),e.jsx(r,{flexDir:"column",children:e.jsx(We,{children:e.jsxs(y,{...ce,children:[e.jsxs(z,{...de,bg:"#F2F2F2",children:[e.jsx(Ue,{size:"xl",mr:"2%",name:`${(U=a==null?void 0:a.customer)==null?void 0:U.name}`,src:(V=a==null?void 0:a.customer)==null?void 0:V.profilePicture}),e.jsxs(y,{children:[e.jsx(s,{...xe,textTransform:"uppercase",children:(G=a==null?void 0:a.customer)==null?void 0:G.name}),e.jsxs(s,{...he,children:["Member since ",Ee," ",new Date().getUTCFullYear()]})]}),e.jsx(X,{}),e.jsx(Z,{variant:"outline",...we,onClick:()=>l(`${E}/settings`),children:e.jsx(s,{...pe,children:"Edit Profile"})})]}),e.jsxs(Ve,{isLazy:!0,children:[e.jsxs(r,{flexDir:"row",w:"100%",children:[e.jsx(Ge,{children:k==null?void 0:k.map(o=>e.jsx(He,{...ue,_selected:{color:"black",borderColor:"black"},color:"#999999",children:e.jsx(s,{fontWeight:"700",children:o.name})},x()))}),e.jsx(X,{}),e.jsxs(z,{onClick:_,cursor:"pointer",children:[e.jsx(s,{fontWeight:"600",children:"New collection"}),e.jsx(I,{w:"30px",h:"30px",as:K})]})]}),e.jsxs(Ye,{children:[e.jsx(O,{px:0,children:e.jsx(n.Suspense,{fallback:e.jsx(S,{size:"sm"}),children:((H=c==null?void 0:c.orders)==null?void 0:H.length)>0?e.jsx(e.Fragment,{children:(Y=c==null?void 0:c.orders)==null?void 0:Y.map(o=>{var t,p,u,f,F,g,w,C;return e.jsx(Q,{isLoaded:!ae,mb:"2px",children:e.jsx(so,{name:(t=o==null?void 0:o.offer)==null?void 0:t.name,price:Number((p=o==null?void 0:o.offer)==null?void 0:p.originalPrice),token:`${(u=o==null?void 0:o.offer)==null?void 0:u.tokens} ${(F=(f=o==null?void 0:o.offer)==null?void 0:f.reward)==null?void 0:F.rewardSymbol}`,quantity:o==null?void 0:o.quantity,date:(g=o==null?void 0:o.offer)==null?void 0:g.updatedAt,expired:!1,image:(C=(w=o==null?void 0:o.offer)==null?void 0:w.offerImages[0])==null?void 0:C.url,rest:{...o}})},x())})}):e.jsxs(ee,{children:[e.jsx(r,{w:"500px",h:"500px",children:e.jsx(oe,{animationData:re,loop:!0,autoplay:!0,width:50,height:70})}),e.jsxs(s,{children:["You currently have no deals,"," ",e.jsx(s,{as:"button",onClick:()=>l(`${E}/dashboard/category`),...ve,children:"Explore your favorite deals to purchase"})]})]})})}),e.jsx(O,{px:0,children:Te()}),e.jsx(O,{px:0,children:e.jsx(n.Suspense,{fallback:e.jsx(S,{size:"sm"}),children:((J=d==null?void 0:d.following)==null?void 0:J.length)>0?e.jsx(e.Fragment,{children:(q=d==null?void 0:d.following)==null?void 0:q.map(o=>e.jsx(Q,{isLoaded:!ie,mb:"2px",children:e.jsx(ro,{item:{...o}},x())}))}):e.jsxs(ee,{children:[e.jsx(r,{w:"400px",h:"400px",children:e.jsx(oe,{animationData:re,loop:!0,autoplay:!0,width:50,height:70})}),e.jsxs(s,{children:["You currently have followed brands,"," ",e.jsx(s,{as:"button",onClick:()=>l(`${E}/dashboard/shop`),children:"Explore your favorite brands"})]})]})})})]})]})]})})}),e.jsxs(Je,{isCentered:!0,blockScrollOnMount:!0,scrollBehavior:"inside",isOpen:le,size:"xl",onClose:j,motionPreset:"slideInBottom",closeOnOverlayClick:!1,children:[e.jsx(qe,{}),e.jsxs(Xe,{w:{base:"90vw",md:"30vw"},h:"15vw",borderRadius:0,p:"1%",children:[e.jsx(s,{children:"Create new collection"}),e.jsx(Ze,{variant:"outline",...ge,placeholder:"Collection name",value:b,onChange:({target:o})=>{B(o.value)}}),e.jsx(Z,{isLoading:Re,...be,onClick:Oe,disabled:!b,children:e.jsx(s,{children:"Next"})}),e.jsx(te,{...je,onClick:j,as:"button",children:e.jsx(s,{children:"Cancel"})})]})]}),N&&e.jsx(to,{})]})},bo=ao,io=()=>({root:{w:"100%",mt:"108px",pt:"3%",overflow:"hidden"},infoBox:{w:"100%",h:"150px",px:"2%",borderRadius:"16px"},root2:{w:"1440px",h:"248px",mt:"1px"},font1:{fontSize:"24px",color:"#000000"},font2:{fontSize:"16px",color:"#999999"},editProfileText:{fontSize:"14px"},button:{w:"150px",h:"47px",borderRadius:"0px",background:"#000000",fontSize:"18px",lineHeight:"22px",color:"#FFFFFF"},contain:{w:"100%",h:"64px",mt:"297px"},head:{fontSize:{base:"18px",md:"20px"}},smallerDesc:{fontSize:{base:"10px",md:"16px"}},container:{w:"100px",_hover:{background:"black",color:"white"}},search:{w:"240px",h:"40px",background:"#F6F6F6",borderRadius:"53px"},font:{fontSize:"16px",lineHeight:"19px",_hover:{color:"#FFFFFF"}},popfont:{fontSize:"12px",lineHeight:"14px",color:"#999999"},singleCol:{w:"44%",h:"200px",borderRadius:"16px",borderWidth:"1px",borderColor:"#9999992B",overflow:"hidden",mb:"2vw"},popContentStyle:{borderRadius:"0",width:"100%",background:"#FFFFFF",border:"0px"},colOptionText:{fontSize:"12px"},cancelButton:{bg:"light",color:"dark",h:"40px",borderWidth:1,mt:"6px"},nextButton:{mt:"20px",color:"white",h:"40px",borderRadius:0,_hover:{bg:"dark"},bg:"dark"},editProfileButton:{borderRadius:"30px",alignSelf:"flex-start",top:"20%",borderColor:"dark"},newCollectionInput:{mt:"10px",h:"40px",borderRadius:0,_placeholder:{color:"#cfcfcf"}},iconCenter:{bg:"#f2f2f2",w:"40%",cursor:"pointer",h:"100%"},editIconStack:{bg:"light",py:"5%",pr:"20%",w:"15vw",borderRadius:"4px",boxShadow:"1px 2px 9px #00000035",pl:"5%"},imageDisplay:{h:"100%",bg:"grey",cursor:"pointer",w:"40%"},fontUnderline:{decoration:"underline"},nameStack:{ml:"5%",w:"60%"}});export{bo as default};