import{r as j,u as g,a as p,d as i,j as e,F as o,ah as b,m as I,i as f,G as n,I as x,f as l,w as v,a0 as E}from"./index-4d742258.js";const w=({customPadding:L})=>{var r,c;let t=g();p();const{token:u}=i(a=>a.authReducer),{user_data:s}=i(a=>a.userReducer),{root:h,homeIcon:m,iconsLogo:d}=F();return e.jsx(o,{...h,pos:"absolute",flexDir:"column",children:e.jsx(b,{w:"100%",bg:"#E3E3E3",children:e.jsx(I,{children:e.jsxs(f,{children:[e.jsx(o,{...m,as:"button",onClick:()=>{t(u?`${n}/dashboard`:`${n}/`)},children:e.jsx(x,{src:l.appLogo,objectFit:"cover"})}),e.jsx(v,{}),e.jsxs(e.Fragment,{children:[e.jsx(o,{as:"button",...d,onClick:()=>t(`${n}/bag`),children:e.jsx(x,{src:l.box})}),e.jsx(o,{as:"button",children:e.jsx(E,{ml:"5px",name:`${(r=s==null?void 0:s.customer)==null?void 0:r.name}`,src:(c=s==null?void 0:s.customer)==null?void 0:c.profilePicture,size:"xs"})})]})]})})})})},k=j.memo(w),F=()=>({root:{w:"100%",zIndex:10},homeIcon:{width:"44px",height:"44px",justify:"center",align:"center",mr:"2%"},iconsLogo:{width:"30px",height:"24px",justify:"center",align:"center"}});export{k as default,F as useNavbarStyles};