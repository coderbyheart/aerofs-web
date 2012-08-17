# AeroFS Web Frontend

Ein Webfrontend für AeroFS mit dem sich Teilnehmer selber in einen shared Folder einladen können.

## Links

 * Hier läuft eine Instanz der Anwendung: http://aerofs.studium.coderbyheart.de/

## Setup

### Konfiguration

Die Datei `config.ini.dist` nach `config.ini` kopieren und anpassen.

### Installation der Dependencies

    make install

## Dev-Server starten

    source VIRTUALENV/bin/activate
    VIRTUALENV/bin/python2 VIRTUALENV/bin/bottle.py --debug --reload app:app
    
## Integration mit Apache

Dies ist eine Beispiel-Konfiguration für einen virtuellen Host:

    <VirtualHost *:80>
      ServerName <hostname>
	    ServerAdmin hosting@coderbyheart.de
	    UseCanonicalName Off
	    DocumentRoot /srv/www/<hostname>/
	    <Directory /srv/www/<hostname>/>
		    AllowOverride All
		    Options -Indexes FollowSymLinks
		    DirectoryIndex index.php index.html
		    Order allow,deny
		    Allow from all
	    </Directory>
	    CustomLog /srv/www/<hostname>/logs/access_log combined
	    ErrorLog /srv/www/<hostname>/logs/error_log
	    WSGIDaemonProcess bottle user=<apache user> group=<apache user> processes=1 threads=5
	    WSGIScriptAlias / /srv/www/<hostname>/adapter.wsgi
    </VirtualHost>

Anschließend muss noch die `adapter.wsgi` angepasst werden.

