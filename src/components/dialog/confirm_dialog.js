import { confirmable } from 'react-confirm';
import CustomModal from './custom_modal';

function ConfirmDialog({ show, proceed, title, content }) {
  return (
    <CustomModal
      isOpen={show}
      title={title || 'Confirm'}
      content={content || 'Are you sure you want to proceed?'}
      primaryAction={{
        content: 'Confirm',
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

export default confirmable(ConfirmDialog);
