import { writable } from "svelte/store";
import axios from "axios";

export const images = writable([]);

export async function getImages(coords) {
  let img = new Image();

  img.onload = function() {
    images.update(imgs => {
      imgs.push(img);
      return imgs;
    });
  };

  img.src = `https://picsum.photos/id/${coords}/200/200`;

  console.log(img);
}
