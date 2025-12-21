import os
import shutil
import tempfile

from app.audio.processors.bitcrusher import apply_bitcrusher
from app.audio.processors.tape import apply_tape_distortion
from app.audio.processors.lofi import apply_lofi
from app.audio.processors.crackle import apply_vinyl_crackle
from app.audio.processors.wobble import apply_woobler
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
    """
    Aplica 1 efecto al archivo input_path y lo escribe en output_path.
    Por ahora son stubs que copian el audio.
    """
    func = EFFECTS_MAP.get(slug)
    if not func:
        # si el filtro no existe, copiamos sin procesar
        shutil.copyfile(input_path, output_path)
        return

    func(input_path, output_path)


def apply_multiple_effects(slugs: list[str], input_path: str, output_path: str) -> None:
    """
    Aplica una cadena de efectos en orden.
    Para no pisar archivos, encadenamos con temporales.
    """
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

            apply_effect(slug, current_in, tmp_path)
            current_in = tmp_path

        shutil.copyfile(current_in, output_path)

    finally:
        for f in temp_files:
            try:
                os.remove(f)
            except:
                pass

