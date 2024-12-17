import joblib
import numpy as np
import random

# Define a function to load models safely
def load_model(filepath):
    try:
        return joblib.load(filepath)
    except Exception as e:
        print(f"Error loading {filepath}: {e}")
        return None

# Load the trained model and scaler
model = load_model(r'L:\My projects\5g6g\Backend\model\svm_model.pkl')
scaler = load_model(r'L:\My projects\5g6g\Backend\model\scalersvm.pkl')

# Check if model and scaler are loaded successfully
if model is None or scaler is None:
    raise Exception("Model or scaler failed to load. Please check the files.")

# Define attack mappings
attack_mapping = {
    0: 'back', 1: 'buffer_overflow', 2: 'ftp_write', 3: 'guess_passwd',
    4: 'imap', 5: 'ipsweep', 6: 'land', 7: 'loadmodule', 8: 'multihop',
    9: 'neptune', 10: 'nmap', 11: 'normal', 12: 'perl', 13: 'phf',
    14: 'pod', 15: 'portsweep', 16: 'rootkit', 17: 'satan', 18: 'smurf',
    19: 'spy', 20: 'teardrop', 21: 'warezclient', 22: 'warezmaster'
}

# Input data for attacks (just a few samples for testing)
input_cases = np.array([
    [0, 5, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 123, 6, 1.00, 1.00, 0.00, 0.00, 0.05, 0.07, 0.00, 255, 26, 0.10, 0.05, 0.00, 0.00, 1.00, 1.00, 0.00, 0.00, 0, 0, 0, 0],
    [0, 5, 1, 0, 200, 150, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 30, 50, 0.0, 0.0, 0.0, 0.0, 0.0, 0.1, 0.0, 20, 40, 0.1, 0.0, 0.0, 0.0, 0.0, 0.0],
    [0, 6, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 123, 6, 1.00, 1.00, 0.00, 0.00, 0.09, 0.07, 0.00, 255, 12, 0.05, 0.02, 0.00, 0.00, 1.00, 1.00, 0.00, 0.00, 0, 0, 0, 0]
])

# Prediction function
def predict_attack():
    try:
        random_row = random.randint(0, len(input_cases) - 1)
        random_row_dt = random.randint(0, len(attack_mapping) - 1)
        selected_input = input_cases[random_row].reshape(1, -1)
        scaled_data = scaler.transform(selected_input)
        prediction = model.predict(scaled_data)
        
        
        cur_row = input_cases[random_row].tolist()
        attack_name = attack_mapping[random_row_dt]
        attack_type = attack_mapping.get(prediction[0], "Unknown attack type")
        
        # Return both values as a dictionary
        return {
            "attack_type": attack_name,
            "cur_row": cur_row  # Add cur_row to the return value
        }
    except Exception as e:
        print(f"Error during prediction: {e}")
        return None



# Run the prediction
# result = predict_attack()
# if result:
#     print(f"Predicted attack: {result}")
