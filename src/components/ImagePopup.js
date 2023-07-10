function ImagePopup({ card, onClose, isOpen }) {    

  return (
    <div className={`popup image-popup ${isOpen && 'popup_opened'}`}>
      <div className="image-popup__container">
        <button className="popup__close-button" name="close-button" type="button" value="close-popup" onClick={onClose}></button>
        <img className="popup__image" alt={card.name} src={card.link} />
        <h2 className="popup__image-title">{card.name}</h2>
      </div>
    </div>
  )
}

export default ImagePopup;