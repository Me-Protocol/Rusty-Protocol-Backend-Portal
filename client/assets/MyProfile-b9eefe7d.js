import{r as n,_ as ie,A as ae,b as ce,a as pe,d as N,aR as ue,j as e,h as l,i as x,ak as y,T as r,K as he,S as B,M as xe,am as u,al as de,an as ge,t as M,a1 as _,g as W,B as me}from"./index-7489b734.js";const fe=n.lazy(()=>ie(()=>import("./index-dfffaeda.js"),["assets/index-dfffaeda.js","assets/index-7489b734.js","assets/index-ed5220eb.css","assets/countries-020c4914.js","assets/chunk-3RSXBRAN-1b3113aa.js"])),je=()=>{var R,F,k,U,E,P,A,z;const{button:$,profileFont1:O,profileFont2:G,profileFont3:i,inputStyle:c}=K();ae();let S=ce();const C=pe(),{countrySelect:Y}=K(),{user_data:o}=N(t=>t.userReducer),{token:p}=N(t=>t.authReducer),[w]=ue(),[d,Z]=n.useState(((R=o==null?void 0:o.customer)==null?void 0:R.location)||"United States of America"),[V,q]=n.useState(),[v,J]=n.useState(),[Q,g]=n.useState(!1),[m,X]=n.useState((F=o==null?void 0:o.customer)==null?void 0:F.height),[f,ee]=n.useState((k=o==null?void 0:o.customer)==null?void 0:k.weight),[j,oe]=n.useState((U=o==null?void 0:o.customer)==null?void 0:U.bio),[b,te]=n.useState((E=o==null?void 0:o.customer)==null?void 0:E.name);function se(t){console.log(t.target.files),q(URL.createObjectURL(t.target.files[0])),J(t.target.files[0])}console.log(o,"this is data");async function re(){const{signature:t,timestamp:h,cloudName:L,apiKey:le}=await W.get(`${me}/upload/image-signature`,{headers:{Authorization:`Bearer ${p}`}}).then(({data:s})=>{var T,D,H,I;return{apiKey:(T=s==null?void 0:s.data)==null?void 0:T.apiKey,cloudName:(D=s==null?void 0:s.data)==null?void 0:D.cloudName,signature:(H=s==null?void 0:s.data)==null?void 0:H.signature,timestamp:(I=s==null?void 0:s.data)==null?void 0:I.timestamp}}),a=new FormData;return a.append("file",v),a.append("cloud_name",L),a.append("api_key",le),a.append("timestamp",h),a.append("signature",t),W.post(`https://api.cloudinary.com/v1_1/${L}/upload`,a,{headers:{"Content-Type":"multipart/form-data"}}).then(({data:s})=>(console.log(s,"pppp"),{secure_url:s==null?void 0:s.secure_url}))}async function ne(){if(g(!0),v){const{secure_url:t}=await re();await w({fullName:b,profilePicture:t,location:d,weight:f,height:m,bio:j}).then(({data:h})=>{p&&C(M({token:p})),_(S,"Profile updated successfully")}).catch(h=>{console.log(h,"UPDATeYUSERZRR")}).finally(()=>{g(!1)});return}await w({name:b,location:d,weight:f,height:m,bio:j}).then(({data:t})=>{p&&C(M({token:p})),_(S,"Profile updated successfully")}).catch(t=>{console.log(t,"UPDATeYUSERZRR")}).finally(()=>{g(!1)})}return e.jsxs(l,{children:[e.jsxs(x,{children:[e.jsx(y,{children:e.jsx(r,{...O,children:"Edit Profile"})}),e.jsx(he,{}),e.jsx(y,{as:"button",...$,onClick:ne,children:e.jsx(r,{children:Q?e.jsx(B,{size:"xs"}):"Save"})})]}),e.jsxs(x,{py:"2%",children:[e.jsx(xe,{name:(P=o==null?void 0:o.customer)==null?void 0:P.name,src:V||((A=o==null?void 0:o.customer)==null?void 0:A.profilePicture)}),e.jsxs(l,{children:[e.jsx(r,{...G,children:(z=o==null?void 0:o.customer)==null?void 0:z.name}),e.jsx(r,{...i,decoration:"underline",as:"button",children:e.jsxs("div",{children:[e.jsx("label",{htmlFor:"image_uploads",style:{cursor:"pointer"},children:"Change profile photo"}),e.jsx("input",{type:"file",id:"image_uploads",name:"image_uploads",accept:".jpg, .jpeg, .png",style:{opacity:"0"},onChange:se,placeholder:"Changle profile photo"})]})})]})]}),e.jsxs(l,{children:[e.jsxs(x,{w:"100%",children:[e.jsxs(l,{w:"25%",children:[e.jsx(r,{...i,ml:"0",children:"Full Name"}),e.jsx(u,{...c,placeholder:"Enter Full Name",value:b,onChange:({target:t})=>{te(t.value)},border:"1px solid rgba(0, 0, 0, 0.08)",_focus:{borderColor:"dark",boxShadow:"none"}})]}),e.jsxs(l,{w:"50%",children:[e.jsx(r,{...i,ml:"0",children:"Email"}),e.jsx(u,{...c,placeholder:"Enter Email",isDisabled:!0,value:o==null?void 0:o.email,border:"1px solid rgba(0, 0, 0, 0.08)",_focus:{borderColor:"dark",boxShadow:"none"}})]})]}),e.jsxs(x,{py:"20px",children:[e.jsxs(l,{w:"50%",children:[e.jsx(r,{...i,ml:"0",children:"Location"}),e.jsx(n.Suspense,{fallback:e.jsx(B,{size:"sm"}),children:e.jsx(fe,{value:d,onChange:t=>{Z(t.target.value)},...Y})})]}),e.jsxs(l,{w:"25%",children:[e.jsx(r,{...i,ml:"0",children:"Weight"}),e.jsxs(de,{children:[e.jsx(u,{type:"number",...c,placeholder:"Enter Weight",value:f,onChange:({target:t})=>{ee(t.value)},border:"1px solid rgba(0, 0, 0, 0.08)",_focus:{borderColor:"dark",boxShadow:"none"}}),e.jsx(ge,{mr:2,mt:1,fontSize:"6px",children:e.jsx(y,{children:e.jsx("span",{style:{fontSize:"12px"},children:"kg"})})})]})]}),e.jsxs(l,{w:"25%",children:[e.jsx(r,{...i,ml:"0",children:"Height"}),e.jsx(u,{...c,placeholder:"Enter Height",value:m,onChange:({target:t})=>{X(t.value)},border:"1px solid rgba(0, 0, 0, 0.08)",_focus:{borderColor:"dark",boxShadow:"none"}})]})]}),e.jsxs(l,{children:[e.jsx(r,{...i,ml:"0",children:"Bio"}),e.jsx(u,{...c,p:"15px",as:"textarea",h:"100px",w:"100%",textAlign:"start",placeholder:" Write your bio here. It must be at least 5 characters long.",noOfLines:5,_focus:{borderColor:"dark",boxShadow:"none"},value:j,onChange:({target:t})=>{oe(t.value)},border:"1px solid rgba(0, 0, 0, 0.08)"})]})]})]})},ye=je,K=()=>({button:{display:"flex",alignItems:"center",justifyContent:"center",width:"71px",height:"42px",border:"1px solid #000000",borderRadius:"100px"},copyrightText:{color:"light",fontSize:["14px","16px","16px","14px","16px"]},countrySelect:{w:"100%",bg:"light",color:"dark",borderWidth:"1px",my:"30px",borderRadius:"0px",borderColor:"grey"},linksStyle:{color:"darkGrey"},profileFont1:{fontSize:"24px",lineHeight:"29px",color:"#000000"},profileFont2:{fontSize:"18px",lineHeight:"22px",color:"#000000"},profileFont3:{fontSize:"14px",lineHeight:"17px",color:"#000000",marginLeft:0,left:0},profileFont4:{fontSize:"14px",lineHeight:"20px",color:"#AFAFAF",marginLeft:0,left:0},inputStyle:{h:"48px",borderColor:"grey",variant:"outline",borderRadius:"0px"}});export{ye as M};
