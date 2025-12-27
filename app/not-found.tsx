import Link from 'next/link';
import Pong from '@/components/Pong';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-8 pb-16">
      <div className="text-center mb-4 max-w-2xl">
        <h1 className="text-2xl sm:text-3xl font-medium text-zinc-900 dark:text-zinc-50 mb-3">
          404 Not Found
        </h1>
        <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 mb-2">
          But that&apos;s OK, we&apos;re all searching for answers. In the meantime, enjoy a simple game of pong -- a distant relative of beer pong.
        </p>
      </div>

      <Pong />
    </div>
  );
}
