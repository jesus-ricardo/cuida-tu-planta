(function () {
  'use strict';

  angular.module('app')
    .controller('MiPlantaDetail', controller);

  function controller($scope, routeSrv, planta, APPCONFIG, misPlantasSrv, $interval, loadingSrv) {

    loadingSrv.disable();
    $scope.goBack = goBack;
    $scope.goRegistro = goRegistro;
    $scope.planta = planta;
    $scope.arduino = false;
    $scope.getUrlPlanta = getUrlPlanta;
    $scope.obtenerEstado = obtenerEstado;
    $scope.data = {
      humedad: '',
      luz: ''
    };
    //var socket = io.connect('http://192.168.1.38:8888');
    ////
    function goRegistro() {
      routeSrv.go('app.mis-plantas.registro-actividad', {id: planta.id});
    }

    function goBack() {
      routeSrv.go('app.mis-plantas.list');

    }

    function getUrlPlanta(fotoPerfil) {
      if (fotoPerfil == null) {
        return null
      }
      console.log(APPCONFIG.ipServer + '/' + fotoPerfil);
      return APPCONFIG.ipServer + '/' + fotoPerfil;
    }





    var intervalPromise;
      intervalPromise = $interval(function () {
        obtenerEstado();
      }, 1000);
      $scope.$on('$destroy', function () {
        loadingSrv.enable();
        if (intervalPromise)
          $interval.cancel(intervalPromise);
      });


    function obtenerEstado() {
      misPlantasSrv.obtenerEstado(planta.id).then(function (data) {
        if(data) {
          $scope.arduino = true;
          $scope.data = {
            humedad: data.humedad,
            luz: data.luz
          }
        }else{
          $scope.arduino = false;
          $interval.cancel(intervalPromise);
        }
      });
    }


    //google charts
    /*google.charts.load("current", {packages:['corechart']});
     google.charts.setOnLoadCallback(drawChart);
     function drawChart() {
     var data = google.visualization.arrayToDataTable([
     ["Element", "Density", { role: "style" } ],
     ["Humedad", 8.94, "#99C7E0"],
     ["PH", 10.49, "silver"],
     ["Luz", 19.30, "gold"]
     ]);

     var view = new google.visualization.DataView(data);
     view.setColumns([0, 1,
     { calc: "stringify",
     sourceColumn: 1,
     type: "string",
     role: "annotation" },
     2]);

     var options = {
     title: "Niveles de la planta",
     width: 600,
     height: 400,
     bar: {groupWidth: "95%"},
     legend: { position: "none" }
     };
     var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
     chart.draw(view, options);
     }*/

  }
}());
