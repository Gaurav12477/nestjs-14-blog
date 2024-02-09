import { Card , CardContent} from "@/components/ui/card";
import { simpleBlogCard } from "./lib/interface";
import { client, urlFor } from "./lib/sanity";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getData() {
  const query = `
  *[_type == 'blog'] | order(_createdAt.desc) {
    title,
      smallDescription,
      "currentSlug": slug.current,
      titleImage
  }`; 

  const data = await client.fetch(query);
  return data; 
}

export default async function Home() {
  const data: simpleBlogCard[] = await getData();
  return (
    <div>
     
     <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
      {data.map((post, idx) => (
        <Card className="shadow-xl" key={idx}>
          <Image className="rounded-t-lg h-[200px] object-cover" src={urlFor(post.titleImage).url()} alt="hi" width={500} height={500} />
          <CardContent className="mt-5">
            <h2 className="text-lg font-bold line-clamp-2 text-blue-500">{post.title}</h2>
            <p className="line-clamp-3 text-sm mt-2 text-gray-500 dark:text-white">{post.smallDescription}</p>
        
          <Button asChild className="w-full mt-7">
            <Link href={`/blog/${post.currentSlug}`}>Read more</Link>
          </Button>
          </CardContent>
        </Card>
      ))}
     </div>
      
    </div>
  );
}
