Comments = new Mongo.Collection('comments')

if (Meteor.isClient) {
  Template.body.helpers({
  comments: function () {
    return Comments.find({}, {
      sort: { createdAt: -1 }
    });
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
