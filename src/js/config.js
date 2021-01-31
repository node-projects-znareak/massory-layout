import { createMedia } from "./helpers.js";

export const SM_SIZE = 640;
export const MD_SIZE = 990;
export const LG_SIZE = 1200;

export const CONTAINER_CLASSNAME = "ms";
export const COLUMN_CLASSNAME = "ms-column";
export const ITEM_CLASSNAME = "ms-item";

export const querySm = createMedia({
  maxSize: SM_SIZE + "px",
});
export const queryMd = createMedia({
  minSize: SM_SIZE - 1 + "px",
  maxSize: MD_SIZE + "px",
});
export const queryLg = createMedia({
  minSize: MD_SIZE - 1 + "px",
  maxSize: LG_SIZE + "px",
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
