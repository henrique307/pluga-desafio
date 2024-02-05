export async function getData() {
  return await fetch("https://pluga.co/ferramentas_search.jsona")
    .catch((e) => {})
    .then((res) => res.json());
}
