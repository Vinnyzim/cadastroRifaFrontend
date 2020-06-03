import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from 'react-router-dom';
import api from '../services/api';
import IMG from '../img/premio.png';
import background_herois from '../img/background_herois.jpeg';
import './style.css';


export default function FormDialog() {
  const [email, setEmail] = useState('');
  

  const [open, setOpen] = useState(false);
  const history = useHistory();
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  async function handleRegisterEmail(e) {
    e.preventDefault();
    
  try {
    const verifyEmail =  {email} 
    
   
    var regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    
    if (regex.test(verifyEmail.email)){

        const response = await api.post('verificaEmail', verifyEmail);

          if(response.status === 200){

            const localEmail = verifyEmail.email
            
            localStorage.setItem('email', localEmail)

              if(localEmail !== null){

                history.push('/register')
              }
            
          
        }

     }
     else {

    alert('Email inválido!')
    

    }    
  }catch (err) {

    alert('Este email já está sendo usado!')
  }
  }


  
  return (
    <div>
        <div className="cadastro-container">
          <section  className="form">
            <form>
             <h1>Chá rifa do Erick!</h1>
            <Button variant="outlined" color="black" onClick={handleClickOpen}>
            Iniciar Cadastro
          </Button>
          </form>
        </section>
        <img src={background_herois} alt="herois"></img>
        </div>
      
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Endereço de e-mail</DialogTitle>
        <DialogContent>
          
          <TextField
            value={email}  onChange={e => setEmail(e.target.value)}
            autoFocus
            margin="dense"
            id="email"
            label="Seu e-mail"
            type="email"
            fullWidth
          />
          
          <div>
          <h1> </h1>
          </div>
            
          <img className="imgPremio" src={IMG} alt="premio"></img>
          
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleRegisterEmail} color="primary">
            Próximo
          </Button>
        </DialogActions>
      </Dialog>
      
    </div>
  );
}
