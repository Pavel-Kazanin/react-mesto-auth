import {useState, useContext, useEffect} from 'react';
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup({ onUpdateUser, isOpen, onClose, isLoading}) {  

  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');   

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]); 

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {    
    e.preventDefault();
  
    onUpdateUser({
      name,
      about: description,
    });   
  }

  return (
    <PopupWithForm isLoading={isLoading} onClose={onClose} onSubmit={handleSubmit} name="profile-popup" title="Редактировать профиль" buttonText="Сохранить" isOpen={isOpen}>
      <input id="name-input" className="form__text form__text_value_name" value={name ?? ''} type="text" name="name" placeholder="Имя" minLength="2" maxLength="40" onChange={handleChangeName} required />
      <span className="name-input-error form__text-error"></span>
      <input id="about-input" className="form__text form__text_value_about" value={description ?? ''} type="text" name="about" placeholder="О себе" minLength="2" maxLength="200" onChange={handleChangeDescription} required />
      <span className="about-input-error form__text-error "></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;