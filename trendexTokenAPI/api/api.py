import flask
from flask import request, jsonify

app = flask.Flask(__name__)
app.config["DEBUG"] = True


def calc_token_price(stat_value, follower_count):
    final_token_value = (((follower_count ** (1 / 3) / 521) * 0.5) + ((stat_value / 70) * 0.5)) * 100
    final_token_value = round(final_token_value, 2)
    to_return = {"follower count": follower_count, "stat value": stat_value, "final token value": final_token_value}
    return to_return


data = calc_token_price(54, 1000000)


@app.route('/', methods=['GET'])
def home():
    return '''<h1>Distant Reading Archive</h1>
<p>A prototype API for distant reading of science fiction novels.</p>'''


# A route to return all of the available entries in our catalog.
@app.route('/api/v1/resources/books/all', methods=['GET'])
def api_all():
    return data


app.run()
