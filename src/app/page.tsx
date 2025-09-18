import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col gap-2 h-screen justify-center items-center">
      <div>
        <Button variant={"destructive"}>
          Click me!!
        </Button>
      </div>
      Hello World
    </div>
  );
}
