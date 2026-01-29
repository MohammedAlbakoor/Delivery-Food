const HighlightText = ({ text, highlight }) => {
  if (!highlight) return text;

  const parts = text.split(new RegExp(`(${highlight})`, "gi"));

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={i} className="bg-yellow-300 font-bold">{part}</span>
        ) : (
          part
        )
      )}
    </>
  );
};

export default HighlightText;
