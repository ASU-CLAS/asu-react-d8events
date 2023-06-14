React component for displaying ASU Events from the asuevents.asu.edu [JSON feed](https://news.asu.edu/feeds-json/college-liberal-arts-and-sciences). This React component can be used as a stand alone component and it has also been optimized for working inside of a Drupal environment.

### Demo: <a href="https://codepen.io/rbruce2/pen/KerjBm" target="blank">ASU News Feed</a>

## Install (Stand Alone)
* `git clone https://github.com/ASU-CLAS/asu-react-d8news.git`
* `yarn` - install all dependencies
* `yarn dev` - run the development server to test the app (Use https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en browser extension to allow CORS)
* `yarn build` - build project files (Includes React Library- will need to install Bootstrap v4 separately )


## Install (Drupal)
* `git clone https://github.com/ASU-CLAS/asu-react-d8news.git`
* `yarn` - install all dependencies
* `yarn drupal` - build project files (Excludes React Library)

Drupal Folder Structure:

```
my-module/
  css/
  js/
  react-component/
```

Contents of this repository should go inside the `react-component/` folder so that when `yarn drupal` executes the bundled files are copied to the correct `css/` and `js/` folders.


## Rendering the component

This React component will render inside an element with a class name of `clas-news-react-base`. The component requires the following options:

| Parameter     |  Options |
| ------------- | :------|
| data-feed      | from asu now json feed (e.g. https://asunow.asu.edu/feeds-json/college-liberal-arts-and-sciences) |
| data-items      | string, number of feed items to display (All or Three) |
| data-view      | string, view style (Cards, Horizontal or Table ) |

Example:

```html
<div class="clas-news-react-base" data-feed="https://cors-anywhere.herokuapp.com/https://asunow.asu.edu/feeds-json/college-liberal-arts-and-sciences" data-items="All" data-view="Cards"></div>
```
