import numpy as np
import soundfile as sf

def _highpass_1d(x: np.ndarray, sr: int, cutoff_hz: float = 120.0) -> np.ndarray:
    #soft highpass
    rc = 1.0 / (2.0 * np.pi * cutoff_hz)
    dt = 1.0 / sr
    alpha = rc / (rc + dt)

    y = np.empty_like(x, dtype=np.float32)
    y[0] = x[0]
    for i in range(1, len(x)):
        y[i] = alpha * (y[i-1] + x[i] - x[i-1])
    return y

def _tape_1d(x: np.ndarray, sr: int, drive: float = 2.0, mix: float = 0.75, hpf_hz: float = 120.0) -> np.ndarray:
    # saturation
    wet = np.tanh(x * drive)
    out = (1 - mix) * x + mix * wet

    # soft lowpass
    alpha = 0.12
    y = np.empty_like(out, dtype=np.float32)
    y[0] = out[0]
    for i in range(1, len(out)):
        y[i] = y[i-1] + alpha * (out[i] - y[i-1])

    # low freq's looser
    y = _highpass_1d(y, sr, cutoff_hz=hpf_hz)

    return np.clip(y, -1.0, 1.0).astype(np.float32)

def apply_tape_distortion(input_path: str, output_path: str) -> None:
    audio, sr = sf.read(input_path, always_2d=True)
    audio = audio.astype(np.float32)

    drive = 2.75
    mix = 0.45
    hpf_hz = 110.0

    out = np.zeros_like(audio, dtype=np.float32)
    for ch in range(audio.shape[1]):
        out[:, ch] = _tape_1d(audio[:, ch], sr, drive=drive, mix=mix, hpf_hz=hpf_hz)

    sf.write(output_path, out, sr)


