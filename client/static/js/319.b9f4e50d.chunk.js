/*! For license information please see 319.b9f4e50d.chunk.js.LICENSE.txt */
(self.webpackChunkapp_web_frontend=self.webpackChunkapp_web_frontend||[]).push([[319],{50319:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return N}});var r=n(74165),o=n(1413),a=n(15861),i=n(29439),l=n(28382),s=n(51022),u=n(92746),c=n(76582),f=n(81146),d=n(71118),p=n(10884),h=n(66484),v=n(9055),x=n(88675),y=n(70548),b=n(45987),m=n(37762),g=n(84931),k=n(75597),j=n(32481),w=n(62996),S=n(45113),C=n(36992),_=n(80184),Z=["className","rows"];var O=["h","minH","height","minHeight"],P=(0,k.G)((function(e,t){var n=(0,j.mq)("Textarea",e),r=(0,w.Lr)(e),a=r.className,i=r.rows,l=(0,b.Z)(r,Z),s=(0,g.Y)(l),u=i?function(e){var t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],r=Object.assign({},e),o=(0,m.Z)(n);try{for(o.s();!(t=o.n()).done;){var a=t.value;a in r&&delete r[a]}}catch(i){o.e(i)}finally{o.f()}return r}(n,O):n;return(0,_.jsx)(S.m.textarea,(0,o.Z)((0,o.Z)({ref:t,rows:i},s),{},{className:(0,C.cx)("chakra-textarea",a),__css:u}))}));P.displayName="Textarea";var T=n(72791),I=n(35378),R=n(40587),E=n(11848),A=n(72426),D=n.n(A),H=n(57689),M=n(52780),L=n(43299),N=function(e){var t=e.name,n=(e.price,e.token),b=(e.quantity,e.date,e.expired),m=e.image,g=e.rest,k=F(),j=k.root,w=k.bodyText,S=k.headText,C=(0,H.s0)(),Z=(0,l.p)(),O=(0,s.q)(),A=O.isOpen,N=O.onOpen,q=O.onClose,Y=(0,I.MS)(),z=(0,i.Z)(Y,1)[0],W=(0,T.useState)(null),V=(0,i.Z)(W,2),B=V[0],U=V[1],G=(0,T.useState)(!1),K=(0,i.Z)(G,2),J=K[0],Q=K[1],X=(0,T.useState)(""),$=(0,i.Z)(X,2),ee=$[0],te=$[1],ne=(0,T.useState)(""),re=(0,i.Z)(ne,2),oe=re[0],ae=re[1],ie=(0,I.ve)({offerId:null===g||void 0===g?void 0:g.offerId},{refetchOnMountOrArgChange:!0,skip:!n}),le=(ie.data,ie.refetch);function se(){return(se=(0,a.Z)((0,r.Z)().mark((function e(){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(oe){e.next=3;break}return(0,R.Z)(Z,"Please input all fields",2e3),e.abrupt("return");case 3:if(!(ee.split(" ").length<5)){e.next=6;break}return(0,R.Z)(Z,"At least five characters required",2e3),e.abrupt("return");case 6:if(B){e.next=9;break}return(0,R.Z)(Z,"Please select a rating",2e3),e.abrupt("return");case 9:return Q(!0),e.next=12,z({title:oe,review:ee,offer_id:Number(null===g||void 0===g?void 0:g.offerId),rating:B}).then((function(e){var t;200===(null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.status)&&(le(),(0,R.Z)(Z,"Review submitted",5e3,"bottom-right"),q(),U(null),te(""),ae(""))})).catch((function(e){console.log(e,"AddReviewToOfferErr")})).finally((function(){Q(!1)}));case 12:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return(0,_.jsxs)(u.K,{children:[(0,_.jsxs)(c.k,(0,o.Z)((0,o.Z)({},j),{},{flexDir:"row",align:"center",children:[(0,_.jsxs)(c.k,{w:"30%",h:"70%",flexDir:"row",align:"center",justify:"space-between",children:[(0,_.jsx)(c.k,{w:"100px",h:"100px",flexDir:"column",children:(0,_.jsx)(f.E,{objectFit:"cover",src:m})}),(0,_.jsx)(d.L,{}),(0,_.jsxs)(c.k,{flexDir:"column",w:"70%",h:"100px",children:[(0,_.jsx)(p.x,(0,o.Z)((0,o.Z)({},S),{},{noOfLines:1,children:t})),(0,_.jsx)(d.L,{}),(0,_.jsx)(p.x,(0,o.Z)((0,o.Z)({},w),{},{children:n})),(0,_.jsxs)(p.x,(0,o.Z)((0,o.Z)({},w),{},{children:["Purchased: ",D()(null===g||void 0===g?void 0:g.updatedAt).fromNow()]}))]})]}),b&&(0,_.jsxs)(c.k,{w:"30%",h:"70%",flexDir:"column",align:"flex-end",children:[(0,_.jsx)(p.x,(0,o.Z)((0,o.Z)({},w),{},{color:"dark",children:"Expires"})),(0,_.jsx)(p.x,(0,o.Z)((0,o.Z)({},w),{},{children:D()(null===g||void 0===g?void 0:g.updatedAt).format("DD MMM YYYY")}))]}),(0,_.jsxs)(c.k,{w:"30%",h:"70%",align:"flex-end",flexDir:"column",children:[(0,_.jsx)(h.M,(0,o.Z)((0,o.Z)({},w),{},{as:v.z,_hover:{bg:"dark"},color:"light",w:"35%",h:"30%",isDisabled:!(null!==g&&void 0!==g&&g.coupon),bg:"dark",onClick:function(){C("".concat(M.cn,"/dashboard_my_deals_details"),{state:(0,o.Z)({},g)})},children:"View details"})),(0,_.jsx)(p.x,(0,o.Z)((0,o.Z)({as:"button"},w),{},{opacity:null!==g&&void 0!==g&&g.couponId?1:.4,onClick:function(){g.couponId&&N()},children:b?"View voucher":"Leave Review"})),(0,_.jsx)(p.x,(0,o.Z)((0,o.Z)({as:null!==g&&void 0!==g&&g.isRedeemed?"text":"button"},w),{},{children:null!==g&&void 0!==g&&g.isRedeemed?"Redeemed":"Status: ".concat(g.status)})),(0,_.jsx)(p.x,(0,o.Z)((0,o.Z)({as:"button"},w),{},{children:"Buy it again"}))]})]})),(0,_.jsx)(x.i,{}),(0,_.jsxs)(E.default,{isOpen:A,onClose:q,closeOnOverlayClick:!0,children:[(0,_.jsx)(p.x,{mb:"24px",children:"Leave review"}),(0,_.jsx)(x.i,{}),(0,_.jsxs)(c.k,{mt:"16px",mb:"16px",flexDir:"column",justify:"center",alignItems:"center",children:[(0,_.jsx)(p.x,{children:"My overall rating"}),(0,_.jsx)(c.k,{children:(0,_.jsx)(L,{name:"rate2",starColor:"#000000",emptyStarColor:"#999999",starCount:5,value:B,onStarClick:function(e){U(e)}})})]}),(0,_.jsx)(x.i,{}),(0,_.jsxs)(c.k,{mt:"20px",flexDir:"column",children:[(0,_.jsx)(c.k,{w:"100%",children:(0,_.jsx)(y.I,{variant:"outline",borderRadius:"0px",value:oe,onChange:function(e){var t=e.target;return ae(t.value)},h:"46px",placeholder:"Review headline or summary",_placeholder:{opacity:1,color:"#AFAFAF"}})}),(0,_.jsx)(c.k,{mt:"16px",w:"100%",flexDir:"column",children:(0,_.jsx)(P,{variant:"outline",borderRadius:"0px",value:ee,onChange:function(e){var t=e.target;return te(t.value)},placeholder:"Write your review here. It must be at least 5 characters long.",_placeholder:{opacity:1,color:"#AFAFAF"},size:"sm"})})]}),(0,_.jsx)(c.k,{align:"center",mt:"24px",children:(0,_.jsx)(v.z,{isLoading:J,w:"100%",h:"48px",bg:"black",_hover:{bg:"dark"},onClick:function(){return function(){return se.apply(this,arguments)}()},children:(0,_.jsx)(p.x,{color:"white",children:"Submit"})})}),(0,_.jsx)(c.k,{align:"center",mt:"10px",children:(0,_.jsx)(h.M,{as:"button",w:"100%",h:"48px",border:"1px solid black",onClick:function(){U(null),te(""),ae(""),q()},children:(0,_.jsx)(p.x,{color:"black",children:"Cancel"})})})]})]})},F=function(){return{root:{w:"100%",h:"150px",justify:"space-between"},headText:{fontSize:"16px"},bodyText:{fontSize:"12px",color:"#999999"}}}},81694:function(e,t){var n;!function(){"use strict";var r={}.hasOwnProperty;function o(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var a=typeof n;if("string"===a||"number"===a)e.push(n);else if(Array.isArray(n)){if(n.length){var i=o.apply(null,n);i&&e.push(i)}}else if("object"===a){if(n.toString!==Object.prototype.toString&&!n.toString.toString().includes("[native code]")){e.push(n.toString());continue}for(var l in n)r.call(n,l)&&n[l]&&e.push(l)}}}return e.join(" ")}e.exports?(o.default=o,e.exports=o):void 0===(n=function(){return o}.apply(t,[]))||(e.exports=n)}()},80888:function(e,t,n){"use strict";var r=n(79047);function o(){}function a(){}a.resetWarningCache=o,e.exports=function(){function e(e,t,n,o,a,i){if(i!==r){var l=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw l.name="Invariant Violation",l}}function t(){return e}e.isRequired=e;var n={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:a,resetWarningCache:o};return n.PropTypes=n,n}},52007:function(e,t,n){e.exports=n(80888)()},79047:function(e){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},43299:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(72791),a=s(o),i=s(n(52007)),l=s(n(81694));function s(e){return e&&e.__esModule?e:{default:e}}var u=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return n.state={value:e.value},n}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),r(t,[{key:"componentWillReceiveProps",value:function(e){var t=e.value;null!=t&&t!==this.state.value&&this.setState({value:t})}},{key:"onChange",value:function(e){var t=this.props,n=t.editing,r=t.value;n&&null==r&&this.setState({value:e})}},{key:"onStarClick",value:function(e,t,n,r){r.stopPropagation();var o=this.props,a=o.onStarClick;o.editing&&a&&a(e,t,n,r)}},{key:"onStarHover",value:function(e,t,n,r){r.stopPropagation();var o=this.props,a=o.onStarHover;o.editing&&a&&a(e,t,n,r)}},{key:"onStarHoverOut",value:function(e,t,n,r){r.stopPropagation();var o=this.props,a=o.onStarHoverOut;o.editing&&a&&a(e,t,n,r)}},{key:"renderStars",value:function(){for(var e=this,t=this.props,n=t.name,r=t.starCount,o=t.starColor,i=t.emptyStarColor,l=t.editing,s=this.state.value,u=function(e,t){return{float:"right",cursor:l?"pointer":"default",color:t>=e?o:i}},c={display:"none",position:"absolute",marginLeft:-9999},f=[],d=function(t){var r=n+"_"+t,o=a.default.createElement("input",{key:"input_"+r,style:c,className:"dv-star-rating-input",type:"radio",name:n,id:r,value:t,checked:s===t,onChange:e.onChange.bind(e,t,n)}),i=a.default.createElement("label",{key:"label_"+r,style:u(t,s),className:"dv-star-rating-star "+(s>=t?"dv-star-rating-full-star":"dv-star-rating-empty-star"),htmlFor:r,onClick:function(r){return e.onStarClick(t,s,n,r)},onMouseOver:function(r){return e.onStarHover(t,s,n,r)},onMouseLeave:function(r){return e.onStarHoverOut(t,s,n,r)}},e.renderIcon(t,s,n,r));f.push(o),f.push(i)},p=r;p>0;p--)d(p);return f.length?f:null}},{key:"renderIcon",value:function(e,t,n,r){var o=this.props,i=o.renderStarIcon,l=o.renderStarIconHalf;return"function"===typeof l&&Math.ceil(t)===e&&t%1!==0?l(e,t,n,r):"function"===typeof i?i(e,t,n,r):a.default.createElement("i",{key:"icon_"+r,style:{fontStyle:"normal"}},"\u2605")}},{key:"render",value:function(){var e=this.props,t=e.editing,n=e.className,r=(0,l.default)("dv-star-rating",{"dv-star-rating-non-editable":!t},n);return a.default.createElement("div",{style:{display:"inline-block",position:"relative"},className:r},this.renderStars())}}]),t}(o.Component);u.propTypes={name:i.default.string.isRequired,value:i.default.number,editing:i.default.bool,starCount:i.default.number,starColor:i.default.string,onStarClick:i.default.func,onStarHover:i.default.func,onStarHoverOut:i.default.func,renderStarIcon:i.default.func,renderStarIconHalf:i.default.func},u.defaultProps={starCount:5,editing:!0,starColor:"#ffb400",emptyStarColor:"#333"},t.default=u,e.exports=t.default}}]);
//# sourceMappingURL=319.b9f4e50d.chunk.js.map