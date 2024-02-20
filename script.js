const cells = document.querySelectorAll(".cell");
    const statusText = document.querySelectorAll(".status");
    const restartBtn = document.querySelector("#restartBtn");
    const undoBtn = document.querySelector("#undoBtn");
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    let options = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let running = true;
    let movesHistory = [];

    initializeGame();

    function initializeGame(){
        cells.forEach(cell => cell.addEventListener("click", cellClicked));
        restartBtn.addEventListener("click", restartGame);
        undoBtn.addEventListener("click", undoMove);
        statusText[0].style.display = currentPlayer === "X" ? "flex" : "none";
        statusText[1].style.display = currentPlayer === "O" ? "flex" : "none";
        running = true;
    }

    function cellClicked(){
        const cellIndex = this.getAttribute("cellIndex");

        if(options[cellIndex] != "" || !running){
            return;
        }

        updateCell(this, cellIndex);
        checkWinner();
    }

    function updateCell(cell, index){
        options[index] = currentPlayer;
        cell.textContent = currentPlayer;
        movesHistory.push(index); 
        switchPlayerStatus();
    }

    function switchPlayerStatus() {
        statusText[0].style.display = currentPlayer === "X" ? "none" : "flex";
        statusText[1].style.display = currentPlayer === "O" ? "none" : "flex";
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }

    // function checkWinner(){
    //     let roundWon = false;

    //     for(let i = 0; i < winConditions.length; i++){
    //         const condition = winConditions[i];
    //         const cellA = options[condition[0]];
    //         const cellB = options[condition[1]];
    //         const cellC = options[condition[2]];

    //         if(cellA == "" || cellB == "" || cellC == ""){
    //             continue;
    //         }
    //         if(cellA == cellB && cellB == cellC){
    //             roundWon = true;
    //             break;
    //         }
    //     }

    //     if(roundWon){
    //         alert(`${currentPlayer} wins the game!`);
    //         running = false;
    //     }
    //     else if(!options.includes("")){
    //         alert("It's a draw!");
    //         running = false;
    //     }
    // }

    function checkWinner(){
        let roundWon = false;
    
        for(let i = 0; i < winConditions.length; i++){
            const condition = winConditions[i];
            const cellA = options[condition[0]];
            const cellB = options[condition[1]];
            const cellC = options[condition[2]];
    
            if(cellA == "" || cellB == "" || cellC == ""){
                continue;
            }
            if(cellA == cellB && cellB == cellC){
                roundWon = true;
                break;
            }
        }
    
        if(roundWon){
            const winner = currentPlayer === "X" ? "O" : "X";
            document.getElementById('result-message').innerText = `congratulations!!! ${winner} wins the game!`;
            document.getElementById('result-message').style.display = "flex";
            statusText[0].style.display = "none"; 
            statusText[1].style.display = "none"; 
            running = false;
        }
        else if(!options.includes("")){
            document.getElementById('result-message').innerText = "It's a draw!";
            document.getElementById('result-message').style.display = "flex";
            statusText[0].style.display = "none"; 
            statusText[1].style.display = "none"; 
            running = false;
        }
        
    }
    

    function restartGame(){
        currentPlayer = "X";
        options = ["", "", "", "", "", "", "", "", ""];
        cells.forEach(cell => cell.textContent = "");
        movesHistory = []; 
        initializeGame();
        document.getElementById('result-message').style.display = "none";
    }

    function undoMove(){
        if(movesHistory.length > 0 && running){
            const lastMoveIndex = movesHistory.pop(); // Get the index of the last move
            options[lastMoveIndex] = ""; // Clear the option at the last move index
            cells[lastMoveIndex].textContent = ""; // Clear the text content of the corresponding cell
            switchPlayerStatus();
        }
    }