import React from 'react';
import { Modal } from 'semantic-ui-react';

import AddEntryForm, { EntryFormValues } from './AddEntryForm';

interface Props {
  onClose: () => void;
  modalOpen: boolean;
  onSubmit: (values: EntryFormValues) => void;
}

const AddEntryModal = ({modalOpen, onClose, onSubmit}: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={true} closeIcon>
    <Modal.Header>Add a new entry</Modal.Header>
    <Modal.Content>
      <AddEntryForm onCancel={onClose} onSubmit={onSubmit}/>
    </Modal.Content>
  </Modal>
)

export default AddEntryModal;