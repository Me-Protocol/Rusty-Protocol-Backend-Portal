import{r as t,_ as m,u as A,b as C,g as I,B as P,j as s,N as $,h as w,F as T,i as D,P as G,H as v,K as z,S as c,C as g,G as h,O as B,Q as E,n as H,l as N,U,W as V,z as X}from"./index-7489b734.js";t.lazy(()=>m(()=>import("./index-7489b734.js").then(o=>o.cS),["assets/index-7489b734.js","assets/index-ed5220eb.css"]));const K=t.lazy(()=>m(()=>import("./index-ae837e37.js"),["assets/index-ae837e37.js","assets/index-7489b734.js","assets/index-ed5220eb.css"])),W=({categoryName:o,category_id:j,HeaderShown:_=!0,rest:R,loaded:b})=>{let l=A();C();const{nameStyles:d,button:M,loadMore:y}=X(),[i,F]=t.useState(1),[r,k]=t.useState([]);t.useState(!1);const[L,u]=t.useState(!1);t.useState(1);const[p,x]=t.useState(!1);t.useEffect(()=>{O()},[i]);async function O(){var e,n;x(!0),u(!1);try{const{data:a}=await I.get(`${P}/store/offer?page=${i}&limit=8&category=${j}`);((e=a==null?void 0:a.data)==null?void 0:e.offers.length)<1&&u(!0),k([...r,...(n=a==null?void 0:a.data)==null?void 0:n.offers])}catch(a){console.log(a,"GET_CATEGORIES_OFFERS_ERR")}finally{x(!1)}}return(r==null?void 0:r.length)<=0?null:s.jsx($,{borderRadius:"20px",isLoaded:b,children:s.jsxs(w,{children:[_&&s.jsxs(T,{w:"100%",pt:"20px",children:[s.jsxs(D,{children:[s.jsx(G,{}),s.jsx(v,{...d,children:o})]}),s.jsx(z,{}),s.jsx(t.Suspense,{fallback:s.jsx(c,{size:"sm"}),children:s.jsx(g,{bg:"dark",color:"white",px:"15px",py:"5px",as:"button",onClick:()=>l(`${h}/dashboard/category/${o}`,{state:R}),...d,children:"SEE ALL OFFERS"})})]}),s.jsx(B,{columns:[2,2,3,4,4],spacingX:["35px","35px","35px","15px","35px"],w:"100%",children:s.jsx(t.Suspense,{fallback:s.jsx(c,{size:"sm"}),children:r==null?void 0:r.map((e,n)=>{var a,f,S;return s.jsx(K,{isLoaded:!p,productTitle:e.name,points:`${e==null?void 0:e.tokens}${(a=e.reward)==null?void 0:a.rewardSymbol}`,productSubtitle:(S=(f=e.product)==null?void 0:f.category)==null?void 0:S.name,price:e.originalPrice,isNew:E(E()).diff(e==null?void 0:e.createdAt,"days")<1,rest:{...e},i:n,bgImage:e==null?void 0:e.offerImages,onClick:()=>l(`${h}/productDetails/${e.offerCode}`)},H())})})}),!L&&s.jsx(g,{as:N,...y,onClick:()=>{F(i+1)},children:p?s.jsx(c,{size:"sm"}):s.jsxs(s.Fragment,{children:["Load more ",s.jsx(U,{as:V,ml:"5%"})]})})]})})};export{W as O};
