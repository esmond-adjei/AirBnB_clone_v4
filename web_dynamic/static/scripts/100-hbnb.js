// listen for changes in `input` checkbox tag
$(document).ready(function () {
  $('input[type="checkbox"]').change(function () {
    const selectedItems = {
      amenities: {},
      states: {},
      cities: {}
    };

    function handleCheckboxChange (category, id, name) {
      if ($(`ul.${category} input[data-id="${id}"]`).is(':checked')) {
        selectedItems[category][id] = name;
      } else {
        delete selectedItems[category][id];
      }

      const amenitiesList = Object.values(selectedItems.amenities).join(', ');
      const selectedStates = JSON.stringify(selectedItems.states);
      const selectedCities = JSON.stringify(selectedItems.cities);

      $('div.amenities h4').text('Selected Amenities: ' + amenitiesList);
      $('div.locations h4').text('States: ' + selectedStates + ', Cities: ' + selectedCities);
    }

    // Listen for changes in `input` checkbox tag
    $('input[type="checkbox"]').change(function () {
      const category = $(this).closest('ul').attr('class');
      const id = $(this).data('id');
      const name = $(this).data('name');

      handleCheckboxChange(category, id, name);
    });
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

  // search places
  function searchPlaces () {
    const selectedStates = {};
    const selectedCities = {};
    const selectedAmenities = {};

    $('ul.states input[type="checkbox"]:checked').each(function () {
      selectedStates[$(this).data('id')] = $(this).data('name');
    });
    $('ul.cities input[type="checkbox"]:checked').each(function () {
      selectedCities[$(this).data('id')] = $(this).data('name');
    });
    $('ul.amenities input[type="checkbox"]:checked').each(function () {
      selectedAmenities[$(this).data('id')] = $(this).data('name');
    });

    // Make a POST request to places_search with selected data
    $.ajax({
      type: 'POST',
      url: '/places_search',
      data: JSON.stringify({
        states: selectedStates,
        cities: selectedCities,
        amenities: selectedAmenities
      }),
      contentType: 'application/json',
      dataType: 'json',
      success: function (data) {
        $('section.places').empty();
        $('section.places').append('<h1>Places</h1>');
        for (const place of data) {
          const article = [
            '<article>',
            "<div class='title_box'>",
            '<h2>' + place.name + '</h2>',
            "<div class='price_by_night'>$" + place.price_by_night + '</div>',
            '</div>',
            "<div class='information'>",
            "<div class='max_guest'>" + place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '') + '</div>',
            "<div class='number_rooms'>" + place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '') + '</div>',
            "<div class='number_bathrooms'>" + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '') + '</div>',
            '</div>',
            "<div class='description'>" + place.description + '</div>',
            '</article>'
          ];
          $('section.places').append(article.join(''));
        }
      }
    });
  }

  // click button
  $('button').click(function () {
    searchPlaces();
  });

  checkAPIStatus();
  // setInterval(checkAPIStatus, 30000);
});
