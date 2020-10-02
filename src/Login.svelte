<script>
    import {auth} from './firebase.js';
    import {push} from 'svelte-spa-router';
    let email="";
    let password ="";

    auth.onAuthStateChanged(function(user){
        if(user){
            push('/Crud')
        } else {
            console.log('no has iniciado sesion')
        }
    })

    function registro(email, pass){
        auth.createUserWithEmailAndPassword(email, pass).then(function(){
            console.log('registrado correctamente')
            
        }).catch(function(error){
            console.log(error)
        })
    }

    function login(email, pass){
        auth.signInWithEmailAndPassword(email,pass).then(()=>{
            push('/Crud')
        }).catch((error)=>{
            console.log(error)
        })
    }
</script>


<h1>Login/Regristro</h1> 

<input type="email" placeholder="Email" bind:value={email}>
<input type="password" placeholder="Password" bind:value={password}>
<button class="btn blue" on:click={login(email,password)}>Iniciar sesion</button>
<button class="btn green" on:click={registro(email,password)}>Registrarse</button>