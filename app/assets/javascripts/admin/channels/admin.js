(function() {
  App.admin = App.cable.subscriptions.create("AdminChannel", {
    connected: function() {
      console.log("connected");
    },
    disconnected: function() {
      console.log("disconnected");
    },
    received: function(data) {
      console.log(data);
      if(data["message"]["unread_count"]) {
        $("span#notification_count").html(data["message"]["unread_count"]);
      }
    },
    notification: function() {
      return this.perform('notification');
    }
  });

}).call(this);
