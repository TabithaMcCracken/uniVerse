import React from 'react';
import Navbar from '../components/Navbar';

const CreateAccount = () => {
  return (
    <div>
      <Navbar />
      <h2>Create Account</h2>
      <form>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default CreateAccount;
