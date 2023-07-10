import { useState } from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ onAddPlace, isOpen, onClose, isLoading }) {  

  const [title, setTitle] = useState('');
  const [link, setLink] = useState(''); 

  function handleChangeTitle(e) {
    setTitle(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: title,
      link      
    });

    setTitle('');
    setLink('');    
  }  

  return (
    <PopupWithForm isLoading={isLoading} onSubmit={handleSubmit} onClose={onClose} name="photo-popup" title="Новое место" buttonText="Создать" isOpen={isOpen}>
      <input id="title-input" className="form__text form__text_value_title" value={title} type="text" name="name" placeholder="Название" minLength="2" maxLength="30" onChange={handleChangeTitle} required />
      <span className="title-input-error form__text-error"></span>
      <input id="url-input" className="form__text form__text_value_link" value={link} type="url" name="about" placeholder="Ссылка на картинку" onChange={handleChangeLink} required />
      <span className="url-input-error title-input-error form__text-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;