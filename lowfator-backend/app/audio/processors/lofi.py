import numpy as np
import soundfile as sf


def _lofi_1d(x: np.ndarray, factor: int = 2, bits: int = 12) -> np.ndarray:
    
    # Downsample
    x_ds = x[::factor]

    # Interpoling to original size
    xp = np.arange(len(x_ds))
    x_new = np.linspace(0, len(x_ds) - 1, num=len(x))
    x_ds_up = np.interp(x_new, xp, x_ds)

    # Bit reduction
    max_val = 2 ** (bits - 1)
    x_bit = np.round(x_ds_up * max_val) / max_val

    # Soft saturation
    x_sat = np.tanh(x_bit * 1.5)

    return x_sat.astype(np.float32)


def apply_lofi(input_path: str, output_path: str) -> None:
    audio, sr = sf.read(input_path, always_2d=True) 
    audio = audio.astype(np.float32)

    factor = 4
    bits = 10

    # Processing each band
    processed = np.zeros_like(audio, dtype=np.float32)
    for ch in range(audio.shape[1]):
        processed[:, ch] = _lofi_1d(audio[:, ch], factor=factor, bits=bits)

    # Saving and holding samplerate
    sf.write(output_path, processed, sr)

