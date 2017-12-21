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
		reject({code:500, message:"Something went wrong!"});
		// resolve('This is executed once the timeout is done');
	//console.log('This is executed once the timeout is done');
	}, 3000);
});

//Don't use this way
// promise.then(function(text){
// 	return text;
// }, function(err) {
// 	console.log(err.code, err.message);
// }).then(function(newText){
// 	console.log(newText);
// })

//Use this way to return promise
promise.then(function(text){
	return text;
}).then(function(newText){
	console.log(newText);
}).catch(function(err){
	console.log(err.code, err.message);
});

console.log('This is executed after timeout');