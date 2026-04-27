import os
from google import genai
from dotenv import load_dotenv
import base64

# Load variables from .env file
load_dotenv()

# Configure the Gemini client using the environment variable
api_key = os.environ.get("GEMINI_API_KEY")
if not api_key:
    print("GEMINI_API_KEY environment variable is not set.")
    exit(1)

client = genai.Client(api_key=api_key)

try:
    print("Generating image with Nano Banana...")
    response = client.models.generate_content(
        model="gemini-2.5-flash-image",
        contents="A beautiful sunset over majestic mountains",
    )
    
    # Check if there's an image in the response
    print(f"Response: {response}")
    # Based on Nano Banana's behavior, it should return an image part.
    # But let's see what's in the response first.
    
except Exception as e:
    print(f"Error during image generation: {str(e)}")
