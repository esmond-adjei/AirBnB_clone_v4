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

  // api status
  function checkAPIStatus () {
    $.get('http://localhost:5001/api/v1/status/')
      .done((response) => {
        if (response.status === 'OK') { $('DIV#api_status').addClass('available'); } else { $('DIV#api_status').removeClass('available'); }
      })
      .fail((error) => {
        console.log('API status error:', error);
      });
  }
  checkAPIStatus();
  // setInterval(checkAPIStatus, 30000);
});
