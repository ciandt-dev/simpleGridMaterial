!function(t,a){"use strict";a.module("ngSimpleGrid",["ng"]).directive("simpleGrid",["$compile",function(t){"ngInject";return{restrict:"E",replace:!0,transclude:!0,scope:{ngDataList:"=ngDataList",ngDataClick:"=ngDataClick",ngDataPagination:"=ngDataPagination",ngDataPaginationEnabled:"=ngDataPaginationEnabled",ngDataPaginationEvents:"=ngDataPaginationEvents",ngDataLength:"@ngDataLength",ngDataSingleOrdering:"@ngDataSingleOrdering",ngDataDefaultLength:"=ngDataDefaultLength",ngDataLoading:"=ngDataLoading",ngDataEmptyIcon:"@ngDataEmptyIcon",ngDataEmptyText:"@ngDataEmptyText",$ctrl:"=ngDataCtrl"},template:"<ng-transclude></ng-transclude>",link:function(a,n){var e=function(t,n){var e=t?t.split(","):a.ngDataList?a.ngDataList.length:0,i=[].map.call(e,function(t){return{value:t.trim(),label:t.trim()}});this.fnEvent=n,this.length=i,this.selectLength=i&&i.length>0?i[0].value:a.ngDataList?a.ngDataList.length:0,this.selectLength=a.ngDataDefaultLength&&!Number.isNaN(a.ngDataDefaultLength)?a.ngDataDefaultLength:this.selectLength,this.page=0,this.sortableMap={}};e.prototype={previous:function(){this.page--,this.runFnEvent("previous"),a.$ctrl.previous()},next:function(){this.page++,this.runFnEvent("next"),a.$ctrl.next()},runFnEvent:function(t){var a={};for(var n in this.sortableMap)a[this.getCamelCase(n)]=this.sortableMap[n]?"desc":"asc";this.fnEvent={status:t,page:this.page,length:this.selectLength,sortableMap:a}},setSelectLength:function(){this.page=0,this.runFnEvent("change-length"),a.$ctrl.changePageSize(this.fnEvent.length)},getCamelCase:function(t){return t.replace(/(?:^\w|[A-Z]|\b\w)/g,function(t,a){return 0===a?t.toLowerCase():t.toUpperCase()}).replace(/\s+/g,"")},sortable:function(t){if("true"===a.ngDataSingleOrdering){var n={name:t,value:this.sortableMap[t]};this.sortableMap={},this.sortableMap[n.name]=n.value}!1===this.sortableMap[t]?delete this.sortableMap[t]:this.sortableMap[t]=void 0===this.sortableMap[t]||!this.sortableMap[t],this.runFnEvent("sortable")}};var i={main:function(){i.init(function(){i.load(i.addEventListeners)})},init:function(t){a.pagination=new e(a.ngDataLength,a.ngDataPaginationEvents),t&&t()},load:function(t){i.setTemplate(),t&&t()},addEventListeners:function(){a.getStatusSortable=i.getStatusSortable.bind(i)},render:function(e){t(n.html(e).contents())(a)},getStatusSortable:function(t){if(a.pagination.sortableMap.hasOwnProperty(t))return a.pagination.sortableMap[t]?"arrow_drop_down":"arrow_drop_up"},getColumnsHeader:function(){return[].map.call(n[0].querySelectorAll("header column"),function(t){var a="<md-icon>{{getStatusSortable('"+t.innerHTML+"')}}</md-icon>",n="";return n+="<th "+JSON.stringify(t.dataset).replace(/{"/gi,"").replace(/":/gi,"=").replace(/}/gi," ")+">",n+=t.dataset.sortable?"<div ng-click=\"pagination.sortable('"+t.innerHTML+"')\"><md-icon>sort</md-icon>"+t.innerHTML+a+"</div>":t.innerHTML,n+="</th>"}).join("")},getColumnsBody:function(){var t="";return t+='<tr id="row{{$index}}" class="clickable" md-select="item" aria-disabled="false" ng-repeat="$line in ngDataList" ng-if="!$line.deleted">',t+=[].map.call(n[0].querySelectorAll("list column"),function(t){var n,e=t.dataset.filter?" | "+t.dataset.filter:"";return t.dataset.bind?(n='<td id="row{{$index}}.'+t.dataset.bind+' "role="button" tabindex="0"'+(t.dataset.disabledClick?"":'ng-click="ngDataClick($index, $line)"')+">",n+='<abbr title="{{$line.'+t.dataset.bind+e+'}}">{{$line.'+t.dataset.bind+e+"}}</abbr>",n+="</td>"):(n='<td id="row{{$index}}.actions" "role="button" tabindex="0"'+(t.dataset.disabledClick?"":'ng-click="ngDataClick($index, $line)"')+">",n+=t.dataset.template?a.$ctrl[t.dataset.template]:t.innerHTML,n+="</td>")}).join(""),t+="</tr>"},setTemplate:function(){var t="";t+='<table id="simple-grid-table" class="simple-grid" ng-show="ngDataLoading || ngDataList.length" multiple="true" aria-invalid="false">',t+='  <thead id="simple-grid-header">',t+="    <tr>",t+="      "+i.getColumnsHeader(),t+="    </tr>",t+="  </thead>",t+='  <thead class="table-progress">',t+="    <tr>",t+='      <th colspan="'+n[0].querySelectorAll("header column").length+'">',t+='        <md-progress-linear md-mode="indeterminate" ng-show="ngDataLoading"></md-progress-linear>',t+="      </th>",t+="    </tr>",t+="  </thead>",t+="  <tbody>",t+="    "+i.getColumnsBody(),t+="  </tbody>",t+="</table>",t+='<div class="simple-grid-pagination" layout="row" layout-align="end center" aria-hidden="false" ng-if="ngDataPagination" ng-show="ngDataLoading || ngDataList.length">',t+='  <div class="limit-select" layout="row" layout-align="center center">',t+='    <p class="label">Rows per page:</p>',t+='    <md-select id="pages-select" aria-label="rows per page selection" ng-model="pagination.selectLength" ng-change="pagination.setSelectLength()">',t+='      <md-option id="opt{{$index}}" ng-repeat="opt in pagination.length" ng-value="opt.value">',t+="        {{opt.label}}",t+="      </md-option>",t+="    </md-select>",t+="  </div>",t+='  <div class="buttons">',t+='    <button id="previous-page" class="md-icon-button md-button md-ink-ripple" type="button" aria-label="Previous" ng-click="pagination.previous()" ng-disabled="!pagination.page">',t+="      <md-icon>keyboard_arrow_left</md-icon>",t+="    </button>",t+='    <button id="next-page" class="md-icon-button md-button md-ink-ripple" type="button" aria-label="Next" ng-click="pagination.next()" ng-disabled="!ngDataPaginationEnabled()">',t+="      <md-icon>keyboard_arrow_right</md-icon>",t+="    </button>",t+="  </div>",t+="</div>",t+='<div class="md-no-results" layout="column" layout-align="center center" ng-show="!ngDataLoading && !ngDataList.length">',t+='  <md-icon class="material-icons">{{ngDataEmptyIcon}}</md-icon>',t+='  <p class="md-body-1">{{ngDataEmptyText}}</p>',t+="</div>",i.render(t)}};i.main()}}}])}(window,window.angular);