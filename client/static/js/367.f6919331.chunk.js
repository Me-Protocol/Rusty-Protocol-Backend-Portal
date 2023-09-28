"use strict";(self.webpackChunkapp_web_frontend=self.webpackChunkapp_web_frontend||[]).push([[367],{28570:function(e,n,t){var a,r=t(36459),o=t(30168),c=t(52554),i=t(76582),s=t(81146),u=t(10884),d=t(72791),l=t(62825),p=t(80184),g=(0,c.F4)(a||(a=(0,o.Z)(["\n  0% {\n    transform: scale(1);\n  }\n  50% {\n    transform: scale(1.2);\n  }\n  100% {\n    transform: scale(1);\n  }\n"]))),f=function(e){Object.assign({},((0,r.Z)(e),e));return(0,p.jsxs)(i.k,{pos:"absolute",bg:"white",h:"100vh",w:"100vw",align:"center",justify:"center",flexDirection:"column",alignSelf:"center",children:[(0,p.jsx)(i.k,{w:"15vw",h:"15vw",borderRadius:"10vw",align:"center",justify:"center",borderWidth:1,borderColor:"dark",animation:"".concat(g," 2s infinite"),children:(0,p.jsx)(s.E,{src:l.Z.appLogo,objectFit:"cover",w:"10vw",h:"10vw"})}),(0,p.jsx)(u.x,{fontSize:"3vh",mt:"3vh",children:"Loading..."})]})};n.Z=(0,d.memo)(f)},70367:function(e,n,t){t.r(n),t.d(n,{default:function(){return P}});var a=t(1413),r=t(72791),o=t(76582),c=t(62577),i=t(92746),s=t(28773),u=t(57689),d=t(30253),l=t(777),p=t(25984),g=t(95048),f=t(35378),h=t(23823),v=t(28570),y=t(52780),b=t(74165),x=t(15861),m=t(35486),j=t(95273),_=t(74569),w=t.n(_),k=function(e){return e.BRAND="brand",e.PRODUCT="product",e.SUB_CATEGORY="sub-category",e}({}),C=(0,j.hg)("api/post-category",function(){var e=(0,x.Z)((0,b.Z)().mark((function e(n){var t,r,o,c;return(0,b.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.token,r=n.request_body,e.prev=1,e.next=4,w().post("".concat(m._n,"/category"),(0,a.Z)({},r),{headers:{Authorization:"Bearer ".concat(t)}});case 4:return o=e.sent,c=o.data,e.abrupt("return",null===c||void 0===c?void 0:c.data);case 9:throw e.prev=9,e.t0=e.catch(1),e.t0;case 12:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(n){return e.apply(this,arguments)}}()),Z=(0,j.hg)("api/get-sub-category",function(){var e=(0,x.Z)((0,b.Z)().mark((function e(n){var t,a,r,o,c,i,s;return(0,b.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.token,a=n.page,r=void 0===a?1:a,o=n.limit,c=void 0===o?10:o,e.prev=1,e.next=4,w().get("".concat(m._n,"/category?page=").concat(r,"&limit=").concat(c,"&type=sub-category"),{headers:{Authorization:"Bearer ".concat(t)}});case 4:return i=e.sent,s=i.data,e.abrupt("return",null===s||void 0===s?void 0:s.data);case 9:throw e.prev=9,e.t0=e.catch(1),e.t0;case 12:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(n){return e.apply(this,arguments)}}()),z=(0,j.hg)("api/get-category",function(){var e=(0,x.Z)((0,b.Z)().mark((function e(n){var t,a,r,o,c,i,s,u;return(0,b.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.token,a=n.page,r=void 0===a?1:a,o=n.limit,c=void 0===o?10:o,i=n.type,e.prev=1,e.next=4,w().get("".concat(m._n,"/category?page=").concat(r,"&limit=").concat(c,"&type=").concat(i),{headers:{Authorization:"Bearer ".concat(t)}});case 4:return s=e.sent,u=s.data,e.abrupt("return",null===u||void 0===u?void 0:u.data);case 9:throw e.prev=9,e.t0=e.catch(1),e.t0;case 12:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(n){return e.apply(this,arguments)}}()),S=(0,j.hg)("api/put-category",function(){var e=(0,x.Z)((0,b.Z)().mark((function e(n){var t,a,r,o;return(0,b.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.token,a=n.categoryId,e.prev=1,e.next=4,w().put("".concat(m._n,"/category/").concat(a),{headers:{Authorization:"Bearer ".concat(t)}});case 4:return r=e.sent,o=r.data,e.abrupt("return",null===o||void 0===o?void 0:o.data);case 9:throw e.prev=9,e.t0=e.catch(1),e.t0;case 12:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(n){return e.apply(this,arguments)}}()),A=(0,j.oM)({name:"category",initialState:{category_data:{},sub_category_data:{},category_loading:!1,category_error_msg:null},reducers:{categoryQuery:function(e){}},extraReducers:function(e){e.addCase(C.pending,(function(e){e.category_loading=!0})),e.addCase(C.fulfilled,(function(e){e.category_loading=!1})),e.addCase(C.rejected,(function(e){e.category_loading=!1})),e.addCase(z.pending,(function(e){e.category_loading=!0})),e.addCase(z.fulfilled,(function(e,n){var t=n.payload;e.category_loading=!1,e.category_data=t})),e.addCase(z.rejected,(function(e){e.category_loading=!1})),e.addCase(Z.pending,(function(e){e.category_loading=!0})),e.addCase(Z.fulfilled,(function(e,n){var t=n.payload;e.category_loading=!1,e.sub_category_data=t})),e.addCase(Z.rejected,(function(e){e.category_loading=!1})),e.addCase(S.pending,(function(e){e.category_loading=!0})),e.addCase(S.fulfilled,(function(e,n){n.payload;e.category_loading=!1})),e.addCase(S.rejected,(function(e){e.category_loading=!1}))}}),O=(A.actions.categoryQuery,A.reducer,t(80184)),F=(0,r.lazy)((function(){return Promise.resolve().then(t.bind(t,54776))})),R=(0,r.lazy)((function(){return t.e(5442).then(t.bind(t,55442))})),L=(0,r.lazy)((function(){return Promise.all([t.e(6669),t.e(3587)]).then(t.bind(t,10173))})),B=(0,r.lazy)((function(){return Promise.all([t.e(828),t.e(5717),t.e(474),t.e(7572)]).then(t.bind(t,7572))})),D=(0,r.lazy)((function(){return t.e(1044).then(t.bind(t,61044))})),P=function(){var e,n,t=(0,u.s0)(),b=((0,g.I0)(),(0,l.r)().root),x=(0,f.NL)({page:1,limit:10,type:k.PRODUCT},{refetchOnMountOrArgChange:300}),m=x.data,j=(x.error,x.isLoading),_=(0,f.rY)({page:1,limit:8},{refetchOnMountOrArgChange:!0});_.data,_.isLoading,(0,g.v9)((function(e){return e.authReducer})).token;return(0,O.jsxs)(o.k,{flexDir:"column",children:[(0,O.jsx)(r.Suspense,{fallback:(0,O.jsx)(c.$,{size:"sm"}),children:(0,O.jsx)(F,{})}),(0,O.jsx)(h.default,{children:(0,O.jsxs)(i.K,(0,a.Z)((0,a.Z)({},b),{},{children:[(0,O.jsxs)(r.Suspense,{fallback:(0,O.jsx)(c.$,{size:"sm"}),children:[(0,O.jsx)(R,{breadcrumbs:[{name:"Home",link:"".concat(y.cn,"/dashboard")},{name:"Shops",link:"".concat(y.cn,"/dashboard/shop"),isCurrentPage:!0}]}),(0,O.jsx)(D,{title:"Discover worlds.",desc:"Explore brand\u2019s shops.",buttonLabel:"",icon:(0,O.jsx)(d.N3,{color:"#FFFFFF",w:"330px",h:"300px"}),design:"",onClick:function(){t("".concat(y.cn,"/dashboard/shop"))}})]}),(0,O.jsx)(r.Suspense,{fallback:(0,O.jsx)(c.$,{size:"sm"}),children:null===m||void 0===m||null===(e=m.data)||void 0===e||null===(n=e.categories)||void 0===n?void 0:n.map((function(e,n){return(0,O.jsx)(s.O,{borderRadius:"10px",isLoaded:!j,children:(0,O.jsx)(B,{shopArray:n,forStore:!0})},(0,p.x0)())}))})]}))}),(0,O.jsx)(r.Suspense,{fallback:(0,O.jsx)(c.$,{size:"sm"}),children:(0,O.jsx)(L,{})}),j&&(0,O.jsx)(v.Z,{})]})}}}]);
//# sourceMappingURL=367.f6919331.chunk.js.map