angular.module("bicas").controller("infoCtrl", ['$scope', function($scope) {
    $scope.appInfoEN = {
        intro: [
            'Bazeza',
            'Balele',
            'Bznice',
            'Bzmessi',
            'Bzélio',
            'Baz',
            'Zeza'
        ]
    }

    $scope.gameInfoEN = {
        intro: [
        'This game is kinda similar to Uno.',
        'While in Uno you must assist the color or the number or symbol, in the Bicas your move must assist the suit or the number or figure.'
        ],
        rules: [
        '- Only one card per player can be played;',
        '- If there is no card to play, the passes (does not go to the deck);',
        '- When everyone passes, the 1st that passed starts to go to the deck in the round, and so on, UNTIL SOMEONE PLAYS (from then on, it stops going to the deck);',
        '- The round ends when someone finish their cards;',
        '- When a player has only one card, he must say BICAS when playing the penultimate one, otherwise take it with a CONTRA-BICAS and get 2 cards (it is recommended to give a delay between half and a second before attacking with the CONTRA-BICAS);',
        '- The game ends when you want, when you all get tired, or when someone reaches the 420 or 422 score points.'
        ],
        special: [
        '- 2: forbids the next player;',
        '- 7: forces the next player to pick up 2 cards;',
        '- Q: revert the direction of the round;',
        '- J: change the suit (black card - it is the only card on which you are not forced to attend the suit)'
        ],
        points: [
        '- K: 40;',
        '- J: 30;',
        '- Q: 20;',
        '- N: n;',
        '- A: 1;'
        ]
    }
}]);