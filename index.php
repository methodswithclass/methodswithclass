<!doctype html>
<html>
  <head>

    <title>Mehtods with Class, LLC</title>

  	<link rel="stylesheet" href="css/museo/museo300.css" type="text/css" charset="utf-8">
    <link rel="stylesheet" href="http://code.methodswithclass.com/api/classes.css">
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
    <div class="absolute min-width-900 fill cutoff deselect museo" id="main">
        <div class="absolute fill scrollY touch" id="body">
            <div ui-view=""></div>

            <div class="relative width height-200">
                <footer></footer>
            </div>

        </div>
    </div>
    <console ng-attr-vis="hide"><console>

    <!-- App -->
    
    <script src="features/app/app.js"></script>

    <!-- Shared -->

    <script src="http://code.methodswithclass.com/api/shared-2.js"></script>
    

    <!-- Console -->

    <script src="http://code.methodswithclass.com/api/console-1.js"></script>

    <!-- State -->

    <script src="features/state/stateModule.js"></script>
    <script src="features/state/states.js"></script>
    <script src="features/state/runtimeState.js"></script>

    <!-- Parallax -->

    <script src="http://code.methodswithclass.com/api/parallax-2.2.js"></script>

    <!-- Interface -->

    <script src="features/interface/uiModule.js"></script>
    <script src="features/interface/block.js"></script> 
    <script src="features/interface/body.js"></script>
    <script src="features/interface/footer.js"></script>
    <script src="features/interface/back.js"></script>
    <script src="features/interface/resume.js"></script>



    <!-- Data -->

    <script src="features/data/dataModule.js"></script>
    <script src="features/data/data.service.js"></script>


  </body>

 

  
</html>