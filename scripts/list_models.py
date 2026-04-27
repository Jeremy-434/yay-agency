import os
from google import genai
from dotenv import load_dotenv

# Load variables from .env file
load_dotenv()

# Configure the Gemini client using the environment variable
api_key = os.environ.get("GEMINI_API_KEY")
if not api_key:
    print("GEMINI_API_KEY environment variable is not set.")
    exit(1)

client = genai.Client(api_key=api_key)

try:
    print("Listing models...")
    for model in client.models.list():
        print(f"Model Name: {model.name}, Display Name: {model.display_name}, Supported Actions: {model.supported_actions}")

except Exception as e:
    print(f"Error listing models: {str(e)}")
