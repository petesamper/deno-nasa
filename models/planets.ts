import { join } from "https://deno.land/std/path/mod.ts";
import { BufReader } from "https://deno.land/std/io/bufio.ts";
// ^^^ before sending data back byte-by-byte, buffers(waits), sends back (ex.): full line of data.
import { parse } from "https://deno.land/std/encoding/csv.ts";

// Lodash
import * as _ from "https://deno.land/x/lodash@4.17.15-es/lodash.js";

type Planet = Record<string, string>;

let planets: Array<Planet>;

export function filterHabitablePlanets(planets: Array<Planet>) {
  return planets.filter((planet) => {
    const planetaryRadius = Number(planet["koi_prad"]);
    const stellarMass = Number(planet["koi_smass"]);
    const stellarRadius = Number(planet["koi_srad"]);

    return planet["koi_disposition"] === "CONFIRMED" &&
      planetaryRadius > 0.5 && planetaryRadius < 1.5 &&
      stellarMass > 0.78 && stellarMass < 1.04 &&
      stellarRadius > 0.99 && stellarRadius < 1.01;
  });
}

async function loadPlanetsData() {
  const path = join("data", "kepler_exoplanets_nasa.csv");

  const file = await Deno.open(path);
  const bufferedReader = new BufReader(file);
  const allExoplanets = await parse(bufferedReader, {
    header: true,
    comment: "#",
  });

  // Close file resource id (rid) to avoid leaking resources.
  Deno.close(file.rid);

  // confirmed exoplanets:
  const confirmedPlanets = filterHabitablePlanets(
    allExoplanets as Array<Planet>,
  );

  return confirmedPlanets.map((planet) => {
    return _.pick(planet, [
      "koi_prad",
      "koi_smass",
      "koi_srad",
      "kepler_name",
      "koi_count",
      "koi_steff",
    ]);
  });
}

planets = await loadPlanetsData(); // <-- this is the basic planets database.
console.log(`${planets.length} habitable planets found.`);

export function getAllPlanets() {
  return planets;
}
