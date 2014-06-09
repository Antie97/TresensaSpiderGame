/*
    GAME SCREEN
    For this demo we create a SpriteSheetAnimation object and
    five buttons to illustrate the animation controls: Play,
    Stop, 24fps, 48fps, and goto First Frame.
 */
GameScreen = function(width,height)
{
    //Constructor
    GameScreen.superclass.constructor.apply(this,arguments);

    //Create a top-level variable for our SpriteSheetAnimation object
	this.gy;
	this.bullet;
	this.shooterAnim;
    this.spriteSheetAnim;
	this.bugAnim;
	this.score = 0;
	this.turning = "";
	this.forward = false;
	this.scoresetup;
	this.dx=5;
	this.dy=5;
	//Set background color
    this.backgroundColor = "#ffa500";

	
	this.scoresetup = new TGE.Text().setup({
        x:520,
        y:100,
        text:this.score.toString(),
        font:"32px sans-serif",
        color:"#FFF"
    });

    //*********************************************************
    //******     SET UP SPRITESHEET ANIMATION OBJECT     ******
    //*********************************************************
    /*
        This is where we set up our sprite sheet animation object
        with initial properties and position it on the screen.
    */
	this.gy = new TGE.SpriteSheetAnimation().setup({
        image:"backImage",
        columns:1,
        rows:1,
        totalFrames:1,
        fps:12,
        x: 250,
        y: 375,
		height:1000,
    });
	this.bugAnim = new TGE.SpriteSheetAnimation().setup({
        image:"bugImage",
        columns:6,
        rows:1,
        totalFrames:6,
        fps:12,
        x: 400,
        y: 240,
		scaleX: 0.25,
		scaleY: .250,
		width: 350,
		height: 350,
    });
    this.spriteSheetAnim = new TGE.SpriteSheetAnimation().setup({
        image:"shooterImage",
        columns:1,
        rows:1,
        totalFrames:1,
        fps:12,
        x: 320,
        y: 240,
    });
    this.bullet = new TGE.Sprite().setup({
        image:"bulletImage",
		width: 50,
		height: 50,
    });
	this.addChild(this.gy);
	this.addChild(this.bullet);
    this.addChild(this.spriteSheetAnim);
	this.addChild(this.bugAnim);
	this.bugAnim.play();
	this.addChild(this.scoresetup);
	this.spriteSheetAnim.addEventListener("keydown",this.setSpiderStatus.bind(this));
	this.spriteSheetAnim.addEventListener("keyup",this.resetSpiderStat.bind(this));
	this.spriteSheetAnim.addEventListener("update",this.updateSpider.bind(this));
	this.bugAnim.addEventListener("update",this.updateBug.bind(this));
	this.bugAnim.addEventListener("update",this.updateBug.bind(this));
    //Start the SpriteSheetAnimation Object playing
    //this.spriteSheetAnim.play();
	//this.bugAnim.play();

    //*************************************
    //******     CONTROL BUTTONS     ******
    //*************************************
    //Adding control buttons for the SpriteSheetAnimation Object
    //Play Button
    /*this.addChild(new TGE.Button().setup({
        textColor: "#000",
        text: "Play",
        x:this.percentageOfWidth(0.5),
        y:400,
        pressFunction:this.playAnim.bind(this)
    }));

    //Stop Button
    this.addChild(new TGE.Button().setup({
        textColor: "#000",
        text: "Stop",
        x:this.percentageOfWidth(0.5),
        y:450,
        pressFunction:this.stopAnim.bind(this)
    }));

    //24 FPS Button
    this.addChild(new TGE.Button().setup({
        textColor: "#000",
        text: "24 fps",
        x:this.percentageOfWidth(0.33),
        y:500,
        pressFunction:this.set24FPS.bind(this)
    }));

    //48 FPS Button
    this.addChild(new TGE.Button().setup({
        textColor: "#000",
        text: "48 fps",
        x:this.percentageOfWidth(0.66),
        y:500,
        pressFunction:this.set48FPS.bind(this)
    }));

    //First Frame Button
    this.addChild(new TGE.Button().setup({
        textColor: "#000",
        text: "First Frame",
        x:this.percentageOfWidth(0.5),
        y:550,
        pressFunction:this.gotoFirstFrame.bind(this)
    }));*/
};

GameScreen.prototype =
{
	
    //*************************************************
    //******     ANIMATION CONTROL FUNCTIONS     ******
    //*************************************************

    //Play Animation, executes when the Play button is pressed
    playAnim: function(){
        this.spriteSheetAnim.play();
        this.spriteSheetAnim.x += 100;
    },

	stopAnim:function(){
		this.spriteSheetAnim.stop();
	},
  
    //Stop Animation, executes when the Stop button is pressed
	resetSpiderStat: function(event){
        if(event.keyCode == 65 || event.keyCode == 68){
			this.turning = "";
		}
		if(event.keyCode== 87){
			this.forward = false;
		}
    },

    //24 and 48 FPS, set the playback speed of the object when the button is pressed
    set24FPS: function(){
        this.spriteSheetAnim.fps = 24;
    },
    set48FPS: function(){
        this.spriteSheetAnim.fps = 48;
    },

    //Goto First Frame, executes when the First Frame button is pressed.
    //Jumps to the first animation frame and stops. Alternatively you could
    //use gotoAndPlay to jump to the first frame and keep the animation playing.
    gotoFirstFrame: function(){
        this.spriteSheetAnim.gotoAndStop(1);
    }  ,
	
	setSpiderStatus:function(event){
		var spider = event.currentTarget;
		var bullet = this.bullet;
		if(event.keyCode == 32){
		bullet.x = spider.x;
		bullet.y = spider.y;
		bullet.rotation = spider.rotation+90;

		}
		this.spriteSheetAnim.play();
		if(event.keyCode == 65)
			this.turning = "left";
			//spider.rotation -= 10;
		if(event.keyCode == 68)
			this.turning = "right";
			//spider.rotation += 10;
		if(event.keyCode == 87){
			this.forward=true;
			/*spider.x -=  20 * Math.cos((spider.rotation + 90 ) * Math.PI/180);
			spider.y -=  20 * Math.sin((spider.rotation + 90 )  * Math.PI/ 180);*/
		}
		
		
		/*if(event.keyCode == 83){
			spider.x +=  20 * Math.cos((spider.rotation + 90 ) * Math.PI/180);
			spider.y +=  20 * Math.sin((spider.rotation + 90 )  * Math.PI/ 180);
		}*/
	},
	
	updateSpider:function(event){
		var spider = event.currentTarget;
		if(this.turning == "left"){
			spider.rotation -= 10;
		}
		
		if(this.turning == "right"){
			spider.rotation += 10;
		}
		
		if(this.forward){
			var distance = 4;
			var theta = (spider.rotation - 90) * Math.PI / 180;
			spider.x += distance * Math.cos(theta);
			spider.y += distance * Math.sin(theta);
			
		}
		
		if(this.turning !== "" || this.forward)
			spider.play();
		else
			spider.stop();
			
		
	},
	
	/*
		Updates the bug to constantly have it move around the screen. 
		If it hits the border it turns to the right and turns
		else it moves forward. 
	*/
	updateBug: function(event){
		var bullet = this.bullet;
		var bug = event.currentTarget;
		var spider = this.spriteSheetAnim;
		bug.cullToViewport(true,true,true,true);

		
		if(bug.x <= 0 || bug.x >= 640){
			for(var x = 0 ; x <= Math.random() * 180 ; x += 5){
				bug.rotation += x;
			}
			//bug.rotation += 125;
		}
		if(bug.y <= 0 || bug.y >= 832){
			for(var x = 0 ; x <= Math.random() * 180; x += 5){
				bug.rotation += x;
			}
			//bug.rotation += 125;
		}
		var distance = 4;
			var theta = (bug.rotation - 90) * Math.PI / 180;
			bug.x += distance * Math.cos(theta);
			bug.y += distance * Math.sin(theta);

		var thet = (bullet.rotation - 90) * Math.PI / 180;
		bullet.x += distance * Math.cos(thet);
		bullet.y += distance * Math.sin(thet);
			
		
		

		if(bullet.getBounds().intersects(bug.getBounds(),0.9,0.5)){
			this.score++;	
			this.scoresetup.text = this.score.toString();
			bug.x = (Math.random() * 600);
			bug.y = (Math.random() * 800);
			bug.rotation = 0;
		}
		
		
		
		
		
	}
	

	
		
		
		
	
	
}
extend(GameScreen,TGE.Window);