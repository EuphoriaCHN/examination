import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import isEmail from 'validator/lib/isEmail';

import { useQuery } from '@/common/hooks/useQuery';

import { Typography, Form, Button, Toast } from 'semi';
import { IconKey, IconMail } from 'semi-icons';
import Header from '@/components/Header';

import { Auth, User } from '@/api';

import type { BaseFormApi as FormApi } from '@douyinfe/semi-foundation/lib/es/form/interface';

import './index.scss';

function Login(this: any) {
  const [pageType, setPageType] = React.useState<'login' | 'register'>('login');
  const [loading, setLoading] = React.useState(false);

  const { t } = useTranslation();
  const formApiRef = React.useRef<FormApi>();
  const _navigate = useNavigate();
  const { redirect = '/' } = useQuery();

  const handleChangePageType = React.useCallback((nextType: typeof pageType) => {
    formApiRef.current?.reset();

    setPageType(nextType);
  }, []);

  const renderLogin = React.useMemo(() => (
    <React.Fragment>
      <Form.Input
        field={'email'}
        // @ts-ignore
        placeholder={t('请输入邮箱账号')}
        prefix={<IconMail />}
        className={'login-form-item'}
        size={'large'}
        noLabel
      />
      <Form.Input
        field={'password'}
        // @ts-ignore
        placeholder={t('请输入密码')}
        prefix={<IconKey />}
        type={'password'}
        className={'login-form-item'}
        size={'large'}
        noLabel
      />
    </React.Fragment>
  ), []);

  const renderLoginFooter = React.useMemo(() => (
    <footer className={'login-footer'}>
      <Typography.Text></Typography.Text>
      <Typography.Text type={'tertiary'}>
        {t('如果没有账号请先')}&nbsp;
        <Typography.Text
          onClick={handleChangePageType.bind(this, 'register')}
          link
        >
          {t('注册账号')}
        </Typography.Text>
      </Typography.Text>
    </footer>
  ), []);

  const renderRegister = React.useMemo(() => (
    <React.Fragment>
      <Form.Input
        field={'registerEmail'}
        // @ts-ignore
        placeholder={t('请输入邮箱')}
        prefix={<IconMail />}
        className={'login-form-item'}
        size={'large'}
        noLabel
      />
      <Form.Input
        field={'registerPassword'}
        // @ts-ignore
        placeholder={t('请输入密码')}
        prefix={<IconKey />}
        type={'password'}
        className={'login-form-item'}
        size={'large'}
        noLabel
      />
    </React.Fragment>
  ), []);

  const renderRegisterFooter = React.useMemo(() => (
    <footer className={'login-footer'}>
      <Typography.Text></Typography.Text>
      <Typography.Text type={'tertiary'}>
        {t('已有账号？')}&nbsp;
        <Typography.Text
          onClick={handleChangePageType.bind(this, 'login')}
          link
        >
          {t('立即登录')}
        </Typography.Text>
      </Typography.Text>
    </footer>
  ), []);

  const validate = React.useCallback(async (data: {
    emailField: string,
    passwordField: string,
  }) => new Promise<{ email: string, password: string }>((resolve, reject) => {
    const { emailField, passwordField } = data;

    const email = formApiRef.current?.getValue(emailField) ?? '';
    const password = formApiRef.current?.getValue(passwordField) ?? '';

    let ans = true;

    if (typeof email !== 'string' || email.length > 128) {
      formApiRef.current?.setError(emailField, t('邮箱长度不能大于 128 字符'));
      ans = false;
    } else if (email.length === 0) {
      formApiRef.current?.setError(emailField, t('邮箱是必填项'));
      ans = false;
    } else if (!isEmail(email)) {
      formApiRef.current?.setError(emailField, t('邮箱格式错误'));
      ans = false;
    }

    if (typeof password !== 'string' || password.length > 16) {
      formApiRef.current?.setError(passwordField, t('密码长度不能大于 16 字符'));
      ans = false;
    } else if (password.length === 0) {
      formApiRef.current?.setError(passwordField, t('密码是必填项'));
      ans = false;
    } else if (password.length < 6) {
      formApiRef.current?.setError(passwordField, t('密码长度不能小于 6 字符'));
      ans = false;
    }

    if (!ans) reject();

    resolve({ email, password });
  }), []);

  const handleLogin = React.useCallback(async () => {
    const { email, password } = await validate({
      emailField: 'email',
      passwordField: 'password'
    }).catch(() => ({
      email: '',
      password: ''
    }));

    if (!email || !password) return;

    try {
      setLoading(true);

      await Auth.login({ email, password });

      Toast.success(t('登录成功'));

      setTimeout(() => _navigate(redirect));
    } catch (err) {
      Toast.error(t('登录失败'));
    } finally {
      setLoading(false);
    }
  }, [redirect]);

  const handleRegister = React.useCallback(async () => {
    const { email, password } = await validate({
      emailField: 'registerEmail',
      passwordField: 'registerPassword'
    }).catch(() => ({
      email: '',
      password: ''
    }));

    if (!email || !password) return;

    try {
      const hasExist = await User.checkEmailExist({ email });
      if (hasExist) {
        formApiRef.current?.setError('registerEmail', t('该邮箱已被注册'));
        throw new Error();
      }
    } catch (err) {
      return setLoading(false);
    }

    try {
      setLoading(true);

      await User.register({ email, password });

      Toast.success(t('注册成功'));
      setPageType('login');
      formApiRef.current?.setValues({ email, password });
    } catch (err) {
      Toast.error(t('注册新用户失败'));
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className={'login'}>
      <Header />
      <div className={'login-content'}>
        <Typography.Title heading={3} className={'login-title'}>
          {pageType === 'login' ? t('登录') : t('注册')}
        </Typography.Title>
        <Form
          getFormApi={_ => formApiRef.current = _}
          className={'login-form'}
        >
          {pageType === 'login' ? renderLogin : renderRegister}
        </Form>
        <Button
          theme={'solid'}
          size={'large'}
          onClick={pageType === 'login' ? handleLogin : handleRegister}
          loading={loading}
          block
        >
          {pageType === 'login' ? t('登录') : t('注册')}
        </Button>
        {pageType === 'login' ? renderLoginFooter : renderRegisterFooter}
      </div>
    </div>
  );
}

export default Login;
