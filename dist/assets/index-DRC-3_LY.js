(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function n(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=n(s);fetch(s.href,a)}})();function Xf(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var Wh={exports:{}},yl={},jh={exports:{}},Et={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ax;function VA(){if(ax)return Et;ax=1;var t=Symbol.for("react.element"),e=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),i=Symbol.for("react.strict_mode"),s=Symbol.for("react.profiler"),a=Symbol.for("react.provider"),l=Symbol.for("react.context"),u=Symbol.for("react.forward_ref"),f=Symbol.for("react.suspense"),d=Symbol.for("react.memo"),h=Symbol.for("react.lazy"),m=Symbol.iterator;function g(V){return V===null||typeof V!="object"?null:(V=m&&V[m]||V["@@iterator"],typeof V=="function"?V:null)}var v={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},E=Object.assign,w={};function _(V,ie,U){this.props=V,this.context=ie,this.refs=w,this.updater=U||v}_.prototype.isReactComponent={},_.prototype.setState=function(V,ie){if(typeof V!="object"&&typeof V!="function"&&V!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,V,ie,"setState")},_.prototype.forceUpdate=function(V){this.updater.enqueueForceUpdate(this,V,"forceUpdate")};function y(){}y.prototype=_.prototype;function M(V,ie,U){this.props=V,this.context=ie,this.refs=w,this.updater=U||v}var T=M.prototype=new y;T.constructor=M,E(T,_.prototype),T.isPureReactComponent=!0;var C=Array.isArray,N=Object.prototype.hasOwnProperty,b={current:null},k={key:!0,ref:!0,__self:!0,__source:!0};function B(V,ie,U){var ee,ge={},ye=null,Se=null;if(ie!=null)for(ee in ie.ref!==void 0&&(Se=ie.ref),ie.key!==void 0&&(ye=""+ie.key),ie)N.call(ie,ee)&&!k.hasOwnProperty(ee)&&(ge[ee]=ie[ee]);var Re=arguments.length-2;if(Re===1)ge.children=U;else if(1<Re){for(var Le=Array(Re),$e=0;$e<Re;$e++)Le[$e]=arguments[$e+2];ge.children=Le}if(V&&V.defaultProps)for(ee in Re=V.defaultProps,Re)ge[ee]===void 0&&(ge[ee]=Re[ee]);return{$$typeof:t,type:V,key:ye,ref:Se,props:ge,_owner:b.current}}function L(V,ie){return{$$typeof:t,type:V.type,key:ie,ref:V.ref,props:V.props,_owner:V._owner}}function R(V){return typeof V=="object"&&V!==null&&V.$$typeof===t}function O(V){var ie={"=":"=0",":":"=2"};return"$"+V.replace(/[=:]/g,function(U){return ie[U]})}var Z=/\/+/g;function X(V,ie){return typeof V=="object"&&V!==null&&V.key!=null?O(""+V.key):ie.toString(36)}function J(V,ie,U,ee,ge){var ye=typeof V;(ye==="undefined"||ye==="boolean")&&(V=null);var Se=!1;if(V===null)Se=!0;else switch(ye){case"string":case"number":Se=!0;break;case"object":switch(V.$$typeof){case t:case e:Se=!0}}if(Se)return Se=V,ge=ge(Se),V=ee===""?"."+X(Se,0):ee,C(ge)?(U="",V!=null&&(U=V.replace(Z,"$&/")+"/"),J(ge,ie,U,"",function($e){return $e})):ge!=null&&(R(ge)&&(ge=L(ge,U+(!ge.key||Se&&Se.key===ge.key?"":(""+ge.key).replace(Z,"$&/")+"/")+V)),ie.push(ge)),1;if(Se=0,ee=ee===""?".":ee+":",C(V))for(var Re=0;Re<V.length;Re++){ye=V[Re];var Le=ee+X(ye,Re);Se+=J(ye,ie,U,Le,ge)}else if(Le=g(V),typeof Le=="function")for(V=Le.call(V),Re=0;!(ye=V.next()).done;)ye=ye.value,Le=ee+X(ye,Re++),Se+=J(ye,ie,U,Le,ge);else if(ye==="object")throw ie=String(V),Error("Objects are not valid as a React child (found: "+(ie==="[object Object]"?"object with keys {"+Object.keys(V).join(", ")+"}":ie)+"). If you meant to render a collection of children, use an array instead.");return Se}function ne(V,ie,U){if(V==null)return V;var ee=[],ge=0;return J(V,ee,"","",function(ye){return ie.call(U,ye,ge++)}),ee}function le(V){if(V._status===-1){var ie=V._result;ie=ie(),ie.then(function(U){(V._status===0||V._status===-1)&&(V._status=1,V._result=U)},function(U){(V._status===0||V._status===-1)&&(V._status=2,V._result=U)}),V._status===-1&&(V._status=0,V._result=ie)}if(V._status===1)return V._result.default;throw V._result}var re={current:null},G={transition:null},ue={ReactCurrentDispatcher:re,ReactCurrentBatchConfig:G,ReactCurrentOwner:b};function D(){throw Error("act(...) is not supported in production builds of React.")}return Et.Children={map:ne,forEach:function(V,ie,U){ne(V,function(){ie.apply(this,arguments)},U)},count:function(V){var ie=0;return ne(V,function(){ie++}),ie},toArray:function(V){return ne(V,function(ie){return ie})||[]},only:function(V){if(!R(V))throw Error("React.Children.only expected to receive a single React element child.");return V}},Et.Component=_,Et.Fragment=n,Et.Profiler=s,Et.PureComponent=M,Et.StrictMode=i,Et.Suspense=f,Et.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ue,Et.act=D,Et.cloneElement=function(V,ie,U){if(V==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+V+".");var ee=E({},V.props),ge=V.key,ye=V.ref,Se=V._owner;if(ie!=null){if(ie.ref!==void 0&&(ye=ie.ref,Se=b.current),ie.key!==void 0&&(ge=""+ie.key),V.type&&V.type.defaultProps)var Re=V.type.defaultProps;for(Le in ie)N.call(ie,Le)&&!k.hasOwnProperty(Le)&&(ee[Le]=ie[Le]===void 0&&Re!==void 0?Re[Le]:ie[Le])}var Le=arguments.length-2;if(Le===1)ee.children=U;else if(1<Le){Re=Array(Le);for(var $e=0;$e<Le;$e++)Re[$e]=arguments[$e+2];ee.children=Re}return{$$typeof:t,type:V.type,key:ge,ref:ye,props:ee,_owner:Se}},Et.createContext=function(V){return V={$$typeof:l,_currentValue:V,_currentValue2:V,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},V.Provider={$$typeof:a,_context:V},V.Consumer=V},Et.createElement=B,Et.createFactory=function(V){var ie=B.bind(null,V);return ie.type=V,ie},Et.createRef=function(){return{current:null}},Et.forwardRef=function(V){return{$$typeof:u,render:V}},Et.isValidElement=R,Et.lazy=function(V){return{$$typeof:h,_payload:{_status:-1,_result:V},_init:le}},Et.memo=function(V,ie){return{$$typeof:d,type:V,compare:ie===void 0?null:ie}},Et.startTransition=function(V){var ie=G.transition;G.transition={};try{V()}finally{G.transition=ie}},Et.unstable_act=D,Et.useCallback=function(V,ie){return re.current.useCallback(V,ie)},Et.useContext=function(V){return re.current.useContext(V)},Et.useDebugValue=function(){},Et.useDeferredValue=function(V){return re.current.useDeferredValue(V)},Et.useEffect=function(V,ie){return re.current.useEffect(V,ie)},Et.useId=function(){return re.current.useId()},Et.useImperativeHandle=function(V,ie,U){return re.current.useImperativeHandle(V,ie,U)},Et.useInsertionEffect=function(V,ie){return re.current.useInsertionEffect(V,ie)},Et.useLayoutEffect=function(V,ie){return re.current.useLayoutEffect(V,ie)},Et.useMemo=function(V,ie){return re.current.useMemo(V,ie)},Et.useReducer=function(V,ie,U){return re.current.useReducer(V,ie,U)},Et.useRef=function(V){return re.current.useRef(V)},Et.useState=function(V){return re.current.useState(V)},Et.useSyncExternalStore=function(V,ie,U){return re.current.useSyncExternalStore(V,ie,U)},Et.useTransition=function(){return re.current.useTransition()},Et.version="18.3.1",Et}var lx;function Tg(){return lx||(lx=1,jh.exports=VA()),jh.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ux;function HA(){if(ux)return yl;ux=1;var t=Tg(),e=Symbol.for("react.element"),n=Symbol.for("react.fragment"),i=Object.prototype.hasOwnProperty,s=t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,a={key:!0,ref:!0,__self:!0,__source:!0};function l(u,f,d){var h,m={},g=null,v=null;d!==void 0&&(g=""+d),f.key!==void 0&&(g=""+f.key),f.ref!==void 0&&(v=f.ref);for(h in f)i.call(f,h)&&!a.hasOwnProperty(h)&&(m[h]=f[h]);if(u&&u.defaultProps)for(h in f=u.defaultProps,f)m[h]===void 0&&(m[h]=f[h]);return{$$typeof:e,type:u,key:g,ref:v,props:m,_owner:s.current}}return yl.Fragment=n,yl.jsx=l,yl.jsxs=l,yl}var cx;function GA(){return cx||(cx=1,Wh.exports=HA()),Wh.exports}var he=GA(),$=Tg();const ma=Xf($);var Xh={exports:{}},Qn={},$h={exports:{}},qh={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var fx;function WA(){return fx||(fx=1,function(t){function e(G,ue){var D=G.length;G.push(ue);e:for(;0<D;){var V=D-1>>>1,ie=G[V];if(0<s(ie,ue))G[V]=ue,G[D]=ie,D=V;else break e}}function n(G){return G.length===0?null:G[0]}function i(G){if(G.length===0)return null;var ue=G[0],D=G.pop();if(D!==ue){G[0]=D;e:for(var V=0,ie=G.length,U=ie>>>1;V<U;){var ee=2*(V+1)-1,ge=G[ee],ye=ee+1,Se=G[ye];if(0>s(ge,D))ye<ie&&0>s(Se,ge)?(G[V]=Se,G[ye]=D,V=ye):(G[V]=ge,G[ee]=D,V=ee);else if(ye<ie&&0>s(Se,D))G[V]=Se,G[ye]=D,V=ye;else break e}}return ue}function s(G,ue){var D=G.sortIndex-ue.sortIndex;return D!==0?D:G.id-ue.id}if(typeof performance=="object"&&typeof performance.now=="function"){var a=performance;t.unstable_now=function(){return a.now()}}else{var l=Date,u=l.now();t.unstable_now=function(){return l.now()-u}}var f=[],d=[],h=1,m=null,g=3,v=!1,E=!1,w=!1,_=typeof setTimeout=="function"?setTimeout:null,y=typeof clearTimeout=="function"?clearTimeout:null,M=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function T(G){for(var ue=n(d);ue!==null;){if(ue.callback===null)i(d);else if(ue.startTime<=G)i(d),ue.sortIndex=ue.expirationTime,e(f,ue);else break;ue=n(d)}}function C(G){if(w=!1,T(G),!E)if(n(f)!==null)E=!0,le(N);else{var ue=n(d);ue!==null&&re(C,ue.startTime-G)}}function N(G,ue){E=!1,w&&(w=!1,y(B),B=-1),v=!0;var D=g;try{for(T(ue),m=n(f);m!==null&&(!(m.expirationTime>ue)||G&&!O());){var V=m.callback;if(typeof V=="function"){m.callback=null,g=m.priorityLevel;var ie=V(m.expirationTime<=ue);ue=t.unstable_now(),typeof ie=="function"?m.callback=ie:m===n(f)&&i(f),T(ue)}else i(f);m=n(f)}if(m!==null)var U=!0;else{var ee=n(d);ee!==null&&re(C,ee.startTime-ue),U=!1}return U}finally{m=null,g=D,v=!1}}var b=!1,k=null,B=-1,L=5,R=-1;function O(){return!(t.unstable_now()-R<L)}function Z(){if(k!==null){var G=t.unstable_now();R=G;var ue=!0;try{ue=k(!0,G)}finally{ue?X():(b=!1,k=null)}}else b=!1}var X;if(typeof M=="function")X=function(){M(Z)};else if(typeof MessageChannel<"u"){var J=new MessageChannel,ne=J.port2;J.port1.onmessage=Z,X=function(){ne.postMessage(null)}}else X=function(){_(Z,0)};function le(G){k=G,b||(b=!0,X())}function re(G,ue){B=_(function(){G(t.unstable_now())},ue)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(G){G.callback=null},t.unstable_continueExecution=function(){E||v||(E=!0,le(N))},t.unstable_forceFrameRate=function(G){0>G||125<G?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):L=0<G?Math.floor(1e3/G):5},t.unstable_getCurrentPriorityLevel=function(){return g},t.unstable_getFirstCallbackNode=function(){return n(f)},t.unstable_next=function(G){switch(g){case 1:case 2:case 3:var ue=3;break;default:ue=g}var D=g;g=ue;try{return G()}finally{g=D}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(G,ue){switch(G){case 1:case 2:case 3:case 4:case 5:break;default:G=3}var D=g;g=G;try{return ue()}finally{g=D}},t.unstable_scheduleCallback=function(G,ue,D){var V=t.unstable_now();switch(typeof D=="object"&&D!==null?(D=D.delay,D=typeof D=="number"&&0<D?V+D:V):D=V,G){case 1:var ie=-1;break;case 2:ie=250;break;case 5:ie=1073741823;break;case 4:ie=1e4;break;default:ie=5e3}return ie=D+ie,G={id:h++,callback:ue,priorityLevel:G,startTime:D,expirationTime:ie,sortIndex:-1},D>V?(G.sortIndex=D,e(d,G),n(f)===null&&G===n(d)&&(w?(y(B),B=-1):w=!0,re(C,D-V))):(G.sortIndex=ie,e(f,G),E||v||(E=!0,le(N))),G},t.unstable_shouldYield=O,t.unstable_wrapCallback=function(G){var ue=g;return function(){var D=g;g=ue;try{return G.apply(this,arguments)}finally{g=D}}}}(qh)),qh}var dx;function jA(){return dx||(dx=1,$h.exports=WA()),$h.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var hx;function XA(){if(hx)return Qn;hx=1;var t=Tg(),e=jA();function n(r){for(var o="https://reactjs.org/docs/error-decoder.html?invariant="+r,c=1;c<arguments.length;c++)o+="&args[]="+encodeURIComponent(arguments[c]);return"Minified React error #"+r+"; visit "+o+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var i=new Set,s={};function a(r,o){l(r,o),l(r+"Capture",o)}function l(r,o){for(s[r]=o,r=0;r<o.length;r++)i.add(o[r])}var u=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),f=Object.prototype.hasOwnProperty,d=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,h={},m={};function g(r){return f.call(m,r)?!0:f.call(h,r)?!1:d.test(r)?m[r]=!0:(h[r]=!0,!1)}function v(r,o,c,p){if(c!==null&&c.type===0)return!1;switch(typeof o){case"function":case"symbol":return!0;case"boolean":return p?!1:c!==null?!c.acceptsBooleans:(r=r.toLowerCase().slice(0,5),r!=="data-"&&r!=="aria-");default:return!1}}function E(r,o,c,p){if(o===null||typeof o>"u"||v(r,o,c,p))return!0;if(p)return!1;if(c!==null)switch(c.type){case 3:return!o;case 4:return o===!1;case 5:return isNaN(o);case 6:return isNaN(o)||1>o}return!1}function w(r,o,c,p,x,S,A){this.acceptsBooleans=o===2||o===3||o===4,this.attributeName=p,this.attributeNamespace=x,this.mustUseProperty=c,this.propertyName=r,this.type=o,this.sanitizeURL=S,this.removeEmptyString=A}var _={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(r){_[r]=new w(r,0,!1,r,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(r){var o=r[0];_[o]=new w(o,1,!1,r[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(r){_[r]=new w(r,2,!1,r.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(r){_[r]=new w(r,2,!1,r,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(r){_[r]=new w(r,3,!1,r.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(r){_[r]=new w(r,3,!0,r,null,!1,!1)}),["capture","download"].forEach(function(r){_[r]=new w(r,4,!1,r,null,!1,!1)}),["cols","rows","size","span"].forEach(function(r){_[r]=new w(r,6,!1,r,null,!1,!1)}),["rowSpan","start"].forEach(function(r){_[r]=new w(r,5,!1,r.toLowerCase(),null,!1,!1)});var y=/[\-:]([a-z])/g;function M(r){return r[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(r){var o=r.replace(y,M);_[o]=new w(o,1,!1,r,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(r){var o=r.replace(y,M);_[o]=new w(o,1,!1,r,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(r){var o=r.replace(y,M);_[o]=new w(o,1,!1,r,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(r){_[r]=new w(r,1,!1,r.toLowerCase(),null,!1,!1)}),_.xlinkHref=new w("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(r){_[r]=new w(r,1,!1,r.toLowerCase(),null,!0,!0)});function T(r,o,c,p){var x=_.hasOwnProperty(o)?_[o]:null;(x!==null?x.type!==0:p||!(2<o.length)||o[0]!=="o"&&o[0]!=="O"||o[1]!=="n"&&o[1]!=="N")&&(E(o,c,x,p)&&(c=null),p||x===null?g(o)&&(c===null?r.removeAttribute(o):r.setAttribute(o,""+c)):x.mustUseProperty?r[x.propertyName]=c===null?x.type===3?!1:"":c:(o=x.attributeName,p=x.attributeNamespace,c===null?r.removeAttribute(o):(x=x.type,c=x===3||x===4&&c===!0?"":""+c,p?r.setAttributeNS(p,o,c):r.setAttribute(o,c))))}var C=t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,N=Symbol.for("react.element"),b=Symbol.for("react.portal"),k=Symbol.for("react.fragment"),B=Symbol.for("react.strict_mode"),L=Symbol.for("react.profiler"),R=Symbol.for("react.provider"),O=Symbol.for("react.context"),Z=Symbol.for("react.forward_ref"),X=Symbol.for("react.suspense"),J=Symbol.for("react.suspense_list"),ne=Symbol.for("react.memo"),le=Symbol.for("react.lazy"),re=Symbol.for("react.offscreen"),G=Symbol.iterator;function ue(r){return r===null||typeof r!="object"?null:(r=G&&r[G]||r["@@iterator"],typeof r=="function"?r:null)}var D=Object.assign,V;function ie(r){if(V===void 0)try{throw Error()}catch(c){var o=c.stack.trim().match(/\n( *(at )?)/);V=o&&o[1]||""}return`
`+V+r}var U=!1;function ee(r,o){if(!r||U)return"";U=!0;var c=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(o)if(o=function(){throw Error()},Object.defineProperty(o.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(o,[])}catch(ae){var p=ae}Reflect.construct(r,[],o)}else{try{o.call()}catch(ae){p=ae}r.call(o.prototype)}else{try{throw Error()}catch(ae){p=ae}r()}}catch(ae){if(ae&&p&&typeof ae.stack=="string"){for(var x=ae.stack.split(`
`),S=p.stack.split(`
`),A=x.length-1,z=S.length-1;1<=A&&0<=z&&x[A]!==S[z];)z--;for(;1<=A&&0<=z;A--,z--)if(x[A]!==S[z]){if(A!==1||z!==1)do if(A--,z--,0>z||x[A]!==S[z]){var W=`
`+x[A].replace(" at new "," at ");return r.displayName&&W.includes("<anonymous>")&&(W=W.replace("<anonymous>",r.displayName)),W}while(1<=A&&0<=z);break}}}finally{U=!1,Error.prepareStackTrace=c}return(r=r?r.displayName||r.name:"")?ie(r):""}function ge(r){switch(r.tag){case 5:return ie(r.type);case 16:return ie("Lazy");case 13:return ie("Suspense");case 19:return ie("SuspenseList");case 0:case 2:case 15:return r=ee(r.type,!1),r;case 11:return r=ee(r.type.render,!1),r;case 1:return r=ee(r.type,!0),r;default:return""}}function ye(r){if(r==null)return null;if(typeof r=="function")return r.displayName||r.name||null;if(typeof r=="string")return r;switch(r){case k:return"Fragment";case b:return"Portal";case L:return"Profiler";case B:return"StrictMode";case X:return"Suspense";case J:return"SuspenseList"}if(typeof r=="object")switch(r.$$typeof){case O:return(r.displayName||"Context")+".Consumer";case R:return(r._context.displayName||"Context")+".Provider";case Z:var o=r.render;return r=r.displayName,r||(r=o.displayName||o.name||"",r=r!==""?"ForwardRef("+r+")":"ForwardRef"),r;case ne:return o=r.displayName||null,o!==null?o:ye(r.type)||"Memo";case le:o=r._payload,r=r._init;try{return ye(r(o))}catch{}}return null}function Se(r){var o=r.type;switch(r.tag){case 24:return"Cache";case 9:return(o.displayName||"Context")+".Consumer";case 10:return(o._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return r=o.render,r=r.displayName||r.name||"",o.displayName||(r!==""?"ForwardRef("+r+")":"ForwardRef");case 7:return"Fragment";case 5:return o;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return ye(o);case 8:return o===B?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof o=="function")return o.displayName||o.name||null;if(typeof o=="string")return o}return null}function Re(r){switch(typeof r){case"boolean":case"number":case"string":case"undefined":return r;case"object":return r;default:return""}}function Le(r){var o=r.type;return(r=r.nodeName)&&r.toLowerCase()==="input"&&(o==="checkbox"||o==="radio")}function $e(r){var o=Le(r)?"checked":"value",c=Object.getOwnPropertyDescriptor(r.constructor.prototype,o),p=""+r[o];if(!r.hasOwnProperty(o)&&typeof c<"u"&&typeof c.get=="function"&&typeof c.set=="function"){var x=c.get,S=c.set;return Object.defineProperty(r,o,{configurable:!0,get:function(){return x.call(this)},set:function(A){p=""+A,S.call(this,A)}}),Object.defineProperty(r,o,{enumerable:c.enumerable}),{getValue:function(){return p},setValue:function(A){p=""+A},stopTracking:function(){r._valueTracker=null,delete r[o]}}}}function St(r){r._valueTracker||(r._valueTracker=$e(r))}function at(r){if(!r)return!1;var o=r._valueTracker;if(!o)return!0;var c=o.getValue(),p="";return r&&(p=Le(r)?r.checked?"true":"false":r.value),r=p,r!==c?(o.setValue(r),!0):!1}function Ft(r){if(r=r||(typeof document<"u"?document:void 0),typeof r>"u")return null;try{return r.activeElement||r.body}catch{return r.body}}function j(r,o){var c=o.checked;return D({},o,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:c??r._wrapperState.initialChecked})}function xn(r,o){var c=o.defaultValue==null?"":o.defaultValue,p=o.checked!=null?o.checked:o.defaultChecked;c=Re(o.value!=null?o.value:c),r._wrapperState={initialChecked:p,initialValue:c,controlled:o.type==="checkbox"||o.type==="radio"?o.checked!=null:o.value!=null}}function vt(r,o){o=o.checked,o!=null&&T(r,"checked",o,!1)}function mt(r,o){vt(r,o);var c=Re(o.value),p=o.type;if(c!=null)p==="number"?(c===0&&r.value===""||r.value!=c)&&(r.value=""+c):r.value!==""+c&&(r.value=""+c);else if(p==="submit"||p==="reset"){r.removeAttribute("value");return}o.hasOwnProperty("value")?Rt(r,o.type,c):o.hasOwnProperty("defaultValue")&&Rt(r,o.type,Re(o.defaultValue)),o.checked==null&&o.defaultChecked!=null&&(r.defaultChecked=!!o.defaultChecked)}function Qe(r,o,c){if(o.hasOwnProperty("value")||o.hasOwnProperty("defaultValue")){var p=o.type;if(!(p!=="submit"&&p!=="reset"||o.value!==void 0&&o.value!==null))return;o=""+r._wrapperState.initialValue,c||o===r.value||(r.value=o),r.defaultValue=o}c=r.name,c!==""&&(r.name=""),r.defaultChecked=!!r._wrapperState.initialChecked,c!==""&&(r.name=c)}function Rt(r,o,c){(o!=="number"||Ft(r.ownerDocument)!==r)&&(c==null?r.defaultValue=""+r._wrapperState.initialValue:r.defaultValue!==""+c&&(r.defaultValue=""+c))}var qe=Array.isArray;function F(r,o,c,p){if(r=r.options,o){o={};for(var x=0;x<c.length;x++)o["$"+c[x]]=!0;for(c=0;c<r.length;c++)x=o.hasOwnProperty("$"+r[c].value),r[c].selected!==x&&(r[c].selected=x),x&&p&&(r[c].defaultSelected=!0)}else{for(c=""+Re(c),o=null,x=0;x<r.length;x++){if(r[x].value===c){r[x].selected=!0,p&&(r[x].defaultSelected=!0);return}o!==null||r[x].disabled||(o=r[x])}o!==null&&(o.selected=!0)}}function P(r,o){if(o.dangerouslySetInnerHTML!=null)throw Error(n(91));return D({},o,{value:void 0,defaultValue:void 0,children:""+r._wrapperState.initialValue})}function oe(r,o){var c=o.value;if(c==null){if(c=o.children,o=o.defaultValue,c!=null){if(o!=null)throw Error(n(92));if(qe(c)){if(1<c.length)throw Error(n(93));c=c[0]}o=c}o==null&&(o=""),c=o}r._wrapperState={initialValue:Re(c)}}function _e(r,o){var c=Re(o.value),p=Re(o.defaultValue);c!=null&&(c=""+c,c!==r.value&&(r.value=c),o.defaultValue==null&&r.defaultValue!==c&&(r.defaultValue=c)),p!=null&&(r.defaultValue=""+p)}function we(r){var o=r.textContent;o===r._wrapperState.initialValue&&o!==""&&o!==null&&(r.value=o)}function H(r){switch(r){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function de(r,o){return r==null||r==="http://www.w3.org/1999/xhtml"?H(o):r==="http://www.w3.org/2000/svg"&&o==="foreignObject"?"http://www.w3.org/1999/xhtml":r}var ve,Me=function(r){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(o,c,p,x){MSApp.execUnsafeLocalFunction(function(){return r(o,c,p,x)})}:r}(function(r,o){if(r.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in r)r.innerHTML=o;else{for(ve=ve||document.createElement("div"),ve.innerHTML="<svg>"+o.valueOf().toString()+"</svg>",o=ve.firstChild;r.firstChild;)r.removeChild(r.firstChild);for(;o.firstChild;)r.appendChild(o.firstChild)}});function Ge(r,o){if(o){var c=r.firstChild;if(c&&c===r.lastChild&&c.nodeType===3){c.nodeValue=o;return}}r.textContent=o}var Ee={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Ue=["Webkit","ms","Moz","O"];Object.keys(Ee).forEach(function(r){Ue.forEach(function(o){o=o+r.charAt(0).toUpperCase()+r.substring(1),Ee[o]=Ee[r]})});function Ye(r,o,c){return o==null||typeof o=="boolean"||o===""?"":c||typeof o!="number"||o===0||Ee.hasOwnProperty(r)&&Ee[r]?(""+o).trim():o+"px"}function et(r,o){r=r.style;for(var c in o)if(o.hasOwnProperty(c)){var p=c.indexOf("--")===0,x=Ye(c,o[c],p);c==="float"&&(c="cssFloat"),p?r.setProperty(c,x):r[c]=x}}var Be=D({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function nt(r,o){if(o){if(Be[r]&&(o.children!=null||o.dangerouslySetInnerHTML!=null))throw Error(n(137,r));if(o.dangerouslySetInnerHTML!=null){if(o.children!=null)throw Error(n(60));if(typeof o.dangerouslySetInnerHTML!="object"||!("__html"in o.dangerouslySetInnerHTML))throw Error(n(61))}if(o.style!=null&&typeof o.style!="object")throw Error(n(62))}}function st(r,o){if(r.indexOf("-")===-1)return typeof o.is=="string";switch(r){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var yt=null;function K(r){return r=r.target||r.srcElement||window,r.correspondingUseElement&&(r=r.correspondingUseElement),r.nodeType===3?r.parentNode:r}var Ie=null,me=null,xe=null;function Oe(r){if(r=il(r)){if(typeof Ie!="function")throw Error(n(280));var o=r.stateNode;o&&(o=Ou(o),Ie(r.stateNode,r.type,o))}}function Fe(r){me?xe?xe.push(r):xe=[r]:me=r}function dt(){if(me){var r=me,o=xe;if(xe=me=null,Oe(r),o)for(r=0;r<o.length;r++)Oe(o[r])}}function Wt(r,o){return r(o)}function pn(){}var Ct=!1;function Xn(r,o,c){if(Ct)return r(o,c);Ct=!0;try{return Wt(r,o,c)}finally{Ct=!1,(me!==null||xe!==null)&&(pn(),dt())}}function zn(r,o){var c=r.stateNode;if(c===null)return null;var p=Ou(c);if(p===null)return null;c=p[o];e:switch(o){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(p=!p.disabled)||(r=r.type,p=!(r==="button"||r==="input"||r==="select"||r==="textarea")),r=!p;break e;default:r=!1}if(r)return null;if(c&&typeof c!="function")throw Error(n(231,o,typeof c));return c}var go=!1;if(u)try{var Vr={};Object.defineProperty(Vr,"passive",{get:function(){go=!0}}),window.addEventListener("test",Vr,Vr),window.removeEventListener("test",Vr,Vr)}catch{go=!1}function ur(r,o,c,p,x,S,A,z,W){var ae=Array.prototype.slice.call(arguments,3);try{o.apply(c,ae)}catch(Ae){this.onError(Ae)}}var cr=!1,Cs=null,bs=!1,Hr=null,vu={onError:function(r){cr=!0,Cs=r}};function vo(r,o,c,p,x,S,A,z,W){cr=!1,Cs=null,ur.apply(vu,arguments)}function yu(r,o,c,p,x,S,A,z,W){if(vo.apply(this,arguments),cr){if(cr){var ae=Cs;cr=!1,Cs=null}else throw Error(n(198));bs||(bs=!0,Hr=ae)}}function Xi(r){var o=r,c=r;if(r.alternate)for(;o.return;)o=o.return;else{r=o;do o=r,o.flags&4098&&(c=o.return),r=o.return;while(r)}return o.tag===3?c:null}function xu(r){if(r.tag===13){var o=r.memoizedState;if(o===null&&(r=r.alternate,r!==null&&(o=r.memoizedState)),o!==null)return o.dehydrated}return null}function _u(r){if(Xi(r)!==r)throw Error(n(188))}function hd(r){var o=r.alternate;if(!o){if(o=Xi(r),o===null)throw Error(n(188));return o!==r?null:r}for(var c=r,p=o;;){var x=c.return;if(x===null)break;var S=x.alternate;if(S===null){if(p=x.return,p!==null){c=p;continue}break}if(x.child===S.child){for(S=x.child;S;){if(S===c)return _u(x),r;if(S===p)return _u(x),o;S=S.sibling}throw Error(n(188))}if(c.return!==p.return)c=x,p=S;else{for(var A=!1,z=x.child;z;){if(z===c){A=!0,c=x,p=S;break}if(z===p){A=!0,p=x,c=S;break}z=z.sibling}if(!A){for(z=S.child;z;){if(z===c){A=!0,c=S,p=x;break}if(z===p){A=!0,p=S,c=x;break}z=z.sibling}if(!A)throw Error(n(189))}}if(c.alternate!==p)throw Error(n(190))}if(c.tag!==3)throw Error(n(188));return c.stateNode.current===c?r:o}function Su(r){return r=hd(r),r!==null?Eu(r):null}function Eu(r){if(r.tag===5||r.tag===6)return r;for(r=r.child;r!==null;){var o=Eu(r);if(o!==null)return o;r=r.sibling}return null}var I=e.unstable_scheduleCallback,Q=e.unstable_cancelCallback,ce=e.unstable_shouldYield,fe=e.unstable_requestPaint,q=e.unstable_now,be=e.unstable_getCurrentPriorityLevel,ke=e.unstable_ImmediatePriority,He=e.unstable_UserBlockingPriority,We=e.unstable_NormalPriority,lt=e.unstable_LowPriority,ut=e.unstable_IdlePriority,Je=null,ht=null;function Pt(r){if(ht&&typeof ht.onCommitFiberRoot=="function")try{ht.onCommitFiberRoot(Je,r,void 0,(r.current.flags&128)===128)}catch{}}var Dt=Math.clz32?Math.clz32:tt,Yt=Math.log,At=Math.LN2;function tt(r){return r>>>=0,r===0?32:31-(Yt(r)/At|0)|0}var tn=64,Mt=4194304;function Tn(r){switch(r&-r){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return r&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return r&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return r}}function Pi(r,o){var c=r.pendingLanes;if(c===0)return 0;var p=0,x=r.suspendedLanes,S=r.pingedLanes,A=c&268435455;if(A!==0){var z=A&~x;z!==0?p=Tn(z):(S&=A,S!==0&&(p=Tn(S)))}else A=c&~x,A!==0?p=Tn(A):S!==0&&(p=Tn(S));if(p===0)return 0;if(o!==0&&o!==p&&!(o&x)&&(x=p&-p,S=o&-o,x>=S||x===16&&(S&4194240)!==0))return o;if(p&4&&(p|=c&16),o=r.entangledLanes,o!==0)for(r=r.entanglements,o&=p;0<o;)c=31-Dt(o),x=1<<c,p|=r[c],o&=~x;return p}function Vn(r,o){switch(r){case 1:case 2:case 4:return o+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return o+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Rs(r,o){for(var c=r.suspendedLanes,p=r.pingedLanes,x=r.expirationTimes,S=r.pendingLanes;0<S;){var A=31-Dt(S),z=1<<A,W=x[A];W===-1?(!(z&c)||z&p)&&(x[A]=Vn(z,o)):W<=o&&(r.expiredLanes|=z),S&=~z}}function Ot(r){return r=r.pendingLanes&-1073741825,r!==0?r:r&1073741824?1073741824:0}function Hn(){var r=tn;return tn<<=1,!(tn&4194240)&&(tn=64),r}function Rn(r){for(var o=[],c=0;31>c;c++)o.push(r);return o}function sn(r,o,c){r.pendingLanes|=o,o!==536870912&&(r.suspendedLanes=0,r.pingedLanes=0),r=r.eventTimes,o=31-Dt(o),r[o]=c}function Pn(r,o){var c=r.pendingLanes&~o;r.pendingLanes=o,r.suspendedLanes=0,r.pingedLanes=0,r.expiredLanes&=o,r.mutableReadLanes&=o,r.entangledLanes&=o,o=r.entanglements;var p=r.eventTimes;for(r=r.expirationTimes;0<c;){var x=31-Dt(c),S=1<<x;o[x]=0,p[x]=-1,r[x]=-1,c&=~S}}function Ps(r,o){var c=r.entangledLanes|=o;for(r=r.entanglements;c;){var p=31-Dt(c),x=1<<p;x&o|r[p]&o&&(r[p]|=o),c&=~x}}var wt=0;function Bv(r){return r&=-r,1<r?4<r?r&268435455?16:536870912:4:1}var zv,pd,Vv,Hv,Gv,md=!1,wu=[],Gr=null,Wr=null,jr=null,Va=new Map,Ha=new Map,Xr=[],cT="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Wv(r,o){switch(r){case"focusin":case"focusout":Gr=null;break;case"dragenter":case"dragleave":Wr=null;break;case"mouseover":case"mouseout":jr=null;break;case"pointerover":case"pointerout":Va.delete(o.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ha.delete(o.pointerId)}}function Ga(r,o,c,p,x,S){return r===null||r.nativeEvent!==S?(r={blockedOn:o,domEventName:c,eventSystemFlags:p,nativeEvent:S,targetContainers:[x]},o!==null&&(o=il(o),o!==null&&pd(o)),r):(r.eventSystemFlags|=p,o=r.targetContainers,x!==null&&o.indexOf(x)===-1&&o.push(x),r)}function fT(r,o,c,p,x){switch(o){case"focusin":return Gr=Ga(Gr,r,o,c,p,x),!0;case"dragenter":return Wr=Ga(Wr,r,o,c,p,x),!0;case"mouseover":return jr=Ga(jr,r,o,c,p,x),!0;case"pointerover":var S=x.pointerId;return Va.set(S,Ga(Va.get(S)||null,r,o,c,p,x)),!0;case"gotpointercapture":return S=x.pointerId,Ha.set(S,Ga(Ha.get(S)||null,r,o,c,p,x)),!0}return!1}function jv(r){var o=Ds(r.target);if(o!==null){var c=Xi(o);if(c!==null){if(o=c.tag,o===13){if(o=xu(c),o!==null){r.blockedOn=o,Gv(r.priority,function(){Vv(c)});return}}else if(o===3&&c.stateNode.current.memoizedState.isDehydrated){r.blockedOn=c.tag===3?c.stateNode.containerInfo:null;return}}}r.blockedOn=null}function Mu(r){if(r.blockedOn!==null)return!1;for(var o=r.targetContainers;0<o.length;){var c=vd(r.domEventName,r.eventSystemFlags,o[0],r.nativeEvent);if(c===null){c=r.nativeEvent;var p=new c.constructor(c.type,c);yt=p,c.target.dispatchEvent(p),yt=null}else return o=il(c),o!==null&&pd(o),r.blockedOn=c,!1;o.shift()}return!0}function Xv(r,o,c){Mu(r)&&c.delete(o)}function dT(){md=!1,Gr!==null&&Mu(Gr)&&(Gr=null),Wr!==null&&Mu(Wr)&&(Wr=null),jr!==null&&Mu(jr)&&(jr=null),Va.forEach(Xv),Ha.forEach(Xv)}function Wa(r,o){r.blockedOn===o&&(r.blockedOn=null,md||(md=!0,e.unstable_scheduleCallback(e.unstable_NormalPriority,dT)))}function ja(r){function o(x){return Wa(x,r)}if(0<wu.length){Wa(wu[0],r);for(var c=1;c<wu.length;c++){var p=wu[c];p.blockedOn===r&&(p.blockedOn=null)}}for(Gr!==null&&Wa(Gr,r),Wr!==null&&Wa(Wr,r),jr!==null&&Wa(jr,r),Va.forEach(o),Ha.forEach(o),c=0;c<Xr.length;c++)p=Xr[c],p.blockedOn===r&&(p.blockedOn=null);for(;0<Xr.length&&(c=Xr[0],c.blockedOn===null);)jv(c),c.blockedOn===null&&Xr.shift()}var yo=C.ReactCurrentBatchConfig,Tu=!0;function hT(r,o,c,p){var x=wt,S=yo.transition;yo.transition=null;try{wt=1,gd(r,o,c,p)}finally{wt=x,yo.transition=S}}function pT(r,o,c,p){var x=wt,S=yo.transition;yo.transition=null;try{wt=4,gd(r,o,c,p)}finally{wt=x,yo.transition=S}}function gd(r,o,c,p){if(Tu){var x=vd(r,o,c,p);if(x===null)kd(r,o,p,Au,c),Wv(r,p);else if(fT(x,r,o,c,p))p.stopPropagation();else if(Wv(r,p),o&4&&-1<cT.indexOf(r)){for(;x!==null;){var S=il(x);if(S!==null&&zv(S),S=vd(r,o,c,p),S===null&&kd(r,o,p,Au,c),S===x)break;x=S}x!==null&&p.stopPropagation()}else kd(r,o,p,null,c)}}var Au=null;function vd(r,o,c,p){if(Au=null,r=K(p),r=Ds(r),r!==null)if(o=Xi(r),o===null)r=null;else if(c=o.tag,c===13){if(r=xu(o),r!==null)return r;r=null}else if(c===3){if(o.stateNode.current.memoizedState.isDehydrated)return o.tag===3?o.stateNode.containerInfo:null;r=null}else o!==r&&(r=null);return Au=r,null}function $v(r){switch(r){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(be()){case ke:return 1;case He:return 4;case We:case lt:return 16;case ut:return 536870912;default:return 16}default:return 16}}var $r=null,yd=null,Cu=null;function qv(){if(Cu)return Cu;var r,o=yd,c=o.length,p,x="value"in $r?$r.value:$r.textContent,S=x.length;for(r=0;r<c&&o[r]===x[r];r++);var A=c-r;for(p=1;p<=A&&o[c-p]===x[S-p];p++);return Cu=x.slice(r,1<p?1-p:void 0)}function bu(r){var o=r.keyCode;return"charCode"in r?(r=r.charCode,r===0&&o===13&&(r=13)):r=o,r===10&&(r=13),32<=r||r===13?r:0}function Ru(){return!0}function Yv(){return!1}function si(r){function o(c,p,x,S,A){this._reactName=c,this._targetInst=x,this.type=p,this.nativeEvent=S,this.target=A,this.currentTarget=null;for(var z in r)r.hasOwnProperty(z)&&(c=r[z],this[z]=c?c(S):S[z]);return this.isDefaultPrevented=(S.defaultPrevented!=null?S.defaultPrevented:S.returnValue===!1)?Ru:Yv,this.isPropagationStopped=Yv,this}return D(o.prototype,{preventDefault:function(){this.defaultPrevented=!0;var c=this.nativeEvent;c&&(c.preventDefault?c.preventDefault():typeof c.returnValue!="unknown"&&(c.returnValue=!1),this.isDefaultPrevented=Ru)},stopPropagation:function(){var c=this.nativeEvent;c&&(c.stopPropagation?c.stopPropagation():typeof c.cancelBubble!="unknown"&&(c.cancelBubble=!0),this.isPropagationStopped=Ru)},persist:function(){},isPersistent:Ru}),o}var xo={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(r){return r.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},xd=si(xo),Xa=D({},xo,{view:0,detail:0}),mT=si(Xa),_d,Sd,$a,Pu=D({},Xa,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:wd,button:0,buttons:0,relatedTarget:function(r){return r.relatedTarget===void 0?r.fromElement===r.srcElement?r.toElement:r.fromElement:r.relatedTarget},movementX:function(r){return"movementX"in r?r.movementX:(r!==$a&&($a&&r.type==="mousemove"?(_d=r.screenX-$a.screenX,Sd=r.screenY-$a.screenY):Sd=_d=0,$a=r),_d)},movementY:function(r){return"movementY"in r?r.movementY:Sd}}),Kv=si(Pu),gT=D({},Pu,{dataTransfer:0}),vT=si(gT),yT=D({},Xa,{relatedTarget:0}),Ed=si(yT),xT=D({},xo,{animationName:0,elapsedTime:0,pseudoElement:0}),_T=si(xT),ST=D({},xo,{clipboardData:function(r){return"clipboardData"in r?r.clipboardData:window.clipboardData}}),ET=si(ST),wT=D({},xo,{data:0}),Zv=si(wT),MT={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},TT={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},AT={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function CT(r){var o=this.nativeEvent;return o.getModifierState?o.getModifierState(r):(r=AT[r])?!!o[r]:!1}function wd(){return CT}var bT=D({},Xa,{key:function(r){if(r.key){var o=MT[r.key]||r.key;if(o!=="Unidentified")return o}return r.type==="keypress"?(r=bu(r),r===13?"Enter":String.fromCharCode(r)):r.type==="keydown"||r.type==="keyup"?TT[r.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:wd,charCode:function(r){return r.type==="keypress"?bu(r):0},keyCode:function(r){return r.type==="keydown"||r.type==="keyup"?r.keyCode:0},which:function(r){return r.type==="keypress"?bu(r):r.type==="keydown"||r.type==="keyup"?r.keyCode:0}}),RT=si(bT),PT=D({},Pu,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Qv=si(PT),DT=D({},Xa,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:wd}),LT=si(DT),IT=D({},xo,{propertyName:0,elapsedTime:0,pseudoElement:0}),kT=si(IT),NT=D({},Pu,{deltaX:function(r){return"deltaX"in r?r.deltaX:"wheelDeltaX"in r?-r.wheelDeltaX:0},deltaY:function(r){return"deltaY"in r?r.deltaY:"wheelDeltaY"in r?-r.wheelDeltaY:"wheelDelta"in r?-r.wheelDelta:0},deltaZ:0,deltaMode:0}),UT=si(NT),FT=[9,13,27,32],Md=u&&"CompositionEvent"in window,qa=null;u&&"documentMode"in document&&(qa=document.documentMode);var OT=u&&"TextEvent"in window&&!qa,Jv=u&&(!Md||qa&&8<qa&&11>=qa),e0=" ",t0=!1;function n0(r,o){switch(r){case"keyup":return FT.indexOf(o.keyCode)!==-1;case"keydown":return o.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function i0(r){return r=r.detail,typeof r=="object"&&"data"in r?r.data:null}var _o=!1;function BT(r,o){switch(r){case"compositionend":return i0(o);case"keypress":return o.which!==32?null:(t0=!0,e0);case"textInput":return r=o.data,r===e0&&t0?null:r;default:return null}}function zT(r,o){if(_o)return r==="compositionend"||!Md&&n0(r,o)?(r=qv(),Cu=yd=$r=null,_o=!1,r):null;switch(r){case"paste":return null;case"keypress":if(!(o.ctrlKey||o.altKey||o.metaKey)||o.ctrlKey&&o.altKey){if(o.char&&1<o.char.length)return o.char;if(o.which)return String.fromCharCode(o.which)}return null;case"compositionend":return Jv&&o.locale!=="ko"?null:o.data;default:return null}}var VT={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function r0(r){var o=r&&r.nodeName&&r.nodeName.toLowerCase();return o==="input"?!!VT[r.type]:o==="textarea"}function s0(r,o,c,p){Fe(p),o=Nu(o,"onChange"),0<o.length&&(c=new xd("onChange","change",null,c,p),r.push({event:c,listeners:o}))}var Ya=null,Ka=null;function HT(r){w0(r,0)}function Du(r){var o=To(r);if(at(o))return r}function GT(r,o){if(r==="change")return o}var o0=!1;if(u){var Td;if(u){var Ad="oninput"in document;if(!Ad){var a0=document.createElement("div");a0.setAttribute("oninput","return;"),Ad=typeof a0.oninput=="function"}Td=Ad}else Td=!1;o0=Td&&(!document.documentMode||9<document.documentMode)}function l0(){Ya&&(Ya.detachEvent("onpropertychange",u0),Ka=Ya=null)}function u0(r){if(r.propertyName==="value"&&Du(Ka)){var o=[];s0(o,Ka,r,K(r)),Xn(HT,o)}}function WT(r,o,c){r==="focusin"?(l0(),Ya=o,Ka=c,Ya.attachEvent("onpropertychange",u0)):r==="focusout"&&l0()}function jT(r){if(r==="selectionchange"||r==="keyup"||r==="keydown")return Du(Ka)}function XT(r,o){if(r==="click")return Du(o)}function $T(r,o){if(r==="input"||r==="change")return Du(o)}function qT(r,o){return r===o&&(r!==0||1/r===1/o)||r!==r&&o!==o}var Di=typeof Object.is=="function"?Object.is:qT;function Za(r,o){if(Di(r,o))return!0;if(typeof r!="object"||r===null||typeof o!="object"||o===null)return!1;var c=Object.keys(r),p=Object.keys(o);if(c.length!==p.length)return!1;for(p=0;p<c.length;p++){var x=c[p];if(!f.call(o,x)||!Di(r[x],o[x]))return!1}return!0}function c0(r){for(;r&&r.firstChild;)r=r.firstChild;return r}function f0(r,o){var c=c0(r);r=0;for(var p;c;){if(c.nodeType===3){if(p=r+c.textContent.length,r<=o&&p>=o)return{node:c,offset:o-r};r=p}e:{for(;c;){if(c.nextSibling){c=c.nextSibling;break e}c=c.parentNode}c=void 0}c=c0(c)}}function d0(r,o){return r&&o?r===o?!0:r&&r.nodeType===3?!1:o&&o.nodeType===3?d0(r,o.parentNode):"contains"in r?r.contains(o):r.compareDocumentPosition?!!(r.compareDocumentPosition(o)&16):!1:!1}function h0(){for(var r=window,o=Ft();o instanceof r.HTMLIFrameElement;){try{var c=typeof o.contentWindow.location.href=="string"}catch{c=!1}if(c)r=o.contentWindow;else break;o=Ft(r.document)}return o}function Cd(r){var o=r&&r.nodeName&&r.nodeName.toLowerCase();return o&&(o==="input"&&(r.type==="text"||r.type==="search"||r.type==="tel"||r.type==="url"||r.type==="password")||o==="textarea"||r.contentEditable==="true")}function YT(r){var o=h0(),c=r.focusedElem,p=r.selectionRange;if(o!==c&&c&&c.ownerDocument&&d0(c.ownerDocument.documentElement,c)){if(p!==null&&Cd(c)){if(o=p.start,r=p.end,r===void 0&&(r=o),"selectionStart"in c)c.selectionStart=o,c.selectionEnd=Math.min(r,c.value.length);else if(r=(o=c.ownerDocument||document)&&o.defaultView||window,r.getSelection){r=r.getSelection();var x=c.textContent.length,S=Math.min(p.start,x);p=p.end===void 0?S:Math.min(p.end,x),!r.extend&&S>p&&(x=p,p=S,S=x),x=f0(c,S);var A=f0(c,p);x&&A&&(r.rangeCount!==1||r.anchorNode!==x.node||r.anchorOffset!==x.offset||r.focusNode!==A.node||r.focusOffset!==A.offset)&&(o=o.createRange(),o.setStart(x.node,x.offset),r.removeAllRanges(),S>p?(r.addRange(o),r.extend(A.node,A.offset)):(o.setEnd(A.node,A.offset),r.addRange(o)))}}for(o=[],r=c;r=r.parentNode;)r.nodeType===1&&o.push({element:r,left:r.scrollLeft,top:r.scrollTop});for(typeof c.focus=="function"&&c.focus(),c=0;c<o.length;c++)r=o[c],r.element.scrollLeft=r.left,r.element.scrollTop=r.top}}var KT=u&&"documentMode"in document&&11>=document.documentMode,So=null,bd=null,Qa=null,Rd=!1;function p0(r,o,c){var p=c.window===c?c.document:c.nodeType===9?c:c.ownerDocument;Rd||So==null||So!==Ft(p)||(p=So,"selectionStart"in p&&Cd(p)?p={start:p.selectionStart,end:p.selectionEnd}:(p=(p.ownerDocument&&p.ownerDocument.defaultView||window).getSelection(),p={anchorNode:p.anchorNode,anchorOffset:p.anchorOffset,focusNode:p.focusNode,focusOffset:p.focusOffset}),Qa&&Za(Qa,p)||(Qa=p,p=Nu(bd,"onSelect"),0<p.length&&(o=new xd("onSelect","select",null,o,c),r.push({event:o,listeners:p}),o.target=So)))}function Lu(r,o){var c={};return c[r.toLowerCase()]=o.toLowerCase(),c["Webkit"+r]="webkit"+o,c["Moz"+r]="moz"+o,c}var Eo={animationend:Lu("Animation","AnimationEnd"),animationiteration:Lu("Animation","AnimationIteration"),animationstart:Lu("Animation","AnimationStart"),transitionend:Lu("Transition","TransitionEnd")},Pd={},m0={};u&&(m0=document.createElement("div").style,"AnimationEvent"in window||(delete Eo.animationend.animation,delete Eo.animationiteration.animation,delete Eo.animationstart.animation),"TransitionEvent"in window||delete Eo.transitionend.transition);function Iu(r){if(Pd[r])return Pd[r];if(!Eo[r])return r;var o=Eo[r],c;for(c in o)if(o.hasOwnProperty(c)&&c in m0)return Pd[r]=o[c];return r}var g0=Iu("animationend"),v0=Iu("animationiteration"),y0=Iu("animationstart"),x0=Iu("transitionend"),_0=new Map,S0="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function qr(r,o){_0.set(r,o),a(o,[r])}for(var Dd=0;Dd<S0.length;Dd++){var Ld=S0[Dd],ZT=Ld.toLowerCase(),QT=Ld[0].toUpperCase()+Ld.slice(1);qr(ZT,"on"+QT)}qr(g0,"onAnimationEnd"),qr(v0,"onAnimationIteration"),qr(y0,"onAnimationStart"),qr("dblclick","onDoubleClick"),qr("focusin","onFocus"),qr("focusout","onBlur"),qr(x0,"onTransitionEnd"),l("onMouseEnter",["mouseout","mouseover"]),l("onMouseLeave",["mouseout","mouseover"]),l("onPointerEnter",["pointerout","pointerover"]),l("onPointerLeave",["pointerout","pointerover"]),a("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),a("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),a("onBeforeInput",["compositionend","keypress","textInput","paste"]),a("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),a("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),a("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ja="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),JT=new Set("cancel close invalid load scroll toggle".split(" ").concat(Ja));function E0(r,o,c){var p=r.type||"unknown-event";r.currentTarget=c,yu(p,o,void 0,r),r.currentTarget=null}function w0(r,o){o=(o&4)!==0;for(var c=0;c<r.length;c++){var p=r[c],x=p.event;p=p.listeners;e:{var S=void 0;if(o)for(var A=p.length-1;0<=A;A--){var z=p[A],W=z.instance,ae=z.currentTarget;if(z=z.listener,W!==S&&x.isPropagationStopped())break e;E0(x,z,ae),S=W}else for(A=0;A<p.length;A++){if(z=p[A],W=z.instance,ae=z.currentTarget,z=z.listener,W!==S&&x.isPropagationStopped())break e;E0(x,z,ae),S=W}}}if(bs)throw r=Hr,bs=!1,Hr=null,r}function jt(r,o){var c=o[zd];c===void 0&&(c=o[zd]=new Set);var p=r+"__bubble";c.has(p)||(M0(o,r,2,!1),c.add(p))}function Id(r,o,c){var p=0;o&&(p|=4),M0(c,r,p,o)}var ku="_reactListening"+Math.random().toString(36).slice(2);function el(r){if(!r[ku]){r[ku]=!0,i.forEach(function(c){c!=="selectionchange"&&(JT.has(c)||Id(c,!1,r),Id(c,!0,r))});var o=r.nodeType===9?r:r.ownerDocument;o===null||o[ku]||(o[ku]=!0,Id("selectionchange",!1,o))}}function M0(r,o,c,p){switch($v(o)){case 1:var x=hT;break;case 4:x=pT;break;default:x=gd}c=x.bind(null,o,c,r),x=void 0,!go||o!=="touchstart"&&o!=="touchmove"&&o!=="wheel"||(x=!0),p?x!==void 0?r.addEventListener(o,c,{capture:!0,passive:x}):r.addEventListener(o,c,!0):x!==void 0?r.addEventListener(o,c,{passive:x}):r.addEventListener(o,c,!1)}function kd(r,o,c,p,x){var S=p;if(!(o&1)&&!(o&2)&&p!==null)e:for(;;){if(p===null)return;var A=p.tag;if(A===3||A===4){var z=p.stateNode.containerInfo;if(z===x||z.nodeType===8&&z.parentNode===x)break;if(A===4)for(A=p.return;A!==null;){var W=A.tag;if((W===3||W===4)&&(W=A.stateNode.containerInfo,W===x||W.nodeType===8&&W.parentNode===x))return;A=A.return}for(;z!==null;){if(A=Ds(z),A===null)return;if(W=A.tag,W===5||W===6){p=S=A;continue e}z=z.parentNode}}p=p.return}Xn(function(){var ae=S,Ae=K(c),Ce=[];e:{var Te=_0.get(r);if(Te!==void 0){var ze=xd,Xe=r;switch(r){case"keypress":if(bu(c)===0)break e;case"keydown":case"keyup":ze=RT;break;case"focusin":Xe="focus",ze=Ed;break;case"focusout":Xe="blur",ze=Ed;break;case"beforeblur":case"afterblur":ze=Ed;break;case"click":if(c.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":ze=Kv;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":ze=vT;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":ze=LT;break;case g0:case v0:case y0:ze=_T;break;case x0:ze=kT;break;case"scroll":ze=mT;break;case"wheel":ze=UT;break;case"copy":case"cut":case"paste":ze=ET;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":ze=Qv}var Ke=(o&4)!==0,on=!Ke&&r==="scroll",te=Ke?Te!==null?Te+"Capture":null:Te;Ke=[];for(var Y=ae,se;Y!==null;){se=Y;var De=se.stateNode;if(se.tag===5&&De!==null&&(se=De,te!==null&&(De=zn(Y,te),De!=null&&Ke.push(tl(Y,De,se)))),on)break;Y=Y.return}0<Ke.length&&(Te=new ze(Te,Xe,null,c,Ae),Ce.push({event:Te,listeners:Ke}))}}if(!(o&7)){e:{if(Te=r==="mouseover"||r==="pointerover",ze=r==="mouseout"||r==="pointerout",Te&&c!==yt&&(Xe=c.relatedTarget||c.fromElement)&&(Ds(Xe)||Xe[fr]))break e;if((ze||Te)&&(Te=Ae.window===Ae?Ae:(Te=Ae.ownerDocument)?Te.defaultView||Te.parentWindow:window,ze?(Xe=c.relatedTarget||c.toElement,ze=ae,Xe=Xe?Ds(Xe):null,Xe!==null&&(on=Xi(Xe),Xe!==on||Xe.tag!==5&&Xe.tag!==6)&&(Xe=null)):(ze=null,Xe=ae),ze!==Xe)){if(Ke=Kv,De="onMouseLeave",te="onMouseEnter",Y="mouse",(r==="pointerout"||r==="pointerover")&&(Ke=Qv,De="onPointerLeave",te="onPointerEnter",Y="pointer"),on=ze==null?Te:To(ze),se=Xe==null?Te:To(Xe),Te=new Ke(De,Y+"leave",ze,c,Ae),Te.target=on,Te.relatedTarget=se,De=null,Ds(Ae)===ae&&(Ke=new Ke(te,Y+"enter",Xe,c,Ae),Ke.target=se,Ke.relatedTarget=on,De=Ke),on=De,ze&&Xe)t:{for(Ke=ze,te=Xe,Y=0,se=Ke;se;se=wo(se))Y++;for(se=0,De=te;De;De=wo(De))se++;for(;0<Y-se;)Ke=wo(Ke),Y--;for(;0<se-Y;)te=wo(te),se--;for(;Y--;){if(Ke===te||te!==null&&Ke===te.alternate)break t;Ke=wo(Ke),te=wo(te)}Ke=null}else Ke=null;ze!==null&&T0(Ce,Te,ze,Ke,!1),Xe!==null&&on!==null&&T0(Ce,on,Xe,Ke,!0)}}e:{if(Te=ae?To(ae):window,ze=Te.nodeName&&Te.nodeName.toLowerCase(),ze==="select"||ze==="input"&&Te.type==="file")var Ze=GT;else if(r0(Te))if(o0)Ze=$T;else{Ze=jT;var it=WT}else(ze=Te.nodeName)&&ze.toLowerCase()==="input"&&(Te.type==="checkbox"||Te.type==="radio")&&(Ze=XT);if(Ze&&(Ze=Ze(r,ae))){s0(Ce,Ze,c,Ae);break e}it&&it(r,Te,ae),r==="focusout"&&(it=Te._wrapperState)&&it.controlled&&Te.type==="number"&&Rt(Te,"number",Te.value)}switch(it=ae?To(ae):window,r){case"focusin":(r0(it)||it.contentEditable==="true")&&(So=it,bd=ae,Qa=null);break;case"focusout":Qa=bd=So=null;break;case"mousedown":Rd=!0;break;case"contextmenu":case"mouseup":case"dragend":Rd=!1,p0(Ce,c,Ae);break;case"selectionchange":if(KT)break;case"keydown":case"keyup":p0(Ce,c,Ae)}var rt;if(Md)e:{switch(r){case"compositionstart":var ct="onCompositionStart";break e;case"compositionend":ct="onCompositionEnd";break e;case"compositionupdate":ct="onCompositionUpdate";break e}ct=void 0}else _o?n0(r,c)&&(ct="onCompositionEnd"):r==="keydown"&&c.keyCode===229&&(ct="onCompositionStart");ct&&(Jv&&c.locale!=="ko"&&(_o||ct!=="onCompositionStart"?ct==="onCompositionEnd"&&_o&&(rt=qv()):($r=Ae,yd="value"in $r?$r.value:$r.textContent,_o=!0)),it=Nu(ae,ct),0<it.length&&(ct=new Zv(ct,r,null,c,Ae),Ce.push({event:ct,listeners:it}),rt?ct.data=rt:(rt=i0(c),rt!==null&&(ct.data=rt)))),(rt=OT?BT(r,c):zT(r,c))&&(ae=Nu(ae,"onBeforeInput"),0<ae.length&&(Ae=new Zv("onBeforeInput","beforeinput",null,c,Ae),Ce.push({event:Ae,listeners:ae}),Ae.data=rt))}w0(Ce,o)})}function tl(r,o,c){return{instance:r,listener:o,currentTarget:c}}function Nu(r,o){for(var c=o+"Capture",p=[];r!==null;){var x=r,S=x.stateNode;x.tag===5&&S!==null&&(x=S,S=zn(r,c),S!=null&&p.unshift(tl(r,S,x)),S=zn(r,o),S!=null&&p.push(tl(r,S,x))),r=r.return}return p}function wo(r){if(r===null)return null;do r=r.return;while(r&&r.tag!==5);return r||null}function T0(r,o,c,p,x){for(var S=o._reactName,A=[];c!==null&&c!==p;){var z=c,W=z.alternate,ae=z.stateNode;if(W!==null&&W===p)break;z.tag===5&&ae!==null&&(z=ae,x?(W=zn(c,S),W!=null&&A.unshift(tl(c,W,z))):x||(W=zn(c,S),W!=null&&A.push(tl(c,W,z)))),c=c.return}A.length!==0&&r.push({event:o,listeners:A})}var eA=/\r\n?/g,tA=/\u0000|\uFFFD/g;function A0(r){return(typeof r=="string"?r:""+r).replace(eA,`
`).replace(tA,"")}function Uu(r,o,c){if(o=A0(o),A0(r)!==o&&c)throw Error(n(425))}function Fu(){}var Nd=null,Ud=null;function Fd(r,o){return r==="textarea"||r==="noscript"||typeof o.children=="string"||typeof o.children=="number"||typeof o.dangerouslySetInnerHTML=="object"&&o.dangerouslySetInnerHTML!==null&&o.dangerouslySetInnerHTML.__html!=null}var Od=typeof setTimeout=="function"?setTimeout:void 0,nA=typeof clearTimeout=="function"?clearTimeout:void 0,C0=typeof Promise=="function"?Promise:void 0,iA=typeof queueMicrotask=="function"?queueMicrotask:typeof C0<"u"?function(r){return C0.resolve(null).then(r).catch(rA)}:Od;function rA(r){setTimeout(function(){throw r})}function Bd(r,o){var c=o,p=0;do{var x=c.nextSibling;if(r.removeChild(c),x&&x.nodeType===8)if(c=x.data,c==="/$"){if(p===0){r.removeChild(x),ja(o);return}p--}else c!=="$"&&c!=="$?"&&c!=="$!"||p++;c=x}while(c);ja(o)}function Yr(r){for(;r!=null;r=r.nextSibling){var o=r.nodeType;if(o===1||o===3)break;if(o===8){if(o=r.data,o==="$"||o==="$!"||o==="$?")break;if(o==="/$")return null}}return r}function b0(r){r=r.previousSibling;for(var o=0;r;){if(r.nodeType===8){var c=r.data;if(c==="$"||c==="$!"||c==="$?"){if(o===0)return r;o--}else c==="/$"&&o++}r=r.previousSibling}return null}var Mo=Math.random().toString(36).slice(2),$i="__reactFiber$"+Mo,nl="__reactProps$"+Mo,fr="__reactContainer$"+Mo,zd="__reactEvents$"+Mo,sA="__reactListeners$"+Mo,oA="__reactHandles$"+Mo;function Ds(r){var o=r[$i];if(o)return o;for(var c=r.parentNode;c;){if(o=c[fr]||c[$i]){if(c=o.alternate,o.child!==null||c!==null&&c.child!==null)for(r=b0(r);r!==null;){if(c=r[$i])return c;r=b0(r)}return o}r=c,c=r.parentNode}return null}function il(r){return r=r[$i]||r[fr],!r||r.tag!==5&&r.tag!==6&&r.tag!==13&&r.tag!==3?null:r}function To(r){if(r.tag===5||r.tag===6)return r.stateNode;throw Error(n(33))}function Ou(r){return r[nl]||null}var Vd=[],Ao=-1;function Kr(r){return{current:r}}function Xt(r){0>Ao||(r.current=Vd[Ao],Vd[Ao]=null,Ao--)}function Vt(r,o){Ao++,Vd[Ao]=r.current,r.current=o}var Zr={},Dn=Kr(Zr),$n=Kr(!1),Ls=Zr;function Co(r,o){var c=r.type.contextTypes;if(!c)return Zr;var p=r.stateNode;if(p&&p.__reactInternalMemoizedUnmaskedChildContext===o)return p.__reactInternalMemoizedMaskedChildContext;var x={},S;for(S in c)x[S]=o[S];return p&&(r=r.stateNode,r.__reactInternalMemoizedUnmaskedChildContext=o,r.__reactInternalMemoizedMaskedChildContext=x),x}function qn(r){return r=r.childContextTypes,r!=null}function Bu(){Xt($n),Xt(Dn)}function R0(r,o,c){if(Dn.current!==Zr)throw Error(n(168));Vt(Dn,o),Vt($n,c)}function P0(r,o,c){var p=r.stateNode;if(o=o.childContextTypes,typeof p.getChildContext!="function")return c;p=p.getChildContext();for(var x in p)if(!(x in o))throw Error(n(108,Se(r)||"Unknown",x));return D({},c,p)}function zu(r){return r=(r=r.stateNode)&&r.__reactInternalMemoizedMergedChildContext||Zr,Ls=Dn.current,Vt(Dn,r),Vt($n,$n.current),!0}function D0(r,o,c){var p=r.stateNode;if(!p)throw Error(n(169));c?(r=P0(r,o,Ls),p.__reactInternalMemoizedMergedChildContext=r,Xt($n),Xt(Dn),Vt(Dn,r)):Xt($n),Vt($n,c)}var dr=null,Vu=!1,Hd=!1;function L0(r){dr===null?dr=[r]:dr.push(r)}function aA(r){Vu=!0,L0(r)}function Qr(){if(!Hd&&dr!==null){Hd=!0;var r=0,o=wt;try{var c=dr;for(wt=1;r<c.length;r++){var p=c[r];do p=p(!0);while(p!==null)}dr=null,Vu=!1}catch(x){throw dr!==null&&(dr=dr.slice(r+1)),I(ke,Qr),x}finally{wt=o,Hd=!1}}return null}var bo=[],Ro=0,Hu=null,Gu=0,vi=[],yi=0,Is=null,hr=1,pr="";function ks(r,o){bo[Ro++]=Gu,bo[Ro++]=Hu,Hu=r,Gu=o}function I0(r,o,c){vi[yi++]=hr,vi[yi++]=pr,vi[yi++]=Is,Is=r;var p=hr;r=pr;var x=32-Dt(p)-1;p&=~(1<<x),c+=1;var S=32-Dt(o)+x;if(30<S){var A=x-x%5;S=(p&(1<<A)-1).toString(32),p>>=A,x-=A,hr=1<<32-Dt(o)+x|c<<x|p,pr=S+r}else hr=1<<S|c<<x|p,pr=r}function Gd(r){r.return!==null&&(ks(r,1),I0(r,1,0))}function Wd(r){for(;r===Hu;)Hu=bo[--Ro],bo[Ro]=null,Gu=bo[--Ro],bo[Ro]=null;for(;r===Is;)Is=vi[--yi],vi[yi]=null,pr=vi[--yi],vi[yi]=null,hr=vi[--yi],vi[yi]=null}var oi=null,ai=null,Kt=!1,Li=null;function k0(r,o){var c=Ei(5,null,null,0);c.elementType="DELETED",c.stateNode=o,c.return=r,o=r.deletions,o===null?(r.deletions=[c],r.flags|=16):o.push(c)}function N0(r,o){switch(r.tag){case 5:var c=r.type;return o=o.nodeType!==1||c.toLowerCase()!==o.nodeName.toLowerCase()?null:o,o!==null?(r.stateNode=o,oi=r,ai=Yr(o.firstChild),!0):!1;case 6:return o=r.pendingProps===""||o.nodeType!==3?null:o,o!==null?(r.stateNode=o,oi=r,ai=null,!0):!1;case 13:return o=o.nodeType!==8?null:o,o!==null?(c=Is!==null?{id:hr,overflow:pr}:null,r.memoizedState={dehydrated:o,treeContext:c,retryLane:1073741824},c=Ei(18,null,null,0),c.stateNode=o,c.return=r,r.child=c,oi=r,ai=null,!0):!1;default:return!1}}function jd(r){return(r.mode&1)!==0&&(r.flags&128)===0}function Xd(r){if(Kt){var o=ai;if(o){var c=o;if(!N0(r,o)){if(jd(r))throw Error(n(418));o=Yr(c.nextSibling);var p=oi;o&&N0(r,o)?k0(p,c):(r.flags=r.flags&-4097|2,Kt=!1,oi=r)}}else{if(jd(r))throw Error(n(418));r.flags=r.flags&-4097|2,Kt=!1,oi=r}}}function U0(r){for(r=r.return;r!==null&&r.tag!==5&&r.tag!==3&&r.tag!==13;)r=r.return;oi=r}function Wu(r){if(r!==oi)return!1;if(!Kt)return U0(r),Kt=!0,!1;var o;if((o=r.tag!==3)&&!(o=r.tag!==5)&&(o=r.type,o=o!=="head"&&o!=="body"&&!Fd(r.type,r.memoizedProps)),o&&(o=ai)){if(jd(r))throw F0(),Error(n(418));for(;o;)k0(r,o),o=Yr(o.nextSibling)}if(U0(r),r.tag===13){if(r=r.memoizedState,r=r!==null?r.dehydrated:null,!r)throw Error(n(317));e:{for(r=r.nextSibling,o=0;r;){if(r.nodeType===8){var c=r.data;if(c==="/$"){if(o===0){ai=Yr(r.nextSibling);break e}o--}else c!=="$"&&c!=="$!"&&c!=="$?"||o++}r=r.nextSibling}ai=null}}else ai=oi?Yr(r.stateNode.nextSibling):null;return!0}function F0(){for(var r=ai;r;)r=Yr(r.nextSibling)}function Po(){ai=oi=null,Kt=!1}function $d(r){Li===null?Li=[r]:Li.push(r)}var lA=C.ReactCurrentBatchConfig;function rl(r,o,c){if(r=c.ref,r!==null&&typeof r!="function"&&typeof r!="object"){if(c._owner){if(c=c._owner,c){if(c.tag!==1)throw Error(n(309));var p=c.stateNode}if(!p)throw Error(n(147,r));var x=p,S=""+r;return o!==null&&o.ref!==null&&typeof o.ref=="function"&&o.ref._stringRef===S?o.ref:(o=function(A){var z=x.refs;A===null?delete z[S]:z[S]=A},o._stringRef=S,o)}if(typeof r!="string")throw Error(n(284));if(!c._owner)throw Error(n(290,r))}return r}function ju(r,o){throw r=Object.prototype.toString.call(o),Error(n(31,r==="[object Object]"?"object with keys {"+Object.keys(o).join(", ")+"}":r))}function O0(r){var o=r._init;return o(r._payload)}function B0(r){function o(te,Y){if(r){var se=te.deletions;se===null?(te.deletions=[Y],te.flags|=16):se.push(Y)}}function c(te,Y){if(!r)return null;for(;Y!==null;)o(te,Y),Y=Y.sibling;return null}function p(te,Y){for(te=new Map;Y!==null;)Y.key!==null?te.set(Y.key,Y):te.set(Y.index,Y),Y=Y.sibling;return te}function x(te,Y){return te=os(te,Y),te.index=0,te.sibling=null,te}function S(te,Y,se){return te.index=se,r?(se=te.alternate,se!==null?(se=se.index,se<Y?(te.flags|=2,Y):se):(te.flags|=2,Y)):(te.flags|=1048576,Y)}function A(te){return r&&te.alternate===null&&(te.flags|=2),te}function z(te,Y,se,De){return Y===null||Y.tag!==6?(Y=Oh(se,te.mode,De),Y.return=te,Y):(Y=x(Y,se),Y.return=te,Y)}function W(te,Y,se,De){var Ze=se.type;return Ze===k?Ae(te,Y,se.props.children,De,se.key):Y!==null&&(Y.elementType===Ze||typeof Ze=="object"&&Ze!==null&&Ze.$$typeof===le&&O0(Ze)===Y.type)?(De=x(Y,se.props),De.ref=rl(te,Y,se),De.return=te,De):(De=mc(se.type,se.key,se.props,null,te.mode,De),De.ref=rl(te,Y,se),De.return=te,De)}function ae(te,Y,se,De){return Y===null||Y.tag!==4||Y.stateNode.containerInfo!==se.containerInfo||Y.stateNode.implementation!==se.implementation?(Y=Bh(se,te.mode,De),Y.return=te,Y):(Y=x(Y,se.children||[]),Y.return=te,Y)}function Ae(te,Y,se,De,Ze){return Y===null||Y.tag!==7?(Y=Hs(se,te.mode,De,Ze),Y.return=te,Y):(Y=x(Y,se),Y.return=te,Y)}function Ce(te,Y,se){if(typeof Y=="string"&&Y!==""||typeof Y=="number")return Y=Oh(""+Y,te.mode,se),Y.return=te,Y;if(typeof Y=="object"&&Y!==null){switch(Y.$$typeof){case N:return se=mc(Y.type,Y.key,Y.props,null,te.mode,se),se.ref=rl(te,null,Y),se.return=te,se;case b:return Y=Bh(Y,te.mode,se),Y.return=te,Y;case le:var De=Y._init;return Ce(te,De(Y._payload),se)}if(qe(Y)||ue(Y))return Y=Hs(Y,te.mode,se,null),Y.return=te,Y;ju(te,Y)}return null}function Te(te,Y,se,De){var Ze=Y!==null?Y.key:null;if(typeof se=="string"&&se!==""||typeof se=="number")return Ze!==null?null:z(te,Y,""+se,De);if(typeof se=="object"&&se!==null){switch(se.$$typeof){case N:return se.key===Ze?W(te,Y,se,De):null;case b:return se.key===Ze?ae(te,Y,se,De):null;case le:return Ze=se._init,Te(te,Y,Ze(se._payload),De)}if(qe(se)||ue(se))return Ze!==null?null:Ae(te,Y,se,De,null);ju(te,se)}return null}function ze(te,Y,se,De,Ze){if(typeof De=="string"&&De!==""||typeof De=="number")return te=te.get(se)||null,z(Y,te,""+De,Ze);if(typeof De=="object"&&De!==null){switch(De.$$typeof){case N:return te=te.get(De.key===null?se:De.key)||null,W(Y,te,De,Ze);case b:return te=te.get(De.key===null?se:De.key)||null,ae(Y,te,De,Ze);case le:var it=De._init;return ze(te,Y,se,it(De._payload),Ze)}if(qe(De)||ue(De))return te=te.get(se)||null,Ae(Y,te,De,Ze,null);ju(Y,De)}return null}function Xe(te,Y,se,De){for(var Ze=null,it=null,rt=Y,ct=Y=0,En=null;rt!==null&&ct<se.length;ct++){rt.index>ct?(En=rt,rt=null):En=rt.sibling;var Lt=Te(te,rt,se[ct],De);if(Lt===null){rt===null&&(rt=En);break}r&&rt&&Lt.alternate===null&&o(te,rt),Y=S(Lt,Y,ct),it===null?Ze=Lt:it.sibling=Lt,it=Lt,rt=En}if(ct===se.length)return c(te,rt),Kt&&ks(te,ct),Ze;if(rt===null){for(;ct<se.length;ct++)rt=Ce(te,se[ct],De),rt!==null&&(Y=S(rt,Y,ct),it===null?Ze=rt:it.sibling=rt,it=rt);return Kt&&ks(te,ct),Ze}for(rt=p(te,rt);ct<se.length;ct++)En=ze(rt,te,ct,se[ct],De),En!==null&&(r&&En.alternate!==null&&rt.delete(En.key===null?ct:En.key),Y=S(En,Y,ct),it===null?Ze=En:it.sibling=En,it=En);return r&&rt.forEach(function(as){return o(te,as)}),Kt&&ks(te,ct),Ze}function Ke(te,Y,se,De){var Ze=ue(se);if(typeof Ze!="function")throw Error(n(150));if(se=Ze.call(se),se==null)throw Error(n(151));for(var it=Ze=null,rt=Y,ct=Y=0,En=null,Lt=se.next();rt!==null&&!Lt.done;ct++,Lt=se.next()){rt.index>ct?(En=rt,rt=null):En=rt.sibling;var as=Te(te,rt,Lt.value,De);if(as===null){rt===null&&(rt=En);break}r&&rt&&as.alternate===null&&o(te,rt),Y=S(as,Y,ct),it===null?Ze=as:it.sibling=as,it=as,rt=En}if(Lt.done)return c(te,rt),Kt&&ks(te,ct),Ze;if(rt===null){for(;!Lt.done;ct++,Lt=se.next())Lt=Ce(te,Lt.value,De),Lt!==null&&(Y=S(Lt,Y,ct),it===null?Ze=Lt:it.sibling=Lt,it=Lt);return Kt&&ks(te,ct),Ze}for(rt=p(te,rt);!Lt.done;ct++,Lt=se.next())Lt=ze(rt,te,ct,Lt.value,De),Lt!==null&&(r&&Lt.alternate!==null&&rt.delete(Lt.key===null?ct:Lt.key),Y=S(Lt,Y,ct),it===null?Ze=Lt:it.sibling=Lt,it=Lt);return r&&rt.forEach(function(zA){return o(te,zA)}),Kt&&ks(te,ct),Ze}function on(te,Y,se,De){if(typeof se=="object"&&se!==null&&se.type===k&&se.key===null&&(se=se.props.children),typeof se=="object"&&se!==null){switch(se.$$typeof){case N:e:{for(var Ze=se.key,it=Y;it!==null;){if(it.key===Ze){if(Ze=se.type,Ze===k){if(it.tag===7){c(te,it.sibling),Y=x(it,se.props.children),Y.return=te,te=Y;break e}}else if(it.elementType===Ze||typeof Ze=="object"&&Ze!==null&&Ze.$$typeof===le&&O0(Ze)===it.type){c(te,it.sibling),Y=x(it,se.props),Y.ref=rl(te,it,se),Y.return=te,te=Y;break e}c(te,it);break}else o(te,it);it=it.sibling}se.type===k?(Y=Hs(se.props.children,te.mode,De,se.key),Y.return=te,te=Y):(De=mc(se.type,se.key,se.props,null,te.mode,De),De.ref=rl(te,Y,se),De.return=te,te=De)}return A(te);case b:e:{for(it=se.key;Y!==null;){if(Y.key===it)if(Y.tag===4&&Y.stateNode.containerInfo===se.containerInfo&&Y.stateNode.implementation===se.implementation){c(te,Y.sibling),Y=x(Y,se.children||[]),Y.return=te,te=Y;break e}else{c(te,Y);break}else o(te,Y);Y=Y.sibling}Y=Bh(se,te.mode,De),Y.return=te,te=Y}return A(te);case le:return it=se._init,on(te,Y,it(se._payload),De)}if(qe(se))return Xe(te,Y,se,De);if(ue(se))return Ke(te,Y,se,De);ju(te,se)}return typeof se=="string"&&se!==""||typeof se=="number"?(se=""+se,Y!==null&&Y.tag===6?(c(te,Y.sibling),Y=x(Y,se),Y.return=te,te=Y):(c(te,Y),Y=Oh(se,te.mode,De),Y.return=te,te=Y),A(te)):c(te,Y)}return on}var Do=B0(!0),z0=B0(!1),Xu=Kr(null),$u=null,Lo=null,qd=null;function Yd(){qd=Lo=$u=null}function Kd(r){var o=Xu.current;Xt(Xu),r._currentValue=o}function Zd(r,o,c){for(;r!==null;){var p=r.alternate;if((r.childLanes&o)!==o?(r.childLanes|=o,p!==null&&(p.childLanes|=o)):p!==null&&(p.childLanes&o)!==o&&(p.childLanes|=o),r===c)break;r=r.return}}function Io(r,o){$u=r,qd=Lo=null,r=r.dependencies,r!==null&&r.firstContext!==null&&(r.lanes&o&&(Yn=!0),r.firstContext=null)}function xi(r){var o=r._currentValue;if(qd!==r)if(r={context:r,memoizedValue:o,next:null},Lo===null){if($u===null)throw Error(n(308));Lo=r,$u.dependencies={lanes:0,firstContext:r}}else Lo=Lo.next=r;return o}var Ns=null;function Qd(r){Ns===null?Ns=[r]:Ns.push(r)}function V0(r,o,c,p){var x=o.interleaved;return x===null?(c.next=c,Qd(o)):(c.next=x.next,x.next=c),o.interleaved=c,mr(r,p)}function mr(r,o){r.lanes|=o;var c=r.alternate;for(c!==null&&(c.lanes|=o),c=r,r=r.return;r!==null;)r.childLanes|=o,c=r.alternate,c!==null&&(c.childLanes|=o),c=r,r=r.return;return c.tag===3?c.stateNode:null}var Jr=!1;function Jd(r){r.updateQueue={baseState:r.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function H0(r,o){r=r.updateQueue,o.updateQueue===r&&(o.updateQueue={baseState:r.baseState,firstBaseUpdate:r.firstBaseUpdate,lastBaseUpdate:r.lastBaseUpdate,shared:r.shared,effects:r.effects})}function gr(r,o){return{eventTime:r,lane:o,tag:0,payload:null,callback:null,next:null}}function es(r,o,c){var p=r.updateQueue;if(p===null)return null;if(p=p.shared,bt&2){var x=p.pending;return x===null?o.next=o:(o.next=x.next,x.next=o),p.pending=o,mr(r,c)}return x=p.interleaved,x===null?(o.next=o,Qd(p)):(o.next=x.next,x.next=o),p.interleaved=o,mr(r,c)}function qu(r,o,c){if(o=o.updateQueue,o!==null&&(o=o.shared,(c&4194240)!==0)){var p=o.lanes;p&=r.pendingLanes,c|=p,o.lanes=c,Ps(r,c)}}function G0(r,o){var c=r.updateQueue,p=r.alternate;if(p!==null&&(p=p.updateQueue,c===p)){var x=null,S=null;if(c=c.firstBaseUpdate,c!==null){do{var A={eventTime:c.eventTime,lane:c.lane,tag:c.tag,payload:c.payload,callback:c.callback,next:null};S===null?x=S=A:S=S.next=A,c=c.next}while(c!==null);S===null?x=S=o:S=S.next=o}else x=S=o;c={baseState:p.baseState,firstBaseUpdate:x,lastBaseUpdate:S,shared:p.shared,effects:p.effects},r.updateQueue=c;return}r=c.lastBaseUpdate,r===null?c.firstBaseUpdate=o:r.next=o,c.lastBaseUpdate=o}function Yu(r,o,c,p){var x=r.updateQueue;Jr=!1;var S=x.firstBaseUpdate,A=x.lastBaseUpdate,z=x.shared.pending;if(z!==null){x.shared.pending=null;var W=z,ae=W.next;W.next=null,A===null?S=ae:A.next=ae,A=W;var Ae=r.alternate;Ae!==null&&(Ae=Ae.updateQueue,z=Ae.lastBaseUpdate,z!==A&&(z===null?Ae.firstBaseUpdate=ae:z.next=ae,Ae.lastBaseUpdate=W))}if(S!==null){var Ce=x.baseState;A=0,Ae=ae=W=null,z=S;do{var Te=z.lane,ze=z.eventTime;if((p&Te)===Te){Ae!==null&&(Ae=Ae.next={eventTime:ze,lane:0,tag:z.tag,payload:z.payload,callback:z.callback,next:null});e:{var Xe=r,Ke=z;switch(Te=o,ze=c,Ke.tag){case 1:if(Xe=Ke.payload,typeof Xe=="function"){Ce=Xe.call(ze,Ce,Te);break e}Ce=Xe;break e;case 3:Xe.flags=Xe.flags&-65537|128;case 0:if(Xe=Ke.payload,Te=typeof Xe=="function"?Xe.call(ze,Ce,Te):Xe,Te==null)break e;Ce=D({},Ce,Te);break e;case 2:Jr=!0}}z.callback!==null&&z.lane!==0&&(r.flags|=64,Te=x.effects,Te===null?x.effects=[z]:Te.push(z))}else ze={eventTime:ze,lane:Te,tag:z.tag,payload:z.payload,callback:z.callback,next:null},Ae===null?(ae=Ae=ze,W=Ce):Ae=Ae.next=ze,A|=Te;if(z=z.next,z===null){if(z=x.shared.pending,z===null)break;Te=z,z=Te.next,Te.next=null,x.lastBaseUpdate=Te,x.shared.pending=null}}while(!0);if(Ae===null&&(W=Ce),x.baseState=W,x.firstBaseUpdate=ae,x.lastBaseUpdate=Ae,o=x.shared.interleaved,o!==null){x=o;do A|=x.lane,x=x.next;while(x!==o)}else S===null&&(x.shared.lanes=0);Os|=A,r.lanes=A,r.memoizedState=Ce}}function W0(r,o,c){if(r=o.effects,o.effects=null,r!==null)for(o=0;o<r.length;o++){var p=r[o],x=p.callback;if(x!==null){if(p.callback=null,p=c,typeof x!="function")throw Error(n(191,x));x.call(p)}}}var sl={},qi=Kr(sl),ol=Kr(sl),al=Kr(sl);function Us(r){if(r===sl)throw Error(n(174));return r}function eh(r,o){switch(Vt(al,o),Vt(ol,r),Vt(qi,sl),r=o.nodeType,r){case 9:case 11:o=(o=o.documentElement)?o.namespaceURI:de(null,"");break;default:r=r===8?o.parentNode:o,o=r.namespaceURI||null,r=r.tagName,o=de(o,r)}Xt(qi),Vt(qi,o)}function ko(){Xt(qi),Xt(ol),Xt(al)}function j0(r){Us(al.current);var o=Us(qi.current),c=de(o,r.type);o!==c&&(Vt(ol,r),Vt(qi,c))}function th(r){ol.current===r&&(Xt(qi),Xt(ol))}var Zt=Kr(0);function Ku(r){for(var o=r;o!==null;){if(o.tag===13){var c=o.memoizedState;if(c!==null&&(c=c.dehydrated,c===null||c.data==="$?"||c.data==="$!"))return o}else if(o.tag===19&&o.memoizedProps.revealOrder!==void 0){if(o.flags&128)return o}else if(o.child!==null){o.child.return=o,o=o.child;continue}if(o===r)break;for(;o.sibling===null;){if(o.return===null||o.return===r)return null;o=o.return}o.sibling.return=o.return,o=o.sibling}return null}var nh=[];function ih(){for(var r=0;r<nh.length;r++)nh[r]._workInProgressVersionPrimary=null;nh.length=0}var Zu=C.ReactCurrentDispatcher,rh=C.ReactCurrentBatchConfig,Fs=0,Qt=null,mn=null,_n=null,Qu=!1,ll=!1,ul=0,uA=0;function Ln(){throw Error(n(321))}function sh(r,o){if(o===null)return!1;for(var c=0;c<o.length&&c<r.length;c++)if(!Di(r[c],o[c]))return!1;return!0}function oh(r,o,c,p,x,S){if(Fs=S,Qt=o,o.memoizedState=null,o.updateQueue=null,o.lanes=0,Zu.current=r===null||r.memoizedState===null?hA:pA,r=c(p,x),ll){S=0;do{if(ll=!1,ul=0,25<=S)throw Error(n(301));S+=1,_n=mn=null,o.updateQueue=null,Zu.current=mA,r=c(p,x)}while(ll)}if(Zu.current=tc,o=mn!==null&&mn.next!==null,Fs=0,_n=mn=Qt=null,Qu=!1,o)throw Error(n(300));return r}function ah(){var r=ul!==0;return ul=0,r}function Yi(){var r={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return _n===null?Qt.memoizedState=_n=r:_n=_n.next=r,_n}function _i(){if(mn===null){var r=Qt.alternate;r=r!==null?r.memoizedState:null}else r=mn.next;var o=_n===null?Qt.memoizedState:_n.next;if(o!==null)_n=o,mn=r;else{if(r===null)throw Error(n(310));mn=r,r={memoizedState:mn.memoizedState,baseState:mn.baseState,baseQueue:mn.baseQueue,queue:mn.queue,next:null},_n===null?Qt.memoizedState=_n=r:_n=_n.next=r}return _n}function cl(r,o){return typeof o=="function"?o(r):o}function lh(r){var o=_i(),c=o.queue;if(c===null)throw Error(n(311));c.lastRenderedReducer=r;var p=mn,x=p.baseQueue,S=c.pending;if(S!==null){if(x!==null){var A=x.next;x.next=S.next,S.next=A}p.baseQueue=x=S,c.pending=null}if(x!==null){S=x.next,p=p.baseState;var z=A=null,W=null,ae=S;do{var Ae=ae.lane;if((Fs&Ae)===Ae)W!==null&&(W=W.next={lane:0,action:ae.action,hasEagerState:ae.hasEagerState,eagerState:ae.eagerState,next:null}),p=ae.hasEagerState?ae.eagerState:r(p,ae.action);else{var Ce={lane:Ae,action:ae.action,hasEagerState:ae.hasEagerState,eagerState:ae.eagerState,next:null};W===null?(z=W=Ce,A=p):W=W.next=Ce,Qt.lanes|=Ae,Os|=Ae}ae=ae.next}while(ae!==null&&ae!==S);W===null?A=p:W.next=z,Di(p,o.memoizedState)||(Yn=!0),o.memoizedState=p,o.baseState=A,o.baseQueue=W,c.lastRenderedState=p}if(r=c.interleaved,r!==null){x=r;do S=x.lane,Qt.lanes|=S,Os|=S,x=x.next;while(x!==r)}else x===null&&(c.lanes=0);return[o.memoizedState,c.dispatch]}function uh(r){var o=_i(),c=o.queue;if(c===null)throw Error(n(311));c.lastRenderedReducer=r;var p=c.dispatch,x=c.pending,S=o.memoizedState;if(x!==null){c.pending=null;var A=x=x.next;do S=r(S,A.action),A=A.next;while(A!==x);Di(S,o.memoizedState)||(Yn=!0),o.memoizedState=S,o.baseQueue===null&&(o.baseState=S),c.lastRenderedState=S}return[S,p]}function X0(){}function $0(r,o){var c=Qt,p=_i(),x=o(),S=!Di(p.memoizedState,x);if(S&&(p.memoizedState=x,Yn=!0),p=p.queue,ch(K0.bind(null,c,p,r),[r]),p.getSnapshot!==o||S||_n!==null&&_n.memoizedState.tag&1){if(c.flags|=2048,fl(9,Y0.bind(null,c,p,x,o),void 0,null),Sn===null)throw Error(n(349));Fs&30||q0(c,o,x)}return x}function q0(r,o,c){r.flags|=16384,r={getSnapshot:o,value:c},o=Qt.updateQueue,o===null?(o={lastEffect:null,stores:null},Qt.updateQueue=o,o.stores=[r]):(c=o.stores,c===null?o.stores=[r]:c.push(r))}function Y0(r,o,c,p){o.value=c,o.getSnapshot=p,Z0(o)&&Q0(r)}function K0(r,o,c){return c(function(){Z0(o)&&Q0(r)})}function Z0(r){var o=r.getSnapshot;r=r.value;try{var c=o();return!Di(r,c)}catch{return!0}}function Q0(r){var o=mr(r,1);o!==null&&Ui(o,r,1,-1)}function J0(r){var o=Yi();return typeof r=="function"&&(r=r()),o.memoizedState=o.baseState=r,r={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:cl,lastRenderedState:r},o.queue=r,r=r.dispatch=dA.bind(null,Qt,r),[o.memoizedState,r]}function fl(r,o,c,p){return r={tag:r,create:o,destroy:c,deps:p,next:null},o=Qt.updateQueue,o===null?(o={lastEffect:null,stores:null},Qt.updateQueue=o,o.lastEffect=r.next=r):(c=o.lastEffect,c===null?o.lastEffect=r.next=r:(p=c.next,c.next=r,r.next=p,o.lastEffect=r)),r}function ey(){return _i().memoizedState}function Ju(r,o,c,p){var x=Yi();Qt.flags|=r,x.memoizedState=fl(1|o,c,void 0,p===void 0?null:p)}function ec(r,o,c,p){var x=_i();p=p===void 0?null:p;var S=void 0;if(mn!==null){var A=mn.memoizedState;if(S=A.destroy,p!==null&&sh(p,A.deps)){x.memoizedState=fl(o,c,S,p);return}}Qt.flags|=r,x.memoizedState=fl(1|o,c,S,p)}function ty(r,o){return Ju(8390656,8,r,o)}function ch(r,o){return ec(2048,8,r,o)}function ny(r,o){return ec(4,2,r,o)}function iy(r,o){return ec(4,4,r,o)}function ry(r,o){if(typeof o=="function")return r=r(),o(r),function(){o(null)};if(o!=null)return r=r(),o.current=r,function(){o.current=null}}function sy(r,o,c){return c=c!=null?c.concat([r]):null,ec(4,4,ry.bind(null,o,r),c)}function fh(){}function oy(r,o){var c=_i();o=o===void 0?null:o;var p=c.memoizedState;return p!==null&&o!==null&&sh(o,p[1])?p[0]:(c.memoizedState=[r,o],r)}function ay(r,o){var c=_i();o=o===void 0?null:o;var p=c.memoizedState;return p!==null&&o!==null&&sh(o,p[1])?p[0]:(r=r(),c.memoizedState=[r,o],r)}function ly(r,o,c){return Fs&21?(Di(c,o)||(c=Hn(),Qt.lanes|=c,Os|=c,r.baseState=!0),o):(r.baseState&&(r.baseState=!1,Yn=!0),r.memoizedState=c)}function cA(r,o){var c=wt;wt=c!==0&&4>c?c:4,r(!0);var p=rh.transition;rh.transition={};try{r(!1),o()}finally{wt=c,rh.transition=p}}function uy(){return _i().memoizedState}function fA(r,o,c){var p=rs(r);if(c={lane:p,action:c,hasEagerState:!1,eagerState:null,next:null},cy(r))fy(o,c);else if(c=V0(r,o,c,p),c!==null){var x=Wn();Ui(c,r,p,x),dy(c,o,p)}}function dA(r,o,c){var p=rs(r),x={lane:p,action:c,hasEagerState:!1,eagerState:null,next:null};if(cy(r))fy(o,x);else{var S=r.alternate;if(r.lanes===0&&(S===null||S.lanes===0)&&(S=o.lastRenderedReducer,S!==null))try{var A=o.lastRenderedState,z=S(A,c);if(x.hasEagerState=!0,x.eagerState=z,Di(z,A)){var W=o.interleaved;W===null?(x.next=x,Qd(o)):(x.next=W.next,W.next=x),o.interleaved=x;return}}catch{}finally{}c=V0(r,o,x,p),c!==null&&(x=Wn(),Ui(c,r,p,x),dy(c,o,p))}}function cy(r){var o=r.alternate;return r===Qt||o!==null&&o===Qt}function fy(r,o){ll=Qu=!0;var c=r.pending;c===null?o.next=o:(o.next=c.next,c.next=o),r.pending=o}function dy(r,o,c){if(c&4194240){var p=o.lanes;p&=r.pendingLanes,c|=p,o.lanes=c,Ps(r,c)}}var tc={readContext:xi,useCallback:Ln,useContext:Ln,useEffect:Ln,useImperativeHandle:Ln,useInsertionEffect:Ln,useLayoutEffect:Ln,useMemo:Ln,useReducer:Ln,useRef:Ln,useState:Ln,useDebugValue:Ln,useDeferredValue:Ln,useTransition:Ln,useMutableSource:Ln,useSyncExternalStore:Ln,useId:Ln,unstable_isNewReconciler:!1},hA={readContext:xi,useCallback:function(r,o){return Yi().memoizedState=[r,o===void 0?null:o],r},useContext:xi,useEffect:ty,useImperativeHandle:function(r,o,c){return c=c!=null?c.concat([r]):null,Ju(4194308,4,ry.bind(null,o,r),c)},useLayoutEffect:function(r,o){return Ju(4194308,4,r,o)},useInsertionEffect:function(r,o){return Ju(4,2,r,o)},useMemo:function(r,o){var c=Yi();return o=o===void 0?null:o,r=r(),c.memoizedState=[r,o],r},useReducer:function(r,o,c){var p=Yi();return o=c!==void 0?c(o):o,p.memoizedState=p.baseState=o,r={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:r,lastRenderedState:o},p.queue=r,r=r.dispatch=fA.bind(null,Qt,r),[p.memoizedState,r]},useRef:function(r){var o=Yi();return r={current:r},o.memoizedState=r},useState:J0,useDebugValue:fh,useDeferredValue:function(r){return Yi().memoizedState=r},useTransition:function(){var r=J0(!1),o=r[0];return r=cA.bind(null,r[1]),Yi().memoizedState=r,[o,r]},useMutableSource:function(){},useSyncExternalStore:function(r,o,c){var p=Qt,x=Yi();if(Kt){if(c===void 0)throw Error(n(407));c=c()}else{if(c=o(),Sn===null)throw Error(n(349));Fs&30||q0(p,o,c)}x.memoizedState=c;var S={value:c,getSnapshot:o};return x.queue=S,ty(K0.bind(null,p,S,r),[r]),p.flags|=2048,fl(9,Y0.bind(null,p,S,c,o),void 0,null),c},useId:function(){var r=Yi(),o=Sn.identifierPrefix;if(Kt){var c=pr,p=hr;c=(p&~(1<<32-Dt(p)-1)).toString(32)+c,o=":"+o+"R"+c,c=ul++,0<c&&(o+="H"+c.toString(32)),o+=":"}else c=uA++,o=":"+o+"r"+c.toString(32)+":";return r.memoizedState=o},unstable_isNewReconciler:!1},pA={readContext:xi,useCallback:oy,useContext:xi,useEffect:ch,useImperativeHandle:sy,useInsertionEffect:ny,useLayoutEffect:iy,useMemo:ay,useReducer:lh,useRef:ey,useState:function(){return lh(cl)},useDebugValue:fh,useDeferredValue:function(r){var o=_i();return ly(o,mn.memoizedState,r)},useTransition:function(){var r=lh(cl)[0],o=_i().memoizedState;return[r,o]},useMutableSource:X0,useSyncExternalStore:$0,useId:uy,unstable_isNewReconciler:!1},mA={readContext:xi,useCallback:oy,useContext:xi,useEffect:ch,useImperativeHandle:sy,useInsertionEffect:ny,useLayoutEffect:iy,useMemo:ay,useReducer:uh,useRef:ey,useState:function(){return uh(cl)},useDebugValue:fh,useDeferredValue:function(r){var o=_i();return mn===null?o.memoizedState=r:ly(o,mn.memoizedState,r)},useTransition:function(){var r=uh(cl)[0],o=_i().memoizedState;return[r,o]},useMutableSource:X0,useSyncExternalStore:$0,useId:uy,unstable_isNewReconciler:!1};function Ii(r,o){if(r&&r.defaultProps){o=D({},o),r=r.defaultProps;for(var c in r)o[c]===void 0&&(o[c]=r[c]);return o}return o}function dh(r,o,c,p){o=r.memoizedState,c=c(p,o),c=c==null?o:D({},o,c),r.memoizedState=c,r.lanes===0&&(r.updateQueue.baseState=c)}var nc={isMounted:function(r){return(r=r._reactInternals)?Xi(r)===r:!1},enqueueSetState:function(r,o,c){r=r._reactInternals;var p=Wn(),x=rs(r),S=gr(p,x);S.payload=o,c!=null&&(S.callback=c),o=es(r,S,x),o!==null&&(Ui(o,r,x,p),qu(o,r,x))},enqueueReplaceState:function(r,o,c){r=r._reactInternals;var p=Wn(),x=rs(r),S=gr(p,x);S.tag=1,S.payload=o,c!=null&&(S.callback=c),o=es(r,S,x),o!==null&&(Ui(o,r,x,p),qu(o,r,x))},enqueueForceUpdate:function(r,o){r=r._reactInternals;var c=Wn(),p=rs(r),x=gr(c,p);x.tag=2,o!=null&&(x.callback=o),o=es(r,x,p),o!==null&&(Ui(o,r,p,c),qu(o,r,p))}};function hy(r,o,c,p,x,S,A){return r=r.stateNode,typeof r.shouldComponentUpdate=="function"?r.shouldComponentUpdate(p,S,A):o.prototype&&o.prototype.isPureReactComponent?!Za(c,p)||!Za(x,S):!0}function py(r,o,c){var p=!1,x=Zr,S=o.contextType;return typeof S=="object"&&S!==null?S=xi(S):(x=qn(o)?Ls:Dn.current,p=o.contextTypes,S=(p=p!=null)?Co(r,x):Zr),o=new o(c,S),r.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,o.updater=nc,r.stateNode=o,o._reactInternals=r,p&&(r=r.stateNode,r.__reactInternalMemoizedUnmaskedChildContext=x,r.__reactInternalMemoizedMaskedChildContext=S),o}function my(r,o,c,p){r=o.state,typeof o.componentWillReceiveProps=="function"&&o.componentWillReceiveProps(c,p),typeof o.UNSAFE_componentWillReceiveProps=="function"&&o.UNSAFE_componentWillReceiveProps(c,p),o.state!==r&&nc.enqueueReplaceState(o,o.state,null)}function hh(r,o,c,p){var x=r.stateNode;x.props=c,x.state=r.memoizedState,x.refs={},Jd(r);var S=o.contextType;typeof S=="object"&&S!==null?x.context=xi(S):(S=qn(o)?Ls:Dn.current,x.context=Co(r,S)),x.state=r.memoizedState,S=o.getDerivedStateFromProps,typeof S=="function"&&(dh(r,o,S,c),x.state=r.memoizedState),typeof o.getDerivedStateFromProps=="function"||typeof x.getSnapshotBeforeUpdate=="function"||typeof x.UNSAFE_componentWillMount!="function"&&typeof x.componentWillMount!="function"||(o=x.state,typeof x.componentWillMount=="function"&&x.componentWillMount(),typeof x.UNSAFE_componentWillMount=="function"&&x.UNSAFE_componentWillMount(),o!==x.state&&nc.enqueueReplaceState(x,x.state,null),Yu(r,c,x,p),x.state=r.memoizedState),typeof x.componentDidMount=="function"&&(r.flags|=4194308)}function No(r,o){try{var c="",p=o;do c+=ge(p),p=p.return;while(p);var x=c}catch(S){x=`
Error generating stack: `+S.message+`
`+S.stack}return{value:r,source:o,stack:x,digest:null}}function ph(r,o,c){return{value:r,source:null,stack:c??null,digest:o??null}}function mh(r,o){try{console.error(o.value)}catch(c){setTimeout(function(){throw c})}}var gA=typeof WeakMap=="function"?WeakMap:Map;function gy(r,o,c){c=gr(-1,c),c.tag=3,c.payload={element:null};var p=o.value;return c.callback=function(){uc||(uc=!0,Ph=p),mh(r,o)},c}function vy(r,o,c){c=gr(-1,c),c.tag=3;var p=r.type.getDerivedStateFromError;if(typeof p=="function"){var x=o.value;c.payload=function(){return p(x)},c.callback=function(){mh(r,o)}}var S=r.stateNode;return S!==null&&typeof S.componentDidCatch=="function"&&(c.callback=function(){mh(r,o),typeof p!="function"&&(ns===null?ns=new Set([this]):ns.add(this));var A=o.stack;this.componentDidCatch(o.value,{componentStack:A!==null?A:""})}),c}function yy(r,o,c){var p=r.pingCache;if(p===null){p=r.pingCache=new gA;var x=new Set;p.set(o,x)}else x=p.get(o),x===void 0&&(x=new Set,p.set(o,x));x.has(c)||(x.add(c),r=PA.bind(null,r,o,c),o.then(r,r))}function xy(r){do{var o;if((o=r.tag===13)&&(o=r.memoizedState,o=o!==null?o.dehydrated!==null:!0),o)return r;r=r.return}while(r!==null);return null}function _y(r,o,c,p,x){return r.mode&1?(r.flags|=65536,r.lanes=x,r):(r===o?r.flags|=65536:(r.flags|=128,c.flags|=131072,c.flags&=-52805,c.tag===1&&(c.alternate===null?c.tag=17:(o=gr(-1,1),o.tag=2,es(c,o,1))),c.lanes|=1),r)}var vA=C.ReactCurrentOwner,Yn=!1;function Gn(r,o,c,p){o.child=r===null?z0(o,null,c,p):Do(o,r.child,c,p)}function Sy(r,o,c,p,x){c=c.render;var S=o.ref;return Io(o,x),p=oh(r,o,c,p,S,x),c=ah(),r!==null&&!Yn?(o.updateQueue=r.updateQueue,o.flags&=-2053,r.lanes&=~x,vr(r,o,x)):(Kt&&c&&Gd(o),o.flags|=1,Gn(r,o,p,x),o.child)}function Ey(r,o,c,p,x){if(r===null){var S=c.type;return typeof S=="function"&&!Fh(S)&&S.defaultProps===void 0&&c.compare===null&&c.defaultProps===void 0?(o.tag=15,o.type=S,wy(r,o,S,p,x)):(r=mc(c.type,null,p,o,o.mode,x),r.ref=o.ref,r.return=o,o.child=r)}if(S=r.child,!(r.lanes&x)){var A=S.memoizedProps;if(c=c.compare,c=c!==null?c:Za,c(A,p)&&r.ref===o.ref)return vr(r,o,x)}return o.flags|=1,r=os(S,p),r.ref=o.ref,r.return=o,o.child=r}function wy(r,o,c,p,x){if(r!==null){var S=r.memoizedProps;if(Za(S,p)&&r.ref===o.ref)if(Yn=!1,o.pendingProps=p=S,(r.lanes&x)!==0)r.flags&131072&&(Yn=!0);else return o.lanes=r.lanes,vr(r,o,x)}return gh(r,o,c,p,x)}function My(r,o,c){var p=o.pendingProps,x=p.children,S=r!==null?r.memoizedState:null;if(p.mode==="hidden")if(!(o.mode&1))o.memoizedState={baseLanes:0,cachePool:null,transitions:null},Vt(Fo,li),li|=c;else{if(!(c&1073741824))return r=S!==null?S.baseLanes|c:c,o.lanes=o.childLanes=1073741824,o.memoizedState={baseLanes:r,cachePool:null,transitions:null},o.updateQueue=null,Vt(Fo,li),li|=r,null;o.memoizedState={baseLanes:0,cachePool:null,transitions:null},p=S!==null?S.baseLanes:c,Vt(Fo,li),li|=p}else S!==null?(p=S.baseLanes|c,o.memoizedState=null):p=c,Vt(Fo,li),li|=p;return Gn(r,o,x,c),o.child}function Ty(r,o){var c=o.ref;(r===null&&c!==null||r!==null&&r.ref!==c)&&(o.flags|=512,o.flags|=2097152)}function gh(r,o,c,p,x){var S=qn(c)?Ls:Dn.current;return S=Co(o,S),Io(o,x),c=oh(r,o,c,p,S,x),p=ah(),r!==null&&!Yn?(o.updateQueue=r.updateQueue,o.flags&=-2053,r.lanes&=~x,vr(r,o,x)):(Kt&&p&&Gd(o),o.flags|=1,Gn(r,o,c,x),o.child)}function Ay(r,o,c,p,x){if(qn(c)){var S=!0;zu(o)}else S=!1;if(Io(o,x),o.stateNode===null)rc(r,o),py(o,c,p),hh(o,c,p,x),p=!0;else if(r===null){var A=o.stateNode,z=o.memoizedProps;A.props=z;var W=A.context,ae=c.contextType;typeof ae=="object"&&ae!==null?ae=xi(ae):(ae=qn(c)?Ls:Dn.current,ae=Co(o,ae));var Ae=c.getDerivedStateFromProps,Ce=typeof Ae=="function"||typeof A.getSnapshotBeforeUpdate=="function";Ce||typeof A.UNSAFE_componentWillReceiveProps!="function"&&typeof A.componentWillReceiveProps!="function"||(z!==p||W!==ae)&&my(o,A,p,ae),Jr=!1;var Te=o.memoizedState;A.state=Te,Yu(o,p,A,x),W=o.memoizedState,z!==p||Te!==W||$n.current||Jr?(typeof Ae=="function"&&(dh(o,c,Ae,p),W=o.memoizedState),(z=Jr||hy(o,c,z,p,Te,W,ae))?(Ce||typeof A.UNSAFE_componentWillMount!="function"&&typeof A.componentWillMount!="function"||(typeof A.componentWillMount=="function"&&A.componentWillMount(),typeof A.UNSAFE_componentWillMount=="function"&&A.UNSAFE_componentWillMount()),typeof A.componentDidMount=="function"&&(o.flags|=4194308)):(typeof A.componentDidMount=="function"&&(o.flags|=4194308),o.memoizedProps=p,o.memoizedState=W),A.props=p,A.state=W,A.context=ae,p=z):(typeof A.componentDidMount=="function"&&(o.flags|=4194308),p=!1)}else{A=o.stateNode,H0(r,o),z=o.memoizedProps,ae=o.type===o.elementType?z:Ii(o.type,z),A.props=ae,Ce=o.pendingProps,Te=A.context,W=c.contextType,typeof W=="object"&&W!==null?W=xi(W):(W=qn(c)?Ls:Dn.current,W=Co(o,W));var ze=c.getDerivedStateFromProps;(Ae=typeof ze=="function"||typeof A.getSnapshotBeforeUpdate=="function")||typeof A.UNSAFE_componentWillReceiveProps!="function"&&typeof A.componentWillReceiveProps!="function"||(z!==Ce||Te!==W)&&my(o,A,p,W),Jr=!1,Te=o.memoizedState,A.state=Te,Yu(o,p,A,x);var Xe=o.memoizedState;z!==Ce||Te!==Xe||$n.current||Jr?(typeof ze=="function"&&(dh(o,c,ze,p),Xe=o.memoizedState),(ae=Jr||hy(o,c,ae,p,Te,Xe,W)||!1)?(Ae||typeof A.UNSAFE_componentWillUpdate!="function"&&typeof A.componentWillUpdate!="function"||(typeof A.componentWillUpdate=="function"&&A.componentWillUpdate(p,Xe,W),typeof A.UNSAFE_componentWillUpdate=="function"&&A.UNSAFE_componentWillUpdate(p,Xe,W)),typeof A.componentDidUpdate=="function"&&(o.flags|=4),typeof A.getSnapshotBeforeUpdate=="function"&&(o.flags|=1024)):(typeof A.componentDidUpdate!="function"||z===r.memoizedProps&&Te===r.memoizedState||(o.flags|=4),typeof A.getSnapshotBeforeUpdate!="function"||z===r.memoizedProps&&Te===r.memoizedState||(o.flags|=1024),o.memoizedProps=p,o.memoizedState=Xe),A.props=p,A.state=Xe,A.context=W,p=ae):(typeof A.componentDidUpdate!="function"||z===r.memoizedProps&&Te===r.memoizedState||(o.flags|=4),typeof A.getSnapshotBeforeUpdate!="function"||z===r.memoizedProps&&Te===r.memoizedState||(o.flags|=1024),p=!1)}return vh(r,o,c,p,S,x)}function vh(r,o,c,p,x,S){Ty(r,o);var A=(o.flags&128)!==0;if(!p&&!A)return x&&D0(o,c,!1),vr(r,o,S);p=o.stateNode,vA.current=o;var z=A&&typeof c.getDerivedStateFromError!="function"?null:p.render();return o.flags|=1,r!==null&&A?(o.child=Do(o,r.child,null,S),o.child=Do(o,null,z,S)):Gn(r,o,z,S),o.memoizedState=p.state,x&&D0(o,c,!0),o.child}function Cy(r){var o=r.stateNode;o.pendingContext?R0(r,o.pendingContext,o.pendingContext!==o.context):o.context&&R0(r,o.context,!1),eh(r,o.containerInfo)}function by(r,o,c,p,x){return Po(),$d(x),o.flags|=256,Gn(r,o,c,p),o.child}var yh={dehydrated:null,treeContext:null,retryLane:0};function xh(r){return{baseLanes:r,cachePool:null,transitions:null}}function Ry(r,o,c){var p=o.pendingProps,x=Zt.current,S=!1,A=(o.flags&128)!==0,z;if((z=A)||(z=r!==null&&r.memoizedState===null?!1:(x&2)!==0),z?(S=!0,o.flags&=-129):(r===null||r.memoizedState!==null)&&(x|=1),Vt(Zt,x&1),r===null)return Xd(o),r=o.memoizedState,r!==null&&(r=r.dehydrated,r!==null)?(o.mode&1?r.data==="$!"?o.lanes=8:o.lanes=1073741824:o.lanes=1,null):(A=p.children,r=p.fallback,S?(p=o.mode,S=o.child,A={mode:"hidden",children:A},!(p&1)&&S!==null?(S.childLanes=0,S.pendingProps=A):S=gc(A,p,0,null),r=Hs(r,p,c,null),S.return=o,r.return=o,S.sibling=r,o.child=S,o.child.memoizedState=xh(c),o.memoizedState=yh,r):_h(o,A));if(x=r.memoizedState,x!==null&&(z=x.dehydrated,z!==null))return yA(r,o,A,p,z,x,c);if(S){S=p.fallback,A=o.mode,x=r.child,z=x.sibling;var W={mode:"hidden",children:p.children};return!(A&1)&&o.child!==x?(p=o.child,p.childLanes=0,p.pendingProps=W,o.deletions=null):(p=os(x,W),p.subtreeFlags=x.subtreeFlags&14680064),z!==null?S=os(z,S):(S=Hs(S,A,c,null),S.flags|=2),S.return=o,p.return=o,p.sibling=S,o.child=p,p=S,S=o.child,A=r.child.memoizedState,A=A===null?xh(c):{baseLanes:A.baseLanes|c,cachePool:null,transitions:A.transitions},S.memoizedState=A,S.childLanes=r.childLanes&~c,o.memoizedState=yh,p}return S=r.child,r=S.sibling,p=os(S,{mode:"visible",children:p.children}),!(o.mode&1)&&(p.lanes=c),p.return=o,p.sibling=null,r!==null&&(c=o.deletions,c===null?(o.deletions=[r],o.flags|=16):c.push(r)),o.child=p,o.memoizedState=null,p}function _h(r,o){return o=gc({mode:"visible",children:o},r.mode,0,null),o.return=r,r.child=o}function ic(r,o,c,p){return p!==null&&$d(p),Do(o,r.child,null,c),r=_h(o,o.pendingProps.children),r.flags|=2,o.memoizedState=null,r}function yA(r,o,c,p,x,S,A){if(c)return o.flags&256?(o.flags&=-257,p=ph(Error(n(422))),ic(r,o,A,p)):o.memoizedState!==null?(o.child=r.child,o.flags|=128,null):(S=p.fallback,x=o.mode,p=gc({mode:"visible",children:p.children},x,0,null),S=Hs(S,x,A,null),S.flags|=2,p.return=o,S.return=o,p.sibling=S,o.child=p,o.mode&1&&Do(o,r.child,null,A),o.child.memoizedState=xh(A),o.memoizedState=yh,S);if(!(o.mode&1))return ic(r,o,A,null);if(x.data==="$!"){if(p=x.nextSibling&&x.nextSibling.dataset,p)var z=p.dgst;return p=z,S=Error(n(419)),p=ph(S,p,void 0),ic(r,o,A,p)}if(z=(A&r.childLanes)!==0,Yn||z){if(p=Sn,p!==null){switch(A&-A){case 4:x=2;break;case 16:x=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:x=32;break;case 536870912:x=268435456;break;default:x=0}x=x&(p.suspendedLanes|A)?0:x,x!==0&&x!==S.retryLane&&(S.retryLane=x,mr(r,x),Ui(p,r,x,-1))}return Uh(),p=ph(Error(n(421))),ic(r,o,A,p)}return x.data==="$?"?(o.flags|=128,o.child=r.child,o=DA.bind(null,r),x._reactRetry=o,null):(r=S.treeContext,ai=Yr(x.nextSibling),oi=o,Kt=!0,Li=null,r!==null&&(vi[yi++]=hr,vi[yi++]=pr,vi[yi++]=Is,hr=r.id,pr=r.overflow,Is=o),o=_h(o,p.children),o.flags|=4096,o)}function Py(r,o,c){r.lanes|=o;var p=r.alternate;p!==null&&(p.lanes|=o),Zd(r.return,o,c)}function Sh(r,o,c,p,x){var S=r.memoizedState;S===null?r.memoizedState={isBackwards:o,rendering:null,renderingStartTime:0,last:p,tail:c,tailMode:x}:(S.isBackwards=o,S.rendering=null,S.renderingStartTime=0,S.last=p,S.tail=c,S.tailMode=x)}function Dy(r,o,c){var p=o.pendingProps,x=p.revealOrder,S=p.tail;if(Gn(r,o,p.children,c),p=Zt.current,p&2)p=p&1|2,o.flags|=128;else{if(r!==null&&r.flags&128)e:for(r=o.child;r!==null;){if(r.tag===13)r.memoizedState!==null&&Py(r,c,o);else if(r.tag===19)Py(r,c,o);else if(r.child!==null){r.child.return=r,r=r.child;continue}if(r===o)break e;for(;r.sibling===null;){if(r.return===null||r.return===o)break e;r=r.return}r.sibling.return=r.return,r=r.sibling}p&=1}if(Vt(Zt,p),!(o.mode&1))o.memoizedState=null;else switch(x){case"forwards":for(c=o.child,x=null;c!==null;)r=c.alternate,r!==null&&Ku(r)===null&&(x=c),c=c.sibling;c=x,c===null?(x=o.child,o.child=null):(x=c.sibling,c.sibling=null),Sh(o,!1,x,c,S);break;case"backwards":for(c=null,x=o.child,o.child=null;x!==null;){if(r=x.alternate,r!==null&&Ku(r)===null){o.child=x;break}r=x.sibling,x.sibling=c,c=x,x=r}Sh(o,!0,c,null,S);break;case"together":Sh(o,!1,null,null,void 0);break;default:o.memoizedState=null}return o.child}function rc(r,o){!(o.mode&1)&&r!==null&&(r.alternate=null,o.alternate=null,o.flags|=2)}function vr(r,o,c){if(r!==null&&(o.dependencies=r.dependencies),Os|=o.lanes,!(c&o.childLanes))return null;if(r!==null&&o.child!==r.child)throw Error(n(153));if(o.child!==null){for(r=o.child,c=os(r,r.pendingProps),o.child=c,c.return=o;r.sibling!==null;)r=r.sibling,c=c.sibling=os(r,r.pendingProps),c.return=o;c.sibling=null}return o.child}function xA(r,o,c){switch(o.tag){case 3:Cy(o),Po();break;case 5:j0(o);break;case 1:qn(o.type)&&zu(o);break;case 4:eh(o,o.stateNode.containerInfo);break;case 10:var p=o.type._context,x=o.memoizedProps.value;Vt(Xu,p._currentValue),p._currentValue=x;break;case 13:if(p=o.memoizedState,p!==null)return p.dehydrated!==null?(Vt(Zt,Zt.current&1),o.flags|=128,null):c&o.child.childLanes?Ry(r,o,c):(Vt(Zt,Zt.current&1),r=vr(r,o,c),r!==null?r.sibling:null);Vt(Zt,Zt.current&1);break;case 19:if(p=(c&o.childLanes)!==0,r.flags&128){if(p)return Dy(r,o,c);o.flags|=128}if(x=o.memoizedState,x!==null&&(x.rendering=null,x.tail=null,x.lastEffect=null),Vt(Zt,Zt.current),p)break;return null;case 22:case 23:return o.lanes=0,My(r,o,c)}return vr(r,o,c)}var Ly,Eh,Iy,ky;Ly=function(r,o){for(var c=o.child;c!==null;){if(c.tag===5||c.tag===6)r.appendChild(c.stateNode);else if(c.tag!==4&&c.child!==null){c.child.return=c,c=c.child;continue}if(c===o)break;for(;c.sibling===null;){if(c.return===null||c.return===o)return;c=c.return}c.sibling.return=c.return,c=c.sibling}},Eh=function(){},Iy=function(r,o,c,p){var x=r.memoizedProps;if(x!==p){r=o.stateNode,Us(qi.current);var S=null;switch(c){case"input":x=j(r,x),p=j(r,p),S=[];break;case"select":x=D({},x,{value:void 0}),p=D({},p,{value:void 0}),S=[];break;case"textarea":x=P(r,x),p=P(r,p),S=[];break;default:typeof x.onClick!="function"&&typeof p.onClick=="function"&&(r.onclick=Fu)}nt(c,p);var A;c=null;for(ae in x)if(!p.hasOwnProperty(ae)&&x.hasOwnProperty(ae)&&x[ae]!=null)if(ae==="style"){var z=x[ae];for(A in z)z.hasOwnProperty(A)&&(c||(c={}),c[A]="")}else ae!=="dangerouslySetInnerHTML"&&ae!=="children"&&ae!=="suppressContentEditableWarning"&&ae!=="suppressHydrationWarning"&&ae!=="autoFocus"&&(s.hasOwnProperty(ae)?S||(S=[]):(S=S||[]).push(ae,null));for(ae in p){var W=p[ae];if(z=x!=null?x[ae]:void 0,p.hasOwnProperty(ae)&&W!==z&&(W!=null||z!=null))if(ae==="style")if(z){for(A in z)!z.hasOwnProperty(A)||W&&W.hasOwnProperty(A)||(c||(c={}),c[A]="");for(A in W)W.hasOwnProperty(A)&&z[A]!==W[A]&&(c||(c={}),c[A]=W[A])}else c||(S||(S=[]),S.push(ae,c)),c=W;else ae==="dangerouslySetInnerHTML"?(W=W?W.__html:void 0,z=z?z.__html:void 0,W!=null&&z!==W&&(S=S||[]).push(ae,W)):ae==="children"?typeof W!="string"&&typeof W!="number"||(S=S||[]).push(ae,""+W):ae!=="suppressContentEditableWarning"&&ae!=="suppressHydrationWarning"&&(s.hasOwnProperty(ae)?(W!=null&&ae==="onScroll"&&jt("scroll",r),S||z===W||(S=[])):(S=S||[]).push(ae,W))}c&&(S=S||[]).push("style",c);var ae=S;(o.updateQueue=ae)&&(o.flags|=4)}},ky=function(r,o,c,p){c!==p&&(o.flags|=4)};function dl(r,o){if(!Kt)switch(r.tailMode){case"hidden":o=r.tail;for(var c=null;o!==null;)o.alternate!==null&&(c=o),o=o.sibling;c===null?r.tail=null:c.sibling=null;break;case"collapsed":c=r.tail;for(var p=null;c!==null;)c.alternate!==null&&(p=c),c=c.sibling;p===null?o||r.tail===null?r.tail=null:r.tail.sibling=null:p.sibling=null}}function In(r){var o=r.alternate!==null&&r.alternate.child===r.child,c=0,p=0;if(o)for(var x=r.child;x!==null;)c|=x.lanes|x.childLanes,p|=x.subtreeFlags&14680064,p|=x.flags&14680064,x.return=r,x=x.sibling;else for(x=r.child;x!==null;)c|=x.lanes|x.childLanes,p|=x.subtreeFlags,p|=x.flags,x.return=r,x=x.sibling;return r.subtreeFlags|=p,r.childLanes=c,o}function _A(r,o,c){var p=o.pendingProps;switch(Wd(o),o.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return In(o),null;case 1:return qn(o.type)&&Bu(),In(o),null;case 3:return p=o.stateNode,ko(),Xt($n),Xt(Dn),ih(),p.pendingContext&&(p.context=p.pendingContext,p.pendingContext=null),(r===null||r.child===null)&&(Wu(o)?o.flags|=4:r===null||r.memoizedState.isDehydrated&&!(o.flags&256)||(o.flags|=1024,Li!==null&&(Ih(Li),Li=null))),Eh(r,o),In(o),null;case 5:th(o);var x=Us(al.current);if(c=o.type,r!==null&&o.stateNode!=null)Iy(r,o,c,p,x),r.ref!==o.ref&&(o.flags|=512,o.flags|=2097152);else{if(!p){if(o.stateNode===null)throw Error(n(166));return In(o),null}if(r=Us(qi.current),Wu(o)){p=o.stateNode,c=o.type;var S=o.memoizedProps;switch(p[$i]=o,p[nl]=S,r=(o.mode&1)!==0,c){case"dialog":jt("cancel",p),jt("close",p);break;case"iframe":case"object":case"embed":jt("load",p);break;case"video":case"audio":for(x=0;x<Ja.length;x++)jt(Ja[x],p);break;case"source":jt("error",p);break;case"img":case"image":case"link":jt("error",p),jt("load",p);break;case"details":jt("toggle",p);break;case"input":xn(p,S),jt("invalid",p);break;case"select":p._wrapperState={wasMultiple:!!S.multiple},jt("invalid",p);break;case"textarea":oe(p,S),jt("invalid",p)}nt(c,S),x=null;for(var A in S)if(S.hasOwnProperty(A)){var z=S[A];A==="children"?typeof z=="string"?p.textContent!==z&&(S.suppressHydrationWarning!==!0&&Uu(p.textContent,z,r),x=["children",z]):typeof z=="number"&&p.textContent!==""+z&&(S.suppressHydrationWarning!==!0&&Uu(p.textContent,z,r),x=["children",""+z]):s.hasOwnProperty(A)&&z!=null&&A==="onScroll"&&jt("scroll",p)}switch(c){case"input":St(p),Qe(p,S,!0);break;case"textarea":St(p),we(p);break;case"select":case"option":break;default:typeof S.onClick=="function"&&(p.onclick=Fu)}p=x,o.updateQueue=p,p!==null&&(o.flags|=4)}else{A=x.nodeType===9?x:x.ownerDocument,r==="http://www.w3.org/1999/xhtml"&&(r=H(c)),r==="http://www.w3.org/1999/xhtml"?c==="script"?(r=A.createElement("div"),r.innerHTML="<script><\/script>",r=r.removeChild(r.firstChild)):typeof p.is=="string"?r=A.createElement(c,{is:p.is}):(r=A.createElement(c),c==="select"&&(A=r,p.multiple?A.multiple=!0:p.size&&(A.size=p.size))):r=A.createElementNS(r,c),r[$i]=o,r[nl]=p,Ly(r,o,!1,!1),o.stateNode=r;e:{switch(A=st(c,p),c){case"dialog":jt("cancel",r),jt("close",r),x=p;break;case"iframe":case"object":case"embed":jt("load",r),x=p;break;case"video":case"audio":for(x=0;x<Ja.length;x++)jt(Ja[x],r);x=p;break;case"source":jt("error",r),x=p;break;case"img":case"image":case"link":jt("error",r),jt("load",r),x=p;break;case"details":jt("toggle",r),x=p;break;case"input":xn(r,p),x=j(r,p),jt("invalid",r);break;case"option":x=p;break;case"select":r._wrapperState={wasMultiple:!!p.multiple},x=D({},p,{value:void 0}),jt("invalid",r);break;case"textarea":oe(r,p),x=P(r,p),jt("invalid",r);break;default:x=p}nt(c,x),z=x;for(S in z)if(z.hasOwnProperty(S)){var W=z[S];S==="style"?et(r,W):S==="dangerouslySetInnerHTML"?(W=W?W.__html:void 0,W!=null&&Me(r,W)):S==="children"?typeof W=="string"?(c!=="textarea"||W!=="")&&Ge(r,W):typeof W=="number"&&Ge(r,""+W):S!=="suppressContentEditableWarning"&&S!=="suppressHydrationWarning"&&S!=="autoFocus"&&(s.hasOwnProperty(S)?W!=null&&S==="onScroll"&&jt("scroll",r):W!=null&&T(r,S,W,A))}switch(c){case"input":St(r),Qe(r,p,!1);break;case"textarea":St(r),we(r);break;case"option":p.value!=null&&r.setAttribute("value",""+Re(p.value));break;case"select":r.multiple=!!p.multiple,S=p.value,S!=null?F(r,!!p.multiple,S,!1):p.defaultValue!=null&&F(r,!!p.multiple,p.defaultValue,!0);break;default:typeof x.onClick=="function"&&(r.onclick=Fu)}switch(c){case"button":case"input":case"select":case"textarea":p=!!p.autoFocus;break e;case"img":p=!0;break e;default:p=!1}}p&&(o.flags|=4)}o.ref!==null&&(o.flags|=512,o.flags|=2097152)}return In(o),null;case 6:if(r&&o.stateNode!=null)ky(r,o,r.memoizedProps,p);else{if(typeof p!="string"&&o.stateNode===null)throw Error(n(166));if(c=Us(al.current),Us(qi.current),Wu(o)){if(p=o.stateNode,c=o.memoizedProps,p[$i]=o,(S=p.nodeValue!==c)&&(r=oi,r!==null))switch(r.tag){case 3:Uu(p.nodeValue,c,(r.mode&1)!==0);break;case 5:r.memoizedProps.suppressHydrationWarning!==!0&&Uu(p.nodeValue,c,(r.mode&1)!==0)}S&&(o.flags|=4)}else p=(c.nodeType===9?c:c.ownerDocument).createTextNode(p),p[$i]=o,o.stateNode=p}return In(o),null;case 13:if(Xt(Zt),p=o.memoizedState,r===null||r.memoizedState!==null&&r.memoizedState.dehydrated!==null){if(Kt&&ai!==null&&o.mode&1&&!(o.flags&128))F0(),Po(),o.flags|=98560,S=!1;else if(S=Wu(o),p!==null&&p.dehydrated!==null){if(r===null){if(!S)throw Error(n(318));if(S=o.memoizedState,S=S!==null?S.dehydrated:null,!S)throw Error(n(317));S[$i]=o}else Po(),!(o.flags&128)&&(o.memoizedState=null),o.flags|=4;In(o),S=!1}else Li!==null&&(Ih(Li),Li=null),S=!0;if(!S)return o.flags&65536?o:null}return o.flags&128?(o.lanes=c,o):(p=p!==null,p!==(r!==null&&r.memoizedState!==null)&&p&&(o.child.flags|=8192,o.mode&1&&(r===null||Zt.current&1?gn===0&&(gn=3):Uh())),o.updateQueue!==null&&(o.flags|=4),In(o),null);case 4:return ko(),Eh(r,o),r===null&&el(o.stateNode.containerInfo),In(o),null;case 10:return Kd(o.type._context),In(o),null;case 17:return qn(o.type)&&Bu(),In(o),null;case 19:if(Xt(Zt),S=o.memoizedState,S===null)return In(o),null;if(p=(o.flags&128)!==0,A=S.rendering,A===null)if(p)dl(S,!1);else{if(gn!==0||r!==null&&r.flags&128)for(r=o.child;r!==null;){if(A=Ku(r),A!==null){for(o.flags|=128,dl(S,!1),p=A.updateQueue,p!==null&&(o.updateQueue=p,o.flags|=4),o.subtreeFlags=0,p=c,c=o.child;c!==null;)S=c,r=p,S.flags&=14680066,A=S.alternate,A===null?(S.childLanes=0,S.lanes=r,S.child=null,S.subtreeFlags=0,S.memoizedProps=null,S.memoizedState=null,S.updateQueue=null,S.dependencies=null,S.stateNode=null):(S.childLanes=A.childLanes,S.lanes=A.lanes,S.child=A.child,S.subtreeFlags=0,S.deletions=null,S.memoizedProps=A.memoizedProps,S.memoizedState=A.memoizedState,S.updateQueue=A.updateQueue,S.type=A.type,r=A.dependencies,S.dependencies=r===null?null:{lanes:r.lanes,firstContext:r.firstContext}),c=c.sibling;return Vt(Zt,Zt.current&1|2),o.child}r=r.sibling}S.tail!==null&&q()>Oo&&(o.flags|=128,p=!0,dl(S,!1),o.lanes=4194304)}else{if(!p)if(r=Ku(A),r!==null){if(o.flags|=128,p=!0,c=r.updateQueue,c!==null&&(o.updateQueue=c,o.flags|=4),dl(S,!0),S.tail===null&&S.tailMode==="hidden"&&!A.alternate&&!Kt)return In(o),null}else 2*q()-S.renderingStartTime>Oo&&c!==1073741824&&(o.flags|=128,p=!0,dl(S,!1),o.lanes=4194304);S.isBackwards?(A.sibling=o.child,o.child=A):(c=S.last,c!==null?c.sibling=A:o.child=A,S.last=A)}return S.tail!==null?(o=S.tail,S.rendering=o,S.tail=o.sibling,S.renderingStartTime=q(),o.sibling=null,c=Zt.current,Vt(Zt,p?c&1|2:c&1),o):(In(o),null);case 22:case 23:return Nh(),p=o.memoizedState!==null,r!==null&&r.memoizedState!==null!==p&&(o.flags|=8192),p&&o.mode&1?li&1073741824&&(In(o),o.subtreeFlags&6&&(o.flags|=8192)):In(o),null;case 24:return null;case 25:return null}throw Error(n(156,o.tag))}function SA(r,o){switch(Wd(o),o.tag){case 1:return qn(o.type)&&Bu(),r=o.flags,r&65536?(o.flags=r&-65537|128,o):null;case 3:return ko(),Xt($n),Xt(Dn),ih(),r=o.flags,r&65536&&!(r&128)?(o.flags=r&-65537|128,o):null;case 5:return th(o),null;case 13:if(Xt(Zt),r=o.memoizedState,r!==null&&r.dehydrated!==null){if(o.alternate===null)throw Error(n(340));Po()}return r=o.flags,r&65536?(o.flags=r&-65537|128,o):null;case 19:return Xt(Zt),null;case 4:return ko(),null;case 10:return Kd(o.type._context),null;case 22:case 23:return Nh(),null;case 24:return null;default:return null}}var sc=!1,kn=!1,EA=typeof WeakSet=="function"?WeakSet:Set,je=null;function Uo(r,o){var c=r.ref;if(c!==null)if(typeof c=="function")try{c(null)}catch(p){nn(r,o,p)}else c.current=null}function wh(r,o,c){try{c()}catch(p){nn(r,o,p)}}var Ny=!1;function wA(r,o){if(Nd=Tu,r=h0(),Cd(r)){if("selectionStart"in r)var c={start:r.selectionStart,end:r.selectionEnd};else e:{c=(c=r.ownerDocument)&&c.defaultView||window;var p=c.getSelection&&c.getSelection();if(p&&p.rangeCount!==0){c=p.anchorNode;var x=p.anchorOffset,S=p.focusNode;p=p.focusOffset;try{c.nodeType,S.nodeType}catch{c=null;break e}var A=0,z=-1,W=-1,ae=0,Ae=0,Ce=r,Te=null;t:for(;;){for(var ze;Ce!==c||x!==0&&Ce.nodeType!==3||(z=A+x),Ce!==S||p!==0&&Ce.nodeType!==3||(W=A+p),Ce.nodeType===3&&(A+=Ce.nodeValue.length),(ze=Ce.firstChild)!==null;)Te=Ce,Ce=ze;for(;;){if(Ce===r)break t;if(Te===c&&++ae===x&&(z=A),Te===S&&++Ae===p&&(W=A),(ze=Ce.nextSibling)!==null)break;Ce=Te,Te=Ce.parentNode}Ce=ze}c=z===-1||W===-1?null:{start:z,end:W}}else c=null}c=c||{start:0,end:0}}else c=null;for(Ud={focusedElem:r,selectionRange:c},Tu=!1,je=o;je!==null;)if(o=je,r=o.child,(o.subtreeFlags&1028)!==0&&r!==null)r.return=o,je=r;else for(;je!==null;){o=je;try{var Xe=o.alternate;if(o.flags&1024)switch(o.tag){case 0:case 11:case 15:break;case 1:if(Xe!==null){var Ke=Xe.memoizedProps,on=Xe.memoizedState,te=o.stateNode,Y=te.getSnapshotBeforeUpdate(o.elementType===o.type?Ke:Ii(o.type,Ke),on);te.__reactInternalSnapshotBeforeUpdate=Y}break;case 3:var se=o.stateNode.containerInfo;se.nodeType===1?se.textContent="":se.nodeType===9&&se.documentElement&&se.removeChild(se.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(n(163))}}catch(De){nn(o,o.return,De)}if(r=o.sibling,r!==null){r.return=o.return,je=r;break}je=o.return}return Xe=Ny,Ny=!1,Xe}function hl(r,o,c){var p=o.updateQueue;if(p=p!==null?p.lastEffect:null,p!==null){var x=p=p.next;do{if((x.tag&r)===r){var S=x.destroy;x.destroy=void 0,S!==void 0&&wh(o,c,S)}x=x.next}while(x!==p)}}function oc(r,o){if(o=o.updateQueue,o=o!==null?o.lastEffect:null,o!==null){var c=o=o.next;do{if((c.tag&r)===r){var p=c.create;c.destroy=p()}c=c.next}while(c!==o)}}function Mh(r){var o=r.ref;if(o!==null){var c=r.stateNode;switch(r.tag){case 5:r=c;break;default:r=c}typeof o=="function"?o(r):o.current=r}}function Uy(r){var o=r.alternate;o!==null&&(r.alternate=null,Uy(o)),r.child=null,r.deletions=null,r.sibling=null,r.tag===5&&(o=r.stateNode,o!==null&&(delete o[$i],delete o[nl],delete o[zd],delete o[sA],delete o[oA])),r.stateNode=null,r.return=null,r.dependencies=null,r.memoizedProps=null,r.memoizedState=null,r.pendingProps=null,r.stateNode=null,r.updateQueue=null}function Fy(r){return r.tag===5||r.tag===3||r.tag===4}function Oy(r){e:for(;;){for(;r.sibling===null;){if(r.return===null||Fy(r.return))return null;r=r.return}for(r.sibling.return=r.return,r=r.sibling;r.tag!==5&&r.tag!==6&&r.tag!==18;){if(r.flags&2||r.child===null||r.tag===4)continue e;r.child.return=r,r=r.child}if(!(r.flags&2))return r.stateNode}}function Th(r,o,c){var p=r.tag;if(p===5||p===6)r=r.stateNode,o?c.nodeType===8?c.parentNode.insertBefore(r,o):c.insertBefore(r,o):(c.nodeType===8?(o=c.parentNode,o.insertBefore(r,c)):(o=c,o.appendChild(r)),c=c._reactRootContainer,c!=null||o.onclick!==null||(o.onclick=Fu));else if(p!==4&&(r=r.child,r!==null))for(Th(r,o,c),r=r.sibling;r!==null;)Th(r,o,c),r=r.sibling}function Ah(r,o,c){var p=r.tag;if(p===5||p===6)r=r.stateNode,o?c.insertBefore(r,o):c.appendChild(r);else if(p!==4&&(r=r.child,r!==null))for(Ah(r,o,c),r=r.sibling;r!==null;)Ah(r,o,c),r=r.sibling}var An=null,ki=!1;function ts(r,o,c){for(c=c.child;c!==null;)By(r,o,c),c=c.sibling}function By(r,o,c){if(ht&&typeof ht.onCommitFiberUnmount=="function")try{ht.onCommitFiberUnmount(Je,c)}catch{}switch(c.tag){case 5:kn||Uo(c,o);case 6:var p=An,x=ki;An=null,ts(r,o,c),An=p,ki=x,An!==null&&(ki?(r=An,c=c.stateNode,r.nodeType===8?r.parentNode.removeChild(c):r.removeChild(c)):An.removeChild(c.stateNode));break;case 18:An!==null&&(ki?(r=An,c=c.stateNode,r.nodeType===8?Bd(r.parentNode,c):r.nodeType===1&&Bd(r,c),ja(r)):Bd(An,c.stateNode));break;case 4:p=An,x=ki,An=c.stateNode.containerInfo,ki=!0,ts(r,o,c),An=p,ki=x;break;case 0:case 11:case 14:case 15:if(!kn&&(p=c.updateQueue,p!==null&&(p=p.lastEffect,p!==null))){x=p=p.next;do{var S=x,A=S.destroy;S=S.tag,A!==void 0&&(S&2||S&4)&&wh(c,o,A),x=x.next}while(x!==p)}ts(r,o,c);break;case 1:if(!kn&&(Uo(c,o),p=c.stateNode,typeof p.componentWillUnmount=="function"))try{p.props=c.memoizedProps,p.state=c.memoizedState,p.componentWillUnmount()}catch(z){nn(c,o,z)}ts(r,o,c);break;case 21:ts(r,o,c);break;case 22:c.mode&1?(kn=(p=kn)||c.memoizedState!==null,ts(r,o,c),kn=p):ts(r,o,c);break;default:ts(r,o,c)}}function zy(r){var o=r.updateQueue;if(o!==null){r.updateQueue=null;var c=r.stateNode;c===null&&(c=r.stateNode=new EA),o.forEach(function(p){var x=LA.bind(null,r,p);c.has(p)||(c.add(p),p.then(x,x))})}}function Ni(r,o){var c=o.deletions;if(c!==null)for(var p=0;p<c.length;p++){var x=c[p];try{var S=r,A=o,z=A;e:for(;z!==null;){switch(z.tag){case 5:An=z.stateNode,ki=!1;break e;case 3:An=z.stateNode.containerInfo,ki=!0;break e;case 4:An=z.stateNode.containerInfo,ki=!0;break e}z=z.return}if(An===null)throw Error(n(160));By(S,A,x),An=null,ki=!1;var W=x.alternate;W!==null&&(W.return=null),x.return=null}catch(ae){nn(x,o,ae)}}if(o.subtreeFlags&12854)for(o=o.child;o!==null;)Vy(o,r),o=o.sibling}function Vy(r,o){var c=r.alternate,p=r.flags;switch(r.tag){case 0:case 11:case 14:case 15:if(Ni(o,r),Ki(r),p&4){try{hl(3,r,r.return),oc(3,r)}catch(Ke){nn(r,r.return,Ke)}try{hl(5,r,r.return)}catch(Ke){nn(r,r.return,Ke)}}break;case 1:Ni(o,r),Ki(r),p&512&&c!==null&&Uo(c,c.return);break;case 5:if(Ni(o,r),Ki(r),p&512&&c!==null&&Uo(c,c.return),r.flags&32){var x=r.stateNode;try{Ge(x,"")}catch(Ke){nn(r,r.return,Ke)}}if(p&4&&(x=r.stateNode,x!=null)){var S=r.memoizedProps,A=c!==null?c.memoizedProps:S,z=r.type,W=r.updateQueue;if(r.updateQueue=null,W!==null)try{z==="input"&&S.type==="radio"&&S.name!=null&&vt(x,S),st(z,A);var ae=st(z,S);for(A=0;A<W.length;A+=2){var Ae=W[A],Ce=W[A+1];Ae==="style"?et(x,Ce):Ae==="dangerouslySetInnerHTML"?Me(x,Ce):Ae==="children"?Ge(x,Ce):T(x,Ae,Ce,ae)}switch(z){case"input":mt(x,S);break;case"textarea":_e(x,S);break;case"select":var Te=x._wrapperState.wasMultiple;x._wrapperState.wasMultiple=!!S.multiple;var ze=S.value;ze!=null?F(x,!!S.multiple,ze,!1):Te!==!!S.multiple&&(S.defaultValue!=null?F(x,!!S.multiple,S.defaultValue,!0):F(x,!!S.multiple,S.multiple?[]:"",!1))}x[nl]=S}catch(Ke){nn(r,r.return,Ke)}}break;case 6:if(Ni(o,r),Ki(r),p&4){if(r.stateNode===null)throw Error(n(162));x=r.stateNode,S=r.memoizedProps;try{x.nodeValue=S}catch(Ke){nn(r,r.return,Ke)}}break;case 3:if(Ni(o,r),Ki(r),p&4&&c!==null&&c.memoizedState.isDehydrated)try{ja(o.containerInfo)}catch(Ke){nn(r,r.return,Ke)}break;case 4:Ni(o,r),Ki(r);break;case 13:Ni(o,r),Ki(r),x=r.child,x.flags&8192&&(S=x.memoizedState!==null,x.stateNode.isHidden=S,!S||x.alternate!==null&&x.alternate.memoizedState!==null||(Rh=q())),p&4&&zy(r);break;case 22:if(Ae=c!==null&&c.memoizedState!==null,r.mode&1?(kn=(ae=kn)||Ae,Ni(o,r),kn=ae):Ni(o,r),Ki(r),p&8192){if(ae=r.memoizedState!==null,(r.stateNode.isHidden=ae)&&!Ae&&r.mode&1)for(je=r,Ae=r.child;Ae!==null;){for(Ce=je=Ae;je!==null;){switch(Te=je,ze=Te.child,Te.tag){case 0:case 11:case 14:case 15:hl(4,Te,Te.return);break;case 1:Uo(Te,Te.return);var Xe=Te.stateNode;if(typeof Xe.componentWillUnmount=="function"){p=Te,c=Te.return;try{o=p,Xe.props=o.memoizedProps,Xe.state=o.memoizedState,Xe.componentWillUnmount()}catch(Ke){nn(p,c,Ke)}}break;case 5:Uo(Te,Te.return);break;case 22:if(Te.memoizedState!==null){Wy(Ce);continue}}ze!==null?(ze.return=Te,je=ze):Wy(Ce)}Ae=Ae.sibling}e:for(Ae=null,Ce=r;;){if(Ce.tag===5){if(Ae===null){Ae=Ce;try{x=Ce.stateNode,ae?(S=x.style,typeof S.setProperty=="function"?S.setProperty("display","none","important"):S.display="none"):(z=Ce.stateNode,W=Ce.memoizedProps.style,A=W!=null&&W.hasOwnProperty("display")?W.display:null,z.style.display=Ye("display",A))}catch(Ke){nn(r,r.return,Ke)}}}else if(Ce.tag===6){if(Ae===null)try{Ce.stateNode.nodeValue=ae?"":Ce.memoizedProps}catch(Ke){nn(r,r.return,Ke)}}else if((Ce.tag!==22&&Ce.tag!==23||Ce.memoizedState===null||Ce===r)&&Ce.child!==null){Ce.child.return=Ce,Ce=Ce.child;continue}if(Ce===r)break e;for(;Ce.sibling===null;){if(Ce.return===null||Ce.return===r)break e;Ae===Ce&&(Ae=null),Ce=Ce.return}Ae===Ce&&(Ae=null),Ce.sibling.return=Ce.return,Ce=Ce.sibling}}break;case 19:Ni(o,r),Ki(r),p&4&&zy(r);break;case 21:break;default:Ni(o,r),Ki(r)}}function Ki(r){var o=r.flags;if(o&2){try{e:{for(var c=r.return;c!==null;){if(Fy(c)){var p=c;break e}c=c.return}throw Error(n(160))}switch(p.tag){case 5:var x=p.stateNode;p.flags&32&&(Ge(x,""),p.flags&=-33);var S=Oy(r);Ah(r,S,x);break;case 3:case 4:var A=p.stateNode.containerInfo,z=Oy(r);Th(r,z,A);break;default:throw Error(n(161))}}catch(W){nn(r,r.return,W)}r.flags&=-3}o&4096&&(r.flags&=-4097)}function MA(r,o,c){je=r,Hy(r)}function Hy(r,o,c){for(var p=(r.mode&1)!==0;je!==null;){var x=je,S=x.child;if(x.tag===22&&p){var A=x.memoizedState!==null||sc;if(!A){var z=x.alternate,W=z!==null&&z.memoizedState!==null||kn;z=sc;var ae=kn;if(sc=A,(kn=W)&&!ae)for(je=x;je!==null;)A=je,W=A.child,A.tag===22&&A.memoizedState!==null?jy(x):W!==null?(W.return=A,je=W):jy(x);for(;S!==null;)je=S,Hy(S),S=S.sibling;je=x,sc=z,kn=ae}Gy(r)}else x.subtreeFlags&8772&&S!==null?(S.return=x,je=S):Gy(r)}}function Gy(r){for(;je!==null;){var o=je;if(o.flags&8772){var c=o.alternate;try{if(o.flags&8772)switch(o.tag){case 0:case 11:case 15:kn||oc(5,o);break;case 1:var p=o.stateNode;if(o.flags&4&&!kn)if(c===null)p.componentDidMount();else{var x=o.elementType===o.type?c.memoizedProps:Ii(o.type,c.memoizedProps);p.componentDidUpdate(x,c.memoizedState,p.__reactInternalSnapshotBeforeUpdate)}var S=o.updateQueue;S!==null&&W0(o,S,p);break;case 3:var A=o.updateQueue;if(A!==null){if(c=null,o.child!==null)switch(o.child.tag){case 5:c=o.child.stateNode;break;case 1:c=o.child.stateNode}W0(o,A,c)}break;case 5:var z=o.stateNode;if(c===null&&o.flags&4){c=z;var W=o.memoizedProps;switch(o.type){case"button":case"input":case"select":case"textarea":W.autoFocus&&c.focus();break;case"img":W.src&&(c.src=W.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(o.memoizedState===null){var ae=o.alternate;if(ae!==null){var Ae=ae.memoizedState;if(Ae!==null){var Ce=Ae.dehydrated;Ce!==null&&ja(Ce)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(n(163))}kn||o.flags&512&&Mh(o)}catch(Te){nn(o,o.return,Te)}}if(o===r){je=null;break}if(c=o.sibling,c!==null){c.return=o.return,je=c;break}je=o.return}}function Wy(r){for(;je!==null;){var o=je;if(o===r){je=null;break}var c=o.sibling;if(c!==null){c.return=o.return,je=c;break}je=o.return}}function jy(r){for(;je!==null;){var o=je;try{switch(o.tag){case 0:case 11:case 15:var c=o.return;try{oc(4,o)}catch(W){nn(o,c,W)}break;case 1:var p=o.stateNode;if(typeof p.componentDidMount=="function"){var x=o.return;try{p.componentDidMount()}catch(W){nn(o,x,W)}}var S=o.return;try{Mh(o)}catch(W){nn(o,S,W)}break;case 5:var A=o.return;try{Mh(o)}catch(W){nn(o,A,W)}}}catch(W){nn(o,o.return,W)}if(o===r){je=null;break}var z=o.sibling;if(z!==null){z.return=o.return,je=z;break}je=o.return}}var TA=Math.ceil,ac=C.ReactCurrentDispatcher,Ch=C.ReactCurrentOwner,Si=C.ReactCurrentBatchConfig,bt=0,Sn=null,un=null,Cn=0,li=0,Fo=Kr(0),gn=0,pl=null,Os=0,lc=0,bh=0,ml=null,Kn=null,Rh=0,Oo=1/0,yr=null,uc=!1,Ph=null,ns=null,cc=!1,is=null,fc=0,gl=0,Dh=null,dc=-1,hc=0;function Wn(){return bt&6?q():dc!==-1?dc:dc=q()}function rs(r){return r.mode&1?bt&2&&Cn!==0?Cn&-Cn:lA.transition!==null?(hc===0&&(hc=Hn()),hc):(r=wt,r!==0||(r=window.event,r=r===void 0?16:$v(r.type)),r):1}function Ui(r,o,c,p){if(50<gl)throw gl=0,Dh=null,Error(n(185));sn(r,c,p),(!(bt&2)||r!==Sn)&&(r===Sn&&(!(bt&2)&&(lc|=c),gn===4&&ss(r,Cn)),Zn(r,p),c===1&&bt===0&&!(o.mode&1)&&(Oo=q()+500,Vu&&Qr()))}function Zn(r,o){var c=r.callbackNode;Rs(r,o);var p=Pi(r,r===Sn?Cn:0);if(p===0)c!==null&&Q(c),r.callbackNode=null,r.callbackPriority=0;else if(o=p&-p,r.callbackPriority!==o){if(c!=null&&Q(c),o===1)r.tag===0?aA($y.bind(null,r)):L0($y.bind(null,r)),iA(function(){!(bt&6)&&Qr()}),c=null;else{switch(Bv(p)){case 1:c=ke;break;case 4:c=He;break;case 16:c=We;break;case 536870912:c=ut;break;default:c=We}c=tx(c,Xy.bind(null,r))}r.callbackPriority=o,r.callbackNode=c}}function Xy(r,o){if(dc=-1,hc=0,bt&6)throw Error(n(327));var c=r.callbackNode;if(Bo()&&r.callbackNode!==c)return null;var p=Pi(r,r===Sn?Cn:0);if(p===0)return null;if(p&30||p&r.expiredLanes||o)o=pc(r,p);else{o=p;var x=bt;bt|=2;var S=Yy();(Sn!==r||Cn!==o)&&(yr=null,Oo=q()+500,zs(r,o));do try{bA();break}catch(z){qy(r,z)}while(!0);Yd(),ac.current=S,bt=x,un!==null?o=0:(Sn=null,Cn=0,o=gn)}if(o!==0){if(o===2&&(x=Ot(r),x!==0&&(p=x,o=Lh(r,x))),o===1)throw c=pl,zs(r,0),ss(r,p),Zn(r,q()),c;if(o===6)ss(r,p);else{if(x=r.current.alternate,!(p&30)&&!AA(x)&&(o=pc(r,p),o===2&&(S=Ot(r),S!==0&&(p=S,o=Lh(r,S))),o===1))throw c=pl,zs(r,0),ss(r,p),Zn(r,q()),c;switch(r.finishedWork=x,r.finishedLanes=p,o){case 0:case 1:throw Error(n(345));case 2:Vs(r,Kn,yr);break;case 3:if(ss(r,p),(p&130023424)===p&&(o=Rh+500-q(),10<o)){if(Pi(r,0)!==0)break;if(x=r.suspendedLanes,(x&p)!==p){Wn(),r.pingedLanes|=r.suspendedLanes&x;break}r.timeoutHandle=Od(Vs.bind(null,r,Kn,yr),o);break}Vs(r,Kn,yr);break;case 4:if(ss(r,p),(p&4194240)===p)break;for(o=r.eventTimes,x=-1;0<p;){var A=31-Dt(p);S=1<<A,A=o[A],A>x&&(x=A),p&=~S}if(p=x,p=q()-p,p=(120>p?120:480>p?480:1080>p?1080:1920>p?1920:3e3>p?3e3:4320>p?4320:1960*TA(p/1960))-p,10<p){r.timeoutHandle=Od(Vs.bind(null,r,Kn,yr),p);break}Vs(r,Kn,yr);break;case 5:Vs(r,Kn,yr);break;default:throw Error(n(329))}}}return Zn(r,q()),r.callbackNode===c?Xy.bind(null,r):null}function Lh(r,o){var c=ml;return r.current.memoizedState.isDehydrated&&(zs(r,o).flags|=256),r=pc(r,o),r!==2&&(o=Kn,Kn=c,o!==null&&Ih(o)),r}function Ih(r){Kn===null?Kn=r:Kn.push.apply(Kn,r)}function AA(r){for(var o=r;;){if(o.flags&16384){var c=o.updateQueue;if(c!==null&&(c=c.stores,c!==null))for(var p=0;p<c.length;p++){var x=c[p],S=x.getSnapshot;x=x.value;try{if(!Di(S(),x))return!1}catch{return!1}}}if(c=o.child,o.subtreeFlags&16384&&c!==null)c.return=o,o=c;else{if(o===r)break;for(;o.sibling===null;){if(o.return===null||o.return===r)return!0;o=o.return}o.sibling.return=o.return,o=o.sibling}}return!0}function ss(r,o){for(o&=~bh,o&=~lc,r.suspendedLanes|=o,r.pingedLanes&=~o,r=r.expirationTimes;0<o;){var c=31-Dt(o),p=1<<c;r[c]=-1,o&=~p}}function $y(r){if(bt&6)throw Error(n(327));Bo();var o=Pi(r,0);if(!(o&1))return Zn(r,q()),null;var c=pc(r,o);if(r.tag!==0&&c===2){var p=Ot(r);p!==0&&(o=p,c=Lh(r,p))}if(c===1)throw c=pl,zs(r,0),ss(r,o),Zn(r,q()),c;if(c===6)throw Error(n(345));return r.finishedWork=r.current.alternate,r.finishedLanes=o,Vs(r,Kn,yr),Zn(r,q()),null}function kh(r,o){var c=bt;bt|=1;try{return r(o)}finally{bt=c,bt===0&&(Oo=q()+500,Vu&&Qr())}}function Bs(r){is!==null&&is.tag===0&&!(bt&6)&&Bo();var o=bt;bt|=1;var c=Si.transition,p=wt;try{if(Si.transition=null,wt=1,r)return r()}finally{wt=p,Si.transition=c,bt=o,!(bt&6)&&Qr()}}function Nh(){li=Fo.current,Xt(Fo)}function zs(r,o){r.finishedWork=null,r.finishedLanes=0;var c=r.timeoutHandle;if(c!==-1&&(r.timeoutHandle=-1,nA(c)),un!==null)for(c=un.return;c!==null;){var p=c;switch(Wd(p),p.tag){case 1:p=p.type.childContextTypes,p!=null&&Bu();break;case 3:ko(),Xt($n),Xt(Dn),ih();break;case 5:th(p);break;case 4:ko();break;case 13:Xt(Zt);break;case 19:Xt(Zt);break;case 10:Kd(p.type._context);break;case 22:case 23:Nh()}c=c.return}if(Sn=r,un=r=os(r.current,null),Cn=li=o,gn=0,pl=null,bh=lc=Os=0,Kn=ml=null,Ns!==null){for(o=0;o<Ns.length;o++)if(c=Ns[o],p=c.interleaved,p!==null){c.interleaved=null;var x=p.next,S=c.pending;if(S!==null){var A=S.next;S.next=x,p.next=A}c.pending=p}Ns=null}return r}function qy(r,o){do{var c=un;try{if(Yd(),Zu.current=tc,Qu){for(var p=Qt.memoizedState;p!==null;){var x=p.queue;x!==null&&(x.pending=null),p=p.next}Qu=!1}if(Fs=0,_n=mn=Qt=null,ll=!1,ul=0,Ch.current=null,c===null||c.return===null){gn=1,pl=o,un=null;break}e:{var S=r,A=c.return,z=c,W=o;if(o=Cn,z.flags|=32768,W!==null&&typeof W=="object"&&typeof W.then=="function"){var ae=W,Ae=z,Ce=Ae.tag;if(!(Ae.mode&1)&&(Ce===0||Ce===11||Ce===15)){var Te=Ae.alternate;Te?(Ae.updateQueue=Te.updateQueue,Ae.memoizedState=Te.memoizedState,Ae.lanes=Te.lanes):(Ae.updateQueue=null,Ae.memoizedState=null)}var ze=xy(A);if(ze!==null){ze.flags&=-257,_y(ze,A,z,S,o),ze.mode&1&&yy(S,ae,o),o=ze,W=ae;var Xe=o.updateQueue;if(Xe===null){var Ke=new Set;Ke.add(W),o.updateQueue=Ke}else Xe.add(W);break e}else{if(!(o&1)){yy(S,ae,o),Uh();break e}W=Error(n(426))}}else if(Kt&&z.mode&1){var on=xy(A);if(on!==null){!(on.flags&65536)&&(on.flags|=256),_y(on,A,z,S,o),$d(No(W,z));break e}}S=W=No(W,z),gn!==4&&(gn=2),ml===null?ml=[S]:ml.push(S),S=A;do{switch(S.tag){case 3:S.flags|=65536,o&=-o,S.lanes|=o;var te=gy(S,W,o);G0(S,te);break e;case 1:z=W;var Y=S.type,se=S.stateNode;if(!(S.flags&128)&&(typeof Y.getDerivedStateFromError=="function"||se!==null&&typeof se.componentDidCatch=="function"&&(ns===null||!ns.has(se)))){S.flags|=65536,o&=-o,S.lanes|=o;var De=vy(S,z,o);G0(S,De);break e}}S=S.return}while(S!==null)}Zy(c)}catch(Ze){o=Ze,un===c&&c!==null&&(un=c=c.return);continue}break}while(!0)}function Yy(){var r=ac.current;return ac.current=tc,r===null?tc:r}function Uh(){(gn===0||gn===3||gn===2)&&(gn=4),Sn===null||!(Os&268435455)&&!(lc&268435455)||ss(Sn,Cn)}function pc(r,o){var c=bt;bt|=2;var p=Yy();(Sn!==r||Cn!==o)&&(yr=null,zs(r,o));do try{CA();break}catch(x){qy(r,x)}while(!0);if(Yd(),bt=c,ac.current=p,un!==null)throw Error(n(261));return Sn=null,Cn=0,gn}function CA(){for(;un!==null;)Ky(un)}function bA(){for(;un!==null&&!ce();)Ky(un)}function Ky(r){var o=ex(r.alternate,r,li);r.memoizedProps=r.pendingProps,o===null?Zy(r):un=o,Ch.current=null}function Zy(r){var o=r;do{var c=o.alternate;if(r=o.return,o.flags&32768){if(c=SA(c,o),c!==null){c.flags&=32767,un=c;return}if(r!==null)r.flags|=32768,r.subtreeFlags=0,r.deletions=null;else{gn=6,un=null;return}}else if(c=_A(c,o,li),c!==null){un=c;return}if(o=o.sibling,o!==null){un=o;return}un=o=r}while(o!==null);gn===0&&(gn=5)}function Vs(r,o,c){var p=wt,x=Si.transition;try{Si.transition=null,wt=1,RA(r,o,c,p)}finally{Si.transition=x,wt=p}return null}function RA(r,o,c,p){do Bo();while(is!==null);if(bt&6)throw Error(n(327));c=r.finishedWork;var x=r.finishedLanes;if(c===null)return null;if(r.finishedWork=null,r.finishedLanes=0,c===r.current)throw Error(n(177));r.callbackNode=null,r.callbackPriority=0;var S=c.lanes|c.childLanes;if(Pn(r,S),r===Sn&&(un=Sn=null,Cn=0),!(c.subtreeFlags&2064)&&!(c.flags&2064)||cc||(cc=!0,tx(We,function(){return Bo(),null})),S=(c.flags&15990)!==0,c.subtreeFlags&15990||S){S=Si.transition,Si.transition=null;var A=wt;wt=1;var z=bt;bt|=4,Ch.current=null,wA(r,c),Vy(c,r),YT(Ud),Tu=!!Nd,Ud=Nd=null,r.current=c,MA(c),fe(),bt=z,wt=A,Si.transition=S}else r.current=c;if(cc&&(cc=!1,is=r,fc=x),S=r.pendingLanes,S===0&&(ns=null),Pt(c.stateNode),Zn(r,q()),o!==null)for(p=r.onRecoverableError,c=0;c<o.length;c++)x=o[c],p(x.value,{componentStack:x.stack,digest:x.digest});if(uc)throw uc=!1,r=Ph,Ph=null,r;return fc&1&&r.tag!==0&&Bo(),S=r.pendingLanes,S&1?r===Dh?gl++:(gl=0,Dh=r):gl=0,Qr(),null}function Bo(){if(is!==null){var r=Bv(fc),o=Si.transition,c=wt;try{if(Si.transition=null,wt=16>r?16:r,is===null)var p=!1;else{if(r=is,is=null,fc=0,bt&6)throw Error(n(331));var x=bt;for(bt|=4,je=r.current;je!==null;){var S=je,A=S.child;if(je.flags&16){var z=S.deletions;if(z!==null){for(var W=0;W<z.length;W++){var ae=z[W];for(je=ae;je!==null;){var Ae=je;switch(Ae.tag){case 0:case 11:case 15:hl(8,Ae,S)}var Ce=Ae.child;if(Ce!==null)Ce.return=Ae,je=Ce;else for(;je!==null;){Ae=je;var Te=Ae.sibling,ze=Ae.return;if(Uy(Ae),Ae===ae){je=null;break}if(Te!==null){Te.return=ze,je=Te;break}je=ze}}}var Xe=S.alternate;if(Xe!==null){var Ke=Xe.child;if(Ke!==null){Xe.child=null;do{var on=Ke.sibling;Ke.sibling=null,Ke=on}while(Ke!==null)}}je=S}}if(S.subtreeFlags&2064&&A!==null)A.return=S,je=A;else e:for(;je!==null;){if(S=je,S.flags&2048)switch(S.tag){case 0:case 11:case 15:hl(9,S,S.return)}var te=S.sibling;if(te!==null){te.return=S.return,je=te;break e}je=S.return}}var Y=r.current;for(je=Y;je!==null;){A=je;var se=A.child;if(A.subtreeFlags&2064&&se!==null)se.return=A,je=se;else e:for(A=Y;je!==null;){if(z=je,z.flags&2048)try{switch(z.tag){case 0:case 11:case 15:oc(9,z)}}catch(Ze){nn(z,z.return,Ze)}if(z===A){je=null;break e}var De=z.sibling;if(De!==null){De.return=z.return,je=De;break e}je=z.return}}if(bt=x,Qr(),ht&&typeof ht.onPostCommitFiberRoot=="function")try{ht.onPostCommitFiberRoot(Je,r)}catch{}p=!0}return p}finally{wt=c,Si.transition=o}}return!1}function Qy(r,o,c){o=No(c,o),o=gy(r,o,1),r=es(r,o,1),o=Wn(),r!==null&&(sn(r,1,o),Zn(r,o))}function nn(r,o,c){if(r.tag===3)Qy(r,r,c);else for(;o!==null;){if(o.tag===3){Qy(o,r,c);break}else if(o.tag===1){var p=o.stateNode;if(typeof o.type.getDerivedStateFromError=="function"||typeof p.componentDidCatch=="function"&&(ns===null||!ns.has(p))){r=No(c,r),r=vy(o,r,1),o=es(o,r,1),r=Wn(),o!==null&&(sn(o,1,r),Zn(o,r));break}}o=o.return}}function PA(r,o,c){var p=r.pingCache;p!==null&&p.delete(o),o=Wn(),r.pingedLanes|=r.suspendedLanes&c,Sn===r&&(Cn&c)===c&&(gn===4||gn===3&&(Cn&130023424)===Cn&&500>q()-Rh?zs(r,0):bh|=c),Zn(r,o)}function Jy(r,o){o===0&&(r.mode&1?(o=Mt,Mt<<=1,!(Mt&130023424)&&(Mt=4194304)):o=1);var c=Wn();r=mr(r,o),r!==null&&(sn(r,o,c),Zn(r,c))}function DA(r){var o=r.memoizedState,c=0;o!==null&&(c=o.retryLane),Jy(r,c)}function LA(r,o){var c=0;switch(r.tag){case 13:var p=r.stateNode,x=r.memoizedState;x!==null&&(c=x.retryLane);break;case 19:p=r.stateNode;break;default:throw Error(n(314))}p!==null&&p.delete(o),Jy(r,c)}var ex;ex=function(r,o,c){if(r!==null)if(r.memoizedProps!==o.pendingProps||$n.current)Yn=!0;else{if(!(r.lanes&c)&&!(o.flags&128))return Yn=!1,xA(r,o,c);Yn=!!(r.flags&131072)}else Yn=!1,Kt&&o.flags&1048576&&I0(o,Gu,o.index);switch(o.lanes=0,o.tag){case 2:var p=o.type;rc(r,o),r=o.pendingProps;var x=Co(o,Dn.current);Io(o,c),x=oh(null,o,p,r,x,c);var S=ah();return o.flags|=1,typeof x=="object"&&x!==null&&typeof x.render=="function"&&x.$$typeof===void 0?(o.tag=1,o.memoizedState=null,o.updateQueue=null,qn(p)?(S=!0,zu(o)):S=!1,o.memoizedState=x.state!==null&&x.state!==void 0?x.state:null,Jd(o),x.updater=nc,o.stateNode=x,x._reactInternals=o,hh(o,p,r,c),o=vh(null,o,p,!0,S,c)):(o.tag=0,Kt&&S&&Gd(o),Gn(null,o,x,c),o=o.child),o;case 16:p=o.elementType;e:{switch(rc(r,o),r=o.pendingProps,x=p._init,p=x(p._payload),o.type=p,x=o.tag=kA(p),r=Ii(p,r),x){case 0:o=gh(null,o,p,r,c);break e;case 1:o=Ay(null,o,p,r,c);break e;case 11:o=Sy(null,o,p,r,c);break e;case 14:o=Ey(null,o,p,Ii(p.type,r),c);break e}throw Error(n(306,p,""))}return o;case 0:return p=o.type,x=o.pendingProps,x=o.elementType===p?x:Ii(p,x),gh(r,o,p,x,c);case 1:return p=o.type,x=o.pendingProps,x=o.elementType===p?x:Ii(p,x),Ay(r,o,p,x,c);case 3:e:{if(Cy(o),r===null)throw Error(n(387));p=o.pendingProps,S=o.memoizedState,x=S.element,H0(r,o),Yu(o,p,null,c);var A=o.memoizedState;if(p=A.element,S.isDehydrated)if(S={element:p,isDehydrated:!1,cache:A.cache,pendingSuspenseBoundaries:A.pendingSuspenseBoundaries,transitions:A.transitions},o.updateQueue.baseState=S,o.memoizedState=S,o.flags&256){x=No(Error(n(423)),o),o=by(r,o,p,c,x);break e}else if(p!==x){x=No(Error(n(424)),o),o=by(r,o,p,c,x);break e}else for(ai=Yr(o.stateNode.containerInfo.firstChild),oi=o,Kt=!0,Li=null,c=z0(o,null,p,c),o.child=c;c;)c.flags=c.flags&-3|4096,c=c.sibling;else{if(Po(),p===x){o=vr(r,o,c);break e}Gn(r,o,p,c)}o=o.child}return o;case 5:return j0(o),r===null&&Xd(o),p=o.type,x=o.pendingProps,S=r!==null?r.memoizedProps:null,A=x.children,Fd(p,x)?A=null:S!==null&&Fd(p,S)&&(o.flags|=32),Ty(r,o),Gn(r,o,A,c),o.child;case 6:return r===null&&Xd(o),null;case 13:return Ry(r,o,c);case 4:return eh(o,o.stateNode.containerInfo),p=o.pendingProps,r===null?o.child=Do(o,null,p,c):Gn(r,o,p,c),o.child;case 11:return p=o.type,x=o.pendingProps,x=o.elementType===p?x:Ii(p,x),Sy(r,o,p,x,c);case 7:return Gn(r,o,o.pendingProps,c),o.child;case 8:return Gn(r,o,o.pendingProps.children,c),o.child;case 12:return Gn(r,o,o.pendingProps.children,c),o.child;case 10:e:{if(p=o.type._context,x=o.pendingProps,S=o.memoizedProps,A=x.value,Vt(Xu,p._currentValue),p._currentValue=A,S!==null)if(Di(S.value,A)){if(S.children===x.children&&!$n.current){o=vr(r,o,c);break e}}else for(S=o.child,S!==null&&(S.return=o);S!==null;){var z=S.dependencies;if(z!==null){A=S.child;for(var W=z.firstContext;W!==null;){if(W.context===p){if(S.tag===1){W=gr(-1,c&-c),W.tag=2;var ae=S.updateQueue;if(ae!==null){ae=ae.shared;var Ae=ae.pending;Ae===null?W.next=W:(W.next=Ae.next,Ae.next=W),ae.pending=W}}S.lanes|=c,W=S.alternate,W!==null&&(W.lanes|=c),Zd(S.return,c,o),z.lanes|=c;break}W=W.next}}else if(S.tag===10)A=S.type===o.type?null:S.child;else if(S.tag===18){if(A=S.return,A===null)throw Error(n(341));A.lanes|=c,z=A.alternate,z!==null&&(z.lanes|=c),Zd(A,c,o),A=S.sibling}else A=S.child;if(A!==null)A.return=S;else for(A=S;A!==null;){if(A===o){A=null;break}if(S=A.sibling,S!==null){S.return=A.return,A=S;break}A=A.return}S=A}Gn(r,o,x.children,c),o=o.child}return o;case 9:return x=o.type,p=o.pendingProps.children,Io(o,c),x=xi(x),p=p(x),o.flags|=1,Gn(r,o,p,c),o.child;case 14:return p=o.type,x=Ii(p,o.pendingProps),x=Ii(p.type,x),Ey(r,o,p,x,c);case 15:return wy(r,o,o.type,o.pendingProps,c);case 17:return p=o.type,x=o.pendingProps,x=o.elementType===p?x:Ii(p,x),rc(r,o),o.tag=1,qn(p)?(r=!0,zu(o)):r=!1,Io(o,c),py(o,p,x),hh(o,p,x,c),vh(null,o,p,!0,r,c);case 19:return Dy(r,o,c);case 22:return My(r,o,c)}throw Error(n(156,o.tag))};function tx(r,o){return I(r,o)}function IA(r,o,c,p){this.tag=r,this.key=c,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=o,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=p,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ei(r,o,c,p){return new IA(r,o,c,p)}function Fh(r){return r=r.prototype,!(!r||!r.isReactComponent)}function kA(r){if(typeof r=="function")return Fh(r)?1:0;if(r!=null){if(r=r.$$typeof,r===Z)return 11;if(r===ne)return 14}return 2}function os(r,o){var c=r.alternate;return c===null?(c=Ei(r.tag,o,r.key,r.mode),c.elementType=r.elementType,c.type=r.type,c.stateNode=r.stateNode,c.alternate=r,r.alternate=c):(c.pendingProps=o,c.type=r.type,c.flags=0,c.subtreeFlags=0,c.deletions=null),c.flags=r.flags&14680064,c.childLanes=r.childLanes,c.lanes=r.lanes,c.child=r.child,c.memoizedProps=r.memoizedProps,c.memoizedState=r.memoizedState,c.updateQueue=r.updateQueue,o=r.dependencies,c.dependencies=o===null?null:{lanes:o.lanes,firstContext:o.firstContext},c.sibling=r.sibling,c.index=r.index,c.ref=r.ref,c}function mc(r,o,c,p,x,S){var A=2;if(p=r,typeof r=="function")Fh(r)&&(A=1);else if(typeof r=="string")A=5;else e:switch(r){case k:return Hs(c.children,x,S,o);case B:A=8,x|=8;break;case L:return r=Ei(12,c,o,x|2),r.elementType=L,r.lanes=S,r;case X:return r=Ei(13,c,o,x),r.elementType=X,r.lanes=S,r;case J:return r=Ei(19,c,o,x),r.elementType=J,r.lanes=S,r;case re:return gc(c,x,S,o);default:if(typeof r=="object"&&r!==null)switch(r.$$typeof){case R:A=10;break e;case O:A=9;break e;case Z:A=11;break e;case ne:A=14;break e;case le:A=16,p=null;break e}throw Error(n(130,r==null?r:typeof r,""))}return o=Ei(A,c,o,x),o.elementType=r,o.type=p,o.lanes=S,o}function Hs(r,o,c,p){return r=Ei(7,r,p,o),r.lanes=c,r}function gc(r,o,c,p){return r=Ei(22,r,p,o),r.elementType=re,r.lanes=c,r.stateNode={isHidden:!1},r}function Oh(r,o,c){return r=Ei(6,r,null,o),r.lanes=c,r}function Bh(r,o,c){return o=Ei(4,r.children!==null?r.children:[],r.key,o),o.lanes=c,o.stateNode={containerInfo:r.containerInfo,pendingChildren:null,implementation:r.implementation},o}function NA(r,o,c,p,x){this.tag=o,this.containerInfo=r,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Rn(0),this.expirationTimes=Rn(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Rn(0),this.identifierPrefix=p,this.onRecoverableError=x,this.mutableSourceEagerHydrationData=null}function zh(r,o,c,p,x,S,A,z,W){return r=new NA(r,o,c,z,W),o===1?(o=1,S===!0&&(o|=8)):o=0,S=Ei(3,null,null,o),r.current=S,S.stateNode=r,S.memoizedState={element:p,isDehydrated:c,cache:null,transitions:null,pendingSuspenseBoundaries:null},Jd(S),r}function UA(r,o,c){var p=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:b,key:p==null?null:""+p,children:r,containerInfo:o,implementation:c}}function nx(r){if(!r)return Zr;r=r._reactInternals;e:{if(Xi(r)!==r||r.tag!==1)throw Error(n(170));var o=r;do{switch(o.tag){case 3:o=o.stateNode.context;break e;case 1:if(qn(o.type)){o=o.stateNode.__reactInternalMemoizedMergedChildContext;break e}}o=o.return}while(o!==null);throw Error(n(171))}if(r.tag===1){var c=r.type;if(qn(c))return P0(r,c,o)}return o}function ix(r,o,c,p,x,S,A,z,W){return r=zh(c,p,!0,r,x,S,A,z,W),r.context=nx(null),c=r.current,p=Wn(),x=rs(c),S=gr(p,x),S.callback=o??null,es(c,S,x),r.current.lanes=x,sn(r,x,p),Zn(r,p),r}function vc(r,o,c,p){var x=o.current,S=Wn(),A=rs(x);return c=nx(c),o.context===null?o.context=c:o.pendingContext=c,o=gr(S,A),o.payload={element:r},p=p===void 0?null:p,p!==null&&(o.callback=p),r=es(x,o,A),r!==null&&(Ui(r,x,A,S),qu(r,x,A)),A}function yc(r){if(r=r.current,!r.child)return null;switch(r.child.tag){case 5:return r.child.stateNode;default:return r.child.stateNode}}function rx(r,o){if(r=r.memoizedState,r!==null&&r.dehydrated!==null){var c=r.retryLane;r.retryLane=c!==0&&c<o?c:o}}function Vh(r,o){rx(r,o),(r=r.alternate)&&rx(r,o)}var sx=typeof reportError=="function"?reportError:function(r){console.error(r)};function Hh(r){this._internalRoot=r}xc.prototype.render=Hh.prototype.render=function(r){var o=this._internalRoot;if(o===null)throw Error(n(409));vc(r,o,null,null)},xc.prototype.unmount=Hh.prototype.unmount=function(){var r=this._internalRoot;if(r!==null){this._internalRoot=null;var o=r.containerInfo;Bs(function(){vc(null,r,null,null)}),o[fr]=null}};function xc(r){this._internalRoot=r}xc.prototype.unstable_scheduleHydration=function(r){if(r){var o=Hv();r={blockedOn:null,target:r,priority:o};for(var c=0;c<Xr.length&&o!==0&&o<Xr[c].priority;c++);Xr.splice(c,0,r),c===0&&jv(r)}};function Gh(r){return!(!r||r.nodeType!==1&&r.nodeType!==9&&r.nodeType!==11)}function _c(r){return!(!r||r.nodeType!==1&&r.nodeType!==9&&r.nodeType!==11&&(r.nodeType!==8||r.nodeValue!==" react-mount-point-unstable "))}function ox(){}function FA(r,o,c,p,x){if(x){if(typeof p=="function"){var S=p;p=function(){var ae=yc(A);S.call(ae)}}var A=ix(o,p,r,0,null,!1,!1,"",ox);return r._reactRootContainer=A,r[fr]=A.current,el(r.nodeType===8?r.parentNode:r),Bs(),A}for(;x=r.lastChild;)r.removeChild(x);if(typeof p=="function"){var z=p;p=function(){var ae=yc(W);z.call(ae)}}var W=zh(r,0,!1,null,null,!1,!1,"",ox);return r._reactRootContainer=W,r[fr]=W.current,el(r.nodeType===8?r.parentNode:r),Bs(function(){vc(o,W,c,p)}),W}function Sc(r,o,c,p,x){var S=c._reactRootContainer;if(S){var A=S;if(typeof x=="function"){var z=x;x=function(){var W=yc(A);z.call(W)}}vc(o,A,r,x)}else A=FA(c,o,r,x,p);return yc(A)}zv=function(r){switch(r.tag){case 3:var o=r.stateNode;if(o.current.memoizedState.isDehydrated){var c=Tn(o.pendingLanes);c!==0&&(Ps(o,c|1),Zn(o,q()),!(bt&6)&&(Oo=q()+500,Qr()))}break;case 13:Bs(function(){var p=mr(r,1);if(p!==null){var x=Wn();Ui(p,r,1,x)}}),Vh(r,1)}},pd=function(r){if(r.tag===13){var o=mr(r,134217728);if(o!==null){var c=Wn();Ui(o,r,134217728,c)}Vh(r,134217728)}},Vv=function(r){if(r.tag===13){var o=rs(r),c=mr(r,o);if(c!==null){var p=Wn();Ui(c,r,o,p)}Vh(r,o)}},Hv=function(){return wt},Gv=function(r,o){var c=wt;try{return wt=r,o()}finally{wt=c}},Ie=function(r,o,c){switch(o){case"input":if(mt(r,c),o=c.name,c.type==="radio"&&o!=null){for(c=r;c.parentNode;)c=c.parentNode;for(c=c.querySelectorAll("input[name="+JSON.stringify(""+o)+'][type="radio"]'),o=0;o<c.length;o++){var p=c[o];if(p!==r&&p.form===r.form){var x=Ou(p);if(!x)throw Error(n(90));at(p),mt(p,x)}}}break;case"textarea":_e(r,c);break;case"select":o=c.value,o!=null&&F(r,!!c.multiple,o,!1)}},Wt=kh,pn=Bs;var OA={usingClientEntryPoint:!1,Events:[il,To,Ou,Fe,dt,kh]},vl={findFiberByHostInstance:Ds,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},BA={bundleType:vl.bundleType,version:vl.version,rendererPackageName:vl.rendererPackageName,rendererConfig:vl.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:C.ReactCurrentDispatcher,findHostInstanceByFiber:function(r){return r=Su(r),r===null?null:r.stateNode},findFiberByHostInstance:vl.findFiberByHostInstance,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ec=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ec.isDisabled&&Ec.supportsFiber)try{Je=Ec.inject(BA),ht=Ec}catch{}}return Qn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=OA,Qn.createPortal=function(r,o){var c=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Gh(o))throw Error(n(200));return UA(r,o,null,c)},Qn.createRoot=function(r,o){if(!Gh(r))throw Error(n(299));var c=!1,p="",x=sx;return o!=null&&(o.unstable_strictMode===!0&&(c=!0),o.identifierPrefix!==void 0&&(p=o.identifierPrefix),o.onRecoverableError!==void 0&&(x=o.onRecoverableError)),o=zh(r,1,!1,null,null,c,!1,p,x),r[fr]=o.current,el(r.nodeType===8?r.parentNode:r),new Hh(o)},Qn.findDOMNode=function(r){if(r==null)return null;if(r.nodeType===1)return r;var o=r._reactInternals;if(o===void 0)throw typeof r.render=="function"?Error(n(188)):(r=Object.keys(r).join(","),Error(n(268,r)));return r=Su(o),r=r===null?null:r.stateNode,r},Qn.flushSync=function(r){return Bs(r)},Qn.hydrate=function(r,o,c){if(!_c(o))throw Error(n(200));return Sc(null,r,o,!0,c)},Qn.hydrateRoot=function(r,o,c){if(!Gh(r))throw Error(n(405));var p=c!=null&&c.hydratedSources||null,x=!1,S="",A=sx;if(c!=null&&(c.unstable_strictMode===!0&&(x=!0),c.identifierPrefix!==void 0&&(S=c.identifierPrefix),c.onRecoverableError!==void 0&&(A=c.onRecoverableError)),o=ix(o,null,r,1,c??null,x,!1,S,A),r[fr]=o.current,el(r),p)for(r=0;r<p.length;r++)c=p[r],x=c._getVersion,x=x(c._source),o.mutableSourceEagerHydrationData==null?o.mutableSourceEagerHydrationData=[c,x]:o.mutableSourceEagerHydrationData.push(c,x);return new xc(o)},Qn.render=function(r,o,c){if(!_c(o))throw Error(n(200));return Sc(null,r,o,!1,c)},Qn.unmountComponentAtNode=function(r){if(!_c(r))throw Error(n(40));return r._reactRootContainer?(Bs(function(){Sc(null,null,r,!1,function(){r._reactRootContainer=null,r[fr]=null})}),!0):!1},Qn.unstable_batchedUpdates=kh,Qn.unstable_renderSubtreeIntoContainer=function(r,o,c,p){if(!_c(c))throw Error(n(200));if(r==null||r._reactInternals===void 0)throw Error(n(38));return Sc(r,o,c,!1,p)},Qn.version="18.3.1-next-f1338f8080-20240426",Qn}var px;function $A(){if(px)return Xh.exports;px=1;function t(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t)}catch(e){console.error(e)}}return t(),Xh.exports=XA(),Xh.exports}var qA=$A();const YA=Xf(qA);var xl={},mx;function KA(){if(mx)return xl;mx=1,Object.defineProperty(xl,"__esModule",{value:!0}),xl.parse=l,xl.serialize=d;const t=/^[\u0021-\u003A\u003C\u003E-\u007E]+$/,e=/^[\u0021-\u003A\u003C-\u007E]*$/,n=/^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,i=/^[\u0020-\u003A\u003D-\u007E]*$/,s=Object.prototype.toString,a=(()=>{const g=function(){};return g.prototype=Object.create(null),g})();function l(g,v){const E=new a,w=g.length;if(w<2)return E;const _=(v==null?void 0:v.decode)||h;let y=0;do{const M=g.indexOf("=",y);if(M===-1)break;const T=g.indexOf(";",y),C=T===-1?w:T;if(M>C){y=g.lastIndexOf(";",M-1)+1;continue}const N=u(g,y,M),b=f(g,M,N),k=g.slice(N,b);if(E[k]===void 0){let B=u(g,M+1,C),L=f(g,C,B);const R=_(g.slice(B,L));E[k]=R}y=C+1}while(y<w);return E}function u(g,v,E){do{const w=g.charCodeAt(v);if(w!==32&&w!==9)return v}while(++v<E);return E}function f(g,v,E){for(;v>E;){const w=g.charCodeAt(--v);if(w!==32&&w!==9)return v+1}return E}function d(g,v,E){const w=(E==null?void 0:E.encode)||encodeURIComponent;if(!t.test(g))throw new TypeError(`argument name is invalid: ${g}`);const _=w(v);if(!e.test(_))throw new TypeError(`argument val is invalid: ${v}`);let y=g+"="+_;if(!E)return y;if(E.maxAge!==void 0){if(!Number.isInteger(E.maxAge))throw new TypeError(`option maxAge is invalid: ${E.maxAge}`);y+="; Max-Age="+E.maxAge}if(E.domain){if(!n.test(E.domain))throw new TypeError(`option domain is invalid: ${E.domain}`);y+="; Domain="+E.domain}if(E.path){if(!i.test(E.path))throw new TypeError(`option path is invalid: ${E.path}`);y+="; Path="+E.path}if(E.expires){if(!m(E.expires)||!Number.isFinite(E.expires.valueOf()))throw new TypeError(`option expires is invalid: ${E.expires}`);y+="; Expires="+E.expires.toUTCString()}if(E.httpOnly&&(y+="; HttpOnly"),E.secure&&(y+="; Secure"),E.partitioned&&(y+="; Partitioned"),E.priority)switch(typeof E.priority=="string"?E.priority.toLowerCase():void 0){case"low":y+="; Priority=Low";break;case"medium":y+="; Priority=Medium";break;case"high":y+="; Priority=High";break;default:throw new TypeError(`option priority is invalid: ${E.priority}`)}if(E.sameSite)switch(typeof E.sameSite=="string"?E.sameSite.toLowerCase():E.sameSite){case!0:case"strict":y+="; SameSite=Strict";break;case"lax":y+="; SameSite=Lax";break;case"none":y+="; SameSite=None";break;default:throw new TypeError(`option sameSite is invalid: ${E.sameSite}`)}return y}function h(g){if(g.indexOf("%")===-1)return g;try{return decodeURIComponent(g)}catch{return g}}function m(g){return s.call(g)==="[object Date]"}return xl}KA();/**
 * react-router v7.1.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */var gx="popstate";function ZA(t={}){function e(i,s){let{pathname:a,search:l,hash:u}=i.location;return nm("",{pathname:a,search:l,hash:u},s.state&&s.state.usr||null,s.state&&s.state.key||"default")}function n(i,s){return typeof s=="string"?s:Gl(s)}return JA(e,n,null,t)}function en(t,e){if(t===!1||t===null||typeof t>"u")throw new Error(e)}function or(t,e){if(!t){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}function QA(){return Math.random().toString(36).substring(2,10)}function vx(t,e){return{usr:t.state,key:t.key,idx:e}}function nm(t,e,n=null,i){return{pathname:typeof t=="string"?t:t.pathname,search:"",hash:"",...typeof e=="string"?Da(e):e,state:n,key:e&&e.key||i||QA()}}function Gl({pathname:t="/",search:e="",hash:n=""}){return e&&e!=="?"&&(t+=e.charAt(0)==="?"?e:"?"+e),n&&n!=="#"&&(t+=n.charAt(0)==="#"?n:"#"+n),t}function Da(t){let e={};if(t){let n=t.indexOf("#");n>=0&&(e.hash=t.substring(n),t=t.substring(0,n));let i=t.indexOf("?");i>=0&&(e.search=t.substring(i),t=t.substring(0,i)),t&&(e.pathname=t)}return e}function JA(t,e,n,i={}){let{window:s=document.defaultView,v5Compat:a=!1}=i,l=s.history,u="POP",f=null,d=h();d==null&&(d=0,l.replaceState({...l.state,idx:d},""));function h(){return(l.state||{idx:null}).idx}function m(){u="POP";let _=h(),y=_==null?null:_-d;d=_,f&&f({action:u,location:w.location,delta:y})}function g(_,y){u="PUSH";let M=nm(w.location,_,y);d=h()+1;let T=vx(M,d),C=w.createHref(M);try{l.pushState(T,"",C)}catch(N){if(N instanceof DOMException&&N.name==="DataCloneError")throw N;s.location.assign(C)}a&&f&&f({action:u,location:w.location,delta:1})}function v(_,y){u="REPLACE";let M=nm(w.location,_,y);d=h();let T=vx(M,d),C=w.createHref(M);l.replaceState(T,"",C),a&&f&&f({action:u,location:w.location,delta:0})}function E(_){let y=s.location.origin!=="null"?s.location.origin:s.location.href,M=typeof _=="string"?_:Gl(_);return M=M.replace(/ $/,"%20"),en(y,`No window.location.(origin|href) available to create URL for href: ${M}`),new URL(M,y)}let w={get action(){return u},get location(){return t(s,l)},listen(_){if(f)throw new Error("A history only accepts one active listener");return s.addEventListener(gx,m),f=_,()=>{s.removeEventListener(gx,m),f=null}},createHref(_){return e(s,_)},createURL:E,encodeLocation(_){let y=E(_);return{pathname:y.pathname,search:y.search,hash:y.hash}},push:g,replace:v,go(_){return l.go(_)}};return w}function DE(t,e,n="/"){return eC(t,e,n,!1)}function eC(t,e,n,i){let s=typeof e=="string"?Da(e):e,a=Ss(s.pathname||"/",n);if(a==null)return null;let l=LE(t);tC(l);let u=null;for(let f=0;u==null&&f<l.length;++f){let d=dC(a);u=cC(l[f],d,i)}return u}function LE(t,e=[],n=[],i=""){let s=(a,l,u)=>{let f={relativePath:u===void 0?a.path||"":u,caseSensitive:a.caseSensitive===!0,childrenIndex:l,route:a};f.relativePath.startsWith("/")&&(en(f.relativePath.startsWith(i),`Absolute route path "${f.relativePath}" nested under path "${i}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),f.relativePath=f.relativePath.slice(i.length));let d=Pr([i,f.relativePath]),h=n.concat(f);a.children&&a.children.length>0&&(en(a.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${d}".`),LE(a.children,e,h,d)),!(a.path==null&&!a.index)&&e.push({path:d,score:lC(d,a.index),routesMeta:h})};return t.forEach((a,l)=>{var u;if(a.path===""||!((u=a.path)!=null&&u.includes("?")))s(a,l);else for(let f of IE(a.path))s(a,l,f)}),e}function IE(t){let e=t.split("/");if(e.length===0)return[];let[n,...i]=e,s=n.endsWith("?"),a=n.replace(/\?$/,"");if(i.length===0)return s?[a,""]:[a];let l=IE(i.join("/")),u=[];return u.push(...l.map(f=>f===""?a:[a,f].join("/"))),s&&u.push(...l),u.map(f=>t.startsWith("/")&&f===""?"/":f)}function tC(t){t.sort((e,n)=>e.score!==n.score?n.score-e.score:uC(e.routesMeta.map(i=>i.childrenIndex),n.routesMeta.map(i=>i.childrenIndex)))}var nC=/^:[\w-]+$/,iC=3,rC=2,sC=1,oC=10,aC=-2,yx=t=>t==="*";function lC(t,e){let n=t.split("/"),i=n.length;return n.some(yx)&&(i+=aC),e&&(i+=rC),n.filter(s=>!yx(s)).reduce((s,a)=>s+(nC.test(a)?iC:a===""?sC:oC),i)}function uC(t,e){return t.length===e.length&&t.slice(0,-1).every((i,s)=>i===e[s])?t[t.length-1]-e[e.length-1]:0}function cC(t,e,n=!1){let{routesMeta:i}=t,s={},a="/",l=[];for(let u=0;u<i.length;++u){let f=i[u],d=u===i.length-1,h=a==="/"?e:e.slice(a.length)||"/",m=Pf({path:f.relativePath,caseSensitive:f.caseSensitive,end:d},h),g=f.route;if(!m&&d&&n&&!i[i.length-1].route.index&&(m=Pf({path:f.relativePath,caseSensitive:f.caseSensitive,end:!1},h)),!m)return null;Object.assign(s,m.params),l.push({params:s,pathname:Pr([a,m.pathname]),pathnameBase:gC(Pr([a,m.pathnameBase])),route:g}),m.pathnameBase!=="/"&&(a=Pr([a,m.pathnameBase]))}return l}function Pf(t,e){typeof t=="string"&&(t={path:t,caseSensitive:!1,end:!0});let[n,i]=fC(t.path,t.caseSensitive,t.end),s=e.match(n);if(!s)return null;let a=s[0],l=a.replace(/(.)\/+$/,"$1"),u=s.slice(1);return{params:i.reduce((d,{paramName:h,isOptional:m},g)=>{if(h==="*"){let E=u[g]||"";l=a.slice(0,a.length-E.length).replace(/(.)\/+$/,"$1")}const v=u[g];return m&&!v?d[h]=void 0:d[h]=(v||"").replace(/%2F/g,"/"),d},{}),pathname:a,pathnameBase:l,pattern:t}}function fC(t,e=!1,n=!0){or(t==="*"||!t.endsWith("*")||t.endsWith("/*"),`Route path "${t}" will be treated as if it were "${t.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${t.replace(/\*$/,"/*")}".`);let i=[],s="^"+t.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(l,u,f)=>(i.push({paramName:u,isOptional:f!=null}),f?"/?([^\\/]+)?":"/([^\\/]+)"));return t.endsWith("*")?(i.push({paramName:"*"}),s+=t==="*"||t==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?s+="\\/*$":t!==""&&t!=="/"&&(s+="(?:(?=\\/|$))"),[new RegExp(s,e?void 0:"i"),i]}function dC(t){try{return t.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return or(!1,`The URL path "${t}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${e}).`),t}}function Ss(t,e){if(e==="/")return t;if(!t.toLowerCase().startsWith(e.toLowerCase()))return null;let n=e.endsWith("/")?e.length-1:e.length,i=t.charAt(n);return i&&i!=="/"?null:t.slice(n)||"/"}function hC(t,e="/"){let{pathname:n,search:i="",hash:s=""}=typeof t=="string"?Da(t):t;return{pathname:n?n.startsWith("/")?n:pC(n,e):e,search:vC(i),hash:yC(s)}}function pC(t,e){let n=e.replace(/\/+$/,"").split("/");return t.split("/").forEach(s=>{s===".."?n.length>1&&n.pop():s!=="."&&n.push(s)}),n.length>1?n.join("/"):"/"}function Yh(t,e,n,i){return`Cannot include a '${t}' character in a manually specified \`to.${e}\` field [${JSON.stringify(i)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function mC(t){return t.filter((e,n)=>n===0||e.route.path&&e.route.path.length>0)}function kE(t){let e=mC(t);return e.map((n,i)=>i===e.length-1?n.pathname:n.pathnameBase)}function NE(t,e,n,i=!1){let s;typeof t=="string"?s=Da(t):(s={...t},en(!s.pathname||!s.pathname.includes("?"),Yh("?","pathname","search",s)),en(!s.pathname||!s.pathname.includes("#"),Yh("#","pathname","hash",s)),en(!s.search||!s.search.includes("#"),Yh("#","search","hash",s)));let a=t===""||s.pathname==="",l=a?"/":s.pathname,u;if(l==null)u=n;else{let m=e.length-1;if(!i&&l.startsWith("..")){let g=l.split("/");for(;g[0]==="..";)g.shift(),m-=1;s.pathname=g.join("/")}u=m>=0?e[m]:"/"}let f=hC(s,u),d=l&&l!=="/"&&l.endsWith("/"),h=(a||l===".")&&n.endsWith("/");return!f.pathname.endsWith("/")&&(d||h)&&(f.pathname+="/"),f}var Pr=t=>t.join("/").replace(/\/\/+/g,"/"),gC=t=>t.replace(/\/+$/,"").replace(/^\/*/,"/"),vC=t=>!t||t==="?"?"":t.startsWith("?")?t:"?"+t,yC=t=>!t||t==="#"?"":t.startsWith("#")?t:"#"+t;function xC(t){return t!=null&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.internal=="boolean"&&"data"in t}var UE=["POST","PUT","PATCH","DELETE"];new Set(UE);var _C=["GET",...UE];new Set(_C);var La=$.createContext(null);La.displayName="DataRouter";var $f=$.createContext(null);$f.displayName="DataRouterState";var FE=$.createContext({isTransitioning:!1});FE.displayName="ViewTransition";var SC=$.createContext(new Map);SC.displayName="Fetchers";var EC=$.createContext(null);EC.displayName="Await";var lr=$.createContext(null);lr.displayName="Navigation";var Jl=$.createContext(null);Jl.displayName="Location";var Or=$.createContext({outlet:null,matches:[],isDataRoute:!1});Or.displayName="Route";var Ag=$.createContext(null);Ag.displayName="RouteError";function wC(t,{relative:e}={}){en(eu(),"useHref() may be used only in the context of a <Router> component.");let{basename:n,navigator:i}=$.useContext(lr),{hash:s,pathname:a,search:l}=tu(t,{relative:e}),u=a;return n!=="/"&&(u=a==="/"?n:Pr([n,a])),i.createHref({pathname:u,search:l,hash:s})}function eu(){return $.useContext(Jl)!=null}function Br(){return en(eu(),"useLocation() may be used only in the context of a <Router> component."),$.useContext(Jl).location}var OE="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function BE(t){$.useContext(lr).static||$.useLayoutEffect(t)}function zr(){let{isDataRoute:t}=$.useContext(Or);return t?UC():MC()}function MC(){en(eu(),"useNavigate() may be used only in the context of a <Router> component.");let t=$.useContext(La),{basename:e,navigator:n}=$.useContext(lr),{matches:i}=$.useContext(Or),{pathname:s}=Br(),a=JSON.stringify(kE(i)),l=$.useRef(!1);return BE(()=>{l.current=!0}),$.useCallback((f,d={})=>{if(or(l.current,OE),!l.current)return;if(typeof f=="number"){n.go(f);return}let h=NE(f,JSON.parse(a),s,d.relative==="path");t==null&&e!=="/"&&(h.pathname=h.pathname==="/"?e:Pr([e,h.pathname])),(d.replace?n.replace:n.push)(h,d.state,d)},[e,n,a,s,t])}$.createContext(null);function tu(t,{relative:e}={}){let{matches:n}=$.useContext(Or),{pathname:i}=Br(),s=JSON.stringify(kE(n));return $.useMemo(()=>NE(t,JSON.parse(s),i,e==="path"),[t,s,i,e])}function TC(t,e){return zE(t,e)}function zE(t,e,n,i){var y;en(eu(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:s}=$.useContext(lr),{matches:a}=$.useContext(Or),l=a[a.length-1],u=l?l.params:{},f=l?l.pathname:"/",d=l?l.pathnameBase:"/",h=l&&l.route;{let M=h&&h.path||"";VE(f,!h||M.endsWith("*")||M.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${f}" (under <Route path="${M}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${M}"> to <Route path="${M==="/"?"*":`${M}/*`}">.`)}let m=Br(),g;if(e){let M=typeof e=="string"?Da(e):e;en(d==="/"||((y=M.pathname)==null?void 0:y.startsWith(d)),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${d}" but pathname "${M.pathname}" was given in the \`location\` prop.`),g=M}else g=m;let v=g.pathname||"/",E=v;if(d!=="/"){let M=d.replace(/^\//,"").split("/");E="/"+v.replace(/^\//,"").split("/").slice(M.length).join("/")}let w=DE(t,{pathname:E});or(h||w!=null,`No routes matched location "${g.pathname}${g.search}${g.hash}" `),or(w==null||w[w.length-1].route.element!==void 0||w[w.length-1].route.Component!==void 0||w[w.length-1].route.lazy!==void 0,`Matched leaf route at location "${g.pathname}${g.search}${g.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let _=PC(w&&w.map(M=>Object.assign({},M,{params:Object.assign({},u,M.params),pathname:Pr([d,s.encodeLocation?s.encodeLocation(M.pathname).pathname:M.pathname]),pathnameBase:M.pathnameBase==="/"?d:Pr([d,s.encodeLocation?s.encodeLocation(M.pathnameBase).pathname:M.pathnameBase])})),a,n,i);return e&&_?$.createElement(Jl.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",...g},navigationType:"POP"}},_):_}function AC(){let t=NC(),e=xC(t)?`${t.status} ${t.statusText}`:t instanceof Error?t.message:JSON.stringify(t),n=t instanceof Error?t.stack:null,i="rgba(200,200,200, 0.5)",s={padding:"0.5rem",backgroundColor:i},a={padding:"2px 4px",backgroundColor:i},l=null;return console.error("Error handled by React Router default ErrorBoundary:",t),l=$.createElement($.Fragment,null,$.createElement("p",null,"💿 Hey developer 👋"),$.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",$.createElement("code",{style:a},"ErrorBoundary")," or"," ",$.createElement("code",{style:a},"errorElement")," prop on your route.")),$.createElement($.Fragment,null,$.createElement("h2",null,"Unexpected Application Error!"),$.createElement("h3",{style:{fontStyle:"italic"}},e),n?$.createElement("pre",{style:s},n):null,l)}var CC=$.createElement(AC,null),bC=class extends $.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,e){return e.location!==t.location||e.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:e.error,location:e.location,revalidation:t.revalidation||e.revalidation}}componentDidCatch(t,e){console.error("React Router caught the following error during render",t,e)}render(){return this.state.error!==void 0?$.createElement(Or.Provider,{value:this.props.routeContext},$.createElement(Ag.Provider,{value:this.state.error,children:this.props.component})):this.props.children}};function RC({routeContext:t,match:e,children:n}){let i=$.useContext(La);return i&&i.static&&i.staticContext&&(e.route.errorElement||e.route.ErrorBoundary)&&(i.staticContext._deepestRenderedBoundaryId=e.route.id),$.createElement(Or.Provider,{value:t},n)}function PC(t,e=[],n=null,i=null){if(t==null){if(!n)return null;if(n.errors)t=n.matches;else if(e.length===0&&!n.initialized&&n.matches.length>0)t=n.matches;else return null}let s=t,a=n==null?void 0:n.errors;if(a!=null){let f=s.findIndex(d=>d.route.id&&(a==null?void 0:a[d.route.id])!==void 0);en(f>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(a).join(",")}`),s=s.slice(0,Math.min(s.length,f+1))}let l=!1,u=-1;if(n)for(let f=0;f<s.length;f++){let d=s[f];if((d.route.HydrateFallback||d.route.hydrateFallbackElement)&&(u=f),d.route.id){let{loaderData:h,errors:m}=n,g=d.route.loader&&!h.hasOwnProperty(d.route.id)&&(!m||m[d.route.id]===void 0);if(d.route.lazy||g){l=!0,u>=0?s=s.slice(0,u+1):s=[s[0]];break}}}return s.reduceRight((f,d,h)=>{let m,g=!1,v=null,E=null;n&&(m=a&&d.route.id?a[d.route.id]:void 0,v=d.route.errorElement||CC,l&&(u<0&&h===0?(VE("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),g=!0,E=null):u===h&&(g=!0,E=d.route.hydrateFallbackElement||null)));let w=e.concat(s.slice(0,h+1)),_=()=>{let y;return m?y=v:g?y=E:d.route.Component?y=$.createElement(d.route.Component,null):d.route.element?y=d.route.element:y=f,$.createElement(RC,{match:d,routeContext:{outlet:f,matches:w,isDataRoute:n!=null},children:y})};return n&&(d.route.ErrorBoundary||d.route.errorElement||h===0)?$.createElement(bC,{location:n.location,revalidation:n.revalidation,component:v,error:m,children:_(),routeContext:{outlet:null,matches:w,isDataRoute:!0}}):_()},null)}function Cg(t){return`${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function DC(t){let e=$.useContext(La);return en(e,Cg(t)),e}function LC(t){let e=$.useContext($f);return en(e,Cg(t)),e}function IC(t){let e=$.useContext(Or);return en(e,Cg(t)),e}function bg(t){let e=IC(t),n=e.matches[e.matches.length-1];return en(n.route.id,`${t} can only be used on routes that contain a unique "id"`),n.route.id}function kC(){return bg("useRouteId")}function NC(){var i;let t=$.useContext(Ag),e=LC("useRouteError"),n=bg("useRouteError");return t!==void 0?t:(i=e.errors)==null?void 0:i[n]}function UC(){let{router:t}=DC("useNavigate"),e=bg("useNavigate"),n=$.useRef(!1);return BE(()=>{n.current=!0}),$.useCallback(async(s,a={})=>{or(n.current,OE),n.current&&(typeof s=="number"?t.navigate(s):await t.navigate(s,{fromRouteId:e,...a}))},[t,e])}var xx={};function VE(t,e,n){!e&&!xx[t]&&(xx[t]=!0,or(!1,n))}$.memo(FC);function FC({routes:t,future:e,state:n}){return zE(t,void 0,n,e)}function Mr(t){en(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function OC({basename:t="/",children:e=null,location:n,navigationType:i="POP",navigator:s,static:a=!1}){en(!eu(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let l=t.replace(/^\/*/,"/"),u=$.useMemo(()=>({basename:l,navigator:s,static:a,future:{}}),[l,s,a]);typeof n=="string"&&(n=Da(n));let{pathname:f="/",search:d="",hash:h="",state:m=null,key:g="default"}=n,v=$.useMemo(()=>{let E=Ss(f,l);return E==null?null:{location:{pathname:E,search:d,hash:h,state:m,key:g},navigationType:i}},[l,f,d,h,m,g,i]);return or(v!=null,`<Router basename="${l}"> is not able to match the URL "${f}${d}${h}" because it does not start with the basename, so the <Router> won't render anything.`),v==null?null:$.createElement(lr.Provider,{value:u},$.createElement(Jl.Provider,{children:e,value:v}))}function BC({children:t,location:e}){return TC(im(t),e)}function im(t,e=[]){let n=[];return $.Children.forEach(t,(i,s)=>{if(!$.isValidElement(i))return;let a=[...e,s];if(i.type===$.Fragment){n.push.apply(n,im(i.props.children,a));return}en(i.type===Mr,`[${typeof i.type=="string"?i.type:i.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),en(!i.props.index||!i.props.children,"An index route cannot have child routes.");let l={id:i.props.id||a.join("-"),caseSensitive:i.props.caseSensitive,element:i.props.element,Component:i.props.Component,index:i.props.index,path:i.props.path,loader:i.props.loader,action:i.props.action,hydrateFallbackElement:i.props.hydrateFallbackElement,HydrateFallback:i.props.HydrateFallback,errorElement:i.props.errorElement,ErrorBoundary:i.props.ErrorBoundary,hasErrorBoundary:i.props.hasErrorBoundary===!0||i.props.ErrorBoundary!=null||i.props.errorElement!=null,shouldRevalidate:i.props.shouldRevalidate,handle:i.props.handle,lazy:i.props.lazy};i.props.children&&(l.children=im(i.props.children,a)),n.push(l)}),n}var hf="get",pf="application/x-www-form-urlencoded";function qf(t){return t!=null&&typeof t.tagName=="string"}function zC(t){return qf(t)&&t.tagName.toLowerCase()==="button"}function VC(t){return qf(t)&&t.tagName.toLowerCase()==="form"}function HC(t){return qf(t)&&t.tagName.toLowerCase()==="input"}function GC(t){return!!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)}function WC(t,e){return t.button===0&&(!e||e==="_self")&&!GC(t)}var wc=null;function jC(){if(wc===null)try{new FormData(document.createElement("form"),0),wc=!1}catch{wc=!0}return wc}var XC=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function Kh(t){return t!=null&&!XC.has(t)?(or(!1,`"${t}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${pf}"`),null):t}function $C(t,e){let n,i,s,a,l;if(VC(t)){let u=t.getAttribute("action");i=u?Ss(u,e):null,n=t.getAttribute("method")||hf,s=Kh(t.getAttribute("enctype"))||pf,a=new FormData(t)}else if(zC(t)||HC(t)&&(t.type==="submit"||t.type==="image")){let u=t.form;if(u==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let f=t.getAttribute("formaction")||u.getAttribute("action");if(i=f?Ss(f,e):null,n=t.getAttribute("formmethod")||u.getAttribute("method")||hf,s=Kh(t.getAttribute("formenctype"))||Kh(u.getAttribute("enctype"))||pf,a=new FormData(u,t),!jC()){let{name:d,type:h,value:m}=t;if(h==="image"){let g=d?`${d}.`:"";a.append(`${g}x`,"0"),a.append(`${g}y`,"0")}else d&&a.append(d,m)}}else{if(qf(t))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');n=hf,i=null,s=pf,l=t}return a&&s==="text/plain"&&(l=a,a=void 0),{action:i,method:n.toLowerCase(),encType:s,formData:a,body:l}}function Rg(t,e){if(t===!1||t===null||typeof t>"u")throw new Error(e)}async function qC(t,e){if(t.id in e)return e[t.id];try{let n=await import(t.module);return e[t.id]=n,n}catch(n){return console.error(`Error loading route module \`${t.module}\`, reloading page...`),console.error(n),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function YC(t){return t==null?!1:t.href==null?t.rel==="preload"&&typeof t.imageSrcSet=="string"&&typeof t.imageSizes=="string":typeof t.rel=="string"&&typeof t.href=="string"}async function KC(t,e,n){let i=await Promise.all(t.map(async s=>{let a=e.routes[s.route.id];if(a){let l=await qC(a,n);return l.links?l.links():[]}return[]}));return eb(i.flat(1).filter(YC).filter(s=>s.rel==="stylesheet"||s.rel==="preload").map(s=>s.rel==="stylesheet"?{...s,rel:"prefetch",as:"style"}:{...s,rel:"prefetch"}))}function _x(t,e,n,i,s,a){let l=(f,d)=>n[d]?f.route.id!==n[d].route.id:!0,u=(f,d)=>{var h;return n[d].pathname!==f.pathname||((h=n[d].route.path)==null?void 0:h.endsWith("*"))&&n[d].params["*"]!==f.params["*"]};return a==="assets"?e.filter((f,d)=>l(f,d)||u(f,d)):a==="data"?e.filter((f,d)=>{var m;let h=i.routes[f.route.id];if(!h||!h.hasLoader)return!1;if(l(f,d)||u(f,d))return!0;if(f.route.shouldRevalidate){let g=f.route.shouldRevalidate({currentUrl:new URL(s.pathname+s.search+s.hash,window.origin),currentParams:((m=n[0])==null?void 0:m.params)||{},nextUrl:new URL(t,window.origin),nextParams:f.params,defaultShouldRevalidate:!0});if(typeof g=="boolean")return g}return!0}):[]}function ZC(t,e){return QC(t.map(n=>{let i=e.routes[n.route.id];if(!i)return[];let s=[i.module];return i.imports&&(s=s.concat(i.imports)),s}).flat(1))}function QC(t){return[...new Set(t)]}function JC(t){let e={},n=Object.keys(t).sort();for(let i of n)e[i]=t[i];return e}function eb(t,e){let n=new Set;return new Set(e),t.reduce((i,s)=>{let a=JSON.stringify(JC(s));return n.has(a)||(n.add(a),i.push({key:a,link:s})),i},[])}function tb(t){let e=typeof t=="string"?new URL(t,typeof window>"u"?"server://singlefetch/":window.location.origin):t;return e.pathname==="/"?e.pathname="_root.data":e.pathname=`${e.pathname.replace(/\/$/,"")}.data`,e}function nb(){let t=$.useContext(La);return Rg(t,"You must render this element inside a <DataRouterContext.Provider> element"),t}function ib(){let t=$.useContext($f);return Rg(t,"You must render this element inside a <DataRouterStateContext.Provider> element"),t}var Pg=$.createContext(void 0);Pg.displayName="FrameworkContext";function HE(){let t=$.useContext(Pg);return Rg(t,"You must render this element inside a <HydratedRouter> element"),t}function rb(t,e){let n=$.useContext(Pg),[i,s]=$.useState(!1),[a,l]=$.useState(!1),{onFocus:u,onBlur:f,onMouseEnter:d,onMouseLeave:h,onTouchStart:m}=e,g=$.useRef(null);$.useEffect(()=>{if(t==="render"&&l(!0),t==="viewport"){let w=y=>{y.forEach(M=>{l(M.isIntersecting)})},_=new IntersectionObserver(w,{threshold:.5});return g.current&&_.observe(g.current),()=>{_.disconnect()}}},[t]),$.useEffect(()=>{if(i){let w=setTimeout(()=>{l(!0)},100);return()=>{clearTimeout(w)}}},[i]);let v=()=>{s(!0)},E=()=>{s(!1),l(!1)};return n?t!=="intent"?[a,g,{}]:[a,g,{onFocus:_l(u,v),onBlur:_l(f,E),onMouseEnter:_l(d,v),onMouseLeave:_l(h,E),onTouchStart:_l(m,v)}]:[!1,g,{}]}function _l(t,e){return n=>{t&&t(n),n.defaultPrevented||e(n)}}function sb({page:t,...e}){let{router:n}=nb(),i=$.useMemo(()=>DE(n.routes,t,n.basename),[n.routes,t,n.basename]);return i?$.createElement(ab,{page:t,matches:i,...e}):null}function ob(t){let{manifest:e,routeModules:n}=HE(),[i,s]=$.useState([]);return $.useEffect(()=>{let a=!1;return KC(t,e,n).then(l=>{a||s(l)}),()=>{a=!0}},[t,e,n]),i}function ab({page:t,matches:e,...n}){let i=Br(),{manifest:s,routeModules:a}=HE(),{loaderData:l,matches:u}=ib(),f=$.useMemo(()=>_x(t,e,u,s,i,"data"),[t,e,u,s,i]),d=$.useMemo(()=>_x(t,e,u,s,i,"assets"),[t,e,u,s,i]),h=$.useMemo(()=>{if(t===i.pathname+i.search+i.hash)return[];let v=new Set,E=!1;if(e.forEach(_=>{var M;let y=s.routes[_.route.id];!y||!y.hasLoader||(!f.some(T=>T.route.id===_.route.id)&&_.route.id in l&&((M=a[_.route.id])!=null&&M.shouldRevalidate)||y.hasClientLoader?E=!0:v.add(_.route.id))}),v.size===0)return[];let w=tb(t);return E&&v.size>0&&w.searchParams.set("_routes",e.filter(_=>v.has(_.route.id)).map(_=>_.route.id).join(",")),[w.pathname+w.search]},[l,i,s,f,e,t,a]),m=$.useMemo(()=>ZC(d,s),[d,s]),g=ob(d);return $.createElement($.Fragment,null,h.map(v=>$.createElement("link",{key:v,rel:"prefetch",as:"fetch",href:v,...n})),m.map(v=>$.createElement("link",{key:v,rel:"modulepreload",href:v,...n})),g.map(({key:v,link:E})=>$.createElement("link",{key:v,...E})))}function lb(...t){return e=>{t.forEach(n=>{typeof n=="function"?n(e):n!=null&&(n.current=e)})}}var GE=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{GE&&(window.__reactRouterVersion="7.1.3")}catch{}function ub({basename:t,children:e,window:n}){let i=$.useRef();i.current==null&&(i.current=ZA({window:n,v5Compat:!0}));let s=i.current,[a,l]=$.useState({action:s.action,location:s.location}),u=$.useCallback(f=>{$.startTransition(()=>l(f))},[l]);return $.useLayoutEffect(()=>s.listen(u),[s,u]),$.createElement(OC,{basename:t,children:e,location:a.location,navigationType:a.action,navigator:s})}var WE=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,jE=$.forwardRef(function({onClick:e,discover:n="render",prefetch:i="none",relative:s,reloadDocument:a,replace:l,state:u,target:f,to:d,preventScrollReset:h,viewTransition:m,...g},v){let{basename:E}=$.useContext(lr),w=typeof d=="string"&&WE.test(d),_,y=!1;if(typeof d=="string"&&w&&(_=d,GE))try{let L=new URL(window.location.href),R=d.startsWith("//")?new URL(L.protocol+d):new URL(d),O=Ss(R.pathname,E);R.origin===L.origin&&O!=null?d=O+R.search+R.hash:y=!0}catch{or(!1,`<Link to="${d}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}let M=wC(d,{relative:s}),[T,C,N]=rb(i,g),b=hb(d,{replace:l,state:u,target:f,preventScrollReset:h,relative:s,viewTransition:m});function k(L){e&&e(L),L.defaultPrevented||b(L)}let B=$.createElement("a",{...g,...N,href:_||M,onClick:y||a?e:k,ref:lb(v,C),target:f,"data-discover":!w&&n==="render"?"true":void 0});return T&&!w?$.createElement($.Fragment,null,B,$.createElement(sb,{page:M})):B});jE.displayName="Link";var cb=$.forwardRef(function({"aria-current":e="page",caseSensitive:n=!1,className:i="",end:s=!1,style:a,to:l,viewTransition:u,children:f,...d},h){let m=tu(l,{relative:d.relative}),g=Br(),v=$.useContext($f),{navigator:E,basename:w}=$.useContext(lr),_=v!=null&&yb(m)&&u===!0,y=E.encodeLocation?E.encodeLocation(m).pathname:m.pathname,M=g.pathname,T=v&&v.navigation&&v.navigation.location?v.navigation.location.pathname:null;n||(M=M.toLowerCase(),T=T?T.toLowerCase():null,y=y.toLowerCase()),T&&w&&(T=Ss(T,w)||T);const C=y!=="/"&&y.endsWith("/")?y.length-1:y.length;let N=M===y||!s&&M.startsWith(y)&&M.charAt(C)==="/",b=T!=null&&(T===y||!s&&T.startsWith(y)&&T.charAt(y.length)==="/"),k={isActive:N,isPending:b,isTransitioning:_},B=N?e:void 0,L;typeof i=="function"?L=i(k):L=[i,N?"active":null,b?"pending":null,_?"transitioning":null].filter(Boolean).join(" ");let R=typeof a=="function"?a(k):a;return $.createElement(jE,{...d,"aria-current":B,className:L,ref:h,style:R,to:l,viewTransition:u},typeof f=="function"?f(k):f)});cb.displayName="NavLink";var fb=$.forwardRef(({discover:t="render",fetcherKey:e,navigate:n,reloadDocument:i,replace:s,state:a,method:l=hf,action:u,onSubmit:f,relative:d,preventScrollReset:h,viewTransition:m,...g},v)=>{let E=gb(),w=vb(u,{relative:d}),_=l.toLowerCase()==="get"?"get":"post",y=typeof u=="string"&&WE.test(u),M=T=>{if(f&&f(T),T.defaultPrevented)return;T.preventDefault();let C=T.nativeEvent.submitter,N=(C==null?void 0:C.getAttribute("formmethod"))||l;E(C||T.currentTarget,{fetcherKey:e,method:N,navigate:n,replace:s,state:a,relative:d,preventScrollReset:h,viewTransition:m})};return $.createElement("form",{ref:v,method:_,action:w,onSubmit:i?f:M,...g,"data-discover":!y&&t==="render"?"true":void 0})});fb.displayName="Form";function db(t){return`${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function XE(t){let e=$.useContext(La);return en(e,db(t)),e}function hb(t,{target:e,replace:n,state:i,preventScrollReset:s,relative:a,viewTransition:l}={}){let u=zr(),f=Br(),d=tu(t,{relative:a});return $.useCallback(h=>{if(WC(h,e)){h.preventDefault();let m=n!==void 0?n:Gl(f)===Gl(d);u(t,{replace:m,state:i,preventScrollReset:s,relative:a,viewTransition:l})}},[f,u,d,n,i,e,t,s,a,l])}var pb=0,mb=()=>`__${String(++pb)}__`;function gb(){let{router:t}=XE("useSubmit"),{basename:e}=$.useContext(lr),n=kC();return $.useCallback(async(i,s={})=>{let{action:a,method:l,encType:u,formData:f,body:d}=$C(i,e);if(s.navigate===!1){let h=s.fetcherKey||mb();await t.fetch(h,n,s.action||a,{preventScrollReset:s.preventScrollReset,formData:f,body:d,formMethod:s.method||l,formEncType:s.encType||u,flushSync:s.flushSync})}else await t.navigate(s.action||a,{preventScrollReset:s.preventScrollReset,formData:f,body:d,formMethod:s.method||l,formEncType:s.encType||u,replace:s.replace,state:s.state,fromRouteId:n,flushSync:s.flushSync,viewTransition:s.viewTransition})},[t,e,n])}function vb(t,{relative:e}={}){let{basename:n}=$.useContext(lr),i=$.useContext(Or);en(i,"useFormAction must be used inside a RouteContext");let[s]=i.matches.slice(-1),a={...tu(t||".",{relative:e})},l=Br();if(t==null){a.search=l.search;let u=new URLSearchParams(a.search),f=u.getAll("index");if(f.some(h=>h==="")){u.delete("index"),f.filter(m=>m).forEach(m=>u.append("index",m));let h=u.toString();a.search=h?`?${h}`:""}}return(!t||t===".")&&s.route.index&&(a.search=a.search?a.search.replace(/^\?/,"?index&"):"?index"),n!=="/"&&(a.pathname=a.pathname==="/"?n:Pr([n,a.pathname])),Gl(a)}function yb(t,e={}){let n=$.useContext(FE);en(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:i}=XE("useViewTransitionState"),s=tu(t,{relative:e.relative});if(!n.isTransitioning)return!1;let a=Ss(n.currentLocation.pathname,i)||n.currentLocation.pathname,l=Ss(n.nextLocation.pathname,i)||n.nextLocation.pathname;return Pf(s.pathname,l)!=null||Pf(s.pathname,a)!=null}new TextEncoder;var ti=function(){return ti=Object.assign||function(e){for(var n,i=1,s=arguments.length;i<s;i++){n=arguments[i];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},ti.apply(this,arguments)};function Wl(t,e,n){if(n||arguments.length===2)for(var i=0,s=e.length,a;i<s;i++)(a||!(i in e))&&(a||(a=Array.prototype.slice.call(e,0,i)),a[i]=e[i]);return t.concat(a||Array.prototype.slice.call(e))}var $t="-ms-",Nl="-moz-",Nt="-webkit-",$E="comm",Yf="rule",Dg="decl",xb="@import",qE="@keyframes",_b="@layer",YE=Math.abs,Lg=String.fromCharCode,rm=Object.assign;function Sb(t,e){return Mn(t,0)^45?(((e<<2^Mn(t,0))<<2^Mn(t,1))<<2^Mn(t,2))<<2^Mn(t,3):0}function KE(t){return t.trim()}function Ar(t,e){return(t=e.exec(t))?t[0]:t}function _t(t,e,n){return t.replace(e,n)}function mf(t,e,n){return t.indexOf(e,n)}function Mn(t,e){return t.charCodeAt(e)|0}function ga(t,e,n){return t.slice(e,n)}function Qi(t){return t.length}function ZE(t){return t.length}function Pl(t,e){return e.push(t),t}function Eb(t,e){return t.map(e).join("")}function Sx(t,e){return t.filter(function(n){return!Ar(n,e)})}var Kf=1,va=1,QE=0,bi=0,dn=0,Ia="";function Zf(t,e,n,i,s,a,l,u){return{value:t,root:e,parent:n,type:i,props:s,children:a,line:Kf,column:va,length:l,return:"",siblings:u}}function gs(t,e){return rm(Zf("",null,null,"",null,null,0,t.siblings),t,{length:-t.length},e)}function zo(t){for(;t.root;)t=gs(t.root,{children:[t]});Pl(t,t.siblings)}function wb(){return dn}function Mb(){return dn=bi>0?Mn(Ia,--bi):0,va--,dn===10&&(va=1,Kf--),dn}function Wi(){return dn=bi<QE?Mn(Ia,bi++):0,va++,dn===10&&(va=1,Kf++),dn}function oo(){return Mn(Ia,bi)}function gf(){return bi}function Qf(t,e){return ga(Ia,t,e)}function sm(t){switch(t){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Tb(t){return Kf=va=1,QE=Qi(Ia=t),bi=0,[]}function Ab(t){return Ia="",t}function Zh(t){return KE(Qf(bi-1,om(t===91?t+2:t===40?t+1:t)))}function Cb(t){for(;(dn=oo())&&dn<33;)Wi();return sm(t)>2||sm(dn)>3?"":" "}function bb(t,e){for(;--e&&Wi()&&!(dn<48||dn>102||dn>57&&dn<65||dn>70&&dn<97););return Qf(t,gf()+(e<6&&oo()==32&&Wi()==32))}function om(t){for(;Wi();)switch(dn){case t:return bi;case 34:case 39:t!==34&&t!==39&&om(dn);break;case 40:t===41&&om(t);break;case 92:Wi();break}return bi}function Rb(t,e){for(;Wi()&&t+dn!==57;)if(t+dn===84&&oo()===47)break;return"/*"+Qf(e,bi-1)+"*"+Lg(t===47?t:Wi())}function Pb(t){for(;!sm(oo());)Wi();return Qf(t,bi)}function Db(t){return Ab(vf("",null,null,null,[""],t=Tb(t),0,[0],t))}function vf(t,e,n,i,s,a,l,u,f){for(var d=0,h=0,m=l,g=0,v=0,E=0,w=1,_=1,y=1,M=0,T="",C=s,N=a,b=i,k=T;_;)switch(E=M,M=Wi()){case 40:if(E!=108&&Mn(k,m-1)==58){mf(k+=_t(Zh(M),"&","&\f"),"&\f",YE(d?u[d-1]:0))!=-1&&(y=-1);break}case 34:case 39:case 91:k+=Zh(M);break;case 9:case 10:case 13:case 32:k+=Cb(E);break;case 92:k+=bb(gf()-1,7);continue;case 47:switch(oo()){case 42:case 47:Pl(Lb(Rb(Wi(),gf()),e,n,f),f);break;default:k+="/"}break;case 123*w:u[d++]=Qi(k)*y;case 125*w:case 59:case 0:switch(M){case 0:case 125:_=0;case 59+h:y==-1&&(k=_t(k,/\f/g,"")),v>0&&Qi(k)-m&&Pl(v>32?wx(k+";",i,n,m-1,f):wx(_t(k," ","")+";",i,n,m-2,f),f);break;case 59:k+=";";default:if(Pl(b=Ex(k,e,n,d,h,s,u,T,C=[],N=[],m,a),a),M===123)if(h===0)vf(k,e,b,b,C,a,m,u,N);else switch(g===99&&Mn(k,3)===110?100:g){case 100:case 108:case 109:case 115:vf(t,b,b,i&&Pl(Ex(t,b,b,0,0,s,u,T,s,C=[],m,N),N),s,N,m,u,i?C:N);break;default:vf(k,b,b,b,[""],N,0,u,N)}}d=h=v=0,w=y=1,T=k="",m=l;break;case 58:m=1+Qi(k),v=E;default:if(w<1){if(M==123)--w;else if(M==125&&w++==0&&Mb()==125)continue}switch(k+=Lg(M),M*w){case 38:y=h>0?1:(k+="\f",-1);break;case 44:u[d++]=(Qi(k)-1)*y,y=1;break;case 64:oo()===45&&(k+=Zh(Wi())),g=oo(),h=m=Qi(T=k+=Pb(gf())),M++;break;case 45:E===45&&Qi(k)==2&&(w=0)}}return a}function Ex(t,e,n,i,s,a,l,u,f,d,h,m){for(var g=s-1,v=s===0?a:[""],E=ZE(v),w=0,_=0,y=0;w<i;++w)for(var M=0,T=ga(t,g+1,g=YE(_=l[w])),C=t;M<E;++M)(C=KE(_>0?v[M]+" "+T:_t(T,/&\f/g,v[M])))&&(f[y++]=C);return Zf(t,e,n,s===0?Yf:u,f,d,h,m)}function Lb(t,e,n,i){return Zf(t,e,n,$E,Lg(wb()),ga(t,2,-2),0,i)}function wx(t,e,n,i,s){return Zf(t,e,n,Dg,ga(t,0,i),ga(t,i+1,-1),i,s)}function JE(t,e,n){switch(Sb(t,e)){case 5103:return Nt+"print-"+t+t;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return Nt+t+t;case 4789:return Nl+t+t;case 5349:case 4246:case 4810:case 6968:case 2756:return Nt+t+Nl+t+$t+t+t;case 5936:switch(Mn(t,e+11)){case 114:return Nt+t+$t+_t(t,/[svh]\w+-[tblr]{2}/,"tb")+t;case 108:return Nt+t+$t+_t(t,/[svh]\w+-[tblr]{2}/,"tb-rl")+t;case 45:return Nt+t+$t+_t(t,/[svh]\w+-[tblr]{2}/,"lr")+t}case 6828:case 4268:case 2903:return Nt+t+$t+t+t;case 6165:return Nt+t+$t+"flex-"+t+t;case 5187:return Nt+t+_t(t,/(\w+).+(:[^]+)/,Nt+"box-$1$2"+$t+"flex-$1$2")+t;case 5443:return Nt+t+$t+"flex-item-"+_t(t,/flex-|-self/g,"")+(Ar(t,/flex-|baseline/)?"":$t+"grid-row-"+_t(t,/flex-|-self/g,""))+t;case 4675:return Nt+t+$t+"flex-line-pack"+_t(t,/align-content|flex-|-self/g,"")+t;case 5548:return Nt+t+$t+_t(t,"shrink","negative")+t;case 5292:return Nt+t+$t+_t(t,"basis","preferred-size")+t;case 6060:return Nt+"box-"+_t(t,"-grow","")+Nt+t+$t+_t(t,"grow","positive")+t;case 4554:return Nt+_t(t,/([^-])(transform)/g,"$1"+Nt+"$2")+t;case 6187:return _t(_t(_t(t,/(zoom-|grab)/,Nt+"$1"),/(image-set)/,Nt+"$1"),t,"")+t;case 5495:case 3959:return _t(t,/(image-set\([^]*)/,Nt+"$1$`$1");case 4968:return _t(_t(t,/(.+:)(flex-)?(.*)/,Nt+"box-pack:$3"+$t+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+Nt+t+t;case 4200:if(!Ar(t,/flex-|baseline/))return $t+"grid-column-align"+ga(t,e)+t;break;case 2592:case 3360:return $t+_t(t,"template-","")+t;case 4384:case 3616:return n&&n.some(function(i,s){return e=s,Ar(i.props,/grid-\w+-end/)})?~mf(t+(n=n[e].value),"span",0)?t:$t+_t(t,"-start","")+t+$t+"grid-row-span:"+(~mf(n,"span",0)?Ar(n,/\d+/):+Ar(n,/\d+/)-+Ar(t,/\d+/))+";":$t+_t(t,"-start","")+t;case 4896:case 4128:return n&&n.some(function(i){return Ar(i.props,/grid-\w+-start/)})?t:$t+_t(_t(t,"-end","-span"),"span ","")+t;case 4095:case 3583:case 4068:case 2532:return _t(t,/(.+)-inline(.+)/,Nt+"$1$2")+t;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(Qi(t)-1-e>6)switch(Mn(t,e+1)){case 109:if(Mn(t,e+4)!==45)break;case 102:return _t(t,/(.+:)(.+)-([^]+)/,"$1"+Nt+"$2-$3$1"+Nl+(Mn(t,e+3)==108?"$3":"$2-$3"))+t;case 115:return~mf(t,"stretch",0)?JE(_t(t,"stretch","fill-available"),e,n)+t:t}break;case 5152:case 5920:return _t(t,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(i,s,a,l,u,f,d){return $t+s+":"+a+d+(l?$t+s+"-span:"+(u?f:+f-+a)+d:"")+t});case 4949:if(Mn(t,e+6)===121)return _t(t,":",":"+Nt)+t;break;case 6444:switch(Mn(t,Mn(t,14)===45?18:11)){case 120:return _t(t,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+Nt+(Mn(t,14)===45?"inline-":"")+"box$3$1"+Nt+"$2$3$1"+$t+"$2box$3")+t;case 100:return _t(t,":",":"+$t)+t}break;case 5719:case 2647:case 2135:case 3927:case 2391:return _t(t,"scroll-","scroll-snap-")+t}return t}function Df(t,e){for(var n="",i=0;i<t.length;i++)n+=e(t[i],i,t,e)||"";return n}function Ib(t,e,n,i){switch(t.type){case _b:if(t.children.length)break;case xb:case Dg:return t.return=t.return||t.value;case $E:return"";case qE:return t.return=t.value+"{"+Df(t.children,i)+"}";case Yf:if(!Qi(t.value=t.props.join(",")))return""}return Qi(n=Df(t.children,i))?t.return=t.value+"{"+n+"}":""}function kb(t){var e=ZE(t);return function(n,i,s,a){for(var l="",u=0;u<e;u++)l+=t[u](n,i,s,a)||"";return l}}function Nb(t){return function(e){e.root||(e=e.return)&&t(e)}}function Ub(t,e,n,i){if(t.length>-1&&!t.return)switch(t.type){case Dg:t.return=JE(t.value,t.length,n);return;case qE:return Df([gs(t,{value:_t(t.value,"@","@"+Nt)})],i);case Yf:if(t.length)return Eb(n=t.props,function(s){switch(Ar(s,i=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":zo(gs(t,{props:[_t(s,/:(read-\w+)/,":"+Nl+"$1")]})),zo(gs(t,{props:[s]})),rm(t,{props:Sx(n,i)});break;case"::placeholder":zo(gs(t,{props:[_t(s,/:(plac\w+)/,":"+Nt+"input-$1")]})),zo(gs(t,{props:[_t(s,/:(plac\w+)/,":"+Nl+"$1")]})),zo(gs(t,{props:[_t(s,/:(plac\w+)/,$t+"input-$1")]})),zo(gs(t,{props:[s]})),rm(t,{props:Sx(n,i)});break}return""})}}var Fb={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},di={},ya=typeof process<"u"&&di!==void 0&&(di.REACT_APP_SC_ATTR||di.SC_ATTR)||"data-styled",e1="active",t1="data-styled-version",Jf="6.1.14",Ig=`/*!sc*/
`,Lf=typeof window<"u"&&"HTMLElement"in window,Ob=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&di!==void 0&&di.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&di.REACT_APP_SC_DISABLE_SPEEDY!==""?di.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&di.REACT_APP_SC_DISABLE_SPEEDY:typeof process<"u"&&di!==void 0&&di.SC_DISABLE_SPEEDY!==void 0&&di.SC_DISABLE_SPEEDY!==""&&di.SC_DISABLE_SPEEDY!=="false"&&di.SC_DISABLE_SPEEDY),ed=Object.freeze([]),xa=Object.freeze({});function Bb(t,e,n){return n===void 0&&(n=xa),t.theme!==n.theme&&t.theme||e||n.theme}var n1=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),zb=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,Vb=/(^-|-$)/g;function Mx(t){return t.replace(zb,"-").replace(Vb,"")}var Hb=/(a)(d)/gi,Mc=52,Tx=function(t){return String.fromCharCode(t+(t>25?39:97))};function am(t){var e,n="";for(e=Math.abs(t);e>Mc;e=e/Mc|0)n=Tx(e%Mc)+n;return(Tx(e%Mc)+n).replace(Hb,"$1-$2")}var Qh,i1=5381,ia=function(t,e){for(var n=e.length;n;)t=33*t^e.charCodeAt(--n);return t},r1=function(t){return ia(i1,t)};function s1(t){return am(r1(t)>>>0)}function Gb(t){return t.displayName||t.name||"Component"}function Jh(t){return typeof t=="string"&&!0}var o1=typeof Symbol=="function"&&Symbol.for,a1=o1?Symbol.for("react.memo"):60115,Wb=o1?Symbol.for("react.forward_ref"):60112,jb={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},Xb={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},l1={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},$b=((Qh={})[Wb]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},Qh[a1]=l1,Qh);function Ax(t){return("type"in(e=t)&&e.type.$$typeof)===a1?l1:"$$typeof"in t?$b[t.$$typeof]:jb;var e}var qb=Object.defineProperty,Yb=Object.getOwnPropertyNames,Cx=Object.getOwnPropertySymbols,Kb=Object.getOwnPropertyDescriptor,Zb=Object.getPrototypeOf,bx=Object.prototype;function u1(t,e,n){if(typeof e!="string"){if(bx){var i=Zb(e);i&&i!==bx&&u1(t,i,n)}var s=Yb(e);Cx&&(s=s.concat(Cx(e)));for(var a=Ax(t),l=Ax(e),u=0;u<s.length;++u){var f=s[u];if(!(f in Xb||n&&n[f]||l&&f in l||a&&f in a)){var d=Kb(e,f);try{qb(t,f,d)}catch{}}}}return t}function _a(t){return typeof t=="function"}function kg(t){return typeof t=="object"&&"styledComponentId"in t}function no(t,e){return t&&e?"".concat(t," ").concat(e):t||e||""}function lm(t,e){if(t.length===0)return"";for(var n=t[0],i=1;i<t.length;i++)n+=t[i];return n}function jl(t){return t!==null&&typeof t=="object"&&t.constructor.name===Object.name&&!("props"in t&&t.$$typeof)}function um(t,e,n){if(n===void 0&&(n=!1),!n&&!jl(t)&&!Array.isArray(t))return e;if(Array.isArray(e))for(var i=0;i<e.length;i++)t[i]=um(t[i],e[i]);else if(jl(e))for(var i in e)t[i]=um(t[i],e[i]);return t}function Ng(t,e){Object.defineProperty(t,"toString",{value:e})}function nu(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(t," for more information.").concat(e.length>0?" Args: ".concat(e.join(", ")):""))}var Qb=function(){function t(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e}return t.prototype.indexOfGroup=function(e){for(var n=0,i=0;i<e;i++)n+=this.groupSizes[i];return n},t.prototype.insertRules=function(e,n){if(e>=this.groupSizes.length){for(var i=this.groupSizes,s=i.length,a=s;e>=a;)if((a<<=1)<0)throw nu(16,"".concat(e));this.groupSizes=new Uint32Array(a),this.groupSizes.set(i),this.length=a;for(var l=s;l<a;l++)this.groupSizes[l]=0}for(var u=this.indexOfGroup(e+1),f=(l=0,n.length);l<f;l++)this.tag.insertRule(u,n[l])&&(this.groupSizes[e]++,u++)},t.prototype.clearGroup=function(e){if(e<this.length){var n=this.groupSizes[e],i=this.indexOfGroup(e),s=i+n;this.groupSizes[e]=0;for(var a=i;a<s;a++)this.tag.deleteRule(i)}},t.prototype.getGroup=function(e){var n="";if(e>=this.length||this.groupSizes[e]===0)return n;for(var i=this.groupSizes[e],s=this.indexOfGroup(e),a=s+i,l=s;l<a;l++)n+="".concat(this.tag.getRule(l)).concat(Ig);return n},t}(),yf=new Map,If=new Map,xf=1,Tc=function(t){if(yf.has(t))return yf.get(t);for(;If.has(xf);)xf++;var e=xf++;return yf.set(t,e),If.set(e,t),e},Jb=function(t,e){xf=e+1,yf.set(t,e),If.set(e,t)},eR="style[".concat(ya,"][").concat(t1,'="').concat(Jf,'"]'),tR=new RegExp("^".concat(ya,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),nR=function(t,e,n){for(var i,s=n.split(","),a=0,l=s.length;a<l;a++)(i=s[a])&&t.registerName(e,i)},iR=function(t,e){for(var n,i=((n=e.textContent)!==null&&n!==void 0?n:"").split(Ig),s=[],a=0,l=i.length;a<l;a++){var u=i[a].trim();if(u){var f=u.match(tR);if(f){var d=0|parseInt(f[1],10),h=f[2];d!==0&&(Jb(h,d),nR(t,h,f[3]),t.getTag().insertRules(d,s)),s.length=0}else s.push(u)}}},Rx=function(t){for(var e=document.querySelectorAll(eR),n=0,i=e.length;n<i;n++){var s=e[n];s&&s.getAttribute(ya)!==e1&&(iR(t,s),s.parentNode&&s.parentNode.removeChild(s))}};function rR(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null}var c1=function(t){var e=document.head,n=t||e,i=document.createElement("style"),s=function(u){var f=Array.from(u.querySelectorAll("style[".concat(ya,"]")));return f[f.length-1]}(n),a=s!==void 0?s.nextSibling:null;i.setAttribute(ya,e1),i.setAttribute(t1,Jf);var l=rR();return l&&i.setAttribute("nonce",l),n.insertBefore(i,a),i},sR=function(){function t(e){this.element=c1(e),this.element.appendChild(document.createTextNode("")),this.sheet=function(n){if(n.sheet)return n.sheet;for(var i=document.styleSheets,s=0,a=i.length;s<a;s++){var l=i[s];if(l.ownerNode===n)return l}throw nu(17)}(this.element),this.length=0}return t.prototype.insertRule=function(e,n){try{return this.sheet.insertRule(n,e),this.length++,!0}catch{return!1}},t.prototype.deleteRule=function(e){this.sheet.deleteRule(e),this.length--},t.prototype.getRule=function(e){var n=this.sheet.cssRules[e];return n&&n.cssText?n.cssText:""},t}(),oR=function(){function t(e){this.element=c1(e),this.nodes=this.element.childNodes,this.length=0}return t.prototype.insertRule=function(e,n){if(e<=this.length&&e>=0){var i=document.createTextNode(n);return this.element.insertBefore(i,this.nodes[e]||null),this.length++,!0}return!1},t.prototype.deleteRule=function(e){this.element.removeChild(this.nodes[e]),this.length--},t.prototype.getRule=function(e){return e<this.length?this.nodes[e].textContent:""},t}(),aR=function(){function t(e){this.rules=[],this.length=0}return t.prototype.insertRule=function(e,n){return e<=this.length&&(this.rules.splice(e,0,n),this.length++,!0)},t.prototype.deleteRule=function(e){this.rules.splice(e,1),this.length--},t.prototype.getRule=function(e){return e<this.length?this.rules[e]:""},t}(),Px=Lf,lR={isServer:!Lf,useCSSOMInjection:!Ob},f1=function(){function t(e,n,i){e===void 0&&(e=xa),n===void 0&&(n={});var s=this;this.options=ti(ti({},lR),e),this.gs=n,this.names=new Map(i),this.server=!!e.isServer,!this.server&&Lf&&Px&&(Px=!1,Rx(this)),Ng(this,function(){return function(a){for(var l=a.getTag(),u=l.length,f="",d=function(m){var g=function(y){return If.get(y)}(m);if(g===void 0)return"continue";var v=a.names.get(g),E=l.getGroup(m);if(v===void 0||!v.size||E.length===0)return"continue";var w="".concat(ya,".g").concat(m,'[id="').concat(g,'"]'),_="";v!==void 0&&v.forEach(function(y){y.length>0&&(_+="".concat(y,","))}),f+="".concat(E).concat(w,'{content:"').concat(_,'"}').concat(Ig)},h=0;h<u;h++)d(h);return f}(s)})}return t.registerId=function(e){return Tc(e)},t.prototype.rehydrate=function(){!this.server&&Lf&&Rx(this)},t.prototype.reconstructWithOptions=function(e,n){return n===void 0&&(n=!0),new t(ti(ti({},this.options),e),this.gs,n&&this.names||void 0)},t.prototype.allocateGSInstance=function(e){return this.gs[e]=(this.gs[e]||0)+1},t.prototype.getTag=function(){return this.tag||(this.tag=(e=function(n){var i=n.useCSSOMInjection,s=n.target;return n.isServer?new aR(s):i?new sR(s):new oR(s)}(this.options),new Qb(e)));var e},t.prototype.hasNameForId=function(e,n){return this.names.has(e)&&this.names.get(e).has(n)},t.prototype.registerName=function(e,n){if(Tc(e),this.names.has(e))this.names.get(e).add(n);else{var i=new Set;i.add(n),this.names.set(e,i)}},t.prototype.insertRules=function(e,n,i){this.registerName(e,n),this.getTag().insertRules(Tc(e),i)},t.prototype.clearNames=function(e){this.names.has(e)&&this.names.get(e).clear()},t.prototype.clearRules=function(e){this.getTag().clearGroup(Tc(e)),this.clearNames(e)},t.prototype.clearTag=function(){this.tag=void 0},t}(),uR=/&/g,cR=/^\s*\/\/.*$/gm;function d1(t,e){return t.map(function(n){return n.type==="rule"&&(n.value="".concat(e," ").concat(n.value),n.value=n.value.replaceAll(",",",".concat(e," ")),n.props=n.props.map(function(i){return"".concat(e," ").concat(i)})),Array.isArray(n.children)&&n.type!=="@keyframes"&&(n.children=d1(n.children,e)),n})}function fR(t){var e,n,i,s=xa,a=s.options,l=a===void 0?xa:a,u=s.plugins,f=u===void 0?ed:u,d=function(g,v,E){return E.startsWith(n)&&E.endsWith(n)&&E.replaceAll(n,"").length>0?".".concat(e):g},h=f.slice();h.push(function(g){g.type===Yf&&g.value.includes("&")&&(g.props[0]=g.props[0].replace(uR,n).replace(i,d))}),l.prefix&&h.push(Ub),h.push(Ib);var m=function(g,v,E,w){v===void 0&&(v=""),E===void 0&&(E=""),w===void 0&&(w="&"),e=w,n=v,i=new RegExp("\\".concat(n,"\\b"),"g");var _=g.replace(cR,""),y=Db(E||v?"".concat(E," ").concat(v," { ").concat(_," }"):_);l.namespace&&(y=d1(y,l.namespace));var M=[];return Df(y,kb(h.concat(Nb(function(T){return M.push(T)})))),M};return m.hash=f.length?f.reduce(function(g,v){return v.name||nu(15),ia(g,v.name)},i1).toString():"",m}var dR=new f1,cm=fR(),h1=ma.createContext({shouldForwardProp:void 0,styleSheet:dR,stylis:cm});h1.Consumer;ma.createContext(void 0);function Dx(){return $.useContext(h1)}var p1=function(){function t(e,n){var i=this;this.inject=function(s,a){a===void 0&&(a=cm);var l=i.name+a.hash;s.hasNameForId(i.id,l)||s.insertRules(i.id,l,a(i.rules,l,"@keyframes"))},this.name=e,this.id="sc-keyframes-".concat(e),this.rules=n,Ng(this,function(){throw nu(12,String(i.name))})}return t.prototype.getName=function(e){return e===void 0&&(e=cm),this.name+e.hash},t}(),hR=function(t){return t>="A"&&t<="Z"};function Lx(t){for(var e="",n=0;n<t.length;n++){var i=t[n];if(n===1&&i==="-"&&t[0]==="-")return t;hR(i)?e+="-"+i.toLowerCase():e+=i}return e.startsWith("ms-")?"-"+e:e}var m1=function(t){return t==null||t===!1||t===""},g1=function(t){var e,n,i=[];for(var s in t){var a=t[s];t.hasOwnProperty(s)&&!m1(a)&&(Array.isArray(a)&&a.isCss||_a(a)?i.push("".concat(Lx(s),":"),a,";"):jl(a)?i.push.apply(i,Wl(Wl(["".concat(s," {")],g1(a),!1),["}"],!1)):i.push("".concat(Lx(s),": ").concat((e=s,(n=a)==null||typeof n=="boolean"||n===""?"":typeof n!="number"||n===0||e in Fb||e.startsWith("--")?String(n).trim():"".concat(n,"px")),";")))}return i};function ao(t,e,n,i){if(m1(t))return[];if(kg(t))return[".".concat(t.styledComponentId)];if(_a(t)){if(!_a(a=t)||a.prototype&&a.prototype.isReactComponent||!e)return[t];var s=t(e);return ao(s,e,n,i)}var a;return t instanceof p1?n?(t.inject(n,i),[t.getName(i)]):[t]:jl(t)?g1(t):Array.isArray(t)?Array.prototype.concat.apply(ed,t.map(function(l){return ao(l,e,n,i)})):[t.toString()]}function pR(t){for(var e=0;e<t.length;e+=1){var n=t[e];if(_a(n)&&!kg(n))return!1}return!0}var mR=r1(Jf),gR=function(){function t(e,n,i){this.rules=e,this.staticRulesId="",this.isStatic=(i===void 0||i.isStatic)&&pR(e),this.componentId=n,this.baseHash=ia(mR,n),this.baseStyle=i,f1.registerId(n)}return t.prototype.generateAndInjectStyles=function(e,n,i){var s=this.baseStyle?this.baseStyle.generateAndInjectStyles(e,n,i):"";if(this.isStatic&&!i.hash)if(this.staticRulesId&&n.hasNameForId(this.componentId,this.staticRulesId))s=no(s,this.staticRulesId);else{var a=lm(ao(this.rules,e,n,i)),l=am(ia(this.baseHash,a)>>>0);if(!n.hasNameForId(this.componentId,l)){var u=i(a,".".concat(l),void 0,this.componentId);n.insertRules(this.componentId,l,u)}s=no(s,l),this.staticRulesId=l}else{for(var f=ia(this.baseHash,i.hash),d="",h=0;h<this.rules.length;h++){var m=this.rules[h];if(typeof m=="string")d+=m;else if(m){var g=lm(ao(m,e,n,i));f=ia(f,g+h),d+=g}}if(d){var v=am(f>>>0);n.hasNameForId(this.componentId,v)||n.insertRules(this.componentId,v,i(d,".".concat(v),void 0,this.componentId)),s=no(s,v)}}return s},t}(),v1=ma.createContext(void 0);v1.Consumer;var ep={};function vR(t,e,n){var i=kg(t),s=t,a=!Jh(t),l=e.attrs,u=l===void 0?ed:l,f=e.componentId,d=f===void 0?function(C,N){var b=typeof C!="string"?"sc":Mx(C);ep[b]=(ep[b]||0)+1;var k="".concat(b,"-").concat(s1(Jf+b+ep[b]));return N?"".concat(N,"-").concat(k):k}(e.displayName,e.parentComponentId):f,h=e.displayName,m=h===void 0?function(C){return Jh(C)?"styled.".concat(C):"Styled(".concat(Gb(C),")")}(t):h,g=e.displayName&&e.componentId?"".concat(Mx(e.displayName),"-").concat(e.componentId):e.componentId||d,v=i&&s.attrs?s.attrs.concat(u).filter(Boolean):u,E=e.shouldForwardProp;if(i&&s.shouldForwardProp){var w=s.shouldForwardProp;if(e.shouldForwardProp){var _=e.shouldForwardProp;E=function(C,N){return w(C,N)&&_(C,N)}}else E=w}var y=new gR(n,g,i?s.componentStyle:void 0);function M(C,N){return function(b,k,B){var L=b.attrs,R=b.componentStyle,O=b.defaultProps,Z=b.foldedComponentIds,X=b.styledComponentId,J=b.target,ne=ma.useContext(v1),le=Dx(),re=b.shouldForwardProp||le.shouldForwardProp,G=Bb(k,ne,O)||xa,ue=function(ge,ye,Se){for(var Re,Le=ti(ti({},ye),{className:void 0,theme:Se}),$e=0;$e<ge.length;$e+=1){var St=_a(Re=ge[$e])?Re(Le):Re;for(var at in St)Le[at]=at==="className"?no(Le[at],St[at]):at==="style"?ti(ti({},Le[at]),St[at]):St[at]}return ye.className&&(Le.className=no(Le.className,ye.className)),Le}(L,k,G),D=ue.as||J,V={};for(var ie in ue)ue[ie]===void 0||ie[0]==="$"||ie==="as"||ie==="theme"&&ue.theme===G||(ie==="forwardedAs"?V.as=ue.forwardedAs:re&&!re(ie,D)||(V[ie]=ue[ie]));var U=function(ge,ye){var Se=Dx(),Re=ge.generateAndInjectStyles(ye,Se.styleSheet,Se.stylis);return Re}(R,ue),ee=no(Z,X);return U&&(ee+=" "+U),ue.className&&(ee+=" "+ue.className),V[Jh(D)&&!n1.has(D)?"class":"className"]=ee,B&&(V.ref=B),$.createElement(D,V)}(T,C,N)}M.displayName=m;var T=ma.forwardRef(M);return T.attrs=v,T.componentStyle=y,T.displayName=m,T.shouldForwardProp=E,T.foldedComponentIds=i?no(s.foldedComponentIds,s.styledComponentId):"",T.styledComponentId=g,T.target=i?s.target:t,Object.defineProperty(T,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(C){this._foldedDefaultProps=i?function(N){for(var b=[],k=1;k<arguments.length;k++)b[k-1]=arguments[k];for(var B=0,L=b;B<L.length;B++)um(N,L[B],!0);return N}({},s.defaultProps,C):C}}),Ng(T,function(){return".".concat(T.styledComponentId)}),a&&u1(T,t,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),T}function Ix(t,e){for(var n=[t[0]],i=0,s=e.length;i<s;i+=1)n.push(e[i],t[i+1]);return n}var kx=function(t){return Object.assign(t,{isCss:!0})};function y1(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];if(_a(t)||jl(t))return kx(ao(Ix(ed,Wl([t],e,!0))));var i=t;return e.length===0&&i.length===1&&typeof i[0]=="string"?ao(i):kx(ao(Ix(i,e)))}function fm(t,e,n){if(n===void 0&&(n=xa),!e)throw nu(1,e);var i=function(s){for(var a=[],l=1;l<arguments.length;l++)a[l-1]=arguments[l];return t(e,n,y1.apply(void 0,Wl([s],a,!1)))};return i.attrs=function(s){return fm(t,e,ti(ti({},n),{attrs:Array.prototype.concat(n.attrs,s).filter(Boolean)}))},i.withConfig=function(s){return fm(t,e,ti(ti({},n),s))},i}var x1=function(t){return fm(vR,t)},Ve=x1;n1.forEach(function(t){Ve[t]=x1(t)});function ka(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];var i=lm(y1.apply(void 0,Wl([t],e,!1))),s=s1(i);return new p1(s,i)}const yR=Ve.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
`,xR=Ve.div`
    display: flex;
`,_R=Ve.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`,SR=Ve.ul`
    display: flex;
    flex-direction: column;
    gap: 50px;
    list-style: none;
`,Ac=Ve.li`
    color: rgba(255, 255, 255, 0.7);
    font-size: 12px;
    font-family: 'ade';
    letter-spacing: 5px;
    cursor: pointer;
    transition: color .3s ease-in;
    &:hover {
        color: white;
    }
`,ER=()=>{const t=zr(),e=()=>{t("/about")},n=()=>{t("/projects")};return he.jsx(yR,{children:he.jsx(xR,{children:he.jsx(_R,{children:he.jsxs(SR,{children:[he.jsx(Ac,{onClick:e,children:"ABOUT"}),he.jsx(Ac,{onClick:n,children:"PROJECTS"}),he.jsx(Ac,{children:"ARCHIVE"}),he.jsx(Ac,{children:"CONTACT"})]})})})})},wR=Ve.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`,MR=Ve.div`
  height: 100%;
  width: 50%;
  display: flex;
  justify-content: space-between;
`;Ve.div`
  display: flex;
  flex: 4;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  padding: 60px;
`;const TR=Ve.div`
  display: flex;
  flex: 5;
  align-items: center;
  position: relative;
  right: -55%;
  top: 10%;
`,AR=Ve.div`
  position: fixed;
  width: 100%;
  left: 45px;
  top: 50px;
`,CR=Ve.h1`
    font-family: 'work sans';
    font-weight: 300;
    font-size: 36px;
    transform: translateX(15px);
    letter-spacing: 2px;
    transform-origin: 0 0;
    transition: transform 0.5s, color 0.3s ease-in-out;
    color: rgba(255, 255, 255, .7);
        &:hover {
        transform: scale(1.01);
        color: white;
    }
    // transform: scale(1,1.1) skew(-2deg) translateX(0.5%);
`,bR=Ve.div`
  position: absolute;
  color: rgba(255, 255, 255, 0.7);
  padding: 100px;
  top: 50%;
  font-size: 16px;
  font-family: 'ade';
  letter-spacing: 2px;
  line-height: 1.5;
  border-radius: 10px;
`,RR=()=>{const t=zr(),e=()=>{t("/")};return he.jsxs(wR,{children:[he.jsx(AR,{children:he.jsx(CR,{onClick:e,children:"johnny sheng's about"})}),he.jsx(MR,{children:he.jsx(TR,{children:he.jsx(bR,{children:" Hi, i'm johnny and i practically do a little bit of everything in this world... I love to travel, eat, and failing more than poeple try. I am just using this as filler so i can see where i can position this Container "})})})]})},PR=ka`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
`,DR=Ve.main`
  width: min(1460px, 100vw);
  margin: auto;
  transform: translateX(-4.2%);
`,LR=Ve.div`
  display: flex;
  width: 100%;
  height: var(--height);
  overflow: hidden;
  mask-image: linear-gradient(to right, transparent, #000 70%, #000 100%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, #000 30%, #000 60%, transparent);
`,IR=Ve.div`
  display: flex;
  align-items: left;
  animation: ${PR} 12s linear infinite; 
  white-space: nowrap; 
  
`,kR=Ve.div`
  width: var(--width);
  height: var(--height);
  display: flex;
  flex-direction: column; 
  justify-content: center; 
  align-items: center; 
  font-family: "Ade", sans-serif;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 7px;
  font-size: 20px;
  text-align: center;
  padding: 0 40px; 
`,Nx=Ve.div`
  font-size: 12px;
  font-family: "ade";
  color: rgba(255, 255, 255, 0.2);
  margin-bottom: 20px; 
  margin-top: 20px; 
`,NR=()=>{const t=["DESIGNER","BATMANN","FILMMAKER","SEXYBABE","DIRECTOR","DEVELOPER","BIG-EATER","MUNCHER"],i=[...t,...t];return he.jsx(DR,{children:he.jsx(LR,{style:{"--height":"150px"},children:he.jsx(IR,{style:{"--width":"150px"},children:i.map((s,a)=>he.jsxs(kR,{style:{"--width":"150px","--height":"150px","--position":a+1},children:[he.jsx(Nx,{children:"xxxxxxxx____+-=_=-++___++-!!!+-=___=-+!!!!++++=_!!+=-xxxxx+=-=-____+-=_=-++___++-!!!+-=-------+!++++=_=_!!!--------------"}),s,he.jsx(Nx,{children:"____-+_+-!!=_+=+=-=-____+-=_=-__++-!!!+-=___=-+!!!!+++=!!!==-=++=!!!_!!=_+=-=-!!+-=_=-===----_=_=_=-=-+-=_=-=___"})]},a))})})})},UR=Ve.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`,FR=Ve.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
`,OR=Ve.div`
    display: flex;
    flex: 4;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    padding: 60px;
`,BR=Ve.div`
    display: flex;
    flex: 5;
    align-items: center;
    position: relative;
`;Ve.img`
    height: 300px;
    object-fit: contain;
    margin: auto;
    animation: shake 2s infinite ease alternate;

    @keyframes shake {
    100%{
       transform: translateY(30px);
        }
    }
`;const zR=Ve.div`
    position: fixed;
    width: 100%;
    left: 45px;
    top: 50px;
`,_1=Ve.h1`
    font-family: 'work sans';
    font-weight: 300;
    font-size: 36px;
    transform: translateX(15px);
    letter-spacing: 2px;
    color: rgba(255, 255, 255, .7);
    // transform: scale(1,1.1) skew(-2deg) translateX(0.5%);
`;Ve(_1)`
    color: rgba(255, 255, 255, .6 );
    transform: scale(1, -3);
    filter: blur(3px);
    position: relative;
    top: -25px;
`;Ve.h3`
    font-size: 24px;
`;Ve.p`
font-size: 16px;
`;Ve.button`
    padding: 10px;
    width: 100px;
    color: black;
    background-color: grey;
    border: none;
    cursor: pointer;
    border-radius: 10px;
`;const VR=()=>he.jsxs(UR,{children:[he.jsxs(zR,{children:[he.jsx(_1,{children:" johnny sheng's portfolio"}),he.jsx(NR,{})]}),he.jsxs(FR,{children:[he.jsx(OR,{}),he.jsx(BR,{})]})]}),Ug=$.createContext({});function Fg(t){const e=$.useRef(null);return e.current===null&&(e.current=t()),e.current}const td=$.createContext(null),Og=$.createContext({transformPagePoint:t=>t,isStatic:!1,reducedMotion:"never"});class HR extends $.Component{getSnapshotBeforeUpdate(e){const n=this.props.childRef.current;if(n&&e.isPresent&&!this.props.isPresent){const i=this.props.sizeRef.current;i.height=n.offsetHeight||0,i.width=n.offsetWidth||0,i.top=n.offsetTop,i.left=n.offsetLeft}return null}componentDidUpdate(){}render(){return this.props.children}}function GR({children:t,isPresent:e}){const n=$.useId(),i=$.useRef(null),s=$.useRef({width:0,height:0,top:0,left:0}),{nonce:a}=$.useContext(Og);return $.useInsertionEffect(()=>{const{width:l,height:u,top:f,left:d}=s.current;if(e||!i.current||!l||!u)return;i.current.dataset.motionPopId=n;const h=document.createElement("style");return a&&(h.nonce=a),document.head.appendChild(h),h.sheet&&h.sheet.insertRule(`
          [data-motion-pop-id="${n}"] {
            position: absolute !important;
            width: ${l}px !important;
            height: ${u}px !important;
            top: ${f}px !important;
            left: ${d}px !important;
          }
        `),()=>{document.head.removeChild(h)}},[e]),he.jsx(HR,{isPresent:e,childRef:i,sizeRef:s,children:$.cloneElement(t,{ref:i})})}const WR=({children:t,initial:e,isPresent:n,onExitComplete:i,custom:s,presenceAffectsLayout:a,mode:l})=>{const u=Fg(jR),f=$.useId(),d=$.useCallback(m=>{u.set(m,!0);for(const g of u.values())if(!g)return;i&&i()},[u,i]),h=$.useMemo(()=>({id:f,initial:e,isPresent:n,custom:s,onExitComplete:d,register:m=>(u.set(m,!1),()=>u.delete(m))}),a?[Math.random(),d]:[n,d]);return $.useMemo(()=>{u.forEach((m,g)=>u.set(g,!1))},[n]),$.useEffect(()=>{!n&&!u.size&&i&&i()},[n]),l==="popLayout"&&(t=he.jsx(GR,{isPresent:n,children:t})),he.jsx(td.Provider,{value:h,children:t})};function jR(){return new Map}function S1(t=!0){const e=$.useContext(td);if(e===null)return[!0,null];const{isPresent:n,onExitComplete:i,register:s}=e,a=$.useId();$.useEffect(()=>{t&&s(a)},[t]);const l=$.useCallback(()=>t&&i&&i(a),[a,i,t]);return!n&&i?[!1,l]:[!0]}const Cc=t=>t.key||"";function Ux(t){const e=[];return $.Children.forEach(t,n=>{$.isValidElement(n)&&e.push(n)}),e}const Bg=typeof window<"u",E1=Bg?$.useLayoutEffect:$.useEffect,XR=({children:t,custom:e,initial:n=!0,onExitComplete:i,presenceAffectsLayout:s=!0,mode:a="sync",propagate:l=!1})=>{const[u,f]=S1(l),d=$.useMemo(()=>Ux(t),[t]),h=l&&!u?[]:d.map(Cc),m=$.useRef(!0),g=$.useRef(d),v=Fg(()=>new Map),[E,w]=$.useState(d),[_,y]=$.useState(d);E1(()=>{m.current=!1,g.current=d;for(let C=0;C<_.length;C++){const N=Cc(_[C]);h.includes(N)?v.delete(N):v.get(N)!==!0&&v.set(N,!1)}},[_,h.length,h.join("-")]);const M=[];if(d!==E){let C=[...d];for(let N=0;N<_.length;N++){const b=_[N],k=Cc(b);h.includes(k)||(C.splice(N,0,b),M.push(b))}a==="wait"&&M.length&&(C=M),y(Ux(C)),w(d);return}const{forceRender:T}=$.useContext(Ug);return he.jsx(he.Fragment,{children:_.map(C=>{const N=Cc(C),b=l&&!u?!1:d===_||h.includes(N),k=()=>{if(v.has(N))v.set(N,!0);else return;let B=!0;v.forEach(L=>{L||(B=!1)}),B&&(T==null||T(),y(g.current),l&&(f==null||f()),i&&i())};return he.jsx(WR,{isPresent:b,initial:!m.current||n?void 0:!1,custom:b?void 0:e,presenceAffectsLayout:s,mode:a,onExitComplete:b?void 0:k,children:C},N)})})},pi=t=>t;let dm=pi;function zg(t){let e;return()=>(e===void 0&&(e=t()),e)}const Sa=(t,e,n)=>{const i=e-t;return i===0?1:(n-t)/i},Dr=t=>t*1e3,Lr=t=>t/1e3,$R={skipAnimations:!1,useManualTiming:!1};function qR(t){let e=new Set,n=new Set,i=!1,s=!1;const a=new WeakSet;let l={delta:0,timestamp:0,isProcessing:!1};function u(d){a.has(d)&&(f.schedule(d),t()),d(l)}const f={schedule:(d,h=!1,m=!1)=>{const v=m&&i?e:n;return h&&a.add(d),v.has(d)||v.add(d),d},cancel:d=>{n.delete(d),a.delete(d)},process:d=>{if(l=d,i){s=!0;return}i=!0,[e,n]=[n,e],e.forEach(u),e.clear(),i=!1,s&&(s=!1,f.process(d))}};return f}const bc=["read","resolveKeyframes","update","preRender","render","postRender"],YR=40;function w1(t,e){let n=!1,i=!0;const s={delta:0,timestamp:0,isProcessing:!1},a=()=>n=!0,l=bc.reduce((y,M)=>(y[M]=qR(a),y),{}),{read:u,resolveKeyframes:f,update:d,preRender:h,render:m,postRender:g}=l,v=()=>{const y=performance.now();n=!1,s.delta=i?1e3/60:Math.max(Math.min(y-s.timestamp,YR),1),s.timestamp=y,s.isProcessing=!0,u.process(s),f.process(s),d.process(s),h.process(s),m.process(s),g.process(s),s.isProcessing=!1,n&&e&&(i=!1,t(v))},E=()=>{n=!0,i=!0,s.isProcessing||t(v)};return{schedule:bc.reduce((y,M)=>{const T=l[M];return y[M]=(C,N=!1,b=!1)=>(n||E(),T.schedule(C,N,b)),y},{}),cancel:y=>{for(let M=0;M<bc.length;M++)l[bc[M]].cancel(y)},state:s,steps:l}}const{schedule:qt,cancel:Es,state:bn,steps:tp}=w1(typeof requestAnimationFrame<"u"?requestAnimationFrame:pi,!0),M1=$.createContext({strict:!1}),Fx={animation:["animate","variants","whileHover","whileTap","exit","whileInView","whileFocus","whileDrag"],exit:["exit"],drag:["drag","dragControls"],focus:["whileFocus"],hover:["whileHover","onHoverStart","onHoverEnd"],tap:["whileTap","onTap","onTapStart","onTapCancel"],pan:["onPan","onPanStart","onPanSessionStart","onPanEnd"],inView:["whileInView","onViewportEnter","onViewportLeave"],layout:["layout","layoutId"]},Ea={};for(const t in Fx)Ea[t]={isEnabled:e=>Fx[t].some(n=>!!e[n])};function KR(t){for(const e in t)Ea[e]={...Ea[e],...t[e]}}const ZR=new Set(["animate","exit","variants","initial","style","values","variants","transition","transformTemplate","custom","inherit","onBeforeLayoutMeasure","onAnimationStart","onAnimationComplete","onUpdate","onDragStart","onDrag","onDragEnd","onMeasureDragConstraints","onDirectionLock","onDragTransitionEnd","_dragX","_dragY","onHoverStart","onHoverEnd","onViewportEnter","onViewportLeave","globalTapTarget","ignoreStrict","viewport"]);function kf(t){return t.startsWith("while")||t.startsWith("drag")&&t!=="draggable"||t.startsWith("layout")||t.startsWith("onTap")||t.startsWith("onPan")||t.startsWith("onLayout")||ZR.has(t)}let T1=t=>!kf(t);function QR(t){t&&(T1=e=>e.startsWith("on")?!kf(e):t(e))}try{QR(require("@emotion/is-prop-valid").default)}catch{}function JR(t,e,n){const i={};for(const s in t)s==="values"&&typeof t.values=="object"||(T1(s)||n===!0&&kf(s)||!e&&!kf(s)||t.draggable&&s.startsWith("onDrag"))&&(i[s]=t[s]);return i}function eP(t){if(typeof Proxy>"u")return t;const e=new Map,n=(...i)=>t(...i);return new Proxy(n,{get:(i,s)=>s==="create"?t:(e.has(s)||e.set(s,t(s)),e.get(s))})}const nd=$.createContext({});function Xl(t){return typeof t=="string"||Array.isArray(t)}function id(t){return t!==null&&typeof t=="object"&&typeof t.start=="function"}const Vg=["animate","whileInView","whileFocus","whileHover","whileTap","whileDrag","exit"],Hg=["initial",...Vg];function rd(t){return id(t.animate)||Hg.some(e=>Xl(t[e]))}function A1(t){return!!(rd(t)||t.variants)}function tP(t,e){if(rd(t)){const{initial:n,animate:i}=t;return{initial:n===!1||Xl(n)?n:void 0,animate:Xl(i)?i:void 0}}return t.inherit!==!1?e:{}}function nP(t){const{initial:e,animate:n}=tP(t,$.useContext(nd));return $.useMemo(()=>({initial:e,animate:n}),[Ox(e),Ox(n)])}function Ox(t){return Array.isArray(t)?t.join(" "):t}const iP=Symbol.for("motionComponentSymbol");function ra(t){return t&&typeof t=="object"&&Object.prototype.hasOwnProperty.call(t,"current")}function rP(t,e,n){return $.useCallback(i=>{i&&t.onMount&&t.onMount(i),e&&(i?e.mount(i):e.unmount()),n&&(typeof n=="function"?n(i):ra(n)&&(n.current=i))},[e])}const Gg=t=>t.replace(/([a-z])([A-Z])/gu,"$1-$2").toLowerCase(),sP="framerAppearId",C1="data-"+Gg(sP),{schedule:Wg,cancel:R5}=w1(queueMicrotask,!1),b1=$.createContext({});function oP(t,e,n,i,s){var a,l;const{visualElement:u}=$.useContext(nd),f=$.useContext(M1),d=$.useContext(td),h=$.useContext(Og).reducedMotion,m=$.useRef(null);i=i||f.renderer,!m.current&&i&&(m.current=i(t,{visualState:e,parent:u,props:n,presenceContext:d,blockInitialAnimation:d?d.initial===!1:!1,reducedMotionConfig:h}));const g=m.current,v=$.useContext(b1);g&&!g.projection&&s&&(g.type==="html"||g.type==="svg")&&aP(m.current,n,s,v);const E=$.useRef(!1);$.useInsertionEffect(()=>{g&&E.current&&g.update(n,d)});const w=n[C1],_=$.useRef(!!w&&!(!((a=window.MotionHandoffIsComplete)===null||a===void 0)&&a.call(window,w))&&((l=window.MotionHasOptimisedAnimation)===null||l===void 0?void 0:l.call(window,w)));return E1(()=>{g&&(E.current=!0,window.MotionIsMounted=!0,g.updateFeatures(),Wg.render(g.render),_.current&&g.animationState&&g.animationState.animateChanges())}),$.useEffect(()=>{g&&(!_.current&&g.animationState&&g.animationState.animateChanges(),_.current&&(queueMicrotask(()=>{var y;(y=window.MotionHandoffMarkAsComplete)===null||y===void 0||y.call(window,w)}),_.current=!1))}),g}function aP(t,e,n,i){const{layoutId:s,layout:a,drag:l,dragConstraints:u,layoutScroll:f,layoutRoot:d}=e;t.projection=new n(t.latestValues,e["data-framer-portal-id"]?void 0:R1(t.parent)),t.projection.setOptions({layoutId:s,layout:a,alwaysMeasureLayout:!!l||u&&ra(u),visualElement:t,animationType:typeof a=="string"?a:"both",initialPromotionConfig:i,layoutScroll:f,layoutRoot:d})}function R1(t){if(t)return t.options.allowProjection!==!1?t.projection:R1(t.parent)}function lP({preloadedFeatures:t,createVisualElement:e,useRender:n,useVisualState:i,Component:s}){var a,l;t&&KR(t);function u(d,h){let m;const g={...$.useContext(Og),...d,layoutId:uP(d)},{isStatic:v}=g,E=nP(d),w=i(d,v);if(!v&&Bg){cP();const _=fP(g);m=_.MeasureLayout,E.visualElement=oP(s,w,g,e,_.ProjectionNode)}return he.jsxs(nd.Provider,{value:E,children:[m&&E.visualElement?he.jsx(m,{visualElement:E.visualElement,...g}):null,n(s,d,rP(w,E.visualElement,h),w,v,E.visualElement)]})}u.displayName=`motion.${typeof s=="string"?s:`create(${(l=(a=s.displayName)!==null&&a!==void 0?a:s.name)!==null&&l!==void 0?l:""})`}`;const f=$.forwardRef(u);return f[iP]=s,f}function uP({layoutId:t}){const e=$.useContext(Ug).id;return e&&t!==void 0?e+"-"+t:t}function cP(t,e){$.useContext(M1).strict}function fP(t){const{drag:e,layout:n}=Ea;if(!e&&!n)return{};const i={...e,...n};return{MeasureLayout:e!=null&&e.isEnabled(t)||n!=null&&n.isEnabled(t)?i.MeasureLayout:void 0,ProjectionNode:i.ProjectionNode}}const dP=["animate","circle","defs","desc","ellipse","g","image","line","filter","marker","mask","metadata","path","pattern","polygon","polyline","rect","stop","switch","symbol","svg","text","tspan","use","view"];function jg(t){return typeof t!="string"||t.includes("-")?!1:!!(dP.indexOf(t)>-1||/[A-Z]/u.test(t))}function Bx(t){const e=[{},{}];return t==null||t.values.forEach((n,i)=>{e[0][i]=n.get(),e[1][i]=n.getVelocity()}),e}function Xg(t,e,n,i){if(typeof e=="function"){const[s,a]=Bx(i);e=e(n!==void 0?n:t.custom,s,a)}if(typeof e=="string"&&(e=t.variants&&t.variants[e]),typeof e=="function"){const[s,a]=Bx(i);e=e(n!==void 0?n:t.custom,s,a)}return e}const hm=t=>Array.isArray(t),hP=t=>!!(t&&typeof t=="object"&&t.mix&&t.toValue),pP=t=>hm(t)?t[t.length-1]||0:t,On=t=>!!(t&&t.getVelocity);function _f(t){const e=On(t)?t.get():t;return hP(e)?e.toValue():e}function mP({scrapeMotionValuesFromProps:t,createRenderState:e,onUpdate:n},i,s,a){const l={latestValues:gP(i,s,a,t),renderState:e()};return n&&(l.onMount=u=>n({props:i,current:u,...l}),l.onUpdate=u=>n(u)),l}const P1=t=>(e,n)=>{const i=$.useContext(nd),s=$.useContext(td),a=()=>mP(t,e,i,s);return n?a():Fg(a)};function gP(t,e,n,i){const s={},a=i(t,{});for(const g in a)s[g]=_f(a[g]);let{initial:l,animate:u}=t;const f=rd(t),d=A1(t);e&&d&&!f&&t.inherit!==!1&&(l===void 0&&(l=e.initial),u===void 0&&(u=e.animate));let h=n?n.initial===!1:!1;h=h||l===!1;const m=h?u:l;if(m&&typeof m!="boolean"&&!id(m)){const g=Array.isArray(m)?m:[m];for(let v=0;v<g.length;v++){const E=Xg(t,g[v]);if(E){const{transitionEnd:w,transition:_,...y}=E;for(const M in y){let T=y[M];if(Array.isArray(T)){const C=h?T.length-1:0;T=T[C]}T!==null&&(s[M]=T)}for(const M in w)s[M]=w[M]}}}return s}const Na=["transformPerspective","x","y","z","translateX","translateY","translateZ","scale","scaleX","scaleY","rotate","rotateX","rotateY","rotateZ","skew","skewX","skewY"],ho=new Set(Na),D1=t=>e=>typeof e=="string"&&e.startsWith(t),L1=D1("--"),vP=D1("var(--"),$g=t=>vP(t)?yP.test(t.split("/*")[0].trim()):!1,yP=/var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu,I1=(t,e)=>e&&typeof t=="number"?e.transform(t):t,kr=(t,e,n)=>n>e?e:n<t?t:n,Ua={test:t=>typeof t=="number",parse:parseFloat,transform:t=>t},$l={...Ua,transform:t=>kr(0,1,t)},Rc={...Ua,default:1},iu=t=>({test:e=>typeof e=="string"&&e.endsWith(t)&&e.split(" ").length===1,parse:parseFloat,transform:e=>`${e}${t}`}),vs=iu("deg"),ir=iu("%"),ot=iu("px"),xP=iu("vh"),_P=iu("vw"),zx={...ir,parse:t=>ir.parse(t)/100,transform:t=>ir.transform(t*100)},SP={borderWidth:ot,borderTopWidth:ot,borderRightWidth:ot,borderBottomWidth:ot,borderLeftWidth:ot,borderRadius:ot,radius:ot,borderTopLeftRadius:ot,borderTopRightRadius:ot,borderBottomRightRadius:ot,borderBottomLeftRadius:ot,width:ot,maxWidth:ot,height:ot,maxHeight:ot,top:ot,right:ot,bottom:ot,left:ot,padding:ot,paddingTop:ot,paddingRight:ot,paddingBottom:ot,paddingLeft:ot,margin:ot,marginTop:ot,marginRight:ot,marginBottom:ot,marginLeft:ot,backgroundPositionX:ot,backgroundPositionY:ot},EP={rotate:vs,rotateX:vs,rotateY:vs,rotateZ:vs,scale:Rc,scaleX:Rc,scaleY:Rc,scaleZ:Rc,skew:vs,skewX:vs,skewY:vs,distance:ot,translateX:ot,translateY:ot,translateZ:ot,x:ot,y:ot,z:ot,perspective:ot,transformPerspective:ot,opacity:$l,originX:zx,originY:zx,originZ:ot},Vx={...Ua,transform:Math.round},qg={...SP,...EP,zIndex:Vx,size:ot,fillOpacity:$l,strokeOpacity:$l,numOctaves:Vx},wP={x:"translateX",y:"translateY",z:"translateZ",transformPerspective:"perspective"},MP=Na.length;function TP(t,e,n){let i="",s=!0;for(let a=0;a<MP;a++){const l=Na[a],u=t[l];if(u===void 0)continue;let f=!0;if(typeof u=="number"?f=u===(l.startsWith("scale")?1:0):f=parseFloat(u)===0,!f||n){const d=I1(u,qg[l]);if(!f){s=!1;const h=wP[l]||l;i+=`${h}(${d}) `}n&&(e[l]=d)}}return i=i.trim(),n?i=n(e,s?"":i):s&&(i="none"),i}function Yg(t,e,n){const{style:i,vars:s,transformOrigin:a}=t;let l=!1,u=!1;for(const f in e){const d=e[f];if(ho.has(f)){l=!0;continue}else if(L1(f)){s[f]=d;continue}else{const h=I1(d,qg[f]);f.startsWith("origin")?(u=!0,a[f]=h):i[f]=h}}if(e.transform||(l||n?i.transform=TP(e,t.transform,n):i.transform&&(i.transform="none")),u){const{originX:f="50%",originY:d="50%",originZ:h=0}=a;i.transformOrigin=`${f} ${d} ${h}`}}const AP={offset:"stroke-dashoffset",array:"stroke-dasharray"},CP={offset:"strokeDashoffset",array:"strokeDasharray"};function bP(t,e,n=1,i=0,s=!0){t.pathLength=1;const a=s?AP:CP;t[a.offset]=ot.transform(-i);const l=ot.transform(e),u=ot.transform(n);t[a.array]=`${l} ${u}`}function Hx(t,e,n){return typeof t=="string"?t:ot.transform(e+n*t)}function RP(t,e,n){const i=Hx(e,t.x,t.width),s=Hx(n,t.y,t.height);return`${i} ${s}`}function Kg(t,{attrX:e,attrY:n,attrScale:i,originX:s,originY:a,pathLength:l,pathSpacing:u=1,pathOffset:f=0,...d},h,m){if(Yg(t,d,m),h){t.style.viewBox&&(t.attrs.viewBox=t.style.viewBox);return}t.attrs=t.style,t.style={};const{attrs:g,style:v,dimensions:E}=t;g.transform&&(E&&(v.transform=g.transform),delete g.transform),E&&(s!==void 0||a!==void 0||v.transform)&&(v.transformOrigin=RP(E,s!==void 0?s:.5,a!==void 0?a:.5)),e!==void 0&&(g.x=e),n!==void 0&&(g.y=n),i!==void 0&&(g.scale=i),l!==void 0&&bP(g,l,u,f,!1)}const Zg=()=>({style:{},transform:{},transformOrigin:{},vars:{}}),k1=()=>({...Zg(),attrs:{}}),Qg=t=>typeof t=="string"&&t.toLowerCase()==="svg";function N1(t,{style:e,vars:n},i,s){Object.assign(t.style,e,s&&s.getProjectionStyles(i));for(const a in n)t.style.setProperty(a,n[a])}const U1=new Set(["baseFrequency","diffuseConstant","kernelMatrix","kernelUnitLength","keySplines","keyTimes","limitingConeAngle","markerHeight","markerWidth","numOctaves","targetX","targetY","surfaceScale","specularConstant","specularExponent","stdDeviation","tableValues","viewBox","gradientTransform","pathLength","startOffset","textLength","lengthAdjust"]);function F1(t,e,n,i){N1(t,e,void 0,i);for(const s in e.attrs)t.setAttribute(U1.has(s)?s:Gg(s),e.attrs[s])}const Nf={};function PP(t){Object.assign(Nf,t)}function O1(t,{layout:e,layoutId:n}){return ho.has(t)||t.startsWith("origin")||(e||n!==void 0)&&(!!Nf[t]||t==="opacity")}function Jg(t,e,n){var i;const{style:s}=t,a={};for(const l in s)(On(s[l])||e.style&&On(e.style[l])||O1(l,t)||((i=n==null?void 0:n.getValue(l))===null||i===void 0?void 0:i.liveStyle)!==void 0)&&(a[l]=s[l]);return a}function B1(t,e,n){const i=Jg(t,e,n);for(const s in t)if(On(t[s])||On(e[s])){const a=Na.indexOf(s)!==-1?"attr"+s.charAt(0).toUpperCase()+s.substring(1):s;i[a]=t[s]}return i}function DP(t,e){try{e.dimensions=typeof t.getBBox=="function"?t.getBBox():t.getBoundingClientRect()}catch{e.dimensions={x:0,y:0,width:0,height:0}}}const Gx=["x","y","width","height","cx","cy","r"],LP={useVisualState:P1({scrapeMotionValuesFromProps:B1,createRenderState:k1,onUpdate:({props:t,prevProps:e,current:n,renderState:i,latestValues:s})=>{if(!n)return;let a=!!t.drag;if(!a){for(const u in s)if(ho.has(u)){a=!0;break}}if(!a)return;let l=!e;if(e)for(let u=0;u<Gx.length;u++){const f=Gx[u];t[f]!==e[f]&&(l=!0)}l&&qt.read(()=>{DP(n,i),qt.render(()=>{Kg(i,s,Qg(n.tagName),t.transformTemplate),F1(n,i)})})}})},IP={useVisualState:P1({scrapeMotionValuesFromProps:Jg,createRenderState:Zg})};function z1(t,e,n){for(const i in e)!On(e[i])&&!O1(i,n)&&(t[i]=e[i])}function kP({transformTemplate:t},e){return $.useMemo(()=>{const n=Zg();return Yg(n,e,t),Object.assign({},n.vars,n.style)},[e])}function NP(t,e){const n=t.style||{},i={};return z1(i,n,t),Object.assign(i,kP(t,e)),i}function UP(t,e){const n={},i=NP(t,e);return t.drag&&t.dragListener!==!1&&(n.draggable=!1,i.userSelect=i.WebkitUserSelect=i.WebkitTouchCallout="none",i.touchAction=t.drag===!0?"none":`pan-${t.drag==="x"?"y":"x"}`),t.tabIndex===void 0&&(t.onTap||t.onTapStart||t.whileTap)&&(n.tabIndex=0),n.style=i,n}function FP(t,e,n,i){const s=$.useMemo(()=>{const a=k1();return Kg(a,e,Qg(i),t.transformTemplate),{...a.attrs,style:{...a.style}}},[e]);if(t.style){const a={};z1(a,t.style,t),s.style={...a,...s.style}}return s}function OP(t=!1){return(n,i,s,{latestValues:a},l)=>{const f=(jg(n)?FP:UP)(i,a,l,n),d=JR(i,typeof n=="string",t),h=n!==$.Fragment?{...d,...f,ref:s}:{},{children:m}=i,g=$.useMemo(()=>On(m)?m.get():m,[m]);return $.createElement(n,{...h,children:g})}}function BP(t,e){return function(i,{forwardMotionProps:s}={forwardMotionProps:!1}){const l={...jg(i)?LP:IP,preloadedFeatures:t,useRender:OP(s),createVisualElement:e,Component:i};return lP(l)}}function V1(t,e){if(!Array.isArray(e))return!1;const n=e.length;if(n!==t.length)return!1;for(let i=0;i<n;i++)if(e[i]!==t[i])return!1;return!0}function sd(t,e,n){const i=t.getProps();return Xg(i,e,n!==void 0?n:i.custom,t)}const zP=zg(()=>window.ScrollTimeline!==void 0);class VP{constructor(e){this.stop=()=>this.runAll("stop"),this.animations=e.filter(Boolean)}get finished(){return Promise.all(this.animations.map(e=>"finished"in e?e.finished:e))}getAll(e){return this.animations[0][e]}setAll(e,n){for(let i=0;i<this.animations.length;i++)this.animations[i][e]=n}attachTimeline(e,n){const i=this.animations.map(s=>{if(zP()&&s.attachTimeline)return s.attachTimeline(e);if(typeof n=="function")return n(s)});return()=>{i.forEach((s,a)=>{s&&s(),this.animations[a].stop()})}}get time(){return this.getAll("time")}set time(e){this.setAll("time",e)}get speed(){return this.getAll("speed")}set speed(e){this.setAll("speed",e)}get startTime(){return this.getAll("startTime")}get duration(){let e=0;for(let n=0;n<this.animations.length;n++)e=Math.max(e,this.animations[n].duration);return e}runAll(e){this.animations.forEach(n=>n[e]())}flatten(){this.runAll("flatten")}play(){this.runAll("play")}pause(){this.runAll("pause")}cancel(){this.runAll("cancel")}complete(){this.runAll("complete")}}class HP extends VP{then(e,n){return Promise.all(this.animations).then(e).catch(n)}}function ev(t,e){return t?t[e]||t.default||t:void 0}const pm=2e4;function H1(t){let e=0;const n=50;let i=t.next(e);for(;!i.done&&e<pm;)e+=n,i=t.next(e);return e>=pm?1/0:e}function tv(t){return typeof t=="function"}function Wx(t,e){t.timeline=e,t.onfinish=null}const nv=t=>Array.isArray(t)&&typeof t[0]=="number",GP={linearEasing:void 0};function WP(t,e){const n=zg(t);return()=>{var i;return(i=GP[e])!==null&&i!==void 0?i:n()}}const Uf=WP(()=>{try{document.createElement("div").animate({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0},"linearEasing"),G1=(t,e,n=10)=>{let i="";const s=Math.max(Math.round(e/n),2);for(let a=0;a<s;a++)i+=t(Sa(0,s-1,a))+", ";return`linear(${i.substring(0,i.length-2)})`};function W1(t){return!!(typeof t=="function"&&Uf()||!t||typeof t=="string"&&(t in mm||Uf())||nv(t)||Array.isArray(t)&&t.every(W1))}const Dl=([t,e,n,i])=>`cubic-bezier(${t}, ${e}, ${n}, ${i})`,mm={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",circIn:Dl([0,.65,.55,1]),circOut:Dl([.55,0,1,.45]),backIn:Dl([.31,.01,.66,-.59]),backOut:Dl([.33,1.53,.69,.99])};function j1(t,e){if(t)return typeof t=="function"&&Uf()?G1(t,e):nv(t)?Dl(t):Array.isArray(t)?t.map(n=>j1(n,e)||mm.easeOut):mm[t]}const zi={x:!1,y:!1};function X1(){return zi.x||zi.y}function jP(t,e,n){var i;if(t instanceof Element)return[t];if(typeof t=="string"){let s=document;const a=(i=void 0)!==null&&i!==void 0?i:s.querySelectorAll(t);return a?Array.from(a):[]}return Array.from(t)}function $1(t,e){const n=jP(t),i=new AbortController,s={passive:!0,...e,signal:i.signal};return[n,s,()=>i.abort()]}function jx(t){return e=>{e.pointerType==="touch"||X1()||t(e)}}function XP(t,e,n={}){const[i,s,a]=$1(t,n),l=jx(u=>{const{target:f}=u,d=e(u);if(typeof d!="function"||!f)return;const h=jx(m=>{d(m),f.removeEventListener("pointerleave",h)});f.addEventListener("pointerleave",h,s)});return i.forEach(u=>{u.addEventListener("pointerenter",l,s)}),a}const q1=(t,e)=>e?t===e?!0:q1(t,e.parentElement):!1,iv=t=>t.pointerType==="mouse"?typeof t.button!="number"||t.button<=0:t.isPrimary!==!1,$P=new Set(["BUTTON","INPUT","SELECT","TEXTAREA","A"]);function qP(t){return $P.has(t.tagName)||t.tabIndex!==-1}const Ll=new WeakSet;function Xx(t){return e=>{e.key==="Enter"&&t(e)}}function np(t,e){t.dispatchEvent(new PointerEvent("pointer"+e,{isPrimary:!0,bubbles:!0}))}const YP=(t,e)=>{const n=t.currentTarget;if(!n)return;const i=Xx(()=>{if(Ll.has(n))return;np(n,"down");const s=Xx(()=>{np(n,"up")}),a=()=>np(n,"cancel");n.addEventListener("keyup",s,e),n.addEventListener("blur",a,e)});n.addEventListener("keydown",i,e),n.addEventListener("blur",()=>n.removeEventListener("keydown",i),e)};function $x(t){return iv(t)&&!X1()}function KP(t,e,n={}){const[i,s,a]=$1(t,n),l=u=>{const f=u.currentTarget;if(!$x(u)||Ll.has(f))return;Ll.add(f);const d=e(u),h=(v,E)=>{window.removeEventListener("pointerup",m),window.removeEventListener("pointercancel",g),!(!$x(v)||!Ll.has(f))&&(Ll.delete(f),typeof d=="function"&&d(v,{success:E}))},m=v=>{h(v,n.useGlobalTarget||q1(f,v.target))},g=v=>{h(v,!1)};window.addEventListener("pointerup",m,s),window.addEventListener("pointercancel",g,s)};return i.forEach(u=>{!qP(u)&&u.getAttribute("tabindex")===null&&(u.tabIndex=0),(n.useGlobalTarget?window:u).addEventListener("pointerdown",l,s),u.addEventListener("focus",d=>YP(d,s),s)}),a}function ZP(t){return t==="x"||t==="y"?zi[t]?null:(zi[t]=!0,()=>{zi[t]=!1}):zi.x||zi.y?null:(zi.x=zi.y=!0,()=>{zi.x=zi.y=!1})}const Y1=new Set(["width","height","top","left","right","bottom",...Na]);let Sf;function QP(){Sf=void 0}const rr={now:()=>(Sf===void 0&&rr.set(bn.isProcessing||$R.useManualTiming?bn.timestamp:performance.now()),Sf),set:t=>{Sf=t,queueMicrotask(QP)}};function rv(t,e){t.indexOf(e)===-1&&t.push(e)}function sv(t,e){const n=t.indexOf(e);n>-1&&t.splice(n,1)}class ov{constructor(){this.subscriptions=[]}add(e){return rv(this.subscriptions,e),()=>sv(this.subscriptions,e)}notify(e,n,i){const s=this.subscriptions.length;if(s)if(s===1)this.subscriptions[0](e,n,i);else for(let a=0;a<s;a++){const l=this.subscriptions[a];l&&l(e,n,i)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}}function K1(t,e){return e?t*(1e3/e):0}const qx=30,JP=t=>!isNaN(parseFloat(t));class eD{constructor(e,n={}){this.version="11.18.2",this.canTrackVelocity=null,this.events={},this.updateAndNotify=(i,s=!0)=>{const a=rr.now();this.updatedAt!==a&&this.setPrevFrameValue(),this.prev=this.current,this.setCurrent(i),this.current!==this.prev&&this.events.change&&this.events.change.notify(this.current),s&&this.events.renderRequest&&this.events.renderRequest.notify(this.current)},this.hasAnimated=!1,this.setCurrent(e),this.owner=n.owner}setCurrent(e){this.current=e,this.updatedAt=rr.now(),this.canTrackVelocity===null&&e!==void 0&&(this.canTrackVelocity=JP(this.current))}setPrevFrameValue(e=this.current){this.prevFrameValue=e,this.prevUpdatedAt=this.updatedAt}onChange(e){return this.on("change",e)}on(e,n){this.events[e]||(this.events[e]=new ov);const i=this.events[e].add(n);return e==="change"?()=>{i(),qt.read(()=>{this.events.change.getSize()||this.stop()})}:i}clearListeners(){for(const e in this.events)this.events[e].clear()}attach(e,n){this.passiveEffect=e,this.stopPassiveEffect=n}set(e,n=!0){!n||!this.passiveEffect?this.updateAndNotify(e,n):this.passiveEffect(e,this.updateAndNotify)}setWithVelocity(e,n,i){this.set(n),this.prev=void 0,this.prevFrameValue=e,this.prevUpdatedAt=this.updatedAt-i}jump(e,n=!0){this.updateAndNotify(e),this.prev=e,this.prevUpdatedAt=this.prevFrameValue=void 0,n&&this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}get(){return this.current}getPrevious(){return this.prev}getVelocity(){const e=rr.now();if(!this.canTrackVelocity||this.prevFrameValue===void 0||e-this.updatedAt>qx)return 0;const n=Math.min(this.updatedAt-this.prevUpdatedAt,qx);return K1(parseFloat(this.current)-parseFloat(this.prevFrameValue),n)}start(e){return this.stop(),new Promise(n=>{this.hasAnimated=!0,this.animation=e(n),this.events.animationStart&&this.events.animationStart.notify()}).then(()=>{this.events.animationComplete&&this.events.animationComplete.notify(),this.clearAnimation()})}stop(){this.animation&&(this.animation.stop(),this.events.animationCancel&&this.events.animationCancel.notify()),this.clearAnimation()}isAnimating(){return!!this.animation}clearAnimation(){delete this.animation}destroy(){this.clearListeners(),this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}}function ql(t,e){return new eD(t,e)}function tD(t,e,n){t.hasValue(e)?t.getValue(e).set(n):t.addValue(e,ql(n))}function nD(t,e){const n=sd(t,e);let{transitionEnd:i={},transition:s={},...a}=n||{};a={...a,...i};for(const l in a){const u=pP(a[l]);tD(t,l,u)}}function iD(t){return!!(On(t)&&t.add)}function gm(t,e){const n=t.getValue("willChange");if(iD(n))return n.add(e)}function Z1(t){return t.props[C1]}const Q1=(t,e,n)=>(((1-3*n+3*e)*t+(3*n-6*e))*t+3*e)*t,rD=1e-7,sD=12;function oD(t,e,n,i,s){let a,l,u=0;do l=e+(n-e)/2,a=Q1(l,i,s)-t,a>0?n=l:e=l;while(Math.abs(a)>rD&&++u<sD);return l}function ru(t,e,n,i){if(t===e&&n===i)return pi;const s=a=>oD(a,0,1,t,n);return a=>a===0||a===1?a:Q1(s(a),e,i)}const J1=t=>e=>e<=.5?t(2*e)/2:(2-t(2*(1-e)))/2,ew=t=>e=>1-t(1-e),tw=ru(.33,1.53,.69,.99),av=ew(tw),nw=J1(av),iw=t=>(t*=2)<1?.5*av(t):.5*(2-Math.pow(2,-10*(t-1))),lv=t=>1-Math.sin(Math.acos(t)),rw=ew(lv),sw=J1(lv),ow=t=>/^0[^.\s]+$/u.test(t);function aD(t){return typeof t=="number"?t===0:t!==null?t==="none"||t==="0"||ow(t):!0}const Ul=t=>Math.round(t*1e5)/1e5,uv=/-?(?:\d+(?:\.\d+)?|\.\d+)/gu;function lD(t){return t==null}const uD=/^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,cv=(t,e)=>n=>!!(typeof n=="string"&&uD.test(n)&&n.startsWith(t)||e&&!lD(n)&&Object.prototype.hasOwnProperty.call(n,e)),aw=(t,e,n)=>i=>{if(typeof i!="string")return i;const[s,a,l,u]=i.match(uv);return{[t]:parseFloat(s),[e]:parseFloat(a),[n]:parseFloat(l),alpha:u!==void 0?parseFloat(u):1}},cD=t=>kr(0,255,t),ip={...Ua,transform:t=>Math.round(cD(t))},io={test:cv("rgb","red"),parse:aw("red","green","blue"),transform:({red:t,green:e,blue:n,alpha:i=1})=>"rgba("+ip.transform(t)+", "+ip.transform(e)+", "+ip.transform(n)+", "+Ul($l.transform(i))+")"};function fD(t){let e="",n="",i="",s="";return t.length>5?(e=t.substring(1,3),n=t.substring(3,5),i=t.substring(5,7),s=t.substring(7,9)):(e=t.substring(1,2),n=t.substring(2,3),i=t.substring(3,4),s=t.substring(4,5),e+=e,n+=n,i+=i,s+=s),{red:parseInt(e,16),green:parseInt(n,16),blue:parseInt(i,16),alpha:s?parseInt(s,16)/255:1}}const vm={test:cv("#"),parse:fD,transform:io.transform},sa={test:cv("hsl","hue"),parse:aw("hue","saturation","lightness"),transform:({hue:t,saturation:e,lightness:n,alpha:i=1})=>"hsla("+Math.round(t)+", "+ir.transform(Ul(e))+", "+ir.transform(Ul(n))+", "+Ul($l.transform(i))+")"},Fn={test:t=>io.test(t)||vm.test(t)||sa.test(t),parse:t=>io.test(t)?io.parse(t):sa.test(t)?sa.parse(t):vm.parse(t),transform:t=>typeof t=="string"?t:t.hasOwnProperty("red")?io.transform(t):sa.transform(t)},dD=/(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;function hD(t){var e,n;return isNaN(t)&&typeof t=="string"&&(((e=t.match(uv))===null||e===void 0?void 0:e.length)||0)+(((n=t.match(dD))===null||n===void 0?void 0:n.length)||0)>0}const lw="number",uw="color",pD="var",mD="var(",Yx="${}",gD=/var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;function Yl(t){const e=t.toString(),n=[],i={color:[],number:[],var:[]},s=[];let a=0;const u=e.replace(gD,f=>(Fn.test(f)?(i.color.push(a),s.push(uw),n.push(Fn.parse(f))):f.startsWith(mD)?(i.var.push(a),s.push(pD),n.push(f)):(i.number.push(a),s.push(lw),n.push(parseFloat(f))),++a,Yx)).split(Yx);return{values:n,split:u,indexes:i,types:s}}function cw(t){return Yl(t).values}function fw(t){const{split:e,types:n}=Yl(t),i=e.length;return s=>{let a="";for(let l=0;l<i;l++)if(a+=e[l],s[l]!==void 0){const u=n[l];u===lw?a+=Ul(s[l]):u===uw?a+=Fn.transform(s[l]):a+=s[l]}return a}}const vD=t=>typeof t=="number"?0:t;function yD(t){const e=cw(t);return fw(t)(e.map(vD))}const ws={test:hD,parse:cw,createTransformer:fw,getAnimatableNone:yD},xD=new Set(["brightness","contrast","saturate","opacity"]);function _D(t){const[e,n]=t.slice(0,-1).split("(");if(e==="drop-shadow")return t;const[i]=n.match(uv)||[];if(!i)return t;const s=n.replace(i,"");let a=xD.has(e)?1:0;return i!==n&&(a*=100),e+"("+a+s+")"}const SD=/\b([a-z-]*)\(.*?\)/gu,ym={...ws,getAnimatableNone:t=>{const e=t.match(SD);return e?e.map(_D).join(" "):t}},ED={...qg,color:Fn,backgroundColor:Fn,outlineColor:Fn,fill:Fn,stroke:Fn,borderColor:Fn,borderTopColor:Fn,borderRightColor:Fn,borderBottomColor:Fn,borderLeftColor:Fn,filter:ym,WebkitFilter:ym},fv=t=>ED[t];function dw(t,e){let n=fv(t);return n!==ym&&(n=ws),n.getAnimatableNone?n.getAnimatableNone(e):void 0}const wD=new Set(["auto","none","0"]);function MD(t,e,n){let i=0,s;for(;i<t.length&&!s;){const a=t[i];typeof a=="string"&&!wD.has(a)&&Yl(a).values.length&&(s=t[i]),i++}if(s&&n)for(const a of e)t[a]=dw(n,s)}const Kx=t=>t===Ua||t===ot,Zx=(t,e)=>parseFloat(t.split(", ")[e]),Qx=(t,e)=>(n,{transform:i})=>{if(i==="none"||!i)return 0;const s=i.match(/^matrix3d\((.+)\)$/u);if(s)return Zx(s[1],e);{const a=i.match(/^matrix\((.+)\)$/u);return a?Zx(a[1],t):0}},TD=new Set(["x","y","z"]),AD=Na.filter(t=>!TD.has(t));function CD(t){const e=[];return AD.forEach(n=>{const i=t.getValue(n);i!==void 0&&(e.push([n,i.get()]),i.set(n.startsWith("scale")?1:0))}),e}const wa={width:({x:t},{paddingLeft:e="0",paddingRight:n="0"})=>t.max-t.min-parseFloat(e)-parseFloat(n),height:({y:t},{paddingTop:e="0",paddingBottom:n="0"})=>t.max-t.min-parseFloat(e)-parseFloat(n),top:(t,{top:e})=>parseFloat(e),left:(t,{left:e})=>parseFloat(e),bottom:({y:t},{top:e})=>parseFloat(e)+(t.max-t.min),right:({x:t},{left:e})=>parseFloat(e)+(t.max-t.min),x:Qx(4,13),y:Qx(5,14)};wa.translateX=wa.x;wa.translateY=wa.y;const lo=new Set;let xm=!1,_m=!1;function hw(){if(_m){const t=Array.from(lo).filter(i=>i.needsMeasurement),e=new Set(t.map(i=>i.element)),n=new Map;e.forEach(i=>{const s=CD(i);s.length&&(n.set(i,s),i.render())}),t.forEach(i=>i.measureInitialState()),e.forEach(i=>{i.render();const s=n.get(i);s&&s.forEach(([a,l])=>{var u;(u=i.getValue(a))===null||u===void 0||u.set(l)})}),t.forEach(i=>i.measureEndState()),t.forEach(i=>{i.suspendedScrollY!==void 0&&window.scrollTo(0,i.suspendedScrollY)})}_m=!1,xm=!1,lo.forEach(t=>t.complete()),lo.clear()}function pw(){lo.forEach(t=>{t.readKeyframes(),t.needsMeasurement&&(_m=!0)})}function bD(){pw(),hw()}class dv{constructor(e,n,i,s,a,l=!1){this.isComplete=!1,this.isAsync=!1,this.needsMeasurement=!1,this.isScheduled=!1,this.unresolvedKeyframes=[...e],this.onComplete=n,this.name=i,this.motionValue=s,this.element=a,this.isAsync=l}scheduleResolve(){this.isScheduled=!0,this.isAsync?(lo.add(this),xm||(xm=!0,qt.read(pw),qt.resolveKeyframes(hw))):(this.readKeyframes(),this.complete())}readKeyframes(){const{unresolvedKeyframes:e,name:n,element:i,motionValue:s}=this;for(let a=0;a<e.length;a++)if(e[a]===null)if(a===0){const l=s==null?void 0:s.get(),u=e[e.length-1];if(l!==void 0)e[0]=l;else if(i&&n){const f=i.readValue(n,u);f!=null&&(e[0]=f)}e[0]===void 0&&(e[0]=u),s&&l===void 0&&s.set(e[0])}else e[a]=e[a-1]}setFinalKeyframe(){}measureInitialState(){}renderEndStyles(){}measureEndState(){}complete(){this.isComplete=!0,this.onComplete(this.unresolvedKeyframes,this.finalKeyframe),lo.delete(this)}cancel(){this.isComplete||(this.isScheduled=!1,lo.delete(this))}resume(){this.isComplete||this.scheduleResolve()}}const mw=t=>/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t),RD=/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;function PD(t){const e=RD.exec(t);if(!e)return[,];const[,n,i,s]=e;return[`--${n??i}`,s]}function gw(t,e,n=1){const[i,s]=PD(t);if(!i)return;const a=window.getComputedStyle(e).getPropertyValue(i);if(a){const l=a.trim();return mw(l)?parseFloat(l):l}return $g(s)?gw(s,e,n+1):s}const vw=t=>e=>e.test(t),DD={test:t=>t==="auto",parse:t=>t},yw=[Ua,ot,ir,vs,_P,xP,DD],Jx=t=>yw.find(vw(t));class xw extends dv{constructor(e,n,i,s,a){super(e,n,i,s,a,!0)}readKeyframes(){const{unresolvedKeyframes:e,element:n,name:i}=this;if(!n||!n.current)return;super.readKeyframes();for(let f=0;f<e.length;f++){let d=e[f];if(typeof d=="string"&&(d=d.trim(),$g(d))){const h=gw(d,n.current);h!==void 0&&(e[f]=h),f===e.length-1&&(this.finalKeyframe=d)}}if(this.resolveNoneKeyframes(),!Y1.has(i)||e.length!==2)return;const[s,a]=e,l=Jx(s),u=Jx(a);if(l!==u)if(Kx(l)&&Kx(u))for(let f=0;f<e.length;f++){const d=e[f];typeof d=="string"&&(e[f]=parseFloat(d))}else this.needsMeasurement=!0}resolveNoneKeyframes(){const{unresolvedKeyframes:e,name:n}=this,i=[];for(let s=0;s<e.length;s++)aD(e[s])&&i.push(s);i.length&&MD(e,i,n)}measureInitialState(){const{element:e,unresolvedKeyframes:n,name:i}=this;if(!e||!e.current)return;i==="height"&&(this.suspendedScrollY=window.pageYOffset),this.measuredOrigin=wa[i](e.measureViewportBox(),window.getComputedStyle(e.current)),n[0]=this.measuredOrigin;const s=n[n.length-1];s!==void 0&&e.getValue(i,s).jump(s,!1)}measureEndState(){var e;const{element:n,name:i,unresolvedKeyframes:s}=this;if(!n||!n.current)return;const a=n.getValue(i);a&&a.jump(this.measuredOrigin,!1);const l=s.length-1,u=s[l];s[l]=wa[i](n.measureViewportBox(),window.getComputedStyle(n.current)),u!==null&&this.finalKeyframe===void 0&&(this.finalKeyframe=u),!((e=this.removedTransforms)===null||e===void 0)&&e.length&&this.removedTransforms.forEach(([f,d])=>{n.getValue(f).set(d)}),this.resolveNoneKeyframes()}}const e_=(t,e)=>e==="zIndex"?!1:!!(typeof t=="number"||Array.isArray(t)||typeof t=="string"&&(ws.test(t)||t==="0")&&!t.startsWith("url("));function LD(t){const e=t[0];if(t.length===1)return!0;for(let n=0;n<t.length;n++)if(t[n]!==e)return!0}function ID(t,e,n,i){const s=t[0];if(s===null)return!1;if(e==="display"||e==="visibility")return!0;const a=t[t.length-1],l=e_(s,e),u=e_(a,e);return!l||!u?!1:LD(t)||(n==="spring"||tv(n))&&i}const kD=t=>t!==null;function od(t,{repeat:e,repeatType:n="loop"},i){const s=t.filter(kD),a=e&&n!=="loop"&&e%2===1?0:s.length-1;return!a||i===void 0?s[a]:i}const ND=40;class _w{constructor({autoplay:e=!0,delay:n=0,type:i="keyframes",repeat:s=0,repeatDelay:a=0,repeatType:l="loop",...u}){this.isStopped=!1,this.hasAttemptedResolve=!1,this.createdAt=rr.now(),this.options={autoplay:e,delay:n,type:i,repeat:s,repeatDelay:a,repeatType:l,...u},this.updateFinishedPromise()}calcStartTime(){return this.resolvedAt?this.resolvedAt-this.createdAt>ND?this.resolvedAt:this.createdAt:this.createdAt}get resolved(){return!this._resolved&&!this.hasAttemptedResolve&&bD(),this._resolved}onKeyframesResolved(e,n){this.resolvedAt=rr.now(),this.hasAttemptedResolve=!0;const{name:i,type:s,velocity:a,delay:l,onComplete:u,onUpdate:f,isGenerator:d}=this.options;if(!d&&!ID(e,i,s,a))if(l)this.options.duration=0;else{f&&f(od(e,this.options,n)),u&&u(),this.resolveFinishedPromise();return}const h=this.initPlayback(e,n);h!==!1&&(this._resolved={keyframes:e,finalKeyframe:n,...h},this.onPostResolved())}onPostResolved(){}then(e,n){return this.currentFinishedPromise.then(e,n)}flatten(){this.options.type="keyframes",this.options.ease="linear"}updateFinishedPromise(){this.currentFinishedPromise=new Promise(e=>{this.resolveFinishedPromise=e})}}const Jt=(t,e,n)=>t+(e-t)*n;function rp(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*(2/3-n)*6:t}function UD({hue:t,saturation:e,lightness:n,alpha:i}){t/=360,e/=100,n/=100;let s=0,a=0,l=0;if(!e)s=a=l=n;else{const u=n<.5?n*(1+e):n+e-n*e,f=2*n-u;s=rp(f,u,t+1/3),a=rp(f,u,t),l=rp(f,u,t-1/3)}return{red:Math.round(s*255),green:Math.round(a*255),blue:Math.round(l*255),alpha:i}}function Ff(t,e){return n=>n>0?e:t}const sp=(t,e,n)=>{const i=t*t,s=n*(e*e-i)+i;return s<0?0:Math.sqrt(s)},FD=[vm,io,sa],OD=t=>FD.find(e=>e.test(t));function t_(t){const e=OD(t);if(!e)return!1;let n=e.parse(t);return e===sa&&(n=UD(n)),n}const n_=(t,e)=>{const n=t_(t),i=t_(e);if(!n||!i)return Ff(t,e);const s={...n};return a=>(s.red=sp(n.red,i.red,a),s.green=sp(n.green,i.green,a),s.blue=sp(n.blue,i.blue,a),s.alpha=Jt(n.alpha,i.alpha,a),io.transform(s))},BD=(t,e)=>n=>e(t(n)),su=(...t)=>t.reduce(BD),Sm=new Set(["none","hidden"]);function zD(t,e){return Sm.has(t)?n=>n<=0?t:e:n=>n>=1?e:t}function VD(t,e){return n=>Jt(t,e,n)}function hv(t){return typeof t=="number"?VD:typeof t=="string"?$g(t)?Ff:Fn.test(t)?n_:WD:Array.isArray(t)?Sw:typeof t=="object"?Fn.test(t)?n_:HD:Ff}function Sw(t,e){const n=[...t],i=n.length,s=t.map((a,l)=>hv(a)(a,e[l]));return a=>{for(let l=0;l<i;l++)n[l]=s[l](a);return n}}function HD(t,e){const n={...t,...e},i={};for(const s in n)t[s]!==void 0&&e[s]!==void 0&&(i[s]=hv(t[s])(t[s],e[s]));return s=>{for(const a in i)n[a]=i[a](s);return n}}function GD(t,e){var n;const i=[],s={color:0,var:0,number:0};for(let a=0;a<e.values.length;a++){const l=e.types[a],u=t.indexes[l][s[l]],f=(n=t.values[u])!==null&&n!==void 0?n:0;i[a]=f,s[l]++}return i}const WD=(t,e)=>{const n=ws.createTransformer(e),i=Yl(t),s=Yl(e);return i.indexes.var.length===s.indexes.var.length&&i.indexes.color.length===s.indexes.color.length&&i.indexes.number.length>=s.indexes.number.length?Sm.has(t)&&!s.values.length||Sm.has(e)&&!i.values.length?zD(t,e):su(Sw(GD(i,s),s.values),n):Ff(t,e)};function Ew(t,e,n){return typeof t=="number"&&typeof e=="number"&&typeof n=="number"?Jt(t,e,n):hv(t)(t,e)}const jD=5;function ww(t,e,n){const i=Math.max(e-jD,0);return K1(n-t(i),e-i)}const rn={stiffness:100,damping:10,mass:1,velocity:0,duration:800,bounce:.3,visualDuration:.3,restSpeed:{granular:.01,default:2},restDelta:{granular:.005,default:.5},minDuration:.01,maxDuration:10,minDamping:.05,maxDamping:1},i_=.001;function XD({duration:t=rn.duration,bounce:e=rn.bounce,velocity:n=rn.velocity,mass:i=rn.mass}){let s,a,l=1-e;l=kr(rn.minDamping,rn.maxDamping,l),t=kr(rn.minDuration,rn.maxDuration,Lr(t)),l<1?(s=d=>{const h=d*l,m=h*t,g=h-n,v=Em(d,l),E=Math.exp(-m);return i_-g/v*E},a=d=>{const m=d*l*t,g=m*n+n,v=Math.pow(l,2)*Math.pow(d,2)*t,E=Math.exp(-m),w=Em(Math.pow(d,2),l);return(-s(d)+i_>0?-1:1)*((g-v)*E)/w}):(s=d=>{const h=Math.exp(-d*t),m=(d-n)*t+1;return-.001+h*m},a=d=>{const h=Math.exp(-d*t),m=(n-d)*(t*t);return h*m});const u=5/t,f=qD(s,a,u);if(t=Dr(t),isNaN(f))return{stiffness:rn.stiffness,damping:rn.damping,duration:t};{const d=Math.pow(f,2)*i;return{stiffness:d,damping:l*2*Math.sqrt(i*d),duration:t}}}const $D=12;function qD(t,e,n){let i=n;for(let s=1;s<$D;s++)i=i-t(i)/e(i);return i}function Em(t,e){return t*Math.sqrt(1-e*e)}const YD=["duration","bounce"],KD=["stiffness","damping","mass"];function r_(t,e){return e.some(n=>t[n]!==void 0)}function ZD(t){let e={velocity:rn.velocity,stiffness:rn.stiffness,damping:rn.damping,mass:rn.mass,isResolvedFromDuration:!1,...t};if(!r_(t,KD)&&r_(t,YD))if(t.visualDuration){const n=t.visualDuration,i=2*Math.PI/(n*1.2),s=i*i,a=2*kr(.05,1,1-(t.bounce||0))*Math.sqrt(s);e={...e,mass:rn.mass,stiffness:s,damping:a}}else{const n=XD(t);e={...e,...n,mass:rn.mass},e.isResolvedFromDuration=!0}return e}function Mw(t=rn.visualDuration,e=rn.bounce){const n=typeof t!="object"?{visualDuration:t,keyframes:[0,1],bounce:e}:t;let{restSpeed:i,restDelta:s}=n;const a=n.keyframes[0],l=n.keyframes[n.keyframes.length-1],u={done:!1,value:a},{stiffness:f,damping:d,mass:h,duration:m,velocity:g,isResolvedFromDuration:v}=ZD({...n,velocity:-Lr(n.velocity||0)}),E=g||0,w=d/(2*Math.sqrt(f*h)),_=l-a,y=Lr(Math.sqrt(f/h)),M=Math.abs(_)<5;i||(i=M?rn.restSpeed.granular:rn.restSpeed.default),s||(s=M?rn.restDelta.granular:rn.restDelta.default);let T;if(w<1){const N=Em(y,w);T=b=>{const k=Math.exp(-w*y*b);return l-k*((E+w*y*_)/N*Math.sin(N*b)+_*Math.cos(N*b))}}else if(w===1)T=N=>l-Math.exp(-y*N)*(_+(E+y*_)*N);else{const N=y*Math.sqrt(w*w-1);T=b=>{const k=Math.exp(-w*y*b),B=Math.min(N*b,300);return l-k*((E+w*y*_)*Math.sinh(B)+N*_*Math.cosh(B))/N}}const C={calculatedDuration:v&&m||null,next:N=>{const b=T(N);if(v)u.done=N>=m;else{let k=0;w<1&&(k=N===0?Dr(E):ww(T,N,b));const B=Math.abs(k)<=i,L=Math.abs(l-b)<=s;u.done=B&&L}return u.value=u.done?l:b,u},toString:()=>{const N=Math.min(H1(C),pm),b=G1(k=>C.next(N*k).value,N,30);return N+"ms "+b}};return C}function s_({keyframes:t,velocity:e=0,power:n=.8,timeConstant:i=325,bounceDamping:s=10,bounceStiffness:a=500,modifyTarget:l,min:u,max:f,restDelta:d=.5,restSpeed:h}){const m=t[0],g={done:!1,value:m},v=B=>u!==void 0&&B<u||f!==void 0&&B>f,E=B=>u===void 0?f:f===void 0||Math.abs(u-B)<Math.abs(f-B)?u:f;let w=n*e;const _=m+w,y=l===void 0?_:l(_);y!==_&&(w=y-m);const M=B=>-w*Math.exp(-B/i),T=B=>y+M(B),C=B=>{const L=M(B),R=T(B);g.done=Math.abs(L)<=d,g.value=g.done?y:R};let N,b;const k=B=>{v(g.value)&&(N=B,b=Mw({keyframes:[g.value,E(g.value)],velocity:ww(T,B,g.value),damping:s,stiffness:a,restDelta:d,restSpeed:h}))};return k(0),{calculatedDuration:null,next:B=>{let L=!1;return!b&&N===void 0&&(L=!0,C(B),k(B)),N!==void 0&&B>=N?b.next(B-N):(!L&&C(B),g)}}}const QD=ru(.42,0,1,1),JD=ru(0,0,.58,1),Tw=ru(.42,0,.58,1),eL=t=>Array.isArray(t)&&typeof t[0]!="number",o_={linear:pi,easeIn:QD,easeInOut:Tw,easeOut:JD,circIn:lv,circInOut:sw,circOut:rw,backIn:av,backInOut:nw,backOut:tw,anticipate:iw},a_=t=>{if(nv(t)){dm(t.length===4);const[e,n,i,s]=t;return ru(e,n,i,s)}else if(typeof t=="string")return dm(o_[t]!==void 0),o_[t];return t};function tL(t,e,n){const i=[],s=n||Ew,a=t.length-1;for(let l=0;l<a;l++){let u=s(t[l],t[l+1]);if(e){const f=Array.isArray(e)?e[l]||pi:e;u=su(f,u)}i.push(u)}return i}function nL(t,e,{clamp:n=!0,ease:i,mixer:s}={}){const a=t.length;if(dm(a===e.length),a===1)return()=>e[0];if(a===2&&e[0]===e[1])return()=>e[1];const l=t[0]===t[1];t[0]>t[a-1]&&(t=[...t].reverse(),e=[...e].reverse());const u=tL(e,i,s),f=u.length,d=h=>{if(l&&h<t[0])return e[0];let m=0;if(f>1)for(;m<t.length-2&&!(h<t[m+1]);m++);const g=Sa(t[m],t[m+1],h);return u[m](g)};return n?h=>d(kr(t[0],t[a-1],h)):d}function iL(t,e){const n=t[t.length-1];for(let i=1;i<=e;i++){const s=Sa(0,e,i);t.push(Jt(n,1,s))}}function rL(t){const e=[0];return iL(e,t.length-1),e}function sL(t,e){return t.map(n=>n*e)}function oL(t,e){return t.map(()=>e||Tw).splice(0,t.length-1)}function Of({duration:t=300,keyframes:e,times:n,ease:i="easeInOut"}){const s=eL(i)?i.map(a_):a_(i),a={done:!1,value:e[0]},l=sL(n&&n.length===e.length?n:rL(e),t),u=nL(l,e,{ease:Array.isArray(s)?s:oL(e,s)});return{calculatedDuration:t,next:f=>(a.value=u(f),a.done=f>=t,a)}}const aL=t=>{const e=({timestamp:n})=>t(n);return{start:()=>qt.update(e,!0),stop:()=>Es(e),now:()=>bn.isProcessing?bn.timestamp:rr.now()}},lL={decay:s_,inertia:s_,tween:Of,keyframes:Of,spring:Mw},uL=t=>t/100;class pv extends _w{constructor(e){super(e),this.holdTime=null,this.cancelTime=null,this.currentTime=0,this.playbackSpeed=1,this.pendingPlayState="running",this.startTime=null,this.state="idle",this.stop=()=>{if(this.resolver.cancel(),this.isStopped=!0,this.state==="idle")return;this.teardown();const{onStop:f}=this.options;f&&f()};const{name:n,motionValue:i,element:s,keyframes:a}=this.options,l=(s==null?void 0:s.KeyframeResolver)||dv,u=(f,d)=>this.onKeyframesResolved(f,d);this.resolver=new l(a,u,n,i,s),this.resolver.scheduleResolve()}flatten(){super.flatten(),this._resolved&&Object.assign(this._resolved,this.initPlayback(this._resolved.keyframes))}initPlayback(e){const{type:n="keyframes",repeat:i=0,repeatDelay:s=0,repeatType:a,velocity:l=0}=this.options,u=tv(n)?n:lL[n]||Of;let f,d;u!==Of&&typeof e[0]!="number"&&(f=su(uL,Ew(e[0],e[1])),e=[0,100]);const h=u({...this.options,keyframes:e});a==="mirror"&&(d=u({...this.options,keyframes:[...e].reverse(),velocity:-l})),h.calculatedDuration===null&&(h.calculatedDuration=H1(h));const{calculatedDuration:m}=h,g=m+s,v=g*(i+1)-s;return{generator:h,mirroredGenerator:d,mapPercentToKeyframes:f,calculatedDuration:m,resolvedDuration:g,totalDuration:v}}onPostResolved(){const{autoplay:e=!0}=this.options;this.play(),this.pendingPlayState==="paused"||!e?this.pause():this.state=this.pendingPlayState}tick(e,n=!1){const{resolved:i}=this;if(!i){const{keyframes:B}=this.options;return{done:!0,value:B[B.length-1]}}const{finalKeyframe:s,generator:a,mirroredGenerator:l,mapPercentToKeyframes:u,keyframes:f,calculatedDuration:d,totalDuration:h,resolvedDuration:m}=i;if(this.startTime===null)return a.next(0);const{delay:g,repeat:v,repeatType:E,repeatDelay:w,onUpdate:_}=this.options;this.speed>0?this.startTime=Math.min(this.startTime,e):this.speed<0&&(this.startTime=Math.min(e-h/this.speed,this.startTime)),n?this.currentTime=e:this.holdTime!==null?this.currentTime=this.holdTime:this.currentTime=Math.round(e-this.startTime)*this.speed;const y=this.currentTime-g*(this.speed>=0?1:-1),M=this.speed>=0?y<0:y>h;this.currentTime=Math.max(y,0),this.state==="finished"&&this.holdTime===null&&(this.currentTime=h);let T=this.currentTime,C=a;if(v){const B=Math.min(this.currentTime,h)/m;let L=Math.floor(B),R=B%1;!R&&B>=1&&(R=1),R===1&&L--,L=Math.min(L,v+1),!!(L%2)&&(E==="reverse"?(R=1-R,w&&(R-=w/m)):E==="mirror"&&(C=l)),T=kr(0,1,R)*m}const N=M?{done:!1,value:f[0]}:C.next(T);u&&(N.value=u(N.value));let{done:b}=N;!M&&d!==null&&(b=this.speed>=0?this.currentTime>=h:this.currentTime<=0);const k=this.holdTime===null&&(this.state==="finished"||this.state==="running"&&b);return k&&s!==void 0&&(N.value=od(f,this.options,s)),_&&_(N.value),k&&this.finish(),N}get duration(){const{resolved:e}=this;return e?Lr(e.calculatedDuration):0}get time(){return Lr(this.currentTime)}set time(e){e=Dr(e),this.currentTime=e,this.holdTime!==null||this.speed===0?this.holdTime=e:this.driver&&(this.startTime=this.driver.now()-e/this.speed)}get speed(){return this.playbackSpeed}set speed(e){const n=this.playbackSpeed!==e;this.playbackSpeed=e,n&&(this.time=Lr(this.currentTime))}play(){if(this.resolver.isScheduled||this.resolver.resume(),!this._resolved){this.pendingPlayState="running";return}if(this.isStopped)return;const{driver:e=aL,onPlay:n,startTime:i}=this.options;this.driver||(this.driver=e(a=>this.tick(a))),n&&n();const s=this.driver.now();this.holdTime!==null?this.startTime=s-this.holdTime:this.startTime?this.state==="finished"&&(this.startTime=s):this.startTime=i??this.calcStartTime(),this.state==="finished"&&this.updateFinishedPromise(),this.cancelTime=this.startTime,this.holdTime=null,this.state="running",this.driver.start()}pause(){var e;if(!this._resolved){this.pendingPlayState="paused";return}this.state="paused",this.holdTime=(e=this.currentTime)!==null&&e!==void 0?e:0}complete(){this.state!=="running"&&this.play(),this.pendingPlayState=this.state="finished",this.holdTime=null}finish(){this.teardown(),this.state="finished";const{onComplete:e}=this.options;e&&e()}cancel(){this.cancelTime!==null&&this.tick(this.cancelTime),this.teardown(),this.updateFinishedPromise()}teardown(){this.state="idle",this.stopDriver(),this.resolveFinishedPromise(),this.updateFinishedPromise(),this.startTime=this.cancelTime=null,this.resolver.cancel()}stopDriver(){this.driver&&(this.driver.stop(),this.driver=void 0)}sample(e){return this.startTime=0,this.tick(e,!0)}}const cL=new Set(["opacity","clipPath","filter","transform"]);function fL(t,e,n,{delay:i=0,duration:s=300,repeat:a=0,repeatType:l="loop",ease:u="easeInOut",times:f}={}){const d={[e]:n};f&&(d.offset=f);const h=j1(u,s);return Array.isArray(h)&&(d.easing=h),t.animate(d,{delay:i,duration:s,easing:Array.isArray(h)?"linear":h,fill:"both",iterations:a+1,direction:l==="reverse"?"alternate":"normal"})}const dL=zg(()=>Object.hasOwnProperty.call(Element.prototype,"animate")),Bf=10,hL=2e4;function pL(t){return tv(t.type)||t.type==="spring"||!W1(t.ease)}function mL(t,e){const n=new pv({...e,keyframes:t,repeat:0,delay:0,isGenerator:!0});let i={done:!1,value:t[0]};const s=[];let a=0;for(;!i.done&&a<hL;)i=n.sample(a),s.push(i.value),a+=Bf;return{times:void 0,keyframes:s,duration:a-Bf,ease:"linear"}}const Aw={anticipate:iw,backInOut:nw,circInOut:sw};function gL(t){return t in Aw}class l_ extends _w{constructor(e){super(e);const{name:n,motionValue:i,element:s,keyframes:a}=this.options;this.resolver=new xw(a,(l,u)=>this.onKeyframesResolved(l,u),n,i,s),this.resolver.scheduleResolve()}initPlayback(e,n){let{duration:i=300,times:s,ease:a,type:l,motionValue:u,name:f,startTime:d}=this.options;if(!u.owner||!u.owner.current)return!1;if(typeof a=="string"&&Uf()&&gL(a)&&(a=Aw[a]),pL(this.options)){const{onComplete:m,onUpdate:g,motionValue:v,element:E,...w}=this.options,_=mL(e,w);e=_.keyframes,e.length===1&&(e[1]=e[0]),i=_.duration,s=_.times,a=_.ease,l="keyframes"}const h=fL(u.owner.current,f,e,{...this.options,duration:i,times:s,ease:a});return h.startTime=d??this.calcStartTime(),this.pendingTimeline?(Wx(h,this.pendingTimeline),this.pendingTimeline=void 0):h.onfinish=()=>{const{onComplete:m}=this.options;u.set(od(e,this.options,n)),m&&m(),this.cancel(),this.resolveFinishedPromise()},{animation:h,duration:i,times:s,type:l,ease:a,keyframes:e}}get duration(){const{resolved:e}=this;if(!e)return 0;const{duration:n}=e;return Lr(n)}get time(){const{resolved:e}=this;if(!e)return 0;const{animation:n}=e;return Lr(n.currentTime||0)}set time(e){const{resolved:n}=this;if(!n)return;const{animation:i}=n;i.currentTime=Dr(e)}get speed(){const{resolved:e}=this;if(!e)return 1;const{animation:n}=e;return n.playbackRate}set speed(e){const{resolved:n}=this;if(!n)return;const{animation:i}=n;i.playbackRate=e}get state(){const{resolved:e}=this;if(!e)return"idle";const{animation:n}=e;return n.playState}get startTime(){const{resolved:e}=this;if(!e)return null;const{animation:n}=e;return n.startTime}attachTimeline(e){if(!this._resolved)this.pendingTimeline=e;else{const{resolved:n}=this;if(!n)return pi;const{animation:i}=n;Wx(i,e)}return pi}play(){if(this.isStopped)return;const{resolved:e}=this;if(!e)return;const{animation:n}=e;n.playState==="finished"&&this.updateFinishedPromise(),n.play()}pause(){const{resolved:e}=this;if(!e)return;const{animation:n}=e;n.pause()}stop(){if(this.resolver.cancel(),this.isStopped=!0,this.state==="idle")return;this.resolveFinishedPromise(),this.updateFinishedPromise();const{resolved:e}=this;if(!e)return;const{animation:n,keyframes:i,duration:s,type:a,ease:l,times:u}=e;if(n.playState==="idle"||n.playState==="finished")return;if(this.time){const{motionValue:d,onUpdate:h,onComplete:m,element:g,...v}=this.options,E=new pv({...v,keyframes:i,duration:s,type:a,ease:l,times:u,isGenerator:!0}),w=Dr(this.time);d.setWithVelocity(E.sample(w-Bf).value,E.sample(w).value,Bf)}const{onStop:f}=this.options;f&&f(),this.cancel()}complete(){const{resolved:e}=this;e&&e.animation.finish()}cancel(){const{resolved:e}=this;e&&e.animation.cancel()}static supports(e){const{motionValue:n,name:i,repeatDelay:s,repeatType:a,damping:l,type:u}=e;if(!n||!n.owner||!(n.owner.current instanceof HTMLElement))return!1;const{onUpdate:f,transformTemplate:d}=n.owner.getProps();return dL()&&i&&cL.has(i)&&!f&&!d&&!s&&a!=="mirror"&&l!==0&&u!=="inertia"}}const vL={type:"spring",stiffness:500,damping:25,restSpeed:10},yL=t=>({type:"spring",stiffness:550,damping:t===0?2*Math.sqrt(550):30,restSpeed:10}),xL={type:"keyframes",duration:.8},_L={type:"keyframes",ease:[.25,.1,.35,1],duration:.3},SL=(t,{keyframes:e})=>e.length>2?xL:ho.has(t)?t.startsWith("scale")?yL(e[1]):vL:_L;function EL({when:t,delay:e,delayChildren:n,staggerChildren:i,staggerDirection:s,repeat:a,repeatType:l,repeatDelay:u,from:f,elapsed:d,...h}){return!!Object.keys(h).length}const mv=(t,e,n,i={},s,a)=>l=>{const u=ev(i,t)||{},f=u.delay||i.delay||0;let{elapsed:d=0}=i;d=d-Dr(f);let h={keyframes:Array.isArray(n)?n:[null,n],ease:"easeOut",velocity:e.getVelocity(),...u,delay:-d,onUpdate:g=>{e.set(g),u.onUpdate&&u.onUpdate(g)},onComplete:()=>{l(),u.onComplete&&u.onComplete()},name:t,motionValue:e,element:a?void 0:s};EL(u)||(h={...h,...SL(t,h)}),h.duration&&(h.duration=Dr(h.duration)),h.repeatDelay&&(h.repeatDelay=Dr(h.repeatDelay)),h.from!==void 0&&(h.keyframes[0]=h.from);let m=!1;if((h.type===!1||h.duration===0&&!h.repeatDelay)&&(h.duration=0,h.delay===0&&(m=!0)),m&&!a&&e.get()!==void 0){const g=od(h.keyframes,u);if(g!==void 0)return qt.update(()=>{h.onUpdate(g),h.onComplete()}),new HP([])}return!a&&l_.supports(h)?new l_(h):new pv(h)};function wL({protectedKeys:t,needsAnimating:e},n){const i=t.hasOwnProperty(n)&&e[n]!==!0;return e[n]=!1,i}function Cw(t,e,{delay:n=0,transitionOverride:i,type:s}={}){var a;let{transition:l=t.getDefaultTransition(),transitionEnd:u,...f}=e;i&&(l=i);const d=[],h=s&&t.animationState&&t.animationState.getState()[s];for(const m in f){const g=t.getValue(m,(a=t.latestValues[m])!==null&&a!==void 0?a:null),v=f[m];if(v===void 0||h&&wL(h,m))continue;const E={delay:n,...ev(l||{},m)};let w=!1;if(window.MotionHandoffAnimation){const y=Z1(t);if(y){const M=window.MotionHandoffAnimation(y,m,qt);M!==null&&(E.startTime=M,w=!0)}}gm(t,m),g.start(mv(m,g,v,t.shouldReduceMotion&&Y1.has(m)?{type:!1}:E,t,w));const _=g.animation;_&&d.push(_)}return u&&Promise.all(d).then(()=>{qt.update(()=>{u&&nD(t,u)})}),d}function wm(t,e,n={}){var i;const s=sd(t,e,n.type==="exit"?(i=t.presenceContext)===null||i===void 0?void 0:i.custom:void 0);let{transition:a=t.getDefaultTransition()||{}}=s||{};n.transitionOverride&&(a=n.transitionOverride);const l=s?()=>Promise.all(Cw(t,s,n)):()=>Promise.resolve(),u=t.variantChildren&&t.variantChildren.size?(d=0)=>{const{delayChildren:h=0,staggerChildren:m,staggerDirection:g}=a;return ML(t,e,h+d,m,g,n)}:()=>Promise.resolve(),{when:f}=a;if(f){const[d,h]=f==="beforeChildren"?[l,u]:[u,l];return d().then(()=>h())}else return Promise.all([l(),u(n.delay)])}function ML(t,e,n=0,i=0,s=1,a){const l=[],u=(t.variantChildren.size-1)*i,f=s===1?(d=0)=>d*i:(d=0)=>u-d*i;return Array.from(t.variantChildren).sort(TL).forEach((d,h)=>{d.notify("AnimationStart",e),l.push(wm(d,e,{...a,delay:n+f(h)}).then(()=>d.notify("AnimationComplete",e)))}),Promise.all(l)}function TL(t,e){return t.sortNodePosition(e)}function AL(t,e,n={}){t.notify("AnimationStart",e);let i;if(Array.isArray(e)){const s=e.map(a=>wm(t,a,n));i=Promise.all(s)}else if(typeof e=="string")i=wm(t,e,n);else{const s=typeof e=="function"?sd(t,e,n.custom):e;i=Promise.all(Cw(t,s,n))}return i.then(()=>{t.notify("AnimationComplete",e)})}const CL=Hg.length;function bw(t){if(!t)return;if(!t.isControllingVariants){const n=t.parent?bw(t.parent)||{}:{};return t.props.initial!==void 0&&(n.initial=t.props.initial),n}const e={};for(let n=0;n<CL;n++){const i=Hg[n],s=t.props[i];(Xl(s)||s===!1)&&(e[i]=s)}return e}const bL=[...Vg].reverse(),RL=Vg.length;function PL(t){return e=>Promise.all(e.map(({animation:n,options:i})=>AL(t,n,i)))}function DL(t){let e=PL(t),n=u_(),i=!0;const s=f=>(d,h)=>{var m;const g=sd(t,h,f==="exit"?(m=t.presenceContext)===null||m===void 0?void 0:m.custom:void 0);if(g){const{transition:v,transitionEnd:E,...w}=g;d={...d,...w,...E}}return d};function a(f){e=f(t)}function l(f){const{props:d}=t,h=bw(t.parent)||{},m=[],g=new Set;let v={},E=1/0;for(let _=0;_<RL;_++){const y=bL[_],M=n[y],T=d[y]!==void 0?d[y]:h[y],C=Xl(T),N=y===f?M.isActive:null;N===!1&&(E=_);let b=T===h[y]&&T!==d[y]&&C;if(b&&i&&t.manuallyAnimateOnMount&&(b=!1),M.protectedKeys={...v},!M.isActive&&N===null||!T&&!M.prevProp||id(T)||typeof T=="boolean")continue;const k=LL(M.prevProp,T);let B=k||y===f&&M.isActive&&!b&&C||_>E&&C,L=!1;const R=Array.isArray(T)?T:[T];let O=R.reduce(s(y),{});N===!1&&(O={});const{prevResolvedValues:Z={}}=M,X={...Z,...O},J=re=>{B=!0,g.has(re)&&(L=!0,g.delete(re)),M.needsAnimating[re]=!0;const G=t.getValue(re);G&&(G.liveStyle=!1)};for(const re in X){const G=O[re],ue=Z[re];if(v.hasOwnProperty(re))continue;let D=!1;hm(G)&&hm(ue)?D=!V1(G,ue):D=G!==ue,D?G!=null?J(re):g.add(re):G!==void 0&&g.has(re)?J(re):M.protectedKeys[re]=!0}M.prevProp=T,M.prevResolvedValues=O,M.isActive&&(v={...v,...O}),i&&t.blockInitialAnimation&&(B=!1),B&&(!(b&&k)||L)&&m.push(...R.map(re=>({animation:re,options:{type:y}})))}if(g.size){const _={};g.forEach(y=>{const M=t.getBaseTarget(y),T=t.getValue(y);T&&(T.liveStyle=!0),_[y]=M??null}),m.push({animation:_})}let w=!!m.length;return i&&(d.initial===!1||d.initial===d.animate)&&!t.manuallyAnimateOnMount&&(w=!1),i=!1,w?e(m):Promise.resolve()}function u(f,d){var h;if(n[f].isActive===d)return Promise.resolve();(h=t.variantChildren)===null||h===void 0||h.forEach(g=>{var v;return(v=g.animationState)===null||v===void 0?void 0:v.setActive(f,d)}),n[f].isActive=d;const m=l(f);for(const g in n)n[g].protectedKeys={};return m}return{animateChanges:l,setActive:u,setAnimateFunction:a,getState:()=>n,reset:()=>{n=u_(),i=!0}}}function LL(t,e){return typeof e=="string"?e!==t:Array.isArray(e)?!V1(e,t):!1}function Gs(t=!1){return{isActive:t,protectedKeys:{},needsAnimating:{},prevResolvedValues:{}}}function u_(){return{animate:Gs(!0),whileInView:Gs(),whileHover:Gs(),whileTap:Gs(),whileDrag:Gs(),whileFocus:Gs(),exit:Gs()}}class Ts{constructor(e){this.isMounted=!1,this.node=e}update(){}}class IL extends Ts{constructor(e){super(e),e.animationState||(e.animationState=DL(e))}updateAnimationControlsSubscription(){const{animate:e}=this.node.getProps();id(e)&&(this.unmountControls=e.subscribe(this.node))}mount(){this.updateAnimationControlsSubscription()}update(){const{animate:e}=this.node.getProps(),{animate:n}=this.node.prevProps||{};e!==n&&this.updateAnimationControlsSubscription()}unmount(){var e;this.node.animationState.reset(),(e=this.unmountControls)===null||e===void 0||e.call(this)}}let kL=0;class NL extends Ts{constructor(){super(...arguments),this.id=kL++}update(){if(!this.node.presenceContext)return;const{isPresent:e,onExitComplete:n}=this.node.presenceContext,{isPresent:i}=this.node.prevPresenceContext||{};if(!this.node.animationState||e===i)return;const s=this.node.animationState.setActive("exit",!e);n&&!e&&s.then(()=>n(this.id))}mount(){const{register:e}=this.node.presenceContext||{};e&&(this.unmount=e(this.id))}unmount(){}}const UL={animation:{Feature:IL},exit:{Feature:NL}};function Kl(t,e,n,i={passive:!0}){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n)}function ou(t){return{point:{x:t.pageX,y:t.pageY}}}const FL=t=>e=>iv(e)&&t(e,ou(e));function Fl(t,e,n,i){return Kl(t,e,FL(n),i)}const c_=(t,e)=>Math.abs(t-e);function OL(t,e){const n=c_(t.x,e.x),i=c_(t.y,e.y);return Math.sqrt(n**2+i**2)}class Rw{constructor(e,n,{transformPagePoint:i,contextWindow:s,dragSnapToOrigin:a=!1}={}){if(this.startEvent=null,this.lastMoveEvent=null,this.lastMoveEventInfo=null,this.handlers={},this.contextWindow=window,this.updatePoint=()=>{if(!(this.lastMoveEvent&&this.lastMoveEventInfo))return;const m=ap(this.lastMoveEventInfo,this.history),g=this.startEvent!==null,v=OL(m.offset,{x:0,y:0})>=3;if(!g&&!v)return;const{point:E}=m,{timestamp:w}=bn;this.history.push({...E,timestamp:w});const{onStart:_,onMove:y}=this.handlers;g||(_&&_(this.lastMoveEvent,m),this.startEvent=this.lastMoveEvent),y&&y(this.lastMoveEvent,m)},this.handlePointerMove=(m,g)=>{this.lastMoveEvent=m,this.lastMoveEventInfo=op(g,this.transformPagePoint),qt.update(this.updatePoint,!0)},this.handlePointerUp=(m,g)=>{this.end();const{onEnd:v,onSessionEnd:E,resumeAnimation:w}=this.handlers;if(this.dragSnapToOrigin&&w&&w(),!(this.lastMoveEvent&&this.lastMoveEventInfo))return;const _=ap(m.type==="pointercancel"?this.lastMoveEventInfo:op(g,this.transformPagePoint),this.history);this.startEvent&&v&&v(m,_),E&&E(m,_)},!iv(e))return;this.dragSnapToOrigin=a,this.handlers=n,this.transformPagePoint=i,this.contextWindow=s||window;const l=ou(e),u=op(l,this.transformPagePoint),{point:f}=u,{timestamp:d}=bn;this.history=[{...f,timestamp:d}];const{onSessionStart:h}=n;h&&h(e,ap(u,this.history)),this.removeListeners=su(Fl(this.contextWindow,"pointermove",this.handlePointerMove),Fl(this.contextWindow,"pointerup",this.handlePointerUp),Fl(this.contextWindow,"pointercancel",this.handlePointerUp))}updateHandlers(e){this.handlers=e}end(){this.removeListeners&&this.removeListeners(),Es(this.updatePoint)}}function op(t,e){return e?{point:e(t.point)}:t}function f_(t,e){return{x:t.x-e.x,y:t.y-e.y}}function ap({point:t},e){return{point:t,delta:f_(t,Pw(e)),offset:f_(t,BL(e)),velocity:zL(e,.1)}}function BL(t){return t[0]}function Pw(t){return t[t.length-1]}function zL(t,e){if(t.length<2)return{x:0,y:0};let n=t.length-1,i=null;const s=Pw(t);for(;n>=0&&(i=t[n],!(s.timestamp-i.timestamp>Dr(e)));)n--;if(!i)return{x:0,y:0};const a=Lr(s.timestamp-i.timestamp);if(a===0)return{x:0,y:0};const l={x:(s.x-i.x)/a,y:(s.y-i.y)/a};return l.x===1/0&&(l.x=0),l.y===1/0&&(l.y=0),l}const Dw=1e-4,VL=1-Dw,HL=1+Dw,Lw=.01,GL=0-Lw,WL=0+Lw;function gi(t){return t.max-t.min}function jL(t,e,n){return Math.abs(t-e)<=n}function d_(t,e,n,i=.5){t.origin=i,t.originPoint=Jt(e.min,e.max,t.origin),t.scale=gi(n)/gi(e),t.translate=Jt(n.min,n.max,t.origin)-t.originPoint,(t.scale>=VL&&t.scale<=HL||isNaN(t.scale))&&(t.scale=1),(t.translate>=GL&&t.translate<=WL||isNaN(t.translate))&&(t.translate=0)}function Ol(t,e,n,i){d_(t.x,e.x,n.x,i?i.originX:void 0),d_(t.y,e.y,n.y,i?i.originY:void 0)}function h_(t,e,n){t.min=n.min+e.min,t.max=t.min+gi(e)}function XL(t,e,n){h_(t.x,e.x,n.x),h_(t.y,e.y,n.y)}function p_(t,e,n){t.min=e.min-n.min,t.max=t.min+gi(e)}function Bl(t,e,n){p_(t.x,e.x,n.x),p_(t.y,e.y,n.y)}function $L(t,{min:e,max:n},i){return e!==void 0&&t<e?t=i?Jt(e,t,i.min):Math.max(t,e):n!==void 0&&t>n&&(t=i?Jt(n,t,i.max):Math.min(t,n)),t}function m_(t,e,n){return{min:e!==void 0?t.min+e:void 0,max:n!==void 0?t.max+n-(t.max-t.min):void 0}}function qL(t,{top:e,left:n,bottom:i,right:s}){return{x:m_(t.x,n,s),y:m_(t.y,e,i)}}function g_(t,e){let n=e.min-t.min,i=e.max-t.max;return e.max-e.min<t.max-t.min&&([n,i]=[i,n]),{min:n,max:i}}function YL(t,e){return{x:g_(t.x,e.x),y:g_(t.y,e.y)}}function KL(t,e){let n=.5;const i=gi(t),s=gi(e);return s>i?n=Sa(e.min,e.max-i,t.min):i>s&&(n=Sa(t.min,t.max-s,e.min)),kr(0,1,n)}function ZL(t,e){const n={};return e.min!==void 0&&(n.min=e.min-t.min),e.max!==void 0&&(n.max=e.max-t.min),n}const Mm=.35;function QL(t=Mm){return t===!1?t=0:t===!0&&(t=Mm),{x:v_(t,"left","right"),y:v_(t,"top","bottom")}}function v_(t,e,n){return{min:y_(t,e),max:y_(t,n)}}function y_(t,e){return typeof t=="number"?t:t[e]||0}const x_=()=>({translate:0,scale:1,origin:0,originPoint:0}),oa=()=>({x:x_(),y:x_()}),__=()=>({min:0,max:0}),an=()=>({x:__(),y:__()});function Ti(t){return[t("x"),t("y")]}function Iw({top:t,left:e,right:n,bottom:i}){return{x:{min:e,max:n},y:{min:t,max:i}}}function JL({x:t,y:e}){return{top:e.min,right:t.max,bottom:e.max,left:t.min}}function e2(t,e){if(!e)return t;const n=e({x:t.left,y:t.top}),i=e({x:t.right,y:t.bottom});return{top:n.y,left:n.x,bottom:i.y,right:i.x}}function lp(t){return t===void 0||t===1}function Tm({scale:t,scaleX:e,scaleY:n}){return!lp(t)||!lp(e)||!lp(n)}function Ks(t){return Tm(t)||kw(t)||t.z||t.rotate||t.rotateX||t.rotateY||t.skewX||t.skewY}function kw(t){return S_(t.x)||S_(t.y)}function S_(t){return t&&t!=="0%"}function zf(t,e,n){const i=t-n,s=e*i;return n+s}function E_(t,e,n,i,s){return s!==void 0&&(t=zf(t,s,i)),zf(t,n,i)+e}function Am(t,e=0,n=1,i,s){t.min=E_(t.min,e,n,i,s),t.max=E_(t.max,e,n,i,s)}function Nw(t,{x:e,y:n}){Am(t.x,e.translate,e.scale,e.originPoint),Am(t.y,n.translate,n.scale,n.originPoint)}const w_=.999999999999,M_=1.0000000000001;function t2(t,e,n,i=!1){const s=n.length;if(!s)return;e.x=e.y=1;let a,l;for(let u=0;u<s;u++){a=n[u],l=a.projectionDelta;const{visualElement:f}=a.options;f&&f.props.style&&f.props.style.display==="contents"||(i&&a.options.layoutScroll&&a.scroll&&a!==a.root&&la(t,{x:-a.scroll.offset.x,y:-a.scroll.offset.y}),l&&(e.x*=l.x.scale,e.y*=l.y.scale,Nw(t,l)),i&&Ks(a.latestValues)&&la(t,a.latestValues))}e.x<M_&&e.x>w_&&(e.x=1),e.y<M_&&e.y>w_&&(e.y=1)}function aa(t,e){t.min=t.min+e,t.max=t.max+e}function T_(t,e,n,i,s=.5){const a=Jt(t.min,t.max,s);Am(t,e,n,a,i)}function la(t,e){T_(t.x,e.x,e.scaleX,e.scale,e.originX),T_(t.y,e.y,e.scaleY,e.scale,e.originY)}function Uw(t,e){return Iw(e2(t.getBoundingClientRect(),e))}function n2(t,e,n){const i=Uw(t,n),{scroll:s}=e;return s&&(aa(i.x,s.offset.x),aa(i.y,s.offset.y)),i}const Fw=({current:t})=>t?t.ownerDocument.defaultView:null,i2=new WeakMap;class r2{constructor(e){this.openDragLock=null,this.isDragging=!1,this.currentDirection=null,this.originPoint={x:0,y:0},this.constraints=!1,this.hasMutatedConstraints=!1,this.elastic=an(),this.visualElement=e}start(e,{snapToCursor:n=!1}={}){const{presenceContext:i}=this.visualElement;if(i&&i.isPresent===!1)return;const s=h=>{const{dragSnapToOrigin:m}=this.getProps();m?this.pauseAnimation():this.stopAnimation(),n&&this.snapToCursor(ou(h).point)},a=(h,m)=>{const{drag:g,dragPropagation:v,onDragStart:E}=this.getProps();if(g&&!v&&(this.openDragLock&&this.openDragLock(),this.openDragLock=ZP(g),!this.openDragLock))return;this.isDragging=!0,this.currentDirection=null,this.resolveConstraints(),this.visualElement.projection&&(this.visualElement.projection.isAnimationBlocked=!0,this.visualElement.projection.target=void 0),Ti(_=>{let y=this.getAxisMotionValue(_).get()||0;if(ir.test(y)){const{projection:M}=this.visualElement;if(M&&M.layout){const T=M.layout.layoutBox[_];T&&(y=gi(T)*(parseFloat(y)/100))}}this.originPoint[_]=y}),E&&qt.postRender(()=>E(h,m)),gm(this.visualElement,"transform");const{animationState:w}=this.visualElement;w&&w.setActive("whileDrag",!0)},l=(h,m)=>{const{dragPropagation:g,dragDirectionLock:v,onDirectionLock:E,onDrag:w}=this.getProps();if(!g&&!this.openDragLock)return;const{offset:_}=m;if(v&&this.currentDirection===null){this.currentDirection=s2(_),this.currentDirection!==null&&E&&E(this.currentDirection);return}this.updateAxis("x",m.point,_),this.updateAxis("y",m.point,_),this.visualElement.render(),w&&w(h,m)},u=(h,m)=>this.stop(h,m),f=()=>Ti(h=>{var m;return this.getAnimationState(h)==="paused"&&((m=this.getAxisMotionValue(h).animation)===null||m===void 0?void 0:m.play())}),{dragSnapToOrigin:d}=this.getProps();this.panSession=new Rw(e,{onSessionStart:s,onStart:a,onMove:l,onSessionEnd:u,resumeAnimation:f},{transformPagePoint:this.visualElement.getTransformPagePoint(),dragSnapToOrigin:d,contextWindow:Fw(this.visualElement)})}stop(e,n){const i=this.isDragging;if(this.cancel(),!i)return;const{velocity:s}=n;this.startAnimation(s);const{onDragEnd:a}=this.getProps();a&&qt.postRender(()=>a(e,n))}cancel(){this.isDragging=!1;const{projection:e,animationState:n}=this.visualElement;e&&(e.isAnimationBlocked=!1),this.panSession&&this.panSession.end(),this.panSession=void 0;const{dragPropagation:i}=this.getProps();!i&&this.openDragLock&&(this.openDragLock(),this.openDragLock=null),n&&n.setActive("whileDrag",!1)}updateAxis(e,n,i){const{drag:s}=this.getProps();if(!i||!Pc(e,s,this.currentDirection))return;const a=this.getAxisMotionValue(e);let l=this.originPoint[e]+i[e];this.constraints&&this.constraints[e]&&(l=$L(l,this.constraints[e],this.elastic[e])),a.set(l)}resolveConstraints(){var e;const{dragConstraints:n,dragElastic:i}=this.getProps(),s=this.visualElement.projection&&!this.visualElement.projection.layout?this.visualElement.projection.measure(!1):(e=this.visualElement.projection)===null||e===void 0?void 0:e.layout,a=this.constraints;n&&ra(n)?this.constraints||(this.constraints=this.resolveRefConstraints()):n&&s?this.constraints=qL(s.layoutBox,n):this.constraints=!1,this.elastic=QL(i),a!==this.constraints&&s&&this.constraints&&!this.hasMutatedConstraints&&Ti(l=>{this.constraints!==!1&&this.getAxisMotionValue(l)&&(this.constraints[l]=ZL(s.layoutBox[l],this.constraints[l]))})}resolveRefConstraints(){const{dragConstraints:e,onMeasureDragConstraints:n}=this.getProps();if(!e||!ra(e))return!1;const i=e.current,{projection:s}=this.visualElement;if(!s||!s.layout)return!1;const a=n2(i,s.root,this.visualElement.getTransformPagePoint());let l=YL(s.layout.layoutBox,a);if(n){const u=n(JL(l));this.hasMutatedConstraints=!!u,u&&(l=Iw(u))}return l}startAnimation(e){const{drag:n,dragMomentum:i,dragElastic:s,dragTransition:a,dragSnapToOrigin:l,onDragTransitionEnd:u}=this.getProps(),f=this.constraints||{},d=Ti(h=>{if(!Pc(h,n,this.currentDirection))return;let m=f[h]||{};l&&(m={min:0,max:0});const g=s?200:1e6,v=s?40:1e7,E={type:"inertia",velocity:i?e[h]:0,bounceStiffness:g,bounceDamping:v,timeConstant:750,restDelta:1,restSpeed:10,...a,...m};return this.startAxisValueAnimation(h,E)});return Promise.all(d).then(u)}startAxisValueAnimation(e,n){const i=this.getAxisMotionValue(e);return gm(this.visualElement,e),i.start(mv(e,i,0,n,this.visualElement,!1))}stopAnimation(){Ti(e=>this.getAxisMotionValue(e).stop())}pauseAnimation(){Ti(e=>{var n;return(n=this.getAxisMotionValue(e).animation)===null||n===void 0?void 0:n.pause()})}getAnimationState(e){var n;return(n=this.getAxisMotionValue(e).animation)===null||n===void 0?void 0:n.state}getAxisMotionValue(e){const n=`_drag${e.toUpperCase()}`,i=this.visualElement.getProps(),s=i[n];return s||this.visualElement.getValue(e,(i.initial?i.initial[e]:void 0)||0)}snapToCursor(e){Ti(n=>{const{drag:i}=this.getProps();if(!Pc(n,i,this.currentDirection))return;const{projection:s}=this.visualElement,a=this.getAxisMotionValue(n);if(s&&s.layout){const{min:l,max:u}=s.layout.layoutBox[n];a.set(e[n]-Jt(l,u,.5))}})}scalePositionWithinConstraints(){if(!this.visualElement.current)return;const{drag:e,dragConstraints:n}=this.getProps(),{projection:i}=this.visualElement;if(!ra(n)||!i||!this.constraints)return;this.stopAnimation();const s={x:0,y:0};Ti(l=>{const u=this.getAxisMotionValue(l);if(u&&this.constraints!==!1){const f=u.get();s[l]=KL({min:f,max:f},this.constraints[l])}});const{transformTemplate:a}=this.visualElement.getProps();this.visualElement.current.style.transform=a?a({},""):"none",i.root&&i.root.updateScroll(),i.updateLayout(),this.resolveConstraints(),Ti(l=>{if(!Pc(l,e,null))return;const u=this.getAxisMotionValue(l),{min:f,max:d}=this.constraints[l];u.set(Jt(f,d,s[l]))})}addListeners(){if(!this.visualElement.current)return;i2.set(this.visualElement,this);const e=this.visualElement.current,n=Fl(e,"pointerdown",f=>{const{drag:d,dragListener:h=!0}=this.getProps();d&&h&&this.start(f)}),i=()=>{const{dragConstraints:f}=this.getProps();ra(f)&&f.current&&(this.constraints=this.resolveRefConstraints())},{projection:s}=this.visualElement,a=s.addEventListener("measure",i);s&&!s.layout&&(s.root&&s.root.updateScroll(),s.updateLayout()),qt.read(i);const l=Kl(window,"resize",()=>this.scalePositionWithinConstraints()),u=s.addEventListener("didUpdate",({delta:f,hasLayoutChanged:d})=>{this.isDragging&&d&&(Ti(h=>{const m=this.getAxisMotionValue(h);m&&(this.originPoint[h]+=f[h].translate,m.set(m.get()+f[h].translate))}),this.visualElement.render())});return()=>{l(),n(),a(),u&&u()}}getProps(){const e=this.visualElement.getProps(),{drag:n=!1,dragDirectionLock:i=!1,dragPropagation:s=!1,dragConstraints:a=!1,dragElastic:l=Mm,dragMomentum:u=!0}=e;return{...e,drag:n,dragDirectionLock:i,dragPropagation:s,dragConstraints:a,dragElastic:l,dragMomentum:u}}}function Pc(t,e,n){return(e===!0||e===t)&&(n===null||n===t)}function s2(t,e=10){let n=null;return Math.abs(t.y)>e?n="y":Math.abs(t.x)>e&&(n="x"),n}class o2 extends Ts{constructor(e){super(e),this.removeGroupControls=pi,this.removeListeners=pi,this.controls=new r2(e)}mount(){const{dragControls:e}=this.node.getProps();e&&(this.removeGroupControls=e.subscribe(this.controls)),this.removeListeners=this.controls.addListeners()||pi}unmount(){this.removeGroupControls(),this.removeListeners()}}const A_=t=>(e,n)=>{t&&qt.postRender(()=>t(e,n))};class a2 extends Ts{constructor(){super(...arguments),this.removePointerDownListener=pi}onPointerDown(e){this.session=new Rw(e,this.createPanHandlers(),{transformPagePoint:this.node.getTransformPagePoint(),contextWindow:Fw(this.node)})}createPanHandlers(){const{onPanSessionStart:e,onPanStart:n,onPan:i,onPanEnd:s}=this.node.getProps();return{onSessionStart:A_(e),onStart:A_(n),onMove:i,onEnd:(a,l)=>{delete this.session,s&&qt.postRender(()=>s(a,l))}}}mount(){this.removePointerDownListener=Fl(this.node.current,"pointerdown",e=>this.onPointerDown(e))}update(){this.session&&this.session.updateHandlers(this.createPanHandlers())}unmount(){this.removePointerDownListener(),this.session&&this.session.end()}}const Ef={hasAnimatedSinceResize:!0,hasEverUpdated:!1};function C_(t,e){return e.max===e.min?0:t/(e.max-e.min)*100}const Sl={correct:(t,e)=>{if(!e.target)return t;if(typeof t=="string")if(ot.test(t))t=parseFloat(t);else return t;const n=C_(t,e.target.x),i=C_(t,e.target.y);return`${n}% ${i}%`}},l2={correct:(t,{treeScale:e,projectionDelta:n})=>{const i=t,s=ws.parse(t);if(s.length>5)return i;const a=ws.createTransformer(t),l=typeof s[0]!="number"?1:0,u=n.x.scale*e.x,f=n.y.scale*e.y;s[0+l]/=u,s[1+l]/=f;const d=Jt(u,f,.5);return typeof s[2+l]=="number"&&(s[2+l]/=d),typeof s[3+l]=="number"&&(s[3+l]/=d),a(s)}};class u2 extends $.Component{componentDidMount(){const{visualElement:e,layoutGroup:n,switchLayoutGroup:i,layoutId:s}=this.props,{projection:a}=e;PP(c2),a&&(n.group&&n.group.add(a),i&&i.register&&s&&i.register(a),a.root.didUpdate(),a.addEventListener("animationComplete",()=>{this.safeToRemove()}),a.setOptions({...a.options,onExitComplete:()=>this.safeToRemove()})),Ef.hasEverUpdated=!0}getSnapshotBeforeUpdate(e){const{layoutDependency:n,visualElement:i,drag:s,isPresent:a}=this.props,l=i.projection;return l&&(l.isPresent=a,s||e.layoutDependency!==n||n===void 0?l.willUpdate():this.safeToRemove(),e.isPresent!==a&&(a?l.promote():l.relegate()||qt.postRender(()=>{const u=l.getStack();(!u||!u.members.length)&&this.safeToRemove()}))),null}componentDidUpdate(){const{projection:e}=this.props.visualElement;e&&(e.root.didUpdate(),Wg.postRender(()=>{!e.currentAnimation&&e.isLead()&&this.safeToRemove()}))}componentWillUnmount(){const{visualElement:e,layoutGroup:n,switchLayoutGroup:i}=this.props,{projection:s}=e;s&&(s.scheduleCheckAfterUnmount(),n&&n.group&&n.group.remove(s),i&&i.deregister&&i.deregister(s))}safeToRemove(){const{safeToRemove:e}=this.props;e&&e()}render(){return null}}function Ow(t){const[e,n]=S1(),i=$.useContext(Ug);return he.jsx(u2,{...t,layoutGroup:i,switchLayoutGroup:$.useContext(b1),isPresent:e,safeToRemove:n})}const c2={borderRadius:{...Sl,applyTo:["borderTopLeftRadius","borderTopRightRadius","borderBottomLeftRadius","borderBottomRightRadius"]},borderTopLeftRadius:Sl,borderTopRightRadius:Sl,borderBottomLeftRadius:Sl,borderBottomRightRadius:Sl,boxShadow:l2};function f2(t,e,n){const i=On(t)?t:ql(t);return i.start(mv("",i,e,n)),i.animation}function d2(t){return t instanceof SVGElement&&t.tagName!=="svg"}const h2=(t,e)=>t.depth-e.depth;class p2{constructor(){this.children=[],this.isDirty=!1}add(e){rv(this.children,e),this.isDirty=!0}remove(e){sv(this.children,e),this.isDirty=!0}forEach(e){this.isDirty&&this.children.sort(h2),this.isDirty=!1,this.children.forEach(e)}}function m2(t,e){const n=rr.now(),i=({timestamp:s})=>{const a=s-n;a>=e&&(Es(i),t(a-e))};return qt.read(i,!0),()=>Es(i)}const Bw=["TopLeft","TopRight","BottomLeft","BottomRight"],g2=Bw.length,b_=t=>typeof t=="string"?parseFloat(t):t,R_=t=>typeof t=="number"||ot.test(t);function v2(t,e,n,i,s,a){s?(t.opacity=Jt(0,n.opacity!==void 0?n.opacity:1,y2(i)),t.opacityExit=Jt(e.opacity!==void 0?e.opacity:1,0,x2(i))):a&&(t.opacity=Jt(e.opacity!==void 0?e.opacity:1,n.opacity!==void 0?n.opacity:1,i));for(let l=0;l<g2;l++){const u=`border${Bw[l]}Radius`;let f=P_(e,u),d=P_(n,u);if(f===void 0&&d===void 0)continue;f||(f=0),d||(d=0),f===0||d===0||R_(f)===R_(d)?(t[u]=Math.max(Jt(b_(f),b_(d),i),0),(ir.test(d)||ir.test(f))&&(t[u]+="%")):t[u]=d}(e.rotate||n.rotate)&&(t.rotate=Jt(e.rotate||0,n.rotate||0,i))}function P_(t,e){return t[e]!==void 0?t[e]:t.borderRadius}const y2=zw(0,.5,rw),x2=zw(.5,.95,pi);function zw(t,e,n){return i=>i<t?0:i>e?1:n(Sa(t,e,i))}function D_(t,e){t.min=e.min,t.max=e.max}function wi(t,e){D_(t.x,e.x),D_(t.y,e.y)}function L_(t,e){t.translate=e.translate,t.scale=e.scale,t.originPoint=e.originPoint,t.origin=e.origin}function I_(t,e,n,i,s){return t-=e,t=zf(t,1/n,i),s!==void 0&&(t=zf(t,1/s,i)),t}function _2(t,e=0,n=1,i=.5,s,a=t,l=t){if(ir.test(e)&&(e=parseFloat(e),e=Jt(l.min,l.max,e/100)-l.min),typeof e!="number")return;let u=Jt(a.min,a.max,i);t===a&&(u-=e),t.min=I_(t.min,e,n,u,s),t.max=I_(t.max,e,n,u,s)}function k_(t,e,[n,i,s],a,l){_2(t,e[n],e[i],e[s],e.scale,a,l)}const S2=["x","scaleX","originX"],E2=["y","scaleY","originY"];function N_(t,e,n,i){k_(t.x,e,S2,n?n.x:void 0,i?i.x:void 0),k_(t.y,e,E2,n?n.y:void 0,i?i.y:void 0)}function U_(t){return t.translate===0&&t.scale===1}function Vw(t){return U_(t.x)&&U_(t.y)}function F_(t,e){return t.min===e.min&&t.max===e.max}function w2(t,e){return F_(t.x,e.x)&&F_(t.y,e.y)}function O_(t,e){return Math.round(t.min)===Math.round(e.min)&&Math.round(t.max)===Math.round(e.max)}function Hw(t,e){return O_(t.x,e.x)&&O_(t.y,e.y)}function B_(t){return gi(t.x)/gi(t.y)}function z_(t,e){return t.translate===e.translate&&t.scale===e.scale&&t.originPoint===e.originPoint}class M2{constructor(){this.members=[]}add(e){rv(this.members,e),e.scheduleRender()}remove(e){if(sv(this.members,e),e===this.prevLead&&(this.prevLead=void 0),e===this.lead){const n=this.members[this.members.length-1];n&&this.promote(n)}}relegate(e){const n=this.members.findIndex(s=>e===s);if(n===0)return!1;let i;for(let s=n;s>=0;s--){const a=this.members[s];if(a.isPresent!==!1){i=a;break}}return i?(this.promote(i),!0):!1}promote(e,n){const i=this.lead;if(e!==i&&(this.prevLead=i,this.lead=e,e.show(),i)){i.instance&&i.scheduleRender(),e.scheduleRender(),e.resumeFrom=i,n&&(e.resumeFrom.preserveOpacity=!0),i.snapshot&&(e.snapshot=i.snapshot,e.snapshot.latestValues=i.animationValues||i.latestValues),e.root&&e.root.isUpdating&&(e.isLayoutDirty=!0);const{crossfade:s}=e.options;s===!1&&i.hide()}}exitAnimationComplete(){this.members.forEach(e=>{const{options:n,resumingFrom:i}=e;n.onExitComplete&&n.onExitComplete(),i&&i.options.onExitComplete&&i.options.onExitComplete()})}scheduleRender(){this.members.forEach(e=>{e.instance&&e.scheduleRender(!1)})}removeLeadSnapshot(){this.lead&&this.lead.snapshot&&(this.lead.snapshot=void 0)}}function T2(t,e,n){let i="";const s=t.x.translate/e.x,a=t.y.translate/e.y,l=(n==null?void 0:n.z)||0;if((s||a||l)&&(i=`translate3d(${s}px, ${a}px, ${l}px) `),(e.x!==1||e.y!==1)&&(i+=`scale(${1/e.x}, ${1/e.y}) `),n){const{transformPerspective:d,rotate:h,rotateX:m,rotateY:g,skewX:v,skewY:E}=n;d&&(i=`perspective(${d}px) ${i}`),h&&(i+=`rotate(${h}deg) `),m&&(i+=`rotateX(${m}deg) `),g&&(i+=`rotateY(${g}deg) `),v&&(i+=`skewX(${v}deg) `),E&&(i+=`skewY(${E}deg) `)}const u=t.x.scale*e.x,f=t.y.scale*e.y;return(u!==1||f!==1)&&(i+=`scale(${u}, ${f})`),i||"none"}const Zs={type:"projectionFrame",totalNodes:0,resolvedTargetDeltas:0,recalculatedProjection:0},Il=typeof window<"u"&&window.MotionDebug!==void 0,up=["","X","Y","Z"],A2={visibility:"hidden"},V_=1e3;let C2=0;function cp(t,e,n,i){const{latestValues:s}=e;s[t]&&(n[t]=s[t],e.setStaticValue(t,0),i&&(i[t]=0))}function Gw(t){if(t.hasCheckedOptimisedAppear=!0,t.root===t)return;const{visualElement:e}=t.options;if(!e)return;const n=Z1(e);if(window.MotionHasOptimisedAnimation(n,"transform")){const{layout:s,layoutId:a}=t.options;window.MotionCancelOptimisedAnimation(n,"transform",qt,!(s||a))}const{parent:i}=t;i&&!i.hasCheckedOptimisedAppear&&Gw(i)}function Ww({attachResizeListener:t,defaultParent:e,measureScroll:n,checkIsScrollRoot:i,resetTransform:s}){return class{constructor(l={},u=e==null?void 0:e()){this.id=C2++,this.animationId=0,this.children=new Set,this.options={},this.isTreeAnimating=!1,this.isAnimationBlocked=!1,this.isLayoutDirty=!1,this.isProjectionDirty=!1,this.isSharedProjectionDirty=!1,this.isTransformDirty=!1,this.updateManuallyBlocked=!1,this.updateBlockedByResize=!1,this.isUpdating=!1,this.isSVG=!1,this.needsReset=!1,this.shouldResetTransform=!1,this.hasCheckedOptimisedAppear=!1,this.treeScale={x:1,y:1},this.eventHandlers=new Map,this.hasTreeAnimated=!1,this.updateScheduled=!1,this.scheduleUpdate=()=>this.update(),this.projectionUpdateScheduled=!1,this.checkUpdateFailed=()=>{this.isUpdating&&(this.isUpdating=!1,this.clearAllSnapshots())},this.updateProjection=()=>{this.projectionUpdateScheduled=!1,Il&&(Zs.totalNodes=Zs.resolvedTargetDeltas=Zs.recalculatedProjection=0),this.nodes.forEach(P2),this.nodes.forEach(N2),this.nodes.forEach(U2),this.nodes.forEach(D2),Il&&window.MotionDebug.record(Zs)},this.resolvedRelativeTargetAt=0,this.hasProjected=!1,this.isVisible=!0,this.animationProgress=0,this.sharedNodes=new Map,this.latestValues=l,this.root=u?u.root||u:this,this.path=u?[...u.path,u]:[],this.parent=u,this.depth=u?u.depth+1:0;for(let f=0;f<this.path.length;f++)this.path[f].shouldResetTransform=!0;this.root===this&&(this.nodes=new p2)}addEventListener(l,u){return this.eventHandlers.has(l)||this.eventHandlers.set(l,new ov),this.eventHandlers.get(l).add(u)}notifyListeners(l,...u){const f=this.eventHandlers.get(l);f&&f.notify(...u)}hasListeners(l){return this.eventHandlers.has(l)}mount(l,u=this.root.hasTreeAnimated){if(this.instance)return;this.isSVG=d2(l),this.instance=l;const{layoutId:f,layout:d,visualElement:h}=this.options;if(h&&!h.current&&h.mount(l),this.root.nodes.add(this),this.parent&&this.parent.children.add(this),u&&(d||f)&&(this.isLayoutDirty=!0),t){let m;const g=()=>this.root.updateBlockedByResize=!1;t(l,()=>{this.root.updateBlockedByResize=!0,m&&m(),m=m2(g,250),Ef.hasAnimatedSinceResize&&(Ef.hasAnimatedSinceResize=!1,this.nodes.forEach(G_))})}f&&this.root.registerSharedNode(f,this),this.options.animate!==!1&&h&&(f||d)&&this.addEventListener("didUpdate",({delta:m,hasLayoutChanged:g,hasRelativeTargetChanged:v,layout:E})=>{if(this.isTreeAnimationBlocked()){this.target=void 0,this.relativeTarget=void 0;return}const w=this.options.transition||h.getDefaultTransition()||V2,{onLayoutAnimationStart:_,onLayoutAnimationComplete:y}=h.getProps(),M=!this.targetLayout||!Hw(this.targetLayout,E)||v,T=!g&&v;if(this.options.layoutRoot||this.resumeFrom&&this.resumeFrom.instance||T||g&&(M||!this.currentAnimation)){this.resumeFrom&&(this.resumingFrom=this.resumeFrom,this.resumingFrom.resumingFrom=void 0),this.setAnimationOrigin(m,T);const C={...ev(w,"layout"),onPlay:_,onComplete:y};(h.shouldReduceMotion||this.options.layoutRoot)&&(C.delay=0,C.type=!1),this.startAnimation(C)}else g||G_(this),this.isLead()&&this.options.onExitComplete&&this.options.onExitComplete();this.targetLayout=E})}unmount(){this.options.layoutId&&this.willUpdate(),this.root.nodes.remove(this);const l=this.getStack();l&&l.remove(this),this.parent&&this.parent.children.delete(this),this.instance=void 0,Es(this.updateProjection)}blockUpdate(){this.updateManuallyBlocked=!0}unblockUpdate(){this.updateManuallyBlocked=!1}isUpdateBlocked(){return this.updateManuallyBlocked||this.updateBlockedByResize}isTreeAnimationBlocked(){return this.isAnimationBlocked||this.parent&&this.parent.isTreeAnimationBlocked()||!1}startUpdate(){this.isUpdateBlocked()||(this.isUpdating=!0,this.nodes&&this.nodes.forEach(F2),this.animationId++)}getTransformTemplate(){const{visualElement:l}=this.options;return l&&l.getProps().transformTemplate}willUpdate(l=!0){if(this.root.hasTreeAnimated=!0,this.root.isUpdateBlocked()){this.options.onExitComplete&&this.options.onExitComplete();return}if(window.MotionCancelOptimisedAnimation&&!this.hasCheckedOptimisedAppear&&Gw(this),!this.root.isUpdating&&this.root.startUpdate(),this.isLayoutDirty)return;this.isLayoutDirty=!0;for(let h=0;h<this.path.length;h++){const m=this.path[h];m.shouldResetTransform=!0,m.updateScroll("snapshot"),m.options.layoutRoot&&m.willUpdate(!1)}const{layoutId:u,layout:f}=this.options;if(u===void 0&&!f)return;const d=this.getTransformTemplate();this.prevTransformTemplateValue=d?d(this.latestValues,""):void 0,this.updateSnapshot(),l&&this.notifyListeners("willUpdate")}update(){if(this.updateScheduled=!1,this.isUpdateBlocked()){this.unblockUpdate(),this.clearAllSnapshots(),this.nodes.forEach(H_);return}this.isUpdating||this.nodes.forEach(I2),this.isUpdating=!1,this.nodes.forEach(k2),this.nodes.forEach(b2),this.nodes.forEach(R2),this.clearAllSnapshots();const u=rr.now();bn.delta=kr(0,1e3/60,u-bn.timestamp),bn.timestamp=u,bn.isProcessing=!0,tp.update.process(bn),tp.preRender.process(bn),tp.render.process(bn),bn.isProcessing=!1}didUpdate(){this.updateScheduled||(this.updateScheduled=!0,Wg.read(this.scheduleUpdate))}clearAllSnapshots(){this.nodes.forEach(L2),this.sharedNodes.forEach(O2)}scheduleUpdateProjection(){this.projectionUpdateScheduled||(this.projectionUpdateScheduled=!0,qt.preRender(this.updateProjection,!1,!0))}scheduleCheckAfterUnmount(){qt.postRender(()=>{this.isLayoutDirty?this.root.didUpdate():this.root.checkUpdateFailed()})}updateSnapshot(){this.snapshot||!this.instance||(this.snapshot=this.measure())}updateLayout(){if(!this.instance||(this.updateScroll(),!(this.options.alwaysMeasureLayout&&this.isLead())&&!this.isLayoutDirty))return;if(this.resumeFrom&&!this.resumeFrom.instance)for(let f=0;f<this.path.length;f++)this.path[f].updateScroll();const l=this.layout;this.layout=this.measure(!1),this.layoutCorrected=an(),this.isLayoutDirty=!1,this.projectionDelta=void 0,this.notifyListeners("measure",this.layout.layoutBox);const{visualElement:u}=this.options;u&&u.notify("LayoutMeasure",this.layout.layoutBox,l?l.layoutBox:void 0)}updateScroll(l="measure"){let u=!!(this.options.layoutScroll&&this.instance);if(this.scroll&&this.scroll.animationId===this.root.animationId&&this.scroll.phase===l&&(u=!1),u){const f=i(this.instance);this.scroll={animationId:this.root.animationId,phase:l,isRoot:f,offset:n(this.instance),wasRoot:this.scroll?this.scroll.isRoot:f}}}resetTransform(){if(!s)return;const l=this.isLayoutDirty||this.shouldResetTransform||this.options.alwaysMeasureLayout,u=this.projectionDelta&&!Vw(this.projectionDelta),f=this.getTransformTemplate(),d=f?f(this.latestValues,""):void 0,h=d!==this.prevTransformTemplateValue;l&&(u||Ks(this.latestValues)||h)&&(s(this.instance,d),this.shouldResetTransform=!1,this.scheduleRender())}measure(l=!0){const u=this.measurePageBox();let f=this.removeElementScroll(u);return l&&(f=this.removeTransform(f)),H2(f),{animationId:this.root.animationId,measuredBox:u,layoutBox:f,latestValues:{},source:this.id}}measurePageBox(){var l;const{visualElement:u}=this.options;if(!u)return an();const f=u.measureViewportBox();if(!(((l=this.scroll)===null||l===void 0?void 0:l.wasRoot)||this.path.some(G2))){const{scroll:h}=this.root;h&&(aa(f.x,h.offset.x),aa(f.y,h.offset.y))}return f}removeElementScroll(l){var u;const f=an();if(wi(f,l),!((u=this.scroll)===null||u===void 0)&&u.wasRoot)return f;for(let d=0;d<this.path.length;d++){const h=this.path[d],{scroll:m,options:g}=h;h!==this.root&&m&&g.layoutScroll&&(m.wasRoot&&wi(f,l),aa(f.x,m.offset.x),aa(f.y,m.offset.y))}return f}applyTransform(l,u=!1){const f=an();wi(f,l);for(let d=0;d<this.path.length;d++){const h=this.path[d];!u&&h.options.layoutScroll&&h.scroll&&h!==h.root&&la(f,{x:-h.scroll.offset.x,y:-h.scroll.offset.y}),Ks(h.latestValues)&&la(f,h.latestValues)}return Ks(this.latestValues)&&la(f,this.latestValues),f}removeTransform(l){const u=an();wi(u,l);for(let f=0;f<this.path.length;f++){const d=this.path[f];if(!d.instance||!Ks(d.latestValues))continue;Tm(d.latestValues)&&d.updateSnapshot();const h=an(),m=d.measurePageBox();wi(h,m),N_(u,d.latestValues,d.snapshot?d.snapshot.layoutBox:void 0,h)}return Ks(this.latestValues)&&N_(u,this.latestValues),u}setTargetDelta(l){this.targetDelta=l,this.root.scheduleUpdateProjection(),this.isProjectionDirty=!0}setOptions(l){this.options={...this.options,...l,crossfade:l.crossfade!==void 0?l.crossfade:!0}}clearMeasurements(){this.scroll=void 0,this.layout=void 0,this.snapshot=void 0,this.prevTransformTemplateValue=void 0,this.targetDelta=void 0,this.target=void 0,this.isLayoutDirty=!1}forceRelativeParentToResolveTarget(){this.relativeParent&&this.relativeParent.resolvedRelativeTargetAt!==bn.timestamp&&this.relativeParent.resolveTargetDelta(!0)}resolveTargetDelta(l=!1){var u;const f=this.getLead();this.isProjectionDirty||(this.isProjectionDirty=f.isProjectionDirty),this.isTransformDirty||(this.isTransformDirty=f.isTransformDirty),this.isSharedProjectionDirty||(this.isSharedProjectionDirty=f.isSharedProjectionDirty);const d=!!this.resumingFrom||this!==f;if(!(l||d&&this.isSharedProjectionDirty||this.isProjectionDirty||!((u=this.parent)===null||u===void 0)&&u.isProjectionDirty||this.attemptToResolveRelativeTarget||this.root.updateBlockedByResize))return;const{layout:m,layoutId:g}=this.options;if(!(!this.layout||!(m||g))){if(this.resolvedRelativeTargetAt=bn.timestamp,!this.targetDelta&&!this.relativeTarget){const v=this.getClosestProjectingParent();v&&v.layout&&this.animationProgress!==1?(this.relativeParent=v,this.forceRelativeParentToResolveTarget(),this.relativeTarget=an(),this.relativeTargetOrigin=an(),Bl(this.relativeTargetOrigin,this.layout.layoutBox,v.layout.layoutBox),wi(this.relativeTarget,this.relativeTargetOrigin)):this.relativeParent=this.relativeTarget=void 0}if(!(!this.relativeTarget&&!this.targetDelta)){if(this.target||(this.target=an(),this.targetWithTransforms=an()),this.relativeTarget&&this.relativeTargetOrigin&&this.relativeParent&&this.relativeParent.target?(this.forceRelativeParentToResolveTarget(),XL(this.target,this.relativeTarget,this.relativeParent.target)):this.targetDelta?(this.resumingFrom?this.target=this.applyTransform(this.layout.layoutBox):wi(this.target,this.layout.layoutBox),Nw(this.target,this.targetDelta)):wi(this.target,this.layout.layoutBox),this.attemptToResolveRelativeTarget){this.attemptToResolveRelativeTarget=!1;const v=this.getClosestProjectingParent();v&&!!v.resumingFrom==!!this.resumingFrom&&!v.options.layoutScroll&&v.target&&this.animationProgress!==1?(this.relativeParent=v,this.forceRelativeParentToResolveTarget(),this.relativeTarget=an(),this.relativeTargetOrigin=an(),Bl(this.relativeTargetOrigin,this.target,v.target),wi(this.relativeTarget,this.relativeTargetOrigin)):this.relativeParent=this.relativeTarget=void 0}Il&&Zs.resolvedTargetDeltas++}}}getClosestProjectingParent(){if(!(!this.parent||Tm(this.parent.latestValues)||kw(this.parent.latestValues)))return this.parent.isProjecting()?this.parent:this.parent.getClosestProjectingParent()}isProjecting(){return!!((this.relativeTarget||this.targetDelta||this.options.layoutRoot)&&this.layout)}calcProjection(){var l;const u=this.getLead(),f=!!this.resumingFrom||this!==u;let d=!0;if((this.isProjectionDirty||!((l=this.parent)===null||l===void 0)&&l.isProjectionDirty)&&(d=!1),f&&(this.isSharedProjectionDirty||this.isTransformDirty)&&(d=!1),this.resolvedRelativeTargetAt===bn.timestamp&&(d=!1),d)return;const{layout:h,layoutId:m}=this.options;if(this.isTreeAnimating=!!(this.parent&&this.parent.isTreeAnimating||this.currentAnimation||this.pendingAnimation),this.isTreeAnimating||(this.targetDelta=this.relativeTarget=void 0),!this.layout||!(h||m))return;wi(this.layoutCorrected,this.layout.layoutBox);const g=this.treeScale.x,v=this.treeScale.y;t2(this.layoutCorrected,this.treeScale,this.path,f),u.layout&&!u.target&&(this.treeScale.x!==1||this.treeScale.y!==1)&&(u.target=u.layout.layoutBox,u.targetWithTransforms=an());const{target:E}=u;if(!E){this.prevProjectionDelta&&(this.createProjectionDeltas(),this.scheduleRender());return}!this.projectionDelta||!this.prevProjectionDelta?this.createProjectionDeltas():(L_(this.prevProjectionDelta.x,this.projectionDelta.x),L_(this.prevProjectionDelta.y,this.projectionDelta.y)),Ol(this.projectionDelta,this.layoutCorrected,E,this.latestValues),(this.treeScale.x!==g||this.treeScale.y!==v||!z_(this.projectionDelta.x,this.prevProjectionDelta.x)||!z_(this.projectionDelta.y,this.prevProjectionDelta.y))&&(this.hasProjected=!0,this.scheduleRender(),this.notifyListeners("projectionUpdate",E)),Il&&Zs.recalculatedProjection++}hide(){this.isVisible=!1}show(){this.isVisible=!0}scheduleRender(l=!0){var u;if((u=this.options.visualElement)===null||u===void 0||u.scheduleRender(),l){const f=this.getStack();f&&f.scheduleRender()}this.resumingFrom&&!this.resumingFrom.instance&&(this.resumingFrom=void 0)}createProjectionDeltas(){this.prevProjectionDelta=oa(),this.projectionDelta=oa(),this.projectionDeltaWithTransform=oa()}setAnimationOrigin(l,u=!1){const f=this.snapshot,d=f?f.latestValues:{},h={...this.latestValues},m=oa();(!this.relativeParent||!this.relativeParent.options.layoutRoot)&&(this.relativeTarget=this.relativeTargetOrigin=void 0),this.attemptToResolveRelativeTarget=!u;const g=an(),v=f?f.source:void 0,E=this.layout?this.layout.source:void 0,w=v!==E,_=this.getStack(),y=!_||_.members.length<=1,M=!!(w&&!y&&this.options.crossfade===!0&&!this.path.some(z2));this.animationProgress=0;let T;this.mixTargetDelta=C=>{const N=C/1e3;W_(m.x,l.x,N),W_(m.y,l.y,N),this.setTargetDelta(m),this.relativeTarget&&this.relativeTargetOrigin&&this.layout&&this.relativeParent&&this.relativeParent.layout&&(Bl(g,this.layout.layoutBox,this.relativeParent.layout.layoutBox),B2(this.relativeTarget,this.relativeTargetOrigin,g,N),T&&w2(this.relativeTarget,T)&&(this.isProjectionDirty=!1),T||(T=an()),wi(T,this.relativeTarget)),w&&(this.animationValues=h,v2(h,d,this.latestValues,N,M,y)),this.root.scheduleUpdateProjection(),this.scheduleRender(),this.animationProgress=N},this.mixTargetDelta(this.options.layoutRoot?1e3:0)}startAnimation(l){this.notifyListeners("animationStart"),this.currentAnimation&&this.currentAnimation.stop(),this.resumingFrom&&this.resumingFrom.currentAnimation&&this.resumingFrom.currentAnimation.stop(),this.pendingAnimation&&(Es(this.pendingAnimation),this.pendingAnimation=void 0),this.pendingAnimation=qt.update(()=>{Ef.hasAnimatedSinceResize=!0,this.currentAnimation=f2(0,V_,{...l,onUpdate:u=>{this.mixTargetDelta(u),l.onUpdate&&l.onUpdate(u)},onComplete:()=>{l.onComplete&&l.onComplete(),this.completeAnimation()}}),this.resumingFrom&&(this.resumingFrom.currentAnimation=this.currentAnimation),this.pendingAnimation=void 0})}completeAnimation(){this.resumingFrom&&(this.resumingFrom.currentAnimation=void 0,this.resumingFrom.preserveOpacity=void 0);const l=this.getStack();l&&l.exitAnimationComplete(),this.resumingFrom=this.currentAnimation=this.animationValues=void 0,this.notifyListeners("animationComplete")}finishAnimation(){this.currentAnimation&&(this.mixTargetDelta&&this.mixTargetDelta(V_),this.currentAnimation.stop()),this.completeAnimation()}applyTransformsToTarget(){const l=this.getLead();let{targetWithTransforms:u,target:f,layout:d,latestValues:h}=l;if(!(!u||!f||!d)){if(this!==l&&this.layout&&d&&jw(this.options.animationType,this.layout.layoutBox,d.layoutBox)){f=this.target||an();const m=gi(this.layout.layoutBox.x);f.x.min=l.target.x.min,f.x.max=f.x.min+m;const g=gi(this.layout.layoutBox.y);f.y.min=l.target.y.min,f.y.max=f.y.min+g}wi(u,f),la(u,h),Ol(this.projectionDeltaWithTransform,this.layoutCorrected,u,h)}}registerSharedNode(l,u){this.sharedNodes.has(l)||this.sharedNodes.set(l,new M2),this.sharedNodes.get(l).add(u);const d=u.options.initialPromotionConfig;u.promote({transition:d?d.transition:void 0,preserveFollowOpacity:d&&d.shouldPreserveFollowOpacity?d.shouldPreserveFollowOpacity(u):void 0})}isLead(){const l=this.getStack();return l?l.lead===this:!0}getLead(){var l;const{layoutId:u}=this.options;return u?((l=this.getStack())===null||l===void 0?void 0:l.lead)||this:this}getPrevLead(){var l;const{layoutId:u}=this.options;return u?(l=this.getStack())===null||l===void 0?void 0:l.prevLead:void 0}getStack(){const{layoutId:l}=this.options;if(l)return this.root.sharedNodes.get(l)}promote({needsReset:l,transition:u,preserveFollowOpacity:f}={}){const d=this.getStack();d&&d.promote(this,f),l&&(this.projectionDelta=void 0,this.needsReset=!0),u&&this.setOptions({transition:u})}relegate(){const l=this.getStack();return l?l.relegate(this):!1}resetSkewAndRotation(){const{visualElement:l}=this.options;if(!l)return;let u=!1;const{latestValues:f}=l;if((f.z||f.rotate||f.rotateX||f.rotateY||f.rotateZ||f.skewX||f.skewY)&&(u=!0),!u)return;const d={};f.z&&cp("z",l,d,this.animationValues);for(let h=0;h<up.length;h++)cp(`rotate${up[h]}`,l,d,this.animationValues),cp(`skew${up[h]}`,l,d,this.animationValues);l.render();for(const h in d)l.setStaticValue(h,d[h]),this.animationValues&&(this.animationValues[h]=d[h]);l.scheduleRender()}getProjectionStyles(l){var u,f;if(!this.instance||this.isSVG)return;if(!this.isVisible)return A2;const d={visibility:""},h=this.getTransformTemplate();if(this.needsReset)return this.needsReset=!1,d.opacity="",d.pointerEvents=_f(l==null?void 0:l.pointerEvents)||"",d.transform=h?h(this.latestValues,""):"none",d;const m=this.getLead();if(!this.projectionDelta||!this.layout||!m.target){const w={};return this.options.layoutId&&(w.opacity=this.latestValues.opacity!==void 0?this.latestValues.opacity:1,w.pointerEvents=_f(l==null?void 0:l.pointerEvents)||""),this.hasProjected&&!Ks(this.latestValues)&&(w.transform=h?h({},""):"none",this.hasProjected=!1),w}const g=m.animationValues||m.latestValues;this.applyTransformsToTarget(),d.transform=T2(this.projectionDeltaWithTransform,this.treeScale,g),h&&(d.transform=h(g,d.transform));const{x:v,y:E}=this.projectionDelta;d.transformOrigin=`${v.origin*100}% ${E.origin*100}% 0`,m.animationValues?d.opacity=m===this?(f=(u=g.opacity)!==null&&u!==void 0?u:this.latestValues.opacity)!==null&&f!==void 0?f:1:this.preserveOpacity?this.latestValues.opacity:g.opacityExit:d.opacity=m===this?g.opacity!==void 0?g.opacity:"":g.opacityExit!==void 0?g.opacityExit:0;for(const w in Nf){if(g[w]===void 0)continue;const{correct:_,applyTo:y}=Nf[w],M=d.transform==="none"?g[w]:_(g[w],m);if(y){const T=y.length;for(let C=0;C<T;C++)d[y[C]]=M}else d[w]=M}return this.options.layoutId&&(d.pointerEvents=m===this?_f(l==null?void 0:l.pointerEvents)||"":"none"),d}clearSnapshot(){this.resumeFrom=this.snapshot=void 0}resetTree(){this.root.nodes.forEach(l=>{var u;return(u=l.currentAnimation)===null||u===void 0?void 0:u.stop()}),this.root.nodes.forEach(H_),this.root.sharedNodes.clear()}}}function b2(t){t.updateLayout()}function R2(t){var e;const n=((e=t.resumeFrom)===null||e===void 0?void 0:e.snapshot)||t.snapshot;if(t.isLead()&&t.layout&&n&&t.hasListeners("didUpdate")){const{layoutBox:i,measuredBox:s}=t.layout,{animationType:a}=t.options,l=n.source!==t.layout.source;a==="size"?Ti(m=>{const g=l?n.measuredBox[m]:n.layoutBox[m],v=gi(g);g.min=i[m].min,g.max=g.min+v}):jw(a,n.layoutBox,i)&&Ti(m=>{const g=l?n.measuredBox[m]:n.layoutBox[m],v=gi(i[m]);g.max=g.min+v,t.relativeTarget&&!t.currentAnimation&&(t.isProjectionDirty=!0,t.relativeTarget[m].max=t.relativeTarget[m].min+v)});const u=oa();Ol(u,i,n.layoutBox);const f=oa();l?Ol(f,t.applyTransform(s,!0),n.measuredBox):Ol(f,i,n.layoutBox);const d=!Vw(u);let h=!1;if(!t.resumeFrom){const m=t.getClosestProjectingParent();if(m&&!m.resumeFrom){const{snapshot:g,layout:v}=m;if(g&&v){const E=an();Bl(E,n.layoutBox,g.layoutBox);const w=an();Bl(w,i,v.layoutBox),Hw(E,w)||(h=!0),m.options.layoutRoot&&(t.relativeTarget=w,t.relativeTargetOrigin=E,t.relativeParent=m)}}}t.notifyListeners("didUpdate",{layout:i,snapshot:n,delta:f,layoutDelta:u,hasLayoutChanged:d,hasRelativeTargetChanged:h})}else if(t.isLead()){const{onExitComplete:i}=t.options;i&&i()}t.options.transition=void 0}function P2(t){Il&&Zs.totalNodes++,t.parent&&(t.isProjecting()||(t.isProjectionDirty=t.parent.isProjectionDirty),t.isSharedProjectionDirty||(t.isSharedProjectionDirty=!!(t.isProjectionDirty||t.parent.isProjectionDirty||t.parent.isSharedProjectionDirty)),t.isTransformDirty||(t.isTransformDirty=t.parent.isTransformDirty))}function D2(t){t.isProjectionDirty=t.isSharedProjectionDirty=t.isTransformDirty=!1}function L2(t){t.clearSnapshot()}function H_(t){t.clearMeasurements()}function I2(t){t.isLayoutDirty=!1}function k2(t){const{visualElement:e}=t.options;e&&e.getProps().onBeforeLayoutMeasure&&e.notify("BeforeLayoutMeasure"),t.resetTransform()}function G_(t){t.finishAnimation(),t.targetDelta=t.relativeTarget=t.target=void 0,t.isProjectionDirty=!0}function N2(t){t.resolveTargetDelta()}function U2(t){t.calcProjection()}function F2(t){t.resetSkewAndRotation()}function O2(t){t.removeLeadSnapshot()}function W_(t,e,n){t.translate=Jt(e.translate,0,n),t.scale=Jt(e.scale,1,n),t.origin=e.origin,t.originPoint=e.originPoint}function j_(t,e,n,i){t.min=Jt(e.min,n.min,i),t.max=Jt(e.max,n.max,i)}function B2(t,e,n,i){j_(t.x,e.x,n.x,i),j_(t.y,e.y,n.y,i)}function z2(t){return t.animationValues&&t.animationValues.opacityExit!==void 0}const V2={duration:.45,ease:[.4,0,.1,1]},X_=t=>typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().includes(t),$_=X_("applewebkit/")&&!X_("chrome/")?Math.round:pi;function q_(t){t.min=$_(t.min),t.max=$_(t.max)}function H2(t){q_(t.x),q_(t.y)}function jw(t,e,n){return t==="position"||t==="preserve-aspect"&&!jL(B_(e),B_(n),.2)}function G2(t){var e;return t!==t.root&&((e=t.scroll)===null||e===void 0?void 0:e.wasRoot)}const W2=Ww({attachResizeListener:(t,e)=>Kl(t,"resize",e),measureScroll:()=>({x:document.documentElement.scrollLeft||document.body.scrollLeft,y:document.documentElement.scrollTop||document.body.scrollTop}),checkIsScrollRoot:()=>!0}),fp={current:void 0},Xw=Ww({measureScroll:t=>({x:t.scrollLeft,y:t.scrollTop}),defaultParent:()=>{if(!fp.current){const t=new W2({});t.mount(window),t.setOptions({layoutScroll:!0}),fp.current=t}return fp.current},resetTransform:(t,e)=>{t.style.transform=e!==void 0?e:"none"},checkIsScrollRoot:t=>window.getComputedStyle(t).position==="fixed"}),j2={pan:{Feature:a2},drag:{Feature:o2,ProjectionNode:Xw,MeasureLayout:Ow}};function Y_(t,e,n){const{props:i}=t;t.animationState&&i.whileHover&&t.animationState.setActive("whileHover",n==="Start");const s="onHover"+n,a=i[s];a&&qt.postRender(()=>a(e,ou(e)))}class X2 extends Ts{mount(){const{current:e}=this.node;e&&(this.unmount=XP(e,n=>(Y_(this.node,n,"Start"),i=>Y_(this.node,i,"End"))))}unmount(){}}class $2 extends Ts{constructor(){super(...arguments),this.isActive=!1}onFocus(){let e=!1;try{e=this.node.current.matches(":focus-visible")}catch{e=!0}!e||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!0),this.isActive=!0)}onBlur(){!this.isActive||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!1),this.isActive=!1)}mount(){this.unmount=su(Kl(this.node.current,"focus",()=>this.onFocus()),Kl(this.node.current,"blur",()=>this.onBlur()))}unmount(){}}function K_(t,e,n){const{props:i}=t;t.animationState&&i.whileTap&&t.animationState.setActive("whileTap",n==="Start");const s="onTap"+(n==="End"?"":n),a=i[s];a&&qt.postRender(()=>a(e,ou(e)))}class q2 extends Ts{mount(){const{current:e}=this.node;e&&(this.unmount=KP(e,n=>(K_(this.node,n,"Start"),(i,{success:s})=>K_(this.node,i,s?"End":"Cancel")),{useGlobalTarget:this.node.props.globalTapTarget}))}unmount(){}}const Cm=new WeakMap,dp=new WeakMap,Y2=t=>{const e=Cm.get(t.target);e&&e(t)},K2=t=>{t.forEach(Y2)};function Z2({root:t,...e}){const n=t||document;dp.has(n)||dp.set(n,{});const i=dp.get(n),s=JSON.stringify(e);return i[s]||(i[s]=new IntersectionObserver(K2,{root:t,...e})),i[s]}function Q2(t,e,n){const i=Z2(e);return Cm.set(t,n),i.observe(t),()=>{Cm.delete(t),i.unobserve(t)}}const J2={some:0,all:1};class eI extends Ts{constructor(){super(...arguments),this.hasEnteredView=!1,this.isInView=!1}startObserver(){this.unmount();const{viewport:e={}}=this.node.getProps(),{root:n,margin:i,amount:s="some",once:a}=e,l={root:n?n.current:void 0,rootMargin:i,threshold:typeof s=="number"?s:J2[s]},u=f=>{const{isIntersecting:d}=f;if(this.isInView===d||(this.isInView=d,a&&!d&&this.hasEnteredView))return;d&&(this.hasEnteredView=!0),this.node.animationState&&this.node.animationState.setActive("whileInView",d);const{onViewportEnter:h,onViewportLeave:m}=this.node.getProps(),g=d?h:m;g&&g(f)};return Q2(this.node.current,l,u)}mount(){this.startObserver()}update(){if(typeof IntersectionObserver>"u")return;const{props:e,prevProps:n}=this.node;["amount","margin","root"].some(tI(e,n))&&this.startObserver()}unmount(){}}function tI({viewport:t={}},{viewport:e={}}={}){return n=>t[n]!==e[n]}const nI={inView:{Feature:eI},tap:{Feature:q2},focus:{Feature:$2},hover:{Feature:X2}},iI={layout:{ProjectionNode:Xw,MeasureLayout:Ow}},bm={current:null},$w={current:!1};function rI(){if($w.current=!0,!!Bg)if(window.matchMedia){const t=window.matchMedia("(prefers-reduced-motion)"),e=()=>bm.current=t.matches;t.addListener(e),e()}else bm.current=!1}const sI=[...yw,Fn,ws],oI=t=>sI.find(vw(t)),Z_=new WeakMap;function aI(t,e,n){for(const i in e){const s=e[i],a=n[i];if(On(s))t.addValue(i,s);else if(On(a))t.addValue(i,ql(s,{owner:t}));else if(a!==s)if(t.hasValue(i)){const l=t.getValue(i);l.liveStyle===!0?l.jump(s):l.hasAnimated||l.set(s)}else{const l=t.getStaticValue(i);t.addValue(i,ql(l!==void 0?l:s,{owner:t}))}}for(const i in n)e[i]===void 0&&t.removeValue(i);return e}const Q_=["AnimationStart","AnimationComplete","Update","BeforeLayoutMeasure","LayoutMeasure","LayoutAnimationStart","LayoutAnimationComplete"];class lI{scrapeMotionValuesFromProps(e,n,i){return{}}constructor({parent:e,props:n,presenceContext:i,reducedMotionConfig:s,blockInitialAnimation:a,visualState:l},u={}){this.current=null,this.children=new Set,this.isVariantNode=!1,this.isControllingVariants=!1,this.shouldReduceMotion=null,this.values=new Map,this.KeyframeResolver=dv,this.features={},this.valueSubscriptions=new Map,this.prevMotionValues={},this.events={},this.propEventSubscriptions={},this.notifyUpdate=()=>this.notify("Update",this.latestValues),this.render=()=>{this.current&&(this.triggerBuild(),this.renderInstance(this.current,this.renderState,this.props.style,this.projection))},this.renderScheduledAt=0,this.scheduleRender=()=>{const v=rr.now();this.renderScheduledAt<v&&(this.renderScheduledAt=v,qt.render(this.render,!1,!0))};const{latestValues:f,renderState:d,onUpdate:h}=l;this.onUpdate=h,this.latestValues=f,this.baseTarget={...f},this.initialValues=n.initial?{...f}:{},this.renderState=d,this.parent=e,this.props=n,this.presenceContext=i,this.depth=e?e.depth+1:0,this.reducedMotionConfig=s,this.options=u,this.blockInitialAnimation=!!a,this.isControllingVariants=rd(n),this.isVariantNode=A1(n),this.isVariantNode&&(this.variantChildren=new Set),this.manuallyAnimateOnMount=!!(e&&e.current);const{willChange:m,...g}=this.scrapeMotionValuesFromProps(n,{},this);for(const v in g){const E=g[v];f[v]!==void 0&&On(E)&&E.set(f[v],!1)}}mount(e){this.current=e,Z_.set(e,this),this.projection&&!this.projection.instance&&this.projection.mount(e),this.parent&&this.isVariantNode&&!this.isControllingVariants&&(this.removeFromVariantTree=this.parent.addVariantChild(this)),this.values.forEach((n,i)=>this.bindToMotionValue(i,n)),$w.current||rI(),this.shouldReduceMotion=this.reducedMotionConfig==="never"?!1:this.reducedMotionConfig==="always"?!0:bm.current,this.parent&&this.parent.children.add(this),this.update(this.props,this.presenceContext)}unmount(){Z_.delete(this.current),this.projection&&this.projection.unmount(),Es(this.notifyUpdate),Es(this.render),this.valueSubscriptions.forEach(e=>e()),this.valueSubscriptions.clear(),this.removeFromVariantTree&&this.removeFromVariantTree(),this.parent&&this.parent.children.delete(this);for(const e in this.events)this.events[e].clear();for(const e in this.features){const n=this.features[e];n&&(n.unmount(),n.isMounted=!1)}this.current=null}bindToMotionValue(e,n){this.valueSubscriptions.has(e)&&this.valueSubscriptions.get(e)();const i=ho.has(e),s=n.on("change",u=>{this.latestValues[e]=u,this.props.onUpdate&&qt.preRender(this.notifyUpdate),i&&this.projection&&(this.projection.isTransformDirty=!0)}),a=n.on("renderRequest",this.scheduleRender);let l;window.MotionCheckAppearSync&&(l=window.MotionCheckAppearSync(this,e,n)),this.valueSubscriptions.set(e,()=>{s(),a(),l&&l(),n.owner&&n.stop()})}sortNodePosition(e){return!this.current||!this.sortInstanceNodePosition||this.type!==e.type?0:this.sortInstanceNodePosition(this.current,e.current)}updateFeatures(){let e="animation";for(e in Ea){const n=Ea[e];if(!n)continue;const{isEnabled:i,Feature:s}=n;if(!this.features[e]&&s&&i(this.props)&&(this.features[e]=new s(this)),this.features[e]){const a=this.features[e];a.isMounted?a.update():(a.mount(),a.isMounted=!0)}}}triggerBuild(){this.build(this.renderState,this.latestValues,this.props)}measureViewportBox(){return this.current?this.measureInstanceViewportBox(this.current,this.props):an()}getStaticValue(e){return this.latestValues[e]}setStaticValue(e,n){this.latestValues[e]=n}update(e,n){(e.transformTemplate||this.props.transformTemplate)&&this.scheduleRender(),this.prevProps=this.props,this.props=e,this.prevPresenceContext=this.presenceContext,this.presenceContext=n;for(let i=0;i<Q_.length;i++){const s=Q_[i];this.propEventSubscriptions[s]&&(this.propEventSubscriptions[s](),delete this.propEventSubscriptions[s]);const a="on"+s,l=e[a];l&&(this.propEventSubscriptions[s]=this.on(s,l))}this.prevMotionValues=aI(this,this.scrapeMotionValuesFromProps(e,this.prevProps,this),this.prevMotionValues),this.handleChildMotionValue&&this.handleChildMotionValue(),this.onUpdate&&this.onUpdate(this)}getProps(){return this.props}getVariant(e){return this.props.variants?this.props.variants[e]:void 0}getDefaultTransition(){return this.props.transition}getTransformPagePoint(){return this.props.transformPagePoint}getClosestVariantNode(){return this.isVariantNode?this:this.parent?this.parent.getClosestVariantNode():void 0}addVariantChild(e){const n=this.getClosestVariantNode();if(n)return n.variantChildren&&n.variantChildren.add(e),()=>n.variantChildren.delete(e)}addValue(e,n){const i=this.values.get(e);n!==i&&(i&&this.removeValue(e),this.bindToMotionValue(e,n),this.values.set(e,n),this.latestValues[e]=n.get())}removeValue(e){this.values.delete(e);const n=this.valueSubscriptions.get(e);n&&(n(),this.valueSubscriptions.delete(e)),delete this.latestValues[e],this.removeValueFromRenderState(e,this.renderState)}hasValue(e){return this.values.has(e)}getValue(e,n){if(this.props.values&&this.props.values[e])return this.props.values[e];let i=this.values.get(e);return i===void 0&&n!==void 0&&(i=ql(n===null?void 0:n,{owner:this}),this.addValue(e,i)),i}readValue(e,n){var i;let s=this.latestValues[e]!==void 0||!this.current?this.latestValues[e]:(i=this.getBaseTargetFromProps(this.props,e))!==null&&i!==void 0?i:this.readValueFromInstance(this.current,e,this.options);return s!=null&&(typeof s=="string"&&(mw(s)||ow(s))?s=parseFloat(s):!oI(s)&&ws.test(n)&&(s=dw(e,n)),this.setBaseTarget(e,On(s)?s.get():s)),On(s)?s.get():s}setBaseTarget(e,n){this.baseTarget[e]=n}getBaseTarget(e){var n;const{initial:i}=this.props;let s;if(typeof i=="string"||typeof i=="object"){const l=Xg(this.props,i,(n=this.presenceContext)===null||n===void 0?void 0:n.custom);l&&(s=l[e])}if(i&&s!==void 0)return s;const a=this.getBaseTargetFromProps(this.props,e);return a!==void 0&&!On(a)?a:this.initialValues[e]!==void 0&&s===void 0?void 0:this.baseTarget[e]}on(e,n){return this.events[e]||(this.events[e]=new ov),this.events[e].add(n)}notify(e,...n){this.events[e]&&this.events[e].notify(...n)}}class qw extends lI{constructor(){super(...arguments),this.KeyframeResolver=xw}sortInstanceNodePosition(e,n){return e.compareDocumentPosition(n)&2?1:-1}getBaseTargetFromProps(e,n){return e.style?e.style[n]:void 0}removeValueFromRenderState(e,{vars:n,style:i}){delete n[e],delete i[e]}handleChildMotionValue(){this.childSubscription&&(this.childSubscription(),delete this.childSubscription);const{children:e}=this.props;On(e)&&(this.childSubscription=e.on("change",n=>{this.current&&(this.current.textContent=`${n}`)}))}}function uI(t){return window.getComputedStyle(t)}class cI extends qw{constructor(){super(...arguments),this.type="html",this.renderInstance=N1}readValueFromInstance(e,n){if(ho.has(n)){const i=fv(n);return i&&i.default||0}else{const i=uI(e),s=(L1(n)?i.getPropertyValue(n):i[n])||0;return typeof s=="string"?s.trim():s}}measureInstanceViewportBox(e,{transformPagePoint:n}){return Uw(e,n)}build(e,n,i){Yg(e,n,i.transformTemplate)}scrapeMotionValuesFromProps(e,n,i){return Jg(e,n,i)}}class fI extends qw{constructor(){super(...arguments),this.type="svg",this.isSVGTag=!1,this.measureInstanceViewportBox=an}getBaseTargetFromProps(e,n){return e[n]}readValueFromInstance(e,n){if(ho.has(n)){const i=fv(n);return i&&i.default||0}return n=U1.has(n)?n:Gg(n),e.getAttribute(n)}scrapeMotionValuesFromProps(e,n,i){return B1(e,n,i)}build(e,n,i){Kg(e,n,this.isSVGTag,i.transformTemplate)}renderInstance(e,n,i,s){F1(e,n,i,s)}mount(e){this.isSVGTag=Qg(e.tagName),super.mount(e)}}const dI=(t,e)=>jg(t)?new fI(e):new cI(e,{allowProjection:t!==$.Fragment}),hI=BP({...UL,...nI,...j2,...iI},dI),au=eP(hI),pI=Ve(au.div)`
    position: absolute;
    top: 0px;
    right: 30%;
    height: 250vh;
    width: 2px;
    background-color: rgba(255, 255, 255, 0.5);
    z-index: 9999;
`,mI={projectSht:{x:-865,y:-235,opacity:1,skewX:0},projects:{x:-280,y:-235,opacity:1,skewX:0},about:{x:150,y:-135,rotate:90,opacity:1,skewX:0,height:1650},reset:{x:-160,y:-100,opacity:1,skewX:-25}},gI=()=>{const t=Br(),[e,n]=$.useState("reset");return $.useEffect(()=>{t.pathname==="/"?n("reset"):t.pathname==="/about"?n("about"):t.pathname==="/projects"?n("projects"):t.pathname.startsWith("/projects/")&&n("projectSht")},[t.pathname]),he.jsx(pI,{variants:mI,initial:"reset",animate:e,transition:{duration:1.5,ease:"easeInOut"}})},vI=Ve.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`,yI=Ve.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  width: 100%;
  height: 100%;
`,xI=Ve(au.div)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  margin-top: 75px;
  margin-left: 25px;
  text-align: right;
  overflow-y: auto;
  height: 100%;
  border-top: 1px rgba(255, 255, 255, 0.3) solid;
  scrollbar-width: none; 
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none; 
  }
`,_I=Ve(au.ul)`
    display: flex;
    flex-direction: column;
    margin-top: 25px;
    align-items: flex-end;
    row-gap: 150px;
    list-style: none;
    padding-bottom: 200px;
`,SI=Ve(au.li)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: color 0.3s ease-in;

  &:hover {
    color: white;
  }

  .project-title {
    font-size: 48px;
    font-weight: 100;
    font-family: "ade";
    text-transform: uppercase;
    mask-image: linear-gradient(to right, transparent, #000 20%, #000 70%, transparent),
    linear-gradient(to bottom, transparent, #000 20%, #000 70%, transparent);
    -webkit-mask-image: linear-gradient(to right, transparent, #000 40%, #000 60%, transparent),
    linear-gradient(to bottom, transparent, #000 50%, transparent);
  }

  .project-description {
    font-size: 12px;
    font-weight: 800;
    font-family: "work sans, black";
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.8);
  }
`,EI=Ve.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  
`,wI=Ve.div`
  position: fixed;
  width: 100%;
  left: 45px;
  top: 50px;
`,MI=Ve.h1`
  font-family: "work sans";
  font-weight: 300;
  font-size: 36px;
  transform: translateX(15px);
  transform-origin: 0 0;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.7);
  transition: transform 0.5s, color 0.3s ease-in-out;
  &:hover {
    transform: scale(1.01);
    color: white;
  }
`,TI={hidden:{opacity:0,x:50},visible:{opacity:1,x:0,transition:{duration:.5,ease:"easeOut"}}},AI=()=>{const t=zr(),e=[{title:"Grove",description:"WIP"},{title:"Capsule Machine",description:"WIP"},{title:"Lens Studio (ABC)",description:"WIP"},{title:"Mindset APES",description:"WIP"},{title:"Fashion Design",description:"WIP"},{title:"Travels",description:"my cinematic video adventures coming soon"},{title:"Film",description:"coming soon. - mouseparty4949"},{title:"Coming soon",description:"Art"}],n=()=>{t("/")},i=s=>{const a=s.replace(/\s+/g,"");t(`/projects/${a}`)};return he.jsx(vI,{children:he.jsxs(yI,{children:[he.jsx(xI,{children:he.jsx(_I,{children:e.map((s,a)=>he.jsxs(SI,{variants:TI,initial:"hidden",whileInView:"visible",viewport:{once:!1,amount:.1},onClick:()=>i(s.title),children:[he.jsx("span",{className:"project-title",children:s.title}),he.jsx("span",{className:"project-description",children:s.description})]},a))})}),he.jsx(EI,{}),he.jsx(wI,{children:he.jsx(MI,{onClick:n,children:"johnny sheng's projects"})})]})})};function CI(t,e){const n={};return(t[t.length-1]===""?[...t,""]:t).join((n.padRight?" ":"")+","+(n.padLeft===!1?"":" ")).trim()}const bI=/^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,RI=/^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,PI={};function J_(t,e){return(PI.jsx?RI:bI).test(t)}const DI=/[ \t\n\f\r]/g;function LI(t){return typeof t=="object"?t.type==="text"?eS(t.value):!1:eS(t)}function eS(t){return t.replace(DI,"")===""}class lu{constructor(e,n,i){this.property=e,this.normal=n,i&&(this.space=i)}}lu.prototype.property={};lu.prototype.normal={};lu.prototype.space=null;function Yw(t,e){const n={},i={};let s=-1;for(;++s<t.length;)Object.assign(n,t[s].property),Object.assign(i,t[s].normal);return new lu(n,i,e)}function Rm(t){return t.toLowerCase()}class Ri{constructor(e,n){this.property=e,this.attribute=n}}Ri.prototype.space=null;Ri.prototype.boolean=!1;Ri.prototype.booleanish=!1;Ri.prototype.overloadedBoolean=!1;Ri.prototype.number=!1;Ri.prototype.commaSeparated=!1;Ri.prototype.spaceSeparated=!1;Ri.prototype.commaOrSpaceSeparated=!1;Ri.prototype.mustUseProperty=!1;Ri.prototype.defined=!1;let II=0;const pt=po(),fn=po(),Kw=po(),Pe=po(),Ht=po(),ca=po(),fi=po();function po(){return 2**++II}const Pm=Object.freeze(Object.defineProperty({__proto__:null,boolean:pt,booleanish:fn,commaOrSpaceSeparated:fi,commaSeparated:ca,number:Pe,overloadedBoolean:Kw,spaceSeparated:Ht},Symbol.toStringTag,{value:"Module"})),hp=Object.keys(Pm);class gv extends Ri{constructor(e,n,i,s){let a=-1;if(super(e,n),tS(this,"space",s),typeof i=="number")for(;++a<hp.length;){const l=hp[a];tS(this,hp[a],(i&Pm[l])===Pm[l])}}}gv.prototype.defined=!0;function tS(t,e,n){n&&(t[e]=n)}const kI={}.hasOwnProperty;function Fa(t){const e={},n={};let i;for(i in t.properties)if(kI.call(t.properties,i)){const s=t.properties[i],a=new gv(i,t.transform(t.attributes||{},i),s,t.space);t.mustUseProperty&&t.mustUseProperty.includes(i)&&(a.mustUseProperty=!0),e[i]=a,n[Rm(i)]=i,n[Rm(a.attribute)]=i}return new lu(e,n,t.space)}const Zw=Fa({space:"xlink",transform(t,e){return"xlink:"+e.slice(5).toLowerCase()},properties:{xLinkActuate:null,xLinkArcRole:null,xLinkHref:null,xLinkRole:null,xLinkShow:null,xLinkTitle:null,xLinkType:null}}),Qw=Fa({space:"xml",transform(t,e){return"xml:"+e.slice(3).toLowerCase()},properties:{xmlLang:null,xmlBase:null,xmlSpace:null}});function Jw(t,e){return e in t?t[e]:e}function eM(t,e){return Jw(t,e.toLowerCase())}const tM=Fa({space:"xmlns",attributes:{xmlnsxlink:"xmlns:xlink"},transform:eM,properties:{xmlns:null,xmlnsXLink:null}}),nM=Fa({transform(t,e){return e==="role"?e:"aria-"+e.slice(4).toLowerCase()},properties:{ariaActiveDescendant:null,ariaAtomic:fn,ariaAutoComplete:null,ariaBusy:fn,ariaChecked:fn,ariaColCount:Pe,ariaColIndex:Pe,ariaColSpan:Pe,ariaControls:Ht,ariaCurrent:null,ariaDescribedBy:Ht,ariaDetails:null,ariaDisabled:fn,ariaDropEffect:Ht,ariaErrorMessage:null,ariaExpanded:fn,ariaFlowTo:Ht,ariaGrabbed:fn,ariaHasPopup:null,ariaHidden:fn,ariaInvalid:null,ariaKeyShortcuts:null,ariaLabel:null,ariaLabelledBy:Ht,ariaLevel:Pe,ariaLive:null,ariaModal:fn,ariaMultiLine:fn,ariaMultiSelectable:fn,ariaOrientation:null,ariaOwns:Ht,ariaPlaceholder:null,ariaPosInSet:Pe,ariaPressed:fn,ariaReadOnly:fn,ariaRelevant:null,ariaRequired:fn,ariaRoleDescription:Ht,ariaRowCount:Pe,ariaRowIndex:Pe,ariaRowSpan:Pe,ariaSelected:fn,ariaSetSize:Pe,ariaSort:null,ariaValueMax:Pe,ariaValueMin:Pe,ariaValueNow:Pe,ariaValueText:null,role:null}}),NI=Fa({space:"html",attributes:{acceptcharset:"accept-charset",classname:"class",htmlfor:"for",httpequiv:"http-equiv"},transform:eM,mustUseProperty:["checked","multiple","muted","selected"],properties:{abbr:null,accept:ca,acceptCharset:Ht,accessKey:Ht,action:null,allow:null,allowFullScreen:pt,allowPaymentRequest:pt,allowUserMedia:pt,alt:null,as:null,async:pt,autoCapitalize:null,autoComplete:Ht,autoFocus:pt,autoPlay:pt,blocking:Ht,capture:null,charSet:null,checked:pt,cite:null,className:Ht,cols:Pe,colSpan:null,content:null,contentEditable:fn,controls:pt,controlsList:Ht,coords:Pe|ca,crossOrigin:null,data:null,dateTime:null,decoding:null,default:pt,defer:pt,dir:null,dirName:null,disabled:pt,download:Kw,draggable:fn,encType:null,enterKeyHint:null,fetchPriority:null,form:null,formAction:null,formEncType:null,formMethod:null,formNoValidate:pt,formTarget:null,headers:Ht,height:Pe,hidden:pt,high:Pe,href:null,hrefLang:null,htmlFor:Ht,httpEquiv:Ht,id:null,imageSizes:null,imageSrcSet:null,inert:pt,inputMode:null,integrity:null,is:null,isMap:pt,itemId:null,itemProp:Ht,itemRef:Ht,itemScope:pt,itemType:Ht,kind:null,label:null,lang:null,language:null,list:null,loading:null,loop:pt,low:Pe,manifest:null,max:null,maxLength:Pe,media:null,method:null,min:null,minLength:Pe,multiple:pt,muted:pt,name:null,nonce:null,noModule:pt,noValidate:pt,onAbort:null,onAfterPrint:null,onAuxClick:null,onBeforeMatch:null,onBeforePrint:null,onBeforeToggle:null,onBeforeUnload:null,onBlur:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onContextLost:null,onContextMenu:null,onContextRestored:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnded:null,onError:null,onFocus:null,onFormData:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLanguageChange:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadEnd:null,onLoadStart:null,onMessage:null,onMessageError:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRejectionHandled:null,onReset:null,onResize:null,onScroll:null,onScrollEnd:null,onSecurityPolicyViolation:null,onSeeked:null,onSeeking:null,onSelect:null,onSlotChange:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnhandledRejection:null,onUnload:null,onVolumeChange:null,onWaiting:null,onWheel:null,open:pt,optimum:Pe,pattern:null,ping:Ht,placeholder:null,playsInline:pt,popover:null,popoverTarget:null,popoverTargetAction:null,poster:null,preload:null,readOnly:pt,referrerPolicy:null,rel:Ht,required:pt,reversed:pt,rows:Pe,rowSpan:Pe,sandbox:Ht,scope:null,scoped:pt,seamless:pt,selected:pt,shadowRootClonable:pt,shadowRootDelegatesFocus:pt,shadowRootMode:null,shape:null,size:Pe,sizes:null,slot:null,span:Pe,spellCheck:fn,src:null,srcDoc:null,srcLang:null,srcSet:null,start:Pe,step:null,style:null,tabIndex:Pe,target:null,title:null,translate:null,type:null,typeMustMatch:pt,useMap:null,value:fn,width:Pe,wrap:null,writingSuggestions:null,align:null,aLink:null,archive:Ht,axis:null,background:null,bgColor:null,border:Pe,borderColor:null,bottomMargin:Pe,cellPadding:null,cellSpacing:null,char:null,charOff:null,classId:null,clear:null,code:null,codeBase:null,codeType:null,color:null,compact:pt,declare:pt,event:null,face:null,frame:null,frameBorder:null,hSpace:Pe,leftMargin:Pe,link:null,longDesc:null,lowSrc:null,marginHeight:Pe,marginWidth:Pe,noResize:pt,noHref:pt,noShade:pt,noWrap:pt,object:null,profile:null,prompt:null,rev:null,rightMargin:Pe,rules:null,scheme:null,scrolling:fn,standby:null,summary:null,text:null,topMargin:Pe,valueType:null,version:null,vAlign:null,vLink:null,vSpace:Pe,allowTransparency:null,autoCorrect:null,autoSave:null,disablePictureInPicture:pt,disableRemotePlayback:pt,prefix:null,property:null,results:Pe,security:null,unselectable:null}}),UI=Fa({space:"svg",attributes:{accentHeight:"accent-height",alignmentBaseline:"alignment-baseline",arabicForm:"arabic-form",baselineShift:"baseline-shift",capHeight:"cap-height",className:"class",clipPath:"clip-path",clipRule:"clip-rule",colorInterpolation:"color-interpolation",colorInterpolationFilters:"color-interpolation-filters",colorProfile:"color-profile",colorRendering:"color-rendering",crossOrigin:"crossorigin",dataType:"datatype",dominantBaseline:"dominant-baseline",enableBackground:"enable-background",fillOpacity:"fill-opacity",fillRule:"fill-rule",floodColor:"flood-color",floodOpacity:"flood-opacity",fontFamily:"font-family",fontSize:"font-size",fontSizeAdjust:"font-size-adjust",fontStretch:"font-stretch",fontStyle:"font-style",fontVariant:"font-variant",fontWeight:"font-weight",glyphName:"glyph-name",glyphOrientationHorizontal:"glyph-orientation-horizontal",glyphOrientationVertical:"glyph-orientation-vertical",hrefLang:"hreflang",horizAdvX:"horiz-adv-x",horizOriginX:"horiz-origin-x",horizOriginY:"horiz-origin-y",imageRendering:"image-rendering",letterSpacing:"letter-spacing",lightingColor:"lighting-color",markerEnd:"marker-end",markerMid:"marker-mid",markerStart:"marker-start",navDown:"nav-down",navDownLeft:"nav-down-left",navDownRight:"nav-down-right",navLeft:"nav-left",navNext:"nav-next",navPrev:"nav-prev",navRight:"nav-right",navUp:"nav-up",navUpLeft:"nav-up-left",navUpRight:"nav-up-right",onAbort:"onabort",onActivate:"onactivate",onAfterPrint:"onafterprint",onBeforePrint:"onbeforeprint",onBegin:"onbegin",onCancel:"oncancel",onCanPlay:"oncanplay",onCanPlayThrough:"oncanplaythrough",onChange:"onchange",onClick:"onclick",onClose:"onclose",onCopy:"oncopy",onCueChange:"oncuechange",onCut:"oncut",onDblClick:"ondblclick",onDrag:"ondrag",onDragEnd:"ondragend",onDragEnter:"ondragenter",onDragExit:"ondragexit",onDragLeave:"ondragleave",onDragOver:"ondragover",onDragStart:"ondragstart",onDrop:"ondrop",onDurationChange:"ondurationchange",onEmptied:"onemptied",onEnd:"onend",onEnded:"onended",onError:"onerror",onFocus:"onfocus",onFocusIn:"onfocusin",onFocusOut:"onfocusout",onHashChange:"onhashchange",onInput:"oninput",onInvalid:"oninvalid",onKeyDown:"onkeydown",onKeyPress:"onkeypress",onKeyUp:"onkeyup",onLoad:"onload",onLoadedData:"onloadeddata",onLoadedMetadata:"onloadedmetadata",onLoadStart:"onloadstart",onMessage:"onmessage",onMouseDown:"onmousedown",onMouseEnter:"onmouseenter",onMouseLeave:"onmouseleave",onMouseMove:"onmousemove",onMouseOut:"onmouseout",onMouseOver:"onmouseover",onMouseUp:"onmouseup",onMouseWheel:"onmousewheel",onOffline:"onoffline",onOnline:"ononline",onPageHide:"onpagehide",onPageShow:"onpageshow",onPaste:"onpaste",onPause:"onpause",onPlay:"onplay",onPlaying:"onplaying",onPopState:"onpopstate",onProgress:"onprogress",onRateChange:"onratechange",onRepeat:"onrepeat",onReset:"onreset",onResize:"onresize",onScroll:"onscroll",onSeeked:"onseeked",onSeeking:"onseeking",onSelect:"onselect",onShow:"onshow",onStalled:"onstalled",onStorage:"onstorage",onSubmit:"onsubmit",onSuspend:"onsuspend",onTimeUpdate:"ontimeupdate",onToggle:"ontoggle",onUnload:"onunload",onVolumeChange:"onvolumechange",onWaiting:"onwaiting",onZoom:"onzoom",overlinePosition:"overline-position",overlineThickness:"overline-thickness",paintOrder:"paint-order",panose1:"panose-1",pointerEvents:"pointer-events",referrerPolicy:"referrerpolicy",renderingIntent:"rendering-intent",shapeRendering:"shape-rendering",stopColor:"stop-color",stopOpacity:"stop-opacity",strikethroughPosition:"strikethrough-position",strikethroughThickness:"strikethrough-thickness",strokeDashArray:"stroke-dasharray",strokeDashOffset:"stroke-dashoffset",strokeLineCap:"stroke-linecap",strokeLineJoin:"stroke-linejoin",strokeMiterLimit:"stroke-miterlimit",strokeOpacity:"stroke-opacity",strokeWidth:"stroke-width",tabIndex:"tabindex",textAnchor:"text-anchor",textDecoration:"text-decoration",textRendering:"text-rendering",transformOrigin:"transform-origin",typeOf:"typeof",underlinePosition:"underline-position",underlineThickness:"underline-thickness",unicodeBidi:"unicode-bidi",unicodeRange:"unicode-range",unitsPerEm:"units-per-em",vAlphabetic:"v-alphabetic",vHanging:"v-hanging",vIdeographic:"v-ideographic",vMathematical:"v-mathematical",vectorEffect:"vector-effect",vertAdvY:"vert-adv-y",vertOriginX:"vert-origin-x",vertOriginY:"vert-origin-y",wordSpacing:"word-spacing",writingMode:"writing-mode",xHeight:"x-height",playbackOrder:"playbackorder",timelineBegin:"timelinebegin"},transform:Jw,properties:{about:fi,accentHeight:Pe,accumulate:null,additive:null,alignmentBaseline:null,alphabetic:Pe,amplitude:Pe,arabicForm:null,ascent:Pe,attributeName:null,attributeType:null,azimuth:Pe,bandwidth:null,baselineShift:null,baseFrequency:null,baseProfile:null,bbox:null,begin:null,bias:Pe,by:null,calcMode:null,capHeight:Pe,className:Ht,clip:null,clipPath:null,clipPathUnits:null,clipRule:null,color:null,colorInterpolation:null,colorInterpolationFilters:null,colorProfile:null,colorRendering:null,content:null,contentScriptType:null,contentStyleType:null,crossOrigin:null,cursor:null,cx:null,cy:null,d:null,dataType:null,defaultAction:null,descent:Pe,diffuseConstant:Pe,direction:null,display:null,dur:null,divisor:Pe,dominantBaseline:null,download:pt,dx:null,dy:null,edgeMode:null,editable:null,elevation:Pe,enableBackground:null,end:null,event:null,exponent:Pe,externalResourcesRequired:null,fill:null,fillOpacity:Pe,fillRule:null,filter:null,filterRes:null,filterUnits:null,floodColor:null,floodOpacity:null,focusable:null,focusHighlight:null,fontFamily:null,fontSize:null,fontSizeAdjust:null,fontStretch:null,fontStyle:null,fontVariant:null,fontWeight:null,format:null,fr:null,from:null,fx:null,fy:null,g1:ca,g2:ca,glyphName:ca,glyphOrientationHorizontal:null,glyphOrientationVertical:null,glyphRef:null,gradientTransform:null,gradientUnits:null,handler:null,hanging:Pe,hatchContentUnits:null,hatchUnits:null,height:null,href:null,hrefLang:null,horizAdvX:Pe,horizOriginX:Pe,horizOriginY:Pe,id:null,ideographic:Pe,imageRendering:null,initialVisibility:null,in:null,in2:null,intercept:Pe,k:Pe,k1:Pe,k2:Pe,k3:Pe,k4:Pe,kernelMatrix:fi,kernelUnitLength:null,keyPoints:null,keySplines:null,keyTimes:null,kerning:null,lang:null,lengthAdjust:null,letterSpacing:null,lightingColor:null,limitingConeAngle:Pe,local:null,markerEnd:null,markerMid:null,markerStart:null,markerHeight:null,markerUnits:null,markerWidth:null,mask:null,maskContentUnits:null,maskUnits:null,mathematical:null,max:null,media:null,mediaCharacterEncoding:null,mediaContentEncodings:null,mediaSize:Pe,mediaTime:null,method:null,min:null,mode:null,name:null,navDown:null,navDownLeft:null,navDownRight:null,navLeft:null,navNext:null,navPrev:null,navRight:null,navUp:null,navUpLeft:null,navUpRight:null,numOctaves:null,observer:null,offset:null,onAbort:null,onActivate:null,onAfterPrint:null,onBeforePrint:null,onBegin:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnd:null,onEnded:null,onError:null,onFocus:null,onFocusIn:null,onFocusOut:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadStart:null,onMessage:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onMouseWheel:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRepeat:null,onReset:null,onResize:null,onScroll:null,onSeeked:null,onSeeking:null,onSelect:null,onShow:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnload:null,onVolumeChange:null,onWaiting:null,onZoom:null,opacity:null,operator:null,order:null,orient:null,orientation:null,origin:null,overflow:null,overlay:null,overlinePosition:Pe,overlineThickness:Pe,paintOrder:null,panose1:null,path:null,pathLength:Pe,patternContentUnits:null,patternTransform:null,patternUnits:null,phase:null,ping:Ht,pitch:null,playbackOrder:null,pointerEvents:null,points:null,pointsAtX:Pe,pointsAtY:Pe,pointsAtZ:Pe,preserveAlpha:null,preserveAspectRatio:null,primitiveUnits:null,propagate:null,property:fi,r:null,radius:null,referrerPolicy:null,refX:null,refY:null,rel:fi,rev:fi,renderingIntent:null,repeatCount:null,repeatDur:null,requiredExtensions:fi,requiredFeatures:fi,requiredFonts:fi,requiredFormats:fi,resource:null,restart:null,result:null,rotate:null,rx:null,ry:null,scale:null,seed:null,shapeRendering:null,side:null,slope:null,snapshotTime:null,specularConstant:Pe,specularExponent:Pe,spreadMethod:null,spacing:null,startOffset:null,stdDeviation:null,stemh:null,stemv:null,stitchTiles:null,stopColor:null,stopOpacity:null,strikethroughPosition:Pe,strikethroughThickness:Pe,string:null,stroke:null,strokeDashArray:fi,strokeDashOffset:null,strokeLineCap:null,strokeLineJoin:null,strokeMiterLimit:Pe,strokeOpacity:Pe,strokeWidth:null,style:null,surfaceScale:Pe,syncBehavior:null,syncBehaviorDefault:null,syncMaster:null,syncTolerance:null,syncToleranceDefault:null,systemLanguage:fi,tabIndex:Pe,tableValues:null,target:null,targetX:Pe,targetY:Pe,textAnchor:null,textDecoration:null,textRendering:null,textLength:null,timelineBegin:null,title:null,transformBehavior:null,type:null,typeOf:fi,to:null,transform:null,transformOrigin:null,u1:null,u2:null,underlinePosition:Pe,underlineThickness:Pe,unicode:null,unicodeBidi:null,unicodeRange:null,unitsPerEm:Pe,values:null,vAlphabetic:Pe,vMathematical:Pe,vectorEffect:null,vHanging:Pe,vIdeographic:Pe,version:null,vertAdvY:Pe,vertOriginX:Pe,vertOriginY:Pe,viewBox:null,viewTarget:null,visibility:null,width:null,widths:null,wordSpacing:null,writingMode:null,x:null,x1:null,x2:null,xChannelSelector:null,xHeight:Pe,y:null,y1:null,y2:null,yChannelSelector:null,z:null,zoomAndPan:null}}),FI=/^data[-\w.:]+$/i,nS=/-[a-z]/g,OI=/[A-Z]/g;function BI(t,e){const n=Rm(e);let i=e,s=Ri;if(n in t.normal)return t.property[t.normal[n]];if(n.length>4&&n.slice(0,4)==="data"&&FI.test(e)){if(e.charAt(4)==="-"){const a=e.slice(5).replace(nS,VI);i="data"+a.charAt(0).toUpperCase()+a.slice(1)}else{const a=e.slice(4);if(!nS.test(a)){let l=a.replace(OI,zI);l.charAt(0)!=="-"&&(l="-"+l),e="data"+l}}s=gv}return new s(i,e)}function zI(t){return"-"+t.toLowerCase()}function VI(t){return t.charAt(1).toUpperCase()}const HI={classId:"classID",dataType:"datatype",itemId:"itemID",strokeDashArray:"strokeDasharray",strokeDashOffset:"strokeDashoffset",strokeLineCap:"strokeLinecap",strokeLineJoin:"strokeLinejoin",strokeMiterLimit:"strokeMiterlimit",typeOf:"typeof",xLinkActuate:"xlinkActuate",xLinkArcRole:"xlinkArcrole",xLinkHref:"xlinkHref",xLinkRole:"xlinkRole",xLinkShow:"xlinkShow",xLinkTitle:"xlinkTitle",xLinkType:"xlinkType",xmlnsXLink:"xmlnsXlink"},GI=Yw([Qw,Zw,tM,nM,NI],"html"),vv=Yw([Qw,Zw,tM,nM,UI],"svg");function WI(t){return t.join(" ").trim()}var El={},pp,iS;function jI(){if(iS)return pp;iS=1;var t=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,e=/\n/g,n=/^\s*/,i=/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,s=/^:\s*/,a=/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,l=/^[;\s]*/,u=/^\s+|\s+$/g,f=`
`,d="/",h="*",m="",g="comment",v="declaration";pp=function(w,_){if(typeof w!="string")throw new TypeError("First argument must be a string");if(!w)return[];_=_||{};var y=1,M=1;function T(X){var J=X.match(e);J&&(y+=J.length);var ne=X.lastIndexOf(f);M=~ne?X.length-ne:M+X.length}function C(){var X={line:y,column:M};return function(J){return J.position=new N(X),B(),J}}function N(X){this.start=X,this.end={line:y,column:M},this.source=_.source}N.prototype.content=w;function b(X){var J=new Error(_.source+":"+y+":"+M+": "+X);if(J.reason=X,J.filename=_.source,J.line=y,J.column=M,J.source=w,!_.silent)throw J}function k(X){var J=X.exec(w);if(J){var ne=J[0];return T(ne),w=w.slice(ne.length),J}}function B(){k(n)}function L(X){var J;for(X=X||[];J=R();)J!==!1&&X.push(J);return X}function R(){var X=C();if(!(d!=w.charAt(0)||h!=w.charAt(1))){for(var J=2;m!=w.charAt(J)&&(h!=w.charAt(J)||d!=w.charAt(J+1));)++J;if(J+=2,m===w.charAt(J-1))return b("End of comment missing");var ne=w.slice(2,J-2);return M+=2,T(ne),w=w.slice(J),M+=2,X({type:g,comment:ne})}}function O(){var X=C(),J=k(i);if(J){if(R(),!k(s))return b("property missing ':'");var ne=k(a),le=X({type:v,property:E(J[0].replace(t,m)),value:ne?E(ne[0].replace(t,m)):m});return k(l),le}}function Z(){var X=[];L(X);for(var J;J=O();)J!==!1&&(X.push(J),L(X));return X}return B(),Z()};function E(w){return w?w.replace(u,m):m}return pp}var rS;function XI(){if(rS)return El;rS=1;var t=El.__importDefault||function(i){return i&&i.__esModule?i:{default:i}};Object.defineProperty(El,"__esModule",{value:!0}),El.default=n;var e=t(jI());function n(i,s){var a=null;if(!i||typeof i!="string")return a;var l=(0,e.default)(i),u=typeof s=="function";return l.forEach(function(f){if(f.type==="declaration"){var d=f.property,h=f.value;u?s(d,h,f):h&&(a=a||{},a[d]=h)}}),a}return El}var $I=XI();const sS=Xf($I),qI=sS.default||sS,iM=rM("end"),yv=rM("start");function rM(t){return e;function e(n){const i=n&&n.position&&n.position[t]||{};if(typeof i.line=="number"&&i.line>0&&typeof i.column=="number"&&i.column>0)return{line:i.line,column:i.column,offset:typeof i.offset=="number"&&i.offset>-1?i.offset:void 0}}}function YI(t){const e=yv(t),n=iM(t);if(e&&n)return{start:e,end:n}}function zl(t){return!t||typeof t!="object"?"":"position"in t||"type"in t?oS(t.position):"start"in t||"end"in t?oS(t):"line"in t||"column"in t?Dm(t):""}function Dm(t){return aS(t&&t.line)+":"+aS(t&&t.column)}function oS(t){return Dm(t&&t.start)+"-"+Dm(t&&t.end)}function aS(t){return t&&typeof t=="number"?t:1}class Bn extends Error{constructor(e,n,i){super(),typeof n=="string"&&(i=n,n=void 0);let s="",a={},l=!1;if(n&&("line"in n&&"column"in n?a={place:n}:"start"in n&&"end"in n?a={place:n}:"type"in n?a={ancestors:[n],place:n.position}:a={...n}),typeof e=="string"?s=e:!a.cause&&e&&(l=!0,s=e.message,a.cause=e),!a.ruleId&&!a.source&&typeof i=="string"){const f=i.indexOf(":");f===-1?a.ruleId=i:(a.source=i.slice(0,f),a.ruleId=i.slice(f+1))}if(!a.place&&a.ancestors&&a.ancestors){const f=a.ancestors[a.ancestors.length-1];f&&(a.place=f.position)}const u=a.place&&"start"in a.place?a.place.start:a.place;this.ancestors=a.ancestors||void 0,this.cause=a.cause||void 0,this.column=u?u.column:void 0,this.fatal=void 0,this.file,this.message=s,this.line=u?u.line:void 0,this.name=zl(a.place)||"1:1",this.place=a.place||void 0,this.reason=this.message,this.ruleId=a.ruleId||void 0,this.source=a.source||void 0,this.stack=l&&a.cause&&typeof a.cause.stack=="string"?a.cause.stack:"",this.actual,this.expected,this.note,this.url}}Bn.prototype.file="";Bn.prototype.name="";Bn.prototype.reason="";Bn.prototype.message="";Bn.prototype.stack="";Bn.prototype.column=void 0;Bn.prototype.line=void 0;Bn.prototype.ancestors=void 0;Bn.prototype.cause=void 0;Bn.prototype.fatal=void 0;Bn.prototype.place=void 0;Bn.prototype.ruleId=void 0;Bn.prototype.source=void 0;const xv={}.hasOwnProperty,KI=new Map,ZI=/[A-Z]/g,QI=/-([a-z])/g,JI=new Set(["table","tbody","thead","tfoot","tr"]),ek=new Set(["td","th"]),sM="https://github.com/syntax-tree/hast-util-to-jsx-runtime";function tk(t,e){if(!e||e.Fragment===void 0)throw new TypeError("Expected `Fragment` in options");const n=e.filePath||void 0;let i;if(e.development){if(typeof e.jsxDEV!="function")throw new TypeError("Expected `jsxDEV` in options when `development: true`");i=uk(n,e.jsxDEV)}else{if(typeof e.jsx!="function")throw new TypeError("Expected `jsx` in production options");if(typeof e.jsxs!="function")throw new TypeError("Expected `jsxs` in production options");i=lk(n,e.jsx,e.jsxs)}const s={Fragment:e.Fragment,ancestors:[],components:e.components||{},create:i,elementAttributeNameCase:e.elementAttributeNameCase||"react",evaluater:e.createEvaluater?e.createEvaluater():void 0,filePath:n,ignoreInvalidStyle:e.ignoreInvalidStyle||!1,passKeys:e.passKeys!==!1,passNode:e.passNode||!1,schema:e.space==="svg"?vv:GI,stylePropertyNameCase:e.stylePropertyNameCase||"dom",tableCellAlignToStyle:e.tableCellAlignToStyle!==!1},a=oM(s,t,void 0);return a&&typeof a!="string"?a:s.create(t,s.Fragment,{children:a||void 0},void 0)}function oM(t,e,n){if(e.type==="element")return nk(t,e,n);if(e.type==="mdxFlowExpression"||e.type==="mdxTextExpression")return ik(t,e);if(e.type==="mdxJsxFlowElement"||e.type==="mdxJsxTextElement")return sk(t,e,n);if(e.type==="mdxjsEsm")return rk(t,e);if(e.type==="root")return ok(t,e,n);if(e.type==="text")return ak(t,e)}function nk(t,e,n){const i=t.schema;let s=i;e.tagName.toLowerCase()==="svg"&&i.space==="html"&&(s=vv,t.schema=s),t.ancestors.push(e);const a=lM(t,e.tagName,!1),l=ck(t,e);let u=Sv(t,e);return JI.has(e.tagName)&&(u=u.filter(function(f){return typeof f=="string"?!LI(f):!0})),aM(t,l,a,e),_v(l,u),t.ancestors.pop(),t.schema=i,t.create(e,a,l,n)}function ik(t,e){if(e.data&&e.data.estree&&t.evaluater){const i=e.data.estree.body[0];return i.type,t.evaluater.evaluateExpression(i.expression)}Zl(t,e.position)}function rk(t,e){if(e.data&&e.data.estree&&t.evaluater)return t.evaluater.evaluateProgram(e.data.estree);Zl(t,e.position)}function sk(t,e,n){const i=t.schema;let s=i;e.name==="svg"&&i.space==="html"&&(s=vv,t.schema=s),t.ancestors.push(e);const a=e.name===null?t.Fragment:lM(t,e.name,!0),l=fk(t,e),u=Sv(t,e);return aM(t,l,a,e),_v(l,u),t.ancestors.pop(),t.schema=i,t.create(e,a,l,n)}function ok(t,e,n){const i={};return _v(i,Sv(t,e)),t.create(e,t.Fragment,i,n)}function ak(t,e){return e.value}function aM(t,e,n,i){typeof n!="string"&&n!==t.Fragment&&t.passNode&&(e.node=i)}function _v(t,e){if(e.length>0){const n=e.length>1?e:e[0];n&&(t.children=n)}}function lk(t,e,n){return i;function i(s,a,l,u){const d=Array.isArray(l.children)?n:e;return u?d(a,l,u):d(a,l)}}function uk(t,e){return n;function n(i,s,a,l){const u=Array.isArray(a.children),f=yv(i);return e(s,a,l,u,{columnNumber:f?f.column-1:void 0,fileName:t,lineNumber:f?f.line:void 0},void 0)}}function ck(t,e){const n={};let i,s;for(s in e.properties)if(s!=="children"&&xv.call(e.properties,s)){const a=dk(t,s,e.properties[s]);if(a){const[l,u]=a;t.tableCellAlignToStyle&&l==="align"&&typeof u=="string"&&ek.has(e.tagName)?i=u:n[l]=u}}if(i){const a=n.style||(n.style={});a[t.stylePropertyNameCase==="css"?"text-align":"textAlign"]=i}return n}function fk(t,e){const n={};for(const i of e.attributes)if(i.type==="mdxJsxExpressionAttribute")if(i.data&&i.data.estree&&t.evaluater){const a=i.data.estree.body[0];a.type;const l=a.expression;l.type;const u=l.properties[0];u.type,Object.assign(n,t.evaluater.evaluateExpression(u.argument))}else Zl(t,e.position);else{const s=i.name;let a;if(i.value&&typeof i.value=="object")if(i.value.data&&i.value.data.estree&&t.evaluater){const u=i.value.data.estree.body[0];u.type,a=t.evaluater.evaluateExpression(u.expression)}else Zl(t,e.position);else a=i.value===null?!0:i.value;n[s]=a}return n}function Sv(t,e){const n=[];let i=-1;const s=t.passKeys?new Map:KI;for(;++i<e.children.length;){const a=e.children[i];let l;if(t.passKeys){const f=a.type==="element"?a.tagName:a.type==="mdxJsxFlowElement"||a.type==="mdxJsxTextElement"?a.name:void 0;if(f){const d=s.get(f)||0;l=f+"-"+d,s.set(f,d+1)}}const u=oM(t,a,l);u!==void 0&&n.push(u)}return n}function dk(t,e,n){const i=BI(t.schema,e);if(!(n==null||typeof n=="number"&&Number.isNaN(n))){if(Array.isArray(n)&&(n=i.commaSeparated?CI(n):WI(n)),i.property==="style"){let s=typeof n=="object"?n:hk(t,String(n));return t.stylePropertyNameCase==="css"&&(s=pk(s)),["style",s]}return[t.elementAttributeNameCase==="react"&&i.space?HI[i.property]||i.property:i.attribute,n]}}function hk(t,e){const n={};try{qI(e,i)}catch(s){if(!t.ignoreInvalidStyle){const a=s,l=new Bn("Cannot parse `style` attribute",{ancestors:t.ancestors,cause:a,ruleId:"style",source:"hast-util-to-jsx-runtime"});throw l.file=t.filePath||void 0,l.url=sM+"#cannot-parse-style-attribute",l}}return n;function i(s,a){let l=s;l.slice(0,2)!=="--"&&(l.slice(0,4)==="-ms-"&&(l="ms-"+l.slice(4)),l=l.replace(QI,gk)),n[l]=a}}function lM(t,e,n){let i;if(!n)i={type:"Literal",value:e};else if(e.includes(".")){const s=e.split(".");let a=-1,l;for(;++a<s.length;){const u=J_(s[a])?{type:"Identifier",name:s[a]}:{type:"Literal",value:s[a]};l=l?{type:"MemberExpression",object:l,property:u,computed:!!(a&&u.type==="Literal"),optional:!1}:u}i=l}else i=J_(e)&&!/^[a-z]/.test(e)?{type:"Identifier",name:e}:{type:"Literal",value:e};if(i.type==="Literal"){const s=i.value;return xv.call(t.components,s)?t.components[s]:s}if(t.evaluater)return t.evaluater.evaluateExpression(i);Zl(t)}function Zl(t,e){const n=new Bn("Cannot handle MDX estrees without `createEvaluater`",{ancestors:t.ancestors,place:e,ruleId:"mdx-estree",source:"hast-util-to-jsx-runtime"});throw n.file=t.filePath||void 0,n.url=sM+"#cannot-handle-mdx-estrees-without-createevaluater",n}function pk(t){const e={};let n;for(n in t)xv.call(t,n)&&(e[mk(n)]=t[n]);return e}function mk(t){let e=t.replace(ZI,vk);return e.slice(0,3)==="ms-"&&(e="-"+e),e}function gk(t,e){return e.toUpperCase()}function vk(t){return"-"+t.toLowerCase()}const mp={action:["form"],cite:["blockquote","del","ins","q"],data:["object"],formAction:["button","input"],href:["a","area","base","link"],icon:["menuitem"],itemId:null,manifest:["html"],ping:["a","area"],poster:["video"],src:["audio","embed","iframe","img","input","script","source","track","video"]},yk={};function xk(t,e){const n=yk,i=typeof n.includeImageAlt=="boolean"?n.includeImageAlt:!0,s=typeof n.includeHtml=="boolean"?n.includeHtml:!0;return uM(t,i,s)}function uM(t,e,n){if(_k(t)){if("value"in t)return t.type==="html"&&!n?"":t.value;if(e&&"alt"in t&&t.alt)return t.alt;if("children"in t)return lS(t.children,e,n)}return Array.isArray(t)?lS(t,e,n):""}function lS(t,e,n){const i=[];let s=-1;for(;++s<t.length;)i[s]=uM(t[s],e,n);return i.join("")}function _k(t){return!!(t&&typeof t=="object")}const uS=document.createElement("i");function Ev(t){const e="&"+t+";";uS.innerHTML=e;const n=uS.textContent;return n.charCodeAt(n.length-1)===59&&t!=="semi"||n===e?!1:n}function ar(t,e,n,i){const s=t.length;let a=0,l;if(e<0?e=-e>s?0:s+e:e=e>s?s:e,n=n>0?n:0,i.length<1e4)l=Array.from(i),l.unshift(e,n),t.splice(...l);else for(n&&t.splice(e,n);a<i.length;)l=i.slice(a,a+1e4),l.unshift(e,0),t.splice(...l),a+=1e4,e+=1e4}function Ci(t,e){return t.length>0?(ar(t,t.length,0,e),t):e}const cS={}.hasOwnProperty;function Sk(t){const e={};let n=-1;for(;++n<t.length;)Ek(e,t[n]);return e}function Ek(t,e){let n;for(n in e){const s=(cS.call(t,n)?t[n]:void 0)||(t[n]={}),a=e[n];let l;if(a)for(l in a){cS.call(s,l)||(s[l]=[]);const u=a[l];wk(s[l],Array.isArray(u)?u:u?[u]:[])}}}function wk(t,e){let n=-1;const i=[];for(;++n<e.length;)(e[n].add==="after"?t:i).push(e[n]);ar(t,0,0,i)}function cM(t,e){const n=Number.parseInt(t,e);return n<9||n===11||n>13&&n<32||n>126&&n<160||n>55295&&n<57344||n>64975&&n<65008||(n&65535)===65535||(n&65535)===65534||n>1114111?"�":String.fromCodePoint(n)}function fa(t){return t.replace(/[\t\n\r ]+/g," ").replace(/^ | $/g,"").toLowerCase().toUpperCase()}const er=As(/[A-Za-z]/),hi=As(/[\dA-Za-z]/),Mk=As(/[#-'*+\--9=?A-Z^-~]/);function Lm(t){return t!==null&&(t<32||t===127)}const Im=As(/\d/),Tk=As(/[\dA-Fa-f]/),Ak=As(/[!-/:-@[-`{-~]/);function ft(t){return t!==null&&t<-2}function ni(t){return t!==null&&(t<0||t===32)}function kt(t){return t===-2||t===-1||t===32}const Ck=As(new RegExp("\\p{P}|\\p{S}","u")),bk=As(/\s/);function As(t){return e;function e(n){return n!==null&&n>-1&&t.test(String.fromCharCode(n))}}function Oa(t){const e=[];let n=-1,i=0,s=0;for(;++n<t.length;){const a=t.charCodeAt(n);let l="";if(a===37&&hi(t.charCodeAt(n+1))&&hi(t.charCodeAt(n+2)))s=2;else if(a<128)/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(a))||(l=String.fromCharCode(a));else if(a>55295&&a<57344){const u=t.charCodeAt(n+1);a<56320&&u>56319&&u<57344?(l=String.fromCharCode(a,u),s=1):l="�"}else l=String.fromCharCode(a);l&&(e.push(t.slice(i,n),encodeURIComponent(l)),i=n+s+1,l=""),s&&(n+=s,s=0)}return e.join("")+t.slice(i)}function Gt(t,e,n,i){const s=i?i-1:Number.POSITIVE_INFINITY;let a=0;return l;function l(f){return kt(f)?(t.enter(n),u(f)):e(f)}function u(f){return kt(f)&&a++<s?(t.consume(f),u):(t.exit(n),e(f))}}const Rk={tokenize:Pk};function Pk(t){const e=t.attempt(this.parser.constructs.contentInitial,i,s);let n;return e;function i(u){if(u===null){t.consume(u);return}return t.enter("lineEnding"),t.consume(u),t.exit("lineEnding"),Gt(t,e,"linePrefix")}function s(u){return t.enter("paragraph"),a(u)}function a(u){const f=t.enter("chunkText",{contentType:"text",previous:n});return n&&(n.next=f),n=f,l(u)}function l(u){if(u===null){t.exit("chunkText"),t.exit("paragraph"),t.consume(u);return}return ft(u)?(t.consume(u),t.exit("chunkText"),a):(t.consume(u),l)}}const Dk={tokenize:Lk},fS={tokenize:Ik};function Lk(t){const e=this,n=[];let i=0,s,a,l;return u;function u(T){if(i<n.length){const C=n[i];return e.containerState=C[1],t.attempt(C[0].continuation,f,d)(T)}return d(T)}function f(T){if(i++,e.containerState._closeFlow){e.containerState._closeFlow=void 0,s&&M();const C=e.events.length;let N=C,b;for(;N--;)if(e.events[N][0]==="exit"&&e.events[N][1].type==="chunkFlow"){b=e.events[N][1].end;break}y(i);let k=C;for(;k<e.events.length;)e.events[k][1].end={...b},k++;return ar(e.events,N+1,0,e.events.slice(C)),e.events.length=k,d(T)}return u(T)}function d(T){if(i===n.length){if(!s)return g(T);if(s.currentConstruct&&s.currentConstruct.concrete)return E(T);e.interrupt=!!(s.currentConstruct&&!s._gfmTableDynamicInterruptHack)}return e.containerState={},t.check(fS,h,m)(T)}function h(T){return s&&M(),y(i),g(T)}function m(T){return e.parser.lazy[e.now().line]=i!==n.length,l=e.now().offset,E(T)}function g(T){return e.containerState={},t.attempt(fS,v,E)(T)}function v(T){return i++,n.push([e.currentConstruct,e.containerState]),g(T)}function E(T){if(T===null){s&&M(),y(0),t.consume(T);return}return s=s||e.parser.flow(e.now()),t.enter("chunkFlow",{_tokenizer:s,contentType:"flow",previous:a}),w(T)}function w(T){if(T===null){_(t.exit("chunkFlow"),!0),y(0),t.consume(T);return}return ft(T)?(t.consume(T),_(t.exit("chunkFlow")),i=0,e.interrupt=void 0,u):(t.consume(T),w)}function _(T,C){const N=e.sliceStream(T);if(C&&N.push(null),T.previous=a,a&&(a.next=T),a=T,s.defineSkip(T.start),s.write(N),e.parser.lazy[T.start.line]){let b=s.events.length;for(;b--;)if(s.events[b][1].start.offset<l&&(!s.events[b][1].end||s.events[b][1].end.offset>l))return;const k=e.events.length;let B=k,L,R;for(;B--;)if(e.events[B][0]==="exit"&&e.events[B][1].type==="chunkFlow"){if(L){R=e.events[B][1].end;break}L=!0}for(y(i),b=k;b<e.events.length;)e.events[b][1].end={...R},b++;ar(e.events,B+1,0,e.events.slice(k)),e.events.length=b}}function y(T){let C=n.length;for(;C-- >T;){const N=n[C];e.containerState=N[1],N[0].exit.call(e,t)}n.length=T}function M(){s.write([null]),a=void 0,s=void 0,e.containerState._closeFlow=void 0}}function Ik(t,e,n){return Gt(t,t.attempt(this.parser.constructs.document,e,n),"linePrefix",this.parser.constructs.disable.null.includes("codeIndented")?void 0:4)}function dS(t){if(t===null||ni(t)||bk(t))return 1;if(Ck(t))return 2}function wv(t,e,n){const i=[];let s=-1;for(;++s<t.length;){const a=t[s].resolveAll;a&&!i.includes(a)&&(e=a(e,n),i.push(a))}return e}const km={name:"attention",resolveAll:kk,tokenize:Nk};function kk(t,e){let n=-1,i,s,a,l,u,f,d,h;for(;++n<t.length;)if(t[n][0]==="enter"&&t[n][1].type==="attentionSequence"&&t[n][1]._close){for(i=n;i--;)if(t[i][0]==="exit"&&t[i][1].type==="attentionSequence"&&t[i][1]._open&&e.sliceSerialize(t[i][1]).charCodeAt(0)===e.sliceSerialize(t[n][1]).charCodeAt(0)){if((t[i][1]._close||t[n][1]._open)&&(t[n][1].end.offset-t[n][1].start.offset)%3&&!((t[i][1].end.offset-t[i][1].start.offset+t[n][1].end.offset-t[n][1].start.offset)%3))continue;f=t[i][1].end.offset-t[i][1].start.offset>1&&t[n][1].end.offset-t[n][1].start.offset>1?2:1;const m={...t[i][1].end},g={...t[n][1].start};hS(m,-f),hS(g,f),l={type:f>1?"strongSequence":"emphasisSequence",start:m,end:{...t[i][1].end}},u={type:f>1?"strongSequence":"emphasisSequence",start:{...t[n][1].start},end:g},a={type:f>1?"strongText":"emphasisText",start:{...t[i][1].end},end:{...t[n][1].start}},s={type:f>1?"strong":"emphasis",start:{...l.start},end:{...u.end}},t[i][1].end={...l.start},t[n][1].start={...u.end},d=[],t[i][1].end.offset-t[i][1].start.offset&&(d=Ci(d,[["enter",t[i][1],e],["exit",t[i][1],e]])),d=Ci(d,[["enter",s,e],["enter",l,e],["exit",l,e],["enter",a,e]]),d=Ci(d,wv(e.parser.constructs.insideSpan.null,t.slice(i+1,n),e)),d=Ci(d,[["exit",a,e],["enter",u,e],["exit",u,e],["exit",s,e]]),t[n][1].end.offset-t[n][1].start.offset?(h=2,d=Ci(d,[["enter",t[n][1],e],["exit",t[n][1],e]])):h=0,ar(t,i-1,n-i+3,d),n=i+d.length-h-2;break}}for(n=-1;++n<t.length;)t[n][1].type==="attentionSequence"&&(t[n][1].type="data");return t}function Nk(t,e){const n=this.parser.constructs.attentionMarkers.null,i=this.previous,s=dS(i);let a;return l;function l(f){return a=f,t.enter("attentionSequence"),u(f)}function u(f){if(f===a)return t.consume(f),u;const d=t.exit("attentionSequence"),h=dS(f),m=!h||h===2&&s||n.includes(f),g=!s||s===2&&h||n.includes(i);return d._open=!!(a===42?m:m&&(s||!g)),d._close=!!(a===42?g:g&&(h||!m)),e(f)}}function hS(t,e){t.column+=e,t.offset+=e,t._bufferIndex+=e}const Uk={name:"autolink",tokenize:Fk};function Fk(t,e,n){let i=0;return s;function s(v){return t.enter("autolink"),t.enter("autolinkMarker"),t.consume(v),t.exit("autolinkMarker"),t.enter("autolinkProtocol"),a}function a(v){return er(v)?(t.consume(v),l):v===64?n(v):d(v)}function l(v){return v===43||v===45||v===46||hi(v)?(i=1,u(v)):d(v)}function u(v){return v===58?(t.consume(v),i=0,f):(v===43||v===45||v===46||hi(v))&&i++<32?(t.consume(v),u):(i=0,d(v))}function f(v){return v===62?(t.exit("autolinkProtocol"),t.enter("autolinkMarker"),t.consume(v),t.exit("autolinkMarker"),t.exit("autolink"),e):v===null||v===32||v===60||Lm(v)?n(v):(t.consume(v),f)}function d(v){return v===64?(t.consume(v),h):Mk(v)?(t.consume(v),d):n(v)}function h(v){return hi(v)?m(v):n(v)}function m(v){return v===46?(t.consume(v),i=0,h):v===62?(t.exit("autolinkProtocol").type="autolinkEmail",t.enter("autolinkMarker"),t.consume(v),t.exit("autolinkMarker"),t.exit("autolink"),e):g(v)}function g(v){if((v===45||hi(v))&&i++<63){const E=v===45?g:m;return t.consume(v),E}return n(v)}}const ad={partial:!0,tokenize:Ok};function Ok(t,e,n){return i;function i(a){return kt(a)?Gt(t,s,"linePrefix")(a):s(a)}function s(a){return a===null||ft(a)?e(a):n(a)}}const fM={continuation:{tokenize:zk},exit:Vk,name:"blockQuote",tokenize:Bk};function Bk(t,e,n){const i=this;return s;function s(l){if(l===62){const u=i.containerState;return u.open||(t.enter("blockQuote",{_container:!0}),u.open=!0),t.enter("blockQuotePrefix"),t.enter("blockQuoteMarker"),t.consume(l),t.exit("blockQuoteMarker"),a}return n(l)}function a(l){return kt(l)?(t.enter("blockQuotePrefixWhitespace"),t.consume(l),t.exit("blockQuotePrefixWhitespace"),t.exit("blockQuotePrefix"),e):(t.exit("blockQuotePrefix"),e(l))}}function zk(t,e,n){const i=this;return s;function s(l){return kt(l)?Gt(t,a,"linePrefix",i.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(l):a(l)}function a(l){return t.attempt(fM,e,n)(l)}}function Vk(t){t.exit("blockQuote")}const dM={name:"characterEscape",tokenize:Hk};function Hk(t,e,n){return i;function i(a){return t.enter("characterEscape"),t.enter("escapeMarker"),t.consume(a),t.exit("escapeMarker"),s}function s(a){return Ak(a)?(t.enter("characterEscapeValue"),t.consume(a),t.exit("characterEscapeValue"),t.exit("characterEscape"),e):n(a)}}const hM={name:"characterReference",tokenize:Gk};function Gk(t,e,n){const i=this;let s=0,a,l;return u;function u(m){return t.enter("characterReference"),t.enter("characterReferenceMarker"),t.consume(m),t.exit("characterReferenceMarker"),f}function f(m){return m===35?(t.enter("characterReferenceMarkerNumeric"),t.consume(m),t.exit("characterReferenceMarkerNumeric"),d):(t.enter("characterReferenceValue"),a=31,l=hi,h(m))}function d(m){return m===88||m===120?(t.enter("characterReferenceMarkerHexadecimal"),t.consume(m),t.exit("characterReferenceMarkerHexadecimal"),t.enter("characterReferenceValue"),a=6,l=Tk,h):(t.enter("characterReferenceValue"),a=7,l=Im,h(m))}function h(m){if(m===59&&s){const g=t.exit("characterReferenceValue");return l===hi&&!Ev(i.sliceSerialize(g))?n(m):(t.enter("characterReferenceMarker"),t.consume(m),t.exit("characterReferenceMarker"),t.exit("characterReference"),e)}return l(m)&&s++<a?(t.consume(m),h):n(m)}}const pS={partial:!0,tokenize:jk},mS={concrete:!0,name:"codeFenced",tokenize:Wk};function Wk(t,e,n){const i=this,s={partial:!0,tokenize:N};let a=0,l=0,u;return f;function f(b){return d(b)}function d(b){const k=i.events[i.events.length-1];return a=k&&k[1].type==="linePrefix"?k[2].sliceSerialize(k[1],!0).length:0,u=b,t.enter("codeFenced"),t.enter("codeFencedFence"),t.enter("codeFencedFenceSequence"),h(b)}function h(b){return b===u?(l++,t.consume(b),h):l<3?n(b):(t.exit("codeFencedFenceSequence"),kt(b)?Gt(t,m,"whitespace")(b):m(b))}function m(b){return b===null||ft(b)?(t.exit("codeFencedFence"),i.interrupt?e(b):t.check(pS,w,C)(b)):(t.enter("codeFencedFenceInfo"),t.enter("chunkString",{contentType:"string"}),g(b))}function g(b){return b===null||ft(b)?(t.exit("chunkString"),t.exit("codeFencedFenceInfo"),m(b)):kt(b)?(t.exit("chunkString"),t.exit("codeFencedFenceInfo"),Gt(t,v,"whitespace")(b)):b===96&&b===u?n(b):(t.consume(b),g)}function v(b){return b===null||ft(b)?m(b):(t.enter("codeFencedFenceMeta"),t.enter("chunkString",{contentType:"string"}),E(b))}function E(b){return b===null||ft(b)?(t.exit("chunkString"),t.exit("codeFencedFenceMeta"),m(b)):b===96&&b===u?n(b):(t.consume(b),E)}function w(b){return t.attempt(s,C,_)(b)}function _(b){return t.enter("lineEnding"),t.consume(b),t.exit("lineEnding"),y}function y(b){return a>0&&kt(b)?Gt(t,M,"linePrefix",a+1)(b):M(b)}function M(b){return b===null||ft(b)?t.check(pS,w,C)(b):(t.enter("codeFlowValue"),T(b))}function T(b){return b===null||ft(b)?(t.exit("codeFlowValue"),M(b)):(t.consume(b),T)}function C(b){return t.exit("codeFenced"),e(b)}function N(b,k,B){let L=0;return R;function R(ne){return b.enter("lineEnding"),b.consume(ne),b.exit("lineEnding"),O}function O(ne){return b.enter("codeFencedFence"),kt(ne)?Gt(b,Z,"linePrefix",i.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(ne):Z(ne)}function Z(ne){return ne===u?(b.enter("codeFencedFenceSequence"),X(ne)):B(ne)}function X(ne){return ne===u?(L++,b.consume(ne),X):L>=l?(b.exit("codeFencedFenceSequence"),kt(ne)?Gt(b,J,"whitespace")(ne):J(ne)):B(ne)}function J(ne){return ne===null||ft(ne)?(b.exit("codeFencedFence"),k(ne)):B(ne)}}}function jk(t,e,n){const i=this;return s;function s(l){return l===null?n(l):(t.enter("lineEnding"),t.consume(l),t.exit("lineEnding"),a)}function a(l){return i.parser.lazy[i.now().line]?n(l):e(l)}}const gp={name:"codeIndented",tokenize:$k},Xk={partial:!0,tokenize:qk};function $k(t,e,n){const i=this;return s;function s(d){return t.enter("codeIndented"),Gt(t,a,"linePrefix",5)(d)}function a(d){const h=i.events[i.events.length-1];return h&&h[1].type==="linePrefix"&&h[2].sliceSerialize(h[1],!0).length>=4?l(d):n(d)}function l(d){return d===null?f(d):ft(d)?t.attempt(Xk,l,f)(d):(t.enter("codeFlowValue"),u(d))}function u(d){return d===null||ft(d)?(t.exit("codeFlowValue"),l(d)):(t.consume(d),u)}function f(d){return t.exit("codeIndented"),e(d)}}function qk(t,e,n){const i=this;return s;function s(l){return i.parser.lazy[i.now().line]?n(l):ft(l)?(t.enter("lineEnding"),t.consume(l),t.exit("lineEnding"),s):Gt(t,a,"linePrefix",5)(l)}function a(l){const u=i.events[i.events.length-1];return u&&u[1].type==="linePrefix"&&u[2].sliceSerialize(u[1],!0).length>=4?e(l):ft(l)?s(l):n(l)}}const Yk={name:"codeText",previous:Zk,resolve:Kk,tokenize:Qk};function Kk(t){let e=t.length-4,n=3,i,s;if((t[n][1].type==="lineEnding"||t[n][1].type==="space")&&(t[e][1].type==="lineEnding"||t[e][1].type==="space")){for(i=n;++i<e;)if(t[i][1].type==="codeTextData"){t[n][1].type="codeTextPadding",t[e][1].type="codeTextPadding",n+=2,e-=2;break}}for(i=n-1,e++;++i<=e;)s===void 0?i!==e&&t[i][1].type!=="lineEnding"&&(s=i):(i===e||t[i][1].type==="lineEnding")&&(t[s][1].type="codeTextData",i!==s+2&&(t[s][1].end=t[i-1][1].end,t.splice(s+2,i-s-2),e-=i-s-2,i=s+2),s=void 0);return t}function Zk(t){return t!==96||this.events[this.events.length-1][1].type==="characterEscape"}function Qk(t,e,n){let i=0,s,a;return l;function l(m){return t.enter("codeText"),t.enter("codeTextSequence"),u(m)}function u(m){return m===96?(t.consume(m),i++,u):(t.exit("codeTextSequence"),f(m))}function f(m){return m===null?n(m):m===32?(t.enter("space"),t.consume(m),t.exit("space"),f):m===96?(a=t.enter("codeTextSequence"),s=0,h(m)):ft(m)?(t.enter("lineEnding"),t.consume(m),t.exit("lineEnding"),f):(t.enter("codeTextData"),d(m))}function d(m){return m===null||m===32||m===96||ft(m)?(t.exit("codeTextData"),f(m)):(t.consume(m),d)}function h(m){return m===96?(t.consume(m),s++,h):s===i?(t.exit("codeTextSequence"),t.exit("codeText"),e(m)):(a.type="codeTextData",d(m))}}class Jk{constructor(e){this.left=e?[...e]:[],this.right=[]}get(e){if(e<0||e>=this.left.length+this.right.length)throw new RangeError("Cannot access index `"+e+"` in a splice buffer of size `"+(this.left.length+this.right.length)+"`");return e<this.left.length?this.left[e]:this.right[this.right.length-e+this.left.length-1]}get length(){return this.left.length+this.right.length}shift(){return this.setCursor(0),this.right.pop()}slice(e,n){const i=n??Number.POSITIVE_INFINITY;return i<this.left.length?this.left.slice(e,i):e>this.left.length?this.right.slice(this.right.length-i+this.left.length,this.right.length-e+this.left.length).reverse():this.left.slice(e).concat(this.right.slice(this.right.length-i+this.left.length).reverse())}splice(e,n,i){const s=n||0;this.setCursor(Math.trunc(e));const a=this.right.splice(this.right.length-s,Number.POSITIVE_INFINITY);return i&&wl(this.left,i),a.reverse()}pop(){return this.setCursor(Number.POSITIVE_INFINITY),this.left.pop()}push(e){this.setCursor(Number.POSITIVE_INFINITY),this.left.push(e)}pushMany(e){this.setCursor(Number.POSITIVE_INFINITY),wl(this.left,e)}unshift(e){this.setCursor(0),this.right.push(e)}unshiftMany(e){this.setCursor(0),wl(this.right,e.reverse())}setCursor(e){if(!(e===this.left.length||e>this.left.length&&this.right.length===0||e<0&&this.left.length===0))if(e<this.left.length){const n=this.left.splice(e,Number.POSITIVE_INFINITY);wl(this.right,n.reverse())}else{const n=this.right.splice(this.left.length+this.right.length-e,Number.POSITIVE_INFINITY);wl(this.left,n.reverse())}}}function wl(t,e){let n=0;if(e.length<1e4)t.push(...e);else for(;n<e.length;)t.push(...e.slice(n,n+1e4)),n+=1e4}function pM(t){const e={};let n=-1,i,s,a,l,u,f,d;const h=new Jk(t);for(;++n<h.length;){for(;n in e;)n=e[n];if(i=h.get(n),n&&i[1].type==="chunkFlow"&&h.get(n-1)[1].type==="listItemPrefix"&&(f=i[1]._tokenizer.events,a=0,a<f.length&&f[a][1].type==="lineEndingBlank"&&(a+=2),a<f.length&&f[a][1].type==="content"))for(;++a<f.length&&f[a][1].type!=="content";)f[a][1].type==="chunkText"&&(f[a][1]._isInFirstContentOfListItem=!0,a++);if(i[0]==="enter")i[1].contentType&&(Object.assign(e,eN(h,n)),n=e[n],d=!0);else if(i[1]._container){for(a=n,s=void 0;a--;)if(l=h.get(a),l[1].type==="lineEnding"||l[1].type==="lineEndingBlank")l[0]==="enter"&&(s&&(h.get(s)[1].type="lineEndingBlank"),l[1].type="lineEnding",s=a);else if(l[1].type!=="linePrefix")break;s&&(i[1].end={...h.get(s)[1].start},u=h.slice(s,n),u.unshift(i),h.splice(s,n-s+1,u))}}return ar(t,0,Number.POSITIVE_INFINITY,h.slice(0)),!d}function eN(t,e){const n=t.get(e)[1],i=t.get(e)[2];let s=e-1;const a=[],l=n._tokenizer||i.parser[n.contentType](n.start),u=l.events,f=[],d={};let h,m,g=-1,v=n,E=0,w=0;const _=[w];for(;v;){for(;t.get(++s)[1]!==v;);a.push(s),v._tokenizer||(h=i.sliceStream(v),v.next||h.push(null),m&&l.defineSkip(v.start),v._isInFirstContentOfListItem&&(l._gfmTasklistFirstContentOfListItem=!0),l.write(h),v._isInFirstContentOfListItem&&(l._gfmTasklistFirstContentOfListItem=void 0)),m=v,v=v.next}for(v=n;++g<u.length;)u[g][0]==="exit"&&u[g-1][0]==="enter"&&u[g][1].type===u[g-1][1].type&&u[g][1].start.line!==u[g][1].end.line&&(w=g+1,_.push(w),v._tokenizer=void 0,v.previous=void 0,v=v.next);for(l.events=[],v?(v._tokenizer=void 0,v.previous=void 0):_.pop(),g=_.length;g--;){const y=u.slice(_[g],_[g+1]),M=a.pop();f.push([M,M+y.length-1]),t.splice(M,2,y)}for(f.reverse(),g=-1;++g<f.length;)d[E+f[g][0]]=E+f[g][1],E+=f[g][1]-f[g][0]-1;return d}const tN={resolve:iN,tokenize:rN},nN={partial:!0,tokenize:sN};function iN(t){return pM(t),t}function rN(t,e){let n;return i;function i(u){return t.enter("content"),n=t.enter("chunkContent",{contentType:"content"}),s(u)}function s(u){return u===null?a(u):ft(u)?t.check(nN,l,a)(u):(t.consume(u),s)}function a(u){return t.exit("chunkContent"),t.exit("content"),e(u)}function l(u){return t.consume(u),t.exit("chunkContent"),n.next=t.enter("chunkContent",{contentType:"content",previous:n}),n=n.next,s}}function sN(t,e,n){const i=this;return s;function s(l){return t.exit("chunkContent"),t.enter("lineEnding"),t.consume(l),t.exit("lineEnding"),Gt(t,a,"linePrefix")}function a(l){if(l===null||ft(l))return n(l);const u=i.events[i.events.length-1];return!i.parser.constructs.disable.null.includes("codeIndented")&&u&&u[1].type==="linePrefix"&&u[2].sliceSerialize(u[1],!0).length>=4?e(l):t.interrupt(i.parser.constructs.flow,n,e)(l)}}function mM(t,e,n,i,s,a,l,u,f){const d=f||Number.POSITIVE_INFINITY;let h=0;return m;function m(y){return y===60?(t.enter(i),t.enter(s),t.enter(a),t.consume(y),t.exit(a),g):y===null||y===32||y===41||Lm(y)?n(y):(t.enter(i),t.enter(l),t.enter(u),t.enter("chunkString",{contentType:"string"}),w(y))}function g(y){return y===62?(t.enter(a),t.consume(y),t.exit(a),t.exit(s),t.exit(i),e):(t.enter(u),t.enter("chunkString",{contentType:"string"}),v(y))}function v(y){return y===62?(t.exit("chunkString"),t.exit(u),g(y)):y===null||y===60||ft(y)?n(y):(t.consume(y),y===92?E:v)}function E(y){return y===60||y===62||y===92?(t.consume(y),v):v(y)}function w(y){return!h&&(y===null||y===41||ni(y))?(t.exit("chunkString"),t.exit(u),t.exit(l),t.exit(i),e(y)):h<d&&y===40?(t.consume(y),h++,w):y===41?(t.consume(y),h--,w):y===null||y===32||y===40||Lm(y)?n(y):(t.consume(y),y===92?_:w)}function _(y){return y===40||y===41||y===92?(t.consume(y),w):w(y)}}function gM(t,e,n,i,s,a){const l=this;let u=0,f;return d;function d(v){return t.enter(i),t.enter(s),t.consume(v),t.exit(s),t.enter(a),h}function h(v){return u>999||v===null||v===91||v===93&&!f||v===94&&!u&&"_hiddenFootnoteSupport"in l.parser.constructs?n(v):v===93?(t.exit(a),t.enter(s),t.consume(v),t.exit(s),t.exit(i),e):ft(v)?(t.enter("lineEnding"),t.consume(v),t.exit("lineEnding"),h):(t.enter("chunkString",{contentType:"string"}),m(v))}function m(v){return v===null||v===91||v===93||ft(v)||u++>999?(t.exit("chunkString"),h(v)):(t.consume(v),f||(f=!kt(v)),v===92?g:m)}function g(v){return v===91||v===92||v===93?(t.consume(v),u++,m):m(v)}}function vM(t,e,n,i,s,a){let l;return u;function u(g){return g===34||g===39||g===40?(t.enter(i),t.enter(s),t.consume(g),t.exit(s),l=g===40?41:g,f):n(g)}function f(g){return g===l?(t.enter(s),t.consume(g),t.exit(s),t.exit(i),e):(t.enter(a),d(g))}function d(g){return g===l?(t.exit(a),f(l)):g===null?n(g):ft(g)?(t.enter("lineEnding"),t.consume(g),t.exit("lineEnding"),Gt(t,d,"linePrefix")):(t.enter("chunkString",{contentType:"string"}),h(g))}function h(g){return g===l||g===null||ft(g)?(t.exit("chunkString"),d(g)):(t.consume(g),g===92?m:h)}function m(g){return g===l||g===92?(t.consume(g),h):h(g)}}function Vl(t,e){let n;return i;function i(s){return ft(s)?(t.enter("lineEnding"),t.consume(s),t.exit("lineEnding"),n=!0,i):kt(s)?Gt(t,i,n?"linePrefix":"lineSuffix")(s):e(s)}}const oN={name:"definition",tokenize:lN},aN={partial:!0,tokenize:uN};function lN(t,e,n){const i=this;let s;return a;function a(v){return t.enter("definition"),l(v)}function l(v){return gM.call(i,t,u,n,"definitionLabel","definitionLabelMarker","definitionLabelString")(v)}function u(v){return s=fa(i.sliceSerialize(i.events[i.events.length-1][1]).slice(1,-1)),v===58?(t.enter("definitionMarker"),t.consume(v),t.exit("definitionMarker"),f):n(v)}function f(v){return ni(v)?Vl(t,d)(v):d(v)}function d(v){return mM(t,h,n,"definitionDestination","definitionDestinationLiteral","definitionDestinationLiteralMarker","definitionDestinationRaw","definitionDestinationString")(v)}function h(v){return t.attempt(aN,m,m)(v)}function m(v){return kt(v)?Gt(t,g,"whitespace")(v):g(v)}function g(v){return v===null||ft(v)?(t.exit("definition"),i.parser.defined.push(s),e(v)):n(v)}}function uN(t,e,n){return i;function i(u){return ni(u)?Vl(t,s)(u):n(u)}function s(u){return vM(t,a,n,"definitionTitle","definitionTitleMarker","definitionTitleString")(u)}function a(u){return kt(u)?Gt(t,l,"whitespace")(u):l(u)}function l(u){return u===null||ft(u)?e(u):n(u)}}const cN={name:"hardBreakEscape",tokenize:fN};function fN(t,e,n){return i;function i(a){return t.enter("hardBreakEscape"),t.consume(a),s}function s(a){return ft(a)?(t.exit("hardBreakEscape"),e(a)):n(a)}}const dN={name:"headingAtx",resolve:hN,tokenize:pN};function hN(t,e){let n=t.length-2,i=3,s,a;return t[i][1].type==="whitespace"&&(i+=2),n-2>i&&t[n][1].type==="whitespace"&&(n-=2),t[n][1].type==="atxHeadingSequence"&&(i===n-1||n-4>i&&t[n-2][1].type==="whitespace")&&(n-=i+1===n?2:4),n>i&&(s={type:"atxHeadingText",start:t[i][1].start,end:t[n][1].end},a={type:"chunkText",start:t[i][1].start,end:t[n][1].end,contentType:"text"},ar(t,i,n-i+1,[["enter",s,e],["enter",a,e],["exit",a,e],["exit",s,e]])),t}function pN(t,e,n){let i=0;return s;function s(h){return t.enter("atxHeading"),a(h)}function a(h){return t.enter("atxHeadingSequence"),l(h)}function l(h){return h===35&&i++<6?(t.consume(h),l):h===null||ni(h)?(t.exit("atxHeadingSequence"),u(h)):n(h)}function u(h){return h===35?(t.enter("atxHeadingSequence"),f(h)):h===null||ft(h)?(t.exit("atxHeading"),e(h)):kt(h)?Gt(t,u,"whitespace")(h):(t.enter("atxHeadingText"),d(h))}function f(h){return h===35?(t.consume(h),f):(t.exit("atxHeadingSequence"),u(h))}function d(h){return h===null||h===35||ni(h)?(t.exit("atxHeadingText"),u(h)):(t.consume(h),d)}}const mN=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],gS=["pre","script","style","textarea"],gN={concrete:!0,name:"htmlFlow",resolveTo:xN,tokenize:_N},vN={partial:!0,tokenize:EN},yN={partial:!0,tokenize:SN};function xN(t){let e=t.length;for(;e--&&!(t[e][0]==="enter"&&t[e][1].type==="htmlFlow"););return e>1&&t[e-2][1].type==="linePrefix"&&(t[e][1].start=t[e-2][1].start,t[e+1][1].start=t[e-2][1].start,t.splice(e-2,2)),t}function _N(t,e,n){const i=this;let s,a,l,u,f;return d;function d(U){return h(U)}function h(U){return t.enter("htmlFlow"),t.enter("htmlFlowData"),t.consume(U),m}function m(U){return U===33?(t.consume(U),g):U===47?(t.consume(U),a=!0,w):U===63?(t.consume(U),s=3,i.interrupt?e:D):er(U)?(t.consume(U),l=String.fromCharCode(U),_):n(U)}function g(U){return U===45?(t.consume(U),s=2,v):U===91?(t.consume(U),s=5,u=0,E):er(U)?(t.consume(U),s=4,i.interrupt?e:D):n(U)}function v(U){return U===45?(t.consume(U),i.interrupt?e:D):n(U)}function E(U){const ee="CDATA[";return U===ee.charCodeAt(u++)?(t.consume(U),u===ee.length?i.interrupt?e:Z:E):n(U)}function w(U){return er(U)?(t.consume(U),l=String.fromCharCode(U),_):n(U)}function _(U){if(U===null||U===47||U===62||ni(U)){const ee=U===47,ge=l.toLowerCase();return!ee&&!a&&gS.includes(ge)?(s=1,i.interrupt?e(U):Z(U)):mN.includes(l.toLowerCase())?(s=6,ee?(t.consume(U),y):i.interrupt?e(U):Z(U)):(s=7,i.interrupt&&!i.parser.lazy[i.now().line]?n(U):a?M(U):T(U))}return U===45||hi(U)?(t.consume(U),l+=String.fromCharCode(U),_):n(U)}function y(U){return U===62?(t.consume(U),i.interrupt?e:Z):n(U)}function M(U){return kt(U)?(t.consume(U),M):R(U)}function T(U){return U===47?(t.consume(U),R):U===58||U===95||er(U)?(t.consume(U),C):kt(U)?(t.consume(U),T):R(U)}function C(U){return U===45||U===46||U===58||U===95||hi(U)?(t.consume(U),C):N(U)}function N(U){return U===61?(t.consume(U),b):kt(U)?(t.consume(U),N):T(U)}function b(U){return U===null||U===60||U===61||U===62||U===96?n(U):U===34||U===39?(t.consume(U),f=U,k):kt(U)?(t.consume(U),b):B(U)}function k(U){return U===f?(t.consume(U),f=null,L):U===null||ft(U)?n(U):(t.consume(U),k)}function B(U){return U===null||U===34||U===39||U===47||U===60||U===61||U===62||U===96||ni(U)?N(U):(t.consume(U),B)}function L(U){return U===47||U===62||kt(U)?T(U):n(U)}function R(U){return U===62?(t.consume(U),O):n(U)}function O(U){return U===null||ft(U)?Z(U):kt(U)?(t.consume(U),O):n(U)}function Z(U){return U===45&&s===2?(t.consume(U),le):U===60&&s===1?(t.consume(U),re):U===62&&s===4?(t.consume(U),V):U===63&&s===3?(t.consume(U),D):U===93&&s===5?(t.consume(U),ue):ft(U)&&(s===6||s===7)?(t.exit("htmlFlowData"),t.check(vN,ie,X)(U)):U===null||ft(U)?(t.exit("htmlFlowData"),X(U)):(t.consume(U),Z)}function X(U){return t.check(yN,J,ie)(U)}function J(U){return t.enter("lineEnding"),t.consume(U),t.exit("lineEnding"),ne}function ne(U){return U===null||ft(U)?X(U):(t.enter("htmlFlowData"),Z(U))}function le(U){return U===45?(t.consume(U),D):Z(U)}function re(U){return U===47?(t.consume(U),l="",G):Z(U)}function G(U){if(U===62){const ee=l.toLowerCase();return gS.includes(ee)?(t.consume(U),V):Z(U)}return er(U)&&l.length<8?(t.consume(U),l+=String.fromCharCode(U),G):Z(U)}function ue(U){return U===93?(t.consume(U),D):Z(U)}function D(U){return U===62?(t.consume(U),V):U===45&&s===2?(t.consume(U),D):Z(U)}function V(U){return U===null||ft(U)?(t.exit("htmlFlowData"),ie(U)):(t.consume(U),V)}function ie(U){return t.exit("htmlFlow"),e(U)}}function SN(t,e,n){const i=this;return s;function s(l){return ft(l)?(t.enter("lineEnding"),t.consume(l),t.exit("lineEnding"),a):n(l)}function a(l){return i.parser.lazy[i.now().line]?n(l):e(l)}}function EN(t,e,n){return i;function i(s){return t.enter("lineEnding"),t.consume(s),t.exit("lineEnding"),t.attempt(ad,e,n)}}const wN={name:"htmlText",tokenize:MN};function MN(t,e,n){const i=this;let s,a,l;return u;function u(D){return t.enter("htmlText"),t.enter("htmlTextData"),t.consume(D),f}function f(D){return D===33?(t.consume(D),d):D===47?(t.consume(D),N):D===63?(t.consume(D),T):er(D)?(t.consume(D),B):n(D)}function d(D){return D===45?(t.consume(D),h):D===91?(t.consume(D),a=0,E):er(D)?(t.consume(D),M):n(D)}function h(D){return D===45?(t.consume(D),v):n(D)}function m(D){return D===null?n(D):D===45?(t.consume(D),g):ft(D)?(l=m,re(D)):(t.consume(D),m)}function g(D){return D===45?(t.consume(D),v):m(D)}function v(D){return D===62?le(D):D===45?g(D):m(D)}function E(D){const V="CDATA[";return D===V.charCodeAt(a++)?(t.consume(D),a===V.length?w:E):n(D)}function w(D){return D===null?n(D):D===93?(t.consume(D),_):ft(D)?(l=w,re(D)):(t.consume(D),w)}function _(D){return D===93?(t.consume(D),y):w(D)}function y(D){return D===62?le(D):D===93?(t.consume(D),y):w(D)}function M(D){return D===null||D===62?le(D):ft(D)?(l=M,re(D)):(t.consume(D),M)}function T(D){return D===null?n(D):D===63?(t.consume(D),C):ft(D)?(l=T,re(D)):(t.consume(D),T)}function C(D){return D===62?le(D):T(D)}function N(D){return er(D)?(t.consume(D),b):n(D)}function b(D){return D===45||hi(D)?(t.consume(D),b):k(D)}function k(D){return ft(D)?(l=k,re(D)):kt(D)?(t.consume(D),k):le(D)}function B(D){return D===45||hi(D)?(t.consume(D),B):D===47||D===62||ni(D)?L(D):n(D)}function L(D){return D===47?(t.consume(D),le):D===58||D===95||er(D)?(t.consume(D),R):ft(D)?(l=L,re(D)):kt(D)?(t.consume(D),L):le(D)}function R(D){return D===45||D===46||D===58||D===95||hi(D)?(t.consume(D),R):O(D)}function O(D){return D===61?(t.consume(D),Z):ft(D)?(l=O,re(D)):kt(D)?(t.consume(D),O):L(D)}function Z(D){return D===null||D===60||D===61||D===62||D===96?n(D):D===34||D===39?(t.consume(D),s=D,X):ft(D)?(l=Z,re(D)):kt(D)?(t.consume(D),Z):(t.consume(D),J)}function X(D){return D===s?(t.consume(D),s=void 0,ne):D===null?n(D):ft(D)?(l=X,re(D)):(t.consume(D),X)}function J(D){return D===null||D===34||D===39||D===60||D===61||D===96?n(D):D===47||D===62||ni(D)?L(D):(t.consume(D),J)}function ne(D){return D===47||D===62||ni(D)?L(D):n(D)}function le(D){return D===62?(t.consume(D),t.exit("htmlTextData"),t.exit("htmlText"),e):n(D)}function re(D){return t.exit("htmlTextData"),t.enter("lineEnding"),t.consume(D),t.exit("lineEnding"),G}function G(D){return kt(D)?Gt(t,ue,"linePrefix",i.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(D):ue(D)}function ue(D){return t.enter("htmlTextData"),l(D)}}const Mv={name:"labelEnd",resolveAll:bN,resolveTo:RN,tokenize:PN},TN={tokenize:DN},AN={tokenize:LN},CN={tokenize:IN};function bN(t){let e=-1;const n=[];for(;++e<t.length;){const i=t[e][1];if(n.push(t[e]),i.type==="labelImage"||i.type==="labelLink"||i.type==="labelEnd"){const s=i.type==="labelImage"?4:2;i.type="data",e+=s}}return t.length!==n.length&&ar(t,0,t.length,n),t}function RN(t,e){let n=t.length,i=0,s,a,l,u;for(;n--;)if(s=t[n][1],a){if(s.type==="link"||s.type==="labelLink"&&s._inactive)break;t[n][0]==="enter"&&s.type==="labelLink"&&(s._inactive=!0)}else if(l){if(t[n][0]==="enter"&&(s.type==="labelImage"||s.type==="labelLink")&&!s._balanced&&(a=n,s.type!=="labelLink")){i=2;break}}else s.type==="labelEnd"&&(l=n);const f={type:t[a][1].type==="labelLink"?"link":"image",start:{...t[a][1].start},end:{...t[t.length-1][1].end}},d={type:"label",start:{...t[a][1].start},end:{...t[l][1].end}},h={type:"labelText",start:{...t[a+i+2][1].end},end:{...t[l-2][1].start}};return u=[["enter",f,e],["enter",d,e]],u=Ci(u,t.slice(a+1,a+i+3)),u=Ci(u,[["enter",h,e]]),u=Ci(u,wv(e.parser.constructs.insideSpan.null,t.slice(a+i+4,l-3),e)),u=Ci(u,[["exit",h,e],t[l-2],t[l-1],["exit",d,e]]),u=Ci(u,t.slice(l+1)),u=Ci(u,[["exit",f,e]]),ar(t,a,t.length,u),t}function PN(t,e,n){const i=this;let s=i.events.length,a,l;for(;s--;)if((i.events[s][1].type==="labelImage"||i.events[s][1].type==="labelLink")&&!i.events[s][1]._balanced){a=i.events[s][1];break}return u;function u(g){return a?a._inactive?m(g):(l=i.parser.defined.includes(fa(i.sliceSerialize({start:a.end,end:i.now()}))),t.enter("labelEnd"),t.enter("labelMarker"),t.consume(g),t.exit("labelMarker"),t.exit("labelEnd"),f):n(g)}function f(g){return g===40?t.attempt(TN,h,l?h:m)(g):g===91?t.attempt(AN,h,l?d:m)(g):l?h(g):m(g)}function d(g){return t.attempt(CN,h,m)(g)}function h(g){return e(g)}function m(g){return a._balanced=!0,n(g)}}function DN(t,e,n){return i;function i(m){return t.enter("resource"),t.enter("resourceMarker"),t.consume(m),t.exit("resourceMarker"),s}function s(m){return ni(m)?Vl(t,a)(m):a(m)}function a(m){return m===41?h(m):mM(t,l,u,"resourceDestination","resourceDestinationLiteral","resourceDestinationLiteralMarker","resourceDestinationRaw","resourceDestinationString",32)(m)}function l(m){return ni(m)?Vl(t,f)(m):h(m)}function u(m){return n(m)}function f(m){return m===34||m===39||m===40?vM(t,d,n,"resourceTitle","resourceTitleMarker","resourceTitleString")(m):h(m)}function d(m){return ni(m)?Vl(t,h)(m):h(m)}function h(m){return m===41?(t.enter("resourceMarker"),t.consume(m),t.exit("resourceMarker"),t.exit("resource"),e):n(m)}}function LN(t,e,n){const i=this;return s;function s(u){return gM.call(i,t,a,l,"reference","referenceMarker","referenceString")(u)}function a(u){return i.parser.defined.includes(fa(i.sliceSerialize(i.events[i.events.length-1][1]).slice(1,-1)))?e(u):n(u)}function l(u){return n(u)}}function IN(t,e,n){return i;function i(a){return t.enter("reference"),t.enter("referenceMarker"),t.consume(a),t.exit("referenceMarker"),s}function s(a){return a===93?(t.enter("referenceMarker"),t.consume(a),t.exit("referenceMarker"),t.exit("reference"),e):n(a)}}const kN={name:"labelStartImage",resolveAll:Mv.resolveAll,tokenize:NN};function NN(t,e,n){const i=this;return s;function s(u){return t.enter("labelImage"),t.enter("labelImageMarker"),t.consume(u),t.exit("labelImageMarker"),a}function a(u){return u===91?(t.enter("labelMarker"),t.consume(u),t.exit("labelMarker"),t.exit("labelImage"),l):n(u)}function l(u){return u===94&&"_hiddenFootnoteSupport"in i.parser.constructs?n(u):e(u)}}const UN={name:"labelStartLink",resolveAll:Mv.resolveAll,tokenize:FN};function FN(t,e,n){const i=this;return s;function s(l){return t.enter("labelLink"),t.enter("labelMarker"),t.consume(l),t.exit("labelMarker"),t.exit("labelLink"),a}function a(l){return l===94&&"_hiddenFootnoteSupport"in i.parser.constructs?n(l):e(l)}}const vp={name:"lineEnding",tokenize:ON};function ON(t,e){return n;function n(i){return t.enter("lineEnding"),t.consume(i),t.exit("lineEnding"),Gt(t,e,"linePrefix")}}const wf={name:"thematicBreak",tokenize:BN};function BN(t,e,n){let i=0,s;return a;function a(d){return t.enter("thematicBreak"),l(d)}function l(d){return s=d,u(d)}function u(d){return d===s?(t.enter("thematicBreakSequence"),f(d)):i>=3&&(d===null||ft(d))?(t.exit("thematicBreak"),e(d)):n(d)}function f(d){return d===s?(t.consume(d),i++,f):(t.exit("thematicBreakSequence"),kt(d)?Gt(t,u,"whitespace")(d):u(d))}}const ei={continuation:{tokenize:GN},exit:jN,name:"list",tokenize:HN},zN={partial:!0,tokenize:XN},VN={partial:!0,tokenize:WN};function HN(t,e,n){const i=this,s=i.events[i.events.length-1];let a=s&&s[1].type==="linePrefix"?s[2].sliceSerialize(s[1],!0).length:0,l=0;return u;function u(v){const E=i.containerState.type||(v===42||v===43||v===45?"listUnordered":"listOrdered");if(E==="listUnordered"?!i.containerState.marker||v===i.containerState.marker:Im(v)){if(i.containerState.type||(i.containerState.type=E,t.enter(E,{_container:!0})),E==="listUnordered")return t.enter("listItemPrefix"),v===42||v===45?t.check(wf,n,d)(v):d(v);if(!i.interrupt||v===49)return t.enter("listItemPrefix"),t.enter("listItemValue"),f(v)}return n(v)}function f(v){return Im(v)&&++l<10?(t.consume(v),f):(!i.interrupt||l<2)&&(i.containerState.marker?v===i.containerState.marker:v===41||v===46)?(t.exit("listItemValue"),d(v)):n(v)}function d(v){return t.enter("listItemMarker"),t.consume(v),t.exit("listItemMarker"),i.containerState.marker=i.containerState.marker||v,t.check(ad,i.interrupt?n:h,t.attempt(zN,g,m))}function h(v){return i.containerState.initialBlankLine=!0,a++,g(v)}function m(v){return kt(v)?(t.enter("listItemPrefixWhitespace"),t.consume(v),t.exit("listItemPrefixWhitespace"),g):n(v)}function g(v){return i.containerState.size=a+i.sliceSerialize(t.exit("listItemPrefix"),!0).length,e(v)}}function GN(t,e,n){const i=this;return i.containerState._closeFlow=void 0,t.check(ad,s,a);function s(u){return i.containerState.furtherBlankLines=i.containerState.furtherBlankLines||i.containerState.initialBlankLine,Gt(t,e,"listItemIndent",i.containerState.size+1)(u)}function a(u){return i.containerState.furtherBlankLines||!kt(u)?(i.containerState.furtherBlankLines=void 0,i.containerState.initialBlankLine=void 0,l(u)):(i.containerState.furtherBlankLines=void 0,i.containerState.initialBlankLine=void 0,t.attempt(VN,e,l)(u))}function l(u){return i.containerState._closeFlow=!0,i.interrupt=void 0,Gt(t,t.attempt(ei,e,n),"linePrefix",i.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(u)}}function WN(t,e,n){const i=this;return Gt(t,s,"listItemIndent",i.containerState.size+1);function s(a){const l=i.events[i.events.length-1];return l&&l[1].type==="listItemIndent"&&l[2].sliceSerialize(l[1],!0).length===i.containerState.size?e(a):n(a)}}function jN(t){t.exit(this.containerState.type)}function XN(t,e,n){const i=this;return Gt(t,s,"listItemPrefixWhitespace",i.parser.constructs.disable.null.includes("codeIndented")?void 0:5);function s(a){const l=i.events[i.events.length-1];return!kt(a)&&l&&l[1].type==="listItemPrefixWhitespace"?e(a):n(a)}}const vS={name:"setextUnderline",resolveTo:$N,tokenize:qN};function $N(t,e){let n=t.length,i,s,a;for(;n--;)if(t[n][0]==="enter"){if(t[n][1].type==="content"){i=n;break}t[n][1].type==="paragraph"&&(s=n)}else t[n][1].type==="content"&&t.splice(n,1),!a&&t[n][1].type==="definition"&&(a=n);const l={type:"setextHeading",start:{...t[s][1].start},end:{...t[t.length-1][1].end}};return t[s][1].type="setextHeadingText",a?(t.splice(s,0,["enter",l,e]),t.splice(a+1,0,["exit",t[i][1],e]),t[i][1].end={...t[a][1].end}):t[i][1]=l,t.push(["exit",l,e]),t}function qN(t,e,n){const i=this;let s;return a;function a(d){let h=i.events.length,m;for(;h--;)if(i.events[h][1].type!=="lineEnding"&&i.events[h][1].type!=="linePrefix"&&i.events[h][1].type!=="content"){m=i.events[h][1].type==="paragraph";break}return!i.parser.lazy[i.now().line]&&(i.interrupt||m)?(t.enter("setextHeadingLine"),s=d,l(d)):n(d)}function l(d){return t.enter("setextHeadingLineSequence"),u(d)}function u(d){return d===s?(t.consume(d),u):(t.exit("setextHeadingLineSequence"),kt(d)?Gt(t,f,"lineSuffix")(d):f(d))}function f(d){return d===null||ft(d)?(t.exit("setextHeadingLine"),e(d)):n(d)}}const YN={tokenize:KN};function KN(t){const e=this,n=t.attempt(ad,i,t.attempt(this.parser.constructs.flowInitial,s,Gt(t,t.attempt(this.parser.constructs.flow,s,t.attempt(tN,s)),"linePrefix")));return n;function i(a){if(a===null){t.consume(a);return}return t.enter("lineEndingBlank"),t.consume(a),t.exit("lineEndingBlank"),e.currentConstruct=void 0,n}function s(a){if(a===null){t.consume(a);return}return t.enter("lineEnding"),t.consume(a),t.exit("lineEnding"),e.currentConstruct=void 0,n}}const ZN={resolveAll:xM()},QN=yM("string"),JN=yM("text");function yM(t){return{resolveAll:xM(t==="text"?e3:void 0),tokenize:e};function e(n){const i=this,s=this.parser.constructs[t],a=n.attempt(s,l,u);return l;function l(h){return d(h)?a(h):u(h)}function u(h){if(h===null){n.consume(h);return}return n.enter("data"),n.consume(h),f}function f(h){return d(h)?(n.exit("data"),a(h)):(n.consume(h),f)}function d(h){if(h===null)return!0;const m=s[h];let g=-1;if(m)for(;++g<m.length;){const v=m[g];if(!v.previous||v.previous.call(i,i.previous))return!0}return!1}}}function xM(t){return e;function e(n,i){let s=-1,a;for(;++s<=n.length;)a===void 0?n[s]&&n[s][1].type==="data"&&(a=s,s++):(!n[s]||n[s][1].type!=="data")&&(s!==a+2&&(n[a][1].end=n[s-1][1].end,n.splice(a+2,s-a-2),s=a+2),a=void 0);return t?t(n,i):n}}function e3(t,e){let n=0;for(;++n<=t.length;)if((n===t.length||t[n][1].type==="lineEnding")&&t[n-1][1].type==="data"){const i=t[n-1][1],s=e.sliceStream(i);let a=s.length,l=-1,u=0,f;for(;a--;){const d=s[a];if(typeof d=="string"){for(l=d.length;d.charCodeAt(l-1)===32;)u++,l--;if(l)break;l=-1}else if(d===-2)f=!0,u++;else if(d!==-1){a++;break}}if(u){const d={type:n===t.length||f||u<2?"lineSuffix":"hardBreakTrailing",start:{_bufferIndex:a?l:i.start._bufferIndex+l,_index:i.start._index+a,line:i.end.line,column:i.end.column-u,offset:i.end.offset-u},end:{...i.end}};i.end={...d.start},i.start.offset===i.end.offset?Object.assign(i,d):(t.splice(n,0,["enter",d,e],["exit",d,e]),n+=2)}n++}return t}const t3={42:ei,43:ei,45:ei,48:ei,49:ei,50:ei,51:ei,52:ei,53:ei,54:ei,55:ei,56:ei,57:ei,62:fM},n3={91:oN},i3={[-2]:gp,[-1]:gp,32:gp},r3={35:dN,42:wf,45:[vS,wf],60:gN,61:vS,95:wf,96:mS,126:mS},s3={38:hM,92:dM},o3={[-5]:vp,[-4]:vp,[-3]:vp,33:kN,38:hM,42:km,60:[Uk,wN],91:UN,92:[cN,dM],93:Mv,95:km,96:Yk},a3={null:[km,ZN]},l3={null:[42,95]},u3={null:[]},c3=Object.freeze(Object.defineProperty({__proto__:null,attentionMarkers:l3,contentInitial:n3,disable:u3,document:t3,flow:r3,flowInitial:i3,insideSpan:a3,string:s3,text:o3},Symbol.toStringTag,{value:"Module"}));function f3(t,e,n){let i={_bufferIndex:-1,_index:0,line:n&&n.line||1,column:n&&n.column||1,offset:n&&n.offset||0};const s={},a=[];let l=[],u=[];const f={attempt:k(N),check:k(b),consume:M,enter:T,exit:C,interrupt:k(b,{interrupt:!0})},d={code:null,containerState:{},defineSkip:w,events:[],now:E,parser:t,previous:null,sliceSerialize:g,sliceStream:v,write:m};let h=e.tokenize.call(d,f);return e.resolveAll&&a.push(e),d;function m(O){return l=Ci(l,O),_(),l[l.length-1]!==null?[]:(B(e,0),d.events=wv(a,d.events,d),d.events)}function g(O,Z){return h3(v(O),Z)}function v(O){return d3(l,O)}function E(){const{_bufferIndex:O,_index:Z,line:X,column:J,offset:ne}=i;return{_bufferIndex:O,_index:Z,line:X,column:J,offset:ne}}function w(O){s[O.line]=O.column,R()}function _(){let O;for(;i._index<l.length;){const Z=l[i._index];if(typeof Z=="string")for(O=i._index,i._bufferIndex<0&&(i._bufferIndex=0);i._index===O&&i._bufferIndex<Z.length;)y(Z.charCodeAt(i._bufferIndex));else y(Z)}}function y(O){h=h(O)}function M(O){ft(O)?(i.line++,i.column=1,i.offset+=O===-3?2:1,R()):O!==-1&&(i.column++,i.offset++),i._bufferIndex<0?i._index++:(i._bufferIndex++,i._bufferIndex===l[i._index].length&&(i._bufferIndex=-1,i._index++)),d.previous=O}function T(O,Z){const X=Z||{};return X.type=O,X.start=E(),d.events.push(["enter",X,d]),u.push(X),X}function C(O){const Z=u.pop();return Z.end=E(),d.events.push(["exit",Z,d]),Z}function N(O,Z){B(O,Z.from)}function b(O,Z){Z.restore()}function k(O,Z){return X;function X(J,ne,le){let re,G,ue,D;return Array.isArray(J)?ie(J):"tokenize"in J?ie([J]):V(J);function V(ye){return Se;function Se(Re){const Le=Re!==null&&ye[Re],$e=Re!==null&&ye.null,St=[...Array.isArray(Le)?Le:Le?[Le]:[],...Array.isArray($e)?$e:$e?[$e]:[]];return ie(St)(Re)}}function ie(ye){return re=ye,G=0,ye.length===0?le:U(ye[G])}function U(ye){return Se;function Se(Re){return D=L(),ue=ye,ye.partial||(d.currentConstruct=ye),ye.name&&d.parser.constructs.disable.null.includes(ye.name)?ge():ye.tokenize.call(Z?Object.assign(Object.create(d),Z):d,f,ee,ge)(Re)}}function ee(ye){return O(ue,D),ne}function ge(ye){return D.restore(),++G<re.length?U(re[G]):le}}}function B(O,Z){O.resolveAll&&!a.includes(O)&&a.push(O),O.resolve&&ar(d.events,Z,d.events.length-Z,O.resolve(d.events.slice(Z),d)),O.resolveTo&&(d.events=O.resolveTo(d.events,d))}function L(){const O=E(),Z=d.previous,X=d.currentConstruct,J=d.events.length,ne=Array.from(u);return{from:J,restore:le};function le(){i=O,d.previous=Z,d.currentConstruct=X,d.events.length=J,u=ne,R()}}function R(){i.line in s&&i.column<2&&(i.column=s[i.line],i.offset+=s[i.line]-1)}}function d3(t,e){const n=e.start._index,i=e.start._bufferIndex,s=e.end._index,a=e.end._bufferIndex;let l;if(n===s)l=[t[n].slice(i,a)];else{if(l=t.slice(n,s),i>-1){const u=l[0];typeof u=="string"?l[0]=u.slice(i):l.shift()}a>0&&l.push(t[s].slice(0,a))}return l}function h3(t,e){let n=-1;const i=[];let s;for(;++n<t.length;){const a=t[n];let l;if(typeof a=="string")l=a;else switch(a){case-5:{l="\r";break}case-4:{l=`
`;break}case-3:{l=`\r
`;break}case-2:{l=e?" ":"	";break}case-1:{if(!e&&s)continue;l=" ";break}default:l=String.fromCharCode(a)}s=a===-2,i.push(l)}return i.join("")}function p3(t){const i={constructs:Sk([c3,...(t||{}).extensions||[]]),content:s(Rk),defined:[],document:s(Dk),flow:s(YN),lazy:{},string:s(QN),text:s(JN)};return i;function s(a){return l;function l(u){return f3(i,a,u)}}}function m3(t){for(;!pM(t););return t}const yS=/[\0\t\n\r]/g;function g3(){let t=1,e="",n=!0,i;return s;function s(a,l,u){const f=[];let d,h,m,g,v;for(a=e+(typeof a=="string"?a.toString():new TextDecoder(l||void 0).decode(a)),m=0,e="",n&&(a.charCodeAt(0)===65279&&m++,n=void 0);m<a.length;){if(yS.lastIndex=m,d=yS.exec(a),g=d&&d.index!==void 0?d.index:a.length,v=a.charCodeAt(g),!d){e=a.slice(m);break}if(v===10&&m===g&&i)f.push(-3),i=void 0;else switch(i&&(f.push(-5),i=void 0),m<g&&(f.push(a.slice(m,g)),t+=g-m),v){case 0:{f.push(65533),t++;break}case 9:{for(h=Math.ceil(t/4)*4,f.push(-2);t++<h;)f.push(-1);break}case 10:{f.push(-4),t=1;break}default:i=!0,t=1}m=g+1}return u&&(i&&f.push(-5),e&&f.push(e),f.push(null)),f}}const v3=/\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;function y3(t){return t.replace(v3,x3)}function x3(t,e,n){if(e)return e;if(n.charCodeAt(0)===35){const s=n.charCodeAt(1),a=s===120||s===88;return cM(n.slice(a?2:1),a?16:10)}return Ev(n)||t}const _M={}.hasOwnProperty;function _3(t,e,n){return typeof e!="string"&&(n=e,e=void 0),S3(n)(m3(p3(n).document().write(g3()(t,e,!0))))}function S3(t){const e={transforms:[],canContainEols:["emphasis","fragment","heading","paragraph","strong"],enter:{autolink:a(Rt),autolinkProtocol:L,autolinkEmail:L,atxHeading:a(xn),blockQuote:a($e),characterEscape:L,characterReference:L,codeFenced:a(St),codeFencedFenceInfo:l,codeFencedFenceMeta:l,codeIndented:a(St,l),codeText:a(at,l),codeTextData:L,data:L,codeFlowValue:L,definition:a(Ft),definitionDestinationString:l,definitionLabelString:l,definitionTitleString:l,emphasis:a(j),hardBreakEscape:a(vt),hardBreakTrailing:a(vt),htmlFlow:a(mt,l),htmlFlowData:L,htmlText:a(mt,l),htmlTextData:L,image:a(Qe),label:l,link:a(Rt),listItem:a(F),listItemValue:g,listOrdered:a(qe,m),listUnordered:a(qe),paragraph:a(P),reference:U,referenceString:l,resourceDestinationString:l,resourceTitleString:l,setextHeading:a(xn),strong:a(oe),thematicBreak:a(we)},exit:{atxHeading:f(),atxHeadingSequence:N,autolink:f(),autolinkEmail:Le,autolinkProtocol:Re,blockQuote:f(),characterEscapeValue:R,characterReferenceMarkerHexadecimal:ge,characterReferenceMarkerNumeric:ge,characterReferenceValue:ye,characterReference:Se,codeFenced:f(_),codeFencedFence:w,codeFencedFenceInfo:v,codeFencedFenceMeta:E,codeFlowValue:R,codeIndented:f(y),codeText:f(ne),codeTextData:R,data:R,definition:f(),definitionDestinationString:C,definitionLabelString:M,definitionTitleString:T,emphasis:f(),hardBreakEscape:f(Z),hardBreakTrailing:f(Z),htmlFlow:f(X),htmlFlowData:R,htmlText:f(J),htmlTextData:R,image:f(re),label:ue,labelText:G,lineEnding:O,link:f(le),listItem:f(),listOrdered:f(),listUnordered:f(),paragraph:f(),referenceString:ee,resourceDestinationString:D,resourceTitleString:V,resource:ie,setextHeading:f(B),setextHeadingLineSequence:k,setextHeadingText:b,strong:f(),thematicBreak:f()}};SM(e,(t||{}).mdastExtensions||[]);const n={};return i;function i(H){let de={type:"root",children:[]};const ve={stack:[de],tokenStack:[],config:e,enter:u,exit:d,buffer:l,resume:h,data:n},Me=[];let Ge=-1;for(;++Ge<H.length;)if(H[Ge][1].type==="listOrdered"||H[Ge][1].type==="listUnordered")if(H[Ge][0]==="enter")Me.push(Ge);else{const Ee=Me.pop();Ge=s(H,Ee,Ge)}for(Ge=-1;++Ge<H.length;){const Ee=e[H[Ge][0]];_M.call(Ee,H[Ge][1].type)&&Ee[H[Ge][1].type].call(Object.assign({sliceSerialize:H[Ge][2].sliceSerialize},ve),H[Ge][1])}if(ve.tokenStack.length>0){const Ee=ve.tokenStack[ve.tokenStack.length-1];(Ee[1]||xS).call(ve,void 0,Ee[0])}for(de.position={start:ls(H.length>0?H[0][1].start:{line:1,column:1,offset:0}),end:ls(H.length>0?H[H.length-2][1].end:{line:1,column:1,offset:0})},Ge=-1;++Ge<e.transforms.length;)de=e.transforms[Ge](de)||de;return de}function s(H,de,ve){let Me=de-1,Ge=-1,Ee=!1,Ue,Ye,et,Be;for(;++Me<=ve;){const nt=H[Me];switch(nt[1].type){case"listUnordered":case"listOrdered":case"blockQuote":{nt[0]==="enter"?Ge++:Ge--,Be=void 0;break}case"lineEndingBlank":{nt[0]==="enter"&&(Ue&&!Be&&!Ge&&!et&&(et=Me),Be=void 0);break}case"linePrefix":case"listItemValue":case"listItemMarker":case"listItemPrefix":case"listItemPrefixWhitespace":break;default:Be=void 0}if(!Ge&&nt[0]==="enter"&&nt[1].type==="listItemPrefix"||Ge===-1&&nt[0]==="exit"&&(nt[1].type==="listUnordered"||nt[1].type==="listOrdered")){if(Ue){let st=Me;for(Ye=void 0;st--;){const yt=H[st];if(yt[1].type==="lineEnding"||yt[1].type==="lineEndingBlank"){if(yt[0]==="exit")continue;Ye&&(H[Ye][1].type="lineEndingBlank",Ee=!0),yt[1].type="lineEnding",Ye=st}else if(!(yt[1].type==="linePrefix"||yt[1].type==="blockQuotePrefix"||yt[1].type==="blockQuotePrefixWhitespace"||yt[1].type==="blockQuoteMarker"||yt[1].type==="listItemIndent"))break}et&&(!Ye||et<Ye)&&(Ue._spread=!0),Ue.end=Object.assign({},Ye?H[Ye][1].start:nt[1].end),H.splice(Ye||Me,0,["exit",Ue,nt[2]]),Me++,ve++}if(nt[1].type==="listItemPrefix"){const st={type:"listItem",_spread:!1,start:Object.assign({},nt[1].start),end:void 0};Ue=st,H.splice(Me,0,["enter",st,nt[2]]),Me++,ve++,et=void 0,Be=!0}}}return H[de][1]._spread=Ee,ve}function a(H,de){return ve;function ve(Me){u.call(this,H(Me),Me),de&&de.call(this,Me)}}function l(){this.stack.push({type:"fragment",children:[]})}function u(H,de,ve){this.stack[this.stack.length-1].children.push(H),this.stack.push(H),this.tokenStack.push([de,ve||void 0]),H.position={start:ls(de.start),end:void 0}}function f(H){return de;function de(ve){H&&H.call(this,ve),d.call(this,ve)}}function d(H,de){const ve=this.stack.pop(),Me=this.tokenStack.pop();if(Me)Me[0].type!==H.type&&(de?de.call(this,H,Me[0]):(Me[1]||xS).call(this,H,Me[0]));else throw new Error("Cannot close `"+H.type+"` ("+zl({start:H.start,end:H.end})+"): it’s not open");ve.position.end=ls(H.end)}function h(){return xk(this.stack.pop())}function m(){this.data.expectingFirstListItemValue=!0}function g(H){if(this.data.expectingFirstListItemValue){const de=this.stack[this.stack.length-2];de.start=Number.parseInt(this.sliceSerialize(H),10),this.data.expectingFirstListItemValue=void 0}}function v(){const H=this.resume(),de=this.stack[this.stack.length-1];de.lang=H}function E(){const H=this.resume(),de=this.stack[this.stack.length-1];de.meta=H}function w(){this.data.flowCodeInside||(this.buffer(),this.data.flowCodeInside=!0)}function _(){const H=this.resume(),de=this.stack[this.stack.length-1];de.value=H.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g,""),this.data.flowCodeInside=void 0}function y(){const H=this.resume(),de=this.stack[this.stack.length-1];de.value=H.replace(/(\r?\n|\r)$/g,"")}function M(H){const de=this.resume(),ve=this.stack[this.stack.length-1];ve.label=de,ve.identifier=fa(this.sliceSerialize(H)).toLowerCase()}function T(){const H=this.resume(),de=this.stack[this.stack.length-1];de.title=H}function C(){const H=this.resume(),de=this.stack[this.stack.length-1];de.url=H}function N(H){const de=this.stack[this.stack.length-1];if(!de.depth){const ve=this.sliceSerialize(H).length;de.depth=ve}}function b(){this.data.setextHeadingSlurpLineEnding=!0}function k(H){const de=this.stack[this.stack.length-1];de.depth=this.sliceSerialize(H).codePointAt(0)===61?1:2}function B(){this.data.setextHeadingSlurpLineEnding=void 0}function L(H){const ve=this.stack[this.stack.length-1].children;let Me=ve[ve.length-1];(!Me||Me.type!=="text")&&(Me=_e(),Me.position={start:ls(H.start),end:void 0},ve.push(Me)),this.stack.push(Me)}function R(H){const de=this.stack.pop();de.value+=this.sliceSerialize(H),de.position.end=ls(H.end)}function O(H){const de=this.stack[this.stack.length-1];if(this.data.atHardBreak){const ve=de.children[de.children.length-1];ve.position.end=ls(H.end),this.data.atHardBreak=void 0;return}!this.data.setextHeadingSlurpLineEnding&&e.canContainEols.includes(de.type)&&(L.call(this,H),R.call(this,H))}function Z(){this.data.atHardBreak=!0}function X(){const H=this.resume(),de=this.stack[this.stack.length-1];de.value=H}function J(){const H=this.resume(),de=this.stack[this.stack.length-1];de.value=H}function ne(){const H=this.resume(),de=this.stack[this.stack.length-1];de.value=H}function le(){const H=this.stack[this.stack.length-1];if(this.data.inReference){const de=this.data.referenceType||"shortcut";H.type+="Reference",H.referenceType=de,delete H.url,delete H.title}else delete H.identifier,delete H.label;this.data.referenceType=void 0}function re(){const H=this.stack[this.stack.length-1];if(this.data.inReference){const de=this.data.referenceType||"shortcut";H.type+="Reference",H.referenceType=de,delete H.url,delete H.title}else delete H.identifier,delete H.label;this.data.referenceType=void 0}function G(H){const de=this.sliceSerialize(H),ve=this.stack[this.stack.length-2];ve.label=y3(de),ve.identifier=fa(de).toLowerCase()}function ue(){const H=this.stack[this.stack.length-1],de=this.resume(),ve=this.stack[this.stack.length-1];if(this.data.inReference=!0,ve.type==="link"){const Me=H.children;ve.children=Me}else ve.alt=de}function D(){const H=this.resume(),de=this.stack[this.stack.length-1];de.url=H}function V(){const H=this.resume(),de=this.stack[this.stack.length-1];de.title=H}function ie(){this.data.inReference=void 0}function U(){this.data.referenceType="collapsed"}function ee(H){const de=this.resume(),ve=this.stack[this.stack.length-1];ve.label=de,ve.identifier=fa(this.sliceSerialize(H)).toLowerCase(),this.data.referenceType="full"}function ge(H){this.data.characterReferenceType=H.type}function ye(H){const de=this.sliceSerialize(H),ve=this.data.characterReferenceType;let Me;ve?(Me=cM(de,ve==="characterReferenceMarkerNumeric"?10:16),this.data.characterReferenceType=void 0):Me=Ev(de);const Ge=this.stack[this.stack.length-1];Ge.value+=Me}function Se(H){const de=this.stack.pop();de.position.end=ls(H.end)}function Re(H){R.call(this,H);const de=this.stack[this.stack.length-1];de.url=this.sliceSerialize(H)}function Le(H){R.call(this,H);const de=this.stack[this.stack.length-1];de.url="mailto:"+this.sliceSerialize(H)}function $e(){return{type:"blockquote",children:[]}}function St(){return{type:"code",lang:null,meta:null,value:""}}function at(){return{type:"inlineCode",value:""}}function Ft(){return{type:"definition",identifier:"",label:null,title:null,url:""}}function j(){return{type:"emphasis",children:[]}}function xn(){return{type:"heading",depth:0,children:[]}}function vt(){return{type:"break"}}function mt(){return{type:"html",value:""}}function Qe(){return{type:"image",title:null,url:"",alt:null}}function Rt(){return{type:"link",title:null,url:"",children:[]}}function qe(H){return{type:"list",ordered:H.type==="listOrdered",start:null,spread:H._spread,children:[]}}function F(H){return{type:"listItem",spread:H._spread,checked:null,children:[]}}function P(){return{type:"paragraph",children:[]}}function oe(){return{type:"strong",children:[]}}function _e(){return{type:"text",value:""}}function we(){return{type:"thematicBreak"}}}function ls(t){return{line:t.line,column:t.column,offset:t.offset}}function SM(t,e){let n=-1;for(;++n<e.length;){const i=e[n];Array.isArray(i)?SM(t,i):E3(t,i)}}function E3(t,e){let n;for(n in e)if(_M.call(e,n))switch(n){case"canContainEols":{const i=e[n];i&&t[n].push(...i);break}case"transforms":{const i=e[n];i&&t[n].push(...i);break}case"enter":case"exit":{const i=e[n];i&&Object.assign(t[n],i);break}}}function xS(t,e){throw t?new Error("Cannot close `"+t.type+"` ("+zl({start:t.start,end:t.end})+"): a different token (`"+e.type+"`, "+zl({start:e.start,end:e.end})+") is open"):new Error("Cannot close document, a token (`"+e.type+"`, "+zl({start:e.start,end:e.end})+") is still open")}function w3(t){const e=this;e.parser=n;function n(i){return _3(i,{...e.data("settings"),...t,extensions:e.data("micromarkExtensions")||[],mdastExtensions:e.data("fromMarkdownExtensions")||[]})}}function M3(t,e){const n={type:"element",tagName:"blockquote",properties:{},children:t.wrap(t.all(e),!0)};return t.patch(e,n),t.applyData(e,n)}function T3(t,e){const n={type:"element",tagName:"br",properties:{},children:[]};return t.patch(e,n),[t.applyData(e,n),{type:"text",value:`
`}]}function A3(t,e){const n=e.value?e.value+`
`:"",i={};e.lang&&(i.className=["language-"+e.lang]);let s={type:"element",tagName:"code",properties:i,children:[{type:"text",value:n}]};return e.meta&&(s.data={meta:e.meta}),t.patch(e,s),s=t.applyData(e,s),s={type:"element",tagName:"pre",properties:{},children:[s]},t.patch(e,s),s}function C3(t,e){const n={type:"element",tagName:"del",properties:{},children:t.all(e)};return t.patch(e,n),t.applyData(e,n)}function b3(t,e){const n={type:"element",tagName:"em",properties:{},children:t.all(e)};return t.patch(e,n),t.applyData(e,n)}function R3(t,e){const n=typeof t.options.clobberPrefix=="string"?t.options.clobberPrefix:"user-content-",i=String(e.identifier).toUpperCase(),s=Oa(i.toLowerCase()),a=t.footnoteOrder.indexOf(i);let l,u=t.footnoteCounts.get(i);u===void 0?(u=0,t.footnoteOrder.push(i),l=t.footnoteOrder.length):l=a+1,u+=1,t.footnoteCounts.set(i,u);const f={type:"element",tagName:"a",properties:{href:"#"+n+"fn-"+s,id:n+"fnref-"+s+(u>1?"-"+u:""),dataFootnoteRef:!0,ariaDescribedBy:["footnote-label"]},children:[{type:"text",value:String(l)}]};t.patch(e,f);const d={type:"element",tagName:"sup",properties:{},children:[f]};return t.patch(e,d),t.applyData(e,d)}function P3(t,e){const n={type:"element",tagName:"h"+e.depth,properties:{},children:t.all(e)};return t.patch(e,n),t.applyData(e,n)}function D3(t,e){if(t.options.allowDangerousHtml){const n={type:"raw",value:e.value};return t.patch(e,n),t.applyData(e,n)}}function EM(t,e){const n=e.referenceType;let i="]";if(n==="collapsed"?i+="[]":n==="full"&&(i+="["+(e.label||e.identifier)+"]"),e.type==="imageReference")return[{type:"text",value:"!["+e.alt+i}];const s=t.all(e),a=s[0];a&&a.type==="text"?a.value="["+a.value:s.unshift({type:"text",value:"["});const l=s[s.length-1];return l&&l.type==="text"?l.value+=i:s.push({type:"text",value:i}),s}function L3(t,e){const n=String(e.identifier).toUpperCase(),i=t.definitionById.get(n);if(!i)return EM(t,e);const s={src:Oa(i.url||""),alt:e.alt};i.title!==null&&i.title!==void 0&&(s.title=i.title);const a={type:"element",tagName:"img",properties:s,children:[]};return t.patch(e,a),t.applyData(e,a)}function I3(t,e){const n={src:Oa(e.url)};e.alt!==null&&e.alt!==void 0&&(n.alt=e.alt),e.title!==null&&e.title!==void 0&&(n.title=e.title);const i={type:"element",tagName:"img",properties:n,children:[]};return t.patch(e,i),t.applyData(e,i)}function k3(t,e){const n={type:"text",value:e.value.replace(/\r?\n|\r/g," ")};t.patch(e,n);const i={type:"element",tagName:"code",properties:{},children:[n]};return t.patch(e,i),t.applyData(e,i)}function N3(t,e){const n=String(e.identifier).toUpperCase(),i=t.definitionById.get(n);if(!i)return EM(t,e);const s={href:Oa(i.url||"")};i.title!==null&&i.title!==void 0&&(s.title=i.title);const a={type:"element",tagName:"a",properties:s,children:t.all(e)};return t.patch(e,a),t.applyData(e,a)}function U3(t,e){const n={href:Oa(e.url)};e.title!==null&&e.title!==void 0&&(n.title=e.title);const i={type:"element",tagName:"a",properties:n,children:t.all(e)};return t.patch(e,i),t.applyData(e,i)}function F3(t,e,n){const i=t.all(e),s=n?O3(n):wM(e),a={},l=[];if(typeof e.checked=="boolean"){const h=i[0];let m;h&&h.type==="element"&&h.tagName==="p"?m=h:(m={type:"element",tagName:"p",properties:{},children:[]},i.unshift(m)),m.children.length>0&&m.children.unshift({type:"text",value:" "}),m.children.unshift({type:"element",tagName:"input",properties:{type:"checkbox",checked:e.checked,disabled:!0},children:[]}),a.className=["task-list-item"]}let u=-1;for(;++u<i.length;){const h=i[u];(s||u!==0||h.type!=="element"||h.tagName!=="p")&&l.push({type:"text",value:`
`}),h.type==="element"&&h.tagName==="p"&&!s?l.push(...h.children):l.push(h)}const f=i[i.length-1];f&&(s||f.type!=="element"||f.tagName!=="p")&&l.push({type:"text",value:`
`});const d={type:"element",tagName:"li",properties:a,children:l};return t.patch(e,d),t.applyData(e,d)}function O3(t){let e=!1;if(t.type==="list"){e=t.spread||!1;const n=t.children;let i=-1;for(;!e&&++i<n.length;)e=wM(n[i])}return e}function wM(t){const e=t.spread;return e??t.children.length>1}function B3(t,e){const n={},i=t.all(e);let s=-1;for(typeof e.start=="number"&&e.start!==1&&(n.start=e.start);++s<i.length;){const l=i[s];if(l.type==="element"&&l.tagName==="li"&&l.properties&&Array.isArray(l.properties.className)&&l.properties.className.includes("task-list-item")){n.className=["contains-task-list"];break}}const a={type:"element",tagName:e.ordered?"ol":"ul",properties:n,children:t.wrap(i,!0)};return t.patch(e,a),t.applyData(e,a)}function z3(t,e){const n={type:"element",tagName:"p",properties:{},children:t.all(e)};return t.patch(e,n),t.applyData(e,n)}function V3(t,e){const n={type:"root",children:t.wrap(t.all(e))};return t.patch(e,n),t.applyData(e,n)}function H3(t,e){const n={type:"element",tagName:"strong",properties:{},children:t.all(e)};return t.patch(e,n),t.applyData(e,n)}function G3(t,e){const n=t.all(e),i=n.shift(),s=[];if(i){const l={type:"element",tagName:"thead",properties:{},children:t.wrap([i],!0)};t.patch(e.children[0],l),s.push(l)}if(n.length>0){const l={type:"element",tagName:"tbody",properties:{},children:t.wrap(n,!0)},u=yv(e.children[1]),f=iM(e.children[e.children.length-1]);u&&f&&(l.position={start:u,end:f}),s.push(l)}const a={type:"element",tagName:"table",properties:{},children:t.wrap(s,!0)};return t.patch(e,a),t.applyData(e,a)}function W3(t,e,n){const i=n?n.children:void 0,a=(i?i.indexOf(e):1)===0?"th":"td",l=n&&n.type==="table"?n.align:void 0,u=l?l.length:e.children.length;let f=-1;const d=[];for(;++f<u;){const m=e.children[f],g={},v=l?l[f]:void 0;v&&(g.align=v);let E={type:"element",tagName:a,properties:g,children:[]};m&&(E.children=t.all(m),t.patch(m,E),E=t.applyData(m,E)),d.push(E)}const h={type:"element",tagName:"tr",properties:{},children:t.wrap(d,!0)};return t.patch(e,h),t.applyData(e,h)}function j3(t,e){const n={type:"element",tagName:"td",properties:{},children:t.all(e)};return t.patch(e,n),t.applyData(e,n)}const _S=9,SS=32;function X3(t){const e=String(t),n=/\r?\n|\r/g;let i=n.exec(e),s=0;const a=[];for(;i;)a.push(ES(e.slice(s,i.index),s>0,!0),i[0]),s=i.index+i[0].length,i=n.exec(e);return a.push(ES(e.slice(s),s>0,!1)),a.join("")}function ES(t,e,n){let i=0,s=t.length;if(e){let a=t.codePointAt(i);for(;a===_S||a===SS;)i++,a=t.codePointAt(i)}if(n){let a=t.codePointAt(s-1);for(;a===_S||a===SS;)s--,a=t.codePointAt(s-1)}return s>i?t.slice(i,s):""}function $3(t,e){const n={type:"text",value:X3(String(e.value))};return t.patch(e,n),t.applyData(e,n)}function q3(t,e){const n={type:"element",tagName:"hr",properties:{},children:[]};return t.patch(e,n),t.applyData(e,n)}const Y3={blockquote:M3,break:T3,code:A3,delete:C3,emphasis:b3,footnoteReference:R3,heading:P3,html:D3,imageReference:L3,image:I3,inlineCode:k3,linkReference:N3,link:U3,listItem:F3,list:B3,paragraph:z3,root:V3,strong:H3,table:G3,tableCell:j3,tableRow:W3,text:$3,thematicBreak:q3,toml:Dc,yaml:Dc,definition:Dc,footnoteDefinition:Dc};function Dc(){}const MM=-1,ld=0,Hl=1,Vf=2,Tv=3,Av=4,Cv=5,bv=6,TM=7,AM=8,wS=typeof self=="object"?self:globalThis,K3=(t,e)=>{const n=(s,a)=>(t.set(a,s),s),i=s=>{if(t.has(s))return t.get(s);const[a,l]=e[s];switch(a){case ld:case MM:return n(l,s);case Hl:{const u=n([],s);for(const f of l)u.push(i(f));return u}case Vf:{const u=n({},s);for(const[f,d]of l)u[i(f)]=i(d);return u}case Tv:return n(new Date(l),s);case Av:{const{source:u,flags:f}=l;return n(new RegExp(u,f),s)}case Cv:{const u=n(new Map,s);for(const[f,d]of l)u.set(i(f),i(d));return u}case bv:{const u=n(new Set,s);for(const f of l)u.add(i(f));return u}case TM:{const{name:u,message:f}=l;return n(new wS[u](f),s)}case AM:return n(BigInt(l),s);case"BigInt":return n(Object(BigInt(l)),s);case"ArrayBuffer":return n(new Uint8Array(l).buffer,l);case"DataView":{const{buffer:u}=new Uint8Array(l);return n(new DataView(u),l)}}return n(new wS[a](l),s)};return i},MS=t=>K3(new Map,t)(0),Vo="",{toString:Z3}={},{keys:Q3}=Object,Ml=t=>{const e=typeof t;if(e!=="object"||!t)return[ld,e];const n=Z3.call(t).slice(8,-1);switch(n){case"Array":return[Hl,Vo];case"Object":return[Vf,Vo];case"Date":return[Tv,Vo];case"RegExp":return[Av,Vo];case"Map":return[Cv,Vo];case"Set":return[bv,Vo];case"DataView":return[Hl,n]}return n.includes("Array")?[Hl,n]:n.includes("Error")?[TM,n]:[Vf,n]},Lc=([t,e])=>t===ld&&(e==="function"||e==="symbol"),J3=(t,e,n,i)=>{const s=(l,u)=>{const f=i.push(l)-1;return n.set(u,f),f},a=l=>{if(n.has(l))return n.get(l);let[u,f]=Ml(l);switch(u){case ld:{let h=l;switch(f){case"bigint":u=AM,h=l.toString();break;case"function":case"symbol":if(t)throw new TypeError("unable to serialize "+f);h=null;break;case"undefined":return s([MM],l)}return s([u,h],l)}case Hl:{if(f){let g=l;return f==="DataView"?g=new Uint8Array(l.buffer):f==="ArrayBuffer"&&(g=new Uint8Array(l)),s([f,[...g]],l)}const h=[],m=s([u,h],l);for(const g of l)h.push(a(g));return m}case Vf:{if(f)switch(f){case"BigInt":return s([f,l.toString()],l);case"Boolean":case"Number":case"String":return s([f,l.valueOf()],l)}if(e&&"toJSON"in l)return a(l.toJSON());const h=[],m=s([u,h],l);for(const g of Q3(l))(t||!Lc(Ml(l[g])))&&h.push([a(g),a(l[g])]);return m}case Tv:return s([u,l.toISOString()],l);case Av:{const{source:h,flags:m}=l;return s([u,{source:h,flags:m}],l)}case Cv:{const h=[],m=s([u,h],l);for(const[g,v]of l)(t||!(Lc(Ml(g))||Lc(Ml(v))))&&h.push([a(g),a(v)]);return m}case bv:{const h=[],m=s([u,h],l);for(const g of l)(t||!Lc(Ml(g)))&&h.push(a(g));return m}}const{message:d}=l;return s([u,{name:f,message:d}],l)};return a},TS=(t,{json:e,lossy:n}={})=>{const i=[];return J3(!(e||n),!!e,new Map,i)(t),i},Hf=typeof structuredClone=="function"?(t,e)=>e&&("json"in e||"lossy"in e)?MS(TS(t,e)):structuredClone(t):(t,e)=>MS(TS(t,e));function eU(t,e){const n=[{type:"text",value:"↩"}];return e>1&&n.push({type:"element",tagName:"sup",properties:{},children:[{type:"text",value:String(e)}]}),n}function tU(t,e){return"Back to reference "+(t+1)+(e>1?"-"+e:"")}function nU(t){const e=typeof t.options.clobberPrefix=="string"?t.options.clobberPrefix:"user-content-",n=t.options.footnoteBackContent||eU,i=t.options.footnoteBackLabel||tU,s=t.options.footnoteLabel||"Footnotes",a=t.options.footnoteLabelTagName||"h2",l=t.options.footnoteLabelProperties||{className:["sr-only"]},u=[];let f=-1;for(;++f<t.footnoteOrder.length;){const d=t.footnoteById.get(t.footnoteOrder[f]);if(!d)continue;const h=t.all(d),m=String(d.identifier).toUpperCase(),g=Oa(m.toLowerCase());let v=0;const E=[],w=t.footnoteCounts.get(m);for(;w!==void 0&&++v<=w;){E.length>0&&E.push({type:"text",value:" "});let M=typeof n=="string"?n:n(f,v);typeof M=="string"&&(M={type:"text",value:M}),E.push({type:"element",tagName:"a",properties:{href:"#"+e+"fnref-"+g+(v>1?"-"+v:""),dataFootnoteBackref:"",ariaLabel:typeof i=="string"?i:i(f,v),className:["data-footnote-backref"]},children:Array.isArray(M)?M:[M]})}const _=h[h.length-1];if(_&&_.type==="element"&&_.tagName==="p"){const M=_.children[_.children.length-1];M&&M.type==="text"?M.value+=" ":_.children.push({type:"text",value:" "}),_.children.push(...E)}else h.push(...E);const y={type:"element",tagName:"li",properties:{id:e+"fn-"+g},children:t.wrap(h,!0)};t.patch(d,y),u.push(y)}if(u.length!==0)return{type:"element",tagName:"section",properties:{dataFootnotes:!0,className:["footnotes"]},children:[{type:"element",tagName:a,properties:{...Hf(l),id:"footnote-label"},children:[{type:"text",value:s}]},{type:"text",value:`
`},{type:"element",tagName:"ol",properties:{},children:t.wrap(u,!0)},{type:"text",value:`
`}]}}const CM=function(t){if(t==null)return oU;if(typeof t=="function")return ud(t);if(typeof t=="object")return Array.isArray(t)?iU(t):rU(t);if(typeof t=="string")return sU(t);throw new Error("Expected function, string, or object as test")};function iU(t){const e=[];let n=-1;for(;++n<t.length;)e[n]=CM(t[n]);return ud(i);function i(...s){let a=-1;for(;++a<e.length;)if(e[a].apply(this,s))return!0;return!1}}function rU(t){const e=t;return ud(n);function n(i){const s=i;let a;for(a in t)if(s[a]!==e[a])return!1;return!0}}function sU(t){return ud(e);function e(n){return n&&n.type===t}}function ud(t){return e;function e(n,i,s){return!!(aU(n)&&t.call(this,n,typeof i=="number"?i:void 0,s||void 0))}}function oU(){return!0}function aU(t){return t!==null&&typeof t=="object"&&"type"in t}const bM=[],lU=!0,AS=!1,uU="skip";function cU(t,e,n,i){let s;typeof e=="function"&&typeof n!="function"?(i=n,n=e):s=e;const a=CM(s),l=i?-1:1;u(t,void 0,[])();function u(f,d,h){const m=f&&typeof f=="object"?f:{};if(typeof m.type=="string"){const v=typeof m.tagName=="string"?m.tagName:typeof m.name=="string"?m.name:void 0;Object.defineProperty(g,"name",{value:"node ("+(f.type+(v?"<"+v+">":""))+")"})}return g;function g(){let v=bM,E,w,_;if((!e||a(f,d,h[h.length-1]||void 0))&&(v=fU(n(f,h)),v[0]===AS))return v;if("children"in f&&f.children){const y=f;if(y.children&&v[0]!==uU)for(w=(i?y.children.length:-1)+l,_=h.concat(y);w>-1&&w<y.children.length;){const M=y.children[w];if(E=u(M,w,_)(),E[0]===AS)return E;w=typeof E[1]=="number"?E[1]:w+l}}return v}}}function fU(t){return Array.isArray(t)?t:typeof t=="number"?[lU,t]:t==null?bM:[t]}function RM(t,e,n,i){let s,a,l;typeof e=="function"?(a=void 0,l=e,s=n):(a=e,l=n,s=i),cU(t,a,u,s);function u(f,d){const h=d[d.length-1],m=h?h.children.indexOf(f):void 0;return l(f,m,h)}}const Nm={}.hasOwnProperty,dU={};function hU(t,e){const n=e||dU,i=new Map,s=new Map,a=new Map,l={...Y3,...n.handlers},u={all:d,applyData:mU,definitionById:i,footnoteById:s,footnoteCounts:a,footnoteOrder:[],handlers:l,one:f,options:n,patch:pU,wrap:vU};return RM(t,function(h){if(h.type==="definition"||h.type==="footnoteDefinition"){const m=h.type==="definition"?i:s,g=String(h.identifier).toUpperCase();m.has(g)||m.set(g,h)}}),u;function f(h,m){const g=h.type,v=u.handlers[g];if(Nm.call(u.handlers,g)&&v)return v(u,h,m);if(u.options.passThrough&&u.options.passThrough.includes(g)){if("children"in h){const{children:w,..._}=h,y=Hf(_);return y.children=u.all(h),y}return Hf(h)}return(u.options.unknownHandler||gU)(u,h,m)}function d(h){const m=[];if("children"in h){const g=h.children;let v=-1;for(;++v<g.length;){const E=u.one(g[v],h);if(E){if(v&&g[v-1].type==="break"&&(!Array.isArray(E)&&E.type==="text"&&(E.value=CS(E.value)),!Array.isArray(E)&&E.type==="element")){const w=E.children[0];w&&w.type==="text"&&(w.value=CS(w.value))}Array.isArray(E)?m.push(...E):m.push(E)}}}return m}}function pU(t,e){t.position&&(e.position=YI(t))}function mU(t,e){let n=e;if(t&&t.data){const i=t.data.hName,s=t.data.hChildren,a=t.data.hProperties;if(typeof i=="string")if(n.type==="element")n.tagName=i;else{const l="children"in n?n.children:[n];n={type:"element",tagName:i,properties:{},children:l}}n.type==="element"&&a&&Object.assign(n.properties,Hf(a)),"children"in n&&n.children&&s!==null&&s!==void 0&&(n.children=s)}return n}function gU(t,e){const n=e.data||{},i="value"in e&&!(Nm.call(n,"hProperties")||Nm.call(n,"hChildren"))?{type:"text",value:e.value}:{type:"element",tagName:"div",properties:{},children:t.all(e)};return t.patch(e,i),t.applyData(e,i)}function vU(t,e){const n=[];let i=-1;for(e&&n.push({type:"text",value:`
`});++i<t.length;)i&&n.push({type:"text",value:`
`}),n.push(t[i]);return e&&t.length>0&&n.push({type:"text",value:`
`}),n}function CS(t){let e=0,n=t.charCodeAt(e);for(;n===9||n===32;)e++,n=t.charCodeAt(e);return t.slice(e)}function bS(t,e){const n=hU(t,e),i=n.one(t,void 0),s=nU(n),a=Array.isArray(i)?{type:"root",children:i}:i||{type:"root",children:[]};return s&&a.children.push({type:"text",value:`
`},s),a}function yU(t,e){return t&&"run"in t?async function(n,i){const s=bS(n,{file:i,...e});await t.run(s,i)}:function(n,i){return bS(n,{file:i,...t||e})}}function RS(t){if(t)throw t}var yp,PS;function xU(){if(PS)return yp;PS=1;var t=Object.prototype.hasOwnProperty,e=Object.prototype.toString,n=Object.defineProperty,i=Object.getOwnPropertyDescriptor,s=function(d){return typeof Array.isArray=="function"?Array.isArray(d):e.call(d)==="[object Array]"},a=function(d){if(!d||e.call(d)!=="[object Object]")return!1;var h=t.call(d,"constructor"),m=d.constructor&&d.constructor.prototype&&t.call(d.constructor.prototype,"isPrototypeOf");if(d.constructor&&!h&&!m)return!1;var g;for(g in d);return typeof g>"u"||t.call(d,g)},l=function(d,h){n&&h.name==="__proto__"?n(d,h.name,{enumerable:!0,configurable:!0,value:h.newValue,writable:!0}):d[h.name]=h.newValue},u=function(d,h){if(h==="__proto__")if(t.call(d,h)){if(i)return i(d,h).value}else return;return d[h]};return yp=function f(){var d,h,m,g,v,E,w=arguments[0],_=1,y=arguments.length,M=!1;for(typeof w=="boolean"&&(M=w,w=arguments[1]||{},_=2),(w==null||typeof w!="object"&&typeof w!="function")&&(w={});_<y;++_)if(d=arguments[_],d!=null)for(h in d)m=u(w,h),g=u(d,h),w!==g&&(M&&g&&(a(g)||(v=s(g)))?(v?(v=!1,E=m&&s(m)?m:[]):E=m&&a(m)?m:{},l(w,{name:h,newValue:f(M,E,g)})):typeof g<"u"&&l(w,{name:h,newValue:g}));return w},yp}var _U=xU();const xp=Xf(_U);function Um(t){if(typeof t!="object"||t===null)return!1;const e=Object.getPrototypeOf(t);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(Symbol.toStringTag in t)&&!(Symbol.iterator in t)}function SU(){const t=[],e={run:n,use:i};return e;function n(...s){let a=-1;const l=s.pop();if(typeof l!="function")throw new TypeError("Expected function as last argument, not "+l);u(null,...s);function u(f,...d){const h=t[++a];let m=-1;if(f){l(f);return}for(;++m<s.length;)(d[m]===null||d[m]===void 0)&&(d[m]=s[m]);s=d,h?EU(h,u)(...d):l(null,...d)}}function i(s){if(typeof s!="function")throw new TypeError("Expected `middelware` to be a function, not "+s);return t.push(s),e}}function EU(t,e){let n;return i;function i(...l){const u=t.length>l.length;let f;u&&l.push(s);try{f=t.apply(this,l)}catch(d){const h=d;if(u&&n)throw h;return s(h)}u||(f&&f.then&&typeof f.then=="function"?f.then(a,s):f instanceof Error?s(f):a(f))}function s(l,...u){n||(n=!0,e(l,...u))}function a(l){s(null,l)}}const Zi={basename:wU,dirname:MU,extname:TU,join:AU,sep:"/"};function wU(t,e){if(e!==void 0&&typeof e!="string")throw new TypeError('"ext" argument must be a string');uu(t);let n=0,i=-1,s=t.length,a;if(e===void 0||e.length===0||e.length>t.length){for(;s--;)if(t.codePointAt(s)===47){if(a){n=s+1;break}}else i<0&&(a=!0,i=s+1);return i<0?"":t.slice(n,i)}if(e===t)return"";let l=-1,u=e.length-1;for(;s--;)if(t.codePointAt(s)===47){if(a){n=s+1;break}}else l<0&&(a=!0,l=s+1),u>-1&&(t.codePointAt(s)===e.codePointAt(u--)?u<0&&(i=s):(u=-1,i=l));return n===i?i=l:i<0&&(i=t.length),t.slice(n,i)}function MU(t){if(uu(t),t.length===0)return".";let e=-1,n=t.length,i;for(;--n;)if(t.codePointAt(n)===47){if(i){e=n;break}}else i||(i=!0);return e<0?t.codePointAt(0)===47?"/":".":e===1&&t.codePointAt(0)===47?"//":t.slice(0,e)}function TU(t){uu(t);let e=t.length,n=-1,i=0,s=-1,a=0,l;for(;e--;){const u=t.codePointAt(e);if(u===47){if(l){i=e+1;break}continue}n<0&&(l=!0,n=e+1),u===46?s<0?s=e:a!==1&&(a=1):s>-1&&(a=-1)}return s<0||n<0||a===0||a===1&&s===n-1&&s===i+1?"":t.slice(s,n)}function AU(...t){let e=-1,n;for(;++e<t.length;)uu(t[e]),t[e]&&(n=n===void 0?t[e]:n+"/"+t[e]);return n===void 0?".":CU(n)}function CU(t){uu(t);const e=t.codePointAt(0)===47;let n=bU(t,!e);return n.length===0&&!e&&(n="."),n.length>0&&t.codePointAt(t.length-1)===47&&(n+="/"),e?"/"+n:n}function bU(t,e){let n="",i=0,s=-1,a=0,l=-1,u,f;for(;++l<=t.length;){if(l<t.length)u=t.codePointAt(l);else{if(u===47)break;u=47}if(u===47){if(!(s===l-1||a===1))if(s!==l-1&&a===2){if(n.length<2||i!==2||n.codePointAt(n.length-1)!==46||n.codePointAt(n.length-2)!==46){if(n.length>2){if(f=n.lastIndexOf("/"),f!==n.length-1){f<0?(n="",i=0):(n=n.slice(0,f),i=n.length-1-n.lastIndexOf("/")),s=l,a=0;continue}}else if(n.length>0){n="",i=0,s=l,a=0;continue}}e&&(n=n.length>0?n+"/..":"..",i=2)}else n.length>0?n+="/"+t.slice(s+1,l):n=t.slice(s+1,l),i=l-s-1;s=l,a=0}else u===46&&a>-1?a++:a=-1}return n}function uu(t){if(typeof t!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(t))}const RU={cwd:PU};function PU(){return"/"}function Fm(t){return!!(t!==null&&typeof t=="object"&&"href"in t&&t.href&&"protocol"in t&&t.protocol&&t.auth===void 0)}function DU(t){if(typeof t=="string")t=new URL(t);else if(!Fm(t)){const e=new TypeError('The "path" argument must be of type string or an instance of URL. Received `'+t+"`");throw e.code="ERR_INVALID_ARG_TYPE",e}if(t.protocol!=="file:"){const e=new TypeError("The URL must be of scheme file");throw e.code="ERR_INVALID_URL_SCHEME",e}return LU(t)}function LU(t){if(t.hostname!==""){const i=new TypeError('File URL host must be "localhost" or empty on darwin');throw i.code="ERR_INVALID_FILE_URL_HOST",i}const e=t.pathname;let n=-1;for(;++n<e.length;)if(e.codePointAt(n)===37&&e.codePointAt(n+1)===50){const i=e.codePointAt(n+2);if(i===70||i===102){const s=new TypeError("File URL path must not include encoded / characters");throw s.code="ERR_INVALID_FILE_URL_PATH",s}}return decodeURIComponent(e)}const _p=["history","path","basename","stem","extname","dirname"];class PM{constructor(e){let n;e?Fm(e)?n={path:e}:typeof e=="string"||IU(e)?n={value:e}:n=e:n={},this.cwd="cwd"in n?"":RU.cwd(),this.data={},this.history=[],this.messages=[],this.value,this.map,this.result,this.stored;let i=-1;for(;++i<_p.length;){const a=_p[i];a in n&&n[a]!==void 0&&n[a]!==null&&(this[a]=a==="history"?[...n[a]]:n[a])}let s;for(s in n)_p.includes(s)||(this[s]=n[s])}get basename(){return typeof this.path=="string"?Zi.basename(this.path):void 0}set basename(e){Ep(e,"basename"),Sp(e,"basename"),this.path=Zi.join(this.dirname||"",e)}get dirname(){return typeof this.path=="string"?Zi.dirname(this.path):void 0}set dirname(e){DS(this.basename,"dirname"),this.path=Zi.join(e||"",this.basename)}get extname(){return typeof this.path=="string"?Zi.extname(this.path):void 0}set extname(e){if(Sp(e,"extname"),DS(this.dirname,"extname"),e){if(e.codePointAt(0)!==46)throw new Error("`extname` must start with `.`");if(e.includes(".",1))throw new Error("`extname` cannot contain multiple dots")}this.path=Zi.join(this.dirname,this.stem+(e||""))}get path(){return this.history[this.history.length-1]}set path(e){Fm(e)&&(e=DU(e)),Ep(e,"path"),this.path!==e&&this.history.push(e)}get stem(){return typeof this.path=="string"?Zi.basename(this.path,this.extname):void 0}set stem(e){Ep(e,"stem"),Sp(e,"stem"),this.path=Zi.join(this.dirname||"",e+(this.extname||""))}fail(e,n,i){const s=this.message(e,n,i);throw s.fatal=!0,s}info(e,n,i){const s=this.message(e,n,i);return s.fatal=void 0,s}message(e,n,i){const s=new Bn(e,n,i);return this.path&&(s.name=this.path+":"+s.name,s.file=this.path),s.fatal=!1,this.messages.push(s),s}toString(e){return this.value===void 0?"":typeof this.value=="string"?this.value:new TextDecoder(e||void 0).decode(this.value)}}function Sp(t,e){if(t&&t.includes(Zi.sep))throw new Error("`"+e+"` cannot be a path: did not expect `"+Zi.sep+"`")}function Ep(t,e){if(!t)throw new Error("`"+e+"` cannot be empty")}function DS(t,e){if(!t)throw new Error("Setting `"+e+"` requires `path` to be set too")}function IU(t){return!!(t&&typeof t=="object"&&"byteLength"in t&&"byteOffset"in t)}const kU=function(t){const i=this.constructor.prototype,s=i[t],a=function(){return s.apply(a,arguments)};return Object.setPrototypeOf(a,i),a},NU={}.hasOwnProperty;class Rv extends kU{constructor(){super("copy"),this.Compiler=void 0,this.Parser=void 0,this.attachers=[],this.compiler=void 0,this.freezeIndex=-1,this.frozen=void 0,this.namespace={},this.parser=void 0,this.transformers=SU()}copy(){const e=new Rv;let n=-1;for(;++n<this.attachers.length;){const i=this.attachers[n];e.use(...i)}return e.data(xp(!0,{},this.namespace)),e}data(e,n){return typeof e=="string"?arguments.length===2?(Tp("data",this.frozen),this.namespace[e]=n,this):NU.call(this.namespace,e)&&this.namespace[e]||void 0:e?(Tp("data",this.frozen),this.namespace=e,this):this.namespace}freeze(){if(this.frozen)return this;const e=this;for(;++this.freezeIndex<this.attachers.length;){const[n,...i]=this.attachers[this.freezeIndex];if(i[0]===!1)continue;i[0]===!0&&(i[0]=void 0);const s=n.call(e,...i);typeof s=="function"&&this.transformers.use(s)}return this.frozen=!0,this.freezeIndex=Number.POSITIVE_INFINITY,this}parse(e){this.freeze();const n=Ic(e),i=this.parser||this.Parser;return wp("parse",i),i(String(n),n)}process(e,n){const i=this;return this.freeze(),wp("process",this.parser||this.Parser),Mp("process",this.compiler||this.Compiler),n?s(void 0,n):new Promise(s);function s(a,l){const u=Ic(e),f=i.parse(u);i.run(f,u,function(h,m,g){if(h||!m||!g)return d(h);const v=m,E=i.stringify(v,g);OU(E)?g.value=E:g.result=E,d(h,g)});function d(h,m){h||!m?l(h):a?a(m):n(void 0,m)}}}processSync(e){let n=!1,i;return this.freeze(),wp("processSync",this.parser||this.Parser),Mp("processSync",this.compiler||this.Compiler),this.process(e,s),IS("processSync","process",n),i;function s(a,l){n=!0,RS(a),i=l}}run(e,n,i){LS(e),this.freeze();const s=this.transformers;return!i&&typeof n=="function"&&(i=n,n=void 0),i?a(void 0,i):new Promise(a);function a(l,u){const f=Ic(n);s.run(e,f,d);function d(h,m,g){const v=m||e;h?u(h):l?l(v):i(void 0,v,g)}}}runSync(e,n){let i=!1,s;return this.run(e,n,a),IS("runSync","run",i),s;function a(l,u){RS(l),s=u,i=!0}}stringify(e,n){this.freeze();const i=Ic(n),s=this.compiler||this.Compiler;return Mp("stringify",s),LS(e),s(e,i)}use(e,...n){const i=this.attachers,s=this.namespace;if(Tp("use",this.frozen),e!=null)if(typeof e=="function")f(e,n);else if(typeof e=="object")Array.isArray(e)?u(e):l(e);else throw new TypeError("Expected usable value, not `"+e+"`");return this;function a(d){if(typeof d=="function")f(d,[]);else if(typeof d=="object")if(Array.isArray(d)){const[h,...m]=d;f(h,m)}else l(d);else throw new TypeError("Expected usable value, not `"+d+"`")}function l(d){if(!("plugins"in d)&&!("settings"in d))throw new Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");u(d.plugins),d.settings&&(s.settings=xp(!0,s.settings,d.settings))}function u(d){let h=-1;if(d!=null)if(Array.isArray(d))for(;++h<d.length;){const m=d[h];a(m)}else throw new TypeError("Expected a list of plugins, not `"+d+"`")}function f(d,h){let m=-1,g=-1;for(;++m<i.length;)if(i[m][0]===d){g=m;break}if(g===-1)i.push([d,...h]);else if(h.length>0){let[v,...E]=h;const w=i[g][1];Um(w)&&Um(v)&&(v=xp(!0,w,v)),i[g]=[d,v,...E]}}}}const UU=new Rv().freeze();function wp(t,e){if(typeof e!="function")throw new TypeError("Cannot `"+t+"` without `parser`")}function Mp(t,e){if(typeof e!="function")throw new TypeError("Cannot `"+t+"` without `compiler`")}function Tp(t,e){if(e)throw new Error("Cannot call `"+t+"` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.")}function LS(t){if(!Um(t)||typeof t.type!="string")throw new TypeError("Expected node, got `"+t+"`")}function IS(t,e,n){if(!n)throw new Error("`"+t+"` finished async. Use `"+e+"` instead")}function Ic(t){return FU(t)?t:new PM(t)}function FU(t){return!!(t&&typeof t=="object"&&"message"in t&&"messages"in t)}function OU(t){return typeof t=="string"||BU(t)}function BU(t){return!!(t&&typeof t=="object"&&"byteLength"in t&&"byteOffset"in t)}const zU="https://github.com/remarkjs/react-markdown/blob/main/changelog.md",kS=[],NS={allowDangerousHtml:!0},VU=/^(https?|ircs?|mailto|xmpp)$/i,HU=[{from:"astPlugins",id:"remove-buggy-html-in-markdown-parser"},{from:"allowDangerousHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"allowNode",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowElement"},{from:"allowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowedElements"},{from:"disallowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"disallowedElements"},{from:"escapeHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"includeElementIndex",id:"#remove-includeelementindex"},{from:"includeNodeIndex",id:"change-includenodeindex-to-includeelementindex"},{from:"linkTarget",id:"remove-linktarget"},{from:"plugins",id:"change-plugins-to-remarkplugins",to:"remarkPlugins"},{from:"rawSourcePos",id:"#remove-rawsourcepos"},{from:"renderers",id:"change-renderers-to-components",to:"components"},{from:"source",id:"change-source-to-children",to:"children"},{from:"sourcePos",id:"#remove-sourcepos"},{from:"transformImageUri",id:"#add-urltransform",to:"urlTransform"},{from:"transformLinkUri",id:"#add-urltransform",to:"urlTransform"}];function cu(t){const e=t.allowedElements,n=t.allowElement,i=t.children||"",s=t.className,a=t.components,l=t.disallowedElements,u=t.rehypePlugins||kS,f=t.remarkPlugins||kS,d=t.remarkRehypeOptions?{...t.remarkRehypeOptions,...NS}:NS,h=t.skipHtml,m=t.unwrapDisallowed,g=t.urlTransform||GU,v=UU().use(w3).use(f).use(yU,d).use(u),E=new PM;typeof i=="string"&&(E.value=i);for(const M of HU)Object.hasOwn(t,M.from)&&(""+M.from+(M.to?"use `"+M.to+"` instead":"remove it")+zU+M.id,void 0);const w=v.parse(E);let _=v.runSync(w,E);return s&&(_={type:"element",tagName:"div",properties:{className:s},children:_.type==="root"?_.children:[_]}),RM(_,y),tk(_,{Fragment:he.Fragment,components:a,ignoreInvalidStyle:!0,jsx:he.jsx,jsxs:he.jsxs,passKeys:!0,passNode:!0});function y(M,T,C){if(M.type==="raw"&&C&&typeof T=="number")return h?C.children.splice(T,1):C.children[T]={type:"text",value:M.value},T;if(M.type==="element"){let N;for(N in mp)if(Object.hasOwn(mp,N)&&Object.hasOwn(M.properties,N)){const b=M.properties[N],k=mp[N];(k===null||k.includes(M.tagName))&&(M.properties[N]=g(String(b||""),N,M))}}if(M.type==="element"){let N=e?!e.includes(M.tagName):l?l.includes(M.tagName):!1;if(!N&&n&&typeof T=="number"&&(N=!n(M,T,C)),N&&C&&typeof T=="number")return m&&M.children?C.children.splice(T,1,...M.children):C.children.splice(T,1),T}}}function GU(t){const e=t.indexOf(":"),n=t.indexOf("?"),i=t.indexOf("#"),s=t.indexOf("/");return e===-1||s!==-1&&e>s||n!==-1&&e>n||i!==-1&&e>i||VU.test(t.slice(0,e))?t:""}const WU=Ve.div`
  display: grid;
  grid-template-columns: 10% 92%;
  width: 100%;
  height: 100vh; 
`,jU=Ve.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  overflow-y: auto;
  margin-right: 20px;
  margin-top: 20px;
`,XU=Ve.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.16);
  overflow-y: auto; 
  padding: 0px;
  backdrop-filter: blur(10px); 
  -webkit-backdrop-filter: blur(10px); 
`,kc=Ve.h1`
  font-family: 'Work Sans', sans-serif;
  font-weight: 300;
  font-size: 18px;
  letter-spacing: 2px;
  transform-origin: 0 0;
  transform: translateX(15px);
  transition: transform 0.5s, color 0.3s ease-in-out;
  color: rgba(255, 255, 255, 0.7);

  &:hover {
    transform: scale(1.01);
    color: white;
  }
`,Nc=ka`
  0% {
    opacity: 0;
    transform: translateY(6px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`,$U=Ve.div`
  width: 100%;
  max-width: 1200px; 
  padding: 2rem;
  color: var(--paragraph-color);
  text-align: center;
  --heading-color: #ffffff; 
  --paragraph-color: #ffffff; 
  --accent-color: #ff8080;  
  --bg-highlight: rgba(255, 255, 255, 0.06); 
  --transition-speed: 0.3s; 
  --font-heading: 'Ade', sans-serif; 
  --font-body: 'Work Sans', sans-serif; 
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0,0,0,0.3);

  h1, 
  h2, 
  h3, 
  h4 {
    font-family: var(--font-heading);
    color: var(--heading-color);
    text-transform: Uppercase; 
    margin-top: 2rem;
    margin-bottom: 1.75rem;
    animation: ${Nc} 0.6s ease forwards;
    letter-spacing: 2px;
  }

  h1 {
    font-size: 2.4rem;
    line-height: 1.2;
    margin-top: 2rem;
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.6rem;
  }

  h4 {
    font-size: 1.4rem;
  }

  p {
    font-family: var(--font-body);
    font-size: 18px;
    line-height: 1.6;
    margin-bottom: 3rem;
    margin-right: 12rem;
    margin-left: 12rem;
    color: var(--paragraph-color);
    animation: ${Nc} 0.8s ease forwards;
  }

  a {
    color: var(--accent-color);
    text-decoration: none;
    position: relative;
    transition: color var(--transition-speed);

    &:hover {
      color: #ffffff;
    }
    &:after {
      content: "";
      position: absolute;
      bottom: -2px;
      left: 50%;
      width: 0;
      height: 2px;
      background-color: var(--accent-color);
      transition: all var(--transition-speed) ease;
    }

    &:hover:after {
      left: 0;
      width: 100%;
    }
  }

  ul, ol {
    text-align: left; 
    display: inline-block; 
    margin: 1rem auto;
    padding: 0 1rem;
    font-family: var(--font-body);
    animation: ${Nc} 1s ease forwards;
  }

  li {
    margin: .5rem 0;
    list-style-type: disc;
    line-height: 1.0;
  }

  img {
    display: block;
    width: 75%;
    height: auto;
    margin: 1.5rem auto;
    border-radius: 4px;
    transition: transform var(--transition-speed), box-shadow var(--transition-speed);

    box-shadow: 0 4px 15px rgba(0,0,0,0.2);

    &:hover {
      transform: scale(1.02);
      box-shadow: 0 8px 20px rgba(0,0,0,0.3);
    }
  }

  blockquote {
    margin: 2rem auto;
    padding: 1rem 2rem;
    max-width: 800px;
    background-color: var(--bg-highlight);
    border-left: 4px solid var(--accent-color);
    font-family: var(--font-body);
    font-size: 1rem;
    line-height: 1.6;
    color: #f5f5f5;
    box-shadow: inset 0 0 10px rgba(0,0,0,0.1);

    animation: ${Nc} 0.5s ease forwards;

    p {
      margin: 0.5rem 0;
    }
  }

  @media (max-width: 768px) {
    padding: 1rem;

    h1 {
      font-size: 1.8rem;
    }
    h2 {
      font-size: 1.6rem;
    }
    h3 {
      font-size: 1.4rem;
    }
    p {
      font-size: 16px;
    }
    img {
      width: 80%;
    }
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 1.6rem;
    }
    h2 {
      font-size: 1.4rem;
    }
    p {
      font-size: 15px;
    }
    li {
      font-size: 15px;
    }
  }
`,qU=()=>{const[t,e]=$.useState(""),n=zr(),i=()=>{n("/")};return $.useEffect(()=>{fetch("/src/components/Projectfiles/groveContent.md").then(s=>s.text()).then(s=>e(s)).catch(s=>console.error("Error fetching markdown file:",s))},[]),he.jsxs(WU,{children:[he.jsxs(jU,{children:[he.jsxs(kc,{onClick:i,children:["<","1/24/25",">"]}),he.jsx(kc,{children:"WORK"}),he.jsx(kc,{children:"IN"}),he.jsx(kc,{children:"PROGRESS"})]}),he.jsx(XU,{children:he.jsx($U,{children:he.jsx(cu,{children:t})})})]})},YU=Ve.div`
  display: grid;
  grid-template-columns: 10% 92%;
  width: 100%;
  height: 100vh; 
`,KU=Ve.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  overflow-y: auto;
  margin-right: 20px;
  margin-top: 20px;
`,ZU=Ve.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.16);
  overflow-y: auto; 
  padding: 0px;
  backdrop-filter: blur(10px); 
  -webkit-backdrop-filter: blur(10px); 
`,Uc=Ve.h1`
  font-family: 'Work Sans', sans-serif;
  font-weight: 300;
  font-size: 18px;
  letter-spacing: 2px;
  transform-origin: 0 0;
  transform: translateX(15px);
  transition: transform 0.5s, color 0.3s ease-in-out;
  color: rgba(255, 255, 255, 0.7);

  &:hover {
    transform: scale(1.01);
    color: white;
  }
`,Fc=ka`
  0% {
    opacity: 0;
    transform: translateY(6px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`,QU=Ve.div`
  width: 100%;
  max-width: 1200px; 
  padding: 2rem;
  color: var(--paragraph-color);
  text-align: center;
  --heading-color: #ffffff; 
  --paragraph-color: #ffffff; 
  --accent-color: #ff8080;  
  --bg-highlight: rgba(255, 255, 255, 0.06); 
  --transition-speed: 0.3s; 
  --font-heading: 'Ade', sans-serif; 
  --font-body: 'Work Sans', sans-serif; 
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0,0,0,0.3);

  h1, 
  h2, 
  h3, 
  h4 {
    font-family: var(--font-heading);
    color: var(--heading-color);
    text-transform: Uppercase; 
    margin-top: 2rem;
    margin-bottom: 1.75rem;
    animation: ${Fc} 0.6s ease forwards;
    letter-spacing: 2px;
  }

  h1 {
    font-size: 2.4rem;
    line-height: 1.2;
    margin-top: 2rem;
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.6rem;
  }

  h4 {
    font-size: 1.4rem;
  }

  p {
    font-family: var(--font-body);
    font-size: 18px;
    line-height: 1.6;
    margin-bottom: 3rem;
    margin-right: 12rem;
    margin-left: 12rem;
    color: var(--paragraph-color);
    animation: ${Fc} 0.8s ease forwards;
  }

  a {
    color: var(--accent-color);
    text-decoration: none;
    position: relative;
    transition: color var(--transition-speed);

    &:hover {
      color: #ffffff;
    }
    &:after {
      content: "";
      position: absolute;
      bottom: -2px;
      left: 50%;
      width: 0;
      height: 2px;
      background-color: var(--accent-color);
      transition: all var(--transition-speed) ease;
    }

    &:hover:after {
      left: 0;
      width: 100%;
    }
  }

  ul, ol {
    text-align: left; 
    display: inline-block; 
    margin: 1rem auto;
    padding: 0 1rem;
    font-family: var(--font-body);
    animation: ${Fc} 1s ease forwards;
  }

  li {
    margin: .5rem 0;
    list-style-type: disc;
    line-height: 1.0;
  }

  img {
    display: block;
    width: 75%;
    height: auto;
    margin: 1.5rem auto;
    border-radius: 4px;
    transition: transform var(--transition-speed), box-shadow var(--transition-speed);

    box-shadow: 0 4px 15px rgba(0,0,0,0.2);

    &:hover {
      transform: scale(1.02);
      box-shadow: 0 8px 20px rgba(0,0,0,0.3);
    }
  }

  blockquote {
    margin: 2rem auto;
    padding: 1rem 2rem;
    max-width: 800px;
    background-color: var(--bg-highlight);
    border-left: 4px solid var(--accent-color);
    font-family: var(--font-body);
    font-size: 1rem;
    line-height: 1.6;
    color: #f5f5f5;
    box-shadow: inset 0 0 10px rgba(0,0,0,0.1);

    animation: ${Fc} 0.5s ease forwards;

    p {
      margin: 0.5rem 0;
    }
  }

  @media (max-width: 768px) {
    padding: 1rem;

    h1 {
      font-size: 1.8rem;
    }
    h2 {
      font-size: 1.6rem;
    }
    h3 {
      font-size: 1.4rem;
    }
    p {
      font-size: 16px;
    }
    img {
      width: 80%;
    }
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 1.6rem;
    }
    h2 {
      font-size: 1.4rem;
    }
    p {
      font-size: 15px;
    }
    li {
      font-size: 15px;
    }
  }
`,JU=()=>{const[t,e]=$.useState(""),n=zr(),i=()=>{n("/")};return $.useEffect(()=>{fetch("/src/components/Projectfiles/cmContent.md").then(s=>s.text()).then(s=>e(s)).catch(s=>console.error("Error fetching markdown file:",s))},[]),he.jsxs(YU,{children:[he.jsxs(KU,{children:[he.jsxs(Uc,{onClick:i,children:["<","1/24/25",">"]}),he.jsx(Uc,{children:"WORK"}),he.jsx(Uc,{children:"IN"}),he.jsx(Uc,{children:"PROGRESS"})]}),he.jsx(ZU,{children:he.jsx(QU,{children:he.jsx(cu,{children:t})})})]})},eF=Ve.div`
  display: grid;
  grid-template-columns: 10% 92%;
  width: 100%;
  height: 100vh; 
`,tF=Ve.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  overflow-y: auto;
  margin-right: 20px;
  margin-top: 20px;
`,nF=Ve.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.16);
  overflow-y: auto; 
  padding: 0px;
  backdrop-filter: blur(10px); 
  -webkit-backdrop-filter: blur(10px); 
`,Oc=Ve.h1`
  font-family: 'Work Sans', sans-serif;
  font-weight: 300;
  font-size: 18px;
  letter-spacing: 2px;
  transform-origin: 0 0;
  transform: translateX(15px);
  transition: transform 0.5s, color 0.3s ease-in-out;
  color: rgba(255, 255, 255, 0.7);

  &:hover {
    transform: scale(1.01);
    color: white;
  }
`,Bc=ka`
  0% {
    opacity: 0;
    transform: translateY(6px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`,iF=Ve.div`
  width: 100%;
  max-width: 1200px; 
  padding: 2rem;
  color: var(--paragraph-color);
  text-align: center;
  --heading-color: #ffffff; 
  --paragraph-color: #ffffff; 
  --accent-color: #ff8080;  
  --bg-highlight: rgba(255, 255, 255, 0.06); 
  --transition-speed: 0.3s; 
  --font-heading: 'Ade', sans-serif; 
  --font-body: 'Work Sans', sans-serif; 
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0,0,0,0.3);

  h1, 
  h2, 
  h3, 
  h4 {
    font-family: var(--font-heading);
    color: var(--heading-color);
    text-transform: Uppercase; 
    margin-top: 2rem;
    margin-bottom: 1.75rem;
    animation: ${Bc} 0.6s ease forwards;
    letter-spacing: 2px;
  }

  h1 {
    font-size: 2.4rem;
    line-height: 1.2;
    margin-top: 2rem;
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.6rem;
  }

  h4 {
    font-size: 1.4rem;
  }

  p {
    font-family: var(--font-body);
    font-size: 18px;
    line-height: 1.6;
    margin-bottom: 3rem;
    margin-right: 12rem;
    margin-left: 12rem;
    color: var(--paragraph-color);
    animation: ${Bc} 0.8s ease forwards;
  }

  a {
    color: var(--accent-color);
    text-decoration: none;
    position: relative;
    transition: color var(--transition-speed);

    &:hover {
      color: #ffffff;
    }
    &:after {
      content: "";
      position: absolute;
      bottom: -2px;
      left: 50%;
      width: 0;
      height: 2px;
      background-color: var(--accent-color);
      transition: all var(--transition-speed) ease;
    }

    &:hover:after {
      left: 0;
      width: 100%;
    }
  }

  ul, ol {
    text-align: left; 
    display: inline-block; 
    margin: 1rem auto;
    padding: 0 1rem;
    font-family: var(--font-body);
    animation: ${Bc} 1s ease forwards;
  }

  li {
    margin: .5rem 0;
    list-style-type: disc;
    line-height: 1.0;
  }

  img {
    display: block;
    width: 75%;
    height: auto;
    margin: 1.5rem auto;
    border-radius: 4px;
    transition: transform var(--transition-speed), box-shadow var(--transition-speed);

    box-shadow: 0 4px 15px rgba(0,0,0,0.2);

    &:hover {
      transform: scale(1.02);
      box-shadow: 0 8px 20px rgba(0,0,0,0.3);
    }
  }

  blockquote {
    margin: 2rem auto;
    padding: 1rem 2rem;
    max-width: 800px;
    background-color: var(--bg-highlight);
    border-left: 4px solid var(--accent-color);
    font-family: var(--font-body);
    font-size: 1rem;
    line-height: 1.6;
    color: #f5f5f5;
    box-shadow: inset 0 0 10px rgba(0,0,0,0.1);

    animation: ${Bc} 0.5s ease forwards;

    p {
      margin: 0.5rem 0;
    }
  }

  @media (max-width: 768px) {
    padding: 1rem;

    h1 {
      font-size: 1.8rem;
    }
    h2 {
      font-size: 1.6rem;
    }
    h3 {
      font-size: 1.4rem;
    }
    p {
      font-size: 16px;
    }
    img {
      width: 80%;
    }
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 1.6rem;
    }
    h2 {
      font-size: 1.4rem;
    }
    p {
      font-size: 15px;
    }
    li {
      font-size: 15px;
    }
  }
`,rF=()=>{const[t,e]=$.useState(""),n=zr(),i=()=>{n("/")};return $.useEffect(()=>{fetch("/src/components/Projectfiles/lensContent.md").then(s=>s.text()).then(s=>e(s)).catch(s=>console.error("Error fetching markdown file:",s))},[]),he.jsxs(eF,{children:[he.jsxs(tF,{children:[he.jsxs(Oc,{onClick:i,children:["<","1/24/25",">"]}),he.jsx(Oc,{children:"WORK"}),he.jsx(Oc,{children:"IN"}),he.jsx(Oc,{children:"PROGRESS"})]}),he.jsx(nF,{children:he.jsx(iF,{children:he.jsx(cu,{children:t})})})]})},sF=Ve.div`
  display: grid;
  grid-template-columns: 10% 92%;
  width: 100%;
  height: 100vh; 
`,oF=Ve.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  overflow-y: auto;
  margin-right: 20px;
  margin-top: 20px;
`,aF=Ve.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.16);
  overflow-y: auto; 
  padding: 0px;
  backdrop-filter: blur(10px); 
  -webkit-backdrop-filter: blur(10px); 
`,zc=Ve.h1`
  font-family: 'Work Sans', sans-serif;
  font-weight: 300;
  font-size: 18px;
  letter-spacing: 2px;
  transform-origin: 0 0;
  transform: translateX(15px);
  transition: transform 0.5s, color 0.3s ease-in-out;
  color: rgba(255, 255, 255, 0.7);

  &:hover {
    transform: scale(1.01);
    color: white;
  }
`,Vc=ka`
  0% {
    opacity: 0;
    transform: translateY(6px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`,lF=Ve.div`
  width: 100%;
  max-width: 1200px; 
  padding: 2rem;
  color: var(--paragraph-color);
  text-align: center;
  --heading-color: #ffffff; 
  --paragraph-color: #ffffff; 
  --accent-color: #ff8080;  
  --bg-highlight: rgba(255, 255, 255, 0.06); 
  --transition-speed: 0.3s; 
  --font-heading: 'Ade', sans-serif; 
  --font-body: 'Work Sans', sans-serif; 
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0,0,0,0.3);

  h1, 
  h2, 
  h3, 
  h4 {
    font-family: var(--font-heading);
    color: var(--heading-color);
    text-transform: Uppercase; 
    margin-top: 2rem;
    margin-bottom: 1.75rem;
    animation: ${Vc} 0.6s ease forwards;
    letter-spacing: 2px;
  }

  h1 {
    font-size: 2.4rem;
    line-height: 1.2;
    margin-top: 2rem;
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.6rem;
  }

  h4 {
    font-size: 1.4rem;
  }

  p {
    font-family: var(--font-body);
    font-size: 18px;
    line-height: 1.6;
    margin-bottom: 3rem;
    margin-right: 12rem;
    margin-left: 12rem;
    color: var(--paragraph-color);
    animation: ${Vc} 0.8s ease forwards;
  }

  a {
    color: var(--accent-color);
    text-decoration: none;
    position: relative;
    transition: color var(--transition-speed);

    &:hover {
      color: #ffffff;
    }
    &:after {
      content: "";
      position: absolute;
      bottom: -2px;
      left: 50%;
      width: 0;
      height: 2px;
      background-color: var(--accent-color);
      transition: all var(--transition-speed) ease;
    }

    &:hover:after {
      left: 0;
      width: 100%;
    }
  }

  ul, ol {
    text-align: left; 
    display: inline-block; 
    margin: 1rem auto;
    padding: 0 1rem;
    font-family: var(--font-body);
    animation: ${Vc} 1s ease forwards;
  }

  li {
    margin: .5rem 0;
    list-style-type: disc;
    line-height: 1.0;
  }

  img {
    display: block;
    width: 75%;
    height: auto;
    margin: 1.5rem auto;
    border-radius: 4px;
    transition: transform var(--transition-speed), box-shadow var(--transition-speed);

    box-shadow: 0 4px 15px rgba(0,0,0,0.2);

    &:hover {
      transform: scale(1.02);
      box-shadow: 0 8px 20px rgba(0,0,0,0.3);
    }
  }

  blockquote {
    margin: 2rem auto;
    padding: 1rem 2rem;
    max-width: 800px;
    background-color: var(--bg-highlight);
    border-left: 4px solid var(--accent-color);
    font-family: var(--font-body);
    font-size: 1rem;
    line-height: 1.6;
    color: #f5f5f5;
    box-shadow: inset 0 0 10px rgba(0,0,0,0.1);

    animation: ${Vc} 0.5s ease forwards;

    p {
      margin: 0.5rem 0;
    }
  }

  @media (max-width: 768px) {
    padding: 1rem;

    h1 {
      font-size: 1.8rem;
    }
    h2 {
      font-size: 1.6rem;
    }
    h3 {
      font-size: 1.4rem;
    }
    p {
      font-size: 16px;
    }
    img {
      width: 80%;
    }
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 1.6rem;
    }
    h2 {
      font-size: 1.4rem;
    }
    p {
      font-size: 15px;
    }
    li {
      font-size: 15px;
    }
  }
`,uF=()=>{const[t,e]=$.useState(""),n=zr(),i=()=>{n("/")};return $.useEffect(()=>{fetch("/src/components/Projectfiles/stickerContent.md").then(s=>s.text()).then(s=>e(s)).catch(s=>console.error("Error fetching markdown file:",s))},[]),he.jsxs(sF,{children:[he.jsxs(oF,{children:[he.jsxs(zc,{onClick:i,children:["<","1/24/25",">"]}),he.jsx(zc,{children:"WORK"}),he.jsx(zc,{children:"IN"}),he.jsx(zc,{children:"PROGRESS"})]}),he.jsx(aF,{children:he.jsx(lF,{children:he.jsx(cu,{children:t})})})]})},cF=Ve.div`
  display: grid;
  grid-template-columns: 10% 92%;
  width: 100%;
  height: 100vh; 
`,fF=Ve.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  overflow-y: auto;
  margin-right: 20px;
  margin-top: 20px;
`,dF=Ve.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.16);
  overflow-y: auto; 
  padding: 0px;
  backdrop-filter: blur(10px); 
  -webkit-backdrop-filter: blur(10px); 
`,Hc=Ve.h1`
  font-family: 'Work Sans', sans-serif;
  font-weight: 300;
  font-size: 18px;
  letter-spacing: 2px;
  transform-origin: 0 0;
  transform: translateX(15px);
  transition: transform 0.5s, color 0.3s ease-in-out;
  color: rgba(255, 255, 255, 0.7);

  &:hover {
    transform: scale(1.01);
    color: white;
  }
`,Gc=ka`
  0% {
    opacity: 0;
    transform: translateY(6px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`,hF=Ve.div`
  width: 100%;
  max-width: 1200px; 
  padding: 2rem;
  color: var(--paragraph-color);
  text-align: center;
  --heading-color: #ffffff; 
  --paragraph-color: #ffffff; 
  --accent-color: #ff8080;  
  --bg-highlight: rgba(255, 255, 255, 0.06); 
  --transition-speed: 0.3s; 
  --font-heading: 'Ade', sans-serif; 
  --font-body: 'Work Sans', sans-serif; 
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0,0,0,0.3);

  h1, 
  h2, 
  h3, 
  h4 {
    font-family: var(--font-heading);
    color: var(--heading-color);
    text-transform: Uppercase; 
    margin-top: 2rem;
    margin-bottom: 1.75rem;
    animation: ${Gc} 0.6s ease forwards;
    letter-spacing: 2px;
  }

  h1 {
    font-size: 2.4rem;
    line-height: 1.2;
    margin-top: 2rem;
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.6rem;
  }

  h4 {
    font-size: 1.4rem;
  }

  p {
    font-family: var(--font-body);
    font-size: 18px;
    line-height: 1.6;
    margin-bottom: 3rem;
    margin-right: 12rem;
    margin-left: 12rem;
    color: var(--paragraph-color);
    animation: ${Gc} 0.8s ease forwards;
  }

  a {
    color: var(--accent-color);
    text-decoration: none;
    position: relative;
    transition: color var(--transition-speed);

    &:hover {
      color: #ffffff;
    }
    &:after {
      content: "";
      position: absolute;
      bottom: -2px;
      left: 50%;
      width: 0;
      height: 2px;
      background-color: var(--accent-color);
      transition: all var(--transition-speed) ease;
    }

    &:hover:after {
      left: 0;
      width: 100%;
    }
  }

  ul, ol {
    text-align: left; 
    display: inline-block; 
    margin: 1rem auto;
    padding: 0 1rem;
    font-family: var(--font-body);
    animation: ${Gc} 1s ease forwards;
  }

  li {
    margin: .5rem 0;
    list-style-type: disc;
    line-height: 1.0;
  }

  img {
    display: block;
    width: 75%;
    height: auto;
    margin: 1.5rem auto;
    border-radius: 4px;
    transition: transform var(--transition-speed), box-shadow var(--transition-speed);

    box-shadow: 0 4px 15px rgba(0,0,0,0.2);

    &:hover {
      transform: scale(1.02);
      box-shadow: 0 8px 20px rgba(0,0,0,0.3);
    }
  }

  blockquote {
    margin: 2rem auto;
    padding: 1rem 2rem;
    max-width: 800px;
    background-color: var(--bg-highlight);
    border-left: 4px solid var(--accent-color);
    font-family: var(--font-body);
    font-size: 1rem;
    line-height: 1.6;
    color: #f5f5f5;
    box-shadow: inset 0 0 10px rgba(0,0,0,0.1);

    animation: ${Gc} 0.5s ease forwards;

    p {
      margin: 0.5rem 0;
    }
  }

  @media (max-width: 768px) {
    padding: 1rem;

    h1 {
      font-size: 1.8rem;
    }
    h2 {
      font-size: 1.6rem;
    }
    h3 {
      font-size: 1.4rem;
    }
    p {
      font-size: 16px;
    }
    img {
      width: 80%;
    }
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 1.6rem;
    }
    h2 {
      font-size: 1.4rem;
    }
    p {
      font-size: 15px;
    }
    li {
      font-size: 15px;
    }
  }
`,pF=()=>{const[t,e]=$.useState(""),n=zr(),i=()=>{n("/")};return $.useEffect(()=>{fetch("/src/components/Projectfiles/hoodieContent.md").then(s=>s.text()).then(s=>e(s)).catch(s=>console.error("Error fetching markdown file:",s))},[]),he.jsxs(cF,{children:[he.jsxs(fF,{children:[he.jsxs(Hc,{onClick:i,children:["<","1/24/25",">"]}),he.jsx(Hc,{children:"WORK"}),he.jsx(Hc,{children:"IN"}),he.jsx(Hc,{children:"PROGRESS"})]}),he.jsx(dF,{children:he.jsx(hF,{children:he.jsx(cu,{children:t})})})]})},mF=Ve.div`
  position: absolute;
  width: 40px;
  height: 40px;
  border: 1px solid white;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
  transition: transform 0.2s ease-out, opacity 0.2s ease-out; /* Smooth transition */
`,gF=Ve.div`
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: white;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  mix-blend-mode: difference;
  z-index: 10000;
  transition: opacity 0.2s ease-out; /* Smooth fade effect */
`;Ve.div`
  position: absolute;
  width: 39px;
  height: 39px;
  background-color: rgb(151, 209, 237);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  mix-blend-mode: exclusion; /* Cool blend mode */
  z-index: 10000;
`;const vF=()=>{const[t,e]=$.useState(0),[n,i]=$.useState(0),[s,a]=$.useState(0),[l,u]=$.useState(0),[f,d]=$.useState(!1);return $.useEffect(()=>{const h=m=>{e(m.clientX),i(m.clientY)};return document.addEventListener("mousemove",h),()=>document.removeEventListener("mousemove",h)},[]),$.useEffect(()=>{const h=setInterval(()=>{a(m=>m+(t-m)*.1),u(m=>m+(n-m)*.1)},5);return()=>clearInterval(h)},[t,n]),$.useEffect(()=>{const h=()=>d(!0),m=()=>d(!1);return document.addEventListener("mousedown",h),document.addEventListener("mouseup",m),()=>{document.removeEventListener("mousedown",h),document.removeEventListener("mouseup",m)}},[]),he.jsxs(he.Fragment,{children:[he.jsx(mF,{style:{left:`${s}px`,top:`${l}px`,transform:f?"translate(-50%, -50%) scale(1.2)":"translate(-50%, -50%) scale(1)",opacity:f?.8:1}}),he.jsx(gF,{style:{left:`${t}px`,top:`${n}px`,opacity:f?.5:1}})]})};/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Pv="171",yF=0,US=1,xF=2,DM=1,_F=2,Tr=3,Ms=0,ii=1,Cr=2,xs=0,da=1,FS=2,OS=3,BS=4,SF=5,eo=100,EF=101,wF=102,MF=103,TF=104,AF=200,CF=201,bF=202,RF=203,Om=204,Bm=205,PF=206,DF=207,LF=208,IF=209,kF=210,NF=211,UF=212,FF=213,OF=214,zm=0,Vm=1,Hm=2,Ma=3,Gm=4,Wm=5,jm=6,Xm=7,LM=0,BF=1,zF=2,_s=0,VF=1,HF=2,GF=3,WF=4,jF=5,XF=6,$F=7,IM=300,Ta=301,Aa=302,$m=303,qm=304,cd=306,Ym=1e3,ro=1001,Km=1002,ji=1003,qF=1004,Wc=1005,tr=1006,Ap=1007,so=1008,Nr=1009,kM=1010,NM=1011,Ql=1012,Dv=1013,co=1014,br=1015,fu=1016,Lv=1017,Iv=1018,Ca=1020,UM=35902,FM=1021,OM=1022,Gi=1023,BM=1024,zM=1025,ha=1026,ba=1027,VM=1028,kv=1029,HM=1030,Nv=1031,Uv=1033,Mf=33776,Tf=33777,Af=33778,Cf=33779,Zm=35840,Qm=35841,Jm=35842,eg=35843,tg=36196,ng=37492,ig=37496,rg=37808,sg=37809,og=37810,ag=37811,lg=37812,ug=37813,cg=37814,fg=37815,dg=37816,hg=37817,pg=37818,mg=37819,gg=37820,vg=37821,bf=36492,yg=36494,xg=36495,GM=36283,_g=36284,Sg=36285,Eg=36286,YF=3200,KF=3201,ZF=0,QF=1,ys="",Ai="srgb",Ra="srgb-linear",Gf="linear",Bt="srgb",Ho=7680,zS=519,JF=512,eO=513,tO=514,WM=515,nO=516,iO=517,rO=518,sO=519,VS=35044,HS="300 es",Rr=2e3,Wf=2001;class Ba{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const a=s.indexOf(n);a!==-1&&s.splice(a,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let a=0,l=s.length;a<l;a++)s[a].call(this,e);e.target=null}}}const Nn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Cp=Math.PI/180,wg=180/Math.PI;function du(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Nn[t&255]+Nn[t>>8&255]+Nn[t>>16&255]+Nn[t>>24&255]+"-"+Nn[e&255]+Nn[e>>8&255]+"-"+Nn[e>>16&15|64]+Nn[e>>24&255]+"-"+Nn[n&63|128]+Nn[n>>8&255]+"-"+Nn[n>>16&255]+Nn[n>>24&255]+Nn[i&255]+Nn[i>>8&255]+Nn[i>>16&255]+Nn[i>>24&255]).toLowerCase()}function Tt(t,e,n){return Math.max(e,Math.min(n,t))}function oO(t,e){return(t%e+e)%e}function bp(t,e,n){return(1-n)*t+n*e}function Tl(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function Jn(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}class Ut{constructor(e=0,n=0){Ut.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6],this.y=s[1]*n+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Tt(this.x,e.x,n.x),this.y=Tt(this.y,e.y,n.y),this}clampScalar(e,n){return this.x=Tt(this.x,e,n),this.y=Tt(this.y,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Tt(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Tt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),s=Math.sin(n),a=this.x-e.x,l=this.y-e.y;return this.x=a*i-l*s+e.x,this.y=a*s+l*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class gt{constructor(e,n,i,s,a,l,u,f,d){gt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,s,a,l,u,f,d)}set(e,n,i,s,a,l,u,f,d){const h=this.elements;return h[0]=e,h[1]=s,h[2]=u,h[3]=n,h[4]=a,h[5]=f,h[6]=i,h[7]=l,h[8]=d,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,s=n.elements,a=this.elements,l=i[0],u=i[3],f=i[6],d=i[1],h=i[4],m=i[7],g=i[2],v=i[5],E=i[8],w=s[0],_=s[3],y=s[6],M=s[1],T=s[4],C=s[7],N=s[2],b=s[5],k=s[8];return a[0]=l*w+u*M+f*N,a[3]=l*_+u*T+f*b,a[6]=l*y+u*C+f*k,a[1]=d*w+h*M+m*N,a[4]=d*_+h*T+m*b,a[7]=d*y+h*C+m*k,a[2]=g*w+v*M+E*N,a[5]=g*_+v*T+E*b,a[8]=g*y+v*C+E*k,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],s=e[2],a=e[3],l=e[4],u=e[5],f=e[6],d=e[7],h=e[8];return n*l*h-n*u*d-i*a*h+i*u*f+s*a*d-s*l*f}invert(){const e=this.elements,n=e[0],i=e[1],s=e[2],a=e[3],l=e[4],u=e[5],f=e[6],d=e[7],h=e[8],m=h*l-u*d,g=u*f-h*a,v=d*a-l*f,E=n*m+i*g+s*v;if(E===0)return this.set(0,0,0,0,0,0,0,0,0);const w=1/E;return e[0]=m*w,e[1]=(s*d-h*i)*w,e[2]=(u*i-s*l)*w,e[3]=g*w,e[4]=(h*n-s*f)*w,e[5]=(s*a-u*n)*w,e[6]=v*w,e[7]=(i*f-d*n)*w,e[8]=(l*n-i*a)*w,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,s,a,l,u){const f=Math.cos(a),d=Math.sin(a);return this.set(i*f,i*d,-i*(f*l+d*u)+l+e,-s*d,s*f,-s*(-d*l+f*u)+u+n,0,0,1),this}scale(e,n){return this.premultiply(Rp.makeScale(e,n)),this}rotate(e){return this.premultiply(Rp.makeRotation(-e)),this}translate(e,n){return this.premultiply(Rp.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let s=0;s<9;s++)if(n[s]!==i[s])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Rp=new gt;function jM(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function jf(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function aO(){const t=jf("canvas");return t.style.display="block",t}const GS={};function na(t){t in GS||(GS[t]=!0,console.warn(t))}function lO(t,e,n){return new Promise(function(i,s){function a(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:s();break;case t.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:i()}}setTimeout(a,n)})}function uO(t){const e=t.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function cO(t){const e=t.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const WS=new gt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),jS=new gt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function fO(){const t={enabled:!0,workingColorSpace:Ra,spaces:{},convert:function(s,a,l){return this.enabled===!1||a===l||!a||!l||(this.spaces[a].transfer===Bt&&(s.r=Ir(s.r),s.g=Ir(s.g),s.b=Ir(s.b)),this.spaces[a].primaries!==this.spaces[l].primaries&&(s.applyMatrix3(this.spaces[a].toXYZ),s.applyMatrix3(this.spaces[l].fromXYZ)),this.spaces[l].transfer===Bt&&(s.r=pa(s.r),s.g=pa(s.g),s.b=pa(s.b))),s},fromWorkingColorSpace:function(s,a){return this.convert(s,this.workingColorSpace,a)},toWorkingColorSpace:function(s,a){return this.convert(s,a,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ys?Gf:this.spaces[s].transfer},getLuminanceCoefficients:function(s,a=this.workingColorSpace){return s.fromArray(this.spaces[a].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,a,l){return s.copy(this.spaces[a].toXYZ).multiply(this.spaces[l].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return t.define({[Ra]:{primaries:e,whitePoint:i,transfer:Gf,toXYZ:WS,fromXYZ:jS,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Ai},outputColorSpaceConfig:{drawingBufferColorSpace:Ai}},[Ai]:{primaries:e,whitePoint:i,transfer:Bt,toXYZ:WS,fromXYZ:jS,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Ai}}}),t}const It=fO();function Ir(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function pa(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let Go;class dO{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Go===void 0&&(Go=jf("canvas")),Go.width=e.width,Go.height=e.height;const i=Go.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Go}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=jf("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),a=s.data;for(let l=0;l<a.length;l++)a[l]=Ir(a[l]/255)*255;return i.putImageData(s,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Ir(n[i]/255)*255):n[i]=Ir(n[i]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let hO=0;class XM{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:hO++}),this.uuid=du(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let a;if(Array.isArray(s)){a=[];for(let l=0,u=s.length;l<u;l++)s[l].isDataTexture?a.push(Pp(s[l].image)):a.push(Pp(s[l]))}else a=Pp(s);i.url=a}return n||(e.images[this.uuid]=i),i}}function Pp(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?dO.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let pO=0;class ri extends Ba{constructor(e=ri.DEFAULT_IMAGE,n=ri.DEFAULT_MAPPING,i=ro,s=ro,a=tr,l=so,u=Gi,f=Nr,d=ri.DEFAULT_ANISOTROPY,h=ys){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:pO++}),this.uuid=du(),this.name="",this.source=new XM(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=a,this.minFilter=l,this.anisotropy=d,this.format=u,this.internalFormat=null,this.type=f,this.offset=new Ut(0,0),this.repeat=new Ut(1,1),this.center=new Ut(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new gt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==IM)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ym:e.x=e.x-Math.floor(e.x);break;case ro:e.x=e.x<0?0:1;break;case Km:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ym:e.y=e.y-Math.floor(e.y);break;case ro:e.y=e.y<0?0:1;break;case Km:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}ri.DEFAULT_IMAGE=null;ri.DEFAULT_MAPPING=IM;ri.DEFAULT_ANISOTROPY=1;class ln{constructor(e=0,n=0,i=0,s=1){ln.prototype.isVector4=!0,this.x=e,this.y=n,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,s){return this.x=e,this.y=n,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,s=this.z,a=this.w,l=e.elements;return this.x=l[0]*n+l[4]*i+l[8]*s+l[12]*a,this.y=l[1]*n+l[5]*i+l[9]*s+l[13]*a,this.z=l[2]*n+l[6]*i+l[10]*s+l[14]*a,this.w=l[3]*n+l[7]*i+l[11]*s+l[15]*a,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,s,a;const f=e.elements,d=f[0],h=f[4],m=f[8],g=f[1],v=f[5],E=f[9],w=f[2],_=f[6],y=f[10];if(Math.abs(h-g)<.01&&Math.abs(m-w)<.01&&Math.abs(E-_)<.01){if(Math.abs(h+g)<.1&&Math.abs(m+w)<.1&&Math.abs(E+_)<.1&&Math.abs(d+v+y-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const T=(d+1)/2,C=(v+1)/2,N=(y+1)/2,b=(h+g)/4,k=(m+w)/4,B=(E+_)/4;return T>C&&T>N?T<.01?(i=0,s=.707106781,a=.707106781):(i=Math.sqrt(T),s=b/i,a=k/i):C>N?C<.01?(i=.707106781,s=0,a=.707106781):(s=Math.sqrt(C),i=b/s,a=B/s):N<.01?(i=.707106781,s=.707106781,a=0):(a=Math.sqrt(N),i=k/a,s=B/a),this.set(i,s,a,n),this}let M=Math.sqrt((_-E)*(_-E)+(m-w)*(m-w)+(g-h)*(g-h));return Math.abs(M)<.001&&(M=1),this.x=(_-E)/M,this.y=(m-w)/M,this.z=(g-h)/M,this.w=Math.acos((d+v+y-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Tt(this.x,e.x,n.x),this.y=Tt(this.y,e.y,n.y),this.z=Tt(this.z,e.z,n.z),this.w=Tt(this.w,e.w,n.w),this}clampScalar(e,n){return this.x=Tt(this.x,e,n),this.y=Tt(this.y,e,n),this.z=Tt(this.z,e,n),this.w=Tt(this.w,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Tt(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class mO extends Ba{constructor(e=1,n=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=1,this.scissor=new ln(0,0,e,n),this.scissorTest=!1,this.viewport=new ln(0,0,e,n);const s={width:e,height:n,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:tr,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const a=new ri(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);a.flipY=!1,a.generateMipmaps=i.generateMipmaps,a.internalFormat=i.internalFormat,this.textures=[];const l=i.count;for(let u=0;u<l;u++)this.textures[u]=a.clone(),this.textures[u].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let s=0,a=this.textures.length;s<a;s++)this.textures[s].image.width=e,this.textures[s].image.height=n,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,s=e.textures.length;i<s;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const n=Object.assign({},e.texture.image);return this.texture.source=new XM(n),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class fo extends mO{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class $M extends ri{constructor(e=null,n=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:s},this.magFilter=ji,this.minFilter=ji,this.wrapR=ro,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class gO extends ri{constructor(e=null,n=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:s},this.magFilter=ji,this.minFilter=ji,this.wrapR=ro,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class hu{constructor(e=0,n=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=s}static slerpFlat(e,n,i,s,a,l,u){let f=i[s+0],d=i[s+1],h=i[s+2],m=i[s+3];const g=a[l+0],v=a[l+1],E=a[l+2],w=a[l+3];if(u===0){e[n+0]=f,e[n+1]=d,e[n+2]=h,e[n+3]=m;return}if(u===1){e[n+0]=g,e[n+1]=v,e[n+2]=E,e[n+3]=w;return}if(m!==w||f!==g||d!==v||h!==E){let _=1-u;const y=f*g+d*v+h*E+m*w,M=y>=0?1:-1,T=1-y*y;if(T>Number.EPSILON){const N=Math.sqrt(T),b=Math.atan2(N,y*M);_=Math.sin(_*b)/N,u=Math.sin(u*b)/N}const C=u*M;if(f=f*_+g*C,d=d*_+v*C,h=h*_+E*C,m=m*_+w*C,_===1-u){const N=1/Math.sqrt(f*f+d*d+h*h+m*m);f*=N,d*=N,h*=N,m*=N}}e[n]=f,e[n+1]=d,e[n+2]=h,e[n+3]=m}static multiplyQuaternionsFlat(e,n,i,s,a,l){const u=i[s],f=i[s+1],d=i[s+2],h=i[s+3],m=a[l],g=a[l+1],v=a[l+2],E=a[l+3];return e[n]=u*E+h*m+f*v-d*g,e[n+1]=f*E+h*g+d*m-u*v,e[n+2]=d*E+h*v+u*g-f*m,e[n+3]=h*E-u*m-f*g-d*v,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,s){return this._x=e,this._y=n,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,s=e._y,a=e._z,l=e._order,u=Math.cos,f=Math.sin,d=u(i/2),h=u(s/2),m=u(a/2),g=f(i/2),v=f(s/2),E=f(a/2);switch(l){case"XYZ":this._x=g*h*m+d*v*E,this._y=d*v*m-g*h*E,this._z=d*h*E+g*v*m,this._w=d*h*m-g*v*E;break;case"YXZ":this._x=g*h*m+d*v*E,this._y=d*v*m-g*h*E,this._z=d*h*E-g*v*m,this._w=d*h*m+g*v*E;break;case"ZXY":this._x=g*h*m-d*v*E,this._y=d*v*m+g*h*E,this._z=d*h*E+g*v*m,this._w=d*h*m-g*v*E;break;case"ZYX":this._x=g*h*m-d*v*E,this._y=d*v*m+g*h*E,this._z=d*h*E-g*v*m,this._w=d*h*m+g*v*E;break;case"YZX":this._x=g*h*m+d*v*E,this._y=d*v*m+g*h*E,this._z=d*h*E-g*v*m,this._w=d*h*m-g*v*E;break;case"XZY":this._x=g*h*m-d*v*E,this._y=d*v*m-g*h*E,this._z=d*h*E+g*v*m,this._w=d*h*m+g*v*E;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+l)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],s=n[4],a=n[8],l=n[1],u=n[5],f=n[9],d=n[2],h=n[6],m=n[10],g=i+u+m;if(g>0){const v=.5/Math.sqrt(g+1);this._w=.25/v,this._x=(h-f)*v,this._y=(a-d)*v,this._z=(l-s)*v}else if(i>u&&i>m){const v=2*Math.sqrt(1+i-u-m);this._w=(h-f)/v,this._x=.25*v,this._y=(s+l)/v,this._z=(a+d)/v}else if(u>m){const v=2*Math.sqrt(1+u-i-m);this._w=(a-d)/v,this._x=(s+l)/v,this._y=.25*v,this._z=(f+h)/v}else{const v=2*Math.sqrt(1+m-i-u);this._w=(l-s)/v,this._x=(a+d)/v,this._y=(f+h)/v,this._z=.25*v}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Tt(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,n/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,s=e._y,a=e._z,l=e._w,u=n._x,f=n._y,d=n._z,h=n._w;return this._x=i*h+l*u+s*d-a*f,this._y=s*h+l*f+a*u-i*d,this._z=a*h+l*d+i*f-s*u,this._w=l*h-i*u-s*f-a*d,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const i=this._x,s=this._y,a=this._z,l=this._w;let u=l*e._w+i*e._x+s*e._y+a*e._z;if(u<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,u=-u):this.copy(e),u>=1)return this._w=l,this._x=i,this._y=s,this._z=a,this;const f=1-u*u;if(f<=Number.EPSILON){const v=1-n;return this._w=v*l+n*this._w,this._x=v*i+n*this._x,this._y=v*s+n*this._y,this._z=v*a+n*this._z,this.normalize(),this}const d=Math.sqrt(f),h=Math.atan2(d,u),m=Math.sin((1-n)*h)/d,g=Math.sin(n*h)/d;return this._w=l*m+this._w*g,this._x=i*m+this._x*g,this._y=s*m+this._y*g,this._z=a*m+this._z*g,this._onChangeCallback(),this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),a*Math.sin(n),a*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class pe{constructor(e=0,n=0,i=0){pe.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(XS.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(XS.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,s=this.z,a=e.elements;return this.x=a[0]*n+a[3]*i+a[6]*s,this.y=a[1]*n+a[4]*i+a[7]*s,this.z=a[2]*n+a[5]*i+a[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,s=this.z,a=e.elements,l=1/(a[3]*n+a[7]*i+a[11]*s+a[15]);return this.x=(a[0]*n+a[4]*i+a[8]*s+a[12])*l,this.y=(a[1]*n+a[5]*i+a[9]*s+a[13])*l,this.z=(a[2]*n+a[6]*i+a[10]*s+a[14])*l,this}applyQuaternion(e){const n=this.x,i=this.y,s=this.z,a=e.x,l=e.y,u=e.z,f=e.w,d=2*(l*s-u*i),h=2*(u*n-a*s),m=2*(a*i-l*n);return this.x=n+f*d+l*m-u*h,this.y=i+f*h+u*d-a*m,this.z=s+f*m+a*h-l*d,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,s=this.z,a=e.elements;return this.x=a[0]*n+a[4]*i+a[8]*s,this.y=a[1]*n+a[5]*i+a[9]*s,this.z=a[2]*n+a[6]*i+a[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Tt(this.x,e.x,n.x),this.y=Tt(this.y,e.y,n.y),this.z=Tt(this.z,e.z,n.z),this}clampScalar(e,n){return this.x=Tt(this.x,e,n),this.y=Tt(this.y,e,n),this.z=Tt(this.z,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Tt(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,s=e.y,a=e.z,l=n.x,u=n.y,f=n.z;return this.x=s*f-a*u,this.y=a*l-i*f,this.z=i*u-s*l,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Dp.copy(this).projectOnVector(e),this.sub(Dp)}reflect(e){return this.sub(Dp.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Tt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return n*n+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const s=Math.sin(n)*e;return this.x=s*Math.sin(i),this.y=Math.cos(n)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=s,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Dp=new pe,XS=new hu;class pu{constructor(e=new pe(1/0,1/0,1/0),n=new pe(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(Fi.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(Fi.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=Fi.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const a=i.getAttribute("position");if(n===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let l=0,u=a.count;l<u;l++)e.isMesh===!0?e.getVertexPosition(l,Fi):Fi.fromBufferAttribute(a,l),Fi.applyMatrix4(e.matrixWorld),this.expandByPoint(Fi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),jc.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),jc.copy(i.boundingBox)),jc.applyMatrix4(e.matrixWorld),this.union(jc)}const s=e.children;for(let a=0,l=s.length;a<l;a++)this.expandByObject(s[a],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Fi),Fi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Al),Xc.subVectors(this.max,Al),Wo.subVectors(e.a,Al),jo.subVectors(e.b,Al),Xo.subVectors(e.c,Al),us.subVectors(jo,Wo),cs.subVectors(Xo,jo),Ws.subVectors(Wo,Xo);let n=[0,-us.z,us.y,0,-cs.z,cs.y,0,-Ws.z,Ws.y,us.z,0,-us.x,cs.z,0,-cs.x,Ws.z,0,-Ws.x,-us.y,us.x,0,-cs.y,cs.x,0,-Ws.y,Ws.x,0];return!Lp(n,Wo,jo,Xo,Xc)||(n=[1,0,0,0,1,0,0,0,1],!Lp(n,Wo,jo,Xo,Xc))?!1:($c.crossVectors(us,cs),n=[$c.x,$c.y,$c.z],Lp(n,Wo,jo,Xo,Xc))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Fi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Fi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(xr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),xr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),xr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),xr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),xr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),xr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),xr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),xr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(xr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const xr=[new pe,new pe,new pe,new pe,new pe,new pe,new pe,new pe],Fi=new pe,jc=new pu,Wo=new pe,jo=new pe,Xo=new pe,us=new pe,cs=new pe,Ws=new pe,Al=new pe,Xc=new pe,$c=new pe,js=new pe;function Lp(t,e,n,i,s){for(let a=0,l=t.length-3;a<=l;a+=3){js.fromArray(t,a);const u=s.x*Math.abs(js.x)+s.y*Math.abs(js.y)+s.z*Math.abs(js.z),f=e.dot(js),d=n.dot(js),h=i.dot(js);if(Math.max(-Math.max(f,d,h),Math.min(f,d,h))>u)return!1}return!0}const vO=new pu,Cl=new pe,Ip=new pe;class Fv{constructor(e=new pe,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):vO.setFromPoints(e).getCenter(i);let s=0;for(let a=0,l=e.length;a<l;a++)s=Math.max(s,i.distanceToSquared(e[a]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Cl.subVectors(e,this.center);const n=Cl.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),s=(i-this.radius)*.5;this.center.addScaledVector(Cl,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ip.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Cl.copy(e.center).add(Ip)),this.expandByPoint(Cl.copy(e.center).sub(Ip))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const _r=new pe,kp=new pe,qc=new pe,fs=new pe,Np=new pe,Yc=new pe,Up=new pe;class yO{constructor(e=new pe,n=new pe(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,_r)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=_r.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(_r.copy(this.origin).addScaledVector(this.direction,n),_r.distanceToSquared(e))}distanceSqToSegment(e,n,i,s){kp.copy(e).add(n).multiplyScalar(.5),qc.copy(n).sub(e).normalize(),fs.copy(this.origin).sub(kp);const a=e.distanceTo(n)*.5,l=-this.direction.dot(qc),u=fs.dot(this.direction),f=-fs.dot(qc),d=fs.lengthSq(),h=Math.abs(1-l*l);let m,g,v,E;if(h>0)if(m=l*f-u,g=l*u-f,E=a*h,m>=0)if(g>=-E)if(g<=E){const w=1/h;m*=w,g*=w,v=m*(m+l*g+2*u)+g*(l*m+g+2*f)+d}else g=a,m=Math.max(0,-(l*g+u)),v=-m*m+g*(g+2*f)+d;else g=-a,m=Math.max(0,-(l*g+u)),v=-m*m+g*(g+2*f)+d;else g<=-E?(m=Math.max(0,-(-l*a+u)),g=m>0?-a:Math.min(Math.max(-a,-f),a),v=-m*m+g*(g+2*f)+d):g<=E?(m=0,g=Math.min(Math.max(-a,-f),a),v=g*(g+2*f)+d):(m=Math.max(0,-(l*a+u)),g=m>0?a:Math.min(Math.max(-a,-f),a),v=-m*m+g*(g+2*f)+d);else g=l>0?-a:a,m=Math.max(0,-(l*g+u)),v=-m*m+g*(g+2*f)+d;return i&&i.copy(this.origin).addScaledVector(this.direction,m),s&&s.copy(kp).addScaledVector(qc,g),v}intersectSphere(e,n){_r.subVectors(e.center,this.origin);const i=_r.dot(this.direction),s=_r.dot(_r)-i*i,a=e.radius*e.radius;if(s>a)return null;const l=Math.sqrt(a-s),u=i-l,f=i+l;return f<0?null:u<0?this.at(f,n):this.at(u,n)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,s,a,l,u,f;const d=1/this.direction.x,h=1/this.direction.y,m=1/this.direction.z,g=this.origin;return d>=0?(i=(e.min.x-g.x)*d,s=(e.max.x-g.x)*d):(i=(e.max.x-g.x)*d,s=(e.min.x-g.x)*d),h>=0?(a=(e.min.y-g.y)*h,l=(e.max.y-g.y)*h):(a=(e.max.y-g.y)*h,l=(e.min.y-g.y)*h),i>l||a>s||((a>i||isNaN(i))&&(i=a),(l<s||isNaN(s))&&(s=l),m>=0?(u=(e.min.z-g.z)*m,f=(e.max.z-g.z)*m):(u=(e.max.z-g.z)*m,f=(e.min.z-g.z)*m),i>f||u>s)||((u>i||i!==i)&&(i=u),(f<s||s!==s)&&(s=f),s<0)?null:this.at(i>=0?i:s,n)}intersectsBox(e){return this.intersectBox(e,_r)!==null}intersectTriangle(e,n,i,s,a){Np.subVectors(n,e),Yc.subVectors(i,e),Up.crossVectors(Np,Yc);let l=this.direction.dot(Up),u;if(l>0){if(s)return null;u=1}else if(l<0)u=-1,l=-l;else return null;fs.subVectors(this.origin,e);const f=u*this.direction.dot(Yc.crossVectors(fs,Yc));if(f<0)return null;const d=u*this.direction.dot(Np.cross(fs));if(d<0||f+d>l)return null;const h=-u*fs.dot(Up);return h<0?null:this.at(h/l,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class hn{constructor(e,n,i,s,a,l,u,f,d,h,m,g,v,E,w,_){hn.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,s,a,l,u,f,d,h,m,g,v,E,w,_)}set(e,n,i,s,a,l,u,f,d,h,m,g,v,E,w,_){const y=this.elements;return y[0]=e,y[4]=n,y[8]=i,y[12]=s,y[1]=a,y[5]=l,y[9]=u,y[13]=f,y[2]=d,y[6]=h,y[10]=m,y[14]=g,y[3]=v,y[7]=E,y[11]=w,y[15]=_,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new hn().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,i=e.elements,s=1/$o.setFromMatrixColumn(e,0).length(),a=1/$o.setFromMatrixColumn(e,1).length(),l=1/$o.setFromMatrixColumn(e,2).length();return n[0]=i[0]*s,n[1]=i[1]*s,n[2]=i[2]*s,n[3]=0,n[4]=i[4]*a,n[5]=i[5]*a,n[6]=i[6]*a,n[7]=0,n[8]=i[8]*l,n[9]=i[9]*l,n[10]=i[10]*l,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,s=e.y,a=e.z,l=Math.cos(i),u=Math.sin(i),f=Math.cos(s),d=Math.sin(s),h=Math.cos(a),m=Math.sin(a);if(e.order==="XYZ"){const g=l*h,v=l*m,E=u*h,w=u*m;n[0]=f*h,n[4]=-f*m,n[8]=d,n[1]=v+E*d,n[5]=g-w*d,n[9]=-u*f,n[2]=w-g*d,n[6]=E+v*d,n[10]=l*f}else if(e.order==="YXZ"){const g=f*h,v=f*m,E=d*h,w=d*m;n[0]=g+w*u,n[4]=E*u-v,n[8]=l*d,n[1]=l*m,n[5]=l*h,n[9]=-u,n[2]=v*u-E,n[6]=w+g*u,n[10]=l*f}else if(e.order==="ZXY"){const g=f*h,v=f*m,E=d*h,w=d*m;n[0]=g-w*u,n[4]=-l*m,n[8]=E+v*u,n[1]=v+E*u,n[5]=l*h,n[9]=w-g*u,n[2]=-l*d,n[6]=u,n[10]=l*f}else if(e.order==="ZYX"){const g=l*h,v=l*m,E=u*h,w=u*m;n[0]=f*h,n[4]=E*d-v,n[8]=g*d+w,n[1]=f*m,n[5]=w*d+g,n[9]=v*d-E,n[2]=-d,n[6]=u*f,n[10]=l*f}else if(e.order==="YZX"){const g=l*f,v=l*d,E=u*f,w=u*d;n[0]=f*h,n[4]=w-g*m,n[8]=E*m+v,n[1]=m,n[5]=l*h,n[9]=-u*h,n[2]=-d*h,n[6]=v*m+E,n[10]=g-w*m}else if(e.order==="XZY"){const g=l*f,v=l*d,E=u*f,w=u*d;n[0]=f*h,n[4]=-m,n[8]=d*h,n[1]=g*m+w,n[5]=l*h,n[9]=v*m-E,n[2]=E*m-v,n[6]=u*h,n[10]=w*m+g}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(xO,e,_O)}lookAt(e,n,i){const s=this.elements;return ui.subVectors(e,n),ui.lengthSq()===0&&(ui.z=1),ui.normalize(),ds.crossVectors(i,ui),ds.lengthSq()===0&&(Math.abs(i.z)===1?ui.x+=1e-4:ui.z+=1e-4,ui.normalize(),ds.crossVectors(i,ui)),ds.normalize(),Kc.crossVectors(ui,ds),s[0]=ds.x,s[4]=Kc.x,s[8]=ui.x,s[1]=ds.y,s[5]=Kc.y,s[9]=ui.y,s[2]=ds.z,s[6]=Kc.z,s[10]=ui.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,s=n.elements,a=this.elements,l=i[0],u=i[4],f=i[8],d=i[12],h=i[1],m=i[5],g=i[9],v=i[13],E=i[2],w=i[6],_=i[10],y=i[14],M=i[3],T=i[7],C=i[11],N=i[15],b=s[0],k=s[4],B=s[8],L=s[12],R=s[1],O=s[5],Z=s[9],X=s[13],J=s[2],ne=s[6],le=s[10],re=s[14],G=s[3],ue=s[7],D=s[11],V=s[15];return a[0]=l*b+u*R+f*J+d*G,a[4]=l*k+u*O+f*ne+d*ue,a[8]=l*B+u*Z+f*le+d*D,a[12]=l*L+u*X+f*re+d*V,a[1]=h*b+m*R+g*J+v*G,a[5]=h*k+m*O+g*ne+v*ue,a[9]=h*B+m*Z+g*le+v*D,a[13]=h*L+m*X+g*re+v*V,a[2]=E*b+w*R+_*J+y*G,a[6]=E*k+w*O+_*ne+y*ue,a[10]=E*B+w*Z+_*le+y*D,a[14]=E*L+w*X+_*re+y*V,a[3]=M*b+T*R+C*J+N*G,a[7]=M*k+T*O+C*ne+N*ue,a[11]=M*B+T*Z+C*le+N*D,a[15]=M*L+T*X+C*re+N*V,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],s=e[8],a=e[12],l=e[1],u=e[5],f=e[9],d=e[13],h=e[2],m=e[6],g=e[10],v=e[14],E=e[3],w=e[7],_=e[11],y=e[15];return E*(+a*f*m-s*d*m-a*u*g+i*d*g+s*u*v-i*f*v)+w*(+n*f*v-n*d*g+a*l*g-s*l*v+s*d*h-a*f*h)+_*(+n*d*m-n*u*v-a*l*m+i*l*v+a*u*h-i*d*h)+y*(-s*u*h-n*f*m+n*u*g+s*l*m-i*l*g+i*f*h)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=n,s[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],s=e[2],a=e[3],l=e[4],u=e[5],f=e[6],d=e[7],h=e[8],m=e[9],g=e[10],v=e[11],E=e[12],w=e[13],_=e[14],y=e[15],M=m*_*d-w*g*d+w*f*v-u*_*v-m*f*y+u*g*y,T=E*g*d-h*_*d-E*f*v+l*_*v+h*f*y-l*g*y,C=h*w*d-E*m*d+E*u*v-l*w*v-h*u*y+l*m*y,N=E*m*f-h*w*f-E*u*g+l*w*g+h*u*_-l*m*_,b=n*M+i*T+s*C+a*N;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const k=1/b;return e[0]=M*k,e[1]=(w*g*a-m*_*a-w*s*v+i*_*v+m*s*y-i*g*y)*k,e[2]=(u*_*a-w*f*a+w*s*d-i*_*d-u*s*y+i*f*y)*k,e[3]=(m*f*a-u*g*a-m*s*d+i*g*d+u*s*v-i*f*v)*k,e[4]=T*k,e[5]=(h*_*a-E*g*a+E*s*v-n*_*v-h*s*y+n*g*y)*k,e[6]=(E*f*a-l*_*a-E*s*d+n*_*d+l*s*y-n*f*y)*k,e[7]=(l*g*a-h*f*a+h*s*d-n*g*d-l*s*v+n*f*v)*k,e[8]=C*k,e[9]=(E*m*a-h*w*a-E*i*v+n*w*v+h*i*y-n*m*y)*k,e[10]=(l*w*a-E*u*a+E*i*d-n*w*d-l*i*y+n*u*y)*k,e[11]=(h*u*a-l*m*a-h*i*d+n*m*d+l*i*v-n*u*v)*k,e[12]=N*k,e[13]=(h*w*s-E*m*s+E*i*g-n*w*g-h*i*_+n*m*_)*k,e[14]=(E*u*s-l*w*s-E*i*f+n*w*f+l*i*_-n*u*_)*k,e[15]=(l*m*s-h*u*s+h*i*f-n*m*f-l*i*g+n*u*g)*k,this}scale(e){const n=this.elements,i=e.x,s=e.y,a=e.z;return n[0]*=i,n[4]*=s,n[8]*=a,n[1]*=i,n[5]*=s,n[9]*=a,n[2]*=i,n[6]*=s,n[10]*=a,n[3]*=i,n[7]*=s,n[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,s))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),s=Math.sin(n),a=1-i,l=e.x,u=e.y,f=e.z,d=a*l,h=a*u;return this.set(d*l+i,d*u-s*f,d*f+s*u,0,d*u+s*f,h*u+i,h*f-s*l,0,d*f-s*u,h*f+s*l,a*f*f+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,s,a,l){return this.set(1,i,a,0,e,1,l,0,n,s,1,0,0,0,0,1),this}compose(e,n,i){const s=this.elements,a=n._x,l=n._y,u=n._z,f=n._w,d=a+a,h=l+l,m=u+u,g=a*d,v=a*h,E=a*m,w=l*h,_=l*m,y=u*m,M=f*d,T=f*h,C=f*m,N=i.x,b=i.y,k=i.z;return s[0]=(1-(w+y))*N,s[1]=(v+C)*N,s[2]=(E-T)*N,s[3]=0,s[4]=(v-C)*b,s[5]=(1-(g+y))*b,s[6]=(_+M)*b,s[7]=0,s[8]=(E+T)*k,s[9]=(_-M)*k,s[10]=(1-(g+w))*k,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,n,i){const s=this.elements;let a=$o.set(s[0],s[1],s[2]).length();const l=$o.set(s[4],s[5],s[6]).length(),u=$o.set(s[8],s[9],s[10]).length();this.determinant()<0&&(a=-a),e.x=s[12],e.y=s[13],e.z=s[14],Oi.copy(this);const d=1/a,h=1/l,m=1/u;return Oi.elements[0]*=d,Oi.elements[1]*=d,Oi.elements[2]*=d,Oi.elements[4]*=h,Oi.elements[5]*=h,Oi.elements[6]*=h,Oi.elements[8]*=m,Oi.elements[9]*=m,Oi.elements[10]*=m,n.setFromRotationMatrix(Oi),i.x=a,i.y=l,i.z=u,this}makePerspective(e,n,i,s,a,l,u=Rr){const f=this.elements,d=2*a/(n-e),h=2*a/(i-s),m=(n+e)/(n-e),g=(i+s)/(i-s);let v,E;if(u===Rr)v=-(l+a)/(l-a),E=-2*l*a/(l-a);else if(u===Wf)v=-l/(l-a),E=-l*a/(l-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+u);return f[0]=d,f[4]=0,f[8]=m,f[12]=0,f[1]=0,f[5]=h,f[9]=g,f[13]=0,f[2]=0,f[6]=0,f[10]=v,f[14]=E,f[3]=0,f[7]=0,f[11]=-1,f[15]=0,this}makeOrthographic(e,n,i,s,a,l,u=Rr){const f=this.elements,d=1/(n-e),h=1/(i-s),m=1/(l-a),g=(n+e)*d,v=(i+s)*h;let E,w;if(u===Rr)E=(l+a)*m,w=-2*m;else if(u===Wf)E=a*m,w=-1*m;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+u);return f[0]=2*d,f[4]=0,f[8]=0,f[12]=-g,f[1]=0,f[5]=2*h,f[9]=0,f[13]=-v,f[2]=0,f[6]=0,f[10]=w,f[14]=-E,f[3]=0,f[7]=0,f[11]=0,f[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let s=0;s<16;s++)if(n[s]!==i[s])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}}const $o=new pe,Oi=new hn,xO=new pe(0,0,0),_O=new pe(1,1,1),ds=new pe,Kc=new pe,ui=new pe,$S=new hn,qS=new hu;class Ur{constructor(e=0,n=0,i=0,s=Ur.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,s=this._order){return this._x=e,this._y=n,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const s=e.elements,a=s[0],l=s[4],u=s[8],f=s[1],d=s[5],h=s[9],m=s[2],g=s[6],v=s[10];switch(n){case"XYZ":this._y=Math.asin(Tt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(-h,v),this._z=Math.atan2(-l,a)):(this._x=Math.atan2(g,d),this._z=0);break;case"YXZ":this._x=Math.asin(-Tt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(u,v),this._z=Math.atan2(f,d)):(this._y=Math.atan2(-m,a),this._z=0);break;case"ZXY":this._x=Math.asin(Tt(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(-m,v),this._z=Math.atan2(-l,d)):(this._y=0,this._z=Math.atan2(f,a));break;case"ZYX":this._y=Math.asin(-Tt(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(g,v),this._z=Math.atan2(f,a)):(this._x=0,this._z=Math.atan2(-l,d));break;case"YZX":this._z=Math.asin(Tt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(-h,d),this._y=Math.atan2(-m,a)):(this._x=0,this._y=Math.atan2(u,v));break;case"XZY":this._z=Math.asin(-Tt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(g,d),this._y=Math.atan2(u,a)):(this._x=Math.atan2(-h,v),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return $S.makeRotationFromQuaternion(e),this.setFromRotationMatrix($S,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return qS.setFromEuler(this),this.setFromQuaternion(qS,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ur.DEFAULT_ORDER="XYZ";class qM{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let SO=0;const YS=new pe,qo=new hu,Sr=new hn,Zc=new pe,bl=new pe,EO=new pe,wO=new hu,KS=new pe(1,0,0),ZS=new pe(0,1,0),QS=new pe(0,0,1),JS={type:"added"},MO={type:"removed"},Yo={type:"childadded",child:null},Fp={type:"childremoved",child:null};class mi extends Ba{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:SO++}),this.uuid=du(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=mi.DEFAULT_UP.clone();const e=new pe,n=new Ur,i=new hu,s=new pe(1,1,1);function a(){i.setFromEuler(n,!1)}function l(){n.setFromQuaternion(i,void 0,!1)}n._onChange(a),i._onChange(l),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new hn},normalMatrix:{value:new gt}}),this.matrix=new hn,this.matrixWorld=new hn,this.matrixAutoUpdate=mi.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=mi.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new qM,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return qo.setFromAxisAngle(e,n),this.quaternion.multiply(qo),this}rotateOnWorldAxis(e,n){return qo.setFromAxisAngle(e,n),this.quaternion.premultiply(qo),this}rotateX(e){return this.rotateOnAxis(KS,e)}rotateY(e){return this.rotateOnAxis(ZS,e)}rotateZ(e){return this.rotateOnAxis(QS,e)}translateOnAxis(e,n){return YS.copy(e).applyQuaternion(this.quaternion),this.position.add(YS.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(KS,e)}translateY(e){return this.translateOnAxis(ZS,e)}translateZ(e){return this.translateOnAxis(QS,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Sr.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?Zc.copy(e):Zc.set(e,n,i);const s=this.parent;this.updateWorldMatrix(!0,!1),bl.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Sr.lookAt(bl,Zc,this.up):Sr.lookAt(Zc,bl,this.up),this.quaternion.setFromRotationMatrix(Sr),s&&(Sr.extractRotation(s.matrixWorld),qo.setFromRotationMatrix(Sr),this.quaternion.premultiply(qo.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(JS),Yo.child=e,this.dispatchEvent(Yo),Yo.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(MO),Fp.child=e,this.dispatchEvent(Fp),Fp.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Sr.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Sr.multiply(e.parent.matrixWorld)),e.applyMatrix4(Sr),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(JS),Yo.child=e,this.dispatchEvent(Yo),Yo.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,s=this.children.length;i<s;i++){const l=this.children[i].getObjectByProperty(e,n);if(l!==void 0)return l}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const s=this.children;for(let a=0,l=s.length;a<l;a++)s[a].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(bl,e,EO),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(bl,wO,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const s=this.children;for(let a=0,l=s.length;a<l;a++)s[a].updateWorldMatrix(!1,!0)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(u=>({boxInitialized:u.boxInitialized,boxMin:u.box.min.toArray(),boxMax:u.box.max.toArray(),sphereInitialized:u.sphereInitialized,sphereRadius:u.sphere.radius,sphereCenter:u.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function a(u,f){return u[f.uuid]===void 0&&(u[f.uuid]=f.toJSON(e)),f.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=a(e.geometries,this.geometry);const u=this.geometry.parameters;if(u!==void 0&&u.shapes!==void 0){const f=u.shapes;if(Array.isArray(f))for(let d=0,h=f.length;d<h;d++){const m=f[d];a(e.shapes,m)}else a(e.shapes,f)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const u=[];for(let f=0,d=this.material.length;f<d;f++)u.push(a(e.materials,this.material[f]));s.material=u}else s.material=a(e.materials,this.material);if(this.children.length>0){s.children=[];for(let u=0;u<this.children.length;u++)s.children.push(this.children[u].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let u=0;u<this.animations.length;u++){const f=this.animations[u];s.animations.push(a(e.animations,f))}}if(n){const u=l(e.geometries),f=l(e.materials),d=l(e.textures),h=l(e.images),m=l(e.shapes),g=l(e.skeletons),v=l(e.animations),E=l(e.nodes);u.length>0&&(i.geometries=u),f.length>0&&(i.materials=f),d.length>0&&(i.textures=d),h.length>0&&(i.images=h),m.length>0&&(i.shapes=m),g.length>0&&(i.skeletons=g),v.length>0&&(i.animations=v),E.length>0&&(i.nodes=E)}return i.object=s,i;function l(u){const f=[];for(const d in u){const h=u[d];delete h.metadata,f.push(h)}return f}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}mi.DEFAULT_UP=new pe(0,1,0);mi.DEFAULT_MATRIX_AUTO_UPDATE=!0;mi.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Bi=new pe,Er=new pe,Op=new pe,wr=new pe,Ko=new pe,Zo=new pe,eE=new pe,Bp=new pe,zp=new pe,Vp=new pe,Hp=new ln,Gp=new ln,Wp=new ln;class Hi{constructor(e=new pe,n=new pe,i=new pe){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,s){s.subVectors(i,n),Bi.subVectors(e,n),s.cross(Bi);const a=s.lengthSq();return a>0?s.multiplyScalar(1/Math.sqrt(a)):s.set(0,0,0)}static getBarycoord(e,n,i,s,a){Bi.subVectors(s,n),Er.subVectors(i,n),Op.subVectors(e,n);const l=Bi.dot(Bi),u=Bi.dot(Er),f=Bi.dot(Op),d=Er.dot(Er),h=Er.dot(Op),m=l*d-u*u;if(m===0)return a.set(0,0,0),null;const g=1/m,v=(d*f-u*h)*g,E=(l*h-u*f)*g;return a.set(1-v-E,E,v)}static containsPoint(e,n,i,s){return this.getBarycoord(e,n,i,s,wr)===null?!1:wr.x>=0&&wr.y>=0&&wr.x+wr.y<=1}static getInterpolation(e,n,i,s,a,l,u,f){return this.getBarycoord(e,n,i,s,wr)===null?(f.x=0,f.y=0,"z"in f&&(f.z=0),"w"in f&&(f.w=0),null):(f.setScalar(0),f.addScaledVector(a,wr.x),f.addScaledVector(l,wr.y),f.addScaledVector(u,wr.z),f)}static getInterpolatedAttribute(e,n,i,s,a,l){return Hp.setScalar(0),Gp.setScalar(0),Wp.setScalar(0),Hp.fromBufferAttribute(e,n),Gp.fromBufferAttribute(e,i),Wp.fromBufferAttribute(e,s),l.setScalar(0),l.addScaledVector(Hp,a.x),l.addScaledVector(Gp,a.y),l.addScaledVector(Wp,a.z),l}static isFrontFacing(e,n,i,s){return Bi.subVectors(i,n),Er.subVectors(e,n),Bi.cross(Er).dot(s)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,s){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,n,i,s){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Bi.subVectors(this.c,this.b),Er.subVectors(this.a,this.b),Bi.cross(Er).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Hi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return Hi.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,s,a){return Hi.getInterpolation(e,this.a,this.b,this.c,n,i,s,a)}containsPoint(e){return Hi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Hi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,s=this.b,a=this.c;let l,u;Ko.subVectors(s,i),Zo.subVectors(a,i),Bp.subVectors(e,i);const f=Ko.dot(Bp),d=Zo.dot(Bp);if(f<=0&&d<=0)return n.copy(i);zp.subVectors(e,s);const h=Ko.dot(zp),m=Zo.dot(zp);if(h>=0&&m<=h)return n.copy(s);const g=f*m-h*d;if(g<=0&&f>=0&&h<=0)return l=f/(f-h),n.copy(i).addScaledVector(Ko,l);Vp.subVectors(e,a);const v=Ko.dot(Vp),E=Zo.dot(Vp);if(E>=0&&v<=E)return n.copy(a);const w=v*d-f*E;if(w<=0&&d>=0&&E<=0)return u=d/(d-E),n.copy(i).addScaledVector(Zo,u);const _=h*E-v*m;if(_<=0&&m-h>=0&&v-E>=0)return eE.subVectors(a,s),u=(m-h)/(m-h+(v-E)),n.copy(s).addScaledVector(eE,u);const y=1/(_+w+g);return l=w*y,u=g*y,n.copy(i).addScaledVector(Ko,l).addScaledVector(Zo,u)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const YM={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},hs={h:0,s:0,l:0},Qc={h:0,s:0,l:0};function jp(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class zt{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=Ai){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,It.toWorkingColorSpace(this,n),this}setRGB(e,n,i,s=It.workingColorSpace){return this.r=e,this.g=n,this.b=i,It.toWorkingColorSpace(this,s),this}setHSL(e,n,i,s=It.workingColorSpace){if(e=oO(e,1),n=Tt(n,0,1),i=Tt(i,0,1),n===0)this.r=this.g=this.b=i;else{const a=i<=.5?i*(1+n):i+n-i*n,l=2*i-a;this.r=jp(l,a,e+1/3),this.g=jp(l,a,e),this.b=jp(l,a,e-1/3)}return It.toWorkingColorSpace(this,s),this}setStyle(e,n=Ai){function i(a){a!==void 0&&parseFloat(a)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let a;const l=s[1],u=s[2];switch(l){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(u))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,n);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(u))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,n);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(u))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const a=s[1],l=a.length;if(l===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,n);if(l===6)return this.setHex(parseInt(a,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=Ai){const i=YM[e.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ir(e.r),this.g=Ir(e.g),this.b=Ir(e.b),this}copyLinearToSRGB(e){return this.r=pa(e.r),this.g=pa(e.g),this.b=pa(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ai){return It.fromWorkingColorSpace(Un.copy(this),e),Math.round(Tt(Un.r*255,0,255))*65536+Math.round(Tt(Un.g*255,0,255))*256+Math.round(Tt(Un.b*255,0,255))}getHexString(e=Ai){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=It.workingColorSpace){It.fromWorkingColorSpace(Un.copy(this),n);const i=Un.r,s=Un.g,a=Un.b,l=Math.max(i,s,a),u=Math.min(i,s,a);let f,d;const h=(u+l)/2;if(u===l)f=0,d=0;else{const m=l-u;switch(d=h<=.5?m/(l+u):m/(2-l-u),l){case i:f=(s-a)/m+(s<a?6:0);break;case s:f=(a-i)/m+2;break;case a:f=(i-s)/m+4;break}f/=6}return e.h=f,e.s=d,e.l=h,e}getRGB(e,n=It.workingColorSpace){return It.fromWorkingColorSpace(Un.copy(this),n),e.r=Un.r,e.g=Un.g,e.b=Un.b,e}getStyle(e=Ai){It.fromWorkingColorSpace(Un.copy(this),e);const n=Un.r,i=Un.g,s=Un.b;return e!==Ai?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,n,i){return this.getHSL(hs),this.setHSL(hs.h+e,hs.s+n,hs.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(hs),e.getHSL(Qc);const i=bp(hs.h,Qc.h,n),s=bp(hs.s,Qc.s,n),a=bp(hs.l,Qc.l,n);return this.setHSL(i,s,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,s=this.b,a=e.elements;return this.r=a[0]*n+a[3]*i+a[6]*s,this.g=a[1]*n+a[4]*i+a[7]*s,this.b=a[2]*n+a[5]*i+a[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Un=new zt;zt.NAMES=YM;let TO=0;class fd extends Ba{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:TO++}),this.uuid=du(),this.name="",this.type="Material",this.blending=da,this.side=Ms,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Om,this.blendDst=Bm,this.blendEquation=eo,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new zt(0,0,0),this.blendAlpha=0,this.depthFunc=Ma,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=zS,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ho,this.stencilZFail=Ho,this.stencilZPass=Ho,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const s=this[n];if(s===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==da&&(i.blending=this.blending),this.side!==Ms&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Om&&(i.blendSrc=this.blendSrc),this.blendDst!==Bm&&(i.blendDst=this.blendDst),this.blendEquation!==eo&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ma&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==zS&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ho&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ho&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ho&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(a){const l=[];for(const u in a){const f=a[u];delete f.metadata,l.push(f)}return l}if(n){const a=s(e.textures),l=s(e.images);a.length>0&&(i.textures=a),l.length>0&&(i.images=l)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const s=n.length;i=new Array(s);for(let a=0;a!==s;++a)i[a]=n[a].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class KM extends fd{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new zt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ur,this.combine=LM,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const cn=new pe,Jc=new Ut;class sr{constructor(e,n,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=VS,this.updateRanges=[],this.gpuType=br,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let s=0,a=this.itemSize;s<a;s++)this.array[e+s]=n.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Jc.fromBufferAttribute(this,n),Jc.applyMatrix3(e),this.setXY(n,Jc.x,Jc.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)cn.fromBufferAttribute(this,n),cn.applyMatrix3(e),this.setXYZ(n,cn.x,cn.y,cn.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)cn.fromBufferAttribute(this,n),cn.applyMatrix4(e),this.setXYZ(n,cn.x,cn.y,cn.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)cn.fromBufferAttribute(this,n),cn.applyNormalMatrix(e),this.setXYZ(n,cn.x,cn.y,cn.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)cn.fromBufferAttribute(this,n),cn.transformDirection(e),this.setXYZ(n,cn.x,cn.y,cn.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=Tl(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=Jn(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=Tl(n,this.array)),n}setX(e,n){return this.normalized&&(n=Jn(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=Tl(n,this.array)),n}setY(e,n){return this.normalized&&(n=Jn(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=Tl(n,this.array)),n}setZ(e,n){return this.normalized&&(n=Jn(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=Tl(n,this.array)),n}setW(e,n){return this.normalized&&(n=Jn(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=Jn(n,this.array),i=Jn(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,s){return e*=this.itemSize,this.normalized&&(n=Jn(n,this.array),i=Jn(i,this.array),s=Jn(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,n,i,s,a){return e*=this.itemSize,this.normalized&&(n=Jn(n,this.array),i=Jn(i,this.array),s=Jn(s,this.array),a=Jn(a,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==VS&&(e.usage=this.usage),e}}class ZM extends sr{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class QM extends sr{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class uo extends sr{constructor(e,n,i){super(new Float32Array(e),n,i)}}let AO=0;const Mi=new hn,Xp=new mi,Qo=new pe,ci=new pu,Rl=new pu,wn=new pe;class mo extends Ba{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:AO++}),this.uuid=du(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(jM(e)?QM:ZM)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const a=new gt().getNormalMatrix(e);i.applyNormalMatrix(a),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Mi.makeRotationFromQuaternion(e),this.applyMatrix4(Mi),this}rotateX(e){return Mi.makeRotationX(e),this.applyMatrix4(Mi),this}rotateY(e){return Mi.makeRotationY(e),this.applyMatrix4(Mi),this}rotateZ(e){return Mi.makeRotationZ(e),this.applyMatrix4(Mi),this}translate(e,n,i){return Mi.makeTranslation(e,n,i),this.applyMatrix4(Mi),this}scale(e,n,i){return Mi.makeScale(e,n,i),this.applyMatrix4(Mi),this}lookAt(e){return Xp.lookAt(e),Xp.updateMatrix(),this.applyMatrix4(Xp.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Qo).negate(),this.translate(Qo.x,Qo.y,Qo.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let s=0,a=e.length;s<a;s++){const l=e[s];i.push(l.x,l.y,l.z||0)}this.setAttribute("position",new uo(i,3))}else{const i=Math.min(e.length,n.count);for(let s=0;s<i;s++){const a=e[s];n.setXYZ(s,a.x,a.y,a.z||0)}e.length>n.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new pu);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new pe(-1/0,-1/0,-1/0),new pe(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,s=n.length;i<s;i++){const a=n[i];ci.setFromBufferAttribute(a),this.morphTargetsRelative?(wn.addVectors(this.boundingBox.min,ci.min),this.boundingBox.expandByPoint(wn),wn.addVectors(this.boundingBox.max,ci.max),this.boundingBox.expandByPoint(wn)):(this.boundingBox.expandByPoint(ci.min),this.boundingBox.expandByPoint(ci.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Fv);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new pe,1/0);return}if(e){const i=this.boundingSphere.center;if(ci.setFromBufferAttribute(e),n)for(let a=0,l=n.length;a<l;a++){const u=n[a];Rl.setFromBufferAttribute(u),this.morphTargetsRelative?(wn.addVectors(ci.min,Rl.min),ci.expandByPoint(wn),wn.addVectors(ci.max,Rl.max),ci.expandByPoint(wn)):(ci.expandByPoint(Rl.min),ci.expandByPoint(Rl.max))}ci.getCenter(i);let s=0;for(let a=0,l=e.count;a<l;a++)wn.fromBufferAttribute(e,a),s=Math.max(s,i.distanceToSquared(wn));if(n)for(let a=0,l=n.length;a<l;a++){const u=n[a],f=this.morphTargetsRelative;for(let d=0,h=u.count;d<h;d++)wn.fromBufferAttribute(u,d),f&&(Qo.fromBufferAttribute(e,d),wn.add(Qo)),s=Math.max(s,i.distanceToSquared(wn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,s=n.normal,a=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new sr(new Float32Array(4*i.count),4));const l=this.getAttribute("tangent"),u=[],f=[];for(let B=0;B<i.count;B++)u[B]=new pe,f[B]=new pe;const d=new pe,h=new pe,m=new pe,g=new Ut,v=new Ut,E=new Ut,w=new pe,_=new pe;function y(B,L,R){d.fromBufferAttribute(i,B),h.fromBufferAttribute(i,L),m.fromBufferAttribute(i,R),g.fromBufferAttribute(a,B),v.fromBufferAttribute(a,L),E.fromBufferAttribute(a,R),h.sub(d),m.sub(d),v.sub(g),E.sub(g);const O=1/(v.x*E.y-E.x*v.y);isFinite(O)&&(w.copy(h).multiplyScalar(E.y).addScaledVector(m,-v.y).multiplyScalar(O),_.copy(m).multiplyScalar(v.x).addScaledVector(h,-E.x).multiplyScalar(O),u[B].add(w),u[L].add(w),u[R].add(w),f[B].add(_),f[L].add(_),f[R].add(_))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let B=0,L=M.length;B<L;++B){const R=M[B],O=R.start,Z=R.count;for(let X=O,J=O+Z;X<J;X+=3)y(e.getX(X+0),e.getX(X+1),e.getX(X+2))}const T=new pe,C=new pe,N=new pe,b=new pe;function k(B){N.fromBufferAttribute(s,B),b.copy(N);const L=u[B];T.copy(L),T.sub(N.multiplyScalar(N.dot(L))).normalize(),C.crossVectors(b,L);const O=C.dot(f[B])<0?-1:1;l.setXYZW(B,T.x,T.y,T.z,O)}for(let B=0,L=M.length;B<L;++B){const R=M[B],O=R.start,Z=R.count;for(let X=O,J=O+Z;X<J;X+=3)k(e.getX(X+0)),k(e.getX(X+1)),k(e.getX(X+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new sr(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let g=0,v=i.count;g<v;g++)i.setXYZ(g,0,0,0);const s=new pe,a=new pe,l=new pe,u=new pe,f=new pe,d=new pe,h=new pe,m=new pe;if(e)for(let g=0,v=e.count;g<v;g+=3){const E=e.getX(g+0),w=e.getX(g+1),_=e.getX(g+2);s.fromBufferAttribute(n,E),a.fromBufferAttribute(n,w),l.fromBufferAttribute(n,_),h.subVectors(l,a),m.subVectors(s,a),h.cross(m),u.fromBufferAttribute(i,E),f.fromBufferAttribute(i,w),d.fromBufferAttribute(i,_),u.add(h),f.add(h),d.add(h),i.setXYZ(E,u.x,u.y,u.z),i.setXYZ(w,f.x,f.y,f.z),i.setXYZ(_,d.x,d.y,d.z)}else for(let g=0,v=n.count;g<v;g+=3)s.fromBufferAttribute(n,g+0),a.fromBufferAttribute(n,g+1),l.fromBufferAttribute(n,g+2),h.subVectors(l,a),m.subVectors(s,a),h.cross(m),i.setXYZ(g+0,h.x,h.y,h.z),i.setXYZ(g+1,h.x,h.y,h.z),i.setXYZ(g+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)wn.fromBufferAttribute(e,n),wn.normalize(),e.setXYZ(n,wn.x,wn.y,wn.z)}toNonIndexed(){function e(u,f){const d=u.array,h=u.itemSize,m=u.normalized,g=new d.constructor(f.length*h);let v=0,E=0;for(let w=0,_=f.length;w<_;w++){u.isInterleavedBufferAttribute?v=f[w]*u.data.stride+u.offset:v=f[w]*h;for(let y=0;y<h;y++)g[E++]=d[v++]}return new sr(g,h,m)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new mo,i=this.index.array,s=this.attributes;for(const u in s){const f=s[u],d=e(f,i);n.setAttribute(u,d)}const a=this.morphAttributes;for(const u in a){const f=[],d=a[u];for(let h=0,m=d.length;h<m;h++){const g=d[h],v=e(g,i);f.push(v)}n.morphAttributes[u]=f}n.morphTargetsRelative=this.morphTargetsRelative;const l=this.groups;for(let u=0,f=l.length;u<f;u++){const d=l[u];n.addGroup(d.start,d.count,d.materialIndex)}return n}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const f=this.parameters;for(const d in f)f[d]!==void 0&&(e[d]=f[d]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const f in i){const d=i[f];e.data.attributes[f]=d.toJSON(e.data)}const s={};let a=!1;for(const f in this.morphAttributes){const d=this.morphAttributes[f],h=[];for(let m=0,g=d.length;m<g;m++){const v=d[m];h.push(v.toJSON(e.data))}h.length>0&&(s[f]=h,a=!0)}a&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const l=this.groups;l.length>0&&(e.data.groups=JSON.parse(JSON.stringify(l)));const u=this.boundingSphere;return u!==null&&(e.data.boundingSphere={center:u.center.toArray(),radius:u.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(n));const s=e.attributes;for(const d in s){const h=s[d];this.setAttribute(d,h.clone(n))}const a=e.morphAttributes;for(const d in a){const h=[],m=a[d];for(let g=0,v=m.length;g<v;g++)h.push(m[g].clone(n));this.morphAttributes[d]=h}this.morphTargetsRelative=e.morphTargetsRelative;const l=e.groups;for(let d=0,h=l.length;d<h;d++){const m=l[d];this.addGroup(m.start,m.count,m.materialIndex)}const u=e.boundingBox;u!==null&&(this.boundingBox=u.clone());const f=e.boundingSphere;return f!==null&&(this.boundingSphere=f.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const tE=new hn,Xs=new yO,ef=new Fv,nE=new pe,tf=new pe,nf=new pe,rf=new pe,$p=new pe,sf=new pe,iE=new pe,of=new pe;class nr extends mi{constructor(e=new mo,n=new KM){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const s=n[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,l=s.length;a<l;a++){const u=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[u]=a}}}}getVertexPosition(e,n){const i=this.geometry,s=i.attributes.position,a=i.morphAttributes.position,l=i.morphTargetsRelative;n.fromBufferAttribute(s,e);const u=this.morphTargetInfluences;if(a&&u){sf.set(0,0,0);for(let f=0,d=a.length;f<d;f++){const h=u[f],m=a[f];h!==0&&($p.fromBufferAttribute(m,e),l?sf.addScaledVector($p,h):sf.addScaledVector($p.sub(n),h))}n.add(sf)}return n}raycast(e,n){const i=this.geometry,s=this.material,a=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ef.copy(i.boundingSphere),ef.applyMatrix4(a),Xs.copy(e.ray).recast(e.near),!(ef.containsPoint(Xs.origin)===!1&&(Xs.intersectSphere(ef,nE)===null||Xs.origin.distanceToSquared(nE)>(e.far-e.near)**2))&&(tE.copy(a).invert(),Xs.copy(e.ray).applyMatrix4(tE),!(i.boundingBox!==null&&Xs.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,Xs)))}_computeIntersections(e,n,i){let s;const a=this.geometry,l=this.material,u=a.index,f=a.attributes.position,d=a.attributes.uv,h=a.attributes.uv1,m=a.attributes.normal,g=a.groups,v=a.drawRange;if(u!==null)if(Array.isArray(l))for(let E=0,w=g.length;E<w;E++){const _=g[E],y=l[_.materialIndex],M=Math.max(_.start,v.start),T=Math.min(u.count,Math.min(_.start+_.count,v.start+v.count));for(let C=M,N=T;C<N;C+=3){const b=u.getX(C),k=u.getX(C+1),B=u.getX(C+2);s=af(this,y,e,i,d,h,m,b,k,B),s&&(s.faceIndex=Math.floor(C/3),s.face.materialIndex=_.materialIndex,n.push(s))}}else{const E=Math.max(0,v.start),w=Math.min(u.count,v.start+v.count);for(let _=E,y=w;_<y;_+=3){const M=u.getX(_),T=u.getX(_+1),C=u.getX(_+2);s=af(this,l,e,i,d,h,m,M,T,C),s&&(s.faceIndex=Math.floor(_/3),n.push(s))}}else if(f!==void 0)if(Array.isArray(l))for(let E=0,w=g.length;E<w;E++){const _=g[E],y=l[_.materialIndex],M=Math.max(_.start,v.start),T=Math.min(f.count,Math.min(_.start+_.count,v.start+v.count));for(let C=M,N=T;C<N;C+=3){const b=C,k=C+1,B=C+2;s=af(this,y,e,i,d,h,m,b,k,B),s&&(s.faceIndex=Math.floor(C/3),s.face.materialIndex=_.materialIndex,n.push(s))}}else{const E=Math.max(0,v.start),w=Math.min(f.count,v.start+v.count);for(let _=E,y=w;_<y;_+=3){const M=_,T=_+1,C=_+2;s=af(this,l,e,i,d,h,m,M,T,C),s&&(s.faceIndex=Math.floor(_/3),n.push(s))}}}}function CO(t,e,n,i,s,a,l,u){let f;if(e.side===ii?f=i.intersectTriangle(l,a,s,!0,u):f=i.intersectTriangle(s,a,l,e.side===Ms,u),f===null)return null;of.copy(u),of.applyMatrix4(t.matrixWorld);const d=n.ray.origin.distanceTo(of);return d<n.near||d>n.far?null:{distance:d,point:of.clone(),object:t}}function af(t,e,n,i,s,a,l,u,f,d){t.getVertexPosition(u,tf),t.getVertexPosition(f,nf),t.getVertexPosition(d,rf);const h=CO(t,e,n,i,tf,nf,rf,iE);if(h){const m=new pe;Hi.getBarycoord(iE,tf,nf,rf,m),s&&(h.uv=Hi.getInterpolatedAttribute(s,u,f,d,m,new Ut)),a&&(h.uv1=Hi.getInterpolatedAttribute(a,u,f,d,m,new Ut)),l&&(h.normal=Hi.getInterpolatedAttribute(l,u,f,d,m,new pe),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const g={a:u,b:f,c:d,normal:new pe,materialIndex:0};Hi.getNormal(tf,nf,rf,g.normal),h.face=g,h.barycoord=m}return h}class mu extends mo{constructor(e=1,n=1,i=1,s=1,a=1,l=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:s,heightSegments:a,depthSegments:l};const u=this;s=Math.floor(s),a=Math.floor(a),l=Math.floor(l);const f=[],d=[],h=[],m=[];let g=0,v=0;E("z","y","x",-1,-1,i,n,e,l,a,0),E("z","y","x",1,-1,i,n,-e,l,a,1),E("x","z","y",1,1,e,i,n,s,l,2),E("x","z","y",1,-1,e,i,-n,s,l,3),E("x","y","z",1,-1,e,n,i,s,a,4),E("x","y","z",-1,-1,e,n,-i,s,a,5),this.setIndex(f),this.setAttribute("position",new uo(d,3)),this.setAttribute("normal",new uo(h,3)),this.setAttribute("uv",new uo(m,2));function E(w,_,y,M,T,C,N,b,k,B,L){const R=C/k,O=N/B,Z=C/2,X=N/2,J=b/2,ne=k+1,le=B+1;let re=0,G=0;const ue=new pe;for(let D=0;D<le;D++){const V=D*O-X;for(let ie=0;ie<ne;ie++){const U=ie*R-Z;ue[w]=U*M,ue[_]=V*T,ue[y]=J,d.push(ue.x,ue.y,ue.z),ue[w]=0,ue[_]=0,ue[y]=b>0?1:-1,h.push(ue.x,ue.y,ue.z),m.push(ie/k),m.push(1-D/B),re+=1}}for(let D=0;D<B;D++)for(let V=0;V<k;V++){const ie=g+V+ne*D,U=g+V+ne*(D+1),ee=g+(V+1)+ne*(D+1),ge=g+(V+1)+ne*D;f.push(ie,U,ge),f.push(U,ee,ge),G+=6}u.addGroup(v,G,L),v+=G,g+=re}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new mu(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Pa(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const s=t[n][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=s.clone():Array.isArray(s)?e[n][i]=s.slice():e[n][i]=s}}return e}function jn(t){const e={};for(let n=0;n<t.length;n++){const i=Pa(t[n]);for(const s in i)e[s]=i[s]}return e}function bO(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function JM(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:It.workingColorSpace}const RO={clone:Pa,merge:jn};var PO=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,DO=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Fr extends fd{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=PO,this.fragmentShader=DO,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Pa(e.uniforms),this.uniformsGroups=bO(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const s in this.uniforms){const l=this.uniforms[s].value;l&&l.isTexture?n.uniforms[s]={type:"t",value:l.toJSON(e).uuid}:l&&l.isColor?n.uniforms[s]={type:"c",value:l.getHex()}:l&&l.isVector2?n.uniforms[s]={type:"v2",value:l.toArray()}:l&&l.isVector3?n.uniforms[s]={type:"v3",value:l.toArray()}:l&&l.isVector4?n.uniforms[s]={type:"v4",value:l.toArray()}:l&&l.isMatrix3?n.uniforms[s]={type:"m3",value:l.toArray()}:l&&l.isMatrix4?n.uniforms[s]={type:"m4",value:l.toArray()}:n.uniforms[s]={value:l}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class eT extends mi{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new hn,this.projectionMatrix=new hn,this.projectionMatrixInverse=new hn,this.coordinateSystem=Rr}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ps=new pe,rE=new Ut,sE=new Ut;class Vi extends eT{constructor(e=50,n=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=wg*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Cp*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return wg*2*Math.atan(Math.tan(Cp*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){ps.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ps.x,ps.y).multiplyScalar(-e/ps.z),ps.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ps.x,ps.y).multiplyScalar(-e/ps.z)}getViewSize(e,n){return this.getViewBounds(e,rE,sE),n.subVectors(sE,rE)}setViewOffset(e,n,i,s,a,l){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=l,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(Cp*.5*this.fov)/this.zoom,i=2*n,s=this.aspect*i,a=-.5*s;const l=this.view;if(this.view!==null&&this.view.enabled){const f=l.fullWidth,d=l.fullHeight;a+=l.offsetX*s/f,n-=l.offsetY*i/d,s*=l.width/f,i*=l.height/d}const u=this.filmOffset;u!==0&&(a+=e*u/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+s,n,n-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const Jo=-90,ea=1;class LO extends mi{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Vi(Jo,ea,e,n);s.layers=this.layers,this.add(s);const a=new Vi(Jo,ea,e,n);a.layers=this.layers,this.add(a);const l=new Vi(Jo,ea,e,n);l.layers=this.layers,this.add(l);const u=new Vi(Jo,ea,e,n);u.layers=this.layers,this.add(u);const f=new Vi(Jo,ea,e,n);f.layers=this.layers,this.add(f);const d=new Vi(Jo,ea,e,n);d.layers=this.layers,this.add(d)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,s,a,l,u,f]=n;for(const d of n)this.remove(d);if(e===Rr)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),l.up.set(0,0,1),l.lookAt(0,-1,0),u.up.set(0,1,0),u.lookAt(0,0,1),f.up.set(0,1,0),f.lookAt(0,0,-1);else if(e===Wf)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),l.up.set(0,0,-1),l.lookAt(0,-1,0),u.up.set(0,-1,0),u.lookAt(0,0,1),f.up.set(0,-1,0),f.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const d of n)this.add(d),d.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,l,u,f,d,h]=this.children,m=e.getRenderTarget(),g=e.getActiveCubeFace(),v=e.getActiveMipmapLevel(),E=e.xr.enabled;e.xr.enabled=!1;const w=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(n,a),e.setRenderTarget(i,1,s),e.render(n,l),e.setRenderTarget(i,2,s),e.render(n,u),e.setRenderTarget(i,3,s),e.render(n,f),e.setRenderTarget(i,4,s),e.render(n,d),i.texture.generateMipmaps=w,e.setRenderTarget(i,5,s),e.render(n,h),e.setRenderTarget(m,g,v),e.xr.enabled=E,i.texture.needsPMREMUpdate=!0}}class tT extends ri{constructor(e,n,i,s,a,l,u,f,d,h){e=e!==void 0?e:[],n=n!==void 0?n:Ta,super(e,n,i,s,a,l,u,f,d,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class IO extends fo{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new tT(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:tr}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new mu(5,5,5),a=new Fr({name:"CubemapFromEquirect",uniforms:Pa(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:ii,blending:xs});a.uniforms.tEquirect.value=n;const l=new nr(s,a),u=n.minFilter;return n.minFilter===so&&(n.minFilter=tr),new LO(1,10,this).update(e,l),n.minFilter=u,l.geometry.dispose(),l.material.dispose(),this}clear(e,n,i,s){const a=e.getRenderTarget();for(let l=0;l<6;l++)e.setRenderTarget(this,l),e.clear(n,i,s);e.setRenderTarget(a)}}class kO extends mi{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ur,this.environmentIntensity=1,this.environmentRotation=new Ur,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}const qp=new pe,NO=new pe,UO=new gt;class Qs{constructor(e=new pe(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,s){return this.normal.set(e,n,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const s=qp.subVectors(i,n).cross(NO.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const i=e.delta(qp),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return a<0||a>1?null:n.copy(e.start).addScaledVector(i,a)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||UO.getNormalMatrix(e),s=this.coplanarPoint(qp).applyMatrix4(e),a=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const $s=new Fv,lf=new pe;class nT{constructor(e=new Qs,n=new Qs,i=new Qs,s=new Qs,a=new Qs,l=new Qs){this.planes=[e,n,i,s,a,l]}set(e,n,i,s,a,l){const u=this.planes;return u[0].copy(e),u[1].copy(n),u[2].copy(i),u[3].copy(s),u[4].copy(a),u[5].copy(l),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=Rr){const i=this.planes,s=e.elements,a=s[0],l=s[1],u=s[2],f=s[3],d=s[4],h=s[5],m=s[6],g=s[7],v=s[8],E=s[9],w=s[10],_=s[11],y=s[12],M=s[13],T=s[14],C=s[15];if(i[0].setComponents(f-a,g-d,_-v,C-y).normalize(),i[1].setComponents(f+a,g+d,_+v,C+y).normalize(),i[2].setComponents(f+l,g+h,_+E,C+M).normalize(),i[3].setComponents(f-l,g-h,_-E,C-M).normalize(),i[4].setComponents(f-u,g-m,_-w,C-T).normalize(),n===Rr)i[5].setComponents(f+u,g+m,_+w,C+T).normalize();else if(n===Wf)i[5].setComponents(u,m,w,T).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),$s.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),$s.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere($s)}intersectsSprite(e){return $s.center.set(0,0,0),$s.radius=.7071067811865476,$s.applyMatrix4(e.matrixWorld),this.intersectsSphere($s)}intersectsSphere(e){const n=this.planes,i=e.center,s=-e.radius;for(let a=0;a<6;a++)if(n[a].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const s=n[i];if(lf.x=s.normal.x>0?e.max.x:e.min.x,lf.y=s.normal.y>0?e.max.y:e.min.y,lf.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(lf)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class uf extends mi{constructor(){super(),this.isGroup=!0,this.type="Group"}}class iT extends ri{constructor(e,n,i,s,a,l,u,f,d,h=ha){if(h!==ha&&h!==ba)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===ha&&(i=co),i===void 0&&h===ba&&(i=Ca),super(null,s,a,l,u,f,h,i,d),this.isDepthTexture=!0,this.image={width:e,height:n},this.magFilter=u!==void 0?u:ji,this.minFilter=f!==void 0?f:ji,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class gu extends mo{constructor(e=1,n=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:s};const a=e/2,l=n/2,u=Math.floor(i),f=Math.floor(s),d=u+1,h=f+1,m=e/u,g=n/f,v=[],E=[],w=[],_=[];for(let y=0;y<h;y++){const M=y*g-l;for(let T=0;T<d;T++){const C=T*m-a;E.push(C,-M,0),w.push(0,0,1),_.push(T/u),_.push(1-y/f)}}for(let y=0;y<f;y++)for(let M=0;M<u;M++){const T=M+d*y,C=M+d*(y+1),N=M+1+d*(y+1),b=M+1+d*y;v.push(T,C,b),v.push(C,N,b)}this.setIndex(v),this.setAttribute("position",new uo(E,3)),this.setAttribute("normal",new uo(w,3)),this.setAttribute("uv",new uo(_,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new gu(e.width,e.height,e.widthSegments,e.heightSegments)}}class FO extends fd{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=YF,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class OO extends fd{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class rT extends eT{constructor(e=-1,n=1,i=1,s=-1,a=.1,l=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=s,this.near=a,this.far=l,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,s,a,l){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=l,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let a=i-e,l=i+e,u=s+n,f=s-n;if(this.view!==null&&this.view.enabled){const d=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=d*this.view.offsetX,l=a+d*this.view.width,u-=h*this.view.offsetY,f=u-h*this.view.height}this.projectionMatrix.makeOrthographic(a,l,u,f,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}class BO extends Vi{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}function oE(t,e,n,i){const s=zO(i);switch(n){case FM:return t*e;case BM:return t*e;case zM:return t*e*2;case VM:return t*e/s.components*s.byteLength;case kv:return t*e/s.components*s.byteLength;case HM:return t*e*2/s.components*s.byteLength;case Nv:return t*e*2/s.components*s.byteLength;case OM:return t*e*3/s.components*s.byteLength;case Gi:return t*e*4/s.components*s.byteLength;case Uv:return t*e*4/s.components*s.byteLength;case Mf:case Tf:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case Af:case Cf:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Qm:case eg:return Math.max(t,16)*Math.max(e,8)/4;case Zm:case Jm:return Math.max(t,8)*Math.max(e,8)/2;case tg:case ng:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case ig:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case rg:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case sg:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case og:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case ag:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case lg:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case ug:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case cg:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case fg:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case dg:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case hg:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case pg:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case mg:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case gg:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case vg:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case bf:case yg:case xg:return Math.ceil(t/4)*Math.ceil(e/4)*16;case GM:case _g:return Math.ceil(t/4)*Math.ceil(e/4)*8;case Sg:case Eg:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function zO(t){switch(t){case Nr:case kM:return{byteLength:1,components:1};case Ql:case NM:case fu:return{byteLength:2,components:1};case Lv:case Iv:return{byteLength:2,components:4};case co:case Dv:case br:return{byteLength:4,components:1};case UM:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${t}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Pv}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Pv);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function sT(){let t=null,e=!1,n=null,i=null;function s(a,l){n(a,l),i=t.requestAnimationFrame(s)}return{start:function(){e!==!0&&n!==null&&(i=t.requestAnimationFrame(s),e=!0)},stop:function(){t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(a){n=a},setContext:function(a){t=a}}}function VO(t){const e=new WeakMap;function n(u,f){const d=u.array,h=u.usage,m=d.byteLength,g=t.createBuffer();t.bindBuffer(f,g),t.bufferData(f,d,h),u.onUploadCallback();let v;if(d instanceof Float32Array)v=t.FLOAT;else if(d instanceof Uint16Array)u.isFloat16BufferAttribute?v=t.HALF_FLOAT:v=t.UNSIGNED_SHORT;else if(d instanceof Int16Array)v=t.SHORT;else if(d instanceof Uint32Array)v=t.UNSIGNED_INT;else if(d instanceof Int32Array)v=t.INT;else if(d instanceof Int8Array)v=t.BYTE;else if(d instanceof Uint8Array)v=t.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)v=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:g,type:v,bytesPerElement:d.BYTES_PER_ELEMENT,version:u.version,size:m}}function i(u,f,d){const h=f.array,m=f.updateRanges;if(t.bindBuffer(d,u),m.length===0)t.bufferSubData(d,0,h);else{m.sort((v,E)=>v.start-E.start);let g=0;for(let v=1;v<m.length;v++){const E=m[g],w=m[v];w.start<=E.start+E.count+1?E.count=Math.max(E.count,w.start+w.count-E.start):(++g,m[g]=w)}m.length=g+1;for(let v=0,E=m.length;v<E;v++){const w=m[v];t.bufferSubData(d,w.start*h.BYTES_PER_ELEMENT,h,w.start,w.count)}f.clearUpdateRanges()}f.onUploadCallback()}function s(u){return u.isInterleavedBufferAttribute&&(u=u.data),e.get(u)}function a(u){u.isInterleavedBufferAttribute&&(u=u.data);const f=e.get(u);f&&(t.deleteBuffer(f.buffer),e.delete(u))}function l(u,f){if(u.isInterleavedBufferAttribute&&(u=u.data),u.isGLBufferAttribute){const h=e.get(u);(!h||h.version<u.version)&&e.set(u,{buffer:u.buffer,type:u.type,bytesPerElement:u.elementSize,version:u.version});return}const d=e.get(u);if(d===void 0)e.set(u,n(u,f));else if(d.version<u.version){if(d.size!==u.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(d.buffer,u,f),d.version=u.version}}return{get:s,remove:a,update:l}}var HO=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,GO=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,WO=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,jO=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,XO=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,$O=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,qO=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,YO=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,KO=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,ZO=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,QO=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,JO=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,eB=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,tB=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,nB=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,iB=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,rB=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,sB=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,oB=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,aB=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,lB=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,uB=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,cB=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,fB=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,dB=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,hB=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,pB=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,mB=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,gB=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,vB=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,yB="gl_FragColor = linearToOutputTexel( gl_FragColor );",xB=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,_B=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,SB=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,EB=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,wB=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,MB=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,TB=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,AB=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,CB=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,bB=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,RB=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,PB=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,DB=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,LB=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,IB=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,kB=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,NB=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,UB=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,FB=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,OB=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,BB=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,zB=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,VB=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,HB=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,GB=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,WB=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,jB=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,XB=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,$B=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,qB=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,YB=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,KB=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,ZB=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,QB=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,JB=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ez=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,tz=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,nz=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,iz=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,rz=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,sz=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,oz=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,az=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,lz=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,uz=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,cz=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,fz=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,dz=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,hz=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,pz=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,mz=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,gz=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,vz=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,yz=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,xz=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,_z=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Sz=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ez=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,wz=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Mz=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Tz=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Az=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Cz=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,bz=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Rz=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Pz=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Dz=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Lz=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Iz=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,kz=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Nz=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Uz=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Fz=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Oz=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Bz=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,zz=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Vz=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Hz=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Gz=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Wz=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jz=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Xz=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$z=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,qz=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Yz=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Kz=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Zz=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Qz=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jz=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,e4=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,t4=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,n4=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,i4=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,r4=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,s4=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,o4=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,a4=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,l4=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,u4=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,c4=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,f4=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,d4=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,h4=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,p4=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,m4=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,g4=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,v4=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,y4=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,x4=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,_4=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,xt={alphahash_fragment:HO,alphahash_pars_fragment:GO,alphamap_fragment:WO,alphamap_pars_fragment:jO,alphatest_fragment:XO,alphatest_pars_fragment:$O,aomap_fragment:qO,aomap_pars_fragment:YO,batching_pars_vertex:KO,batching_vertex:ZO,begin_vertex:QO,beginnormal_vertex:JO,bsdfs:eB,iridescence_fragment:tB,bumpmap_pars_fragment:nB,clipping_planes_fragment:iB,clipping_planes_pars_fragment:rB,clipping_planes_pars_vertex:sB,clipping_planes_vertex:oB,color_fragment:aB,color_pars_fragment:lB,color_pars_vertex:uB,color_vertex:cB,common:fB,cube_uv_reflection_fragment:dB,defaultnormal_vertex:hB,displacementmap_pars_vertex:pB,displacementmap_vertex:mB,emissivemap_fragment:gB,emissivemap_pars_fragment:vB,colorspace_fragment:yB,colorspace_pars_fragment:xB,envmap_fragment:_B,envmap_common_pars_fragment:SB,envmap_pars_fragment:EB,envmap_pars_vertex:wB,envmap_physical_pars_fragment:kB,envmap_vertex:MB,fog_vertex:TB,fog_pars_vertex:AB,fog_fragment:CB,fog_pars_fragment:bB,gradientmap_pars_fragment:RB,lightmap_pars_fragment:PB,lights_lambert_fragment:DB,lights_lambert_pars_fragment:LB,lights_pars_begin:IB,lights_toon_fragment:NB,lights_toon_pars_fragment:UB,lights_phong_fragment:FB,lights_phong_pars_fragment:OB,lights_physical_fragment:BB,lights_physical_pars_fragment:zB,lights_fragment_begin:VB,lights_fragment_maps:HB,lights_fragment_end:GB,logdepthbuf_fragment:WB,logdepthbuf_pars_fragment:jB,logdepthbuf_pars_vertex:XB,logdepthbuf_vertex:$B,map_fragment:qB,map_pars_fragment:YB,map_particle_fragment:KB,map_particle_pars_fragment:ZB,metalnessmap_fragment:QB,metalnessmap_pars_fragment:JB,morphinstance_vertex:ez,morphcolor_vertex:tz,morphnormal_vertex:nz,morphtarget_pars_vertex:iz,morphtarget_vertex:rz,normal_fragment_begin:sz,normal_fragment_maps:oz,normal_pars_fragment:az,normal_pars_vertex:lz,normal_vertex:uz,normalmap_pars_fragment:cz,clearcoat_normal_fragment_begin:fz,clearcoat_normal_fragment_maps:dz,clearcoat_pars_fragment:hz,iridescence_pars_fragment:pz,opaque_fragment:mz,packing:gz,premultiplied_alpha_fragment:vz,project_vertex:yz,dithering_fragment:xz,dithering_pars_fragment:_z,roughnessmap_fragment:Sz,roughnessmap_pars_fragment:Ez,shadowmap_pars_fragment:wz,shadowmap_pars_vertex:Mz,shadowmap_vertex:Tz,shadowmask_pars_fragment:Az,skinbase_vertex:Cz,skinning_pars_vertex:bz,skinning_vertex:Rz,skinnormal_vertex:Pz,specularmap_fragment:Dz,specularmap_pars_fragment:Lz,tonemapping_fragment:Iz,tonemapping_pars_fragment:kz,transmission_fragment:Nz,transmission_pars_fragment:Uz,uv_pars_fragment:Fz,uv_pars_vertex:Oz,uv_vertex:Bz,worldpos_vertex:zz,background_vert:Vz,background_frag:Hz,backgroundCube_vert:Gz,backgroundCube_frag:Wz,cube_vert:jz,cube_frag:Xz,depth_vert:$z,depth_frag:qz,distanceRGBA_vert:Yz,distanceRGBA_frag:Kz,equirect_vert:Zz,equirect_frag:Qz,linedashed_vert:Jz,linedashed_frag:e4,meshbasic_vert:t4,meshbasic_frag:n4,meshlambert_vert:i4,meshlambert_frag:r4,meshmatcap_vert:s4,meshmatcap_frag:o4,meshnormal_vert:a4,meshnormal_frag:l4,meshphong_vert:u4,meshphong_frag:c4,meshphysical_vert:f4,meshphysical_frag:d4,meshtoon_vert:h4,meshtoon_frag:p4,points_vert:m4,points_frag:g4,shadow_vert:v4,shadow_frag:y4,sprite_vert:x4,sprite_frag:_4},Ne={common:{diffuse:{value:new zt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new gt},alphaMap:{value:null},alphaMapTransform:{value:new gt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new gt}},envmap:{envMap:{value:null},envMapRotation:{value:new gt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new gt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new gt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new gt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new gt},normalScale:{value:new Ut(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new gt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new gt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new gt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new gt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new zt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new zt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new gt},alphaTest:{value:0},uvTransform:{value:new gt}},sprite:{diffuse:{value:new zt(16777215)},opacity:{value:1},center:{value:new Ut(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new gt},alphaMap:{value:null},alphaMapTransform:{value:new gt},alphaTest:{value:0}}},Ji={basic:{uniforms:jn([Ne.common,Ne.specularmap,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.fog]),vertexShader:xt.meshbasic_vert,fragmentShader:xt.meshbasic_frag},lambert:{uniforms:jn([Ne.common,Ne.specularmap,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.fog,Ne.lights,{emissive:{value:new zt(0)}}]),vertexShader:xt.meshlambert_vert,fragmentShader:xt.meshlambert_frag},phong:{uniforms:jn([Ne.common,Ne.specularmap,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.fog,Ne.lights,{emissive:{value:new zt(0)},specular:{value:new zt(1118481)},shininess:{value:30}}]),vertexShader:xt.meshphong_vert,fragmentShader:xt.meshphong_frag},standard:{uniforms:jn([Ne.common,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.roughnessmap,Ne.metalnessmap,Ne.fog,Ne.lights,{emissive:{value:new zt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:xt.meshphysical_vert,fragmentShader:xt.meshphysical_frag},toon:{uniforms:jn([Ne.common,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.gradientmap,Ne.fog,Ne.lights,{emissive:{value:new zt(0)}}]),vertexShader:xt.meshtoon_vert,fragmentShader:xt.meshtoon_frag},matcap:{uniforms:jn([Ne.common,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.fog,{matcap:{value:null}}]),vertexShader:xt.meshmatcap_vert,fragmentShader:xt.meshmatcap_frag},points:{uniforms:jn([Ne.points,Ne.fog]),vertexShader:xt.points_vert,fragmentShader:xt.points_frag},dashed:{uniforms:jn([Ne.common,Ne.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:xt.linedashed_vert,fragmentShader:xt.linedashed_frag},depth:{uniforms:jn([Ne.common,Ne.displacementmap]),vertexShader:xt.depth_vert,fragmentShader:xt.depth_frag},normal:{uniforms:jn([Ne.common,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,{opacity:{value:1}}]),vertexShader:xt.meshnormal_vert,fragmentShader:xt.meshnormal_frag},sprite:{uniforms:jn([Ne.sprite,Ne.fog]),vertexShader:xt.sprite_vert,fragmentShader:xt.sprite_frag},background:{uniforms:{uvTransform:{value:new gt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:xt.background_vert,fragmentShader:xt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new gt}},vertexShader:xt.backgroundCube_vert,fragmentShader:xt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:xt.cube_vert,fragmentShader:xt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:xt.equirect_vert,fragmentShader:xt.equirect_frag},distanceRGBA:{uniforms:jn([Ne.common,Ne.displacementmap,{referencePosition:{value:new pe},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:xt.distanceRGBA_vert,fragmentShader:xt.distanceRGBA_frag},shadow:{uniforms:jn([Ne.lights,Ne.fog,{color:{value:new zt(0)},opacity:{value:1}}]),vertexShader:xt.shadow_vert,fragmentShader:xt.shadow_frag}};Ji.physical={uniforms:jn([Ji.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new gt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new gt},clearcoatNormalScale:{value:new Ut(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new gt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new gt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new gt},sheen:{value:0},sheenColor:{value:new zt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new gt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new gt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new gt},transmissionSamplerSize:{value:new Ut},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new gt},attenuationDistance:{value:0},attenuationColor:{value:new zt(0)},specularColor:{value:new zt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new gt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new gt},anisotropyVector:{value:new Ut},anisotropyMap:{value:null},anisotropyMapTransform:{value:new gt}}]),vertexShader:xt.meshphysical_vert,fragmentShader:xt.meshphysical_frag};const cf={r:0,b:0,g:0},qs=new Ur,S4=new hn;function E4(t,e,n,i,s,a,l){const u=new zt(0);let f=a===!0?0:1,d,h,m=null,g=0,v=null;function E(T){let C=T.isScene===!0?T.background:null;return C&&C.isTexture&&(C=(T.backgroundBlurriness>0?n:e).get(C)),C}function w(T){let C=!1;const N=E(T);N===null?y(u,f):N&&N.isColor&&(y(N,1),C=!0);const b=t.xr.getEnvironmentBlendMode();b==="additive"?i.buffers.color.setClear(0,0,0,1,l):b==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,l),(t.autoClear||C)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function _(T,C){const N=E(C);N&&(N.isCubeTexture||N.mapping===cd)?(h===void 0&&(h=new nr(new mu(1,1,1),new Fr({name:"BackgroundCubeMaterial",uniforms:Pa(Ji.backgroundCube.uniforms),vertexShader:Ji.backgroundCube.vertexShader,fragmentShader:Ji.backgroundCube.fragmentShader,side:ii,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(b,k,B){this.matrixWorld.copyPosition(B.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),qs.copy(C.backgroundRotation),qs.x*=-1,qs.y*=-1,qs.z*=-1,N.isCubeTexture&&N.isRenderTargetTexture===!1&&(qs.y*=-1,qs.z*=-1),h.material.uniforms.envMap.value=N,h.material.uniforms.flipEnvMap.value=N.isCubeTexture&&N.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=C.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(S4.makeRotationFromEuler(qs)),h.material.toneMapped=It.getTransfer(N.colorSpace)!==Bt,(m!==N||g!==N.version||v!==t.toneMapping)&&(h.material.needsUpdate=!0,m=N,g=N.version,v=t.toneMapping),h.layers.enableAll(),T.unshift(h,h.geometry,h.material,0,0,null)):N&&N.isTexture&&(d===void 0&&(d=new nr(new gu(2,2),new Fr({name:"BackgroundMaterial",uniforms:Pa(Ji.background.uniforms),vertexShader:Ji.background.vertexShader,fragmentShader:Ji.background.fragmentShader,side:Ms,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),Object.defineProperty(d.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(d)),d.material.uniforms.t2D.value=N,d.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,d.material.toneMapped=It.getTransfer(N.colorSpace)!==Bt,N.matrixAutoUpdate===!0&&N.updateMatrix(),d.material.uniforms.uvTransform.value.copy(N.matrix),(m!==N||g!==N.version||v!==t.toneMapping)&&(d.material.needsUpdate=!0,m=N,g=N.version,v=t.toneMapping),d.layers.enableAll(),T.unshift(d,d.geometry,d.material,0,0,null))}function y(T,C){T.getRGB(cf,JM(t)),i.buffers.color.setClear(cf.r,cf.g,cf.b,C,l)}function M(){h!==void 0&&(h.geometry.dispose(),h.material.dispose()),d!==void 0&&(d.geometry.dispose(),d.material.dispose())}return{getClearColor:function(){return u},setClearColor:function(T,C=1){u.set(T),f=C,y(u,f)},getClearAlpha:function(){return f},setClearAlpha:function(T){f=T,y(u,f)},render:w,addToRenderList:_,dispose:M}}function w4(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},s=g(null);let a=s,l=!1;function u(R,O,Z,X,J){let ne=!1;const le=m(X,Z,O);a!==le&&(a=le,d(a.object)),ne=v(R,X,Z,J),ne&&E(R,X,Z,J),J!==null&&e.update(J,t.ELEMENT_ARRAY_BUFFER),(ne||l)&&(l=!1,C(R,O,Z,X),J!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(J).buffer))}function f(){return t.createVertexArray()}function d(R){return t.bindVertexArray(R)}function h(R){return t.deleteVertexArray(R)}function m(R,O,Z){const X=Z.wireframe===!0;let J=i[R.id];J===void 0&&(J={},i[R.id]=J);let ne=J[O.id];ne===void 0&&(ne={},J[O.id]=ne);let le=ne[X];return le===void 0&&(le=g(f()),ne[X]=le),le}function g(R){const O=[],Z=[],X=[];for(let J=0;J<n;J++)O[J]=0,Z[J]=0,X[J]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:Z,attributeDivisors:X,object:R,attributes:{},index:null}}function v(R,O,Z,X){const J=a.attributes,ne=O.attributes;let le=0;const re=Z.getAttributes();for(const G in re)if(re[G].location>=0){const D=J[G];let V=ne[G];if(V===void 0&&(G==="instanceMatrix"&&R.instanceMatrix&&(V=R.instanceMatrix),G==="instanceColor"&&R.instanceColor&&(V=R.instanceColor)),D===void 0||D.attribute!==V||V&&D.data!==V.data)return!0;le++}return a.attributesNum!==le||a.index!==X}function E(R,O,Z,X){const J={},ne=O.attributes;let le=0;const re=Z.getAttributes();for(const G in re)if(re[G].location>=0){let D=ne[G];D===void 0&&(G==="instanceMatrix"&&R.instanceMatrix&&(D=R.instanceMatrix),G==="instanceColor"&&R.instanceColor&&(D=R.instanceColor));const V={};V.attribute=D,D&&D.data&&(V.data=D.data),J[G]=V,le++}a.attributes=J,a.attributesNum=le,a.index=X}function w(){const R=a.newAttributes;for(let O=0,Z=R.length;O<Z;O++)R[O]=0}function _(R){y(R,0)}function y(R,O){const Z=a.newAttributes,X=a.enabledAttributes,J=a.attributeDivisors;Z[R]=1,X[R]===0&&(t.enableVertexAttribArray(R),X[R]=1),J[R]!==O&&(t.vertexAttribDivisor(R,O),J[R]=O)}function M(){const R=a.newAttributes,O=a.enabledAttributes;for(let Z=0,X=O.length;Z<X;Z++)O[Z]!==R[Z]&&(t.disableVertexAttribArray(Z),O[Z]=0)}function T(R,O,Z,X,J,ne,le){le===!0?t.vertexAttribIPointer(R,O,Z,J,ne):t.vertexAttribPointer(R,O,Z,X,J,ne)}function C(R,O,Z,X){w();const J=X.attributes,ne=Z.getAttributes(),le=O.defaultAttributeValues;for(const re in ne){const G=ne[re];if(G.location>=0){let ue=J[re];if(ue===void 0&&(re==="instanceMatrix"&&R.instanceMatrix&&(ue=R.instanceMatrix),re==="instanceColor"&&R.instanceColor&&(ue=R.instanceColor)),ue!==void 0){const D=ue.normalized,V=ue.itemSize,ie=e.get(ue);if(ie===void 0)continue;const U=ie.buffer,ee=ie.type,ge=ie.bytesPerElement,ye=ee===t.INT||ee===t.UNSIGNED_INT||ue.gpuType===Dv;if(ue.isInterleavedBufferAttribute){const Se=ue.data,Re=Se.stride,Le=ue.offset;if(Se.isInstancedInterleavedBuffer){for(let $e=0;$e<G.locationSize;$e++)y(G.location+$e,Se.meshPerAttribute);R.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=Se.meshPerAttribute*Se.count)}else for(let $e=0;$e<G.locationSize;$e++)_(G.location+$e);t.bindBuffer(t.ARRAY_BUFFER,U);for(let $e=0;$e<G.locationSize;$e++)T(G.location+$e,V/G.locationSize,ee,D,Re*ge,(Le+V/G.locationSize*$e)*ge,ye)}else{if(ue.isInstancedBufferAttribute){for(let Se=0;Se<G.locationSize;Se++)y(G.location+Se,ue.meshPerAttribute);R.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let Se=0;Se<G.locationSize;Se++)_(G.location+Se);t.bindBuffer(t.ARRAY_BUFFER,U);for(let Se=0;Se<G.locationSize;Se++)T(G.location+Se,V/G.locationSize,ee,D,V*ge,V/G.locationSize*Se*ge,ye)}}else if(le!==void 0){const D=le[re];if(D!==void 0)switch(D.length){case 2:t.vertexAttrib2fv(G.location,D);break;case 3:t.vertexAttrib3fv(G.location,D);break;case 4:t.vertexAttrib4fv(G.location,D);break;default:t.vertexAttrib1fv(G.location,D)}}}}M()}function N(){B();for(const R in i){const O=i[R];for(const Z in O){const X=O[Z];for(const J in X)h(X[J].object),delete X[J];delete O[Z]}delete i[R]}}function b(R){if(i[R.id]===void 0)return;const O=i[R.id];for(const Z in O){const X=O[Z];for(const J in X)h(X[J].object),delete X[J];delete O[Z]}delete i[R.id]}function k(R){for(const O in i){const Z=i[O];if(Z[R.id]===void 0)continue;const X=Z[R.id];for(const J in X)h(X[J].object),delete X[J];delete Z[R.id]}}function B(){L(),l=!0,a!==s&&(a=s,d(a.object))}function L(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:u,reset:B,resetDefaultState:L,dispose:N,releaseStatesOfGeometry:b,releaseStatesOfProgram:k,initAttributes:w,enableAttribute:_,disableUnusedAttributes:M}}function M4(t,e,n){let i;function s(d){i=d}function a(d,h){t.drawArrays(i,d,h),n.update(h,i,1)}function l(d,h,m){m!==0&&(t.drawArraysInstanced(i,d,h,m),n.update(h,i,m))}function u(d,h,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,d,0,h,0,m);let v=0;for(let E=0;E<m;E++)v+=h[E];n.update(v,i,1)}function f(d,h,m,g){if(m===0)return;const v=e.get("WEBGL_multi_draw");if(v===null)for(let E=0;E<d.length;E++)l(d[E],h[E],g[E]);else{v.multiDrawArraysInstancedWEBGL(i,d,0,h,0,g,0,m);let E=0;for(let w=0;w<m;w++)E+=h[w]*g[w];n.update(E,i,1)}}this.setMode=s,this.render=a,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=f}function T4(t,e,n,i){let s;function a(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const k=e.get("EXT_texture_filter_anisotropic");s=t.getParameter(k.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function l(k){return!(k!==Gi&&i.convert(k)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function u(k){const B=k===fu&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(k!==Nr&&i.convert(k)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&k!==br&&!B)}function f(k){if(k==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";k="mediump"}return k==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let d=n.precision!==void 0?n.precision:"highp";const h=f(d);h!==d&&(console.warn("THREE.WebGLRenderer:",d,"not supported, using",h,"instead."),d=h);const m=n.logarithmicDepthBuffer===!0,g=n.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),v=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),E=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),w=t.getParameter(t.MAX_TEXTURE_SIZE),_=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),y=t.getParameter(t.MAX_VERTEX_ATTRIBS),M=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),T=t.getParameter(t.MAX_VARYING_VECTORS),C=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),N=E>0,b=t.getParameter(t.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:f,textureFormatReadable:l,textureTypeReadable:u,precision:d,logarithmicDepthBuffer:m,reverseDepthBuffer:g,maxTextures:v,maxVertexTextures:E,maxTextureSize:w,maxCubemapSize:_,maxAttributes:y,maxVertexUniforms:M,maxVaryings:T,maxFragmentUniforms:C,vertexTextures:N,maxSamples:b}}function A4(t){const e=this;let n=null,i=0,s=!1,a=!1;const l=new Qs,u=new gt,f={value:null,needsUpdate:!1};this.uniform=f,this.numPlanes=0,this.numIntersection=0,this.init=function(m,g){const v=m.length!==0||g||i!==0||s;return s=g,i=m.length,v},this.beginShadows=function(){a=!0,h(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(m,g){n=h(m,g,0)},this.setState=function(m,g,v){const E=m.clippingPlanes,w=m.clipIntersection,_=m.clipShadows,y=t.get(m);if(!s||E===null||E.length===0||a&&!_)a?h(null):d();else{const M=a?0:i,T=M*4;let C=y.clippingState||null;f.value=C,C=h(E,g,T,v);for(let N=0;N!==T;++N)C[N]=n[N];y.clippingState=C,this.numIntersection=w?this.numPlanes:0,this.numPlanes+=M}};function d(){f.value!==n&&(f.value=n,f.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(m,g,v,E){const w=m!==null?m.length:0;let _=null;if(w!==0){if(_=f.value,E!==!0||_===null){const y=v+w*4,M=g.matrixWorldInverse;u.getNormalMatrix(M),(_===null||_.length<y)&&(_=new Float32Array(y));for(let T=0,C=v;T!==w;++T,C+=4)l.copy(m[T]).applyMatrix4(M,u),l.normal.toArray(_,C),_[C+3]=l.constant}f.value=_,f.needsUpdate=!0}return e.numPlanes=w,e.numIntersection=0,_}}function C4(t){let e=new WeakMap;function n(l,u){return u===$m?l.mapping=Ta:u===qm&&(l.mapping=Aa),l}function i(l){if(l&&l.isTexture){const u=l.mapping;if(u===$m||u===qm)if(e.has(l)){const f=e.get(l).texture;return n(f,l.mapping)}else{const f=l.image;if(f&&f.height>0){const d=new IO(f.height);return d.fromEquirectangularTexture(t,l),e.set(l,d),l.addEventListener("dispose",s),n(d.texture,l.mapping)}else return null}}return l}function s(l){const u=l.target;u.removeEventListener("dispose",s);const f=e.get(u);f!==void 0&&(e.delete(u),f.dispose())}function a(){e=new WeakMap}return{get:i,dispose:a}}const ua=4,aE=[.125,.215,.35,.446,.526,.582],to=20,Yp=new rT,lE=new zt;let Kp=null,Zp=0,Qp=0,Jp=!1;const Js=(1+Math.sqrt(5))/2,ta=1/Js,uE=[new pe(-Js,ta,0),new pe(Js,ta,0),new pe(-ta,0,Js),new pe(ta,0,Js),new pe(0,Js,-ta),new pe(0,Js,ta),new pe(-1,1,-1),new pe(1,1,-1),new pe(-1,1,1),new pe(1,1,1)];class cE{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,i=.1,s=100){Kp=this._renderer.getRenderTarget(),Zp=this._renderer.getActiveCubeFace(),Qp=this._renderer.getActiveMipmapLevel(),Jp=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const a=this._allocateTargets();return a.depthBuffer=!0,this._sceneToCubeUV(e,i,s,a),n>0&&this._blur(a,0,0,n),this._applyPMREM(a),this._cleanup(a),a}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=hE(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=dE(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Kp,Zp,Qp),this._renderer.xr.enabled=Jp,e.scissorTest=!1,ff(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Ta||e.mapping===Aa?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Kp=this._renderer.getRenderTarget(),Zp=this._renderer.getActiveCubeFace(),Qp=this._renderer.getActiveMipmapLevel(),Jp=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:tr,minFilter:tr,generateMipmaps:!1,type:fu,format:Gi,colorSpace:Ra,depthBuffer:!1},s=fE(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=fE(e,n,i);const{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=b4(a)),this._blurMaterial=R4(a,e,n)}return s}_compileMaterial(e){const n=new nr(this._lodPlanes[0],e);this._renderer.compile(n,Yp)}_sceneToCubeUV(e,n,i,s){const u=new Vi(90,1,n,i),f=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],h=this._renderer,m=h.autoClear,g=h.toneMapping;h.getClearColor(lE),h.toneMapping=_s,h.autoClear=!1;const v=new KM({name:"PMREM.Background",side:ii,depthWrite:!1,depthTest:!1}),E=new nr(new mu,v);let w=!1;const _=e.background;_?_.isColor&&(v.color.copy(_),e.background=null,w=!0):(v.color.copy(lE),w=!0);for(let y=0;y<6;y++){const M=y%3;M===0?(u.up.set(0,f[y],0),u.lookAt(d[y],0,0)):M===1?(u.up.set(0,0,f[y]),u.lookAt(0,d[y],0)):(u.up.set(0,f[y],0),u.lookAt(0,0,d[y]));const T=this._cubeSize;ff(s,M*T,y>2?T:0,T,T),h.setRenderTarget(s),w&&h.render(E,u),h.render(e,u)}E.geometry.dispose(),E.material.dispose(),h.toneMapping=g,h.autoClear=m,e.background=_}_textureToCubeUV(e,n){const i=this._renderer,s=e.mapping===Ta||e.mapping===Aa;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=hE()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=dE());const a=s?this._cubemapMaterial:this._equirectMaterial,l=new nr(this._lodPlanes[0],a),u=a.uniforms;u.envMap.value=e;const f=this._cubeSize;ff(n,0,0,3*f,2*f),i.setRenderTarget(n),i.render(l,Yp)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const s=this._lodPlanes.length;for(let a=1;a<s;a++){const l=Math.sqrt(this._sigmas[a]*this._sigmas[a]-this._sigmas[a-1]*this._sigmas[a-1]),u=uE[(s-a-1)%uE.length];this._blur(e,a-1,a,l,u)}n.autoClear=i}_blur(e,n,i,s,a){const l=this._pingPongRenderTarget;this._halfBlur(e,l,n,i,s,"latitudinal",a),this._halfBlur(l,e,i,i,s,"longitudinal",a)}_halfBlur(e,n,i,s,a,l,u){const f=this._renderer,d=this._blurMaterial;l!=="latitudinal"&&l!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,m=new nr(this._lodPlanes[s],d),g=d.uniforms,v=this._sizeLods[i]-1,E=isFinite(a)?Math.PI/(2*v):2*Math.PI/(2*to-1),w=a/E,_=isFinite(a)?1+Math.floor(h*w):to;_>to&&console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${_} samples when the maximum is set to ${to}`);const y=[];let M=0;for(let k=0;k<to;++k){const B=k/w,L=Math.exp(-B*B/2);y.push(L),k===0?M+=L:k<_&&(M+=2*L)}for(let k=0;k<y.length;k++)y[k]=y[k]/M;g.envMap.value=e.texture,g.samples.value=_,g.weights.value=y,g.latitudinal.value=l==="latitudinal",u&&(g.poleAxis.value=u);const{_lodMax:T}=this;g.dTheta.value=E,g.mipInt.value=T-i;const C=this._sizeLods[s],N=3*C*(s>T-ua?s-T+ua:0),b=4*(this._cubeSize-C);ff(n,N,b,3*C,2*C),f.setRenderTarget(n),f.render(m,Yp)}}function b4(t){const e=[],n=[],i=[];let s=t;const a=t-ua+1+aE.length;for(let l=0;l<a;l++){const u=Math.pow(2,s);n.push(u);let f=1/u;l>t-ua?f=aE[l-t+ua-1]:l===0&&(f=0),i.push(f);const d=1/(u-2),h=-d,m=1+d,g=[h,h,m,h,m,m,h,h,m,m,h,m],v=6,E=6,w=3,_=2,y=1,M=new Float32Array(w*E*v),T=new Float32Array(_*E*v),C=new Float32Array(y*E*v);for(let b=0;b<v;b++){const k=b%3*2/3-1,B=b>2?0:-1,L=[k,B,0,k+2/3,B,0,k+2/3,B+1,0,k,B,0,k+2/3,B+1,0,k,B+1,0];M.set(L,w*E*b),T.set(g,_*E*b);const R=[b,b,b,b,b,b];C.set(R,y*E*b)}const N=new mo;N.setAttribute("position",new sr(M,w)),N.setAttribute("uv",new sr(T,_)),N.setAttribute("faceIndex",new sr(C,y)),e.push(N),s>ua&&s--}return{lodPlanes:e,sizeLods:n,sigmas:i}}function fE(t,e,n){const i=new fo(t,e,n);return i.texture.mapping=cd,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ff(t,e,n,i,s){t.viewport.set(e,n,i,s),t.scissor.set(e,n,i,s)}function R4(t,e,n){const i=new Float32Array(to),s=new pe(0,1,0);return new Fr({name:"SphericalGaussianBlur",defines:{n:to,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ov(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:xs,depthTest:!1,depthWrite:!1})}function dE(){return new Fr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ov(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:xs,depthTest:!1,depthWrite:!1})}function hE(){return new Fr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ov(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:xs,depthTest:!1,depthWrite:!1})}function Ov(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function P4(t){let e=new WeakMap,n=null;function i(u){if(u&&u.isTexture){const f=u.mapping,d=f===$m||f===qm,h=f===Ta||f===Aa;if(d||h){let m=e.get(u);const g=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==g)return n===null&&(n=new cE(t)),m=d?n.fromEquirectangular(u,m):n.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),m.texture;if(m!==void 0)return m.texture;{const v=u.image;return d&&v&&v.height>0||h&&v&&s(v)?(n===null&&(n=new cE(t)),m=d?n.fromEquirectangular(u):n.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),u.addEventListener("dispose",a),m.texture):null}}}return u}function s(u){let f=0;const d=6;for(let h=0;h<d;h++)u[h]!==void 0&&f++;return f===d}function a(u){const f=u.target;f.removeEventListener("dispose",a);const d=e.get(f);d!==void 0&&(e.delete(f),d.dispose())}function l(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:l}}function D4(t){const e={};function n(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=t.getExtension("WEBGL_depth_texture")||t.getExtension("MOZ_WEBGL_depth_texture")||t.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=t.getExtension("WEBGL_compressed_texture_s3tc")||t.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=t.getExtension(i)}return e[i]=s,s}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const s=n(i);return s===null&&na("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function L4(t,e,n,i){const s={},a=new WeakMap;function l(m){const g=m.target;g.index!==null&&e.remove(g.index);for(const E in g.attributes)e.remove(g.attributes[E]);g.removeEventListener("dispose",l),delete s[g.id];const v=a.get(g);v&&(e.remove(v),a.delete(g)),i.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,n.memory.geometries--}function u(m,g){return s[g.id]===!0||(g.addEventListener("dispose",l),s[g.id]=!0,n.memory.geometries++),g}function f(m){const g=m.attributes;for(const v in g)e.update(g[v],t.ARRAY_BUFFER)}function d(m){const g=[],v=m.index,E=m.attributes.position;let w=0;if(v!==null){const M=v.array;w=v.version;for(let T=0,C=M.length;T<C;T+=3){const N=M[T+0],b=M[T+1],k=M[T+2];g.push(N,b,b,k,k,N)}}else if(E!==void 0){const M=E.array;w=E.version;for(let T=0,C=M.length/3-1;T<C;T+=3){const N=T+0,b=T+1,k=T+2;g.push(N,b,b,k,k,N)}}else return;const _=new(jM(g)?QM:ZM)(g,1);_.version=w;const y=a.get(m);y&&e.remove(y),a.set(m,_)}function h(m){const g=a.get(m);if(g){const v=m.index;v!==null&&g.version<v.version&&d(m)}else d(m);return a.get(m)}return{get:u,update:f,getWireframeAttribute:h}}function I4(t,e,n){let i;function s(g){i=g}let a,l;function u(g){a=g.type,l=g.bytesPerElement}function f(g,v){t.drawElements(i,v,a,g*l),n.update(v,i,1)}function d(g,v,E){E!==0&&(t.drawElementsInstanced(i,v,a,g*l,E),n.update(v,i,E))}function h(g,v,E){if(E===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,v,0,a,g,0,E);let _=0;for(let y=0;y<E;y++)_+=v[y];n.update(_,i,1)}function m(g,v,E,w){if(E===0)return;const _=e.get("WEBGL_multi_draw");if(_===null)for(let y=0;y<g.length;y++)d(g[y]/l,v[y],w[y]);else{_.multiDrawElementsInstancedWEBGL(i,v,0,a,g,0,w,0,E);let y=0;for(let M=0;M<E;M++)y+=v[M]*w[M];n.update(y,i,1)}}this.setMode=s,this.setIndex=u,this.render=f,this.renderInstances=d,this.renderMultiDraw=h,this.renderMultiDrawInstances=m}function k4(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,l,u){switch(n.calls++,l){case t.TRIANGLES:n.triangles+=u*(a/3);break;case t.LINES:n.lines+=u*(a/2);break;case t.LINE_STRIP:n.lines+=u*(a-1);break;case t.LINE_LOOP:n.lines+=u*a;break;case t.POINTS:n.points+=u*a;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",l);break}}function s(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:s,update:i}}function N4(t,e,n){const i=new WeakMap,s=new ln;function a(l,u,f){const d=l.morphTargetInfluences,h=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,m=h!==void 0?h.length:0;let g=i.get(u);if(g===void 0||g.count!==m){let R=function(){B.dispose(),i.delete(u),u.removeEventListener("dispose",R)};var v=R;g!==void 0&&g.texture.dispose();const E=u.morphAttributes.position!==void 0,w=u.morphAttributes.normal!==void 0,_=u.morphAttributes.color!==void 0,y=u.morphAttributes.position||[],M=u.morphAttributes.normal||[],T=u.morphAttributes.color||[];let C=0;E===!0&&(C=1),w===!0&&(C=2),_===!0&&(C=3);let N=u.attributes.position.count*C,b=1;N>e.maxTextureSize&&(b=Math.ceil(N/e.maxTextureSize),N=e.maxTextureSize);const k=new Float32Array(N*b*4*m),B=new $M(k,N,b,m);B.type=br,B.needsUpdate=!0;const L=C*4;for(let O=0;O<m;O++){const Z=y[O],X=M[O],J=T[O],ne=N*b*4*O;for(let le=0;le<Z.count;le++){const re=le*L;E===!0&&(s.fromBufferAttribute(Z,le),k[ne+re+0]=s.x,k[ne+re+1]=s.y,k[ne+re+2]=s.z,k[ne+re+3]=0),w===!0&&(s.fromBufferAttribute(X,le),k[ne+re+4]=s.x,k[ne+re+5]=s.y,k[ne+re+6]=s.z,k[ne+re+7]=0),_===!0&&(s.fromBufferAttribute(J,le),k[ne+re+8]=s.x,k[ne+re+9]=s.y,k[ne+re+10]=s.z,k[ne+re+11]=J.itemSize===4?s.w:1)}}g={count:m,texture:B,size:new Ut(N,b)},i.set(u,g),u.addEventListener("dispose",R)}if(l.isInstancedMesh===!0&&l.morphTexture!==null)f.getUniforms().setValue(t,"morphTexture",l.morphTexture,n);else{let E=0;for(let _=0;_<d.length;_++)E+=d[_];const w=u.morphTargetsRelative?1:1-E;f.getUniforms().setValue(t,"morphTargetBaseInfluence",w),f.getUniforms().setValue(t,"morphTargetInfluences",d)}f.getUniforms().setValue(t,"morphTargetsTexture",g.texture,n),f.getUniforms().setValue(t,"morphTargetsTextureSize",g.size)}return{update:a}}function U4(t,e,n,i){let s=new WeakMap;function a(f){const d=i.render.frame,h=f.geometry,m=e.get(f,h);if(s.get(m)!==d&&(e.update(m),s.set(m,d)),f.isInstancedMesh&&(f.hasEventListener("dispose",u)===!1&&f.addEventListener("dispose",u),s.get(f)!==d&&(n.update(f.instanceMatrix,t.ARRAY_BUFFER),f.instanceColor!==null&&n.update(f.instanceColor,t.ARRAY_BUFFER),s.set(f,d))),f.isSkinnedMesh){const g=f.skeleton;s.get(g)!==d&&(g.update(),s.set(g,d))}return m}function l(){s=new WeakMap}function u(f){const d=f.target;d.removeEventListener("dispose",u),n.remove(d.instanceMatrix),d.instanceColor!==null&&n.remove(d.instanceColor)}return{update:a,dispose:l}}const oT=new ri,pE=new iT(1,1),aT=new $M,lT=new gO,uT=new tT,mE=[],gE=[],vE=new Float32Array(16),yE=new Float32Array(9),xE=new Float32Array(4);function za(t,e,n){const i=t[0];if(i<=0||i>0)return t;const s=e*n;let a=mE[s];if(a===void 0&&(a=new Float32Array(s),mE[s]=a),e!==0){i.toArray(a,0);for(let l=1,u=0;l!==e;++l)u+=n,t[l].toArray(a,u)}return a}function vn(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function yn(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function dd(t,e){let n=gE[e];n===void 0&&(n=new Int32Array(e),gE[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function F4(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function O4(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(vn(n,e))return;t.uniform2fv(this.addr,e),yn(n,e)}}function B4(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(vn(n,e))return;t.uniform3fv(this.addr,e),yn(n,e)}}function z4(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(vn(n,e))return;t.uniform4fv(this.addr,e),yn(n,e)}}function V4(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(vn(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),yn(n,e)}else{if(vn(n,i))return;xE.set(i),t.uniformMatrix2fv(this.addr,!1,xE),yn(n,i)}}function H4(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(vn(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),yn(n,e)}else{if(vn(n,i))return;yE.set(i),t.uniformMatrix3fv(this.addr,!1,yE),yn(n,i)}}function G4(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(vn(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),yn(n,e)}else{if(vn(n,i))return;vE.set(i),t.uniformMatrix4fv(this.addr,!1,vE),yn(n,i)}}function W4(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function j4(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(vn(n,e))return;t.uniform2iv(this.addr,e),yn(n,e)}}function X4(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(vn(n,e))return;t.uniform3iv(this.addr,e),yn(n,e)}}function $4(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(vn(n,e))return;t.uniform4iv(this.addr,e),yn(n,e)}}function q4(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function Y4(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(vn(n,e))return;t.uniform2uiv(this.addr,e),yn(n,e)}}function K4(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(vn(n,e))return;t.uniform3uiv(this.addr,e),yn(n,e)}}function Z4(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(vn(n,e))return;t.uniform4uiv(this.addr,e),yn(n,e)}}function Q4(t,e,n){const i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(t.uniform1i(this.addr,s),i[0]=s);let a;this.type===t.SAMPLER_2D_SHADOW?(pE.compareFunction=WM,a=pE):a=oT,n.setTexture2D(e||a,s)}function J4(t,e,n){const i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(t.uniform1i(this.addr,s),i[0]=s),n.setTexture3D(e||lT,s)}function eV(t,e,n){const i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(t.uniform1i(this.addr,s),i[0]=s),n.setTextureCube(e||uT,s)}function tV(t,e,n){const i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(t.uniform1i(this.addr,s),i[0]=s),n.setTexture2DArray(e||aT,s)}function nV(t){switch(t){case 5126:return F4;case 35664:return O4;case 35665:return B4;case 35666:return z4;case 35674:return V4;case 35675:return H4;case 35676:return G4;case 5124:case 35670:return W4;case 35667:case 35671:return j4;case 35668:case 35672:return X4;case 35669:case 35673:return $4;case 5125:return q4;case 36294:return Y4;case 36295:return K4;case 36296:return Z4;case 35678:case 36198:case 36298:case 36306:case 35682:return Q4;case 35679:case 36299:case 36307:return J4;case 35680:case 36300:case 36308:case 36293:return eV;case 36289:case 36303:case 36311:case 36292:return tV}}function iV(t,e){t.uniform1fv(this.addr,e)}function rV(t,e){const n=za(e,this.size,2);t.uniform2fv(this.addr,n)}function sV(t,e){const n=za(e,this.size,3);t.uniform3fv(this.addr,n)}function oV(t,e){const n=za(e,this.size,4);t.uniform4fv(this.addr,n)}function aV(t,e){const n=za(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function lV(t,e){const n=za(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function uV(t,e){const n=za(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function cV(t,e){t.uniform1iv(this.addr,e)}function fV(t,e){t.uniform2iv(this.addr,e)}function dV(t,e){t.uniform3iv(this.addr,e)}function hV(t,e){t.uniform4iv(this.addr,e)}function pV(t,e){t.uniform1uiv(this.addr,e)}function mV(t,e){t.uniform2uiv(this.addr,e)}function gV(t,e){t.uniform3uiv(this.addr,e)}function vV(t,e){t.uniform4uiv(this.addr,e)}function yV(t,e,n){const i=this.cache,s=e.length,a=dd(n,s);vn(i,a)||(t.uniform1iv(this.addr,a),yn(i,a));for(let l=0;l!==s;++l)n.setTexture2D(e[l]||oT,a[l])}function xV(t,e,n){const i=this.cache,s=e.length,a=dd(n,s);vn(i,a)||(t.uniform1iv(this.addr,a),yn(i,a));for(let l=0;l!==s;++l)n.setTexture3D(e[l]||lT,a[l])}function _V(t,e,n){const i=this.cache,s=e.length,a=dd(n,s);vn(i,a)||(t.uniform1iv(this.addr,a),yn(i,a));for(let l=0;l!==s;++l)n.setTextureCube(e[l]||uT,a[l])}function SV(t,e,n){const i=this.cache,s=e.length,a=dd(n,s);vn(i,a)||(t.uniform1iv(this.addr,a),yn(i,a));for(let l=0;l!==s;++l)n.setTexture2DArray(e[l]||aT,a[l])}function EV(t){switch(t){case 5126:return iV;case 35664:return rV;case 35665:return sV;case 35666:return oV;case 35674:return aV;case 35675:return lV;case 35676:return uV;case 5124:case 35670:return cV;case 35667:case 35671:return fV;case 35668:case 35672:return dV;case 35669:case 35673:return hV;case 5125:return pV;case 36294:return mV;case 36295:return gV;case 36296:return vV;case 35678:case 36198:case 36298:case 36306:case 35682:return yV;case 35679:case 36299:case 36307:return xV;case 35680:case 36300:case 36308:case 36293:return _V;case 36289:case 36303:case 36311:case 36292:return SV}}class wV{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=nV(n.type)}}class MV{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=EV(n.type)}}class TV{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const s=this.seq;for(let a=0,l=s.length;a!==l;++a){const u=s[a];u.setValue(e,n[u.id],i)}}}const em=/(\w+)(\])?(\[|\.)?/g;function _E(t,e){t.seq.push(e),t.map[e.id]=e}function AV(t,e,n){const i=t.name,s=i.length;for(em.lastIndex=0;;){const a=em.exec(i),l=em.lastIndex;let u=a[1];const f=a[2]==="]",d=a[3];if(f&&(u=u|0),d===void 0||d==="["&&l+2===s){_E(n,d===void 0?new wV(u,t,e):new MV(u,t,e));break}else{let m=n.map[u];m===void 0&&(m=new TV(u),_E(n,m)),n=m}}}class Rf{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const a=e.getActiveUniform(n,s),l=e.getUniformLocation(n,a.name);AV(a,l,this)}}setValue(e,n,i,s){const a=this.map[n];a!==void 0&&a.setValue(e,i,s)}setOptional(e,n,i){const s=n[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,n,i,s){for(let a=0,l=n.length;a!==l;++a){const u=n[a],f=i[u.id];f.needsUpdate!==!1&&u.setValue(e,f.value,s)}}static seqWithValue(e,n){const i=[];for(let s=0,a=e.length;s!==a;++s){const l=e[s];l.id in n&&i.push(l)}return i}}function SE(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const CV=37297;let bV=0;function RV(t,e){const n=t.split(`
`),i=[],s=Math.max(e-6,0),a=Math.min(e+6,n.length);for(let l=s;l<a;l++){const u=l+1;i.push(`${u===e?">":" "} ${u}: ${n[l]}`)}return i.join(`
`)}const EE=new gt;function PV(t){It._getMatrix(EE,It.workingColorSpace,t);const e=`mat3( ${EE.elements.map(n=>n.toFixed(4))} )`;switch(It.getTransfer(t)){case Gf:return[e,"LinearTransferOETF"];case Bt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",t),[e,"LinearTransferOETF"]}}function wE(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),s=t.getShaderInfoLog(e).trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const l=parseInt(a[1]);return n.toUpperCase()+`

`+s+`

`+RV(t.getShaderSource(e),l)}else return s}function DV(t,e){const n=PV(e);return[`vec4 ${t}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function LV(t,e){let n;switch(e){case VF:n="Linear";break;case HF:n="Reinhard";break;case GF:n="Cineon";break;case WF:n="ACESFilmic";break;case XF:n="AgX";break;case $F:n="Neutral";break;case jF:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const df=new pe;function IV(){It.getLuminanceCoefficients(df);const t=df.x.toFixed(4),e=df.y.toFixed(4),n=df.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function kV(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(kl).join(`
`)}function NV(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function UV(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const a=t.getActiveAttrib(e,s),l=a.name;let u=1;a.type===t.FLOAT_MAT2&&(u=2),a.type===t.FLOAT_MAT3&&(u=3),a.type===t.FLOAT_MAT4&&(u=4),n[l]={type:a.type,location:t.getAttribLocation(e,l),locationSize:u}}return n}function kl(t){return t!==""}function ME(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function TE(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const FV=/^[ \t]*#include +<([\w\d./]+)>/gm;function Mg(t){return t.replace(FV,BV)}const OV=new Map;function BV(t,e){let n=xt[e];if(n===void 0){const i=OV.get(e);if(i!==void 0)n=xt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Mg(n)}const zV=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function AE(t){return t.replace(zV,VV)}function VV(t,e,n,i){let s="";for(let a=parseInt(e);a<parseInt(n);a++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return s}function CE(t){let e=`precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	precision ${t.precision} sampler3D;
	precision ${t.precision} sampler2DArray;
	precision ${t.precision} sampler2DShadow;
	precision ${t.precision} samplerCubeShadow;
	precision ${t.precision} sampler2DArrayShadow;
	precision ${t.precision} isampler2D;
	precision ${t.precision} isampler3D;
	precision ${t.precision} isamplerCube;
	precision ${t.precision} isampler2DArray;
	precision ${t.precision} usampler2D;
	precision ${t.precision} usampler3D;
	precision ${t.precision} usamplerCube;
	precision ${t.precision} usampler2DArray;
	`;return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function HV(t){let e="SHADOWMAP_TYPE_BASIC";return t.shadowMapType===DM?e="SHADOWMAP_TYPE_PCF":t.shadowMapType===_F?e="SHADOWMAP_TYPE_PCF_SOFT":t.shadowMapType===Tr&&(e="SHADOWMAP_TYPE_VSM"),e}function GV(t){let e="ENVMAP_TYPE_CUBE";if(t.envMap)switch(t.envMapMode){case Ta:case Aa:e="ENVMAP_TYPE_CUBE";break;case cd:e="ENVMAP_TYPE_CUBE_UV";break}return e}function WV(t){let e="ENVMAP_MODE_REFLECTION";if(t.envMap)switch(t.envMapMode){case Aa:e="ENVMAP_MODE_REFRACTION";break}return e}function jV(t){let e="ENVMAP_BLENDING_NONE";if(t.envMap)switch(t.combine){case LM:e="ENVMAP_BLENDING_MULTIPLY";break;case BF:e="ENVMAP_BLENDING_MIX";break;case zF:e="ENVMAP_BLENDING_ADD";break}return e}function XV(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function $V(t,e,n,i){const s=t.getContext(),a=n.defines;let l=n.vertexShader,u=n.fragmentShader;const f=HV(n),d=GV(n),h=WV(n),m=jV(n),g=XV(n),v=kV(n),E=NV(a),w=s.createProgram();let _,y,M=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(_=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E].filter(kl).join(`
`),_.length>0&&(_+=`
`),y=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E].filter(kl).join(`
`),y.length>0&&(y+=`
`)):(_=[CE(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+h:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+f:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(kl).join(`
`),y=[CE(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,E,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+d:"",n.envMap?"#define "+h:"",n.envMap?"#define "+m:"",g?"#define CUBEUV_TEXEL_WIDTH "+g.texelWidth:"",g?"#define CUBEUV_TEXEL_HEIGHT "+g.texelHeight:"",g?"#define CUBEUV_MAX_MIP "+g.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+f:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==_s?"#define TONE_MAPPING":"",n.toneMapping!==_s?xt.tonemapping_pars_fragment:"",n.toneMapping!==_s?LV("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",xt.colorspace_pars_fragment,DV("linearToOutputTexel",n.outputColorSpace),IV(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(kl).join(`
`)),l=Mg(l),l=ME(l,n),l=TE(l,n),u=Mg(u),u=ME(u,n),u=TE(u,n),l=AE(l),u=AE(u),n.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,_=[v,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+_,y=["#define varying in",n.glslVersion===HS?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===HS?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+y);const T=M+_+l,C=M+y+u,N=SE(s,s.VERTEX_SHADER,T),b=SE(s,s.FRAGMENT_SHADER,C);s.attachShader(w,N),s.attachShader(w,b),n.index0AttributeName!==void 0?s.bindAttribLocation(w,0,n.index0AttributeName):n.morphTargets===!0&&s.bindAttribLocation(w,0,"position"),s.linkProgram(w);function k(O){if(t.debug.checkShaderErrors){const Z=s.getProgramInfoLog(w).trim(),X=s.getShaderInfoLog(N).trim(),J=s.getShaderInfoLog(b).trim();let ne=!0,le=!0;if(s.getProgramParameter(w,s.LINK_STATUS)===!1)if(ne=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(s,w,N,b);else{const re=wE(s,N,"vertex"),G=wE(s,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(w,s.VALIDATE_STATUS)+`

Material Name: `+O.name+`
Material Type: `+O.type+`

Program Info Log: `+Z+`
`+re+`
`+G)}else Z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Z):(X===""||J==="")&&(le=!1);le&&(O.diagnostics={runnable:ne,programLog:Z,vertexShader:{log:X,prefix:_},fragmentShader:{log:J,prefix:y}})}s.deleteShader(N),s.deleteShader(b),B=new Rf(s,w),L=UV(s,w)}let B;this.getUniforms=function(){return B===void 0&&k(this),B};let L;this.getAttributes=function(){return L===void 0&&k(this),L};let R=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=s.getProgramParameter(w,CV)),R},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(w),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=bV++,this.cacheKey=e,this.usedTimes=1,this.program=w,this.vertexShader=N,this.fragmentShader=b,this}let qV=0;class YV{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(n),a=this._getShaderStage(i),l=this._getShaderCacheForMaterial(e);return l.has(s)===!1&&(l.add(s),s.usedTimes++),l.has(a)===!1&&(l.add(a),a.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new KV(e),n.set(e,i)),i}}class KV{constructor(e){this.id=qV++,this.code=e,this.usedTimes=0}}function ZV(t,e,n,i,s,a,l){const u=new qM,f=new YV,d=new Set,h=[],m=s.logarithmicDepthBuffer,g=s.vertexTextures;let v=s.precision;const E={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function w(L){return d.add(L),L===0?"uv":`uv${L}`}function _(L,R,O,Z,X){const J=Z.fog,ne=X.geometry,le=L.isMeshStandardMaterial?Z.environment:null,re=(L.isMeshStandardMaterial?n:e).get(L.envMap||le),G=re&&re.mapping===cd?re.image.height:null,ue=E[L.type];L.precision!==null&&(v=s.getMaxPrecision(L.precision),v!==L.precision&&console.warn("THREE.WebGLProgram.getParameters:",L.precision,"not supported, using",v,"instead."));const D=ne.morphAttributes.position||ne.morphAttributes.normal||ne.morphAttributes.color,V=D!==void 0?D.length:0;let ie=0;ne.morphAttributes.position!==void 0&&(ie=1),ne.morphAttributes.normal!==void 0&&(ie=2),ne.morphAttributes.color!==void 0&&(ie=3);let U,ee,ge,ye;if(ue){const Ct=Ji[ue];U=Ct.vertexShader,ee=Ct.fragmentShader}else U=L.vertexShader,ee=L.fragmentShader,f.update(L),ge=f.getVertexShaderID(L),ye=f.getFragmentShaderID(L);const Se=t.getRenderTarget(),Re=t.state.buffers.depth.getReversed(),Le=X.isInstancedMesh===!0,$e=X.isBatchedMesh===!0,St=!!L.map,at=!!L.matcap,Ft=!!re,j=!!L.aoMap,xn=!!L.lightMap,vt=!!L.bumpMap,mt=!!L.normalMap,Qe=!!L.displacementMap,Rt=!!L.emissiveMap,qe=!!L.metalnessMap,F=!!L.roughnessMap,P=L.anisotropy>0,oe=L.clearcoat>0,_e=L.dispersion>0,we=L.iridescence>0,H=L.sheen>0,de=L.transmission>0,ve=P&&!!L.anisotropyMap,Me=oe&&!!L.clearcoatMap,Ge=oe&&!!L.clearcoatNormalMap,Ee=oe&&!!L.clearcoatRoughnessMap,Ue=we&&!!L.iridescenceMap,Ye=we&&!!L.iridescenceThicknessMap,et=H&&!!L.sheenColorMap,Be=H&&!!L.sheenRoughnessMap,nt=!!L.specularMap,st=!!L.specularColorMap,yt=!!L.specularIntensityMap,K=de&&!!L.transmissionMap,Ie=de&&!!L.thicknessMap,me=!!L.gradientMap,xe=!!L.alphaMap,Oe=L.alphaTest>0,Fe=!!L.alphaHash,dt=!!L.extensions;let Wt=_s;L.toneMapped&&(Se===null||Se.isXRRenderTarget===!0)&&(Wt=t.toneMapping);const pn={shaderID:ue,shaderType:L.type,shaderName:L.name,vertexShader:U,fragmentShader:ee,defines:L.defines,customVertexShaderID:ge,customFragmentShaderID:ye,isRawShaderMaterial:L.isRawShaderMaterial===!0,glslVersion:L.glslVersion,precision:v,batching:$e,batchingColor:$e&&X._colorsTexture!==null,instancing:Le,instancingColor:Le&&X.instanceColor!==null,instancingMorph:Le&&X.morphTexture!==null,supportsVertexTextures:g,outputColorSpace:Se===null?t.outputColorSpace:Se.isXRRenderTarget===!0?Se.texture.colorSpace:Ra,alphaToCoverage:!!L.alphaToCoverage,map:St,matcap:at,envMap:Ft,envMapMode:Ft&&re.mapping,envMapCubeUVHeight:G,aoMap:j,lightMap:xn,bumpMap:vt,normalMap:mt,displacementMap:g&&Qe,emissiveMap:Rt,normalMapObjectSpace:mt&&L.normalMapType===QF,normalMapTangentSpace:mt&&L.normalMapType===ZF,metalnessMap:qe,roughnessMap:F,anisotropy:P,anisotropyMap:ve,clearcoat:oe,clearcoatMap:Me,clearcoatNormalMap:Ge,clearcoatRoughnessMap:Ee,dispersion:_e,iridescence:we,iridescenceMap:Ue,iridescenceThicknessMap:Ye,sheen:H,sheenColorMap:et,sheenRoughnessMap:Be,specularMap:nt,specularColorMap:st,specularIntensityMap:yt,transmission:de,transmissionMap:K,thicknessMap:Ie,gradientMap:me,opaque:L.transparent===!1&&L.blending===da&&L.alphaToCoverage===!1,alphaMap:xe,alphaTest:Oe,alphaHash:Fe,combine:L.combine,mapUv:St&&w(L.map.channel),aoMapUv:j&&w(L.aoMap.channel),lightMapUv:xn&&w(L.lightMap.channel),bumpMapUv:vt&&w(L.bumpMap.channel),normalMapUv:mt&&w(L.normalMap.channel),displacementMapUv:Qe&&w(L.displacementMap.channel),emissiveMapUv:Rt&&w(L.emissiveMap.channel),metalnessMapUv:qe&&w(L.metalnessMap.channel),roughnessMapUv:F&&w(L.roughnessMap.channel),anisotropyMapUv:ve&&w(L.anisotropyMap.channel),clearcoatMapUv:Me&&w(L.clearcoatMap.channel),clearcoatNormalMapUv:Ge&&w(L.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ee&&w(L.clearcoatRoughnessMap.channel),iridescenceMapUv:Ue&&w(L.iridescenceMap.channel),iridescenceThicknessMapUv:Ye&&w(L.iridescenceThicknessMap.channel),sheenColorMapUv:et&&w(L.sheenColorMap.channel),sheenRoughnessMapUv:Be&&w(L.sheenRoughnessMap.channel),specularMapUv:nt&&w(L.specularMap.channel),specularColorMapUv:st&&w(L.specularColorMap.channel),specularIntensityMapUv:yt&&w(L.specularIntensityMap.channel),transmissionMapUv:K&&w(L.transmissionMap.channel),thicknessMapUv:Ie&&w(L.thicknessMap.channel),alphaMapUv:xe&&w(L.alphaMap.channel),vertexTangents:!!ne.attributes.tangent&&(mt||P),vertexColors:L.vertexColors,vertexAlphas:L.vertexColors===!0&&!!ne.attributes.color&&ne.attributes.color.itemSize===4,pointsUvs:X.isPoints===!0&&!!ne.attributes.uv&&(St||xe),fog:!!J,useFog:L.fog===!0,fogExp2:!!J&&J.isFogExp2,flatShading:L.flatShading===!0,sizeAttenuation:L.sizeAttenuation===!0,logarithmicDepthBuffer:m,reverseDepthBuffer:Re,skinning:X.isSkinnedMesh===!0,morphTargets:ne.morphAttributes.position!==void 0,morphNormals:ne.morphAttributes.normal!==void 0,morphColors:ne.morphAttributes.color!==void 0,morphTargetsCount:V,morphTextureStride:ie,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numClippingPlanes:l.numPlanes,numClipIntersection:l.numIntersection,dithering:L.dithering,shadowMapEnabled:t.shadowMap.enabled&&O.length>0,shadowMapType:t.shadowMap.type,toneMapping:Wt,decodeVideoTexture:St&&L.map.isVideoTexture===!0&&It.getTransfer(L.map.colorSpace)===Bt,decodeVideoTextureEmissive:Rt&&L.emissiveMap.isVideoTexture===!0&&It.getTransfer(L.emissiveMap.colorSpace)===Bt,premultipliedAlpha:L.premultipliedAlpha,doubleSided:L.side===Cr,flipSided:L.side===ii,useDepthPacking:L.depthPacking>=0,depthPacking:L.depthPacking||0,index0AttributeName:L.index0AttributeName,extensionClipCullDistance:dt&&L.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(dt&&L.extensions.multiDraw===!0||$e)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:L.customProgramCacheKey()};return pn.vertexUv1s=d.has(1),pn.vertexUv2s=d.has(2),pn.vertexUv3s=d.has(3),d.clear(),pn}function y(L){const R=[];if(L.shaderID?R.push(L.shaderID):(R.push(L.customVertexShaderID),R.push(L.customFragmentShaderID)),L.defines!==void 0)for(const O in L.defines)R.push(O),R.push(L.defines[O]);return L.isRawShaderMaterial===!1&&(M(R,L),T(R,L),R.push(t.outputColorSpace)),R.push(L.customProgramCacheKey),R.join()}function M(L,R){L.push(R.precision),L.push(R.outputColorSpace),L.push(R.envMapMode),L.push(R.envMapCubeUVHeight),L.push(R.mapUv),L.push(R.alphaMapUv),L.push(R.lightMapUv),L.push(R.aoMapUv),L.push(R.bumpMapUv),L.push(R.normalMapUv),L.push(R.displacementMapUv),L.push(R.emissiveMapUv),L.push(R.metalnessMapUv),L.push(R.roughnessMapUv),L.push(R.anisotropyMapUv),L.push(R.clearcoatMapUv),L.push(R.clearcoatNormalMapUv),L.push(R.clearcoatRoughnessMapUv),L.push(R.iridescenceMapUv),L.push(R.iridescenceThicknessMapUv),L.push(R.sheenColorMapUv),L.push(R.sheenRoughnessMapUv),L.push(R.specularMapUv),L.push(R.specularColorMapUv),L.push(R.specularIntensityMapUv),L.push(R.transmissionMapUv),L.push(R.thicknessMapUv),L.push(R.combine),L.push(R.fogExp2),L.push(R.sizeAttenuation),L.push(R.morphTargetsCount),L.push(R.morphAttributeCount),L.push(R.numDirLights),L.push(R.numPointLights),L.push(R.numSpotLights),L.push(R.numSpotLightMaps),L.push(R.numHemiLights),L.push(R.numRectAreaLights),L.push(R.numDirLightShadows),L.push(R.numPointLightShadows),L.push(R.numSpotLightShadows),L.push(R.numSpotLightShadowsWithMaps),L.push(R.numLightProbes),L.push(R.shadowMapType),L.push(R.toneMapping),L.push(R.numClippingPlanes),L.push(R.numClipIntersection),L.push(R.depthPacking)}function T(L,R){u.disableAll(),R.supportsVertexTextures&&u.enable(0),R.instancing&&u.enable(1),R.instancingColor&&u.enable(2),R.instancingMorph&&u.enable(3),R.matcap&&u.enable(4),R.envMap&&u.enable(5),R.normalMapObjectSpace&&u.enable(6),R.normalMapTangentSpace&&u.enable(7),R.clearcoat&&u.enable(8),R.iridescence&&u.enable(9),R.alphaTest&&u.enable(10),R.vertexColors&&u.enable(11),R.vertexAlphas&&u.enable(12),R.vertexUv1s&&u.enable(13),R.vertexUv2s&&u.enable(14),R.vertexUv3s&&u.enable(15),R.vertexTangents&&u.enable(16),R.anisotropy&&u.enable(17),R.alphaHash&&u.enable(18),R.batching&&u.enable(19),R.dispersion&&u.enable(20),R.batchingColor&&u.enable(21),L.push(u.mask),u.disableAll(),R.fog&&u.enable(0),R.useFog&&u.enable(1),R.flatShading&&u.enable(2),R.logarithmicDepthBuffer&&u.enable(3),R.reverseDepthBuffer&&u.enable(4),R.skinning&&u.enable(5),R.morphTargets&&u.enable(6),R.morphNormals&&u.enable(7),R.morphColors&&u.enable(8),R.premultipliedAlpha&&u.enable(9),R.shadowMapEnabled&&u.enable(10),R.doubleSided&&u.enable(11),R.flipSided&&u.enable(12),R.useDepthPacking&&u.enable(13),R.dithering&&u.enable(14),R.transmission&&u.enable(15),R.sheen&&u.enable(16),R.opaque&&u.enable(17),R.pointsUvs&&u.enable(18),R.decodeVideoTexture&&u.enable(19),R.decodeVideoTextureEmissive&&u.enable(20),R.alphaToCoverage&&u.enable(21),L.push(u.mask)}function C(L){const R=E[L.type];let O;if(R){const Z=Ji[R];O=RO.clone(Z.uniforms)}else O=L.uniforms;return O}function N(L,R){let O;for(let Z=0,X=h.length;Z<X;Z++){const J=h[Z];if(J.cacheKey===R){O=J,++O.usedTimes;break}}return O===void 0&&(O=new $V(t,R,L,a),h.push(O)),O}function b(L){if(--L.usedTimes===0){const R=h.indexOf(L);h[R]=h[h.length-1],h.pop(),L.destroy()}}function k(L){f.remove(L)}function B(){f.dispose()}return{getParameters:_,getProgramCacheKey:y,getUniforms:C,acquireProgram:N,releaseProgram:b,releaseShaderCache:k,programs:h,dispose:B}}function QV(){let t=new WeakMap;function e(l){return t.has(l)}function n(l){let u=t.get(l);return u===void 0&&(u={},t.set(l,u)),u}function i(l){t.delete(l)}function s(l,u,f){t.get(l)[u]=f}function a(){t=new WeakMap}return{has:e,get:n,remove:i,update:s,dispose:a}}function JV(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.z!==e.z?t.z-e.z:t.id-e.id}function bE(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function RE(){const t=[];let e=0;const n=[],i=[],s=[];function a(){e=0,n.length=0,i.length=0,s.length=0}function l(m,g,v,E,w,_){let y=t[e];return y===void 0?(y={id:m.id,object:m,geometry:g,material:v,groupOrder:E,renderOrder:m.renderOrder,z:w,group:_},t[e]=y):(y.id=m.id,y.object=m,y.geometry=g,y.material=v,y.groupOrder=E,y.renderOrder=m.renderOrder,y.z=w,y.group=_),e++,y}function u(m,g,v,E,w,_){const y=l(m,g,v,E,w,_);v.transmission>0?i.push(y):v.transparent===!0?s.push(y):n.push(y)}function f(m,g,v,E,w,_){const y=l(m,g,v,E,w,_);v.transmission>0?i.unshift(y):v.transparent===!0?s.unshift(y):n.unshift(y)}function d(m,g){n.length>1&&n.sort(m||JV),i.length>1&&i.sort(g||bE),s.length>1&&s.sort(g||bE)}function h(){for(let m=e,g=t.length;m<g;m++){const v=t[m];if(v.id===null)break;v.id=null,v.object=null,v.geometry=null,v.material=null,v.group=null}}return{opaque:n,transmissive:i,transparent:s,init:a,push:u,unshift:f,finish:h,sort:d}}function e5(){let t=new WeakMap;function e(i,s){const a=t.get(i);let l;return a===void 0?(l=new RE,t.set(i,[l])):s>=a.length?(l=new RE,a.push(l)):l=a[s],l}function n(){t=new WeakMap}return{get:e,dispose:n}}function t5(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new pe,color:new zt};break;case"SpotLight":n={position:new pe,direction:new pe,color:new zt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new pe,color:new zt,distance:0,decay:0};break;case"HemisphereLight":n={direction:new pe,skyColor:new zt,groundColor:new zt};break;case"RectAreaLight":n={color:new zt,position:new pe,halfWidth:new pe,halfHeight:new pe};break}return t[e.id]=n,n}}}function n5(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ut};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ut};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ut,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let i5=0;function r5(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function s5(t){const e=new t5,n=n5(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)i.probe.push(new pe);const s=new pe,a=new hn,l=new hn;function u(d){let h=0,m=0,g=0;for(let L=0;L<9;L++)i.probe[L].set(0,0,0);let v=0,E=0,w=0,_=0,y=0,M=0,T=0,C=0,N=0,b=0,k=0;d.sort(r5);for(let L=0,R=d.length;L<R;L++){const O=d[L],Z=O.color,X=O.intensity,J=O.distance,ne=O.shadow&&O.shadow.map?O.shadow.map.texture:null;if(O.isAmbientLight)h+=Z.r*X,m+=Z.g*X,g+=Z.b*X;else if(O.isLightProbe){for(let le=0;le<9;le++)i.probe[le].addScaledVector(O.sh.coefficients[le],X);k++}else if(O.isDirectionalLight){const le=e.get(O);if(le.color.copy(O.color).multiplyScalar(O.intensity),O.castShadow){const re=O.shadow,G=n.get(O);G.shadowIntensity=re.intensity,G.shadowBias=re.bias,G.shadowNormalBias=re.normalBias,G.shadowRadius=re.radius,G.shadowMapSize=re.mapSize,i.directionalShadow[v]=G,i.directionalShadowMap[v]=ne,i.directionalShadowMatrix[v]=O.shadow.matrix,M++}i.directional[v]=le,v++}else if(O.isSpotLight){const le=e.get(O);le.position.setFromMatrixPosition(O.matrixWorld),le.color.copy(Z).multiplyScalar(X),le.distance=J,le.coneCos=Math.cos(O.angle),le.penumbraCos=Math.cos(O.angle*(1-O.penumbra)),le.decay=O.decay,i.spot[w]=le;const re=O.shadow;if(O.map&&(i.spotLightMap[N]=O.map,N++,re.updateMatrices(O),O.castShadow&&b++),i.spotLightMatrix[w]=re.matrix,O.castShadow){const G=n.get(O);G.shadowIntensity=re.intensity,G.shadowBias=re.bias,G.shadowNormalBias=re.normalBias,G.shadowRadius=re.radius,G.shadowMapSize=re.mapSize,i.spotShadow[w]=G,i.spotShadowMap[w]=ne,C++}w++}else if(O.isRectAreaLight){const le=e.get(O);le.color.copy(Z).multiplyScalar(X),le.halfWidth.set(O.width*.5,0,0),le.halfHeight.set(0,O.height*.5,0),i.rectArea[_]=le,_++}else if(O.isPointLight){const le=e.get(O);if(le.color.copy(O.color).multiplyScalar(O.intensity),le.distance=O.distance,le.decay=O.decay,O.castShadow){const re=O.shadow,G=n.get(O);G.shadowIntensity=re.intensity,G.shadowBias=re.bias,G.shadowNormalBias=re.normalBias,G.shadowRadius=re.radius,G.shadowMapSize=re.mapSize,G.shadowCameraNear=re.camera.near,G.shadowCameraFar=re.camera.far,i.pointShadow[E]=G,i.pointShadowMap[E]=ne,i.pointShadowMatrix[E]=O.shadow.matrix,T++}i.point[E]=le,E++}else if(O.isHemisphereLight){const le=e.get(O);le.skyColor.copy(O.color).multiplyScalar(X),le.groundColor.copy(O.groundColor).multiplyScalar(X),i.hemi[y]=le,y++}}_>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Ne.LTC_FLOAT_1,i.rectAreaLTC2=Ne.LTC_FLOAT_2):(i.rectAreaLTC1=Ne.LTC_HALF_1,i.rectAreaLTC2=Ne.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=m,i.ambient[2]=g;const B=i.hash;(B.directionalLength!==v||B.pointLength!==E||B.spotLength!==w||B.rectAreaLength!==_||B.hemiLength!==y||B.numDirectionalShadows!==M||B.numPointShadows!==T||B.numSpotShadows!==C||B.numSpotMaps!==N||B.numLightProbes!==k)&&(i.directional.length=v,i.spot.length=w,i.rectArea.length=_,i.point.length=E,i.hemi.length=y,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.pointShadow.length=T,i.pointShadowMap.length=T,i.spotShadow.length=C,i.spotShadowMap.length=C,i.directionalShadowMatrix.length=M,i.pointShadowMatrix.length=T,i.spotLightMatrix.length=C+N-b,i.spotLightMap.length=N,i.numSpotLightShadowsWithMaps=b,i.numLightProbes=k,B.directionalLength=v,B.pointLength=E,B.spotLength=w,B.rectAreaLength=_,B.hemiLength=y,B.numDirectionalShadows=M,B.numPointShadows=T,B.numSpotShadows=C,B.numSpotMaps=N,B.numLightProbes=k,i.version=i5++)}function f(d,h){let m=0,g=0,v=0,E=0,w=0;const _=h.matrixWorldInverse;for(let y=0,M=d.length;y<M;y++){const T=d[y];if(T.isDirectionalLight){const C=i.directional[m];C.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),C.direction.sub(s),C.direction.transformDirection(_),m++}else if(T.isSpotLight){const C=i.spot[v];C.position.setFromMatrixPosition(T.matrixWorld),C.position.applyMatrix4(_),C.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),C.direction.sub(s),C.direction.transformDirection(_),v++}else if(T.isRectAreaLight){const C=i.rectArea[E];C.position.setFromMatrixPosition(T.matrixWorld),C.position.applyMatrix4(_),l.identity(),a.copy(T.matrixWorld),a.premultiply(_),l.extractRotation(a),C.halfWidth.set(T.width*.5,0,0),C.halfHeight.set(0,T.height*.5,0),C.halfWidth.applyMatrix4(l),C.halfHeight.applyMatrix4(l),E++}else if(T.isPointLight){const C=i.point[g];C.position.setFromMatrixPosition(T.matrixWorld),C.position.applyMatrix4(_),g++}else if(T.isHemisphereLight){const C=i.hemi[w];C.direction.setFromMatrixPosition(T.matrixWorld),C.direction.transformDirection(_),w++}}}return{setup:u,setupView:f,state:i}}function PE(t){const e=new s5(t),n=[],i=[];function s(h){d.camera=h,n.length=0,i.length=0}function a(h){n.push(h)}function l(h){i.push(h)}function u(){e.setup(n)}function f(h){e.setupView(n,h)}const d={lightsArray:n,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:d,setupLights:u,setupLightsView:f,pushLight:a,pushShadow:l}}function o5(t){let e=new WeakMap;function n(s,a=0){const l=e.get(s);let u;return l===void 0?(u=new PE(t),e.set(s,[u])):a>=l.length?(u=new PE(t),l.push(u)):u=l[a],u}function i(){e=new WeakMap}return{get:n,dispose:i}}const a5=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,l5=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function u5(t,e,n){let i=new nT;const s=new Ut,a=new Ut,l=new ln,u=new FO({depthPacking:KF}),f=new OO,d={},h=n.maxTextureSize,m={[Ms]:ii,[ii]:Ms,[Cr]:Cr},g=new Fr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ut},radius:{value:4}},vertexShader:a5,fragmentShader:l5}),v=g.clone();v.defines.HORIZONTAL_PASS=1;const E=new mo;E.setAttribute("position",new sr(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const w=new nr(E,g),_=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=DM;let y=this.type;this.render=function(b,k,B){if(_.enabled===!1||_.autoUpdate===!1&&_.needsUpdate===!1||b.length===0)return;const L=t.getRenderTarget(),R=t.getActiveCubeFace(),O=t.getActiveMipmapLevel(),Z=t.state;Z.setBlending(xs),Z.buffers.color.setClear(1,1,1,1),Z.buffers.depth.setTest(!0),Z.setScissorTest(!1);const X=y!==Tr&&this.type===Tr,J=y===Tr&&this.type!==Tr;for(let ne=0,le=b.length;ne<le;ne++){const re=b[ne],G=re.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",re,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);const ue=G.getFrameExtents();if(s.multiply(ue),a.copy(G.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(a.x=Math.floor(h/ue.x),s.x=a.x*ue.x,G.mapSize.x=a.x),s.y>h&&(a.y=Math.floor(h/ue.y),s.y=a.y*ue.y,G.mapSize.y=a.y)),G.map===null||X===!0||J===!0){const V=this.type!==Tr?{minFilter:ji,magFilter:ji}:{};G.map!==null&&G.map.dispose(),G.map=new fo(s.x,s.y,V),G.map.texture.name=re.name+".shadowMap",G.camera.updateProjectionMatrix()}t.setRenderTarget(G.map),t.clear();const D=G.getViewportCount();for(let V=0;V<D;V++){const ie=G.getViewport(V);l.set(a.x*ie.x,a.y*ie.y,a.x*ie.z,a.y*ie.w),Z.viewport(l),G.updateMatrices(re,V),i=G.getFrustum(),C(k,B,G.camera,re,this.type)}G.isPointLightShadow!==!0&&this.type===Tr&&M(G,B),G.needsUpdate=!1}y=this.type,_.needsUpdate=!1,t.setRenderTarget(L,R,O)};function M(b,k){const B=e.update(w);g.defines.VSM_SAMPLES!==b.blurSamples&&(g.defines.VSM_SAMPLES=b.blurSamples,v.defines.VSM_SAMPLES=b.blurSamples,g.needsUpdate=!0,v.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new fo(s.x,s.y)),g.uniforms.shadow_pass.value=b.map.texture,g.uniforms.resolution.value=b.mapSize,g.uniforms.radius.value=b.radius,t.setRenderTarget(b.mapPass),t.clear(),t.renderBufferDirect(k,null,B,g,w,null),v.uniforms.shadow_pass.value=b.mapPass.texture,v.uniforms.resolution.value=b.mapSize,v.uniforms.radius.value=b.radius,t.setRenderTarget(b.map),t.clear(),t.renderBufferDirect(k,null,B,v,w,null)}function T(b,k,B,L){let R=null;const O=B.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(O!==void 0)R=O;else if(R=B.isPointLight===!0?f:u,t.localClippingEnabled&&k.clipShadows===!0&&Array.isArray(k.clippingPlanes)&&k.clippingPlanes.length!==0||k.displacementMap&&k.displacementScale!==0||k.alphaMap&&k.alphaTest>0||k.map&&k.alphaTest>0){const Z=R.uuid,X=k.uuid;let J=d[Z];J===void 0&&(J={},d[Z]=J);let ne=J[X];ne===void 0&&(ne=R.clone(),J[X]=ne,k.addEventListener("dispose",N)),R=ne}if(R.visible=k.visible,R.wireframe=k.wireframe,L===Tr?R.side=k.shadowSide!==null?k.shadowSide:k.side:R.side=k.shadowSide!==null?k.shadowSide:m[k.side],R.alphaMap=k.alphaMap,R.alphaTest=k.alphaTest,R.map=k.map,R.clipShadows=k.clipShadows,R.clippingPlanes=k.clippingPlanes,R.clipIntersection=k.clipIntersection,R.displacementMap=k.displacementMap,R.displacementScale=k.displacementScale,R.displacementBias=k.displacementBias,R.wireframeLinewidth=k.wireframeLinewidth,R.linewidth=k.linewidth,B.isPointLight===!0&&R.isMeshDistanceMaterial===!0){const Z=t.properties.get(R);Z.light=B}return R}function C(b,k,B,L,R){if(b.visible===!1)return;if(b.layers.test(k.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&R===Tr)&&(!b.frustumCulled||i.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,b.matrixWorld);const X=e.update(b),J=b.material;if(Array.isArray(J)){const ne=X.groups;for(let le=0,re=ne.length;le<re;le++){const G=ne[le],ue=J[G.materialIndex];if(ue&&ue.visible){const D=T(b,ue,L,R);b.onBeforeShadow(t,b,k,B,X,D,G),t.renderBufferDirect(B,null,X,D,b,G),b.onAfterShadow(t,b,k,B,X,D,G)}}}else if(J.visible){const ne=T(b,J,L,R);b.onBeforeShadow(t,b,k,B,X,ne,null),t.renderBufferDirect(B,null,X,ne,b,null),b.onAfterShadow(t,b,k,B,X,ne,null)}}const Z=b.children;for(let X=0,J=Z.length;X<J;X++)C(Z[X],k,B,L,R)}function N(b){b.target.removeEventListener("dispose",N);for(const B in d){const L=d[B],R=b.target.uuid;R in L&&(L[R].dispose(),delete L[R])}}}const c5={[zm]:Vm,[Hm]:jm,[Gm]:Xm,[Ma]:Wm,[Vm]:zm,[jm]:Hm,[Xm]:Gm,[Wm]:Ma};function f5(t,e){function n(){let K=!1;const Ie=new ln;let me=null;const xe=new ln(0,0,0,0);return{setMask:function(Oe){me!==Oe&&!K&&(t.colorMask(Oe,Oe,Oe,Oe),me=Oe)},setLocked:function(Oe){K=Oe},setClear:function(Oe,Fe,dt,Wt,pn){pn===!0&&(Oe*=Wt,Fe*=Wt,dt*=Wt),Ie.set(Oe,Fe,dt,Wt),xe.equals(Ie)===!1&&(t.clearColor(Oe,Fe,dt,Wt),xe.copy(Ie))},reset:function(){K=!1,me=null,xe.set(-1,0,0,0)}}}function i(){let K=!1,Ie=!1,me=null,xe=null,Oe=null;return{setReversed:function(Fe){if(Ie!==Fe){const dt=e.get("EXT_clip_control");Ie?dt.clipControlEXT(dt.LOWER_LEFT_EXT,dt.ZERO_TO_ONE_EXT):dt.clipControlEXT(dt.LOWER_LEFT_EXT,dt.NEGATIVE_ONE_TO_ONE_EXT);const Wt=Oe;Oe=null,this.setClear(Wt)}Ie=Fe},getReversed:function(){return Ie},setTest:function(Fe){Fe?Se(t.DEPTH_TEST):Re(t.DEPTH_TEST)},setMask:function(Fe){me!==Fe&&!K&&(t.depthMask(Fe),me=Fe)},setFunc:function(Fe){if(Ie&&(Fe=c5[Fe]),xe!==Fe){switch(Fe){case zm:t.depthFunc(t.NEVER);break;case Vm:t.depthFunc(t.ALWAYS);break;case Hm:t.depthFunc(t.LESS);break;case Ma:t.depthFunc(t.LEQUAL);break;case Gm:t.depthFunc(t.EQUAL);break;case Wm:t.depthFunc(t.GEQUAL);break;case jm:t.depthFunc(t.GREATER);break;case Xm:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}xe=Fe}},setLocked:function(Fe){K=Fe},setClear:function(Fe){Oe!==Fe&&(Ie&&(Fe=1-Fe),t.clearDepth(Fe),Oe=Fe)},reset:function(){K=!1,me=null,xe=null,Oe=null,Ie=!1}}}function s(){let K=!1,Ie=null,me=null,xe=null,Oe=null,Fe=null,dt=null,Wt=null,pn=null;return{setTest:function(Ct){K||(Ct?Se(t.STENCIL_TEST):Re(t.STENCIL_TEST))},setMask:function(Ct){Ie!==Ct&&!K&&(t.stencilMask(Ct),Ie=Ct)},setFunc:function(Ct,Xn,zn){(me!==Ct||xe!==Xn||Oe!==zn)&&(t.stencilFunc(Ct,Xn,zn),me=Ct,xe=Xn,Oe=zn)},setOp:function(Ct,Xn,zn){(Fe!==Ct||dt!==Xn||Wt!==zn)&&(t.stencilOp(Ct,Xn,zn),Fe=Ct,dt=Xn,Wt=zn)},setLocked:function(Ct){K=Ct},setClear:function(Ct){pn!==Ct&&(t.clearStencil(Ct),pn=Ct)},reset:function(){K=!1,Ie=null,me=null,xe=null,Oe=null,Fe=null,dt=null,Wt=null,pn=null}}}const a=new n,l=new i,u=new s,f=new WeakMap,d=new WeakMap;let h={},m={},g=new WeakMap,v=[],E=null,w=!1,_=null,y=null,M=null,T=null,C=null,N=null,b=null,k=new zt(0,0,0),B=0,L=!1,R=null,O=null,Z=null,X=null,J=null;const ne=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let le=!1,re=0;const G=t.getParameter(t.VERSION);G.indexOf("WebGL")!==-1?(re=parseFloat(/^WebGL (\d)/.exec(G)[1]),le=re>=1):G.indexOf("OpenGL ES")!==-1&&(re=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),le=re>=2);let ue=null,D={};const V=t.getParameter(t.SCISSOR_BOX),ie=t.getParameter(t.VIEWPORT),U=new ln().fromArray(V),ee=new ln().fromArray(ie);function ge(K,Ie,me,xe){const Oe=new Uint8Array(4),Fe=t.createTexture();t.bindTexture(K,Fe),t.texParameteri(K,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(K,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let dt=0;dt<me;dt++)K===t.TEXTURE_3D||K===t.TEXTURE_2D_ARRAY?t.texImage3D(Ie,0,t.RGBA,1,1,xe,0,t.RGBA,t.UNSIGNED_BYTE,Oe):t.texImage2D(Ie+dt,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,Oe);return Fe}const ye={};ye[t.TEXTURE_2D]=ge(t.TEXTURE_2D,t.TEXTURE_2D,1),ye[t.TEXTURE_CUBE_MAP]=ge(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),ye[t.TEXTURE_2D_ARRAY]=ge(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),ye[t.TEXTURE_3D]=ge(t.TEXTURE_3D,t.TEXTURE_3D,1,1),a.setClear(0,0,0,1),l.setClear(1),u.setClear(0),Se(t.DEPTH_TEST),l.setFunc(Ma),vt(!1),mt(US),Se(t.CULL_FACE),j(xs);function Se(K){h[K]!==!0&&(t.enable(K),h[K]=!0)}function Re(K){h[K]!==!1&&(t.disable(K),h[K]=!1)}function Le(K,Ie){return m[K]!==Ie?(t.bindFramebuffer(K,Ie),m[K]=Ie,K===t.DRAW_FRAMEBUFFER&&(m[t.FRAMEBUFFER]=Ie),K===t.FRAMEBUFFER&&(m[t.DRAW_FRAMEBUFFER]=Ie),!0):!1}function $e(K,Ie){let me=v,xe=!1;if(K){me=g.get(Ie),me===void 0&&(me=[],g.set(Ie,me));const Oe=K.textures;if(me.length!==Oe.length||me[0]!==t.COLOR_ATTACHMENT0){for(let Fe=0,dt=Oe.length;Fe<dt;Fe++)me[Fe]=t.COLOR_ATTACHMENT0+Fe;me.length=Oe.length,xe=!0}}else me[0]!==t.BACK&&(me[0]=t.BACK,xe=!0);xe&&t.drawBuffers(me)}function St(K){return E!==K?(t.useProgram(K),E=K,!0):!1}const at={[eo]:t.FUNC_ADD,[EF]:t.FUNC_SUBTRACT,[wF]:t.FUNC_REVERSE_SUBTRACT};at[MF]=t.MIN,at[TF]=t.MAX;const Ft={[AF]:t.ZERO,[CF]:t.ONE,[bF]:t.SRC_COLOR,[Om]:t.SRC_ALPHA,[kF]:t.SRC_ALPHA_SATURATE,[LF]:t.DST_COLOR,[PF]:t.DST_ALPHA,[RF]:t.ONE_MINUS_SRC_COLOR,[Bm]:t.ONE_MINUS_SRC_ALPHA,[IF]:t.ONE_MINUS_DST_COLOR,[DF]:t.ONE_MINUS_DST_ALPHA,[NF]:t.CONSTANT_COLOR,[UF]:t.ONE_MINUS_CONSTANT_COLOR,[FF]:t.CONSTANT_ALPHA,[OF]:t.ONE_MINUS_CONSTANT_ALPHA};function j(K,Ie,me,xe,Oe,Fe,dt,Wt,pn,Ct){if(K===xs){w===!0&&(Re(t.BLEND),w=!1);return}if(w===!1&&(Se(t.BLEND),w=!0),K!==SF){if(K!==_||Ct!==L){if((y!==eo||C!==eo)&&(t.blendEquation(t.FUNC_ADD),y=eo,C=eo),Ct)switch(K){case da:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case FS:t.blendFunc(t.ONE,t.ONE);break;case OS:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case BS:t.blendFuncSeparate(t.ZERO,t.SRC_COLOR,t.ZERO,t.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",K);break}else switch(K){case da:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case FS:t.blendFunc(t.SRC_ALPHA,t.ONE);break;case OS:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case BS:t.blendFunc(t.ZERO,t.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",K);break}M=null,T=null,N=null,b=null,k.set(0,0,0),B=0,_=K,L=Ct}return}Oe=Oe||Ie,Fe=Fe||me,dt=dt||xe,(Ie!==y||Oe!==C)&&(t.blendEquationSeparate(at[Ie],at[Oe]),y=Ie,C=Oe),(me!==M||xe!==T||Fe!==N||dt!==b)&&(t.blendFuncSeparate(Ft[me],Ft[xe],Ft[Fe],Ft[dt]),M=me,T=xe,N=Fe,b=dt),(Wt.equals(k)===!1||pn!==B)&&(t.blendColor(Wt.r,Wt.g,Wt.b,pn),k.copy(Wt),B=pn),_=K,L=!1}function xn(K,Ie){K.side===Cr?Re(t.CULL_FACE):Se(t.CULL_FACE);let me=K.side===ii;Ie&&(me=!me),vt(me),K.blending===da&&K.transparent===!1?j(xs):j(K.blending,K.blendEquation,K.blendSrc,K.blendDst,K.blendEquationAlpha,K.blendSrcAlpha,K.blendDstAlpha,K.blendColor,K.blendAlpha,K.premultipliedAlpha),l.setFunc(K.depthFunc),l.setTest(K.depthTest),l.setMask(K.depthWrite),a.setMask(K.colorWrite);const xe=K.stencilWrite;u.setTest(xe),xe&&(u.setMask(K.stencilWriteMask),u.setFunc(K.stencilFunc,K.stencilRef,K.stencilFuncMask),u.setOp(K.stencilFail,K.stencilZFail,K.stencilZPass)),Rt(K.polygonOffset,K.polygonOffsetFactor,K.polygonOffsetUnits),K.alphaToCoverage===!0?Se(t.SAMPLE_ALPHA_TO_COVERAGE):Re(t.SAMPLE_ALPHA_TO_COVERAGE)}function vt(K){R!==K&&(K?t.frontFace(t.CW):t.frontFace(t.CCW),R=K)}function mt(K){K!==yF?(Se(t.CULL_FACE),K!==O&&(K===US?t.cullFace(t.BACK):K===xF?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):Re(t.CULL_FACE),O=K}function Qe(K){K!==Z&&(le&&t.lineWidth(K),Z=K)}function Rt(K,Ie,me){K?(Se(t.POLYGON_OFFSET_FILL),(X!==Ie||J!==me)&&(t.polygonOffset(Ie,me),X=Ie,J=me)):Re(t.POLYGON_OFFSET_FILL)}function qe(K){K?Se(t.SCISSOR_TEST):Re(t.SCISSOR_TEST)}function F(K){K===void 0&&(K=t.TEXTURE0+ne-1),ue!==K&&(t.activeTexture(K),ue=K)}function P(K,Ie,me){me===void 0&&(ue===null?me=t.TEXTURE0+ne-1:me=ue);let xe=D[me];xe===void 0&&(xe={type:void 0,texture:void 0},D[me]=xe),(xe.type!==K||xe.texture!==Ie)&&(ue!==me&&(t.activeTexture(me),ue=me),t.bindTexture(K,Ie||ye[K]),xe.type=K,xe.texture=Ie)}function oe(){const K=D[ue];K!==void 0&&K.type!==void 0&&(t.bindTexture(K.type,null),K.type=void 0,K.texture=void 0)}function _e(){try{t.compressedTexImage2D.apply(t,arguments)}catch(K){console.error("THREE.WebGLState:",K)}}function we(){try{t.compressedTexImage3D.apply(t,arguments)}catch(K){console.error("THREE.WebGLState:",K)}}function H(){try{t.texSubImage2D.apply(t,arguments)}catch(K){console.error("THREE.WebGLState:",K)}}function de(){try{t.texSubImage3D.apply(t,arguments)}catch(K){console.error("THREE.WebGLState:",K)}}function ve(){try{t.compressedTexSubImage2D.apply(t,arguments)}catch(K){console.error("THREE.WebGLState:",K)}}function Me(){try{t.compressedTexSubImage3D.apply(t,arguments)}catch(K){console.error("THREE.WebGLState:",K)}}function Ge(){try{t.texStorage2D.apply(t,arguments)}catch(K){console.error("THREE.WebGLState:",K)}}function Ee(){try{t.texStorage3D.apply(t,arguments)}catch(K){console.error("THREE.WebGLState:",K)}}function Ue(){try{t.texImage2D.apply(t,arguments)}catch(K){console.error("THREE.WebGLState:",K)}}function Ye(){try{t.texImage3D.apply(t,arguments)}catch(K){console.error("THREE.WebGLState:",K)}}function et(K){U.equals(K)===!1&&(t.scissor(K.x,K.y,K.z,K.w),U.copy(K))}function Be(K){ee.equals(K)===!1&&(t.viewport(K.x,K.y,K.z,K.w),ee.copy(K))}function nt(K,Ie){let me=d.get(Ie);me===void 0&&(me=new WeakMap,d.set(Ie,me));let xe=me.get(K);xe===void 0&&(xe=t.getUniformBlockIndex(Ie,K.name),me.set(K,xe))}function st(K,Ie){const xe=d.get(Ie).get(K);f.get(Ie)!==xe&&(t.uniformBlockBinding(Ie,xe,K.__bindingPointIndex),f.set(Ie,xe))}function yt(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),l.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),h={},ue=null,D={},m={},g=new WeakMap,v=[],E=null,w=!1,_=null,y=null,M=null,T=null,C=null,N=null,b=null,k=new zt(0,0,0),B=0,L=!1,R=null,O=null,Z=null,X=null,J=null,U.set(0,0,t.canvas.width,t.canvas.height),ee.set(0,0,t.canvas.width,t.canvas.height),a.reset(),l.reset(),u.reset()}return{buffers:{color:a,depth:l,stencil:u},enable:Se,disable:Re,bindFramebuffer:Le,drawBuffers:$e,useProgram:St,setBlending:j,setMaterial:xn,setFlipSided:vt,setCullFace:mt,setLineWidth:Qe,setPolygonOffset:Rt,setScissorTest:qe,activeTexture:F,bindTexture:P,unbindTexture:oe,compressedTexImage2D:_e,compressedTexImage3D:we,texImage2D:Ue,texImage3D:Ye,updateUBOMapping:nt,uniformBlockBinding:st,texStorage2D:Ge,texStorage3D:Ee,texSubImage2D:H,texSubImage3D:de,compressedTexSubImage2D:ve,compressedTexSubImage3D:Me,scissor:et,viewport:Be,reset:yt}}function d5(t,e,n,i,s,a,l){const u=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,f=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new Ut,h=new WeakMap;let m;const g=new WeakMap;let v=!1;try{v=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function E(F,P){return v?new OffscreenCanvas(F,P):jf("canvas")}function w(F,P,oe){let _e=1;const we=qe(F);if((we.width>oe||we.height>oe)&&(_e=oe/Math.max(we.width,we.height)),_e<1)if(typeof HTMLImageElement<"u"&&F instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&F instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&F instanceof ImageBitmap||typeof VideoFrame<"u"&&F instanceof VideoFrame){const H=Math.floor(_e*we.width),de=Math.floor(_e*we.height);m===void 0&&(m=E(H,de));const ve=P?E(H,de):m;return ve.width=H,ve.height=de,ve.getContext("2d").drawImage(F,0,0,H,de),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+we.width+"x"+we.height+") to ("+H+"x"+de+")."),ve}else return"data"in F&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+we.width+"x"+we.height+")."),F;return F}function _(F){return F.generateMipmaps}function y(F){t.generateMipmap(F)}function M(F){return F.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:F.isWebGL3DRenderTarget?t.TEXTURE_3D:F.isWebGLArrayRenderTarget||F.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function T(F,P,oe,_e,we=!1){if(F!==null){if(t[F]!==void 0)return t[F];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+F+"'")}let H=P;if(P===t.RED&&(oe===t.FLOAT&&(H=t.R32F),oe===t.HALF_FLOAT&&(H=t.R16F),oe===t.UNSIGNED_BYTE&&(H=t.R8)),P===t.RED_INTEGER&&(oe===t.UNSIGNED_BYTE&&(H=t.R8UI),oe===t.UNSIGNED_SHORT&&(H=t.R16UI),oe===t.UNSIGNED_INT&&(H=t.R32UI),oe===t.BYTE&&(H=t.R8I),oe===t.SHORT&&(H=t.R16I),oe===t.INT&&(H=t.R32I)),P===t.RG&&(oe===t.FLOAT&&(H=t.RG32F),oe===t.HALF_FLOAT&&(H=t.RG16F),oe===t.UNSIGNED_BYTE&&(H=t.RG8)),P===t.RG_INTEGER&&(oe===t.UNSIGNED_BYTE&&(H=t.RG8UI),oe===t.UNSIGNED_SHORT&&(H=t.RG16UI),oe===t.UNSIGNED_INT&&(H=t.RG32UI),oe===t.BYTE&&(H=t.RG8I),oe===t.SHORT&&(H=t.RG16I),oe===t.INT&&(H=t.RG32I)),P===t.RGB_INTEGER&&(oe===t.UNSIGNED_BYTE&&(H=t.RGB8UI),oe===t.UNSIGNED_SHORT&&(H=t.RGB16UI),oe===t.UNSIGNED_INT&&(H=t.RGB32UI),oe===t.BYTE&&(H=t.RGB8I),oe===t.SHORT&&(H=t.RGB16I),oe===t.INT&&(H=t.RGB32I)),P===t.RGBA_INTEGER&&(oe===t.UNSIGNED_BYTE&&(H=t.RGBA8UI),oe===t.UNSIGNED_SHORT&&(H=t.RGBA16UI),oe===t.UNSIGNED_INT&&(H=t.RGBA32UI),oe===t.BYTE&&(H=t.RGBA8I),oe===t.SHORT&&(H=t.RGBA16I),oe===t.INT&&(H=t.RGBA32I)),P===t.RGB&&oe===t.UNSIGNED_INT_5_9_9_9_REV&&(H=t.RGB9_E5),P===t.RGBA){const de=we?Gf:It.getTransfer(_e);oe===t.FLOAT&&(H=t.RGBA32F),oe===t.HALF_FLOAT&&(H=t.RGBA16F),oe===t.UNSIGNED_BYTE&&(H=de===Bt?t.SRGB8_ALPHA8:t.RGBA8),oe===t.UNSIGNED_SHORT_4_4_4_4&&(H=t.RGBA4),oe===t.UNSIGNED_SHORT_5_5_5_1&&(H=t.RGB5_A1)}return(H===t.R16F||H===t.R32F||H===t.RG16F||H===t.RG32F||H===t.RGBA16F||H===t.RGBA32F)&&e.get("EXT_color_buffer_float"),H}function C(F,P){let oe;return F?P===null||P===co||P===Ca?oe=t.DEPTH24_STENCIL8:P===br?oe=t.DEPTH32F_STENCIL8:P===Ql&&(oe=t.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):P===null||P===co||P===Ca?oe=t.DEPTH_COMPONENT24:P===br?oe=t.DEPTH_COMPONENT32F:P===Ql&&(oe=t.DEPTH_COMPONENT16),oe}function N(F,P){return _(F)===!0||F.isFramebufferTexture&&F.minFilter!==ji&&F.minFilter!==tr?Math.log2(Math.max(P.width,P.height))+1:F.mipmaps!==void 0&&F.mipmaps.length>0?F.mipmaps.length:F.isCompressedTexture&&Array.isArray(F.image)?P.mipmaps.length:1}function b(F){const P=F.target;P.removeEventListener("dispose",b),B(P),P.isVideoTexture&&h.delete(P)}function k(F){const P=F.target;P.removeEventListener("dispose",k),R(P)}function B(F){const P=i.get(F);if(P.__webglInit===void 0)return;const oe=F.source,_e=g.get(oe);if(_e){const we=_e[P.__cacheKey];we.usedTimes--,we.usedTimes===0&&L(F),Object.keys(_e).length===0&&g.delete(oe)}i.remove(F)}function L(F){const P=i.get(F);t.deleteTexture(P.__webglTexture);const oe=F.source,_e=g.get(oe);delete _e[P.__cacheKey],l.memory.textures--}function R(F){const P=i.get(F);if(F.depthTexture&&(F.depthTexture.dispose(),i.remove(F.depthTexture)),F.isWebGLCubeRenderTarget)for(let _e=0;_e<6;_e++){if(Array.isArray(P.__webglFramebuffer[_e]))for(let we=0;we<P.__webglFramebuffer[_e].length;we++)t.deleteFramebuffer(P.__webglFramebuffer[_e][we]);else t.deleteFramebuffer(P.__webglFramebuffer[_e]);P.__webglDepthbuffer&&t.deleteRenderbuffer(P.__webglDepthbuffer[_e])}else{if(Array.isArray(P.__webglFramebuffer))for(let _e=0;_e<P.__webglFramebuffer.length;_e++)t.deleteFramebuffer(P.__webglFramebuffer[_e]);else t.deleteFramebuffer(P.__webglFramebuffer);if(P.__webglDepthbuffer&&t.deleteRenderbuffer(P.__webglDepthbuffer),P.__webglMultisampledFramebuffer&&t.deleteFramebuffer(P.__webglMultisampledFramebuffer),P.__webglColorRenderbuffer)for(let _e=0;_e<P.__webglColorRenderbuffer.length;_e++)P.__webglColorRenderbuffer[_e]&&t.deleteRenderbuffer(P.__webglColorRenderbuffer[_e]);P.__webglDepthRenderbuffer&&t.deleteRenderbuffer(P.__webglDepthRenderbuffer)}const oe=F.textures;for(let _e=0,we=oe.length;_e<we;_e++){const H=i.get(oe[_e]);H.__webglTexture&&(t.deleteTexture(H.__webglTexture),l.memory.textures--),i.remove(oe[_e])}i.remove(F)}let O=0;function Z(){O=0}function X(){const F=O;return F>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+F+" texture units while this GPU supports only "+s.maxTextures),O+=1,F}function J(F){const P=[];return P.push(F.wrapS),P.push(F.wrapT),P.push(F.wrapR||0),P.push(F.magFilter),P.push(F.minFilter),P.push(F.anisotropy),P.push(F.internalFormat),P.push(F.format),P.push(F.type),P.push(F.generateMipmaps),P.push(F.premultiplyAlpha),P.push(F.flipY),P.push(F.unpackAlignment),P.push(F.colorSpace),P.join()}function ne(F,P){const oe=i.get(F);if(F.isVideoTexture&&Qe(F),F.isRenderTargetTexture===!1&&F.version>0&&oe.__version!==F.version){const _e=F.image;if(_e===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(_e.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ee(oe,F,P);return}}n.bindTexture(t.TEXTURE_2D,oe.__webglTexture,t.TEXTURE0+P)}function le(F,P){const oe=i.get(F);if(F.version>0&&oe.__version!==F.version){ee(oe,F,P);return}n.bindTexture(t.TEXTURE_2D_ARRAY,oe.__webglTexture,t.TEXTURE0+P)}function re(F,P){const oe=i.get(F);if(F.version>0&&oe.__version!==F.version){ee(oe,F,P);return}n.bindTexture(t.TEXTURE_3D,oe.__webglTexture,t.TEXTURE0+P)}function G(F,P){const oe=i.get(F);if(F.version>0&&oe.__version!==F.version){ge(oe,F,P);return}n.bindTexture(t.TEXTURE_CUBE_MAP,oe.__webglTexture,t.TEXTURE0+P)}const ue={[Ym]:t.REPEAT,[ro]:t.CLAMP_TO_EDGE,[Km]:t.MIRRORED_REPEAT},D={[ji]:t.NEAREST,[qF]:t.NEAREST_MIPMAP_NEAREST,[Wc]:t.NEAREST_MIPMAP_LINEAR,[tr]:t.LINEAR,[Ap]:t.LINEAR_MIPMAP_NEAREST,[so]:t.LINEAR_MIPMAP_LINEAR},V={[JF]:t.NEVER,[sO]:t.ALWAYS,[eO]:t.LESS,[WM]:t.LEQUAL,[tO]:t.EQUAL,[rO]:t.GEQUAL,[nO]:t.GREATER,[iO]:t.NOTEQUAL};function ie(F,P){if(P.type===br&&e.has("OES_texture_float_linear")===!1&&(P.magFilter===tr||P.magFilter===Ap||P.magFilter===Wc||P.magFilter===so||P.minFilter===tr||P.minFilter===Ap||P.minFilter===Wc||P.minFilter===so)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(F,t.TEXTURE_WRAP_S,ue[P.wrapS]),t.texParameteri(F,t.TEXTURE_WRAP_T,ue[P.wrapT]),(F===t.TEXTURE_3D||F===t.TEXTURE_2D_ARRAY)&&t.texParameteri(F,t.TEXTURE_WRAP_R,ue[P.wrapR]),t.texParameteri(F,t.TEXTURE_MAG_FILTER,D[P.magFilter]),t.texParameteri(F,t.TEXTURE_MIN_FILTER,D[P.minFilter]),P.compareFunction&&(t.texParameteri(F,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(F,t.TEXTURE_COMPARE_FUNC,V[P.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(P.magFilter===ji||P.minFilter!==Wc&&P.minFilter!==so||P.type===br&&e.has("OES_texture_float_linear")===!1)return;if(P.anisotropy>1||i.get(P).__currentAnisotropy){const oe=e.get("EXT_texture_filter_anisotropic");t.texParameterf(F,oe.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(P.anisotropy,s.getMaxAnisotropy())),i.get(P).__currentAnisotropy=P.anisotropy}}}function U(F,P){let oe=!1;F.__webglInit===void 0&&(F.__webglInit=!0,P.addEventListener("dispose",b));const _e=P.source;let we=g.get(_e);we===void 0&&(we={},g.set(_e,we));const H=J(P);if(H!==F.__cacheKey){we[H]===void 0&&(we[H]={texture:t.createTexture(),usedTimes:0},l.memory.textures++,oe=!0),we[H].usedTimes++;const de=we[F.__cacheKey];de!==void 0&&(we[F.__cacheKey].usedTimes--,de.usedTimes===0&&L(P)),F.__cacheKey=H,F.__webglTexture=we[H].texture}return oe}function ee(F,P,oe){let _e=t.TEXTURE_2D;(P.isDataArrayTexture||P.isCompressedArrayTexture)&&(_e=t.TEXTURE_2D_ARRAY),P.isData3DTexture&&(_e=t.TEXTURE_3D);const we=U(F,P),H=P.source;n.bindTexture(_e,F.__webglTexture,t.TEXTURE0+oe);const de=i.get(H);if(H.version!==de.__version||we===!0){n.activeTexture(t.TEXTURE0+oe);const ve=It.getPrimaries(It.workingColorSpace),Me=P.colorSpace===ys?null:It.getPrimaries(P.colorSpace),Ge=P.colorSpace===ys||ve===Me?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,P.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,P.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ge);let Ee=w(P.image,!1,s.maxTextureSize);Ee=Rt(P,Ee);const Ue=a.convert(P.format,P.colorSpace),Ye=a.convert(P.type);let et=T(P.internalFormat,Ue,Ye,P.colorSpace,P.isVideoTexture);ie(_e,P);let Be;const nt=P.mipmaps,st=P.isVideoTexture!==!0,yt=de.__version===void 0||we===!0,K=H.dataReady,Ie=N(P,Ee);if(P.isDepthTexture)et=C(P.format===ba,P.type),yt&&(st?n.texStorage2D(t.TEXTURE_2D,1,et,Ee.width,Ee.height):n.texImage2D(t.TEXTURE_2D,0,et,Ee.width,Ee.height,0,Ue,Ye,null));else if(P.isDataTexture)if(nt.length>0){st&&yt&&n.texStorage2D(t.TEXTURE_2D,Ie,et,nt[0].width,nt[0].height);for(let me=0,xe=nt.length;me<xe;me++)Be=nt[me],st?K&&n.texSubImage2D(t.TEXTURE_2D,me,0,0,Be.width,Be.height,Ue,Ye,Be.data):n.texImage2D(t.TEXTURE_2D,me,et,Be.width,Be.height,0,Ue,Ye,Be.data);P.generateMipmaps=!1}else st?(yt&&n.texStorage2D(t.TEXTURE_2D,Ie,et,Ee.width,Ee.height),K&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,Ee.width,Ee.height,Ue,Ye,Ee.data)):n.texImage2D(t.TEXTURE_2D,0,et,Ee.width,Ee.height,0,Ue,Ye,Ee.data);else if(P.isCompressedTexture)if(P.isCompressedArrayTexture){st&&yt&&n.texStorage3D(t.TEXTURE_2D_ARRAY,Ie,et,nt[0].width,nt[0].height,Ee.depth);for(let me=0,xe=nt.length;me<xe;me++)if(Be=nt[me],P.format!==Gi)if(Ue!==null)if(st){if(K)if(P.layerUpdates.size>0){const Oe=oE(Be.width,Be.height,P.format,P.type);for(const Fe of P.layerUpdates){const dt=Be.data.subarray(Fe*Oe/Be.data.BYTES_PER_ELEMENT,(Fe+1)*Oe/Be.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,me,0,0,Fe,Be.width,Be.height,1,Ue,dt)}P.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,me,0,0,0,Be.width,Be.height,Ee.depth,Ue,Be.data)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,me,et,Be.width,Be.height,Ee.depth,0,Be.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else st?K&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,me,0,0,0,Be.width,Be.height,Ee.depth,Ue,Ye,Be.data):n.texImage3D(t.TEXTURE_2D_ARRAY,me,et,Be.width,Be.height,Ee.depth,0,Ue,Ye,Be.data)}else{st&&yt&&n.texStorage2D(t.TEXTURE_2D,Ie,et,nt[0].width,nt[0].height);for(let me=0,xe=nt.length;me<xe;me++)Be=nt[me],P.format!==Gi?Ue!==null?st?K&&n.compressedTexSubImage2D(t.TEXTURE_2D,me,0,0,Be.width,Be.height,Ue,Be.data):n.compressedTexImage2D(t.TEXTURE_2D,me,et,Be.width,Be.height,0,Be.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):st?K&&n.texSubImage2D(t.TEXTURE_2D,me,0,0,Be.width,Be.height,Ue,Ye,Be.data):n.texImage2D(t.TEXTURE_2D,me,et,Be.width,Be.height,0,Ue,Ye,Be.data)}else if(P.isDataArrayTexture)if(st){if(yt&&n.texStorage3D(t.TEXTURE_2D_ARRAY,Ie,et,Ee.width,Ee.height,Ee.depth),K)if(P.layerUpdates.size>0){const me=oE(Ee.width,Ee.height,P.format,P.type);for(const xe of P.layerUpdates){const Oe=Ee.data.subarray(xe*me/Ee.data.BYTES_PER_ELEMENT,(xe+1)*me/Ee.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,xe,Ee.width,Ee.height,1,Ue,Ye,Oe)}P.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,Ee.width,Ee.height,Ee.depth,Ue,Ye,Ee.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,et,Ee.width,Ee.height,Ee.depth,0,Ue,Ye,Ee.data);else if(P.isData3DTexture)st?(yt&&n.texStorage3D(t.TEXTURE_3D,Ie,et,Ee.width,Ee.height,Ee.depth),K&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,Ee.width,Ee.height,Ee.depth,Ue,Ye,Ee.data)):n.texImage3D(t.TEXTURE_3D,0,et,Ee.width,Ee.height,Ee.depth,0,Ue,Ye,Ee.data);else if(P.isFramebufferTexture){if(yt)if(st)n.texStorage2D(t.TEXTURE_2D,Ie,et,Ee.width,Ee.height);else{let me=Ee.width,xe=Ee.height;for(let Oe=0;Oe<Ie;Oe++)n.texImage2D(t.TEXTURE_2D,Oe,et,me,xe,0,Ue,Ye,null),me>>=1,xe>>=1}}else if(nt.length>0){if(st&&yt){const me=qe(nt[0]);n.texStorage2D(t.TEXTURE_2D,Ie,et,me.width,me.height)}for(let me=0,xe=nt.length;me<xe;me++)Be=nt[me],st?K&&n.texSubImage2D(t.TEXTURE_2D,me,0,0,Ue,Ye,Be):n.texImage2D(t.TEXTURE_2D,me,et,Ue,Ye,Be);P.generateMipmaps=!1}else if(st){if(yt){const me=qe(Ee);n.texStorage2D(t.TEXTURE_2D,Ie,et,me.width,me.height)}K&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,Ue,Ye,Ee)}else n.texImage2D(t.TEXTURE_2D,0,et,Ue,Ye,Ee);_(P)&&y(_e),de.__version=H.version,P.onUpdate&&P.onUpdate(P)}F.__version=P.version}function ge(F,P,oe){if(P.image.length!==6)return;const _e=U(F,P),we=P.source;n.bindTexture(t.TEXTURE_CUBE_MAP,F.__webglTexture,t.TEXTURE0+oe);const H=i.get(we);if(we.version!==H.__version||_e===!0){n.activeTexture(t.TEXTURE0+oe);const de=It.getPrimaries(It.workingColorSpace),ve=P.colorSpace===ys?null:It.getPrimaries(P.colorSpace),Me=P.colorSpace===ys||de===ve?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,P.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,P.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me);const Ge=P.isCompressedTexture||P.image[0].isCompressedTexture,Ee=P.image[0]&&P.image[0].isDataTexture,Ue=[];for(let xe=0;xe<6;xe++)!Ge&&!Ee?Ue[xe]=w(P.image[xe],!0,s.maxCubemapSize):Ue[xe]=Ee?P.image[xe].image:P.image[xe],Ue[xe]=Rt(P,Ue[xe]);const Ye=Ue[0],et=a.convert(P.format,P.colorSpace),Be=a.convert(P.type),nt=T(P.internalFormat,et,Be,P.colorSpace),st=P.isVideoTexture!==!0,yt=H.__version===void 0||_e===!0,K=we.dataReady;let Ie=N(P,Ye);ie(t.TEXTURE_CUBE_MAP,P);let me;if(Ge){st&&yt&&n.texStorage2D(t.TEXTURE_CUBE_MAP,Ie,nt,Ye.width,Ye.height);for(let xe=0;xe<6;xe++){me=Ue[xe].mipmaps;for(let Oe=0;Oe<me.length;Oe++){const Fe=me[Oe];P.format!==Gi?et!==null?st?K&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Oe,0,0,Fe.width,Fe.height,et,Fe.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Oe,nt,Fe.width,Fe.height,0,Fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):st?K&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Oe,0,0,Fe.width,Fe.height,et,Be,Fe.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Oe,nt,Fe.width,Fe.height,0,et,Be,Fe.data)}}}else{if(me=P.mipmaps,st&&yt){me.length>0&&Ie++;const xe=qe(Ue[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,Ie,nt,xe.width,xe.height)}for(let xe=0;xe<6;xe++)if(Ee){st?K&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,0,0,Ue[xe].width,Ue[xe].height,et,Be,Ue[xe].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,nt,Ue[xe].width,Ue[xe].height,0,et,Be,Ue[xe].data);for(let Oe=0;Oe<me.length;Oe++){const dt=me[Oe].image[xe].image;st?K&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Oe+1,0,0,dt.width,dt.height,et,Be,dt.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Oe+1,nt,dt.width,dt.height,0,et,Be,dt.data)}}else{st?K&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,0,0,et,Be,Ue[xe]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,nt,et,Be,Ue[xe]);for(let Oe=0;Oe<me.length;Oe++){const Fe=me[Oe];st?K&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Oe+1,0,0,et,Be,Fe.image[xe]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Oe+1,nt,et,Be,Fe.image[xe])}}}_(P)&&y(t.TEXTURE_CUBE_MAP),H.__version=we.version,P.onUpdate&&P.onUpdate(P)}F.__version=P.version}function ye(F,P,oe,_e,we,H){const de=a.convert(oe.format,oe.colorSpace),ve=a.convert(oe.type),Me=T(oe.internalFormat,de,ve,oe.colorSpace),Ge=i.get(P),Ee=i.get(oe);if(Ee.__renderTarget=P,!Ge.__hasExternalTextures){const Ue=Math.max(1,P.width>>H),Ye=Math.max(1,P.height>>H);we===t.TEXTURE_3D||we===t.TEXTURE_2D_ARRAY?n.texImage3D(we,H,Me,Ue,Ye,P.depth,0,de,ve,null):n.texImage2D(we,H,Me,Ue,Ye,0,de,ve,null)}n.bindFramebuffer(t.FRAMEBUFFER,F),mt(P)?u.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,_e,we,Ee.__webglTexture,0,vt(P)):(we===t.TEXTURE_2D||we>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&we<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,_e,we,Ee.__webglTexture,H),n.bindFramebuffer(t.FRAMEBUFFER,null)}function Se(F,P,oe){if(t.bindRenderbuffer(t.RENDERBUFFER,F),P.depthBuffer){const _e=P.depthTexture,we=_e&&_e.isDepthTexture?_e.type:null,H=C(P.stencilBuffer,we),de=P.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,ve=vt(P);mt(P)?u.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,ve,H,P.width,P.height):oe?t.renderbufferStorageMultisample(t.RENDERBUFFER,ve,H,P.width,P.height):t.renderbufferStorage(t.RENDERBUFFER,H,P.width,P.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,de,t.RENDERBUFFER,F)}else{const _e=P.textures;for(let we=0;we<_e.length;we++){const H=_e[we],de=a.convert(H.format,H.colorSpace),ve=a.convert(H.type),Me=T(H.internalFormat,de,ve,H.colorSpace),Ge=vt(P);oe&&mt(P)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,Ge,Me,P.width,P.height):mt(P)?u.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,Ge,Me,P.width,P.height):t.renderbufferStorage(t.RENDERBUFFER,Me,P.width,P.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function Re(F,P){if(P&&P.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(t.FRAMEBUFFER,F),!(P.depthTexture&&P.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const _e=i.get(P.depthTexture);_e.__renderTarget=P,(!_e.__webglTexture||P.depthTexture.image.width!==P.width||P.depthTexture.image.height!==P.height)&&(P.depthTexture.image.width=P.width,P.depthTexture.image.height=P.height,P.depthTexture.needsUpdate=!0),ne(P.depthTexture,0);const we=_e.__webglTexture,H=vt(P);if(P.depthTexture.format===ha)mt(P)?u.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,we,0,H):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,we,0);else if(P.depthTexture.format===ba)mt(P)?u.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,we,0,H):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,we,0);else throw new Error("Unknown depthTexture format")}function Le(F){const P=i.get(F),oe=F.isWebGLCubeRenderTarget===!0;if(P.__boundDepthTexture!==F.depthTexture){const _e=F.depthTexture;if(P.__depthDisposeCallback&&P.__depthDisposeCallback(),_e){const we=()=>{delete P.__boundDepthTexture,delete P.__depthDisposeCallback,_e.removeEventListener("dispose",we)};_e.addEventListener("dispose",we),P.__depthDisposeCallback=we}P.__boundDepthTexture=_e}if(F.depthTexture&&!P.__autoAllocateDepthBuffer){if(oe)throw new Error("target.depthTexture not supported in Cube render targets");Re(P.__webglFramebuffer,F)}else if(oe){P.__webglDepthbuffer=[];for(let _e=0;_e<6;_e++)if(n.bindFramebuffer(t.FRAMEBUFFER,P.__webglFramebuffer[_e]),P.__webglDepthbuffer[_e]===void 0)P.__webglDepthbuffer[_e]=t.createRenderbuffer(),Se(P.__webglDepthbuffer[_e],F,!1);else{const we=F.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,H=P.__webglDepthbuffer[_e];t.bindRenderbuffer(t.RENDERBUFFER,H),t.framebufferRenderbuffer(t.FRAMEBUFFER,we,t.RENDERBUFFER,H)}}else if(n.bindFramebuffer(t.FRAMEBUFFER,P.__webglFramebuffer),P.__webglDepthbuffer===void 0)P.__webglDepthbuffer=t.createRenderbuffer(),Se(P.__webglDepthbuffer,F,!1);else{const _e=F.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,we=P.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,we),t.framebufferRenderbuffer(t.FRAMEBUFFER,_e,t.RENDERBUFFER,we)}n.bindFramebuffer(t.FRAMEBUFFER,null)}function $e(F,P,oe){const _e=i.get(F);P!==void 0&&ye(_e.__webglFramebuffer,F,F.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),oe!==void 0&&Le(F)}function St(F){const P=F.texture,oe=i.get(F),_e=i.get(P);F.addEventListener("dispose",k);const we=F.textures,H=F.isWebGLCubeRenderTarget===!0,de=we.length>1;if(de||(_e.__webglTexture===void 0&&(_e.__webglTexture=t.createTexture()),_e.__version=P.version,l.memory.textures++),H){oe.__webglFramebuffer=[];for(let ve=0;ve<6;ve++)if(P.mipmaps&&P.mipmaps.length>0){oe.__webglFramebuffer[ve]=[];for(let Me=0;Me<P.mipmaps.length;Me++)oe.__webglFramebuffer[ve][Me]=t.createFramebuffer()}else oe.__webglFramebuffer[ve]=t.createFramebuffer()}else{if(P.mipmaps&&P.mipmaps.length>0){oe.__webglFramebuffer=[];for(let ve=0;ve<P.mipmaps.length;ve++)oe.__webglFramebuffer[ve]=t.createFramebuffer()}else oe.__webglFramebuffer=t.createFramebuffer();if(de)for(let ve=0,Me=we.length;ve<Me;ve++){const Ge=i.get(we[ve]);Ge.__webglTexture===void 0&&(Ge.__webglTexture=t.createTexture(),l.memory.textures++)}if(F.samples>0&&mt(F)===!1){oe.__webglMultisampledFramebuffer=t.createFramebuffer(),oe.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,oe.__webglMultisampledFramebuffer);for(let ve=0;ve<we.length;ve++){const Me=we[ve];oe.__webglColorRenderbuffer[ve]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,oe.__webglColorRenderbuffer[ve]);const Ge=a.convert(Me.format,Me.colorSpace),Ee=a.convert(Me.type),Ue=T(Me.internalFormat,Ge,Ee,Me.colorSpace,F.isXRRenderTarget===!0),Ye=vt(F);t.renderbufferStorageMultisample(t.RENDERBUFFER,Ye,Ue,F.width,F.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ve,t.RENDERBUFFER,oe.__webglColorRenderbuffer[ve])}t.bindRenderbuffer(t.RENDERBUFFER,null),F.depthBuffer&&(oe.__webglDepthRenderbuffer=t.createRenderbuffer(),Se(oe.__webglDepthRenderbuffer,F,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(H){n.bindTexture(t.TEXTURE_CUBE_MAP,_e.__webglTexture),ie(t.TEXTURE_CUBE_MAP,P);for(let ve=0;ve<6;ve++)if(P.mipmaps&&P.mipmaps.length>0)for(let Me=0;Me<P.mipmaps.length;Me++)ye(oe.__webglFramebuffer[ve][Me],F,P,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+ve,Me);else ye(oe.__webglFramebuffer[ve],F,P,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0);_(P)&&y(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(de){for(let ve=0,Me=we.length;ve<Me;ve++){const Ge=we[ve],Ee=i.get(Ge);n.bindTexture(t.TEXTURE_2D,Ee.__webglTexture),ie(t.TEXTURE_2D,Ge),ye(oe.__webglFramebuffer,F,Ge,t.COLOR_ATTACHMENT0+ve,t.TEXTURE_2D,0),_(Ge)&&y(t.TEXTURE_2D)}n.unbindTexture()}else{let ve=t.TEXTURE_2D;if((F.isWebGL3DRenderTarget||F.isWebGLArrayRenderTarget)&&(ve=F.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(ve,_e.__webglTexture),ie(ve,P),P.mipmaps&&P.mipmaps.length>0)for(let Me=0;Me<P.mipmaps.length;Me++)ye(oe.__webglFramebuffer[Me],F,P,t.COLOR_ATTACHMENT0,ve,Me);else ye(oe.__webglFramebuffer,F,P,t.COLOR_ATTACHMENT0,ve,0);_(P)&&y(ve),n.unbindTexture()}F.depthBuffer&&Le(F)}function at(F){const P=F.textures;for(let oe=0,_e=P.length;oe<_e;oe++){const we=P[oe];if(_(we)){const H=M(F),de=i.get(we).__webglTexture;n.bindTexture(H,de),y(H),n.unbindTexture()}}}const Ft=[],j=[];function xn(F){if(F.samples>0){if(mt(F)===!1){const P=F.textures,oe=F.width,_e=F.height;let we=t.COLOR_BUFFER_BIT;const H=F.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,de=i.get(F),ve=P.length>1;if(ve)for(let Me=0;Me<P.length;Me++)n.bindFramebuffer(t.FRAMEBUFFER,de.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Me,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,de.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Me,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,de.__webglMultisampledFramebuffer),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,de.__webglFramebuffer);for(let Me=0;Me<P.length;Me++){if(F.resolveDepthBuffer&&(F.depthBuffer&&(we|=t.DEPTH_BUFFER_BIT),F.stencilBuffer&&F.resolveStencilBuffer&&(we|=t.STENCIL_BUFFER_BIT)),ve){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,de.__webglColorRenderbuffer[Me]);const Ge=i.get(P[Me]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Ge,0)}t.blitFramebuffer(0,0,oe,_e,0,0,oe,_e,we,t.NEAREST),f===!0&&(Ft.length=0,j.length=0,Ft.push(t.COLOR_ATTACHMENT0+Me),F.depthBuffer&&F.resolveDepthBuffer===!1&&(Ft.push(H),j.push(H),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,j)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,Ft))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),ve)for(let Me=0;Me<P.length;Me++){n.bindFramebuffer(t.FRAMEBUFFER,de.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Me,t.RENDERBUFFER,de.__webglColorRenderbuffer[Me]);const Ge=i.get(P[Me]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,de.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Me,t.TEXTURE_2D,Ge,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,de.__webglMultisampledFramebuffer)}else if(F.depthBuffer&&F.resolveDepthBuffer===!1&&f){const P=F.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[P])}}}function vt(F){return Math.min(s.maxSamples,F.samples)}function mt(F){const P=i.get(F);return F.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&P.__useRenderToTexture!==!1}function Qe(F){const P=l.render.frame;h.get(F)!==P&&(h.set(F,P),F.update())}function Rt(F,P){const oe=F.colorSpace,_e=F.format,we=F.type;return F.isCompressedTexture===!0||F.isVideoTexture===!0||oe!==Ra&&oe!==ys&&(It.getTransfer(oe)===Bt?(_e!==Gi||we!==Nr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",oe)),P}function qe(F){return typeof HTMLImageElement<"u"&&F instanceof HTMLImageElement?(d.width=F.naturalWidth||F.width,d.height=F.naturalHeight||F.height):typeof VideoFrame<"u"&&F instanceof VideoFrame?(d.width=F.displayWidth,d.height=F.displayHeight):(d.width=F.width,d.height=F.height),d}this.allocateTextureUnit=X,this.resetTextureUnits=Z,this.setTexture2D=ne,this.setTexture2DArray=le,this.setTexture3D=re,this.setTextureCube=G,this.rebindTextures=$e,this.setupRenderTarget=St,this.updateRenderTargetMipmap=at,this.updateMultisampleRenderTarget=xn,this.setupDepthRenderbuffer=Le,this.setupFrameBufferTexture=ye,this.useMultisampledRTT=mt}function h5(t,e){function n(i,s=ys){let a;const l=It.getTransfer(s);if(i===Nr)return t.UNSIGNED_BYTE;if(i===Lv)return t.UNSIGNED_SHORT_4_4_4_4;if(i===Iv)return t.UNSIGNED_SHORT_5_5_5_1;if(i===UM)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===kM)return t.BYTE;if(i===NM)return t.SHORT;if(i===Ql)return t.UNSIGNED_SHORT;if(i===Dv)return t.INT;if(i===co)return t.UNSIGNED_INT;if(i===br)return t.FLOAT;if(i===fu)return t.HALF_FLOAT;if(i===FM)return t.ALPHA;if(i===OM)return t.RGB;if(i===Gi)return t.RGBA;if(i===BM)return t.LUMINANCE;if(i===zM)return t.LUMINANCE_ALPHA;if(i===ha)return t.DEPTH_COMPONENT;if(i===ba)return t.DEPTH_STENCIL;if(i===VM)return t.RED;if(i===kv)return t.RED_INTEGER;if(i===HM)return t.RG;if(i===Nv)return t.RG_INTEGER;if(i===Uv)return t.RGBA_INTEGER;if(i===Mf||i===Tf||i===Af||i===Cf)if(l===Bt)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===Mf)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Tf)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Af)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Cf)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===Mf)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Tf)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Af)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Cf)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Zm||i===Qm||i===Jm||i===eg)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===Zm)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Qm)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Jm)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===eg)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===tg||i===ng||i===ig)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(i===tg||i===ng)return l===Bt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===ig)return l===Bt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===rg||i===sg||i===og||i===ag||i===lg||i===ug||i===cg||i===fg||i===dg||i===hg||i===pg||i===mg||i===gg||i===vg)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(i===rg)return l===Bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===sg)return l===Bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===og)return l===Bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ag)return l===Bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===lg)return l===Bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===ug)return l===Bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===cg)return l===Bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===fg)return l===Bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===dg)return l===Bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===hg)return l===Bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===pg)return l===Bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===mg)return l===Bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===gg)return l===Bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===vg)return l===Bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===bf||i===yg||i===xg)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(i===bf)return l===Bt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===yg)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===xg)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===GM||i===_g||i===Sg||i===Eg)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(i===bf)return a.COMPRESSED_RED_RGTC1_EXT;if(i===_g)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Sg)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Eg)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ca?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}const p5={type:"move"};class tm{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new uf,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new uf,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new pe,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new pe),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new uf,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new pe,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new pe),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let s=null,a=null,l=null;const u=this._targetRay,f=this._grip,d=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(d&&e.hand){l=!0;for(const w of e.hand.values()){const _=n.getJointPose(w,i),y=this._getHandJoint(d,w);_!==null&&(y.matrix.fromArray(_.transform.matrix),y.matrix.decompose(y.position,y.rotation,y.scale),y.matrixWorldNeedsUpdate=!0,y.jointRadius=_.radius),y.visible=_!==null}const h=d.joints["index-finger-tip"],m=d.joints["thumb-tip"],g=h.position.distanceTo(m.position),v=.02,E=.005;d.inputState.pinching&&g>v+E?(d.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!d.inputState.pinching&&g<=v-E&&(d.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else f!==null&&e.gripSpace&&(a=n.getPose(e.gripSpace,i),a!==null&&(f.matrix.fromArray(a.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,a.linearVelocity?(f.hasLinearVelocity=!0,f.linearVelocity.copy(a.linearVelocity)):f.hasLinearVelocity=!1,a.angularVelocity?(f.hasAngularVelocity=!0,f.angularVelocity.copy(a.angularVelocity)):f.hasAngularVelocity=!1));u!==null&&(s=n.getPose(e.targetRaySpace,i),s===null&&a!==null&&(s=a),s!==null&&(u.matrix.fromArray(s.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,s.linearVelocity?(u.hasLinearVelocity=!0,u.linearVelocity.copy(s.linearVelocity)):u.hasLinearVelocity=!1,s.angularVelocity?(u.hasAngularVelocity=!0,u.angularVelocity.copy(s.angularVelocity)):u.hasAngularVelocity=!1,this.dispatchEvent(p5)))}return u!==null&&(u.visible=s!==null),f!==null&&(f.visible=a!==null),d!==null&&(d.visible=l!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new uf;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const m5=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,g5=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class v5{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n,i){if(this.texture===null){const s=new ri,a=e.properties.get(s);a.__webglTexture=n.texture,(n.depthNear!=i.depthNear||n.depthFar!=i.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new Fr({vertexShader:m5,fragmentShader:g5,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new nr(new gu(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class y5 extends Ba{constructor(e,n){super();const i=this;let s=null,a=1,l=null,u="local-floor",f=1,d=null,h=null,m=null,g=null,v=null,E=null;const w=new v5,_=n.getContextAttributes();let y=null,M=null;const T=[],C=[],N=new Ut;let b=null;const k=new Vi;k.viewport=new ln;const B=new Vi;B.viewport=new ln;const L=[k,B],R=new BO;let O=null,Z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ee){let ge=T[ee];return ge===void 0&&(ge=new tm,T[ee]=ge),ge.getTargetRaySpace()},this.getControllerGrip=function(ee){let ge=T[ee];return ge===void 0&&(ge=new tm,T[ee]=ge),ge.getGripSpace()},this.getHand=function(ee){let ge=T[ee];return ge===void 0&&(ge=new tm,T[ee]=ge),ge.getHandSpace()};function X(ee){const ge=C.indexOf(ee.inputSource);if(ge===-1)return;const ye=T[ge];ye!==void 0&&(ye.update(ee.inputSource,ee.frame,d||l),ye.dispatchEvent({type:ee.type,data:ee.inputSource}))}function J(){s.removeEventListener("select",X),s.removeEventListener("selectstart",X),s.removeEventListener("selectend",X),s.removeEventListener("squeeze",X),s.removeEventListener("squeezestart",X),s.removeEventListener("squeezeend",X),s.removeEventListener("end",J),s.removeEventListener("inputsourceschange",ne);for(let ee=0;ee<T.length;ee++){const ge=C[ee];ge!==null&&(C[ee]=null,T[ee].disconnect(ge))}O=null,Z=null,w.reset(),e.setRenderTarget(y),v=null,g=null,m=null,s=null,M=null,U.stop(),i.isPresenting=!1,e.setPixelRatio(b),e.setSize(N.width,N.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ee){a=ee,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ee){u=ee,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return d||l},this.setReferenceSpace=function(ee){d=ee},this.getBaseLayer=function(){return g!==null?g:v},this.getBinding=function(){return m},this.getFrame=function(){return E},this.getSession=function(){return s},this.setSession=async function(ee){if(s=ee,s!==null){if(y=e.getRenderTarget(),s.addEventListener("select",X),s.addEventListener("selectstart",X),s.addEventListener("selectend",X),s.addEventListener("squeeze",X),s.addEventListener("squeezestart",X),s.addEventListener("squeezeend",X),s.addEventListener("end",J),s.addEventListener("inputsourceschange",ne),_.xrCompatible!==!0&&await n.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(N),s.renderState.layers===void 0){const ge={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:a};v=new XRWebGLLayer(s,n,ge),s.updateRenderState({baseLayer:v}),e.setPixelRatio(1),e.setSize(v.framebufferWidth,v.framebufferHeight,!1),M=new fo(v.framebufferWidth,v.framebufferHeight,{format:Gi,type:Nr,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let ge=null,ye=null,Se=null;_.depth&&(Se=_.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,ge=_.stencil?ba:ha,ye=_.stencil?Ca:co);const Re={colorFormat:n.RGBA8,depthFormat:Se,scaleFactor:a};m=new XRWebGLBinding(s,n),g=m.createProjectionLayer(Re),s.updateRenderState({layers:[g]}),e.setPixelRatio(1),e.setSize(g.textureWidth,g.textureHeight,!1),M=new fo(g.textureWidth,g.textureHeight,{format:Gi,type:Nr,depthTexture:new iT(g.textureWidth,g.textureHeight,ye,void 0,void 0,void 0,void 0,void 0,void 0,ge),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:g.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(f),d=null,l=await s.requestReferenceSpace(u),U.setContext(s),U.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return w.getDepthTexture()};function ne(ee){for(let ge=0;ge<ee.removed.length;ge++){const ye=ee.removed[ge],Se=C.indexOf(ye);Se>=0&&(C[Se]=null,T[Se].disconnect(ye))}for(let ge=0;ge<ee.added.length;ge++){const ye=ee.added[ge];let Se=C.indexOf(ye);if(Se===-1){for(let Le=0;Le<T.length;Le++)if(Le>=C.length){C.push(ye),Se=Le;break}else if(C[Le]===null){C[Le]=ye,Se=Le;break}if(Se===-1)break}const Re=T[Se];Re&&Re.connect(ye)}}const le=new pe,re=new pe;function G(ee,ge,ye){le.setFromMatrixPosition(ge.matrixWorld),re.setFromMatrixPosition(ye.matrixWorld);const Se=le.distanceTo(re),Re=ge.projectionMatrix.elements,Le=ye.projectionMatrix.elements,$e=Re[14]/(Re[10]-1),St=Re[14]/(Re[10]+1),at=(Re[9]+1)/Re[5],Ft=(Re[9]-1)/Re[5],j=(Re[8]-1)/Re[0],xn=(Le[8]+1)/Le[0],vt=$e*j,mt=$e*xn,Qe=Se/(-j+xn),Rt=Qe*-j;if(ge.matrixWorld.decompose(ee.position,ee.quaternion,ee.scale),ee.translateX(Rt),ee.translateZ(Qe),ee.matrixWorld.compose(ee.position,ee.quaternion,ee.scale),ee.matrixWorldInverse.copy(ee.matrixWorld).invert(),Re[10]===-1)ee.projectionMatrix.copy(ge.projectionMatrix),ee.projectionMatrixInverse.copy(ge.projectionMatrixInverse);else{const qe=$e+Qe,F=St+Qe,P=vt-Rt,oe=mt+(Se-Rt),_e=at*St/F*qe,we=Ft*St/F*qe;ee.projectionMatrix.makePerspective(P,oe,_e,we,qe,F),ee.projectionMatrixInverse.copy(ee.projectionMatrix).invert()}}function ue(ee,ge){ge===null?ee.matrixWorld.copy(ee.matrix):ee.matrixWorld.multiplyMatrices(ge.matrixWorld,ee.matrix),ee.matrixWorldInverse.copy(ee.matrixWorld).invert()}this.updateCamera=function(ee){if(s===null)return;let ge=ee.near,ye=ee.far;w.texture!==null&&(w.depthNear>0&&(ge=w.depthNear),w.depthFar>0&&(ye=w.depthFar)),R.near=B.near=k.near=ge,R.far=B.far=k.far=ye,(O!==R.near||Z!==R.far)&&(s.updateRenderState({depthNear:R.near,depthFar:R.far}),O=R.near,Z=R.far),k.layers.mask=ee.layers.mask|2,B.layers.mask=ee.layers.mask|4,R.layers.mask=k.layers.mask|B.layers.mask;const Se=ee.parent,Re=R.cameras;ue(R,Se);for(let Le=0;Le<Re.length;Le++)ue(Re[Le],Se);Re.length===2?G(R,k,B):R.projectionMatrix.copy(k.projectionMatrix),D(ee,R,Se)};function D(ee,ge,ye){ye===null?ee.matrix.copy(ge.matrixWorld):(ee.matrix.copy(ye.matrixWorld),ee.matrix.invert(),ee.matrix.multiply(ge.matrixWorld)),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale),ee.updateMatrixWorld(!0),ee.projectionMatrix.copy(ge.projectionMatrix),ee.projectionMatrixInverse.copy(ge.projectionMatrixInverse),ee.isPerspectiveCamera&&(ee.fov=wg*2*Math.atan(1/ee.projectionMatrix.elements[5]),ee.zoom=1)}this.getCamera=function(){return R},this.getFoveation=function(){if(!(g===null&&v===null))return f},this.setFoveation=function(ee){f=ee,g!==null&&(g.fixedFoveation=ee),v!==null&&v.fixedFoveation!==void 0&&(v.fixedFoveation=ee)},this.hasDepthSensing=function(){return w.texture!==null},this.getDepthSensingMesh=function(){return w.getMesh(R)};let V=null;function ie(ee,ge){if(h=ge.getViewerPose(d||l),E=ge,h!==null){const ye=h.views;v!==null&&(e.setRenderTargetFramebuffer(M,v.framebuffer),e.setRenderTarget(M));let Se=!1;ye.length!==R.cameras.length&&(R.cameras.length=0,Se=!0);for(let Le=0;Le<ye.length;Le++){const $e=ye[Le];let St=null;if(v!==null)St=v.getViewport($e);else{const Ft=m.getViewSubImage(g,$e);St=Ft.viewport,Le===0&&(e.setRenderTargetTextures(M,Ft.colorTexture,g.ignoreDepthValues?void 0:Ft.depthStencilTexture),e.setRenderTarget(M))}let at=L[Le];at===void 0&&(at=new Vi,at.layers.enable(Le),at.viewport=new ln,L[Le]=at),at.matrix.fromArray($e.transform.matrix),at.matrix.decompose(at.position,at.quaternion,at.scale),at.projectionMatrix.fromArray($e.projectionMatrix),at.projectionMatrixInverse.copy(at.projectionMatrix).invert(),at.viewport.set(St.x,St.y,St.width,St.height),Le===0&&(R.matrix.copy(at.matrix),R.matrix.decompose(R.position,R.quaternion,R.scale)),Se===!0&&R.cameras.push(at)}const Re=s.enabledFeatures;if(Re&&Re.includes("depth-sensing")){const Le=m.getDepthInformation(ye[0]);Le&&Le.isValid&&Le.texture&&w.init(e,Le,s.renderState)}}for(let ye=0;ye<T.length;ye++){const Se=C[ye],Re=T[ye];Se!==null&&Re!==void 0&&Re.update(Se,ge,d||l)}V&&V(ee,ge),ge.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ge}),E=null}const U=new sT;U.setAnimationLoop(ie),this.setAnimationLoop=function(ee){V=ee},this.dispose=function(){}}}const Ys=new Ur,x5=new hn;function _5(t,e){function n(_,y){_.matrixAutoUpdate===!0&&_.updateMatrix(),y.value.copy(_.matrix)}function i(_,y){y.color.getRGB(_.fogColor.value,JM(t)),y.isFog?(_.fogNear.value=y.near,_.fogFar.value=y.far):y.isFogExp2&&(_.fogDensity.value=y.density)}function s(_,y,M,T,C){y.isMeshBasicMaterial||y.isMeshLambertMaterial?a(_,y):y.isMeshToonMaterial?(a(_,y),m(_,y)):y.isMeshPhongMaterial?(a(_,y),h(_,y)):y.isMeshStandardMaterial?(a(_,y),g(_,y),y.isMeshPhysicalMaterial&&v(_,y,C)):y.isMeshMatcapMaterial?(a(_,y),E(_,y)):y.isMeshDepthMaterial?a(_,y):y.isMeshDistanceMaterial?(a(_,y),w(_,y)):y.isMeshNormalMaterial?a(_,y):y.isLineBasicMaterial?(l(_,y),y.isLineDashedMaterial&&u(_,y)):y.isPointsMaterial?f(_,y,M,T):y.isSpriteMaterial?d(_,y):y.isShadowMaterial?(_.color.value.copy(y.color),_.opacity.value=y.opacity):y.isShaderMaterial&&(y.uniformsNeedUpdate=!1)}function a(_,y){_.opacity.value=y.opacity,y.color&&_.diffuse.value.copy(y.color),y.emissive&&_.emissive.value.copy(y.emissive).multiplyScalar(y.emissiveIntensity),y.map&&(_.map.value=y.map,n(y.map,_.mapTransform)),y.alphaMap&&(_.alphaMap.value=y.alphaMap,n(y.alphaMap,_.alphaMapTransform)),y.bumpMap&&(_.bumpMap.value=y.bumpMap,n(y.bumpMap,_.bumpMapTransform),_.bumpScale.value=y.bumpScale,y.side===ii&&(_.bumpScale.value*=-1)),y.normalMap&&(_.normalMap.value=y.normalMap,n(y.normalMap,_.normalMapTransform),_.normalScale.value.copy(y.normalScale),y.side===ii&&_.normalScale.value.negate()),y.displacementMap&&(_.displacementMap.value=y.displacementMap,n(y.displacementMap,_.displacementMapTransform),_.displacementScale.value=y.displacementScale,_.displacementBias.value=y.displacementBias),y.emissiveMap&&(_.emissiveMap.value=y.emissiveMap,n(y.emissiveMap,_.emissiveMapTransform)),y.specularMap&&(_.specularMap.value=y.specularMap,n(y.specularMap,_.specularMapTransform)),y.alphaTest>0&&(_.alphaTest.value=y.alphaTest);const M=e.get(y),T=M.envMap,C=M.envMapRotation;T&&(_.envMap.value=T,Ys.copy(C),Ys.x*=-1,Ys.y*=-1,Ys.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(Ys.y*=-1,Ys.z*=-1),_.envMapRotation.value.setFromMatrix4(x5.makeRotationFromEuler(Ys)),_.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,_.reflectivity.value=y.reflectivity,_.ior.value=y.ior,_.refractionRatio.value=y.refractionRatio),y.lightMap&&(_.lightMap.value=y.lightMap,_.lightMapIntensity.value=y.lightMapIntensity,n(y.lightMap,_.lightMapTransform)),y.aoMap&&(_.aoMap.value=y.aoMap,_.aoMapIntensity.value=y.aoMapIntensity,n(y.aoMap,_.aoMapTransform))}function l(_,y){_.diffuse.value.copy(y.color),_.opacity.value=y.opacity,y.map&&(_.map.value=y.map,n(y.map,_.mapTransform))}function u(_,y){_.dashSize.value=y.dashSize,_.totalSize.value=y.dashSize+y.gapSize,_.scale.value=y.scale}function f(_,y,M,T){_.diffuse.value.copy(y.color),_.opacity.value=y.opacity,_.size.value=y.size*M,_.scale.value=T*.5,y.map&&(_.map.value=y.map,n(y.map,_.uvTransform)),y.alphaMap&&(_.alphaMap.value=y.alphaMap,n(y.alphaMap,_.alphaMapTransform)),y.alphaTest>0&&(_.alphaTest.value=y.alphaTest)}function d(_,y){_.diffuse.value.copy(y.color),_.opacity.value=y.opacity,_.rotation.value=y.rotation,y.map&&(_.map.value=y.map,n(y.map,_.mapTransform)),y.alphaMap&&(_.alphaMap.value=y.alphaMap,n(y.alphaMap,_.alphaMapTransform)),y.alphaTest>0&&(_.alphaTest.value=y.alphaTest)}function h(_,y){_.specular.value.copy(y.specular),_.shininess.value=Math.max(y.shininess,1e-4)}function m(_,y){y.gradientMap&&(_.gradientMap.value=y.gradientMap)}function g(_,y){_.metalness.value=y.metalness,y.metalnessMap&&(_.metalnessMap.value=y.metalnessMap,n(y.metalnessMap,_.metalnessMapTransform)),_.roughness.value=y.roughness,y.roughnessMap&&(_.roughnessMap.value=y.roughnessMap,n(y.roughnessMap,_.roughnessMapTransform)),y.envMap&&(_.envMapIntensity.value=y.envMapIntensity)}function v(_,y,M){_.ior.value=y.ior,y.sheen>0&&(_.sheenColor.value.copy(y.sheenColor).multiplyScalar(y.sheen),_.sheenRoughness.value=y.sheenRoughness,y.sheenColorMap&&(_.sheenColorMap.value=y.sheenColorMap,n(y.sheenColorMap,_.sheenColorMapTransform)),y.sheenRoughnessMap&&(_.sheenRoughnessMap.value=y.sheenRoughnessMap,n(y.sheenRoughnessMap,_.sheenRoughnessMapTransform))),y.clearcoat>0&&(_.clearcoat.value=y.clearcoat,_.clearcoatRoughness.value=y.clearcoatRoughness,y.clearcoatMap&&(_.clearcoatMap.value=y.clearcoatMap,n(y.clearcoatMap,_.clearcoatMapTransform)),y.clearcoatRoughnessMap&&(_.clearcoatRoughnessMap.value=y.clearcoatRoughnessMap,n(y.clearcoatRoughnessMap,_.clearcoatRoughnessMapTransform)),y.clearcoatNormalMap&&(_.clearcoatNormalMap.value=y.clearcoatNormalMap,n(y.clearcoatNormalMap,_.clearcoatNormalMapTransform),_.clearcoatNormalScale.value.copy(y.clearcoatNormalScale),y.side===ii&&_.clearcoatNormalScale.value.negate())),y.dispersion>0&&(_.dispersion.value=y.dispersion),y.iridescence>0&&(_.iridescence.value=y.iridescence,_.iridescenceIOR.value=y.iridescenceIOR,_.iridescenceThicknessMinimum.value=y.iridescenceThicknessRange[0],_.iridescenceThicknessMaximum.value=y.iridescenceThicknessRange[1],y.iridescenceMap&&(_.iridescenceMap.value=y.iridescenceMap,n(y.iridescenceMap,_.iridescenceMapTransform)),y.iridescenceThicknessMap&&(_.iridescenceThicknessMap.value=y.iridescenceThicknessMap,n(y.iridescenceThicknessMap,_.iridescenceThicknessMapTransform))),y.transmission>0&&(_.transmission.value=y.transmission,_.transmissionSamplerMap.value=M.texture,_.transmissionSamplerSize.value.set(M.width,M.height),y.transmissionMap&&(_.transmissionMap.value=y.transmissionMap,n(y.transmissionMap,_.transmissionMapTransform)),_.thickness.value=y.thickness,y.thicknessMap&&(_.thicknessMap.value=y.thicknessMap,n(y.thicknessMap,_.thicknessMapTransform)),_.attenuationDistance.value=y.attenuationDistance,_.attenuationColor.value.copy(y.attenuationColor)),y.anisotropy>0&&(_.anisotropyVector.value.set(y.anisotropy*Math.cos(y.anisotropyRotation),y.anisotropy*Math.sin(y.anisotropyRotation)),y.anisotropyMap&&(_.anisotropyMap.value=y.anisotropyMap,n(y.anisotropyMap,_.anisotropyMapTransform))),_.specularIntensity.value=y.specularIntensity,_.specularColor.value.copy(y.specularColor),y.specularColorMap&&(_.specularColorMap.value=y.specularColorMap,n(y.specularColorMap,_.specularColorMapTransform)),y.specularIntensityMap&&(_.specularIntensityMap.value=y.specularIntensityMap,n(y.specularIntensityMap,_.specularIntensityMapTransform))}function E(_,y){y.matcap&&(_.matcap.value=y.matcap)}function w(_,y){const M=e.get(y).light;_.referencePosition.value.setFromMatrixPosition(M.matrixWorld),_.nearDistance.value=M.shadow.camera.near,_.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function S5(t,e,n,i){let s={},a={},l=[];const u=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function f(M,T){const C=T.program;i.uniformBlockBinding(M,C)}function d(M,T){let C=s[M.id];C===void 0&&(E(M),C=h(M),s[M.id]=C,M.addEventListener("dispose",_));const N=T.program;i.updateUBOMapping(M,N);const b=e.render.frame;a[M.id]!==b&&(g(M),a[M.id]=b)}function h(M){const T=m();M.__bindingPointIndex=T;const C=t.createBuffer(),N=M.__size,b=M.usage;return t.bindBuffer(t.UNIFORM_BUFFER,C),t.bufferData(t.UNIFORM_BUFFER,N,b),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,T,C),C}function m(){for(let M=0;M<u;M++)if(l.indexOf(M)===-1)return l.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function g(M){const T=s[M.id],C=M.uniforms,N=M.__cache;t.bindBuffer(t.UNIFORM_BUFFER,T);for(let b=0,k=C.length;b<k;b++){const B=Array.isArray(C[b])?C[b]:[C[b]];for(let L=0,R=B.length;L<R;L++){const O=B[L];if(v(O,b,L,N)===!0){const Z=O.__offset,X=Array.isArray(O.value)?O.value:[O.value];let J=0;for(let ne=0;ne<X.length;ne++){const le=X[ne],re=w(le);typeof le=="number"||typeof le=="boolean"?(O.__data[0]=le,t.bufferSubData(t.UNIFORM_BUFFER,Z+J,O.__data)):le.isMatrix3?(O.__data[0]=le.elements[0],O.__data[1]=le.elements[1],O.__data[2]=le.elements[2],O.__data[3]=0,O.__data[4]=le.elements[3],O.__data[5]=le.elements[4],O.__data[6]=le.elements[5],O.__data[7]=0,O.__data[8]=le.elements[6],O.__data[9]=le.elements[7],O.__data[10]=le.elements[8],O.__data[11]=0):(le.toArray(O.__data,J),J+=re.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,Z,O.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function v(M,T,C,N){const b=M.value,k=T+"_"+C;if(N[k]===void 0)return typeof b=="number"||typeof b=="boolean"?N[k]=b:N[k]=b.clone(),!0;{const B=N[k];if(typeof b=="number"||typeof b=="boolean"){if(B!==b)return N[k]=b,!0}else if(B.equals(b)===!1)return B.copy(b),!0}return!1}function E(M){const T=M.uniforms;let C=0;const N=16;for(let k=0,B=T.length;k<B;k++){const L=Array.isArray(T[k])?T[k]:[T[k]];for(let R=0,O=L.length;R<O;R++){const Z=L[R],X=Array.isArray(Z.value)?Z.value:[Z.value];for(let J=0,ne=X.length;J<ne;J++){const le=X[J],re=w(le),G=C%N,ue=G%re.boundary,D=G+ue;C+=ue,D!==0&&N-D<re.storage&&(C+=N-D),Z.__data=new Float32Array(re.storage/Float32Array.BYTES_PER_ELEMENT),Z.__offset=C,C+=re.storage}}}const b=C%N;return b>0&&(C+=N-b),M.__size=C,M.__cache={},this}function w(M){const T={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(T.boundary=4,T.storage=4):M.isVector2?(T.boundary=8,T.storage=8):M.isVector3||M.isColor?(T.boundary=16,T.storage=12):M.isVector4?(T.boundary=16,T.storage=16):M.isMatrix3?(T.boundary=48,T.storage=48):M.isMatrix4?(T.boundary=64,T.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),T}function _(M){const T=M.target;T.removeEventListener("dispose",_);const C=l.indexOf(T.__bindingPointIndex);l.splice(C,1),t.deleteBuffer(s[T.id]),delete s[T.id],delete a[T.id]}function y(){for(const M in s)t.deleteBuffer(s[M]);l=[],s={},a={}}return{bind:f,update:d,dispose:y}}class E5{constructor(e={}){const{canvas:n=aO(),context:i=null,depth:s=!0,stencil:a=!1,alpha:l=!1,antialias:u=!1,premultipliedAlpha:f=!0,preserveDrawingBuffer:d=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:m=!1,reverseDepthBuffer:g=!1}=e;this.isWebGLRenderer=!0;let v;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");v=i.getContextAttributes().alpha}else v=l;const E=new Uint32Array(4),w=new Int32Array(4);let _=null,y=null;const M=[],T=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ai,this.toneMapping=_s,this.toneMappingExposure=1;const C=this;let N=!1,b=0,k=0,B=null,L=-1,R=null;const O=new ln,Z=new ln;let X=null;const J=new zt(0);let ne=0,le=n.width,re=n.height,G=1,ue=null,D=null;const V=new ln(0,0,le,re),ie=new ln(0,0,le,re);let U=!1;const ee=new nT;let ge=!1,ye=!1;const Se=new hn,Re=new hn,Le=new pe,$e=new ln,St={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let at=!1;function Ft(){return B===null?G:1}let j=i;function xn(I,Q){return n.getContext(I,Q)}try{const I={alpha:!0,depth:s,stencil:a,antialias:u,premultipliedAlpha:f,preserveDrawingBuffer:d,powerPreference:h,failIfMajorPerformanceCaveat:m};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Pv}`),n.addEventListener("webglcontextlost",xe,!1),n.addEventListener("webglcontextrestored",Oe,!1),n.addEventListener("webglcontextcreationerror",Fe,!1),j===null){const Q="webgl2";if(j=xn(Q,I),j===null)throw xn(Q)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(I){throw console.error("THREE.WebGLRenderer: "+I.message),I}let vt,mt,Qe,Rt,qe,F,P,oe,_e,we,H,de,ve,Me,Ge,Ee,Ue,Ye,et,Be,nt,st,yt,K;function Ie(){vt=new D4(j),vt.init(),st=new h5(j,vt),mt=new T4(j,vt,e,st),Qe=new f5(j,vt),mt.reverseDepthBuffer&&g&&Qe.buffers.depth.setReversed(!0),Rt=new k4(j),qe=new QV,F=new d5(j,vt,Qe,qe,mt,st,Rt),P=new C4(C),oe=new P4(C),_e=new VO(j),yt=new w4(j,_e),we=new L4(j,_e,Rt,yt),H=new U4(j,we,_e,Rt),et=new N4(j,mt,F),Ee=new A4(qe),de=new ZV(C,P,oe,vt,mt,yt,Ee),ve=new _5(C,qe),Me=new e5,Ge=new o5(vt),Ye=new E4(C,P,oe,Qe,H,v,f),Ue=new u5(C,H,mt),K=new S5(j,Rt,mt,Qe),Be=new M4(j,vt,Rt),nt=new I4(j,vt,Rt),Rt.programs=de.programs,C.capabilities=mt,C.extensions=vt,C.properties=qe,C.renderLists=Me,C.shadowMap=Ue,C.state=Qe,C.info=Rt}Ie();const me=new y5(C,j);this.xr=me,this.getContext=function(){return j},this.getContextAttributes=function(){return j.getContextAttributes()},this.forceContextLoss=function(){const I=vt.get("WEBGL_lose_context");I&&I.loseContext()},this.forceContextRestore=function(){const I=vt.get("WEBGL_lose_context");I&&I.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(I){I!==void 0&&(G=I,this.setSize(le,re,!1))},this.getSize=function(I){return I.set(le,re)},this.setSize=function(I,Q,ce=!0){if(me.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}le=I,re=Q,n.width=Math.floor(I*G),n.height=Math.floor(Q*G),ce===!0&&(n.style.width=I+"px",n.style.height=Q+"px"),this.setViewport(0,0,I,Q)},this.getDrawingBufferSize=function(I){return I.set(le*G,re*G).floor()},this.setDrawingBufferSize=function(I,Q,ce){le=I,re=Q,G=ce,n.width=Math.floor(I*ce),n.height=Math.floor(Q*ce),this.setViewport(0,0,I,Q)},this.getCurrentViewport=function(I){return I.copy(O)},this.getViewport=function(I){return I.copy(V)},this.setViewport=function(I,Q,ce,fe){I.isVector4?V.set(I.x,I.y,I.z,I.w):V.set(I,Q,ce,fe),Qe.viewport(O.copy(V).multiplyScalar(G).round())},this.getScissor=function(I){return I.copy(ie)},this.setScissor=function(I,Q,ce,fe){I.isVector4?ie.set(I.x,I.y,I.z,I.w):ie.set(I,Q,ce,fe),Qe.scissor(Z.copy(ie).multiplyScalar(G).round())},this.getScissorTest=function(){return U},this.setScissorTest=function(I){Qe.setScissorTest(U=I)},this.setOpaqueSort=function(I){ue=I},this.setTransparentSort=function(I){D=I},this.getClearColor=function(I){return I.copy(Ye.getClearColor())},this.setClearColor=function(){Ye.setClearColor.apply(Ye,arguments)},this.getClearAlpha=function(){return Ye.getClearAlpha()},this.setClearAlpha=function(){Ye.setClearAlpha.apply(Ye,arguments)},this.clear=function(I=!0,Q=!0,ce=!0){let fe=0;if(I){let q=!1;if(B!==null){const be=B.texture.format;q=be===Uv||be===Nv||be===kv}if(q){const be=B.texture.type,ke=be===Nr||be===co||be===Ql||be===Ca||be===Lv||be===Iv,He=Ye.getClearColor(),We=Ye.getClearAlpha(),lt=He.r,ut=He.g,Je=He.b;ke?(E[0]=lt,E[1]=ut,E[2]=Je,E[3]=We,j.clearBufferuiv(j.COLOR,0,E)):(w[0]=lt,w[1]=ut,w[2]=Je,w[3]=We,j.clearBufferiv(j.COLOR,0,w))}else fe|=j.COLOR_BUFFER_BIT}Q&&(fe|=j.DEPTH_BUFFER_BIT),ce&&(fe|=j.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),j.clear(fe)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",xe,!1),n.removeEventListener("webglcontextrestored",Oe,!1),n.removeEventListener("webglcontextcreationerror",Fe,!1),Ye.dispose(),Me.dispose(),Ge.dispose(),qe.dispose(),P.dispose(),oe.dispose(),H.dispose(),yt.dispose(),K.dispose(),de.dispose(),me.dispose(),me.removeEventListener("sessionstart",go),me.removeEventListener("sessionend",Vr),ur.stop()};function xe(I){I.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),N=!0}function Oe(){console.log("THREE.WebGLRenderer: Context Restored."),N=!1;const I=Rt.autoReset,Q=Ue.enabled,ce=Ue.autoUpdate,fe=Ue.needsUpdate,q=Ue.type;Ie(),Rt.autoReset=I,Ue.enabled=Q,Ue.autoUpdate=ce,Ue.needsUpdate=fe,Ue.type=q}function Fe(I){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",I.statusMessage)}function dt(I){const Q=I.target;Q.removeEventListener("dispose",dt),Wt(Q)}function Wt(I){pn(I),qe.remove(I)}function pn(I){const Q=qe.get(I).programs;Q!==void 0&&(Q.forEach(function(ce){de.releaseProgram(ce)}),I.isShaderMaterial&&de.releaseShaderCache(I))}this.renderBufferDirect=function(I,Q,ce,fe,q,be){Q===null&&(Q=St);const ke=q.isMesh&&q.matrixWorld.determinant()<0,He=xu(I,Q,ce,fe,q);Qe.setMaterial(fe,ke);let We=ce.index,lt=1;if(fe.wireframe===!0){if(We=we.getWireframeAttribute(ce),We===void 0)return;lt=2}const ut=ce.drawRange,Je=ce.attributes.position;let ht=ut.start*lt,Pt=(ut.start+ut.count)*lt;be!==null&&(ht=Math.max(ht,be.start*lt),Pt=Math.min(Pt,(be.start+be.count)*lt)),We!==null?(ht=Math.max(ht,0),Pt=Math.min(Pt,We.count)):Je!=null&&(ht=Math.max(ht,0),Pt=Math.min(Pt,Je.count));const Dt=Pt-ht;if(Dt<0||Dt===1/0)return;yt.setup(q,fe,He,ce,We);let Yt,At=Be;if(We!==null&&(Yt=_e.get(We),At=nt,At.setIndex(Yt)),q.isMesh)fe.wireframe===!0?(Qe.setLineWidth(fe.wireframeLinewidth*Ft()),At.setMode(j.LINES)):At.setMode(j.TRIANGLES);else if(q.isLine){let tt=fe.linewidth;tt===void 0&&(tt=1),Qe.setLineWidth(tt*Ft()),q.isLineSegments?At.setMode(j.LINES):q.isLineLoop?At.setMode(j.LINE_LOOP):At.setMode(j.LINE_STRIP)}else q.isPoints?At.setMode(j.POINTS):q.isSprite&&At.setMode(j.TRIANGLES);if(q.isBatchedMesh)if(q._multiDrawInstances!==null)At.renderMultiDrawInstances(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount,q._multiDrawInstances);else if(vt.get("WEBGL_multi_draw"))At.renderMultiDraw(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount);else{const tt=q._multiDrawStarts,tn=q._multiDrawCounts,Mt=q._multiDrawCount,Tn=We?_e.get(We).bytesPerElement:1,Pi=qe.get(fe).currentProgram.getUniforms();for(let Vn=0;Vn<Mt;Vn++)Pi.setValue(j,"_gl_DrawID",Vn),At.render(tt[Vn]/Tn,tn[Vn])}else if(q.isInstancedMesh)At.renderInstances(ht,Dt,q.count);else if(ce.isInstancedBufferGeometry){const tt=ce._maxInstanceCount!==void 0?ce._maxInstanceCount:1/0,tn=Math.min(ce.instanceCount,tt);At.renderInstances(ht,Dt,tn)}else At.render(ht,Dt)};function Ct(I,Q,ce){I.transparent===!0&&I.side===Cr&&I.forceSinglePass===!1?(I.side=ii,I.needsUpdate=!0,vo(I,Q,ce),I.side=Ms,I.needsUpdate=!0,vo(I,Q,ce),I.side=Cr):vo(I,Q,ce)}this.compile=function(I,Q,ce=null){ce===null&&(ce=I),y=Ge.get(ce),y.init(Q),T.push(y),ce.traverseVisible(function(q){q.isLight&&q.layers.test(Q.layers)&&(y.pushLight(q),q.castShadow&&y.pushShadow(q))}),I!==ce&&I.traverseVisible(function(q){q.isLight&&q.layers.test(Q.layers)&&(y.pushLight(q),q.castShadow&&y.pushShadow(q))}),y.setupLights();const fe=new Set;return I.traverse(function(q){if(!(q.isMesh||q.isPoints||q.isLine||q.isSprite))return;const be=q.material;if(be)if(Array.isArray(be))for(let ke=0;ke<be.length;ke++){const He=be[ke];Ct(He,ce,q),fe.add(He)}else Ct(be,ce,q),fe.add(be)}),T.pop(),y=null,fe},this.compileAsync=function(I,Q,ce=null){const fe=this.compile(I,Q,ce);return new Promise(q=>{function be(){if(fe.forEach(function(ke){qe.get(ke).currentProgram.isReady()&&fe.delete(ke)}),fe.size===0){q(I);return}setTimeout(be,10)}vt.get("KHR_parallel_shader_compile")!==null?be():setTimeout(be,10)})};let Xn=null;function zn(I){Xn&&Xn(I)}function go(){ur.stop()}function Vr(){ur.start()}const ur=new sT;ur.setAnimationLoop(zn),typeof self<"u"&&ur.setContext(self),this.setAnimationLoop=function(I){Xn=I,me.setAnimationLoop(I),I===null?ur.stop():ur.start()},me.addEventListener("sessionstart",go),me.addEventListener("sessionend",Vr),this.render=function(I,Q){if(Q!==void 0&&Q.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;if(I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),Q.parent===null&&Q.matrixWorldAutoUpdate===!0&&Q.updateMatrixWorld(),me.enabled===!0&&me.isPresenting===!0&&(me.cameraAutoUpdate===!0&&me.updateCamera(Q),Q=me.getCamera()),I.isScene===!0&&I.onBeforeRender(C,I,Q,B),y=Ge.get(I,T.length),y.init(Q),T.push(y),Re.multiplyMatrices(Q.projectionMatrix,Q.matrixWorldInverse),ee.setFromProjectionMatrix(Re),ye=this.localClippingEnabled,ge=Ee.init(this.clippingPlanes,ye),_=Me.get(I,M.length),_.init(),M.push(_),me.enabled===!0&&me.isPresenting===!0){const be=C.xr.getDepthSensingMesh();be!==null&&cr(be,Q,-1/0,C.sortObjects)}cr(I,Q,0,C.sortObjects),_.finish(),C.sortObjects===!0&&_.sort(ue,D),at=me.enabled===!1||me.isPresenting===!1||me.hasDepthSensing()===!1,at&&Ye.addToRenderList(_,I),this.info.render.frame++,ge===!0&&Ee.beginShadows();const ce=y.state.shadowsArray;Ue.render(ce,I,Q),ge===!0&&Ee.endShadows(),this.info.autoReset===!0&&this.info.reset();const fe=_.opaque,q=_.transmissive;if(y.setupLights(),Q.isArrayCamera){const be=Q.cameras;if(q.length>0)for(let ke=0,He=be.length;ke<He;ke++){const We=be[ke];bs(fe,q,I,We)}at&&Ye.render(I);for(let ke=0,He=be.length;ke<He;ke++){const We=be[ke];Cs(_,I,We,We.viewport)}}else q.length>0&&bs(fe,q,I,Q),at&&Ye.render(I),Cs(_,I,Q);B!==null&&(F.updateMultisampleRenderTarget(B),F.updateRenderTargetMipmap(B)),I.isScene===!0&&I.onAfterRender(C,I,Q),yt.resetDefaultState(),L=-1,R=null,T.pop(),T.length>0?(y=T[T.length-1],ge===!0&&Ee.setGlobalState(C.clippingPlanes,y.state.camera)):y=null,M.pop(),M.length>0?_=M[M.length-1]:_=null};function cr(I,Q,ce,fe){if(I.visible===!1)return;if(I.layers.test(Q.layers)){if(I.isGroup)ce=I.renderOrder;else if(I.isLOD)I.autoUpdate===!0&&I.update(Q);else if(I.isLight)y.pushLight(I),I.castShadow&&y.pushShadow(I);else if(I.isSprite){if(!I.frustumCulled||ee.intersectsSprite(I)){fe&&$e.setFromMatrixPosition(I.matrixWorld).applyMatrix4(Re);const ke=H.update(I),He=I.material;He.visible&&_.push(I,ke,He,ce,$e.z,null)}}else if((I.isMesh||I.isLine||I.isPoints)&&(!I.frustumCulled||ee.intersectsObject(I))){const ke=H.update(I),He=I.material;if(fe&&(I.boundingSphere!==void 0?(I.boundingSphere===null&&I.computeBoundingSphere(),$e.copy(I.boundingSphere.center)):(ke.boundingSphere===null&&ke.computeBoundingSphere(),$e.copy(ke.boundingSphere.center)),$e.applyMatrix4(I.matrixWorld).applyMatrix4(Re)),Array.isArray(He)){const We=ke.groups;for(let lt=0,ut=We.length;lt<ut;lt++){const Je=We[lt],ht=He[Je.materialIndex];ht&&ht.visible&&_.push(I,ke,ht,ce,$e.z,Je)}}else He.visible&&_.push(I,ke,He,ce,$e.z,null)}}const be=I.children;for(let ke=0,He=be.length;ke<He;ke++)cr(be[ke],Q,ce,fe)}function Cs(I,Q,ce,fe){const q=I.opaque,be=I.transmissive,ke=I.transparent;y.setupLightsView(ce),ge===!0&&Ee.setGlobalState(C.clippingPlanes,ce),fe&&Qe.viewport(O.copy(fe)),q.length>0&&Hr(q,Q,ce),be.length>0&&Hr(be,Q,ce),ke.length>0&&Hr(ke,Q,ce),Qe.buffers.depth.setTest(!0),Qe.buffers.depth.setMask(!0),Qe.buffers.color.setMask(!0),Qe.setPolygonOffset(!1)}function bs(I,Q,ce,fe){if((ce.isScene===!0?ce.overrideMaterial:null)!==null)return;y.state.transmissionRenderTarget[fe.id]===void 0&&(y.state.transmissionRenderTarget[fe.id]=new fo(1,1,{generateMipmaps:!0,type:vt.has("EXT_color_buffer_half_float")||vt.has("EXT_color_buffer_float")?fu:Nr,minFilter:so,samples:4,stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:It.workingColorSpace}));const be=y.state.transmissionRenderTarget[fe.id],ke=fe.viewport||O;be.setSize(ke.z,ke.w);const He=C.getRenderTarget();C.setRenderTarget(be),C.getClearColor(J),ne=C.getClearAlpha(),ne<1&&C.setClearColor(16777215,.5),C.clear(),at&&Ye.render(ce);const We=C.toneMapping;C.toneMapping=_s;const lt=fe.viewport;if(fe.viewport!==void 0&&(fe.viewport=void 0),y.setupLightsView(fe),ge===!0&&Ee.setGlobalState(C.clippingPlanes,fe),Hr(I,ce,fe),F.updateMultisampleRenderTarget(be),F.updateRenderTargetMipmap(be),vt.has("WEBGL_multisampled_render_to_texture")===!1){let ut=!1;for(let Je=0,ht=Q.length;Je<ht;Je++){const Pt=Q[Je],Dt=Pt.object,Yt=Pt.geometry,At=Pt.material,tt=Pt.group;if(At.side===Cr&&Dt.layers.test(fe.layers)){const tn=At.side;At.side=ii,At.needsUpdate=!0,vu(Dt,ce,fe,Yt,At,tt),At.side=tn,At.needsUpdate=!0,ut=!0}}ut===!0&&(F.updateMultisampleRenderTarget(be),F.updateRenderTargetMipmap(be))}C.setRenderTarget(He),C.setClearColor(J,ne),lt!==void 0&&(fe.viewport=lt),C.toneMapping=We}function Hr(I,Q,ce){const fe=Q.isScene===!0?Q.overrideMaterial:null;for(let q=0,be=I.length;q<be;q++){const ke=I[q],He=ke.object,We=ke.geometry,lt=fe===null?ke.material:fe,ut=ke.group;He.layers.test(ce.layers)&&vu(He,Q,ce,We,lt,ut)}}function vu(I,Q,ce,fe,q,be){I.onBeforeRender(C,Q,ce,fe,q,be),I.modelViewMatrix.multiplyMatrices(ce.matrixWorldInverse,I.matrixWorld),I.normalMatrix.getNormalMatrix(I.modelViewMatrix),q.onBeforeRender(C,Q,ce,fe,I,be),q.transparent===!0&&q.side===Cr&&q.forceSinglePass===!1?(q.side=ii,q.needsUpdate=!0,C.renderBufferDirect(ce,Q,fe,q,I,be),q.side=Ms,q.needsUpdate=!0,C.renderBufferDirect(ce,Q,fe,q,I,be),q.side=Cr):C.renderBufferDirect(ce,Q,fe,q,I,be),I.onAfterRender(C,Q,ce,fe,q,be)}function vo(I,Q,ce){Q.isScene!==!0&&(Q=St);const fe=qe.get(I),q=y.state.lights,be=y.state.shadowsArray,ke=q.state.version,He=de.getParameters(I,q.state,be,Q,ce),We=de.getProgramCacheKey(He);let lt=fe.programs;fe.environment=I.isMeshStandardMaterial?Q.environment:null,fe.fog=Q.fog,fe.envMap=(I.isMeshStandardMaterial?oe:P).get(I.envMap||fe.environment),fe.envMapRotation=fe.environment!==null&&I.envMap===null?Q.environmentRotation:I.envMapRotation,lt===void 0&&(I.addEventListener("dispose",dt),lt=new Map,fe.programs=lt);let ut=lt.get(We);if(ut!==void 0){if(fe.currentProgram===ut&&fe.lightsStateVersion===ke)return Xi(I,He),ut}else He.uniforms=de.getUniforms(I),I.onBeforeCompile(He,C),ut=de.acquireProgram(He,We),lt.set(We,ut),fe.uniforms=He.uniforms;const Je=fe.uniforms;return(!I.isShaderMaterial&&!I.isRawShaderMaterial||I.clipping===!0)&&(Je.clippingPlanes=Ee.uniform),Xi(I,He),fe.needsLights=hd(I),fe.lightsStateVersion=ke,fe.needsLights&&(Je.ambientLightColor.value=q.state.ambient,Je.lightProbe.value=q.state.probe,Je.directionalLights.value=q.state.directional,Je.directionalLightShadows.value=q.state.directionalShadow,Je.spotLights.value=q.state.spot,Je.spotLightShadows.value=q.state.spotShadow,Je.rectAreaLights.value=q.state.rectArea,Je.ltc_1.value=q.state.rectAreaLTC1,Je.ltc_2.value=q.state.rectAreaLTC2,Je.pointLights.value=q.state.point,Je.pointLightShadows.value=q.state.pointShadow,Je.hemisphereLights.value=q.state.hemi,Je.directionalShadowMap.value=q.state.directionalShadowMap,Je.directionalShadowMatrix.value=q.state.directionalShadowMatrix,Je.spotShadowMap.value=q.state.spotShadowMap,Je.spotLightMatrix.value=q.state.spotLightMatrix,Je.spotLightMap.value=q.state.spotLightMap,Je.pointShadowMap.value=q.state.pointShadowMap,Je.pointShadowMatrix.value=q.state.pointShadowMatrix),fe.currentProgram=ut,fe.uniformsList=null,ut}function yu(I){if(I.uniformsList===null){const Q=I.currentProgram.getUniforms();I.uniformsList=Rf.seqWithValue(Q.seq,I.uniforms)}return I.uniformsList}function Xi(I,Q){const ce=qe.get(I);ce.outputColorSpace=Q.outputColorSpace,ce.batching=Q.batching,ce.batchingColor=Q.batchingColor,ce.instancing=Q.instancing,ce.instancingColor=Q.instancingColor,ce.instancingMorph=Q.instancingMorph,ce.skinning=Q.skinning,ce.morphTargets=Q.morphTargets,ce.morphNormals=Q.morphNormals,ce.morphColors=Q.morphColors,ce.morphTargetsCount=Q.morphTargetsCount,ce.numClippingPlanes=Q.numClippingPlanes,ce.numIntersection=Q.numClipIntersection,ce.vertexAlphas=Q.vertexAlphas,ce.vertexTangents=Q.vertexTangents,ce.toneMapping=Q.toneMapping}function xu(I,Q,ce,fe,q){Q.isScene!==!0&&(Q=St),F.resetTextureUnits();const be=Q.fog,ke=fe.isMeshStandardMaterial?Q.environment:null,He=B===null?C.outputColorSpace:B.isXRRenderTarget===!0?B.texture.colorSpace:Ra,We=(fe.isMeshStandardMaterial?oe:P).get(fe.envMap||ke),lt=fe.vertexColors===!0&&!!ce.attributes.color&&ce.attributes.color.itemSize===4,ut=!!ce.attributes.tangent&&(!!fe.normalMap||fe.anisotropy>0),Je=!!ce.morphAttributes.position,ht=!!ce.morphAttributes.normal,Pt=!!ce.morphAttributes.color;let Dt=_s;fe.toneMapped&&(B===null||B.isXRRenderTarget===!0)&&(Dt=C.toneMapping);const Yt=ce.morphAttributes.position||ce.morphAttributes.normal||ce.morphAttributes.color,At=Yt!==void 0?Yt.length:0,tt=qe.get(fe),tn=y.state.lights;if(ge===!0&&(ye===!0||I!==R)){const sn=I===R&&fe.id===L;Ee.setState(fe,I,sn)}let Mt=!1;fe.version===tt.__version?(tt.needsLights&&tt.lightsStateVersion!==tn.state.version||tt.outputColorSpace!==He||q.isBatchedMesh&&tt.batching===!1||!q.isBatchedMesh&&tt.batching===!0||q.isBatchedMesh&&tt.batchingColor===!0&&q.colorTexture===null||q.isBatchedMesh&&tt.batchingColor===!1&&q.colorTexture!==null||q.isInstancedMesh&&tt.instancing===!1||!q.isInstancedMesh&&tt.instancing===!0||q.isSkinnedMesh&&tt.skinning===!1||!q.isSkinnedMesh&&tt.skinning===!0||q.isInstancedMesh&&tt.instancingColor===!0&&q.instanceColor===null||q.isInstancedMesh&&tt.instancingColor===!1&&q.instanceColor!==null||q.isInstancedMesh&&tt.instancingMorph===!0&&q.morphTexture===null||q.isInstancedMesh&&tt.instancingMorph===!1&&q.morphTexture!==null||tt.envMap!==We||fe.fog===!0&&tt.fog!==be||tt.numClippingPlanes!==void 0&&(tt.numClippingPlanes!==Ee.numPlanes||tt.numIntersection!==Ee.numIntersection)||tt.vertexAlphas!==lt||tt.vertexTangents!==ut||tt.morphTargets!==Je||tt.morphNormals!==ht||tt.morphColors!==Pt||tt.toneMapping!==Dt||tt.morphTargetsCount!==At)&&(Mt=!0):(Mt=!0,tt.__version=fe.version);let Tn=tt.currentProgram;Mt===!0&&(Tn=vo(fe,Q,q));let Pi=!1,Vn=!1,Rs=!1;const Ot=Tn.getUniforms(),Hn=tt.uniforms;if(Qe.useProgram(Tn.program)&&(Pi=!0,Vn=!0,Rs=!0),fe.id!==L&&(L=fe.id,Vn=!0),Pi||R!==I){Qe.buffers.depth.getReversed()?(Se.copy(I.projectionMatrix),uO(Se),cO(Se),Ot.setValue(j,"projectionMatrix",Se)):Ot.setValue(j,"projectionMatrix",I.projectionMatrix),Ot.setValue(j,"viewMatrix",I.matrixWorldInverse);const Pn=Ot.map.cameraPosition;Pn!==void 0&&Pn.setValue(j,Le.setFromMatrixPosition(I.matrixWorld)),mt.logarithmicDepthBuffer&&Ot.setValue(j,"logDepthBufFC",2/(Math.log(I.far+1)/Math.LN2)),(fe.isMeshPhongMaterial||fe.isMeshToonMaterial||fe.isMeshLambertMaterial||fe.isMeshBasicMaterial||fe.isMeshStandardMaterial||fe.isShaderMaterial)&&Ot.setValue(j,"isOrthographic",I.isOrthographicCamera===!0),R!==I&&(R=I,Vn=!0,Rs=!0)}if(q.isSkinnedMesh){Ot.setOptional(j,q,"bindMatrix"),Ot.setOptional(j,q,"bindMatrixInverse");const sn=q.skeleton;sn&&(sn.boneTexture===null&&sn.computeBoneTexture(),Ot.setValue(j,"boneTexture",sn.boneTexture,F))}q.isBatchedMesh&&(Ot.setOptional(j,q,"batchingTexture"),Ot.setValue(j,"batchingTexture",q._matricesTexture,F),Ot.setOptional(j,q,"batchingIdTexture"),Ot.setValue(j,"batchingIdTexture",q._indirectTexture,F),Ot.setOptional(j,q,"batchingColorTexture"),q._colorsTexture!==null&&Ot.setValue(j,"batchingColorTexture",q._colorsTexture,F));const Rn=ce.morphAttributes;if((Rn.position!==void 0||Rn.normal!==void 0||Rn.color!==void 0)&&et.update(q,ce,Tn),(Vn||tt.receiveShadow!==q.receiveShadow)&&(tt.receiveShadow=q.receiveShadow,Ot.setValue(j,"receiveShadow",q.receiveShadow)),fe.isMeshGouraudMaterial&&fe.envMap!==null&&(Hn.envMap.value=We,Hn.flipEnvMap.value=We.isCubeTexture&&We.isRenderTargetTexture===!1?-1:1),fe.isMeshStandardMaterial&&fe.envMap===null&&Q.environment!==null&&(Hn.envMapIntensity.value=Q.environmentIntensity),Vn&&(Ot.setValue(j,"toneMappingExposure",C.toneMappingExposure),tt.needsLights&&_u(Hn,Rs),be&&fe.fog===!0&&ve.refreshFogUniforms(Hn,be),ve.refreshMaterialUniforms(Hn,fe,G,re,y.state.transmissionRenderTarget[I.id]),Rf.upload(j,yu(tt),Hn,F)),fe.isShaderMaterial&&fe.uniformsNeedUpdate===!0&&(Rf.upload(j,yu(tt),Hn,F),fe.uniformsNeedUpdate=!1),fe.isSpriteMaterial&&Ot.setValue(j,"center",q.center),Ot.setValue(j,"modelViewMatrix",q.modelViewMatrix),Ot.setValue(j,"normalMatrix",q.normalMatrix),Ot.setValue(j,"modelMatrix",q.matrixWorld),fe.isShaderMaterial||fe.isRawShaderMaterial){const sn=fe.uniformsGroups;for(let Pn=0,Ps=sn.length;Pn<Ps;Pn++){const wt=sn[Pn];K.update(wt,Tn),K.bind(wt,Tn)}}return Tn}function _u(I,Q){I.ambientLightColor.needsUpdate=Q,I.lightProbe.needsUpdate=Q,I.directionalLights.needsUpdate=Q,I.directionalLightShadows.needsUpdate=Q,I.pointLights.needsUpdate=Q,I.pointLightShadows.needsUpdate=Q,I.spotLights.needsUpdate=Q,I.spotLightShadows.needsUpdate=Q,I.rectAreaLights.needsUpdate=Q,I.hemisphereLights.needsUpdate=Q}function hd(I){return I.isMeshLambertMaterial||I.isMeshToonMaterial||I.isMeshPhongMaterial||I.isMeshStandardMaterial||I.isShadowMaterial||I.isShaderMaterial&&I.lights===!0}this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return B},this.setRenderTargetTextures=function(I,Q,ce){qe.get(I.texture).__webglTexture=Q,qe.get(I.depthTexture).__webglTexture=ce;const fe=qe.get(I);fe.__hasExternalTextures=!0,fe.__autoAllocateDepthBuffer=ce===void 0,fe.__autoAllocateDepthBuffer||vt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),fe.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(I,Q){const ce=qe.get(I);ce.__webglFramebuffer=Q,ce.__useDefaultFramebuffer=Q===void 0},this.setRenderTarget=function(I,Q=0,ce=0){B=I,b=Q,k=ce;let fe=!0,q=null,be=!1,ke=!1;if(I){const We=qe.get(I);if(We.__useDefaultFramebuffer!==void 0)Qe.bindFramebuffer(j.FRAMEBUFFER,null),fe=!1;else if(We.__webglFramebuffer===void 0)F.setupRenderTarget(I);else if(We.__hasExternalTextures)F.rebindTextures(I,qe.get(I.texture).__webglTexture,qe.get(I.depthTexture).__webglTexture);else if(I.depthBuffer){const Je=I.depthTexture;if(We.__boundDepthTexture!==Je){if(Je!==null&&qe.has(Je)&&(I.width!==Je.image.width||I.height!==Je.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");F.setupDepthRenderbuffer(I)}}const lt=I.texture;(lt.isData3DTexture||lt.isDataArrayTexture||lt.isCompressedArrayTexture)&&(ke=!0);const ut=qe.get(I).__webglFramebuffer;I.isWebGLCubeRenderTarget?(Array.isArray(ut[Q])?q=ut[Q][ce]:q=ut[Q],be=!0):I.samples>0&&F.useMultisampledRTT(I)===!1?q=qe.get(I).__webglMultisampledFramebuffer:Array.isArray(ut)?q=ut[ce]:q=ut,O.copy(I.viewport),Z.copy(I.scissor),X=I.scissorTest}else O.copy(V).multiplyScalar(G).floor(),Z.copy(ie).multiplyScalar(G).floor(),X=U;if(Qe.bindFramebuffer(j.FRAMEBUFFER,q)&&fe&&Qe.drawBuffers(I,q),Qe.viewport(O),Qe.scissor(Z),Qe.setScissorTest(X),be){const We=qe.get(I.texture);j.framebufferTexture2D(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_CUBE_MAP_POSITIVE_X+Q,We.__webglTexture,ce)}else if(ke){const We=qe.get(I.texture),lt=Q||0;j.framebufferTextureLayer(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,We.__webglTexture,ce||0,lt)}L=-1},this.readRenderTargetPixels=function(I,Q,ce,fe,q,be,ke){if(!(I&&I.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let He=qe.get(I).__webglFramebuffer;if(I.isWebGLCubeRenderTarget&&ke!==void 0&&(He=He[ke]),He){Qe.bindFramebuffer(j.FRAMEBUFFER,He);try{const We=I.texture,lt=We.format,ut=We.type;if(!mt.textureFormatReadable(lt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!mt.textureTypeReadable(ut)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Q>=0&&Q<=I.width-fe&&ce>=0&&ce<=I.height-q&&j.readPixels(Q,ce,fe,q,st.convert(lt),st.convert(ut),be)}finally{const We=B!==null?qe.get(B).__webglFramebuffer:null;Qe.bindFramebuffer(j.FRAMEBUFFER,We)}}},this.readRenderTargetPixelsAsync=async function(I,Q,ce,fe,q,be,ke){if(!(I&&I.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let He=qe.get(I).__webglFramebuffer;if(I.isWebGLCubeRenderTarget&&ke!==void 0&&(He=He[ke]),He){const We=I.texture,lt=We.format,ut=We.type;if(!mt.textureFormatReadable(lt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!mt.textureTypeReadable(ut))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(Q>=0&&Q<=I.width-fe&&ce>=0&&ce<=I.height-q){Qe.bindFramebuffer(j.FRAMEBUFFER,He);const Je=j.createBuffer();j.bindBuffer(j.PIXEL_PACK_BUFFER,Je),j.bufferData(j.PIXEL_PACK_BUFFER,be.byteLength,j.STREAM_READ),j.readPixels(Q,ce,fe,q,st.convert(lt),st.convert(ut),0);const ht=B!==null?qe.get(B).__webglFramebuffer:null;Qe.bindFramebuffer(j.FRAMEBUFFER,ht);const Pt=j.fenceSync(j.SYNC_GPU_COMMANDS_COMPLETE,0);return j.flush(),await lO(j,Pt,4),j.bindBuffer(j.PIXEL_PACK_BUFFER,Je),j.getBufferSubData(j.PIXEL_PACK_BUFFER,0,be),j.deleteBuffer(Je),j.deleteSync(Pt),be}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(I,Q=null,ce=0){I.isTexture!==!0&&(na("WebGLRenderer: copyFramebufferToTexture function signature has changed."),Q=arguments[0]||null,I=arguments[1]);const fe=Math.pow(2,-ce),q=Math.floor(I.image.width*fe),be=Math.floor(I.image.height*fe),ke=Q!==null?Q.x:0,He=Q!==null?Q.y:0;F.setTexture2D(I,0),j.copyTexSubImage2D(j.TEXTURE_2D,ce,0,0,ke,He,q,be),Qe.unbindTexture()};const Su=j.createFramebuffer(),Eu=j.createFramebuffer();this.copyTextureToTexture=function(I,Q,ce=null,fe=null,q=0,be=null){I.isTexture!==!0&&(na("WebGLRenderer: copyTextureToTexture function signature has changed."),fe=arguments[0]||null,I=arguments[1],Q=arguments[2],be=arguments[3]||0,ce=null),be===null&&(q!==0?(na("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),be=q,q=0):be=0);let ke,He,We,lt,ut,Je,ht,Pt,Dt;const Yt=I.isCompressedTexture?I.mipmaps[be]:I.image;if(ce!==null)ke=ce.max.x-ce.min.x,He=ce.max.y-ce.min.y,We=ce.isBox3?ce.max.z-ce.min.z:1,lt=ce.min.x,ut=ce.min.y,Je=ce.isBox3?ce.min.z:0;else{const Rn=Math.pow(2,-q);ke=Math.floor(Yt.width*Rn),He=Math.floor(Yt.height*Rn),I.isDataArrayTexture?We=Yt.depth:I.isData3DTexture?We=Math.floor(Yt.depth*Rn):We=1,lt=0,ut=0,Je=0}fe!==null?(ht=fe.x,Pt=fe.y,Dt=fe.z):(ht=0,Pt=0,Dt=0);const At=st.convert(Q.format),tt=st.convert(Q.type);let tn;Q.isData3DTexture?(F.setTexture3D(Q,0),tn=j.TEXTURE_3D):Q.isDataArrayTexture||Q.isCompressedArrayTexture?(F.setTexture2DArray(Q,0),tn=j.TEXTURE_2D_ARRAY):(F.setTexture2D(Q,0),tn=j.TEXTURE_2D),j.pixelStorei(j.UNPACK_FLIP_Y_WEBGL,Q.flipY),j.pixelStorei(j.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Q.premultiplyAlpha),j.pixelStorei(j.UNPACK_ALIGNMENT,Q.unpackAlignment);const Mt=j.getParameter(j.UNPACK_ROW_LENGTH),Tn=j.getParameter(j.UNPACK_IMAGE_HEIGHT),Pi=j.getParameter(j.UNPACK_SKIP_PIXELS),Vn=j.getParameter(j.UNPACK_SKIP_ROWS),Rs=j.getParameter(j.UNPACK_SKIP_IMAGES);j.pixelStorei(j.UNPACK_ROW_LENGTH,Yt.width),j.pixelStorei(j.UNPACK_IMAGE_HEIGHT,Yt.height),j.pixelStorei(j.UNPACK_SKIP_PIXELS,lt),j.pixelStorei(j.UNPACK_SKIP_ROWS,ut),j.pixelStorei(j.UNPACK_SKIP_IMAGES,Je);const Ot=I.isDataArrayTexture||I.isData3DTexture,Hn=Q.isDataArrayTexture||Q.isData3DTexture;if(I.isDepthTexture){const Rn=qe.get(I),sn=qe.get(Q),Pn=qe.get(Rn.__renderTarget),Ps=qe.get(sn.__renderTarget);Qe.bindFramebuffer(j.READ_FRAMEBUFFER,Pn.__webglFramebuffer),Qe.bindFramebuffer(j.DRAW_FRAMEBUFFER,Ps.__webglFramebuffer);for(let wt=0;wt<We;wt++)Ot&&(j.framebufferTextureLayer(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,qe.get(I).__webglTexture,q,Je+wt),j.framebufferTextureLayer(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,qe.get(Q).__webglTexture,be,Dt+wt)),j.blitFramebuffer(lt,ut,ke,He,ht,Pt,ke,He,j.DEPTH_BUFFER_BIT,j.NEAREST);Qe.bindFramebuffer(j.READ_FRAMEBUFFER,null),Qe.bindFramebuffer(j.DRAW_FRAMEBUFFER,null)}else if(q!==0||I.isRenderTargetTexture||qe.has(I)){const Rn=qe.get(I),sn=qe.get(Q);Qe.bindFramebuffer(j.READ_FRAMEBUFFER,Su),Qe.bindFramebuffer(j.DRAW_FRAMEBUFFER,Eu);for(let Pn=0;Pn<We;Pn++)Ot?j.framebufferTextureLayer(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,Rn.__webglTexture,q,Je+Pn):j.framebufferTexture2D(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,Rn.__webglTexture,q),Hn?j.framebufferTextureLayer(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,sn.__webglTexture,be,Dt+Pn):j.framebufferTexture2D(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,sn.__webglTexture,be),q!==0?j.blitFramebuffer(lt,ut,ke,He,ht,Pt,ke,He,j.COLOR_BUFFER_BIT,j.NEAREST):Hn?j.copyTexSubImage3D(tn,be,ht,Pt,Dt+Pn,lt,ut,ke,He):j.copyTexSubImage2D(tn,be,ht,Pt,lt,ut,ke,He);Qe.bindFramebuffer(j.READ_FRAMEBUFFER,null),Qe.bindFramebuffer(j.DRAW_FRAMEBUFFER,null)}else Hn?I.isDataTexture||I.isData3DTexture?j.texSubImage3D(tn,be,ht,Pt,Dt,ke,He,We,At,tt,Yt.data):Q.isCompressedArrayTexture?j.compressedTexSubImage3D(tn,be,ht,Pt,Dt,ke,He,We,At,Yt.data):j.texSubImage3D(tn,be,ht,Pt,Dt,ke,He,We,At,tt,Yt):I.isDataTexture?j.texSubImage2D(j.TEXTURE_2D,be,ht,Pt,ke,He,At,tt,Yt.data):I.isCompressedTexture?j.compressedTexSubImage2D(j.TEXTURE_2D,be,ht,Pt,Yt.width,Yt.height,At,Yt.data):j.texSubImage2D(j.TEXTURE_2D,be,ht,Pt,ke,He,At,tt,Yt);j.pixelStorei(j.UNPACK_ROW_LENGTH,Mt),j.pixelStorei(j.UNPACK_IMAGE_HEIGHT,Tn),j.pixelStorei(j.UNPACK_SKIP_PIXELS,Pi),j.pixelStorei(j.UNPACK_SKIP_ROWS,Vn),j.pixelStorei(j.UNPACK_SKIP_IMAGES,Rs),be===0&&Q.generateMipmaps&&j.generateMipmap(tn),Qe.unbindTexture()},this.copyTextureToTexture3D=function(I,Q,ce=null,fe=null,q=0){return I.isTexture!==!0&&(na("WebGLRenderer: copyTextureToTexture3D function signature has changed."),ce=arguments[0]||null,fe=arguments[1]||null,I=arguments[2],Q=arguments[3],q=arguments[4]||0),na('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(I,Q,ce,fe,q)},this.initRenderTarget=function(I){qe.get(I).__webglFramebuffer===void 0&&F.setupRenderTarget(I)},this.initTexture=function(I){I.isCubeTexture?F.setTextureCube(I,0):I.isData3DTexture?F.setTexture3D(I,0):I.isDataArrayTexture||I.isCompressedArrayTexture?F.setTexture2DArray(I,0):F.setTexture2D(I,0),Qe.unbindTexture()},this.resetState=function(){b=0,k=0,B=null,Qe.reset(),yt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Rr}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorspace=It._getDrawingBufferColorSpace(e),n.unpackColorSpace=It._getUnpackColorSpace()}}const w5=()=>{const t=$.useRef(null);return $.useEffect(()=>{const e=new kO,n=new rT(-1,1,1,-1,.1,10);n.position.z=5;const i=new E5;i.setSize(window.innerWidth,window.innerHeight),t.current.appendChild(i.domElement);const s=new gu(2,2),a=new Fr({uniforms:{u_time:{value:1},u_resolution:{value:new Ut(window.innerWidth,window.innerHeight)},u_lightPos:{value:new Ut(.5,.5)},u_mouse:{value:new Ut(0,0)}},vertexShader:`
      void main() {
        // Pass-through to clip space
        gl_Position = vec4(position, 1.0);
      }
      `,fragmentShader:`
      //=============================================================================
      // UNIFORMS
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_lightPos;
      uniform vec2 u_mouse;
    
      //=============================================================================
      // 1) RANDOM + NOISE UTILITIES
    
      // Simple random used for Truchet pattern
      float random(vec2 st) {
        return fract(sin(dot(st, vec2(114.0, 4.0))) * 9999999.9);
      }
    
      // "Hash" function for 2D -> 1D pseudo-random
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }
    
      // 2D noise using the hash at cell corners
      float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
    
        float a = hash(i);
        float b = hash(i + vec2(1.0, 5.0));
        float c = hash(i + vec2(0.0, 4.0));
        float d = hash(i + vec2(1.0, 3.0));
    
        // Smooth interpolation (Hermite)
        vec2 u = f * f * (3.0 - 2.0 * f);
    
        // Bilinear interpolation of corner values
        return mix(
        mix(a, b, u.x),
        mix(c, d, u.x),
        u.y
        );
      }
    
      //=============================================================================
      // 2) SHAPES & LIGHTING
    
      // Circle function for a sphere-like effect
      float sphere(vec2 st, vec2 center, float radius) {
        float dist = length(st - center);
        return 1.0 - smoothstep(
        radius - 0.00001,
        radius + 0.001,
        dist
        );
      }
    
      // Simple lighting with noise
      float lightEffect(vec3 normal, vec3 lightDir) {
        float n = noise(normal.xy * 0.01 + u_time * 0.9); // lower freq
        return max(dot(normal, lightDir) * 0.5 + n * 0.01, 0.04); // lower brightness and amplitude
      }
    
      // Truchet tile pattern
      vec2 truchetPattern(vec2 st, float index) {
        index = fract((index - 0.5) * 2.0);
    
        if (index > 0.75) {
        st = vec2(1.0) - st;              
        } else if (index > 0.5) {
        st = vec2(1.0 - st.x, st.y);     
        } else if (index > 0.25) {
        st = 0.01 - vec2(1.0 - st.x, st.y); 
        }
        return st;
      }
    
      //=============================================================================
      // 3) HOLLOW BOX UTILS (Square ring in 2D)
    
      // Distance to a box centered at c, with half-size halfSize
      float boxSDF(vec2 p, vec2 c, vec2 halfSize) {
        vec2 d = abs(p - c) - halfSize;
        return length(max(d, 0.0));
      }
    
      // A ring defined by outer & inner boxes
      float hollowBox(vec2 p, vec2 center, float halfSize, float thickness) {
        float distOuter = boxSDF(p, center, vec2(halfSize));
        float distInner = boxSDF(p, center, vec2(halfSize - thickness));
    
        float ring = smoothstep(0.0, 0.01, distOuter)
             - smoothstep(0.0, 0.01, distInner);
    
        return clamp(ring, 0.0, 1.0);
      }
    
      //=============================================================================
      // 4) MAIN FRAGMENT: COMBINE EVERYTHING
    
      void main() {
        // Normalize screen coordinates
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
    
        // --- PART A: TRUCHET + SPHERE + LIGHTING ---
        // Shift + scale
        vec2 stTile = st - vec2(0.33, 0.4);
        stTile *= 3.5;
    
        // Truchet pattern
        vec2 tVal = truchetPattern(stTile, random(stTile * 1.5));
    
        // Sphere near the mouse (radius=0.0 => small effect)
        float sphereEf = sphere(stTile, u_mouse, 0.0);
    
        // Lighting
        vec3 normal   = normalize(vec3(stTile - u_mouse, 0.0));
        vec3 lightDir = normalize(vec3(u_lightPos - u_mouse, 0.2));
        float lightVal = lightEffect(normal, lightDir);
    
        // Tile color
        vec3 tileColor = vec3(tVal.x * tVal.y * lightVal) + vec3(sphereEf);
    
        // --- PART B: HOLLOW BOX (square ring) ---
        float ringVal = hollowBox(
        st,
        vec2(0.5, 0.5),
        0.25,  // halfSize => 0.5 total
        0.03   // thickness
        );
    
        // ringVal = 1 => ring region, 0 => outside ring
    
        // Negative space ring => black ring
        float shapeMask = 1.0 - ringVal;
        vec3 finalColor = tileColor * shapeMask;
    
        // Output
        gl_FragColor = vec4(finalColor, 0.5); // lower opacity
      }
      `,transparent:!0}),l=new nr(s,a);e.add(l);const u=()=>{a.uniforms.u_time.value+=.02,i.render(e,n),requestAnimationFrame(u)};u();const f=h=>{const m=h.clientX/window.innerWidth,g=1-h.clientY/window.innerHeight;a.uniforms.u_mouse.value.set(m,g)};window.addEventListener("mousemove",f);const d=()=>{const{innerWidth:h,innerHeight:m}=window;i.setSize(h,m),a.uniforms.u_resolution.value.set(h,m)};return window.addEventListener("resize",d),()=>{window.removeEventListener("mousemove",f),window.removeEventListener("resize",d),t.current.removeChild(i.domElement)}},[]),he.jsx("div",{ref:t,style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",zIndex:-1}})},M5=Ve.div`
  width: 100vw;
  height: 100vh;
  border: 30px hsla(0, 0.00%, 0.00%, 0.90) solid;
  position: fixed;
  box-sizing: border-box;
`,T5=Ve.div`
  position: fixed;
  left: 30px;
  right: 30px;
  top: 30px;
  bottom: 30px;
  border: 2.5px solid rgba(136, 169, 215, 0.47);
  overflow: hidden;
`,A5=Ve.div`
    display: flex;
    position: absolute;
    flex-direction: column;
    justify-content: center;
    transform: translateY(80%);
    padding: 60px;
    margin-left: -30px;
`;function ms({children:t}){return he.jsx(au.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.5},children:t})}function C5(){const t=Br();return he.jsx(XR,{mode:"wait",children:he.jsxs(BC,{location:t,children:[he.jsx(Mr,{path:"/",element:he.jsx(ms,{children:he.jsx(VR,{})})}),he.jsx(Mr,{path:"/about",element:he.jsx(ms,{children:he.jsx(RR,{})})}),he.jsx(Mr,{path:"/projects",element:he.jsx(ms,{children:he.jsx(AI,{})})}),he.jsx(Mr,{path:"/projects/Grove",element:he.jsx(ms,{children:he.jsx(qU,{})})}),he.jsx(Mr,{path:"/projects/CapsuleMachine",element:he.jsx(ms,{children:he.jsx(JU,{})})}),he.jsx(Mr,{path:"/projects/Lens",element:he.jsx(ms,{children:he.jsx(rF,{})})}),he.jsx(Mr,{path:"/projects/Sticker",element:he.jsx(ms,{children:he.jsx(uF,{})})}),he.jsx(Mr,{path:"/projects/Hoodie",element:he.jsx(ms,{children:he.jsx(pF,{})})})]},t.pathname)})}function b5(){return he.jsxs(ub,{children:[he.jsx(vF,{}),he.jsx(M5,{children:he.jsxs(T5,{children:[he.jsx(w5,{}),he.jsx(A5,{children:he.jsx(ER,{})}),he.jsx(gI,{}),he.jsx(C5,{})]})})]})}YA.render(he.jsx(ma.StrictMode,{children:he.jsx(b5,{})}),document.getElementById("root"));
