import numpy as np
import soundfile as sf

from app.audio.processors.bitcrusher import apply_bitcrusher
from app.audio.processors.tape import apply_tape_distortion
from app.audio.processors.lofi import apply_lofi
from app.audio.processors.crackle import apply_vinyl_crackle
from app.audio.processors.wobble import apply_wobble
from app.audio.processors.glitch_delay import apply_glitch_delay
from app.audio.processors.compressor import apply_compressor
from app.audio.processors.dirty_reverb import apply_dirty_reverb


EFFECTS_MAP = {
    "8bit": apply_bitcrusher,
    "tape-distortion": apply_tape_distortion,
    "lofi": apply_lofi,
    "vinyl-crackle": apply_vinyl_crackle,
    "woobler": apply_wobble,
    "glitch-delay": apply_glitch_delay,
    "compressor": apply_compressor,
    "dirty-reverb": apply_dirty_reverb,
}


def load_audio(path):
 
    audio, sr = sf.read(path)
    if audio.ndim > 1:
        audio = np.mean(audio, axis=1)
    return audio, sr


def save_audio(path, audio, sr):

    sf.write(path, audio, sr)


def apply_effect(effect_slug, input_path, output_path):

    if effect_slug not in EFFECTS_MAP:
        raise ValueError(f"Efecto desconocido: {effect_slug}")

    audio, sr = load_audio(input_path)

    processor = EFFECTS_MAP[effect_slug]
    processed = processor(audio, sr)

    save_audio(output_path, processed, sr)
    return output_path


def apply_multiple_effects(effects, input_path, output_path):
  
    audio, sr = load_audio(input_path)

    for effect_slug in effects:
        if effect_slug in EFFECTS_MAP:
            audio = EFFECTS_MAP[effect_slug](audio, sr)

    save_audio(output_path, audio, sr)
    return output_path

