eventEmitter - Lets get that event emitted 
============

An attempt to make a node(server) / browser(client) compatible [events.EventEmitter](http://nodejs.org/api/events.html)  library of node.js . Tested in major browsers and node.

Description
-------------------------------------
You can check out the jsdoc rendered page from comments or have a quick bite here

```
eventEmitter.addListener(event,listener) AKA eventEmitter.on(event,listener)
```
Adds listener to the end of the listener array for the mentioned event, returns eventEmitter object. This will also cause 'newListener' event to be triggered provided there is a listener subscribing for the same

```
eventEmitter.once(event,listener)
```
Adds listener mentioned event,but this listener will be invoked only once returns eventEmitter object

```
eventEmitter.removeListener(event,listener)
```
Removes the provided listener for the given event, will emit the 'removeListener' event if any listeners is subscribing for it.

```
eventEmitter.removeAllListeners([event|null])
```
Removes all the listener for the mentioned event, if 'null' is passed then all listeners are removed for all the events

```
eventEmitter.setMaxListeners(number)
```
Sets the maximum number of listeners which are entitled to subscribe for an event without any warning being thrown

```
eventEmitter.listeners(event)
```
Returns the listener array subscribing for the event

```
eventEmitter.emit(event, [args])
```
Emit the event, causing invocation of all the subscribed listeners, an optional set of arguments can be passed

```
[static] eventEmitter.listenerCount(eventEmitter,event)
```
Returns the count of listeners subscribing for an event , for the given eventEmitter object


How to use ?
--------------------------------------
In node

```
var nodeExport = require("./emitter");
var emitter = new nodeExport.eventEmitter();
```

In browser

```
<script src="emitter.js"></script>
<script >
var emitter = new eventEmitter();
</script>
```

Test suites included
--------------------------------------
A crude set of testsuites checking the basic functionalities are provided. You can add some more test cases.

In node

```
node testemitter.js
```

In browser 

```
<script src="emitter.js"></script>
<script src="testemitter.js"></script>
```

