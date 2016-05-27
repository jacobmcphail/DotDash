README.txt							May 27 2016
=======================================================================
=======================================================================
A. 	TEAM INFO
-----------------------------------------------------------------------
Team Number:	#13 
Team Name: 		The Surveyors

Team Members:	Natasha "Teah the Playa" Elaschuk
				Jennifer "Oh no not you again" Kwan
				Jacob "JACOBO ON THE WATER" Mcphail
				Nikola "Gloves" Milicevic
				Zia "Ex Wai Zee" Minhas

=======================================================================
B.	PROJECT OVERVIEW
-----------------------------------------------------------------------
Game Title: 	DotDash._

Description: 	A memory game very much like Simon Says. 
	*	The game generates a grid of coloured dots. 
	*	At the start of each round, an animation plays of dots changing colour in a sequence. 
	*	The user must then tap/click on the dots in the same sequence to successfully clear a round. 
	*	As the game progresses, the game adjusts factors such as sequence length to make clearing a round more difficult. 
	*	Depending on mode, there is a time constraint and/or a limited number of mistakes the user can make before Game Over. 
	*	3 Modes: Marathon, Sudden Death, and Time Attack
		*	Marathon: Each round is timed. Player has 3 lives.
		* 	Sudden Death: No time limit. Player has only 1 life.
		*	Time Attack: Player clears as many rounds as possible under 2 minutes. Making a mistake results in a time penalty.
	
=======================================================================
C.	CODE STRUCTURE DESCRIPTION
-----------------------------------------------------------------------
index.html
	-The game is held on a single webpage. Elements are hidden or made visible depending on user input.
	
	Script files referenced: 
		
		1. jerkScript.js
		2. carousel.js
		3. <libraries we downloaded and used without modifying>
	
-----------------------
A. jerkScript.js
-----------------------
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
		>	newRound(generateGrid)
		>	generateGrid(createGrid, make_2D_Array, pathDemonstration)
			-createGrid() makes a grid of a fixed size
			-make_2D_Array() creates an array of div elements that represent dots. 
			-generateGrid() places those dots on the grid
		>	pathDemonstration(arrayToRepeat, validate)
			-arrayToRepeat contains the dots in the sequence the user must repeat
		>	validate(array, userFeedback, dArray)
		>	userFeedback(bool,lastNode)
		>	reset(removeDots)
			-resets variables that are initialized every round
			-starts a new round
	
	Imported inside jerkScript.js
		1. gameTimer.js
		2. nuggetScript.js
		3. pathGenerator.js
		4. badges.js
		5. audio.js
		6. leaderboard.js
		7. steve.js
		8. user.js
		9. panic.js
		
	1. Manages the countdown timers that are used in Marathon mode and Time Attack mode
	2. Contains functions invoked by elements in index.html to hide and make visible different elements
	3. Contains functions that randomly generate sequences of dots for the user to repeat
	4. Displays badges and issues alerts when user has earned a badge
	5. Handles sound effects and music during gameplay
	6. Handles reading from and writing to the online leaderboard database
	7. Steve comes. He sleeps and he waits.
	8. Handles reading and writing to database containing leaderboards and user records
	9. Unimplemented panic mode: distractions appear during pathDemonstration() and validate()

-----------------------
LOCALLY-STORED DATA
-----------------------
* Two arrays of data instantiated in jerkScript.js
(A) localSavedFiles: Used to access online databases containing each user's high scores and achievement record as well as write to leaderboards
(B) playerData: Contains data to be written into each user's record

A. 	localSavedFiles:
-----------------------
		[0]: boolean: 1st time playing (not used)
		[1]: username (used to make queries to database)
		[2]: password
	
B.	playerData: Retrieved from database
----------------------------------------------
		[0]: boolean: Steve Mode unlocked
		[1]: boolean: Achieved top ten in Sudden Death mode
		[2]: boolean: Get to level 60 in Marathon mode
		[3]: boolean: Get to level 30 in Time Attack mode
		[4]: boolean: Get to level 60 in Sudden Death mode
		[5]: boolean: Get to level 60 in Marathon mode with all lives
		[6]: boolean: Get to level 20 in Time Attack mode without a mistake
		[7]: boolean: Achieved top ten in Marathon mode
		[8]: boolean: Get to level 40 in marathon mode
		[9]: boolean: Achieved top ten in Time Attack mode
		[10]: int: user's best score for Marathon mode
		[11]: int: user's best score for Sudden Death mode
		[12]: int: user's best score for Time Attack mode

-----------------------
ONLINE PLAY
-----------------------
	* Go to the Options menu to create an account, login, or clear your user data
	* Creating an account and sending data to the online leaderboards is not necessary to play
	* Create Account: 
		* New users must create an account with a username that has not already been registered with another user
		* Usernames and passwords may have a maximum length of 15 characters
		* After you create an account, login by pressing the login button
	* Login: 
		* Enter your username and password to save scores after every round of gameplay
		* Once logged in, achievements you have unlocked will be displayed on the Badges screen (accessible through the Leaderboards screen)
	* Reset Save:
		* Clears your high scores and achievement data

-----------------------		
DOTDASH DATABASE
-----------------------
ONLINE LEADERBOARDS
	* All scores achieved by a user who is logged in is sent to our online leaderboard
	* There is one table for each mode.
PLAYER RECORDS
	* One table stores each user's best score for each mode as well as booleans that indicate which badges the user has earned.
	
=======================================================================
D.	TECHNOLOGIES USED
-----------------------------------------------------------------------
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

=======================================================================
E.	ISSUES/PROBLEMS
-----------------------------------------------------------------------
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
                                        `I'm a bird I'm a bird I'm a bird