export function removeDuplicates(lista) {
  const objetosUnicos = [];
  const idsVistos = new Set();

  for (const obj of lista) {
    if (!idsVistos.has(obj.name)) {
      objetosUnicos.push(obj);
      idsVistos.add(obj.name);
    }
  }

  return objetosUnicos;
}
