import{r,_ as b,a as cs,u as ls,d as K,E,ar as N,ag as u,J as $,j as a,F as t,a2 as es,S as n,h as ds,T as ps,K as h,O as m,y as g,i as S,P as k,H as _,C as w,Q as x,G as f,ak as Z,I as ss,f as xs,as as us,z as gs,at as js,au as hs,av as ms}from"./index-24aaf4e2.js";import L from"./index-673120da.js";import{S as fs}from"./index-ed58d7cb.js";import"./index-971bddf7.js";import"./index-da319dc7.js";import"./ResizeObserver.es-f4289e8a.js";const bs=r.lazy(()=>b(()=>import("./index-098eba8b.js"),["assets/index-098eba8b.js","assets/index-24aaf4e2.js","assets/index-ed5220eb.css","assets/index-ed58d7cb.js","assets/index-971bddf7.js","assets/index-da319dc7.js","assets/ResizeObserver.es-f4289e8a.js","assets/index.esm-f1d70707.js","assets/svg-c18dd3be.js"])),I=r.lazy(()=>b(()=>import("./index-6bd4573e.js"),["assets/index-6bd4573e.js","assets/index-24aaf4e2.js","assets/index-ed5220eb.css"])),Ss=r.lazy(()=>b(()=>import("./index-e34705e3.js"),["assets/index-e34705e3.js","assets/index-24aaf4e2.js","assets/index-ed5220eb.css"])),_s=r.lazy(()=>b(()=>import("./index-75baea77.js"),["assets/index-75baea77.js","assets/index-24aaf4e2.js","assets/index-ed5220eb.css"])),ws=r.lazy(()=>b(()=>import("./index-c0d4694f.js"),["assets/index-c0d4694f.js","assets/index-24aaf4e2.js","assets/index-ed5220eb.css","assets/index-d1b33a55.js","assets/countries-020c4914.js","assets/chunk-3RSXBRAN-45aac649.js"])),ys=r.lazy(()=>b(()=>import("./index-24aaf4e2.js").then(i=>i.cN),["assets/index-24aaf4e2.js","assets/index-ed5220eb.css"])),Es=()=>{var v,F,M,B,G,X,H,V,Y,W,U,Q,J,q;cs();let i=ls();const[y,ks]=r.useState(!0),{root:as,nameStyles:c,button:Ls,loadMore:Is}=gs();K(s=>s==null?void 0:s.authReducer);const{user_data:j}=K(s=>s==null?void 0:s.userReducer),rs={dots:!0,infinite:!0,speed:2e3,slidesToShow:1,slidesToScroll:1,vertical:!1,arrows:!1,autoplay:!0,swipeToSlide:!0,draggable:!0,autoplaySpeed:5e3,adaptiveHeight:!0,centerPadding:"10",verticalSwiping:!1},{data:O,isLoading:is}=E({page:1,limit:8,orderBy:N.MOST_VIEWED,sort:u.POPULAR},{refetchOnMountOrArgChange:!0}),{data:A,isLoading:os}=E({page:1,limit:8,orderBy:N.MOST_RECENT,sort:u.NEW},{refetchOnMountOrArgChange:!0}),{data:D,isLoading:ns}=E({page:1,limit:8,orderBy:N.MOST_VIEWED,sort:u.EXPIRING},{refetchOnMountOrArgChange:!0}),{data:P,isLoading:ts}=E({page:1,limit:8,forYou:!0},{refetchOnMountOrArgChange:!0}),{data:C,isLoading:Os}=$({page:1,limit:9},{refetchOnMountOrArgChange:!0}),{data:R,isLoading:As}=$({page:1,limit:15},{refetchOnMountOrArgChange:!0}),{data:T,isLoading:Ds}=$({page:1,limit:5},{refetchOnMountOrArgChange:!0}),z=[{id:"1",icon:js,label:"Explore offers",onclick:()=>i("category")},{id:"2",icon:hs,label:"Visit shops",onclick:()=>i("shop")},{id:"3",icon:ms,label:"Earn Rewards",onclick:()=>i(`${f}/bounties`)}];return a.jsxs(t,{flexDir:"column",p:"0px",children:[a.jsx(es,{}),a.jsx(r.Suspense,{fallback:a.jsx(n,{size:"sm"}),children:a.jsx(ys,{children:a.jsxs(ds,{...as,children:[a.jsx(ps,{...c,textTransform:"uppercase",children:(v=j==null?void 0:j.customer)!=null&&v.name?((F=j==null?void 0:j.customer)==null?void 0:F.name).replace(" ",", "):""}),a.jsx(h,{}),a.jsx(t,{children:a.jsx(m,{columns:3,spacing:"40px",spacingX:"60px",w:"100%",children:a.jsx(r.Suspense,{fallback:a.jsx(n,{size:"sm"}),children:z==null?void 0:z.map((s,o)=>a.jsx(Ss,{onClick:s==null?void 0:s.onclick,icon:s==null?void 0:s.icon({color:""}),cardName:s==null?void 0:s.label,index:o},g()))})})}),a.jsxs(t,{w:"100%",pt:"50px",children:[a.jsxs(S,{children:[a.jsx(k,{}),a.jsx(_,{...c,children:"POPULAR DEALS"})]}),a.jsx(h,{}),a.jsx(r.Suspense,{fallback:a.jsx(n,{size:"sm"}),children:a.jsx(w,{bg:"dark",color:"white",px:"15px",py:"5px",as:"button",onClick:()=>i("see_all_offers_in_category/Popular_deals",{state:u.POPULAR}),...c,children:"SEE ALL OFFERS"})})]}),is?a.jsx(L,{}):a.jsx(t,{justify:"space-between",children:a.jsx(m,{columns:[2,2,3,4,4],w:"100%",spacingX:["35px","35px","35px","15px","35px"],spacingY:"5px",justifyItems:"space-between",children:a.jsx(r.Suspense,{fallback:a.jsx(n,{size:"sm"}),children:(B=(M=O==null?void 0:O.data)==null?void 0:M.offers)==null?void 0:B.map((s,o)=>{var l,e,d,p;return a.jsx(I,{isLoaded:y,productTitle:s==null?void 0:s.name,points:`${s==null?void 0:s.tokens}${(l=s==null?void 0:s.reward)==null?void 0:l.rewardSymbol}`,productSubtitle:(d=(e=s==null?void 0:s.product)==null?void 0:e.category)==null?void 0:d.name,price:(p=s==null?void 0:s.originalPrice)==null?void 0:p.toLocaleString(),isNew:x(x()).diff(s==null?void 0:s.createdAt,"days")<3,rest:{...s},i:o,bgImage:s==null?void 0:s.offerImages,onClick:()=>i(`${f}/productDetails/${s==null?void 0:s.offerCode}`)},g())})})})}),a.jsxs(t,{w:"100%",pt:"50px",children:[a.jsxs(S,{children:[a.jsx(k,{}),a.jsx(_,{...c,children:"NEW DEALS"})]}),a.jsx(h,{}),a.jsx(r.Suspense,{fallback:a.jsx(n,{size:"sm"}),children:a.jsx(w,{bg:"dark",color:"white",px:"15px",py:"5px",as:"button",onClick:()=>i("see_all_offers_in_category/Popular_deals",{state:u.NEW}),...c,children:"SEE ALL OFFERS"})})]}),os?a.jsx(L,{}):a.jsx(t,{justify:"space-between",children:a.jsx(m,{columns:[2,2,3,4,4],w:"100%",spacingX:["35px","35px","35px","15px","35px"],spacingY:"5px",justifyItems:"space-between",children:a.jsx(r.Suspense,{fallback:a.jsx(n,{size:"sm"}),children:(G=A==null?void 0:A.data)==null?void 0:G.offers.map((s,o)=>{var l,e,d,p;return a.jsx(I,{isLoaded:y,productTitle:s==null?void 0:s.name,points:`${s==null?void 0:s.tokens}${(l=s==null?void 0:s.reward)==null?void 0:l.rewardSymbol}`,productSubtitle:(d=(e=s==null?void 0:s.product)==null?void 0:e.category)==null?void 0:d.name,price:(p=s==null?void 0:s.originalPrice)==null?void 0:p.toLocaleString(),isNew:x(x()).diff(s==null?void 0:s.createdAt,"days")<3,rest:{...s},i:o,bgImage:s==null?void 0:s.offerImages,onClick:()=>i(`${f}/productDetails/${s==null?void 0:s.offerCode}`)},g())})})})}),a.jsxs(t,{w:"100%",pt:"50px",children:[a.jsxs(S,{children:[a.jsx(k,{}),a.jsx(_,{...c,children:"FOR YOU TODAY"})]}),a.jsx(h,{}),a.jsx(r.Suspense,{fallback:a.jsx(n,{size:"sm"}),children:a.jsx(w,{bg:"dark",color:"white",px:"15px",py:"5px",as:"button",onClick:()=>i("see_all_offers_in_category/Popular_deals",{state:u.TRENDING}),...c,children:"SEE ALL OFFERS"})})]}),ts?a.jsx(L,{}):a.jsx(t,{justify:"space-between",children:a.jsx(m,{columns:[2,2,3,4,4],w:"100%",spacingX:["35px","35px","35px","15px","35px"],spacingY:"5px",justifyItems:"space-between",children:a.jsx(r.Suspense,{fallback:a.jsx(n,{size:"sm"}),children:(H=(X=P==null?void 0:P.data)==null?void 0:X.offers)==null?void 0:H.map((s,o)=>{var l,e,d,p;return a.jsx(I,{isLoaded:y,productTitle:s==null?void 0:s.name,points:`${s==null?void 0:s.tokens}${(l=s==null?void 0:s.reward)==null?void 0:l.rewardSymbol}`,productSubtitle:(d=(e=s==null?void 0:s.product)==null?void 0:e.category)==null?void 0:d.name,price:(p=s==null?void 0:s.originalPrice)==null?void 0:p.toLocaleString(),isNew:x(x()).diff(s==null?void 0:s.createdAt,"days")<3,rest:{...s},i:o,bgImage:s==null?void 0:s.offerImages,onClick:()=>i(`${f}/productDetails/${s==null?void 0:s.offerCode}`)},g())})})})}),a.jsxs(t,{w:"100%",pt:"50px",children:[a.jsxs(S,{children:[a.jsx(k,{}),a.jsx(_,{...c,children:"EXPIRING DEALS"})]}),a.jsx(h,{}),a.jsx(r.Suspense,{fallback:a.jsx(n,{size:"sm"}),children:a.jsx(w,{bg:"dark",color:"white",px:"15px",py:"5px",as:"button",onClick:()=>i("see_all_offers_in_category/Popular_deals",{state:u.EXPIRING}),...c,children:"SEE ALL OFFERS"})})]}),ns?a.jsx(L,{}):a.jsx(t,{justify:"space-between",children:a.jsx(m,{columns:[2,2,3,4,4],w:"100%",spacingX:["35px","35px","35px","15px","35px"],spacingY:"5px",justifyItems:"space-between",children:a.jsx(r.Suspense,{fallback:a.jsx(n,{size:"sm"}),children:(Y=(V=D==null?void 0:D.data)==null?void 0:V.offers)==null?void 0:Y.map((s,o)=>{var l,e,d,p;return a.jsx(I,{isLoaded:y,productTitle:s==null?void 0:s.name,points:`${s==null?void 0:s.tokens}${(l=s==null?void 0:s.reward)==null?void 0:l.rewardSymbol}`,productSubtitle:(d=(e=s==null?void 0:s.product)==null?void 0:e.category)==null?void 0:d.name,price:(p=s==null?void 0:s.originalPrice)==null?void 0:p.toLocaleString(),isNew:x(x()).diff(s==null?void 0:s.createdAt,"days")<3,rest:{...s},i:o,bgImage:s==null?void 0:s.offerImages,onClick:()=>i(`${f}/productDetails/${s==null?void 0:s.offerCode}`)},g())})})})}),a.jsx(Z,{pt:"30px",children:a.jsx(fs,{...rs,children:(U=(W=T==null?void 0:T.data)==null?void 0:W.brands)==null?void 0:U.map(s=>{var o;return((o=s==null?void 0:s.banners)==null?void 0:o.length)>0&&a.jsx(t,{backgroundColor:"grey",w:"100%",h:"300px",borderRadius:"20px",background:`url(${s!=null&&s.banners?s==null?void 0:s.banners[0]:"https://images.unsplash.com/photo-1614851099175-e5b30eb6f696?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJhbm5lcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"}) center/cover no-repeat`,justifyContent:"center",align:"center",as:ss,fallbackSrc:xs.appLogoPlaceholder,fallbackStrategy:"onError",objectFit:"cover"},g())})})}),a.jsxs(Z,{children:[a.jsxs(t,{w:"100%",pt:"50px",children:[a.jsxs(S,{children:[a.jsx(us,{}),a.jsx(_,{...c,children:"TRENDING SHOPS"})]}),a.jsx(h,{}),a.jsx(r.Suspense,{fallback:a.jsx(n,{size:"sm"}),children:a.jsx(w,{bg:"dark",color:"white",px:"15px",py:"5px",as:"button",onClick:()=>i("shop"),...c,children:"SEE ALL SHOPS"})})]}),a.jsx(m,{columns:[2,3,4,4,6],w:"100%",spacingX:["35px","35px","55px","35px","35px"],spacingY:"5px",justifyItems:"space-between",children:a.jsx(r.Suspense,{fallback:a.jsx(n,{size:"sm"}),children:(J=(Q=R==null?void 0:R.data)==null?void 0:Q.brands)==null?void 0:J.map((s,o)=>(s==null?void 0:s.logo)&&a.jsx(_s,{icon:a.jsx(a.Fragment,{children:a.jsx(ss,{src:s==null?void 0:s.logo,w:"100px",h:"100%",objectFit:"contain"})}),index:o,onClick:()=>i(`${f}/dashboard/shop/${s==null?void 0:s.id}`,{state:{id:s==null?void 0:s.id,slug:s==null?void 0:s.slug,brandName:s==null?void 0:s.name}})},g()))})})]}),a.jsx(t,{children:a.jsx(r.Suspense,{fallback:a.jsx(n,{size:"sm"}),children:a.jsx(bs,{carouselTitle:"Browse brands",items:(q=C==null?void 0:C.data)==null?void 0:q.brands,seeMoreClick:()=>i("shop")})})})]})})}),a.jsx(r.Suspense,{fallback:a.jsx(n,{size:"sm"}),children:a.jsx(ws,{})})]})},$s=Es;export{$s as default};
