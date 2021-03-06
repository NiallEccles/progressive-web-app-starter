var deferredPrompt;

if (!window.Promise){
	window.Promise = Promise;
}

if ('serviceWorker' in navigator){
	navigator.serviceWorker
		.register('/sw.js')
		.then(function(){
			console.log('Service worker registered.');
		})
		.catch(function(err){
			console.log(err);
		});
}

window.addEventListener('beforeinstallprompt', function(){
	console.log('beforeinstallprompt fired');
	event.preventDefault();
	deferredPrompt = event;
	return false;
});