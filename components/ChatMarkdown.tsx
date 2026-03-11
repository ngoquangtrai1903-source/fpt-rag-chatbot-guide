import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface ChatMarkdownProps {
  content: string
  className?: string
}

export default function ChatMarkdown({ content, className = '' }: ChatMarkdownProps) {
  return (
    <div className={`prose prose-sm max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[
          remarkGfm, // GitHub Flavored Markdown - hỗ trợ tables, lists
          remarkBreaks, // Xử lý line breaks tốt hơn
        ]}
        components={{
          // Custom components cho từng loại content
          h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
            <h1 
              {...props} 
              className="text-xl font-bold text-gray-900 mt-4 mb-2 first:mt-0"
            >
              {children}
            </h1>
          ),
          h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
            <h2 
              {...props} 
              className="text-lg font-semibold text-gray-900 mt-3 mb-2 first:mt-0"
            >
              {children}
            </h2>
          ),
          h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
            <h3 
              {...props} 
              className="text-base font-semibold text-gray-900 mt-2 mb-1 first:mt-0"
            >
              {children}
            </h3>
          ),
          p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
            <p 
              {...props} 
              className="mb-3 leading-relaxed text-gray-700 last:mb-0"
            >
              {children}
            </p>
          ),
          strong: ({ children, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
            <strong 
              {...props} 
              className="font-semibold text-gray-900"
            >
              {children}
            </strong>
          ),
          b: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
            <b 
              {...props} 
              className="font-semibold text-gray-900"
            >
              {children}
            </b>
          ),
          em: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
            <em 
              {...props} 
              className="italic text-gray-600"
            >
              {children}
            </em>
          ),
          i: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
            <i 
              {...props} 
              className="italic text-gray-600"
            >
              {children}
            </i>
          ),
          ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
            <ul 
              {...props} 
              className="list-disc list-inside mb-3 space-y-1 ml-4"
              style={{ listStylePosition: 'outside' }}
            >
              {children}
            </ul>
          ),
          ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
            <ol 
              {...props} 
              className="list-decimal list-inside mb-3 space-y-1 ml-4"
            >
              {children}
            </ol>
          ),
          li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
            <li 
              {...props} 
              className="mb-1 text-gray-700 leading-relaxed"
              style={{ 
                display: 'list-item',
                listStylePosition: 'outside',
                paddingLeft: '0.5em'
              }}
            >
              {children}
            </li>
          ),
          blockquote: ({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
            <blockquote 
              {...props} 
              className="border-l-4 border-orange-300 pl-4 py-2 my-3 bg-orange-50 rounded-r-lg"
            >
              {children}
            </blockquote>
          ),
          a: ({ children, href, ...props }: React.HTMLAttributes<HTMLAnchorElement> & { href?: string }) => (
            <a 
              {...props} 
              href={href}
              className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
            <div className="overflow-x-auto my-4">
              <table 
                {...props} 
                className="min-w-full border-collapse border border-gray-300 rounded-lg overflow-hidden"
              >
                {children}
              </table>
            </div>
          ),
          thead: ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
            <thead 
              {...props} 
              className="bg-gray-100"
            >
              {children}
            </thead>
          ),
          tbody: ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
            <tbody 
              {...props} 
              className="bg-white divide-y divide-gray-200"
            >
              {children}
            </tbody>
          ),
          tr: ({ children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
            <tr 
              {...props} 
              className="hover:bg-gray-50 transition-colors"
            >
              {children}
            </tr>
          ),
          th: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
            <th 
              {...props} 
              className="px-4 py-2 text-left font-semibold text-gray-900 border-b border-gray-300"
            >
              {children}
            </th>
          ),
          td: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
            <td 
              {...props} 
              className="px-4 py-2 text-gray-700 border-b border-gray-200"
            >
              {children}
            </td>
          ),
          hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
            <hr 
              {...props} 
              className="my-4 border-gray-300"
            />
          ),
          code: ({ inline, children, ...props }: React.HTMLAttributes<HTMLElement> & { inline?: boolean }) => {
            if (inline) {
              return (
                <code 
                  {...props} 
                  className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono"
                >
                  {children}
                </code>
              )
            }
            return (
              <SyntaxHighlighter
                {...props}
                style={oneDark}
                language="text"
                PreTag="div"
                customStyle={{
                  margin: '1em 0',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                }}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            )
          },
          pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
            return <>{children}</>
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
