import{bq as We,aq as K,cj as Ir,j as e,ar as B,aQ as Me,bw as $e,ck as _r,cl as Ar,cm as Rr,bz as Dr,as as Q,r as a,cn as le,N as He,_ as zr,a as Pr,bg as Er,c as Nr,b as Or,u as Tr,X as Re,d as ce,c4 as Lr,co as Br,cp as Wr,cq as De,cr as ze,cs as Mr,al as F,S as P,F as t,p as $r,h as U,J as _,ae as Pe,I as q,f as G,n as E,i as Hr,T as o,l as Vr,$ as Ur,m as qr,aN as Gr,aJ as Yr,o as Xr,D as Y,G as Ee,a4 as Jr,bD as Ne,V as Kr,b9 as Oe,bm as Qr,H as Zr,a1 as es,g as X,B as J,ct as Te,cu as Le}from"./index-2780a68e.js";import{s as rs}from"./spinning_loader-158d8410.js";import{H as ss,B as ts}from"./FAQJSON-5b8326e1.js";import{C as os}from"./chunk-CWVAJCXJ-e931ea52.js";import"./chunk-7D6N5TE5-4faae5e9.js";var[ns,as]=We({name:"ProgressStylesContext",errorMessage:`useProgressStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Progress />" `}),is=K((n,x)=>{const{min:i,max:l,value:c,isIndeterminate:r,role:j,...d}=n,g=Ir({value:c,min:i,max:l,isIndeterminate:r,role:j}),y={height:"100%",...as().filledTrack};return e.jsx(B.div,{ref:x,style:{width:`${g.percent}%`,...d.style},...g.bind,...d,__css:y})}),Ve=K((n,x)=>{var i;const{value:l,min:c=0,max:r=100,hasStripe:j,isAnimated:d,children:g,borderRadius:w,isIndeterminate:y,"aria-label":N,"aria-labelledby":v,"aria-valuetext":C,title:O,role:ee,...W}=Me(n),M=$e("Progress",n),$=w??((i=M.track)==null?void 0:i.borderRadius),f={animation:`${Ar} 1s linear infinite`},k={...!y&&j&&d&&f,...y&&{position:"absolute",willChange:"left",minWidth:"50%",animation:`${_r} 1s ease infinite normal none running`}},se={overflow:"hidden",position:"relative",...M.track};return e.jsx(B.div,{ref:x,borderRadius:$,__css:se,...W,children:e.jsxs(ns,{value:M,children:[e.jsx(is,{"aria-label":N,"aria-labelledby":v,"aria-valuetext":C,min:c,max:r,value:l,isIndeterminate:y,css:k,borderRadius:$,title:O,role:ee}),g]})})});Ve.displayName="Progress";var[ls,Z]=We({name:"StepContext"}),[cs,de]=Rr("Stepper"),ds=K(function(x,i){const{orientation:l,status:c,showLastSeparator:r}=Z(),j=de();return e.jsx(B.div,{ref:i,"data-status":c,"data-orientation":l,"data-stretch":Dr(r),__css:j.step,...x,className:Q("chakra-step",x.className)})}),xs=K(function(x,i){const l=$e("Stepper",x),{children:c,index:r,orientation:j="horizontal",showLastSeparator:d=!1,...g}=Me(x),w=a.Children.toArray(c),y=w.length;function N(v){return v<r?"complete":v>r?"incomplete":"active"}return e.jsx(B.div,{ref:i,"aria-label":"Progress","data-orientation":j,...g,__css:l.stepper,className:Q("chakra-stepper",x.className),children:e.jsx(cs,{value:l,children:w.map((v,C)=>e.jsx(ls,{value:{index:C,status:N(C),orientation:j,showLastSeparator:d,count:y,isFirst:C===0,isLast:C===y-1},children:v},C))})})});function ps(n={}){const{index:x=0,count:i}=n,[l,c]=a.useState(x),r=typeof i=="number"?i-1:0,j=l/r;return{activeStep:l,setActiveStep:c,activeStepPercent:j,isActiveStep(d){return d===l},isCompleteStep(d){return d<l},isIncompleteStep(d){return d>l},getStatus(d){return d<l?"complete":d>l?"incomplete":"active"},goToNext(){c(d=>typeof i=="number"?Math.min(i,d+1):d+1)},goToPrevious(){c(d=>Math.max(0,d-1))}}}function hs(n){const{complete:x,incomplete:i,active:l}=n,c=Z();let r=null;switch(c.status){case"complete":r=le(x,c);break;case"incomplete":r=le(i,c);break;case"active":r=le(l,c);break}return r?e.jsx(e.Fragment,{children:r}):null}function us(n){return e.jsx("svg",{stroke:"currentColor",fill:"currentColor",strokeWidth:"0",viewBox:"0 0 20 20","aria-hidden":"true",height:"1em",width:"1em",...n,children:e.jsx("path",{fillRule:"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",clipRule:"evenodd"})})}function fs(n){const{status:x}=Z(),i=de(),l=x==="complete"?us:void 0;return e.jsx(He,{as:l,__css:i.icon,...n,className:Q("chakra-step__icon",n.className)})}function ms(n){const{status:x}=Z(),i=de();return e.jsx(B.div,{"data-status":x,...n,__css:i.indicator,className:Q("chakra-step__indicator",n.className)})}const Be=(n,x,i,l,c)=>{n({title:x,description:i,status:"error",duration:2e3,isClosable:!0,position:c||"top-right"})},bs=a.lazy(()=>zr(()=>import("./index-90aa80d8.js"),["assets/index-90aa80d8.js","assets/index-2780a68e.js","assets/index-ed5220eb.css"])),js=()=>{var we,ye,ve,Fe,Ce,ke,Ie,_e,Ae;const n=Pr(),{getExpectedAmountOfTargetedReward:x,spendRewardsOnAnotherBrandWithVaultPermit:i,spendRewardsOnIssuingBrandWithVaultPermit:l,spendingSteps:c}=Er(),{state:r}=Nr(),j=Or();let d=Tr();const g=[{title:"First",description:"Validating"},{title:"Second",description:"Performing Redemption"},{title:"Third",description:"Completing Redemption"}],{activeStep:w,setActiveStep:y}=ps({index:0,count:g.length}),[N,v]=a.useState(!1);a.useState(!1);const[C,O]=a.useState(""),[ee,W]=a.useState(""),[M,$]=a.useState(null),[f,re]=a.useState({});a.useState("");const[xe,k]=a.useState(!1),[se,pe]=a.useState(!1),[H,he]=a.useState(r==null?void 0:r.tokens.toString()),[Ue,qe]=a.useState();a.useState(!1);const[Ge,Ye]=a.useState(""),{isOpen:Xe,onOpen:ue,onClose:fe}=Re(),{isOpen:Je,onOpen:Ke,onClose:te}=Re(),{root:Qe,root2:Ze,nameStyles:me,boxCircleColor:er,leftSection:rr,rightSection:sr,font:be,font1:V,subHeadStyle:T,headingStyle:tr,circleReward:or,searchFlex:nr,balanceFlex:ar,balanceButton:ir,inputStack:lr,imageBrandLogo:cr,doneBox:dr,rightSectionImage:xr,dealPriceFlex:pr,differenceFlex:hr,subtotalFlex:ur,headingsFlex:fr,editText:mr,boxPrice:br,boxPercent:jr}=Ss(),{token:oe}=ce(s=>s.authReducer),{swapTokens:b}=ce(s=>s.tokenSwapReducer),{reward_type_product:I,reward_type_loading:gs}=ce(s=>s.productReducer),{getTokenBalance:je,loading:Se}=Lr(),L=(we=b[0])==null?void 0:we.contractAddress;a.useEffect(()=>{(async()=>re(await je(L)))()},[b]),a.useEffect(()=>{ie(),n(Br({token:oe})),n(Wr(r==null?void 0:r.brandId))},[]),a.useEffect(()=>{y(c),c>0&&Ke()},[c]),a.useEffect(()=>{(I==null?void 0:I.length)>0&&(n(De()),n(ze(I.find(s=>(s==null?void 0:s.brandId)===(r==null?void 0:r.brandId))))),ae(I?[...I].reverse():[]),Sr(I?[...I].reverse():[])},[I]);const[ne,ae]=a.useState([]),[ge,Sr]=a.useState([]);function gr(s){if(s){const h=ge.filter(u=>{var A,R;const S=(A=u==null?void 0:u.brand)!=null&&A.brandName?(R=u==null?void 0:u.brand)==null?void 0:R.brandName.toUpperCase():"".toUpperCase(),D=s.toUpperCase();return S.indexOf(D)>-1});ae(h),O(s)}else ae(ge),O(s)}const ie=async()=>{var s,h,u;if(!(!((s=r==null?void 0:r.reward)!=null&&s.contractAddress)||!L)){pe(!0);try{if(((h=b[0])==null?void 0:h.brandId)===(r==null?void 0:r.brandId)){he(r==null?void 0:r.tokens.toString());return}let S=await x({amount:r==null?void 0:r.tokens.toString(),inputRewardAddress:L,outPutRewardAddress:(u=r==null?void 0:r.reward)==null?void 0:u.contractAddress});S&&(he(Number(Mr(S,18)).toFixed(2)),qe(S))}catch(S){console.log(S,"CALC_NEEDED_REWARDS_ER")}finally{pe(!1)}}},wr=async()=>{var s,h,u,S,D,A,R,m;try{if(((s=b[0])==null?void 0:s.brandId)===(r==null?void 0:r.brandId))return;k(!0);const{data:p}=await X.post(`${J}/order/redeem-offer`,{offerId:r.id,quantity:1},{headers:{Authorization:`Bearer ${oe}`}});if((h=p==null?void 0:p.data)!=null&&h.id){const z=await i({rewardId:(u=r==null?void 0:r.reward)==null?void 0:u.id,spendInfo:{rewardAtHand:L,targettedReward:(S=r==null?void 0:r.reward)==null?void 0:S.contractAddress,amountOfRewardAtHand:Ue,expectedAmountOfTargetedReward:Te(r==null?void 0:r.tokens.toString())}});if(z!=null&&z.taskId){const{data:ws}=await X.post(`${J}/order/complete`,{orderId:(D=p==null?void 0:p.data)==null?void 0:D.id,taskId:z==null?void 0:z.taskId},{headers:{Authorization:`Bearer ${Le}`}});ue(),k(!1),W((A=p==null?void 0:p.data)==null?void 0:A.id)}}}catch(p){console.log(p),Be(j,"Error",(m=(R=p==null?void 0:p.response)==null?void 0:R.data)==null?void 0:m.message)}finally{k(!1),te()}},yr=async()=>{var s,h,u,S,D,A,R;k(!0);try{const{data:m}=await X.post(`${J}/order/redeem-offer`,{offerId:r.id,quantity:1},{headers:{Authorization:`Bearer ${oe}`}});if((s=m==null?void 0:m.data)!=null&&s.id){const p=await l({reward_address:(h=r==null?void 0:r.reward)==null?void 0:h.contractAddress,reward_amount:Te(r==null?void 0:r.tokens.toString()),rewardId:(u=r==null?void 0:r.reward)==null?void 0:u.id});if(p!=null&&p.taskId){const{data:z}=await X.post(`${J}/order/complete`,{orderId:(S=m==null?void 0:m.data)==null?void 0:S.id,taskId:p==null?void 0:p.taskId},{headers:{Authorization:`Bearer ${Le}`}});ue(),k(!1),W((D=m==null?void 0:m.data)==null?void 0:D.id)}}}catch(m){console.log(m,"SWAP_FOR_SAME_BRANDERR"),Be(j,"Error",(R=(A=m==null?void 0:m.response)==null?void 0:A.data)==null?void 0:R.message)}finally{k(!1),te()}},vr=s=>{Ye(s)},Fr=(ye=g[w-1])==null?void 0:ye.description,Cr=g.length-1,kr=w/Cr*100;return e.jsxs(F,{w:"100%",h:"100vh",children:[e.jsx(a.Suspense,{fallback:e.jsx(P,{size:"sm"}),children:e.jsx(bs,{})}),e.jsx(t,{flexDir:"column",children:e.jsxs($r,{children:[e.jsxs(U,{...Qe,children:[e.jsx(t,{mb:"25px",children:e.jsx(_,{})}),e.jsxs(t,{children:[e.jsxs(t,{...rr,flexDir:"column",pos:"relative",children:[e.jsxs(t,{...Ze,as:"button",flexDir:"row",justifyContent:"space-between",alignItems:"center",onClick:()=>v(!0),children:[e.jsx(t,{children:b==null?void 0:b.map(s=>e.jsxs(t,{flexDir:"row",align:"center",children:[e.jsx(Pe,{as:q,objectFit:"cover",mr:b.length>1?"-15px":"0px",...or,src:(s==null?void 0:s.rewardImage)||G.appLogoPlaceholder,fallbackSrc:G.appLogoPlaceholder,fallbackStrategy:"beforeLoadOrError"},E()),e.jsxs(Hr,{pl:"10px",h:"40px",children:[" ",Se?e.jsx(P,{size:"sm"}):e.jsxs(o,{color:"#999999",children:[Number(f==null?void 0:f.balance).toFixed(2)||0," ",s==null?void 0:s.rewardSymbol]}),e.jsx(o,{color:"dark",children:s==null?void 0:s.brandName})]})]},E()))}),e.jsxs(t,{...nr,as:"button",children:[e.jsx(o,{...tr,children:"Redeem with another reward"}),e.jsx(q,{objectFit:"contain",src:G.arrowLeftIcon})]})]}),e.jsx(_,{}),e.jsxs(t,{...ar,flexDir:"column",children:[e.jsx(Vr,{...ir,isLoading:xe,disabled:Number(f==null?void 0:f.balance)<Number(H),onClick:()=>{var s;if(((s=b[0])==null?void 0:s.brandId)!==(r==null?void 0:r.brandId)){wr();return}else{if(Number(f==null?void 0:f.balance)<Number(r==null?void 0:r.tokens)){Ur(j,"Not enough rewards for swap, please select another reward",2e3,"top");return}yr()}},children:"Confirm transaction"}),e.jsx(o,{mt:"24px",...V,children:"Ensure you check the terms and conditions for claiming this offer."})]}),N&&e.jsxs(U,{...lr,position:"absolute",boxShadow:"md",borderRadius:"10px",children:[e.jsx(t,{w:"full",pos:"absolute",bg:"white",children:e.jsxs(qr,{_focus:{boxShadow:"none"},as:"button",children:[e.jsx(Gr,{pointerEvents:"none",children:e.jsx(He,{as:Yr,color:"#959595"}),p:"1rem"}),e.jsx(Xr,{...be,value:C,onChange:({target:s})=>{O(s.value),gr(s==null?void 0:s.value)},placeholder:"Search tokens...",borderRadius:"0",borderWidth:"0"}),e.jsx(t,{w:"150px",children:e.jsx(o,{...be,children:"Import tokens"})})]})}),e.jsx(Y,{borderColor:"#00000030",w:"100%",p:0,mt:"50px"}),e.jsx(F,{overflowY:"scroll",h:"500px",children:ne==null?void 0:ne.map((s,h)=>e.jsxs(F,{cursor:"pointer",onClick:()=>{$(h),vr(s==null?void 0:s.id),n(De()),n(ze({...s,quantity:1}))},children:[e.jsxs(t,{px:"3%",py:"1%",align:"center",children:[e.jsx(q,{src:s==null?void 0:s.rewardImage,objectFit:"cover",...cr}),e.jsxs(U,{pl:"2%",children:[e.jsx(o,{fontSize:"16px",fontWeight:"400",children:s==null?void 0:s.brandName}),e.jsx(o,{fontSize:"14px",color:"#999999",children:s==null?void 0:s.rewardSymbol})]}),e.jsx(_,{}),e.jsx(t,{pl:"2%",children:e.jsx(os,{spacing:"0.5rem",colorScheme:"gray",isChecked:Ge===(s==null?void 0:s.id)})})]}),e.jsx(Y,{borderColor:"#00000030",w:"100%",p:0})]},E()))}),e.jsx(t,{justify:"center",alignItems:"center",onClick:()=>v(!1),children:e.jsx(F,{as:"button",...dr,onClick:()=>ie(),children:"Done"})})]}),e.jsx(_,{}),e.jsx(Y,{orientation:"horizontal"}),e.jsxs(t,{flexDir:"column",mt:"24px",children:[e.jsx(o,{...me,children:"How it works"}),(ve=ss)==null?void 0:ve.map((s,h)=>e.jsxs(t,{mt:"20px",children:[e.jsx(Pe,{size:"25px",...er,children:e.jsx(o,{children:h+1})}),e.jsx(o,{...V,ml:"10px",textAlign:"justify",children:s.text})]},E()))]}),e.jsx(_,{mt:"20px"}),e.jsx(Y,{orientation:"horizontal"}),e.jsxs(t,{justify:"space-between",mt:"20px",children:[e.jsx(o,{fontSize:"18px",children:"Or earn with bounties"}),e.jsx(o,{fontSize:"16px",textDecoration:"underline",onClick:()=>d(`${Ee}/bounties`),children:"See all bounties"})]}),(Fe=ts)==null?void 0:Fe.map(s=>e.jsxs(t,{justify:"space-between",mt:"15px",children:[e.jsxs(t,{children:[e.jsx(Jr,{src:"",mr:"8px"}),e.jsxs(t,{flexDir:"column",children:[e.jsx(o,{...V,children:s.title}),e.jsx(o,{fontSize:"18px",children:s.body})]})]}),e.jsxs(t,{flexDir:"column",children:[e.jsx(o,{...V,children:s.titleTiming}),e.jsx(o,{fontSize:"16px",color:"#C90303",children:s.time})]})]},E()))]}),e.jsx(_,{m:"1%"}),e.jsxs(t,{...sr,flexDir:"column",children:[e.jsxs(t,{children:[e.jsx(q,{src:(Ce=r==null?void 0:r.offerImages[0])==null?void 0:Ce.url,...xr,objectFit:"contain",fallbackSrc:G.appLogoPlaceholder,fallbackStrategy:"beforeLoadOrError"}),e.jsx(_,{mr:"6px"}),e.jsxs(t,{flexDir:"column",children:[e.jsx(o,{fontSize:"13px",fontWeight:"500",children:r==null?void 0:r.name}),e.jsx(_,{}),e.jsxs(o,{fontSize:"14px",color:"#999999",children:[r==null?void 0:r.tokens," ",(ke=r==null?void 0:r.reward)==null?void 0:ke.rewardSymbol]}),e.jsxs(o,{fontSize:"14px",color:"#999999",children:[r==null?void 0:r.price," USD"]}),e.jsxs(o,{fontSize:"14px",color:"#999999",children:["Quantity: "," 1 "]})]})]}),e.jsxs(t,{flexDir:"row",...pr,children:[e.jsx(o,{...T,children:"Deal Price"}),e.jsx(t,{children:e.jsxs(F,{as:"button",color:"black",px:2,h:6,children:[r==null?void 0:r.tokens," ",(Ie=r==null?void 0:r.reward)==null?void 0:Ie.rewardSymbol]})})]}),e.jsxs(t,{flexDir:"row",...hr,children:[e.jsx(o,{...T,children:"Needed reward "}),e.jsx(t,{children:se?e.jsx(P,{size:"ssm"}):e.jsxs(o,{as:"button",px:2,h:6,children:[H," ",(_e=b[0])==null?void 0:_e.rewardSymbol]})})]}),e.jsxs(t,{flexDir:"row",...ur,children:[e.jsx(o,{...T,children:"Available rewards"}),e.jsx(t,{children:e.jsx(F,{as:"button",color:"black",px:2,h:6,children:Se?e.jsx(P,{size:"sm"}):e.jsxs(o,{children:[Number(f==null?void 0:f.balance).toFixed(2)||0," ",(Ae=b[0])==null?void 0:Ae.rewardSymbol]})})})]}),e.jsx(_,{}),Number(f==null?void 0:f.balance)<Number(H)&&e.jsx(t,{mt:"20px",children:e.jsx(o,{fontSize:"14px",color:"#C90303",children:"You do not have enough reward to claim this offer for the selected reward, please select a different reward to complete the reward."})}),e.jsxs(t,{flexDir:"column",children:[e.jsx(o,{...me,textAlign:["left"],mt:"45px",children:"Payment Details"}),e.jsxs(t,{flexDir:"row",...fr,children:[e.jsx(o,{fontSize:"14px",color:"#AEAEAE",children:"Rewards slipt"}),e.jsx(o,{...mr,as:"button",onClick:()=>{v(!0)},children:"Edit"})]}),b==null?void 0:b.map((s,h)=>{var u;return e.jsx(F,{children:e.jsxs(t,{flexDir:"column",padding:"6px",bg:h%2===0?"#F2F2F2":"#FFFFFF",children:[e.jsxs(t,{flexDir:"row",justify:"space-between",children:[e.jsx(o,{...T,children:s==null?void 0:s.brandName}),e.jsx(t,{children:e.jsxs(F,{as:"button",...br,children:[r.price," USD"]})})]}),e.jsxs(t,{flexDir:"row",justify:"space-between",color:"#999999",children:[e.jsxs(o,{...T,children:[H," ",(u=b[0])==null?void 0:u.rewardSymbol]}),e.jsx(t,{children:e.jsx(F,{as:"button",...jr,children:"100 %"})})]})]})},E())})]})]})]})]}),e.jsxs(a.Suspense,{fallback:e.jsx(P,{size:"sm"}),children:[e.jsx(Ne,{isOpen:Xe,onClose:fe,closeOnOverlayClick:!0,children:e.jsx(U,{w:"100%",children:e.jsxs(Kr,{children:[e.jsx(Oe,{style:{width:"150px",height:"150px"},animationData:Qr,loop:!1,autoplay:!0}),e.jsx(Zr,{fontSize:"18px",pb:"10px",children:"Reward redeemed successfully"}),e.jsx(a.Suspense,{fallback:e.jsx(P,{size:"sm"}),children:e.jsx(es,{name:"Ok",onClick:async()=>{window.scrollTo({top:0,behavior:"smooth"}),await ie(),re(await je(L)),k(!1),d(`${Ee}/dashboard_my_deals_details`,{state:{orderId:ee}}),fe()}})})]})})}),e.jsxs(Ne,{isOpen:Je,onClose:te,children:[e.jsx(t,{w:"full",align:"center",justify:"center",mb:"30px",children:e.jsx(Oe,{style:{width:"50px",height:"50px"},animationData:rs,loop:!0,autoplay:!0})}),e.jsxs(F,{position:"relative",children:[e.jsx(xs,{size:"sm",index:w,gap:"0",colorScheme:"gray",children:g.map((s,h)=>e.jsx(ds,{children:e.jsx(ms,{bg:"white",children:e.jsx(hs,{complete:e.jsx(fs,{})})})},h))}),e.jsx(Ve,{value:kr,position:"absolute",height:"3px",width:"full",top:"10px",zIndex:-1,colorScheme:"gray",hasStripe:!0,transition:"all .8s linear"}),e.jsx(t,{w:"full",align:"center",justify:"center",mt:"30px",children:e.jsx(o,{alignSelf:"center",justifySelf:"center",fontSize:"18px",fontWeight:800,children:Fr})})]})]})]})]})})]})},Is=js,Ss=()=>({root:{w:"100%",mt:"70px",mb:"30px"},root2:{bg:"#F2F2F2",h:"80px",w:"100%",borderRadius:"1000px",p:"1.5rem",overflow:"hidden"},nameStyles:{fontSize:["20px","20px"]},itemBox:{w:"100%",h:"3vw",bg:"white",border:"1px",justify:"space-between",align:"center",px:"5%"},boxCircleColor:{bgColor:"#000000",color:"white",fontWeight:"700"},smallButton:{w:"95px",h:"42px",bg:"#000000",borderRadius:"100px"},font1:{fontSize:"14px",lineHeight:"22px",color:"#999999"},font2:{fontSize:"18px",lineHeight:"22px",color:"#FFFFFF"},infoBox:{w:"60%",h:"10vw",px:"2%",borderBottom:"1px",borderBottomColor:"gray.300"},rootBox:{w:"100%",h:"100%",borderRadius:"15px",overflow:"hidden",borderWidth:"1px",borderColor:"#00000007"},leftSection:{w:"75%"},rightSection:{h:"100%",w:"25%",py:"4px"},lowerSec:{w:"100%",align:"center"},headingStyle:{fontSize:["14px","12px","14px","16px","16px"]},headingStyle2:{fontSize:["14px","12px","14px","16px","18px"],color:"#999999"},subHeadStyle:{fontSize:["14px","12px","12px","12px","14px"]},bodyStyle:{fontSize:["14px","14px","16px","16px","18px"],color:"#000000"},button:{borderWidth:1,borderColor:"#000000",px:"2%",py:"0.5%",borderRadius:"100px"},contain:{w:"100%",h:"64px",mt:"297px"},head:{fontSize:{base:"18px",md:"20px"}},smallerDesc:{fontSize:{base:"10px",md:"16px"}},container:{w:"100px",_hover:{background:"black",color:"white"}},font:{fontSize:["14px"],color:"#959595"},popfont:{fontSize:"12px",lineHeight:"14px",color:"#999999"},personalCenter:{bg:"dark",px:"10px",py:"5px",borderRadius:"5px",color:"light"},chainModalCenter:{px:"5px",mr:"5px",borderRadius:"10px",bg:"grey",borderWidth:1,py:"5px",_hover:{borderColor:"#99999980"}},skelCenter:{px:"10px",borderRadius:"10px",bg:"grey",borderWidth:1,py:"5px",_hover:{borderColor:"#99999980"}},circleReward:{width:"50px",height:"50px",bg:"#00000010"},searchFlex:{justifyContent:"center",gap:"17px",alignItems:"center"},balanceFlex:{mt:"24px",mb:"40px"},balanceButton:{bg:"#000000",w:"100%",h:"70px",borderRadius:"0px",color:"#FFFFFF",_hover:{bg:"dark"}},inputStack:{w:"100%",borderWidth:1,borderColor:"#00000030",zIndex:"1000",bg:"light"},imageBrandLogo:{h:"50px",borderRadius:"50px",bg:"#00000020",w:"50px"},doneBox:{bg:"#000000",w:"100%",h:"80px",color:"#FFFFFF"},rightSectionImage:{w:"100px",bg:"#00000020",h:"100px"},dealPriceFlex:{justify:"space-between",mt:"20px",bg:"#F2F2F2",padding:"6px"},differenceFlex:{padding:"6px",bg:"#FFFFFF",justify:"space-between"},subtotalFlex:{justify:"space-between",bg:"#F2F2F2",padding:"6px"},headingsFlex:{justify:"space-between",mt:"30px",py:"6px"},editText:{fontSize:"14px",color:"#AEAEAE"},boxPrice:{color:"#000000",h:4,fontSize:"14px",px:2},boxPercent:{color:"#999999",h:4,fontSize:"14px",px:2}});export{Is as default};