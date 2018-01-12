!function(t,n){"use strict";n.module("ngSimpleGrid",["ng"]).directive("simpleGrid",["$compile",function(t){"ngInject";return{restrict:"E",replace:!0,transclude:!0,scope:{ngDataList:"=ngDataList",ngDataClick:"=ngDataClick",ngDataPagination:"=ngDataPagination",ngDataPaginationEnabled:"=ngDataPaginationEnabled",ngDataPaginationEvents:"=ngDataPaginationEvents",ngDataLength:"@ngDataLength",ngDataSingleOrdering:"@ngDataSingleOrdering",ngDataDefaultLength:"=ngDataDefaultLength",ngDataLoading:"=ngDataLoading",ngDataEmptyIcon:"@ngDataEmptyIcon",ngDataEmptyText:"@ngDataEmptyText",$ctrl:"=ngDataCtrl"},template:"<ng-transclude></ng-transclude>",link:function(n,a){var e=function(t,a){var e=t?t.split(","):n.ngDataList?n.ngDataList.length:0,i=[].map.call(e,function(t){return{value:t.trim(),label:t.trim()}});this.fnEvent=a,this.length=i,this.selectLength=i&&i.length>0?i[0].value:n.ngDataList?n.ngDataList.length:0,this.selectLength=n.ngDataDefaultLength&&!Number.isNaN(n.ngDataDefaultLength)?n.ngDataDefaultLength:this.selectLength,this.page=0,this.sortableMap={}};e.prototype={previous:function(){this.page--,this.runFnEvent("previous"),n.$ctrl.previous()},next:function(){this.page++,this.runFnEvent("next"),n.$ctrl.next()},runFnEvent:function(t){var n={};for(var a in this.sortableMap)n[this.getCamelCase(a)]=this.sortableMap[a]?"desc":"asc";this.fnEvent={status:t,page:this.page,length:this.selectLength,sortableMap:n}},setSelectLength:function(){this.runFnEvent("change-length"),n.$ctrl.changePageSize(this.fnEvent.length)},getCamelCase:function(t){return t.replace(/(?:^\w|[A-Z]|\b\w)/g,function(t,n){return 0===n?t.toLowerCase():t.toUpperCase()}).replace(/\s+/g,"")},sortable:function(t){if("true"===n.ngDataSingleOrdering){var a={name:t,value:this.sortableMap[t]};this.sortableMap={},this.sortableMap[a.name]=a.value}!1===this.sortableMap[t]?delete this.sortableMap[t]:this.sortableMap[t]=void 0===this.sortableMap[t]||!this.sortableMap[t],this.runFnEvent("sortable")}};var i={main:function(){i.init(function(){i.load(i.addEventListeners)})},init:function(t){n.pagination=new e(n.ngDataLength,n.ngDataPaginationEvents),t&&t()},load:function(t){i.setTemplate(),t&&t()},addEventListeners:function(){n.getStatusSortable=i.getStatusSortable.bind(i)},render:function(e){t(a.html(e).contents())(n)},getStatusSortable:function(t){if(n.pagination.sortableMap.hasOwnProperty(t))return n.pagination.sortableMap[t]?"arrow_drop_down":"arrow_drop_up"},getColumnsHeader:function(){return[].map.call(a[0].querySelectorAll("header column"),function(t){var n="<md-icon>{{getStatusSortable('"+t.innerHTML+"')}}</md-icon>",a="";return a+='<th class="md-column ng-scope ng-isolate-scope" '+JSON.stringify(t.dataset).replace(/{"/gi,"").replace(/":/gi,"=").replace(/}/gi," ")+">",a+=t.dataset.sortable?'<div style="cursor: pointer;" ng-click="pagination.sortable(\''+t.innerHTML+"')\"><md-icon>sort</md-icon>"+t.innerHTML+n+"</div>":t.innerHTML,a+="</th>"}).join("")},getColumnsBody:function(){var t="";return t+='<tr md-select="item" class="md-row ng-scope ng-isolate-scope md-clickable" aria-disabled="false" ng-repeat="$line in ngDataList" ng-if="!$line.deleted">',t+=[].map.call(a[0].querySelectorAll("list column"),function(t){var n='<td class="md-cell ng-scope md-clickable" role="button" tabindex="0" '+(t.dataset.disabledClick?"":'ng-click="ngDataClick($index, $line)"')+">";return n+=t.dataset.bind?'<abbr title="{{$line.'+t.dataset.bind+'}}">{{$line.'+t.dataset.bind+"}}</abbr>":t.innerHTML,n+="</td>"}).join(""),t+="</tr>"},setTemplate:function(){var t="";t+='<md-table-container ng-show="ngDataLoading || ngDataList.length">',t+='  <table class="md-data-table ng-pristine ng-untouched ng-valid md-table ng-isolate-scope ng-not-empty" multiple="true" aria-invalid="false">',t+='    <thead class="md-head ng-isolate-scope">',t+='      <tr class="md-row">',t+="        "+i.getColumnsHeader(),t+="      </tr>",t+="    </thead>",t+='    <thead class="md-table-progress ng-isolate-scope">',t+="      <tr>",t+='        <th colspan="'+a[0].querySelectorAll("header column").length+'">',t+='          <md-progress-linear md-mode="indeterminate" ng-show="ngDataLoading"></md-progress-linear>',t+="        </th>",t+="      </tr>",t+="    </thead>",t+='    <tbody class="md-body">',t+="      "+i.getColumnsBody(),t+="    </tbody>",t+="  </table>",t+="</md-table-container>",t+='<div class="ng-scope md-table-pagination ng-isolate-scope simple-grid-pagination" aria-hidden="false" ng-if="ngDataPagination" ng-show="ngDataLoading || ngDataList.length">',t+='  <div class="limit-select ng-scope">',t+='    <div class="label ng-binding">Rows per page:</div>',t+='    <md-select aria-label="rows per page selection" class="md-table-select" ng-model="pagination.selectLength" ng-change="pagination.setSelectLength()">',t+='      <md-option id="{{opt.value}}-page" ng-repeat="opt in pagination.length" ng-value="opt.value">',t+="        {{opt.label}}",t+="      </md-option>",t+="    </md-select>",t+="  </div>",t+='  <div class="buttons">',t+='    <button class="md-icon-button md-button md-ink-ripple" type="button" aria-label="Previous" ng-click="pagination.previous()" ng-disabled="!pagination.page">',t+="      <md-icon>keyboard_arrow_left</md-icon>",t+="    </button>",t+='    <button class="md-icon-button md-button md-ink-ripple" type="button" aria-label="Next" ng-click="pagination.next()" ng-disabled="!ngDataPaginationEnabled()">',t+="      <md-icon>keyboard_arrow_right</md-icon>",t+="    </button>",t+="  </div>",t+="</div>",t+='<div class="md-no-results" layout="column" layout-align="center center" ng-show="!ngDataLoading && !ngDataList.length">',t+='  <md-icon class="material-icons">{{ngDataEmptyIcon}}</md-icon>',t+='  <p class="md-body-1">{{ngDataEmptyText}}</p>',t+="</div>",i.render(t)}};i.main()}}}])}(window,window.angular);