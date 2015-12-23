<!doctype html>
<html>
  <head>

    <?php
        error_reporting(E_ALL);
        // I don't know if you need to wrap the 1 inside of double quotes.
        ini_set("display_startup_errors",1);
        ini_set("display_errors",1);

        $SITE_ROOT = "http://gentlephrasing.herokuapp.com/data.json";

        if (isset($_GET['b'])) {
            $id = $_GET['b'];
        } else {
            $id = "home";
        };

        $jsonData = getData($SITE_ROOT);
        makePage($jsonData, $id);

        function getData($siteRoot) {
            
            $rawData = file_get_contents($siteRoot);

            return json_decode($rawData, true);
        }

        function makePage($data, $blog) {
        ?>

            <meta property='fb:app_id' content='696572137111194'/>
            <meta property='og:url' content=<?php 

                    $base = "http://www.gentlephrasing.com";

                    $param = "";

                    if ($blog != "home") {
                        $param = "/?b=".$blog;
                    }

                    echo $base . $param;

                ?> 
            />

            <meta property="og:type" content=<?php  

                    if ($blog != "home") {

                        echo "article";
                    }
                    else {
                        echo "website";
                    }

                ?> 
            />

            <meta property='og:site_name' content="Gentle Phrasing"/>
            <meta property='og:title' content=<?php echo $data[$blog]["title"] ?> />
            <meta property='og:description' content=<?php echo $data[$blog]["description"] ?> />
            <meta property='og:image' content=<?php echo $data[$blog]["image"] ?> />
            <meta property="og:image:width" content=<?php echo $data[$blog]["size"]["width"] ?> />
            <meta property="og:image:height" content=<?php echo $data[$blog]["size"]["height"] ?> />

        <?php
        }
    
    ?>

  	<link rel="stylesheet" href="css/museo/museo300.css" type="text/css" charset="utf-8">
    <link rel="stylesheet" href="css/classes.css">
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">

    <script src="js/native/whatdevice.js"></script>
    <script src="js/libs/jquery-1.11.3.min.js"></script>
    <script src="js/libs/jquery.scrollto.js"></script>
    <script src="js/libs/hammer.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.16/angular.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.16/angular-route.js"></script>
    <script src="js/libs/angular.ui-router.min.js"></script>
    <script src="js/libs/jquery.hammer.js"></script>

    <script>
        (function(d, s, id){
             var js, fjs = d.getElementsByTagName(s)[0];
             if (d.getElementById(id)) {return;}
             js = d.createElement(s); js.id = id;
             js.src = "//connect.facebook.net/en_US/sdk.js";
             fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        !function(d,s,id){
            var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';
            if(!d.getElementById(id)){
                js=d.createElement(s);
                js.id=id;
                js.src=p+'://platform.twitter.com/widgets.js';
                fjs.parentNode.insertBefore(js,fjs);
            }
        }(document, 'script', 'twitter-wjs');
        
    </script>
    
    <base href="/">

  </head>
  <body ng-app="blog">
    <div class="absolute min-width-900 fill cutoff deselect" id="main" ng-controller="blogCtrl as main">
      <div ui-view=""></div>
      <div ui-view="modal" autoscroll="false"></div>
    </div>
    <console ng-attr-vis="hide"><console>
    

    <!-- App -->
    
    <script src="features/app/app.js"></script>

    <!-- Validate -->

    <script src="features/validate/validateModule.js"></script>
    <script src="features/validate/validate.service.js"></script>
    <script src="features/validate/validate.wrapper.js"></script>

    <!-- Shared -->

    <script src="features/shared/shared.module.js"></script>
    <script src="features/shared/on-tap.directive.js"></script>
    <script src="features/shared/on-press.directive.js"></script>
    <script src="features/shared/on-press-up.directive.js"></script>
    <script src="features/shared/global.service.js"></script>
    <script src="features/shared/events.service.js"></script>
    <script src="features/shared/send.service.js"></script>
    

    <!-- Console -->

    <script src="features/console/console.module.js"></script>
    <script src="features/console/console.directive.js"></script>
    <script src="features/console/console.service.js"></script>

    <!-- State -->

    <script src="features/state/stateModule.js"></script>
    <script src="features/state/states.js"></script>
    <script src="features/state/runtimeState.js"></script>

    <!-- Parallax -->

    <script src="features/parallax/parallaxModule.js"></script>
    <script src="features/parallax/parallaxService.js"></script>
    <script src="features/parallax/parallax.js"></script>

    <!-- Badges -->

    <script src="features/badges/badgesModule.js"></script>
    <script src="features/badges/share.js"></script>

    <!-- Blog -->

    <script src="features/blog/blogModule.js"></script>
    <script src="features/blog/blogCtrl.js"></script>
    <script src="features/blog/content.js"></script>
    <script src="features/blog/section.js"></script> 
    <script src="features/blog/btn.js"></script>
    <script src="features/blog/redirect.js"></script>
    <script src="features/blog/body.js"></script>
    <script src="features/blog/repeat.directive.js"></script>
    <script src="features/blog/rotatable.js"></script>
    <script src="features/blog/footer.js"></script>
    <script src="features/blog/back.js"></script>
    <script src="features/blog/angulike.module.js"></script>


    <!-- Data -->

    <script src="features/data/dataModule.js"></script>
    <script src="features/data/blog.service.js"></script>
    <script src="features/data/data.service.js"></script>


  </body>

 

  
</html>