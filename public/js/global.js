// Userlist data array for filling in info box
var userListData = [];

// DOM ready
$(document).ready(function() {

    // Populate the user table on initial page load
    //populateTable();

    // Username link click
    //$('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);

    // Login button click
    /*$('#btnLogin').on('click',login)
    // Add User button click
    $('#btnAddUser').on('click', addUser);*/
    // show post button click
    $('#postButton').on('click', showPosts);
        

});

// Functions =============================================================

// Show posts
function showPosts(event){
    event.preventDefault();
    var post = $('p This is post info')
    $('#lead').append(post);
    $('.btn.btn-primary#postButton').remove();
}


// Show User Info
function showUserInfo(event) {

    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve username from link rel attribute
    var thisUserName = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = userListData.map(function(arrayItem) { return arrayItem.username; }).indexOf(thisUserName);

    // Get our User Object
    var thisUserObject = userListData[arrayPosition];

    //Populate Info Box
    $('#userInfoName').text(thisUserObject.fullname);
    $('#userInfoAge').text(thisUserObject.age);
    $('#userInfoGender').text(thisUserObject.gender);
    $('#userInfoLocation').text(thisUserObject.location);

    
};