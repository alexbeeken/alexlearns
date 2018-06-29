---
title: "A Gem of my Own"
date: "2018-06-29"
layout: post
draft: false
path: "/posts/a-gem-of-my-own/"
category: "rails"
tags:
  - "ruby"
  - "rails"
description: "It's been too long since I've made a gem. I'm going to get some more practice by making a simple gem that visualizes some simple information about it's parent Rails app. Let's have some fun!"
---

###Personal Update

I have good news and bad news. 

**Good News:** I got a full time job!

<img src='https://media.giphy.com/media/CwAlFqwEGreoM/giphy.gif' style='max-width: 100%' alt='JR Smith of the New York Knicks celebrating by doing a spanking dance and then a hallelujah dance.'>
</img>

I'll be starting at [Mammoth HR](https://www.mammothhr.com) in about a week. I'll be working on a Rails and Ember application with their engineering team. I'm very excited about working with some very cool humans for a great company. Working with people is always more fun than trying to decipher meetings through laggy skype calls. Having a consistent place to sit and think is also an awesome luxury that I'm low key excited about.

**Bad News:** I'm putting my online CS degree plan on hold indefinitely.

<img src='https://media.giphy.com/media/tEG1nF1v7AL8A/giphy.gif' style='max-width: 100%' alt='A slow zoom in on Jackson Terry looking disappointed.'>
</img>

Or at least until it feels right to pick it back up. When I do have the energy, I'll be keeping it fun and light. For now, it's much more interesting to write about things that apply to work. Learning is learning! (and work = money).

###Creating the Gem

For the last week, I've been using my spare energy to get reacquainted with the world of Ruby and Rails. For example, I've been having a great time reading [The Rails 5 Way](https://www.amazon.com/Rails-Way-Addison-Wesley-Professional-Ruby/dp/0134657675) by [Obie Fernandez](https://twitter.com/obie?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor). It's been giving me a lot of little ideas for side projects like the following...

I was wondering if I could create a gem that adds a page to tell you which classes you've created in a Rails application. A much simplified version of [Rails ERD](https://github.com/voormedia/rails-erd).

A mountable engine is just like a regular rails application in terms of structure. The main difference being how it is used. An engine (synonymous here with gem or plugin) provides features to a host application. This means adding additional routes, models, controllers or even it's own database migrations.

I will call it **Whitebarder** because I use whiteboards to plan out my coding endeavors and just love whiteboards in general.

So, following [this guide](http://guides.rubyonrails.org/engines.html) I created a gem using 
```bash
rails plugin new --mountable
```

I started by creating a root route, controller and view:

```ruby
# config/routes

Whiteboarder::Engine.routes.draw do
  root to: 'home#board'
end

# controllers/home_controller

module Whiteboarder
  class HomeController < ApplicationController
    def board
      @controllers = ApplicationController.descendants
      @models = ApplicationRecord.descendants
    end
  end
end
```

and a simple template in `app/views/whiteboarder/home/board.html.haml`.

```html
<!-- app/views/whiteboarder/home/board.html.erb -->

<h1>
  WhiteBoarder
</h1>

<div class='controllers'>
  <ul>
    <%= @controllers.each do |controller| %>
      <li>
        <%= controller %>
      </li>
    <% end %>
  </ul>
</div>

<div class='models'>
  <ul>
    <%= @models.each do |models| %>
      <li>
        <%= models %>
      </li>
    <% end %>
  </ul>
</div>
```

You'll notice that everything is *namespaced* inside of a mountable engine. This is to prevent classnames from leaking into the host application. Coding a gem can open up infinite potential for naming bugs. So we'll make sure that anything that is calling a Whiteboarder class will have to specify the Whiteboard prefix specifically, like so:

```ruby
WhiteBoarder::HomeController
```

is far less likely to be used by a host application than

```ruby
HomeController
```

Thankfully most of this is handled automatically by the plugin generator and the configuration inside:

```ruby
# lib/whiteboarder/engine.rb

module Whiteboarder
  class Engine < ::Rails::Engine
    isolate_namespace Whiteboarder
  end
end
```

###Manual Testing

For manual testing, we can mount the engine onto the host application by adding using the `mount` directive included in the rails routing DSL.

```ruby
mount Whiteboarder::Engine => 'whiteboarder'
```

This gem is meant to be used in development only, thankfully. To test it out, I added this gem to the `:development` gem group in one of my Rails projects' Gemfile.

Initially, I specified my computer's local gem directory using the `path` option. However, my Rails project is running on [Docker](https://www.docker.com/) so it raised an error when I tried to test it out.

So I decided to do a more realistic test and throw the gem up to github. I just used the github repo as the value of the handy `git` option in the gem specification.

```ruby
# inside Gemfile

  gem 'whiteboarder', 
    git: 'https://github.com/alexbeeken/whiteboarder'
    # ref: '778a2302e32c2ca14c16fd038064f2cebf8db2ca'
```

I used the `ref` option to tell the parent app to update the gem when I ran `bundle install`. You normally want to lock down your gems using a version string, like so:

```ruby
gem 'rspec-rails', '~> 3.7'
```

If you don't provide a version string it will pull the latest gem version down when you run `bundle install`. Ruby will look for Whiteboarder's version number inside `whiteboarder.gemspec` in the repo. By default, though, the plugin generator will actually put the `Whiteboarder::VERSION` constant inside `lib/whiteboarder/version.rb`.

```ruby
# lib/whiteboarder/version.rb

module Whiteboarder
  VERSION = '0.1.0'
end
```

Updating this constant with each commit is a pain in the butt though and not really the intended purpose for version strings. So, adding the `ref` option allowed me to tell Bundler to update the gem without actually updating the `VERSION` constant with every single commit.

###Automated Testing

The rails plugin generator provides testing files to help get you started on testing including a dummy app folder where you can configure an example host app.

I started by making sure the engine was mounted inside our dummy app like so:

```ruby
# test/dummy/config/routes.rb

Rails.application.routes.draw do
  mount Whiteboarder::Engine => "/whiteboarder"
end
```

Good. Just double checking. Let's test to make sure the route works. For simplicity, and because we only have 1 route to worry about, I'll put it in the generated `test/integration/navigation_test.rb` file.

```ruby
# test/integration/navigation_test.rb

require 'test_helper'

class NavigationTest < ActionDispatch::IntegrationTest
  test 'whiteboarder route mounts correctly' do
    get '/whiteboarder'
    
    assert_response :success
  end
end
```

I setup an the following files to get a base case to test against.

```ruby
# test/dummy/app/controllers/example_controller.rb

class ExampleController < ApplicationController
  def index
  end
end

# test/dummy/app/models/example.rb

class Example < ApplicationRecord
end
```

And a test to make sure our engine finds these classes and lists them on the `/whiteboarders` page.

```ruby
# added to test/integration/navigation_test.rb

test 'whiteboarder route mounts correctly' do
  get '/whiteboarder'

  assert_select 'controllers ul li', 'ExampleController'
  assert_select 'models ul li', 'Example'
end
```