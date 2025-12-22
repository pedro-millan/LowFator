import os
import shutil
import tempfile

from app.audio.processors.bitcrusher import apply_bitcrusher
from app.audio.processors.tape import apply_tape_distortion
from app.audio.processors.lofi import apply_lofi
from app.audio.processors.crackle import apply_vinyl_crackle
from app.audio.processors.woobler import apply_woobler
from app.audio.processors.glitch_delay import apply_glitch_delay
from app.audio.processors.compressor import apply_compressor
from app.audio.processors.dirty_reverb import apply_dirty_reverb


EFFECTS_MAP = {
    "8bit": apply_bitcrusher,
    "tape-distortion": apply_tape_distortion,
    "lofi": apply_lofi,
    "vinyl-crackle": apply_vinyl_crackle,
    "woobler": apply_woobler,
    "glitch-delay": apply_glitch_delay,
    "compressor": apply_compressor,
    "dirty-reverb": apply_dirty_reverb,
}



def apply_effect(slug: str, input_path: str, output_path: str) -> None:

    func = EFFECTS_MAP.get(slug)
    if not func:
        # si el filtro no existe, copiamos sin procesar
        shutil.copyfile(input_path, output_path)
        return

    func(input_path, output_path)


def apply_multiple_effects(slugs: list[str], input_path: str, output_path: str) -> None:

    if not slugs:
        shutil.copyfile(input_path, output_path)
        return

    current_in = input_path

    temp_files = []

    try:
        for i, slug in enumerate(slugs):
            fd, tmp_path = tempfile.mkstemp(suffix=".wav")
            os.close(fd)
            temp_files.append(tmp_path)

            if slug == "vinyl-crackle":
                has_compressor = "compressor" in slugs
                has_digital = ("8bit" in slugs) or ("lofi" in slugs)

                crackle_mix = 0.80 if (has_compressor and has_digital) else 0.35

                from app.audio.processors.crackle import apply_vinyl_crackle
                apply_vinyl_crackle(current_in, tmp_path, mix=crackle_mix)

            else:
                apply_effect(slug, current_in, tmp_path)
            current_in = tmp_path

        shutil.copyfile(current_in, output_path)

    finally:
        for f in temp_files:
            try:
                os.remove(f)
            except:
                pass

