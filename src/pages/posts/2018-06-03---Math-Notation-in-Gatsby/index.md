---
title: "Math Notation in Gatsby"
date: "2018-06-03"
layout: post
draft: false
path: "/posts/math-notation-in-gatsby/"
category: "math"
tags:
  - "math"
description: "I'm going to figure out how to use LaTex with Gatsby. LaText is a markup language specifically for printing mathematical notation. Gatsby Lumen is a blog framework built in react. Combining them brings great mathematical power with very little responsibility."
---

This blog is a static [Lumen](https://github.com/alxshelepenok/gatsby-starter-lumen) site. When you create a blog post on Lumen, you just create a new folder and an `index.md`. It's pretty nifty.

The extension `.md` stands for [Markdown](https://www.markdownguide.org/). Markdown is a simple templating language that makes website documents easy. It's made for technical minded folks to write articles and share code blocks.

```
This is a code block.
```

I like Markdown. It's really simple and time efficient for writing nice looking documents. 

However, Markdown doesn't come with support for math notation. Math uses lots of symbols. Greek symbols. Last week, I started [LAFFing it up](https://courses.edx.org/courses/course-v1:UTAustinX+UT.5.05x+1T2018/course/) with a Linear Algebra MOOC and I need to use math symbols if I want to make posts about it!

###Enter [TeX](https://en.wikipedia.org/wiki/TeX) 

<img src='https://media.giphy.com/media/aQy105Ao1OaMU/giphy.gif' style='max-width: 300px; min-width: 300px' alt='The Ultimate Warrior running into a wrestling ring and bouncing around the sides like a buffoon.'>
</img>

TeX a typesetting system for academic and technical documents. TeX was written by [Donal Knuth](https://en.wikipedia.org/wiki/TeX) and released in 1978. TeX is as much about styling a document as notating math so it might be too much and too old school for us.

###Enter [LaTeX](https://www.latex-project.org/)

<img src='https://media.giphy.com/media/4FIj8fevJkFNK/giphy.gif' style='max-width: 300px; min-width: 300px' alt='The Ultimate Warrior running into a wrestling ring and bouncing around the sides like a buffoon.'>
</img>

the kinky Markdown cousin of TeX. Markdown and LaTeX even seem like they have similar philosophies. TeX does a lot of formatting, LaTeX focuses all on __content__. But... LaTeX is not natively available in the browser. 

###Enter [KaTeX](https://khan.github.io/KaTeX/)

<img src='https://media.giphy.com/media/BDQlULh7lBK12/giphy.gif' style='max-width: 300px; min-width: 300px' alt='The Ultimate Warrior running into a wrestling ring and bouncing around the sides like a buffoon.'>
</img>

a much faster LaTeX rendering library written by the amazing team at [Khan Academy](https://www.khanacademy.org/). 

It's available as a markdown addon using [Remark](https://github.com/remarkjs/remark). Through it's plugin ecosystem, Remark extends the capability of Markdown to whatever your heart can code. Luckily we won't have to code anything. [There is already a plugin for KaTex available](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-transformer-remark).

##Setup

Here's how I got it up and running.

1. Install remark and katex

`npm install --save gatsby-transformer-remark gatsby-remark-katex`

2. Open up `gatsby-config.js` and you should now have an object in your plugins array that looks similar to this:

```Javascript
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 960
            }
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: { wrapperStyle: 'margin-bottom: 1.0725rem' }
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants'
        ]
      }
    },
``` 

3. Add `gatsby-remark-katex` to the plugins array inside of the gatsby-transformer-remark config object. `gatsby-transformer-remark`'s plugin list like so:

```Javascript
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 960
            }
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: { wrapperStyle: 'margin-bottom: 1.0725rem' }
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          'gatsby-remark-katex'
        ]
      }
    },
``` 

4. You might need to restart your server. Right after that, you can start learning the greek alphabet!

| | | |
|:--|--:|:--|--:|
|\alpha| $\alpha$|\xi| $\xi$|
|\beta| $\beta$|\pi| $\pi$|
|\gamma| $\gamma$|\varpi| $\varpi$|
|\delta| $\delta$|\rho| $\rho$|
|\epsilon| $\epsilon$|\varrho| $\varrho$|
|\varepsilon| $\varepsilon$|\sigma| $\sigma$|
|\zeta| $\zeta$|\varsigma| $\varsigma$|
|\eta| $\eta$|\tau| $\tau$|
|\theta| $\theta$|\upsilon| $\upsilon$|
|\vartheta| $\vartheta$|\phi| $\phi$|
|\gamma| $\gamma$|\varphi| $\varphi$|
|\kappa| $\kappa$|\chi| $\chi$|
|\lambda| $\lambda$|\psi| $\psi$|
|\mu| $\mu$|\omega| $\omega$|
|\nu| $\nu$|

Thanks for reading my post. If this was helpful to you, follow me on Twitter!

\- Alex