import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import FilteredNotesClient from './Notes.client';
import { fetchNotes } from '../../../../lib/api';

async function getNotes(tag: string) {
  const res = await fetchNotes({ tag });
  return res.notes;
}

export default async function FilteredNotesPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const tag = params.slug?.[0] || 'all';

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
  queryKey: ['notes', tag],
  queryFn: () => getNotes(tag),
});
  const dehydratedState = dehydrate(queryClient);
return (
  <HydrationBoundary state={dehydratedState}>
    <FilteredNotesClient tag={tag} />
  </HydrationBoundary>
);
}