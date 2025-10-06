export const highlightKeywords = (text: string, keywords: string[]) => {
  const regex = new RegExp(`(${keywords.join("|")})`, "gi");

  return text.split(regex).map((part, index) => {
    if (keywords.some((kw) => kw.toLowerCase() === part.toLowerCase())) {
      return (
        <span key={index} className="text-second">
          {part}
        </span>
      );
    }
    return part
  });
};
