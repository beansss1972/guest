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

      if(event.target.comment.value === ''||
          event.target.name.value === ''){
        return FlashMessages.sendWarning('Both fields are required.')
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
      return moment(this.createdAt).format('MMMM D, YYYY');
    }
  });

  Template.comment.events({
  'click .delete-comment': function(event) {
    Comments.remove(this._id);
    FlashMessages.sendError('Comment deleted!')
  }
});

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
