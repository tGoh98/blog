import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import Terminal from '@/components/Terminal';
import AnimatedShapes from '@/components/AnimatedShapes';
import { SiGithub, SiLinkedin } from 'react-icons/si';
import { IoNewspaper } from 'react-icons/io5';

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background shapes */}
      <AnimatedShapes />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-8 pb-32">
        <div className="max-w-6xl w-full space-y-16">
          {/* Header Section */}
          <div className="max-w-3xl">
            <FadeIn delay={0}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
                🌊 Hey there, I&apos;m Tim
              </h1>
            </FadeIn>

            <FadeIn delay={200}>
              <p className="text-xl sm:text-2xl text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
                A place for my random ramblings
              </p>
            </FadeIn>

            <FadeIn delay={400}>
              <div className="flex gap-4">
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center w-10 h-10 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 rounded-full hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors"
                  aria-label="Blog"
                >
                  <IoNewspaper size={20} />
                </Link>
                <a
                  href="https://linkedin.com/in/timothy-goh99"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 rounded-full hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors"
                  aria-label="LinkedIn"
                >
                  <SiLinkedin size={20} />
                </a>
                <a
                  href="https://github.com/tgoh98"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 rounded-full hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors"
                  aria-label="GitHub"
                >
                  <SiGithub size={20} />
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Terminal Section */}
          <FadeIn delay={600}>
            <div className="flex justify-center">
              <Terminal />
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
