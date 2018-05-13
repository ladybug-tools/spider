Exercise files and supporting documents for a Radiance tutorial on matrix-based methods.
The tutorial was commissioned by the Lawrence Berkeley National Laboratory (LBNL).
Download link: https://www.radiance-online.org/learning/tutorials/matrix-based-methods
The tutorial and exercise files were created by Sarith Subramaniam(sarith@sarith.in).

Subdirectories:
room: contains the exercise files and commands used for most of the examples in the tutorial.
room2: A more complex room example that is used for a few Four-Phase Method examples.
room3: A room with an extended overhang which is also used for a few Four-Phase Method examples.

Running the commands in a plug-and-play fashion in Unix/Mac OS-X terminals.
Navigate to either "room", "room2" or "room3" directory using the cd command.
Copy the shell script for particular method from the "commands" directory into the current directory.
Run the shell script by using the bash command.
Example: 
	Let the current working directory be "home/user".
	Let the direcotry "radTutorialFiles" be stored as "home/user/Desktop/radTutorialFiles"
	The following commands will execute the shell script for the 2-Phase example.
	$cd Desktop/radTutorialFiles
	$cd room
	$cp commands/2PM_DayCoeff.sh 2PM_DayCoeff.sh
	$bash 2PM_DayCoeff.sh


