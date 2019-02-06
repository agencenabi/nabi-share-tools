# Nabi Share Tools

Add simples sharing, print and like buttons to your pages and blog posts.

## Description
Use shortcode ```[NabiShareTools]``` to display all tools at once.<br>
Use shortcode ```[NabiShare]``` to display the share button.<br>
Use shortcode ```[NabiLike]``` to display the like button.<br>
Use shortcode ```[NabiPrint]``` to display the print button.

## Installation
Install from wordpress plugins directory.

Else, to install manually:

1. Upload unzipped plugin folder to the `/wp-content/plugins/` directory
1. Activate the plugin through the 'Plugins' menu in WordPress

## Parameters
### Share Display:
The Share Buttons Display parameter will allow you to select how you want the Sharing buttons to be displayed. You can choose between ```dropdown```, ```list``` and ```icons```. Dropdown is the default display.<br />
Ex.: ```[NabiShare display="icons"]```

### Share URL:
The Share Buttons URL parameter let you define a specific URL to share. By default, the current page URL the button is displayed on will be shared.<br />
Ex.: ```[NabiShare url="https://example.com/your-custom-url"]```


## Update function
Use ```nb_sharingTools.update();``` to reinint all the Sharing tools.

## TODO
* Add Custom posts types support: fields.php (line 21).


## Changelog
** 1.2 **
* New Display parameter added to Share Button shortcode
* New URL parameter added to Share Button shortcode
* Google+ Sharing option removed.

** 1.1 **
* Added an Update function, to allow to reinint the function when content is loaded in ajax.

** 1.0 **
* Version 1.
