# cfui
V.1.2.1
Javascript user interface widgets.

# Widgets currently available
Accordions, Autocomplete fields, Modal dialogs, Menus, Slideshows, Tabs and Tooltips.

# Effects
Fade, grow, spin, highlite, rollup, exit

# Examples
See `index.html`

## Accordions

```html
<div class="cf-accordion" id="myAccordion">
    <h3>First item</h3>
    <div>
        <p>This is the content</p>
    </div>
    <h3>Item 1</h3>
    <div>
        <p>This is the content 2</p>
    </div>
    <h3>Item 3</h3>
    <div>
        <p>This is the content 3</p>
    </div>
</div>
```
```javascript
var accordion = new CFAccordion('myAccordion', 'dynamic');
accordion.initialOpen(0);
```
## Tabs
```html
<div class="cf-tabs" id="myTabs">
    <div class="cf-tab-header">
        <div class="active"><h4>Tab 1</h4></div>
        <div><h4>Tab 2</h4></div>
    </div>
    <div class="cf-tab-content">
        <div class="active">
            <p>This is content of 1</p>
        </div>
        <div>
            <p>This is content of 2</p>
        </div>
    </div>
</div>
```
```javascript
var tabs = new CFTabs('myTabs', {});
```

## Slideshows
```html
<div class="cf-slideshow" id="mySlideshow">
    <section><h1>Slide One</h1></section>
    <section><h1>Slide Two</h1></section>
</div>
```
```javascript
var slideshow = new CFSlideshow('mySlideshow', {});
```

## Tooltips
```html
<a class="tooltip-link">Hover
    <div id="myTooltip1" class="tooltip">
        This is the content
    </div>
</a>
```
```javascript
var tooltip = new CFTooltip('myTooltip1', {});
```

## Autocomplete
```html
<input type="text" class="cf-autocomplete" id="myAutocomplete">
```
```javascript
var autocomplete = new CFAutoComplete('myAutocomplete', {});
```

## Modal windows
```html
<div class="" id="modalTarget">IPen Model</div>
 <div class="cf-modal" id="myModal1">
    <div class="modal-header">Header</div>
    <h1>This is the modal window content</h1>
</div>
```
```javascript
var modal = new CFModal();
document.getElementById('modalTarget').addEventListener('click', () => {
    modal.openWindow('myModal1', '500px', '200px', 'fade', null);
});
```

## Menus
```html
<div class="cf-menu horizontal" id="myMenu">
    <ul class="menu">
        <li><a>My Link</a>
            <ul class="submenu">
                <li>Sub item</li>
            </ul>
        </li>
        <li><a>Another link</a></li>
    </ul>
</div>
```
```javascript
var menu = new CFMenu('myMenu', {});
```
