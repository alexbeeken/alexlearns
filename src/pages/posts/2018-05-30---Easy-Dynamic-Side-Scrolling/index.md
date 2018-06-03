---
title: "Easy Dynamic Side Scrolling with CSS"
date: "2018-05-30"
layout: post
draft: false
path: "/posts/easy-dynamic-side-scrolling-with-css/"
category: "css"
tags:
  - "css"
description: "Sometimes we need to be able to scroll through a long list. We need a horizontal div which expands to accommodate more than the page width's worth of content. The problem is that it's not completely obvious how to do this without adding a static width."
---

Say we have a list of things that we want to make horizontally scrollable.
```html
<div class='container'>
  <div class='item'>1</div>
  <div class='item'>2</div>
  <div class='item'>3</div>
  <div class='item'>4</div>
  <div class='item'>5</div>
  <div class='item'>6</div>
  etc...
</div>
```

Let's make the items boxes have borders so we can see them. Let's make them `150px` tall and wide so we can fit a handful on the screen. Also, let's get them a margin so they aren't right next to each other and we can tell them apart. Like so:

```css
.item {
  border: 2px solid black;
  width: 150px;
  height: 150px;
  margin: 20px;
}
```

Now each box will look like this:

<div class='container' style='max-width: 40rem; margin: auto;'>
  <div class='item' style='border: 2px solid black; width: 150px; height: 150px; margin: 20px;'>1</div>
</div>

The container should be the same height as the boxes and arrange them into a row. We'll use flexbox with `display: flex` to take care of some of the grid behavior for us. `flex-direction: row` tells the browser we want our boxes to stack horizontally. `overflow-x: scroll` let's us scroll sideways when the content expands beyond the container width. `overflow-y: hidden` turns off scrolling for the up/down direction so we don't up with confusing multidirectional scrolling if one of our boxes is a little too tall.

```css
.container {
  height: 190px; (150px height + 20px top/bottom margin)
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  overflow-y: hidden;
}
```

which looks like this:

<div class='container' style='height: 190px; display: flex; flex-direction: row; overflow-x: scroll; overflow-y: hidden; max-width: 40rem; margin: auto;'>
	<div class='item' style='border: 2px solid black; width: 150px; height: 150px; margin: 20px;'>1</div>
	<div class='item' style='border: 2px solid black; width: 150px; height: 150px; margin: 20px;'>2</div>
	<div class='item' style='border: 2px solid black; width: 150px; height: 150px; margin: 20px;'>3</div>
	<div class='item' style='border: 2px solid black; width: 150px; height: 150px; margin: 20px;'>4</div>
	<div class='item' style='border: 2px solid black; width: 150px; height: 150px; margin: 20px;'>5</div>
	<div class='item' style='border: 2px solid black; width: 150px; height: 150px; margin: 20px;'>6</div>
	<div class='item' style='border: 2px solid black; width: 150px; height: 150px; margin: 20px;'>7</div>
	<div class='item' style='border: 2px solid black; width: 150px; height: 150px; margin: 20px;'>8</div>
	<div class='item' style='border: 2px solid black; width: 150px; height: 150px; margin: 20px;'>9</div>
	<div class='item' style='border: 2px solid black; width: 150px; height: 150px; margin: 20px;'>10</div>
	<div class='item' style='border: 2px solid black; width: 150px; height: 150px; margin: 20px;'>11</div>
</div>

But hey, this isn't scrollable and it's __compressing the boxes__ trying to fit them into the width of the screen! Oh noooo!

<img src='https://media.giphy.com/media/xT5LMLMPdRh2VRNVLi/giphy.gif' style='max-width: 100%' alt='Homer Simpsons saying "oh no" in despair.'>
</img>

We can fix this with a simple trick. If we set the item element's `width` and `height` to `min-width` and `min-height` it will prevent flexbox from overriding our css above.

```css
  .item {
    border: 2px solid black;
    min-width: 150px;
    min-height: 150px;
    margin: 20px;
  }
```
which looks like this:

<div class='container' style='height: 190px; display: flex; flex-direction: row; overflow-x: scroll; overflow-y: hidden; max-width: 40rem; margin: auto;'>
	<div class='item' style='border: 2px solid black; min-width: 150px; min-height: 150px; margin: 20px;'>1</div>
	<div class='item' style='border: 2px solid black; min-width: 150px; min-height: 150px; margin: 20px;'>2</div>
	<div class='item' style='border: 2px solid black; min-width: 150px; min-height: 150px; margin: 20px;'>3</div>
	<div class='item' style='border: 2px solid black; min-width: 150px; min-height: 150px; margin: 20px;'>4</div>
	<div class='item' style='border: 2px solid black; min-width: 150px; min-height: 150px; margin: 20px;'>5</div>
	<div class='item' style='border: 2px solid black; min-width: 150px; min-height: 150px; margin: 20px;'>6</div>
	<div class='item' style='border: 2px solid black; min-width: 150px; min-height: 150px; margin: 20px;'>7</div>
	<div class='item' style='border: 2px solid black; min-width: 150px; min-height: 150px; margin: 20px;'>8</div>
	<div class='item' style='border: 2px solid black; min-width: 150px; min-height: 150px; margin: 20px;'>9</div>
	<div class='item' style='border: 2px solid black; min-width: 150px; min-height: 150px; margin: 20px;'>10</div>
	<div class='item' style='border: 2px solid black; min-width: 150px; min-height: 150px; margin: 20px;'>11</div>
</div>

pretty simple eh? If you inspect the source code you will see some extra goodies that I added to work with Lumen's (my blog framework) way of displaying margins. This is what I added:

```css
  .parent {
    max-width: 40rem;
    margin: auto;
  }
```

If you're in a browser you'll see scroll bars. If you want to turn that off you can also add this in your css:

```css
  .container::-webkit-scrollbar {
    display: none;
  }
```

Looks a lot cleaner in my opinion:
<style>
  .container-no-bar::-webkit-scrollbar {
    display: none;
  }
</style>
<div class='container-no-bar' style='height: 190px; display: flex; flex-direction: row; overflow-x: scroll; overflow-y: hidden; max-width: 40rem; margin: auto;'>
	<div class='item' style='border: 2px solid black; min-width: 150px; min-height: 150px; margin: 20px;'>1</div>
	<div class='item' style='border: 2px solid black; min-width: 150px; min-height: 150px; margin: 20px;'>2</div>
	<div class='item' style='border: 2px solid black; min-width: 150px; min-height: 150px; margin: 20px;'>3</div>
	<div class='item' style='border: 2px solid black; min-width: 150px; min-height: 150px; margin: 20px;'>4</div>
	<div class='item' style='border: 2px solid black; min-width: 150px; min-height: 150px; margin: 20px;'>5</div>
	<div class='item' style='border: 2px solid black; min-width: 150px; min-height: 150px; margin: 20px;'>6</div>
	<div class='item' style='border: 2px solid black; min-width: 150px; min-height: 150px; margin: 20px;'>7</div>
	<div class='item' style='border: 2px solid black; min-width: 150px; min-height: 150px; margin: 20px;'>8</div>
	<div class='item' style='border: 2px solid black; min-width: 150px; min-height: 150px; margin: 20px;'>9</div>
	<div class='item' style='border: 2px solid black; min-width: 150px; min-height: 150px; margin: 20px;'>10</div>
	<div class='item' style='border: 2px solid black; min-width: 150px; min-height: 150px; margin: 20px;'>11</div>
</div>

Full code for copy/pasting:

```html
<style>
  .item {
    border: 2px solid black;
    min-width: 150px;
    min-height: 150px;
    margin: 20px;
  }
  .container {
    width: 100%;
    height: 190px;
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
    overflow-y: hidden;
  }
  .container::-webkit-scrollbar {
    display: none;
  }
</style>
<div class='container'>
  <div class='item'>1</div>
  <div class='item'>2</div>
  <div class='item'>3</div>
  <div class='item'>4</div>
  <div class='item'>5</div>
  <div class='item'>6</div>
  <div class='item'>7</div>
  <div class='item'>8</div>
  <div class='item'>9</div>
  <div class='item'>10</div>
  <div class='item'>11</div>
</div>
```

Thanks for reading!

-Alex
