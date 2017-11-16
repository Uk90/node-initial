# Fezable

**Project Setup**

## Installation

_You need to have [NodeJS](http://nodejs.org/) Version 6.3.0_

_Type below commands in terminal_

```
npm install -g gulp

npm install -g bower

sudo npm install

bower install
```

**Finally**

_Type below command in terminal_

```
gulp
```

**Application Directory Structure**

```
├── app
│   ├── bower_components
│   ├── images
│   ├── js
│   │   └── lib
│   │   │   └── third-party-files.js
│   │   └── controllers
│   │   └── directives
│   │   └── services
│   │   └── filters
│   │   └── application.js
│   ├── css
│   │   └── master.css
│   ├── partials
│   │   └── header.html
│   │   └── footer.html
│   ├── scss
│   │   └── modules
│   │   │   └── module-name.scss
│   │   └── pages
│   │   │   └── page-landing.scss
│   │   └── base.scss
│   │   └── layout.css
│   │   └── mixins.css
│   │   └── reset.css
│   │   └── variables.css
│   └── index.html
├── build
│   └── build-files
├── node_modules
├── package.json
├── gulpfile.js
├── bower.json
├── .bowerrc
├── .gitattributes
└── .gitignore
```

**Quick Commands**

- **Clean** _Remove all files from your build folder_

  ```
  gulp clean
  ```

  **Gulp** _Run gulp task in development mode`_

  ```
  gulp
  ```

  **Gulp** _Run gulp task in production mode`_

  ```
  gulp prod
  ```
