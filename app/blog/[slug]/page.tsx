import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/shared/Navbar";
import Footer from "../../components/shared/Footer";
import { getBlog, getBlogs } from "../../../lib/cms";

export async function generateStaticParams() {
  try {
    const posts = await getBlogs();
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlog(slug);
  if (!post) return { title: "בלוג | POLARIZED-X" };
  const ogImg = post.ogImage ?? post.featuredImage;
  return {
    title: `${post.metaTitle ?? post.title} | POLARIZED-X`,
    description: post.metaDescription ?? "",
    openGraph: ogImg ? { images: [{ url: ogImg }] } : undefined,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlog(slug);
  if (!post) notFound();

  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("he-IL", { day: "numeric", month: "long", year: "numeric" })
    : null;

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-black min-h-screen">

        {post.featuredImage && (
          <div className="relative w-full h-80 lg:h-[480px]">
            <Image src={post.featuredImage} alt={post.title} fill className="object-cover" priority />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, #000 100%)" }} />
          </div>
        )}

        <div dir="rtl" className="site-container px-6 lg:px-12 py-14 max-w-3xl mx-auto">

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-base mb-8 transition-opacity hover:opacity-70 text-white/70"
          >
            ← חזרה לבלוג
          </Link>

          {date && <p className="text-lg mb-3 text-white/60">{date}</p>}
          <h1 className="title-h2 text-white mb-8 leading-snug">{post.title}</h1>

          <article
            className="blog-body text-gray-200"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />

          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-white/10">
              {post.tags.map((tag) => (
                <span key={tag} className="text-sm px-3 py-1 rounded-full border border-white/20 text-gray-400">
                  #{tag}
                </span>
              ))}
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}
