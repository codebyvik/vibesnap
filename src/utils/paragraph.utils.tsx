export const highlightHashtags = (input: string) => {
  const hashtagRegex = /#\w+/g; // Match full hashtags

  const parts = input.split(/(#\w+)/g); // Split the text, keeping hashtags in the array

  return parts.map((part, idx) => {
    if (hashtagRegex.test(part)) {
      // If the part is a hashtag, style it
      return (
        <span key={idx} className="text-blue-500">
          {part}
        </span>
      );
    }

    // Otherwise, render plain text
    return <span key={idx}>{part}</span>;
  });
};
