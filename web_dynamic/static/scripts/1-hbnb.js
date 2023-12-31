// listen for changes in `input` checkbox tag

$(document).ready(function () {
  const selectedAmenities = {};

  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if ($(this).is(':checked')) {
      selectedAmenities[amenityId] = amenityName;
    } else {
      delete selectedAmenities[amenityId];
    }

    // Update the h4 tag with the selected amenities
    const amenitiesList = Object.values(selectedAmenities).join(', ');
    $('.Amenities h4').text('Selected Amenities: ' + amenitiesList);
  });
});
