// Hook in to constellation UI

var Constellation = Package["constellation:console"].API;
    
Constellation.addTab({
  name: 'Subscriptions',
  mainContentTemplate: 'Constellation_subscriptions_main',
  menuContentTemplate: 'Constellation_subscriptions_menu',
  onClick: "setSubscriptions"
});

Constellation.registerCallbacks({
  setSubscriptions : function () {
    if (Constellation.isCurrentTab('Subscriptions', 'plugin')) {
      setSubscriptions();
    }
  }
});

var SubscriptionsDict = new ReactiveDict('constellation-subscriptions');

var setSubscriptions = function () {
  var subscriptions  = Meteor.default_connection._subscriptions;
  var subKeys        = Object.keys(subscriptions);
  SubscriptionsDict.set("Constellation_subscriptions", subKeys);
}

if (Object.observe) {
  Object.observe(Meteor.default_connection._subscriptions, function () {
    setSubscriptions();
  });
}
else {
  // Poll subscriptions on this connection
  Meteor.setInterval(function () {
    var currentTab = Constellation.getCurrentTab();
    if (currentTab && currentTab.id === 'Subscriptions') {
      setSubscriptions();
    }
  },3000);
}

Template.Constellation_subscriptions_main.helpers({
  subscriptions: function () {
 
    return _.filter(SubscriptionsDict.get("Constellation_subscriptions"), function (subscription) {
	  return subscription.indexOf("Constellation_") === -1;
	});

  },
  name: function () {
    var subName = Meteor.default_connection._subscriptions[this] && Meteor.default_connection._subscriptions[this].name;
    return subName;
  },
  params: function () {
    var p = Meteor.default_connection._subscriptions[this] && Meteor.default_connection._subscriptions[this].params

    if (p && p.length > 0) {
      return p;
    } else {
      return "none";
    }
  }
});


Template.Constellation_subscriptions_main.events({
  'click .Constellation_subscription_toggle': function () {
    Meteor.default_connection._subscriptions[this].stop()
  }
});