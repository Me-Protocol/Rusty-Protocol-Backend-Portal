import{r as u,y as i,j as r,F as f,I as h}from"./index-24aaf4e2.js";import{c as j}from"./countries-020c4914.js";import{S as y}from"./chunk-3RSXBRAN-45aac649.js";const S=({value:o,onChange:l,isCallingCode:s,disabled:p,...m})=>{var a,c;const{root:x}=g(),t=(a=j)==null?void 0:a.map(e=>({id:i(),...e})).sort((e,d)=>e.name.localeCompare(d.name)),n=(c=t.filter(e=>e.name===o||e.callingCodes[0]===o))==null?void 0:c[0];return r.jsxs(f,{...x,...m,children:[r.jsx(h,{"data-testid":"img-1",src:n==null?void 0:n.flag,style:{width:"28px",height:"28px",borderRadius:"20px"}}),r.jsx(y,{onChange:l,value:o,variant:"unstyled",placeholder:"Select country..",pl:"5px",h:"48px",alignSelf:"center",justifySelf:"center",justifyContent:"center",disabled:p,children:t==null?void 0:t.map(e=>r.jsx("option",{value:s?e.callingCodes[0]:e.name,children:s?"":e.name},i()))})]})},R=u.memo(S),g=()=>({root:{w:"100%",h:"48px",align:"center",justify:"center",borderRadius:58,px:"10px",outline:"none",boxShadow:"0px"}});export{R as default};
