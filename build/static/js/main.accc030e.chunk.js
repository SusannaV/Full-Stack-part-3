(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(14),c=t.n(u),o=t(2),l=function(e){var n=function(e){var n=e.handleClick;return r.a.createElement("button",{onClick:n},"Delete")};return r.a.createElement("p",null,e.dude.name," ",e.dude.number,r.a.createElement(n,{handleClick:function(){return e.handleDelete(e)}}))},i=function(e){var n=""===e.search?e.persons:e.persons.filter((function(n){return n.name.toUpperCase().includes(e.search.toUpperCase())}));return r.a.createElement("div",null,n.map((function(n){return r.a.createElement(l,{key:n.name,dude:n,number:n.number,handleDelete:e.handleDelete})})))},m=function(e){return r.a.createElement("div",null,"Filter shown with:"," ",r.a.createElement("input",{value:e.newSearch,onChange:e.handleSearch}))},s=t(4),d=t(3),f=t.n(d),h="/api/persons",p=function(){return f.a.get(h).then((function(e){return e.data}))},b=function(e){return f.a.post(h,e).then((function(e){return e.data}))},v=function(e){return f.a.delete("".concat(h,"/").concat(e)).then((function(e){return e.data}))},E=function(e,n){return f.a.put("".concat(h,"/").concat(e),n).then((function(e){return e.data}))},S=function(e){return r.a.createElement("form",{onSubmit:function(n){if(n.preventDefault(),""!==e.name){var t=e.persons.find((function(n){return n.name.toUpperCase()===e.name.toUpperCase()}));if(t){if(window.confirm("".concat(e.name," is already added to phonebook, replace the old number with a new one?"))){var a=Object(s.a)(Object(s.a)({},t),{},{number:e.number});E(t.id,a).then((function(n){e.personSetter(e.persons.map((function(e){return e.id!==t.id?e:n}))),e.okSetter("Replaced the number for ".concat(e.name)),setTimeout((function(){e.okSetter(null)}),5e3)})).catch((function(n){e.errorSetter("Information of ".concat(e.name," has already been removed from the server")),setTimeout((function(){e.okSetter(null)}),5e3)}))}}else{var r={name:e.name,number:e.number};b(r).then((function(n){e.personSetter(e.persons.concat(n))})).catch((function(n){e.errorSetter(n.response.data),setTimeout((function(){e.okSetter(null)}),5e3),console.log(n.response.data)})),e.okSetter("Added ".concat(e.name)),setTimeout((function(){e.okSetter(null)}),5e3)}e.nameSetter(""),e.numberSetter("")}}},r.a.createElement("div",null,"Name: ",r.a.createElement("input",{value:e.name,onChange:e.nameChangeHandler})),r.a.createElement("div",null,"Number:"," ",r.a.createElement("input",{value:e.number,onChange:e.numberChangeHandler})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},g=(t(37),function(){var e=Object(a.useState)([]),n=Object(o.a)(e,2),t=n[0],u=n[1],c=Object(a.useState)(""),l=Object(o.a)(c,2),s=l[0],d=l[1],f=Object(a.useState)(""),h=Object(o.a)(f,2),b=h[0],E=h[1],g=Object(a.useState)(""),j=Object(o.a)(g,2),k=j[0],C=j[1],O=Object(a.useState)(null),w=Object(o.a)(O,2),D=w[0],y=w[1],N=Object(a.useState)(null),T=Object(o.a)(N,2),H=T[0],U=T[1];Object(a.useEffect)((function(){p().then((function(e){u(e)}))}),[]),console.log("render",t.length,"persons");var A=function(e){var n=e.message;return null===n?null:r.a.createElement("div",{className:"notification"},n)},I=function(e){var n=e.message;return null===n?null:r.a.createElement("div",{className:"error"},n)};return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(A,{message:H}),r.a.createElement(I,{message:D}),r.a.createElement(m,{newSearch:k,handleSearch:function(e){C(e.target.value)}}),r.a.createElement("h2",null,"Add a new number"),r.a.createElement(S,{name:s,nameChangeHandler:function(e){d(e.target.value)},number:b,numberChangeHandler:function(e){E(e.target.value)},persons:t,personSetter:u,nameSetter:d,numberSetter:E,errorSetter:y,okSetter:U}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(i,{search:k,persons:t,handleDelete:function(e){window.confirm("Delete ".concat(e.dude.name))&&(v(e.dude.id).then((function(){u(t.filter((function(n){return n.id!==e.dude.id})))})).catch((function(e){y("Couldn't remove from database")})),U("Deleted ".concat(e.dude.name)),setTimeout((function(){U(null)}),5e3))}}))});c.a.render(r.a.createElement(g,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.accc030e.chunk.js.map