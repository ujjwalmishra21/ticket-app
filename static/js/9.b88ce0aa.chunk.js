(this["webpackJsonpticket-app"]=this["webpackJsonpticket-app"]||[]).push([[9],{330:function(e,t,n){"use strict";var a=n(0),i=n.n(a),r=n(326),l=n(605),o=n(365);t.a=function(){return i.a.createElement(r.a,null,i.a.createElement(l.a,{active:!0},i.a.createElement(o.a,{size:"medium"})))}},333:function(e,t,n){"use strict";var a=n(0),i=n.n(a),r=n(599),l=n(593);t.a=function(e){var t=null,n=null;switch(e.invalid&&e.shouldValidate&&e.touched&&(n=i.a.createElement("p",null,"Please enter a valid value")),e.elementType){case"input":t=i.a.createElement(r.a.Input,Object.assign({},e.elementConfig,{value:e.value,onChange:e.changed,inputMode:e.inputMode}));break;case"select":t=i.a.createElement(l.a,{value:e.value,onChange:e.changed,options:e.elementConfig.options});break;default:t=null}return i.a.createElement("div",{style:{marginBottom:"10px"}},t,n)}},363:function(e,t,n){"use strict";var a=n(0),i=n.n(a),r=n(381);n(364);t.a=function(e){return i.a.createElement(r.a,{circular:e.circular,bordered:e.bordered,size:e.size,style:e.class})}},364:function(e,t,n){},365:function(e,t,n){"use strict";var a=n(6),i=n.n(a),r=n(5),l=n.n(r),o=(n(8),n(0)),c=n.n(o),u=n(28),s=n(125),d=n(124),p=n(7);function m(e){var t=e.active,n=e.children,a=e.className,r=e.content,o=e.disabled,v=e.indeterminate,g=e.inline,f=e.inverted,h=e.size,b=l()("ui",h,Object(u.a)(t,"active"),Object(u.a)(o,"disabled"),Object(u.a)(v,"indeterminate"),Object(u.a)(f,"inverted"),Object(u.a)(n||r,"text"),Object(u.b)(g,"inline"),"loader",a),O=Object(s.a)(m,e),j=Object(d.a)(m,e);return c.a.createElement(j,i()({},O,{className:b}),p.a.isNil(n)?r:n)}m.handledProps=["active","as","children","className","content","disabled","indeterminate","inline","inverted","size"],m.propTypes={},t.a=m},592:function(e,t,n){"use strict";n.r(t);var a=n(97),i=n(35),r=n(36),l=n(38),o=n(37),c=n(0),u=n.n(c),s=n(46),d=n(9),p=n(599),m=n(603),v=n(68),g=n(333),f=n(363),h=n(330),b=n(2),O=n(93),j=function(e){Object(l.a)(n,e);var t=Object(o.a)(n);function n(){var e;Object(i.a)(this,n);for(var r=arguments.length,l=new Array(r),o=0;o<r;o++)l[o]=arguments[o];return(e=t.call.apply(t,[this].concat(l))).state={signUpForm:{type:{elementType:"select",elementConfig:{options:[{value:1,text:"Customer"},{value:2,text:"Owner"}]},inputMode:"none",value:1,validation:{},valid:!0},name:{elementType:"input",elementConfig:{type:"text",placeholder:"Your name"},value:"",validation:{required:!0},inputMode:"text",valid:!1,touched:!1},mobile_number:{elementType:"input",elementConfig:{type:"text",placeholder:"Enter mobile number"},value:"",validation:{required:!0,isNumeric:!0,minLength:10,maxLength:10},inputMode:"numeric",valid:!1,touched:!1}},completed:!1},e.submitHandler=function(t){t.preventDefault();var n={};for(var a in e.state.signUpForm)n[a]=e.state.signUpForm[a].value;e.props.onSignUp(n),e.props.error||e.setState({completed:!0})},e.changeHandler=function(t,n){var i=Object(b.b)(e.state.signUpForm[n],{value:t.target.value,valid:Object(b.a)(t.target.value,e.state.signUpForm[n].validation),touched:!0}),r=Object(b.b)(e.state.signUpForm,Object(a.a)({},n,i)),l=!0;for(var o in r)l=r[o].valid&&l;e.setState({signUpForm:r,formIsValid:l})},e}return Object(r.a)(n,[{key:"render",value:function(){var e=this,t=[];for(var n in this.state.signUpForm)t.push({id:n,config:this.state.signUpForm[n]});var a=u.a.createElement(p.a,null,t.map((function(t){return u.a.createElement(g.a,{key:t.id,elementType:t.config.elementType,elementConfig:t.config.elementConfig,value:t.config.value,invalid:!t.config.valid,shouldValidate:t.config.validation,touched:t.config.touched,inputMode:t.config.inputMode,changed:function(n){return e.changeHandler(n,t.id)}})})),u.a.createElement(m.a,{onClick:this.submitHandler,content:"Submit"})),i=null;return this.props.error&&(i=u.a.createElement("p",{style:{color:"red"}},this.props.error)),this.props.loading&&(a=u.a.createElement(h.a,null)),this.state.completed&&(alert("User successfully registered. Please Login to continue"),a=u.a.createElement(d.a,{to:"/login"})),u.a.createElement(v.a,null,u.a.createElement(f.a,{src:"https://img.icons8.com/officel/80/000000/booking.png",size:"small",circular:!0,bordered:!0,class:{padding:"20px",margin:"30px",backgroundColor:"white"}}),a,i)}}]),n}(c.Component);t.default=Object(s.b)((function(e){return{loading:e.auth.loading,error:e.auth.error}}),(function(e){return{onSignUp:function(t){return e(O.l(t))}}}))(j)}}]);
//# sourceMappingURL=9.b88ce0aa.chunk.js.map