import WorklogDetailPageClient from "@/app/components/worklog/WorklogDetailPageClient";

type WorklogDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function WorklogDetailPage({
  params,
}: WorklogDetailPageProps) {
  const { id } = await params;
  const worklogId = Number(id);

  return <WorklogDetailPageClient worklogId={worklogId} />;
}

