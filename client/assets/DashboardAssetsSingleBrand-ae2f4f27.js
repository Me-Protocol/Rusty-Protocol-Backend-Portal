import{bo as Me,bw as I,bz as Be,bu as We,j as e,bx as z,by as Ge,r as d,_ as E,u as Ve,a as He,K as Qe,c as Xe,d as O,co as Ye,az as qe,Q as Ke,O as De,F as n,S,m as Ue,h as v,G as D,T as t,w as j,i as N,ah as L,C as Je,q as T,aO as Ze,aP as es,z as _e,y as k,I as ss,x as rs,V as as,A as ts,cp as ns,b6 as os,b7 as ls}from"./index-4d742258.js";import{e as ds}from"./empty-fb04a4d6.js";import{S as is}from"./index-ff082035.js";import{g as Re,C as cs,a as xs,L as hs,P as ps,b as bs,p as gs,c as ms,i as us,d as js,e as fs,f as ws}from"./random-color-f64898ee.js";import{S as ys}from"./chunk-3RSXBRAN-015cd4eb.js";var[Ss,$]=Me({name:"TableStylesContext",errorMessage:`useTableStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Table />" `}),Ce=I((i,b)=>{const c=Be("Table",i),{className:f,layout:P,...C}=We(i);return e.jsx(Ss,{value:c,children:e.jsx(z.table,{ref:b,__css:{tableLayout:P,...c.table},className:Ge("chakra-table",f),...C})})});Ce.displayName="Table";var Ds=I((i,b)=>{const c=$();return e.jsx(z.tr,{...i,ref:b,__css:c.tr})}),_s=I((i,b)=>{const c=$();return e.jsx(z.tbody,{...i,ref:b,__css:c.tbody})}),R=I(({isNumeric:i,...b},c)=>{const f=$();return e.jsx(z.td,{...b,ref:c,__css:f.td,"data-is-numeric":i})});const Rs="/assets/sentarrow-195623c8.svg",Cs=d.lazy(()=>E(()=>import("./index-1962ba8e.js"),["assets/index-1962ba8e.js","assets/index-4d742258.js","assets/index-ed5220eb.css","assets/index-680b3184.js","assets/countries-020c4914.js","assets/chunk-3RSXBRAN-015cd4eb.js"])),As=d.lazy(()=>E(()=>import("./index-4213153d.js"),["assets/index-4213153d.js","assets/index-4d742258.js","assets/index-ed5220eb.css"])),vs=d.lazy(()=>E(()=>import("./index-4d742258.js").then(i=>i.cW),["assets/index-4d742258.js","assets/index-ed5220eb.css"])),Ls=d.lazy(()=>E(()=>import("./index-2b5b9318.js"),["assets/index-2b5b9318.js","assets/index-4d742258.js","assets/index-ed5220eb.css"])),Gs=()=>{var V,H,Q,X,Y,q,K,U,J,Z,ee,se,re,ae,te,ne,oe,le,de,ie,ce,xe,he,pe,be,ge,me,ue,je,fe,we,ye,Se;let i=Ve();He();const{root:b,font:c,font1:f,font3:P,smallButton1:C,root2:Ae,nameStyles:M,graphBox:ve}=Ts(),{id:w}=Qe(),{state:r}=Xe(),[Le,Te]=d.useState([]);O(s=>s==null?void 0:s.authReducer);const{reward_type_product:F}=O(s=>s.productReducer),{data:y}=Ye({startDate:new Date("05-06-2022").toISOString(),endDate:new Date("11-11-2023").toISOString()},{refetchOnMountOrArgChange:!0}),{user_data:g,my_debit_credit:ks,my_rewards:Is,my_rewards_loading:zs,my_debit_credit_single:Es}=O(s=>s==null?void 0:s.userReducer),_=y&&Re(y==null?void 0:y.data)[w],[ke,Ps]=d.useState(!1),{data:m,isLoading:Fs}=qe({page:1,limit:4,brandId:w},{refetchOnMountOrArgChange:!0,skip:!w}),{data:h,error:Os}=Ke({id:w},{refetchOnFocus:!0,skip:!w}),B={"Last 7 days":{label:"Last 7 days",millisecondsAgo:60*60*24*7*1e3},"Last 30 days":{label:"Last 30 days",millisecondsAgo:60*60*24*30*1e3},"Last 3 days":{label:"Last 3 days",millisecondsAgo:60*60*24*3*1e3}},W=s=>{const a=Date.now()-s;return new Date(a).toISOString()},Ie={startDate:W(B["Last 7 days"].millisecondsAgo),endDate:new Date().toISOString(),dateRangeString:"Last 7 days"},[A,ze]=d.useState(Ie),Ee=s=>{console.log("heyooo",s);const a=B[s].millisecondsAgo;ze({...A,startDate:W(a),dateRangeString:s})},Pe=async()=>{var x,p;if(!((x=g==null?void 0:g.customer)!=null&&x.walletAddress))return;const{data:s}=await ns.get_account_detail({address:(p=g==null?void 0:g.customer)==null?void 0:p.walletAddress}),a=[];for(const o in s.result.balance)a.push({contractAddress:os(o),balance:ls(s.result.balance[o])});const l=F==null?void 0:F.map(o=>{const Ne=a==null?void 0:a.find($e=>$e.contractAddress===(o==null?void 0:o.contractAddress));return{...o,balance:Ne}});Te(l==null?void 0:l.filter(o=>o.balance))};d.useEffect(()=>{Pe()},[]),De(),De(),cs.register(xs,hs,ps,bs,gs,ms,us,js);const Fe={type:"line",responsive:!0,stepped:"middle",elements:{point:{radius:0,hitRadius:10,hoverRadius:4,hoverBorderWidth:3}},scales:{x:{ticks:{autoSkip:!0},grid:{display:!1}},y:{min:0,ticks:{autoSkip:!0,maxTicksLimit:10},border:{display:!1},grid:{color:"#99999935"}}},plugins:{legend:{display:!1},title:{display:!1,text:"Chart.js Line Chart"}}};new Date().getMonth();const G=ws(),Oe=_?{labels:[new Date(A.startDate).toDateString(),new Date(A.endDate).toDateString()],datasets:[{data:_.reduce((s,a,l)=>{const x=a.transactionType==="CREDIT"?parseFloat(a.amount):-parseFloat(a.amount),o=((s==null?void 0:s.length)===0?0:s[(s==null?void 0:s.length)-1])+x;return s.push(o),s},[]),fill:!1,label:(Q=(H=(V=_[0])==null?void 0:V.rewardRegistry)==null?void 0:H.reward)==null?void 0:Q.rewardName,borderColor:`#${((q=(Y=(X=_[0])==null?void 0:X.rewardRegistry.reward)==null?void 0:Y.brand)==null?void 0:q.color)||G}`,backgroundColor:`#${((J=(U=(K=_[0])==null?void 0:K.rewardRegistry.reward)==null?void 0:U.brand)==null?void 0:J.brandPrimaryColor)||G}`,borderWidth:2}]}:{labels:[],datasets:[]};let u=Re(y==null?void 0:y.data)[r.brandId]||[];return e.jsxs(n,{flexDir:"column",children:[e.jsx(d.Suspense,{fallback:e.jsx(S,{size:"sm"}),children:e.jsx(vs,{})}),e.jsx(Ue,{children:e.jsxs(v,{...b,children:[e.jsx(d.Suspense,{fallback:e.jsx(S,{size:"sm"}),children:e.jsx(As,{breadcrumbs:[{name:"Home",link:`${D}/dashboard`},{name:"Assets",link:`${D}/dashboard/dashboard-my-assets`},{name:(ee=(Z=h==null?void 0:h.data)==null?void 0:Z.name)==null?void 0:ee.replaceAll("_"," "),link:`${D}/dashboard/dashboard-my-assets/${w}`,isCurrentPage:!0}]})}),e.jsxs(n,{...Ae,children:[e.jsxs(n,{flexDir:"column",children:[e.jsxs(t,{...c,children:["Learn more about your personalized ",r.rewardName," card"]}),e.jsx(j,{}),e.jsx(t,{...f,mb:"10px",children:(re=(se=r==null?void 0:r.reward)==null?void 0:se.brand)==null?void 0:re.description}),e.jsx(N,{children:e.jsx(L,{as:"button",...C,onClick:()=>{var s,a,l,x,p,o;return i(`${D}/dashboard/shop/${(s=h==null?void 0:h.data)==null?void 0:s.id}`,{state:{id:(l=(a=r==null?void 0:r.reward)==null?void 0:a.brand)==null?void 0:l.id,slug:(p=(x=r==null?void 0:r.reward)==null?void 0:x.brand)==null?void 0:p.slug,brandName:(o=r==null?void 0:r.reward)==null?void 0:o.brandName}})},children:e.jsx(t,{...c,children:"Learn more"})})})]}),e.jsx(j,{}),e.jsx(L,{style:{transform:"rotate(-35deg) translateX(60px) translateY(40px)"},children:e.jsx(is,{logo:((ae=r==null?void 0:r.brand)==null?void 0:ae.white_logo)||((te=r==null?void 0:r.brand)==null?void 0:te.logo),bg:(oe=(ne=r==null?void 0:r.reward)==null?void 0:ne.brand)!=null&&oe.color?`#${(de=(le=r==null?void 0:r.reward)==null?void 0:le.brand)==null?void 0:de.color}`:"#363636",userName:`${(ie=g==null?void 0:g.customer)==null?void 0:ie.name}`})})]}),e.jsxs(n,{...ve,flexDir:"column",children:[e.jsxs(N,{h:"50px",w:"100%",children:[e.jsx(L,{borderColor:`#${(xe=(ce=r==null?void 0:r.reward)==null?void 0:ce.brand)==null?void 0:xe.color}`,borderWidth:"2px",p:"3px",borderRadius:50,children:e.jsx(Je,{as:"img",objectFit:"contain",src:((he=r==null?void 0:r.brand)==null?void 0:he.white_logo)||((pe=r==null?void 0:r.brand)==null?void 0:pe.logo),w:"50px",h:"50px",borderRadius:"70px"})}),e.jsx(t,{color:"white",fontSize:"18px",children:(be=r==null?void 0:r.reward)==null?void 0:be.rewardName}),e.jsx(j,{})]}),e.jsxs(N,{h:"50px",w:"100%",mt:"20px",children:[e.jsxs(v,{children:[e.jsxs(t,{fontSize:["14px","14px","14px","18px","16px"],color:"white",children:[(me=(ge=Le.filter(s=>{var a;return((a=s==null?void 0:s.brand)==null?void 0:a.id)===w}))==null?void 0:ge.map(s=>{var a;return Number((a=s==null?void 0:s.balance)==null?void 0:a.balance)}))==null?void 0:me.reduce((s,a)=>s+a,0).toLocaleString()," ","pts"]}),e.jsx(t,{fontSize:"14px",color:"#999999C5",children:"Balance"})]}),e.jsx(j,{})]}),e.jsx(j,{}),e.jsxs(n,{bg:"#262626",borderRadius:"8px",h:"70%",w:"100%",p:"1%",alignSelf:"flex-end",flexDir:"column",children:[e.jsxs(n,{w:"100%",h:"3vw",align:"center",children:[e.jsx(t,{color:"white",children:ke?"Percentage allocation":"Historic Progress"}),e.jsx(j,{}),e.jsx(n,{children:e.jsx(ys,{color:"white",onChange:s=>{Ee(s.target.value)},value:A.dateRangeString,variant:"unstyled",placeholder:"Select range",size:"sm",children:["Last 30 days","Last 7 days","Last 3 days"].map(s=>e.jsx("option",{value:s,children:s},T()))})})]}),e.jsx(n,{alignItems:"flex-end",justifyContent:"flex-end",h:"90%",w:"100%",children:e.jsx(fs,{width:1180,height:250,options:Fe,data:Oe})})]})]}),e.jsxs(n,{w:"100%",pt:"40px",children:[e.jsx(t,{...M,children:"Last transactions"}),e.jsx(j,{}),e.jsx(d.Suspense,{fallback:e.jsx(S,{size:"sm"}),children:e.jsx(Ze,{label:"Sort",children:[1,2,3,4,5].map(s=>d.createElement(es,{as:"button",...c,key:T()},e.jsx(t,{textAlign:"left",children:s})))})})]}),e.jsxs(n,{flexDir:"column",children:[u&&(u==null?void 0:u.length)===0&&e.jsxs(v,{...b,align:"center",children:[e.jsx(_e,{animationData:ds,style:{height:300}}),e.jsx(t,{pt:"3%",fontSize:"18px",fontWeight:"600",children:"You currently have no transactions"})]}),u&&(u==null?void 0:u.length)>0&&e.jsx(Ce,{variant:"simple",children:e.jsx(_s,{children:u.map(s=>{var a,l;return e.jsxs(Ds,{children:[e.jsx(R,{w:"10%",children:e.jsxs(n,{flexDir:"column",children:[e.jsx(t,{children:k(s==null?void 0:s.updatedAt).format("MMM DD")}),e.jsx(t,{children:k(s==null?void 0:s.updatedAt).format("hh:ss a")}),e.jsx(t,{...f})]})}),e.jsx(R,{width:"5%",children:e.jsx(n,{borderRadius:"md",bg:"black",w:10,h:10,justifyContent:"center",alignItems:"center",transform:(s==null?void 0:s.transactionType)==="CREDIT"?"rotate(180deg)":"rotate(360deg)",children:e.jsx(ss,{src:Rs})})}),e.jsx(R,{w:"20%",children:e.jsxs(n,{flexDir:"column",alignItems:"flex-start",children:[e.jsxs(t,{children:[(s==null?void 0:s.transactionType)==="CREDIT"?"Received":"Spent"," ",r==null?void 0:r.rewardSymbol]}),e.jsx(t,{...f,children:"Completed"})]})}),e.jsx(R,{w:"12%",children:e.jsxs(v,{w:"98%",alignItems:"flex-start",children:[e.jsx(t,{alignSelf:"flex-end",color:"#999999",textAlign:"right",children:"From"}),e.jsx(t,{children:(l=(a=s==null?void 0:s.rewardRegistry)==null?void 0:a.reward)==null?void 0:l.contractAddress})]})}),e.jsx(R,{children:e.jsx(n,{flexDir:"column",children:e.jsxs(t,{...P,textAlign:"right",textColor:(s==null?void 0:s.transactionType)==="CREDIT"?"green":"red",children:[(s==null?void 0:s.transactionType)==="CREDIT"?parseFloat(s==null?void 0:s.amount):parseFloat(s==null?void 0:s.amount)*-1,r==null?void 0:r.rewardSymbol]})})})]},T())})})})]}),e.jsxs(n,{w:"100%",pt:"40px",children:[e.jsxs(t,{...M,children:["Offer from ",(ue=h==null?void 0:h.data)==null?void 0:ue.name]}),e.jsx(j,{}),e.jsx(d.Suspense,{fallback:e.jsx(S,{size:"sm"}),children:e.jsx(n,{children:e.jsx(L,{as:"button",...C,onClick:()=>{var s,a,l,x,p,o;return i(`${D}/dashboard/shop/${(s=h==null?void 0:h.data)==null?void 0:s.id}`,{state:{id:(l=(a=r==null?void 0:r.reward)==null?void 0:a.brand)==null?void 0:l.id,slug:(p=(x=r==null?void 0:r.reward)==null?void 0:x.brand)==null?void 0:p.slug,brandName:(o=r==null?void 0:r.reward)==null?void 0:o.brandName}})},children:e.jsx(t,{...c,children:"Visit shop"})})})})]}),e.jsx(rs,{columns:[2,2,3,4,4],spacingX:"3.5%",w:"100%",children:e.jsxs(d.Suspense,{fallback:e.jsx(S,{size:"sm"}),children:[e.jsx(n,{w:"100%",alignSelf:"center",children:((je=m==null?void 0:m.data)==null?void 0:je.offers)&&((we=(fe=m==null?void 0:m.data)==null?void 0:fe.offers)==null?void 0:we.length)<1&&e.jsx(as,{w:"100%",children:e.jsx(n,{w:"500px",h:"300px",children:e.jsx(_e,{animationData:ts,loop:!0,autoplay:!0,width:50,height:70})})})}),(Se=(ye=m==null?void 0:m.data)==null?void 0:ye.offers)==null?void 0:Se.map((s,a)=>{var l,x,p;return e.jsx(Ls,{isLoaded:!0,productTitle:s.name,points:`${s==null?void 0:s.tokens}${(l=s.reward)==null?void 0:l.rewardSymbol}`,productSubtitle:(p=(x=s.product)==null?void 0:x.category)==null?void 0:p.name,price:s.originalPrice.toLocaleString(),isNew:k(k()).diff(s==null?void 0:s.createdAt,"days")<1,rest:{...s},i:a,bgImage:s.offerImages,onClick:()=>i(`${D}/productDetails/${s==null?void 0:s.offerCode}`)},T())})]})})]})}),e.jsx(d.Suspense,{fallback:e.jsx(S,{size:"sm"}),children:e.jsx(Cs,{})})]})},Ts=()=>({root:{w:"100%",mt:"108px",pt:"3%",overflow:"hidden",pb:"3%"},root2:{bg:"#F2F2F2",h:"174px",w:"100%",borderRadius:"16px",p:"2%",overflow:"hidden"},nameStyles:{fontSize:["20px","20px"]},search:{w:"18%",h:"40px",background:"#F6F6F6",borderRadius:"53px",justify:"flex-start",align:"center",pl:"1%"},button:{w:{base:"18%",md:"6%"},color:"dark",borderWidth:.5,backgroundColor:"light",fontSize:"15px"},loadMore:{w:"132px",h:"32px",alignSelf:"center",py:"10px",borderRadius:"100px"},font:{fontSize:"16px",lineHeight:"22px",color:"#000000",marginBottom:"5px"},smallButton:{w:"95px",h:"42px",bg:"#000000",borderRadius:"100px"},smallButton1:{w:"124px",h:"42px",p:"10px 16px",border:"1px",borderColor:"#000000",borderRadius:"100px",color:"#000000"},font1:{fontSize:"14px",lineHeight:"17px",color:"#999999"},font2:{fontSize:"18px",lineHeight:"22px",color:"#FFFFFF"},font3:{fontSize:"16px",lineHeight:"22px",color:"#E71C1C"},graphBox:{bg:"dark",w:"100%",h:"35vw",borderRadius:"16px",p:"20px"}});export{Gs as default,Ts as useDashboardAssetsSingleBrand};
