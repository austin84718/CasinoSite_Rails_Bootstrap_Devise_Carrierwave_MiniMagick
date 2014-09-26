/**
 * Selection save and restore module for Rangy.
 * Saves and restores user selections using marker invisible elements in the DOM.
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
!function(e,n){"function"==typeof define&&define.amd?define(["./rangy-core"],e):"undefined"!=typeof module&&"object"==typeof exports?module.exports=e(require("rangy")):e(n.rangy)}(function(e){e.createModule("SaveRestore",["WrappedRange"],function(e,n){function r(e,n){return(n||document).getElementById(e)}function t(e,n){var r,t="selectionBoundary_"+ +new Date+"_"+(""+Math.random()).slice(2),a=m.getDocument(e.startContainer),o=e.cloneRange();return o.collapse(n),r=a.createElement("span"),r.id=t,r.style.lineHeight="0",r.style.display="none",r.className="rangySelectionBoundary",r.appendChild(a.createTextNode(p)),o.insertNode(r),r}function a(e,t,a,o){var d=r(a,e);d?(t[o?"setStartBefore":"setEndBefore"](d),d.parentNode.removeChild(d)):n.warn("Marker element has been removed. Cannot restore selection.")}function o(e,n){return n.compareBoundaryPoints(e.START_TO_START,e)}function d(n,r){var a,o,d=e.DomRange.getRangeDocument(n),s=n.toString();return n.collapsed?(o=t(n,!1),{document:d,markerId:o.id,collapsed:!0}):(o=t(n,!1),a=t(n,!0),{document:d,startMarkerId:a.id,endMarkerId:o.id,collapsed:!1,backward:r,toString:function(){return"original text: '"+s+"', new text: '"+n.toString()+"'"}})}function s(t,o){var d=t.document;"undefined"==typeof o&&(o=!0);var s=e.createRange(d);if(t.collapsed){var i=r(t.markerId,d);if(i){i.style.display="inline";var l=i.previousSibling;l&&3==l.nodeType?(i.parentNode.removeChild(i),s.collapseToPoint(l,l.length)):(s.collapseBefore(i),i.parentNode.removeChild(i))}else n.warn("Marker element has been removed. Cannot restore selection.")}else a(d,s,t.startMarkerId,!0),a(d,s,t.endMarkerId,!1);return o&&s.normalizeBoundaries(),s}function i(n,t){var a,s,i=[];n=n.slice(0),n.sort(o);for(var l=0,c=n.length;c>l;++l)i[l]=d(n[l],t);for(l=c-1;l>=0;--l)a=n[l],s=e.DomRange.getRangeDocument(a),a.collapsed?a.collapseAfter(r(i[l].markerId,s)):(a.setEndBefore(r(i[l].endMarkerId,s)),a.setStartAfter(r(i[l].startMarkerId,s)));return i}function l(r){if(!e.isSelectionValid(r))return n.warn("Cannot save selection. This usually happens when the selection is collapsed and the selection document has lost focus."),null;var t=e.getSelection(r),a=t.getAllRanges(),o=1==a.length&&t.isBackward(),d=i(a,o);return o?t.setSingleRange(a[0],"backward"):t.setRanges(a),{win:r,rangeInfos:d,restored:!1}}function c(e){for(var n=[],r=e.length,t=r-1;t>=0;t--)n[t]=s(e[t],!0);return n}function u(n,r){if(!n.restored){var t=n.rangeInfos,a=e.getSelection(n.win),o=c(t),d=t.length;1==d&&r&&e.features.selectionHasExtend&&t[0].backward?(a.removeAllRanges(),a.addRange(o[0],!0)):a.setRanges(o),n.restored=!0}}function f(e,n){var t=r(n,e);t&&t.parentNode.removeChild(t)}function g(e){for(var n,r=e.rangeInfos,t=0,a=r.length;a>t;++t)n=r[t],n.collapsed?f(e.doc,n.markerId):(f(e.doc,n.startMarkerId),f(e.doc,n.endMarkerId))}var m=e.dom,p="﻿";e.util.extend(e,{saveRange:d,restoreRange:s,saveRanges:i,restoreRanges:c,saveSelection:l,restoreSelection:u,removeMarkerElement:f,removeMarkers:g})})},function(e){return e("return this;")()}(Function));