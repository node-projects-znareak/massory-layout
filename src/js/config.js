import { createMedia, convertToPx } from "./helpers.js";

export const SM_SIZE = 480;
export const MD_SIZE = 768;
export const LG_SIZE = 1024;

export const CONTAINER_CLASSNAME = "ms";
export const COLUMN_CLASSNAME = "ms-column";
export const ITEM_CLASSNAME = "ms-item";

export const querySm = createMedia({
  maxSize: convertToPx(SM_SIZE),
});

export const queryMd = createMedia({
  minSize: convertToPx(SM_SIZE - 1),
  maxSize: convertToPx(MD_SIZE),
});

export const queryLg = createMedia({
  minSize: convertToPx(MD_SIZE - 1),
  maxSize: convertToPx(LG_SIZE),
});

export const mediaQueries = [
  {
    query: "sm",
    media: querySm,
  },
  {
    query: "md",
    media: queryMd,
  },
  {
    query: "lg",
    media: queryLg,
  },
];
