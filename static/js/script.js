let chart;

function load_map(participantsCountries) {
    if (chart)
        chart.destroy();

    fetch('https://raw.githubusercontent.com/deldersveld/topojson/master/continents/europe.json')
        .then((r) => r.json())
        .then((data) => {
            const countries = ChartGeo.topojson.feature(data, data.objects.continent_Europe_subunits).features;
            const projection = d3.geoConicConformalEurope();

            projection.fitWidth = (size, object) => projection.fitSize([size, 1000], object);

            chart = new Chart(document.getElementById('map').getContext('2d'), {
                type: 'choropleth',
                data: {
                    labels: countries.map((d) => d.properties.geounit),
                    datasets: [
                        {
                            label: 'Countries',
                            outline: countries,
                            data: countries.map((d) => {
                                const countryName = d.properties.geounit;
                                const count = countryName in participantsCountries ? participantsCountries[countryName]: 0;

                                return {
                                    feature: d,
                                    value: count,
                                }
                            }),
                        },
                    ],
                },
                options: {
                    showOutline: true,
                    showGraticule: false,
                    plugins: {
                        legend: {
                            display: false,
                        },
                    },
                    scales: {
                        xy: {
                            projection: "equalEarth",
                        },
                    },
                },
            });
        });
}

function load_year(year) {
    const path = "https://raw.githubusercontent.com/Gaijins-In-Japan/VulcanusStatistics/map/static/js/data"+ year +".json";
    $.getJSON(path, function (data) {
        // Chart

        // Dates
        let dates = data['dates'];
        $("#startdate").html(dates['start']);
        $("#enddate").html(dates['end']);
        $("#preselected").html(dates['preselection']);
        $("#selected").html(dates['selection']);

        if ("second-round-start" in dates) {
            $("#second-round").html("Yes");
            $("#second-details").removeClass("visually-hidden")
            $("#second-round-start").html(dates['second-round-start']);
            $("#second-round-ends").html(dates['second-round-ends']);
        } else {
            $("#second-round").html("No");
            $("#second-details").addClass("visually-hidden")
        }

        // Map
        load_map(data["participants"]["selected-info"]["countries"]);

        // Questions
        let selected_poll = data['participants']['selected-info'];
        $("#interview-yes span").html(selected_poll['interviewed'][0]);
        $("#interview-no span").html(selected_poll['interviewed'][1]);

        $("#informed-yes span").html(selected_poll['interviewed'][0]);
        $("#informed-no span").html(selected_poll['interviewed'][1]);

        $("#studies-und span").html(selected_poll['studies'][0]);
        $("#studies-spc span").html(selected_poll['studies'][1]);
        $("#studies-mas span").html(selected_poll['studies'][2]);
        $("#studies-phd span").html(selected_poll['studies'][3]);

        $("#japan-yes span").html(selected_poll['japan'][0]);
        $("#japan-no span").html(selected_poll['japan'][1]);

        $("#jlpt-n0 span").html(selected_poll['jlpt'][0]);
        $("#jlpt-n5 span").html(selected_poll['jlpt'][1]);
        $("#jlpt-n4 span").html(selected_poll['jlpt'][2]);
        $("#jlpt-n3 span").html(selected_poll['jlpt'][3]);
        $("#jlpt-n2 span").html(selected_poll['jlpt'][4]);
        $("#jlpt-n1 span").html(selected_poll['jlpt'][5]);
    });
}

function active_navitems() {
    /* Add/remove active class from nav items
     * */
    $("nav .navbar-nav .nav-link").removeClass("active");
    $(this).addClass("active");
}  // i'm sure these 2 functions can be merged
function active_pillitems() {
    /* Add/remove active class from pills items
     * */
    $("#pills-tab .nav-link").removeClass("active");
    $(this).addClass("active");
}


$(document).ready(function () {

    $("nav .navbar-nav .nav-link").on("click", active_navitems);
    $("#pills-tab .nav-link").on("click", active_pillitems);

    let year = $("#pills-tab .nav-link.active").attr("year");

    load_year(year);

    $("#pills-tab .nav-link").on("click", function () {
        year = $(this).attr("year");
        load_year(year);
    });
});

