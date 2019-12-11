"object"!=typeof JSON&&(JSON={}),function(){"use strict";function f(t){return 10>t?"0"+t:t}function this_value(){return this.valueOf()}function quote(t){return rx_escapable.lastIndex=0,rx_escapable.test(t)?'"'+t.replace(rx_escapable,function(t){var e=meta[t];return"string"==typeof e?e:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+t+'"'}function str(t,e){var n,i,r,o,a,c=gap,s=e[t];switch(s&&"object"==typeof s&&"function"==typeof s.toJSON&&(s=s.toJSON(t)),"function"==typeof rep&&(s=rep.call(e,t,s)),typeof s){case"string":return quote(s);case"number":return isFinite(s)?String(s):"null";case"boolean":case"null":return String(s);case"object":if(!s)return"null";if(gap+=indent,a=[],"[object Array]"===Object.prototype.toString.apply(s)){for(o=s.length,n=0;o>n;n+=1)a[n]=str(n,s)||"null";return r=0===a.length?"[]":gap?"[\n"+gap+a.join(",\n"+gap)+"\n"+c+"]":"["+a.join(",")+"]",gap=c,r}if(rep&&"object"==typeof rep)for(o=rep.length,n=0;o>n;n+=1)"string"==typeof rep[n]&&(i=rep[n],r=str(i,s),r&&a.push(quote(i)+(gap?": ":":")+r));else for(i in s)Object.prototype.hasOwnProperty.call(s,i)&&(r=str(i,s),r&&a.push(quote(i)+(gap?": ":":")+r));return r=0===a.length?"{}":gap?"{\n"+gap+a.join(",\n"+gap)+"\n"+c+"}":"{"+a.join(",")+"}",gap=c,r}}var rx_one=/^[\],:{}\s]*$/,rx_two=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,rx_three=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,rx_four=/(?:^|:|,)(?:\s*\[)+/g,rx_escapable=/[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,rx_dangerous=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},Boolean.prototype.toJSON=this_value,Number.prototype.toJSON=this_value,String.prototype.toJSON=this_value);var gap,indent,meta,rep;"function"!=typeof JSON.stringify&&(meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON.stringify=function(t,e,n){var i;if(gap="",indent="","number"==typeof n)for(i=0;n>i;i+=1)indent+=" ";else"string"==typeof n&&(indent=n);if(rep=e,e&&"function"!=typeof e&&("object"!=typeof e||"number"!=typeof e.length))throw new Error("JSON.stringify");return str("",{"":t})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){function walk(t,e){var n,i,r=t[e];if(r&&"object"==typeof r)for(n in r)Object.prototype.hasOwnProperty.call(r,n)&&(i=walk(r,n),void 0!==i?r[n]=i:delete r[n]);return reviver.call(t,e,r)}var j;if(text=String(text),rx_dangerous.lastIndex=0,rx_dangerous.test(text)&&(text=text.replace(rx_dangerous,function(t){return"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})),rx_one.test(text.replace(rx_two,"@").replace(rx_three,"]").replace(rx_four,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}(),function(t){"use strict";try{"string"==typeof window.top.location.toString()&&(t=window.top)}catch(e){t=window.self}t.exactag=t.exactag||{};var n,i=t.document,r=t.console||{},o=window.JSON||{},a=function(){return void 0},c=function(){return void 0},s=function(){function t(t,e,n,i){var r,o,a,c,s,u,f,h,p,l=0;for(r=e||[0],n=n||0,u=n>>>3,p=-1===i?3:0,c=0;c<t.length;c+=1)for(o=t.charCodeAt(c),a=[],128>o?a.push(o):2048>o?(a.push(192|o>>>6),a.push(128|63&o)):55296>o||o>=57344?a.push(224|o>>>12,128|o>>>6&63,128|63&o):(c+=1,o=65536+((1023&o)<<10|1023&t.charCodeAt(c)),a.push(240|o>>>18,128|o>>>12&63,128|o>>>6&63,128|63&o)),s=0;s<a.length;s+=1){for(h=l+u,f=h>>>2;r.length<=f;)r.push(0);r[f]|=a[s]<<8*(p+i*(h%4)),l+=1}return{value:r,binLen:8*l+n}}function e(t,e,n,i){var r,o,a,c,s,u,f="",h=e/8,p="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";for(u=-1===n?3:0,r=0;h>r;r+=3)for(c=h>r+1?t[r+1>>>2]:0,s=h>r+2?t[r+2>>>2]:0,a=(t[r>>>2]>>>8*(u+n*(r%4))&255)<<16|(c>>>8*(u+n*((r+1)%4))&255)<<8|s>>>8*(u+n*((r+2)%4))&255,o=0;4>o;o+=1)f+=e>=8*r+6*o?p.charAt(a>>>6*(3-o)&63):i.b64Pad;return f}function n(t,e){return t>>>e|t<<32-e}function i(t,e){return t>>>e}function r(t,e){var r,o,a,c,s,u,f,h,p,l,g,d,m,y,b,v,x,w,k,D,S,C,N,O,T,j,_,A=[];for(g=64,m=1,N=Number,y=function(t,e){var n=(65535&t)+(65535&e),i=(t>>>16)+(e>>>16)+(n>>>16);return(65535&i)<<16|65535&n},b=function(t,e,n,i){var r=(65535&t)+(65535&e)+(65535&n)+(65535&i),o=(t>>>16)+(e>>>16)+(n>>>16)+(i>>>16)+(r>>>16);return(65535&o)<<16|65535&r},v=function(t,e,n,i,r){var o=(65535&t)+(65535&e)+(65535&n)+(65535&i)+(65535&r),a=(t>>>16)+(e>>>16)+(n>>>16)+(i>>>16)+(r>>>16)+(o>>>16);return(65535&a)<<16|65535&o},x=function(t){return n(t,7)^n(t,18)^i(t,3)},w=function(t){return n(t,17)^n(t,19)^i(t,10)},k=function(t){return n(t,2)^n(t,13)^n(t,22)},D=function(t){return n(t,6)^n(t,11)^n(t,25)},C=function(t,e,n){return t&e^t&n^e&n},S=function(t,e,n){return t&e^~t&n},_=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],r=e[0],o=e[1],a=e[2],c=e[3],s=e[4],u=e[5],f=e[6],h=e[7],d=0;g>d;d+=1)16>d?(j=d*m,O=t.length<=j?0:t[j],T=t.length<=j+1?0:t[j+1],A[d]=new N(O,T)):A[d]=b(w(A[d-2]),A[d-7],x(A[d-15]),A[d-16]),p=v(h,D(s),S(s,u,f),_[d],A[d]),l=y(k(r),C(r,o,a)),h=f,f=u,u=s,s=y(c,p),c=a,a=o,o=r,r=y(p,l);return e[0]=y(r,e[0]),e[1]=y(o,e[1]),e[2]=y(a,e[2]),e[3]=y(c,e[3]),e[4]=y(s,e[4]),e[5]=y(u,e[5]),e[6]=y(f,e[6]),e[7]=y(h,e[7]),e}function o(t,e,n,i){var o,c,s,u,f;for(s=(e+65>>>9<<4)+15,u=16;t.length<=s;)t.push(0);for(t[e>>>5]|=128<<24-e%32,f=e+n,t[s]=4294967295&f,t[s-1]=f/a|0,c=t.length,o=0;c>o;o+=u)i=r(t.slice(o,o+u),i);return i}var a=4294967296;return function(n){var i,a,c,s=0,u=[],f=0,h=-1;c=function(t){return t.slice()},a=function(e,n,i){return t(e,n,i,h)},i=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225],this.update=function(t){var e,n,o,c,h,p=0,l=16;for(e=a(t,u,f),n=e.binLen,c=e.value,o=n>>>5,h=0;o>h;h+=l)n>=p+512&&(i=r(c.slice(h,h+l),i),p+=512);s+=p,u=c.slice(p>>>5),f=n%512},this.getBase64=function(){var t,n;return t={b64Pad:"=",outputUpper:!1,shakeLen:-1},n=o(u.slice(),f,s,c(i),256),e(n,256,h,t)},this.update(n)}}();void 0===r.log&&(r.log=function(){return void 0}),a.prototype={version:"3.0.20170425",cfg:{type:"Content",conversiontype:"",referrer:i.referrer,host:t.location.host,site:t.location.pathname,search:t.location.search,protocol:t.location.protocol,campaign:"",screensize:"",pitype:"",uk:"",trackingURL:"//m.exactag.com",cdnURL:"//cdn.exactag.com"},cName:"exactag",contentNode:!1,stopwatch:{start:(new Date).getTime()},rootDoc:null,uid:null,item:{},logStack:[],traceFrequency:1e3,traceUntil:new Date(2013,0,26),traceEnabled:!1,readyToTrack:!1,nfif:!1,enabled:!0,style:"position:absolute; z-index:-1; width:0px; height:0px; overflow: hidden; border: 0;",init:function(){return this.getConfig(),null===i.body?void t.setTimeout(this.createDelegate(this,this.init),10):(this.meantime("pi.init"),this.createContentNode(),void this.setReadyToTrack())},createDelegate:function(t,e){return function(n){e.apply(t,arguments,n)}},createContentNode:function(){var t=i.createElement("iframe");t.setAttribute("id",this.cName+"_"+this.uid),t.setAttribute("aria-hidden","true"),t.setAttribute("tabindex","-1"),t.style.cssText=this.style,i.body.appendChild(t),this.rootDoc=this.getDocument(t);try{this.rootDoc.open("text/html","replace"),i=this.ieVersion>0&&this.ieVersion<9?t.document||this.rootDoc:this.rootDoc,this.rootDoc.close()}catch(e){return void this.report("accessing root iframe failed","error")}this.contentNode=this.rootDoc.createElement("div"),this.contentNode.id=this.cName+"_pi_content",this.rootDoc.body.appendChild(this.contentNode),this.log("this.rootDoc filled ",this.uid)},processItem:function(e){if("object"!=typeof e)return void this.report("no valid tracking object passed","error");if(!this.readyToTrack)return this.log("not ready to track yet ... retrying in 10ms"),void t.setTimeout(this.createDelegate(this,this.processItem),10,e);this.meantime("pi.processItem");var n,i;if(this.item=this.getTrackingConfig(e),this.log("trackingConfig",this.item),this.meantime("exctag.callHandler"),i=this.item.trackingURL+"/pi.aspx?campaign="+this.item.campaign+"&pitype="+this.item.type+"&convtype="+this.item.conversiontype+"&rnd="+this.getRandomId(12),this.nfif===!0)try{this.post(i+"&retmode=6",{items:this.stringify(this.item)})}catch(r){this.report("post to pi.aspx failed","error")}else try{i+="&items="+encodeURIComponent(this.stringify(this.item)),n=this.rootDoc.createElement("script"),n.setAttribute("src",i),n.setAttribute("type","text/javascript"),this.rootDoc.body.appendChild(n)}catch(o){this.report("calling pi.aspx in script failed","error")}this.meantime("pi.handlerCalled"),t.exactag=new c,this.log("exactag reinit",exactag)},getDocument:function(t){var e,n=null;try{n=t.contentDocument||t.contentWindow.document||t.document}catch(r){e="javascript",t.setAttribute("src",e+':(function(){document.open();document.domain="'+i.domain+'";})()'),n=t.contentDocument||t.contentWindow.document||t.document}return n},appendHiddenField:function(t,e,n){var i;i=this.rootDoc.createElement("input"),i.setAttribute("type","hidden"),i.setAttribute("name",t),i.setAttribute("value",e),n.appendChild(i)},createContainer:function(t){var e,n=this.rootDoc.getElementById(t);return null===n&&(e=this.rootDoc.createElement("div"),e.id=t,this.rootDoc.body.appendChild(e)),e},log:function(){var t,e=arguments;if(this.logStack.push(e),this.debug)if(e[0]=this.uid+" - "+e[0],this.ieVersion>=9)t=Function.prototype.bind.call(r.log,r),t.apply(r,arguments);else if(Function.prototype.bind||"undefined"===r||"object"!=typeof r.log)try{r.log.apply(r,arguments)}catch(n){r.log(arguments)}else Function.prototype.call.call(r.log,r,Array.prototype.slice.call(arguments))},report:function(e,n){var i,r={};r.type=n||"error",r.uid=this.uid,r.component="tracking",r.msg=e,r.exactag=this.item,r.campaign=this.item.campaign||"",r.host=t.location.host,r.site=t.location.pathname,r.search=t.location.search,r.ua=navigator.userAgent,r.log=this.logStack,r.version=this.version,i=this.bear(this.cfg),"error"===r.type?(this.post(i.trackingURL+"/jstrace.aspx",{data:this.stringify(r)}),this.log("ERROR: "+e)):(this.log(e,this.stringify(r)),(this.traceEnabled||this.debug)&&this.post(i.trackingURL+"/jstrace.aspx",{data:this.stringify(r)}))},setDebugMode:function(){var e=t.location.hash.indexOf(this.cName+"_debug")>-1?1:0;return this.debug=!(1!==e),this.debug},meantime:function(t){var e,n=(new Date).getTime();e=n-this.stopwatch.start,this.log(t+": "+e/1e3+"s")},getUid:function(){return this.uid||(this.uid=this.getRandomId(4)),this.uid},getRandomId:function(t){var e,n="",i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(e=0;t>e;e++)n+=i.charAt(Math.floor(Math.random()*i.length));return n},getConfig:function(){if(void 0===this.configSet){this.setDebugMode(),this.getUid(),this.cfg.uk=this.readCookie("et_uk"),this.logStack=[],this.item={},this.stopwatch.start=(new Date).getTime();try{exactag.nfif===!0&&(this.nfif=exactag.nfif,delete exactag.nfif),this.traceFrequency>0&&Math.ceil(Math.random()*this.traceFrequency)===this.traceFrequency&&this.traceUntil.getTime()>(new Date).getTime()&&(this.log("trace enabled"),this.traceEnabled=!0)}catch(t){}this.configSet=!0}},extend:function(t,e){var n;for(n in e)"function"!=typeof e[n]&&void 0!==e[n]&&(t[n]=e[n]);return t},setReadyToTrack:function(){this.readyToTrack=!0},getItem:function(t){var e,n={};for(e in t)"function"!=typeof t[e]&&(n[e]=t[e]);return n},bear:function(t){return o.parse(o.stringify(t))},getTrackingConfig:function(t){var e,n=this.bear(this.cfg);for(e in t)void 0!==t[e]&&(n[e]=t[e]);return n},stringify:function(t){return o.stringify(t)},post:function(t,e){var n,i,r,o;n=this.cName+"_"+this.getRandomId(5);try{i=this.rootDoc.createElement("<iframe id='"+n+"' name='"+n+"'>")}catch(a){i=this.rootDoc.createElement("iframe"),i.setAttribute("id",n),i.setAttribute("name",n)}this.rootDoc.body.appendChild(i),r=this.rootDoc.createElement("form"),r.setAttribute("action",t),r.setAttribute("target",n),r.setAttribute("method","POST");for(o in e)void 0!==e[o]&&this.appendHiddenField(o,encodeURIComponent(e[o]),r);this.rootDoc.body.appendChild(r),r.submit()},disable:function(t){this.log("ERROR: "+t),this.enabled=!1},readCookie:function(e){var n,r;return i.cookie.length>0&&(n=i.cookie.indexOf(e+"="),-1!==n)?(n=n+e.length+1,r=i.cookie.indexOf(";",n),-1===r&&(r=i.cookie.length),t.unescape(i.cookie.substring(n,r))):""}},c.prototype={track:function(t){var e=new a;e.init(),e.meantime("exactag.track"),void 0===t?(t=e.getItem(this),e.log("item read from exactag object",t)):e.log("object injected into exactag.track",t),"string"==typeof t.campaign&&e.processItem(t)},Track:function(t){this.track(t)},hash:function(t){var e=t.replace(/^\s+|\s+$/gm,"").toLowerCase();return new s(e).getBase64()}},"string"==typeof t.exactag.campaign&&(n=new a,n.init(),n.log("found item in exactag",t.exactag),n.processItem(n.getItem(t.exactag))),t.exactag=new c}(window);