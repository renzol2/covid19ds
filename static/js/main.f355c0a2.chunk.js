(this.webpackJsonprenzomledesma=this.webpackJsonprenzomledesma||[]).push([[0],{60:function(e,t,a){e.exports=a(95)},65:function(e,t,a){},66:function(e,t,a){},68:function(e,t,a){},95:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),c=a(31),l=a.n(c),o=(a(65),a(54)),i=a(4),u=(a(66),a(15)),s=a(7),m=a(26),p=a(22),d=a.n(p),h=a(32),f=a(55),b=a.n(f);var E=function(e){var t=Object(n.useState)(e),a=Object(i.a)(t,2),r=a[0],c=a[1],l=Object(n.useState)([]),o=Object(i.a)(l,2),u=o[0],s=o[1],m=Object(n.useState)([]),p=Object(i.a)(m,2),f=p[0],E=p[1],v=Object(n.useState)(!1),O=Object(i.a)(v,2),j=O[0],g=O[1],y=Object(n.useState)(!1),k=Object(i.a)(y,2),w=k[0],C=k[1];return Object(n.useEffect)((function(){(function(){var e=Object(h.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:g(!0),C(!1);try{b.a.parse(r,{download:!0,header:!0,complete:function(e){e.errors.length>0&&e.errors.map((function(e){return console.log(e)})),s(e.data);var t=Object.keys(e.data[0]);t.shift(),E(t)}})}catch(t){console.log(t),C(!0)}g(!1);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[r]),[{data:u,regions:f,isLoading:j,isError:w},c]},v=function(e){for(var t=e[0],a=e[0],n=e.length;n--;)isNaN(e[n])||(t=e[n]<t?e[n]:t,a=e[n]>a?e[n]:a);return{min:t,max:a}},O=function(e,t,a,n,r){return a+(n-a)*((r-e)/(t-e))},j=a(18),g=a(14),y=(a(68),r.a.forwardRef((function(e,t){var a=e.children,n=e.onClick;return r.a.createElement(s.a,{href:"",ref:t,onClick:function(e){e.preventDefault(),n(e)}},a)}))),k=r.a.forwardRef((function(e,t){var a=e.children,c=e.style,l=e.className,o=e["aria-labelledby"],u=Object(n.useState)(""),s=Object(i.a)(u,2),m=s[0],p=s[1];return r.a.createElement("div",{ref:t,style:c,className:l,"aria-labelledby":o},r.a.createElement(j.a,{autoFocus:!0,className:"mx-3 my-2 w-auto",placeholder:"Type to filter...",onChange:function(e){return p(e.target.value)},value:m}),r.a.createElement("ul",{className:"list-unstyled"},r.a.Children.toArray(a).filter((function(e){return!m||e.props.children.toLowerCase().includes(m)}))))})),w=function(e){var t=e.regions,a=e.callback,n=function(e){a(e)},c=0;return r.a.createElement("div",null,r.a.createElement(g.a,{onSelect:function(e){n(t[e])}},r.a.createElement(g.a.Toggle,{as:y,id:"dropdown-custom-components"},"Choose country"),r.a.createElement(g.a.Menu,{as:k,className:"dropdown-scroll"},t.map((function(e){return r.a.createElement(g.a.Item,{eventKey:c++,key:c},e)})))))},C=a(8),x=a(9),M=a(33),S=a(11),N=a(10),T=function(e){Object(S.a)(a,e);var t=Object(N.a)(a);function a(e){var n;return Object(C.a)(this,a),(n=t.call(this,e)).handleChange=n.handleChange.bind(Object(M.a)(n)),n}return Object(x.a)(a,[{key:"handleChange",value:function(){var e=Object(h.a)(d.a.mark((function e(t){var a=this;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.props.setDataset(t),e.next=3,this.props.fetchData(t);case 3:setTimeout((function(){return a.props.initializeRegion(a.props.region)}),this.props.waitTime);case 4:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=0;return r.a.createElement(g.a,{onSelect:this.handleChange},r.a.createElement(g.a.Toggle,{id:"dropdown-basic"},"Choose data"),r.a.createElement(g.a.Menu,null,this.props.datasets.map((function(t){return r.a.createElement(g.a.Item,{eventKey:t.url,key:e++},t.title)}))))}}]),a}(n.Component),I=a(20),D=function(e){Object(S.a)(a,e);var t=Object(N.a)(a);function a(){return Object(C.a)(this,a),t.apply(this,arguments)}return Object(x.a)(a,[{key:"render",value:function(){var e=this.props;if(!e.visualize)return r.a.createElement("div",null);var t=e.height,a=e.animation,n=e.colorRange,c=e.gridLineColor,l=e.data,o=e.onMouseLeave,i=e.onNearestX,u=e.onValueClick,s=e.xAxisTitle,m=e.yAxisTitle,p=e.yAxisLeft;return r.a.createElement(I.a,{height:t,onMouseLeave:o,colorRange:n,animation:a},r.a.createElement(I.b,{style:{stroke:c}}),r.a.createElement(I.d,{style:{stroke:c}}),r.a.createElement(I.c,{data:l,onNearestX:i,onValueClick:u}),r.a.createElement(I.e,{title:s}),r.a.createElement(I.f,{title:m,left:p}))}}]),a}(n.Component),P=a(12),L=function(e){Object(S.a)(a,e);var t=Object(N.a)(a);function a(){return Object(C.a)(this,a),t.apply(this,arguments)}return Object(x.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement(P.a,null,r.a.createElement(P.a.Prepend,null,r.a.createElement(P.a.Text,null,"Playback BPM")),r.a.createElement(j.a,{placeholder:"Ex: 200","aria-label":"BPM",onChange:function(t){return e.props.handleInput(t,e.props.setBpm)}})),r.a.createElement("p",null,"Current BPM: ",r.a.createElement("strong",null,this.props.bpm)))}}]),a}(n.Component),R=function(e){Object(S.a)(a,e);var t=Object(N.a)(a);function a(){return Object(C.a)(this,a),t.apply(this,arguments)}return Object(x.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement(s.a,{variant:"primary",onClick:function(){return e.props.setOscSelection((e.props.oscSelection+1)%e.props.oscTypes.length)}},"Toggle oscillator")}}]),a}(n.Component),A=function(e){Object(S.a)(a,e);var t=Object(N.a)(a);function a(){return Object(C.a)(this,a),t.apply(this,arguments)}return Object(x.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement(m.a,{"aria-label":"Increase/decrease pitch"},r.a.createElement(s.a,{variant:"secondary",onClick:function(){return e.props.setPitch(e.props.pitch-1)}},"Decrease pitch"),r.a.createElement(s.a,{variant:"secondary",onClick:function(){return e.props.setPitch(e.props.pitch+1)}},"Increase pitch"))}}]),a}(n.Component),B=function(e){Object(S.a)(a,e);var t=Object(N.a)(a);function a(){return Object(C.a)(this,a),t.apply(this,arguments)}return Object(x.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement(P.a,null,r.a.createElement(P.a.Prepend,null,r.a.createElement(P.a.Text,null,"Minimum MIDI pitch")),r.a.createElement(j.a,{placeholder:"Ex: 0","aria-label":"Minimum MIDI pitch",onChange:function(t){return e.props.handleInput(t,e.props.setMinMidiPitch)}})),r.a.createElement(P.a,null,r.a.createElement(P.a.Prepend,null,r.a.createElement(P.a.Text,null,"Maximum MIDI pitch")),r.a.createElement(j.a,{placeholder:"Ex: 127","aria-label":"Maximum MIDI pitch",onChange:function(t){return e.props.handleInput(t,e.props.setMaxMidiPitch)}})))}}]),a}(n.Component),z=["sine","triangle","square","sawtooth"],_="https://covid.ourworldindata.org/data/ecdc/total_cases.csv",V=[{title:"Total cases",url:"https://covid.ourworldindata.org/data/ecdc/total_cases.csv"},{title:"Total deaths",url:"https://covid.ourworldindata.org/data/ecdc/total_deaths.csv"},{title:"New cases",url:"https://covid.ourworldindata.org/data/ecdc/new_cases.csv"},{title:"New deaths",url:"https://covid.ourworldindata.org/data/ecdc/new_deaths.csv"}];var q=function(){var e=E(_),t=Object(i.a)(e,2),a=t[0],c=a.data,l=a.regions,p=a.isLoading,d=a.isError,h=t[1],f=Object(n.useState)(_),b=Object(i.a)(f,2),j=b[0],g=b[1],y=Object(n.useState)(""),k=Object(i.a)(y,2),C=k[0],x=k[1],M=Object(n.useState)([]),S=Object(i.a)(M,2),N=S[0],I=S[1],P=Object(n.useState)(0),q=Object(i.a)(P,2),F=q[0],X=q[1],J=Object(n.useState)(0),K=Object(i.a)(J,2),W=K[0],U=K[1],$=Object(n.useState)(!0),G=Object(i.a)($,2),H=G[0],Q=G[1],Y=Object(n.useState)(!1),Z=Object(i.a)(Y,2),ee=Z[0],te=Z[1],ae=Object(n.useState)(-1),ne=Object(i.a)(ae,2),re=ne[0],ce=ne[1],le=Object(n.useState)(""),oe=Object(i.a)(le,2),ie=oe[0],ue=oe[1],se=Object(n.useState)(60),me=Object(i.a)(se,2),pe=me[0],de=me[1],he=Object(n.useState)(1),fe=Object(i.a)(he,2),be=fe[0],Ee=fe[1],ve=Object(n.useState)(36),Oe=Object(i.a)(ve,2),je=Oe[0],ge=Oe[1],ye=Object(n.useState)(96),ke=Object(i.a)(ye,2),we=ke[0],Ce=ke[1],xe=Object(n.useState)(999),Me=Object(i.a)(xe,2),Se=Me[0],Ne=Me[1],Te=Object(n.useRef)(null);function Ie(e){console.log("init region"),x(e),function(e){var t,a=[],n=[],r=0,l=Object(o.a)(c);try{for(l.s();!(t=l.n()).done;){var i=t.value;a.push({date:i.date,amount:parseInt(i[e]),index:r++}),n.push(parseInt(i[e]))}}catch(s){l.e(s)}finally{l.f()}a.filter((function(e){return!isNaN(e.amount)})),I(a);var u=v(n.filter((function(e){return!isNaN(e)})));X(u.min),U(u.max)}(e)}function De(e){var t=O(F,W,je,we,e);return Math.floor(t)}function Pe(e){Te.current.triggerAttackRelease(u.Frequency(e,"midi"),"8n")}function Le(e,t){var a=parseInt(e.target.value);isNaN(a)||t(a)}Object(n.useEffect)((function(){var e={oscillator:{type:z[be]}};Te.current=new u.Synth(e).toMaster()}));var Re=0;return r.a.createElement("div",{className:"body"},r.a.createElement("h1",null,"COVID-19 Data Sonification"),r.a.createElement("h3",null,"Display data:"),r.a.createElement("p",null,p?"Loading data...":null),r.a.createElement("p",null,d?"An error occurred.":null),r.a.createElement("p",null,"Min/max amount: ",F,"/",W),r.a.createElement("p",null,"Current amount: ",-1===re?"None":"".concat(re," cases at ").concat(ie)),r.a.createElement("p",null,"Dataset URL: ",""===j?"None":j),r.a.createElement("h4",null,"Current region: ",C),r.a.createElement(m.a,null,r.a.createElement(w,{regions:l,callback:Ie}),r.a.createElement(T,{datasets:V,setDataset:g,fetchData:h,region:C,initializeRegion:Ie,waitTime:600}),r.a.createElement(s.a,{onClick:function(){return Q(!H)}},"Toggle visualization"),r.a.createElement(s.a,{onClick:function(){return te(!ee)}},"Toggle animation (affects performance)")),0!==N.length&&r.a.createElement(m.a,null,r.a.createElement(s.a,{variant:"success",onClick:function(){return function(){u.Transport.cancel();var e=N.map((function(e){return{note:De(e.amount),date:e.date,index:e.index}})).filter((function(e){return!isNaN(e.note)})),t=new u.Pattern((function(e,a){Te.current.triggerAttackRelease(u.Frequency(a.note,"midi"),.25),ce(N[a.index].amount),ue(a.date),t.index===t.values.length-1&&u.Transport.cancel()}),e);t.start(0),u.Transport.bpm.value=Se,u.Transport.start()}()}},"Play"),r.a.createElement(s.a,{variant:"danger",onClick:function(){return u.Transport.cancel()}},"Stop")),r.a.createElement(D,{visualize:H,height:400,animation:ee,colorRange:["yellow","cornflowerblue"],gridLineColor:"#B7E9ED",data:function(e){return e.filter((function(e){return!isNaN(e.amount)})).map((function(e){return{x:e.index,y:e.amount,color:e.amount===re?0:1}}))}(N),onMouseLeave:function(){return ce(-1)},onNearestX:function(e,t){var a=t.index;ce(e.y),ue(N[a].date)},onValueClick:function(e){Pe(De(e.y))},xAxisTitle:"Days since December 31, 2019",yAxisTitle:V.filter((function(e){return e.url===j}))[0].title,yAxisLeft:50}),r.a.createElement("h3",null,"Options:"),r.a.createElement(s.a,{variant:"info",onClick:function(){return Pe(pe)}},"Play test pitch"),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement(A,{setPitch:de,pitch:pe}),r.a.createElement("p",null,"The current MIDI pitch is: ",r.a.createElement("strong",null,pe)),r.a.createElement(R,{setOscSelection:Ee,oscSelection:be,oscTypes:z}),r.a.createElement("p",null,"The current oscillator is: ",r.a.createElement("strong",null,z[be])),r.a.createElement("br",null),r.a.createElement(B,{handleInput:Le,setMinMidiPitch:ge,setMaxMidiPitch:Ce}),r.a.createElement("p",null,"Min/max MIDI pitch: ",r.a.createElement("strong",null,"[",je,", ",we,"]")),r.a.createElement(L,{bpm:Se,setBpm:Ne,handleInput:Le}),0!==N.length&&r.a.createElement("h2",null,"Raw data"),r.a.createElement("ul",null,0!==N.length&&N.map((function(e){return r.a.createElement("li",{key:Re++},e.date,": ",r.a.createElement("strong",null,isNaN(e.amount)?"No data":e.amount))}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(94);l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(q,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[60,1,2]]]);
//# sourceMappingURL=main.f355c0a2.chunk.js.map