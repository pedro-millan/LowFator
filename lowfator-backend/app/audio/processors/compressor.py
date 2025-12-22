import numpy as np
import soundfile as sf

def _compress_1d(x: np.ndarray, threshold: float = 0.25, ratio: float = 4.0, makeup: float = 1.25) -> np.ndarray:
    # simple convolver compression
    env = np.abs(x)
    # softed env
    alpha = 0.01
    for i in range(1, len(env)):
        env[i] = env[i-1] + alpha * (env[i] - env[i-1])

    gain = np.ones_like(x, dtype=np.float32)
    over = env > threshold
    gain[over] = (threshold + (env[over] - threshold) / ratio) / (env[over] + 1e-9)

    y = x * gain * makeup
    return np.clip(y, -1.0, 1.0).astype(np.float32)

def apply_compressor(input_path: str, output_path: str) -> None:
    audio, sr = sf.read(input_path, always_2d=True)
    audio = audio.astype(np.float32)

    threshold = 1.25
    ratio = 4.0
    makeup = 2.20

    out = np.zeros_like(audio, dtype=np.float32)
    for ch in range(audio.shape[1]):
        out[:, ch] = _compress_1d(audio[:, ch], threshold=threshold, ratio=ratio, makeup=makeup)

    sf.write(output_path, out, sr)

