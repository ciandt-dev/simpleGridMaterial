!function(t,e){var o=function(t){var e=t.querySelector(".simple-grid-pagination"),a=t.querySelector("#sticky-helper");e&&a&&(t.scrollTop+t.offsetHeight<=a.offsetTop+56?(e&&e.classList.add("sticky"),a&&a.classList.add("sticky-helper")):(e&&e.classList.remove("sticky"),a&&a.classList.remove("sticky-helper")))};e.module("ngSimpleGrid",["ng"]).directive("scroll",[function(){"ngInject";return{restrict:"A",link:function(t,e){e.on("scroll",function(){e[0].querySelector(".simple-grid-pagination")&&o(e[0])})}}}]).directive("simpleGrid",["$compile","$document","$timeout",function(l,r,s){"ngInject";return{restrict:"E",replace:!0,transclude:!0,scope:{ngDataList:"=ngDataList",ngDataClick:"=ngDataClick",ngDataPagination:"=ngDataPagination",ngDataPaginationEnabled:"=ngDataPaginationEnabled",ngDataPaginationEvents:"=ngDataPaginationEvents",ngDataPageReset:"=ngDataPageReset",ngDataLength:"@ngDataLength",ngDataSingleOrdering:"@ngDataSingleOrdering",ngDataDefaultLength:"=ngDataDefaultLength",ngDataLoading:"=ngDataLoading",ngDataEmptyIcon:"@ngDataEmptyIcon",ngDataEmptyText:"@ngDataEmptyText",$ctrl:"=ngDataCtrl"},template:"<ng-transclude></ng-transclude>",link:function(i,e){i.$watch("ngDataList",function(){var t=r[0].querySelector("[scroll]");s(function(){o(t)},10)});var a=function(t,e){var a=t?t.split(","):i.ngDataList?i.ngDataList.length:0,n=[].map.call(a,function(t){return{value:t.trim(),label:t.trim()}});this.fnEvent=e,this.length=n,this.selectLength=n&&0<n.length?n[0].value:i.ngDataList?i.ngDataList.length:0,this.selectLength=i.ngDataDefaultLength&&!Number.isNaN(i.ngDataDefaultLength)?i.ngDataDefaultLength:this.selectLength,this.page=0,this.sortableMap={}};a.prototype={previous:function(){this.page--,this.runFnEvent("previous"),i.$ctrl.previous()},next:function(){this.page++,this.runFnEvent("next"),i.$ctrl.next()},resetPage:function(){this.page=0},runFnEvent:function(t){var e={};for(var a in this.sortableMap)e[this.getCamelCase(a)]=this.sortableMap[a]?"desc":"asc";this.fnEvent={status:t,page:this.page,length:this.selectLength,sortableMap:e}},setSelectLength:function(){this.page=0,this.runFnEvent("change-length"),i.$ctrl.changePageSize(this.fnEvent.length)},getCamelCase:function(t){return t.replace(/(?:^\w|[A-Z]|\b\w)/g,function(t,e){return 0===e?t.toLowerCase():t.toUpperCase()}).replace(/\s+/g,"")},sortable:function(t){if("true"===i.ngDataSingleOrdering){var e={name:t,value:this.sortableMap[t]};this.sortableMap={},this.sortableMap[e.name]=e.value}!1===this.sortableMap[t]?delete this.sortableMap[t]:this.sortableMap[t]=void 0===this.sortableMap[t]||!this.sortableMap[t],this.runFnEvent("sortable")}};var n={main:function(){n.init(function(){n.load(n.addEventListeners)})},init:function(t){i.ngDataPagination&&(i.pagination=new a(i.ngDataLength,i.ngDataPaginationEvents)),t&&t()},load:function(t){n.setTemplate(),t&&t()},addEventListeners:function(){i.getStatusSortable=n.getStatusSortable.bind(n),i.ngDataPagination&&(i.ngDataPageReset=i.pagination.resetPage.bind(i.pagination))},render:function(t){l(e.html(t).contents())(i)},getStatusSortable:function(t){if(i.pagination.sortableMap.hasOwnProperty(t))return i.pagination.sortableMap[t]?"arrow_drop_down":"arrow_drop_up"},getColumnsHeader:function(){return[].map.call(e[0].querySelectorAll("header column"),function(t){var e="<md-icon>{{getStatusSortable('"+t.innerHTML+"')}}</md-icon>",a="";return a+="<th "+JSON.stringify(t.dataset).replace(/{"/gi,"").replace(/":/gi,"=").replace(/}/gi," ")+">",a+=t.dataset.sortable?"<div ng-click=\"pagination.sortable('"+t.innerHTML+"')\"><md-icon>sort</md-icon>"+t.innerHTML+e+"</div>":t.innerHTML,a+="</th>"}).join("")},getColumnsBody:function(){var t="";return t+='<tr id="row{{$index}}" class="clickable" md-select="item" aria-disabled="false" ng-repeat="$line in ngDataList" ng-if="!$line.deleted">',t+=[].map.call(e[0].querySelectorAll("list column"),function(t){var e,a=t.dataset.filter?" | "+t.dataset.filter:"";return t.dataset.bind?(e='<td id="row{{$index}}.'+t.dataset.bind+' "role="button" '+JSON.stringify(t.dataset).replace(/{"/gi,"").replace(/":/gi,"=").replace(/}/gi," ")+(t.dataset.disabledClick?"":'ng-click="ngDataClick($index, $line)"')+">",e+='<abbr title="{{$line.'+t.dataset.bind+a+'}}">{{$line.'+t.dataset.bind+a+"}}</abbr>"):(e='<td id="row{{$index}}.actions" role="button" '+JSON.stringify(t.dataset).replace(/{"/gi,"").replace(/":/gi,"=").replace(/}/gi," ")+(t.dataset.disabledClick?"":'ng-click="ngDataClick($index, $line)"')+">",e+=t.dataset.template?i.$ctrl[t.dataset.template]:t.innerHTML.replace("\x3c!--grid","").replace("grid--\x3e","")),e+="</td>"}).join(""),t+="</tr>"},setTemplate:function(){var t="";t+='<table id="simple-grid-table" class="simple-grid" ng-show="ngDataLoading || ngDataList.length" multiple="true" aria-invalid="false">',t+='  <thead id="simple-grid-header">',t+="    <tr>",t+="      "+n.getColumnsHeader(),t+="    </tr>",t+="  </thead>",t+='  <thead class="table-progress">',t+="    <tr>",t+='      <th colspan="'+e[0].querySelectorAll("header column").length+'">',t+='        <md-progress-linear md-mode="indeterminate" ng-show="ngDataLoading"></md-progress-linear>',t+="      </th>",t+="    </tr>",t+="  </thead>",t+="  <tbody>",t+="    "+n.getColumnsBody(),t+="  </tbody>",t+="</table>",t+='<div id="sticky-helper"><div>',t+='<div class="simple-grid-pagination" layout="row" layout-align="end center" aria-hidden="false" ng-if="ngDataPagination" ng-show="ngDataLoading || ngDataList.length">',t+='  <div class="limit-select" layout="row" layout-align="center center">',t+='    <p class="label">Rows per page:</p>',t+='    <md-select id="pages-select" aria-label="rows per page selection" ng-model="pagination.selectLength" ng-change="pagination.setSelectLength()">',t+='      <md-option id="opt{{$index}}" ng-repeat="opt in pagination.length" ng-value="opt.value">',t+="        {{opt.label}}",t+="      </md-option>",t+="    </md-select>",t+="  </div>",t+='  <div class="buttons">',t+='    <md-button id="previous-page" class="md-icon-button" aria-label="previous page" ng-click="pagination.previous()" ng-disabled="!pagination.page">',t+="      <md-icon>keyboard_arrow_left</md-icon>",t+="    </md-button>",t+='    <md-button id="next-page" class="md-icon-button" aria-label="next page" ng-click="pagination.next()" ng-disabled="!ngDataPaginationEnabled()">',t+="      <md-icon>keyboard_arrow_right</md-icon>",t+="    </md-button>",t+="  </div>",t+="</div>",t+='<div class="simple-grid-no-results" layout="column" layout-align="center center" ng-show="!ngDataLoading && !ngDataList.length">',t+='  <md-icon class="material-icons">{{ngDataEmptyIcon}}</md-icon>',t+='  <p class="md-body-1">{{ngDataEmptyText}}</p>',t+="</div>",n.render(t)}};n.main()}}}])}(window,window.angular);