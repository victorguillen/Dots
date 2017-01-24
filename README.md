## Connect Dots

### Background

Gameplay of Dots: users connect lines of dots to eliminate all dots in that line, or close a line to remove all dots of that color from the screen. The purpose of the game is to get the highest score possible of connected dots, after dots are connected they disappear and new dots fall from the top to replace the missing dots.


<img src="docs/images/dotsClassic.gif" width="300">

There's a score count of how may dots have been connected and a timer counting down to zero. When the timer hits zero the game is over and a play again button appears on screen to play a new game.

The game includes background music which can be muted by clicking on the speaker icon.

### Functionality & MVP  

User will be able to:

- [ ] Read the instructions through a modal popup.
- [ ] Start, pause, restart and mute the background music.
- [ ] Use of mouse to connect the dots.


This project will include:

- [ ] A production Readme
- [ ] An intro showing how to play the game. Include a modal with instructions and a gif.

### Wireframes

This game will consist of a single screen with a gif popup explaining how the game works. The screen will then transition to the game with a Play button in the center. When the user connects the dots the score will appear on the screen along with a Play Again button and a mute button on the top right corner.


<img src="docs/wireframes/dots.png" width="300">

### Architecture and Technologies

This project will be implemented with the following technologies:

- Stage.js with HTML5 Canvas for DOM manipulation and rendering
- Vanilla JavaScript for overall structure and game logic


### Implementation Timeline

**Day 1**: Setup all modules, learn the basics of Stage.js. Learn enough Easel.js to render an object to the Canvas element

**Day 2**: Dedicate this day to learning the Stage.js Goals: Render dots and background.

**Day 3**: Create the game logic: gameplay, timer, score count.

**Day 4**: Install the controls for the user to interact with the game. Style the frontend, making it polished and professional.
