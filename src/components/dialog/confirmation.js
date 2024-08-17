import { createConfirmationCreater, createMountPoint, createReactTreeMounter } from 'react-confirm';
import DeleteDialog from './delete_dialog';
import ConfirmDialog from './confirm_dialog';
import TokenDialog from './token_dialog';

const mounter = createReactTreeMounter();

export const createConfirmation = createConfirmationCreater(mounter);
export const MountPoint = createMountPoint(mounter);

export const deleteConfirm = createConfirmation(DeleteDialog);
export const confirmConfirm = createConfirmation(ConfirmDialog);
export const tokenConfirm = createConfirmation(TokenDialog);
