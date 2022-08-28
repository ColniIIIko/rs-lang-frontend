import React from 'react';
import './style.scss';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useAppDispatch } from '../../redux/hooks';
import { AuthResponse, fetchLoginThunk } from '../../redux/reducers/auth';
import { FormLoginInputs } from './types';
import { Navigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import Loader from '../../components/Loader/Loader';
import { addToken } from '../../axios/axiosConfig';

const defaultValues: FormLoginInputs = {
  email: '',
  password: '',
};

const emailRegex = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

function Login() {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    setError,
  } = useForm<FormLoginInputs>({
    mode: 'onSubmit',
    defaultValues,
  });

  const dispatch = useAppDispatch();

  const { isAuth, isError, isLoading } = useAuth();

  const onSubmit = async (userConf: FormLoginInputs) => {
    const data = await dispatch(fetchLoginThunk(userConf));
    if (data.meta.requestStatus === 'fulfilled') {
      const payload = data.payload as AuthResponse;
      payload && localStorage.setItem('user', JSON.stringify(payload));
      addToken(payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to='/' />;
  }

  return (
    <div className='login-wrapper'>
      {isLoading && <Loader />}
      <div className='login'>
        <div>
          <form
            className='login-form form'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='form__field'>
              <label
                htmlFor='form__email'
                className='form__label'
              >
                Email
              </label>
              <input
                id='form__email'
                className='form__email form__input'
                type='text'
                placeholder='email'
                {...register('email', {
                  required: 'Введите ваш email',
                  pattern: { value: emailRegex, message: 'Введите корректный email' },
                })}
              />
              <ErrorMessage
                name='email'
                errors={errors}
                render={({ message }) => <span className='form__error'>{message}</span>}
              />
            </div>
            <div className='form__field'>
              <label
                htmlFor='form__password'
                className='form__label'
              >
                Пароль
              </label>
              <input
                id='form__password'
                className='form__password form__input'
                type='password'
                placeholder='Пароль'
                {...register('password', {
                  required: 'Введите пароль',
                  minLength: { value: 8, message: 'Минимум 8 символов' },
                })}
              />
              <ErrorMessage
                name='password'
                errors={errors}
                render={({ message }) => <span className='form__error'>{message}</span>}
              />
            </div>
            <button
              type='submit'
              className='form__btn btn'
            >
              Войти
            </button>
          </form>
          {isError && <div className='form__auth-error'>Неверный логин или пароль</div>}
        </div>
        <div className='login__img'></div>
      </div>
    </div>
  );
}

export default Login;
