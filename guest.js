Comments = new Mongo.Collection('comments');

if (Meteor.isClient) {
  Template.body.helpers({
  comments: function () {
    return Comments.find({}, {
      sort: { CreatedAt: -1 }
    });
  }
});

  Template.body.events({
    'submit .new-comment': function(event) {
      event.preventDefault();

      if(event.target.comment.value === ''||
          event.target.name.value === ''){
        // TODO is this blur in the right place? and repetitive?
        event.target.submit.blur();
        return FlashMessages.sendWarning('Both fields are required.');
      }

      Comments.insert({
        text: event.target.comment.value,
        CreatedAt: new Date(),
        name: event.target.name.value
    });

      $('.new-comment').trigger("reset");
      event.target.submit.blur();
      FlashMessages.sendInfo('Comment posted!')

    }
  });


  Template.comment.helpers({
    time: function() {
      return moment(this.CreatedAt).format('MMMM D, YYYY, hh:mm a');
    }
  });


  Template.comment.events({
  'click .delete-comment': function(event) {
    Comments.remove(this._id);
    FlashMessages.sendError('Comment deleted!')
  },

  'click .edit-comment': function(event) {
    console.log(this);
  }
});


}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
