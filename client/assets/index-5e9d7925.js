import{b as Ie,A as Me,c as Pe,a as Be,u as $e,r as i,d as q,Y as Ae,Z as Te,$ as Ne,a0 as _e,a1 as He,g as We,B as Ue,a2 as D,j as e,F as n,a3 as Ge,m as Qe,h as m,G as d,i as x,I as E,f as J,O as I,T as a,K as l,a4 as M,W as b,a5 as Xe,a6 as Ke,M as Ve,D as ee,C as g,X as oe,H as S,a7 as Ye,a8 as Ze,a9 as qe,Q as Je,U as te,n as ae,l as eo,S as oo,aa as to,ab as ao,ac as so,ad as no,ae as se,af as ro,z as io}from"./index-f182da16.js";import lo from"./index-82b0779d.js";import co from"./index-e8c96517.js";import xo from"./index-ebc560cc.js";import po from"./index-68157142.js";import ho from"./index-860d56d0.js";import{S as fo}from"./svg-6a9ec538.js";import{S as uo}from"./chunk-W7A7QDAK-7957edff.js";import"./index-68ef89d5.js";import"./countries-020c4914.js";import"./chunk-3RSXBRAN-7d4ccc22.js";const wo=()=>{var T,N,_,H,W,U,G,Q,X,K,V,Y,Z;const{root:ne,loadMore:re}=io();let k=Ie();const{id:c}=Me();Pe(),Be();let y=$e();const[F,u]=i.useState(!1),[C,P]=i.useState(!1);i.useState("Last 30 days");const[v,ie]=i.useState(1);i.useState([]);const[le,B]=i.useState(!1),[mo,ce]=i.useState(1),[de,$]=i.useState(!1),[p,xe]=i.useState([]),[A,pe]=i.useState(null),{token:O}=q(o=>o.authReducer);q(o=>o.productReducer);const[he]=Ae(),[fe]=Te(),{isOpen:ue,onOpen:we,onClose:z}=Ne(),{data:t,isLoading:w,error:bo}=_e({id:c},{refetchOnFocus:!0,skip:!c}),{data:R,isLoading:L,refetch:j}=He({brand_id:c},{refetchOnMountOrArgChange:!0,skip:!O}),{fontSmall:go,topCardStack:je,topCardHstack:me,imageSkel:be,tokenCenter:ge,iconFlex:Se,sendFlex:So,centerButton:ko,textReceive:yo,graphFlex:ke,overviewFlex:ye,modalContentFollow:Fe,overflowFlex:Ce,circleImage:ve,circleImage2:Oe,followCenter:ze,cancelCenter:Re}=jo();i.useEffect(()=>{Le()},[v]),i.useEffect(()=>{},[]);async function Le(){var o,s,h,f;if(c){$(!0),B(!1);try{const{data:r}=await We.get(`${Ue}/store/offer?page=${v}&limit=4&brandId=${c}`);((o=r==null?void 0:r.data)==null?void 0:o.offers.length)<1&&(B(!0),D(k,"No offer available",3e3,"top-right")),xe([...p,...(s=r==null?void 0:r.data)==null?void 0:s.offers]),ce((f=(h=r==null?void 0:r.data)==null?void 0:h.pagination)==null?void 0:f.totalPage)}catch(r){console.log(r,"GET_BRANDS_OFFERS_ERR")}finally{$(!1)}}}async function De(){O||y(`${d}/login`),u(!0),await he({brand_id:c}).then(async o=>{var s;await j(),((s=o==null?void 0:o.data)==null?void 0:s.statusCode)===200&&(await j(),D(k,"Brand Followed"))}).catch(o=>{console.log(o,"FollowBrandErr")}).finally(()=>{u(!1)})}async function Ee(){O||y(`${d}/login`),u(!0),await fe({brandId:c}).then(async o=>{var s;await j(),((s=o==null?void 0:o.data)==null?void 0:s.statusCode)===200&&(await j(),D(k,"Brand Unfollowed"))}).catch(o=>{console.log(o,"unFollowBrandERR")}).finally(()=>{u(!1)})}return e.jsxs(n,{flexDir:"column",children:[e.jsx(Ge,{}),e.jsx(Qe,{children:e.jsxs(m,{...ne,children:[e.jsx(lo,{breadcrumbs:[{name:"Home",link:`${d}/dashboard`},{name:"Shop",link:`${d}/dashboard/shop`},{name:(N=(T=t==null?void 0:t.data)==null?void 0:T.name)==null?void 0:N.replaceAll("_"," "),link:`${d}/dashboard/shop/${c}`,isCurrentPage:!0}]}),e.jsxs(m,{minH:C?"800px":"480px",...je,children:[e.jsxs(x,{...me,children:[e.jsxs(m,{w:"60%",h:"100%",p:"20px",children:[e.jsx(uo,{isLoaded:!w,w:"70px",h:"70px",children:e.jsx(E,{src:(_=t==null?void 0:t.data)==null?void 0:_.logo,objectFit:"contain",...be,fallbackSrc:J.appLogoPlaceholder,fallbackStrategy:"beforeLoadOrError"})}),e.jsx(I,{isLoaded:!w,children:e.jsx(a,{fontSize:"28px",w:"75%",noOfLines:2,children:(H=t==null?void 0:t.data)==null?void 0:H.slogan})}),e.jsx(l,{}),e.jsx(I,{isLoaded:!w,children:e.jsx(a,{fontSize:"16px",noOfLines:3,w:"95%",children:(W=t==null?void 0:t.data)==null?void 0:W.description})}),e.jsx(n,{children:R!=null&&R.data?e.jsxs(n,{className:"followFlex",children:[e.jsx(M,{name:"Following",isLoading:F||L,icon:e.jsx(b,{w:"25px",h:"25px",as:Xe}),rest:{w:"146px",fontSize:"16px",bg:"white",borderWidth:1,borderColor:"dark",color:"dark",className:"following"}}),e.jsx(M,{name:"Unfollow",isLoading:F||L,rest:{w:"146px",fontSize:"16px",bg:"red",borderWidth:1,borderColor:"light",color:"light",className:"unfollow"},onClick:Ee})]}):e.jsx(M,{name:"Follow",isLoading:F||L,icon:e.jsx(b,{w:"25px",h:"25px",as:Ke}),rest:{w:"100px",fontSize:"16px"},onClick:we})})]}),e.jsx(n,{w:"48%",h:"100%",children:e.jsx(I,{isLoaded:!w,children:e.jsx(fo,{img:(U=t==null?void 0:t.data)!=null&&U.banners?(G=t==null?void 0:t.data)==null?void 0:G.banners[0]:"https://cdn.cdnparenting.com/articles/2018/05/150311462-H.webp"})})})]}),e.jsxs(n,{w:"100%",p:"20px",color:"white",children:[e.jsxs(x,{w:"25%",h:"30px",justifyContent:"space-between",children:[e.jsxs(x,{color:"white",children:[e.jsx(Ve,{size:"sm",src:(Q=t==null?void 0:t.data)==null?void 0:Q.logo,mr:"2px"}),e.jsxs(n,{flexDir:"column",children:[e.jsx(a,{fontSize:"12px",children:(X=t==null?void 0:t.data)==null?void 0:X.name}),e.jsx(a,{fontSize:"10px",color:"#999999",children:"TKN"})]})]}),e.jsx(ee,{orientation:"vertical"}),e.jsxs(n,{flexDir:"column",children:[e.jsx(a,{fontSize:"12px",children:"14"}),e.jsx(a,{fontSize:"10px",color:"#999999",children:"Mark cap"})]}),e.jsx(ee,{orientation:"vertical"}),e.jsxs(n,{flexDir:"column",children:[e.jsx(a,{fontSize:"12px",children:"10,000,000"}),e.jsx(a,{fontSize:"10px",color:"#999999",children:"Total supply"})]})]}),e.jsx(l,{}),e.jsxs(g,{...ge,as:"button",onClick:()=>{P(!C)},children:[e.jsx(a,{fontSize:"12px",children:"Reward overview"}),e.jsx(b,{as:oe,...Se})]})]}),e.jsxs(m,{display:C?"flex":"none",children:[e.jsx(l,{}),e.jsx(l,{}),e.jsx(l,{}),e.jsx(l,{}),e.jsx(l,{}),e.jsx(l,{}),e.jsx(n,{...ke}),e.jsxs(n,{...ye,children:[e.jsxs(n,{w:"49%",flexDir:"column",children:[e.jsx(S,{fontSize:"16px",children:"Overview"}),e.jsx(a,{fontSize:"12px",py:"5px",children:"Bitcoin is the world’s first widely-adopted cryptocurrency. With Bitcoin, people can securely and directly send each other digital money on the internet."}),e.jsx(a,{fontSize:"12px",children:"Ethereum, like Bitcoin, is an open source project that is not owned or operated by a single individual. Anyone with an internet connection can run an Ethereum node or interact with the network. Popular Ethereum-based innovations include stable coins (which are pegged to the dollar by smart contract), decentralized finance apps (collectively known as DeFi), and other decentralized apps (or dapps). Ethereum, like Bitcoin, is an open source project that is not owned or operated by a single individual. Anyone with an internet connection can run an Ethereum node or interact with the network. Popular Ethereum-based innovations include stable coins (which are pegged to the dollar by smart contract), decentralized finance apps (collectively known as DeFi), and other decentralized apps (or dapps)."})]}),e.jsx(l,{}),e.jsxs(n,{w:"49%",flexDir:"column",children:[e.jsx(S,{fontSize:"16px",children:"How it works"}),e.jsx(a,{fontSize:"12px",py:"5px",children:"Unlike a bank’s ledger, the Bitcoin blockchain is distributed across the entire network. No company, country, or third party is in control of it; and anyone can become part of that network. There will only ever be 21 million bitcoin. This is digital money that cannot be inflated or manipulated in any way."}),e.jsx(S,{fontSize:"16px",children:"Resources"}),e.jsxs(a,{fontSize:"12px",py:"5px",children:["Official website:"," ",e.jsx(a,{as:"button",decoration:"underline",children:"https://bitcoin.com"})]}),e.jsxs(a,{fontSize:"12px",py:"5px",children:["Whitepaper:"," ",e.jsx(a,{as:"button",decoration:"underline",children:"https://arcteryx.com/newsroom/tokenconomis/whitepaper"})]})]})]})]})]}),e.jsxs(n,{w:"100%",borderRadius:"16px",justifyContent:"space-between",children:[e.jsxs(x,{children:[e.jsx(Ye,{filterOptions:(V=(K=p[0])==null?void 0:K.category)==null?void 0:V.filter_options}),e.jsx(Ze,{}),e.jsx(po,{}),e.jsx(ho,{})]}),e.jsx(x,{children:e.jsx(qe,{})})]}),e.jsx(Je,{columns:[2,2,3,4,4],w:"100%",spacingX:"3.5%",children:p==null?void 0:p.map((o,s)=>{var h,f,r;return e.jsx(co,{isLoaded:!0,productTitle:o.name,points:`${o==null?void 0:o.tokens}${(h=o.reward)==null?void 0:h.rewardSymbol}`,productSubtitle:(r=(f=o.product)==null?void 0:f.category)==null?void 0:r.name,price:o.originalPrice.toLocaleString(),isNew:te(te()).diff(o==null?void 0:o.createdAt,"days")<1,rest:{...o},i:s,bgImage:o.offerImages,onClick:()=>y(`${d}/productDetails/${o.offerCode}`)},ae())})}),!le&&e.jsx(g,{as:eo,...re,onClick:()=>{ie(v+1)},children:de?e.jsx(oo,{size:"sm"}):e.jsxs(e.Fragment,{children:["Load more ",e.jsx(b,{as:oe,ml:"5%"})]})})]})}),e.jsxs(to,{isCentered:!0,blockScrollOnMount:!0,scrollBehavior:"inside",isOpen:ue,size:"xl",onClose:z,motionPreset:"slideInBottom",closeOnOverlayClick:!1,children:[e.jsx(ao,{}),e.jsxs(so,{overflowY:"scroll",...Fe,children:[e.jsxs(S,{fontSize:"18px",children:["Follow ",(Y=t==null?void 0:t.data)==null?void 0:Y.name]}),e.jsx(no,{mt:"10px",children:(Z=se)==null?void 0:Z.map((o,s)=>e.jsxs(n,{w:se.length-s===1?"100%":"48%",flexDir:"column",as:"button",borderColor:A===s?"dark":"#0000001C",...Ce,onClick:()=>pe(s),children:[e.jsxs(x,{w:"100%",children:[e.jsx(ro,{bg:"black",p:"5px",children:e.jsx(E,{src:o.icon,...ve,objectFit:"contain"})}),e.jsx(l,{}),A===s&&e.jsx(E,{...Oe,src:J.blackCheckMark})]}),e.jsx(a,{my:"5px",children:o.title}),e.jsx(a,{color:"#999999",textAlign:"left",children:o.desc})]},ae()))}),e.jsxs(n,{mt:"24px",flexDir:"column",children:[e.jsx(g,{as:"button",...ze,onClick:()=>{De(),z()},children:e.jsx(a,{children:"Follow"})}),e.jsx(g,{as:"button",...Re,onClick:z,children:e.jsx(a,{children:"Cancel"})})]})]})]}),e.jsx(xo,{})]})},Po=wo,jo=()=>({fontSmall:{},topCardStack:{bg:"dark",borderRadius:"16px",overflow:"hidden",transition:"all 0.5s",w:"100%"},topCardHstack:{bg:"grey",w:"100%",borderRadius:"16px",overflow:"hidden",h:"400px"},imageSkel:{h:"70px",w:"70px"},tokenCenter:{bg:"white",px:"10px",py:"5px",borderRadius:"16px",transition:"all 0.3s ease-in-out",color:"dark"},iconFlex:{alignSelf:"center",justifySelf:"center"},sendFlex:{w:"20%",bg:"black",borderRadius:"100px",borderWidth:.5,borderColor:"white",color:"white",align:"center",h:"100%"},centerButton:{w:"50%",bg:"white",borderRadius:"100px",h:"100%"},textReceive:{fontSize:["16px","16px","16px","16px","16px"],color:"black"},graphFlex:{w:"96%",borderRadius:"16px",bg:"#262626",alignSelf:"center",px:"20px"},overviewFlex:{w:"100%",color:"white",px:"20px",py:"15px",pb:"20px"},modalContentFollow:{w:{base:"90vw",md:"50vw"},p:"2%",borderRadius:0},overflowFlex:{borderRadius:"5px",p:"15px",alignContent:"flex-start",borderWidth:"1px"},circleImage:{h:"25px",w:"25px"},circleImage2:{w:"20px",h:"20px"},followCenter:{bg:"black",h:"50px",color:"light"},cancelCenter:{bg:"light",h:"50px",mt:"8px",border:"1px solid black",color:"dark"}});export{Po as default};
