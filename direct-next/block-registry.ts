import ContentBlockComponent from "@/components/blocks/content-block";
import HeroBlockComponent from "@/components/blocks/hero-block";
import HoursBlockComponent from "@/components/blocks/hours-block";
import ImportanceBlockComponent from "@/components/blocks/importance-block";
import PhilosophyBlockComponent from "@/components/blocks/philosophy-block";

// Registry of all block components
export const blockRegistry: Record<
  string,
  React.ComponentType<{ block: any }>
> = {
  hero_block: HeroBlockComponent,
  content_block: ContentBlockComponent,
  importance_block: ImportanceBlockComponent,
  hours_block: HoursBlockComponent,
  philosophy_block: PhilosophyBlockComponent,
};
