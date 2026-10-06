# Travelora — Discover Pakistan
DecodeLabs Frontend Development Internship · Week 3 · Project 3 (Interactive Web Elements)

## Project Description
A travel website for nine Pakistani destinations with search, filters, favorites, modal, gallery lightbox, dark mode, newsletter form and a real interactive map.

## Features
Hero section, destination cards, live search, category filters, favorites counter, details modal, gallery + lightbox, newsletter validation, toast notifications, responsive navbar with hamburger menu.

## Technologies
HTML5, CSS3 (Grid, Flexbox, custom properties), Vanilla JavaScript, DOM Manipulation, Leaflet.js, OpenStreetMap, localStorage.

## Interactive Features
Dynamic card rendering, instant search, filter toggles, favorite hearts (persisted), dark mode (persisted), lightbox with buttons / Escape / arrow keys, form validation, auto-dismissing toasts.

## Map Feature
Leaflet + OpenStreetMap (CDN, no API key). Nine markers with popups. "View on Map" on any card or modal scrolls to the map, flies to the marker and opens its popup.

## Images
Photos sit directly in the project folder (no images folder) with these exact names: hero.jpg, hunza.jpg, skardu.jpg, fairy-meadows.jpg, swat.jpg, gwadar.jpg, karachi.jpg, lahore.jpg, islamabad.jpg, mohenjo-daro.jpg (the gallery reuses the first 8 destination photos). Missing files show a styled fallback with the destination name — never a broken icon. Free sources: Unsplash, Pexels, Wikimedia Commons.

## How to Run
Open `index.html` in a browser (internet needed for map tiles and Leaflet CDN). Or run `python -m http.server` in this folder and visit http://localhost:8000.
