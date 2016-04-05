Comments = new Mongo.Collection('comments')

if (Meteor.isClient) {
  Template.body.helpers({
  comments: function () {
    return Comments.find({}, {
      sort: { createdAt: -1 }
    });
  }
});

  Template.body.events({
    'submit .new-comment': function(event) {
      event.preventDefault();

      Comments.insert({
        text: event.target.comment.value,
        CreatedAt: new Date(),
        name: event.target.name.value
    });

      //TODO button stays 'clicked'
      $('.new-comment').trigger("reset");
      event.target.submit.blur();

    }
  });


  Template.comment.helpers({
    time: function() {
      return moment(this.createdAt).format('MMMM D, YYYY');
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
