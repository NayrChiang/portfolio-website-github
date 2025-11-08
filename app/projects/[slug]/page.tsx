import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import ProjectDetail from '@/components/ProjectDetail'
import { projectsData } from '@/data/projects'

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const project = projectsData.find((p) => p.slug === params.slug)

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: `${project.title} | Portfolio`,
    description: project.shortDescription,
    keywords: project.technologies,
  }
}

export default function ProjectPage({
  params,
}: {
  params: { slug: string }
}) {
  const project = projectsData.find((p) => p.slug === params.slug)

  if (!project) {
    notFound()
  }

  return <ProjectDetail project={project} />
}

