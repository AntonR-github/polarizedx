const CRM_URL = process.env.CRM_URL!
const CRM_API_KEY = process.env.CRM_API_KEY!
const SITE_SLUG = process.env.CRM_SITE_SLUG!

const headers = { 'x-api-key': CRM_API_KEY }

export interface BlogPost {
  id: string
  title: string
  slug: string
  publishedAt: string | null
  featuredImage: string | null
  metaTitle: string | null
  metaDescription: string | null
  ogImage: string | null
  tags: string[]
}

export interface BlogPostFull extends BlogPost {
  body: string
}

function isJson(res: Response) {
  return (res.headers.get('content-type') ?? '').includes('application/json')
}

export async function getBlogs(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${CRM_URL}/api/${SITE_SLUG}/blogs`, { headers, next: { revalidate: 60 }, signal: AbortSignal.timeout(10000) })
    if (!res.ok || !isJson(res)) return []
    return res.json()
  } catch { return [] }
}

export async function getBlog(slug: string): Promise<BlogPostFull | null> {
  try {
    const res = await fetch(`${CRM_URL}/api/${SITE_SLUG}/blogs/${slug}`, { headers, next: { revalidate: 60 }, signal: AbortSignal.timeout(10000) })
    if (!res.ok || !isJson(res)) return null
    return res.json()
  } catch { return null }
}
