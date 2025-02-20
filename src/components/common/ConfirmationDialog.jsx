import React from "react";
import PropTypes from "prop-types";
import BaseModal from "../common/BaseModal"; // Adjust import as needed
import { Button } from "@mui/material";

const ConfirmationDialog = ({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  return (
    <BaseModal isOpen={open} onClose={onCancel}>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-md w-11/12 md:w-1/3 text-center">
        <h3 className="text-lg font-bold mb-3">{title}</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{message}</p>

        <div className="flex justify-center gap-4">
          <Button
            onClick={onCancel}
            variant="outlined"
            color="secondary"
            className="w-1/3"
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            variant="contained"
            color="primary"
            className="w-1/3"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};

ConfirmationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
};

export default ConfirmationDialog;
