import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getBlogs, type BlogPost } from "../../lib/cms";

const FALLBACK_IMAGE = "/images/mockproduct.jpg";

export const metadata: Metadata = {
  title: "הבלוג | POLARIZED-X",
  description: "טיפים, השראה וסיפורים מעולם המשקפיים.",
};

function ArrowLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>
  );
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col rounded-2xl overflow-hidden transition-opacity hover:opacity-90 bg-zinc-900">
      <div className="relative h-72 w-full">
        <Image src={post.featuredImage ?? FALLBACK_IMAGE} alt={post.title} fill className="object-cover" />
      </div>
      <div dir="rtl" className="flex flex-col items-start text-start gap-2 p-5">
        {post.publishedAt && (
          <span className="text-lg text-white">
            {new Date(post.publishedAt).toLocaleDateString("he-IL", { day: "numeric", month: "long", year: "numeric" })}
          </span>
        )}
        <h3 className="font-normal text-white text-3xl leading-snug">{post.title}</h3>
        {post.metaDescription && (
          <p className="text-lg font-normal leading-relaxed text-zinc-300">{post.metaDescription}</p>
        )}
        <div className="inline-flex items-center gap-1.5 text-base font-semibold mt-1 text-white">
          קרא עוד <ArrowLeftIcon />
        </div>
      </div>
    </Link>
  );
}

export default async function BlogPage() {
  const posts = await getBlogs();
  const [featured, ...rest] = posts;

  const headerTitle = "הבלוג שלנו";
  const headerSubtitle = "טיפים, השראה וסיפורים מעולם המשקפיים.";

  return (
    <>
      <main className="flex-1 bg-black py-20 px-6 lg:px-12">
        <div dir="rtl" className="site-container">

          <div className="text-center mb-14">
            <h1 className="title-h2 mb-4 mt-16">{headerTitle}</h1>
            <p className="text-2xl font-light text-white">{headerSubtitle}</p>
          </div>

          {posts.length === 0 && (
            <p className="text-center text-xl text-white/50">אין פוסטים עדיין. בקרוב!</p>
          )}

          {featured && (
            <div className="rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 mb-8 bg-zinc-900">
              <div className="relative min-h-80 lg:min-h-96">
                <Image src={featured.featuredImage ?? FALLBACK_IMAGE} alt={featured.title} fill className="object-cover" />
              </div>
              <div className="flex flex-col items-start text-start justify-center p-8 gap-4">
                {featured.publishedAt && (
                  <span className="text-lg text-white">
                    {new Date(featured.publishedAt).toLocaleDateString("he-IL", { day: "numeric", month: "long", year: "numeric" })}
                  </span>
                )}
                <h2 className="text-4xl font-normal text-white leading-snug">{featured.title}</h2>
                {featured.metaDescription && (
                  <p className="text-xl font-light leading-relaxed text-zinc-300">{featured.metaDescription}</p>
                )}
                <Link href={`/blog/${featured.slug}`} className="inline-flex items-center gap-1.5 text-lg font-semibold mt-2 transition-opacity hover:opacity-75 text-white">
                  קרא עוד <ArrowLeftIcon />
                </Link>
              </div>
            </div>
          )}

          {rest.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14">
              {rest.map((post) => <PostCard key={post.id} post={post} />)}
            </div>
          )}

        </div>
      </main>
    </>
  );
}
