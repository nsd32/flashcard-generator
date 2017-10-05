function ClozeCard(text, cloze) {
	this.cloze = cloze.toLowerCase();
	this.text = text.toLowerCase();
	this.partial = this.text.replace(this.cloze, '...');
	// this.text = text.includes(cloze) ? text : console.log('error');	
}

// ClozeCard.prototype.partial = function() {
//   console.log() 
// }

// var newCard = new ClozeCard('hello world', 'hello h');

module.exports = ClozeCard;



