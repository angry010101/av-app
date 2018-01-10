function photoLoadingErrorProcess(){
	var photos = document.getElementsByTagName("img");
	for(var i=0;i<photos.length;i++) {
		photos[i].onerror = () => {
				
		}
	};
}

window.onload = () => {
	photoLoadingErrorProcess();
}