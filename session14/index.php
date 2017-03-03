<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <script src = "https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <link rel="stylesheet" href="/css/main.css">
    <title>Session 14</title>

  </head>
  <body>

    <?php
        $foo = 10;

        if($foo == 100){
          echo '<div class=big-' . $foo . '></div>';
        } else {
          echo '<div class=small-' . $foo . '></div>';
        }

        echo '<button class="ref">Refresh</button>';
    ?>

    <script type="text/javascript" src="/Scripts/bundle.js"></script>
  </body>
</html>
