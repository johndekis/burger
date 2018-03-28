$(function() {
  
  $(".change-devoured").on("click", function(event) {
    var id = $(this).data("id");
    var newDevour = $(this).data("new-devour");
    
    console.log(`new-devour: ${newDevour}`);
   
    var devouredState = {
      devoured: newDevour
    };
    
    console.log(`devouredState: ${devouredState.devoured}`)
   
    // Send the PUT request.
    $.ajax("/burgers/update/" + id, {
      type: "PUT",
      data: devouredState
      })
    .then(function() {
      console.log("changed devoured to", newDevour);
      // Reload the page to get the updated list
      location.reload();
    });
  });
  
  $(".burger-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    //event.stopPropagation();
    event.preventDefault();
    if($("#burgerAdd").val().trim() === ""){
      console.log("no text in burger add");
      swal("Can't add a nothing burger!", "Try giving it a name.","error");
    } else{
      var newBurger = {
        burger_name: $("#burgerAdd").val().trim(),
        devoured: false
      };

      // Send the POST request.
      $.ajax("/burgers/create", {
        type: "POST",
        data: newBurger
      })
      .then(function() {
        console.log("created new burger");
        // Reload the page to get the updated list
        location.reload();
        swal("Burger adeed to List!", "way to go", "success");
      });
    }
  });
  
  $(".delete-burger").on("click", function(event) {
    event.preventDefault();
    event.stopPropagation();
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/burgers/delete/" + id, {
      type: "DELETE"
      }).then(function() {
        console.log("deleted burger", id);
        //
        // Reload the page to get the updated list
       location.reload();
      });
      
  });
});

  