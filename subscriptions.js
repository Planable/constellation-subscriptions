// Hook in to constellation UI

var Constellation = Package["babrahams:constellation"];
	
Constellation.API.addTab({
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


// Object for subscriptions
// var subscriptions = Meteor.default_connection._subscriptions
// Object.observe polyfill

// Template.Constellation_subscriptions.helpers({
//  subscription: function () {
//    var data = ConstellationSubData.get()
//    return data;
//  },
//  subscriptionParams: function() {
//    return this.params
//  }
// });

// Template.Constellation_subscriptions.events({
//  'click .Constellation_stop_subscription': function () {
//    this.stop()
//  },
//  'click #createNewSub': function () {

//    var argument = false,
//      stuff = [];
    
//    var askForArgument = function () {
//      argument = prompt("What is the name of your subscription?");
//      addArgument(argument);
//    }
    
//    var addArgument = function (argument) {
//      if (argument) {
//        stuff.push(argument);
//        askForArgument();
//      } else {
//        Meteor.subscribe.apply(Meteor, stuff); 
//      }
//    }

//    askForArgument();

//  }
// });