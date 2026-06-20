export default function TimeGreeting() {
  const h = new Date().getHours();
  if (h >= 5  && h < 12) return { greeting: "Good morning", sub: "The garden wakes." };
  if (h >= 12 && h < 17) return { greeting: "Good afternoon", sub: "The flowers are in full bloom." };
  if (h >= 17 && h < 21) return { greeting: "Good evening", sub: "The garden glows at dusk." };
  return { greeting: "Good night", sub: "The rarest blooms open in darkness." };
}
