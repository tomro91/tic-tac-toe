var flagGameType=true;//true=friend,false=cpu
if(sessionStorage.getItem('numberOfPlayers1').localeCompare("cpu")==0)
	flagGameType=false;
const statusDisplay = document.querySelector('.game--status');
document.getElementById("p1").readOnly = true;
document.getElementById("p2").readOnly = true;
let gameActive = true;
let p1Points=0;
let p2Points=0;
let rounds=1;
 document.getElementById("p1").value = "0";
 document.getElementById("p2").value = "0";
 document.getElementById("numOfRounds").value = "1";
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
const winningMessage = () => "Player "+currentPlayer+" has won!";
const drawMessage = () => "Game ended in a draw!";
const currentPlayerTurn = () => "It's "+currentPlayer+"'s turn";
const winningTournmant = () => "Player "+currentPlayer+" has won the tournment!";
statusDisplay.innerHTML = currentPlayerTurn();

function handleSelectRounds(){
	 rounds=Number(document.getElementById("numOfRounds").value);
	document.getElementById("numOfRounds").readOnly = true;
	
}
//check if click is legal and if yes continue played
function handleCellClick(clickedCellEvent) {
	const clickedCell = clickedCellEvent.target;
	//gets the index in the table that clicked
	const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
	if(gameState[clickedCellIndex]!=""||!gameActive)
		return;
	handleCellPlayed(clickedCell,clickedCellIndex);
	var myVar = setTimeout(handleResultValidation, 20);
	
}


function handleCellPlayed(clickedCell,clickedCellIndex) {
	clickedCell.innerHTML=currentPlayer;
	gameState[clickedCellIndex]=currentPlayer;
}

function cpuPlay(){
	const win=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
	var clickedCellIndex=-1;
	if(!gameActive)
		return;
	for(var i=0;i<win.length;i++){
		if(gameState[win[i][0]]=="O"&&gameState[win[i][1]]=="O"&&gameState[win[i][2]]==""){
			clickedCellIndex=win[i][2];
			break;
		}
		else if(gameState[win[i][0]]=="O"&&gameState[win[i][2]]=="O"&&gameState[win[i][1]]==""){
			clickedCellIndex=win[i][1];
			break;
		}
		else if(gameState[win[i][1]]=="O"&&gameState[win[i][2]]=="O"&&gameState[win[i][0]]==""){
			clickedCellIndex=win[i][0];
			break;
		}
	}
	if(clickedCellIndex==-1){
		for(var i=0;i<win.length;i++){
			if(gameState[win[i][0]]=="X"&&gameState[win[i][1]]=="X"&&gameState[win[i][2]]==""){
				clickedCellIndex=win[i][2];
				break;
			}
			else if(gameState[win[i][0]]=="X"&&gameState[win[i][2]]=="X"&&gameState[win[i][1]]==""){
				clickedCellIndex=win[i][1];
				break;
			}
			else if(gameState[win[i][1]]=="X"&&gameState[win[i][2]]=="X"&&gameState[win[i][0]]==""){
				clickedCellIndex=win[i][0];
				break;
			}
		}
	}
	if(	clickedCellIndex==-1){	
	clickedCellIndex=Math.floor((Math.random() * 10));
	
	while(gameState[clickedCellIndex]!="")
		clickedCellIndex=Math.floor((Math.random() * 10));
	}	
	var x = document.querySelectorAll(".cell");

	x[clickedCellIndex].innerHTML="O";
	gameState[clickedCellIndex]="O";
	var myVar = setTimeout(handleResultValidation, 20);
	return;
	
}
function handlePlayerChange() {
	
	if(currentPlayer=="X")
	{
		
		currentPlayer="O";
		statusDisplay.innerHTML = currentPlayerTurn();
		if(flagGameType==false){
			var myVar = setTimeout(cpuPlay, 800);
		}
		
	}
	else
		currentPlayer="X";
	statusDisplay.innerHTML = currentPlayerTurn();
}


function handleResultValidation() {
	var flag=true;
	var i;
	const win=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
	for(var i=0;i<win.length;i++){
		flag=gameState[win[i][0]]=="X"&&gameState[win[i][1]]=="X"&&gameState[win[i][2]]=="X";
		if(flag==true){
			statusDisplay.innerHTML = winningMessage();
			p1Points++;
			var po1=p1Points.toString();
			var po2=p2Points.toString();
			document.getElementById("p1").value = po1;
			document.getElementById("p2").value = po2;
			gameActive=false;
			checkTournmant();
			return;
	
		}
		flag=gameState[win[i][0]]=="O"&&gameState[win[i][1]]=="O"&&gameState[win[i][2]]=="O";
		if(flag==true){
			statusDisplay.innerHTML = winningMessage();
			p2Points++;
			var po1=p1Points.toString();
			var po2=p2Points.toString();
			document.getElementById("p1").value = po1;
			document.getElementById("p2").value = po2;
			gameActive=false	
			checkTournmant();
			return;
	
		}
		
	}
	flag=true;
	for(var i=0;i<gameState.length;i++){
		if(gameState[i]==""){
			flag=false;
			break;
		}
	
	}
	if(flag==true){
		statusDisplay.innerHTML = drawMessage();
		gameActive=false;
		return;
	}

	handlePlayerChange();
}



//function that checks if the tournment is over
function checkTournmant(){
	//if player1 wins
	if(p1Points==rounds){
		 var left = (screen.width - 1050) / 2;
         var top = (screen.height - 550) / 2;
		let newWin = window.open("https://blog.travelpayouts.com/en/wp-content/uploads/sites/2/2019/04/Tasino_winners-1024x535.png", "winner",'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+1050+', height='+550+', top='+top+', left='+left);
		handleRestartTournment();
		return;
	}
	//if player2 wins
	if(p2Points==rounds){
		
		 var left = (screen.width - 1050) / 2;
         var top = (screen.height - 550) / 2;
		 if(flagGameType==false)
			newWin = window.open("https://www.kindpng.com/picc/m/394-3943625_you-lose-png-you-lose-pixel-art-transparent.png", "loser",'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+1050+', height='+550+', top='+top+', left='+left);
		else
			newWin = window.open("https://blog.travelpayouts.com/en/wp-content/uploads/sites/2/2019/04/Tasino_winners-1024x535.png", "winner",'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+1050+', height='+550+', top='+top+', left='+left);
		handleRestartTournment();
		return;
	}
	//if no one wins yet
	handleRestartGame();
	return ;
}





function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
	var po1=p1Points.toString();
	var po2=p2Points.toString();
	document.getElementById("p1").value = po1;
	document.getElementById("p2").value = po2;
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell')
               .forEach(cell => cell.innerHTML = "");
}

function handleRestartTournment(){
	p1Points=0;
	p2Points=0;
	document.getElementById("numOfRounds").readOnly = false;
	rounds=1;
	document.getElementById("numOfRounds").value=rounds.toString();
	 gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
	var po1=p1Points.toString();
	var po2=p2Points.toString();
	document.getElementById("p1").value = po1;
	document.getElementById("p2").value = po2;
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell')
               .forEach(cell => cell.innerHTML = "");
}




document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.select--rounds').addEventListener('click', handleSelectRounds);
document.querySelector('.tournmant--restart').addEventListener('click', handleRestartTournment);
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);
document.querySelector('.game--start').addEventListener('click', handleStartGame);
