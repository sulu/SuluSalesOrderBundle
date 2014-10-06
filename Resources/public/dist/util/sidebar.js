define(["app-config","sulusalesorder/model/order"],function(a,b){"use strict";var c={widgetUrls:{orderInfo:"/admin/widget-groups/order-info",orderDetail:"/admin/widget-groups/order-detail{?params*}"}},d=function(){this.sandbox.on("sulu.flow-of-documents.orders.row.clicked",function(a){var b,c;a.route&&(this.sandbox.emit("sulu.router.navigate",a.route),b=a.route.split("/"),c=b[0]+"/"+b[1],this.sandbox.emit("husky.navigation.select-item",c))}.bind(this))},e=function(){this.sandbox.on("husky.datagrid.item.click",function(a){g.call(this,{data:a,callback:function(a,b){this.sandbox.emit("sulu.sidebar.set-widget",c.widgetUrls.orderInfo+"?contact="+a+"&account="+b)}.bind(this)})},this)},f=function(){this.sandbox.dom.off("#sidebar"),this.sandbox.dom.on("#sidebar","click",function(a){var b=this.sandbox.dom.data(a.currentTarget,"id");this.sandbox.emit("sulu.router.navigate","contacts/accounts/edit:"+b+"/details"),this.sandbox.emit("husky.navigation.select-item","contacts/accounts")}.bind(this),"#sidebar-account"),this.sandbox.dom.on("#sidebar","click",function(a){var b=this.sandbox.dom.data(a.currentTarget,"id");this.sandbox.emit("sulu.router.navigate","contacts/contacts/edit:"+b+"/details"),this.sandbox.emit("husky.navigation.select-item","contacts/contacts")}.bind(this),"#sidebar-contact")},g=function(a){if(a&&a.data&&a.callback&&"function"==typeof a.callback){var c,d=b.findOrCreate({id:a.data});d.fetch({success:function(b){c=b.toJSON(),c.account&&c.contact?a.callback(c.contact.id,c.account.id):this.sandbox.logger.error("received invalid data when initializing sidebar",c)}.bind(this),error:function(){this.sandbox.logger.error("error while fetching order")}.bind(this)})}else this.sandbox.logger.error("param for getDataForListSidebar has to be an object with a data attribute and a valid callback (attribute)!")};return{initForDetail:function(b,e){var g,h;this.sandbox=b,e.contact&&e.account&&e.status?(h=this.sandbox.uritemplate.parse(c.widgetUrls.orderDetail),g=h.expand({params:{contact:e.contact.id,account:e.account.id,status:e.status.status,locale:a.getUser().locale,orderDate:e.orderDate,orderNumber:e.number,orderId:e.id}}),this.sandbox.emit("sulu.sidebar.set-widget",g),f.call(this),d.call(this)):this.sandbox.logger.error("required values for sidebar not present!")},initForList:function(a){this.sandbox=a,f.call(this),e.call(this)}}});