import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const tag = slug?.[0] || 'all';

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', tag, '', 1],
    queryFn: () =>
      fetchNotes({
        tag: tag === 'all' ? undefined : tag,
        search: '',
        page: 1,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}