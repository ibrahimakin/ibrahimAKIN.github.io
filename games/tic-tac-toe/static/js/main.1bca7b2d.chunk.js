(this["webpackJsonptic-tac-toe"]=this["webpackJsonptic-tac-toe"]||[]).push([[0],{11:function(e,n,t){},13:function(e,n,t){},14:function(e,n,t){"use strict";t.r(n);var a=t(1),r=t.n(a),c=t(5),s=t.n(c),i=(t(11),t(2)),l=t(0);var o=function(e){var n=e.value,t=e.onClick,a=e.winner;return Object(l.jsx)("button",{className:"square ".concat(n||a?"filled":""),onClick:t,children:n})};var j=function(e){var n=e.squares,t=e.onClick,a=e.winner,r=function(e){return Object(l.jsx)(o,{value:n[e],winner:a,onClick:function(){t(e)}})};return Object(l.jsxs)("div",{children:[Object(l.jsxs)("div",{className:"board-row",children:[r(0),r(1),r(2)]}),Object(l.jsxs)("div",{className:"board-row",children:[r(3),r(4),r(5)]}),Object(l.jsxs)("div",{className:"board-row",children:[r(6),r(7),r(8)]})]})},u=t(6);var d={tr:{next_player:"S\u0131radaki Oyuncu: ",go_to_start:"Oyun ba\u015flang\u0131c\u0131na git",go_to_move:"Hamleye git #",winner:"Kazanan: ",draw:"Berabere"},en:{next_player:"Next Player: ",go_to_start:"Go to game start",go_to_move:"Go to move #",winner:"Winner: ",draw:"Draw"}};var b=function(){var e=r.a.useState([{squares:Array(9).fill(null)}]),n=Object(i.a)(e,2),t=n[0],a=n[1],c=r.a.useState(0),s=Object(i.a)(c,2),o=s[0],b=s[1],O=r.a.useState(!0),g=Object(i.a)(O,2),h=g[0],x=g[1],v=t[o],f=function(e){for(var n=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],t=0;t<n.length;t++){var a=Object(i.a)(n[t],3),r=a[0],c=a[1],s=a[2];if(e[r]&&e[r]===e[c]&&e[r]===e[s])return e[r]}return null}(v.squares),m=function(e){var n,t=Object(u.a)(e);try{for(t.s();!(n=t.n()).done;)if(null===n.value)return!1}catch(a){t.e(a)}finally{t.f()}return!0}(v.squares),p=function(){var e=localStorage.getItem("lang");return e?JSON.parse(e):"en"}(),_=t.map((function(e,n){return Object(l.jsx)("li",{children:Object(l.jsx)("button",{className:"history-button",onClick:function(){!function(e){b(e),x(e%2===0)}(n)},children:n?Object(l.jsxs)("span",{children:[Object(l.jsx)("span",{"lang-tag":"go_to_move",children:d[p].go_to_move}),n,Object(l.jsx)("span",{})]}):Object(l.jsx)("span",{"lang-tag":"go_to_start",children:d[p].go_to_start})})},n)}));return Object(l.jsxs)("div",{className:"game",children:[Object(l.jsx)("div",{className:"game-board",children:Object(l.jsx)(j,{squares:v.squares,onClick:function(e){if(!f&&!v.squares[e]){var n=t.slice(0,o+1),r=n[n.length-1].squares.slice();r[e]=h?"X":"O",a(n.concat([{squares:r}])),b(n.length),x((function(e){return!e}))}},winner:f})}),Object(l.jsxs)("div",{className:"game-info",children:[Object(l.jsxs)("div",{className:"status",children:["\xa0\xa0",f?Object(l.jsxs)("span",{children:[Object(l.jsx)("span",{"lang-tag":"winner",children:d[p].winner}),Object(l.jsx)("span",{children:f})]}):m?Object(l.jsx)("span",{"lang-tag":"draw",children:d[p].draw}):Object(l.jsxs)("span",{children:[Object(l.jsx)("span",{"lang-tag":"next_player",children:d[p].next_player}),Object(l.jsx)("span",{children:h?"X":"O"})]})]}),Object(l.jsx)("ul",{children:_})]})]})};t(13);var O=function(){return Object(l.jsx)("div",{className:"App",children:Object(l.jsx)(b,{})})},g=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,15)).then((function(n){var t=n.getCLS,a=n.getFID,r=n.getFCP,c=n.getLCP,s=n.getTTFB;t(e),a(e),r(e),c(e),s(e)}))};s.a.render(Object(l.jsx)(r.a.StrictMode,{children:Object(l.jsx)(O,{})}),document.getElementById("root")),g()}},[[14,1,2]]]);
//# sourceMappingURL=main.1bca7b2d.chunk.js.map