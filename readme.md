# Massory Layout

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Masonry layout is a light and small library to build an adaptable image gallery design, you can define the columns and in turn it has internally slow loading of images.

  - Light and small
  - Easy to use and familiarize
  - Does not need extensive configuration

### Installation

Massory layout requires [Node.js](https://nodejs.org/) v4+ to run.
Install the dependencies and devDependencies and start the server.

```sh
$ cd your_folder
$ npm i massory-layout
```

# Api
To start using the library you need to instantiate a ```new Massory({...})``` object.
Receive a configuration object to manage the behavior.

The configuration object receives a couple of basic properties for the structure, a complete example:
```
{
  container: document.getElementById("container"),
  width: "100%",
  maxWidth: "1200px",
  center: true,
  columns: 5,
  lazyLoad: true,
  margin: "5px",
}
```
- ```container``` indicates the container where the images will be added to the DOM.
This property can be optional, you can define it in the method: ```show(imagesArray, container)``` .
- ```width``` determines the width in any unit of measure of the container.
- ```maxWidth``` maxWidth determines the maximum width that the container should have, similar to the previous one.
- ```center``` a boolean indicating whether the container is centered.
- ```columns``` An integer that indicates the number of columns to place images.
- ```lazyLoad``` A boolean that indicates if lazy loading is used in the images, to use this feature, you must provide an array of objects when displaying the images, it is better explained below.
- ```margin``` a string that determines the margin around the images.

To show your images, you use the method ```show(imagesArray, container)```.
This method creates a node and adds it in the ```container``` that you have defined in the constructor or in the show method.
If you don't provide a container, the default will be the ```<body>```.
Examples:
```
const container = document.getElementById("container");

const ma = new Massory({
//container,       (you may also put it here.)
  width: "100%",
  maxWidth: "1200px",
  center: true,
  columns: 5,
  lazyLoad: true,
  margin: "5px",
});

const images = ["blablalba.png", "blablabla.jpg"]

// Show all images in the container
ma.show(images, container);
```

# Lazy load
To use these features, in the arrangement of the images, instead of using a string, you use an object with 2 properties:
```
{
    src: "original_image.png",
    lazy: "tiny_image.png"
}
```
- ```src``` The url of the original image.
- ```lazy``` The url of the lightest image while loading the largest.

# Responsive

This library is responsive, even though you do not have control over this part, this library implements 2 breakpoints:
- screens medium and small

Breakpoints occur when you have more than 3 columns.
The measurements are:
- Medium screens  ```992px ``` (3 columns)
- Small screens: ``` 612px ``` (1 column)

!["Large Screens"](https://i.imgur.com/T1rwSwD.png)

In this way all the characteristics of this small library are used :)
