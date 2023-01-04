import { WorkingVersion, BrokenVersion } from "./components";

export default function App() {
  return (
    <div className="p-8 flex gap-20">
      <WorkingVersion />
      <BrokenVersion />
    </div>
  );
}
