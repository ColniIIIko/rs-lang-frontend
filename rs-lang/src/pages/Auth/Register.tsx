import React from 'react';
import './style.scss';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

type FormInputs = {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
};

const defaultValues: FormInputs = {
  email: '',
  name: '',
  password: '',
  passwordConfirm: '',
};

const emailRegex = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

function Register() {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    setError,
  } = useForm<FormInputs>({
    mode: 'onSubmit',
    defaultValues,
  });

  const onSubmit = (data: FormInputs) => {
    if (data.password !== data.passwordConfirm)
      return setError('passwordConfirm', { message: 'Пароли должны совпадать' });
    console.log(data);
  };

  return (
    <div className='register-wrapper'>
      <div className='register'>
        <form
          className='register-form form'
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
              htmlFor='form__name'
              className='form__label'
            >
              Имя
            </label>
            <input
              id='form__name'
              className='form__name form__input'
              type='text'
              placeholder='Имя'
              {...register('name', {
                required: 'Введите ваше имя',
              })}
            />
            <ErrorMessage
              name='name'
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
          <div className='form__field'>
            <label
              htmlFor='form__password-conf'
              className='form__label'
            >
              Подтверждение пароля
            </label>
            <input
              id='form__password-conf'
              className='form__form-conf form__input'
              type='password'
              placeholder='Подтверждение пароля'
              {...register('passwordConfirm', {
                required: 'Пароль должен совпадать',
              })}
            />
            <ErrorMessage
              name='passwordConfirm'
              errors={errors}
              render={({ message }) => <span className='form__error'>{message}</span>}
            />
          </div>
          <button
            type='submit'
            className='form__btn btn'
          >
            зарегистрироваться
          </button>
        </form>
        <div className='register__img'></div>
      </div>
    </div>
  );
}

export default Register;
