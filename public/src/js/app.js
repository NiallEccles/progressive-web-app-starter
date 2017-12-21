var deferredPrompt;

if ('serviceWorker' in navigator){
	navigator.serviceWorker
		.register('/sw.js')
		.then(function(){
			console.log('Service worker registered.');
		});
}

window.addEventListener('beforeinstallprompt', function(){
	console.log('beforeinstallprompt fired');
	event.preventDefault();
	deferredPrompt = event;
	return false;
});

var promise = new Promise(function(resolve, reject){
	setTimeout(function(){
		resolve('This is executed once the timeout is done');
	//console.log('This is executed once the timeout is done');
	}, 3000);
});

promise.then(function(text){
	console.log(text);
});

console.log('This is executed after timeout');