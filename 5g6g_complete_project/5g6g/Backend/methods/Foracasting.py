import pickle
import numpy as np
import pandas as pd

def load_model(filepath):
    with open(filepath, 'rb') as f:
        model = pickle.load(f)
    return model

# Load models
tsmixer_model = load_model(r'L:\My projects\5g6g\Backend\model\forecasting\TSMixer_model.pkl')
tsmixerx_model = load_model(r'L:\My projects\5g6g\Backend\model\forecasting\TSMixerx_model.pkl')
nhis_model = load_model(r'L:\My projects\5g6g\Backend\model\forecasting\NHITS_model.pkl')
mlp_multivariate_model = load_model(r'L:\My projects\5g6g\Backend\model\forecasting\MLPMultivariate_model.pkl')

# Load data
data = pd.read_csv(r'L:\My projects\5g6g\Backend\archive (1)\Train.txt')

def forecast():
    input_data = np.array(data)
    tsmixer_pred = tsmixer_model.predict(input_data)
    tsmixerx_pred = tsmixerx_model.predict(input_data)
    nhis_pred = nhis_model.predict(input_data)
    mlp_multivariate_pred = mlp_multivariate_model.predict(input_data)

    return {
        'TSmixer_Pred': tsmixer_pred.tolist(),
        'TSmixerx_Pred': tsmixerx_pred.tolist(),
        'NHIS_Pred': nhis_pred.tolist(),
        'MLP_Multivariate_Pred': mlp_multivariate_pred.tolist()
    }
