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
import background_herois from '../img/background_herois.png';
import axios from 'axios'

import { Link}  from 'react-router-dom';

import api from '../services/api'
import { Grid } from '@material-ui/core';


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
  const [bairro, setBairro] = useState('');
  const [descricao_conhece_mamae_papai, setDescMaePai] = useState('');
  const [msg_erick, setMsgErick] = useState('');
  const [cep, setCep] = useState('');

  const history = useHistory();
  
  


 async function apiCep (){

  axios.get(`https://viacep.com.br/ws/${cep}/json/`).then(res => {

    setLocalidade(res.data.localidade)
    setUF(res.data.uf)
    setLogradouro(res.data.logradouro)
    setBairro(res.data.bairro)

    console.log(res.data)
  }).catch(err => {

    alert(err)

  }) 
   
  
  }
    
     
  

  async function handleRegisterEmail(e){
    e.preventDefault();
    
    

    const data = {email, nome, telefone, logradouro, complemento, localidade, uf, descricao_conhece_mamae_papai, msg_erick}

    

    

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
            <Button variant="outlined"  onClick={handleClickOpen}>
            Iniciar Cadastro
          </Button>
          </form>
        </section>
        <img className="img-Heroi" src={background_herois} alt="herois"></img>
        </div>
      <div className="segundoForm">
      <Dialog open={open}  aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Cadastro</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Para participar da rifa, é só se cadastrar nesse formulário e, ao final, você receberá por e-mail a conta para fazer a transferência/depósito!<br/><br/>

            1 super-herói = R$30,00 (equivale a um pacote de fraldas)<br/>
            2 super-heróis = R$50,00 (equivale a um pacote de fraldas + 1 mimo)<br/><br/>

            Assim que efetuar o pagamento da rifa, envie o comprovante para o <br/>e-mail karinagil18@gmail.com ou para o Whatsapp (62) 99945-0256 e você receberá a lista atualizada com os nomes dos super-heróis para escolher.<br/><br/>

            Após a escolha do super-herói, você receberá um voucher confirmando sua participação no "Chá Rifa do Erick".

            Boa sorte e que vença o melhor super-herói!!!
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
            name="phone"
            label="Telefone"
            helperText = "ex. (xx) 99999-9999"
            type="text"
            
            
          >
            <InputMask mask="(0)9999-9999" maskChar=" "/>
          </TextField>


          <Grid>
          <TextField className="cep"
            required
            value = {cep} onChange={e => setCep(e.target.value)}
            
            autoFocus
            margin="dense"
            id="cep"
            label="CEP"
            type="text"
            
            inputProps={{maxLength: 8}}
            
          />
          </Grid>
          <Button  onClick={apiCep} color="primary">
            Verificar Cep
          </Button>

          <Grid>
            
                <TextField className="city"
                disabled={true}
                value = {localidade}
                autoFocus
                margin="normal"
                id="localidade"
                label="Cidade"
                type="text"
                
              />
              
              
              <TextField className="uf"
                disabled={true}
                value = {uf} 
                autoFocus
                margin="normal"
                id="uf"
                label="UF"
                type="text"              
              />
            
          </Grid>
          
          <TextField 
             disabled={true}
            value = {logradouro}
            autoFocus
            margin="dense"
            id="logradouro"
            label="Logradouro"
            helperText= "(caso ganhe o sorteio, o prêmio será entregue nesse endereço)"
            type="text"
            fullWidth
          />

          <TextField 
           disabled={true}
           value = {bairro}
            autoFocus
            margin="dense"
            id="bairro"
            label="Bairro"
            type="text"
            
          />

          <Grid>
          <TextField 
            required
            autoFocus
            margin="dense"
            id="numero"
            label="Número"
            type="text"
            
          />
          </Grid>
            <TextField className="complemento"
          
            value = {complemento} onChange={e => setComplemento(e.target.value)}
            autoFocus
            margin="dense"
            id="complemento"
            label="Complemento"
            type="text"
            
          />
         

            <TextField 
            required
            value = {descricao_conhece_mamae_papai} onChange={e => setDescMaePai(e.target.value)}
            autoFocus
            margin="dense"
            id="descMaePai"
            helperText="Conhece o papai Henrique e a mamãe Karina de onde?"
            type="text"
            fullWidth
          />
          <h1></h1>
         <text className="aviso">Favor verificar se todas as informações estão corretas. <br/>Você só poderá confirmar uma vez!</text>

        
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
    </div>
    
  );
  
}

