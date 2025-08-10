import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function page() {
  return (
    <div>
      <h1>TRANSACTION SUCCESS</h1>
      <Button asChild>
        <Link href="/">Back to home</Link>
      </Button>
    </div>
  );
}
