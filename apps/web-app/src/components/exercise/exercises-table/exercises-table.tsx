"use client";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { useQueryClient } from "@tanstack/react-query";
import { getExercisesColumns } from "./exercises-table-helper";
import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { EditExerciseModal } from "../edit-exercise-modal";
import { ConfirmationDialog } from "@/components/common/confirmation-dialog";
import { useDeleteExercise } from "@drum-scheduler/sdk";
import { useExercisesQuery } from "@/hooks/use-exercises-query";
import type { Exercise } from "@drum-scheduler/contracts";

type ExercisesTableProps = {
  initialData: Exercise[];
  filters: {
    name: string;
    categoryId: string;
  };
};

export const ExercisesTable = ({ initialData, filters }: ExercisesTableProps) => {
  const API_BASE_URL = "http://localhost:8000";
  const queryClient = useQueryClient();
  const [isMounted, setIsMounted] = useState(false);
  
  const { data: exercises = [] } = useExercisesQuery(API_BASE_URL, filters, {
    initialData,
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [editingExerciseId, setEditingExerciseId] = useState<number | null>(
    null
  );
  const [deletedExerciseId, setDeletedExerciseId] = useState<number | null>(
    null
  );

  const {mutate: deleteExercise} = useDeleteExercise(API_BASE_URL);

  const onDeleteBtnClick = (id: number) => {
    setDeletedExerciseId(id);
    setIsConfirmModalOpen(true);
  };

  const onDeleteConfirm = () => {
    if (deletedExerciseId) {
      deleteExercise(deletedExerciseId, {
        onSuccess: () => {
          setDeletedExerciseId(null);
          setIsConfirmModalOpen(false);
          // React Query will automatically refetch via invalidation
        },
      });
    }
  };

  const onEditBtnClick = (id: number) => {
    setEditingExerciseId(id);
    setIsEditModalOpen(true);

    // Prefetch using SDK
    queryClient.prefetchQuery({
      queryKey: ["exercises", id],
      queryFn: () => import("@drum-scheduler/sdk").then(sdk => 
        sdk.fetchExercise(API_BASE_URL, id)
      ),
    });
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
    setEditingExerciseId(null);
  };

  const columns = getExercisesColumns({
    onDelete: onDeleteBtnClick,
    onEditBtnClick,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <EditExerciseModal
        exerciseId={editingExerciseId}
        isOpen={isEditModalOpen}
        onClose={handleModalClose}
      />
      <ConfirmationDialog
        title="Delete Exercise"
        message="Are you sure you want to delete this exercise? It will be remove from all sessions that contains it."
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={onDeleteConfirm}
      />
      {!isMounted ? (
        <Skeleton variant="rectangular" width="100%" height={400} />
      ) : (
        <DataGrid
          slotProps={{
            loadingOverlay: {
              variant: "skeleton",
              noRowsVariant: "skeleton",
            },
          }}
          rows={exercises ?? []}
          columns={columns}
          disableRowSelectionOnClick
        />
      )}
    </>
  );
};
