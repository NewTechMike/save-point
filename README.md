# Save Point

## Introduction

# Overview
- This Web app will allow you to choose from a list of games and add them to a list organized to play either for the first time, another time or a game they have already started

# Features
- The user will be able to:
  - Sign up for a new account
  - Create and edit a profile
  - Add video games to any three generated lists 
  - Be able to order or delete items from said list

# Deployed
* The app has been deployed on heroku at https://save--point.herokuapp.com/

# Setup and Installation
## Repository 
* Fork and clone repo from https://github.com/NewTechMike/save-point.git
* In Terminal, ``` cd ``` into the same directory the above repo was forked
```bash
bundle install 
```
```bash
npm install --prefix client
```

* Next, launch the backend on http://localhost:3000 with 
```bash
  rails s
```
* Launch the frontend on http://localhost:4000 with 
```bash
  npm start --prefix client
``` 

## Ruby

* Verify you have the lastest version of Ruby installed with: 

```bash
  rvm install 2.7.4 --default
```

* Also install the latest versions of bundler and rails with:
```bash 
gem install bundler
gem install rails
```

## NodeJS

* Verify the lastest version of Node is at least 16
```bash
nvm install 16
nvm use 16
nvm alias default 16
```
* You can also update your npm with:
```bash
npm i -g npm
```

#Resources
- Image source from : [dribbble.com]

[dribbble.com]: https://dribbble.com/shots/3159371-Video-Game-Controller-Background/attachments/9678968?mode=media
