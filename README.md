# VulcanusStatistics

Welcome to the repository where we are trying to summary all the info we can get of the [Vulcanus in Japan](https://www.eu-japan.eu/events/vulcanus-japan) selection process.

What we are trying to "data mining" is:
- Companies in the programme
- How many placements these companies offers and how many are actually filled
- Which departments are the ones who actually select people more often?
- IDK, propose it!

### data.json
This json contains the placement information of each year
```
{
    "year": {
        "participants": {
            "preselected": <number>,
            "selected": <number>,
            "selected-info": {
                "interviewed": [<number of people who had an interview> , <number of people who hadn't an interview>],
                "informed": [<number of yes> , <number of no>],
                "studies": [<undergraduate>, <specialisation>, <master>, <phd>],
                "japan": [<number of people of have been in japan> , <number of people of haven't been in japan>],
                "jlpt": [<nothing>, <n1>, <n2>, <n3>, <n4>, <n5>]
            }
        },
        "company name": {
            "department": [number of vacancies, vacancies filled]
        }
    }
}
```
