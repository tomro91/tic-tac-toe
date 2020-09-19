function handleStartTournment(){
	var sel = document.getElementById('players');
	var opt;
    for ( var i = 0, len = sel.options.length; i < len; i++ ) {
        opt = sel.options[i];
        if ( opt.selected === true ) {
            break;
         }
	}
	sessionStorage.setItem("numberOfPlayers1", opt.value);
	let newWin = window.open("game_screen.html", "_self");
	
	
	
	
	
	
	
}

document.querySelector('.tournmant--start').addEventListener('click', handleStartTournment);