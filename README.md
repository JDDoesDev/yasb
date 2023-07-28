# YAS-B: Yet Another Stream Bot

## Purpose
This started as a learning project so that I could become better with TypeScript, ReactJS, NodeJS, and other crap, but has turned into something I believe others may be able to use. 
The goal is to connect to the Twitch API, pull data from events via the EventSub, Helix, and ChatClient APIs to allow different events to fire either in Twitch chat or on overlays within
your streaming software of choice, as long as it allows browser sources.

## Tech used
YAS-B is based on 2 main components. A ReactJS front end that is responsible for displaying overlays and events in a browser source on OBS or similar and a NodeJS back end that handles
API calls, event listeners, and chat listeners.  The back end is also responsible for any CRUD functionality within the database, used for tracking user events and such that need to be 
saved for any period of time.

## Dependencies
This is where it gets sticky. Currently the React side is dependent on TMI.js, a Twitch API library, and the Node side is dependent on Twurple.js, another Twitch API library. Eventually,
and by eventually, I mean very, very soon, I would like to update them both to use the same library. I am leaning towards Twurple, but I'm not opposed to using TAU: Twitch API Unifier.
In addition, the back end uses Prisma as an ORM for SQLite, a lightweight database.

## Road Map

Sure, there will be one.  I promise.  Just not quite yet, but it's in my head!
