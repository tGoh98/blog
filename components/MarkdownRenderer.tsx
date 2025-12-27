import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-zinc dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
        h1: ({ children }) => (
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mt-8 mb-4">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mt-8 mb-4">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mt-6 mb-3">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
            {children}
          </p>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400 mb-4 space-y-2">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside text-zinc-600 dark:text-zinc-400 mb-4 space-y-2">
            {children}
          </ol>
        ),
        li: ({ children }) => <li className="ml-4">{children}</li>,
        code: ({ className, children, ...props }) => {
          const isInline = !className;
          if (isInline) {
            return (
              <code
                className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 px-1.5 py-0.5 rounded text-sm font-mono"
                {...props}
              >
                {children}
              </code>
            );
          }
          return (
            <code
              className="block bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 p-4 rounded-lg overflow-x-auto text-sm font-mono"
              {...props}
            >
              {children}
            </code>
          );
        },
        pre: ({ children }) => (
          <pre className="mb-4 overflow-x-auto">{children}</pre>
        ),
        a: ({ children, href }) => (
          <a
            href={href}
            className="text-zinc-900 dark:text-zinc-50 underline hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-zinc-300 dark:border-zinc-700 pl-4 italic text-zinc-600 dark:text-zinc-400 my-4">
            {children}
          </blockquote>
        ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
