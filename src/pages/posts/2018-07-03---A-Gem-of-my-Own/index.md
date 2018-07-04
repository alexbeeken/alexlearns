---
title: "A Gem of my Own"
date: "2018-07-03"
layout: post
draft: false
path: "/posts/a-gem-of-my-own/"
category: "rails"
tags:
  - "ruby"
  - "rails"
description: "It's been too long since I've made a gem. I'm going to get some more practice by setting up a simple gem and get it ready for the TDD."
---

### Personal Update

I have good news and bad news. 

**Good News:** I got a full time job!

<img src='https://media.giphy.com/media/CwAlFqwEGreoM/giphy.gif' style='max-width: 100%' alt='JR Smith of the New York Knicks celebrating by doing a spanking dance and then a hallelujah dance.'>
</img>

I'll be starting at [Mammoth HR](https://www.mammothhr.com) in about a week. I'll be working on a Rails and Ember application with their engineering team. I'm very excited about working with some very cool humans for a great company. Working with people is always more fun than trying to decipher meetings through laggy skype calls. Having a consistent place to sit and think is also an awesome luxury that I'm low key excited about.

**Bad News:** I'm putting my online CS degree plan on hold indefinitely.

<img src='https://media.giphy.com/media/tEG1nF1v7AL8A/giphy.gif' style='max-width: 100%' alt='A slow zoom in on Jackson Terry looking disappointed.'>
</img>

Or at least until it feels right to pick it back up. When I do have the energy, I'll be keeping it fun and light. For now, it's much more interesting to write about things that apply to work. Learning is learning! (and work = money).

### Creating the Gem

For the last week, I've been using my spare energy to get reacquainted with the world of Ruby and Rails. For example, I've been having a great time reading [The Rails 5 Way](https://www.amazon.com/Rails-Way-Addison-Wesley-Professional-Ruby/dp/0134657675) by [Obie Fernandez](https://twitter.com/obie?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor). It's been giving me a lot of little ideas for side projects like the following...

I was wondering if I could create a gem that allows you to mount a simple hello world page to any Rails application. 

A mountable engine is just like a regular Rails application in terms of structure. The main difference being how it is used. An engine (synonymous here with gem or plugin) provides features to a host application. This means adding additional routes, models, controllers or even it's own database migrations.

See the full example code on [my github](https://github.com/alexbeeken/hello_world_gem). I was following [this guide](http://guides.rubyonrails.org/engines.html) from the Rails docs.


I created a gem using 
```bash
$ rails plugin new --mountable hello_world
```

I started by creating a root route, controller and view:

```ruby
# config/routes

HelloWorld::Engine.routes.draw do
  root to: 'home#index'
end

# controllers/hello_world/home_controller

module HelloWorld
  class HomeController < ApplicationController
    def index
      @message = 'Hello World!'
    end
  end
end
```

and a simple template

```html
<!-- app/views/hello_world/home/index.html.erb -->

<div class='hello-world'>
  <%= @message %>
</div>
```

You'll notice that everything is *namespaced* inside of a mountable engine. This is to prevent classnames from leaking into the host application. Coding a gem can open up infinite potential for naming bugs. So we'll make sure that anything that is calling a HelloWorld class will have to specify the HelloWorld namespace explicitly, like so:

```ruby
HelloWorld::HomeController
```

is far less likely to be used by a host application than

```ruby
HomeController
```

Thankfully most of this is handled automatically by the plugin generator and the configuration inside:

```ruby
# lib/hello_world/engine.rb

module HelloWorld
  class Engine < ::Rails::Engine
    isolate_namespace HelloWorld
  end
end
```

### Manual Testing

For manual testing, we can mount the engine onto the host application by adding using the `mount` directive included in the rails routing DSL.

```ruby
mount HelloWorld::Engine => 'hello_world'
```

This gem is meant to be used in development only, thankfully. To test it out, I added this gem to the `:development` gem group in one of my Rails projects' Gemfile.

Initially, I specified my computer's local gem directory using the `path` option. However, my Rails project is running on [Docker](https://www.docker.com/) so it raised an error when I tried to test it out.

So I decided to do a more realistic test and throw the gem up to github. I just used the github repo as the value of the handy `git` option in the gem specification.

```ruby
# inside Gemfile

gem 'hello_world', 
  git: 'https://github.com/alexbeeken/hello_world_gem'
  # ref: 'd5e3033e24e6cd787ec05ec8bacbda6b2a7b80a8'
```

I use the `ref` option to tell the parent app to update the gem whenever I run `bundle install`. You normally want to lock down your gems using a version string, like so:

```ruby
gem 'hello_world', '~> 0.1.0'
```

If you don't provide a version string it will pull the latest gem version down when you run `bundle install`. Ruby will look for HelloWorld's version number inside `hello_world.gemspec` in the repo. By default, though, the plugin generator will actually put the `HelloWorld::VERSION` constant inside `lib/hello_world/version.rb`.

```ruby
# lib/hello_world/version.rb

module HelloWorld
  VERSION = '0.1.0'
end
```

Updating this constant with each commit is a pain in the butt though and not really the intended purpose for version strings. Normally, you want to wait to update the version string until a feature, bug fix or significant change is merged into master. Not on *every single commit*. Specifying the `ref` option allowed me to tell Bundler to update the gem code without having to update the `VERSION` constant.

### Automated Testing

The rails plugin generator provides testing files to help get you started on testing including a dummy app folder where you can configure an example host app.

I started by making sure the engine was mounted inside our dummy app like so:

```ruby
# test/dummy/config/routes.rb

Rails.application.routes.draw do
  mount HelloWorld::Engine => 'hello_world'
end
```

Just double checking. Let's test to make sure the route works. For simplicity, and because we only have 1 route to worry about, I'll put it in the generated `test/integration/navigation_test.rb` file.

```ruby
# test/integration/navigation_test.rb

require 'test_helper'

class NavigationTest < ActionDispatch::IntegrationTest
  test 'hello_world route mounts correctly' do
    get '/hello_world'
    
    assert_response :success
  end
end
```

And I added a test to make sure our controller renders the correct message.

```ruby
# added to test/integration/navigation_test.rb

test 'hello_World route renders correct message' do
  get '/hello_world'

  assert_select '.hello-world', 'Hello World!'
end
```

And this is a good place to stop. With manual tests and automated tests, development is off to a smooth start.

Happy gem crafting!