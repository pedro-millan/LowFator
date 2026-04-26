import numpy as np
import soundfile as sf

def _simple_reverb_1d(x: np.ndarray, sr: int, room: float = 0.55, damp: float = 0.25, mix: float = 0.35) -> np.ndarray:
    # comb + allpass simple reverb
    n = len(x)
    y = np.zeros(n, dtype=np.float32)

    delays = [
        int(sr * 0.029),
        int(sr * 0.037),
        int(sr * 0.041),
    ]
    gains = [room, room * 0.92, room * 0.88]

    for i in range(n):
        acc = 0.0
        for d, g in zip(delays, gains):
            if i - d >= 0:
                acc += y[i - d] * g
        y[i] = x[i] + acc

    # damping
    alpha = damp
    for i in range(1, n):
        y[i] = y[i-1] + alpha * (y[i] - y[i-1])

    wet = np.tanh(y * 1.2)  # “dirty”
    out = (1 - mix) * x + mix * wet
    return np.clip(out, -1.0, 1.0).astype(np.float32)

def apply_dirty_reverb(input_path: str, output_path: str) -> None:
    audio, sr = sf.read(input_path, always_2d=True)
    audio = audio.astype(np.float32)

    room = 0.30
    damp = 0.75
    mix = 0.95

    out = np.zeros_like(audio, dtype=np.float32)
    for ch in range(audio.shape[1]):
        out[:, ch] = _simple_reverb_1d(audio[:, ch], sr, room=room, damp=damp, mix=mix)

    sf.write(output_path, out, sr)

