from pathlib import Path
from PIL import Image, ImageOps
import hashlib, json

root = Path(__file__).resolve().parents[1]
source = root / 'assets/plates/dossier-stock-source.png'
patch = Image.open(source).convert('RGB')
assert patch.size == (140, 42), patch.size
cell = Image.new('RGB', (280, 84))
cell.paste(patch, (0, 0))
cell.paste(ImageOps.mirror(patch), (140, 0))
cell.paste(ImageOps.flip(patch), (0, 42))
cell.paste(ImageOps.flip(ImageOps.mirror(patch)), (140, 42))
tile = Image.new('RGB', (840, 840))
for y in range(0, 840, 84):
    for x in range(0, 840, 280):
        tile.paste(cell, (x, y))
png = root / 'assets/plates/dossier-stock.png'
webp = root / 'public/materials/dossier-stock.webp'
png.parent.mkdir(parents=True, exist_ok=True)
webp.parent.mkdir(parents=True, exist_ok=True)
tile.save(png, optimize=True)
tile.save(webp, lossless=True, method=6, exact=True)
assert Image.open(webp).convert('RGB').tobytes() == tile.tobytes()
assert tile.crop((0, 0, 1, 840)).tobytes() == tile.crop((839, 0, 840, 840)).tobytes()
assert tile.crop((0, 0, 840, 1)).tobytes() == tile.crop((0, 839, 840, 840)).tobytes()
provenance = {
    'kind': 'approved comp clean-patch texture extraction',
    'origin': 'docs/reference/mobile-dossier.png',
    'source_patch': 'assets/plates/dossier-stock-source.png',
    'source_patch_sha256': hashlib.sha256(source.read_bytes()).hexdigest(),
    'source_patch_size': [140, 42],
    'approval': 'Concept B Tabbed dossier; actual serve-question decision receipt recorded in approved comp sidecar',
    'transformation': 'Mechanical horizontal and vertical mirror tiling of the existing clean, no-ink paper patch. A 280x84 mirrored cell is repeated 3x10 to produce 840x840. No resampling, color correction, added grain, or generated detail.',
    'generated_detail': False,
    'output_size': [840, 840],
    'color_mode': 'RGB',
    'checks': {'webp_pixel_identical_to_png': True, 'opposite_edges_pixel_identical': True},
    'portrait': 'Existing real portrait was visually inspected against src/assets/profile.jpg; it was not edited.',
}
for output in [png, webp]:
    sidecar = {**provenance, 'output': output.relative_to(root).as_posix(), 'format': output.suffix[1:], 'lossless': True}
    Path(str(output) + '.json').write_text(json.dumps(sidecar, indent=2) + '\n', encoding='utf-8')
print(json.dumps({'outputs': [{'path': str(p), 'bytes': p.stat().st_size, 'size': [840, 840]} for p in [png, webp]]}, indent=2))
