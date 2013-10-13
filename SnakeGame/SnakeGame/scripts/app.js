var app = app || {};

(function(a) {
    
    document.addEventListener("deviceready", function() {
        app.kendoApp = new kendo.mobile.Application(document.body);
        $("#quitButton").on("touchstart", false);
        $("#quitButton").kendoTouch({
            tap: function (e) {
                e.preventDefault();
                navigator.notification.confirm(
             'Do you want to close the app?',
             closeApp,
             'Snake',
             'Yes, No'
             );
            }
        });

        function closeApp(buttonIndex) {
            if (buttonIndex == 1) {  
                navigator.app.exitApp();
            }
            else {
                
            }
        }
    });


    

}(app));
