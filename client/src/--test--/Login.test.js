import React from "react";
import {render, screen, fireEvent } from '@testing-library/react';
import Login from '../pages/Login';
import "babel-polyfill";

describe('Login Component', ()=>{
  test('ログインフォームが表示されること', () =>{
    //render(<Login />);

    // フォーム要素の存在を確認
    const userNameInput = screen.getByPlaceholderText('ユーザ名');
    const emailInput = screen.getByPlaceholderText('メールアドレス');
    const passwordInput = screen.getByPlaceholderText('パスワード');
    const loginButton = screen.getByText('ログイン');

    expect(userNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });
  // test('ログインボタンがクリックされた時にhandleSubmit関数が呼び出されること', () => {
  //   const handleSubmit = jest.fn();
  //   render(<Login handleSubmit={handleSubmit} />);

  //   const loginButton = screen.getByText('ログイン');

  //   fireEvent.click(loginButton);

  //   expect(handleSubmit).toHaveBeenCalledTimes(1);
  // });
});
