import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function page() {
  return (
    <div>
      <h1>TRANSACTION PENDING</h1>
      <Button asChild>
        <Link href="/">Back to home</Link>
      </Button>
    </div>
  );
}
