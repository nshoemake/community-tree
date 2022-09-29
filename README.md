# My Awesome Project
Community Tree is a full-stack application with basic authentication that allows users to create accounts, unique communities, community initiatives for those communities. Users can then vote on those initiatives and see the results rendered in real-time.

**Link to project:** https://community-tree.fly.dev/

![alt tag](<img width="1090" alt="Screen Shot 2022-09-28 at 11 12 14 PM" src="https://user-images.githubusercontent.com/90182862/192789020-942398f4-da45-4c55-9e0f-ebc2c7b13781.png">)

## How It's Made:

**Tech used:** TailwindCSS, VanillaJS, NodeJS, Mongoose

This application was built with fundamentals in mind. The MVC architecture was utilized, and I realize that today it's fairly antiquated, but there's a reason. More on this later. NodeJS was used to build the backend -- because of it's asynchronous, non-blocking, and native JSON functionality, it was perfectly suited for the task. MongoDB coupled with Mongoose handled the database needs. The learning curve for MongoDB isn't very steep, and in terms of schema design, the "rulebook" is pretty light. This allowed for a quite a bit of healthy tinkering. A simple templating engine (EJS) was used for the views -- no frontend framework was used. The TailwindCSS framework handled styling needs, as it's "utility-first" based approach abstracts quite a bit of the tedious nature of traditional CSS styling. 

Several plugins were used: dayjs, chartjs, and pusher to name a few. I found pusher to be the most interesting, as applications that can benefit from its use of websockets to create a real-time flow are substantial. 

## Hypothetical Optimizations
*(optional)*

Accessibility. The concept of accessibility is one of the building blocks of the internet today. For an application that primarily focuses on visualization of data, some real thought needs to be given on how to make that data more accessible. The first thought that comes to mind to begin to tackle this issue is the implementation of accessibility plugins (like Patternomaly, which will render data with unique patterns attached to a legend for the color blind).

Speed optimization. This deserves a special mention. This application wasn't built to be blazing fast. Implementation of progressive rendering concepts, image spriting, etc., would take this small application up a notch in terms of performance.

Responsiveness. Today, a significant portion of the internet is consumed on different sized viewports. Not enough attention was given to this. For example, the use of horizontally-scrolled cards instead of a table for to display data for mobile users would improve the UX.

Functionality. Let's assume there are n users on at any given time. User x is using the application. As it stands, the way the application is designed is that it will only repopulate the data visualization component when user x submits a request (via action). It will not automatically re-render our chart for user x if user y makes an update. It will only re-render new data (inclusive of n user(s') inputs) if user x completes an action that requests the re-render. This is fine for an application of this scope, but for production, you'd need to utilize a set-interval action so that any changes in data are fetched and rendered. 

## Lessons Learned:

MVC (OOP fundamentals, FE frameworks blur the lines between FE and BE... remix)
JS code (OOP)
Better planning

