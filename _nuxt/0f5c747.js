(window.webpackJsonp=window.webpackJsonp||[]).push([[3,7],{304:function(t,r,e){var content=e(306);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(43).default)("cf4d17aa",content,!0,{sourceMap:!1})},305:function(t,r,e){"use strict";e(304)},306:function(t,r,e){var o=e(42)((function(i){return i[1]}));o.push([t.i,".tag[data-v-66ee7d80]{margin:0.25rem;border-radius:9999px;--tw-bg-opacity:1;background-color:rgba(243, 244, 246, var(--tw-bg-opacity));padding-left:0.5rem;padding-right:0.5rem;padding-top:0.25rem;padding-bottom:0.25rem;font-size:0.75rem;line-height:1rem;letter-spacing:0.025em;--tw-text-opacity:1;color:rgba(107, 114, 128, var(--tw-text-opacity))}.dark .tag[data-v-66ee7d80]{--tw-bg-opacity:1;background-color:rgba(55, 65, 81, var(--tw-bg-opacity));--tw-text-opacity:1;color:rgba(249, 250, 251, var(--tw-text-opacity))}",""]),o.locals={},t.exports=o},307:function(t,r,e){"use strict";e.r(r);var o=e(24),n=Object(o.b)({name:"Tag",props:{tagName:{type:String,default:""}}}),d=(e(305),e(22)),component=Object(d.a)(n,(function(){var t=this,r=t.$createElement;return(t._self._c||r)("span",{staticClass:"tag"},[t._v(t._s(t.tagName))])}),[],!1,null,"66ee7d80",null);r.default=component.exports},308:function(t,r,e){"use strict";e.d(r,"a",(function(){return d}));var o=e(309),n=e.n(o),d=function(time){return time?n()(time).format("DD MMM YYYY"):""}},309:function(t,r,e){t.exports=function(){"use strict";var t=1e3,r=6e4,e=36e5,o="millisecond",i="second",s="minute",u="hour",a="day",n="week",d="month",c="quarter",l="year",f="date",m="Invalid Date",w=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,h=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,y={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},v=function(t,r,e){var o=String(t);return!o||o.length>=r?t:""+Array(r+1-o.length).join(e)+t},g={s:v,z:function(t){var r=-t.utcOffset(),e=Math.abs(r),o=Math.floor(e/60),i=e%60;return(r<=0?"+":"-")+v(o,2,"0")+":"+v(i,2,"0")},m:function t(r,e){if(r.date()<e.date())return-t(e,r);var o=12*(e.year()-r.year())+(e.month()-r.month()),i=r.clone().add(o,d),s=e-i<0,u=r.clone().add(o+(s?-1:1),d);return+(-(o+(e-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:d,y:l,w:n,d:a,D:f,h:u,m:s,s:i,ms:o,Q:c}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},k="en",x={};x[k]=y;var p=function(t){return t instanceof D},$=function(t,r,e){var o;if(!t)return k;if("string"==typeof t)x[t]&&(o=t),r&&(x[t]=r,o=t);else{var i=t.name;x[i]=t,o=i}return!e&&o&&(k=o),o||!e&&k},M=function(t,r){if(p(t))return t.clone();var e="object"==typeof r?r:{};return e.date=t,e.args=arguments,new D(e)},_=g;_.l=$,_.i=p,_.w=function(t,r){return M(t,{locale:r.$L,utc:r.$u,x:r.$x,$offset:r.$offset})};var D=function(){function y(t){this.$L=$(t.locale,null,!0),this.parse(t)}var v=y.prototype;return v.parse=function(t){this.$d=function(t){var r=t.date,e=t.utc;if(null===r)return new Date(NaN);if(_.u(r))return new Date;if(r instanceof Date)return new Date(r);if("string"==typeof r&&!/Z$/i.test(r)){var o=r.match(w);if(o){var i=o[2]-1||0,s=(o[7]||"0").substring(0,3);return e?new Date(Date.UTC(o[1],i,o[3]||1,o[4]||0,o[5]||0,o[6]||0,s)):new Date(o[1],i,o[3]||1,o[4]||0,o[5]||0,o[6]||0,s)}}return new Date(r)}(t),this.$x=t.x||{},this.init()},v.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},v.$utils=function(){return _},v.isValid=function(){return!(this.$d.toString()===m)},v.isSame=function(t,r){var e=M(t);return this.startOf(r)<=e&&e<=this.endOf(r)},v.isAfter=function(t,r){return M(t)<this.startOf(r)},v.isBefore=function(t,r){return this.endOf(r)<M(t)},v.$g=function(t,r,e){return _.u(t)?this[r]:this.set(e,t)},v.unix=function(){return Math.floor(this.valueOf()/1e3)},v.valueOf=function(){return this.$d.getTime()},v.startOf=function(t,r){var e=this,o=!!_.u(r)||r,c=_.p(t),m=function(t,r){var i=_.w(e.$u?Date.UTC(e.$y,r,t):new Date(e.$y,r,t),e);return o?i:i.endOf(a)},w=function(t,r){return _.w(e.toDate()[t].apply(e.toDate("s"),(o?[0,0,0,0]:[23,59,59,999]).slice(r)),e)},h=this.$W,y=this.$M,v=this.$D,g="set"+(this.$u?"UTC":"");switch(c){case l:return o?m(1,0):m(31,11);case d:return o?m(1,y):m(0,y+1);case n:var k=this.$locale().weekStart||0,x=(h<k?h+7:h)-k;return m(o?v-x:v+(6-x),y);case a:case f:return w(g+"Hours",0);case u:return w(g+"Minutes",1);case s:return w(g+"Seconds",2);case i:return w(g+"Milliseconds",3);default:return this.clone()}},v.endOf=function(t){return this.startOf(t,!1)},v.$set=function(t,r){var e,n=_.p(t),c="set"+(this.$u?"UTC":""),m=(e={},e[a]=c+"Date",e[f]=c+"Date",e[d]=c+"Month",e[l]=c+"FullYear",e[u]=c+"Hours",e[s]=c+"Minutes",e[i]=c+"Seconds",e[o]=c+"Milliseconds",e)[n],w=n===a?this.$D+(r-this.$W):r;if(n===d||n===l){var h=this.clone().set(f,1);h.$d[m](w),h.init(),this.$d=h.set(f,Math.min(this.$D,h.daysInMonth())).$d}else m&&this.$d[m](w);return this.init(),this},v.set=function(t,r){return this.clone().$set(t,r)},v.get=function(t){return this[_.p(t)]()},v.add=function(o,c){var f,m=this;o=Number(o);var w=_.p(c),h=function(t){var r=M(m);return _.w(r.date(r.date()+Math.round(t*o)),m)};if(w===d)return this.set(d,this.$M+o);if(w===l)return this.set(l,this.$y+o);if(w===a)return h(1);if(w===n)return h(7);var y=(f={},f[s]=r,f[u]=e,f[i]=t,f)[w]||1,v=this.$d.getTime()+o*y;return _.w(v,this)},v.subtract=function(t,r){return this.add(-1*t,r)},v.format=function(t){var r=this,e=this.$locale();if(!this.isValid())return e.invalidDate||m;var o=t||"YYYY-MM-DDTHH:mm:ssZ",i=_.z(this),s=this.$H,u=this.$m,a=this.$M,n=e.weekdays,d=e.months,c=function(t,e,i,s){return t&&(t[e]||t(r,o))||i[e].substr(0,s)},l=function(t){return _.s(s%12||12,t,"0")},f=e.meridiem||function(t,r,e){var o=t<12?"AM":"PM";return e?o.toLowerCase():o},w={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:_.s(a+1,2,"0"),MMM:c(e.monthsShort,a,d,3),MMMM:c(d,a),D:this.$D,DD:_.s(this.$D,2,"0"),d:String(this.$W),dd:c(e.weekdaysMin,this.$W,n,2),ddd:c(e.weekdaysShort,this.$W,n,3),dddd:n[this.$W],H:String(s),HH:_.s(s,2,"0"),h:l(1),hh:l(2),a:f(s,u,!0),A:f(s,u,!1),m:String(u),mm:_.s(u,2,"0"),s:String(this.$s),ss:_.s(this.$s,2,"0"),SSS:_.s(this.$ms,3,"0"),Z:i};return o.replace(h,(function(t,r){return r||w[t]||i.replace(":","")}))},v.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},v.diff=function(o,f,m){var w,h=_.p(f),y=M(o),v=(y.utcOffset()-this.utcOffset())*r,g=this-y,k=_.m(this,y);return k=(w={},w[l]=k/12,w[d]=k,w[c]=k/3,w[n]=(g-v)/6048e5,w[a]=(g-v)/864e5,w[u]=g/e,w[s]=g/r,w[i]=g/t,w)[h]||g,m?k:_.a(k)},v.daysInMonth=function(){return this.endOf(d).$D},v.$locale=function(){return x[this.$L]},v.locale=function(t,r){if(!t)return this.$L;var e=this.clone(),o=$(t,r,!0);return o&&(e.$L=o),e},v.clone=function(){return _.w(this.$d,this)},v.toDate=function(){return new Date(this.valueOf())},v.toJSON=function(){return this.isValid()?this.toISOString():null},v.toISOString=function(){return this.$d.toISOString()},v.toString=function(){return this.$d.toUTCString()},y}(),b=D.prototype;return M.prototype=b,[["$ms",o],["$s",i],["$m",s],["$H",u],["$W",a],["$M",d],["$y",l],["$D",f]].forEach((function(t){b[t[1]]=function(r){return this.$g(r,t[0],t[1])}})),M.extend=function(t,r){return t.$i||(t(r,D,M),t.$i=!0),M},M.locale=$,M.isDayjs=p,M.unix=function(t){return M(1e3*t)},M.en=x[k],M.Ls=x,M.p={},M}()},323:function(t,r,e){var content=e(360);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(43).default)("2e855d11",content,!0,{sourceMap:!1})},324:function(t,r,e){var content=e(362);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(43).default)("26c67f39",content,!0,{sourceMap:!1})},339:function(t,r,e){"use strict";e.r(r);var o=e(24),n=e(308),d=Object(o.b)({name:"Article",props:{category:{type:String,default:""},subject:{type:String,default:""},articleMatter:{type:Object,default:null}},setup:function(t){return{tagList:Object(o.a)((function(){return t.articleMatter.info.tags||[]})),createdAt:Object(o.a)((function(){return Object(n.a)(t.articleMatter.info.createdAt)})),updatedAt:Object(o.a)((function(){return Object(n.a)(t.articleMatter.info.updatedAt)}))}}}),c=(e(359),e(361),e(22)),component=Object(c.a)(d,(function(){var t=this,r=t.$createElement,e=t._self._c||r;return t.articleMatter?e("article",{staticClass:"mx-auto px-8 py-6 xl:px-16 dark:bg-dark-black"},[e("div",{staticClass:"info"},[e("NuxtLink",{staticClass:"info-item info-link",attrs:{to:{name:"category-subject",params:{category:t.category,subject:t.subject}},title:"Back to "+t.subject}},[e("SvgIcon",{staticClass:"info-icon mr-2",attrs:{name:"folder-open"}}),t._v("\n      "+t._s(t.subject)+"\n    ")],1),t._v(" "),t.createdAt?e("div",{staticClass:"info-item mx-8"},[e("SvgIcon",{staticClass:"info-icon mr-2",attrs:{name:"calendar"}}),t._v("\n      "+t._s(t.createdAt)+"\n    ")],1):t._e()],1),t._v(" "),e("div",{staticClass:"markdown",domProps:{innerHTML:t._s(t.articleMatter.content)}}),t._v(" "),e("div",{staticClass:"flex flex-wrap items-center mt-4"},[t.tagList.length>0?e("SvgIcon",{staticClass:"info-icon mr-1",attrs:{name:"tag"}}):t._e(),t._v(" "),t._l(t.tagList,(function(t){return e("Tag",{key:t,attrs:{"tag-name":t}})}))],2),t._v(" "),e("div",{staticClass:"flex flex-wrap justify-between mt-4 text-sm italic text-dark-gray"},[t.createdAt?e("div",[t._v("Published on "+t._s(t.createdAt))]):t._e(),t._v(" "),t.updatedAt?e("div",[t._v("Updated on "+t._s(t.updatedAt))]):t._e()])]):t._e()}),[],!1,null,"000d1de0",null);r.default=component.exports;installComponents(component,{Tag:e(307).default,Article:e(339).default})},359:function(t,r,e){"use strict";e(323)},360:function(t,r,e){var o=e(42)((function(i){return i[1]}));o.push([t.i,'.markdown li>code,.markdown p>code{padding:.125rem .25rem;color:#6b7280;background-color:#f3f4f6;border-radius:.375rem}.markdown .danger,.markdown .info,.markdown .success,.markdown .warning,.markdown blockquote{margin:1rem 0;padding:.5rem 1rem;border-left:4px solid;border-radius:.25rem}.markdown{max-width:48rem;font-size:0.875rem;line-height:1.25rem;line-height:1.625}@media (min-width: 1536px){.markdown{max-width:56rem}}.markdown h1{margin-top:1.5rem;margin-bottom:2.5rem;text-align:center;--tw-text-opacity:1;color:rgba(33, 90, 109, var(--tw-text-opacity))}.dark .markdown h1{--tw-text-opacity:1;color:rgba(252, 252, 252, var(--tw-text-opacity))}.markdown h2{position:relative;margin-top:4rem;margin-bottom:1rem}.markdown h2:before{position:absolute;left:-16px;--tw-text-opacity:1;color:rgba(146, 199, 163, var(--tw-text-opacity));content:"»"}.markdown h2 a{--tw-text-opacity:1;color:rgba(44, 57, 68, var(--tw-text-opacity))}.dark .markdown h2 a{--tw-text-opacity:1;color:rgba(209, 213, 218, var(--tw-text-opacity))}.markdown h3{margin-top:1.5rem;font-size:16px}.markdown h6{display:none}.markdown a{--tw-text-opacity:1;color:rgba(111, 168, 129, var(--tw-text-opacity))}.markdown a:hover{border-bottom-width:1px;--tw-border-opacity:1;border-color:rgba(146, 199, 163, var(--tw-border-opacity))}.markdown img{margin-top:1rem;margin-bottom:1rem}.markdown pre{margin-top:1rem;margin-bottom:1rem;white-space:pre-wrap;word-break:break-all;border-radius:0.25rem;padding:1rem}@media (min-width: 768px){.markdown pre{overflow-wrap:break-word}}.markdown summary{outline:2px solid transparent;outline-offset:2px}.markdown p{margin-top:0.75rem;margin-bottom:0.75rem;line-height:1.5rem}.markdown li{list-style-position:inside;list-style-type:disc;padding-top:0.25rem;padding-bottom:0.25rem;padding-left:0.5rem}.markdown li p{display:inline}.markdown table{border-width:2px;--tw-border-opacity:1;border-color:rgba(209, 213, 219, var(--tw-border-opacity))}.markdown table td > :not([hidden]) ~ :not([hidden]), .markdown table tr > :not([hidden]) ~ :not([hidden]){--tw-divide-x-reverse:0;border-right-width:calc(2px * var(--tw-divide-x-reverse));border-left-width:calc(2px * calc(1 - var(--tw-divide-x-reverse)));--tw-divide-opacity:1;border-color:rgba(209, 213, 219, var(--tw-divide-opacity))}.markdown table td, .markdown table tr{padding-left:0.5rem;padding-right:0.5rem;padding-top:0.25rem;padding-bottom:0.25rem}.markdown table tr:nth-child(even){--tw-bg-opacity:1;background-color:rgba(243, 244, 246, var(--tw-bg-opacity))}.dark .markdown table tr:nth-child(even){--tw-bg-opacity:0.2}.markdown table thead{border-bottom-width:2px;--tw-border-opacity:1;border-color:rgba(209, 213, 219, var(--tw-border-opacity))}.markdown table tbody > :not([hidden]) ~ :not([hidden]){--tw-divide-y-reverse:0;border-top-width:calc(2px * calc(1 - var(--tw-divide-y-reverse)));border-bottom-width:calc(2px * var(--tw-divide-y-reverse));--tw-divide-opacity:1;border-color:rgba(209, 213, 219, var(--tw-divide-opacity))}.markdown blockquote{--tw-border-opacity:1;border-color:rgba(102, 102, 102, var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgba(238, 238, 238, var(--tw-bg-opacity));--tw-text-opacity:1;color:rgba(106, 114, 128, var(--tw-text-opacity))}.dark .markdown blockquote{--tw-bg-opacity:0.8}.markdown .success{--tw-border-opacity:1;border-color:rgba(127, 141, 124, var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgba(202, 217, 192, var(--tw-bg-opacity));--tw-text-opacity:1;color:rgba(51, 105, 30, var(--tw-text-opacity))}.dark .markdown .success{--tw-bg-opacity:0.9}.markdown .info{--tw-border-opacity:1;border-color:rgba(79, 114, 138, var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgba(200, 218, 233, var(--tw-bg-opacity));--tw-text-opacity:1;color:rgba(83, 100, 131, var(--tw-text-opacity))}.dark .markdown .info{--tw-bg-opacity:0.9}.markdown .warning{--tw-border-opacity:1;border-color:rgba(211, 174, 91, var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgba(248, 240, 210, var(--tw-bg-opacity));--tw-text-opacity:1;color:rgba(147, 115, 47, var(--tw-text-opacity))}.dark .markdown .warning{--tw-bg-opacity:0.9}.markdown .danger{--tw-border-opacity:1;border-color:rgba(213, 157, 164, var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgba(241, 222, 223, var(--tw-bg-opacity));--tw-text-opacity:1;color:rgba(164, 74, 67, var(--tw-text-opacity))}.dark .markdown .danger{--tw-bg-opacity:0.9}.markdown .spoiler{border-radius:0.25rem;border-width:1px;border-style:dashed;padding:0.5rem}',""]),o.locals={},t.exports=o},361:function(t,r,e){"use strict";e(324)},362:function(t,r,e){var o=e(42)((function(i){return i[1]}));o.push([t.i,".info[data-v-000d1de0]{display:flex;align-items:center;font-size:0.875rem;line-height:1.25rem;font-weight:700;--tw-text-opacity:1;color:rgba(75, 85, 99, var(--tw-text-opacity))}.dark .info[data-v-000d1de0]{--tw-text-opacity:1;color:rgba(249, 250, 251, var(--tw-text-opacity))}.info-item[data-v-000d1de0]{display:flex;align-items:center}.info-link[data-v-000d1de0]{text-transform:uppercase}.info-link[data-v-000d1de0]:hover{--tw-text-opacity:1;color:rgba(111, 168, 129, var(--tw-text-opacity))}.info-icon[data-v-000d1de0]{display:inline-block;height:1rem;width:1rem;--tw-text-opacity:1;color:rgba(156, 163, 175, var(--tw-text-opacity))}",""]),o.locals={},t.exports=o}}]);