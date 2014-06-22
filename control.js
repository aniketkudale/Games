/*
* By: Aniket Kudale
* Email: aniket.kudale@hotmail.com
* http://www.github.com/aniketkudale
* Javascript based simple snake game!
* Dated: 22/6/2014
* Share! Improve!
*/

$(document).ready(function(){
	
	// All Canvas settings
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();
	

	//Cell width/height info
	
	var cw = 10;
	var d;// default direction of saap
	var food;
	var score;
	//Snake creation
	
	var snake_array; //array to hold on snake cells
	
	
	function run()
	{
		
	  d = "right"; //default direction of saap
	  create_snake();
	  create_food();
	  
	    
	  // Score Display
	  score = 0;
	    
		// Moving snake using timer
		//triggers paint function
		if(typeof me_loop != "undefined") clearInterval(me_loop);	 
		me_loop = setInterval(paint, 60);
	 	
	}
	
	run();
	
	
	
	
	function create_snake()
	{
		var length = 5; //initial length of the snake
		snake_array=[]; //Empty
		
		for(var i=length-1;i>=0;i--)
		{
			snake_array.push({x:i,y:0});//This will create a horizontal snake at upper left corner
		}
	}
	
	
	//Food for Saap :-)
	
   function create_food()
   {
		food ={
			x: Math.round(Math.random()*(w-cw)/cw),
			y: Math.round(Math.random()*(h-cw)/cw),
		};
		
	 }
	
	 //Drawing the snake
	 
	 function paint()
	 {
	 	
	 	//Drawing the canvas
	 
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0, w, h);
		
	
	  //snake movement
		var nx = snake_array[0].x;
	  var ny = snake_array[0].y;
	 
	 	//these are the position of the head cell
		//incrementing it to get new position
	 
		//adding direction to saap ;-)
		 
		if(d=="right") nx++;
		else if(d=="left") nx--;
		else if(d=="up") ny--;
		else if(d=="down") ny++;
	
	
	//wall collision of saaaap
	
		if(nx==-1 || nx == w/cw || ny==-1 || ny == h/cw || check_collision(nx,ny,snake_array))
		{
			//restart
			run();
			return;
		}
		 
	 
	 
	  //Lets write the code to make the saap eat the food
		//The logic is simple
		//If the new head position matches with that of the food,
		//Create a new head instead of moving the tail
		if(nx == food.x && ny == food.y)
		{
			var tail = {x: nx, y: ny};
			score++;
			//Create new food
			create_food();
		}
		else
		{
			var tail = snake_array.pop(); //pops out the last cell
			tail.x = nx; tail.y = ny;
		}
		
	    snake_array.unshift(tail);
	 
	 
	 	for(var i=0; i<snake_array.length; i++)
	 	{
	 		var c = snake_array[i];
	 		paint_cell(c.x,c.y);
	 	}
	 	
	 	
	 	//Drawing the food
	 	paint_cell(food.x, food.y);	 	
	 	
	 	//drawing score for saap
	 	
	 	var score_text ="Food Eaten: " + score;
	 	ctx.fillText(score_text, 5, h-5);	 	
	 }
	 
	function paint_cell(x, y)
	{
		ctx.fillStyle = "red";
		ctx.fillRect(x*cw, y*cw, cw, cw);
		ctx.strokeStyle = "white";
		ctx.strokeRect(x*cw, y*cw, cw, cw);
	}
	
	
	// wall collition validate for saap
	
	function check_collision(x,y,array)
	{
		for(var i=0; i<array.length;i++)
		{
			if(array[i].x==x && array[i].y==y)
			return true;
		}
		return false;
		
	}
	
	 
	 //Adding Keyboard controls to saap
	 $(document).keydown(function(e){
	 	
	 	var key = e.which;
	 	if(key=="37" && d!="right") d = "left"; //ascii code of <- key
	 	else if (key=="38" && d!="down") d = "up";
	 	else if (key=="39" && d!="left") d = "right";
	 	else if (key=="40" && d!="up") d = "down";
	 	
	 })
	 
	 
	
	paint();
	
	
	
})


