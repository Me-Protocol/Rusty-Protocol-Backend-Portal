import{cd as xe,ce as fe,cf as be,r as s,cg as q,bs as me,br as I,ch as H,bx as D,ci as ge,bw as he,bt as we,bu as ve,cj as Pe,ck as ye,j as o,cl as je,cm as Ce,F as M,ah as V,v as ke,C as oe,T as R,I as re,f as Ee,i as Te,cn as De}from"./index-4d742258.js";function Oe(e){const n=e.ownerDocument.defaultView||window,{overflow:r,overflowX:i,overflowY:p}=n.getComputedStyle(e);return/auto|scroll|overlay|hidden/.test(r+p+i)}function Se(e){return e.localName==="html"?e:e.assignedSlot||e.parentElement||e.ownerDocument.documentElement}function ne(e){return["html","body","#document"].includes(e.localName)?e.ownerDocument.body:xe(e)&&Oe(e)?e:ne(Se(e))}var Ie={exit:{scale:.85,opacity:0,transition:{opacity:{duration:.15,easings:"easeInOut"},scale:{duration:.2,easings:"easeInOut"}}},enter:{scale:1,opacity:1,transition:{opacity:{easings:"easeOut",duration:.2},scale:{duration:.2,ease:[.175,.885,.4,1.1]}}}},J=e=>{var n;return((n=e.current)==null?void 0:n.ownerDocument)||document},$=e=>{var n,r;return((r=(n=e.current)==null?void 0:n.ownerDocument)==null?void 0:r.defaultView)||window};function Re(e={}){const{openDelay:n=0,closeDelay:r=0,closeOnClick:i=!0,closeOnMouseDown:p,closeOnScroll:_,closeOnPointerDown:g=p,closeOnEsc:x=!0,onOpen:w,onClose:c,placement:l,id:v,isOpen:P,defaultIsOpen:y,arrowSize:d=10,arrowShadowColor:F,arrowPadding:K,modifiers:X,isDisabled:j,gutter:O,offset:h,direction:Y,...C}=e,{isOpen:a,onOpen:k,onClose:E}=fe({isOpen:P,defaultIsOpen:y,onOpen:w,onClose:c}),{referenceRef:A,getPopperProps:f,getArrowInnerProps:se,getArrowProps:ae}=be({enabled:a,placement:l,arrowPadding:K,modifiers:X,gutter:O,offset:h,direction:Y}),ie=s.useId(),N=`tooltip-${v??ie}`,b=s.useRef(null),S=s.useRef(),T=s.useCallback(()=>{S.current&&(clearTimeout(S.current),S.current=void 0)},[]),z=s.useRef(),L=s.useCallback(()=>{z.current&&(clearTimeout(z.current),z.current=void 0)},[]),B=s.useCallback(()=>{L(),E()},[E,L]),Q=_e(b,B),W=s.useCallback(()=>{if(!j&&!S.current){a&&Q();const t=$(b);S.current=t.setTimeout(k,n)}},[Q,j,a,k,n]),u=s.useCallback(()=>{T();const t=$(b);z.current=t.setTimeout(B,r)},[r,B,T]),U=s.useCallback(()=>{a&&i&&u()},[i,u,a]),Z=s.useCallback(()=>{a&&g&&u()},[g,u,a]),le=s.useCallback(t=>{a&&t.key==="Escape"&&u()},[a,u]);q(()=>J(b),"keydown",x?le:void 0),q(()=>{const t=b.current;if(!t)return null;const m=ne(t);return m.localName==="body"?$(b):m},"scroll",()=>{a&&_&&B()},{passive:!0,capture:!0}),s.useEffect(()=>{j&&(T(),a&&E())},[j,a,E,T]),s.useEffect(()=>()=>{T(),L()},[T,L]),q(()=>b.current,"pointerleave",u);const ce=s.useCallback((t={},m=null)=>({...t,ref:me(b,m,A),onPointerEnter:I(t.onPointerEnter,de=>{de.pointerType!=="touch"&&W()}),onClick:I(t.onClick,U),onPointerDown:I(t.onPointerDown,Z),onFocus:I(t.onFocus,W),onBlur:I(t.onBlur,u),"aria-describedby":a?N:void 0}),[W,u,Z,a,N,U,A]),pe=s.useCallback((t={},m=null)=>f({...t,style:{...t.style,[H.arrowSize.var]:d?`${d}px`:void 0,[H.arrowShadowColor.var]:F}},m),[f,d,F]),ue=s.useCallback((t={},m=null)=>{const ee={...t.style,position:"relative",transformOrigin:H.transformOrigin.varRef};return{ref:m,...C,...t,id:N,role:"tooltip",style:ee}},[C,N]);return{isOpen:a,show:W,hide:u,getTriggerProps:ce,getTooltipProps:ue,getTooltipPositionerProps:pe,getArrowProps:ae,getArrowInnerProps:se}}var G="chakra-ui:close-tooltip";function _e(e,n){return s.useEffect(()=>{const r=J(e);return r.addEventListener(G,n),()=>r.removeEventListener(G,n)},[n,e]),()=>{const r=J(e),i=$(e);r.dispatchEvent(new i.CustomEvent(G))}}function Fe(e,n=[]){const r=Object.assign({},e);for(const i of n)i in r&&delete r[i];return r}function Ae(e,n){const r={};for(const i of n)i in e&&(r[i]=e[i]);return r}var Ne=D(ge.div),te=he((e,n)=>{var r,i;const p=we("Tooltip",e),_=ve(e),g=Pe(),{children:x,label:w,shouldWrapChildren:c,"aria-label":l,hasArrow:v,bg:P,portalProps:y,background:d,backgroundColor:F,bgColor:K,motionProps:X,...j}=_,O=(i=(r=d??F)!=null?r:P)!=null?i:K;if(O){p.bg=O;const f=ye(g,"colors",O);p[H.arrowBg.var]=f}const h=Re({...j,direction:g.direction}),Y=typeof x=="string"||c;let C;if(Y)C=o.jsx(D.span,{display:"inline-block",tabIndex:0,...h.getTriggerProps(),children:x});else{const f=s.Children.only(x);C=s.cloneElement(f,h.getTriggerProps(f.props,f.ref))}const a=!!l,k=h.getTooltipProps({},n),E=a?Fe(k,["role","id"]):k,A=Ae(k,["role","id"]);return w?o.jsxs(o.Fragment,{children:[C,o.jsx(je,{children:h.isOpen&&o.jsx(Ce,{...y,children:o.jsx(D.div,{...h.getTooltipPositionerProps(),__css:{zIndex:p.zIndex,pointerEvents:"none"},children:o.jsxs(Ne,{variants:Ie,initial:"exit",animate:"enter",exit:"exit",...X,...E,__css:p,children:[w,a&&o.jsx(D.span,{srOnly:!0,...A,children:l}),v&&o.jsx(D.div,{"data-popper-arrow":!0,className:"chakra-tooltip__arrow-wrapper",children:o.jsx(D.div,{"data-popper-arrow-inner":!0,className:"chakra-tooltip__arrow",__css:{bg:p.bg}})})]})})})})]}):o.jsx(o.Fragment,{children:x})});te.displayName="Tooltip";const We=({productTitle:e,productSubtitle:n,points:r,price:i,isLoaded:p,trending:_,isNew:g,bgImage:x,onClick:w,i:c,rest:l})=>{var P,y,d;const{root:v}=ze();return o.jsx(M,{...v,flexDir:"column",pos:"relative",children:o.jsx(V,{w:["280px","200px","280px","235px","280px"],px:"0px",children:o.jsx(ke,{borderRadius:{base:"8px",md:"10px"},isLoaded:p,children:o.jsxs(M,{w:["280px","200px","280px","235px","280px"],h:["350px","270px","350px","320px","360px"],px:"0px",borderRadius:{base:"8px",md:"10px"},flexDir:"column",bg:"#F2F2F2",className:"card-hover",as:"button",onClick:w,role:"group",borderColor:"#00000012",borderWidth:"1px",children:[o.jsx(V,{pos:"absolute",borderRadius:{base:"8px",md:"16px"},w:["280px","200px","280px","235px","280px"],h:["350px","270px","350px","320px","360px"],bg:"#0000000E",zIndex:100}),o.jsxs(V,{w:["280px","200px","280px","235px","280px"],overflow:"hidden",children:[(l==null?void 0:l.status)==="draft"&&o.jsx(oe,{w:"100%",h:"100%",bg:"#5D5A5AE1",pos:"absolute",zIndex:100,borderRadius:{base:"8px",md:"16px"},children:o.jsx(R,{color:"white",fontSize:"20px",children:"Expired"})})," ",(l==null?void 0:l.status)==="expired"&&o.jsx(oe,{w:"100%",h:"100%",bg:"#5D5A5AE1",pos:"absolute",zIndex:100,borderRadius:{base:"8px",md:"16px"},children:o.jsx(R,{color:"white",fontSize:"20px",children:"Expired"})}),o.jsx(re,{src:(P=x[0])==null?void 0:P.url,w:"100%",h:["160px","190px","260px","230px","270px"],borderBottomEndRadius:{base:"8px",md:"10px"},borderBottomStartRadius:{base:"8px",md:"10px"},objectFit:"cover",fallbackSrc:Ee.appLogoPlaceholder,fallbackStrategy:"beforeLoadOrError",mixBlendMode:"multiply",_groupHover:{transform:"scale(1.2)",transition:"all .2s linear"}})]}),o.jsxs(Te,{w:"85%",alignSelf:"center",mt:"5px",children:[o.jsx(re,{src:(y=l==null?void 0:l.brand)==null?void 0:y.logo,w:"25px",h:"25px",borderRadius:"20px",objectFit:"cover",bg:"white"}),o.jsx(M,{w:"100%",justify:"center",children:o.jsx(te,{label:e,children:o.jsx(R,{textTransform:"uppercase",textAlign:"match-parent",noOfLines:1,fontWeight:500,children:e})})})]}),o.jsx(R,{noOfLines:1,w:"70%",alignSelf:"center",opacity:.6,children:n}),o.jsx(M,{pos:"absolute",top:"-14.5px",right:["-1.5px","-1.5px",c===2||c===5||c===8||c===11?"0px":"-18.5px",c===3||c===7||c===11||c===15?"0px":"-15.5px",c===3||c===7||c===11||c===15?"0px":"-10.5px"],children:g?o.jsx(De,{}):null}),o.jsx(V,{bg:"dark",pos:"absolute",bottom:"0",w:["280px","200px","280px","235px","280px"],h:"30px",borderBottomRadius:"10px",color:"white",alignItems:"center",justifyContent:"center",children:o.jsxs(R,{pt:"2px",fontFamily:"Dot Matrix",fontSize:"20px",textTransform:"uppercase",children:[r," ",(d=l==null?void 0:l.brand)==null?void 0:d.brandName," PT"]})})]})})})})},ze=()=>({root:{w:"100%",align:"center",my:"5%",borderRadius:"16px",px:0}});export{We as default};
