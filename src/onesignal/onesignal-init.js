
var OneSignal = window.OneSignal || [];
OneSignal.push(function () {
    OneSignal.init({
        // a7ef5e9b-6a47-4991-983e-2869e8749c59
        appId: "a7ef5e9b-6a47-4991-983e-2869e8749c59",
        autoRegister: false,
        allowLocalhostAsSecureOrigin: true,
        persistNotification: true,
        notifyButton: {
            enable: false,
        },
        welcomeNotification: {
            "title": "Obrigado por usar o FarmáciaAí!",
            "message": "Seus novos pedidos aparecerão aqui e você será avisado toda vez que eles mudarem de status!",
            // "url": "" /* Leave commented for the notification to not open a window on Chrome and Firefox (on Safari, it opens to your webpage) */
        },
        promptOptions: {
            /* actionMessage limited to 90 characters */
            actionMessage: "Para notificações de status do pedido, precisamos da sua autorização.",
            /* acceptButtonText limited to 15 characters */
            acceptButtonText: "PERMITIR",
            /* cancelButtonText limited to 15 characters */
            cancelButtonText: "CANCELAR"
        }
    });
});
var url = new URL(window.location.href);
var wfId = url.searchParams.get("wfId");
var showPrompt = url.searchParams.get("showPrompt");

function showOneSignalPrompt() {
    OneSignal.push(function () {
        OneSignal.showHttpPrompt({ force: true });
        // OneSignal.showNativePrompt();
    });
}

function onLoad() {
    OneSignal.isPushNotificationsEnabled().then(function (isEnabled) {
        // console.log("showPrompt", showPrompt);
        if (isEnabled) {
            oneSignalApplyTag();
        }
        if (!isEnabled && showPrompt) {
            showOneSignalPrompt();
        }
        if (!showPrompt) {
            bubbleSubscriptionChange(isEnabled);
        }
    });
    OneSignal.push(function () {
        OneSignal.on('subscriptionChange', function (isSubscribed) {
            bubbleSubscriptionChange(isSubscribed);
            if (isSubscribed) {
                oneSignalApplyTag();
            }
        });
    });
}

function bubbleSubscriptionChange(isSubscribed) {
    var target = 'https://www.webfarmas.com';
    var origin = window.self == window.top ? window.opener : window.parent;
    origin.postMessage({
        eventName: 'oneSignalSubscriptionChange',
        isSubscribed: isSubscribed
    }, target);
}

function oneSignalApplyTag() {
    if (wfId) {
        OneSignal.sendTags({
            wfId: wfId,
            origin: 'WEB'
        }).then(function (tagsSent) {
            console.log(tagsSent);
            if (window.self == window.top)
                window.close();
        });
    }
}