import{r,_ as S,a as ls,u as es,d as K,az as k,aA as $,aa as u,aq as N,j as a,F as o,X as ds,S as n,h as ps,T as xs,w as m,x as f,q as g,i as _,P as L,H as w,C as y,y as x,G as b,ah as ss,I as as,f as us,aB as gs,t as js,aC as hs,aD as ms,aE as fs}from"./index-4d742258.js";import I from"./index-6dcc2a1a.js";import{S as bs}from"./index-e09a1b33.js";import"./index-71b2e7df.js";import"./index-a13cc0d4.js";import"./ResizeObserver.es-f4289e8a.js";const Ss=r.lazy(()=>S(()=>import("./index-72666f51.js"),["assets/index-72666f51.js","assets/index-4d742258.js","assets/index-ed5220eb.css","assets/index-e09a1b33.js","assets/index-71b2e7df.js","assets/index-a13cc0d4.js","assets/ResizeObserver.es-f4289e8a.js","assets/index.esm-dec85be3.js","assets/svg-64e24239.js"])),O=r.lazy(()=>S(()=>import("./index-2b5b9318.js"),["assets/index-2b5b9318.js","assets/index-4d742258.js","assets/index-ed5220eb.css"])),_s=r.lazy(()=>S(()=>import("./index-7ad5232a.js"),["assets/index-7ad5232a.js","assets/index-4d742258.js","assets/index-ed5220eb.css"])),ws=r.lazy(()=>S(()=>import("./index-d207f67b.js"),["assets/index-d207f67b.js","assets/index-4d742258.js","assets/index-ed5220eb.css"])),ys=r.lazy(()=>S(()=>import("./index-1962ba8e.js"),["assets/index-1962ba8e.js","assets/index-4d742258.js","assets/index-ed5220eb.css","assets/index-680b3184.js","assets/countries-020c4914.js","assets/chunk-3RSXBRAN-015cd4eb.js"])),Es=r.lazy(()=>S(()=>import("./index-4d742258.js").then(i=>i.cT),["assets/index-4d742258.js","assets/index-ed5220eb.css"])),ks=()=>{var F,v,M,B,G,X,H,V,W,Y,U,q,Q,J,Z;ls();let i=es();const[E,Ls]=r.useState(!0),{root:rs,nameStyles:c,button:Is,loadMore:Os}=js();K(s=>s==null?void 0:s.authReducer);const{user_data:j}=K(s=>s==null?void 0:s.userReducer),is={dots:!0,infinite:!0,speed:2e3,slidesToShow:1,slidesToScroll:1,vertical:!1,arrows:!1,autoplay:!0,swipeToSlide:!0,draggable:!0,autoplaySpeed:5e3,adaptiveHeight:!0,centerPadding:"10",verticalSwiping:!1},{data:A,isLoading:ts}=k({page:1,limit:8,orderBy:$.MOST_VIEWED,sort:u.POPULAR},{refetchOnMountOrArgChange:!0}),{data:D,isLoading:ns}=k({page:1,limit:8,orderBy:$.MOST_RECENT,sort:u.NEW},{refetchOnMountOrArgChange:!0}),{data:P,isLoading:os}=k({page:1,limit:8,orderBy:$.MOST_VIEWED,sort:u.EXPIRING},{refetchOnMountOrArgChange:!0}),{data:h,isLoading:cs}=k({page:1,limit:8,forYou:!0},{refetchOnMountOrArgChange:!0}),{data:C,isLoading:As}=N({page:1,limit:9},{refetchOnMountOrArgChange:!0}),{data:T,isLoading:Ds}=N({page:1,limit:15},{refetchOnMountOrArgChange:!0}),{data:R,isLoading:Ps}=N({page:1,limit:5},{refetchOnMountOrArgChange:!0}),z=[{id:"1",icon:hs,label:"Explore offers",onclick:()=>i("category")},{id:"2",icon:ms,label:"Visit shops",onclick:()=>i("shop")},{id:"3",icon:fs,label:"Earn Rewards",onclick:()=>i(`${b}/bounties`)}];return a.jsxs(o,{flexDir:"column",p:"0px",children:[a.jsx(ds,{}),a.jsx(r.Suspense,{fallback:a.jsx(n,{size:"sm"}),children:a.jsx(Es,{children:a.jsxs(ps,{...rs,children:[a.jsx(xs,{...c,textTransform:"uppercase",children:(F=j==null?void 0:j.customer)!=null&&F.name?`Hi ${(v=j==null?void 0:j.customer)==null?void 0:v.name.split(" ")[0]}`:""}),a.jsx(m,{}),a.jsx(o,{children:a.jsx(f,{columns:3,spacing:"40px",spacingX:"60px",w:"100%",children:a.jsx(r.Suspense,{fallback:a.jsx(n,{size:"sm"}),children:z==null?void 0:z.map((s,t)=>a.jsx(_s,{onClick:s==null?void 0:s.onclick,icon:s==null?void 0:s.icon({color:""}),cardName:s==null?void 0:s.label,index:t},g()))})})}),a.jsxs(o,{w:"100%",pt:"50px",children:[a.jsxs(_,{children:[a.jsx(L,{}),a.jsx(w,{...c,children:"POPULAR DEALS"})]}),a.jsx(m,{}),a.jsx(r.Suspense,{fallback:a.jsx(n,{size:"sm"}),children:a.jsx(y,{bg:"dark",color:"white",px:"15px",py:"5px",as:"button",onClick:()=>i("see_all_offers_in_category/Popular_deals",{state:u.POPULAR}),...c,children:"SEE ALL OFFERS"})})]}),ts?a.jsx(I,{}):a.jsx(o,{justify:"space-between",children:a.jsx(f,{columns:[2,2,3,4,4],w:"100%",spacingX:["35px","35px","35px","15px","35px"],spacingY:"5px",justifyItems:"space-between",children:a.jsx(r.Suspense,{fallback:a.jsx(n,{size:"sm"}),children:(B=(M=A==null?void 0:A.data)==null?void 0:M.offers)==null?void 0:B.map((s,t)=>{var l,e,d,p;return a.jsx(O,{isLoaded:E,productTitle:s==null?void 0:s.name,points:`${s==null?void 0:s.tokens}${(l=s==null?void 0:s.reward)==null?void 0:l.rewardSymbol}`,productSubtitle:(d=(e=s==null?void 0:s.product)==null?void 0:e.category)==null?void 0:d.name,price:(p=s==null?void 0:s.originalPrice)==null?void 0:p.toLocaleString(),isNew:x(x()).diff(s==null?void 0:s.createdAt,"days")<3,rest:{...s},i:t,bgImage:s==null?void 0:s.offerImages,onClick:()=>i(`${b}/productDetails/${s==null?void 0:s.offerCode}`)},g())})})})}),a.jsxs(o,{w:"100%",pt:"50px",children:[a.jsxs(_,{children:[a.jsx(L,{}),a.jsx(w,{...c,children:"NEW DEALS"})]}),a.jsx(m,{}),a.jsx(r.Suspense,{fallback:a.jsx(n,{size:"sm"}),children:a.jsx(y,{bg:"dark",color:"white",px:"15px",py:"5px",as:"button",onClick:()=>i("see_all_offers_in_category/Popular_deals",{state:u.NEW}),...c,children:"SEE ALL OFFERS"})})]}),ns?a.jsx(I,{}):a.jsx(o,{justify:"space-between",children:a.jsx(f,{columns:[2,2,3,4,4],w:"100%",spacingX:["35px","35px","35px","15px","35px"],spacingY:"5px",justifyItems:"space-between",children:a.jsx(r.Suspense,{fallback:a.jsx(n,{size:"sm"}),children:(G=D==null?void 0:D.data)==null?void 0:G.offers.map((s,t)=>{var l,e,d,p;return a.jsx(O,{isLoaded:E,productTitle:s==null?void 0:s.name,points:`${s==null?void 0:s.tokens}${(l=s==null?void 0:s.reward)==null?void 0:l.rewardSymbol}`,productSubtitle:(d=(e=s==null?void 0:s.product)==null?void 0:e.category)==null?void 0:d.name,price:(p=s==null?void 0:s.originalPrice)==null?void 0:p.toLocaleString(),isNew:x(x()).diff(s==null?void 0:s.createdAt,"days")<3,rest:{...s},i:t,bgImage:s==null?void 0:s.offerImages,onClick:()=>i(`${b}/productDetails/${s==null?void 0:s.offerCode}`)},g())})})})}),((X=h==null?void 0:h.data)==null?void 0:X.offers.length)>0&&a.jsxs(a.Fragment,{children:[a.jsxs(o,{w:"100%",pt:"50px",children:[a.jsxs(_,{children:[a.jsx(L,{}),a.jsx(w,{...c,children:"FOR YOU TODAY"})]}),a.jsx(m,{}),a.jsx(r.Suspense,{fallback:a.jsx(n,{size:"sm"}),children:a.jsx(y,{bg:"dark",color:"white",px:"15px",py:"5px",as:"button",onClick:()=>i("see_all_offers_in_category/Popular_deals",{state:u.TRENDING}),...c,children:"SEE ALL OFFERS"})})]}),cs?a.jsx(I,{}):a.jsx(o,{justify:"space-between",children:a.jsx(f,{columns:[2,2,3,4,4],w:"100%",spacingX:["35px","35px","35px","15px","35px"],spacingY:"5px",justifyItems:"space-between",children:a.jsx(r.Suspense,{fallback:a.jsx(n,{size:"sm"}),children:(V=(H=h==null?void 0:h.data)==null?void 0:H.offers)==null?void 0:V.map((s,t)=>{var l,e,d,p;return a.jsx(O,{isLoaded:E,productTitle:s==null?void 0:s.name,points:`${s==null?void 0:s.tokens}${(l=s==null?void 0:s.reward)==null?void 0:l.rewardSymbol}`,productSubtitle:(d=(e=s==null?void 0:s.product)==null?void 0:e.category)==null?void 0:d.name,price:(p=s==null?void 0:s.originalPrice)==null?void 0:p.toLocaleString(),isNew:x(x()).diff(s==null?void 0:s.createdAt,"days")<3,rest:{...s},i:t,bgImage:s==null?void 0:s.offerImages,onClick:()=>i(`${b}/productDetails/${s==null?void 0:s.offerCode}`)},g())})})})})]}),a.jsxs(o,{w:"100%",pt:"50px",children:[a.jsxs(_,{children:[a.jsx(L,{}),a.jsx(w,{...c,children:"EXPIRING DEALS"})]}),a.jsx(m,{}),a.jsx(r.Suspense,{fallback:a.jsx(n,{size:"sm"}),children:a.jsx(y,{bg:"dark",color:"white",px:"15px",py:"5px",as:"button",onClick:()=>i("see_all_offers_in_category/Popular_deals",{state:u.EXPIRING}),...c,children:"SEE ALL OFFERS"})})]}),os?a.jsx(I,{}):a.jsx(o,{justify:"space-between",children:a.jsx(f,{columns:[2,2,3,4,4],w:"100%",spacingX:["35px","35px","35px","15px","35px"],spacingY:"5px",justifyItems:"space-between",children:a.jsx(r.Suspense,{fallback:a.jsx(n,{size:"sm"}),children:(Y=(W=P==null?void 0:P.data)==null?void 0:W.offers)==null?void 0:Y.map((s,t)=>{var l,e,d,p;return a.jsx(O,{isLoaded:E,productTitle:s==null?void 0:s.name,points:`${s==null?void 0:s.tokens}${(l=s==null?void 0:s.reward)==null?void 0:l.rewardSymbol}`,productSubtitle:(d=(e=s==null?void 0:s.product)==null?void 0:e.category)==null?void 0:d.name,price:(p=s==null?void 0:s.originalPrice)==null?void 0:p.toLocaleString(),isNew:x(x()).diff(s==null?void 0:s.createdAt,"days")<3,rest:{...s},i:t,bgImage:s==null?void 0:s.offerImages,onClick:()=>i(`${b}/productDetails/${s==null?void 0:s.offerCode}`)},g())})})})}),a.jsx(ss,{pt:"30px",children:a.jsx(bs,{...is,children:(q=(U=R==null?void 0:R.data)==null?void 0:U.brands)==null?void 0:q.map(s=>{var t;return((t=s==null?void 0:s.banners)==null?void 0:t.length)>0&&a.jsx(o,{backgroundColor:"grey",w:"100%",h:"300px",borderRadius:"20px",background:`url(${s!=null&&s.banners?s==null?void 0:s.banners[0]:"https://images.unsplash.com/photo-1614851099175-e5b30eb6f696?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJhbm5lcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"}) center/cover no-repeat`,justifyContent:"center",align:"center",as,fallbackSrc:us.appLogoPlaceholder,fallbackStrategy:"onError",objectFit:"cover"},g())})})}),a.jsxs(ss,{children:[a.jsxs(o,{w:"100%",pt:"50px",children:[a.jsxs(_,{children:[a.jsx(gs,{}),a.jsx(w,{...c,children:"TRENDING SHOPS"})]}),a.jsx(m,{}),a.jsx(r.Suspense,{fallback:a.jsx(n,{size:"sm"}),children:a.jsx(y,{bg:"dark",color:"white",px:"15px",py:"5px",as:"button",onClick:()=>i("shop"),...c,children:"SEE ALL SHOPS"})})]}),a.jsx(f,{columns:[2,3,4,4,6],w:"100%",spacingX:["35px","35px","55px","35px","35px"],spacingY:"5px",justifyItems:"space-between",children:a.jsx(r.Suspense,{fallback:a.jsx(n,{size:"sm"}),children:(J=(Q=T==null?void 0:T.data)==null?void 0:Q.brands)==null?void 0:J.map((s,t)=>(s==null?void 0:s.logo)&&a.jsx(ws,{icon:a.jsx(a.Fragment,{children:a.jsx(as,{src:s==null?void 0:s.logo,w:"100px",h:"100%",objectFit:"contain"})}),index:t,onClick:()=>i(`${b}/dashboard/shop/${s==null?void 0:s.id}`,{state:{id:s==null?void 0:s.id,slug:s==null?void 0:s.slug,brandName:s==null?void 0:s.name}})},g()))})})]}),a.jsx(o,{children:a.jsx(r.Suspense,{fallback:a.jsx(n,{size:"sm"}),children:a.jsx(Ss,{carouselTitle:"Browse brands",items:(Z=C==null?void 0:C.data)==null?void 0:Z.brands,seeMoreClick:()=>i("shop")})})})]})})}),a.jsx(r.Suspense,{fallback:a.jsx(n,{size:"sm"}),children:a.jsx(ys,{})})]})},Fs=ks;export{Fs as default};
