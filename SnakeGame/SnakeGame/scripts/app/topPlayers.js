var app = app || {};

(function (a) {
    var flatData = new Array();

    a.topPlayers = function getTopPlayers() {
        $("#loading").show();
        //$.ajax({
        //    url: 'https://api.everlive.com/v1/kZcKddkMFRsuFeil/Scores',
        //    type: "GET",
        //    headers: { "Authorization": "Bearer ${AccessToken}" },
        //    success: function (data) {
        //        $("#loading").hide();
        //        var players = data.Result;
        //        console.log(players);
        //        for (var i = 0; i < players.length; i++) {
        //            flatData.push(i + 1 + ". "+players[i].Name + " - result: " + players[i].Score);
        //        }
        //        $("#flat-listview").kendoMobileListView({ dataSource: flatData });
                
        //        //console.log(JSON.stringify(data));
        //    },
        //    error: function (error) {
        //        $("#loading").hide();
        //        alert("An error has occured!");
        //    }
        //});
        
        var everlive = new Everlive('kZcKddkMFRsuFeil');
        var data = Everlive.$.data('Scores');
        var query = new Everlive.Query();
        query.orderDesc('Score').take(20);
        data.get(query) 
            .then(function (data) {
                $("#loading").hide();
                var players = data.result;
                console.log(data);
                for (var i = 0; i < players.length; i++) {
                    flatData.push(i + 1 + ". " + players[i].Name + " - result: " + players[i].Score);
                }
                $("#flat-listview").kendoMobileListView({ dataSource: flatData });
            },
            function (error) {
                alert(JSON.stringify(error));
            });

    }
})(app);

