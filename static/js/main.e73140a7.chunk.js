(this.webpackJsonpkanbanproject=this.webpackJsonpkanbanproject||[]).push([[0],{139:function(e,t,a){},140:function(e,t,a){},141:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),s=a(17),o=a.n(s),c=a(5),l=a(15),i=(a(81),a(65)),u=a.n(i),m=a(66),d=a.n(m),b=a(67),p=a.n(b),f=a(68),h=a.n(f),E=function(e){var t=e.showNavMobile,a=e.isLog,r=e.setDisplayNav,s=e.displayNav,o=e.props;return a&&n.a.createElement("div",{className:t},n.a.createElement(l.b,{to:"/Reacllo/",onClick:function(){r(!s),o.history,localStorage.removeItem("userName"),localStorage.removeItem("UserToken")}},n.a.createElement("img",{src:p.a,className:"imgButton",alt:"cerrar sesi\xf3n"}),"Cerrar sesi\xf3n"))||n.a.createElement("div",{className:t},n.a.createElement(l.b,{to:"/Reacllo/login/",onClick:function(){return r(!s)}},n.a.createElement("img",{src:u.a,className:"imgButton",alt:"Ingresa"}),"Ingresa"),n.a.createElement(l.b,{to:"/Reacllo/register/",onClick:function(){return r(!s)}},n.a.createElement("img",{src:d.a,className:"imgButton",alt:"Registrate"}),"Registrate"))},g=function(e){var t=localStorage.getItem("userName"),a=localStorage.getItem("userName")||"UserTest",s=Object(r.useState)(!1),o=Object(c.a)(s,2),i=o[0],u=o[1],m=i?"hide":"hide twist",d=i?"show buttons":"buttons";return n.a.createElement("header",null,n.a.createElement("div",{className:"logoNav"},n.a.createElement(l.b,{to:"/Reacllo/"},n.a.createElement("h2",null,"Reacllo"))),n.a.createElement("div",{className:"burger "},n.a.createElement("img",{src:h.a,className:m,onClick:function(){return u(!i)},alt:"Menu"})),n.a.createElement("div",{className:"userName"},n.a.createElement(l.b,{to:"/Reacllo/"},a)),n.a.createElement(E,{showNavMobile:d,isLog:t,setDisplayNav:u,displayNav:i,props:e}))},v=a(8),k=a(11),N=a(35),T=a(27),I=a.n(T),O=a(69),j=a.n(O),y=function(e){var t=e.close,a=e.errMessage,s=e.setErrMessage,o=e.editTask,c=e.task,l=e.ntRef,i=e.handleClickOutside;Object(r.useEffect)((function(){return document.addEventListener("click",i,!1),function(){document.removeEventListener("click",i,!1)}}));return n.a.createElement(w,{titleForm:"Editar Tarea",buttonText:"Editar",close:t,ntRef:l,handleForm:function(e){e.preventDefault();var a=e.target,r=a.title.value,n=a.description.value;r&&n?r===c.taskTitle&&n===c.description?(t(),s("")):o(c,{taskTitle:r,description:n},s,t):s("necesita titulo y descripcion")},errMessage:a,title:c.taskTitle,description:c.description})},C=function(e){var t=e.close,a=e.errMessage,s=e.setErrMessage,o=e.addTask,c=e.ntRef,l=e.handleClickOutside;Object(r.useEffect)((function(){return document.addEventListener("click",l,!1),function(){document.removeEventListener("click",l,!1)}}));return n.a.createElement(w,{titleForm:"Nueva Tarea",buttonText:"Crear",close:t,ntRef:c,handleForm:function(e){e.preventDefault();var a=e.target,r=a.title.value,n=a.description.value;r&&n?o({taskTitle:r,description:n},s,t):s("necesita titulo y descripcion")},errMessage:a})},w=function(e){var t=e.titleForm,a=e.buttonText,r=e.close,s=e.ntRef,o=e.title,c=e.description,l=e.handleForm,i=e.errMessage;return n.a.createElement("div",{className:"blackbackground"},n.a.createElement("div",{ref:s,className:"containerf task",style:{borderTop:"3px solid ".concat(i?"#e81123":"#00ADBB")}},n.a.createElement("form",{onSubmit:l},n.a.createElement("button",{className:"close",onClick:function(e){e.preventDefault(),r()}},"x"),n.a.createElement("h3",null," ",t," "),n.a.createElement("div",{className:"field"},n.a.createElement("label",null,"Titulo"),n.a.createElement("div",null,n.a.createElement("input",{type:"text",name:"title",placeholder:"Ingrese un titulo",maxLength:"35",defaultValue:o||""}))),n.a.createElement("div",{className:"field"},n.a.createElement("label",null,"Descripcion"),n.a.createElement("textarea",{rows:"5",name:"description",placeholder:"Ingrese una descripci\xf3n",maxLength:"155",defaultValue:c||""})),n.a.createElement("button",{className:"send",type:"submit"},a),i&&n.a.createElement("p",{className:"resMessage",style:{color:"#e81123"}},i))))},S=function(e){var t=Object(r.useRef)(null),a=function(a){t.current&&!t.current.contains(a.target)&&(i(""),e.close())},s=Object(r.useState)(""),o=Object(c.a)(s,2),l=o[0],i=o[1];return e.taskWiewerInfo.display&&(!e.taskWiewerInfo.task&&n.a.createElement(C,Object.assign({},e,{errMessage:l,ntRef:t,setErrMessage:i,handleClickOutside:a}))||n.a.createElement(y,Object.assign({},e,{errMessage:l,ntRef:t,setErrMessage:i,handleClickOutside:a,task:e.taskWiewerInfo.task})))},x=(a(86),function(e){var t=e.message,a=Object(r.useState)(""),s=Object(c.a)(a,2),o=s[0],l=s[1];return Object(r.useEffect)((function(){l(t)}),[t]),n.a.createElement(n.a.Fragment,null,o&&n.a.createElement("div",{className:"updateRes"},n.a.createElement("p",null,o),n.a.createElement("p",{onClick:function(){return l("")},className:"closeUpdateRes"},"x")))}),B=(a(46),a(7)),M=a.n(B),D=n.a.createRef(),U=function(e){var t=e.tables,a=e.setTables,s=e.props,o=e.setMessage,l=e.redirect,i=e.setDisplayform,u=e.createTable,m=Object(r.useState)(""),d=Object(c.a)(m,2),b=d[0],p=d[1];return n.a.createElement("div",{className:"newTable"},n.a.createElement("form",{onSubmit:function(e){if(e.preventDefault(),D.current.value){if(p(""),t.filter((function(e){return e.titleTable===D.current.value})).length>0)return void p("ya existe una tabla con ese nombre");u(D.current.value,t,a,s.match.params.boardTitle,o,l(s)),D.current.value="",i(!1)}else p("Tiene que ingresar un nombre primero")}},n.a.createElement("label",null,"Titulo"),n.a.createElement("br",null),n.a.createElement("input",{ref:D,type:"text",className:b?"error":""}),n.a.createElement("button",{title:"Crear tabla",type:"submit"},"+"),n.a.createElement("button",{title:"Cancelar",onClick:function(){return i(!1)}},"x"),n.a.createElement("br",null),b&&n.a.createElement("label",{class:"errorNewTable"},b)))},R=function(e){var t=e.tables,a=e.setTables,s=e.props,o=e.setMessage,l=e.redirect,i=e.createTable,u=Object(r.useState)(!1),m=Object(c.a)(u,2),d=m[0],b=m[1];return d?n.a.createElement(U,{tables:t,setTables:a,setMessage:o,props:s,redirect:l,setDisplayform:b,createTable:i}):n.a.createElement("div",{className:"newTable"},n.a.createElement("button",{onClick:function(e){return b(!0)},className:"openForm"},"Nueva tabla"))},J=function(){localStorage.removeItem("UserToken"),localStorage.removeItem("userName")},z=function(){return localStorage.getItem("UserToken")||"bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiVGVzdCIsImlhdCI6MTU4NDIzNTUwMn0.SJwKbnD6MSx3ud2c37XXgy8EMvQ9mfXBQUwLUEh0uCk"},L=function(e,t){J(),localStorage.setItem("userName",e),localStorage.setItem("UserToken",t)},X=function(e,t,a,r,n,s){var o=z();M()({url:"".concat("https://kanban-api-node.herokuapp.com","/board/table/"),method:"Post",headers:{token:o},data:{boardTitle:r,tableTitle:e}}).then((function(e){return n("se agrego correctamente la tabla")})).catch((function(e){s(e)}));var c={titleTable:e,content:[]};a([].concat(Object(k.a)(t),[c])),n("actualizando ...")},V=function(e,t,a,r,n,s,o,c){var l=Object(k.a)(t),i=l.find((function(t){return t.titleTable===e}));return function(t,u,m){if(t){var d=t.taskTitle.toLowerCase();if(o.has(d))return void u("ya existe una tarea con ese nombre");var b=localStorage.getItem("UserToken")||"bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiVGVzdCIsImlhdCI6MTU4NDIzNTUwMn0.SJwKbnD6MSx3ud2c37XXgy8EMvQ9mfXBQUwLUEh0uCk";i.content.push(t);M()({url:"".concat("https://kanban-api-node.herokuapp.com","/board/table/task/"),method:"Post",headers:{token:b},data:{boardTitle:r,tableTitle:e,task:t}}).then((function(e){n("se agrego correctamente la tarea"),c((function(e){return e.add(d)}))})).catch((function(e){return s(e)})),m(),a(l),n("actualizando ...")}}},F=function(e,t,a,r,n,s,o,c){var l=Object(k.a)(t),i=l.find((function(t){return t.titleTable===e}));return function(t,u,m,d){var b=i.content.findIndex((function(e){return e.taskTitle===t.taskTitle})),p=t.taskTitle.toLowerCase(),f=u.taskTitle.toLowerCase();if(f!==p&&o.has(f))m("Ya existe una tarea con ese nombre");else{i.content.splice(b,1,u),a(l),c((function(e){return e.delete(p),e.add(f)}));var h=z();M()({url:"".concat("https://kanban-api-node.herokuapp.com","/board/table/task/"),method:"Patch",headers:{token:h},data:{boardTitle:r,tableTitle:e,taskTitleToRemove:t.taskTitle,newTask:u}}).then((function(e){n("se modifico correctamente la tarea")})).catch((function(e){return s(e)})),d(),a(l),n("actualizando ...")}}},G=function(e){return function(t){401===t.response.status&&(J(),e.history.push({pathname:"/boards",message:"La ultima accion no pudo guardarse debido a que los permisos del usuario caducaron, ingrese nuevamente "})),400===t.response.status&&"Board not found"===t.response.data.message?e.history.push({pathname:"/boards",message:"No existe una pizarra con ese titulo "}):e.history.push({pathname:"/boards",message:t.response.data.message})}};var Q=function(e){var t=e.tables,a=e.setTables,r=e.boardTitle,s=e.setMessage,o=e.setTaskViewerinfo,c=e.redirect,l=e.setTaskTitles;return t.map((function(e){return n.a.createElement("div",{key:e.titleTable,className:"table"},n.a.createElement("h3",{className:"title"},e.titleTable),n.a.createElement("img",{src:I.a,alt:"",className:"trashCan tablehide",title:"borrar tabla",onClick:function(){return function(e,t,a,r,n,s){var o=JSON.parse(JSON.stringify(t.filter((function(t){return t.titleTable!==e})))),c=localStorage.getItem("UserToken")||"bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiVGVzdCIsImlhdCI6MTU4NDIzNTUwMn0.SJwKbnD6MSx3ud2c37XXgy8EMvQ9mfXBQUwLUEh0uCk";M()({url:"".concat("https://kanban-api-node.herokuapp.com","/board/table/"),method:"Delete",headers:{token:c},data:{boardTitle:r,tableTitle:e}}).then((function(e){return n("se borro correctamente la tabla")})).catch((function(e){return s(e)})),a(o),n("actualizando ...")}(e.titleTable,t,a,r,s,c)}}),n.a.createElement("hr",null),n.a.createElement(N.c,{key:e.titleTable,droppableId:e.titleTable},(function(c,i){return n.a.createElement("div",Object.assign({},c.droppableProps,{ref:c.innerRef,className:"listContainer",style:{backgroundColor:i.isDraggingOver?"lightblue":""}}),e.content.map((function(c,i){return n.a.createElement(N.b,{key:c.taskTitle,draggableId:c.taskTitle,index:i},(function(u,m){return n.a.createElement("div",Object.assign({ref:u.innerRef},u.draggableProps,u.dragHandleProps,{className:"itemList",style:Object(v.a)({backgroundColor:m.isDragging?"#CFD8DC":""},u.draggableProps.style)}),n.a.createElement("p",{className:"titleTask"},c.taskTitle),n.a.createElement("p",{className:"description"},c.description),n.a.createElement("img",{src:I.a,className:"trashCan taskhide",title:"borrar tarea",alt:"",onClick:function(){!function(e,t,a,r,n,s,o,c,l){var i=Object(k.a)(r);i.find((function(t){return t.titleTable===e})).content.splice(t,1);var u=z();M()({url:"".concat("https://kanban-api-node.herokuapp.com","/board/table/task/"),method:"delete",headers:{token:u},data:{boardTitle:s,tableTitle:e,taskTitle:a.taskTitle}}).then((function(e){o("se borro correctamente la tarea"),l((function(e){return e.delete(a.taskTitle.toLowerCase())}))})).catch((function(e){return c(e)})),n(i)}(e.titleTable,i,c,t,a,r,s,l)}}),n.a.createElement("img",{src:j.a,title:"editar tarea",className:"edit",alt:"",onClick:function(){return o({display:!0,tableID:e.titleTable,task:c})}}))}))})),c.placeholder)})),n.a.createElement("hr",null),n.a.createElement("div",{className:"containerButtonNewTask"},n.a.createElement("button",{title:"crear una nueva tarea",className:"btnNewTask",onClick:function(){return o({display:!0,tableID:e.titleTable})}},"+ agregar tarea")))}))},P=function(e){var t=Object(r.useState)([]),a=Object(c.a)(t,2),s=a[0],o=a[1],l=Object(r.useState)(new Set),i=Object(c.a)(l,2),u=i[0],m=i[1],d=Object(r.useState)({display:!1,tableID:void 0,task:null}),b=Object(c.a)(d,2),p=b[0],f=b[1],h=Object(r.useState)(""),E=Object(c.a)(h,2),g=E[0],T=E[1],I=Object(r.useRef)(e);return Object(r.useEffect)((function(){I.current=e})),Object(r.useEffect)((function(){var e=localStorage.getItem("UserToken")||"bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiVGVzdCIsImlhdCI6MTU4NDIzNTUwMn0.SJwKbnD6MSx3ud2c37XXgy8EMvQ9mfXBQUwLUEh0uCk";M()({url:"".concat("https://kanban-api-node.herokuapp.com","/board/").concat(I.current.match.params.boardTitle),method:"Get",headers:{token:e}}).then((function(e){o(e.data.tables);var t=new Set;e.data.tables.forEach((function(e){return e.content.forEach((function(e){return t.add(e.taskTitle.toLowerCase())}))})),m(t)})).catch((function(e){return G(I.current)(e)}))}),[]),n.a.createElement(n.a.Fragment,null,n.a.createElement(S,{taskWiewerInfo:p,close:function(){return f({display:!1,tableID:void 0,task:null})},addTask:V(p.tableID,s,o,e.match.params.boardTitle,T,G,u,m),editTask:F(p.tableID,s,o,e.match.params.boardTitle,T,G,u,m)}),n.a.createElement(x,{message:g}),n.a.createElement("div",{className:"container boardW"},n.a.createElement(N.a,{onDragEnd:function(t){return function(e,t,a,r,n,s){var o,c;if(e.destination){var l,i=e.source,u=e.destination,m=u.index;if(u.droppableId===i.droppableId){var d=t.findIndex((function(e){return e.titleTable===i.droppableId})),b=t[d],p=Object(k.a)(b.content),f=Object(k.a)(t);l=p.splice(i.index,1)[0],p.splice(u.index,0,l),f.splice(d,1,Object(v.a)({},b,{content:p})),o=u.droppableId,c=u.droppableId,a(f)}if(u.droppableId!==i.droppableId){var h=t.findIndex((function(e){return e.titleTable===i.droppableId})),E=t.findIndex((function(e){return e.titleTable===u.droppableId})),g=t[h],N=t[E],T=Object(k.a)(g.content),I=Object(k.a)(N.content),O=Object(k.a)(t);l=T.splice(i.index,1)[0],I.splice(u.index,0,l),O.splice(h,1,Object(v.a)({},g,{content:T})),O.splice(E,1,Object(v.a)({},N,{content:I})),o=u.droppableId,c=i.droppableId,a(O)}var j=localStorage.getItem("UserToken")||"bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiVGVzdCIsImlhdCI6MTU4NDIzNTUwMn0.SJwKbnD6MSx3ud2c37XXgy8EMvQ9mfXBQUwLUEh0uCk";M()({url:"".concat("https://kanban-api-node.herokuapp.com","/board/table/"),method:"Patch",data:{boardTitle:r,tableTitleTo:o,tableTitleFrom:c,taskTitle:l.taskTitle,indexTo:m},headers:{token:j}}).then((function(e){return n("se reordeno la tarea correctamente")})).catch((function(e){return s(e)})),n("actualizando ...")}}(t,s,o,e.match.params.boardTitle,T,G(e))}},n.a.createElement(Q,{tables:s,setTables:o,boardTitle:e.match.params.boardTitle,setMessage:T,setTaskViewerinfo:f,setTaskTitles:m,redirect:G(e)})),n.a.createElement(R,{tables:s,setTables:o,setMessage:T,props:e,redirect:G,createTable:X})))},Y=a(19),A=a(20),H=a(24),K=a(23),W=a(2),q=a(25),_=a(36),Z=a(74),$=a.n(Z),ee=a(75),te=a.n(ee),ae=(a(139),function(e){var t=e.setDisplay,a=e.rf,s=e.onCreateBoard,o=e.hasBoardName,l=Object(r.useState)(""),i=Object(c.a)(l,2),u=i[0],m=i[1];Object(r.useEffect)((function(){return document.addEventListener("click",d,!1),function(){document.removeEventListener("click",d,!1)}}));var d=function(e){a.current&&!a.current.contains(e.target)&&t(!1)};return n.a.createElement("div",{ref:a,className:"board "},n.a.createElement("form",{onSubmit:function(e){e.preventDefault();var a=e.target.titleNewBoard.value;a?o(a)?m("Ya existe tabla con ese nombre"):(s(a),t(!1)):m("La pizarra tiene que tener un titulo")},className:"formNewBoard"},n.a.createElement("label",null,"Titulo"),n.a.createElement("br",null),n.a.createElement("input",{type:"text",name:"titleNewBoard",className:"titleNewBoard",style:{borderBottom:" ".concat(u?"2px solid #e81123":"")}}),u&&n.a.createElement("p",{className:"error"},u),n.a.createElement("button",{className:"buttonCreateBoard",type:"submit"},"Crear"),n.a.createElement("button",{className:"buttonCancelBoard",onClick:function(e){return t(!1)}},"Cancelar")))}),re=function(e){var t=e.setDisplay;return n.a.createElement("div",{className:"board containerButton",onClick:function(){return t(!0)}},n.a.createElement("button",{className:"buttonFormBoard"},"Nueva Pizarra"))},ne=function(e){var t=Object(r.useRef)(null),a=Object(r.useState)(!1),s=Object(c.a)(a,2),o=s[0],l=s[1];return o&&n.a.createElement(ae,Object.assign({setDisplay:l,rf:t},e))||n.a.createElement(re,{setDisplay:l})},se=Object(_.c)((function(){return n.a.createElement("span",{className:"position ",title:"arrastrame para reordenar"},n.a.createElement("img",{src:te.a,alt:"arrastrame"}))})),oe=Object(_.a)((function(e){var t=e.items,a=e.removeBoard,r=e.onCreateBoard,s=e.setMessage,o=e.hasBoardName;return n.a.createElement("ul",null,t.map((function(e,t){return n.a.createElement(ce,{removeBoard:a,key:"item-".concat(e+t),index:t,value:e})})),n.a.createElement("li",null,n.a.createElement(ne,{onCreateBoard:r,setMessage:s,hasBoardName:o})))})),ce=Object(_.b)((function(e){var t=e.value,a=e.removeBoard;return n.a.createElement("li",{tabIndex:t},n.a.createElement("div",{className:"board"},n.a.createElement("img",{src:I.a,className:"trashCan boardhide boardt",title:"remove board",alt:"",onClick:function(){a(t)}}),n.a.createElement(se,null),n.a.createElement(l.b,{to:"/Reacllo/board/".concat(t)},t,n.a.createElement("div",{className:"rowContainer"},n.a.createElement("div",{className:"row"}),n.a.createElement("div",{className:"row"}),n.a.createElement("div",{className:"row"})))))})),le=function(e){function t(e){var a;return Object(Y.a)(this,t),(a=Object(H.a)(this,Object(K.a)(t).call(this,e))).errHandler=function(e){J(),401===e.response.status&&a.setState({message:"La ultima accion no pudo guardarse debido a que los permisos del usuario caducaron, logueese nuevamente",firstFetch:!0})},a.removeBoard=function(e){var t=z();M()({url:"".concat("https://kanban-api-node.herokuapp.com","/board/"),method:"DELETE",headers:{token:t},data:{boardTitle:e}}).then((function(e){return a.setState({message:"se borro exitosamente"})})).catch((function(e){return a.errHandler(e)})),a.setState((function(t){var a=Object(k.a)(t.boardsObs);return a.splice(a.findIndex((function(t){return t===e})),1),{boardsObs:a,message:"actualizando ..."}}))},a.removeBoard=a.removeBoard.bind(Object(W.a)(a)),a.onSortEnd=function(e){var t=e.oldIndex,r=e.newIndex;a.setState((function(e){var n=e.boardsObs,s=localStorage.getItem("UserToken")||"bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiVGVzdCIsImlhdCI6MTU4NDIzNTUwMn0.SJwKbnD6MSx3ud2c37XXgy8EMvQ9mfXBQUwLUEh0uCk",o=$()(n,t,r);return M()({url:"".concat("https://kanban-api-node.herokuapp.com","/user/neworder"),method:"Patch",headers:{token:s},data:{boardsOrder:o}}).then((function(e){return a.setState({message:"se reordeno exitosamente"})})).catch((function(e){return a.errHandler(e)})),{boardsObs:o,message:"actualizando ..."}}))},a.createBoard=function(e){var t=z();M()({url:"".concat("https://kanban-api-node.herokuapp.com","/board"),method:"POST",headers:{token:t},data:{boardTitle:e}}).then((function(e){return a.setState({message:"se guardo exitosamente"})})).catch((function(e){return a.errHandler(e)})),a.setState((function(t){return{boardsObs:[].concat(Object(k.a)(t.boardsObs),[e]),message:"actualizando ..."}}))},a.hasBoardName=function(e){return!!a.state.boardsObs.includes(e)&&(a.setState({message:"Existe una board con ese nombre"}),!0)},a.hasBoardName=a.hasBoardName.bind(Object(W.a)(a)),a.state={boardsObs:[],firstFetch:!0,message:e.location.message},a.setState=a.setState.bind(Object(W.a)(a)),a}return Object(q.a)(t,e),Object(A.a)(t,[{key:"_getBoards",value:function(){var e=this,t=localStorage.getItem("userName")||"Test";if(this.state.firstFetch){M.a.get("".concat("https://kanban-api-node.herokuapp.com","/user/").concat(t)).then((function(t){e.setState({boardsObs:t.data.boards,firstFetch:!1})})).catch((function(e){return console.log(e.message)}))}}},{key:"componentDidMount",value:function(){this._getBoards()}},{key:"componentDidUpdate",value:function(){this._getBoards()}},{key:"render",value:function(){var e=this;return n.a.createElement(n.a.Fragment,null,n.a.createElement(x,{message:this.state.message}),n.a.createElement("div",{className:"container boards"},n.a.createElement(oe,{items:this.state.boardsObs,onSortEnd:this.onSortEnd,useDragHandle:!0,removeBoard:this.removeBoard,onCreateBoard:this.createBoard,setMessage:function(t){return e.setState({message:t})},hasBoardName:this.hasBoardName,axis:"xy"})))}}]),t}(r.Component),ie=function(e){var t=e.location.pathname.split("/");return t.splice(0,1),t.splice(0,1),t.splice(0,1),n.a.createElement("div",{className:"showRoute"},n.a.createElement(l.b,{to:"/Reacllo/"},"Mis pizarras/"),t.map((function(e){return n.a.createElement("p",{key:e}," ",e," ")})))},ue=a(3),me=(a(140),function(e){var t=Object(r.useState)({userName:"",password:""}),a=Object(c.a)(t,2),s=a[0],o=a[1],l=Object(r.useState)({userName:"",password:""}),i=Object(c.a)(l,2),u=i[0],m=i[1],d=Object(r.useState)(""),b=Object(c.a)(d,2),p=b[0],f=b[1],h=function(e){var t=e.target,a=t.name,r=t.value;o(Object(v.a)({},s,Object(ue.a)({},a,r))),m(Object(v.a)({},u,{},function(e,t){var a={};return"userName"===e&&(a.userName=t.length>=4?"":"El nombre de usuario debe ser mayor a 4 caracteres"),"password"===e&&(a.password=/^(?=.*[A-Z]).{4,}$/.test(t)?"":"La contrase\xf1a debe tener almenos una mayuscula y entre 4 caracteres "),a}(a,r))),f("")},E=function(){return!["No se puede registrar este usuario","Ese nombre de usuario ya se encuentra en uso"].includes(p)};return n.a.createElement("div",{style:{borderTop:"3px solid ".concat(E()?"#00ADBB":"#e81123")},className:"containerf"},n.a.createElement("form",{noValidate:!0,onSubmit:function(t){if(t.preventDefault(),s.userName||m(Object(v.a)({},u,{userName:"El nomber se encuentra vacio"})),s.password||m(Object(v.a)({},u,{password:"La contrase\xf1a se encuentra vacia"})),u.userName||u.password)f("No se puede registrar este usuario");else{M()({url:"".concat("https://kanban-api-node.herokuapp.com","/user/register/"),data:Object(v.a)({},s,{Username:s.userName}),method:"post"}).then((function(t){return function(t){f("se registro exitosamente, ingresando...");M()({url:"".concat("https://kanban-api-node.herokuapp.com","/user/login/"),data:Object(v.a)({},s,{Username:s.userName}),method:"post"}).then((function(t){L(s.userName,t.data.token),e.history.push("/boards")})).catch((function(e){}))}()})).catch((function(e){return function(e){"Username already exists"===e.response.data.message&&(f("Ese nombre de usuario ya se encuentra en uso"),o({userName:"",password:""}))}(e)}))}}},n.a.createElement("h3",null,"Registrate"),n.a.createElement("div",{className:"field"},n.a.createElement("label",null,"Nombre de Usuario"),n.a.createElement("div",null,n.a.createElement("input",{style:{borderBottom:"2px solid ".concat(u.userName?"#e81123":"rgba(28,110,164,0.13)")},name:"userName",type:"text",placeholder:"Ingrese su nombre de usuario",value:s.userName,onChange:h}),u.userName&&n.a.createElement("p",{className:"error"},u.userName))),n.a.createElement("div",{className:"field"},n.a.createElement("label",null,"Constrase\xf1a"),n.a.createElement("div",null,n.a.createElement("input",{style:{borderBottom:"2px solid ".concat(u.password?"#e81123":"rgba(28,110,164,0.13)")},name:"password",type:"password",placeholder:"Ingrese su contrase\xf1a",value:s.password,onChange:h}),u.password&&n.a.createElement("p",{className:"error"},u.password))),n.a.createElement("button",{className:"send",type:"Submit"},"Enviar"),p&&n.a.createElement("p",{className:"resMessage",style:{color:E()?"#00ADBB":"#e81123"}},p)))}),de=function(e){var t=Object(r.useState)({userName:"",password:""}),a=Object(c.a)(t,2),s=a[0],o=a[1],l=Object(r.useState)({userName:"",password:""}),i=Object(c.a)(l,2),u=i[0],m=i[1],d=Object(r.useState)(""),b=Object(c.a)(d,2),p=b[0],f=b[1],h=function(e){var t=e.target,a=t.name,r=t.value;o(Object(v.a)({},s,Object(ue.a)({},a,r)))},E=function(){return!["Error campo vacio","El usuario o la contrase\xf1a es incorrecta"].includes(p)};return n.a.createElement("div",{style:{borderTop:"3px solid ".concat(E()?"#00ADBB":"#e81123")},className:"containerf"},n.a.createElement("form",{noValidate:!0,onSubmit:function(t){if(t.preventDefault(),!s.userName)return f("Error campo vacio"),m({userName:"Usuario vacio",password:""}),void o(Object(v.a)({},s,{password:""}));if(!s.password)return f("Error campo vacio"),m({userName:"",password:"Contrase\xf1a vacia"}),void o(Object(v.a)({},s,{password:""}));f("Ingresando...");M()({url:"".concat("https://kanban-api-node.herokuapp.com","/user/login/"),data:Object(v.a)({},s,{Username:s.userName}),method:"post"}).then((function(t){L(s.userName,t.data.token),e.history.push("/boards")})).catch((function(e){return o(Object(v.a)({},s,{password:""})),void f("El usuario o la contrase\xf1a es incorrecta")}))}},n.a.createElement("h3",null,"Ingresar"),n.a.createElement("div",{className:"field"},n.a.createElement("label",null,"Nombre de Usuario"),n.a.createElement("div",null,n.a.createElement("input",{name:"userName",type:"text",value:s.userName,placeholder:"Ingrese su nombre de usuario",onChange:h,style:{borderBottom:"2px solid ".concat(u.userName?"#e81123":"rgba(28,110,164,0.13)")}}),u.userName&&n.a.createElement("p",{className:"error"},u.userName))),n.a.createElement("div",{className:"field"},n.a.createElement("label",null,"Constrase\xf1a"),n.a.createElement("div",null,n.a.createElement("input",{name:"password",type:"password",value:s.password,placeholder:"Ingrese su contrase\xf1a",onChange:h,style:{borderBottom:"2px solid ".concat(u.password?"#e81123":"rgba(28,110,164,0.13)")}}),u.password&&n.a.createElement("p",{className:"error"},u.password))),n.a.createElement("button",{className:"send",type:"Submit"},"Iniciar Sesi\xf3n"),p&&n.a.createElement("p",{className:"resMessage",style:{color:E()?"#00ADBB":"#e81123"}},p)))},be=function(e){var t=e.match.path.toLocaleLowerCase().includes("register");return n.a.createElement("div",{className:"loginContainer"},t&&n.a.createElement(me,e)||n.a.createElement(de,e))},pe=a(6),fe=function(){var e=Object(pe.g)((function(e){return n.a.createElement(ie,e)})),t=Object(pe.g)((function(e){return n.a.createElement(g,e)}));return n.a.createElement(l.a,null,n.a.createElement("div",{className:"content"},n.a.createElement(t,null),n.a.createElement(e,null),n.a.createElement(pe.d,null,n.a.createElement(pe.b,{exact:!0,path:"/Reacllo/board/:boardTitle",component:P}),n.a.createElement(pe.b,{exact:!0,path:"/Reacllo/boards/",component:le}),n.a.createElement(pe.b,{exact:!0,path:"/Reacllo/register/",component:be}),n.a.createElement(pe.b,{extact:!0,path:"/Reacllo/login/",component:be}),n.a.createElement(pe.a,{to:"/Reacllo/boards/"}))))};o.a.render(n.a.createElement(fe,null),document.getElementById("root"))},27:function(e,t,a){e.exports=a.p+"static/media/trash-can.d7bec4e6.svg"},46:function(e,t,a){},65:function(e,t,a){e.exports=a.p+"static/media/user.8702dc53.svg"},66:function(e,t,a){e.exports=a.p+"static/media/register2.08a5405f.svg"},67:function(e,t,a){e.exports=a.p+"static/media/logout2.cab047d1.svg"},68:function(e,t,a){e.exports=a.p+"static/media/burger.86595150.svg"},69:function(e,t,a){e.exports=a.p+"static/media/edit.aa72a69b.svg"},75:function(e,t,a){e.exports=a.p+"static/media/grab.a3189f25.png"},76:function(e,t,a){e.exports=a(141)},81:function(e,t,a){},86:function(e,t,a){}},[[76,1,2]]]);
//# sourceMappingURL=main.e73140a7.chunk.js.map