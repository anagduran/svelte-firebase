
<script>
    import {db} from './firebase.js';
    import {auth} from './firebase.js';
    import {push} from 'svelte-spa-router';
    //import {storage} from './firebase.js';

	let nombre ='';
	let email ='';
	let idUpdate="";
	let users =[];
    let user ={};
    let emailUser ='';
    let idUser='';   
    let files; 
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
        
        /*let file =''
        if(file && files[0]){
            file = files[0].name + idUser  o Math.random().toString(30)
        }

        storage.child("imagenes/"+file).put(files[0]).then((snapshot)=>{
            console.log("imagen cargada correctamente")
            snapshot.ref.getDownloadURL().then((url)=>{
                console.log(url)

                  db.collection('users').add({
                    nombre: nombre,
                    email: email,
                    ruta: url
                
                })
                    nombre="";
                    email="";
            })
        })*/
        
        
        
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
    
    /*function deleteUser(id,img) {

         db.collection("users").doc(id).delete();
         
        let imagenDelete = storage.child("imagenes/"+img)
        imagenDetele.delete().then(()=>{
            console.log("imagen eliminada con exito")
        }).catch((error)=>{
            console.log("error")
        })
       
        
	}*/

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
    <input type="file" bind:files>
	<button class="btn blue" on:click={addUser}>Guardar</button>
	<button class="btn green" on:click={updateUser}>Actualizar</button>

	<table>
        <!--<th></th>-->
		<th>ID</th>
		<th>Nombre</th>
		<th>Email</th>
		<th>Eliminar</th>
		<th>Editar</th>
		<th>Enviar ID</th>
	
			{#each users as item}
				<tr>
                    <!--<td src="{item.data().ruta}" alt="imagen" width="100" height="100" class="circle"></td>-->
					 <td>{item.id}</td>
					 <td>{item.data().nombre}</td>
					 <td>{item.data().email}</td>
                     <td><button class="btn red" on:click={deleteUser(item.id)}>Eliminar</button></td>
                     <!--<td><button class="btn red" on:click={deleteUser(item.id, item.data().file)}>Eliminar</button></td>-->
					 <td><button class="btn orange" on:click={enviarForm(item.data().nombre, item.data().email,  item.id)}>Editar</button></td>
					 <td><button class="btn cyan" on:click={userByID(item.id)}>Enviar ID</button></td>
				</tr>
			{:else}
				 <tr >
					 <td colspan="6" >No hay datos en Firestore</td>
				 </tr>
			{/each}
	
    </table>
    {#if files && files[0]}
        <p>{files[0]}</p>
    {/if}
    <button class="btn red" on:click={salir}>Cerrar sesion</button>
