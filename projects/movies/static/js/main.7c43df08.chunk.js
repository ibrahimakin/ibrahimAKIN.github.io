(this.webpackJsonpmovies=this.webpackJsonpmovies||[]).push([[0],{109:function(e,t,a){e.exports=a(211)},114:function(e,t,a){},203:function(e,t,a){},204:function(e,t,a){},211:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(4),c=a.n(r),i=(a(114),a(22)),o=a(216),s=a(213),u=a(54),m=a(217),A=a(214),E=(a(115),a(73)),f=a.n(E),b=a(212),g=a(28),p=b.a.Meta,h=function(e){var t=e.Title,n=e.imdbID,r=e.Poster,c=e.Year,i=e.ShowDetail,o=e.DetailRequest,s=e.ActivateModal,m=e.API_KEY;return l.a.createElement(g.a,{style:{margin:"20px 0"},className:"gutter-row",span:4},l.a.createElement("div",{className:"gutter-box"},l.a.createElement(b.a,{style:{width:200},cover:l.a.createElement("img",{alt:t,src:"N/A"===r?a(92):r}),onClick:function(){return s(!0),o(!0),void fetch("https://www.omdbapi.com/?i=".concat(n,"&apikey=").concat(m)).then((function(e){return e})).then((function(e){return e.json()})).then((function(e){o(!1),i(e)})).catch((function(e){e.message,o(!1)}))}},l.a.createElement(p,{title:t,description:!1}),l.a.createElement(u.a,{style:{marginTop:"10px",justifyContent:"center"},className:"gutter-row"},l.a.createElement(g.a,null,l.a.createElement("div",null," Year: ",c)),l.a.createElement(g.a,null,l.a.createElement("div",null,"IMDb ID: ",n," "))))))},v=a(215).a.Search,d=function(e){var t=e.searchHandler,a=e.defaultValue,n=e.setPage,r=e.setCurrentPage,c=e.setActiveLink;return l.a.createElement(u.a,null,l.a.createElement(g.a,{span:12,offset:6},l.a.createElement(v,{placeholder:"enter movie, series, episode name",enterButton:"Search",size:"large",defaultValue:a,onSearch:function(e){t(e),n(1),r(1),c(1)}})))},O=a(218),j=s.a.Title,y=function(e){var t=e.Title,n=e.Poster,r=e.Director,c=e.Actors,i=e.imdbRating,o=e.Rated,s=e.Runtime,m=e.Genre,A=e.Plot;return l.a.createElement(u.a,null,l.a.createElement(g.a,{span:11},l.a.createElement("img",{src:"N/A"===n?a(92):n,alt:t})),l.a.createElement(g.a,{span:13},l.a.createElement(u.a,null,l.a.createElement(g.a,{span:21},l.a.createElement(j,{level:4},t)),l.a.createElement(g.a,{span:3,style:{textAlign:"right"}},l.a.createElement(j,{level:4},l.a.createElement("span",{style:{color:"#41A8F8"}},i)))),l.a.createElement(u.a,{style:{marginBottom:"20px"}},l.a.createElement(g.a,null,l.a.createElement(O.a,null,o),l.a.createElement(O.a,null,s),l.a.createElement(O.a,null,m))),l.a.createElement(u.a,{style:{marginBottom:"10px"}},l.a.createElement(g.a,null,"Director: ",r)),l.a.createElement(u.a,{style:{marginBottom:"10px"}},l.a.createElement(g.a,null,"Cast: ",c)),l.a.createElement(u.a,null,l.a.createElement(g.a,null,A))))},S=a(103),w=a.n(S);a(203);a(204);var x=o.a.Header,k=o.a.Content,C=o.a.Footer,I=s.a.Title;var M=function(){var e=Object(n.useState)(null),t=Object(i.a)(e,2),a=t[0],r=t[1],c=Object(n.useState)(null),s=Object(i.a)(c,2),E=s[0],b=s[1],g=Object(n.useState)(!1),p=Object(i.a)(g,2),v=p[0],O=p[1],j=Object(n.useState)("Pokemon"),S=Object(i.a)(j,2),M=S[0],P=S[1],Y=Object(n.useState)(1),B=Object(i.a)(Y,2),R=B[0],V=B[1],D=Object(n.useState)(0),G=Object(i.a)(D,2),L=G[0],N=G[1],K=Object(n.useState)(1),T=Object(i.a)(K,2),q=T[0],H=T[1],J=Object(n.useState)(10),U=Object(i.a)(J,1)[0],X=Object(n.useState)(1),z=Object(i.a)(X,2),W=z[0],Z=z[1],F=Object(n.useState)(!1),Q=Object(i.a)(F,2),_=Q[0],$=Q[1],ee=Object(n.useState)(!1),te=Object(i.a)(ee,2),ae=te[0],ne=te[1],le=Object(n.useState)(!1),re=Object(i.a)(le,2),ce=re[0],ie=re[1];Object(n.useEffect)((function(){O(!0),b(null),r(null),fetch("https://www.omdbapi.com/?s=".concat(M,"&page=").concat(R,"&apikey=").concat("b1fc3699")).then((function(e){return e})).then((function(e){return e.json()})).then((function(e){"False"===e.Response?b(e.Error):(r(e.Search.sort((function(e,t){return e.Year>t.Year?1:-1}))),N(e.totalResults)),O(!1)})).catch((function(e){var t=e.message;b(t),O(!1)}))}),[M,R]);var oe=q*U,se=oe-U,ue=a?a.slice(se,oe):null;return l.a.createElement("div",{className:"App"},l.a.createElement(o.a,{className:"layout"},l.a.createElement(x,null,l.a.createElement("div",{style:{textAlign:"center"}},l.a.createElement(I,{style:{color:"#ffffff",marginTop:"14px"},level:3},"MOVIES"))),l.a.createElement(k,{style:{padding:"0 50px"}},l.a.createElement("div",{style:{background:"#fff",padding:24,minHeight:280}},l.a.createElement(d,{searchHandler:P,defaultValue:M,setPage:V,setCurrentPage:H,setActiveLink:Z}),l.a.createElement("br",null),l.a.createElement(u.a,{gutter:16,type:"flex",justify:"center"},v&&l.a.createElement(f.a,null),null!==E&&l.a.createElement("div",{style:{margin:"20px 0"}},l.a.createElement(m.a,{message:E,type:"error"})),null!==ue&&ue.length>0&&ue.map((function(e,t){return l.a.createElement("div",{key:t},l.a.createElement(h,Object.assign({ShowDetail:ne,DetailRequest:ie,ActivateModal:$,key:t},e,{API_KEY:"b1fc3699"})))}))),null!==a&&a.length>0&&l.a.createElement(w.a,{activePage:W,itemsCountPerPage:U,totalItemsCount:parseInt(L),pageRangeDisplayed:5,onChange:function(e){Z(e),U<10&&(e%2===1?(V(e/2+1),e=1):(V(e/2),e=2),H(e)),V(e)},itemClass:"item",linkClass:"link",activeLinkClass:"activeLink"})),l.a.createElement(A.a,{title:"Detail",centered:!0,visible:_,onCancel:function(){return $(!1)},footer:null,width:800},!1===ce?l.a.createElement(y,ae):l.a.createElement(f.a,null))),l.a.createElement(C,{style:{textAlign:"center"}},l.a.createElement("a",{href:"https://github.com/ibrahimAKIN"},"github.com/ibrahimAKIN"))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(l.a.createElement(M,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},92:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMYAAAEIBAMAAAD2IJYeAAAAG1BMVEXMzMyWlpaxsbGcnJyqqqq3t7fFxcW+vr6jo6OlRMi9AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABQ0lEQVR4nO3SsU/CQBTH8Xe90q4HBuLYCoMjSKiO1ERnEONc0qRxxDRhVxL+bu/awGAiiTlZ9PtJl969vF/vXkUAAAAAAAAAAAAAAAAAAAAAAACAf0B9fV+IaZdVt7v5vs4rY3zMqKoTdT/KUMPRLJ7Mot1S4ulC1L2YYJq8z5uuwxsxSnrNrk/GS7/Wi1X4mEu5zUSVhbmuPtpzBPvXxGb0a7frk1EMVBy96WItT/IgKkhMJnUzj0tdxGObMVBu1yfD3kZ8lyp7N2m3JyrKjHGr0j7GuALlOQ/bQm+aL72SyvYa2XOUbYAuorFZuwL/c+htHtgbr6tb21kf5iHi5pEtbUGYpL4ZnYvneZ5LZ5rYzh33X4XH/2qV2oJo55NxEEv5C11OC5PR2TOiyf7sGQAAAAAAAAAAAAAAAAAAAAAA/AGf/uwks6lWtLcAAAAASUVORK5CYII="}},[[109,1,2]]]);
//# sourceMappingURL=main.7c43df08.chunk.js.map