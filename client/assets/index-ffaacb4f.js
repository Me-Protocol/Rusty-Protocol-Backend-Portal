import{r as j,u as g,a as p,d as i,j as e,F as o,al as b,m as I,i as f,G as n,I as x,f as l,E,a5 as v}from"./index-c853c0cb.js";const F=({customPadding:R})=>{var r,c;let t=g();p();const{token:u}=i(a=>a.authReducer),{user_data:s}=i(a=>a.userReducer),{root:m,homeIcon:h,iconsLogo:d}=L();return e.jsx(o,{...m,pos:"absolute",flexDir:"column",children:e.jsx(b,{w:"100%",bg:"#E3E3E3",children:e.jsx(I,{children:e.jsxs(f,{children:[e.jsx(o,{...h,as:"button",onClick:()=>{t(u?`${n}/dashboard`:`${n}/`)},children:e.jsx(x,{src:l.appLogo,objectFit:"cover"})}),e.jsx(E,{}),e.jsxs(e.Fragment,{children:[e.jsx(o,{as:"button",...d,onClick:()=>t(`${n}/bag`),children:e.jsx(x,{src:l.box})}),e.jsx(o,{as:"button",children:e.jsx(v,{ml:"5px",name:`${(r=s==null?void 0:s.customer)==null?void 0:r.name}`,src:(c=s==null?void 0:s.customer)==null?void 0:c.profilePicture,size:"xs"})})]})]})})})})},w=j.memo(F),L=()=>({root:{w:"100%",zIndex:10},homeIcon:{width:"44px",height:"44px",justify:"center",align:"center",mr:"2%"},iconsLogo:{width:"30px",height:"24px",justify:"center",align:"center"}});export{w as default,L as useNavbarStyles};
