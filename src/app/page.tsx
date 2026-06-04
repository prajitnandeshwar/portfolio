import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/sections/hero";
import { Work } from "@/components/sections/work";
import { Exhibition } from "@/components/sections/exhibition";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Work />
        <Exhibition />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
