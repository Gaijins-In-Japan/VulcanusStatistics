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
        "company name": {
            "department": [number of vacancies, vacancies filled]
        }
    }
}
```
