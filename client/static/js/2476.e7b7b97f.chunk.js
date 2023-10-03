"use strict";(self.webpackChunkapp_web_frontend=self.webpackChunkapp_web_frontend||[]).push([[2476],{72476:function(e,n,o){o.r(n),o.d(n,{useNavbarStyles:function(){return U}});var t=o(1413),r=o(29439),i=o(45987),s=o(51022),c=o(76582),l=o(20824),a=o(66484),x=o(39589),d=o(71118),h=o(88675),p=o(67381),u=o(82872),f=o(70269),g=o(64475),j=o(10884),b=o(49640),Z=o(81146),w=o(9055),v=o(86762),m=o(87251),k=o(52904),C=o(51692),F=o(57943),S=o(70548),y=o(62577),_=o(72791),E=o(25984),z=o(56355),L=o(62825),I=o(57689),R=o(95048),O=o(5064),D=o(81319),M=o(35378),T=o(23823),B=o(4400),W=o(4379),Y=o(22352),H=o(93865),J=o(52780),N=o(80184),A=["customPadding"],P=function(e){e.customPadding;var n,o,P,q,V,X,K,Q,$,G,ee,ne,oe=(0,i.Z)(e,A),te=(0,I.s0)(),re=(0,s.q)(),ie=re.isOpen,se=re.onToggle,ce=(0,R.I0)(),le=(0,R.v9)((function(e){return e.authReducer})).token,ae=(0,R.v9)((function(e){return e.userReducer})),xe=ae.user_data,de=ae.my_rewards,he=ae.prev_notification_count,pe=(ae.current_notification_count,ae.new_notification_count,(0,R.v9)((function(e){return e.cartReducer})).cartItems),ue=(0,M.MQ)({page:1},{refetchOnMountOrArgChange:!0,skip:!le}).data,fe=(0,_.useState)(!1),ge=(0,r.Z)(fe,2),je=(ge[0],ge[1],(0,_.useState)("")),be=(0,r.Z)(je,2),Ze=be[0],we=be[1],ve=(0,_.useState)(!0),me=(0,r.Z)(ve,2),ke=me[0],Ce=me[1],Fe=(0,M.NL)({page:1,limit:7,type:M.a9.PRODUCT},{refetchOnMountOrArgChange:!0}),Se=Fe.data,ye=(Fe.isLoading,(0,M.rY)({page:1,limit:5},{refetchOnMountOrArgChange:300})),_e=ye.data,Ee=(ye.isLoading,(0,M.h2)({search_value:Ze,page:1,limit:10},{skip:Ze.length<3,refetchOnMountOrArgChange:!0})),ze=Ee.data,Le=Ee.isLoading,Ie=Ee.error,Re=ze,Oe=(0,_.useState)(0),De=(0,r.Z)(Oe,2),Me=De[0],Te=De[1],Be=(0,_.useState)(0),We=(0,r.Z)(Be,2),Ye=We[0],He=We[1],Je=U(),Ne=Je.root,Ae=Je.container,Pe=Je.font,Ue=(Je.popfont,Je.search),qe=Je.shopperBox,Ve=Je.infoBox,Xe=Je.shopperBusiness,Ke=Je.homeIcon,Qe=Je.notification,$e=Je.helpText,Ge=Je.iconsLogo,en=Je.popoverTexts,nn=Je.popoverLightTexts,on=Je.itemBox,tn=Je.searchRoot,rn=Je.boxCircleColor;return(0,_.useEffect)((function(){var e=window.pageYOffset,n=function(){var n=window.pageYOffset;Ce(e>n||n<=0),e=n};return window.addEventListener("scroll",n),function(){return window.removeEventListener("scroll",n)}}),[]),(0,N.jsxs)(c.k,(0,t.Z)((0,t.Z)({},Ne),{},{pos:"fixed",flexDir:"column",top:ke?0:"-100%",left:"0",right:"0",transition:"top 0.3s ease-in-out",zIndex:"docked",children:[(0,N.jsx)(l.xu,{w:"100%",bg:"#E3E3E3",children:(0,N.jsx)(T.default,{children:(0,N.jsxs)(c.k,{bg:"#E3E3E3",h:"50px",align:"center",children:[(0,N.jsx)(c.k,(0,t.Z)((0,t.Z)({},qe),{},{flexDir:"row",children:null===(n=["For Shoppers","For Businesses"])||void 0===n?void 0:n.map((function(e,n){return(0,N.jsx)(a.M,(0,t.Z)((0,t.Z)({as:"button",textTransform:"uppercase",bg:Me===n?"dark":"#C3C3C3",color:Me===n?"light":"dark",onClick:function(){return Te(n)},fontSize:"14px",fontWeight:"400",pos:"relative",right:1===n?"10px":"0px",zIndex:0===n?100:10,borderLeftRadius:0===n?"50px":"0px"},Xe),{},{children:(0,N.jsx)(x.X,{fontSize:["12px","12px","12px","12px","12px"],noOfLines:1,children:e})}),(0,E.x0)())}))})),(0,N.jsx)(d.L,{}),le?(0,N.jsxs)(c.k,(0,t.Z)((0,t.Z)({},Ve),{},{children:[(0,N.jsx)(a.M,(0,t.Z)((0,t.Z)({},$e),{},{textTransform:"uppercase",children:"Help"})),(0,N.jsx)(h.i,{orientation:"vertical",h:"12px",mx:"5px",borderWidth:"2px",borderColor:"black"}),(0,N.jsxs)(p.J,{isLazy:!0,placement:"bottom-end",trigger:"hover",children:[(0,N.jsx)(u.x,{children:(0,N.jsxs)(c.k,{as:"button",flexDir:"row",align:"center",color:"dark",_hover:{bg:"black",color:"white"},textTransform:"uppercase",fontWeight:"700",fontSize:["14px","14px","14px","14px","14px"],children:["Hi, ",(null===xe||void 0===xe||null===(o=xe.customer)||void 0===o?void 0:o.name)||"user",(0,N.jsx)(f.q,{ml:"5px",name:"".concat(null===xe||void 0===xe||null===(P=xe.customer)||void 0===P?void 0:P.name),src:null===xe||void 0===xe||null===(q=xe.customer)||void 0===q?void 0:q.profilePicture,size:"sm"})]})}),(0,N.jsxs)(g.y,{borderRadius:"0",position:"relative",width:"250px",background:"#FFFFFF",border:"1px",children:[(0,N.jsxs)(c.k,(0,t.Z)((0,t.Z)({as:"button",_hover:{bg:"#F6F6F6"}},on),{},{onClick:function(){return te("".concat(J.cn,"/settings"))},children:[(0,N.jsxs)(c.k,{flexDir:"column",children:[(0,N.jsxs)(j.x,(0,t.Z)((0,t.Z)({},en),{},{noOfLines:1,children:[null===xe||void 0===xe||null===(V=xe.customer)||void 0===V?void 0:V.firstName," ",null===xe||void 0===xe||null===(X=xe.customer)||void 0===X?void 0:X.lastName]})),(0,N.jsx)(j.x,(0,t.Z)((0,t.Z)({},nn),{},{children:null===xe||void 0===xe?void 0:xe.email}))]}),(0,N.jsx)(b.J,{as:z.Dli})]})),(0,N.jsx)(h.i,{w:"100%"}),(0,N.jsxs)(c.k,(0,t.Z)((0,t.Z)({},on),{},{h:"3vw",as:"button",_hover:{bg:"#F6F6F6"},onClick:function(){return te("".concat(J.cn,"/dashboard/dashboard-my-assets"))},children:[(0,N.jsxs)(c.k,{w:"100%",children:[(0,N.jsx)(Z.E,{w:"1vw",h:"1vw",alignSelf:"center",mr:"5%",src:L.Z.edit_Icon}),(0,N.jsx)(j.x,(0,t.Z)((0,t.Z)({},en),{},{children:"My assets"}))]}),(0,N.jsx)(j.x,(0,t.Z)((0,t.Z)({},en),{},{alignSelf:"center",children:(null===de||void 0===de?void 0:de.length)||0}))]})),(0,N.jsxs)(c.k,(0,t.Z)((0,t.Z)({},on),{},{h:"3vw",as:"button",_hover:{bg:"#F6F6F6"},children:[(0,N.jsxs)(c.k,{w:"100%",children:[(0,N.jsx)(Z.E,{w:"1vw",h:"1vw",alignSelf:"center",mr:"5%",src:L.Z.edit_Icon}),(0,N.jsx)(j.x,(0,t.Z)((0,t.Z)({},en),{},{children:"My Offers"}))]}),(0,N.jsx)(j.x,(0,t.Z)((0,t.Z)({},en),{},{alignSelf:"center",children:"0"}))]})),(0,N.jsxs)(c.k,(0,t.Z)((0,t.Z)({},on),{},{h:"3vw",as:"button",_hover:{bg:"#F6F6F6"},onClick:function(){return te("".concat(J.cn,"/dashboard/dashboard-saved"))},children:[(0,N.jsxs)(c.k,{w:"100%",children:[(0,N.jsx)(Z.E,{w:"1vw",h:"1vw",alignSelf:"center",mr:"5%",src:L.Z.edit_Icon}),(0,N.jsx)(j.x,(0,t.Z)((0,t.Z)({},en),{},{children:"Saved"}))]}),(0,N.jsx)(j.x,(0,t.Z)((0,t.Z)({},en),{},{alignSelf:"center",children:"0"}))]})),(0,N.jsx)(h.i,{w:"100%"}),(0,N.jsxs)(c.k,(0,t.Z)((0,t.Z)({},on),{},{_hover:{bg:"#F6F6F6"},as:"a",href:"https://www.supremenewyork.com",children:[(0,N.jsx)(f.q,{mr:"5px",name:"John Doe",src:"https://pbs.twimg.com/profile_images/846716933894537216/7VCYCh5V_400x400.jpg",size:"sm"}),(0,N.jsxs)(c.k,{flexDir:"column",pl:"5px",w:"75%",children:[(0,N.jsx)(j.x,(0,t.Z)((0,t.Z)({},en),{},{children:"Supreme"})),(0,N.jsx)(j.x,(0,t.Z)((0,t.Z)({as:"a",href:"https://www.supremenewyork.com"},nn),{},{noOfLines:1,textDecoration:"underline",w:"95%",children:"https://www.supremenewyork.com"}))]}),(0,N.jsx)(b.J,{as:z.Dli})]})),(0,N.jsx)(h.i,{w:"100%"}),(0,N.jsx)(c.k,(0,t.Z)((0,t.Z)({},on),{},{h:"3vw",as:"button",_hover:{bg:"#F6F6F6"},onClick:function(){return te("".concat(J.cn,"/dashboard/dashboard-my-assets"))},children:(0,N.jsxs)(c.k,{w:"100%",children:[(0,N.jsx)(Z.E,{w:"1vw",h:"1vw",alignSelf:"center",mr:"5%",src:L.Z.edit_Icon}),(0,N.jsx)(j.x,(0,t.Z)((0,t.Z)({},en),{},{children:"My assets"}))]})})),(0,N.jsx)(c.k,(0,t.Z)((0,t.Z)({},on),{},{h:"3vw",as:"button",_hover:{bg:"#F6F6F6"},children:(0,N.jsxs)(c.k,{w:"100%",children:[(0,N.jsx)(Z.E,{w:"1vw",h:"1vw",alignSelf:"center",mr:"5%",src:L.Z.edit_Icon}),(0,N.jsx)(j.x,(0,t.Z)((0,t.Z)({},en),{},{children:"My Offers"}))]})})),(0,N.jsx)(h.i,{w:"100%"}),(0,N.jsx)(c.k,(0,t.Z)((0,t.Z)({},on),{},{h:"3vw",as:"button",_hover:{bg:"#F6F6F6"},children:(0,N.jsxs)(c.k,{w:"100%",children:[(0,N.jsx)(Z.E,{w:"1vw",h:"1vw",alignSelf:"center",mr:"5%",src:L.Z.mobileapp_icon}),(0,N.jsx)(j.x,(0,t.Z)((0,t.Z)({},en),{},{children:"Install mobile app"}))]})})),(0,N.jsx)(h.i,{w:"100%"}),(0,N.jsx)(c.k,(0,t.Z)((0,t.Z)({},on),{},{h:"3vw",as:"button",_hover:{bg:"#F6F6F6"},onClick:function(){ce((0,O.ni)()),ce((0,H.Dz)()),ce((0,H.u6)())},children:(0,N.jsxs)(c.k,{w:"100%",children:[(0,N.jsx)(Z.E,{w:"1vw",h:"1vw",alignSelf:"center",mr:"5%",src:L.Z.logoutIcon}),(0,N.jsx)(j.x,(0,t.Z)((0,t.Z)({},en),{},{children:"Logout"}))]})}))]})]})]})):(0,N.jsx)(c.k,{flexDir:"row",w:"20%",justify:"flex-end",children:null===(K=["EN","FR","IT"])||void 0===K?void 0:K.map((function(e,n){return(0,N.jsx)(a.M,{as:w.z,w:"10%",h:"90%",color:n===Ye?"black":"white",borderWidth:.5,borderRadius:"100px",px:"7%",ml:"3%",_hover:{bg:n===Ye?"white":"dark"},bg:n===Ye?"white":"black",onClick:function(){He(n)},children:(0,N.jsx)(x.X,{fontSize:["14px","14px","14px","14px","14px"],children:e})},(0,E.x0)())}))})]})})}),(0,N.jsx)(l.xu,{w:"100%",bg:"light",children:(0,N.jsx)(T.default,{children:(0,N.jsx)(c.k,(0,t.Z)((0,t.Z)({bg:"light",h:"55px",borderBottomWidth:1,w:"100%",display:["none","none","flex","flex","flex"]},oe),{},{children:(0,N.jsxs)(v.U,{w:"100%",children:[(0,N.jsx)(c.k,(0,t.Z)((0,t.Z)({},Ke),{},{as:"button",onClick:function(){te("".concat(J.cn,le?"/dashboard":"/"))},children:(0,N.jsx)(Z.E,{src:L.Z.appLogo,objectFit:"cover"})})),(0,N.jsxs)(c.k,(0,t.Z)((0,t.Z)({},Ue),{},{as:"button",onClick:function(){se()},children:[(0,N.jsx)(b.J,{as:z.U41,color:"#000000"}),(0,N.jsx)(j.x,(0,t.Z)((0,t.Z)({noOfLines:1},Pe),{},{px:"3%",color:"#000000",children:"Search offers, brand or style..."}))]})),(0,N.jsx)(D.Z,{label:"Brands",children:null===_e||void 0===_e||null===(Q=_e.data)||void 0===Q||null===($=Q.brands)||void 0===$?void 0:$.map((function(e){return(0,_.createElement)(m.Y,(0,t.Z)((0,t.Z)({as:"button"},Pe),{},{key:(0,E.x0)(),onClick:function(){return te("".concat(J.cn,"/dashboard/shop/").concat(e.name),{state:(0,t.Z)({},e)})}}),(0,N.jsxs)(c.k,{children:[(0,N.jsx)(Z.E,{src:null===e||void 0===e?void 0:e.logo,w:"20px",h:"20px",mr:"15px",objectFit:"contain",borderRadius:"20px"}),(0,N.jsx)(j.x,{textAlign:"left",children:e.name})]}))}))}),(0,N.jsx)(D.Z,{label:"Categories",children:null===Se||void 0===Se||null===(G=Se.data)||void 0===G?void 0:G.categories.map((function(e){return(0,_.createElement)(m.Y,(0,t.Z)((0,t.Z)({},Pe),{},{key:(0,E.x0)(),onClick:function(){te("".concat(J.cn,"/dashboard/category/").concat(e.name),{state:(0,t.Z)({},e)})}}),e.name)}))}),(0,N.jsx)(D.Z,{label:"Special",children:[].map((function(e){return(0,_.createElement)(m.Y,(0,t.Z)((0,t.Z)({},Pe),{},{key:(0,E.x0)(),onClick:function(){te("".concat(J.cn,"/dashboard/category/").concat(e.name),{state:(0,t.Z)({},e)})}}),e.name)}))}),(0,N.jsx)(c.k,(0,t.Z)((0,t.Z)({},Ae),{},{children:(0,N.jsx)(j.x,(0,t.Z)((0,t.Z)({},Pe),{},{textTransform:"uppercase",fontWeight:"700",as:"button",children:"Latest"}))})),(0,N.jsx)(d.L,{}),le?(0,N.jsxs)(N.Fragment,{children:[(0,N.jsxs)(c.k,(0,t.Z)((0,t.Z)((0,t.Z)({as:"button"},Ge),Qe),{},{onClick:function(){return te("".concat(J.cn,"/notification"))},children:[(0,N.jsx)(Z.E,{src:W.Z,mr:"1",w:"25px",h:"25px"}),(null===ue||void 0===ue||null===(ee=ue.data)||void 0===ee?void 0:ee.total)-he>0&&(0,N.jsx)(l.Cd,(0,t.Z)((0,t.Z)({size:"21px"},rn),{},{justifyContent:"center",alignItems:"center",color:"light",className:"infinite-bounce",children:(0,N.jsx)(j.x,{fontSize:"14px",fontWeight:"600",children:(null===ue||void 0===ue||null===(ne=ue.data)||void 0===ne?void 0:ne.length)-he})}))]})),(0,N.jsxs)(c.k,(0,t.Z)((0,t.Z)((0,t.Z)({as:"button"},Ge),Qe),{},{onClick:function(){return te("".concat(J.cn,"/bag"))},children:[(0,N.jsx)(Z.E,{src:Y.Z,mr:"1",w:"25px",h:"25px"}),(null===pe||void 0===pe?void 0:pe.length)>0&&(0,N.jsx)(l.Cd,(0,t.Z)((0,t.Z)({size:"21px"},rn),{},{justifyContent:"center",alignItems:"center",color:"light",children:(0,N.jsx)(j.x,{fontSize:"14px",fontWeight:"600",children:null===pe||void 0===pe?void 0:pe.length})}))]}))]}):(0,N.jsxs)(c.k,{children:[(0,N.jsx)(a.M,{as:w.z,bg:"black",color:"white",px:"15px",py:"3px",_hover:{bg:"dark"},borderRadius:"100px",onClick:function(){return te("".concat(J.cn,"/register"))},children:(0,N.jsx)(j.x,{children:"Create an account"})}),(0,N.jsx)(d.L,{}),(0,N.jsx)(a.M,{as:w.z,bg:"white",color:"dark",borderWidth:1,borderColor:"black",ml:"15px",py:"3px",_hover:{bg:"white"},borderRadius:"100px",onClick:function(){return te("".concat(J.cn,"/login"))},children:(0,N.jsx)(j.x,{children:"Login"})})]})]})}))})}),(0,N.jsx)(l.xu,{display:ie?"block":"none",pos:"absolute",w:"100%",zIndex:1e3,bg:"white",minHeight:"100px",children:(0,N.jsx)(k.M,{in:ie,children:(0,N.jsx)(l.xu,{zIndex:1e3,boxShadow:"1px 1px 3px #00000035",minHeight:"auto",children:(0,N.jsxs)(T.default,{children:[(0,N.jsxs)(c.k,(0,t.Z)((0,t.Z)({},tn),{},{pt:5,minHeight:"auto",transition:"min-height 0.5s","transition-timing-function":"ease-in",_focus:{boxShadow:"none"},justifyContent:"space-between",children:[(0,N.jsx)(c.k,(0,t.Z)((0,t.Z)({},Ke),{},{as:"button",onClick:function(){te("".concat(J.cn,le?"/dashboard":"/"))},children:(0,N.jsx)(Z.E,{src:L.Z.appLogo,objectFit:"cover"})})),(0,N.jsx)(c.k,(0,t.Z)((0,t.Z)({},Ue),{},{w:"600px",_focus:{boxShadow:"none"},flexDir:"column",children:(0,N.jsxs)(C.B,{_focus:{boxShadow:"none"},as:"button",children:[(0,N.jsx)(F.Z,{pointerEvents:"none",children:(0,N.jsx)(b.J,{as:z.U41,color:"#999999"})}),(0,N.jsx)(S.I,(0,t.Z)((0,t.Z)({},Pe),{},{value:Ze,onChange:function(e){var n=e.target;we(n.value)},placeholder:"Search offers, brand or style...",borderRadius:"0",borderWidth:"0",onKeyDown:function(e){"Enter"===e.key&&(e.preventDefault(),se(),te("".concat(J.cn,"/searchResult"),{state:Ze}))}}))]})})),(0,N.jsx)(a.M,{as:"button",w:"50px",h:"50px",onClick:function(){we(""),se()},children:(0,N.jsx)(Z.E,{w:"40px",h:"40px",src:L.Z.cancel_icon})})]})),(0,N.jsxs)(c.k,{w:"600px",pos:"relative",left:["300px","300px","300px","300px","340px"],children:[Ie&&!Le?(0,N.jsx)(j.x,{children:"Something unexpected happened. Try again later"}):(0,N.jsx)(N.Fragment,{}),Re&&Re.data.result.length>0?(0,N.jsx)(B.Z,{results:Re.data.result,isLoading:Le,searchText:Ze,clearClick:function(){we("")},navigate:function(){}}):(0,N.jsx)(c.k,{alignItems:"center",children:Le?(0,N.jsx)(y.$,{mt:"8px",mb:"8px",size:"sm"}):""})]})]})})})})]}))};n.default=(0,_.memo)(P);var U=function(){return{root:{w:"100%",zIndex:10},container:{h:"36px",px:"1%",align:"center"},boxCircleColor:{bgColor:"#3478F6"},search:{w:"250px",h:"40px",background:"light",borderRadius:"53px",border:"1px solid rgba(0, 0, 0, 0.05)",justify:"flex-start",align:"center",pl:"1%"},font:{fontSize:["12px"]},popfont:{fontSize:"12px",lineHeight:"14px",color:"#999999"},shopperBox:{h:"95%",flexDir:"row",justify:"space-between",align:"center"},infoBox:{h:"95%",align:"center",justify:"space-between"},shopperBusiness:{px:"14px",h:"30px",borderRightRadius:"50px"},homeIcon:{width:"44px",height:"44px",justify:"center",align:"center",mr:"2%"},notification:{w:"70px",h:"35px",background:"light",borderRadius:"53px",border:"1px solid rgba(0, 0, 0, 0.05)"},helpText:{h:"25px",w:"55px",rounded:"70px",bg:"dark",color:"white",fontSize:["14px","14px","14px","14px","14px"]},iconsLogo:{justify:"center",align:"center"},popoverTexts:{fontSize:["14px","14px","14px","14px","14px"],alignSelf:"flex-start"},popoverLightTexts:{fontSize:["12px","12px","12px","12px","12px"],color:"#999999",alignSelf:"flex-start"},itemBox:{w:"100%",h:"3vw",bg:"white",justify:"space-between",align:"center",px:"5%"},searchRoot:{w:"100%",bg:"light"}}}}}]);
//# sourceMappingURL=2476.e7b7b97f.chunk.js.map