import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Platform } from 'react-native';
import { Text, Vibration, type TextStyle, type StyleProp } from 'react-native';

const DEFAULT_MAX_DELAY = 100;
const DEFAULT_MIN_DELAY = 10;

export type TypingAnimationProps = {
  // The text to be typed.
  content: string;
  // The maximum delay between each character.
  maxDelay?: number;
  // The minimum delay between each character.
  minDelay?: number;
  // Typing speed (1 = normal, <1 = slower, >1 = faster)
  typeSpeed?: number;
  // Callback function that is called when a character is typed.
  onTyped?: (char: string, currentCharIndex: number) => void;
  // Callback function that is called when the typing ends.
  onTypingEnd?: () => void;
  // The style of the text.
  style?: StyleProp<TextStyle>;
  // Whether to vibrate when a character is typed.
  vibration?: boolean;
  // Whether to use backspace effect.
  backspaceEffect?: boolean;
};

export const TypingAnimation = (props: TypingAnimationProps) => {
  const {
    content = "",
    onTyped,
    onTypingEnd,
    minDelay = DEFAULT_MIN_DELAY,
    maxDelay = DEFAULT_MAX_DELAY,
    typeSpeed = 1,
    vibration = false,
    backspaceEffect = false,
  } = props;

  const safeContent = typeof content === 'string' ? content : String(content || '');
  const initialIndex = backspaceEffect ? content.length : 0;
  const [currentCharIndex, setCurrentCharIndex] = useState(initialIndex);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const delta = backspaceEffect ? -1 : 1;

  const startTypeText = useCallback(
    (ms: number) => {
      const adjustedDelay = typeSpeed > 0 ? Math.round(ms / typeSpeed) : ms;
      
      timeoutId.current = setTimeout(() => {
        setCurrentCharIndex(currentCharIndex + delta);
        
      }, adjustedDelay);
    },
    [currentCharIndex, delta, typeSpeed]
  );

  const clear = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
    }
  };

  useEffect(() => {
    setCurrentCharIndex(initialIndex);
  }, [content, initialIndex]);

  useEffect(() => {
    clear();

    const currentChar = content.charAt(currentCharIndex);
    const nextChar = content.charAt(currentCharIndex + delta);

    if (currentChar) {
      onTyped?.(currentChar, currentCharIndex);
    }

    if (!nextChar) {
      onTypingEnd?.();
      return;
    }

    startTypeText(
      Math.round(Math.random() * (maxDelay - minDelay) + minDelay)
    );
  }, [
    onTyped,
    startTypeText,
    onTypingEnd,
    currentCharIndex,
    content,
    maxDelay,
    minDelay,
    delta,
  ]);

  return (
    <Text {...props}>
      {safeContent.substring(
        0,
        backspaceEffect ? currentCharIndex : currentCharIndex + 1
      )}
    </Text>
  );
}