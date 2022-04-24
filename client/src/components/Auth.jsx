import React , {useState} from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios'
import img from '../assets/img-01.png'
const cookies = new Cookies();
const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: ''
}
const Auth = () => {
    const [form , setForm] = useState(initialState)
    const [isSignup , setIsSignup] = useState(true)
    const handleChange = (event) => {
        setForm({ ... form,[event.target.name]: event.target.value})
    }
    const switchMode = () => {
        setIsSignup(prevIsSignup => !prevIsSignup)
    }
    const forwardToChat = () => {
        window.open("https://chatroom-issatso.netlify.app", "_blank") //to open new page
     }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        //pass the form data to the backend 
        const { username, password, phoneNumber, avatarURL } = form;
        const url = 'https://messaging-issatso.herokuapp.com/auth'
        //make an axios call -- turn the function into an asynchronous function
        const { data: { token, userId, hashedPassword, fullName } } = await axios.post(`${url}/${isSignup ? 'signup' : 'login'}`, {
            username, password, fullName: form.fullName, phoneNumber, avatarURL,
        });
      //let's use the destructured elements in creating a cookie 
      cookies.set('token', token);
      cookies.set('username', username);
      cookies.set('fullName', fullName);
      cookies.set('userId', userId);

      if(isSignup) {
          cookies.set('phoneNumber', phoneNumber);
          cookies.set('avatarURL', avatarURL);
          cookies.set('hashedPassword', hashedPassword);
      }

      window.location.reload();
  }

  return (
   
    
   <div className='outerLayer'>
   <div className='video__conf-container'>
            <button className='video__conf-container_fields-content_button' onClick={forwardToChat}>Joindre/ Lancer une conférence video !</button>
        </div>
    <div className='auth__form-container'>
        <div className='container-login100'>    
        <div className='auth__form-container_fields-content'>
            <p><span className='gradient'>{isSignup ? 'S\'inscrire' : 'Se connecter'}</span> </p>
            <form onSubmit={handleSubmit}>
                {isSignup && (
                    <div className='auth__form-container_fields-content_input'>
                        <label htmlFor='fullName'>Nom et prénom de l'enseignant </label> 
                        <input name='fullName'
                         type='text'
                         placeholder='Tapez les nom et prénom ...'
                         onChange={handleChange}
                         required/>
                    </div>   
                )}
                <div className='auth__form-container_fields-content_input'>
                        <label htmlFor='username'>Nom d'utilisateur</label> 
                        <input name='username'
                         type='text'
                         placeholder= "Tapez le nom d'utilisateur ..."
                         onChange={handleChange}
                         required/>
                    </div>
                    {isSignup && (
                    <div className='auth__form-container_fields-content_input'>
                        <label htmlFor='phoneNumber'>Numéro de téléphone</label> 
                        <input name='phoneNumber'
                         type='text'
                         placeholder='Tapez votre numéro ...'
                         onChange={handleChange}
                         required/>
                    </div>   
                )}
                {isSignup && (
                    <div className='auth__form-container_fields-content_input'>
                        <label htmlFor='avatarURL'>URL de votre image</label> 
                        <input name='avatarURL'
                         type='text'
                         placeholder='Fournissez une image ...'
                         onChange={handleChange}
                         required/>
                    </div>   
                )}
                 <div className='auth__form-container_fields-content_input'>
                        <label htmlFor='password'>Mot de passe</label> 
                        <input name='password'
                         type='password'
                         placeholder='Tapez le mot de passe ...'
                         onChange={handleChange}
                         required/>
                    </div>  
                    {isSignup && (
                    <div className='auth__form-container_fields-content_input'>
                        <label htmlFor='confirmPassword'>Confirmation du mot de passe</label> 
                        <input name='confirmPassword'
                         type='password'
                         placeholder='Retapez le mot de passe ...'
                         onChange={handleChange}
                         required/>
                    </div>   
                )}
                <div className='auth__form-container_fields-account'>
                    <p> {isSignup ? 
                    'Vous avez déja un compte ?  ' :
                    "Vous n'avez pas de compte ?  " } 
                    <span onClick={switchMode}>
                        {isSignup ? "Se connecter" : "S'inscrire" }</span> </p>
                </div>
                <div className='auth__form-container_fields-content_button' >
                    <button>{isSignup ? "Soumettre" :"Entrer" }</button>
                </div>
            </form>
        </div>
        </div>
        <div className='auth__form-container_image'>
            <img src={img} alt="IssatSo"/>
        </div>
    </div>
    </div>
  )
}

export default Auth