import { useState } from 'react';

function Login(props) {

  const [formValue, setFormValue] = useState({
    email: '',    
    password: ''    
  }); 

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onAuthSubmit(formValue.password, formValue.email);                
  }

  return (    
    <div className="auth">
      <form className="form form-auth" onSubmit={handleSubmit} name="authorization" noValidate>
        <h2 className="form-auth__title">Вход</h2>
        <input id="email-input" className="form-auth__text form-auth__text_value_email" value={formValue.email} onChange={handleChange} type="email" name="email" placeholder="E-mail" minLength="2" maxLength="30" required />
        <span className="email-input-error form-auth__text-error"></span>
        <input id="password-input" className="form-auth__text form-auth__text_value_password" value={formValue.password} onChange={handleChange} type="password" name="password" placeholder="Пароль" required />
        <span className="password-input-error form-auth__text-error"></span>
        <input className="form-auth__submit-button" type="submit" value="Войти" />
      </form>
    </div>    
  )
}

export default Login;