

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>

    <script src = "https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

    <script type="text/javascript">
        $(document).ready(
          request()
        );

        function request() {
          $.ajax({
            url: 'process.php',
            method: 'POST',
            data: {
              loader_type: "menu"
            }
          }).done(onData);
        }

        function onData(data) {
          res = $.parseJSON(data);
          console.log(res);
        }
    </script>
  </body>
</html>
