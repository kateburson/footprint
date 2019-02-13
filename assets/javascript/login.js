$(document).ready(function(){
 
   var txtEmail = $('#txtEmail');
     var txtPass = $('#txtPass');
     var txtName = $("#txtName");
     var btnLogin = $("#btnLogin");
     var btnSignup = $("#btnSignup");
     var btnLogout = $("#btnLogout");
     var error = $('#error');
   
   $("#btnLogin").on('click', function(e) {
     e.preventDefault();
     var email = txtEmail.val();
     var pass = txtPass.val();
     var name = txtName.val();
     var auth = firebase.auth();
     
     var promise = auth.signInWithEmailAndPassword(email,pass);
     promise.catch(e => console.log(e.message));
     $("#user").html("Welcome, " + email);
     console.log(email)
     promise.catch(e => $('#error').html("Error " + e.message));
     itineraryObj.getItinerary();
 
   })
 
 
   $("#btnSignup").on('click', function(e) {
     e.preventDefault();
     var name = txtName.val();
     var email = txtEmail.val();
     var pass = txtPass.val();
     var auth = firebase.auth();
     var promise = auth.createUserWithEmailAndPassword(email,pass).then(function(user) {
       return user.updateProfile({'displayName': $("#txtName").val()});
     }).catch(function(error) {
       console.log(error);
     });
     promise.catch(f => console.log(f.message));
     promise.catch(e => $('#error').html("Error " + e.message));
     
     
 
   })
 
   $("#btnLogout").on('click', function(e) {
       e.preventDefault();
     firebase.auth().signOut();
     $("#user").html("");
     appObj.currUserId = ""
     appObj.currUserName = ""
     itineraryObj.clearItinerary();
 
 
 
   })
   firebase.auth().onAuthStateChanged(firebaseUser =>  {
     if(firebaseUser) {
       console.log(firebaseUser);
       $("#btnLogout").removeClass('invisible');
      //  $("#login").addClass("invisible");
      $("#login").text(firebaseUser.email);
       appObj.currUserName = firebaseUser.email; 
       appObj.currUserId = firebaseUser.uid;
       console.log(firebaseUser.email);
   
     
      }
       else {
         console.log("not logged in");
         $("#btnLogout").addClass('invisible');
         $("#login").text('Log In/Sign Up');
         
     
 
       }
     })
   });