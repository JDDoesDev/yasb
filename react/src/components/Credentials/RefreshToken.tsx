import { useSearchParams } from 'react-router-dom';
import apiConnector from '../../utils/apiConnector';

const RefreshToken = () => {
  const [searchParams] = useSearchParams();

  if (searchParams.get('error')) {
    // Should redirect to login page with error.
    window.location.href = '/login?error=invalid-params';
  }

  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const scope = searchParams.get('scope');

  const allowedStates = ['twitch-role:streamer', 'twitch-role:bot'];
  if (!allowedStates.includes(state as string)) {
    // Should redirect to login page with error.
    window.location.href = '/login?error=invalid-state';
  }

  apiConnector.post('/api/initialAuth',{
    code: code,
    state: state,
    scope: scope,
  }).then((res) => {
    console.log(res.status);
  })

  return (
    <>
    </>
  )
}

export default RefreshToken
