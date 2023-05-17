import React from 'react';

export const highlightedText = (dropdownText: string, inputText: string) => {
  if (inputText !== '' && dropdownText.includes(inputText)) {
    const parts = dropdownText.split(new RegExp(`(${inputText})`, 'g'));

    return (
      <>
        {parts.map((part, index) =>
          part === inputText ? (
            <span className="highlight" key={index}>
              {part}
            </span>
          ) : (
            part
          ),
        )}
      </>
    );
  }

  return dropdownText;
};
