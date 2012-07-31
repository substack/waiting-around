# waiting-around

Wait around in a big queue, like this:

![waiting around](http://substack.net/images/screenshots/waiting_around.png)

[live demo](http://substack.net/projects/waiting-around/)

# example

This module is a browser widget. Just whip up a main.js like this:

``` js
var files = {
    'images/robot.png' : 0.6,
    'images/twain.png' : 0.7,
    'images/trex.png' : 1,
    'images/poe.png' : 1,
    'images/triceratops.png' : 1,
    'images/t-rex.png' : 1,
    'images/apatosaur.png' : 1,
    'images/raptor.png' : 1,
    'images/spy.png' : 0.8
};

var createQueue = require('waiting-around');
var queue = createQueue(files);
queue.appendTo(document.body);

var spot = 35;
var total = 80;
var iv = setInterval(function () {
    spot --;
    total --;
    if (spot === 0) return clearInterval(iv);
    
    queue.spot(spot, total);
}, 250);
```

Then use [browserify](http://github.com/substack/node-browserify) to generate a
bundle that you can drop into your html:

```
$ browserify main.js -o bundle.js
```

# methods

``` js
var createQueue = require('waiting-around');
```

## var queue = createQueue(images)

Create a new queue widget with an array or hash of `images` to use for the
avatars.

## queue.appendTo(target)

Append the queue dom element to the `target` element.

## queue.spot(n, total)

Set your place in the queue at spot `n` of `total`.

You will have a pinkish dot over your head.

Spots will be created and destroyed around you.

## queue.resize(width, height)

Set the size of the queue.

The avatars will be re-positioned to account for the new dimensions.

## queue.reset()

Empty out the queue.

# install

With [npm](http://npmjs.org) do:

```
npm install waiting-around
```

# license

MIT
