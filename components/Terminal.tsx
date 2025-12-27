'use client';

import { useState, useEffect, useRef } from 'react';

interface Command {
  input: string;
  output: string[];
  delay?: number;
}

const commands: Command[] = [
  {
    input: '$ whoami',
    output: ['Tim Goh'],
    delay: 2000,
  },
  {
    input: '$ ps aux',
    output: ['Working on database @ Figma', 'Playing on the side'],
    delay: 800,
  },
  {
    input: '$ history | tail -n 5',
    output: [
      '2019  Q2 [intern]',
      '2020  BILL [intern]',
      '2021  Salesforce [intern]',
      '2022  Figma [intern]',
      '2022  Rice University | CS & Entrepreneurship',
    ],
    delay: 800,
  },
];

export default function Terminal() {
  const [displayedCommands, setDisplayedCommands] = useState<
    Array<{ input: string; output: string[] }>
  >([]);
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [typingInput, setTypingInput] = useState('');
  const [typingOutputLines, setTypingOutputLines] = useState<string[]>([]);
  const [isTypingInput, setIsTypingInput] = useState(false);
  const [isTypingOutput, setIsTypingOutput] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const outputIndexRef = useRef(0);
  const charIndexRef = useRef(0);

  // Blinking cursor
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 400);
    return () => clearInterval(cursorInterval);
  }, []);

  // Main command sequence controller
  useEffect(() => {
    if (currentCommandIndex >= commands.length) return;

    const command = commands[currentCommandIndex];
    const startDelay = command.delay || 0;

    const startTimer = setTimeout(() => {
      // Add previous command to history if it exists
      if (typingInput) {
        setDisplayedCommands((prev) => [
          ...prev,
          { input: typingInput, output: typingOutputLines },
        ]);
      }

      // Clear and start new command
      setTypingInput('');
      setTypingOutputLines([]);
      setIsTypingInput(true);
      let inputCharIndex = 0;

      const inputInterval = setInterval(() => {
        if (inputCharIndex < command.input.length) {
          setTypingInput(command.input.slice(0, inputCharIndex + 1));
          inputCharIndex++;
        } else {
          clearInterval(inputInterval);

          // Keep command visible and start output
          setTimeout(() => {
            setIsTypingInput(false);
            setIsTypingOutput(true);
            outputIndexRef.current = 0;
            charIndexRef.current = 0;
          }, 150);
        }
      }, 40);

      return () => clearInterval(inputInterval);
    }, startDelay);

    return () => clearTimeout(startTimer);
  }, [currentCommandIndex]);

  // Output typing animation
  useEffect(() => {
    if (!isTypingOutput || currentCommandIndex >= commands.length) return;

    const command = commands[currentCommandIndex];

    const typeOutput = () => {
      const outputLineIndex = outputIndexRef.current;
      const charIndex = charIndexRef.current;

      // Check if we're done with all output lines
      if (outputLineIndex >= command.output.length) {
        setIsTypingOutput(false);

        // Move to next command after a pause
        setTimeout(() => {
          setCurrentCommandIndex((prev) => prev + 1);
        }, 200);
        return;
      }

      const currentLine = command.output[outputLineIndex];

      // Check if we're done with current line
      if (charIndex > currentLine.length) {
        // Move to next line
        outputIndexRef.current++;
        charIndexRef.current = 0;
        setTimeout(typeOutput, 100);
        return;
      }

      // Type next character
      setTypingOutputLines((prev) => {
        const newLines = [...prev];
        newLines[outputLineIndex] = currentLine.slice(0, charIndex);
        return newLines;
      });

      charIndexRef.current++;
      setTimeout(typeOutput, 25);
    };

    typeOutput();
  }, [isTypingOutput, currentCommandIndex, typingInput]);

  const currentOutputLine = outputIndexRef.current;

  return (
    <div className="w-full max-w-3xl bg-zinc-900 dark:bg-zinc-950 rounded-lg shadow-2xl border border-zinc-800 overflow-hidden">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-zinc-800 dark:bg-zinc-900 border-b border-zinc-700">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-zinc-400 text-sm ml-2 font-mono">terminal</div>
      </div>

      {/* Terminal Body */}
      <div className="p-6 font-mono text-sm min-h-[300px] whitespace-pre-wrap">
        {/* Already completed commands */}
        {displayedCommands.map((cmd, idx) => (
          <div key={idx} className="mb-4">
            <div className="text-green-400">{cmd.input}</div>
            {cmd.output.map((line, lineIdx) => (
              <div key={lineIdx} className="text-zinc-300 mt-1">
                {line}
              </div>
            ))}
          </div>
        ))}

        {/* Currently active command */}
        {typingInput && (
          <div className="mb-4">
            <div className="text-green-400">
              {typingInput}
              {isTypingInput && showCursor && <span className="text-green-400">█</span>}
            </div>
            {typingOutputLines.map((line, idx) => (
              <div key={idx} className="text-zinc-300 mt-1">
                {line}
                {isTypingOutput && idx === currentOutputLine && showCursor && (
                  <span className="text-zinc-300">█</span>
                )}
              </div>
            ))}
            {/* Show cursor after output while waiting for next command */}
            {!isTypingInput && !isTypingOutput && currentCommandIndex < commands.length && (
              <div className="text-green-400 mt-1">
                <span className={showCursor ? 'opacity-100' : 'opacity-0'}>
                  █
                </span>
              </div>
            )}
          </div>
        )}

        {/* Show cursor when waiting between commands or before first command */}
        {!isTypingInput &&
          !isTypingOutput &&
          !typingInput &&
          currentCommandIndex < commands.length && (
            <div className="text-green-400">
              <span className={showCursor ? 'opacity-100' : 'opacity-0'}>
                █
              </span>
            </div>
          )}
      </div>
    </div>
  );
}
