/*
 * Yahtzee Dice Roller
 * Rolls five 6-sided dice using randomly generated numbers.
 */

"use strict";

var NUMBER_OF_DICE = 5;
var SIDES_PER_DIE = 6;

var rollCount = 0;

/* Pip layout for each face value, using CSS grid position classes. */
var PIP_LAYOUTS = {
  1: ["p-mc"],
  2: ["p-tl", "p-br"],
  3: ["p-tl", "p-mc", "p-br"],
  4: ["p-tl", "p-tr", "p-bl", "p-br"],
  5: ["p-tl", "p-tr", "p-mc", "p-bl", "p-br"],
  6: ["p-tl", "p-tr", "p-ml", "p-mr", "p-bl", "p-br"]
};

/**
 * Returns a random whole number from 1 through SIDES_PER_DIE.
 */
function rollOneDie() {
  return Math.floor(Math.random() * SIDES_PER_DIE) + 1;
}

/**
 * Draws the pips for a single die face.
 */
function drawFace(faceElement, value) {
  faceElement.innerHTML = "";
  PIP_LAYOUTS[value].forEach(function (positionClass) {
    var pip = document.createElement("span");
    pip.className = "pip " + positionClass;
    faceElement.appendChild(pip);
  });

  // Restart the tumble animation.
  faceElement.classList.remove("rolling");
  void faceElement.offsetWidth;
  faceElement.classList.add("rolling");
}

/**
 * Describes any notable Yahtzee combination in the current roll.
 */
function describeRoll(values) {
  var counts = {};
  values.forEach(function (value) {
    counts[value] = (counts[value] || 0) + 1;
  });

  var tallies = Object.keys(counts).map(function (key) {
    return counts[key];
  }).sort(function (a, b) {
    return b - a;
  });

  var sorted = values.slice().sort(function (a, b) {
    return a - b;
  }).join("");

  if (tallies[0] === 5) {
    return "YAHTZEE! All five dice match.";
  }
  if (tallies[0] === 4) {
    return "Four of a kind!";
  }
  if (tallies[0] === 3 && tallies[1] === 2) {
    return "Full house!";
  }
  if (sorted === "12345" || sorted === "23456") {
    return "Large straight!";
  }
  if (tallies[0] === 3) {
    return "Three of a kind.";
  }
  return " ";
}

/**
 * Rolls all five dice and updates every read-only field on the page.
 */
function rollDice() {
  var values = [];
  var total = 0;
  var i;

  for (i = 1; i <= NUMBER_OF_DICE; i++) {
    var value = rollOneDie();
    values.push(value);
    total += value;

    document.getElementById("die" + i).value = value;
    drawFace(document.getElementById("face" + i), value);
  }

  rollCount += 1;

  document.getElementById("total").value = total;
  document.getElementById("highest").value = Math.max.apply(null, values);
  document.getElementById("rollCount").value = rollCount;
  document.getElementById("callout").innerHTML = describeRoll(values);
}

/* Keep the Roll button focused so the Enter key always rolls again. */
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("rollButton").focus();
});
