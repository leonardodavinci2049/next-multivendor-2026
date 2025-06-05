import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 gap-8">
      <h1 className="text-3xl text-green-900 font-bold font-barlow">New Project Next</h1>
      <div>
        <Button variant={"destructive"}>Click Here</Button>
      </div>
      <div>
        <ThemeToggle />
      </div>
    </div>
  );
}
