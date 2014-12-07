<!DOCTYPE html>
<html>

<head>
  <title>Treerock - Turtles and the Lindenmayer System</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="shortcut icon" href="http://treerock.me/assets/favicon.ico">
  <link href="css/normalize.css" rel="stylesheet">
  <link href="css/project.css" rel="stylesheet">
  <link href='http://fonts.googleapis.com/css?family=Vollkorn' rel='stylesheet' type='text/css'>
</head>

<body>
	<div class="page-wrapper">
	
		
		<header>
				<h1>Treerock</h1>
				<p class="sub"><span>Turtles, Dragons and Patterns</span></p>
		</header>
			
		
		<!-- section one -->
		<?php include('one.html'); ?>
		<div class="canvas-wrapper" id="one">
			<canvas id="canvasone" width="350" height="300">
				<p>Canvas cannot be displayed.</p>
			</canvas>
			<div class="form-wrapper">
				<div class="buttons turtle-controls"></div>
				<div class="buttons turtle-settings"></div>
			</div>
		</div>
		
		
		<!-- section two -->
		<?php include('two.html'); ?>
		<div class="canvas-wrapper" id="two">
			<canvas id="canvastwo" width="450" height="300">
				<p>Canvas cannot be displayed.</p>
			</canvas>
			<div class="form-wrapper">
				<div class="buttons turtle-string"></div>
				<div class="buttons turtle-controls"></div>
				<div class="buttons turtle-settings"></div>
				<div class="buttons turtle-actions"></div>
			</div>
		</div>
		
		
		<!-- section three -->
		<?php include('one.html'); ?>
		<div class="canvas-wrapper" id="three">
			<canvas id="canvasthree" width="450" height="300">
				<p>Canvas cannot be displayed.</p>
			</canvas>
			<div class="form-wrapper">
				<div class="buttons turtle-controls"></div>
				<div class="buttons turtle-settings"></div>
				<div class="buttons turtle-radio"></div>
				<div class="buttons turtle-ls-settings"></div>
				<div class="buttons turtle-actions"></div>
			</div>
		</div>
	</div><!-- end page-wrapper -->
	<script src="js/mt.js"></script>
	<script src="js/page.js"></script>
	<script id="my-script"></script>
</body>
</html>