import { MainNav } from "@/components/main_nav";
import HeroComponent from "@/components/ui/home/hero_scroller";
import TopHero from "@/components/ui/home/top_hero";


export default function Home() {
  return (
    <div>
        <MainNav />
        <TopHero />
        <HeroComponent />
    </div>
  )
}
