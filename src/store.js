import { writable } from "svelte/store";
import { defineGrid, extendHex } from "honeycomb-grid";
import axios from "axios";

export const hexes = writable();

function getHexes() {
  let arr = [];

  for (var i = 0; i < 30; i++) {
    let h = {
      x: Math.floor(Math.random() * 10 - 5),
      y: Math.floor(Math.random() * 10 - 5)
    };
    arr.push(h);
  }

  hexes.set(arr);
}

function init() {
  getHexes();
}

export function getGrid() {}

init();
