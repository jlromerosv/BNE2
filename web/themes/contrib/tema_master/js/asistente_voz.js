// (function ($) {
// 	Leer();
// })(jQuery);

// function Leer(){		    
// 	function getSelectedText() {
// 		var text = "";
// 		if (typeof window.getSelection != "undefined") {
// 			text = window.getSelection().toString();
// 		} else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
// 			text = document.selection.createRange().text;
// 		}
// 		return text;
// 	}
	
// 	function doSomethingWithSelectedText() {
// 		var selectedText = getSelectedText();
// 		if (selectedText) {
// 			var speechSynthesisUtterance = new SpeechSynthesisUtterance(selectedText); 
// 			window.speechSynthesis.speak(speechSynthesisUtterance);
// 		}
// 	}
	
// 	document.onmouseup = doSomethingWithSelectedText;
// 	document.onkeyup = doSomethingWithSelectedText;

// }
// function NoLeer(){
// 	document.onmouseup =""; 
// 	document.onkeyup="";
// }