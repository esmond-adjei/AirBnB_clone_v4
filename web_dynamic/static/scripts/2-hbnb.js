$(document).ready(function() {
  var selectedAmenities = {};

  // Listen for changes in input checkbox tags
  $('input[type="checkbox"]').change(function() {
    var amenityId = $(this).data("id");
    var amenityName = $(this).data("name");

    if ($(this).is(":checked")) {
      selectedAmenities[amenityId] = amenityName;
    } else {
      delete selectedAmenities[amenityId];
    }

    // Update the h4 tag with the selected amenities
    var amenitiesList = Object.values(selectedAmenities).join(", ");
    $(".Amenities h4").text("Selected Amenities: " + amenitiesList);
  });

  // Send an HTTP GET request to check the API status
  $.ajax({
    url: "http://0.0.0.0:5001/api/v1/status/",
    type: "GET",
    success: function(data) {
      if (data.status === "OK") {
        // API status is "OK", add the class "available"
        $("#api_status").addClass("available");
      } else {
        // API status is not "OK", remove the class "available"
        $("#api_status").removeClass("available");
      }
    },
    error: function() {
      // Handle any errors that occur during the request (e.g., network issues)
      console.error("Error checking API status");
    }
  });
});
