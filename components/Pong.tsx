'use client';

import { useEffect, useRef, useState } from 'react';

export default function Pong() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState({ player: 0, computer: 0 });
  const [countdown, setCountdown] = useState(5);
  const [gameStarted, setGameStarted] = useState(false);
  const gameStateRef = useRef({
    ball: { x: 400, y: 300, dx: 4, dy: 4, radius: 8 },
    playerPaddle: { x: 20, y: 250, width: 10, height: 100 },
    computerPaddle: { x: 770, y: 250, width: 10, height: 100 },
    keys: { up: false, down: false },
  });

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setGameStarted(true);
    }
  }, [countdown]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const state = gameStateRef.current;

    // Don't start game loop until countdown is done
    if (!gameStarted) {
      // Draw initial state with countdown
      ctx.fillStyle = '#18181b';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw countdown
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 72px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(countdown.toString(), canvas.width / 2, canvas.height / 2);

      ctx.font = '24px monospace';
      ctx.fillStyle = '#a1a1aa';
      ctx.fillText('Game starting...', canvas.width / 2, canvas.height / 2 + 60);

      return;
    }

    // Keyboard controls
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' || e.key === 'K') {
        e.preventDefault();
        state.keys.up = true;
      }
      if (e.key === 'j' || e.key === 'J') {
        e.preventDefault();
        state.keys.down = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'k' || e.key === 'K') {
        e.preventDefault();
        state.keys.up = false;
      }
      if (e.key === 'j' || e.key === 'J') {
        e.preventDefault();
        state.keys.down = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Game loop
    let animationId: number;

    const gameLoop = () => {
      // Clear canvas
      ctx.fillStyle = '#18181b';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw center line
      ctx.strokeStyle = '#3f3f46';
      ctx.setLineDash([10, 10]);
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.stroke();
      ctx.setLineDash([]);

      // Update player paddle
      if (state.keys.up && state.playerPaddle.y > 0) {
        state.playerPaddle.y -= 6;
      }
      if (state.keys.down && state.playerPaddle.y < canvas.height - state.playerPaddle.height) {
        state.playerPaddle.y += 6;
      }

      // Simple AI for computer paddle (easier difficulty)
      const computerCenter = state.computerPaddle.y + state.computerPaddle.height / 2;
      if (computerCenter < state.ball.y - 40) {
        state.computerPaddle.y += 2.5;
      } else if (computerCenter > state.ball.y + 40) {
        state.computerPaddle.y -= 2.5;
      }

      // Update ball position
      state.ball.x += state.ball.dx;
      state.ball.y += state.ball.dy;

      // Ball collision with top/bottom
      if (state.ball.y - state.ball.radius < 0 || state.ball.y + state.ball.radius > canvas.height) {
        state.ball.dy *= -1;
      }

      // Ball collision with player paddle
      if (
        state.ball.x - state.ball.radius < state.playerPaddle.x + state.playerPaddle.width &&
        state.ball.y > state.playerPaddle.y &&
        state.ball.y < state.playerPaddle.y + state.playerPaddle.height
      ) {
        state.ball.dx = Math.abs(state.ball.dx);
        // Add some variation based on where ball hits paddle
        const hitPos = (state.ball.y - state.playerPaddle.y) / state.playerPaddle.height;
        state.ball.dy = (hitPos - 0.5) * 8;
      }

      // Ball collision with computer paddle
      if (
        state.ball.x + state.ball.radius > state.computerPaddle.x &&
        state.ball.y > state.computerPaddle.y &&
        state.ball.y < state.computerPaddle.y + state.computerPaddle.height
      ) {
        state.ball.dx = -Math.abs(state.ball.dx);
        const hitPos = (state.ball.y - state.computerPaddle.y) / state.computerPaddle.height;
        state.ball.dy = (hitPos - 0.5) * 8;
      }

      // Score points
      if (state.ball.x < 0) {
        setScore((prev) => ({ ...prev, computer: prev.computer + 1 }));
        resetBall();
      } else if (state.ball.x > canvas.width) {
        setScore((prev) => ({ ...prev, player: prev.player + 1 }));
        resetBall();
      }

      // Draw player paddle
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(state.playerPaddle.x, state.playerPaddle.y, state.playerPaddle.width, state.playerPaddle.height);

      // Draw computer paddle
      ctx.fillRect(state.computerPaddle.x, state.computerPaddle.y, state.computerPaddle.width, state.computerPaddle.height);

      // Draw ball
      ctx.beginPath();
      ctx.arc(state.ball.x, state.ball.y, state.ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      animationId = requestAnimationFrame(gameLoop);
    };

    const resetBall = () => {
      state.ball.x = canvas.width / 2;
      state.ball.y = canvas.height / 2;
      state.ball.dx = (Math.random() > 0.5 ? 1 : -1) * 4;
      state.ball.dy = (Math.random() - 0.5) * 4;
    };

    gameLoop();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationId);
    };
  }, [gameStarted, countdown]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-8 text-xl font-mono text-zinc-50">
        <div>You: {score.player}</div>
        <div>Computer: {score.computer}</div>
      </div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="border-2 border-zinc-700 rounded-lg bg-zinc-900"
      />
      <p className="text-sm text-zinc-400">Use K ↑ and J ↓ to move your paddle</p>
    </div>
  );
}
