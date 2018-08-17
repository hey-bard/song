'use strict';

function Song(input={}){
	const S=this;
	S.window=input.window;
	S.window.classList.add('song-window');

	//How to open comments
	function Bubble(comment){
		const B=this;
		
		var element=document.createElement('div');
		element.className='song-bubble';
		
		var position=comment.place.split(' ');
		
		element.style.left=position[0];
		element.style.top=position[1];
		S.window.appendChild(element);
		
		var popup=null;
		
		element.addEventListener('click',function(){
			//Create the popup if it doesn't exist
			if(popup===null){
				popup=document.createElement('div');
				popup.className='song-popup';
				
				//Add the comment
				switch(comment.service){
					case 'twitter':
						twttr.widgets.createTweet(
							comment.id
							,popup
							,{
								conversation	:'none',
								cards			:'hidden',
								//linkColor		:'#cc0000',
								theme			:'light'
							}
						)
						.catch((e)=>{throw e;});
						break;
					default:
						console.log('Comment service not currently supported by Song!');
						break;
				}
				S.window.appendChild(popup);
			}
			
			//Toggle the popup's display
			if(popup.classList.toggle('song-popup-visible')){
				//If the class has been added:
				
				//Move the popup into position
				var box=this.getBoundingClientRect();
				popup.style.left=this.offsetLeft+'px';
				popup.style.top=this.offsetTop+'px';
			}
		});
	}
	
	//Go through comments
	for(var i=0;i<input.comments.length;i++){
		new Bubble(input.comments[i]);
	}
}