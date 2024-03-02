import "./App.css";
import { CounterProvider, useCounterContext } from "./context";
import { create } from "zustand";
import { usePokemonListQuery } from "./queries";

interface CounterStore {
  count: number;
  increment: () => void;
}

const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

function App() {
  const pokemonListQuery = usePokemonListQuery();

  if (pokemonListQuery.isLoading) {
    return <p>Loading...</p>;
  }

  const { data: pokemons } = pokemonListQuery;
  if (pokemonListQuery.isError || !pokemons) {
    return <p>Error</p>;
  }

  return (
    <>
      <CounterConsumer />
      {pokemons.map((pokemon) => (
        <p key={pokemon.name}>{pokemon.name}</p>
      ))}
    </>
  );
}

function CounterConsumer() {
  return (
    <div>
      <Counter />
      <Increment />
    </div>
  );
}

function Counter() {
  const { count } = useCounterStore();
  return <p>{count}</p>;
}

function Increment() {
  const { increment } = useCounterStore();
  return <button onClick={() => increment()}>Increment</button>;
}

export default App;

interface Pokemon {
  name: string;
}

export function PokemonCreateForm({
  initialData,
  onSubmit,
}: {
  initialData?: Pokemon;
  onSubmit: (pokemon: Pokemon) => void;
}) {
  const [name, setName] = React.useState(initialData?.name || "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // ...
    await onSubmit({ name });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
}

function PokmemonUpsertFormPage() {
  const pokemonDetailQuery = usePokemonDetailQuery();
  const pokemonDetailMutation = usePokemonDetailMutation();

  if (pokemonDetailQuery.isLoading) {
    return <p>Loading...</p>;
  }

  if (pokemonDetailQuery.isError) {
    return <p>Error</p>;
  }

  const handleSubmit = (pokemon: Pokemon) => {
    pokemonDetailMutation.mutate(pokemon);
  };

  const { data: initialData } = pokemonDetailQuery;
  return (
    <PokemonCreateForm onSubmit={handleSubmit} initialData={initialData} />
  );
}
