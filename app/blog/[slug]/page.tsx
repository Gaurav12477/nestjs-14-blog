import { client, urlFor } from "@/app/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

export const revalidate = 30;

async function getBlogArticle(slug: string) {   
  const query = `
    *[_type == 'blog' && slug.current == $slug][0] {
      title,
      "currentSlug": slug.current,
      titleImage,
      content
    }`;

  const data = await client.fetch(query, { slug });
  return data;
}

export default async function BlogArticle({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getBlogArticle(params.slug);
  return (
    <div className="mt-8">
      <h1>
        <span className="block text-base text-center text-primary font-semibold">
          Gaurav Sharma --Blog
        </span>
        <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
          {data.title}
        </span>
      </h1>
      <Image
        className="rounded-lg h-[200px] object-cover border shadow-xl mt-8"
        src={urlFor(data.titleImage).url()}
        priority
        alt=""
        width={800}
        height={800}
      />

      <div className="prose prose-headings:underline prose-lg prose-blue mt-16 dark:text-zinc-50 text-sm sm:text-xl">
        <PortableText value={data.content} />
      </div>
    </div>
  );
}
