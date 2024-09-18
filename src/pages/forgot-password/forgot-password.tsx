import { FC, SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ForgotPasswordUI } from '@ui-pages';
import { useForgotPasswordMutation } from '../../services/api/burgersApi';

export const ForgotPassword: FC = () => {
  const navigate = useNavigate();
  const [forgotPassword] = useForgotPasswordMutation();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<Error | null>(null);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    setError(null);

    if (!email) {
      setError(new Error('Нужно ввести почту'));
      return;
    }

    try {
      forgotPassword({ email: email })
        .then(() => {
          localStorage.setItem('resetPassword', 'true');
          navigate('/reset-password', { replace: true });
        })
        .catch((err) => setError(err));
    } catch (err) {
      setError(err as Error);
    }
  };

  return (
    <ForgotPasswordUI
      errorText={error?.message}
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
    />
  );
};
