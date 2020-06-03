import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from 'react-router-dom';
import './style.css';
import InputMask from 'react-input-mask';
import background_herois from '../img/background_herois.jpeg';

import { Link}  from 'react-router-dom';

import api from '../services/api'


export default function SegundaTela() {
  const [open, setOpen] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const email = localStorage.getItem('email');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [complemento, setComplemento] = useState('');
  const [localidade, setLocalidade] = useState('');
  const [uf, setUF] = useState('');
  const [descricao_conhece_mamae_papai, setDescMaePai] = useState('');
  const [msg_erick, setMsgErick] = useState('');
  const history = useHistory();
  

  async function handleRegisterEmail(e){
    e.preventDefault();
    
    

    const data = {email, nome, telefone, logradouro, complemento, localidade, uf, descricao_conhece_mamae_papai, msg_erick}
    let cep;
    const apiViaCEP = 'https://viacep.com.br/ws/'+cep+'/json/'
    console.log(apiViaCEP)

    try{

        const response = await api.post('usuario', data)

        if (response.status === 200){
          alert(response.data.Mensagem)
          history.push('/')
        }

    } catch(err){

        return err
    }
    

    
    
    
    handleClose();
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
      
      <Dialog  open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Cadastro</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Para participar da rifa, é só se cadastrar nesse formulário e, ao final, você receberá por e-mail a conta para fazer a transferência/depósito!<br/><br/>

            1 super-herói = R$30,00 (equivale a um pacote de fraldas)<br/>
            2 super-heróis = R$50,00 (equivale a um pacote de fraldas + 1 mimo)<br/><br/>

            Assim que efetuar o pagamento da rifa, envie o comprovante para o <br/>e-mail karinagil18@gmail.com ou para o Whatsapp (62) 99945-0256 e você receberá a lista atualizada com os nomes dos super-heróis para escolher.<br/><br/>

            Após a escolha do super-herói, você receberá a confirmação de que está participando da rifa, por meio de um voucher.

            Boa sorte e que vença o melhor super-herói!!! :D
          </DialogContentText>
        
          
          <TextField 
            
            disabled={true}          
            value={email}
            autoFocus
            margin="dense"
            id="email"
            label="Seu e-mail"
            type="text"
            fullWidth
          />
          <TextField 
            required
            value = {nome} onChange={e => setNome(e.target.value)}
            autoFocus
            margin="dense"
            id="nome"
            label="Nome Completo"
            type="text"
            fullWidth
            
          />

            <TextField 
            required
            value = {telefone} 
            onChange={e => setTelefone(e.target.value)}
            autoFocus
            margin="dense"
            useRef="phone"
            name="phone"
            label="Telefone"
            helperText = "ex. (xx) 99999-9999"
            type="text"
            
          >
            <InputMask mask="(0)9999-9999" maskChar=" "/>
          </TextField>

            <TextField 
            required
            value = {localidade} onChange={e => setLocalidade(e.target.value)}
            autoFocus
            margin="dense"
            id="localidade"
            label="Cidade"
            type="text"
            fullWidth
          />

           <TextField className="uf"
           required
            value = {uf} onChange={e => setUF(e.target.value)}
            autoFocus
            margin="dense"
            id="uf"
            label="UF"
            type="text"
            
          />
          <TextField 
          required
            value = {logradouro} onChange={e => setLogradouro(e.target.value)}
            autoFocus
            margin="dense"
            id="logradouro"
            label="Endereço"
            helperText= "(caso ganhe o sorteio, o prêmio será entregue nesse endereço)"
            type="text"
            fullWidth
          />

            <TextField 
          
            value = {complemento} onChange={e => setComplemento(e.target.value)}
            autoFocus
            margin="dense"
            id="complemento"
            label="Complemento"
            type="text"
            fullWidth
          />
         

            <TextField 
            required
            value = {descricao_conhece_mamae_papai} onChange={e => setDescMaePai(e.target.value)}
            autoFocus
            margin="dense"
            id="descMaePai"
            label="Conhece o papai Henrique e a mamãe Karina de onde?"
            type="text"
            fullWidth
          />
          <TextField 
            value = {msg_erick} onChange={e => setMsgErick(e.target.value)}
            autoFocus
            margin="dense"
            id="msg_erick"
            label="Quer deixar uma mensagem para mim?"
            type="text"
            fullWidth
          />

        
        </DialogContent>
        <DialogActions>
          
          <Link to ="/">
          <Button  color="primary">
              Voltar
          </Button>
          </Link>
          <Button  onClick={handleRegisterEmail} color="primary">
            Próximo
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    
  );
  
}

