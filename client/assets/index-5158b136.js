import{r as u,q as i,j as n,F as h,I as j,ah as S,aW as f}from"./index-d2f88df5.js";import{c as g}from"./countries-020c4914.js";import{S as y}from"./chunk-3RSXBRAN-cbfc2768.js";const C=({value:o,onChange:l,isCallingCode:s,disabled:m,...p})=>{var a,c;const{root:x}=w(),r=(a=g)==null?void 0:a.map(e=>({id:i(),...e})).sort((e,d)=>e.name.localeCompare(d.name)),t=(c=r.filter(e=>e.name===o||e.callingCodes[0]===String(o).replace("+","")))==null?void 0:c[0];return n.jsxs(h,{...x,...p,children:[n.jsx(j,{"data-testid":"img-1",src:t==null?void 0:t.flag,style:{width:"28px",height:"28px",borderRadius:"20px"}},t==null?void 0:t.flag),n.jsx(y,{onChange:l,value:o,placeholder:"Select country..",pl:"5px",h:"48px",variant:"unstyled",icon:n.jsx(S,{mt:4,children:n.jsx(f,{})}),mt:-4,alignSelf:"center",justifySelf:"center",justifyContent:"center",alignItems:"center",disabled:m,children:r==null?void 0:r.map(e=>n.jsx("option",{value:s?`+${e.callingCodes[0]}`:e.name,children:s?`${e.name} (+${e.callingCodes[0]})`:e.name},i()))})]})},R=u.memo(C),w=()=>({root:{w:"100%",h:"48px",spacing:4,alignItems:"center",justify:"center",borderRadius:58,px:"10px",outline:"none",boxShadow:"0px"}});export{R as default};
