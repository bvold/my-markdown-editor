import Link from 'next/link';

async function getMarkdownFiles() {
  // For now, we're using hardcoded data
  // In a real application, you'd fetch this from your GitHub repo
  return [
    { slug: 'example', title: 'Example Markdown' },
    // Add more files here as needed
  ];
}

export default async function Home() {
  const files = await getMarkdownFiles();

  return (
    <div>
      <h1>Markdown Files</h1>
      <ul>
        {files.map((file) => (
          <li key={file.slug}>
            <Link href={`/${file.slug}`}>
              {file.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}