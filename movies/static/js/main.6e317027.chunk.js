(this.webpackJsonpmovies=this.webpackJsonpmovies||[]).push([[0],{108:function(e,t,a){e.exports=a(207)},113:function(e,t,a){},200:function(e,t,a){},207:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(4),c=a.n(r),o=(a(113),a(25)),i=a(212),s=a(209),u=a(54),m=a(213),A=a(210),E=(a(114),a(73)),f=a.n(E),p=a(208),g=a(28),h=p.a.Meta,b=function(e){var t=e.Title,n=e.imdbID,r=e.Poster,c=e.Year,o=e.ShowDetail,i=e.DetailRequest,s=e.ActivateModal,m=e.API_KEY;return l.a.createElement(g.a,{style:{margin:"20px 0"},className:"gutter-row",span:4},l.a.createElement("div",{className:"gutter-box"},l.a.createElement(p.a,{style:{width:200},cover:l.a.createElement("img",{alt:t,src:"N/A"===r?a(92):r}),onClick:function(){return s(!0),i(!0),void fetch("https://www.omdbapi.com/?i=".concat(n,"&apikey=").concat(m)).then((function(e){return e})).then((function(e){return e.json()})).then((function(e){i(!1),o(e)})).catch((function(e){e.message,i(!1)}))}},l.a.createElement(h,{title:t,description:!1}),l.a.createElement(u.a,{style:{marginTop:"10px",justifyContent:"center"},className:"gutter-row"},l.a.createElement(g.a,null,l.a.createElement("div",null," Year: ",c)),l.a.createElement(g.a,null,l.a.createElement("div",null,"IMDb ID: ",n," "))))))},d=a(211).a.Search,v=function(e){var t=e.searchHandler,a=e.defaultValue;return l.a.createElement(u.a,null,l.a.createElement(g.a,{span:12,offset:6},l.a.createElement(d,{placeholder:"enter movie, series, episode name",enterButton:"Search",size:"large",defaultValue:a,onSearch:function(e){return t(e)}})))},y=a(214),O=s.a.Title,j=function(e){var t=e.Title,n=e.Poster,r=e.Director,c=e.Actors,o=e.imdbRating,i=e.Rated,s=e.Runtime,m=e.Genre,A=e.Plot;return l.a.createElement(u.a,null,l.a.createElement(g.a,{span:11},l.a.createElement("img",{src:"N/A"===n?a(92):n,alt:t})),l.a.createElement(g.a,{span:13},l.a.createElement(u.a,null,l.a.createElement(g.a,{span:21},l.a.createElement(O,{level:4},t)),l.a.createElement(g.a,{span:3,style:{textAlign:"right"}},l.a.createElement(O,{level:4},l.a.createElement("span",{style:{color:"#41A8F8"}},o)))),l.a.createElement(u.a,{style:{marginBottom:"20px"}},l.a.createElement(g.a,null,l.a.createElement(y.a,null,i),l.a.createElement(y.a,null,s),l.a.createElement(y.a,null,m))),l.a.createElement(u.a,{style:{marginBottom:"10px"}},l.a.createElement(g.a,null,"Director: ",r)),l.a.createElement(u.a,{style:{marginBottom:"10px"}},l.a.createElement(g.a,null,"Cast: ",c)),l.a.createElement(u.a,null,l.a.createElement(g.a,null,A))))},S=function(e){for(var t=e.postsPerPage,a=e.totalPosts,n=e.paginate,r=[],c=1;c<=Math.ceil(a/t);c++)r.push(c);return l.a.createElement("nav",null,l.a.createElement("ul",{className:"pagination"},r.map((function(e){return l.a.createElement("li",{key:e,className:"page-item",style:{display:"inline",marginRight:15}},l.a.createElement("a",{style:{borderStyle:"double",fontSize:15,padding:5},onClick:function(){return n(e)},href:"./!#",className:"page-link"},e))}))))},w=(a(200),i.a.Header),x=i.a.Content,M=i.a.Footer,k=s.a.Title;var B=function(){var e=Object(n.useState)(null),t=Object(o.a)(e,2),a=t[0],r=t[1],c=Object(n.useState)(null),s=Object(o.a)(c,2),E=s[0],p=s[1],g=Object(n.useState)(!1),h=Object(o.a)(g,2),d=h[0],y=h[1],O=Object(n.useState)("Pokemon"),B=Object(o.a)(O,2),I=B[0],N=B[1],P=Object(n.useState)(1),R=Object(o.a)(P,2),V=R[0],Y=R[1],C=Object(n.useState)(5),G=Object(o.a)(C,1)[0],D=Object(n.useState)(!1),K=Object(o.a)(D,2),T=K[0],q=K[1],H=Object(n.useState)(!1),J=Object(o.a)(H,2),L=J[0],U=J[1],X=Object(n.useState)(!1),z=Object(o.a)(X,2),W=z[0],Z=z[1];Object(n.useEffect)((function(){y(!0),p(null),r(null),fetch("https://www.omdbapi.com/?s=".concat(I,"&apikey=").concat("b1fc3699")).then((function(e){return e})).then((function(e){return e.json()})).then((function(e){"False"===e.Response?p(e.Error):r(e.Search),y(!1)})).catch((function(e){var t=e.message;p(t),y(!1)}))}),[I]);var F=V*G,Q=F-G;console.log(a);var _=a?a.slice(Q,F):null;return l.a.createElement("div",{className:"App"},l.a.createElement(i.a,{className:"layout"},l.a.createElement(w,null,l.a.createElement("div",{style:{textAlign:"center"}},l.a.createElement(k,{style:{color:"#ffffff",marginTop:"14px"},level:3},"MOVIES"))),l.a.createElement(x,{style:{padding:"0 50px"}},l.a.createElement("div",{style:{background:"#fff",padding:24,minHeight:280}},l.a.createElement(v,{searchHandler:N,defaultValue:I}),l.a.createElement("br",null),l.a.createElement(u.a,{gutter:16,type:"flex",justify:"center"},d&&l.a.createElement(f.a,null),null!==E&&l.a.createElement("div",{style:{margin:"20px 0"}},l.a.createElement(m.a,{message:E,type:"error"})),null!==_&&_.length>0&&_.map((function(e,t){return l.a.createElement(b,Object.assign({ShowDetail:U,DetailRequest:Z,ActivateModal:q,key:t},e,{API_KEY:"b1fc3699"}))}))),null!==a&&a.length>0&&l.a.createElement(S,{postsPerPage:G,totalPosts:a.length,paginate:function(e){return Y(e)}})),l.a.createElement(A.a,{title:"Detail",centered:!0,visible:T,onCancel:function(){return q(!1)},footer:null,width:800},!1===W?l.a.createElement(j,L):l.a.createElement(f.a,null))),l.a.createElement(M,{style:{textAlign:"center"}},l.a.createElement("a",{href:"https://github.com/ibrahimAKIN"},"github.com/ibrahimAKIN"))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(B,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},92:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMYAAAEIBAMAAAD2IJYeAAAAG1BMVEXMzMyWlpaxsbGcnJyqqqq3t7fFxcW+vr6jo6OlRMi9AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABQ0lEQVR4nO3SsU/CQBTH8Xe90q4HBuLYCoMjSKiO1ERnEONc0qRxxDRhVxL+bu/awGAiiTlZ9PtJl969vF/vXkUAAAAAAAAAAAAAAAAAAAAAAACAf0B9fV+IaZdVt7v5vs4rY3zMqKoTdT/KUMPRLJ7Mot1S4ulC1L2YYJq8z5uuwxsxSnrNrk/GS7/Wi1X4mEu5zUSVhbmuPtpzBPvXxGb0a7frk1EMVBy96WItT/IgKkhMJnUzj0tdxGObMVBu1yfD3kZ8lyp7N2m3JyrKjHGr0j7GuALlOQ/bQm+aL72SyvYa2XOUbYAuorFZuwL/c+htHtgbr6tb21kf5iHi5pEtbUGYpL4ZnYvneZ5LZ5rYzh33X4XH/2qV2oJo55NxEEv5C11OC5PR2TOiyf7sGQAAAAAAAAAAAAAAAAAAAAAA/AGf/uwks6lWtLcAAAAASUVORK5CYII="}},[[108,1,2]]]);
//# sourceMappingURL=main.6e317027.chunk.js.map