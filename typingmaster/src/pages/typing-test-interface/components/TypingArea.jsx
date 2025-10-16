import React, { useState, useEffect, useRef, useCallback } from 'react';
import Icon from '../../../components/AppIcon';

const TypingArea = ({
  testText,
  isTestActive,
  onTestComplete,
  onProgress,
  className = ''
}) => {
  const [userInput, setUserInput] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [errors, setErrors] = useState([]);
  const textareaRef = useRef(null);
  const containerRef = useRef(null);

  const words = testText?.split(' ');

  // Focus textarea when test starts
  useEffect(() => {
    if (isTestActive && textareaRef?.current) {
      textareaRef?.current?.focus();
    }
  }, [isTestActive]);

  // Handle input changes
  const handleInputChange = useCallback((e) => {
    if (!isTestActive) return;

    const typedValue = e.target.value;
    const lastChar = typedValue[typedValue.length - 1];
    const currentWord = words[currentWordIndex];

    // Ignore backspace and other non-character keys for progress tracking
    if (typedValue.length <= userInput.length) {
      setUserInput(typedValue);
      setCurrentCharIndex(typedValue.length);
      return;
    }

    const isCorrectChar = currentWord[currentCharIndex] === lastChar;
    onProgress({ correct: isCorrectChar, char: lastChar });

    // Handle word completion
    if (lastChar === ' ') {
      const typedWord = typedValue.trim();
      if (typedWord === currentWord) {
        onProgress({ correct: true, char: ' ', wordCompleted: true });
      } else {
        setErrors(prev => [...prev, { wordIndex: currentWordIndex, word: typedWord }]);
      }

      setCurrentWordIndex(prev => prev + 1);
      setCurrentCharIndex(0);
      setUserInput('');
    } else {
      setUserInput(typedValue);
      setCurrentCharIndex(typedValue.length);
    }

    // Handle test completion
    if (currentWordIndex === words.length - 1 && typedValue === currentWord) {
      onProgress({ correct: true, wordCompleted: true });
      onTestComplete();
    }
  }, [
    isTestActive,
    userInput,
    currentWordIndex,
    currentCharIndex,
    words,
    onProgress,
    onTestComplete,
  ]);

  // Reset state when test starts/stops
  useEffect(() => {
    if (!isTestActive) {
      setUserInput('');
      setCurrentWordIndex(0);
      setCurrentCharIndex(0);
      setErrors([]);
    }
  }, [isTestActive]);

  // Render word with character-level feedback
  const renderWord = (word, wordIndex) => {
    const isCurrentWord = wordIndex === currentWordIndex;
    const hasError = errors?.some(error => error?.wordIndex === wordIndex);

    return (
      <span
        key={wordIndex}
        className={`inline-block mr-2 mb-1 px-1 rounded ${
          isCurrentWord
            ? 'bg-primary/10 border-b-2 border-primary'
            : hasError
            ? 'bg-error/10 text-error'
            : wordIndex < currentWordIndex
            ? 'text-success' :'text-muted-foreground'
        }`}
      >
        {word?.split('')?.map((char, charIndex) => {
          let charClass = '';

          if (isCurrentWord && isTestActive) {
            if (charIndex < currentCharIndex) {
              const typedChar = userInput?.[charIndex];
              charClass = typedChar === char ? 'text-success bg-success/10' : 'text-error bg-error/10';
            } else if (charIndex === currentCharIndex) {
              charClass = 'bg-primary text-primary-foreground animate-pulse';
            }
          }

          return (
            <span key={charIndex} className={charClass}>
              {char}
            </span>
          );
        })}
      </span>
    );
  };

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-lg font-heading font-medium text-foreground">Typing Area</h3>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Type" size={16} />
          <span>Word {currentWordIndex + 1} of {words?.length}</span>
        </div>
      </div>
      {/* Text Display */}
      <div
        ref={containerRef}
        className="p-6 min-h-[300px] max-h-[400px] overflow-y-auto"
      >
        <div className="text-lg leading-relaxed font-data">
          {words?.map((word, index) => renderWord(word, index))}
        </div>
      </div>
      {/* Input Area */}
      <div className="p-4 border-t border-border">
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={userInput}
            onChange={handleInputChange}
            disabled={!isTestActive}
            placeholder={isTestActive ? "Start typing..." : "Click 'Start Typing Test' to begin"}
            className="w-full h-20 p-3 border border-border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:bg-muted disabled:cursor-not-allowed font-data text-base"
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
          />

          {/* Input Status Indicator */}
          <div className="absolute bottom-2 right-2 flex items-center space-x-2">
            {isTestActive && (
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span>Active</span>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-3 text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-success/20 rounded" />
              <span>Correct</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-error/20 rounded" />
              <span>Error</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-primary/20 rounded" />
              <span>Current</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingArea;