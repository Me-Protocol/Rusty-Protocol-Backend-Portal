import{u as f,d as C,j as o,ak as i,F as n,i as u,G as k,T as l,K as s,C as R,l as S,D as v}from"./index-24aaf4e2.js";import{S as B}from"./index-4934e078.js";const T=({thumbnail:x,name:j,bal:p,inWatchList:N,OnClickViewDetails:g,rest:a})=>{var c,r,e,b;let m=f();const{greyTexts:w}=D();return C(d=>d==null?void 0:d.userReducer),o.jsxs(i,{children:[o.jsxs(n,{w:"100%",h:"200px",mb:"5px",flexDir:"row",align:"center",children:[o.jsx(B,{logo:((c=a==null?void 0:a.brand)==null?void 0:c.logo)||x,bg:(r=a==null?void 0:a.brand)!=null&&r.color?`#${(e=a==null?void 0:a.brand)==null?void 0:e.color}`:"#363636",userName:a==null?void 0:a.userName}),o.jsxs(n,{w:"15%",h:"160px",flexDir:"column",ml:"3%",children:[o.jsxs(u,{children:[o.jsx(i,{borderColor:`#${(b=a==null?void 0:a.brand)==null?void 0:b.color}`,borderWidth:"2px",p:"3px",borderRadius:50,as:"button",onClick:()=>{var d,h;return m(`${k}/dashboard/shop/${a==null?void 0:a.brandId}`,{state:{id:(d=a==null?void 0:a.brand)==null?void 0:d.id,slug:(h=a==null?void 0:a.brand)==null?void 0:h.slug,brandName:a==null?void 0:a.brandName}})},children:o.jsx(i,{bgColor:"#9999996B",borderRadius:20,children:o.jsx(n,{w:{base:5,md:10},h:{base:5,md:10},background:`url(${x}) center/contain no-repeat`,borderRadius:20})})}),o.jsx(l,{children:j})]}),o.jsx(s,{}),o.jsxs(u,{children:[o.jsx(l,{...w,children:"Balance:"}),o.jsx(l,{children:p})]})]}),o.jsx(s,{}),o.jsx(n,{w:"20%px",h:"160px",flexDir:"column",align:"flex-end",children:o.jsx(R,{as:S,bg:"dark",color:"white",w:"150px",h:"50px",_hover:{bg:"black"},borderRadius:"0px",onClick:g,children:o.jsx(l,{children:"View details"})})})]}),o.jsx(v,{w:"100%"})]})},D=()=>({greyTexts:{color:"#999999",fontSize:"14px"}});export{T as default,D as useStyles};
