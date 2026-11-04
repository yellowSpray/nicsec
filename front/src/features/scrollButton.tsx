export const scrollToSection = () => {
  const footer = document.getElementById("footer");
  if (footer) {
    footer.scrollIntoView({ block: "end", behavior: "smooth" });
  }
};

export const scrollToId = (id: string, behavior: ScrollBehavior = "smooth") => {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ block: "start", behavior });
  }
};
