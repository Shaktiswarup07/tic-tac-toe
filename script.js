let playerText=document.getElementById('playerText');
let restartBtn=document.getElementById('restartBtn');
let boxes=Array.from( document.querySelectorAll('.box'));
// console.log(boxes);

const O_text='O';
const X_text='X';
let curPlayer=X_text;

let spaces=Array(9).fill(null);

let count_plays=0;

const startGame=function(){
    boxes.forEach(function(box){
        box.addEventListener('click',boxClicked)
    })
}

function boxClicked(e){
    const id=e.target.id;

    if(!spaces[id] && count_plays<9){
        spaces[id]=curPlayer;
        e.target.innerText=curPlayer;

        if(playerHasWon()!==false){
            playerText.innerText=`${curPlayer} has won!`
            let winning_blocks=playerHasWon();

            for(const i of winning_blocks){
                document.getElementById(`${i}`).classList.add('winner');
            }
            restartBtn.classList.add('restart')
            console.log(restartBtn.classList);
            count_plays=10;
            

            return;
        }
        count_plays++;

        curPlayer=curPlayer===X_text?O_text:X_text;
    }
    if(count_plays===9){
        playerText.innerText=`Oh! It's a draw!`;
        restartBtn.classList.add('restart')
        boxes.forEach(box=>box.style.color='red')
    }

}
const winningCombos=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function playerHasWon(){
    for (const [i,j,k] of winningCombos) {
        if(spaces[i]===spaces[j] && spaces[i]===spaces[k] && spaces[i]!==null){
            return [i,j,k];
        }
    }
    return false;
}

restartBtn.addEventListener('click',function(){
    spaces.fill(null);
    boxes.forEach(box=>{
        box.innerText='';
        box.classList.remove('winner');
        box.style.color='#ffd60a'
    })
    count_plays=0;
    restartBtn.classList.remove('restart')
    playerText.innerText='Tic Tac Toe'
    curPlayer=X_text;
})
startGame();