# RoomCleaner
This is my visualisation to improve my understanding, ease and simplicity of PDDL planning.
(After having some more thoughts, I have decided to implement a feature where you can compare different algorithms from a certain problem. In development)

## The Problem
There is a rectangular world of x width and y height. The world can consist of obstacles/walls and only one bot/cleaner. The goal is to visit every empty tile.

## The Approach
This is a project that I have created primarily to learn. Having learnt about PDDL, I wanted to see how well it can be coded and see if I can make a visualisation that can also help in improving my understanding.
I thought that if I first converted the problem to PDDL and then coded the visualisation based on the PDDL, it would probably be easier to do and so I chose not to do that first.
Instead, I chose to first code the world and then adapt it to incorporate (maybe not fully) PDDL concepts in order to get a better understanding. By doing it this way first, I will understand both the difficulties and limitations of this approach.
I will create a version where the code is designed and based on PDDL as that would also mean that I will be able to create visualisations of other PDDL models in the future much more easily too.

## How to use??

### Running
In cmd, host the folder on a localhost:
- using: ```npx serve .```

### Reset
To reset the world, you can either refresh the page or click "Set World" button

## Usage
1. Set the values for width and height in the input fields.
2. Click "Set World" button to create the correct world layout
3. Click on each tile to set it as "empty", "obstacles/walls" or "bot/cleaner"
  - You can only have one bot in the world so when you click, it will cycle empty-walls-bot if there is no bot existing and empty-walls if there is a bot already
  - Do not you will not be able to run the program until there is one bot
  - Also note you will not be able to change the world once the bot begins, you will have to reset the world
4. Click "Begin Run" once you are ready for the agent to begin
5. Click "Next" button to go to the next state (a.k.a the agent will perform one move)
6. You can spam the "Next" button until the console log says
  - Error
  - No more possible moves
  - Goal State Reached
7. You then will have to reset to try again, sorry :)

## Current Progress
Currently, there is only the first approach of creating the world first and then attempting to incorporate the PDDL concepts into the world. 
The code also has a random agent which will choose a random move from the list of possible moves in its current state.
There are not many visualisations yet to indicate what stage the code is at or how to use the buttons in the menu correctly however they will all be added in the future.
You can view messages in console log if you want to see some data.
