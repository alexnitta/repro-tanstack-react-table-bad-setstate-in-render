type MakeElement<TData> = () => TData;

export function makeData<TData>(
  count: number,
  makeElement: MakeElement<TData>
): TData[] {
  const data = [];

  for (let i = 0; i < count; i += 1) {
    data.push(makeElement());
  }

  return data;
}
