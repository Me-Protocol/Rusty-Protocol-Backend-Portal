"use strict";(self.webpackChunkapp_web_frontend=self.webpackChunkapp_web_frontend||[]).push([[5442],{55442:function(e,r,a){a.r(r),a.d(r,{default:function(){return S}});var s=a(1413),n=a(45987),c=a(29439),i=(0,a(9886).k)({name:"BreadcrumbStylesContext",errorMessage:"useBreadcrumbStyles returned is 'undefined'. Seems you forgot to wrap the components in \"<Breadcrumb />\" "}),t=(0,c.Z)(i,2),l=t[0],m=t[1],p=a(36992),u=a(7200),d=a(75597),o=a(32481),h=a(62996),x=a(45113),b=a(72791),f=a(80184),g=["children","spacing","separator","className","listProps"],_=(0,d.G)((function(e,r){var a=(0,o.jC)("Breadcrumb",e),c=(0,h.Lr)(e),i=c.children,t=c.spacing,m=void 0===t?"0.5rem":t,d=c.separator,_=void 0===d?"/":d,Z=c.className,v=c.listProps,j=(0,n.Z)(c,g),k=(0,u.W)(i),C=k.length,N=k.map((function(e,r){return(0,b.cloneElement)(e,{separator:_,spacing:m,isLastChild:C===r+1})})),y=(0,p.cx)("chakra-breadcrumb",Z);return(0,f.jsx)(x.m.nav,(0,s.Z)((0,s.Z)({ref:r,"aria-label":"breadcrumb",className:y,__css:a.container},j),{},{children:(0,f.jsx)(l,{value:a,children:(0,f.jsx)(x.m.ol,(0,s.Z)((0,s.Z)({className:"chakra-breadcrumb__list"},v),{},{__css:(0,s.Z)({display:"flex",alignItems:"center"},a.list),children:N}))})}))}));_.displayName="Breadcrumb";var Z=a(81146),v=["isCurrentPage","as","className","href"],j=(0,d.G)((function(e,r){var a=e.isCurrentPage,c=e.as,i=e.className,t=e.href,l=(0,n.Z)(e,v),u=m(),d=(0,s.Z)({ref:r,as:c,className:(0,p.cx)("chakra-breadcrumb__link",i)},l);return a?(0,f.jsx)(x.m.span,(0,s.Z)({"aria-current":"page",__css:u.link},d)):(0,f.jsx)(x.m.a,(0,s.Z)({__css:u.link,href:t},d))}));j.displayName="BreadcrumbLink";var k=["spacing"],C=(0,d.G)((function(e,r){var a=e.spacing,c=(0,n.Z)(e,k),i=m(),t=(0,s.Z)({mx:a},i.separator);return(0,f.jsx)(x.m.span,(0,s.Z)((0,s.Z)({ref:r,role:"presentation"},c),{},{__css:t}))}));C.displayName="BreadcrumbSeparator";var N=["isCurrentPage","separator","isLastChild","spacing","children","className"],y=(0,d.G)((function(e,r){var a=e.isCurrentPage,c=e.separator,i=e.isLastChild,t=e.spacing,l=e.children,d=e.className,o=(0,n.Z)(e,N),h=(0,u.W)(l).map((function(e){return e.type===j?(0,b.cloneElement)(e,{isCurrentPage:a}):e.type===C?(0,b.cloneElement)(e,{spacing:t,children:e.props.children||c}):e})),g=m(),_=(0,s.Z)({display:"inline-flex",alignItems:"center"},g.item),Z=(0,p.cx)("chakra-breadcrumb__list-item",d);return(0,f.jsxs)(x.m.li,(0,s.Z)((0,s.Z)({ref:r,className:Z},o),{},{__css:_,children:[h,!i&&(0,f.jsx)(C,{spacing:t,children:c})]}))}));y.displayName="BreadcrumbItem";var P=a(10884),B=a(11087),w=a(62825),L=a(95273),S=function(e){var r=e.breadcrumbs;return(0,f.jsx)(_,{spacing:"1px",separator:(0,f.jsx)(Z.E,{src:w.Z.breadcrumbArrow}),mb:"20px",children:null===r||void 0===r?void 0:r.map((function(e){return(0,f.jsx)(y,{isCurrentPage:e.isCurrentPage,children:(0,f.jsx)(j,{as:B.rU,to:e.link,children:(0,f.jsx)(P.x,{fontSize:["14px","14px","14px","14px","14px"],children:e.name})})},(0,L.x0)())}))})}}}]);
//# sourceMappingURL=5442.b355c745.chunk.js.map