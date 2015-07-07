// Hook in to constellation UI

var Constellation = Package["babrahams:constellation"].API;
	
Constellation.addTab({
  name: 'Subscriptions',
  mainContentTemplate: 'Constellation_subscriptions_main',
  menuContentTemplate: 'Constellation_subscriptions_menu'
}); 

// Poll subscriptions on this connection

Meteor.setInterval(function () {
  var subscriptions  = Meteor.default_connection._subscriptions;
  var subKeys        = Object.keys(subscriptions);
  Session.set("Constellation_subscriptions", subKeys);
},5000);

Template.Constellation_subscriptions_main.helpers({
  subscriptions: function () {
 
    return Session.get("Constellation_subscriptions");

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