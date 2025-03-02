import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Image
        src="https://cdn.vlabs.ac.in/logo/vlabs-color-large-moe.png"
        alt="Virtual Labs Logo"
        width={160}
        height={50}
        className="h-12 w-auto"
      />
    </Link>
  );
}
