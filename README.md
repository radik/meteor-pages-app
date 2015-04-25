# [Meteor Pages package](https://github.com/alethes/meteor-pages) issue

This repo contains app that demonstrates problem in using
[meteor-pages](https://github.com/alethes/meteor-pages) in application
with [cucmber](https://github.com/xolvio/meteor-cucumber) end-to-end testing.

Application displays list of employees and uses [meteor-pages](https://github.com/alethes/meteor-pages) for paging.

Tests check that list is displayed and first element of list is "Employee \#0".

## Reproducing

1. Clone the repo:

```
git clone https://github.com/radik/meteor-pages-app
```

2. Go to application

```
cd meteor-pages-app
```

3. Run tests
```
meteor run --test --once
```

Despite to the fact that tests sources are correct, test running will fail
on step "Then I should see first employee". The reason is that phantomjs could
not render list of employees and [webdriver's](http://webdriver.io/)
[getText](http://webdriver.io/api/property/getText.html) api call fails:

```
NoSuchElement: NoSuchElement
     Problem: An element could not be located on the page using the given search parameters.

     Callstack:
     -> getText("table tr:first-child td")
```

If you run same tests using *chrome* or *firefox* as selenium browser, everything goes well.
Command for running (chrome should be installed):

```
SELENIUM_BROWSER=chrome meteor run --test --once
```

During tests run 2 screenshots are taken: first at the beginning and second after
20 secs. In case of using phantomjs list of employees is not displayed, in case of
firefox/chrome list of employees appears.
Screenshots location meteor-pages-app/tests/cucumber/.
