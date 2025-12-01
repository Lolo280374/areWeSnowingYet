<p align="center"><br>
<a href="https://github.com/Lolo280374/areWeSnowingYet"><img src="https://hackatime-badge.hackclub.com/U09CBF0DS4F/areWeSnowingYet"></a>
<a href="https://makeapullrequest.com"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg"></a>
<a href="#table-of-contents"><img src="https://img.shields.io/badge/works_on-mobile_yay-brightgreen"></a>
<a href="#table-of-contents"><img src="https://img.shields.io/badge/powered_by-hc_nest-white"></a>
<br></p>

<h3 align="center">
is it snowing yet in your city? — get a global worldwide-scaled snow map, updated every 5 hours!
</h3>

<h1 align="center">
screenshots
</h1>

<img width="1876" height="1031" alt="zen_3XtIBzs45r" src="https://github.com/user-attachments/assets/07e74cae-f757-4ef9-8f7b-2ccbbf20e9f7" />

<img width="1876" height="1031" alt="zen_6N1tmlledm" src="https://github.com/user-attachments/assets/6eb7a74a-e6d7-48d3-b386-8d4f2bbe6809" />

<br>

> [!NOTE]  
> due to API rate limitations, and to avoid spamming the server all the time, the map is being updated automatically every 4-ish hours. (and only considering cities with at least 300k inhabitants). sorry if that's not real real time, but otherwise it would be too much!

## table of contents

- [about](#about)
- [features](#features)
- [how this was made](#how-this-was-made)
- [contributing](#contributing)
- [reporting issues](#reporting-issues)
- [privacy statement](#privacy-statement)
- [credits](#credits)
- [license](#license)

## about
the theme this week for siege was winter. and I had NO IDEA what to do. I wanted to do something relying on OpenStreetMaps for a while, but never got the idea or thinking to do so. but now, here it is! since i had no idea for winter, and i didn't want to do just a regular weather app cause that's really seen and re-seen, I decided to make a more global focused one!

so yeah. here comes the inspiration from that week!

## features
this project allows you to see in (close) time (updated every 4 hours) where the snow is in the world right now on a global earth map! it'll show you in what city the snow is located, the type (heavy snow, snow, and snow showers), and the temperature in that city! 

> [!TIP]
> note that the circle on the map is only meant to indicate the city in where the event is happening, and not a certain region or part in that city! don't take it as a close indicator.

## how this was made
so due to the fact that there's no public API exposing where snow currently is in the world right now, I had to try to make my own! the mechanism is simple: using a dataset of about 48k cities (but we'll only use about 2-3k here since we're only using the ones with more than 300k inhabitants), we'll check in these cities if it's snowing or not right now, if it is, we'll store the current weather condition and the temperature in a JSON file, and then display it on the map!

if you're wondering how that JSON file looks like, turns out you can see it! to view it, [click here](https://api.arewesnowing.lolodotzip.tech/snowing.json).

## contributing
to contribute, you can simply git clone this repo, and start editing either the HTML/JS code, or the Python serverside file to edit how the API is being used!

```sh
git clone https://github.com/Lolo280374/arewesnowingyet.git
cd arewesnowingyet
ls
```

and you may then request changes via a PR!

## reporting issues
this is a community project, and your help is very much appreciated! if you notice anything wrong during your usage of this website, please report it on the [GitHub issue tracker!](https://github.com/Lolo280374/areWeSnowingYet/issues/)!

## privacy statement
I, nor the website itself collects any data about you! this was one of my main focus on making a global earth-scaled map, so that you could get a global view, and not require location services or entering your location!
<br>by such, this software is good privacy wise, i guess!

## credits
here are the list of stuff and tools that truely helped for this project, without them yeah it wouldn't look like it is right now:
<br> - [OpenStreetMap](https://osm.org) - map information and data
<br> - [CARTO (ex. cartoDB)](https://carto.com/) - cool native dark theme, based on OSM but custom tiles
<br> - [Leaflet](https://leafletjs.com) - main tool allowing to create the map and place the circles on it
<br> - [Lucide Icons](https://lucide.dev) - lucide back at it again cooking on the icon pack
<br> - [Open-Meteo](https://open-meteo.com) - main API used for fetching snow data, temperatures...
<br> - [SimpleMaps](https://simplemaps.com/data/world-cities) - main tool used to get the list of cities for OpenMeteo
<br> and some others I probably forgot, sorry!!

## license
this project is licensed under the MIT License, which you may check [here](https://github.com/Lolo280374/areWeSnowingYet/blob/master/LICENSE/).
<br>if you have any questions or inquieries about this project, please reach out [at lolodotzip@hackclub.app](mailto:lolodotzip@hackclub.app).