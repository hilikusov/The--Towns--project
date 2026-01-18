$(document).ready(function () {
    $('#btnDelete').on('click', deleteTown);
    $('#btnAdd').on('click', addTown);
    $('#btnShuffle').on('click', shuffleTowns);
});

function deleteTown() {
    const townName = $('#townName').val().trim();
    $('#townName').val('');

    if (!townName) {
        showMessage('Please enter a town name.');
        return;
    }

    let removed = false;

    $('#towns option').each(function () {
        if ($(this).text() === townName) {
            $(this).remove();
            removed = true;
        }
    });

    showMessage(
        removed
            ? `${townName} deleted.`
            : `${townName} not found.`
    );
}

function addTown() {
    const townName = $('#townNameForAdd').val().trim();
    $('#townNameForAdd').val('');

    if (!townName) {
        showMessage('Please enter a town name.');
        return;
    }

    $('#towns').append(
        $('<option>').text(townName)
    );

    showMessage(`${townName} added.`);
}

function shuffleTowns() {
    const towns = $('#towns option').toArray();

    if (towns.length < 2) {
        showMessage('Not enough towns to shuffle.');
        return;
    }

    shuffleArray(towns);
    $('#towns').empty().append(towns);

    showMessage('Towns shuffled.');
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function showMessage(message) {
    $('#result')
        .stop(true, true)
        .text(message)
        .show();

    setTimeout(() => {
        $('#result').hide('blind', {}, 500);
    }, 3000);
}