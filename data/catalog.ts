import { works as rachmaninoffWorks } from "@/data/works";
import { mozartWorks } from "@/data/mozart-works";

export const works = [...rachmaninoffWorks, ...mozartWorks];

export function getWorkBySlug(slug: string) {
  return works.find((work) => work.slug === slug);
}

export function getWorksByComposerId(composerId: string) {
  return works.filter((work) => work.composerId === composerId);
}
