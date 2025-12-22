import numpy as np
import soundfile as sf

def _bitcrush_1d(x: np.ndarray, bits: int = 8, downsample: int = 3) -> np.ndarray:
    # Downsample
    x_ds = x[::downsample]
    xp = np.arange(len(x_ds))
    x_new = np.linspace(0, len(x_ds) - 1, num=len(x))
    x = np.interp(x_new, xp, x_ds)

    # Bit depth reduction
    max_val = 2 ** (bits - 1)
    x = np.round(x * max_val) / max_val

    # Limiter
    x = np.clip(x, -1.0, 1.0)
    return x.astype(np.float32)

def apply_bitcrusher(input_path: str, output_path: str) -> None:
    audio, sr = sf.read(input_path, always_2d=True)
    audio = audio.astype(np.float32)

    bits = 8
    downsample = 9

    out = np.zeros_like(audio, dtype=np.float32)
    for ch in range(audio.shape[1]):
        out[:, ch] = _bitcrush_1d(audio[:, ch], bits=bits, downsample=downsample)

    sf.write(output_path, out, sr)

