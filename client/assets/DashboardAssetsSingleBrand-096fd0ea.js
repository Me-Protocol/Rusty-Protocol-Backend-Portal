import{bq as Be,aq as I,bw as Ve,aQ as We,j as e,ar as E,as as Ge,r as d,_ as z,u as He,a as Qe,Q as Xe,c as Ye,d as P,bV as qe,at as Ke,Y as Je,X as Ce,F as o,S,p as Ue,h as A,G as C,T as n,J as j,i as N,al as L,C as Ze,z as k,aK as es,aL as ss,b9 as De,M as T,I as rs,K as as,V as ns,bW as ts,bX as os,bY as ls,bZ as ds}from"./index-2780a68e.js";import{e as is}from"./empty-fb04a4d6.js";import{S as cs}from"./index-97b103ea.js";import{g as _e,C as xs,a as hs,L as ps,P as bs,b as us,p as gs,c as ms,i as js,d as fs,e as ys,f as ws}from"./random-color-92fc1dcd.js";import{S as Ss}from"./chunk-3RSXBRAN-f25d778c.js";var[Cs,$]=Be({name:"TableStylesContext",errorMessage:`useTableStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Table />" `}),Re=I((i,b)=>{const c=Ve("Table",i),{className:f,layout:O,...R}=We(i);return e.jsx(Cs,{value:c,children:e.jsx(E.table,{ref:b,__css:{tableLayout:O,...c.table},className:Ge("chakra-table",f),...R})})});Re.displayName="Table";var Ds=I((i,b)=>{const c=$();return e.jsx(E.tr,{...i,ref:b,__css:c.tr})}),_s=I((i,b)=>{const c=$();return e.jsx(E.tbody,{...i,ref:b,__css:c.tbody})}),_=I(({isNumeric:i,...b},c)=>{const f=$();return e.jsx(E.td,{...b,ref:c,__css:f.td,"data-is-numeric":i})});const Rs="/assets/sentarrow-195623c8.svg",vs=d.lazy(()=>z(()=>import("./index-ca03ac15.js"),["assets/index-ca03ac15.js","assets/index-2780a68e.js","assets/index-ed5220eb.css","assets/index-b11feb99.js","assets/countries-e12a8af3.js","assets/chunk-3RSXBRAN-f25d778c.js","assets/chunk-K7XRJ7NL-0713f30f.js"])),As=d.lazy(()=>z(()=>import("./index-71baf741.js"),["assets/index-71baf741.js","assets/index-2780a68e.js","assets/index-ed5220eb.css"])),Ls=d.lazy(()=>z(()=>import("./index-2780a68e.js").then(i=>i.db),["assets/index-2780a68e.js","assets/index-ed5220eb.css"])),ks=d.lazy(()=>z(()=>import("./index-1bd3ead4.js"),["assets/index-1bd3ead4.js","assets/index-2780a68e.js","assets/index-ed5220eb.css"])),Qs=()=>{var G,H,Q,X,Y,q,K,J,U,Z,ee,se,re,ae,ne,te,oe,le,de,ie,ce,xe,he,pe,be,ue,ge,me,je,fe,ye,we,Se;let i=He();Qe();const{root:b,font:c,font1:f,font3:O,smallButton1:R,root2:ve,nameStyles:M,graphBox:Ae}=Ts(),{id:y}=Xe(),{state:r}=Ye(),[Le,ke]=d.useState([]);P(s=>s==null?void 0:s.authReducer);const{reward_type_product:F}=P(s=>s.productReducer),{data:w}=qe({startDate:new Date("05-06-2022").toISOString(),endDate:new Date("11-11-2023").toISOString()},{refetchOnMountOrArgChange:!0}),{user_data:u,my_debit_credit:Is,my_rewards:Es,my_rewards_loading:zs,my_debit_credit_single:Os}=P(s=>s==null?void 0:s.userReducer),D=w&&_e(w==null?void 0:w.data)[y],[Te,Fs]=d.useState(!1),{data:g,isLoading:Ps}=Ke({page:1,limit:4,brandId:y},{refetchOnMountOrArgChange:!0,skip:!y}),{data:h,error:Ns}=Je({id:y},{refetchOnFocus:!0,skip:!y}),B={"Last 7 days":{label:"Last 7 days",millisecondsAgo:60*60*24*7*1e3},"Last 30 days":{label:"Last 30 days",millisecondsAgo:60*60*24*30*1e3},"Last 3 days":{label:"Last 3 days",millisecondsAgo:60*60*24*3*1e3}},V=s=>{const a=Date.now()-s;return new Date(a).toISOString()},Ie={startDate:V(B["Last 7 days"].millisecondsAgo),endDate:new Date().toISOString(),dateRangeString:"Last 7 days"},[v,Ee]=d.useState(Ie),ze=s=>{console.log("heyooo",s);const a=B[s].millisecondsAgo;Ee({...v,startDate:V(a),dateRangeString:s})},Oe=async()=>{var x,p;if(!((x=u==null?void 0:u.customer)!=null&&x.walletAddress))return;const{data:s}=await os.get_account_detail({address:(p=u==null?void 0:u.customer)==null?void 0:p.walletAddress}),a=[];for(const t in s.result.balance)a.push({contractAddress:ls(t),balance:ds(s.result.balance[t])});const l=F==null?void 0:F.map(t=>{const $e=a==null?void 0:a.find(Me=>Me.contractAddress===(t==null?void 0:t.contractAddress));return{...t,balance:$e}});ke(l==null?void 0:l.filter(t=>t.balance))};d.useEffect(()=>{Oe()},[]),Ce();const{isOpen:$s,onOpen:Fe,onClose:Ms}=Ce();xs.register(hs,ps,bs,us,gs,ms,js,fs);const Pe={type:"line",responsive:!0,stepped:"middle",elements:{point:{radius:0,hitRadius:10,hoverRadius:4,hoverBorderWidth:3}},scales:{x:{ticks:{autoSkip:!0},grid:{display:!1}},y:{min:0,ticks:{autoSkip:!0,maxTicksLimit:10},border:{display:!1},grid:{color:"#99999935"}}},plugins:{legend:{display:!1},title:{display:!1,text:"Chart.js Line Chart"}}};new Date().getMonth();const W=ws(),Ne=D?{labels:[new Date(v.startDate).toDateString(),new Date(v.endDate).toDateString()],datasets:[{data:D.reduce((s,a,l)=>{const x=a.transactionType==="CREDIT"?parseFloat(a.amount):-parseFloat(a.amount),t=((s==null?void 0:s.length)===0?0:s[(s==null?void 0:s.length)-1])+x;return s.push(t),s},[]),fill:!1,label:(Q=(H=(G=D[0])==null?void 0:G.rewardRegistry)==null?void 0:H.reward)==null?void 0:Q.rewardName,borderColor:`#${((q=(Y=(X=D[0])==null?void 0:X.rewardRegistry.reward)==null?void 0:Y.brand)==null?void 0:q.color)||W}`,backgroundColor:`#${((U=(J=(K=D[0])==null?void 0:K.rewardRegistry.reward)==null?void 0:J.brand)==null?void 0:U.color)||W}`,borderWidth:2}]}:{labels:[],datasets:[]};let m=_e(w==null?void 0:w.data)[r.brandId]||[];return e.jsxs(o,{flexDir:"column",children:[e.jsx(d.Suspense,{fallback:e.jsx(S,{size:"sm"}),children:e.jsx(Ls,{})}),e.jsx(Ue,{children:e.jsxs(A,{...b,children:[e.jsx(d.Suspense,{fallback:e.jsx(S,{size:"sm"}),children:e.jsx(As,{breadcrumbs:[{name:"Home",link:`${C}/dashboard`},{name:"Assets",link:`${C}/dashboard/dashboard-my-assets`},{name:(ee=(Z=h==null?void 0:h.data)==null?void 0:Z.name)==null?void 0:ee.replaceAll("_"," "),link:`${C}/dashboard/dashboard-my-assets/${y}`,isCurrentPage:!0}]})}),e.jsxs(o,{...ve,children:[e.jsxs(o,{flexDir:"column",children:[e.jsxs(n,{...c,children:["Learn more about your personalized ",r.rewardName," card"]}),e.jsx(j,{}),e.jsx(n,{...f,mb:"10px",children:(re=(se=r==null?void 0:r.reward)==null?void 0:se.brand)==null?void 0:re.description}),e.jsx(N,{children:e.jsx(L,{as:"button",...R,onClick:()=>{var s,a,l,x,p,t;return i(`${C}/dashboard/shop/${(s=h==null?void 0:h.data)==null?void 0:s.id}`,{state:{id:(l=(a=r==null?void 0:r.reward)==null?void 0:a.brand)==null?void 0:l.id,slug:(p=(x=r==null?void 0:r.reward)==null?void 0:x.brand)==null?void 0:p.slug,brandName:(t=r==null?void 0:r.reward)==null?void 0:t.brandName}})},children:e.jsx(n,{...c,children:"Learn more"})})})]}),e.jsx(j,{}),e.jsx(L,{style:{transform:"rotate(-35deg) translateX(60px) translateY(40px)"},children:e.jsx(cs,{logo:((ae=r==null?void 0:r.brand)==null?void 0:ae.white_logo)||((ne=r==null?void 0:r.brand)==null?void 0:ne.logo),bg:(oe=(te=r==null?void 0:r.reward)==null?void 0:te.brand)!=null&&oe.color?`#${(de=(le=r==null?void 0:r.reward)==null?void 0:le.brand)==null?void 0:de.color}`:"#363636",userName:`${(ie=u==null?void 0:u.customer)==null?void 0:ie.name}`})})]}),e.jsxs(o,{...Ae,flexDir:"column",children:[e.jsxs(N,{h:"50px",w:"100%",children:[e.jsx(L,{borderColor:`#${(xe=(ce=r==null?void 0:r.reward)==null?void 0:ce.brand)==null?void 0:xe.color}`,borderWidth:"2px",p:"3px",borderRadius:50,children:e.jsx(Ze,{as:"img",objectFit:"contain",src:((he=r==null?void 0:r.brand)==null?void 0:he.white_logo)||((pe=r==null?void 0:r.brand)==null?void 0:pe.logo),w:"50px",h:"50px",borderRadius:"70px"})}),e.jsx(n,{color:"white",fontSize:"18px",children:(be=r==null?void 0:r.reward)==null?void 0:be.rewardName}),e.jsx(j,{})]}),e.jsxs(N,{h:"50px",w:"100%",mt:"20px",children:[e.jsxs(A,{children:[e.jsxs(n,{fontSize:["14px","14px","14px","18px","16px"],color:"white",children:[(ge=(ue=Le.filter(s=>{var a;return((a=s==null?void 0:s.brand)==null?void 0:a.id)===y}))==null?void 0:ue.map(s=>{var a;return Number((a=s==null?void 0:s.balance)==null?void 0:a.balance)}))==null?void 0:ge.reduce((s,a)=>s+a,0).toLocaleString()," ","pts"]}),e.jsx(n,{fontSize:"14px",color:"#999999C5",children:"Balance"})]}),e.jsx(j,{})]}),e.jsx(j,{}),e.jsxs(o,{bg:"#262626",borderRadius:"8px",h:"70%",w:"100%",p:"1%",alignSelf:"flex-end",flexDir:"column",children:[e.jsxs(o,{w:"100%",h:"3vw",align:"center",children:[e.jsx(n,{color:"white",children:Te?"Percentage allocation":"Historic Progress"}),e.jsx(j,{}),e.jsx(o,{children:e.jsx(Ss,{color:"white",onChange:s=>{ze(s.target.value)},value:v.dateRangeString,variant:"unstyled",placeholder:"Select range",size:"sm",children:["Last 30 days","Last 7 days","Last 3 days"].map(s=>e.jsx("option",{value:s,children:s},k()))})})]}),e.jsx(o,{alignItems:"flex-end",justifyContent:"flex-end",h:"90%",w:"100%",children:e.jsx(ys,{width:1180,height:250,options:Pe,data:Ne})})]})]}),e.jsxs(o,{w:"100%",pt:"40px",children:[e.jsx(n,{...M,children:"Last transactions"}),e.jsx(j,{}),e.jsx(d.Suspense,{fallback:e.jsx(S,{size:"sm"}),children:e.jsx(es,{label:"Sort",children:[1,2,3,4,5].map(s=>d.createElement(ss,{as:"button",...c,key:k()},e.jsx(n,{textAlign:"left",children:s})))})})]}),e.jsxs(o,{flexDir:"column",children:[m&&(m==null?void 0:m.length)===0&&e.jsxs(A,{...b,align:"center",children:[e.jsx(De,{animationData:is,style:{height:300}}),e.jsx(n,{pt:"3%",fontSize:"18px",fontWeight:"600",children:"You currently have no transactions"})]}),m&&(m==null?void 0:m.length)>0&&e.jsx(Re,{variant:"simple",children:e.jsx(_s,{children:m.map(s=>{var a,l;return e.jsxs(Ds,{children:[e.jsx(_,{w:"10%",children:e.jsxs(o,{flexDir:"column",children:[e.jsx(n,{children:T(s==null?void 0:s.updatedAt).format("MMM DD")}),e.jsx(n,{children:T(s==null?void 0:s.updatedAt).format("hh:ss a")}),e.jsx(n,{...f})]})}),e.jsx(_,{width:"5%",children:e.jsx(o,{borderRadius:"md",bg:"black",w:10,h:10,justifyContent:"center",alignItems:"center",transform:(s==null?void 0:s.transactionType)==="CREDIT"?"rotate(180deg)":"rotate(360deg)",children:e.jsx(rs,{src:Rs})})}),e.jsx(_,{w:"20%",children:e.jsxs(o,{flexDir:"column",alignItems:"flex-start",children:[e.jsxs(n,{children:[(s==null?void 0:s.transactionType)==="CREDIT"?"Received":"Spent"," ",r==null?void 0:r.rewardSymbol]}),e.jsx(n,{...f,children:"Completed"})]})}),e.jsx(_,{w:"12%",children:e.jsxs(A,{w:"98%",alignItems:"flex-start",children:[e.jsx(n,{alignSelf:"flex-end",color:"#999999",textAlign:"right",children:"From"}),e.jsx(n,{children:(l=(a=s==null?void 0:s.rewardRegistry)==null?void 0:a.reward)==null?void 0:l.contractAddress})]})}),e.jsx(_,{children:e.jsx(o,{flexDir:"column",children:e.jsxs(n,{...O,textAlign:"right",textColor:(s==null?void 0:s.transactionType)==="CREDIT"?"green":"red",children:[(s==null?void 0:s.transactionType)==="CREDIT"?parseFloat(s==null?void 0:s.amount):parseFloat(s==null?void 0:s.amount)*-1,r==null?void 0:r.rewardSymbol]})})})]},k())})})})]}),e.jsxs(o,{w:"100%",pt:"40px",children:[e.jsxs(n,{...M,children:["Offer from ",(me=h==null?void 0:h.data)==null?void 0:me.name]}),e.jsx(j,{}),e.jsx(d.Suspense,{fallback:e.jsx(S,{size:"sm"}),children:e.jsx(o,{children:e.jsx(L,{as:"button",...R,onClick:()=>{var s,a,l,x,p,t;return i(`${C}/dashboard/shop/${(s=h==null?void 0:h.data)==null?void 0:s.id}`,{state:{id:(l=(a=r==null?void 0:r.reward)==null?void 0:a.brand)==null?void 0:l.id,slug:(p=(x=r==null?void 0:r.reward)==null?void 0:x.brand)==null?void 0:p.slug,brandName:(t=r==null?void 0:r.reward)==null?void 0:t.brandName}})},children:e.jsx(n,{...c,children:"Visit shop"})})})})]}),e.jsx(as,{columns:[2,2,3,4,4],spacingX:"3.5%",w:"100%",children:e.jsxs(d.Suspense,{fallback:e.jsx(S,{size:"sm"}),children:[((je=g==null?void 0:g.data)==null?void 0:je.offers)&&((ye=(fe=g==null?void 0:g.data)==null?void 0:fe.offers)==null?void 0:ye.length)<1&&e.jsxs(ns,{children:[e.jsx(o,{w:"500px",h:"300px",children:e.jsx(De,{animationData:ts,loop:!0,autoplay:!0,width:50,height:70})}),e.jsxs(n,{children:["You have not synced any reward,"," ",e.jsx(n,{as:"button",onClick:Fe,decoration:"underline",children:"sync now"})]})]}),(Se=(we=g==null?void 0:g.data)==null?void 0:we.offers)==null?void 0:Se.map((s,a)=>{var l,x,p;return e.jsx(ks,{isLoaded:!0,productTitle:s.name,points:`${s==null?void 0:s.tokens}${(l=s.reward)==null?void 0:l.rewardSymbol}`,productSubtitle:(p=(x=s.product)==null?void 0:x.category)==null?void 0:p.name,price:s.originalPrice.toLocaleString(),isNew:T(T()).diff(s==null?void 0:s.createdAt,"days")<1,rest:{...s},i:a,bgImage:s.offerImages,onClick:()=>i(`${C}/productDetails/${s==null?void 0:s.offerCode}`)},k())})]})})]})}),e.jsx(d.Suspense,{fallback:e.jsx(S,{size:"sm"}),children:e.jsx(vs,{})})]})},Ts=()=>({root:{w:"100%",mt:"108px",pt:"3%",overflow:"hidden",pb:"3%"},root2:{bg:"#F2F2F2",h:"174px",w:"100%",borderRadius:"16px",p:"2%",overflow:"hidden"},nameStyles:{fontSize:["20px","20px"]},search:{w:"18%",h:"40px",background:"#F6F6F6",borderRadius:"53px",justify:"flex-start",align:"center",pl:"1%"},button:{w:{base:"18%",md:"6%"},color:"dark",borderWidth:.5,backgroundColor:"light",fontSize:"15px"},loadMore:{w:"132px",h:"32px",alignSelf:"center",py:"10px",borderRadius:"100px"},font:{fontSize:"16px",lineHeight:"22px",color:"#000000",marginBottom:"5px"},smallButton:{w:"95px",h:"42px",bg:"#000000",borderRadius:"100px"},smallButton1:{w:"124px",h:"42px",p:"10px 16px",border:"1px",borderColor:"#000000",borderRadius:"100px",color:"#000000"},font1:{fontSize:"14px",lineHeight:"17px",color:"#999999"},font2:{fontSize:"18px",lineHeight:"22px",color:"#FFFFFF"},font3:{fontSize:"16px",lineHeight:"22px",color:"#E71C1C"},graphBox:{bg:"dark",w:"100%",h:"35vw",borderRadius:"16px",p:"20px"}});export{Qs as default,Ts as useDashboardAssetsSingleBrand};
