function PopupWithForm(props) {   
  
  const loadingText = 'Сохранение...'; 

  return (
    <div className={`popup ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button className="popup__close-button" onClick={props.onClose} name="close-button" type="button" value="close-popup"></button>
        <form className="form form-photo" name={props.name} onSubmit={props.onSubmit} noValidate>
          <h2 className="form__title">{props.title}</h2>
          {props.children}          
          <input className="form__submit-button" type="submit" value={props.isLoading ? loadingText : props.buttonText} />
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;