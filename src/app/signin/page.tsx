import React from 'react';
import SignInForm from '../../components/SignInForm';

function SignInPage() {
  return (
    <div>
      <h2>Sign In</h2>
      <SignInForm />
      <p>If you don't have an account, <a href="/signup">sign up here</a>.</p>
    </div>
  );
}

export default SignInPage;
