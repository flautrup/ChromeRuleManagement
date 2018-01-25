#Rule Management

##State:
Beta

##Description:
This is a Chrome app developed to help the reuse and transfer of rules between
Qlik Sense environments. The tool is able to extract rule from a Qlik Sense
installation store them as packages and then upload them to a new Qlik Sense
system. It also supports exporting of a library of rule packages so that it can
be used by other administrators

##Sense Configuration
The tool uses windows authentication. The following is needed for the tool to be
able to access Qlik Sense.
* Default proxy accessed without a virtual proxy prefix supports Windows authentication
* The windows authentication pattern for the virtual proxy is set to .
* Depending on the certificate setup it might also be needed to access this virtual proxy first from the Chrome browser.

##Installation:
* Download the .crx file
* Open Chrome
* Go to chrome://extensions
* Drag the CRX file onto the chrome window
* The application is now available in the Chrome App Launcher or go to chrome://apps/

##How to use
* Type in the name of the server in the toolbar
* Press the lock to log into the server and get the list of rules and their associated custom properties
* Press the rule icon in front of the rule to select it to be included in a rule package
* Change to the rule package tab and add name and description, save the rule package.
* In the local repository tab you can now see your rule packages, selecting a rule package here will load it into the rule package tab.
* If you now change the server name and connect to a new server you can upload the rule package from the rule package page. Uploaded rules will be prefixed with _pkg.
