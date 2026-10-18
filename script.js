/*
 * IDB Programming: A1 Modelling — a musical instrument
 *
 * All of the code for your instrument goes in this file. It's split into sections:
 *   settings — the "fixed" parts of your program
 *   state    — the parts of your program that change over time
 *   sound    — the Tone.js instruments and effects
 *   update   — updates the state every 100ms, if necessary
 *   use      — applies the state to make sound every 100ms, if necessary
 *   controls — what happens when a key goes down or comes up
 *   setup    — starts everything
 *
 * There is no loop in this assignment. Nothing happens until the player presses
 * a key, and every key event follows the same two steps:
 *   1. update: change the state, based on which key it was
 *   2. use:    make sound from the state
 *
 * Tone.js documentation: https://tonejs.github.io/docs/15.1.22/
 */

/*
When the user presses a key, we play random notes from a scale, one every 1/4 second for ever.

Let's break that down:
1. Handle a key press which starts the process.
2. have an array with notes
3. "The Process" -> function
 *b. get a random number representing an array index
  c. get the note out of the array
  d. give the note to the synth -> playing the note
  e. wait for some time
  f. play the next note -> do the function again
*/

// ---------- Settings ----------
// Settings variables should contain all of the "fixed" parts of your programs
// For example: which key does what, which notes you can play, the tempo.
const scale = ["C", "D", "Eb", "E", "G", "A"];

// ---------- State ----------
// State variables are the parts of your program that change over time.
// For example: which octave you're playing in, or whether a drone is on.
let isRunning = false;

// ---------- Sound ----------
// Make the instruments and plug them into the speakers.
const synth = new Tone.PolySynth(Tone.Synth).toDestination(); // can play several notes at once

// ---------- Update ----------
// Update the state. This is called every 100ms.
function update() {
  // Example: replace this with your own instrument.

  setTimeout(update, 100); // call update() again in 100 milliseconds
}

function getRandomNumberZeroTo(upperLimit) {
  let r = Math.random() * upperLimit;
  let wholeNumber = Math.floor(r);
  return wholeNumber;
}

// ---------- Use ----------
// Use the state to make sound. This is called every 100ms.
function use() {
  let noteIndex = getRandomNumberZeroTo(scale.length);
  let note = scale[noteIndex];
  let octave = getRandomNumberZeroTo(2) + 3;

  synth.triggerAttackRelease(note + octave, "8n", Tone.now());

  setTimeout(use, 250); // call use() again in 100 milliseconds
}

// ---------- Controls (Event Handlers) ----------
// Runs every time a key goes down.
function keyDown(event) {
  Tone.start(); // browsers only allow sound after the player has pressed something

  // Holding a key down sends keydown again and again. Only react to the first one.
  if (isRunning === false) {
    // we could also write !isRunning
    console.log("Key down:", event.key);
    use(); // start the use loop
    isRunning = true;
  }
}

// ---------- Setup ----------
// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {
  update(); // start the update loop

  // Put your event listener code here
  window.addEventListener("keydown", keyDown);
}

setup(); // Always remember to call setup()!
