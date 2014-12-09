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
					<div class="form-group rules buttons">
						<label for="ls-axiom">Axiom: </label>
						<input type="text" id="ls-axiom" value=""><br>
						<label for="ls-rule1">Rule One: </label>
						<input type="text" id="ls-rule1" class="rule" value=""><br>
						<label for="ls-rule2">Rule Two: </label>
						<input type="text" id="ls-rule2" class="rule" value=""><br>
						<label for="ls-rule3">Rule Three: </label>
						<input type="text" id="ls-rule3" class="rule" value=""><br>
						<label for="ls-rule4">Rule Four: </label>
						<input type="text" id="ls-rule4" class="rule" value=""><br>
						<label for="ls-rule5">Rule Five: </label>
						<input type="text" id="ls-rule5" class="rule" value=""><br>
					</div>
					<div class="form-group rules  buttons">
						<label for="distance">Line Length: </label>
						<input type="text" id="ls-distance" name="distance"><br>
						<label for="angle">Turn Angle: </label>
						<input type="text" id="ls-angle" name="angle"><br>
						<label for="iterations">Iterations: </label>
						<input type="text" id="ls-iterations" name="iterations"><br>
						<label for="iterations">Start Angle: </label>
						<input type="text" id="ls-start-angle" name="iterations">
						<input type="hidden" id="ls-x" name="position-x">
						<input type="hidden" id="ls-y" name="position-y">
					</div>
				</div>
				<div class="row clearfix">
					<div id="rule-list" class="turtle-radio buttons"><!-- holder for LS Rules Radio Selector--></div>
				</div>
				<div class="row clearfix  buttons">
					<div class="form-group turtle-actions">
						<button name="clear">Clear Drawing</button>
						<button name="ls-go">Go Draw It</button>
					</div>
					<div class="turtle-info form-group">Info
					</div>
				</div>
			</div>
		</div><!-- end page-wrapper -->
		<script src="js/mt.js"></script>
		<script src="js/page.js"></script>
		<script id="my-script"></script>
	</body>
	</html>
