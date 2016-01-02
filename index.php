<!doctype html>
<html>
  <head>

  	<link rel="stylesheet" href="css/museo/museo300.css" type="text/css" charset="utf-8">
    <link rel="stylesheet" href="http://code.methodswithclass.com/classes.css">
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">


    <script src="libs/jquery-1.11.3.min.js"></script>
    <script src="libs/jquery.scrollto.js"></script>
    <script src="libs/hammer.js"></script>
    <script src="libs/angular.min.js"></script>
    <script src="libs/angular-route.min.js"></script>
    <script src="libs/angular.ui-router.min.js"></script>
    <script src="libs/jquery.hammer.js"></script>

    <base href="/">

  </head>
  <body ng-app="methodswithclass">
    <div class="absolute min-width-900 fill cutoff deselect transparent-back" id="main" ng-controller="MainController as main">
        <div class="absolute width height corner scrollY touch noedge transparent-back" id="body">
            <div ui-view=""></div>
        </div>
        <div ui-view="modal" autoscroll="false"></div>
    </div>
    <console ng-attr-vis="hide"><console>

    <!-- App -->
    
    <script src="features/app/app.js"></script>

    <!-- Shared -->

    <script src="http://code.methodswithclass.com/shared-2.js"></script>
    

    <!-- Console -->

    <script src="http://code.methodswithclass.com/console-1.js"></script>

    <!-- State -->

    <script src="features/state/stateModule.js"></script>
    <script src="features/state/states.js"></script>
    <script src="features/state/runtimeState.js"></script>

    <!-- Parallax -->

    <script src="http://code.methodswithclass.com/parallax-2.1.js"></script>

    <!-- Interface -->

    <script src="features/interface/uiModule.js"></script>
    <script src="features/interface/MainController.js"></script>
    <script src="features/interface/contact.js"></script>
    <script src="features/interface/block.js"></script> 
    <script src="features/interface/body.js"></script>
    <script src="features/interface/repeat.directive.js"></script>
    <script src="features/interface/footer.js"></script>
    <script src="features/interface/back.js"></script>


    <!-- Data -->

    <script src="features/data/dataModule.js"></script>
    <script src="features/data/data.service.js"></script>


  </body>

 

  
</html>