# An interaction or two

## 2019-01-21 ~ Ryan

In order to better understand the user experience of collaborative editing,
I thought walking through the detailed interactions of:

* user 1 creating a space
* user 2 making changes to that space as a diff
* user 1 reviewing the changes -> view the diff -> accept or reject the diff

The "ping pong" just refers to individual volleys (interactions).

* You make 1 basic thing.
* I make a basic change.
* We see how that works and feels.

Consider "Blender Ping-Pong" as a collaborative MVP.

* https://en.wikipedia.org/wiki/Photoshop_contest#Photoshop_tennis


## 2019-01-23 ~ Ryan

Start with 1/100 scale. 1 centimeter = 1meter
Blender's base unit is 1m. 0.001 is 1cm
* https://portico.space/journal//drawing-for-architects-basics-scale

***

<img width=800 src=https://trello-attachments.s3.amazonaws.com/567f3c2ac7fbeadac3b50693/5c48a6105e3c582d19700f87/c59229278a7149192d39b8680a00b08a/IMG_20190123_093330~2.jpg >

Last night, I mentioned I needed to sort through some ideas.

Here is a basic sketch, just for your reference. The diagram is a mere sketch. It has much to improve upon, but in the spirit of Photoshop Tennis, I wanted to volley this over to you asap.

I also wanted to share, that I'm realizing I have a different desire for the amount of work that is done fully in the open vs not. While I see the idealistic virtue of everything being done in open-source (GitHub), some things like this specific card, I want to work through on our own.

There is an overhead (cost) and benefit to working in the open, and I tend to make exceptions in cases where the coordination cost of getting (TBD Community) up to speed on every spark of an idea is undesirable and prohibitive. I hope to move the needle more toward open-everything as we proceed.



## 2019-01-24 ~ Ryan

From: https://trello.com/c/3gotEd8e/147-3d-collaboration-async

<img width=800 src=https://trello-attachments.s3.amazonaws.com/567f3c2ac7fbeadac3b50693/5c4a2a611f45e91ed07a1ab2/8b4deb66838c1b32f5d97f84f492ec95/IMG_20190124_131221.jpg>

This is an example interaction pattern.

Basically, being able to show that a diff is available.
Then walk through the diff/merge process, a'la GitHub... but for 3d, and in app.

***

Here's an interaction sequence that is async, instead of real-time.

_Transcription with a bit more definition_

Peep #1 on Three.js / Or some app

* Makes new version available

Peep #2 On Blender / Or some other App

* Loads diff and shows

Other Peeps

* Comment

Peep #3 / A authorized maintainer peep?

* Merges diffs



## 2019-01-25 ~ Theo

I comment on 'async collaboration' item first.

At some future data our project wil have real-time in-your-face virtual/meatworld collaboration, It will be fun.

And in the meantime we need a starting point.

Currently we are working with static web pages hosted on servers at are free=of-charge to use. This is a great place to start. And we should always have this a user case. Here is a short term scenario.

A user makes a diff in a model. They save the changes in whatever way their app wants to save things. At the same time thee export/create a JSON line(s) and add it/them to their local version of the master log file.

At some point they are happy with the efforts and they commit the changes to the server, for example to a GitHub repository.

Elsewhere, other users are given notice that there have been changes on the GitHub server. Some users look for differences using a chron job, other users check 'manually' and other may wait for an email. If they wish, the users fetch - as they wish - either the entire updated file or just the edited JSON lines of difference from the server.

The reader apps that other users are running may compare the diffs with the JSON Lines they have on their local machines. The diffs may be shown in different colors or as text entries or whatever way appropriate for the user's task at hand.


Other users may make comments on the diffs. These comments may also be added to the master log.

If the original user committed the edits, the other users may request to undo the edits or to further edit the edits.

If the original user committed the edits as a pull request, then the designated maintainers may merge and commit the edits.

Repeat

Wherever possible try to emulate established, proven methods as practiced by well-informed Git maintainers managing large plain vanilla projects.







