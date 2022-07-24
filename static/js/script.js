function load_map() {
    fetch('https://raw.githubusercontent.com/deldersveld/topojson/master/continents/europe.json')
        .then((r) => r.json())
        .then((data) => {
            const countries = ChartGeo.topojson.feature(data, data.objects.continent_Europe_subunits).features;
            const projection = d3.geoConicConformalEurope();

            projection.fitWidth = (size, object) => projection.fitSize([size, 1000], object);

            const chart = new Chart(document.getElementById('map').getContext('2d'), {
                type: 'choropleth',
                data: {
                    labels: countries.map((d) => d.properties.name),
                    datasets: [
                        {
                            label: 'Countries',
                            outline: countries,
                            data: countries.map((d) => ({
                                feature: d,
                                value: Math.random(),
                            })),
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
                            projection: "mercator",
                        },
                    },
                },
            });
        });
}

function load_year(year) {
    const path = "https://raw.githubusercontent.com/Gaijins-In-Japan/VulcanusStatistics/main/static/js/data" + year + ".json";
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
        load_map();

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

$(document).ready(function () {

    let year = $("#pills-tab .nav-link.active").attr("year");

    load_year(year);

    $("#pills-tab .nav-link").on("click", function () {
        year = $("this").attr("year");
        load_year(year);
    });
});

