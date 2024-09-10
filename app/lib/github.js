import { Octokit } from 'octokit';

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export async function getFile(path) {
  const { data } = await octokit.rest.repos.getContent({
    owner: process.env.GITHUB_REPO.split('/')[0],
    repo: process.env.GITHUB_REPO.split('/')[1],
    path,
  });
  return Buffer.from(data.content, 'base64').toString();
}

export async function updateFile(path, content) {
  const { data: existingFile } = await octokit.rest.repos.getContent({
    owner: process.env.GITHUB_REPO.split('/')[0],
    repo: process.env.GITHUB_REPO.split('/')[1],
    path,
  });

  await octokit.rest.repos.createOrUpdateFileContents({
    owner: process.env.GITHUB_REPO.split('/')[0],
    repo: process.env.GITHUB_REPO.split('/')[1],
    path,
    message: `Update ${path}`,
    content: Buffer.from(content).toString('base64'),
    sha: existingFile.sha,
  });
}