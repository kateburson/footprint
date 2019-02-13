$(document).ready(function(){
  // Initialize Firebase
//   var config = {
//    apiKey: "AIzaSyAUbsJcyadBDoOGF24ajS7SC3Q7KweP_AY",
//    authDomain: "bootcamp-project1-504c8.firebaseapp.com",
//    databaseURL: "https://bootcamp-project1-504c8.firebaseio.com",
//    projectId: "bootcamp-project1-504c8",
//    storageBucket: "bootcamp-project1-504c8.appspot.com",
//    messagingSenderId: "452720723166"
//  };
//    firebase.initializeApp(config);
 
   // var database = firebase.database();
 
   var txtEmail = $('#txtEmail');
     var txtPass = $('#txtPass');
     var txtName = $("#txtName");
     var btnLogin = $("#btnLogin");
     var btnSignup = $("#btnSignup");
     var btnLogout = $("#btnLogout");
    
 
   $("#btnLogin").on('click', function(e) {
     e.preventDefault();
     var email = txtEmail.val();
     var pass = txtPass.val();
     var name = txtName.val();
     var auth = firebase.auth();
     
     var promise = auth.signInWithEmailAndPassword(email,pass);
     promise.catch(e => console.log(e.message));
     $("#username").html("Welcome, ", email);
     
   })
 
 
   $("#btnSignup").on('click', function(e) {
     e.preventDefault();
     var name = txtName.val();
     var email = txtEmail.val();
     var pass = txtPass.val();
     var auth = firebase.auth();
     var promise = auth.createUserWithEmailAndPassword(email,pass)
     promise.catch(f => console.log(f.message));
     $("#username").html("Welcome, ", email);

     
 
   })
 
   $("#btnLogout").on('click', function(e) {
       e.preventDefault();
     firebase.auth().signOut();
     $("#username").html("");
 
 
   })
   firebase.auth().onAuthStateChanged(firebaseUser =>  {
     if(firebaseUser) {
       console.log(firebaseUser);
       $("#btnLogout").removeClass('invisible');
       $("#login").addClass("invisible");
     
      }
       else {
         console.log("not logged in");
         $("#btnLogout").addClass('invisible');
         $("#login").removeClass('invisible');
         
     
 
       }
     })
   });