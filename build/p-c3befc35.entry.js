import{r as t,h as l,H as o}from"./p-384e1fb1.js";const e=":host{display:block}table{border-collapse:collapse}table thead td{background-color:#54585d;color:#ffffff;font-weight:bold;border:1px solid #54585d}table tbody td{color:#636363;border:1px solid #dddfe1;min-width:60px}table tbody tr{background-color:#f9fafb}table tbody tr:nth-child(odd){background-color:#ffffff}";const d=class{constructor(l){t(this,l);this.data=[];this.limit=10;this.header=[]}componentWillLoad(){this.updateTable(this.data)}updateTable(t){console.log("new data",{newData:t,length:t.length});if(t.length>0){this.header=Object.keys(t[0]);console.log("header",{header:this.header,keys:Object.keys(t[0])})}}render(){return l(o,null,l("slot",null),l("table",null,l("thead",null,this.header.map((t=>l("th",null,t)))),l("tbody",null,this.data.slice(0,this.limit).map((t=>l("tr",null,this.header.map((o=>l("td",null,t[o])))))))))}static get watchers(){return{data:["updateTable"]}}};d.style=e;export{d as hub_table};
//# sourceMappingURL=p-c3befc35.entry.js.map