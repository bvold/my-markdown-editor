'use client';

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function MarkdownEditor({ slug }) {
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, [slug]);

  const fetchContent = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/markdown/${slug}`);
      const data = await response.json();
      setContent(data.content);
    } catch (error) {
      console.error('Failed to fetch content:', error);
    }
    setIsLoading(false);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/markdown/${slug}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });
      if (response.ok) {
        setIsEditing(false);
      } else {
        console.error('Failed to save content');
      }
    } catch (error) {
      console.error('Error saving content:', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      {isEditing ? (
        <div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-64 p-2 border rounded"
          />
          <button
            onClick={handleSave}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      ) : (
        <div>
          <ReactMarkdown
            components={{
              code({node, inline, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={atomDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              }
            }}
          >
            {content}
          </ReactMarkdown>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}