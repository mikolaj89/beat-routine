"use client";

import { Modal, Box, Typography } from "@mui/material";
import { EditExerciseForm } from "./exercise-form/edit-exercise-form";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,

  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

type EditExerciseModalProps = {
  isOpen: boolean;
  onClose: () => void;
  exerciseId: number | null;
};

export const EditExerciseModal = ({
  isOpen,
  onClose,
  exerciseId,
}: EditExerciseModalProps) => {
  return (
    <>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="edit-modal-title"
        aria-describedby="edit-modal-description"
      >
        <Box sx={{ ...style, minHeight: 500 }}>
          <Typography id="edit-modal-title" variant="h1" component="h3">
            Edit drum exercise
          </Typography>
          {exerciseId && (
            <EditExerciseForm exerciseId={exerciseId} handleClose={onClose} />
          )}
        </Box>
      </Modal>
    </>
  );
};
