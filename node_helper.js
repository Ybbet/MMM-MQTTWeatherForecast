const NodeHelper = require("node_helper");
const Log = require("logger");

module.exports = NodeHelper.create({
  start() {
    Log.log("[MMM-MQTTWeatherForecast] node_helper démarré.");
  },

  socketNotificationReceived(notification, payload) {
    if (notification === "MQTT_PAYLOAD") {
      const { topic, message } = payload;
      const parts = topic.split("/");
      const day = parseInt(parts[parts.length - 2], 10);
      const key = parts[parts.length - 1];
      const value = message;

      Log.log(`[MMM-MQTTWeatherForecast] Message reçu: jour ${day}, ${key} = ${value}`);

      this.sendSocketNotification("MQTT_FORECAST", {
        day,
        key,
        value
      });
    }
  }
});
