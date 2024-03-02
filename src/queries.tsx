import { useQuery } from "@tanstack/react-query";

async function fetchPokemonList() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon");
  const data = await response.json();
  return data.results;
}

export function usePokemonListQuery() {
  return useQuery({
    queryKey: ["pokemonList"],
    queryFn: () => fetchPokemonList(),
    notifyOnChangeProps: ["data"],
  });
}
