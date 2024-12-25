import pandas as pd

def load_data(file_path):
    data = pd.read_csv(file_path, header=None, names=['UserID', 'ProductID', 'Rating', 'Timestamp'])

    data = data.sample(n=1000, random_state=42)  # Work with a smaller sample of 1000 rows
    # Convert timestamp to datetime
    data['Timestamp'] = pd.to_datetime(data['Timestamp'], unit='s')

    # Check for missing values
    print(data.isnull().sum())

    # Remove rows with missing values
    data = data.dropna()

    # Remove duplicates
    data = data.drop_duplicates()
    # Preview the dataset
    print(data.head())

    print(f"Unique Users: {data['UserID'].nunique()}")
    print(f"Unique Products: {data['ProductID'].nunique()}")
    print("Data loaded successfully!")
    return data

def preprocess_data(data):
    """Create a user-product interaction matrix."""
    interaction_matrix = data.pivot(index='UserID', columns='ProductID', values='Rating').fillna(0)
    print("Interaction matrix created!")
    return interaction_matrix
