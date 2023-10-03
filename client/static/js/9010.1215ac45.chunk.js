"use strict";(self.webpackChunkapp_web_frontend=self.webpackChunkapp_web_frontend||[]).push([[9010],{28570:function(e,n,r){var o,t=r(36459),i=r(30168),l=r(52554),s=r(76582),d=r(81146),a=r(10884),c=r(72791),u=r(62825),x=r(80184),p=(0,l.F4)(o||(o=(0,i.Z)(["\n  0% {\n    transform: scale(1);\n  }\n  50% {\n    transform: scale(1.2);\n  }\n  100% {\n    transform: scale(1);\n  }\n"]))),h=function(e){Object.assign({},((0,t.Z)(e),e));return(0,x.jsxs)(s.k,{pos:"absolute",bg:"white",h:"100vh",w:"100vw",align:"center",justify:"center",flexDirection:"column",alignSelf:"center",children:[(0,x.jsx)(s.k,{w:"15vw",h:"15vw",borderRadius:"10vw",align:"center",justify:"center",borderWidth:1,borderColor:"dark",animation:"".concat(p," 2s infinite"),children:(0,x.jsx)(d.E,{src:u.Z.appLogo,objectFit:"cover",w:"10vw",h:"10vw"})}),(0,x.jsx)(a.x,{fontSize:"3vh",mt:"3vh",children:"Loading..."})]})};n.Z=(0,c.memo)(h)},29010:function(e,n,r){r.r(n),r.d(n,{default:function(){return Fe}});var o=r(74165),t=r(1413),i=r(15861),l=r(29439),s=r(72791),d=r(28382),a=r(51022),c=r(76582),u=r(62577),x=r(92746),p=r(28773),h=r(81146),f=r(99717),v=r(20824),b=r(10884),j=r(11660),m=r(27280),g=r(15144),w=r(94735),k=r(85914),Z=r(71118),y=r(93080),F=r(66484),S=r(31917),C=r(39589),O=r(25984),R=r(62825),_=r(95048),z=r(57689),M=r(40587),E=r(67416),D=r(59741),A=r.n(D),I=r(8832),L=r(74569),U=r.n(L),T=r(35486),P=r(13443),W=r(93865),J=r(52780),K=r(28570),$=r(95273),N=r(72426),B=r.n(N),X=r(80184),q=r(43299),Y=function(e){var n,r,o=e.reviews,t=(0,_.v9)((function(e){return e.userReducer})).user_data;return(0,X.jsx)(c.k,{width:"90%",flexDir:"column",children:(0,X.jsx)(j.U,{defaultIndex:[3],allowMultiple:!0,children:(0,X.jsxs)(m.Q,{borderWidth:0,mb:5,children:[(0,X.jsx)("h2",{children:(0,X.jsxs)(g.K,{_hover:{},borderWidth:0,px:0,children:[(0,X.jsx)(v.xu,{flex:"1",textAlign:"left",children:(0,X.jsxs)(b.x,{fontSize:"20px",children:["Reviews(",(null===o||void 0===o||null===(n=o.reviews)||void 0===n?void 0:n.length)||0,")"]})}),(0,X.jsx)(q,{name:"rate2",editing:!1,starColor:"#000000",emptyStarColor:"#999999",starCount:5,value:(null===o||void 0===o?void 0:o.total_rating)||0}),(0,X.jsx)(w.X,{zIndex:-10})]})}),(0,X.jsx)(k.H,{px:"0px",children:(0,X.jsx)(c.k,{flexDir:"column",align:"flex-start",children:null===o||void 0===o||null===(r=o.reviews)||void 0===r?void 0:r.map((function(e){var n;return(0,X.jsxs)(x.K,{align:"flex-start",mb:"20px",children:[(0,X.jsx)(b.x,{fontSize:"16px",fontWeight:400,mb:"5px",children:null===e||void 0===e?void 0:e.title}),(0,X.jsxs)(c.k,{align:"center",children:[(0,X.jsx)(q,{name:"rate2",editing:!1,starColor:"#000000",emptyStarColor:"#999999",starCount:5,value:null===e||void 0===e?void 0:e.rating}),(0,X.jsxs)(b.x,{ml:"5px",fontSize:"10px",color:"#999999",children:[null===t||void 0===t||null===(n=t.customer)||void 0===n?void 0:n.firstName," \u2212"]}),(0,X.jsx)(b.x,{ml:"5px",fontSize:"10px",color:"#999999",children:B()(null===e||void 0===e?void 0:e.created_at).format("DD MMM YYYY")})]}),(0,X.jsx)(b.x,{fontSize:"12px",children:null===e||void 0===e?void 0:e.review})]},(0,$.x0)())}))})})]},(0,$.x0)())})})},G=r(86762),H=r(9055),Q=r(11848),V=r(68228),ee=function(e){e.redeemOnOpen;var n,r=e.redeemIsOpen,t=e.redeemOnClose,d=e.product,a=e.restFns,c=(0,_.v9)((function(e){return e.authReducer})).token,p=(0,s.useState)(!1),f=(0,l.Z)(p,2),v=f[0],j=f[1];function m(){return(m=(0,i.Z)((0,o.Z)().mark((function e(){var n,r;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return j(!0),e.prev=1,j(!0),e.next=5,U().post("".concat(T._n,"/redeem"),{offerId:null===d||void 0===d?void 0:d.id,amount:null===d||void 0===d?void 0:d.point_discount,quantity:1},{headers:{"x-access-token":c}});case 5:n=e.sent,r=n.status,setTimeout((function(){200===r&&(a(),t(),j(!1))}),2e3),e.next=14;break;case 10:e.prev=10,e.t0=e.catch(1),console.log(e.t0,"SIMULATE_REDEEM_ERR"),j(!1);case 14:return e.prev=14,e.finish(14);case 16:case"end":return e.stop()}}),e,null,[[1,10,14,16]])})))).apply(this,arguments)}return(0,X.jsx)(s.Suspense,{fallback:(0,X.jsx)(u.$,{size:"sm"}),children:(0,X.jsx)(Q.default,{isOpen:r,onClose:t,closeOnOverlayClick:!1,children:(0,X.jsxs)(x.K,{children:[(0,X.jsx)(C.X,{fontSize:"14px",children:"Redeem now"}),(0,X.jsx)(b.x,{pt:"5px",pb:"20px",children:"You are about to be redirected to the official brand's website to complete your purchase process."}),(0,X.jsxs)(G.U,{w:"100%",justifyContent:"center",children:[(0,X.jsx)(h.E,{src:R.Z.appLogo,w:"50px",h:"50px",borderRadius:"70px",objectFit:"contain",bg:"#9999993B"}),v?(0,X.jsx)(A(),{style:{width:"50px",height:"50px"},animationData:V,loop:!0,autoplay:!0}):(0,X.jsx)(b.x,{children:"-------------------connect-------------------"}),(0,X.jsx)(h.E,{src:null===d||void 0===d||null===(n=d.brand)||void 0===n?void 0:n.logo,w:"50px",h:"50px",borderRadius:"70px",objectFit:"contain",bg:"#9999993B"})]}),(0,X.jsx)(H.z,{isLoading:v,bg:"dark",mt:"3%",color:"white",h:"40px",borderRadius:0,_hover:{bg:"dark"},onClick:function(){var e;"REGULARPOINTS"===(null===d||void 0===d||null===(e=d.reward)||void 0===e?void 0:e.rewardType)&&function(){m.apply(this,arguments)}()},children:(0,X.jsx)(b.x,{children:"Continue"})}),(0,X.jsx)(F.M,{bg:"light",color:"dark",h:"40px",borderWidth:1,mt:"2px",onClick:function(){j(!1),t()},as:"button",children:(0,X.jsx)(b.x,{children:"Cancel"})})]})})})},ne=r(70548),re=r(92387),oe=r(35378),te=function(e){var n=e.isOpenModal,r=e.onCloseModal,t=e.restFns,d=(0,_.I0)(),a=(0,_.v9)((function(e){return e.authReducer})).token,c=(0,s.useState)(""),p=(0,l.Z)(c,2),h=p[0],f=p[1],v=(0,s.useState)(!1),j=(0,l.Z)(v,2),m=j[0],g=j[1],w=(0,oe.Qr)(),k=(0,l.Z)(w,1)[0];function y(){return y=(0,i.Z)((0,o.Z)().mark((function e(){return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(h){e.next=2;break}return e.abrupt("return");case 2:return g(!0),e.next=5,k({name:h}).then(function(){var e=(0,i.Z)((0,o.Z)().mark((function e(n){return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(200!==n.data.status){e.next=6;break}return e.next=4,d((0,re.JJ)({token:a}));case 4:r(),t();case 6:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()).catch((function(e){})).finally((function(){g(!1),f("")}));case 5:case"end":return e.stop()}}),e)}))),y.apply(this,arguments)}return(0,X.jsx)(s.Suspense,{fallback:(0,X.jsx)(u.$,{size:"sm"}),children:(0,X.jsx)(Q.default,{isOpen:n,onClose:r,closeOnOverlayClick:!1,children:(0,X.jsxs)(x.K,{children:[(0,X.jsx)(b.x,{children:"Create new collection"}),(0,X.jsx)(ne.I,{variant:"outline",my:"2vw",h:"40px",_placeholder:{color:"#cfcfcf"},borderRadius:0,placeholder:"Collection name",value:h,onChange:function(e){var n=e.target;f(n.value)}}),(0,X.jsx)(Z.L,{}),(0,X.jsx)(H.z,{isLoading:m,bg:"dark",color:"white",h:"40px",borderRadius:0,_hover:{bg:"dark"},onClick:function(){return y.apply(this,arguments)},disabled:!h,children:(0,X.jsx)(b.x,{children:"Next"})}),(0,X.jsx)(F.M,{bg:"light",color:"dark",h:"40px",borderWidth:1,mt:"2px",onClick:r,as:"button",children:(0,X.jsx)(b.x,{children:"Cancel"})})]})})})},ie=r(49640),le=r(76773),se=r(45695),de=r(84373),ae=r(6691),ce=function(e){var n=e.product,r=e.onClose3,a=e.isOpen3,p=e.restFns,f=ue(),j=f.desc,m=f.search,g=f.head,w=(0,d.p)(),k=(0,s.useState)(""),Z=(0,l.Z)(k,2),y=Z[0],O=Z[1],_=(0,s.useState)(""),z=(0,l.Z)(_,2),E=z[0],D=z[1],L=(0,s.useState)(0),U=(0,l.Z)(L,2),T=U[0],P=U[1],W=(0,s.useState)(""),J=(0,l.Z)(W,2),K=J[0],N=J[1],B=(0,s.useState)(!1),q=(0,l.Z)(B,2),Y=q[0],H=q[1],V=(0,s.useState)(""),ee=(0,l.Z)(V,2),re=ee[0],te=ee[1],ce=(0,s.useState)(""),xe=(0,l.Z)(ce,2),pe=xe[0],he=xe[1],fe=(0,s.useState)(!1),ve=(0,l.Z)(fe,2),be=ve[0],je=ve[1],me=(0,s.useState)(!1),ge=(0,l.Z)(me,2),we=ge[0],ke=ge[1],Ze=(0,oe.bR)(),ye=(0,l.Z)(Ze,1)[0],Fe=(0,oe.Xy)(),Se=(0,l.Z)(Fe,1)[0];function Ce(){return(Ce=(0,i.Z)((0,o.Z)().mark((function e(){var r;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(y.includes("@")){e.next=2;break}return e.abrupt("return");case 2:return ke(!0),e.next=5,Se({rewardId:null===n||void 0===n||null===(r=n.reward)||void 0===r?void 0:r.id,emailCode:E}).then((function(e){var n,r,o;e.error?N(null===e||void 0===e||null===(r=e.error)||void 0===r||null===(o=r.data)||void 0===o?void 0:o.error):null!==e&&void 0!==e&&null!==(n=e.data)&&void 0!==n&&n.synced&&((0,M.Z)(w,"Brand connected successfully",3e3),setTimeout((function(){p(),D(""),O(""),H(!1),P(2)}),300))})).catch((function(e){console.log(e,"SendEmailVerificationForSyncERR")})).finally((function(){ke(!1)}));case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Oe(){return(Oe=(0,i.Z)((0,o.Z)().mark((function e(){var r;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(y.includes("@")){e.next=2;break}return e.abrupt("return");case 2:return je(!0),e.next=5,ye({rewardId:null===n||void 0===n||null===(r=n.reward)||void 0===r?void 0:r.id,email:y}).then((function(e){null!==e&&void 0!==e&&e.data&&(H(!0),(0,M.Z)(w,"OTP sent successfully",3e3))})).catch((function(e){console.log(e,"ERR")})).finally((function(){je(!1)}));case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return(0,X.jsx)(s.Suspense,{fallback:(0,X.jsx)(u.$,{size:"sm"}),children:(0,X.jsx)(Q.default,{isOpen:a,onClose:r,closeOnOverlayClick:!1,children:function(){var e,o,i,l,d,a,p,f,w;switch(T){case 0:return(0,X.jsxs)(x.K,{children:[(0,X.jsxs)(c.k,{flexDir:"row",justify:"space-between",children:[(0,X.jsxs)(C.X,(0,t.Z)((0,t.Z)({},g),{},{children:["Sync ",null===n||void 0===n||null===(e=n.reward)||void 0===e?void 0:e.name," Rewards"]})),(0,X.jsx)(F.M,{as:"button",onClick:r,children:(0,X.jsx)(h.E,{w:"30px",h:"30px",src:R.Z.cancel_icon})})]}),(0,X.jsxs)(c.k,{flexDir:"row",align:"center",justify:"space-between",py:"2%",children:[(0,X.jsxs)(F.M,{w:"100px",h:"100px",overflow:"hidden",children:[(0,X.jsx)(h.E,{borderRadius:"10px",objectFit:"contain",src:null===n||void 0===n||null===(o=n.reward)||void 0===o?void 0:o.rewardImage}),(0,X.jsx)(v.xu,{w:"100px",h:"100px",borderRadius:"100px",pos:"absolute",bg:"#9999992D"})]}),(0,X.jsx)(b.x,(0,t.Z)((0,t.Z)({},j),{},{noOfLines:4,w:"100%",pl:"3%",children:null===n||void 0===n||null===(i=n.brand)||void 0===i?void 0:i.description}))]}),(0,X.jsx)(C.X,(0,t.Z)((0,t.Z)({},g),{},{children:"What you\u2019ll get"})),(0,X.jsx)(c.k,{flexDir:"column",bg:"#f6f6f6",p:"5%",borderRadius:"15px",children:null===(l=["Authorize Me app to access your reward balance with ".concat(null===n||void 0===n||null===(d=n.brand)||void 0===d?void 0:d.brandName),"Me app will Read reward balance from ".concat(null===n||void 0===n||null===(a=n.brand)||void 0===a?void 0:a.brandName),"Me app will monitor changes in reward balance "])||void 0===l?void 0:l.map((function(e){return(0,X.jsxs)(c.k,{children:[(0,X.jsx)(F.M,{bg:"#000000",w:"20px",h:"20px",borderRadius:"20px",children:(0,X.jsx)(ie.J,{as:de.Gy1,color:"light"})}),(0,X.jsx)(b.x,(0,t.Z)((0,t.Z)({},j),{},{noOfLines:2,pl:"2%",w:"100%",children:e}))]},(0,$.x0)())}))}),(0,X.jsx)(s.Suspense,{fallback:(0,X.jsx)(u.$,{size:"sm"}),children:(0,X.jsx)(ae.default,{isLoading:be,onClick:function(){return P(1)},name:"Connect with ".concat((null===n||void 0===n||null===(p=n.reward)||void 0===p?void 0:p.rewardName)||"reward")})})]});case 1:return(0,X.jsxs)(x.K,{children:[(0,X.jsxs)(c.k,{flexDir:"row",justify:"space-between",children:[(0,X.jsx)(C.X,(0,t.Z)((0,t.Z)({},g),{},{children:"Verify identity "})),(0,X.jsx)(F.M,{as:"button",onClick:function(){P(0),r(),he(""),H(!1),N("")},children:(0,X.jsx)(h.E,{src:R.Z.cancel_icon,w:"30px",h:"30px"})})]}),(0,X.jsx)(b.x,(0,t.Z)((0,t.Z)({},j),{},{w:"100%",pt:"1%",children:"Please select your preferred means of identification from the available options below"})),(0,X.jsx)(c.k,(0,t.Z)((0,t.Z)({},m),{},{children:(0,X.jsx)(le.P,{color:"dark",onChange:function(e){var n=e.target;he(n.value)},value:pe,variant:"unstyled",placeholder:"Select verification option",size:"md",_placeholder:{color:"#999999"},children:null===(f=["Email","Phone number"])||void 0===f?void 0:f.map((function(e){return(0,X.jsx)("option",{value:e,children:e},(0,$.x0)())}))})})),pe&&(0,X.jsx)(x.K,{children:"Email"===pe?(0,X.jsx)(ne.I,(0,t.Z)((0,t.Z)({},m),{},{value:y,onChange:function(e){O(e.target.value)},placeholder:"Enter email address"})):(0,X.jsx)(ne.I,(0,t.Z)((0,t.Z)({},m),{},{value:re,onChange:function(e){te(e.target.value)},placeholder:"Enter phone number"}))}),Y&&(0,X.jsxs)(v.xu,{my:"3%",children:[(0,X.jsx)(b.x,{fontSize:"10px",children:"Please provide the OTP sent to your inbox"}),(0,X.jsx)(G.U,{w:"100%",h:"60px",children:(0,X.jsx)(se.E,{onComplete:function(e){D(e),N("")},otp:!0,placeholder:"*",children:null===(w=[1,2,3,4,5,6])||void 0===w?void 0:w.map((function(){return(0,X.jsx)(se.x,{bg:"grey",borderRadius:10,borderWidth:0,w:"15%",h:"100%"},(0,$.x0)())}))})})]}),K&&(0,X.jsx)(b.x,(0,t.Z)((0,t.Z)({},j),{},{color:"red",children:K})),(0,X.jsx)(s.Suspense,{fallback:(0,X.jsx)(u.$,{size:"sm"}),children:(0,X.jsx)(ae.default,{isLoading:we||be,onClick:function(){Y?function(){Ce.apply(this,arguments)}():function(){Oe.apply(this,arguments)}()},isDisabled:!y.includes("@"),name:"Continue"})})]});case 2:return(0,X.jsx)(x.K,{w:"100%",children:(0,X.jsxs)(S.g,{children:[(0,X.jsx)(A(),{style:{width:"150px",height:"150px"},animationData:I,loop:!1,autoplay:!0}),(0,X.jsx)(C.X,{fontSize:"18px",pb:"10px",children:"Brand connected successfully"}),(0,X.jsx)(s.Suspense,{fallback:(0,X.jsx)(u.$,{size:"sm"}),children:(0,X.jsx)(ae.default,{name:"Ok",onClick:function(){P(0),r(),he(""),H(!1),N(""),setTimeout((function(){window.scrollTo({top:0,behavior:"smooth"})}),100)}})})]})})}}()})})},ue=function(){return{desc:{pb:"5px",fontSize:{base:"12px",md:"15px"},w:{base:"100%",md:"80%"}},search:{w:"100%",h:"40px",background:"#F6F6F6",borderRadius:"53px",justify:"flex-start",align:"center",pl:"2%",borderWidth:"0px",_placeholder:{color:"#999999"},_focus:{borderColor:"black"},mt:"1%",mb:"2%"},head:{fontSize:{base:"12px",md:"14px"}}}},xe=r(88675),pe=r(78820),he=r(39126),fe=r(56355),ve=function(){return(0,X.jsxs)(c.k,{mt:"20px",flexDir:"column",children:[(0,X.jsx)(F.M,{as:"button",bg:"#FFFFFF",border:"1px solid rgba(0, 0, 0, 0.2)",h:"40px",w:"77%",color:"rgba(0, 0, 0, 0.2)",children:"One size"}),(0,X.jsxs)(c.k,{mt:"4px",w:"100%",children:[(0,X.jsx)(F.M,{as:"button",bg:"#FFFFFF",mr:"3px",border:"1px solid rgba(0, 0, 0, 0.2)",h:"40px",w:"15%",color:"rgba(0, 0, 0, 0.2)",children:"US 7"}),(0,X.jsx)(F.M,{as:"button",mr:"3px",bg:"linear-gradient(0deg, rgba(0, 0, 0, 0.07), rgba(0, 0, 0, 0.07)), #FFFFFF",border:"1px solid #000000",h:"40px",w:"15%",color:"#000000",children:"US 7.5"}),(0,X.jsx)(F.M,{as:"button",mr:"3px",bg:"linear-gradient(0deg, rgba(0, 0, 0, 0.07), rgba(0, 0, 0, 0.07)), #FFFFFF",border:"1px solid #000000",h:"40px",w:"15%",color:"#000000",children:"US 8"}),(0,X.jsx)(F.M,{as:"button",mr:"3px",bg:"linear-gradient(0deg, rgba(0, 0, 0, 0.07), rgba(0, 0, 0, 0.07)), #FFFFFF",border:"1px solid #000000",h:"40px",w:"15%",color:"#000000",children:"US 8.5"}),(0,X.jsx)(F.M,{as:"button",bg:"linear-gradient(0deg, rgba(0, 0, 0, 0.07), rgba(0, 0, 0, 0.07)), #FFFFFF",border:"1px solid #000000",h:"40px",w:"15%",color:"#000000",children:"US 8.9"})]}),(0,X.jsxs)(c.k,{mt:"4px",w:"100%",children:[(0,X.jsx)(F.M,{as:"button",bg:"#FFFFFF",mr:"3px",border:"1px solid rgba(0, 0, 0, 0.2)",h:"40px",w:"15%",color:"rgba(0, 0, 0, 0.2)",children:"US 10"}),(0,X.jsx)(F.M,{as:"button",bg:"#FFFFFF",mr:"3px",border:"1px solid rgba(0, 0, 0, 0.2)",h:"40px",w:"15%",color:"rgba(0, 0, 0, 0.2)",children:"US 10.5"}),(0,X.jsx)(F.M,{as:"button",bg:"#FFFFFF",mr:"3px",border:"1px solid rgba(0, 0, 0, 0.2)",h:"40px",w:"15%",color:"rgba(0, 0, 0, 0.2)",children:"US 11"}),(0,X.jsx)(F.M,{as:"button",mr:"3px",bg:"linear-gradient(0deg, rgba(0, 0, 0, 0.07), rgba(0, 0, 0, 0.07)), #FFFFFF",border:"1px solid #000000",h:"40px",w:"15%",color:"#000000",children:"US 11.5"}),(0,X.jsx)(F.M,{as:"button",bg:"linear-gradient(0deg, rgba(0, 0, 0, 0.07), rgba(0, 0, 0, 0.07)), #FFFFFF",border:"1px solid #000000",h:"40px",w:"15%",color:"#000000",children:"US 12"})]}),(0,X.jsx)(b.x,{color:"dark",my:"14px",children:"Sizes listed are US."})]})},be=r(6587),je=function(e){e.isOpen,e.onClose;var n,r,t,a,x,h,f=e.product,v=e.product_loading,j=(e.rewardsFetching,e.onToggle,e.onOpenModal,e.onOpen3,(0,s.useRef)(),(0,_.I0)()),m=(0,d.p)(),g=(me().addToFavPopOver,(0,_.v9)((function(e){return e.authReducer})).token),w=(0,_.v9)((function(e){return e.userReducer})),k=w.user_data,Z=(w.user_collection,(0,_.v9)((function(e){return e.bountyReducer})).task_instruction_details),y=(0,oe.LI)({offerId:null===f||void 0===f?void 0:f.id},{refetchOnMountOrArgChange:!0,skip:!g||!(null!==f&&void 0!==f&&f.id)}),F=y.data,S=y.refetch,C=y.isFetching,O=(0,oe.Sn)(),R=(0,l.Z)(O,1)[0],E=(0,oe.eX)(),D=(0,l.Z)(E,1)[0],A=((0,z.s0)(),(0,s.useState)(!1)),I=(0,l.Z)(A,2),L=(I[0],I[1]),P=(0,s.useState)(!0),J=(0,l.Z)(P,2),K=(J[0],J[1],(0,s.useState)({})),N=(0,l.Z)(K,2),B=N[0],q=N[1],Y=(0,s.useState)(""),H=(0,l.Z)(Y,2),Q=(H[0],H[1],(0,s.useState)([])),V=(0,l.Z)(Q,2),ee=(V[0],V[1],(0,be.D)()),ne=ee.getTokenBalance,te=(ee.loading,null===f||void 0===f||null===(n=f.reward)||void 0===n?void 0:n.contractAddress);function le(){return le=(0,i.Z)((0,o.Z)().mark((function e(n){return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return L(!0),e.next=3,R({collection_id:n,offerId:null===f||void 0===f?void 0:f.id}).then(function(){var e=(0,i.Z)((0,o.Z)().mark((function e(n){var r;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=n.data,console.log(r,"KOIP"),200!==r.statusCode){e.next=8;break}return e.next=5,S();case 5:return e.next=7,j((0,re.JJ)({token:g}));case 7:(0,M.Z)(m,"Added to favorite",2e3,"bottom-right");case 8:Z&&j((0,W.$6)({task_id:null===Z||void 0===Z?void 0:Z.id,token:g}));case 9:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()).catch((function(){})).finally((function(){L(!1)}));case 3:case"end":return e.stop()}}),e)}))),le.apply(this,arguments)}function se(){return se=(0,i.Z)((0,o.Z)().mark((function e(){return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return L(!0),e.next=3,D({offerId:null===f||void 0===f?void 0:f.id}).then(function(){var e=(0,i.Z)((0,o.Z)().mark((function e(n){var r;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=n.data,console.log(r,"delete"),200!==r.statusCode){e.next=8;break}return e.next=5,S();case 5:return e.next=7,j((0,re.JJ)({token:g}));case 7:(0,M.Z)(m,"Removed from favorite",2e3,"bottom-right");case 8:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()).catch((function(e){console.log(e,"delete error")})).finally((function(){L(!1)}));case 3:case"end":return e.stop()}}),e)}))),se.apply(this,arguments)}return(0,s.useEffect)((function(){(0,i.Z)((0,o.Z)().mark((function e(){return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!te){e.next=6;break}return e.t0=q,e.next=4,ne(te);case 4:e.t1=e.sent,(0,e.t0)(e.t1);case 6:case"end":return e.stop()}}),e)})))()}),[te]),(0,X.jsxs)(X.Fragment,{children:[g&&(C?(0,X.jsx)(u.$,{size:"sm",my:"20px"}):(0,X.jsxs)(G.U,{as:"button",my:"20px",onClick:function(){null!==F&&void 0!==F&&F.data?function(){se.apply(this,arguments)}():function(e){le.apply(this,arguments)}()},w:"15%",children:[(0,X.jsx)(ie.J,{w:"24px",h:"24px",as:null!==F&&void 0!==F&&F.data?pe.L7p:pe.DZs}),(0,X.jsx)(b.x,{children:null!==F&&void 0!==F&&F.data?"Liked":"Like"})]})),(0,X.jsx)(p.O,{isLoaded:!v,children:(0,X.jsxs)(c.k,{color:"dark",fontSize:"22px",children:[(0,X.jsxs)(b.x,{children:[null===f||void 0===f?void 0:f.tokens," ",null===f||void 0===f||null===(r=f.reward)||void 0===r?void 0:r.rewardSymbol," \xb7"," "]}),(0,X.jsxs)(b.x,{color:"#999999",children:[" ",null===f||void 0===f?void 0:f.discountPercentage,"% coupon"]})]})}),g&&(null===k||void 0===k||null===(t=k.customer)||void 0===t?void 0:t.walletAddress)&&(0,X.jsxs)(b.x,{color:"#999999",children:["Available: ",null===B||void 0===B?void 0:B.balance," ",null===f||void 0===f||null===(a=f.reward)||void 0===a?void 0:a.rewardSymbol]}),(null===f||void 0===f||null===(x=f.category)||void 0===x?void 0:x.filter_options.includes("size"))&&(0,X.jsx)(ve,{}),(0,X.jsx)(p.O,{isLoaded:!v,children:(0,X.jsx)(b.x,{color:"dark",mt:"10px",mb:"30px",w:"75%",textAlign:"justify",children:null===f||void 0===f?void 0:f.description})}),(0,X.jsxs)(c.k,{flexDir:"column",children:[(0,X.jsx)(b.x,{children:"Share"}),(0,X.jsx)(G.U,{w:"40%",justify:"space-between",mt:"10px",children:null===(h=[{medium:"facebook",icon:fe.tBk},{medium:"twitter",icon:he.meP},{medium:"linkedin",icon:fe.BUd},{medium:"url",icon:he.Vs6},{medium:"whatsapp",icon:he.RGt}])||void 0===h?void 0:h.map((function(e){return(0,X.jsx)(c.k,{as:"a",mr:"3px",border:"1px solid #000000",_hover:{bg:"#F3F3F3"},borderRadius:"30px",alignItems:"center",justify:"center",width:"40px",height:"40px",cursor:"pointer",onClick:(0,i.Z)((0,o.Z)().mark((function n(){var r,t;return(0,o.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return(0,M.Z)(m,"Offer link has been copied to clipboard, you can now share",7e3,"top-left"),navigator.clipboard.writeText("meappbounty.com/productDetails/".concat(null===f||void 0===f?void 0:f.slug)),n.next=4,U().post("".concat(T._n,"/shares"),{offer_id:null===f||void 0===f?void 0:f.id,medium:e.medium,user_id:null===k||void 0===k||null===(r=k.customer)||void 0===r?void 0:r.id},{headers:{"x-access-token":g}});case 4:t=n.sent,t.status;case 6:case"end":return n.stop()}}),n)}))),children:(0,X.jsx)(ie.J,{w:"20px",h:"20px",as:e.icon})},(0,$.x0)())}))})]}),(0,X.jsx)(xe.i,{orientation:"horizontal",mt:"10px",mb:"20px",width:"82%",zIndex:-10})]})},me=function(){return{addToFavPopOver:{w:"15vw"}}},ge=r(67513),we=(0,s.lazy)((function(){return Promise.all([r.e(6669),r.e(173)]).then(r.bind(r,10173))})),ke=(0,s.lazy)((function(){return Promise.resolve().then(r.bind(r,54776))})),Ze=(0,s.lazy)((function(){return Promise.resolve().then(r.bind(r,11848))})),ye=(0,s.lazy)((function(){return Promise.resolve().then(r.bind(r,6691))})),Fe=function(){var e,n,r,D,L,$,N,B,q,G,H,Q,V,ne=(0,d.p)(),ie=(0,z.s0)(),le=((0,z.TH)().state,(0,_.I0)()),se=(0,z.UO)().id,de=(0,ge.Q)(),ae=de.loading,ue=de.setUpWallet,xe=(0,_.v9)((function(e){return e.authReducer})),pe=xe.token,he=xe.session_id,fe=(0,_.v9)((function(e){return e.userReducer})),ve=fe.user_data,be=(0,_.v9)((function(e){return e.productReducer})),me=be.reviews,Fe=be.product,Ce=be.product_loading,Oe=(0,_.v9)((function(e){return e.cartReducer})),Re=Oe.cartItems,_e=(0,a.q)(),ze=_e.isOpen,Me=_e.onToggle,Ee=_e.onClose,De=(0,a.q)(),Ae=De.isOpen,Ie=De.onOpen,Le=De.onClose,Ue=(0,a.q)(),Te=Ue.isOpen,Pe=Ue.onOpen,We=Ue.onClose,Je=(0,a.q)(),Ke=Je.isOpen,$e=Je.onOpen,Ne=Je.onClose,Be=Se(),Xe=Be.root,qe=Be.imageStyle,Ye=Be.logoStyle,Ge=(0,s.useState)(!0),He=(0,l.Z)(Ge,2),Qe=He[0],Ve=(He[1],(0,s.useState)(!1)),en=(0,l.Z)(Ve,2),nn=en[0],rn=en[1],on=(0,s.useState)(!1),tn=(0,l.Z)(on,2),ln=tn[0],sn=(tn[1],(0,a.q)()),dn=sn.isOpen,an=sn.onOpen,cn=sn.onClose,un=(0,oe.kD)();(0,l.Z)(un,1)[0];function xn(){return(null===Fe||void 0===Fe?void 0:Fe.inventory)<-1}(0,s.useEffect)((function(){null!==Fe&&void 0!==Fe&&Fe.id,le((0,P._0)({token:pe,session_id:he,offerCode:se})),le((0,W.hi)(!0))}),[]),(0,s.useEffect)((function(){Re.find((function(e){return e.id===(null===Fe||void 0===Fe?void 0:Fe.id)}))&&rn(!0)}),[Re]);var pn=function(){var e=(0,i.Z)((0,o.Z)().mark((function e(){var n;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,ue({persist:!1});case 3:if(!(n=e.sent).publicAddress){e.next=7;break}return e.next=7,U().put("".concat(T._n,"/customer/setup-wallet-address"),{walletAddress:n.publicAddress},{headers:{Authorization:"Bearer ".concat(pe)}}).then((function(e){e.data;pe&&le((0,re.bG)({token:pe})),(0,M.Z)(ne,"Wallet created successfully",2e3),ie("".concat(J.cn,"/subsequentRedeeming"),{state:(0,t.Z)({},Fe)})})).catch((function(e){console.log(e,"UPDATeYUSERZRR")}));case 7:e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.log(e.t0,"CREATE_WALLETERR");case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(){return e.apply(this,arguments)}}();return(0,X.jsxs)(c.k,{flexDir:"column",children:[(0,X.jsx)(s.Suspense,{fallback:(0,X.jsx)(u.$,{size:"sm"}),children:(0,X.jsx)(ke,{})}),(0,X.jsxs)(x.K,(0,t.Z)((0,t.Z)({},Xe),{},{display:"flex",children:[(0,X.jsxs)(c.k,{flexDir:"row",children:[(0,X.jsx)(c.k,{w:"50vw",bg:"grey",flexDir:"column",children:null===Fe||void 0===Fe||null===(e=Fe.offerImages)||void 0===e?void 0:e.map((function(e){return(0,X.jsx)(p.O,{isLoaded:Qe,overflow:"hidden",children:(0,X.jsx)(h.E,(0,t.Z)((0,t.Z)({src:null===e||void 0===e?void 0:e.url,objectFit:"cover"},qe),{},{mixBlendMode:"multiply"}))},(0,O.x0)())}))}),(0,X.jsxs)(c.k,{w:"50vw",flexDir:"column",px:"80px",py:"30px",children:[(0,X.jsxs)(c.k,{w:"600px",flexDir:"column",children:[(0,X.jsx)(f.s,{isLoaded:!Ce,w:"100px",h:"100px",children:(0,X.jsx)(v.xu,{as:"button",onClick:function(){var e,n,r;return ie("".concat(J.cn,"/dashboard/shop/").concat(null===Fe||void 0===Fe||null===(e=Fe.brand)||void 0===e?void 0:e.id),{state:{id:null===Fe||void 0===Fe||null===(n=Fe.brand)||void 0===n?void 0:n.id,slug:null===Fe||void 0===Fe||null===(r=Fe.brand)||void 0===r?void 0:r.slug,brandName:null===Fe||void 0===Fe?void 0:Fe.brandName}})},children:(0,X.jsx)(h.E,(0,t.Z)((0,t.Z)({src:null===Fe||void 0===Fe||null===(n=Fe.brand)||void 0===n?void 0:n.logo,objectFit:"contain"},Ye),{},{fallbackSrc:R.Z.appLogoPlaceholder,fallbackStrategy:"beforeLoadOrError",mixBlendMode:"multiply"}))})}),(0,X.jsx)(b.x,{color:"#D0D0D0",fontSize:"20px",mb:"20px",children:"DVS001_BLK_M5W7"}),(0,X.jsx)(p.O,{isLoaded:!Ce,children:(0,X.jsx)(b.x,{lineHeight:"48px",w:"80%",fontSize:"40px",textTransform:"uppercase",children:null===Fe||void 0===Fe?void 0:Fe.name})}),(0,X.jsx)(je,{isOpen:ze,onClose:Ee,product:Fe,product_loading:Ce,onToggle:Me,onOpenModal:Pe,onOpen3:$e,rewardsFetching:ln})]}),(null===me||void 0===me||null===(r=me.reviews)||void 0===r?void 0:r.length)>0&&(0,X.jsx)(Y,{reviews:me}),null!==Fe&&void 0!==Fe&&null!==(D=Fe.brand)&&void 0!==D&&D.online_stores||null!==Fe&&void 0!==Fe&&null!==(L=Fe.brand)&&void 0!==L&&L.physical_stores?(0,X.jsx)(c.k,{width:"90%",flexDir:"column",children:(0,X.jsx)(j.U,{defaultIndex:[3],allowMultiple:!0,px:0,children:(0,X.jsxs)(m.Q,{borderWidth:0,mb:5,children:[(0,X.jsx)("h2",{children:(0,X.jsxs)(g.K,{_hover:{},borderWidth:0,px:0,children:[(0,X.jsx)(v.xu,{flex:"1",textAlign:"left",children:(0,X.jsx)(b.x,{fontSize:"20px",children:"Where to redeem"})}),(0,X.jsx)(w.X,{zIndex:-10})]})}),(0,X.jsxs)(k.H,{px:"0px",children:[(null===Fe||void 0===Fe||null===($=Fe.brand)||void 0===$||null===(N=$.online_stores)||void 0===N?void 0:N.length)>0&&(0,X.jsxs)(v.xu,{children:[(0,X.jsx)(b.x,{color:"#AEAEAE",children:"Online stores"}),null===Fe||void 0===Fe||null===(B=Fe.brand)||void 0===B||null===(q=B.online_stores)||void 0===q?void 0:q.map((function(e,n){var r,o,t;return(0,X.jsxs)(c.k,{bg:n%2===0?"grey":"white",p:"5px",my:"5px",h:"40px",align:"center",children:[(0,X.jsx)(b.x,{children:null===(r=JSON.parse(e))||void 0===r?void 0:r.name}),(0,X.jsx)(Z.L,{}),(0,X.jsxs)(c.k,{children:[(0,X.jsx)(y.r,{textDecoration:"underline",target:"_blank",href:"".concat(null===(o=JSON.parse(e))||void 0===o?void 0:o.url),children:null===(t=JSON.parse(e))||void 0===t?void 0:t.url}),(0,X.jsx)(c.k,{w:"25px",h:"25px",ml:"5px",children:(0,X.jsx)(h.E,{src:R.Z.linkIcon})})]})]},(0,O.x0)())}))]}),(null===Fe||void 0===Fe||null===(G=Fe.brand)||void 0===G||null===(H=G.physical_stores)||void 0===H?void 0:H.length)>0&&(0,X.jsxs)(v.xu,{children:[(0,X.jsx)(b.x,{color:"#AEAEAE",mt:"30px",children:"Physical stores"}),null===Fe||void 0===Fe||null===(Q=Fe.brand)||void 0===Q||null===(V=Q.physical_stores)||void 0===V?void 0:V.map((function(e,n){var r;return(0,X.jsxs)(c.k,{bg:n%2===0?"grey":"white",p:"5px",my:"5px",h:"40px",align:"center",children:[(0,X.jsx)(b.x,{children:null===(r=JSON.parse(e))||void 0===r?void 0:r.name}),(0,X.jsx)(Z.L,{}),(0,X.jsx)(c.k,{children:(0,X.jsx)(y.r,{textDecoration:"underline",target:"_blank",href:"https://google.com",children:"130, Powell St, San Francisco, CA"})})]},(0,O.x0)())}))]})]})]},(0,O.x0)())})}):(0,X.jsx)(X.Fragment,{}),(0,X.jsxs)(c.k,{justify:"space-between",children:[(0,X.jsx)(F.M,{as:"button",h:"80px",bg:xn()?"#999999":"dark",w:"48%",color:"light",alignSelf:"center",top:"80vh",disabled:xn()||ae,_hover:{bg:"dark"},borderRadius:"0px",onClick:(0,i.Z)((0,o.Z)().mark((function e(){var n;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(pe){e.next=3;break}return ie("".concat(J.cn,"/login")),e.abrupt("return");case 3:if(null===ve||void 0===ve||null===(n=ve.customer)||void 0===n||!n.walletAddress){e.next=7;break}ie("".concat(J.cn,"/subsequentRedeeming"),{state:(0,t.Z)({},Fe)}),e.next=9;break;case 7:return e.next=9,pn();case 9:case"end":return e.stop()}}),e)}))),children:ae?(0,X.jsx)(u.$,{}):(0,X.jsx)(X.Fragment,{children:xn()?"Out of stock":"Redeem now"})}),(0,X.jsx)(F.M,{as:"button",h:"80px",bg:"dark",w:"48%",color:"light",alignSelf:"center",top:"80vh",_hover:{bg:"dark"},borderRadius:"0px",onClick:function(){nn||(0,M.Z)(ne,"Added to cart",2e3),le((0,E.Xq)((0,t.Z)((0,t.Z)({},Fe),{},{quantity:1})))},children:nn?"Added to bag":"Add to bag"})]})]})]}),(0,X.jsx)(te,{isOpenModal:Te,onCloseModal:We,restFns:function(){ze||Me()}}),(0,X.jsx)(ee,{product:Fe,restFns:function(){an()},redeemOnOpen:Ie,redeemOnClose:Le,redeemIsOpen:Ae}),(0,X.jsx)(ce,{product:Fe,onClose3:Ne,isOpen3:Ke,restFns:function(){}}),(0,X.jsx)(s.Suspense,{fallback:(0,X.jsx)(u.$,{size:"sm"}),children:(0,X.jsx)(Ze,{isOpen:dn,onClose:cn,closeOnOverlayClick:!0,children:(0,X.jsx)(x.K,{w:"100%",children:(0,X.jsxs)(S.g,{children:[(0,X.jsx)(A(),{style:{width:"150px",height:"150px"},animationData:I,loop:!1,autoplay:!0}),(0,X.jsx)(C.X,{fontSize:"18px",pb:"10px",children:"Reward redeemed successfully"}),(0,X.jsx)(s.Suspense,{fallback:(0,X.jsx)(u.$,{size:"sm"}),children:(0,X.jsx)(ye,{name:"Ok",onClick:function(){window.scrollTo({top:0,behavior:"smooth"}),cn()}})})]})})})})]})),(0,X.jsx)(s.Suspense,{fallback:(0,X.jsx)(u.$,{size:"sm"}),children:(0,X.jsx)(we,{})}),Ce&&(0,X.jsx)(K.Z,{})]})},Se=function(){return{root:{w:"100%",mt:"108px"},nameStyles:{fontSize:["20px","20px"]},button:{w:{base:"18%",md:"6%"},color:"dark",borderWidth:.5,backgroundColor:"light",fontSize:"15px"},loadMore:{w:"152px",h:"42px",alignSelf:"center",py:"10px",borderRadius:"100px"},imageStyle:{w:"100%"},addToFavPopOver:{w:"15vw"},logoStyle:{w:"100px",h:"100px",borderColor:"lightGrey",borderWidth:"0.5px"}}}}}]);
//# sourceMappingURL=9010.1215ac45.chunk.js.map