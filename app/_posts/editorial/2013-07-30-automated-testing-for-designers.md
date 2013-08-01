---

layout: post
title: "Automated Testing for Designers"
description: "Software engineers can test their code, why can't designers test their creations as well?"
category: editorial
tags: []

---

Software developers have a wide array of tools at their disposal for ensuring quality. 

Build systems, linters, hinters, and the like – all of which make it easier to enforce quality and prevent inconsistencies in their code. Even CSS, which was tested by few (if any) people in the past, now has a handful of [well-supported](https://github.com/twitter/recess) [testing platforms](https://github.com/Huddle/PhantomCSS).

Some upsides of testing are:
- detecting bugs before they're deployed
- enforcing guidelines for consistency and readability
- learning ways to improve and simplify your code

However, designers have yet to reap similar benefits.

Yesterday I encountered a .PSD created by another designer, and was horribly frustrated while digging through the poorly-organized, barely-labeled layers contained within. Clearly, they rushed through its creation, making a bunch of sloppy organizational decisions, and didn't give much thought to the person that might eventually need to dig through it.

In order to make the .PSD more usable, I renamed a bunch of Layers (to reflect their contents) and moved them around into logical groups – based on where they existed on the canvas, their type, etc. Y'know, basic shit.

In the end, I wasted my time cleaning up the PSD. The original creator probably did, too, even though they did a bad job. They were probably aware of this, and were stressin' about it. 

> The fact is that keeping your design documents organized requires a lot of manual work. Even if you're not successful.

Wouldn't it be nice if an automated tool could tell you when things are going to cause problems? And make it very easy to fix them? You wouldn't have to spend (as much) time making your PSD easy to work with. You just focus on design, and your testing tool will reveal ways to improve the structure.

	The file 'Dashboard_Home_v3.psd' failed with 2 errors:
	
	Error: Related elements should be grouped together.
	  The elements 'nav_title1' and 'nav_title2' seem related,
	  but are located far from each other (5 levels apart)
	
	Error: Elements should have unique and descriptive titles.
	  The group 'sidebar_links' has 12 identically-named layers,
	  but with different content. You may consider renaming them
	  to reflect their content.

This was my immediate thought when I encountered LayerVault's awesome [psd.rb](http://cosmos.layervault.com/psdrb.html) library today.

I'm going to play around with this some more, to see if this kind of testing is feasible (and actually useful!) – or merely a coffee-induced fantasy.