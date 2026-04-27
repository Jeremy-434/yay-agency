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
    print("Generating image with Nano Banana 2...")
    response = client.models.generate_content(
        model="gemini-3.1-flash-image-preview",
        contents="A beautiful sunset over majestic mountains",
    )
    
    print(f"Response: {response}")
    # If successful, we'll extract the image here.
    
except Exception as e:
    print(f"Error during image generation: {str(e)}")
