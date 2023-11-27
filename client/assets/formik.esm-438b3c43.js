import{aY as jt,r as l}from"./index-084f02dc.js";var Ot=function(r){return Ft(r)&&!It(r)};function Ft(e){return!!e&&typeof e=="object"}function It(e){var r=Object.prototype.toString.call(e);return r==="[object RegExp]"||r==="[object Date]"||Mt(e)}var wt=typeof Symbol=="function"&&Symbol.for,Ct=wt?Symbol.for("react.element"):60103;function Mt(e){return e.$$typeof===Ct}function Rt(e){return Array.isArray(e)?[]:{}}function ve(e,r){return r.clone!==!1&&r.isMergeableObject(e)?ae(Rt(e),e,r):e}function Pt(e,r,t){return e.concat(r).map(function(n){return ve(n,t)})}function Lt(e,r,t){var n={};return t.isMergeableObject(e)&&Object.keys(e).forEach(function(i){n[i]=ve(e[i],t)}),Object.keys(r).forEach(function(i){!t.isMergeableObject(r[i])||!e[i]?n[i]=ve(r[i],t):n[i]=ae(e[i],r[i],t)}),n}function ae(e,r,t){t=t||{},t.arrayMerge=t.arrayMerge||Pt,t.isMergeableObject=t.isMergeableObject||Ot;var n=Array.isArray(r),i=Array.isArray(e),o=n===i;return o?n?t.arrayMerge(e,r,t):Lt(e,r,t):ve(r,t)}ae.all=function(r,t){if(!Array.isArray(r))throw new Error("first argument should be an array");return r.reduce(function(n,i){return ae(n,i,t)},{})};var Me=ae,Dt=typeof global=="object"&&global&&global.Object===Object&&global;const Nr=Dt;var xt=typeof self=="object"&&self&&self.Object===Object&&self,Nt=Nr||xt||Function("return this")();const D=Nt;var Vt=D.Symbol;const V=Vt;var Vr=Object.prototype,Ut=Vr.hasOwnProperty,Bt=Vr.toString,te=V?V.toStringTag:void 0;function Ht(e){var r=Ut.call(e,te),t=e[te];try{e[te]=void 0;var n=!0}catch{}var i=Bt.call(e);return n&&(r?e[te]=t:delete e[te]),i}var Gt=Object.prototype,zt=Gt.toString;function Kt(e){return zt.call(e)}var kt="[object Null]",Wt="[object Undefined]",lr=V?V.toStringTag:void 0;function k(e){return e==null?e===void 0?Wt:kt:lr&&lr in Object(e)?Ht(e):Kt(e)}function Ur(e,r){return function(t){return e(r(t))}}var Yt=Ur(Object.getPrototypeOf,Object);const Ve=Yt;function W(e){return e!=null&&typeof e=="object"}var qt="[object Object]",Xt=Function.prototype,Zt=Object.prototype,Br=Xt.toString,Jt=Zt.hasOwnProperty,Qt=Br.call(Object);function fr(e){if(!W(e)||k(e)!=qt)return!1;var r=Ve(e);if(r===null)return!0;var t=Jt.call(r,"constructor")&&r.constructor;return typeof t=="function"&&t instanceof t&&Br.call(t)==Qt}var dr=Array.isArray,pr=Object.keys,en=Object.prototype.hasOwnProperty,rn=typeof Element<"u";function Re(e,r){if(e===r)return!0;if(e&&r&&typeof e=="object"&&typeof r=="object"){var t=dr(e),n=dr(r),i,o,u;if(t&&n){if(o=e.length,o!=r.length)return!1;for(i=o;i--!==0;)if(!Re(e[i],r[i]))return!1;return!0}if(t!=n)return!1;var p=e instanceof Date,g=r instanceof Date;if(p!=g)return!1;if(p&&g)return e.getTime()==r.getTime();var v=e instanceof RegExp,$=r instanceof RegExp;if(v!=$)return!1;if(v&&$)return e.toString()==r.toString();var O=pr(e);if(o=O.length,o!==pr(r).length)return!1;for(i=o;i--!==0;)if(!en.call(r,O[i]))return!1;if(rn&&e instanceof Element&&r instanceof Element)return e===r;for(i=o;i--!==0;)if(u=O[i],!(u==="_owner"&&e.$$typeof)&&!Re(e[u],r[u]))return!1;return!0}return e!==e&&r!==r}var tn=function(r,t){try{return Re(r,t)}catch(n){if(n.message&&n.message.match(/stack|recursion/i)||n.number===-2146828260)return console.warn("Warning: react-fast-compare does not handle circular references.",n.name,n.message),!1;throw n}};const H=jt(tn);var nn=!0;function Hr(e,r){if(!nn){if(e)return;var t="Warning: "+r;typeof console<"u"&&console.warn(t);try{throw Error(t)}catch{}}}function an(){this.__data__=[],this.size=0}function Gr(e,r){return e===r||e!==e&&r!==r}function he(e,r){for(var t=e.length;t--;)if(Gr(e[t][0],r))return t;return-1}var on=Array.prototype,un=on.splice;function cn(e){var r=this.__data__,t=he(r,e);if(t<0)return!1;var n=r.length-1;return t==n?r.pop():un.call(r,t,1),--this.size,!0}function sn(e){var r=this.__data__,t=he(r,e);return t<0?void 0:r[t][1]}function ln(e){return he(this.__data__,e)>-1}function fn(e,r){var t=this.__data__,n=he(t,e);return n<0?(++this.size,t.push([e,r])):t[n][1]=r,this}function N(e){var r=-1,t=e==null?0:e.length;for(this.clear();++r<t;){var n=e[r];this.set(n[0],n[1])}}N.prototype.clear=an;N.prototype.delete=cn;N.prototype.get=sn;N.prototype.has=ln;N.prototype.set=fn;function dn(){this.__data__=new N,this.size=0}function pn(e){var r=this.__data__,t=r.delete(e);return this.size=r.size,t}function vn(e){return this.__data__.get(e)}function hn(e){return this.__data__.has(e)}function ue(e){var r=typeof e;return e!=null&&(r=="object"||r=="function")}var gn="[object AsyncFunction]",yn="[object Function]",bn="[object GeneratorFunction]",mn="[object Proxy]";function zr(e){if(!ue(e))return!1;var r=k(e);return r==yn||r==bn||r==gn||r==mn}var Tn=D["__core-js_shared__"];const Fe=Tn;var vr=function(){var e=/[^.]+$/.exec(Fe&&Fe.keys&&Fe.keys.IE_PROTO||"");return e?"Symbol(src)_1."+e:""}();function En(e){return!!vr&&vr in e}var Sn=Function.prototype,_n=Sn.toString;function Y(e){if(e!=null){try{return _n.call(e)}catch{}try{return e+""}catch{}}return""}var An=/[\\^$.*+?()[\]{}|]/g,$n=/^\[object .+?Constructor\]$/,jn=Function.prototype,On=Object.prototype,Fn=jn.toString,In=On.hasOwnProperty,wn=RegExp("^"+Fn.call(In).replace(An,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function Cn(e){if(!ue(e)||En(e))return!1;var r=zr(e)?wn:$n;return r.test(Y(e))}function Mn(e,r){return e==null?void 0:e[r]}function q(e,r){var t=Mn(e,r);return Cn(t)?t:void 0}var Rn=q(D,"Map");const ie=Rn;var Pn=q(Object,"create");const oe=Pn;function Ln(){this.__data__=oe?oe(null):{},this.size=0}function Dn(e){var r=this.has(e)&&delete this.__data__[e];return this.size-=r?1:0,r}var xn="__lodash_hash_undefined__",Nn=Object.prototype,Vn=Nn.hasOwnProperty;function Un(e){var r=this.__data__;if(oe){var t=r[e];return t===xn?void 0:t}return Vn.call(r,e)?r[e]:void 0}var Bn=Object.prototype,Hn=Bn.hasOwnProperty;function Gn(e){var r=this.__data__;return oe?r[e]!==void 0:Hn.call(r,e)}var zn="__lodash_hash_undefined__";function Kn(e,r){var t=this.__data__;return this.size+=this.has(e)?0:1,t[e]=oe&&r===void 0?zn:r,this}function K(e){var r=-1,t=e==null?0:e.length;for(this.clear();++r<t;){var n=e[r];this.set(n[0],n[1])}}K.prototype.clear=Ln;K.prototype.delete=Dn;K.prototype.get=Un;K.prototype.has=Gn;K.prototype.set=Kn;function kn(){this.size=0,this.__data__={hash:new K,map:new(ie||N),string:new K}}function Wn(e){var r=typeof e;return r=="string"||r=="number"||r=="symbol"||r=="boolean"?e!=="__proto__":e===null}function ge(e,r){var t=e.__data__;return Wn(r)?t[typeof r=="string"?"string":"hash"]:t.map}function Yn(e){var r=ge(this,e).delete(e);return this.size-=r?1:0,r}function qn(e){return ge(this,e).get(e)}function Xn(e){return ge(this,e).has(e)}function Zn(e,r){var t=ge(this,e),n=t.size;return t.set(e,r),this.size+=t.size==n?0:1,this}function U(e){var r=-1,t=e==null?0:e.length;for(this.clear();++r<t;){var n=e[r];this.set(n[0],n[1])}}U.prototype.clear=kn;U.prototype.delete=Yn;U.prototype.get=qn;U.prototype.has=Xn;U.prototype.set=Zn;var Jn=200;function Qn(e,r){var t=this.__data__;if(t instanceof N){var n=t.__data__;if(!ie||n.length<Jn-1)return n.push([e,r]),this.size=++t.size,this;t=this.__data__=new U(n)}return t.set(e,r),this.size=t.size,this}function ee(e){var r=this.__data__=new N(e);this.size=r.size}ee.prototype.clear=dn;ee.prototype.delete=pn;ee.prototype.get=vn;ee.prototype.has=hn;ee.prototype.set=Qn;function ea(e,r){for(var t=-1,n=e==null?0:e.length;++t<n&&r(e[t],t,e)!==!1;);return e}var ra=function(){try{var e=q(Object,"defineProperty");return e({},"",{}),e}catch{}}();const hr=ra;function Kr(e,r,t){r=="__proto__"&&hr?hr(e,r,{configurable:!0,enumerable:!0,value:t,writable:!0}):e[r]=t}var ta=Object.prototype,na=ta.hasOwnProperty;function kr(e,r,t){var n=e[r];(!(na.call(e,r)&&Gr(n,t))||t===void 0&&!(r in e))&&Kr(e,r,t)}function ye(e,r,t,n){var i=!t;t||(t={});for(var o=-1,u=r.length;++o<u;){var p=r[o],g=n?n(t[p],e[p],p,t,e):void 0;g===void 0&&(g=e[p]),i?Kr(t,p,g):kr(t,p,g)}return t}function aa(e,r){for(var t=-1,n=Array(e);++t<e;)n[t]=r(t);return n}var ia="[object Arguments]";function gr(e){return W(e)&&k(e)==ia}var Wr=Object.prototype,oa=Wr.hasOwnProperty,ua=Wr.propertyIsEnumerable,ca=gr(function(){return arguments}())?gr:function(e){return W(e)&&oa.call(e,"callee")&&!ua.call(e,"callee")};const sa=ca;var la=Array.isArray;const ce=la;function fa(){return!1}var Yr=typeof exports=="object"&&exports&&!exports.nodeType&&exports,yr=Yr&&typeof module=="object"&&module&&!module.nodeType&&module,da=yr&&yr.exports===Yr,br=da?D.Buffer:void 0,pa=br?br.isBuffer:void 0,va=pa||fa;const qr=va;var ha=9007199254740991,ga=/^(?:0|[1-9]\d*)$/;function ya(e,r){var t=typeof e;return r=r??ha,!!r&&(t=="number"||t!="symbol"&&ga.test(e))&&e>-1&&e%1==0&&e<r}var ba=9007199254740991;function Xr(e){return typeof e=="number"&&e>-1&&e%1==0&&e<=ba}var ma="[object Arguments]",Ta="[object Array]",Ea="[object Boolean]",Sa="[object Date]",_a="[object Error]",Aa="[object Function]",$a="[object Map]",ja="[object Number]",Oa="[object Object]",Fa="[object RegExp]",Ia="[object Set]",wa="[object String]",Ca="[object WeakMap]",Ma="[object ArrayBuffer]",Ra="[object DataView]",Pa="[object Float32Array]",La="[object Float64Array]",Da="[object Int8Array]",xa="[object Int16Array]",Na="[object Int32Array]",Va="[object Uint8Array]",Ua="[object Uint8ClampedArray]",Ba="[object Uint16Array]",Ha="[object Uint32Array]",E={};E[Pa]=E[La]=E[Da]=E[xa]=E[Na]=E[Va]=E[Ua]=E[Ba]=E[Ha]=!0;E[ma]=E[Ta]=E[Ma]=E[Ea]=E[Ra]=E[Sa]=E[_a]=E[Aa]=E[$a]=E[ja]=E[Oa]=E[Fa]=E[Ia]=E[wa]=E[Ca]=!1;function Ga(e){return W(e)&&Xr(e.length)&&!!E[k(e)]}function Ue(e){return function(r){return e(r)}}var Zr=typeof exports=="object"&&exports&&!exports.nodeType&&exports,ne=Zr&&typeof module=="object"&&module&&!module.nodeType&&module,za=ne&&ne.exports===Zr,Ie=za&&Nr.process,Ka=function(){try{var e=ne&&ne.require&&ne.require("util").types;return e||Ie&&Ie.binding&&Ie.binding("util")}catch{}}();const Q=Ka;var mr=Q&&Q.isTypedArray,ka=mr?Ue(mr):Ga;const Wa=ka;var Ya=Object.prototype,qa=Ya.hasOwnProperty;function Jr(e,r){var t=ce(e),n=!t&&sa(e),i=!t&&!n&&qr(e),o=!t&&!n&&!i&&Wa(e),u=t||n||i||o,p=u?aa(e.length,String):[],g=p.length;for(var v in e)(r||qa.call(e,v))&&!(u&&(v=="length"||i&&(v=="offset"||v=="parent")||o&&(v=="buffer"||v=="byteLength"||v=="byteOffset")||ya(v,g)))&&p.push(v);return p}var Xa=Object.prototype;function Be(e){var r=e&&e.constructor,t=typeof r=="function"&&r.prototype||Xa;return e===t}var Za=Ur(Object.keys,Object);const Ja=Za;var Qa=Object.prototype,ei=Qa.hasOwnProperty;function ri(e){if(!Be(e))return Ja(e);var r=[];for(var t in Object(e))ei.call(e,t)&&t!="constructor"&&r.push(t);return r}function Qr(e){return e!=null&&Xr(e.length)&&!zr(e)}function He(e){return Qr(e)?Jr(e):ri(e)}function ti(e,r){return e&&ye(r,He(r),e)}function ni(e){var r=[];if(e!=null)for(var t in Object(e))r.push(t);return r}var ai=Object.prototype,ii=ai.hasOwnProperty;function oi(e){if(!ue(e))return ni(e);var r=Be(e),t=[];for(var n in e)n=="constructor"&&(r||!ii.call(e,n))||t.push(n);return t}function Ge(e){return Qr(e)?Jr(e,!0):oi(e)}function ui(e,r){return e&&ye(r,Ge(r),e)}var et=typeof exports=="object"&&exports&&!exports.nodeType&&exports,Tr=et&&typeof module=="object"&&module&&!module.nodeType&&module,ci=Tr&&Tr.exports===et,Er=ci?D.Buffer:void 0,Sr=Er?Er.allocUnsafe:void 0;function si(e,r){if(r)return e.slice();var t=e.length,n=Sr?Sr(t):new e.constructor(t);return e.copy(n),n}function rt(e,r){var t=-1,n=e.length;for(r||(r=Array(n));++t<n;)r[t]=e[t];return r}function li(e,r){for(var t=-1,n=e==null?0:e.length,i=0,o=[];++t<n;){var u=e[t];r(u,t,e)&&(o[i++]=u)}return o}function tt(){return[]}var fi=Object.prototype,di=fi.propertyIsEnumerable,_r=Object.getOwnPropertySymbols,pi=_r?function(e){return e==null?[]:(e=Object(e),li(_r(e),function(r){return di.call(e,r)}))}:tt;const ze=pi;function vi(e,r){return ye(e,ze(e),r)}function nt(e,r){for(var t=-1,n=r.length,i=e.length;++t<n;)e[i+t]=r[t];return e}var hi=Object.getOwnPropertySymbols,gi=hi?function(e){for(var r=[];e;)nt(r,ze(e)),e=Ve(e);return r}:tt;const at=gi;function yi(e,r){return ye(e,at(e),r)}function it(e,r,t){var n=r(e);return ce(e)?n:nt(n,t(e))}function bi(e){return it(e,He,ze)}function mi(e){return it(e,Ge,at)}var Ti=q(D,"DataView");const Pe=Ti;var Ei=q(D,"Promise");const Le=Ei;var Si=q(D,"Set");const De=Si;var _i=q(D,"WeakMap");const xe=_i;var Ar="[object Map]",Ai="[object Object]",$r="[object Promise]",jr="[object Set]",Or="[object WeakMap]",Fr="[object DataView]",$i=Y(Pe),ji=Y(ie),Oi=Y(Le),Fi=Y(De),Ii=Y(xe),G=k;(Pe&&G(new Pe(new ArrayBuffer(1)))!=Fr||ie&&G(new ie)!=Ar||Le&&G(Le.resolve())!=$r||De&&G(new De)!=jr||xe&&G(new xe)!=Or)&&(G=function(e){var r=k(e),t=r==Ai?e.constructor:void 0,n=t?Y(t):"";if(n)switch(n){case $i:return Fr;case ji:return Ar;case Oi:return $r;case Fi:return jr;case Ii:return Or}return r});const Ke=G;var wi=Object.prototype,Ci=wi.hasOwnProperty;function Mi(e){var r=e.length,t=new e.constructor(r);return r&&typeof e[0]=="string"&&Ci.call(e,"index")&&(t.index=e.index,t.input=e.input),t}var Ri=D.Uint8Array;const Ir=Ri;function ke(e){var r=new e.constructor(e.byteLength);return new Ir(r).set(new Ir(e)),r}function Pi(e,r){var t=r?ke(e.buffer):e.buffer;return new e.constructor(t,e.byteOffset,e.byteLength)}var Li=/\w*$/;function Di(e){var r=new e.constructor(e.source,Li.exec(e));return r.lastIndex=e.lastIndex,r}var wr=V?V.prototype:void 0,Cr=wr?wr.valueOf:void 0;function xi(e){return Cr?Object(Cr.call(e)):{}}function Ni(e,r){var t=r?ke(e.buffer):e.buffer;return new e.constructor(t,e.byteOffset,e.length)}var Vi="[object Boolean]",Ui="[object Date]",Bi="[object Map]",Hi="[object Number]",Gi="[object RegExp]",zi="[object Set]",Ki="[object String]",ki="[object Symbol]",Wi="[object ArrayBuffer]",Yi="[object DataView]",qi="[object Float32Array]",Xi="[object Float64Array]",Zi="[object Int8Array]",Ji="[object Int16Array]",Qi="[object Int32Array]",eo="[object Uint8Array]",ro="[object Uint8ClampedArray]",to="[object Uint16Array]",no="[object Uint32Array]";function ao(e,r,t){var n=e.constructor;switch(r){case Wi:return ke(e);case Vi:case Ui:return new n(+e);case Yi:return Pi(e,t);case qi:case Xi:case Zi:case Ji:case Qi:case eo:case ro:case to:case no:return Ni(e,t);case Bi:return new n;case Hi:case Ki:return new n(e);case Gi:return Di(e);case zi:return new n;case ki:return xi(e)}}var Mr=Object.create,io=function(){function e(){}return function(r){if(!ue(r))return{};if(Mr)return Mr(r);e.prototype=r;var t=new e;return e.prototype=void 0,t}}();const oo=io;function uo(e){return typeof e.constructor=="function"&&!Be(e)?oo(Ve(e)):{}}var co="[object Map]";function so(e){return W(e)&&Ke(e)==co}var Rr=Q&&Q.isMap,lo=Rr?Ue(Rr):so;const fo=lo;var po="[object Set]";function vo(e){return W(e)&&Ke(e)==po}var Pr=Q&&Q.isSet,ho=Pr?Ue(Pr):vo;const go=ho;var yo=1,bo=2,mo=4,ot="[object Arguments]",To="[object Array]",Eo="[object Boolean]",So="[object Date]",_o="[object Error]",ut="[object Function]",Ao="[object GeneratorFunction]",$o="[object Map]",jo="[object Number]",ct="[object Object]",Oo="[object RegExp]",Fo="[object Set]",Io="[object String]",wo="[object Symbol]",Co="[object WeakMap]",Mo="[object ArrayBuffer]",Ro="[object DataView]",Po="[object Float32Array]",Lo="[object Float64Array]",Do="[object Int8Array]",xo="[object Int16Array]",No="[object Int32Array]",Vo="[object Uint8Array]",Uo="[object Uint8ClampedArray]",Bo="[object Uint16Array]",Ho="[object Uint32Array]",T={};T[ot]=T[To]=T[Mo]=T[Ro]=T[Eo]=T[So]=T[Po]=T[Lo]=T[Do]=T[xo]=T[No]=T[$o]=T[jo]=T[ct]=T[Oo]=T[Fo]=T[Io]=T[wo]=T[Vo]=T[Uo]=T[Bo]=T[Ho]=!0;T[_o]=T[ut]=T[Co]=!1;function pe(e,r,t,n,i,o){var u,p=r&yo,g=r&bo,v=r&mo;if(t&&(u=i?t(e,n,i,o):t(e)),u!==void 0)return u;if(!ue(e))return e;var $=ce(e);if($){if(u=Mi(e),!p)return rt(e,u)}else{var O=Ke(e),f=O==ut||O==Ao;if(qr(e))return si(e,p);if(O==ct||O==ot||f&&!i){if(u=g||f?{}:uo(e),!p)return g?yi(e,ui(u,e)):vi(e,ti(u,e))}else{if(!T[O])return i?e:{};u=ao(e,O,p)}}o||(o=new ee);var A=o.get(e);if(A)return A;o.set(e,u),go(e)?e.forEach(function(F){u.add(pe(F,r,t,F,e,o))}):fo(e)&&e.forEach(function(F,_){u.set(_,pe(F,r,t,_,e,o))});var M=v?g?mi:bi:g?Ge:He,I=$?void 0:M(e);return ea(I||e,function(F,_){I&&(_=F,F=e[_]),kr(u,_,pe(F,r,t,_,e,o))}),u}var Go=4;function Lr(e){return pe(e,Go)}function st(e,r){for(var t=-1,n=e==null?0:e.length,i=Array(n);++t<n;)i[t]=r(e[t],t,e);return i}var zo="[object Symbol]";function We(e){return typeof e=="symbol"||W(e)&&k(e)==zo}var Ko="Expected a function";function Ye(e,r){if(typeof e!="function"||r!=null&&typeof r!="function")throw new TypeError(Ko);var t=function(){var n=arguments,i=r?r.apply(this,n):n[0],o=t.cache;if(o.has(i))return o.get(i);var u=e.apply(this,n);return t.cache=o.set(i,u)||o,u};return t.cache=new(Ye.Cache||U),t}Ye.Cache=U;var ko=500;function Wo(e){var r=Ye(e,function(n){return t.size===ko&&t.clear(),n}),t=r.cache;return r}var Yo=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,qo=/\\(\\)?/g,Xo=Wo(function(e){var r=[];return e.charCodeAt(0)===46&&r.push(""),e.replace(Yo,function(t,n,i,o){r.push(i?o.replace(qo,"$1"):n||t)}),r});const Zo=Xo;var Jo=1/0;function Qo(e){if(typeof e=="string"||We(e))return e;var r=e+"";return r=="0"&&1/e==-Jo?"-0":r}var eu=1/0,Dr=V?V.prototype:void 0,xr=Dr?Dr.toString:void 0;function lt(e){if(typeof e=="string")return e;if(ce(e))return st(e,lt)+"";if(We(e))return xr?xr.call(e):"";var r=e+"";return r=="0"&&1/e==-eu?"-0":r}function ru(e){return e==null?"":lt(e)}function ft(e){return ce(e)?st(e,Qo):We(e)?[e]:rt(Zo(ru(e)))}function S(){return S=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},S.apply(this,arguments)}function J(e,r){if(e==null)return{};var t={},n=Object.keys(e),i,o;for(o=0;o<n.length;o++)i=n[o],!(r.indexOf(i)>=0)&&(t[i]=e[i]);return t}var be=l.createContext(void 0);be.displayName="FormikContext";var tu=be.Provider;be.Consumer;function qe(){var e=l.useContext(be);return e||Hr(!1),e}var C=function(r){return typeof r=="function"},se=function(r){return r!==null&&typeof r=="object"},nu=function(r){return String(Math.floor(Number(r)))===r},we=function(r){return Object.prototype.toString.call(r)==="[object String]"},au=function(r){return l.Children.count(r)===0},Ce=function(r){return se(r)&&C(r.then)};function w(e,r,t,n){n===void 0&&(n=0);for(var i=ft(r);e&&n<i.length;)e=e[i[n++]];return n!==i.length&&!e||e===void 0?t:e}function z(e,r,t){for(var n=Lr(e),i=n,o=0,u=ft(r);o<u.length-1;o++){var p=u[o],g=w(e,u.slice(0,o+1));if(g&&(se(g)||Array.isArray(g)))i=i[p]=Lr(g);else{var v=u[o+1];i=i[p]=nu(v)&&Number(v)>=0?[]:{}}}return(o===0?e:i)[u[o]]===t?e:(t===void 0?delete i[u[o]]:i[u[o]]=t,o===0&&t===void 0&&delete n[u[o]],n)}function dt(e,r,t,n){t===void 0&&(t=new WeakMap),n===void 0&&(n={});for(var i=0,o=Object.keys(e);i<o.length;i++){var u=o[i],p=e[u];se(p)?t.get(p)||(t.set(p,!0),n[u]=Array.isArray(p)?[]:{},dt(p,r,t,n[u])):n[u]=r}return n}function iu(e,r){switch(r.type){case"SET_VALUES":return S({},e,{values:r.payload});case"SET_TOUCHED":return S({},e,{touched:r.payload});case"SET_ERRORS":return H(e.errors,r.payload)?e:S({},e,{errors:r.payload});case"SET_STATUS":return S({},e,{status:r.payload});case"SET_ISSUBMITTING":return S({},e,{isSubmitting:r.payload});case"SET_ISVALIDATING":return S({},e,{isValidating:r.payload});case"SET_FIELD_VALUE":return S({},e,{values:z(e.values,r.payload.field,r.payload.value)});case"SET_FIELD_TOUCHED":return S({},e,{touched:z(e.touched,r.payload.field,r.payload.value)});case"SET_FIELD_ERROR":return S({},e,{errors:z(e.errors,r.payload.field,r.payload.value)});case"RESET_FORM":return S({},e,r.payload);case"SET_FORMIK_STATE":return r.payload(e);case"SUBMIT_ATTEMPT":return S({},e,{touched:dt(e.values,!0),isSubmitting:!0,submitCount:e.submitCount+1});case"SUBMIT_FAILURE":return S({},e,{isSubmitting:!1});case"SUBMIT_SUCCESS":return S({},e,{isSubmitting:!1});default:return e}}var B={},de={};function ou(e){var r=e.validateOnChange,t=r===void 0?!0:r,n=e.validateOnBlur,i=n===void 0?!0:n,o=e.validateOnMount,u=o===void 0?!1:o,p=e.isInitialValid,g=e.enableReinitialize,v=g===void 0?!1:g,$=e.onSubmit,O=J(e,["validateOnChange","validateOnBlur","validateOnMount","isInitialValid","enableReinitialize","onSubmit"]),f=S({validateOnChange:t,validateOnBlur:i,validateOnMount:u,onSubmit:$},O),A=l.useRef(f.initialValues),M=l.useRef(f.initialErrors||B),I=l.useRef(f.initialTouched||de),F=l.useRef(f.initialStatus),_=l.useRef(!1),R=l.useRef({});l.useEffect(function(){return _.current=!0,function(){_.current=!1}},[]);var me=l.useState(0),Te=me[1],le=l.useRef({values:f.initialValues,errors:f.initialErrors||B,touched:f.initialTouched||de,status:f.initialStatus,isSubmitting:!1,isValidating:!1,submitCount:0}),m=le.current,b=l.useCallback(function(a){var c=le.current;le.current=iu(c,a),c!==le.current&&Te(function(s){return s+1})},[]),Xe=l.useCallback(function(a,c){return new Promise(function(s,d){var h=f.validate(a,c);h==null?s(B):Ce(h)?h.then(function(y){s(y||B)},function(y){d(y)}):s(h)})},[f.validate]),Ee=l.useCallback(function(a,c){var s=f.validationSchema,d=C(s)?s(c):s,h=c&&d.validateAt?d.validateAt(c,a):cu(a,d);return new Promise(function(y,j){h.then(function(){y(B)},function(x){x.name==="ValidationError"?y(uu(x)):j(x)})})},[f.validationSchema]),Ze=l.useCallback(function(a,c){return new Promise(function(s){return s(R.current[a].validate(c))})},[]),Je=l.useCallback(function(a){var c=Object.keys(R.current).filter(function(d){return C(R.current[d].validate)}),s=c.length>0?c.map(function(d){return Ze(d,w(a,d))}):[Promise.resolve("DO_NOT_DELETE_YOU_WILL_BE_FIRED")];return Promise.all(s).then(function(d){return d.reduce(function(h,y,j){return y==="DO_NOT_DELETE_YOU_WILL_BE_FIRED"||y&&(h=z(h,c[j],y)),h},{})})},[Ze]),pt=l.useCallback(function(a){return Promise.all([Je(a),f.validationSchema?Ee(a):{},f.validate?Xe(a):{}]).then(function(c){var s=c[0],d=c[1],h=c[2],y=Me.all([s,d,h],{arrayMerge:su});return y})},[f.validate,f.validationSchema,Je,Xe,Ee]),L=P(function(a){return a===void 0&&(a=m.values),b({type:"SET_ISVALIDATING",payload:!0}),pt(a).then(function(c){return _.current&&(b({type:"SET_ISVALIDATING",payload:!1}),b({type:"SET_ERRORS",payload:c})),c})});l.useEffect(function(){u&&_.current===!0&&H(A.current,f.initialValues)&&L(A.current)},[u,L]);var re=l.useCallback(function(a){var c=a&&a.values?a.values:A.current,s=a&&a.errors?a.errors:M.current?M.current:f.initialErrors||{},d=a&&a.touched?a.touched:I.current?I.current:f.initialTouched||{},h=a&&a.status?a.status:F.current?F.current:f.initialStatus;A.current=c,M.current=s,I.current=d,F.current=h;var y=function(){b({type:"RESET_FORM",payload:{isSubmitting:!!a&&!!a.isSubmitting,errors:s,touched:d,status:h,values:c,isValidating:!!a&&!!a.isValidating,submitCount:a&&a.submitCount&&typeof a.submitCount=="number"?a.submitCount:0}})};if(f.onReset){var j=f.onReset(m.values,cr);Ce(j)?j.then(y):y()}else y()},[f.initialErrors,f.initialStatus,f.initialTouched,f.onReset]);l.useEffect(function(){_.current===!0&&!H(A.current,f.initialValues)&&v&&(A.current=f.initialValues,re(),u&&L(A.current))},[v,f.initialValues,re,u,L]),l.useEffect(function(){v&&_.current===!0&&!H(M.current,f.initialErrors)&&(M.current=f.initialErrors||B,b({type:"SET_ERRORS",payload:f.initialErrors||B}))},[v,f.initialErrors]),l.useEffect(function(){v&&_.current===!0&&!H(I.current,f.initialTouched)&&(I.current=f.initialTouched||de,b({type:"SET_TOUCHED",payload:f.initialTouched||de}))},[v,f.initialTouched]),l.useEffect(function(){v&&_.current===!0&&!H(F.current,f.initialStatus)&&(F.current=f.initialStatus,b({type:"SET_STATUS",payload:f.initialStatus}))},[v,f.initialStatus,f.initialTouched]);var Qe=P(function(a){if(R.current[a]&&C(R.current[a].validate)){var c=w(m.values,a),s=R.current[a].validate(c);return Ce(s)?(b({type:"SET_ISVALIDATING",payload:!0}),s.then(function(d){return d}).then(function(d){b({type:"SET_FIELD_ERROR",payload:{field:a,value:d}}),b({type:"SET_ISVALIDATING",payload:!1})})):(b({type:"SET_FIELD_ERROR",payload:{field:a,value:s}}),Promise.resolve(s))}else if(f.validationSchema)return b({type:"SET_ISVALIDATING",payload:!0}),Ee(m.values,a).then(function(d){return d}).then(function(d){b({type:"SET_FIELD_ERROR",payload:{field:a,value:w(d,a)}}),b({type:"SET_ISVALIDATING",payload:!1})});return Promise.resolve()}),vt=l.useCallback(function(a,c){var s=c.validate;R.current[a]={validate:s}},[]),ht=l.useCallback(function(a){delete R.current[a]},[]),er=P(function(a,c){b({type:"SET_TOUCHED",payload:a});var s=c===void 0?i:c;return s?L(m.values):Promise.resolve()}),rr=l.useCallback(function(a){b({type:"SET_ERRORS",payload:a})},[]),tr=P(function(a,c){var s=C(a)?a(m.values):a;b({type:"SET_VALUES",payload:s});var d=c===void 0?t:c;return d?L(s):Promise.resolve()}),fe=l.useCallback(function(a,c){b({type:"SET_FIELD_ERROR",payload:{field:a,value:c}})},[]),X=P(function(a,c,s){b({type:"SET_FIELD_VALUE",payload:{field:a,value:c}});var d=s===void 0?t:s;return d?L(z(m.values,a,c)):Promise.resolve()}),nr=l.useCallback(function(a,c){var s=c,d=a,h;if(!we(a)){a.persist&&a.persist();var y=a.target?a.target:a.currentTarget,j=y.type,x=y.name,je=y.id,Oe=y.value,At=y.checked,vu=y.outerHTML,sr=y.options,$t=y.multiple;s=c||x||je,d=/number|range/.test(j)?(h=parseFloat(Oe),isNaN(h)?"":h):/checkbox/.test(j)?fu(w(m.values,s),At,Oe):sr&&$t?lu(sr):Oe}s&&X(s,d)},[X,m.values]),Se=P(function(a){if(we(a))return function(c){return nr(c,a)};nr(a)}),Z=P(function(a,c,s){c===void 0&&(c=!0),b({type:"SET_FIELD_TOUCHED",payload:{field:a,value:c}});var d=s===void 0?i:s;return d?L(m.values):Promise.resolve()}),ar=l.useCallback(function(a,c){a.persist&&a.persist();var s=a.target,d=s.name,h=s.id,y=s.outerHTML,j=c||d||h;Z(j,!0)},[Z]),_e=P(function(a){if(we(a))return function(c){return ar(c,a)};ar(a)}),ir=l.useCallback(function(a){C(a)?b({type:"SET_FORMIK_STATE",payload:a}):b({type:"SET_FORMIK_STATE",payload:function(){return a}})},[]),or=l.useCallback(function(a){b({type:"SET_STATUS",payload:a})},[]),ur=l.useCallback(function(a){b({type:"SET_ISSUBMITTING",payload:a})},[]),Ae=P(function(){return b({type:"SUBMIT_ATTEMPT"}),L().then(function(a){var c=a instanceof Error,s=!c&&Object.keys(a).length===0;if(s){var d;try{if(d=yt(),d===void 0)return}catch(h){throw h}return Promise.resolve(d).then(function(h){return _.current&&b({type:"SUBMIT_SUCCESS"}),h}).catch(function(h){if(_.current)throw b({type:"SUBMIT_FAILURE"}),h})}else if(_.current&&(b({type:"SUBMIT_FAILURE"}),c))throw a})}),gt=P(function(a){a&&a.preventDefault&&C(a.preventDefault)&&a.preventDefault(),a&&a.stopPropagation&&C(a.stopPropagation)&&a.stopPropagation(),Ae().catch(function(c){console.warn("Warning: An unhandled error was caught from submitForm()",c)})}),cr={resetForm:re,validateForm:L,validateField:Qe,setErrors:rr,setFieldError:fe,setFieldTouched:Z,setFieldValue:X,setStatus:or,setSubmitting:ur,setTouched:er,setValues:tr,setFormikState:ir,submitForm:Ae},yt=P(function(){return $(m.values,cr)}),bt=P(function(a){a&&a.preventDefault&&C(a.preventDefault)&&a.preventDefault(),a&&a.stopPropagation&&C(a.stopPropagation)&&a.stopPropagation(),re()}),mt=l.useCallback(function(a){return{value:w(m.values,a),error:w(m.errors,a),touched:!!w(m.touched,a),initialValue:w(A.current,a),initialTouched:!!w(I.current,a),initialError:w(M.current,a)}},[m.errors,m.touched,m.values]),Tt=l.useCallback(function(a){return{setValue:function(s,d){return X(a,s,d)},setTouched:function(s,d){return Z(a,s,d)},setError:function(s){return fe(a,s)}}},[X,Z,fe]),Et=l.useCallback(function(a){var c=se(a),s=c?a.name:a,d=w(m.values,s),h={name:s,value:d,onChange:Se,onBlur:_e};if(c){var y=a.type,j=a.value,x=a.as,je=a.multiple;y==="checkbox"?j===void 0?h.checked=!!d:(h.checked=!!(Array.isArray(d)&&~d.indexOf(j)),h.value=j):y==="radio"?(h.checked=d===j,h.value=j):x==="select"&&je&&(h.value=h.value||[],h.multiple=!0)}return h},[_e,Se,m.values]),$e=l.useMemo(function(){return!H(A.current,m.values)},[A.current,m.values]),St=l.useMemo(function(){return typeof p<"u"?$e?m.errors&&Object.keys(m.errors).length===0:p!==!1&&C(p)?p(f):p:m.errors&&Object.keys(m.errors).length===0},[p,$e,m.errors,f]),_t=S({},m,{initialValues:A.current,initialErrors:M.current,initialTouched:I.current,initialStatus:F.current,handleBlur:_e,handleChange:Se,handleReset:bt,handleSubmit:gt,resetForm:re,setErrors:rr,setFormikState:ir,setFieldTouched:Z,setFieldValue:X,setFieldError:fe,setStatus:or,setSubmitting:ur,setTouched:er,setValues:tr,submitForm:Ae,validateForm:L,validateField:Qe,isValid:St,dirty:$e,unregisterField:ht,registerField:vt,getFieldProps:Et,getFieldMeta:mt,getFieldHelpers:Tt,validateOnBlur:i,validateOnChange:t,validateOnMount:u});return _t}function gu(e){var r=ou(e),t=e.component,n=e.children,i=e.render,o=e.innerRef;return l.useImperativeHandle(o,function(){return r}),l.createElement(tu,{value:r},t?l.createElement(t,r):i?i(r):n?C(n)?n(r):au(n)?null:l.Children.only(n):null)}function uu(e){var r={};if(e.inner){if(e.inner.length===0)return z(r,e.path,e.message);for(var i=e.inner,t=Array.isArray(i),n=0,i=t?i:i[Symbol.iterator]();;){var o;if(t){if(n>=i.length)break;o=i[n++]}else{if(n=i.next(),n.done)break;o=n.value}var u=o;w(r,u.path)||(r=z(r,u.path,u.message))}}return r}function cu(e,r,t,n){t===void 0&&(t=!1);var i=Ne(e);return r[t?"validateSync":"validate"](i,{abortEarly:!1,context:n||i})}function Ne(e){var r=Array.isArray(e)?[]:{};for(var t in e)if(Object.prototype.hasOwnProperty.call(e,t)){var n=String(t);Array.isArray(e[n])===!0?r[n]=e[n].map(function(i){return Array.isArray(i)===!0||fr(i)?Ne(i):i!==""?i:void 0}):fr(e[n])?r[n]=Ne(e[n]):r[n]=e[n]!==""?e[n]:void 0}return r}function su(e,r,t){var n=e.slice();return r.forEach(function(o,u){if(typeof n[u]>"u"){var p=t.clone!==!1,g=p&&t.isMergeableObject(o);n[u]=g?Me(Array.isArray(o)?[]:{},o,t):o}else t.isMergeableObject(o)?n[u]=Me(e[u],o,t):e.indexOf(o)===-1&&n.push(o)}),n}function lu(e){return Array.from(e).filter(function(r){return r.selected}).map(function(r){return r.value})}function fu(e,r,t){if(typeof e=="boolean")return!!r;var n=[],i=!1,o=-1;if(Array.isArray(e))n=e,o=e.indexOf(t),i=o>=0;else if(!t||t=="true"||t=="false")return!!r;return r&&t&&!i?n.concat(t):i?n.slice(0,o).concat(n.slice(o+1)):n}var du=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u"?l.useLayoutEffect:l.useEffect;function P(e){var r=l.useRef(e);return du(function(){r.current=e}),l.useCallback(function(){for(var t=arguments.length,n=new Array(t),i=0;i<t;i++)n[i]=arguments[i];return r.current.apply(void 0,n)},[])}function yu(e){var r=qe(),t=r.getFieldProps,n=r.getFieldMeta,i=r.getFieldHelpers,o=r.registerField,u=r.unregisterField,p=se(e),g=p?e:{name:e},v=g.name,$=g.validate;l.useEffect(function(){return v&&o(v,{validate:$}),function(){v&&u(v)}},[o,u,v,$]),v||Hr(!1);var O=l.useMemo(function(){return i(v)},[i,v]);return[t(g),n(v),O]}function bu(e){var r=e.validate,t=e.name,n=e.render,i=e.children,o=e.as,u=e.component,p=e.className,g=J(e,["validate","name","render","children","as","component","className"]),v=qe(),$=J(v,["validate","validationSchema"]),O=$.registerField,f=$.unregisterField;l.useEffect(function(){return O(t,{validate:r}),function(){f(t)}},[O,f,t,r]);var A=$.getFieldProps(S({name:t},g)),M=$.getFieldMeta(t),I={field:A,form:$};if(n)return n(S({},I,{meta:M}));if(C(i))return i(S({},I,{meta:M}));if(u){if(typeof u=="string"){var F=g.innerRef,_=J(g,["innerRef"]);return l.createElement(u,S({ref:F},A,_,{className:p}),i)}return l.createElement(u,S({field:A,form:$},g,{className:p}),i)}var R=o||"input";if(typeof R=="string"){var me=g.innerRef,Te=J(g,["innerRef"]);return l.createElement(R,S({ref:me},A,Te,{className:p}),i)}return l.createElement(R,S({},A,g,{className:p}),i)}var pu=l.forwardRef(function(e,r){var t=e.action,n=J(e,["action"]),i=t??"#",o=qe(),u=o.handleReset,p=o.handleSubmit;return l.createElement("form",S({onSubmit:p,ref:r,onReset:u,action:i},n))});pu.displayName="Form";export{gu as F,bu as a,yu as u};