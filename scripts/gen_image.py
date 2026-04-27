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
    print("Generating image...")
    # Use the new SDK to generate images
    response = client.models.generate_images(
        model="gemini-2.5-flash-image",
        prompt="A beautiful sunset over majestic mountains",
    )
    
    # Save the image
    file_path = "sunset_mountains.png"
    # The response should contain the image data
    # Based on the new SDK, it might be in response.generated_images[0].image_bytes
    if response.generated_images:
        image = response.generated_images[0]
        with open(file_path, "wb") as f:
            f.write(image.image.image_bytes)
        print(f"Image saved to {file_path}")
    else:
        print("No images were generated.")

except Exception as e:
    print(f"Error during image generation: {str(e)}")
