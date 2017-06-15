<!DOCTYPE html>

<html>

<head>

    <link rel="stylesheet" href="app.css">

    <meta charset="utf-8">

    <meta name="viewport" content="width=device-width">

    <title></title>

    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.js"></script>

    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular-route.js"></script>
    <script type="text/javascript" src="bower_components/angular-local-storage/dist/angular-local-storage.min.js">

    </script>
</head>

<body>

	<div ng-app="limitlessTestApp">
  <a href="#!/red">Red Page</a>

  <div ng-view></div>
	</div>


	<script src="app.js"></script>
  <script type="text/javascript" src="account-data-model.js"> </script>
  <script type="text/javascript" src="app.controller.js"></script>
  <script type="text/javascript" src="app.red.controller.js"></script>
</body>
</html>
