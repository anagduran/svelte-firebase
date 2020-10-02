
<script>
    import {db} from './firebase.js';
    import {auth} from './firebase.js';
    import {push} from 'svelte-spa-router';

	let nombre ='';
	let email ='';
	let idUpdate="";
	let users =[];
    let user ={};
    let emailUser ='';
    let idUser='';    
    auth.onAuthStateChanged(function(user){
        if(user){
            emailUser = user.email;
            idUser = user.uid;
        } else {
            push('/')
        }
    })

	db.collection('users').orderBy('nombre','asc').onSnapshot(data=>{
		users = data.docs
    })
    


	function addUser(){
		db.collection('users').add({
			nombre: nombre,
			email: email,
		
		})
		nombre="";
		email="";
	}

	function deleteUser(id) {
		db.collection("users").doc(id).delete();
	}

	function enviarForm(x,y,z) {
		nombre = x;
		email = y;
		idUpdate = z;
	}

	function updateUser(){
		db.collection('users').doc(idUpdate).update({
			nombre: nombre,
			email: email
		})

		nombre="";
		email="";
		idUpdate = "";
		
		
	}
	
	function userByID(id){
		db.collection('users').doc(id).onSnapshot(data=>{
			user = data.data()
			console.log(user.nombre)
		})
    }
    
    function salir(){
        auth.signOut();
        push('/')
    }
</script>





    <h1>CRUD Firestore</h1>
    <h4>Bienvenido: {emailUser}</h4>
	<input type="hidden" bind:value={idUpdate}>
	<input type="text" placeholder="Nombre" bind:value={nombre} >
	<input type="text" placeholder="Email" bind:value={email} >

	<button class="btn blue" on:click={addUser}>Guardar</button>
	<button class="btn green" on:click={updateUser}>Actualizar</button>

	<table>
		<th>ID</th>
		<th>Nombre</th>
		<th>Email</th>
		<th>Eliminar</th>
		<th>Editar</th>
		<th>Enviar ID</th>
	
			{#each users as item}
				<tr>
					 <td>{item.id}</td>
					 <td>{item.data().nombre}</td>
					 <td>{item.data().email}</td>
					 <td><button class="btn red" on:click={deleteUser(item.id)}>Eliminar</button></td>
					 <td><button class="btn orange" on:click={enviarForm(item.data().nombre, item.data().email,  item.id)}>Editar</button></td>
					 <td><button class="btn cyan" on:click={userByID(item.id)}>Enviar ID</button></td>
				</tr>
			{:else}
				 <tr >
					 <td colspan="6" >No hay datos en Firestore</td>
				 </tr>
			{/each}
	
    </table>
    
    <button class="btn red" on:click={salir}>Cerrar sesion</button>
