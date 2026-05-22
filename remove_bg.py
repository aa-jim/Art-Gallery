from PIL import Image
import numpy as np
import os

# Run this from your project root, or adjust the path below
assets_path = r"D:\Projects\Art-Gallery\public\assets"

files = ["path_line.png", "path_line90.png", "red_star.png", "white_star.png"]

for name in files:
    filepath = os.path.join(assets_path, name)
    img = Image.open(filepath).convert("RGBA")
    data = np.array(img)

    r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]

    # Make near-black pixels transparent (threshold: 40)
    mask = (r < 40) & (g < 40) & (b < 40)
    data[mask, 3] = 0

    result = Image.fromarray(data)
    result.save(filepath)
    print(f"Done: {name}")

print("All files processed!")