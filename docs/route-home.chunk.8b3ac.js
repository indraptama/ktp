webpackJsonp([0],{"1lu6":function(a,e,t){"use strict";function n(a){function e(){r.style.color="#673AB7",s.style.transform="translate3d(0,0,0)",s.classList.add("isActive")}function n(){r.style.color="rgba(0,0,0,.5)",s.style.transform="translate3d(-100%,0,0)",s.classList.remove("isActive")}var r=null,s=null;return t.i(i.h)("label",{className:l.a.DropDown},t.i(i.h)("span",{className:l.a.DropDown_title,ref:function(a){r=a}},a.title),t.i(i.h)("select",{className:l.a.DropDown_input,type:a.type,value:a.Value,name:a.name,placeholder:a.placeholder,onChange:a.onChange,onFocus:e,onBlur:n},a.dataItems.map(function(a){return t.i(i.h)("option",{className:"w-100 db",value:a.value},a.label)})),t.i(i.h)("div",{className:l.a.DropDown_highlight},t.i(i.h)("span",{className:l.a.DropDown_highlightItem,ref:function(a){s=a}})))}e.a=n;var i=t("KM04"),r=(t.n(i),t("5qQg")),l=t.n(r)},"2AN3":function(a){a.exports={flex:"flex__ZHp8F",w_50:"w_50__3Y4Cq",mh1:"mh1__37eSl",mr1:"mr1__2OFrI",pl1:"pl1__1eDZH"}},"5qQg":function(a){a.exports={DropDown:"DropDown__AR0Vc",DropDown_title:"DropDown_title__NV810",DropDown_input:"DropDown_input__1xtsq",DropDown_highlight:"DropDown_highlight___NYpg",DropDown_highlightItem:"DropDown_highlightItem__3QXhO"}},"6ATj":function(a,e,t){"use strict";function n(a){var e="female"===a.gender?"genderBgFemale":"genderBgMale",n="female"===a.gender?s.female:s.male;return t.i(i.h)("div",{href:"#",className:[l.a.UserCard,e].join(" ")},t.i(i.h)("div",{className:l.a.UserCard_img,style:n},t.i(i.h)("img",{src:a.image,alt:""})),t.i(i.h)("div",{className:l.a.UserCard_desc},t.i(i.h)("h6",{className:l.a.UserCard_name},a.fullName),t.i(i.h)("span",{className:l.a.UserCard_nik},a.nik)))}e.a=n;var i=t("KM04"),r=(t.n(i),t("ZzoW")),l=t.n(r),s={male:{backgroundColor:"#2196F3",backgroundImage:"url('assets/icons/male.svg')"},female:{backgroundColor:"#E91E63",backgroundImage:"url('assets/icons/female.svg')"}}},BrQb:function(a){function e(a){return["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"][parseFloat(a)-1]}a.exports=e},"K+dO":function(a,e,t){"use strict";function n(a){var e=a.dataKTP,n={nik:e.nik,fullName:e.fullName,bornPlace:e.bornPlace,bornDate:e.bornDate,gender:e.gender,streetAddress:e.streetAddress,rt:e.rt,rw:e.rw,kelurahanType:e.kelurahanType,kelurahanName:e.kelurahanName,kecamatan:e.kecamatan,cityType:e.cityType,cityName:e.cityName,martialStatus:e.martialStatus,occupation:e.occupation},l=n.fullName.toUpperCase(),o=i(n.gender,n.martialStatus),h=n.bornDate.split("-").map(function(a){return parseInt(a,10)}),m=s()(h[0]),g=u()(h[1]),f=s()(h[2]),b=m+" "+g+" "+f;return t.i(r.h)("div",{className:p.a.result},t.i(r.h)("p",null,o+" "+l+", lahir di "+n.bornPlace+" pada tanggal "+n.bornDate+" ("+b+"). "+n.occupation+". Pemegang Kartu Tanda Penduduk dengan Nomor Induk Kependudukan (NIK) "+n.nik+". Bertempat tinggal di "+n.cityType+" "+n.cityName+", "+n.streetAddress+", Rukun Tetangga "+n.rt+", Rukun Warga "+n.rw+", "+n.kelurahanType+" "+n.kelurahanName+", Kecamatan  "+n.kecamatan+". Warga Negara Indonesia.",function(a,e){if(a!==e)return c}("bandung",n.cityName)),t.i(r.h)("div",{className:p.a.resultAction},t.i(r.h)("a",{href:"#",onClick:a.editButton},d)))}function i(a,e){return"male"===a?"Tuan":"female"===a&&"single"===e?"Nona":"Nyonya"}var r=t("KM04"),l=(t.n(r),t("rkZl")),s=t.n(l),o=t("BrQb"),u=t.n(o),h=t("dFd0"),p=t.n(h),c=t.i(r.h)("span",null," (Untuk sementara berada di Kabupaten Bandung)."),d=t.i(r.h)("img",{src:"assets/icons/edit.svg",alt:""});e.a=n},PdBQ:function(a,e){"use strict";function t(a){var e={},t=a.split("").map(function(a){return parseInt(a,10)}),n=t.slice(0,4).join(""),i=t.slice(0,6).join(""),r=t.slice(6,8).join(""),l=t.slice(8,10).join(""),s=t.slice(10,12).join(""),o=parseFloat(r)>=40?parseFloat(r)-40:parseFloat(r),u=1===o.toString().length?"0"+o.toString():o.toString(),h=parseFloat(l),p=parseFloat("19"+s),c=parseInt(r,10)>=40?"female":"male",d=u+"-"+l+"-19"+s;return e.cityCode=n,e.kecamatanCode=i,e.bornDate=d,e.bornDay=u,e.bornMonth=h,e.bornYear=p,e.gender=c,e}e.a=t},TDbV:function(a,e,t){"use strict";function n(a){var e=a.isActive?l.ModalActive:l.ModalOff;return t.i(r.h)("div",{style:e},t.i(r.h)("div",{style:l.ModalContainer},a.children))}e.a=n;var i,r=t("KM04"),l=(t.n(r),{ModalActive:(i={display:"block",position:"fixed",left:0,right:0,top:0,bottom:0,zIndex:999,width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,.5)"},i.display="flex",i.alignItems="center",i.justifyContent="center",i),ModalOff:{display:"none"},ModalContainer:{maxHeight:"90%",overflowY:"scroll",borderRadius:"2px",boxShadow:"0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)"}})},ZAL5:function(a){a.exports={home:"home__MseGd",Compasitor:"Compasitor__ZgeZB",ResultPaper:"ResultPaper__3dMT2",partyHeader:"partyHeader__1j1b1",partyList:"partyList__3LWq1",partyFooter:"partyFooter__3NBMQ"}},ZwNj:function(a,e,t){"use strict";function n(a,e){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?a:e}function i(a,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);a.prototype=Object.create(e&&e.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(a,e):a.__proto__=e)}t.d(e,"a",function(){return y});var r=t("KM04"),l=(t.n(r),t("PdBQ")),s=t("aDwu"),o=t.n(s),u=t("2AN3"),h=t.n(u),p=t("g3LN"),c=t("1lu6"),d=t.i(r.h)("img",{src:"assets/icons/ktp.svg",alt:""}),m=t.i(r.h)("h3",null,"Isilah data berikut sesuai dengan Kartu Identitas Penghadap"),g=t.i(r.h)("li",null,t.i(r.h)("h4",null,"Informasi Pribadi")),f=t.i(r.h)("li",null,t.i(r.h)("h4",null,"Alamat")),b=t.i(r.h)("li",null,t.i(r.h)("h4",null,"Pekerjaan & Status Pernikahan")),_=t.i(r.h)("li",null),y=function(a){function e(e){var t=n(this,a.call(this,e));return t.state={_id:t.props.inputData._id,nik:t.props.inputData.nik,fullName:t.props.inputData.fullName,bornPlace:t.props.inputData.bornPlace,bornDay:t.props.inputData.bornDay,bornMonth:t.props.inputData.bornMonth,bornYear:t.props.inputData.bornYear,gender:t.props.inputData.gender,streetAddress:t.props.inputData.streetAddress,rt:t.props.inputData.rt,rw:t.props.inputData.rw,kelurahanType:t.props.inputData.kelurahanType,kelurahanName:t.props.inputData.kelurahanName,kecamatan:t.props.inputData.kecamatan,cityType:t.props.inputData.cityType,cityName:t.props.inputData.cityName,martialStatus:t.props.inputData.martialStatus,occupation:t.props.inputData.occupation},t.handleInputChange=t.handleInputChange.bind(t),t.handleInputNik=t.handleInputNik.bind(t),t}return i(e,a),e.prototype.handleSave=function(a){a.preventDefault(),this.props.outputData({_id:this.state.nik,nik:this.state.nik,fullName:this.state.fullName,bornPlace:this.state.bornPlace,bornDate:this.state.bornDay+"-"+this.state.bornMonth+"-"+this.state.bornYear,gender:this.state.gender,streetAddress:this.state.streetAddress,rt:this.state.rt,rw:this.state.rw,kelurahanType:this.state.kelurahanType,kelurahanName:this.state.kelurahanName,kecamatan:this.state.kecamatan,cityType:this.state.cityType,cityName:this.state.cityName,martialStatus:this.state.martialStatus,occupation:this.state.occupation}),this.setState({_id:"",nik:"",fullName:"",bornPlace:"",bornDay:"",bornMonth:"",bornYear:"",gender:"male",streetAddress:"",rt:"",rw:"",kelurahanType:"desa",kelurahanName:"",kecamatan:"",cityType:"kabupaten",cityName:"",martialStatus:"single",occupation:""})},e.prototype.handleInputChange=function(a){var e,t=a.target,n="checkbox"===t.type?t.checked:t.value,i=t.name;this.setState((e={},e[i]=n,e))},e.prototype.handleInputNik=function(a){var e=this,n=a.target.value;!function(a){if(16===a.length){var i=t.i(l.a)(a);console.log(i),e.setState({nik:n,bornDay:i.bornDay,bornMonth:i.bornMonth,bornYear:i.bornYear,gender:i.gender})}else console.log("error"),e.setState({nik:n})}(n)},e.prototype.render=function(){return t.i(r.h)("div",{className:o.a.KtpField},t.i(r.h)("header",{className:o.a.KtpField_header},d,m),t.i(r.h)("form",null,t.i(r.h)("ul",null,g,t.i(r.h)("li",null,t.i(r.h)(p.a,{Value:this.state.nik,title:"Nomor Induk Kependudukan",name:"nik",isNumeric:!0,maxlength:"16",onChange:this.handleInputNik})),t.i(r.h)("li",null,t.i(r.h)(p.a,{Value:this.state.fullName,title:"Nama Lengkap",name:"fullName",onChange:this.handleInputChange})),t.i(r.h)("li",{className:h.a.flex},t.i(r.h)("div",{className:h.a.w_50},t.i(r.h)(p.a,{Value:this.state.bornPlace,title:"Kota Kelahiran",name:"bornPlace",onChange:this.handleInputChange})),t.i(r.h)("div",{className:[h.a.flex,h.a.w_50].join(" ")},t.i(r.h)(p.a,{Value:this.state.bornDay,title:"Tgl.Lahir",name:"bornDay",isNumeric:!0,maxlength:"2",onChange:this.handleInputChange}),t.i(r.h)("div",{className:h.a.mh1},t.i(r.h)(p.a,{Value:this.state.bornMonth,title:"Bln.Lahir",name:"bornMonth",isNumeric:!0,maxlength:"2",onChange:this.handleInputChange})),t.i(r.h)(p.a,{Value:this.state.bornYear,title:"Thn.lahir",name:"bornYear",isNumeric:!0,maxlength:"4",onChange:this.handleInputChange}))),t.i(r.h)("li",null,t.i(r.h)(c.a,{Value:this.state.gender,dataItems:k,title:"jenis Kelamin",name:"gender",onChange:this.handleInputChange})),f,t.i(r.h)("li",{className:h.a.flex},t.i(r.h)("div",{className:h.a.w_50},t.i(r.h)(p.a,{Value:this.state.streetAddress,title:"alamat",name:"streetAddress",onChange:this.handleInputChange})),t.i(r.h)("div",{className:[h.a.flex,h.a.w_50].join(" ")},t.i(r.h)("div",{className:h.a.mr1},t.i(r.h)(p.a,{Value:this.state.rt,title:"RT",name:"rt",isNumeric:!0,maxlength:"3",onChange:this.handleInputChange})),t.i(r.h)(p.a,{Value:this.state.rw,title:"RW",name:"rw",isNumeric:!0,maxlength:"3",onChange:this.handleInputChange}))),t.i(r.h)("li",{className:[h.a.flex]},t.i(r.h)(c.a,{Value:this.state.kelurahanType,dataItems:N,title:"jenis administrasi",name:"kelurahanType",onChange:this.handleInputChange}),t.i(r.h)(p.a,{Value:this.state.kelurahanName,title:"Nama Desa/Kelurahan",name:"kelurahanName",placeholder:"contoh: Desa Bersemi Indah",onChange:this.handleInputChange})),t.i(r.h)("li",null,t.i(r.h)(p.a,{Value:this.state.kecamatan,title:"Kecamatan",name:"kecamatan",onChange:this.handleInputChange})),t.i(r.h)("li",{className:[h.a.flex]},t.i(r.h)(c.a,{Value:this.state.cityType,dataItems:v,title:"jenis administrasi",name:"cityType",onChange:this.handleInputChange}),t.i(r.h)(p.a,{Value:this.state.cityName,title:"Kota/Kabupaten",name:"cityName",onChange:this.handleInputChange})),b,t.i(r.h)("li",{className:[h.a.flex]},t.i(r.h)(c.a,{Value:this.state.martialStatus,dataItems:D,title:"Status Pernikahan",name:"martialStatus",onChange:this.handleInputChange}),t.i(r.h)(p.a,{Value:this.state.occupation,title:"Pekerjaan",name:"occupation",onChange:this.handleInputChange})),_),t.i(r.h)("div",{className:o.a.KtpField_action},t.i(r.h)("button",{className:o.a.KtpField_buttonCancel,onClick:this.props.cancelInput},"Cancel"),t.i(r.h)("button",{className:o.a.KtpField_buttonSave,onClick:this.handleSave.bind(this)},"Save"))))},e}(r.Component),k=[{label:"Laki-laki",value:"male"},{label:"Perempuan",value:"female"}],N=[{label:"Desa",value:"desa"},{label:"Kelurahan",value:"kelurahan"}],v=[{label:"Kabupaten",value:"kabupaten"},{label:"Kota",value:"kota"}],D=[{label:"Belum Menikah",value:"single"},{label:"Menikah",value:"marriage"},{label:"Cerai Hidup",value:"divorced"},{label:"Cerai Mati",value:"widowed"}]},ZzoW:function(a){a.exports={UserCard:"UserCard__29FHg",UserCard_img:"UserCard_img__SWDzD",UserCard_desc:"UserCard_desc__ogYKZ"}},aDwu:function(a){a.exports={KtpField:"KtpField__2BBBY",KtpField_header:"KtpField_header__jll1w",KtpField_action:"KtpField_action__1TM8l",KtpField_buttonSave:"KtpField_buttonSave__1i4Il"}},crmn:function(a,e,t){"use strict";function n(a){return t.i(i.h)("button",{onClick:a.onClick,style:r.fab},t.i(i.h)("span",{style:r.span},a.children))}e.a=n;var i=t("KM04"),r=(t.n(i),{fab:{width:48,height:48,backgroundColor:"#673AB7",color:"#fff",margin:0,lineHeight:"48px",borderRadius:500,border:"none",fontSize:24,outline:"none",position:"relative",verticalAlign:"middle"},span:{margin:0,verticalAlign:"middle",lineHeight:1,padding:0}})},dFd0:function(a){a.exports={result:"result__3Uy9H",resultAction:"resultAction__3EQ9Q"}},g3LN:function(a,e,t){"use strict";function n(a){function e(){o.style.color="#673AB7",u.style.transform="translate3d(0,0,0)",u.classList.add("isActive")}function n(){o.style.color="rgba(0,0,0,.5)",u.style.transform="translate3d(-100%,0,0)",u.classList.remove("isActive")}function r(a){(a.keyCode<48||a.keyCode>57)&&a.preventDefault()}function s(){}var o=null,u=null;return t.i(i.h)("label",{className:l.a.TextInput},t.i(i.h)("span",{className:l.a.TextInput_title,ref:function(a){o=a}},a.title),t.i(i.h)("input",{className:l.a.TextInput_input,type:a.type,name:a.name,value:a.Value,placeholder:a.placeholder,maxlength:a.maxlength,onChange:a.onChange,onFocus:e,onBlur:n,onKeyPress:a.isNumeric?r:s}),t.i(i.h)("div",{className:l.a.TextInput_highlight},t.i(i.h)("span",{className:l.a.TextInput_highlightItem,ref:function(a){u=a}})))}e.a=n;var i=t("KM04"),r=(t.n(i),t("ifb1")),l=t.n(r)},ifb1:function(a){a.exports={TextInput:"TextInput__2w7dK",TextInput_title:"TextInput_title__2LaeE",TextInput_input:"TextInput_input__1t_xF",TextInput_highlight:"TextInput_highlight__16Rj0",TextInput_highlightItem:"TextInput_highlightItem__1Sz3I"}},rkZl:function(a){function e(a){var e=["","ribu","juta","milyar","triliun"],t=["nol","satu","dua","tiga","empat","lima","enam","tujuh","delapan","sembilan"],n=["sepuluh","sebelas","dua belas","tiga belas","empat belas","lima belas","enam belas","tujuh belas","delapan belas","sembilan belas"],i=["dua puluh","tiga puluh","empat puluh","lima puluh","enam puluh","tujuh puluh","delapan puluh","sembilan puluh"];if(a=a.toString(),(a=a.replace(/[, ]/g,""))!=parseFloat(a))return"XXXX";var r=a.indexOf(",");if(-1===r&&(r=a.length),r>15)return"nomor terlalu besar";for(var l=a.split(""),s="",o=0,u=0;u<r;u++)(r-u)%3==2?"1"===l[u]?(s+=n[Number(l[u+1])]+" ",u++,o=1):0!==l[u]&&(s+=i[l[u]-2]+" ",o=1):0!==l[u]&&(s+=t[l[u]]+" ",(r-u)%3==0&&(s+="ratus "),o=1),(r-u)%3==1&&(o&&(s+=e[(r-u-1)/3]+" "),o=0);if(r!==a.length){var h=a.length;s+="koma";for(var p=r+1;p<h;p++)s+=t[l[p]]+" "}return s.replace(/\s+/g," ").replace("satu ratus","seratus").replace("satu ribu","seribu").replace("satu puluh","sepuluh")}a.exports=e},sITr:function(a,e,t){"use strict";function n(a,e){if(!a)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?a:e}function i(a,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);a.prototype=Object.create(e&&e.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(a,e):a.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0}),t.d(e,"default",function(){return y});var r=t("KM04"),l=(t.n(r),t("ZAL5")),s=t.n(l),o=t("2AN3"),u=t.n(o),h=t("ZwNj"),p=t("K+dO"),c=t("6ATj"),d=t("crmn"),m=t("TDbV"),g=Object.assign||function(a){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(a[n]=t[n])}return a},f={_id:"3212015607900005",nik:"3212015607900005",fullName:"Jessica Veranda",bornPlace:"jakarta",bornDay:"01",bornMonth:"12",bornYear:"1985",gender:"female",streetAddress:"jalan jakarta 48",rt:"004",rw:"008",kelurahanType:"kelurahan",kelurahanName:"senayan",kecamatan:"senayan",cityType:"kota",cityName:"jakarta pusat",martialStatus:"single",occupation:"idol"},b=t.i(r.h)("h6",null,"Pihak Pertama"),_=t.i(r.h)("i",{class:"material-icons md-24"},"add"),y=function(a){function e(e){var t=n(this,a.call(this,e));return t.state={pihak_1:{},pihak_2:{},modalOpen:!1},t.handleSaveData=t.handleSaveData.bind(t),t.modalOpen=t.modalOpen.bind(t),t.modalClose=t.modalClose.bind(t),t}return i(e,a),e.prototype.handleSaveData=function(a){var e=g({},this.state.pihak_1),t=Object.keys(e).length-1+1;e[""+t]=a,this.setState({pihak_1:e,modalOpen:!1})},e.prototype.modalOpen=function(a){a.preventDefault(),this.setState({modalOpen:!0})},e.prototype.modalClose=function(a){a.preventDefault(),this.setState({modalOpen:!1})},e.prototype.render=function(){var a=this,e=this.state.pihak_1,n=Object.keys(e).map(function(a){return t.i(r.h)("div",{key:e[a].nik},t.i(r.h)(c.a,{gender:e[a].gender,fullName:e[a].fullName,nik:e[a].nik}))}),i=Object.keys(e).map(function(n){return t.i(r.h)("div",{key:e[n].nik},t.i(r.h)(p.a,{dataKTP:e[n],editButton:a.modalOpen}))});return t.i(r.h)("div",{className:s.a.home},t.i(r.h)("div",{className:u.a.flex},t.i(r.h)("div",{className:[u.a.w_50,s.a.Compasitor].join(" ")},t.i(r.h)("div",{className:s.a.party},t.i(r.h)("header",{className:s.a.partyHeader},b),t.i(r.h)("div",{className:s.a.partyList},n),t.i(r.h)("div",{className:s.a.partyFooter},t.i(r.h)(d.a,{onClick:this.modalOpen},_)))),t.i(r.h)("div",{className:[u.a.w_50,s.a.ResultPaper].join(" ")},t.i(r.h)("ol",null,i))),t.i(r.h)(m.a,{isActive:this.state.modalOpen},t.i(r.h)(h.a,{outputData:this.handleSaveData,cancelInput:this.modalClose,inputData:f})))},e}(r.Component)}});
//# sourceMappingURL=route-home.chunk.8b3ac.js.map