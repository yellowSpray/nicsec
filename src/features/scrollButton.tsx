export const scrollToSection = () => {
  const footer = document.getElementById("footer");
  if (footer) {
    footer.scrollIntoView({ block: "end", behavior: "smooth" });
  }
};