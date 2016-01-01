<!doctype html>
<html>
  <head>

  	<link rel="stylesheet" href="css/museo/museo300.css" type="text/css" charset="utf-8">
    <link rel="stylesheet" href="http://code.methodswithclass.com/classes.css">
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">


    <script src="js/libs/jquery-1.11.3.min.js"></script>
    <script src="js/libs/jquery.scrollto.js"></script>
    <script src="js/libs/hammer.js"></script>
    <script src="js/libs/angular.min.js"></script>
    <script src="js/libs/angular-route.min.js"></script>
    <script src="js/libs/angular.ui-router.min.js"></script>
    <script src="js/libs/jquery.hammer.js"></script>

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

    <!-- <script src="features/shared/shared.module.js"></script>
    // <script src="features/shared/on-tap.directive.js"></script>
    // <script src="features/shared/on-press.directive.js"></script>
    // <script src="features/shared/on-press-up.directive.js"></script>
    // <script src="features/shared/global.service.js"></script>
    // <script src="features/shared/events.service.js"></script>
    // <script src="features/shared/send.service.js"></script> -->

    <script src="http://code.methodswithclass.com/shared-2.js"></script>
    

    <!-- Console -->

    <script src="features/console/console.module.js"></script>
    <script src="features/console/console.directive.js"></script>
    <script src="features/console/console.service.js"></script>

    <!-- State -->

    <script src="features/state/stateModule.js"></script>
    <script src="features/state/states.js"></script>
    <script src="features/state/runtimeState.js"></script>

    <!-- Parallax -->

    <script src="http://code.methodswithclass.com/parallax-2.1.js"></script>
    <!--<script src="js/native/parallax-2.1.js"></script>-->

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