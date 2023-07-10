import {useState, useEffect} from 'react';
import "./App.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import CurrentUserContext from '../contexts/CurrentUserContext';

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});  
  const [currentUser, setCurrentUser] = useState({});
  const [cardId, setCardId] = useState('');
  const [isLoading, setIsLoading] = useState(false);  

  const [cards, setCards] = useState([]);   

  useEffect(() => {    
    api.getInitialCards().then(data => {           
      setCards(data);            
    })
    .catch((err) => {
      console.log(err);
    });
  },[]);

  useEffect(() => {
    api.getUserInfo().then(userInfo => {           
      setCurrentUser(userInfo);            
    })
    .catch((err) => {
      console.log(err);
    });
  },[]);  

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);    
  }
  
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);    
  }
  
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }  

  function handleImageClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);    
  }

  function handleTrashClick() {
    setConfirmPopupOpen(true);
  }  

  function closeAllPopups() {    
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    setConfirmPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardLike(card) {
    api.addLike(card._id).then((newCard) => {
      const newCards = cards.map((item) => item._id === card._id ? newCard : item);
      setCards(newCards);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleCardDislike(card) {
    api.deleteLike(card._id).then((newCard) => {
      const newCards = cards.map((item) => item._id === card._id ? newCard : item);
      setCards(newCards);
    })
    .catch((err) => {
      console.log(err);
    });
  } 

  function handleConfirmDelete(card) {
    handleTrashClick();    
    setCardId(card._id);
  }

  function handleCardDelete(cardId) { 
    setIsLoading(true);   
    api.deleteCard(cardId).then(() => {
      const newCards = cards.filter(item => item._id !== cardId);
      setCards(newCards);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoading(false);          
    });
  }

  function handleUpdateUser(info) {  
    setIsLoading(true);   
    api.setUserInfo(info.name, info.about).then((newUserInfo) => {      
      setCurrentUser(newUserInfo);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoading(false);          
    });
  }

  function handleUpdateAvatar(info) {
    setIsLoading(true);
    api.changeAvatar(info.avatar).then((newAvatar) => {      
      setCurrentUser(newAvatar);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoading(false);          
    });
  }  

  function handleAddPlaceSubmit(card) {  
    setIsLoading(true);           
    api.addNewCard(card.name, card.link).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoading(false);          
    })
  }  

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header />
          <Main cards={cards} onCardDelete={handleConfirmDelete} onCardLike={handleCardLike} onCardDislike={handleCardDislike} onImage={handleImageClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} />
          <Footer />
          <EditProfilePopup isLoading={isLoading} onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
          <AddPlacePopup isLoading={isLoading} onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
          <ConfirmDeletePopup isLoading={isLoading} cardId={cardId} onCardDelete={handleCardDelete} isOpen={isConfirmPopupOpen} onClose={closeAllPopups} />
          <EditAvatarPopup isLoading={isLoading} onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} /> 
          <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
