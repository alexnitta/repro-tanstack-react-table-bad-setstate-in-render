import { WorkingVersion, BrokenVersion } from "./components";

export default function App() {
  return (
    <div className="p-8 flex gap-12">
      <WorkingVersion />
      <BrokenVersion />
    </div>
  );
}
