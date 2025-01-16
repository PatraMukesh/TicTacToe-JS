let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset-btn');
let newGameBtn = document.querySelector('#new-btn');
let msgContainer = document.querySelector('.msg-container');
let winMassage = document.querySelector('#winner-msg');
let turn0 =  true; // playerX, player0

// 1D Array
// let arr = ['apple', 'banana', 'litchi'];

// 2D Array
// let arr2 = [
//     ['apple','banana'],
//     ['potato','mango'],
//     ['pants','shirts']
// ];

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame = () => {
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}
let count = 0;
boxes.forEach((box) => {
    // console.log(box);
    box.addEventListener("click", () => {
        // console.log("box was clicked");
        if(turn0){
            box.innerText = "0";
            turn0 = false;
        }else{
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;
        count++;
        checkWinner(count);
    });
});

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const showWinner = (winner, count) => {
    if(winner != ""){
        winMassage.innerText = `Congratulations, Winner is ${winner}`;
    }else{
        winMassage.innerText = `Match Draw`;
        count = 0;
    }
    msgContainer.classList.remove('hide');
    disableBoxes();
}

const checkWinner = (count) => {
    for(pattern of winPatterns){
        // console.log(pattern[0],pattern[1],pattern[2]);
        // console.log(boxes[pattern[0]],boxes[pattern[1]],boxes[pattern[2]]);
        // console.log(boxes[pattern[0]].innerText,boxes[pattern[1]].innerText,boxes[pattern[2]].innerText);
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val == pos2Val && pos2Val == pos3Val){
                // console.log("winner", pos1Val);
                showWinner(pos1Val);
            }
        }
        console.log(count);
        if(count === 9){
            showWinner("",count);
            count = 0;
        }
    }
}

newGameBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);
