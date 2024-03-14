import {convertToJson, renderListWithTemplate} from "./utils.mjs";

function alertTemplate(alert) {
    return `
    <p class="foreground-${alert.color} background-${alert.background}">${alert.message}</p>
    `;
}

//Alert class
export default class Alert {
    constructor(message) {
        this.message = message;
        this.path = `../json/alerts.json`;
        this.renderAlerts();
    }
    async getData() { // Mark as async
        return fetch(this.path)
          .then(convertToJson)
          .then((data) => data);
    }
    async getAlertsHtml() { // Mark as async
        let alerts = await this.getData();
        let alertsHTML = "";
        if(alerts){
            
            alerts.forEach((alert) => {
                alertsHTML += alertTemplate(alert);
            });
        }
        return alertsHTML;
    }
    async renderAlerts(){ // Mark as async
        const element = document.querySelector('main');
        let alertsHtml = await this.getAlertsHtml();
        let html = `<section class="alert-list">`+alertsHtml+`</section>`; // Fixed missing backtick
        element.insertAdjacentHTML(
        "afterBegin",
        html
        );
    }
}
