import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./styles.css";

export default function App() {
  const [character, setCharacter] = useState(null);
  const [search, setSearch] = useState("Luke Skywalker");
  const [error, setError] = useState(null);
  const { register, handleSubmit } = useForm();

  function handleSearch(data) {
    const { name } = data;

    setSearch(name);
    fetchCharacter();
  }
  async function fetchCharacter() {
    const url = `https://swapi.dev/api/people/?search=${search}`;
    const req = await fetch(url);
    const json = await req.json();
    if (json.count && json.count === 1) {
      setCharacter(json.results[0]);
      setError(null);
    } else {
      setError("Too many results");
      setCharacter(null);
    }
    console.log(json.results[0]);
  }

  return (
    <div className="App">
      <h1>Star Wars Heros</h1>
      <form onSubmit={handleSubmit(handleSearch)}>
        <label>Character Name</label>
        <input ref={register} id="name" name="name" />
        <input type="submit" value="Search" />
      </form>

      {error && <div>{error}</div>}
      {character && (
        <table border={1} className="character">
          <thead>
            <th colSpan={2}>
              <td>{character.name}</td>
            </th>
          </thead>
          <tbody>
            <tr>
              <td>Gender</td>
              <td>{character.gender}</td>
            </tr>
            <tr>
              <td>Birth year</td>
              <td>{character.birth_year}</td>
            </tr>
            <tr>
              <td>Height</td>
              <td>{character.height}</td>
            </tr>
            <tr>
              <td>Mass</td>
              <td>{character.mass}</td>
            </tr>
            <tr>
              <td>Hair color</td>
              <td>{character.hair_color}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
