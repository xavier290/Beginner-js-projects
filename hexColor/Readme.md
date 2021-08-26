For the first project i made a hex color app background changing.
This is actually pretty easy, and i did it following this article:
https://dev.to/codefoxx/15-beginner-javascript-projects-to-improve-your-front-end-skills-5bcj
where the senior developer "Miguel Nunez" recommends doing 15 projects to improve your front-end skills, so i basically said why not?

Okay, let's go to the point, in this project we have two main things that i will be explaining in order to have it working, where the first one is:

# Our HTML file:

   <img src="images/Screenshot%20(266).png">
   
   - Which as u can see has a really basic structure, a container where all the elements of our web app will be nested in, two paragraphs and a button.
   
   - This button will be the one that the user will click on to change the background color

# and our Js file:

   where this is the place where all of the logic is saved in order to have the app working

   <img src="images/Screenshot%20(267).png">
   
   - First of all, We add an event listener "click" to the button that we have, the program knows or wait for that exact button to be clicked due to the id "submit", so we are basically telling the browser to wait for the "submit" button to be clicked and execute the code that is inside that arrow function.
   - next we have an array called "hexValues" which has all the possible values that a hex color can be made of.
   - besides we have two more variables "hexCode1" and "hexCode2" to store the value of the colors that will be generated in the folloing lines.
   - And the "random_index" variable will be used to save a random number from 0 to 15.

Here it comes the most relevant part of the code where with a "for loop" we basically generate a random number and with that number selects a value from the "hexValue" array for up to 6 times to generate a color and put it as a background. okay, but how? it's actually pretty easy, let me explain:

First we have this line of code: "random_index = Math.floor(Math.random() * hexValues.length);" where we are generating a random integer from 0 to 15, but why 15?
since we are using the length property, we are getting the number 16 since that's the "lenght" of our array of strings, so we are telling the computer to generate a random number from 0 to 15, and since this is inside the Math.floor() which is a function that returns the largest integer value that is less than or equal to a number. In other words, the floor() function rounds a number down and returns an integer value, in that way we will alway be getting random numbers with no decimals, and that number will be saved into the "random_index" variable.

once with do that, we add that number up in the "hexCode1" variable until the 6 numbers are completed, which is the amount of times the process repeat itself.

And finally, that "hexCode" value is set as a background color due the following line of code: document.body.style.background = `linear-gradient(to right, #${hexCode1}, #${hexCode2})`;
