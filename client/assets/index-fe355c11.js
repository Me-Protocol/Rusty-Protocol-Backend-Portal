import{u as G,b as z,A as M,c as X,r,aj as U,d as W,g as S,B as j,a2 as E,j as t,F as V,a3 as H,m as w,h as Q,i as L,W as y,ah as Y,T as F,P as q,Q as R,U as u,G as _,y as $,S as b,C as J,l as K,X as Z}from"./index-f182da16.js";import C from"./index-e8c96517.js";import ss from"./index-88a31c73.js";const ts=()=>{let x=G();const{root:A,loadMore:P}=as();let g=z();M();const{state:e}=X();r.useState([]);const[n,m]=r.useState([]);r.useState(!1);const[d,T]=r.useState(1),[k,f]=r.useState(!1),[os,v]=r.useState(1),[h,p]=r.useState(!1),[I,rs]=r.useState(U.POPULAR),{token:D,session_id:B}=W(s=>s==null?void 0:s.authReducer);r.useEffect(()=>{e?N():O()},[d]);async function N(){var s,o,i,c;p(!0),f(!1);try{const{data:a}=await S.get(`${j}/store/offer?page=${d}&limit=8&orderBy=MOST_VIEWED&sort=${e||I}`,{headers:{Authorization:`Bearer ${D}`}});((s=a==null?void 0:a.data)==null?void 0:s.offers.length)<1&&(f(!0),E(g,"No more offer available",3e3,"top")),m([...n,...(o=a==null?void 0:a.data)==null?void 0:o.offers]),v((c=(i=a==null?void 0:a.data)==null?void 0:i.pagination)==null?void 0:c.totalPage)}catch(a){console==null||console.log(a,"GET_ALL_OFFERS_ERR")}finally{p(!1)}}async function O(){var s;p(!0),f(!1);try{const{data:o}=await S.get(`${j}/views/recently-viewed/${B}?page=${d}&limit=8`);((s=o==null?void 0:o.data)==null?void 0:s.length)<1&&(f(!0),E(g,"No more offer available",3e3,"top")),m([...n,...o==null?void 0:o.data])}catch(o){console==null||console.log(o,"GET_ALL_OFFERS_ERR")}finally{p(!1)}}return t.jsxs(V,{flexDir:"column",children:[t.jsx(H,{}),t.jsx(w,{children:t.jsxs(Q,{...A,children:[t.jsxs(L,{as:"button",onClick:()=>x(-1),children:[t.jsx(y,{as:Y,w:"2vw",h:"2vw"}),t.jsx(F,{children:"Back"})]}),t.jsx(w,{children:t.jsxs(L,{mt:"20px",children:[t.jsx(q,{}),t.jsx(F,{fontSize:["18px","18px"],textTransform:"uppercase",children:e==null?void 0:e.replaceAll("_"," ")})]})}),e&&t.jsx(t.Fragment,{children:t.jsx(R,{columns:[2,2,3,4,4],spacingX:["35px","35px","35px","15px","35px"],w:"100%",children:n==null?void 0:n.map((s,o)=>{var i,c,a,l;return t.jsx(C,{isLoaded:!0,productTitle:s==null?void 0:s.name,points:`${s==null?void 0:s.tokens}${(i=s==null?void 0:s.reward)==null?void 0:i.rewardSymbol}`,productSubtitle:(a=(c=s==null?void 0:s.product)==null?void 0:c.category)==null?void 0:a.name,price:(l=s==null?void 0:s.originalPrice)==null?void 0:l.toLocaleString(),isNew:u(u()).diff(s==null?void 0:s.createdAt,"days")<1,rest:{...s},i:o,bgImage:s==null?void 0:s.offerImages,onClick:()=>x(`${_}/productDetails/${s==null?void 0:s.offerCode}`)},$())})})}),!e&&t.jsx(t.Fragment,{children:h?t.jsx(ss,{}):t.jsx(R,{columns:[2,2,3,4,4],w:"100%",spacingX:"3.5%",mt:"40px",children:t.jsx(r.Suspense,{fallback:t.jsx(b,{size:"sm"}),children:n==null?void 0:n.map((s,o)=>{var i,c,a,l;return t.jsx(C,{isLoaded:!0,productTitle:s==null?void 0:s.name,points:`${s==null?void 0:s.tokens}${(i=s==null?void 0:s.reward)==null?void 0:i.rewardSymbol}`,productSubtitle:(a=(c=s==null?void 0:s.product)==null?void 0:c.category)==null?void 0:a.name,price:(l=s==null?void 0:s.originalPrice)==null?void 0:l.toLocaleString(),isNew:u(u()).diff(s==null?void 0:s.createdAt,"days")<1,rest:{...s},i:o,bgImage:s==null?void 0:s.offerImages,onClick:()=>x(`${_}/productDetails/${s==null?void 0:s.offerCode}`)},$())})})})}),e&&t.jsx(t.Fragment,{children:!k&&t.jsx(J,{as:K,...P,onClick:()=>{T(d+1)},children:h?t.jsx(b,{size:"sm"}):t.jsxs(t.Fragment,{children:["Load more ",t.jsx(y,{as:Z,ml:"5%"})]})})})]})})]})},cs=ts,as=()=>({root:{w:"100%",mt:"108px",pt:"3%",overflow:"hidden",pb:"2%"},loadMore:{w:"132px",h:"32px",alignSelf:"center",py:"10px",borderRadius:"100px"}});export{cs as default};
