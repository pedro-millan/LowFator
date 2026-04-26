import numpy as np
import soundfile as sf

def _wobble_1d(x: np.ndarray, sr: int, rate_hz: float = 2.0, depth: float = 0.006, trem: float = 0.25) -> np.ndarray:
    # Vibrato/soft wooble
    n = len(x)
    t = np.arange(n) / sr
    lfo = np.sin(2 * np.pi * rate_hz * t).astype(np.float32)

    # reading stretching
    shift = (lfo * depth * sr).astype(np.float32)

    base = np.arange(n, dtype=np.float32)
    idx = base + shift
    idx = np.clip(idx, 0, n - 1)

    # lineal interpolation
    i0 = np.floor(idx).astype(np.int32)
    i1 = np.clip(i0 + 1, 0, n - 1)
    frac = idx - i0
    y = (1 - frac) * x[i0] + frac * x[i1]

    # soft tremolo
    amp = 1.0 - trem * (0.5 * (1 - lfo))
    y = y * amp

    return np.clip(y, -1.0, 1.0).astype(np.float32)

def apply_woobler(input_path: str, output_path: str) -> None:
    audio, sr = sf.read(input_path, always_2d=True)
    audio = audio.astype(np.float32)

    rate_hz = 5.0
    depth = 0.03
    trem = 0.15

    out = np.zeros_like(audio, dtype=np.float32)
    for ch in range(audio.shape[1]):
        out[:, ch] = _wobble_1d(audio[:, ch], sr, rate_hz=rate_hz, depth=depth, trem=trem)

    sf.write(output_path, out, sr)

