import MarkdownEditor from '../components/MarkdownEditor';

export default function MarkdownPage({ params }) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{params.slug}</h1>
      <MarkdownEditor slug={params.slug} />
    </div>
  );
}

export async function generateStaticParams() {
  // Implement logic to get all markdown file paths
  // For now, we'll return an empty array
  return [];
}