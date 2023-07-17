import infoImageSuccess from "../images/union.png";
import infoImageFailure from "../images/union-failure.png";
import { useNavigate } from 'react-router-dom';

function InfoTooltip(props) { 

  const navigate = useNavigate();

  const isRegisterSuccess = () => {
    return props.isRegisterSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз.";
  };

  const closeInfoPopup = () => {
    props.isRegisterSuccess && navigate('/sign-in', {replace: true});
    props.onClose();
  };

  return (
    <div className={`popup info-popup ${props.isOpen && 'popup_opened'}`}>
      <div className="info-popup__container">
        <button className="info-popup__close-button" onClick={closeInfoPopup} name="close-button" type="button" value="close-popup"></button>
        <img className="info-popup__image"alt={isRegisterSuccess()} src={props.isRegisterSuccess ? infoImageSuccess : infoImageFailure} />
        <p className="info-popup__text">{isRegisterSuccess()}</p>
      </div>
    </div>
  )
}

export default InfoTooltip;