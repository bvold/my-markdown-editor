import { getFile, updateFile } from '../../../lib/github';
import matter from 'gray-matter';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const rawContent = await getFile(`${params.slug}.md`);
    const { content, data: metadata } = matter(rawContent);
    return NextResponse.json({ content, metadata });
  } catch (error) {
    console.error('Error fetching file:', error);
    return NextResponse.json({ error: 'Failed to fetch file' }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  try {
    const { content } = await request.json();
    const rawContent = await getFile(`${params.slug}.md`);
    const { data: metadata } = matter(rawContent);
    const updatedRawContent = matter.stringify(content, metadata);
    await updateFile(`${params.slug}.md`, updatedRawContent);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating file:', error);
    return NextResponse.json({ error: 'Failed to update file' }, { status: 500 });
  }
}