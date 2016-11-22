define(function (require) {
 
 var module = require('modules').get('kibana/traffic_light_vis', ['kibana']);
 
 module.controller('TrafficLightVisController', function ($scope, Private) {
   var tabifyAggResponse = Private(require('components/agg_response/tabify/tabify'));
 
   var metrics = $scope.metrics = [];
 
   $scope.processTableGroups = function (tableGroups) {
     tableGroups.tables.forEach(function (table) {
       table.columns.forEach(function (column, i) {
         metrics.push({
           label: column.title,
           value: table.rows[0][i]
         });
       });
     });
   };
 
   $scope.$watch('esResponse', function (resp) {
     if (resp) {
       metrics.length = 0;
       $scope.processTableGroups(tabifyAggResponse($scope.vis, resp));
     }
   });
 });
});
