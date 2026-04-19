<script>
    import { board, gameInfo, GAME_WORD, guess, colors, keyboardColors, createGrid, getRandomWord, gameOver } from './store';
    import Board from './Board.svelte';

    function playAgain() {
        GAME_WORD.set(getRandomWord());
        gameInfo.set({
            attempt: 0,
            char: 0
        });
        guess.set("");
        colors.set(createGrid());
        keyboardColors.set({});
        board.set(createGrid());
        gameOver.set(false);
    }
</script>

<div class="center">
    <h3>Parola Segreta: <span class="secret">{$GAME_WORD}</span></h3>
    <h3>La tua parola: <span class="guess">{$guess}</span></h3>
</div>

<Board />

<div class="center">
    <button on:click={playAgain}>Play Again</button>
</div>

<style>
    .secret {
        color: var(--green);
        font-weight: bolder;
    }

    .guess {
        color: var(--orange);
        font-weight: bolder;
    }

    h3 {
        font-size: 1.5em;
    }

    button {
        background-color: var(--orange);
        color: white;
        margin: 20px 50px;
        padding: 10px 25px;
        cursor: pointer;
        border: none;
        font-size: 1.7em;
    }

    .center {
        margin: 20px auto;
        width: fit-content;
        text-align: ce;
    }
</style>
