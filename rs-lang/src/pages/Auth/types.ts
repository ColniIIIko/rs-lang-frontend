export type FormLoginInputs = {
  email: string;
  password: string;
};

export type FormRegisterInputs = {
  email: string;
  name: string;
  password: string;
  passwordConfirm?: string;
};
