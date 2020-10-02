<script>
	import Router from 'svelte-spa-router';
	import routes from './routes.js';
</script>

<nav class="blue"></nav>

<div class="container">
	<Router {routes}/>
</div>