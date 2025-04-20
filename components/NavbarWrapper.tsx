import { auth } from "@/auth";
import Navbar from "./navbar"; // Import the original client component

export default async function NavbarWrapper() {
  const session = await auth();
  const isLoggedIn = !!session?.user;
  const userName = session?.user?.name ?? null; // Get username or null

  // Pass both isLoggedIn and userName to the client Navbar
  return <Navbar isLoggedIn={isLoggedIn} userName={userName} />;
}
