README.txt
Sprint #3			May 24-27 2016
==================================================
==================================================
A. 	TEAM INFO
--------------------------------------------------
Team Number:	#13 
Team Name: 		The Surveyors

Team Members:	Natasha Teah Elaschuk
				Jennifer Kwan
				Jacob Mcphail
				Nikola "Gloves" Milicevic
				Zia Minhas

==================================================
B.	PROJECT OVERVIEW
--------------------------------------------------
Game Title: 	DotDash._

Description: 	A memory game very much like Simon Says. 
	*	The game generates a grid of coloured dots. 
	*	At the start of each round, an animation plays of dots changing colour in a sequence. 
	*	The user must then tap/click on the dots in the same sequence to successfully clear a round. 
	*	As the game progresses, the game adjusts factors such as sequence length to make clearing a round more difficult. 
	*	Depending on mode, there is a time constraint and/or a limited number of mistakes the user can make before Game Over. 
	
==================================================
C.	CODE STRUCTURE DESCRIPTION
--------------------------------------------------
index.html
	-The game is held on a single webpage. Elements are hidden or made visible depending on user input.
	
	Script files referenced: 
		
		1. jerkScript.js
		2. carousel.js
		3. <libraries we downloaded and used without modifying>
	
	A. jerkScript.js
	-Main JavaScript file for code related to gameplay
	-Declare global variables
		-Some are reinitialized every round
		-Some determine state, such as a Game Over or a state in which the user is not allowed to interact with the playing field.
	-Imports other js files required for gameplay
	-Uses callbacks to enforce synchronous execution of Javascript functions
	
		-Sets up local save files if they do not already exist
		-Updates contents of local scoreboard and badge container
		-If user has disabled cookies, warns that cookies are necessary to play
		-Initialize global variables in function that is called when game first starts. Some values depend on mode selected
		-Includes helper functions that change the state of different elements on the screen
		
		Progression of functions in a single round:
			>newRound(generateGrid)
			>generateGrid(createGrid, make_2D_Array, pathDemonstration)
				-createGrid() makes a grid of a fixed size
				-make_2D_Array() creates an array of div elements that represent dots. 
				-generateGrid() places those dots on the grid
			>pathDemonstration(arrayToRepeat, validate)
				-arrayToRepeat contains the dots in the sequence the user must repeat
			>validate(array, userFeedback, dArray)
				-This is the function that invokes userFeedback(bool, lastNode)
				-lastNode = the last dot selected.
				-bool = true if the user made no mistakes
				-bool = false if the user made a mistake
			>userFeedback(bool,lastNode)
			>reset(removeDots)
				-resets variables that are initialized every round
				-starts a new round
	
	Imported inside jerkScript.js
		1. gameTimer.js
		2. nuggetScript.js
		3. pathGenerator.js
		4. touching.js
		5. badges.js
		6. audio.js
		7. leaderboard.js
		8. steve.js
		
	1. Manages the countdown timers that are used in Marathon mode and Time Attack mode
	2. Contains functions invoked by elements in index.html to hide and make visible different elements
	3. Contains functions that randomly generate sequences of dots for the user to repeat
	4. Makes messages appear over buttons when touched and held on mobile
	5. Displays badges and issues alerts when user has earned a badge
	6. Handles sound effects and music during gameplay
	7. Handles reading from and writing to the online leaderboard database
	8. Steve comes. He sleeps and he waits.
	
==================================================
D.	TECHNOLOGIES USED
--------------------------------------------------
-JavaScript
-PHP
-jQuery
-jGestures
-JSON
-mySQL 
-PhpMyAdmin
-Bootstrap
-BlueHost website hosting
-Cordova
-PhoneGap
-Firebug
-FireFTP
-WebStorm
-GitHub
-Slack
-GoogleDocs
-Notepad++

==================================================
E.	ISSUES/PROBLEMS
--------------------------------------------------
-Not anticipating at the beginning that having one stupid long js file would be hard to find things in later.
-Division of labour resulting in some members being more knowledgeable of the code's contents than others.
-It is difficult to center a div element with CSS.
-Fine-tuning with CSS in general is painful.
-JS libraries offer very desireable functionality but ruin your formatting.
-Fewer difficulties with GitHub compared to last week but still not none.
-Accommodating mobile phone screen size constraints.
-Having to relearn the syntaxes of languages we have not used in a long time. 
-Starting with basically no knowledge of PHP and mySQL.
-Troubleshooting consumes a lot of time. Why do article writers and commenters on StackOverflow think lots of words that cover lots of topics convey information better than brief, bullet-pointed instructions on how to do one thing only?
-Futile and uncomfortable emotions.

												,::::.._
                                              ,':::::::::.
                                          ​_,-'`:::,::(o)::`-,.._​
                                       _.', ', `:::::::::;'-..__`.
                                  _.-'' ' ,' ,' ,\:::,'::-`'''
                              _.-'' , ' , ,'  ' ,' `:::/
                        _..-'' , ' , ' ,' , ,' ',' '/::
                ​_...:::'`-..'_​, ' , ,'  , ' ,'' , ,'::|
             ​_`.:::::,':::::,'::`-:..'_​',​_'_​,'..-'::,'|
     _..-:::'::,':::::::,':::,':,'::,':::,'::::::,':::;
       `':,'::::::,:,':::::::::::::::::':::,'::_:::,'/
       __..:'::,':::::::--''' `-:,':,':::'::-' ,':::/
  ​_.::::::,:::.-''-`-`..'_​,'. ,',  , ' , ,'  ', `','
,::SSt:''''`                 \:. . ,' '  ,',' '_,'
                              ``::.​_,'_​'_,',.-'
                                  \\ \\
                                   \\_\\
                                    \\`-`.-'_
                                 .`-.\\__`. ``
                                    ``-.-._
                                        `
										
										
										
										
										
										
										
										
								
								
==================================================
==================================================										
  