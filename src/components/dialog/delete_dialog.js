import { confirmable } from 'react-confirm';
import CustomModal from './custom_modal';

function DeleteDialog({ show, proceed, title, content }) {
  return (
    <CustomModal
      isOpen={show}
      title={title || 'Delete'}
      content={content || 'Are you sure you want to delete?'}
      primaryAction={{
        content: 'Delete',
        onAction: () => {
          proceed(true);
        },
      }}
      secondaryAction={{
        content: 'Cancel',
        onAction: () => {
          proceed(false);
        },
      }}
      onClose={() => {
        proceed(false);
      }}
    />
  );
}

export default confirmable(DeleteDialog);
