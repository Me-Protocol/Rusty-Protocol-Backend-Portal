import{b as Le,K as ze,c as De,a as Ee,u as Me,r as l,d as Z,M as $e,N as Pe,O as Ae,Q as Ne,U as _e,g as Te,B as He,W as I,j as e,F as n,X as Ge,m as Ue,h as m,G as x,i as j,I as L,f as q,v as z,T as r,w as i,Y as D,E as b,Z as We,$ as Qe,a0 as Xe,C as S,J as ee,H as g,x as Ve,y as oe,n as se,l as Ye,S as Be,a1 as Je,a2 as Ke,a3 as Ze,a4 as qe,a5 as ae,a6 as eo,t as oo}from"./index-9a3a3312.js";import so from"./index-506bb3b0.js";import ao from"./index-ff4d1db3.js";import to from"./index-637da239.js";import{S as ro}from"./svg-7d13b208.js";import{D as lo}from"./index-98d72f9e.js";import{S as no}from"./chunk-W7A7QDAK-e2318e66.js";import"./index-344c1f27.js";import"./countries-020c4914.js";import"./chunk-3RSXBRAN-b1fa3477.js";import"./index.esm-2b5ddb28.js";import"./index-ceb9cbc1.js";import"./index-187faf92.js";import"./ResizeObserver.es-f4289e8a.js";const io=()=>{var _,T,H,G,U,W,Q,X,V,Y,B,J,K;const{root:te,loadMore:re}=oo();let k=Le();const{id:c}=ze();De(),Ee();let C=Me();const[xo,h]=l.useState(!1),[F,E]=l.useState(!1);l.useState("Last 30 days");const[y,le]=l.useState(1),[ne,po]=l.useState([]),[ie,M]=l.useState(!1),[fo,ce]=l.useState(1),[$,P]=l.useState(!1),[d,de]=l.useState([]),[A,xe]=l.useState(null),{token:O}=Z(s=>s.authReducer);Z(s=>s.productReducer);const[pe]=$e(),[fe]=Pe(),{isOpen:he,onOpen:ho,onClose:v}=Ae(),{data:o,isLoading:u,error:uo}=Ne({id:c},{refetchOnFocus:!0,skip:!c}),{data:R,isLoading:wo,refetch:w}=_e({brand_id:c},{refetchOnMountOrArgChange:!0,skip:!O}),{fontSmall:mo,topCardStack:ue,topCardHstack:we,imageSkel:me,tokenCenter:je,iconFlex:be,sendFlex:jo,centerButton:bo,textReceive:So,graphFlex:Se,overviewFlex:ge,modalContentFollow:ke,overflowFlex:Ce,circleImage:Fe,circleImage2:ye,followCenter:Oe,cancelCenter:ve}=co();l.useEffect(()=>{Re()},[y]),l.useEffect(()=>{},[]);async function Re(){var s,a,p,f;if(c){P(!0),M(!1);try{const{data:t}=await Te.get(`${He}/store/offer?page=${y}&limit=4&brandId=${c}`);((s=t==null?void 0:t.data)==null?void 0:s.offers.length)<1&&(M(!0),I(k,"No offer available",3e3,"top-right")),de([...d,...(a=t==null?void 0:t.data)==null?void 0:a.offers]),ce((f=(p=t==null?void 0:t.data)==null?void 0:p.pagination)==null?void 0:f.totalPage)}catch(t){console.log(t,"GET_BRANDS_OFFERS_ERR")}finally{P(!1)}}}async function N(){O||C(`${x}/login`),h(!0),await pe({brand_id:c}).then(async s=>{var a;await w(),((a=s==null?void 0:s.data)==null?void 0:a.statusCode)===200&&(await w(),I(k,"Brand Followed"))}).catch(s=>{console.log(s,"FollowBrandErr")}).finally(()=>{h(!1)})}async function Ie(){O||C(`${x}/login`),h(!0),await fe({brandId:c}).then(async s=>{var a;await w(),((a=s==null?void 0:s.data)==null?void 0:a.statusCode)===200&&(await w(),I(k,"Brand Unfollowed"))}).catch(s=>{console.log(s,"unFollowBrandERR")}).finally(()=>{h(!1)})}return e.jsxs(n,{flexDir:"column",children:[e.jsx(Ge,{}),e.jsx(Ue,{children:e.jsxs(m,{...te,children:[e.jsx(so,{breadcrumbs:[{name:"Home",link:`${x}/dashboard`},{name:"Shop",link:`${x}/dashboard/shop`},{name:(T=(_=o==null?void 0:o.data)==null?void 0:_.name)==null?void 0:T.replaceAll("_"," "),link:`${x}/dashboard/shop/${c}`,isCurrentPage:!0}]}),e.jsxs(m,{minH:F?"700px":"480px",...ue,children:[e.jsxs(j,{...we,children:[e.jsxs(m,{w:"60%",h:"100%",p:"20px",children:[e.jsx(no,{isLoaded:!u,w:"70px",h:"70px",children:e.jsx(L,{src:(H=o==null?void 0:o.data)==null?void 0:H.logo,objectFit:"contain",...me,fallbackSrc:q.appLogoPlaceholder,fallbackStrategy:"beforeLoadOrError"})}),e.jsx(z,{isLoaded:!u,children:e.jsx(r,{fontSize:"28px",w:"75%",noOfLines:2,children:(G=o==null?void 0:o.data)==null?void 0:G.slogan})}),e.jsx(i,{}),e.jsx(z,{isLoaded:!u,children:e.jsx(r,{fontSize:"16px",noOfLines:3,w:"95%",children:(U=o==null?void 0:o.data)==null?void 0:U.description})}),e.jsx(n,{children:R!=null&&R.data?e.jsxs(n,{className:"followFlex",children:[e.jsx(D,{name:"Following",icon:e.jsx(b,{w:"25px",h:"25px",as:We}),rest:{w:"146px",fontSize:"16px",bg:"white",borderWidth:1,borderColor:"dark",color:"dark",className:"following"}}),e.jsx(D,{name:"Unfollow",rest:{w:"146px",fontSize:"16px",bg:"red",borderWidth:1,borderColor:"light",color:"light",className:"unfollow"},onClick:Ie})]}):e.jsx(D,{name:"Follow",icon:e.jsx(b,{w:"25px",h:"25px",as:Qe}),rest:{w:"100px",fontSize:"16px"},onClick:N})})]}),e.jsx(n,{w:"48%",h:"100%",children:e.jsx(z,{isLoaded:!u,children:e.jsx(ro,{img:(W=o==null?void 0:o.data)!=null&&W.banners?(Q=o==null?void 0:o.data)==null?void 0:Q.banners[0]:"https://cdn.cdnparenting.com/articles/2018/05/150311462-H.webp"})})})]}),e.jsxs(n,{w:"100%",p:"20px",color:"white",children:[e.jsx(j,{w:"25%",h:"30px",justifyContent:"space-between",children:e.jsxs(j,{color:"white",children:[e.jsx(Xe,{size:"sm",src:(X=o==null?void 0:o.data)==null?void 0:X.logo,mr:"2px"}),e.jsxs(n,{flexDir:"column",children:[e.jsx(r,{fontSize:"12px",children:(V=o==null?void 0:o.data)==null?void 0:V.name}),e.jsx(r,{fontSize:"10px",color:"#999999",textTransform:"capitalize",children:d&&d.length>0&&((Y=d[0].reward)==null?void 0:Y.rewardSymbol)||""})]})]})}),e.jsx(i,{}),e.jsxs(S,{...je,as:"button",onClick:()=>{E(!F)},children:[e.jsx(r,{fontSize:"12px",children:"Reward overview"}),e.jsx(b,{as:ee,...be})]})]}),e.jsxs(m,{display:F?"flex":"none",children:[e.jsx(i,{}),e.jsx(i,{}),e.jsx(i,{}),e.jsx(i,{}),e.jsx(i,{}),e.jsx(i,{}),e.jsx(n,{...Se}),e.jsxs(n,{flexDir:["column","row"],...ge,children:[e.jsxs(n,{w:["100%","49%"],flexDir:"column",children:[e.jsx(g,{fontSize:"16px",children:"Overview"}),e.jsx(r,{fontSize:"12px",py:"5px",children:o==null?void 0:o.data.description})]}),e.jsx(i,{}),e.jsxs(n,{w:["100%","49%"],flexDir:"column",children:[e.jsx(g,{fontSize:"16px",children:"How it works"}),e.jsx(r,{fontSize:"12px",py:"5px",children:"Enjoy the ease of redeeming your rewards with desired offers. Our user-friendly interface ensures a hassle-free experience every time you claim your benefits."}),(o==null?void 0:o.data.website)&&e.jsx(g,{fontSize:"16px",children:"Resources"}),((B=o==null?void 0:o.data)==null?void 0:B.website)&&e.jsxs(r,{fontSize:"12px",py:"5px",children:["Official website:"," ",e.jsx(r,{as:"button",decoration:"underline",children:o==null?void 0:o.data.website})]})]})]})]})]}),e.jsx(Ve,{display:["none","grid"],columns:[1,2,3,4,4],w:"100%",spacingX:"3.5%",children:d==null?void 0:d.map((s,a)=>{var p,f,t;return e.jsx(ao,{isLoaded:!0,productTitle:s.name,points:`${s==null?void 0:s.tokens}${(p=s.reward)==null?void 0:p.rewardSymbol}`,productSubtitle:(t=(f=s.product)==null?void 0:f.category)==null?void 0:t.name,price:s.originalPrice.toLocaleString(),isNew:oe(oe()).diff(s==null?void 0:s.createdAt,"days")<1,rest:{...s},i:a,bgImage:s.offerImages,onClick:()=>C(`${x}/product-details/${s.offerCode}`)},se())})}),e.jsx(lo,{loadedOffers:ne,offersFetching:$}),!ie&&e.jsx(S,{as:Ye,...re,onClick:()=>{le(y+1)},children:$?e.jsx(Be,{size:"sm"}):e.jsxs(e.Fragment,{children:["Load more ",e.jsx(b,{as:ee,ml:"5%"})]})})]})}),e.jsxs(Je,{isCentered:!0,blockScrollOnMount:!0,scrollBehavior:"inside",isOpen:he,size:"xl",onClose:v,motionPreset:"slideInBottom",closeOnOverlayClick:!1,children:[e.jsx(Ke,{}),e.jsxs(Ze,{overflowY:"scroll",...ke,children:[e.jsxs(g,{fontSize:"18px",children:["Follow ",(J=o==null?void 0:o.data)==null?void 0:J.name]}),e.jsx(qe,{mt:"10px",children:(K=ae)==null?void 0:K.map((s,a)=>e.jsxs(n,{w:ae.length-a===1?"100%":"48%",flexDir:"column",as:"button",borderColor:A===a?"dark":"#0000001C",...Ce,onClick:()=>xe(a),children:[e.jsxs(j,{w:"100%",children:[e.jsx(eo,{bg:"black",p:"5px",children:e.jsx(L,{src:s.icon,...Fe,objectFit:"contain"})}),e.jsx(i,{}),A===a&&e.jsx(L,{...ye,src:q.blackCheckMark})]}),e.jsx(r,{my:"5px",children:s.title}),e.jsx(r,{color:"#999999",textAlign:"left",children:s.desc})]},se()))}),e.jsxs(n,{mt:"24px",flexDir:"column",children:[e.jsx(S,{as:"button",...Oe,onClick:()=>{N(),v()},children:e.jsx(r,{children:"Follow"})}),e.jsx(S,{as:"button",...ve,onClick:v,children:e.jsx(r,{children:"Cancel"})})]})]})]}),e.jsx(to,{})]})},$o=io,co=()=>({fontSmall:{},topCardStack:{bg:"dark",borderRadius:"16px",overflow:"hidden",transition:"all 0.5s",w:"100%"},topCardHstack:{bg:"grey",w:"100%",borderRadius:"16px",overflow:"hidden",h:"400px"},imageSkel:{h:"70px",w:"70px"},tokenCenter:{bg:"white",px:"10px",py:"5px",borderRadius:"16px",transition:"all 0.3s ease-in-out",color:"dark"},iconFlex:{alignSelf:"center",justifySelf:"center"},sendFlex:{w:"20%",bg:"black",borderRadius:"100px",borderWidth:.5,borderColor:"white",color:"white",align:"center",h:"100%"},centerButton:{w:"50%",bg:"white",borderRadius:"100px",h:"100%"},textReceive:{fontSize:["16px","16px","16px","16px","16px"],color:"black"},graphFlex:{w:"96%",borderRadius:"16px",bg:"#262626",alignSelf:"center",px:"20px"},overviewFlex:{w:"100%",color:"white",px:"20px",py:"15px",pb:"20px"},modalContentFollow:{w:{base:"90vw",md:"50vw"},p:"2%",borderRadius:0},overflowFlex:{borderRadius:"5px",p:"15px",alignContent:"flex-start",borderWidth:"1px"},circleImage:{h:"25px",w:"25px"},circleImage2:{w:"20px",h:"20px"},followCenter:{bg:"black",h:"50px",color:"light"},cancelCenter:{bg:"light",h:"50px",mt:"8px",border:"1px solid black",color:"dark"}});export{$o as default};