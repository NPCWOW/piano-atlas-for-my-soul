import { notFound, redirect } from "next/navigation";
import { getComposerBySlug } from "@/data/composers";
import { getWorksByComposerId } from "@/data/works";

export default async function ComposerRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const composer = getComposerBySlug(slug);
  if (!composer) notFound();

  const firstWork = getWorksByComposerId(composer.id)[0];
  if (!firstWork) notFound();

  redirect(`/works/${firstWork.slug}`);
}
