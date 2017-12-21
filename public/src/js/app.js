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

var promise = new Promise(function(resolve, reject){
	setTimeout(function(){
		reject({code:500, message:"Something went wrong!"});
		// resolve('This is executed once the timeout is done');
	//console.log('This is executed once the timeout is done');
	}, 3000);
});

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://httpbin.org/ip');
xhr.responseType = 'json';

xhr.onload = function(){
	console.log(xhr.response);
};

xhr.onload = function(){
	console.log('Error!');
};

xhr.send();

fetch('https://httpbin.org/ip')
	.then(function(response){
		console.log(response);
		return response.json();
	})
	.then(function(data){
		console.log(data);
	})
	.catch(function(err){
		console.log(err);
	});

fetch('https://httpbin.org/post', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	},
	body: JSON.stringify({ message: 'Does this work?' })
})
	.then(function(response){
		console.log(response);
		return response.json();
	})
	.then(function(data){
		console.log(data);
	})
	.catch(function(err){
		console.log(err);
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