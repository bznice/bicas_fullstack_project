angular.module("bicas", []);
angular.module("bicas").controller("bicasCtrl", function ($scope) {
    
    $scope.app = "LETS PLAY BICAS!";

    $scope.rulesButton = false;

    $scope.rulesButtonText = "View Information";

    $scope.players = []

    $scope.playersN = 0

    $scope.rulesEN = {
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

    $scope.showHideInfo = function () {
        $scope.rulesButton = !$scope.rulesButton;
        $scope.rulesButtonText = $scope.rulesButton
            ? "Hide Information"
            : "View Information";
    }

    $scope.addPlayer = function (player) {
        player.score = "0";
        player.category = "-";
        player.pointslr = "0";
        player.points = "";
        player.dealer = false;
        $scope.players.push(angular.copy(player));
        $scope.playersN++;
        delete $scope.player;
    }

    $scope.toggleTheme = function () {
        const theme = document.body.className;
        var logThemeChanged = document.getElementById("themeChanged");
        document.body.className = (theme.includes("light"))
                    ? theme.replace("light", "dark")
                    : theme.replace("dark", "light");
        logThemeChanged.textContent = "Theme changet to"
                    + (document.body.className.includes("light") ? " light" : " dark");
        setTimeout(clearDemo, 2000, logThemeChanged);
    }
  
    clearDemo = function (log) {
        log.textContent = "";
    }

    var validatePointsAndCheckboxes = function () {
        var error = document.getElementById("errorPointsCheckboxes");
        if ($scope.players.filter(player => player.dealer).length > 1
                && $scope.players.filter(player => player.points == "").length == 0) {
            error.textContent = "Please select 0 or 1 dealer in checkboxes, only!";
            setTimeout(clearDemo, 2000, error);
            return false;
        }
        if ($scope.players.filter(player => player.points == "").length > 0
                && $scope.players.filter(player => player.dealer).length < 2) {
            error.textContent = "Please insert all points (even zero to winner)!";
            setTimeout(clearDemo, 2000, error);
            return false;
        }
        if ($scope.players.filter(player => player.dealer).length > 1
                && $scope.players.filter(player => player.points == "").length > 0) {
            error.textContent = "WTF ARE YOU DOING?!?!";
            setTimeout(clearDemo, 2000, error);
            return false;
        }
        return true;
    }

    $scope.addPoints = function () {
        if (validatePointsAndCheckboxes()) {
            const specialArray = [420, 422];
            const dealer = ($scope.players.filter(player => player.dealer).length != 0) ? true : false;
            var looser = {name:"", points:"0"};
            var specialPlayer = false;
            $scope.players.forEach(player => {
                player.score = Number(player.score) + Number(player.points);
                player.category = (player.points == 0) ? "winner" : "-";
                if(specialArray.includes(Number(player.score))) {
                    player.score = 0;
                    player.category = "#420FAZESSAXAPABRUX";
                    specialPlayer = true;
                }
                if(dealer) {
                    if(player.dealer) {
                        looser.name = player.name;
                    }
                } else {
                    if ((Number(looser.points) < Number(player.points))) {
                        looser.name = player.name;
                        looser.points = player.points;
                    }
                }
                player.pointslr = Number(player.points);
                player.points = "";
                player.dealer = false;
            });
            if(!specialPlayer){
                $scope.players
                    .filter(player => player.category != "winner")
                    .forEach(player => {
                    if (player.name == looser.name) {
                        player.category = "dealer";
                    }
                });
            }
        }
    }

    $scope.deletePlayer = function (name) {
        var indexPlayer = $scope.players
            .map(function (player){return player.name})
            .indexOf(name);
        $scope.players.splice(indexPlayer, 1);
        $scope.playersN--;
    }
});