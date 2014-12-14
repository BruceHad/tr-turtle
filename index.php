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
			<canvas id="canvasone" width="450" height="300">
				<p>Canvas cannot be displayed.</p>
			</canvas>
			<div class="form-wrapper">
				<div class="buttons turtle-controls">
					<button name="left">Left</button>
					<button name="forward">Forward</button>
					<button name="right">Right</button>
				</div>
				<div class="buttons turtle-settings">
					<label for="distance">Line Length: </label>
					<input type="text" id="distance" name="distance" value="10"><br>
				</div>
				<div class="buttons turtle-actions">
					<button name="clear">Clear Drawing</button>
				</div>
			</div>
		</div>


		<!-- section two -->
		<?php include('two.html'); ?>
		<div class="canvas-wrapper" id="two">
			<canvas id="canvastwo" width="450" height="300">
				<p>Canvas cannot be displayed.</p>
			</canvas>
			<div class="form-wrapper">
				<div class="buttons turtle-queue">
					<label for="tt-string">Command Window: </label>
					<textarea id="tt-string" name="tt-string" value=""></textarea>
					<button name="add-left">Queue Left</button>
					<button name="add-forward">Queue Forward</button>
					<button name="add-right">Queue Right</button>
				</div>
				<div class="buttons turtle-settings">
					<label for="distance">Line Length: </label>
					<input type="text" id="tt-distance" name="distance" value="10"><br>
				</div>
				<div class="buttons turtle-actions">
					<button name="clear">Clear Drawing</button>
					<button name="tt-go">Go Draw It</button>
				</div>
			</div>
		</div>



		<!-- section three -->
		<?php include('three.html'); ?>
		<div class="canvas-wrapper" id="three">
			<canvas id="canvasthree" width="450" height="300">
				<p>Canvas cannot be displayed.</p>
			</canvas>
			<div class="form-wrapper" id="ls-form">
				<div class="row clearfix">
					<div id="rule-list" class="turtle-radio buttons"><!-- holder for LS Rules Radio Selector--></div>
				</div>
				<div class="row clearfix  buttons">
					<div class="form-group turtle-actions">
						<button name="clear">Clear Drawing</button>
						<button name="ls-go">Go Draw It</button>
					</div>
					<div class="turtle-info form-group">
						Command String Length: 	<span id="string-length"></span><br>
						Lines Drawn: 						<span id="lines-drawn"></span>
					</div>
				</div>
			</div>
		</div><!-- end page-wrapper -->
		<script src="js/mt.js"></script>
		<script src="js/page.js"></script>
		<script id="my-script"></script>
	</body>
	</html>
