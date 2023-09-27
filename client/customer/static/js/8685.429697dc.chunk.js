"use strict";(self.webpackChunkapp_web_frontend=self.webpackChunkapp_web_frontend||[]).push([[8685,6442,5224],{75224:function(e,n,t){t.r(n);var r=t(1413),i=t(72791),o=t(9055),a=t(80184),s=function(e){var n=e.name,t=e.isLoading,i=e.onClick,s=e.isDisabled,u=e.rest,c=l().root;return(0,a.jsx)(a.Fragment,{children:(0,a.jsx)(o.z,(0,r.Z)((0,r.Z)((0,r.Z)({type:"submit",isDisabled:s,isLoading:t,onClick:i},c),u),{},{children:n}))})};n.default=(0,i.memo)(s);var l=function(){return{root:{colorScheme:"black",bg:"black",py:{base:5},width:"100%",h:"45px",borderRadius:"100px",loadingText:"Submitting",fontSize:{base:12,md:18}}}}},56442:function(e,n,t){t.r(n);var r=t(1413),i=t(72791),o=t(76582),a=t(81146),s=t(62825),l=t(57689),u=t(23823),c=t(95048),d=t(52780),f=t(80184),h=function(e){var n=e.pos,t=(0,l.s0)(),i=(0,c.v9)((function(e){return e.authReducer})).token,h=x(),p=h.styles,v=h.img;return(0,f.jsx)(u.default,{children:(0,f.jsx)(o.k,(0,r.Z)((0,r.Z)({as:"button",onClick:function(){t("".concat(d.cn,i?"/dashboard":"/"))},position:n||"absolute"},p),{},{children:(0,f.jsx)(a.E,(0,r.Z)({"data-testid":"logo-1",src:s.Z.appLogo},v))}))})};n.default=(0,i.memo)(h);var x=function(){return{styles:{w:"100%",h:"50px",justifyContent:"flex-start"},img:{mt:5,h:"50px"}}}},38685:function(e,n,t){t.r(n),t.d(n,{default:function(){return E}});var r=t(74165),i=t(1413),o=t(15861),a=t(29439),s=t(76582),l=t(81146),u=t(92746),c=t(39589),d=t(10884),f=t(86762),h=t(45695),x=t(93080),p=t(62825),v=t(75224),b=t(56442),m=t(72791),g=t(74417),Z=t(57689),j=t(74569),k=t.n(j),w=t(35486),y=t(95048),C=t(5064),S=t(95273),L=t(92387),z=t(52780),I=t(80184),E=function(){var e,n=(0,Z.s0)(),t=(0,y.I0)(),j=(0,Z.TH)().state,E=(0,g.yK)(),P=E.root,_=E.boxLeft,F=E.boxLogin,D=E.leftImg,A=E.loginColumn,R=E.head,V=E.desc,N=(0,m.useState)(!0),T=(0,a.Z)(N,2),q=(T[0],T[1],(0,m.useState)("")),$=(0,a.Z)(q,2),K=$[0],B=$[1],G=(0,m.useState)(!1),M=(0,a.Z)(G,2),W=M[0],Y=M[1],J=(0,m.useState)(""),H=(0,a.Z)(J,2),X=H[0],Q=H[1];function U(){return(U=(0,o.Z)((0,r.Z)().mark((function e(){var i,o,a,s,l,u,c,d,f,h,x,p,v;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(K.length<5)){e.next=2;break}return e.abrupt("return");case 2:return Y(!0),e.prev=3,e.next=6,k().post("".concat(w._n,"/users/phone/verify"),{userId:null===j||void 0===j||null===(i=j.state)||void 0===i||null===(o=i.user)||void 0===o?void 0:o.userId,phone:null===j||void 0===j?void 0:j.value,phoneCode:K});case 6:if(s=e.sent,null===(l=s.data)||void 0===l||null===(a=l.isVerified)||void 0===a||!a.token){e.next=18;break}if(!l){e.next=18;break}return t((0,C.Tq)(null===l||void 0===l?void 0:l.isVerified)),t((0,L.JJ)({token:null===l||void 0===l||null===(u=l.isVerified)||void 0===u?void 0:u.token})),f={method:"get",url:"".concat(w._n,"/pointregistry"),headers:{"x-access-token":"".concat(null===l||void 0===l||null===(c=l.isVerified)||void 0===c?void 0:c.token)}},e.next=15,k()(f);case 15:h=e.sent,(null===(x=h.data)||void 0===x||null===(d=x.userPoints)||void 0===d?void 0:d.length)<1?n("".concat(z.cn,"/syncRewards")):n("".concat(z.cn,"/dashboard"));case 18:e.next=23;break;case 20:e.prev=20,e.t0=e.catch(3),Q(null===e.t0||void 0===e.t0||null===(p=e.t0.response)||void 0===p||null===(v=p.data)||void 0===v?void 0:v.error);case 23:return e.prev=23,Y(!1),B(""),e.finish(23);case 27:case"end":return e.stop()}}),e,null,[[3,20,23,27]])})))).apply(this,arguments)}return(0,m.useEffect)((function(){}),[]),(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(b.default,{}),(0,I.jsxs)(s.k,(0,i.Z)((0,i.Z)({},P),{},{children:[(0,I.jsx)(s.k,(0,i.Z)((0,i.Z)({},_),{},{children:(0,I.jsx)(l.E,(0,i.Z)({src:p.Z.AuthImage,alt:"Me Protocol"},D))})),(0,I.jsx)(s.k,(0,i.Z)((0,i.Z)({},F),{},{children:(0,I.jsxs)(u.K,(0,i.Z)((0,i.Z)({},A),{},{w:{base:"70vw",md:"40vw"},children:[(0,I.jsx)(c.X,(0,i.Z)((0,i.Z)({},R),{},{pb:2,children:"We sent you a verification code"})),(0,I.jsx)(d.x,(0,i.Z)((0,i.Z)({},V),{},{children:"You have to give it back, though."})),(0,I.jsx)(f.U,{w:"100%",h:"60px",children:(0,I.jsx)(h.E,{onComplete:function(e){B(e),Q("")},otp:!0,placeholder:"*",children:null===(e=[1,2,3,4,5,6])||void 0===e?void 0:e.map((function(){return(0,I.jsx)(h.x,{bg:"grey",borderRadius:10,borderWidth:0,w:"14%",h:"100%"},(0,S.x0)())}))})}),X&&(0,I.jsx)(d.x,(0,i.Z)((0,i.Z)({},V),{},{color:"red",children:X})),(0,I.jsx)(s.k,{w:"35vMax",children:(0,I.jsx)(v.default,{isLoading:W,onClick:function(){return U.apply(this,arguments)},isDisabled:K.length<5,name:"That's the code"})}),(0,I.jsxs)(d.x,(0,i.Z)((0,i.Z)({},V),{},{pt:"10px",children:["Didn\u2019t receive the code?"," ",(0,I.jsxs)(x.r,{href:"#",textDecoration:"underline",children:[" ","Send it again."]})]}))]}))}))]}))]})}},74417:function(e,n,t){t.d(n,{yK:function(){return I}});var r=t(1413),i=t(74165),o=t(15861),a=t(29439),s=t(62577),l=t(76582),u=t(31917),c=t(39589),d=t(88675),f=t(10884),h=t(93080),x=t(72791),p=t(57689),v=t(55705),b=t(52780),m=t(95048),g=t(5064),Z=t(24263),j=t(35486),k=t(23823),w=t(92387),y=t(80184),C=(0,x.lazy)((function(){return t.e(6442).then(t.bind(t,56442))})),S=(0,x.lazy)((function(){return Promise.resolve().then(t.bind(t,6691))})),L=(0,x.lazy)((function(){return t.e(5224).then(t.bind(t,75224))})),z=(0,x.lazy)((function(){return t.e(4458).then(t.bind(t,4458))}));n.ZP=function(){(0,p.TH)();var e=(0,p.s0)(),n=(0,Z.s)(),t=(0,m.I0)(),E=(0,x.useState)(!1),P=(0,a.Z)(E,2),_=P[0],F=(P[1],(0,m.v9)((function(e){return e.authReducer}))),D=F.isLoading,A=(F.error,F.token),R=((0,m.v9)((function(e){return e.userReducer})).user_data,(0,x.useState)(" ")),V=(0,a.Z)(R,2),N=V[0],T=V[1],q=I(),$=q.root,K=(q.boxLeft,q.boxLogin),B=(q.leftImg,q.loginColumn),G=q.head,M=q.desc;(0,x.useEffect)((function(){t((0,g.bY)()),A&&(t((0,g.bY)()),e("".concat(b.cn,"/dashboard")))}),[t,A,e]);var W=function(){var r=(0,o.Z)((0,i.Z)().mark((function r(o,a){var s,l,u,c,d,f,h,x;return(0,i.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(s=o.email,l=o.password,n){r.next=3;break}return r.abrupt("return");case 3:return r.next=5,t((0,g.FR)({identifier:s,password:l}));case 5:if(u=r.sent,c=u.payload,!(d=u.error)){r.next=10;break}return r.abrupt("return",T(null===d||void 0===d?void 0:d.message));case 10:if(!c){r.next=16;break}return r.next=13,t((0,w.bG)({token:c}));case 13:h=r.sent,null!==(x=h.payload)&&void 0!==x&&null!==(f=x.customer)&&void 0!==f&&f.walletAddress?e("".concat(b.cn,"/dashboard")):e("".concat(b.cn,"/syncRewards"));case 16:case"end":return r.stop()}}),r)})));return function(e,n){return r.apply(this,arguments)}}();return(0,y.jsx)(y.Fragment,{children:(0,y.jsxs)(k.default,{children:[(0,y.jsx)(x.Suspense,{fallback:(0,y.jsx)(s.$,{size:"sm"}),children:(0,y.jsx)(C,{pos:"fixed"})}),(0,y.jsx)(l.k,(0,r.Z)((0,r.Z)({},$),{},{children:(0,y.jsx)(l.k,(0,r.Z)((0,r.Z)({},K),{},{children:(0,y.jsx)(v.J9,{initialValues:{email:"",password:""},validationSchema:b.gs,onSubmit:W,children:function(n){return(0,y.jsxs)(u.g,(0,r.Z)((0,r.Z)({as:"form"},B),{},{onSubmit:n.handleSubmit,onChange:function(){return t((0,g.bY)())},children:[(0,y.jsx)(c.X,(0,r.Z)((0,r.Z)({},G),{},{pb:2,children:"Let\u2019s Login"})),(0,y.jsx)(l.k,{w:"100%",justify:"space-between",children:(0,y.jsx)(x.Suspense,{fallback:(0,y.jsx)(s.$,{size:"sm"}),children:(0,y.jsx)(S,{isLoading:_,name:"Sign in with Google",onClick:function(){window.location.replace("".concat(j._n,"/user/google"))},rest:{w:"100%"}})})}),(0,y.jsxs)(l.k,{align:"center",w:"100%",justify:"space-between",children:[(0,y.jsx)(d.i,{w:"45%",color:"#ECECEC"}),(0,y.jsx)(f.x,{color:"#999999",fontSize:{base:"12px",md:"20px"},children:"or"}),(0,y.jsx)(d.i,{w:"45%",color:"#ECECEC"})]}),(0,y.jsxs)(x.Suspense,{fallback:(0,y.jsx)(s.$,{size:"sm"}),children:[(0,y.jsx)(z,{name:"email",type:"email",placeholder:"your@email.com"}),(0,y.jsx)(z,{name:"password",type:"password",placeholder:"Password"})]}),N&&(0,y.jsx)(f.x,(0,r.Z)((0,r.Z)({},M),{},{color:"red",children:N})),(0,y.jsx)(h.r,(0,r.Z)((0,r.Z)({onClick:function(){return e("".concat(b.cn,"/password_reset"))}},M),{},{py:3,textDecoration:"underline",w:"30%",children:"Forgot Password"})),(0,y.jsx)(x.Suspense,{fallback:(0,y.jsx)(s.$,{size:"sm"}),children:(0,y.jsx)(L,{isLoading:D,name:"Login"})}),(0,y.jsxs)(f.x,(0,r.Z)((0,r.Z)({},M),{},{pt:"10px",children:["Don\u2019t have an account yet?",(0,y.jsxs)(h.r,{onClick:function(){e("".concat(b.cn,"/register"))},textDecoration:"underline",children:[" ","Create one here."]})]}))]}))}})}))}))]})})};var I=function(){return{root:{h:"100vh",align:"center",justify:"center",bg:"light"},boxLeft:{display:["none","none","none","flex","flex"],bg:"light",fontSize:40,h:"100%",w:"40vw"},boxLogin:{fontSize:40,h:"100%",w:["100%","100%","80%","50%","50%"],overflow:"hidden"},boxRegister:{fontSize:40,h:"100vh",w:["100%","100%","80%","80%","70%"],justify:"center"},leftImg:{h:"100%",w:"100%"},loginColumn:{bg:"light",w:"100%",align:"flex-start",pt:{base:"5vh",md:"10vh"},px:{base:"15px"},justifySelf:"center"},registerColumn:{bg:"light",w:["100%","100%","100%","80%","70%"],align:"flex-start",pt:{base:"5vh",md:"10vh"},px:{base:"15px"},justifySelf:"center"},head:{fontSize:{base:"18px",md:"25px"},pt:"20px"},desc:{pb:"5px",fontSize:{base:"15px",md:"17px"},w:{base:"100%",md:"85%"}},basedText:{pt:"30px",fontSize:{base:"18px",md:"20px"}},checkBoxRoot:{py:"20px"},countrySelect:{w:{base:"100%",md:"100%"},bg:"grey",color:"dark",borderColor:"light",borderWidth:"1px",align:"center"}}}},93080:function(e,n,t){t.d(n,{r:function(){return f}});var r=t(1413),i=t(45987),o=t(75597),a=t(32481),s=t(62996),l=t(45113),u=t(36992),c=t(80184),d=["className","isExternal"],f=(0,o.G)((function(e,n){var t=(0,a.mq)("Link",e),o=(0,s.Lr)(e),f=o.className,h=o.isExternal,x=(0,i.Z)(o,d);return(0,c.jsx)(l.m.a,(0,r.Z)((0,r.Z)({target:h?"_blank":void 0,rel:h?"noopener":void 0,ref:n,className:(0,u.cx)("chakra-link",f)},x),{},{__css:t}))}));f.displayName="Link"},45695:function(e,n,t){t.d(n,{E:function(){return F},x:function(){return D}});var r=t(1413),i=t(45987),o=t(93433),a=t(29439),s=t(41102),l=t(9121),u=t(36992),c=t(9886),d=t(14591),f=t(72791),h=["index"],x=(0,s.n)(),p=(0,a.Z)(x,4),v=p[0],b=(p[1],p[2]),m=p[3],g=(0,c.k)({name:"PinInputContext",errorMessage:"usePinInputContext: `context` is undefined. Seems you forgot to all pin input fields within `<PinInput />`"}),Z=(0,a.Z)(g,2),j=Z[0],k=Z[1],w=function(e){return null==e?void 0:e.split("")};function y(e,n){return("alphanumeric"===n?/^[a-zA-Z0-9]+$/i:/^[0-9]+$/).test(e)}var C=t(32481),S=t(62996),L=t(75597),z=t(45113),I=t(7200),E=t(80184),P=["children"],_=["descendants"];function F(e){var n=(0,C.mq)("PinInput",e),t=(0,S.Lr)(e),s=t.children,c=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.autoFocus,t=e.value,s=e.defaultValue,c=e.onChange,d=e.onComplete,x=e.placeholder,p=void 0===x?"\u25cb":x,v=e.manageFocus,m=void 0===v||v,g=e.otp,Z=void 0!==g&&g,j=e.id,k=e.isDisabled,C=e.isInvalid,S=e.type,L=void 0===S?"number":S,z=e.mask,I=(0,f.useId)(),E=null!=j?j:"pin-input-".concat(I),P=b(),_=(0,f.useState)(!0),F=(0,a.Z)(_,2),D=F[0],A=F[1],R=(0,f.useState)(-1),V=(0,a.Z)(R,2),N=V[0],T=V[1],q=(0,l.T)({defaultValue:w(s)||[],value:w(t),onChange:function(e){return null==c?void 0:c(e.join(""))}}),$=(0,a.Z)(q,2),K=$[0],B=$[1];(0,f.useEffect)((function(){if(n){var e=P.first();e&&requestAnimationFrame((function(){e.node.focus()}))}}),[P]);var G=(0,f.useCallback)((function(e){if(D&&m){var n=P.next(e,!1);n&&requestAnimationFrame((function(){n.node.focus()}))}}),[P,D,m]),M=(0,f.useCallback)((function(e,n){var t=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=(0,o.Z)(K);r[n]=e,B(r),""!==e&&r.length===P.count()&&r.every((function(e){return null!=e&&""!==e}))?null==d||d(r.join("")):t&&G(n)}),[K,B,G,d,P]),W=(0,f.useCallback)((function(){var e,n=Array(P.count()).fill("");B(n);var t=P.first();null==(e=null==t?void 0:t.node)||e.focus()}),[P,B]),Y=(0,f.useCallback)((function(e,n){var t=n;return(null==e?void 0:e.length)>0&&(e[0]===n.charAt(0)?t=n.charAt(1):e[0]===n.charAt(1)&&(t=n.charAt(0))),t}),[]);return{getInputProps:(0,f.useCallback)((function(e){var n=e.index,t=(0,i.Z)(e,h),o=N===n,a="number"===L?"tel":"text";return(0,r.Z)((0,r.Z)({"aria-label":"Please enter your pin code",inputMode:"number"===L?"numeric":"text",type:z?"password":a},t),{},{id:"".concat(E,"-").concat(n),disabled:k,"aria-invalid":(0,u.Qm)(C),onChange:(0,u.v0)(t.onChange,(function(e){var t=e.target.value,r=K[n],i=Y(r,t);if(""!==i)if(t.length>2){if(y(t,L)){var o=t.split("").filter((function(e,n){return n<P.count()}));B(o),o.length===P.count()&&(null==d||d(o.join("")))}}else y(i,L)&&M(i,n),A(!0);else M("",n)})),onKeyDown:(0,u.v0)(t.onKeyDown,(function(e){var t;if("Backspace"===e.key&&m)if(""===e.target.value){var r=P.prev(n,!1);r&&(M("",n-1,!1),null==(t=r.node)||t.focus(),A(!0))}else A(!1)})),onFocus:(0,u.v0)(t.onFocus,(function(){T(n)})),onBlur:(0,u.v0)(t.onBlur,(function(){T(-1)})),value:K[n]||"",autoComplete:Z?"one-time-code":"off",placeholder:o?"":p})}),[P,N,Y,E,k,z,C,m,d,Z,p,M,B,L,K]),id:E,descendants:P,values:K,setValue:M,setValues:B,clear:W}}((0,i.Z)(t,P)),d=c.descendants,x=(0,i.Z)(c,_),p=(0,I.W)(s).map((function(e){return(0,f.cloneElement)(e,{__css:n})}));return(0,E.jsx)(v,{value:d,children:(0,E.jsx)(j,{value:x,children:p})})}F.displayName="PinInput";var D=(0,L.G)((function(e,n){var t=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,t=k().getInputProps,i=m(),o=i.index,a=i.register;return t((0,r.Z)((0,r.Z)({},e),{},{ref:(0,d.lq)(a,n),index:o}))}(e,n);return(0,E.jsx)(z.m.input,(0,r.Z)((0,r.Z)({},t),{},{className:(0,u.cx)("chakra-pin-input",e.className)}))}));D.displayName="PinInputField"}}]);
//# sourceMappingURL=8685.429697dc.chunk.js.map