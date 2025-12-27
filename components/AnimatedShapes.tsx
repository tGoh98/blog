'use client';

export default function AnimatedShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 border-2 border-zinc-300 dark:border-zinc-700 rotate-45 animate-float opacity-30"></div>

      <div className="absolute top-40 right-20 w-16 h-16 border-2 border-zinc-300 dark:border-zinc-700 rounded-full animate-float-delayed opacity-30"></div>

      <div className="absolute bottom-32 left-1/4 w-24 h-24 border-2 border-zinc-300 dark:border-zinc-700 animate-float-slow opacity-30">
        <div className="w-full h-full border-2 border-zinc-300 dark:border-zinc-700 rotate-45"></div>
      </div>

      <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-zinc-200 dark:bg-zinc-800 rotate-45 animate-spin-slow opacity-15"></div>

      <div className="absolute bottom-20 right-32 w-32 h-32 border-2 border-zinc-300 dark:border-zinc-700 rounded-full animate-pulse opacity-20"></div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      ></div>
    </div>
  );
}
