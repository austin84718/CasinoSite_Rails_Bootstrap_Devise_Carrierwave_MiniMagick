/**
 * Serializer module for Rangy.
 * Serializes Ranges and Selections. An example use would be to store a user's selection on a particular page in a
 * cookie or local storage and restore it on the user's next visit to the same page.
 *
 * Part of Rangy, a cross-browser JavaScript range and selection library
 * http://code.google.com/p/rangy/
 *
 * Depends on Rangy core.
 *
 * Copyright 2014, Tim Down
 * Licensed under the MIT license.
 * Version: 1.3.0-alpha.20140825
 * Build date: 25 August 2014
 */
!function(e,n){"function"==typeof define&&define.amd?define(["./rangy-core"],e):"undefined"!=typeof module&&"object"==typeof exports?module.exports=e(require("rangy")):e(n.rangy)}(function(e){e.createModule("Serializer",["WrappedSelection"],function(e,n){function o(e){return e.replace(/</g,"&lt;").replace(/>/g,"&gt;")}function t(e,n){n=n||[];var r=e.nodeType,i=e.childNodes,c=i.length,a=[r,e.nodeName,c].join(":"),d="",u="";switch(r){case 3:d=o(e.nodeValue);break;case 8:d="<!--"+o(e.nodeValue)+"-->";break;default:d="<"+a+">",u="</>"}d&&n.push(d);for(var l=0;c>l;++l)t(i[l],n);return u&&n.push(u),n}function r(e){var n=t(e).join("");return v(n).toString(16)}function i(e,n,o){var t=[],r=e;for(o=o||w.getDocument(e).documentElement;r&&r!=o;)t.push(w.getNodeIndex(r,!0)),r=r.parentNode;return t.join("/")+":"+n}function c(e,o,t){o||(o=(t||document).documentElement);for(var r,i=e.split(":"),c=o,a=i[0]?i[0].split("/"):[],d=a.length;d--;){if(r=parseInt(a[d],10),!(r<c.childNodes.length))throw n.createError("deserializePosition() failed: node "+w.inspectNode(c)+" has no child with index "+r+", "+d);c=c.childNodes[r]}return new w.DomPosition(c,parseInt(i[1],10))}function a(o,t,c){if(c=c||e.DomRange.getRangeDocument(o).documentElement,!w.isOrIsAncestorOf(c,o.commonAncestorContainer))throw n.createError("serializeRange(): range "+o.inspect()+" is not wholly contained within specified root node "+w.inspectNode(c));var a=i(o.startContainer,o.startOffset,c)+","+i(o.endContainer,o.endOffset,c);return t||(a+="{"+r(c)+"}"),a}function d(o,t,i){t?i=i||w.getDocument(t):(i=i||document,t=i.documentElement);var a=R.exec(o),d=a[4];if(d){var u=r(t);if(d!==u)throw n.createError("deserializeRange(): checksums of serialized range root node ("+d+") and target root node ("+u+") do not match")}var l=c(a[1],t,i),s=c(a[2],t,i),f=e.createRange(i);return f.setStartAndEnd(l.node,l.offset,s.node,s.offset),f}function u(e,n,o){n||(n=(o||document).documentElement);var t=R.exec(e),i=t[3];return!i||i===r(n)}function l(n,o,t){n=e.getSelection(n);for(var r=n.getAllRanges(),i=[],c=0,d=r.length;d>c;++c)i[c]=a(r[c],o,t);return i.join("|")}function s(n,o,t){o?t=t||w.getWindow(o):(t=t||window,o=t.document.documentElement);for(var r=n.split("|"),i=e.getSelection(t),c=[],a=0,u=r.length;u>a;++a)c[a]=d(r[a],o,t.document);return i.setRanges(c),i}function f(e,n,o){var t;n?t=o?o.document:w.getDocument(n):(o=o||window,n=o.document.documentElement);for(var r=e.split("|"),i=0,c=r.length;c>i;++i)if(!u(r[i],n,t))return!1;return!0}function m(e){for(var n,o,t=e.split(/[;,]/),r=0,i=t.length;i>r;++r)if(n=t[r].split("="),n[0].replace(/^\s+/,"")==S&&(o=n[1]))return decodeURIComponent(o.replace(/\s+$/,""));return null}function p(e){e=e||window;var n=m(e.document.cookie);n&&s(n,e.doc)}function g(n,o){n=n||window,o="object"==typeof o?o:{};var t=o.expires?";expires="+o.expires.toUTCString():"",r=o.path?";path="+o.path:"",i=o.domain?";domain="+o.domain:"",c=o.secure?";secure":"",a=l(e.getSelection(n));n.document.cookie=encodeURIComponent(S)+"="+encodeURIComponent(a)+t+r+i+c}var h="undefined";(typeof encodeURIComponent==h||typeof decodeURIComponent==h)&&n.fail("Global object is missing encodeURIComponent and/or decodeURIComponent method");var v=function(){function e(e){for(var n,o=[],t=0,r=e.length;r>t;++t)n=e.charCodeAt(t),128>n?o.push(n):2048>n?o.push(n>>6|192,63&n|128):o.push(n>>12|224,n>>6&63|128,63&n|128);return o}function n(){for(var e,n,o=[],t=0;256>t;++t){for(n=t,e=8;e--;)1==(1&n)?n=n>>>1^3988292384:n>>>=1;o[t]=n>>>0}return o}function o(){return t||(t=n()),t}var t=null;return function(n){for(var t,r=e(n),i=-1,c=o(),a=0,d=r.length;d>a;++a)t=255&(i^r[a]),i=i>>>8^c[t];return(-1^i)>>>0}}(),w=e.dom,R=/^([^,]+),([^,\{]+)(\{([^}]+)\})?$/,S="rangySerializedSelection";e.serializePosition=i,e.deserializePosition=c,e.serializeRange=a,e.deserializeRange=d,e.canDeserializeRange=u,e.serializeSelection=l,e.deserializeSelection=s,e.canDeserializeSelection=f,e.restoreSelectionFromCookie=p,e.saveSelectionCookie=g,e.getElementChecksum=r,e.nodeToInfoString=t})},function(e){return e("return this;")()}(Function));