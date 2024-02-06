export async function getData() {
  return await fetch("https://pluga.co/ferramentas_search.json")
    .catch((e) => {})
    .then((res) => res.json());
}
