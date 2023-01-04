import { WorkingVersion, BrokenVersion } from "./components";

export default function App() {
  return (
    <div className="p-8 flex flex-col gap-20">
      <BrokenVersion />
      <WorkingVersion />
    </div>
  );
}
