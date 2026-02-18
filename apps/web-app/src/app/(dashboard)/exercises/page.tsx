import { ExercisesTable } from "@/components/exercise/exercises-table/exercises-table";
import { Typography } from "@mui/material";
import { CreateExercise } from "@/components/exercise/create-exercise";
import { ExerciseFilters } from "@/components/exercise/exercises-table/exercise-filters";
import { TableButtonsWrapper } from "@/components/common/container";
import { fetchCategories, fetchExercises } from "@drum-scheduler/sdk";
import { buildExercisesQueryParams } from "@/utils/query-params";
import { Suspense } from "react";
import Loading from "./loading";
import { API_BASE_URL } from "@/config/globals";

async function CategoriesAndFilters({
  name,
  categoryId,
}: {
  name: string;
  categoryId: string;
}) {
  const categories = await fetchCategories(API_BASE_URL);
  return (
    <ExerciseFilters
      initialValues={{ name, categoryId }}
      categories={categories ?? []}
    />
  );
}

async function ExercisesData({
  name,
  categoryId,
}: {
  name: string;
  categoryId: string;
}) {
  const queryString = buildExercisesQueryParams({
    name: name || null,
    categoryId: categoryId || null,
  });
  const exercises = await fetchExercises(API_BASE_URL, queryString);
  return (
    <ExercisesTable initialData={exercises ?? []} filters={{ name, categoryId }} />
  );
}

type PageProps = {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ExercisesPage({ searchParams }: PageProps) {
  let { name, categoryId } = (await searchParams) || {};
  name = Array.isArray(name) ? name[0] : name ?? "";
  categoryId = Array.isArray(categoryId) ? categoryId[0] : categoryId ?? "";

  return (
    <>
      <TableButtonsWrapper>
        <Typography margin={0} variant="h1">
          Exercises
        </Typography>
        <CreateExercise />
      </TableButtonsWrapper>

      <Suspense fallback={<Loading />}>
        <CategoriesAndFilters name={name} categoryId={categoryId} />
      </Suspense>

      <Suspense fallback={<Loading />}>
        <ExercisesData name={name} categoryId={categoryId} />
      </Suspense>
    </>
  );
}
