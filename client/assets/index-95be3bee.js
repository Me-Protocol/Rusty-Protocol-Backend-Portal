import{d as k,a as D,r as L,u as R,b as T,Y as v,j as a,h as F,F as r,ak as C,N as I,C as E,I as U,f as _,y as M,K as N,T as e,a3 as P,D as z,G as O,a1 as G,aZ as $}from"./index-24aaf4e2.js";const W=({item:o})=>{var c,x,i,p,h;const{token:d}=k(s=>s.authReducer),{root:f,bodyText:l,headText:b}=A(),w=D(),[g,t]=L.useState(!1);let j=R();const B=T(),[y]=v();async function S(){var s;d||j(`${O}/login`),t(!0),await y({brandId:(s=o==null?void 0:o.brand)==null?void 0:s.id}).then(n=>{var u;((u=n==null?void 0:n.data)==null?void 0:u.statusCode)===200&&(G(B,"Brand Unfollowed"),w($({token:d})))}).catch(n=>{console.log(n,"unFollowBrandERR")}).finally(()=>{t(!1)})}return a.jsxs(F,{children:[a.jsxs(r,{...f,flexDir:"row",align:"center",children:[a.jsxs(r,{w:"40%",h:"70%",flexDir:"row",align:"center",justify:"space-between",children:[a.jsx(r,{w:"250px",h:"150px",flexDir:"column",bg:"grey",children:a.jsx(C,{role:"group",children:a.jsx(I,{isLoaded:!0,mr:"20px",overflow:"hidden",w:"360px",h:"180px",children:a.jsx(E,{w:"250px",h:"150px",bg:"#0000003D",pos:"absolute",background:`url(${(c=o==null?void 0:o.brand)==null?void 0:c.banners[0]}) center/cover no-repeat`,overflow:"hidden",color:"rgba(153,153,153,0.66)",_hover:{color:"black"},borderRadius:"10px",children:((x=o==null?void 0:o.brand)==null?void 0:x.white_logo)&&a.jsx(U,{w:"60px",h:"60px",position:"relative",borderRadius:"5px",src:(i=o==null?void 0:o.brand)==null?void 0:i.white_logo,objectFit:"contain",fallbackSrc:_.appLogoPlaceholder,fallbackStrategy:"onError"})})})},M())}),a.jsx(N,{}),a.jsxs(r,{flexDir:"column",w:"250px",h:"150px",ml:"20px",children:[a.jsx(e,{...b,noOfLines:1,textTransform:"uppercase",children:(p=o==null?void 0:o.brand)==null?void 0:p.brandName}),a.jsx(e,{...l,noOfLines:4,children:(h=o==null?void 0:o.brand)==null?void 0:h.description})]})]}),a.jsxs(r,{w:"30%",h:"100%",align:"flex-end",flexDir:"column",children:[a.jsx(P,{name:"Unfollow",isLoading:g,rest:{w:"146px",fontSize:"16px",bg:"dark",borderWidth:1,borderColor:"light",color:"light",className:"unfollow",borderRadius:0},onClick:S}),a.jsx(e,{as:"button",...l,children:"Contact Brand"}),a.jsx(e,{as:"button",...l,children:"Report Brand"})]})]}),a.jsx(z,{})]})},A=()=>({root:{w:"100%",h:"150px",justify:"space-between"},headText:{fontSize:"18px"},bodyText:{fontSize:"16px",color:"#999999",mt:"2px"}});export{W as default};
