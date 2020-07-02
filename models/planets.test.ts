/** 
 * Deno Includes:
 * 
 * 1. CLI test runner. i.e deno test. Runs for all files named ".test"
 * 2. Assertions in the standard library.
 * 3. Built-in test fixtures with Deno.test().
*/

import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std/testing/asserts.ts";

import { filterHabitablePlanets } from "./planets.ts";

const HABITABLE_PLANET = {
  koi_disposition: "CONFIRMED",
  koi_prad: "1",
  koi_srad: "1",
  koi_smass: "1",
};

const TOO_LARGE_PLANETARY_RADIUS = {
  koi_disposition: "CONFIRMED",
  koi_prad: "1.5",
  koi_srad: "1",
  koi_smass: "1",
};

const TOO_LARGE_SOLAR_RADIUS = {
  koi_disposition: "CONFIRMED",
  koi_prad: "1",
  koi_srad: "1.01",
  koi_smass: "1",
};

const TOO_LARGE_SOLAR_MASS = {
  koi_disposition: "CONFIRMED",
  koi_prad: "1",
  koi_srad: "1",
  koi_smass: "1.04",
};
const NOT_CONFIRMED = {
  koi_disposition: "FALSE POSITIVE",
};

Deno.test("Filter only habitable planets", () => {
  const filtered = filterHabitablePlanets([
    HABITABLE_PLANET,
    NOT_CONFIRMED,
    TOO_LARGE_PLANETARY_RADIUS,
    TOO_LARGE_SOLAR_RADIUS,
    TOO_LARGE_SOLAR_MASS,
  ]);

  assertEquals(filtered, [
    HABITABLE_PLANET,
  ]);
});
