import Link from 'next/link';
import Image from 'next/image';

export default function Navigation() {
  return (
    <nav className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end h-16 pb-3">
          <Link
            href="/home"
            className="flex hover:opacity-80 transition-opacity mb-1"
          >
            <Image
              src="/icon.png"
              alt="Blog Logo"
              width={40}
              height={40}
              className="object-contain rounded-full"
              priority
            />
          </Link>
          <div className="flex gap-8">
            <Link
              href="/home"
              className="text-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
            >
              /home
            </Link>
            <Link
              href="/blog"
              className="text-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
            >
              /blog
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
