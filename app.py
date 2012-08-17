from bottle import Bottle, run, request, redirect, static_file, HTTPResponse
import json
import ConfigParser
import re
import subprocess

config = ConfigParser.RawConfigParser()
config.read('config.ini')

AEROFS_SH = config.get("aerofs", "sh")
AEROFS_SHAREDFOLDER = config.get("aerofs", "sharedfolder")

app = Bottle()

@app.route('/')
def index():
    redirect('/app')
    
@app.post('/api/register')
def register():
    data = json.load(request.body)
    if 'email' not in data:
        return HTTPResponse(json.dumps({'error': True, 'message': 'Missing email'}), 400)
    
    if re.match('^[a-z0-9+_\-\.]+@[0-9a-z][.-0-9a-z]*.[a-z]+$', data['email'], re.IGNORECASE) is None:
        return HTTPResponse(json.dumps({'error': True, 'message': 'Invalid email'}), 400)
    
    try:
        status = subprocess.check_output([AEROFS_SH, "invite", AEROFS_SHAREDFOLDER, data['email'], "EDITOR"])
        return {'error': False, 'message': "OK"}
    except OSError as e:
        return HTTPResponse(json.dumps({'error': True, 'message': 'Failed talk to aerofs-sh in: ' + AEROFS_SH}), 500)
    except subprocess.CalledProcessError as e:
        return HTTPResponse(json.dumps({'error': True, 'message': 'Failed to invite: ' + data['email'] + ' / ' + e.output}), 500)   

# Static files
    
@app.route('/assets/<filepath:path>')
def get_assets(filepath):
    return static_file(filepath, root='./assets')

@app.route('/vendor/<filepath:path>')
def get_vendor(filepath):
    return static_file(filepath, root='./vendor')

@app.route('/humans.txt')
def get_humanstxt():
    return static_file('humans.txt', root='./')

@app.route('/app')
def get_app():
    return static_file('index.html', root='./')

run(app, host='localhost', port=8080)
