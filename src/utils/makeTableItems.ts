import { faker } from "@faker-js/faker";
import type { ExampleTableItem } from "../types";

import { makeData } from "./makeData";

function makeTableItem(): ExampleTableItem {
  const first = faker.name.firstName();
  const last = faker.name.lastName();
  const email = faker.helpers.unique(faker.internet.email, [first, last]);
  const age = Math.floor(Math.random() * 100) + 1;

  return {
    age,
    email,
    first,
    last
  };
}

export function makeTableItems(count: number) {
  return makeData<ExampleTableItem>(count, makeTableItem);
}
