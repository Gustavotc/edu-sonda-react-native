import { useState } from 'react';

export const useHomeController = () => {
  const [showNewClassModal, setShowNewClassModal] = useState(false);

  const handleCreateClass = () => {
    setShowNewClassModal(true);
  };

  const handleCloseCreateClassModal = () => {
    setShowNewClassModal(false);
  };

  return { showNewClassModal, handleCreateClass, handleCloseCreateClassModal };
};
