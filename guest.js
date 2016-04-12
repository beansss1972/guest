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

      // Require name and comment for each entry
      if(event.target.comment.value === ''||
          event.target.name.value === ''){
        event.target.submit.blur();
        return FlashMessages.sendWarning('Both fields are required.');
      }

      Comments.insert({
        text: event.target.comment.value,
        CreatedAt: new Date(),
        name: event.target.name.value
    });

      // clear the form and reset submit button
      $('.new-comment').trigger("reset");
      event.target.submit.blur();
      FlashMessages.sendInfo('Comment posted!')

    }
  });

  Template.comment.helpers({
    // format the date
    time: function() {
      return moment(this.CreatedAt).format('MMMM D, YYYY, hh:mm a');
    },
    // flag as 'editing' to show form for editing
    editing: function(){
    return Session.equals('editComment', this._id);
  } 
  });

  // update db with new data after edits
  var saveItem = function(){
    var editItem = {
      name: $("#editName").val(),
      text: $("#editItemComment").val()
    }

    Comments.update(Session.get('editComment'), {$set: editItem});
    // reset after editing
    Session.set('editComment', null);
  }

  // delete a comment
  Template.comment.events({
  'click .delete-comment': function(event) {
    Comments.remove(this._id);
    FlashMessages.sendError('Comment deleted!')
  },

  // edit
  'click .edit-comment': function(event) {
    Session.set('editComment', this._id);
  },

  // cancel an edit
  'click .cancelItem': function(event){
    event.preventDefault();
    Session.set('editComment', null);
  },

  // save an edit
  'click .saveItem': function(event){
    event.preventDefault();
    saveItem();
  },

  // submit (enter) or exit (esc) edit form with keyboard
  'keydown': function(event){
    if(event.keyCode === 13){
      saveItem();
    }
    else if(event.keyCode === 27){
      console.log('pressed esc');
      Session.set('editComment', null);
    }
  }
});

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
