# Content Delivery Network (CDN) Read Me

## About

https://en.wikipedia.org/wiki/Content_delivery_network

> A content delivery network or content distribution network (CDN) is a geographically distributed network of proxy servers and their data centers. The goal is to distribute service spatially relative to end-users to provide high availability and high performance. CDNs serve a large portion of the Internet content today, including web objects (text, graphics and scripts), downloadable objects (media files, software, documents), applications (e-commerce, portals), live streaming media, on-demand streaming media, and social media sites.
>
>CDNs are a layer in the internet ecosystem. Content owners such as media companies and e-commerce vendors pay CDN operators to deliver their content to their end users. In turn, a CDN pays ISPs, carriers, and network operators for hosting its servers in their data centers.
>
>CDN is an umbrella term spanning different types of content delivery services: video streaming, software downloads, web and mobile content acceleration, licensed/managed CDN, transparent caching, and services to measure CDN performance, load balancing, multi-CDN switching and analytics and cloud intelligence. CDN vendors may cross over into other industries like security, with DDoS protection and web application firewalls (WAF), and WAN optimization.

### Usage of Rawgit CDN by Ladybug Tools / Spider

Since its inception Ladybug Tools / Spider has used [Rawgit.com]( https://rawgit.com ) as its CDN. ( And in many other places by team members elsewhere.) We have been very satisfied users.

Unfortunately, the Rawgit maintainer, Ryan Grove, recently sent out this message:

> RawGit is now in a sunset phase and will soon shut down. It's been a fun five years, but all things must end.
>
>GitHub repositories that served content through RawGit within the last month will continue to be served until at least October of 2019. URLs for other repositories are no longer being served.
>
> If you're currently using RawGit, please stop using it as soon as you can.

Even though there is no need to rush, the writing is on the wall. The intention of this page is to document the process of transitioning to a new CDN.


## Ryan Grove Recommends

Here we will be examining recommended CDNs. No need to comment yet. Notes still too rough

[jsDelivr]( https://www.jsdelivr.com/ )
* https://cdn.jsdelivr.net/npm/jquery/
* https://cdn.jsdelivr.net/gh/threejs &laquo; not
* https://cdn.jsdelivr.net/gh/mrdoob &laquo; not


GitHub Pages
* https://raw.githubusercontent.com/mrdoob/three.js/dev/build/three.min.js



[CodeSandbox]( https://codesandbox.io )
* has vscode!


[unpkg]( https://unpkg.com/#/ )
* https://unpkg.com/three@0.97.0/build/three.js
* https://unpkg.com/three@0.97.0/build/three.min.js
* https://unpkg.com/three@0.71.0/build/three.min.js << not
* https://unpkg.com/three@0.91.0/build/three.min.js << ok


[ViewSource]( https://github.com/viewsource/viewsource.github.com )
* http://viewsource.github.io/threejs/


## Others

* https://www.cloudflare.com


## Change Log

### 2018-10-26 ~ Theo

Content Delivery Network (CDN) Read Me
* First commit to Spider