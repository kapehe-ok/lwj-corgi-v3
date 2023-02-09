import { createClient, groq } from "next-sanity";

const clientConfig = {
  projectId: "0zxm1jwh",
  dataset: "production",
  apiVersion: "2021-10-21",
  useCdn: false,
};

function getCorgi(name) {
  return createClient(clientConfig).fetch(
    groq`*[_type == "corgi" && slug.current == $name][0]{
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      "image": image.asset->url,
      content,
    }`,
    { name }
  )
}

export default async function Corgi({ params }) {
  const corgi = await getCorgi(params.corgi)

  console.log(corgi)

  return (
    <div>{corgi.name}</div>
  )
}
