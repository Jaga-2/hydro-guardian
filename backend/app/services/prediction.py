import pandas as pd

RANGES = {
    'ph': (6.5, 8.5),
    'Hardness': (60, 120),
    'Solids': (0, 500),
    'Chloramines': (0, 4),
    'Sulfate': (0, 250),
    'Conductivity': (0, 800),
    'Organic_carbon': (0, 15),
    'Trihalomethanes': (0, 80),
    'Turbidity': (0, 5),
}


def predict_rows(file_bytes: bytes):
    df = pd.read_csv(pd.io.common.BytesIO(file_bytes))
    rows = []
    for _, row in df.iterrows():
        safe = True
        for column, (min_value, max_value) in RANGES.items():
            if column in df.columns:
                value = float(row[column])
                if value < min_value or value > max_value:
                    safe = False
                    break
        rows.append({**row.to_dict(), 'Prediction': 'Safe' if safe else 'Unsafe'})
    return rows
