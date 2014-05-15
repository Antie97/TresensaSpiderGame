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
    this.spriteSheetAnim;
	this.flySprite;
	this.turning= "";
	this.forward = false;

	//Set background color
    this.backgroundColor = "#039AFF";

    //*********************************************************
    //******     SET UP SPRITESHEET ANIMATION OBJECT     ******
    //*********************************************************
    /*
        This is where we set up our sprite sheet animation object
        with initial properties and position it on the screen.
    */
    this.spriteSheetAnim = new TGE.SpriteSheetAnimation().setup({
        image:"spriteSheetImg",
        columns:4,
        rows:5,
        totalFrames:19,
        fps:32,
        x: 320,
        y: 240,
    });
    this.addChild(this.spriteSheetAnim);
    this.flySprite = new TGE.Sprite().setup({
        image:"flyimg",
        x: 90,
        y: 300,
		width: 150,
		height: 150,
    });
    this.addChild(this.flySprite);
	
	this.spriteSheetAnim.addEventListener("keydown",this.SetStatusOfSpider.bind(this));
	this.spriteSheetAnim.addEventListener("keyup",this.ResetStatusOfSpider.bind(this));
	this.spriteSheetAnim.addEventListener("update",this.UpdateSpider.bind(this));
   
}

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

    //Stop Animation, executes when the Stop button is pressed
    stopAnim: function(){
        this.spriteSheetAnim.stop();
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
    }, 	
		SetStatusOfSpider: function(event){
		this.spriteSheetAnim.play();
		var spider = event.currentTarget;
		if(event.keyCode == 37)
			this.turning="left"
		if(event.keyCode == 39)
			this.turning="right"
		if(event.keyCode== 38){
			this.forward = true;
		}	
	},
	ResetStatusOfSpider: function(event){
		if(event.keyCode == 37 || event.keyCode == 39){
			this.turning= "";
		}
		if(event.keyCode==38){
			this.forward= false;
		}
	},
	UpdateSpider: function(event){
		var spider = event.currentTarget;
		if(this.turning== "left")
			spider.rotation -= 5;
		if(this.turning== "right")
			spider.rotation += 5;
		if(this.forward){
			var distance = 5;
			var theta = (spider.rotation - 90) * Math.PI / 180;
			spider.x += distance * Math.cos(theta);
			spider.y += distance * Math.sin(theta);
		}
		if(this.turning != "" || this.forward)
			spider.play();
		else
			spider.stop();
	}
}
extend(GameScreen,TGE.Window);