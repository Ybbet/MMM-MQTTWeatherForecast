Module.register("MMM-MQTTWeatherForecast", {
  defaults: {
    mqttServer: "mqtt://localhost",
    mqttUsername: null,
    mqttPassword: null,
    topicBase: "homeassistant/weather/maville/forecast/",
    days: 5,
    title: "Prévisions météo"
  },

  start() {
    this.forecast = {};
    this.subscribed = false;
    this.mqttClient = null;
    this.makeSubscriptions();
  },

  makeSubscriptions() {
    const mqtt = require("mqtt");
    const options = {};

    if (this.config.mqttUsername && this.config.mqttPassword) {
      options.username = this.config.mqttUsername;
      options.password = this.config.mqttPassword;
    }
    Log.log(`[MMM-MQTTWeatherForecast] Tenter la connexion à MQTT: ${this.config.mqttServer}`);

    this.mqttClient = mqtt.connect(this.config.mqttServer, options);

    this.mqttClient.on("connect", () => {
      Log.log(`[MMM-MQTTWeatherForecast] Connecté à MQTT: ${this.config.mqttServer}`);

      for (let i = 0; i < this.config.days; i++) {
        ["datetime", "temperature", "templow", "condition"].forEach((key) => {
          const topic = `${this.config.topicBase}${i}/${key}`;
          this.mqttClient.subscribe(topic, (err) => {
            if (!err) {
              Log.log(`[MMM-MQTTWeatherForecast] Abonné à ${topic}`);
            } else {
              Log.error(`[MMM-MQTTWeatherForecast] Erreur d'abonnement à ${topic}:`, err);
            }
          });
        });
      }
    });

    this.mqttClient.on("message", (topic, message) => {
      this.sendSocketNotification("MQTT_PAYLOAD", {
        topic,
        message: message.toString()
      });
    });

    this.mqttClient.on("error", (error) => {
      Log.error("[MMM-MQTTWeatherForecast] Erreur de connexion MQTT:", error);
    });
  },

  // autres méthodes du module ici
});
