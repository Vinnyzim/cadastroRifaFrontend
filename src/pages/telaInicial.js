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
import background_herois from '../img/background_herois.png';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';


import './style.css';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));



export default function FormDialog() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  

  const [open, setOpen] = useState(false);

  const [openSnackEmailUsado, setOpenSnackEmailUsado] = useState(false);

  const [openSnackEmailInvalido, setOpenSnackEmailInvalido] = useState(false);

  const history = useHistory();
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const handleClickSnackEmailUsado = () => {
    setOpenSnackEmailUsado(true);
  };

  const handleCloseSnackEmailUsado = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackEmailUsado(false);
  };
 
//

const handleClickSnackEmailInvalido = () => {
  setOpenSnackEmailInvalido(true);
};

const handleCloseSnackEmailInvalido = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpenSnackEmailInvalido(false);
};

  async function handleRegisterEmail(e) {
    e.preventDefault();
    
  
    const verifyEmail =  {email} 
    
   
    var regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    
    if (regex.test(verifyEmail.email)){

        await api.post('verificaEmail', verifyEmail).then((has) => {
          
          const localEmail = verifyEmail.email

          localStorage.setItem('email', localEmail)

          

          history.push('/register')
          

        }).catch((err) => {
          
          handleClickSnackEmailUsado()
         
        }) 

     }
     else {
       
      handleClickSnackEmailInvalido()
    

    } 
  }   
  
  


  
  return (
    
    <div>
      
        <div className="cadastro-container">
          <section  className="form">
            <form>
             <h1>Chá rifa do Erick!</h1>
            <Button variant="outlined"  onClick={handleClickOpen}>
            Iniciar Cadastro
          </Button>
          </form>
        </section>
          <img className="img-Heroi" src={background_herois} alt="herois"></img>
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

      <div className={classes.root}>
      <Snackbar open={openSnackEmailUsado} 
      anchorOrigin={{ vertical:'top', horizontal:'center' }}
      autoHideDuration={2000} 
      onClose={handleCloseSnackEmailUsado}>
      <Alert onClose={handleCloseSnackEmailUsado} severity="error">
      Este e-mail já foi utilizado!
      </Alert>
      </Snackbar>

      <Snackbar open={openSnackEmailInvalido} 
      anchorOrigin={{ vertical:'top', horizontal:'center' }}
      autoHideDuration={2000} 
      onClose={handleCloseSnackEmailInvalido}>
      <Alert onClose={handleCloseSnackEmailInvalido} severity="error">
      Email inválido!
      </Alert>
      </Snackbar>
      
    </div> 




    </div>
    
    
    
  );
}
