<script>
    import Key from "./Key.svelte";
    import { board, gameInfo, colors, keyboardColors, GAME_WORD, guess, gameOver } from "./store";

    const row1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
    const row2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
    const row3 = ['DEL', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'ENTER']; 

    const statusPriority = {
        incorrect: 0,
        close: 1,
        correct: 2
    };

    function setKeyboardKeyStatus(char, status) {
        keyboardColors.update((prevColors) => {
            const currentStatus = prevColors[char];

            if (
                currentStatus &&
                statusPriority[currentStatus] >= statusPriority[status]
            ) {
                return prevColors;
            }

            return {
                ...prevColors,
                [char]: status
            };
        });
    }

    function evaluateGuess(guessWord, gameWord) {
        const result = Array(5).fill("incorrect");
        const remainingChars = {};

        for (let i = 0; i < 5; i++) {
            if (guessWord[i] === gameWord[i]) {
                result[i] = "correct";
            } else {
                remainingChars[gameWord[i]] = (remainingChars[gameWord[i]] || 0) + 1;
            }
        }

        for (let i = 0; i < 5; i++) {
            const char = guessWord[i];

            if (result[i] === "correct")
                continue;

            if (remainingChars[char] > 0) {
                result[i] = "close";
                remainingChars[char]--;
            }
        }

        return result;
    }


    function handleDelete() {
        if($gameInfo.char === 0)
            return;
        gameInfo.update((prev) => {
            return {
                char: prev.char - 1,
                attempt: prev.attempt
            }
        });

        board.update((prevBoard) => {
            const newBoard = prevBoard;
            newBoard[$gameInfo.attempt][$gameInfo.char] = '';
            return newBoard;
        });
    }

    function handleEnter() {
        let { attempt, char } = $gameInfo;

        if(char != 5)
            return;

        const prevAttempt = attempt;
        const guessWord = $board[prevAttempt].join('').toUpperCase();
        const gameWord = $GAME_WORD.toUpperCase();
        const evaluatedColors = evaluateGuess(guessWord, gameWord);
        
        gameInfo.set({
            attempt:    attempt + 1,
            char: 0
        });

        const newColorsBoard = $colors;

        for(let i = 0; i < 5; i++) {
            const currentChar = guessWord[i];
            const status = evaluatedColors[i];

            newColorsBoard[prevAttempt][i] = status;
            setKeyboardKeyStatus(currentChar, status);
        }

        colors.set(newColorsBoard);
        guess.set(guessWord);

        if(guessWord == gameWord || prevAttempt == 5)
            gameOver.set(true);
    }

    function keypress(key) {
        console.log("Keypress:", key);
        if (key == "DEL")
            handleDelete();
        else if (key == "ENTER")
            handleEnter();
        else {
            let { attempt, char } = $gameInfo;

            if (char > 4)
                return;
            
            board.update((prevBoard) => {
                const newBoard = prevBoard;
                newBoard[attempt][char++] = key;
                return newBoard;
            });

            gameInfo.set({attempt, char});
        }
    }

    function handleKeyboardInput(event) {
        const key = event.key.toUpperCase();

        if (key === "ENTER") {
            keypress("ENTER");
            return;
        }

        if (key === "BACKSPACE" || key === "DELETE") {
            event.preventDefault();
            keypress("DEL");
            return;
        }

        if (/^[A-Z]$/.test(key))
            keypress(key);
    }
</script>

<svelte:window on:keydown={handleKeyboardInput} />

<div class="keybaord">
    <div class="row">
        {#each row1 as char}
             <Key {char} {keypress} status={$keyboardColors[char.toUpperCase()]}/>
        {/each}
    </div>

    <div class="row">
        {#each row2 as char}
             <Key {char} {keypress} status={$keyboardColors[char.toUpperCase()]}/>
        {/each}
    </div>

    <div class="row">
        {#each row3 as char}
             <Key {char} {keypress} status={$keyboardColors[char.toUpperCase()]}/>
        {/each}
    </div>
</div>

<style>
    .keybaord {
        box-sizing:border-box;
        position: fixed;
        width: 100vw;
        bottom: 20px;
        z-index: -1;
    }

    .row {
        box-sizing:border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
    }

</style>
