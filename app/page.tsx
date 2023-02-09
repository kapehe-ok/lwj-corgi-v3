import Image from 'next/image'
import { Inter } from '@next/font/google'
import { createClient, groq } from "next-sanity";

const inter = Inter({ subsets: ['latin'] })

const clientConfig = {
  projectId: "0zxm1jwh",
  dataset: "production",
  apiVersion: "2021-10-21",
  useCdn: false,
};

/**
 * Get corgis
 */
function getCorgis() {
  return createClient(clientConfig).fetch(
    groq`*[_type == "corgi"]{
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      "image": image.asset->url,
      content,
    }`
  );
}

export default async function Home() {
  const corgis = await getCorgis();
  console.log(corgis)
  return (
    <div>
      {corgis.map((corgi) => {
        return (
          <div key={corgi._id}>
            <Image
              src={corgi.image}
              alt={corgi.name}
              width={300}
              height={250}
            />

            <div>
              {corgi.name}
            </div>
          </div>
        );
      })}
    </div>
  )
}
