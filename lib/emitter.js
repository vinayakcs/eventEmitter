    /**
     * @fileOverview An attempt to make a node cum browser compatible events.EventEmitter library of node.js . Tested in major browsers and node. 
     * @author Vinayak CS
     * @version 0.0.1
     */

var namePlaceHolder,eventEmitter ;

// An anonymous function checking for console.log to display warning in case of increasing the listener count beyond the maximum
           


(function(){
	if(typeof console === "undefined") {
		var console = { log: function() {} };
	}
}());



/**
 * eventEmitter responsible for managing events and their corresponding callbacks , each event can have multiple listeners listening for their emission. Similar to publisher/subscriber programming paradigm.
 * @alias eventEmitter
 * @class Describes all the behaviour of an event management system
 */
namePlaceHolder = function eventEmitter(){

    /**
     *  A dictionary mapping the events with the list of listeners
     * @type object
     */

this.emitterEventList={};

    /**
     * Will store the maximum of number of listeners which can safely be used to subscribe for an event
     * @type number
     * @default 10
     */

this.emitterMaxListener=eventEmitter.DEFAULT_MAX_LISTENER;


/**
* addListener or on adds a listener to a event, so when the event is emitted, a callback will execute the listeners, newListener event will be raised if there is a listener associated to it.
* @function
* @param {string} event The event which may be emitted in the future
* @param {function} listener The listener which will be invoked upon emission of the events
* @returns {object} eventEmitter
* @throws {ImproperArgumentSuppliedException}
*/
namePlaceHolder.prototype.addListener = namePlaceHolder.prototype.on = function addListener(event,listener){

	if((typeof listener !== "function") || (typeof event !== "string")){
		throw new Error("addListener expects a (string,function) argument");	
	}


	if(!this.emitterEventList.hasOwnProperty(event)){
		this.emitterEventList[event]=[];
	}

	if((this.emitterMaxListener !== 0) && (this.emitterEventList[event].length >= this.emitterMaxListener)){
		console.log("More than "+this.emitterMaxListener+" listeners have been added to event "+event+" possible memory leak" );
	}
	if(this.emitterEventList.hasOwnProperty("newListener")){
		this.emit("newListener"); 
	}


this.emitterEventList[event].push(listener);
return this;
};


/**
* once adds a listener to a event, but unlike the addListener method , the added listener will be removed after the first occurence of the associated event
* @function
* @param {string} event The event which may be emitted in the future
* @param {function} listener The listener which will be invoked only once upon emission of the event
* @returns {object} eventEmitter
* @throws {ImproperArgumentSuppliedException}
*/
namePlaceHolder.prototype.once = function once(event,listener){
var self= this;
	if((typeof listener !== "function") || (typeof event !== "string")){
		throw new Error("once expects a (string,function) argument");	
	}

var args= Array.prototype.slice.call(arguments,2);
var onceFunc = function onceFunc(args){

listener.call(null,args);
self.removeListener(event,onceFunc);

};

this.addListener(event,onceFunc);

return this;
};


/**
* removeListener This will remove the listener mentioned, if it exists, removeListener event will be emitted if there is a listener associated to it.
* @function
* @param {string} event The event whose listener will be removed
* @param {function} listener The listener which will no longer listen to the emission of the event
* @returns {object} eventEmitter
* @throws {ImproperArgumentSuppliedException}
*/
namePlaceHolder.prototype.removeListener = function removeListener(event,listener){
	if((typeof listener !== "function") || (typeof event !== "string")){
		throw new Error("removeListener expects a (string,function) argument");	
	}

	if(this.emitterEventList.hasOwnProperty(event)){

		if(this.emitterEventList.hasOwnProperty("removeListener") && event!=="removeListener"){
			this.emit("removeListener"); 
		}
		
		var index=this.emitterEventList[event].lastIndexOf(listener);
		
		if(index > -1){
			this.emitterEventList[event].splice(index,1);
			if(this.emitterEventList[event].length===0) delete this.emitterEventList[event];
			
		}
	}

};


/**
* removeAllListeners This will remove all the listener mentioned, if it exists
* @function
* @param {string|null} event The event whose listener will be removed, in case null is provided all the listeners for all the events will be removed
* @returns {object} eventEmitter
* @throws {ImproperArgumentSuppliedException}
*/
namePlaceHolder.prototype.removeAllListeners = function removeAllListeners(event){

	if((typeof event === "undefined") ||  (event!== null && typeof event !== "string")){
		throw new Error("removeAllListeners expects string or null argument");
	}
var key,i=0;

	if(event === null){
		if(this.emitterEventList.hasOwnProperty("removeListener")){
		 for (key in this.emitterEventList) {
			if (key === 'removeListener') continue;
				while(i<this.emitterEventList[key].length) {
					this.emit("removeListener");	
					i++;		
				}
			}
		}

		 this.emitterEventList={};
	}else{
		if(this.emitterEventList.hasOwnProperty("removeListener") && event!="removeListener"){
			while(i<this.emitterEventList[event].length){
				this.emit("removeListener");	
				i++;
			}
		}
		
		 delete this.emitterEventList[event];
	}
return this;
};



/**
* setMaxListener This will set the maximum number of listeners for any given event, A warning will be provided when more listeners will be added to the event
* @function
* @inner
* @param {number} maximum-listeners This indicates the number of listeners which can subscribe to the events safely. Setting 0 will allow infinite listeners to subscribe to the events without warning
* @throws {ImproperArgumentSuppliedException}
*/
namePlaceHolder.prototype.setMaxListener = function setMaxListener(number){
	if((typeof number==="number") && (number === parseInt(number)) && number>=0){

		this.emitterMaxListener=number;
	}
	else
	{
		throw new Error("setMaxListener expects a positive integer");
	}

};


/**
* listeners This will return the array of listeners subscribing for an event
* @function
* @param {string} event The event whose listeners will be returned
* @returns {array} listeners
* @throws {ImproperArgumentSuppliedException}
*/
namePlaceHolder.prototype.listeners = function listeners(event){
	if(typeof event !== "string"){
		throw new Error("emit expects a string argument");	
	}

	if(this.emitterEventList.hasOwnProperty(event)){
		return this.emitterEventList[event];
	}else{
		return [];
	}
};


/**
* emit This will emit or trigger the event , allowing all the listeners subscribed to the event to be invoked
* @function
* @param {string}  event The event whose listeners will be invoked
* @param [args]  Arguments which the listeners can make use of 
* @returns {object} eventEmitter
* @throws {ImproperArgumentSuppliedException}
*/
namePlaceHolder.prototype.emit = function emit(event){
	if(typeof event !== "string"){
		throw new Error("emit expects a string argument");	
	}
	if(event==="error" && !this.emitterEventList.error)
	{
		console.trace();
		throw new Error("error event dosent have a listener");
	}
var i=0;
	if(this.emitterEventList.hasOwnProperty(event)){
		var self=this;
		var args = Array.prototype.slice.call(arguments, 1);
//Copy of events, so during loop modification of DS will not lead to chaos
		var emitterListeners = this.emitterEventList[event].slice();
		
			for ( i=0;i<emitterListeners.length;i++){
				emitterListeners[i].apply(self,args);
			}
	}
return (i>0);
};


};





/**
    * This will return the number of listenrs for the mentioned event and the eventEmitter object
    * @function
    * @static
    * @param {object} eventEmitter The eventEmitter object
    * @param {string} event The event whose listener which we are interested in
    * @throws {ImproperArgumentSuppliedException}
    * @return number
   */

namePlaceHolder.listenerCount = function(emitter,event){
	if((typeof emitter !== Object) || (typeof event !== "string")){
		throw new Error("listenerCount expects (Object,String) argument");
	}
	if(emitter.emitterEventList[event]){
		return emitter.emitterEventList[event].length;
	}else{
		return 0;
	}
};

/**  Default value which indicates the maximum number of listeners subscribing to an event without being warned set to 10, next versions can update this value based on feedbacks
* @static
* @type number
*/
namePlaceHolder.DEFAULT_MAX_LISTENER = 10;

if(typeof exports === "undefined"){
 eventEmitter=namePlaceHolder;
}else{
 exports.eventEmitter=namePlaceHolder;

}
