from mcp.server.fastmcp import FastMCP
from google import genai
import os
import base64

# 1. Initialize the FastMCP server
mcp = FastMCP("imagen-3-generation")

# 2. Configure the Gemini client
api_key = os.environ.get("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY environment variable is not set.")

client = genai.Client(api_key=api_key)

# 3. Define the generate_image tool
@mcp.tool()
def generate_image(prompt: str) -> str:
    """Generate an image using the Imagen 3 model and a text prompt."""
    try:
        result = client.models.generate_images(
            model='imagen-3.0-generate-001',
            prompt=prompt,
            config=dict(
                number_of_images=1,
                output_mime_type="image/jpeg"
            )
        )
        
        # Extract bytes and encode to base64 for MCP transit
        image_bytes = result.generated_images[0].image.image_bytes
        encoded = base64.b64encode(image_bytes).decode('utf-8')
        return f"data:image/jpeg;base64,{encoded}"
        
    except Exception as e:
        return f"Error during image generation: {str(e)}"

# 4. Start the server's stdio event loop
if __name__ == "__main__":
    mcp.run()