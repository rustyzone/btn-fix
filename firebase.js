
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Your web app's Firebase configuration
 var firebaseConfig = {
   apiKey: "----",
   authDomain: "----.firebaseapp.com",
   databaseURL: "https://----.firebaseio.com",
   projectId: "----",
   storageBucket: "---.appspot.com",
   messagingSenderId: "---",
   appId: "1:---:web:---"
 };
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);


console.log(firebase);

chrome.runtime.onMessage.addListener((msg, sender, response) => {

 if(msg.command == "fetch"){
   var domain = msg.data.domain;
   var enc_domain = btoa(domain);
   firebase.database().ref('/domain/'+enc_domain).once('value').then(function(snapshot){

     response({type: "result", status: "success", data: snapshot.val(), request: msg});
   });
 }

 //submit coupon data..
 if(msg.command == "post"){

    var domain = msg.data.domain;
    var enc_domain = btoa(domain);
    var code = msg.data.code;
    var desc = msg.data.desc;

    try{

      var newPost = firebase.database().ref('/domain/'+enc_domain).push().set({
        code: code,
        description: desc
      });

      var postId = newPost.key;
      response({type: "result", status: "success", data: postId, request: msg});

    }catch(e){
      console.log('error:', e);
      response({type: "result", status: "error", data: e, request: msg});
    }
 }

 return true;

})
