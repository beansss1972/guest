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
    },
    editing: function(){
    return Session.equals('editComment', this._id);
  } 
  });

  var saveItem = function(){
    var editItem = {
      name: $("#editName").val(),
      text: $("#editItemComment").val()
    }

    Comments.update(Session.get('editComment'), {$set: editItem});
    Session.set('editComment', null);
  }

  Template.comment.events({
  'click .delete-comment': function(event) {
    Comments.remove(this._id);
    FlashMessages.sendError('Comment deleted!')
  },

  'click .edit-comment': function(event) {
    Session.set('editComment', this._id);
  },

  'click .cancelItem': function(event){
    event.preventDefault();
    Session.set('editComment', null);
  },

  'click .saveItem': function(event){
    event.preventDefault();
    saveItem();
  },

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
