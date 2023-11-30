import{by as M,bx as z,bG as _,j as m,bH as D,bI as w,r as d,bz as G,bC as U,bB as S,cA as P,E as Y,cq as q,cn as J,cB as R,cC as k,bJ as L,bE as V}from"./index-9a3a3312.js";var[Q,E]=M({name:"AccordionStylesContext",hookName:"useAccordionStyles",providerName:"<Accordion />"}),[X,j]=M({name:"AccordionItemContext",hookName:"useAccordionItemContext",providerName:"<AccordionItem />"}),[Z,pe,ee,ne]=z(),oe=_(function(n,t){const{getButtonProps:o}=j(),c=o(n,t),i={display:"flex",alignItems:"center",width:"100%",outline:0,...E().button};return m.jsx(D.button,{...c,className:w("chakra-accordion__button",n.className),__css:i})});oe.displayName="AccordionButton";function te(e){const{onChange:n,defaultIndex:t,index:o,allowMultiple:c,allowToggle:s,...i}=e;ie(e),ce(e);const p=ee(),[h,r]=d.useState(-1);d.useEffect(()=>()=>{r(-1)},[]);const[a,u]=G({value:o,defaultValue(){return c?t??[]:t??-1},onChange:n});return{index:a,setIndex:u,htmlProps:i,getAccordionItemProps:l=>{let y=!1;return l!==null&&(y=Array.isArray(a)?a.includes(l):a===l),{isOpen:y,onChange:x=>{if(l!==null)if(c&&Array.isArray(a)){const I=x?a.concat(l):a.filter(C=>C!==l);u(I)}else x?u(l):s&&u(-1)}}},focusedIndex:h,setFocusedIndex:r,descendants:p}}var[se,O]=M({name:"AccordionContext",hookName:"useAccordionContext",providerName:"Accordion"});function ae(e){const{isDisabled:n,isFocusable:t,id:o,...c}=e,{getAccordionItemProps:s,setFocusedIndex:i}=O(),p=d.useRef(null),h=d.useId(),r=o??h,a=`accordion-button-${r}`,u=`accordion-panel-${r}`;le(e);const{register:b,index:l,descendants:y}=ne({disabled:n&&!t}),{isOpen:f,onChange:x}=s(l===-1?null:l);re({isOpen:f,isDisabled:n});const I=()=>{x==null||x(!0)},C=()=>{x==null||x(!1)},T=d.useCallback(()=>{x==null||x(!f),i(l)},[l,i,f,x]),B=d.useCallback(N=>{const v={ArrowDown:()=>{const A=y.nextEnabled(l);A==null||A.node.focus()},ArrowUp:()=>{const A=y.prevEnabled(l);A==null||A.node.focus()},Home:()=>{const A=y.firstEnabled();A==null||A.node.focus()},End:()=>{const A=y.lastEnabled();A==null||A.node.focus()}}[N.key];v&&(N.preventDefault(),v(N))},[y,l]),F=d.useCallback(()=>{i(l)},[i,l]),W=d.useCallback(function(g={},v=null){return{...g,type:"button",ref:U(b,p,v),id:a,disabled:!!n,"aria-expanded":!!f,"aria-controls":u,onClick:S(g.onClick,T),onFocus:S(g.onFocus,F),onKeyDown:S(g.onKeyDown,B)}},[a,n,f,T,F,B,u,b]),$=d.useCallback(function(g={},v=null){return{...g,ref:v,role:"region",id:u,"aria-labelledby":a,hidden:!f}},[a,f,u]);return{isOpen:f,isDisabled:n,isFocusable:t,onOpen:I,onClose:C,getButtonProps:W,getPanelProps:$,htmlProps:c}}function ie(e){const n=e.index||e.defaultIndex,t=n!=null&&!Array.isArray(n)&&e.allowMultiple;P({condition:!!t,message:`If 'allowMultiple' is passed, then 'index' or 'defaultIndex' must be an array. You passed: ${typeof n},`})}function ce(e){P({condition:!!(e.allowMultiple&&e.allowToggle),message:"If 'allowMultiple' is passed, 'allowToggle' will be ignored. Either remove 'allowToggle' or 'allowMultiple' depending on whether you want multiple accordions visible or not"})}function le(e){P({condition:!!(e.isFocusable&&!e.isDisabled),message:`Using only 'isFocusable', this prop is reserved for situations where you pass 'isDisabled' but you still want the element to receive focus (A11y). Either remove it or pass 'isDisabled' as well.
    `})}function re(e){P({condition:e.isOpen&&!!e.isDisabled,message:"Cannot open a disabled accordion item"})}function de(e){const{isOpen:n,isDisabled:t}=j(),{reduceMotion:o}=O(),c=w("chakra-accordion__icon",e.className),s=E(),i={opacity:t?.4:1,transform:n?"rotate(-180deg)":void 0,transition:o?void 0:"transform 0.2s",transformOrigin:"center",...s.icon};return m.jsx(Y,{viewBox:"0 0 24 24","aria-hidden":!0,className:c,__css:i,...e,children:m.jsx("path",{fill:"currentColor",d:"M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"})})}de.displayName="AccordionIcon";var ue=_(function(n,t){const{children:o,className:c}=n,{htmlProps:s,...i}=ae(n),h={...E().container,overflowAnchor:"none"},r=d.useMemo(()=>i,[i]);return m.jsx(X,{value:r,children:m.jsx(D.div,{ref:t,...s,className:w("chakra-accordion__item",c),__css:h,children:typeof o=="function"?o({isExpanded:!!i.isOpen,isDisabled:!!i.isDisabled}):o})})});ue.displayName="AccordionItem";var me=e=>e!=null&&parseInt(e.toString(),10)>0,H={exit:{height:{duration:.2,ease:k.ease},opacity:{duration:.3,ease:k.ease}},enter:{height:{duration:.3,ease:k.ease},opacity:{duration:.4,ease:k.ease}}},fe={exit:({animateOpacity:e,startingHeight:n,transition:t,transitionEnd:o,delay:c})=>{var s;return{...e&&{opacity:me(n)?1:0},height:n,transitionEnd:o==null?void 0:o.exit,transition:(s=t==null?void 0:t.exit)!=null?s:R.exit(H.exit,c)}},enter:({animateOpacity:e,endingHeight:n,transition:t,transitionEnd:o,delay:c})=>{var s;return{...e&&{opacity:1},height:n,transitionEnd:o==null?void 0:o.enter,transition:(s=t==null?void 0:t.enter)!=null?s:R.enter(H.enter,c)}}},K=d.forwardRef((e,n)=>{const{in:t,unmountOnExit:o,animateOpacity:c=!0,startingHeight:s=0,endingHeight:i="auto",style:p,className:h,transition:r,transitionEnd:a,...u}=e,[b,l]=d.useState(!1);d.useEffect(()=>{const C=setTimeout(()=>{l(!0)});return()=>clearTimeout(C)},[]),P({condition:Number(s)>0&&!!o,message:"startingHeight and unmountOnExit are mutually exclusive. You can't use them together"});const y=parseFloat(s.toString())>0,f={startingHeight:s,endingHeight:i,animateOpacity:c,transition:b?r:{enter:{duration:0}},transitionEnd:{enter:a==null?void 0:a.enter,exit:o?a==null?void 0:a.exit:{...a==null?void 0:a.exit,display:y?"block":"none"}}},x=o?t:!0,I=t||o?"enter":"exit";return m.jsx(q,{initial:!1,custom:f,children:x&&m.jsx(J.div,{ref:n,...u,className:w("chakra-collapse",h),style:{overflow:"hidden",display:"block",...p},custom:f,variants:fe,initial:o?"exit":!1,animate:I,exit:"exit"})})});K.displayName="Collapse";var xe=_(function(n,t){const{className:o,motionProps:c,...s}=n,{reduceMotion:i}=O(),{getPanelProps:p,isOpen:h}=j(),r=p(s,t),a=w("chakra-accordion__panel",o),u=E();i||delete r.hidden;const b=m.jsx(D.div,{...r,__css:u.panel,className:a});return i?b:m.jsx(K,{in:h,...c,children:b})});xe.displayName="AccordionPanel";var he=_(function({children:n,reduceMotion:t,...o},c){const s=L("Accordion",o),i=V(o),{htmlProps:p,descendants:h,...r}=te(i),a=d.useMemo(()=>({...r,reduceMotion:!!t}),[r,t]);return m.jsx(Z,{value:h,children:m.jsx(se,{value:a,children:m.jsx(Q,{value:s,children:m.jsx(D.div,{ref:c,...p,className:w("chakra-accordion",o.className),__css:s.root,children:n})})})})});he.displayName="Accordion";export{he as A,ue as a,oe as b,de as c,xe as d};