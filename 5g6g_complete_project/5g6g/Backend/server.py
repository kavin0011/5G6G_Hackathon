from flask import Flask, jsonify, request
from methods.anamolyDetection import predict_attack
from flask_cors import CORS
# from methods.Foracasting import forecast
from methods.Management import monitor_network_usage
from methods.realtimemonitering import monitor_network_usage_by_traffic

app = Flask(__name__)
CORS(app)

@app.route('/predict_attack', methods=['GET'])
def predict_attack_route():
    prediction = predict_attack()  
    
    if prediction is not None:  # Ensure prediction is not None
        return jsonify({"attack_type": prediction['attack_type'], "cur_row": prediction['cur_row']})
    else:
        return jsonify({"attack_type": "Error", "cur_row": []}), 500  # Return an error response if prediction fails
    
    
# Endpoint for forecasting
# @app.route('/forecast', methods=['GET'])
# def forecast_route():
#     forecast_results = forecast()
#     return jsonify(forecast_results)

# Endpoint for network monitoring
@app.route('/monitor_network', methods=['GET'])
def monitor_network_route():
    network_usage = monitor_network_usage()
    return jsonify(network_usage)

# Endpoint for real-time network traffic monitoring (with parameters)
@app.route('/monitor_network_traffic', methods=['GET'])
def monitor_network_traffic_route():
    # Get parameters from the request (with defaults if not provided)
    interval = request.args.get('interval', default=1, type=int)
    duration = request.args.get('duration', default=10, type=int)
    max_bandwidth_mbps = request.args.get('max_bandwidth_mbps', default=100, type=int)
    
    # Call the traffic monitoring function
    monitor_network_usage_by_traffic(interval=interval, duration=duration, max_bandwidth_mbps=max_bandwidth_mbps)
    
    return jsonify({"status": "Monitoring completed", "interval": interval, "duration": duration, "max_bandwidth_mbps": max_bandwidth_mbps})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
