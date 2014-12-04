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
  <header>
    <div class="container">
      <h1>Treerock</h1>
      <p class="sub"><span>Turtles, Dragons and Patterns</span></p>
    </div>
  </header>
	<div class="page-wrapper">
		
		
		<?php include('one.html'); ?>
		<div class="canvas-wrapper" id="one">
			<canvas id="canvasone" width="450" height="300">
				<p>Canvas cannot be displayed.</p>
			</canvas>
			<div class="form-wrapper buttons">
				<button name="left" class="line one">Left</button>
				<button name="forward" class="line one">Forward</button>
				<button name="right" class="line one">Right</button>
				<br />
				<button name="clear" class="line two">Clear</button>
			</div>
		</div>
		
		
		<?php include('two.html'); ?>
		<div class="canvas-wrapper" id="two">
			<canvas id="canvastwo" width="450" height="300">
				<p>Canvas cannot be displayed.</p>
			</canvas>
			<div class="form-wrapper buttons">
				<label for="tt-string">Command Window: </label><br>
				<input type="text" id="tt-string" value="">
				<button name="tt-left" class="line one">Left</button>
				<button name="tt-forward" class="line one">Forward</button>
				<button name="tt-right" class="line one">Right</button>
				<br>
				<button name="clear" class="line two">Clear</button>
				<button name="tt-go" class="line two">Go</button>
				<br>
				<label for="distance">Line Length: </label>
				<input type="text" id="distance" name="distance" value="10">
				<br>
			</div>
		</div>
		
	<?php include('one.html'); ?>
		<div class="canvas-wrapper" id="three">
			<canvas id="canvasthree" width="450" height="300">
				<p>Canvas cannot be displayed.</p>
			</canvas>
			<div class="ls-form">
				<div class="form-wrapper buttons">
					<label for="ls-iterations">Iterations: </label>
					<input type="text" id="ls-iterations" value=""><br>
					<label for="ls-axiom">Axiom: </label>
					<input type="text" id="ls-axiom" value=""><br>
					<label for="ls-rule1">Rule One: </label>
					<input type="text" id="ls-rule1" value=""><br>
					<label for="ls-rule2">Rule Two: </label>
					<input type="text" id="ls-rule2" value=""><br>
					<label for="ls-rule3">Rule Three: </label>
					<input type="text" id="ls-rule3" value=""><br>
					<label for="ls-rule4">Rule Four: </label>
					<input type="text" id="ls-rule4" value=""><br>
					<label for="ls-rule5">Rule Five: </label>
					<input type="text" id="ls-rule5" value=""><br>
				</div>
				<div class="form-wrapper buttons">
					<label for="angle">Angle: </label>
					<input type="text" id="ls-angle" name="angle"><br>
					<label for="distance">Line Length: </label>
					<input type="text" id="ls-distance" name="distance" value="10"><br>
					<div id="rule-list"><!-- holder for LS Rules Radio Selector--></div>
				</div>
				<div class="form-wrapper buttons actions">
					<button name="clear">Clear Drawing</button>
					<button name="ls-go">Go Draw It</button>
				</div>
			</div>
		</div>
	</div><!-- end page-wrapper -->
	<script src="js/mt.js"></script>
	<script src="js/page.js"></script>
	<script id="my-script"></script>
</body>
</html>