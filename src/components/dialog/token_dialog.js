import { deleteToken, setToken } from 'src/utils/token';
import { useCountdownSeconds } from 'src/hooks/use_countdown';
import { useEffect } from 'react';
import { useBoolean } from 'src/hooks/use_boolean';
import { toBool } from 'src/utils/type_check';
import { confirmable } from 'react-confirm';
import CustomModal from './custom_modal';
import { refresh } from 'src/api/auth_api';

function TokenDialog({ show, proceed }) {
  const { countdown, startCountdown, stopCountdown } = useCountdownSeconds(60);
  const refreshClicked = useBoolean();

  useEffect(() => {
    if (toBool(show)) {
      startCountdown();
      refreshClicked.onFalse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  useEffect(() => {
    if (!countdown && !refreshClicked.value) {
      deleteToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdown]);

  return (
    <CustomModal
      isOpen={show}
      title={'Refresh Token'}
      content={`Do you want to refresh login credentials? ${countdown}`}
      primaryAction={{
        content: 'Refresh',
        onAction: async () => {
          stopCountdown();
          refreshClicked.onTrue();
          var res = await refresh();
          if (res.isSuccess) {
            await setToken(res.result.token);
            proceed(true);
          } else {
            proceed(false);
          }
        },
      }}
      onClose={() => {
        deleteToken();
        stopCountdown();
        proceed(false);
      }}
    />
  );
}

export default confirmable(TokenDialog);
