// listen for changes in `input` checkbox tag

$(document).ready(function() {
  var selectedAmenities = {};

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
});

