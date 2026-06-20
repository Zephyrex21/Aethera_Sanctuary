export const ALL_TAGS = ["All", "Extinct", "Endangered", "Rare", "Unusual", "Priceless", "Mythic"];

export const FEATURED_IDS = ["snow-lotus", "blue-lotus", "kadupul-flower"];

// Hoisted to module scope — created once at load time instead of being
// rebuilt on every single getTagStyle() call (which happens per-tag,
// per-card, on every render of the flower grid).
const TAG_STYLE_MAP = {
  Extinct:    { background: "linear-gradient(135deg,#9B4456 0%,#7B2D3F 50%,#5C1A2A 100%)", boxShadow: "0 2px 8px rgba(92,26,42,.35)" },
  Endangered: { background: "linear-gradient(135deg,#D4885E 0%,#C4784A 50%,#9E5430 100%)", boxShadow: "0 2px 8px rgba(158,84,48,.35)" },
  Rare:       { background: "linear-gradient(135deg,#B580C8 0%,#9B5AB5 50%,#6B3490 100%)", boxShadow: "0 2px 8px rgba(107,52,144,.35)" },
  Unusual:    { background: "linear-gradient(135deg,#6AAE8A 0%,#4E9A8E 50%,#3A7080 100%)", boxShadow: "0 2px 8px rgba(58,112,128,.35)" },
  Priceless:  { background: "linear-gradient(135deg,#D4A47E 0%,#C8956E 50%,#B07A58 100%)", boxShadow: "0 2px 8px rgba(176,122,88,.35)" },
  Mythic:     { background: "linear-gradient(135deg,#B04A80 0%,#8E3068 50%,#4A1D50 100%)", boxShadow: "0 2px 8px rgba(74,29,80,.35)" },
};

/** Returns inline style object for a tag badge */
export function getTagStyle(tag) {
  return TAG_STYLE_MAP[tag] || TAG_STYLE_MAP.Rare;
}
