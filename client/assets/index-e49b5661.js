import{r as l,j as e,F as s,i,a_ as b,a$ as m,b0 as f,T as F,w as k,a7 as _,ah as S,aR as w,E as y,aN as C,ai as I,I as t,f as n}from"./index-9a3a3312.js";const c=[{id:"1",name:"All Rewards"}],A=({isListMode:a,setIsListMode:o,setSearchQuery:x,searchQuery:d})=>{const{container:E,font:z,popfont:R,root:h,smallerDesc:p,search:j}=v(),u=l.useCallback(()=>{o(!0)},[a]),g=l.useCallback(()=>{o(!1)},[a]);return e.jsx(e.Fragment,{children:e.jsx(s,{w:"100%",align:"center",children:e.jsxs(i,{...h,children:[e.jsx(b,{isLazy:!0,children:e.jsx(m,{children:c==null?void 0:c.map((r,T)=>l.createElement(f,{...p,_selected:{color:"black",borderColor:"black"},key:r.id,color:"#999999"},e.jsx(F,{children:r.name})))})}),e.jsx(k,{}),e.jsxs(i,{children:[e.jsx(_,{children:e.jsx(s,{as:"button",...j,justify:"center",align:"center",children:e.jsxs(S,{children:[e.jsx(w,{pointerEvents:"none",children:e.jsx(y,{as:C,color:"#999999"})}),e.jsx(I,{value:d,placeholder:"Filter Cards...",borderRadius:"0",borderWidth:"0",onChange:r=>x(r.target.value)})]})})}),e.jsx(s,{width:"40px",height:"40px",justify:"center",align:"center",bg:"black",onClick:u,children:a?e.jsx(t,{src:n.list_mode_dark}):e.jsx(t,{src:n.list_mode_light})}),e.jsx(s,{display:["none","flex"],width:"40px",height:"40px",justify:"center",align:"center",onClick:g,children:a?e.jsx(t,{src:n.grid_mode_light}):e.jsx(t,{src:n.grid_mode_dark})})]})]})})})},v=()=>({root:{align:"flex-start",width:{base:"85vw",md:"100%"}},head:{fontSize:{base:"18px",md:"20px"}},smallerDesc:{fontSize:{base:"10px",md:"16px"}},container:{w:"100px",h:"36px",_hover:{background:"black",color:"white"}},search:{w:"240px",h:"40px",background:"#F6F6F6",borderRadius:"53px"},font:{fontSize:"16px",lineHeight:"19px",_hover:{color:"#FFFFFF"}},popfont:{fontSize:"12px",lineHeight:"14px",color:"#999999"}});export{A as MyAssetsFilterSearchBar,A as default,v as useStyles};
