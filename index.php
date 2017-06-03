<<<<<<< HEAD
<?php
	$str_browser_language = !empty($_SERVER['HTTP_ACCEPT_LANGUAGE']) ? strtok(strip_tags($_SERVER['HTTP_ACCEPT_LANGUAGE']), ',') : '';
	$str_browser_language = !empty($_GET['language']) ? $_GET['language'] : $str_browser_language;
	switch (substr($str_browser_language, 0,2))
	{
		case 'de':
			$str_language = 'de';
			break;
		case 'en':
			$str_language = 'en';
			break;
		default:
			$str_language = 'en';
	}
    
	$arr_available_languages = array();
	$arr_available_languages[] = array('str_name' => 'English', 'str_token' => 'en');
	$arr_available_languages[] = array('str_name' => 'Deutsch', 'str_token' => 'de');
    
	$str_available_languages = (string) '';
	foreach ($arr_available_languages as $arr_language)
	{
		if ($arr_language['str_token'] !== $str_language)
		{
			$str_available_languages .= '<a href="'.strip_tags($_SERVER['PHP_SELF']).'?language='.$arr_language['str_token'].'" lang="'.$arr_language['str_token'].'" xml:lang="'.$arr_language['str_token'].'" hreflang="'.$arr_language['str_token'].'">'.$arr_language['str_name'].'</a> | ';
		}
	}
	$str_available_languages = substr($str_available_languages, 0, -3);
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head lang="<?php echo $str_language; ?>" xml:lang="<?php echo $str_language; ?>">
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<title>MAMP PRO</title>
<style type="text/css">
    body {
        font-family: Arial, Helvetica, sans-serif;
        font-size: .9em;
        color: #000000;
        background-color: #FFFFFF;
        margin: 0;
        padding: 10px 20px 20px 20px;
    }

    samp {
        font-size: 1.3em;
    }

    a {
        color: #000000;
        background-color: #FFFFFF;
    }

    sup a {
        text-decoration: none;
    }

    hr {
        margin-left: 90px;
        height: 1px;
        color: #000000;
        background-color: #000000;
        border: none;
    }

    #logo {
        margin-bottom: 10px;
        margin-left: 28px;
    }

    .text {
        width: 80%;
        margin-left: 90px;
        line-height: 140%;
    }
</style>
</head>

<body>
    <p><img src="MAMP-PRO-Logo.png" id="logo" alt="MAMP PRO Logo" width="250" height="49" /></p>

<?php if ($str_language == 'de'): ?>

    <p class="text"><strong>Der virtuelle <span lang="en" xml:lang="en">Host</span> wurde erfolgreich eingerichtet.</strong></p>
    <p class="text">Wenn Sie diese Seite sehen, dann bedeutet dies, dass der neue virtuelle <span lang="en" xml:lang="en">Host</span> erfolgreich eingerichtet wurde. Sie können jetzt Ihren <span lang="en" xml:lang="en">Web</span>-Inhalt hinzufügen, diese Platzhalter-Seite<sup><a href="#footnote_1">1</a></sup> sollten Sie ersetzen <abbr title="beziehungsweise">bzw.</abbr> löschen.</p>
    <p class="text">
        Server-Name: <samp><?php echo $_SERVER['SERVER_NAME']; ?></samp><br />
        Document-Root: <samp><?php echo $_SERVER['DOCUMENT_ROOT']; ?></samp>
    </p>
    <p class="text" id="footnote_1"><small><sup>1</sup> Dateien: <samp>index.php</samp> und <samp>MAMP-PRO-Logo.png</samp></small></p>
    <hr />
    <p class="text">This page in: <?php echo $str_available_languages; ?></p>

<?php elseif ($str_language == 'en'): ?>

    <p class="text"><strong>The virtual host was set up successfully.</strong></p>
    <p class="text">If you can see this page, your new virtual host was set up successfully. Now, web content can be added and this placeholder page<sup><a href="#footnote_1">1</a></sup> should be replaced or deleted.</p>
    <p class="text">
        Server name: <samp><?php echo $_SERVER['SERVER_NAME']; ?></samp><br />
        Document root: <samp><?php echo $_SERVER['DOCUMENT_ROOT']; ?></samp>
    </p>
    <p class="text" id="footnote_1"><small><sup>1</sup> Files: <samp>index.php</samp> and <samp>MAMP-PRO-Logo.png</samp></small></p>
    <hr />
    <p class="text">Diese Seite auf: <?php echo $str_available_languages; ?></p>

<?php endif; ?>

</body>
=======
<!doctype html>
<html>
  <head>

    <title>Methods with Class, LLC</title>

  	<link rel="stylesheet" href="css/museo/museo300.css" type="text/css" charset="utf-8">
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">

    <link rel="stylesheet" href="http://code.methodswithclass.com/api/classes.css">
    <link rel="stylesheet" href="css/styles.css">


    


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

    <script src="http://code.methodswithclass.com/api/parallax-3.js"></script>


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

 

  
>>>>>>> 38d6b12f3c7c63afd1a9a0b2c39c3720401601ac
</html>